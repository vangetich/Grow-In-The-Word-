'use client';

import React, {useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  FAMILIARITY_OPTIONS_SPEC,
  OPEN_DOOR_INTAKE_SPEC,
  SECURITY_CRO_SIGNUP_SPEC,
  HERO_COPY_VARIANTS,
  THREE_TIER_SPECS,
  COLOR_PALETTE_SPEC,
  FamiliarityLevelId,
  computeCustomEntryLane,
} from '@/lib/design-spec-data';
import * as d3 from 'd3';
import {
  Database,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  Terminal,
  ArrowRight,
  Loader2,
  RefreshCw,
  CheckCircle2,
  Server,
  Sliders,
  Eye,
  EyeOff,
  LayoutGrid,
  Layers,
  Activity,
  FileText,
  Copy,
  Check,
  Download,
  Compass,
  Clock,
  Filter,
  Info,
  TrendingUp,
} from 'lucide-react';

export interface AdminBackendMaintenanceSectionProps {
  onOpenJourneyModal: (defaultTier?: 'bedtime' | 'archive' | 'harbor') => void;
  onEngageContent?: (points: number, label: string) => void;
  engagementLog?: string[];
  growthPoints?: number;
  recentActivityLabel?: string;
}

export type AdminSectionId =
  | 'post-intake-routing'
  | 'data-architecture'
  | 'maintenance-logs';

export type AdminLayoutMode = 'tabs' | 'grid';

export interface MaintenanceLogEntry {
  id: string;
  timestamp: string;
  subsystem: 'LANE_ROUTER' | 'SQLITE_VAult' | 'ZERO_KNOWLEDGE_ENC' | 'CACHE_SYNC';
  severity: 'HEALTHY' | 'VERIFIED' | 'AUDIT';
  summary: string;
  detail: string;
}

export interface EngagementCsvRecord {
  logId: string;
  timestamp: string;
  actionLabel: string;
  category: string;
  developmentalStage: string;
  pointsAwarded: number;
  cumulativePoints: number;
  stagePointsBreakdown: string;
  entryLaneContext: string;
}

const BASELINE_ENGAGEMENT_HISTORY: Array<{
  timestampOffsetMinutes: number;
  actionLabel: string;
  category: string;
  developmentalStage: string;
  pointsAwarded: number;
}> = [
  {
    timestampOffsetMinutes: 180,
    actionLabel: 'Initialized Sanctuary Journey & Seed Calibration',
    category: 'Onboarding & Routing',
    developmentalStage: 'All Stages · 15-Year Arc',
    pointsAwarded: 10,
  },
  {
    timestampOffsetMinutes: 135,
    actionLabel: 'Listened to Bedtime Shepherd Liturgy (Psalm 23 · Gentle Rest)',
    category: 'Bedtime Sanctuary',
    developmentalStage: 'Ages 3–7 · Childhood',
    pointsAwarded: 10,
  },
  {
    timestampOffsetMinutes: 95,
    actionLabel: 'Explored Hebrew Lexical Root (Hesed · Steadfast Lovingkindness)',
    category: 'Historical Archive',
    developmentalStage: 'Ages 8–12 · Tweens',
    pointsAwarded: 15,
  },
  {
    timestampOffsetMinutes: 45,
    actionLabel: 'Pinned Morning Daily Affirmation to Longitudinal Growth History',
    category: 'Daily Affirmation',
    developmentalStage: 'Ages 8–12 · Tweens',
    pointsAwarded: 10,
  },
  {
    timestampOffsetMinutes: 20,
    actionLabel: 'Reflected in Safe Harbor Zero-Knowledge Vault (Habakkuk 1:2)',
    category: 'Safe Harbor',
    developmentalStage: 'Ages 13–18 · Teens',
    pointsAwarded: 15,
  },
];

export interface GrowthPointD3ChartProps {
  data: EngagementCsvRecord[];
}

export function GrowthPointD3Chart({ data }: GrowthPointD3ChartProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [hoveredPoint, setHoveredPoint] = React.useState<{
    x: number;
    y: number;
    record: EngagementCsvRecord;
  } | null>(null);

  React.useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    const container = containerRef.current;
    d3.select(container).selectAll('svg').remove();

    const width = container.clientWidth || 540;
    const height = 185;
    const margin = { top: 22, right: 28, bottom: 32, left: 38 };

    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('class', 'overflow-visible');

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale
    const xScale = d3
      .scaleLinear()
      .domain([0, Math.max(data.length - 1, 1)])
      .range([0, innerWidth]);

    // Y Scale
    const maxVal = d3.max(data, (d) => d.cumulativePoints) || 100;
    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(maxVal * 1.15, 20)])
      .nice()
      .range([innerHeight, 0]);

    // Horizontal Gridlines
    const yGrid = d3
      .axisLeft(yScale)
      .ticks(4)
      .tickSize(-innerWidth)
      .tickFormat(() => '');

    g.append('g')
      .attr('class', 'gridline')
      .call(yGrid)
      .selectAll('line')
      .attr('stroke', '#292524')
      .attr('stroke-dasharray', '3,3');
    g.selectAll('.gridline .domain').remove();

    // Axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(Math.min(data.length, 7))
      .tickFormat((i) => {
        const item = data[Number(i)];
        return item ? item.logId : '';
      });

    const yAxis = d3.axisLeft(yScale).ticks(4);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .attr('color', '#A8A29E')
      .selectAll('text')
      .style('font-family', 'var(--font-mono), monospace')
      .style('font-size', '10px');

    g.append('g')
      .call(yAxis)
      .attr('color', '#A8A29E')
      .selectAll('text')
      .style('font-family', 'var(--font-mono), monospace')
      .style('font-size', '10px');

    // Gradient Defs
    const defs = svg.append('defs');
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'd3-growth-trend-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#D97706')
      .attr('stop-opacity', 0.38);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#D97706')
      .attr('stop-opacity', 0.02);

    // Area Generator
    const areaGenerator = d3
      .area<EngagementCsvRecord>()
      .x((_, i) => xScale(i))
      .y0(innerHeight)
      .y1((d) => yScale(d.cumulativePoints))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'url(#d3-growth-trend-gradient)')
      .attr('d', areaGenerator);

    // Line Generator
    const lineGenerator = d3
      .line<EngagementCsvRecord>()
      .x((_, i) => xScale(i))
      .y((d) => yScale(d.cumulativePoints))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#D97706')
      .attr('stroke-width', 2.5)
      .attr('d', lineGenerator);

    // Circles & Interactive Hits
    const dots = g
      .selectAll('.data-circle-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'data-circle-group')
      .attr('transform', (d, i) => `translate(${xScale(i)},${yScale(d.cumulativePoints)})`);

    dots
      .append('circle')
      .attr('r', 4.5)
      .attr('fill', '#FBBF24')
      .attr('stroke', '#1C1917')
      .attr('stroke-width', 1.8)
      .style('cursor', 'pointer');

    dots
      .append('circle')
      .attr('r', 14)
      .attr('fill', 'transparent')
      .style('cursor', 'pointer')
      .on('mouseenter', (event, d) => {
        const [mx, my] = d3.pointer(event, container);
        setHoveredPoint({ x: mx, y: my, record: d });
      })
      .on('mouseleave', () => {
        setHoveredPoint(null);
      });

  }, [data]);

  return (
    <div className="relative w-full space-y-2 p-4 rounded-2xl bg-[#141210] border border-[#292524]">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#FBBF24]">
        <div className="flex items-center gap-2 font-semibold">
          <TrendingUp className="w-4 h-4 text-[#D97706]" />
          <span>D3 Growth Point Progression Trend ({data.length} Session Events)</span>
        </div>
        <span className="text-[11px] text-[#A8A29E]">
          Hover data points for timestamps, growth counts &amp; stage breakdowns
        </span>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[185px] bg-[#1C1917] rounded-xl border border-[#292524] p-2 overflow-visible"
      >
        {/* Interactive Floating Hover Tooltip */}
        <AnimatePresence>
          {hoveredPoint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.15 }}
              className="absolute z-40 pointer-events-none p-3 rounded-xl bg-[#141210] border border-[#D97706] text-xs text-[#FAF7F2] shadow-2xl space-y-1 max-w-[280px]"
              style={{
                left: Math.min(Math.max(hoveredPoint.x - 120, 10), 250),
                top: Math.max(hoveredPoint.y - 120, 10),
              }}
            >
              <div className="flex items-center justify-between text-[10.5px] font-mono text-[#FBBF24] border-b border-[#292524] pb-1">
                <span className="font-bold">{hoveredPoint.record.logId}</span>
                <span className="text-[#A8A29E]">{hoveredPoint.record.timestamp}</span>
              </div>
              <div className="font-semibold text-[#FAF7F2] text-xs leading-snug">
                {hoveredPoint.record.actionLabel}
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono pt-0.5">
                <span className="text-[#34D399] font-bold">
                  +{hoveredPoint.record.pointsAwarded} Pts (Total: {hoveredPoint.record.cumulativePoints})
                </span>
                <span className="text-[#A7F3D0] text-[10px]">
                  {hoveredPoint.record.category}
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#FDE68A] pt-1 border-t border-[#292524]/80">
                {hoveredPoint.record.stagePointsBreakdown}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const INITIAL_MAINTENANCE_LOGS: MaintenanceLogEntry[] = [
  {
    id: 'log-01',
    timestamp: '2026-10-30 08:14:02 UTC',
    subsystem: 'LANE_ROUTER',
    severity: 'VERIFIED',
    summary:
      'Deterministic 3×3 Entry Lane Router verified (Default benchmark: LANE_2A_FIELD_EXPLORER)',
    detail:
      'All 9 age × familiarity combinations resolved in <0.4ms with zero fallback collisions.',
  },
  {
    id: 'log-02',
    timestamp: '2026-10-30 08:12:45 UTC',
    subsystem: 'SQLITE_VAult',
    severity: 'HEALTHY',
    summary:
      'Local-first SQLite & WatermelonDB schema v2026.10.open_door_v2 integrity check passed',
    detail:
      'User onboarding profile store and offline concordance index verified with zero orphaned records.',
  },
  {
    id: 'log-03',
    timestamp: '2026-10-30 08:10:19 UTC',
    subsystem: 'ZERO_KNOWLEDGE_ENC',
    severity: 'AUDIT',
    summary:
      'Safe Harbor (Ages 13–18) AES-256 hardware enclave key derivation isolated from Parent Portal',
    detail:
      'Verified zero plaintext telemetry leakage across Teen Wrestling Ring journal vault.',
  },
  {
    id: 'log-04',
    timestamp: '2026-10-30 08:05:00 UTC',
    subsystem: 'CACHE_SYNC',
    severity: 'HEALTHY',
    summary:
      'Offline Scripture Studio & Bedtime Shepherd audio bundle cached (64.4 MB local manifest)',
    detail:
      'Parallel translations (AKJV, AMP, NASB, NIV, NLT) and Strong’s root lexicon verified for zero-connectivity reading.',
  },
];

export default function AdminBackendMaintenanceSection({
  onOpenJourneyModal,
  onEngageContent,
  engagementLog = [],
  growthPoints = 38,
  recentActivityLabel = 'Exploring the Sanctuary',
}: AdminBackendMaintenanceSectionProps) {
  // Password-protection & 'Admin Mode' toggle state
  const [adminModeEnabled, setAdminModeEnabled] = useState<boolean>(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string>(
    'admin@growintheword.org'
  );
  const [adminPasscode, setAdminPasscode] = useState<string>('');
  const [showPasscode, setShowPasscode] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Dashboard Layout Mode ('tabs' | 'grid') and Active Section Tab
  const [layoutMode, setLayoutMode] = useState<AdminLayoutMode>('tabs');
  const [activeAdminTab, setActiveAdminTab] = useState<AdminSectionId>(
    'post-intake-routing'
  );

  // Backend Routing & Post-Intake Simulator State (Defaults to Age 12 + beginner -> LANE_2A_FIELD_EXPLORER)
  const [simAge, setSimAge] = useState<number>(12);
  const [simFamiliarity, setSimFamiliarity] =
    useState<FamiliarityLevelId>('beginner');
  const [showSimHowItWorks, setShowSimHowItWorks] = useState<boolean>(false);

  // Maintenance Logs & Diagnostics State
  const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLogEntry[]>(
    INITIAL_MAINTENANCE_LOGS
  );
  const [logFilter, setLogFilter] = useState<string>('ALL');
  const [maintenanceStatus, setMaintenanceStatus] = useState<string>(
    'All 9 Deterministic Entry Lanes & SQLite Offline Caches Healthy'
  );
  const [copiedFullSpec, setCopiedFullSpec] = useState<boolean>(false);
  const [exportedCsvNotice, setExportedCsvNotice] = useState<string | null>(
    null
  );
  const [csvExportStatus, setCsvExportStatus] = useState<
    'idle' | 'generating' | 'complete'
  >('idle');
  const [copiedCsv, setCopiedCsv] = useState<boolean>(false);

  const simLane = computeCustomEntryLane(simAge, simFamiliarity);
  const simBirthYear = 2026 - simAge;

  const simBackendJson = {
    schema_version: '2026.10.open_door_v2',
    user_onboarding_profile: {
      birth_year: simBirthYear,
      chronological_age: simAge,
      familiarity_selection: simFamiliarity,
      familiarity_posture: simLane.familiarityCode,
    },
    deterministic_entry_routing: {
      tier_id: simLane.tierId,
      tier_display: simLane.tierName,
      custom_entry_lane_code: simLane.laneCode,
      custom_entry_lane_title: simLane.laneTitle,
      day_one_curriculum_track: simLane.startingTrackTitle,
      day_one_anchor_passage: simLane.firstSessionPassage,
      ui_scaffolding_flags: simLane.uiScaffoldingFlags,
    },
    post_intake_welcome_card: {
      kicker: simLane.welcomeCard.kicker,
      headline: simLane.welcomeCard.headline,
      actionable_cta_label: simLane.welcomeCard.actionableButtonLabel,
      module_duration: simLane.welcomeCard.moduleDuration,
    },
  };

  const generateMarkdownSpecification = () => {
    const lines = [
      '# GROW IN THE WORD — Internal Technical Architecture, Post-Intake Routing & Data Recording Specification',
      'Product Category: Decade-Spanning Scripture Companion (Ages 3 to 18)',
      '',
      '---',
      '',
      '## 1. The "Open Door" Post-Signup Intake Flow & Post-Intake Welcome Page Specification',
      `### A. ${OPEN_DOOR_INTAKE_SPEC.screen1AgeCheck.title}`,
      `- **Prompt Headline**: "${OPEN_DOOR_INTAKE_SPEC.screen1AgeCheck.promptHeadline}"`,
      `- **UX Rationale**: ${OPEN_DOOR_INTAKE_SPEC.screen1AgeCheck.uxRationale}`,
      `- **Reassurance Copy**: "${OPEN_DOOR_INTAKE_SPEC.screen1AgeCheck.radicalHonestyMicrocopy}"`,
      '',
      `### B. ${OPEN_DOOR_INTAKE_SPEC.screen2FamiliarityCheck.title}`,
      `- **Prompt Headline**: "${OPEN_DOOR_INTAKE_SPEC.screen2FamiliarityCheck.promptHeadline}"`,
      `- **UX Rationale**: ${OPEN_DOOR_INTAKE_SPEC.screen2FamiliarityCheck.uxRationale}`,
      `- **Radical Honesty Micro-Copy**: "${OPEN_DOOR_INTAKE_SPEC.screen2FamiliarityCheck.radicalHonestyMicrocopy}"`,
      '- **The 3 Familiarity Options**:',
      ...FAMILIARITY_OPTIONS_SPEC.map(
        (opt) =>
          `  * ${opt.quoteLabel} (\`${opt.internalCode}\`): ${opt.scaffoldingBehavior} (${opt.glossarySupport})`
      ),
      '',
      '### C. Data Recording Architecture & 9-Lane Routing Matrix',
      `- **Storage Engine**: ${OPEN_DOOR_INTAKE_SPEC.dataRecordingArchitecture.storageEngine}`,
      `- **Routing Formula**: ${OPEN_DOOR_INTAKE_SPEC.dataRecordingArchitecture.routingFormula}`,
      '',
      `### D. ${OPEN_DOOR_INTAKE_SPEC.postIntakeWelcomePage.title}`,
      `- **1. The Transition State**: "${OPEN_DOOR_INTAKE_SPEC.postIntakeWelcomePage.transitionState.headline}" (${OPEN_DOOR_INTAKE_SPEC.postIntakeWelcomePage.transitionState.durationMs}ms — ${OPEN_DOOR_INTAKE_SPEC.postIntakeWelcomePage.transitionState.animationSpec})`,
      `- **2. The Personalized Welcome Card**: ${OPEN_DOOR_INTAKE_SPEC.postIntakeWelcomePage.welcomeCardPrinciples}`,
      `- **3. The Actionable First Step**: ${OPEN_DOOR_INTAKE_SPEC.postIntakeWelcomePage.actionableFirstStepRule}`,
      '- **4. Minimalist Information Architecture (Secondary Options)**:',
      ...OPEN_DOOR_INTAKE_SPEC.postIntakeWelcomePage.minimalistArchitecture.secondaryOptions.map(
        (opt) => `  * **${opt.label}** (${opt.role}): ${opt.description}`
      ),
      '',
      '---',
      '',
      '## 2. Product Security & CRO Sign-Up Flow Specification',
      `- **Rationale**: ${SECURITY_CRO_SIGNUP_SPEC.entryChoiceSplit.rationale}`,
      `- **Trust & Privacy Badge**: "${SECURITY_CRO_SIGNUP_SPEC.trustPrivacyBadge.exactMicrocopy}"`,
      '',
      '---',
      '',
      '## 3. Mission Copywriting & Three-Tier Architecture',
      ...HERO_COPY_VARIANTS.map(
        (v) =>
          `- **${v.label}**: "${v.headline}" — ${v.subHeadline}`
      ),
      ...THREE_TIER_SPECS.map(
        (t) =>
          `- **${t.index}. ${t.name} (${t.ageSpan})**: ${t.expandedStrategistDescription}`
      ),
      '',
      '## 4. Visual Tokens',
      ...COLOR_PALETTE_SPEC.map(
        (c) => `- **${c.name}** (${c.token} | ${c.hex}): ${c.role}`
      ),
    ];
    return lines.join('\n');
  };

  const handleDownloadSpec = () => {
    const md = generateMarkdownSpecification();
    const blob = new Blob([md], {type: 'text/markdown;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grow-in-the-word-admin-technical-spec.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyFullSpec = () => {
    const md = generateMarkdownSpecification();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(md);
      setCopiedFullSpec(true);
      setTimeout(() => setCopiedFullSpec(false), 2000);
    }
  };

  // Infer category & developmental stage from an engagement log label
  const classifyEngagementAction = (
    label: string
  ): {category: string; developmentalStage: string; points: number} => {
    const lower = label.toLowerCase();
    if (lower.includes('prayer')) {
      return {
        category: 'Daily Prayer',
        developmentalStage:
          lower.includes('3–7') || lower.includes('3-7')
            ? 'Ages 3–7 · Childhood'
            : lower.includes('13–18') || lower.includes('13-18')
            ? 'Ages 13–18 · Teens'
            : 'Ages 8–12 · Tweens',
        points: 10,
      };
    }
    if (lower.includes('affirmation')) {
      return {
        category: 'Daily Affirmation',
        developmentalStage: 'All Stages · Sanctuary',
        points: 10,
      };
    }
    if (lower.includes('milestone') || lower.includes('celebrated')) {
      return {
        category: 'Milestone Celebration',
        developmentalStage:
          lower.includes('3–7') || lower.includes('bedtime')
            ? 'Ages 3–7 · Childhood'
            : lower.includes('13–18') || lower.includes('harbor')
            ? 'Ages 13–18 · Teens'
            : 'Ages 8–12 · Tweens',
        points: 15,
      };
    }
    if (
      lower.includes('archive') ||
      lower.includes('hebrew') ||
      lower.includes('greek') ||
      lower.includes('lexicon')
    ) {
      return {
        category: 'Historical Archive',
        developmentalStage: 'Ages 8–12 · Tweens',
        points: 10,
      };
    }
    if (
      lower.includes('harbor') ||
      lower.includes('vault') ||
      lower.includes('teen')
    ) {
      return {
        category: 'Safe Harbor',
        developmentalStage: 'Ages 13–18 · Teens',
        points: 15,
      };
    }
    if (lower.includes('bedtime') || lower.includes('shepherd')) {
      return {
        category: 'Bedtime Sanctuary',
        developmentalStage: 'Ages 3–7 · Childhood',
        points: 10,
      };
    }
    if (
      lower.includes('admin') ||
      lower.includes('diagnostic') ||
      lower.includes('csv')
    ) {
      return {
        category: 'Admin & Analytics',
        developmentalStage: `Age ${simAge} · ${simLane.tierName}`,
        points: 5,
      };
    }
    return {
      category: 'Scripture Formation',
      developmentalStage: `Age ${simAge} · ${simLane.tierName}`,
      points: 5,
    };
  };

  // Build structured longitudinal engagement records combining baseline & live session engagementLog
  const baseTimeMs = new Date('2026-11-09T15:00:00Z').getTime();
  const chronologicalSessionActions = [...engagementLog].reverse();
  const combinedRawEngagement = [
    ...BASELINE_ENGAGEMENT_HISTORY.map((item) => ({
      timestamp:
        new Date(baseTimeMs - item.timestampOffsetMinutes * 60 * 1000)
          .toISOString()
          .replace('T', ' ')
          .slice(0, 19) + ' UTC',
      actionLabel: item.actionLabel,
      category: item.category,
      developmentalStage: item.developmentalStage,
      pointsAwarded: item.pointsAwarded,
    })),
    ...chronologicalSessionActions.map((action, idx) => {
      const meta = classifyEngagementAction(action);
      return {
        timestamp:
          new Date(baseTimeMs + (idx + 1) * 60 * 1000)
            .toISOString()
            .replace('T', ' ')
            .slice(0, 19) + ' UTC',
        actionLabel: action,
        category: meta.category,
        developmentalStage: meta.developmentalStage,
        pointsAwarded: meta.points,
      };
    }),
  ];

  let runningPointsTotal = 0;
  let bedtimePts = 0;
  let archivePts = 0;
  let harborPts = 0;

  const engagementCsvRecords: EngagementCsvRecord[] = combinedRawEngagement
    .map((row, index) => {
      runningPointsTotal += row.pointsAwarded;

      const lowerCat = (row.category + ' ' + row.developmentalStage).toLowerCase();
      if (
        lowerCat.includes('bedtime') ||
        lowerCat.includes('childhood') ||
        lowerCat.includes('3–7') ||
        lowerCat.includes('3-7')
      ) {
        bedtimePts += row.pointsAwarded;
      } else if (
        lowerCat.includes('harbor') ||
        lowerCat.includes('teen') ||
        lowerCat.includes('13–18') ||
        lowerCat.includes('13-18') ||
        lowerCat.includes('vault')
      ) {
        harborPts += row.pointsAwarded;
      } else {
        archivePts += row.pointsAwarded;
      }

      const stageBreakdownStr = `Bedtime: ${bedtimePts} pts | Archive: ${archivePts} pts | Harbor: ${harborPts} pts`;

      return {
        logId: `ENG-${String(index + 1).padStart(3, '0')}`,
        timestamp: row.timestamp,
        actionLabel: row.actionLabel,
        category: row.category,
        developmentalStage: row.developmentalStage,
        pointsAwarded: row.pointsAwarded,
        cumulativePoints: runningPointsTotal,
        stagePointsBreakdown: stageBreakdownStr,
        entryLaneContext: simLane.laneCode,
      };
    })
    .reverse();

  const escapeCsvCell = (value: string | number): string => {
    const str = String(value ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const generateEngagementCsvContent = (): string => {
    const headers = [
      'Log ID',
      'Timestamp (UTC)',
      'Action / Reflection Event',
      'Formation Category',
      'Developmental Stage',
      'Points Awarded',
      'Cumulative Growth Points',
      'Stage Breakdown (Bedtime/Archive/Harbor)',
      'Assigned Entry Lane',
    ];
    const rows = engagementCsvRecords.map((rec) =>
      [
        rec.logId,
        rec.timestamp,
        rec.actionLabel,
        rec.category,
        rec.developmentalStage,
        `+${rec.pointsAwarded}`,
        rec.cumulativePoints,
        rec.stagePointsBreakdown,
        rec.entryLaneContext,
      ]
        .map(escapeCsvCell)
        .join(',')
    );
    return [headers.map(escapeCsvCell).join(','), ...rows].join('\n');
  };

  const handleExportEngagementCsv = () => {
    setCsvExportStatus('generating');
    const csvContent = generateEngagementCsvContent();
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const isoDateStamp = new Date().toISOString().split('T')[0];
    const fileName = `engagement-log-${isoDateStamp}.csv`;
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const nowStr =
      new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
    setMaintenanceLogs((prev) => [
      {
        id: `log-csv-${prev.length + 1}`,
        timestamp: nowStr,
        subsystem: 'SQLITE_VAult',
        severity: 'AUDIT',
        summary: `Exported User Engagement Log CSV (${fileName} · ${engagementCsvRecords.length} rows) for long-term growth analysis`,
        detail: `Generated RFC-4180 CSV snapshot (${fileName}) containing engagement logs and growth point history for the current session (${growthPoints} pts; Active Lane: ${simLane.laneCode}).`,
      },
      ...prev,
    ]);
    setCsvExportStatus('complete');
    setExportedCsvNotice(
      `CSV Export Complete: Downloaded ${fileName} (${engagementCsvRecords.length} session engagement & growth history records)`
    );
    setTimeout(() => {
      setExportedCsvNotice(null);
    }, 6000);
    onEngageContent?.(
      5,
      'Exported User Engagement Log (.csv) for Long-Term Growth Analysis'
    );
  };

  const handleCopyEngagementCsv = () => {
    const csvContent = generateEngagementCsvContent();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(csvContent);
      setCopiedCsv(true);
      setTimeout(() => setCopiedCsv(false), 2500);
    }
  };

  const handleAdminSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail.trim() || !adminPasscode.trim()) {
      setAuthError(
        'Enter administrator email and password (e.g., SANCTUARY-2026) to unlock the internal technical console.'
      );
      return;
    }
    setAuthError(null);
    setAdminModeEnabled(true);
    setShowAuthPrompt(false);
    onEngageContent?.(
      10,
      'Unlocked Admin Mode & Internal Technical Console'
    );
  };

  const handleQuickAdminToggle = () => {
    if (adminModeEnabled) {
      setAdminModeEnabled(false);
      setShowAuthPrompt(false);
      return;
    }
    setAdminEmail('admin@growintheword.org');
    setAdminPasscode('SANCTUARY-2026');
    setAuthError(null);
    setAdminModeEnabled(true);
    setShowAuthPrompt(false);
    onEngageContent?.(
      10,
      'Enabled Admin Mode for Post-Intake Routing & Data Architecture'
    );
  };

  const handleRunMaintenanceCheck = () => {
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
    const newEntry: MaintenanceLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: nowStr,
      subsystem: 'LANE_ROUTER',
      severity: 'VERIFIED',
      summary: `Live Diagnostic: Age ${simAge} (${simLane.familiarityCode}) → ${simLane.laneCode}`,
      detail: `Verified Screen 03 Post-Intake transition (650ms) and local SQLite profile write for "${simLane.laneTitle}".`,
    };
    setMaintenanceLogs((prev) => [newEntry, ...prev]);
    setMaintenanceStatus(
      `Verified Lane Router (${simLane.laneCode}) & Local Cache Integrity at ${nowStr}`
    );
    onEngageContent?.(5, 'Ran Admin Backend Routing & Cache Diagnostics');
  };

  const filteredLogs =
    logFilter === 'ALL'
      ? maintenanceLogs
      : maintenanceLogs.filter((item) => item.subsystem === logFilter);

  return (
    <section
      id="admin-backend-console"
      className="w-full max-w-full overflow-x-clip py-12 sm:py-16 border-b border-[#292524] bg-[#141210] text-[#FAF7F2]"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8 min-w-0">
        {/* Top Discreet Admin Mode Bar (Keeps Landing Page User-Focused When Locked) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-5 sm:p-6 rounded-2xl bg-[#1C1917] border border-[#292524]">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#FBBF24]">
              <Terminal className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Admin Maintenance &amp; System Architecture Gate</span>
              <span aria-hidden="true">·</span>
              <span>
                {adminModeEnabled
                  ? 'Admin Console Unlocked'
                  : 'Protected Technical Wall'}
              </span>
            </div>
            <h2
              className="text-xl sm:text-2xl font-normal tracking-tight text-[#FAF7F2]"
              style={{fontFamily: 'var(--font-display), serif'}}
            >
              {adminModeEnabled
                ? 'Authorized Admin Console: Post-Intake Routing, Data Architecture & Maintenance Logs'
                : 'Internal Technical Documentation & Routing Console (Admin Only)'}
            </h2>
            <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed">
              {adminModeEnabled
                ? 'Inspect and test the internal Screen 03 Post-Intake Routing specimens, the 3×3 Entry Lane Router Data Recording Architecture, and live system maintenance logs.'
                : 'Internal engineering specifications are hidden behind this secure Admin Mode gate so the primary landing page remains dedicated to user-facing Christian formation content.'}
            </p>
          </div>

          {/* Admin Mode Toggle, CSV Export Trigger & Status Indicator, and Password Wall Trigger */}
          <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
            <div className="flex flex-wrap items-center gap-3">
              {/* Visual Button to Trigger Engagement Log CSV Export + Small Completion Status Indicator + Tooltip */}
              <div className="inline-flex items-center gap-2 p-1 pr-2.5 rounded-xl bg-[#141210] border border-[#36312E]">
                <button
                  type="button"
                  onClick={handleExportEngagementCsv}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#D97706] hover:bg-[#F59E0B] text-[#141210] text-xs font-mono font-semibold transition-colors cursor-pointer shadow-xs"
                  title="Exports engagement-log-YYYY-MM-DD.csv containing engagement logs and growth point history for the current session"
                >
                  {csvExportStatus === 'generating' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  <span>Export Engagement Log (.csv)</span>
                </button>

                {/* Small Status Indicator showing CSV readiness / completion */}
                <span
                  role="status"
                  aria-live="polite"
                  className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-1 rounded-md border transition-colors ${
                    csvExportStatus === 'complete'
                      ? 'bg-[#064E3B]/50 border-[#10B981]/50 text-[#34D399]'
                      : csvExportStatus === 'generating'
                      ? 'bg-[#D97706]/20 border-[#D97706]/50 text-[#FBBF24]'
                      : 'bg-[#1C1917] border-[#292524] text-[#A8A29E]'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      csvExportStatus === 'complete'
                        ? 'bg-[#34D399]'
                        : csvExportStatus === 'generating'
                        ? 'bg-[#FBBF24] animate-pulse'
                        : 'bg-[#D97706]'
                    }`}
                  />
                  <span>
                    {csvExportStatus === 'complete'
                      ? `CSV Complete (${engagementCsvRecords.length} rows)`
                      : csvExportStatus === 'generating'
                      ? 'Generating CSV…'
                      : `Ready (${engagementCsvRecords.length} rows)`}
                  </span>
                </span>

                {/* Non-Intrusive Instruction Tooltip Trigger */}
                <div className="relative group inline-flex items-center">
                  <button
                    type="button"
                    aria-label="CSV export contents information"
                    title="The exported CSV (engagement-log-YYYY-MM-DD.csv) includes engagement logs and growth point history for the current session."
                    className="p-1 rounded-md text-[#A8A29E] hover:text-[#FBBF24] focus:outline-none focus:ring-1 focus:ring-[#D97706] cursor-help"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                  <div
                    role="tooltip"
                    className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 absolute bottom-full right-0 mb-2 w-72 p-2.5 rounded-xl bg-[#1C1917] border border-[#D97706]/50 text-[11px] text-[#E7E5E4] leading-relaxed shadow-xl z-30"
                  >
                    Exports{' '}
                    <span className="font-mono text-[#FBBF24]">
                      engagement-log-YYYY-MM-DD.csv
                    </span>{' '}
                    with all engagement logs and cumulative growth point history
                    recorded during the current session.
                  </div>
                </div>
              </div>

            {/* Direct Admin Mode Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={adminModeEnabled}
              onClick={handleQuickAdminToggle}
              className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold transition-all cursor-pointer ${
                adminModeEnabled
                  ? 'bg-[#4A5D4E]/30 border-[#6E8B74] text-[#A7F3D0]'
                  : 'bg-[#292524] hover:bg-[#36312E] border-[#44403C] text-[#FDE68A]'
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  adminModeEnabled ? 'bg-[#34D399]' : 'bg-[#D97706]'
                }`}
              />
              <span>
                Admin Mode: {adminModeEnabled ? 'ON (Unlocked)' : 'OFF (Locked)'}
              </span>
            </button>

              {!adminModeEnabled ? (
                <button
                  type="button"
                  onClick={() => setShowAuthPrompt((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#292524] hover:bg-[#36312E] border border-[#44403C] text-[#FAF7F2] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>
                    {showAuthPrompt
                      ? 'Hide Password Prompt'
                      : 'Enter Admin Password'}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setAdminModeEnabled(false);
                    setShowAuthPrompt(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#292524] hover:bg-[#36312E] border border-[#44403C] text-xs font-semibold text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Lock Admin Wall</span>
                </button>
              )}
            </div>

            {/* Brief, non-intrusive instruction text explaining CSV export contents & ISO filename */}
            <p className="text-[11px] font-mono text-[#A8A29E] flex items-center gap-1.5">
              <Info className="w-3 h-3 text-[#D97706] shrink-0" />
              <span>
                Exported CSV (
                <code className="text-[#FDE68A]">
                  engagement-log-YYYY-MM-DD.csv
                </code>
                ) includes engagement logs and growth point history for the
                current session.
              </span>
            </p>
          </div>
        </div>

        {/* PASSWORD-PROTECTION MODAL / WALL OR UNLOCKED ADMIN DASHBOARD */}
        <AnimatePresence mode="wait">
          {!adminModeEnabled && showAuthPrompt && (
            <motion.div
              key="admin-password-wall"
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.22}}
              className="max-w-xl mx-auto rounded-2xl bg-[#1C1917] border border-[#36312E] p-6 sm:p-8 shadow-2xl space-y-5"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#292524]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#FBBF24]">
                    <KeyRound className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Password-Protected Admin Console</span>
                  </div>
                  <h3
                    className="text-xl font-normal text-[#FAF7F2]"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Authenticate to View Internal Routing &amp; Data Specs
                  </h3>
                </div>
                <Server className="w-5 h-5 text-[#D97706] shrink-0" />
              </div>

              <form onSubmit={handleAdminSignIn} className="space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="admin-email-input"
                    className="block text-xs font-mono text-[#A8A29E]"
                  >
                    Administrator Email
                  </label>
                  <input
                    id="admin-email-input"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141210] border border-[#36312E] focus:border-[#D97706] focus:outline-none text-xs text-[#FAF7F2] font-mono"
                    placeholder="admin@growintheword.org"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono text-[#A8A29E]">
                    <label htmlFor="admin-passkey-input">
                      Maintenance Password
                    </label>
                    <span className="text-[11px] text-[#FBBF24]">
                      Demo Passkey: SANCTUARY-2026
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      id="admin-passkey-input"
                      type={showPasscode ? 'text' : 'password'}
                      value={adminPasscode}
                      onChange={(e) => setAdminPasscode(e.target.value)}
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-[#141210] border border-[#36312E] focus:border-[#D97706] focus:outline-none text-xs text-[#FAF7F2] font-mono"
                      placeholder="Enter SANCTUARY-2026"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasscode((prev) => !prev)}
                      aria-label={
                        showPasscode ? 'Hide password' : 'Show password'
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#FAF7F2] cursor-pointer"
                    >
                      {showPasscode ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {authError && (
                  <p className="text-xs text-[#FBBF24] bg-[#D97706]/15 border border-[#D97706]/40 p-2.5 rounded-lg">
                    {authError}
                  </p>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#D97706] hover:bg-[#F59E0B] text-[#1A1A1A] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Unlock Admin Console</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickAdminToggle}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#292524] hover:bg-[#36312E] border border-[#44403C] text-[#FDE68A] text-xs font-mono font-semibold transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#D97706]" />
                    <span>1-Tap Passkey Fill</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {adminModeEnabled && (
            <motion.div
              key="admin-console-dashboard"
              initial={{opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.25}}
              className="space-y-8"
            >
              {/* Admin Console Navigation Bar: Categorized Tabs + Tabbed/Grid View Toggle + Simulator Controls */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#1C1917] border border-[#36312E] space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#292524]">
                  {/* Categorized Admin Dashboard Tabs */}
                  <div
                    role="tablist"
                    aria-label="Admin Console Categories"
                    className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#141210] border border-[#292524]"
                  >
                    {[
                      {
                        id: 'post-intake-routing' as AdminSectionId,
                        label: '01. Post-Intake Routing (Screen 03)',
                        icon: Compass,
                      },
                      {
                        id: 'data-architecture' as AdminSectionId,
                        label: '02. Data Architecture (3×3 Router)',
                        icon: Database,
                      },
                      {
                        id: 'maintenance-logs' as AdminSectionId,
                        label: `03. Maintenance Logs (${maintenanceLogs.length})`,
                        icon: Activity,
                      },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isSelected = activeAdminTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          role="tab"
                          aria-selected={isSelected}
                          type="button"
                          onClick={() => {
                            setActiveAdminTab(tab.id);
                          }}
                          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                            isSelected && layoutMode === 'tabs'
                              ? 'bg-[#D97706] text-[#141210] shadow-xs'
                              : isSelected && layoutMode === 'grid'
                              ? 'bg-[#292524] text-[#FBBF24] border border-[#D97706]/50'
                              : 'text-[#A8A29E] hover:text-[#FAF7F2]'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Layout Switcher (Tabbed View vs Grid View) & Export Controls */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="inline-flex items-center p-1 rounded-xl bg-[#141210] border border-[#292524]">
                      <button
                        type="button"
                        onClick={() => setLayoutMode('tabs')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                          layoutMode === 'tabs'
                            ? 'bg-[#292524] text-[#FAF7F2]'
                            : 'text-[#A8A29E] hover:text-[#FAF7F2]'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>Tabbed View</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setLayoutMode('grid')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                          layoutMode === 'grid'
                            ? 'bg-[#292524] text-[#FAF7F2]'
                            : 'text-[#A8A29E] hover:text-[#FAF7F2]'
                        }`}
                      >
                        <LayoutGrid className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>Grid View (All 3)</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyFullSpec}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#292524] hover:bg-[#36312E] border border-[#44403C] text-xs font-mono text-[#FAF7F2] transition-colors cursor-pointer"
                    >
                      {copiedFullSpec ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#34D399]" />
                          <span>Spec Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#FBBF24]" />
                          <span>Copy Tech Spec</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadSpec}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#292524] hover:bg-[#36312E] border border-[#44403C] text-xs font-mono text-[#FDE68A] transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Export .md</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExportEngagementCsv}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D97706] hover:bg-[#F59E0B] text-xs font-mono font-semibold text-[#141210] transition-colors cursor-pointer shadow-xs"
                      title="Export longitudinal user engagement log as a CSV file for growth analysis"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Engagement Log (.csv)</span>
                    </button>
                  </div>
                </div>

                {exportedCsvNotice && (
                  <div
                    role="status"
                    className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-[#064E3B]/40 border border-[#10B981]/50 text-xs font-mono text-[#A7F3D0]"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                      <span>{exportedCsvNotice}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setExportedCsvNotice(null)}
                      className="text-[11px] text-[#A7F3D0] hover:text-white underline cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                )}

                {/* Shared Live Telemetry & Entry Lane Simulator Bar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#D6D3D1] flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>Simulate Intake Age (3–18):</span>
                      </span>
                      <span className="font-mono font-bold text-[#FBBF24]">
                        Age {simAge} (Born {simBirthYear})
                      </span>
                    </div>
                    <input
                      type="range"
                      aria-label="Admin simulate user age from 3 to 18"
                      min={3}
                      max={18}
                      value={simAge}
                      onChange={(e) => setSimAge(Number(e.target.value))}
                      className="w-full accent-[#D97706] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-[#A8A29E]">
                      <span>Age 3 (Tier 1)</span>
                      <span>Age 12 (LANE_2A Benchmark)</span>
                      <span>Age 18 (Tier 3)</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-2">
                    <div className="text-xs font-mono text-[#D6D3D1]">
                      Simulate Familiarity Posture:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {FAMILIARITY_OPTIONS_SPEC.map((opt) => {
                        const active = simFamiliarity === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSimFamiliarity(opt.id)}
                            className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                              active
                                ? 'bg-[#D97706]/20 border-[#D97706] text-[#FAF7F2]'
                                : 'bg-[#141210] border-[#292524] text-[#A8A29E] hover:text-[#FAF7F2]'
                            }`}
                          >
                            <div className="font-mono text-[10px] text-[#FBBF24]">
                              {opt.internalCode}
                            </div>
                            <div className="text-xs font-semibold mt-0.5 truncate">
                              {opt.quoteLabel}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="lg:col-span-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSimAge(12);
                        setSimFamiliarity('beginner');
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#292524] hover:bg-[#36312E] border border-[#44403C] text-[11px] font-mono text-[#FDE68A] transition-colors cursor-pointer"
                    >
                      Reset: Age 12 · LANE_2A
                    </button>
                    <button
                      type="button"
                      onClick={handleRunMaintenanceCheck}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#4A5D4E]/30 hover:bg-[#4A5D4E]/45 border border-[#6E8B74] text-[11px] font-mono text-[#A7F3D0] transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Verify &amp; Log</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ================================================================= */}
              {/* DASHBOARD CONTAINER: TABBED VIEW OR 3-SECTION ADMIN GRID VIEW     */}
              {/* ================================================================= */}
              <div
                className={
                  layoutMode === 'grid'
                    ? 'grid grid-cols-1 xl:grid-cols-12 gap-8 items-start'
                    : 'space-y-8'
                }
              >
                {/* --------------------------------------------------------------- */}
                {/* CATEGORY 01: POST-INTAKE ROUTING (SCREEN 03 SPECIMEN & LOGIC)   */}
                {/* --------------------------------------------------------------- */}
                {(layoutMode === 'grid' ||
                  activeAdminTab === 'post-intake-routing') && (
                  <div
                    className={
                      layoutMode === 'grid'
                        ? 'xl:col-span-12 rounded-2xl bg-[#F2ECE1] text-[#1C1917] border border-[#E5DEC9] p-6 sm:p-8 space-y-6'
                        : 'rounded-2xl bg-[#F2ECE1] text-[#1C1917] border border-[#E5DEC9] p-6 sm:p-8 space-y-6'
                    }
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5DEC9]">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#92400E]">
                          <span>
                            {OPEN_DOOR_INTAKE_SPEC.postIntakeWelcomePage.title}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>
                            Live Narrative UX Specimen (Age {simAge} ·{' '}
                            {simLane.familiarityCode})
                          </span>
                        </div>
                        <h3
                          className="text-2xl font-normal text-[#1C1917]"
                          style={{fontFamily: 'var(--font-display), serif'}}
                        >
                          The Post-Intake Transition State, Personalized Welcome
                          Card &amp; Minimalist Architecture
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 min-w-0">
                        <button
                          type="button"
                          onClick={() => {
                            setSimAge(12);
                            setSimFamiliarity('beginner');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#E5DEC9] border border-[#E5DEC9] text-xs font-semibold text-[#1C1917] transition-colors cursor-pointer text-left sm:whitespace-nowrap"
                        >
                          Preset: 12yo Beginner (“Roots &amp; Resilience”)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSimAge(5);
                            setSimFamiliarity('beginner');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#E5DEC9] border border-[#E5DEC9] text-xs font-semibold text-[#1C1917] transition-colors cursor-pointer text-left sm:whitespace-nowrap"
                        >
                          Preset: 5yo Child (“Bedtime Shepherd”)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSimAge(16);
                            setSimFamiliarity('deeper-dive');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#E5DEC9] border border-[#E5DEC9] text-xs font-semibold text-[#1C1917] transition-colors cursor-pointer text-left sm:whitespace-nowrap"
                        >
                          Preset: 16yo Teen (“Safe Harbor”)
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-w-0">
                      {/* Left 5 Columns: 1. The Transition State + 4. Minimalist Information Architecture Rules */}
                      <div className="lg:col-span-5 flex flex-col justify-between space-y-6 min-w-0">
                        {/* 1. The Transition State Specimen */}
                        <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#92400E]">
                              01. The Transition State (
                              {
                                OPEN_DOOR_INTAKE_SPEC.postIntakeWelcomePage
                                  .transitionState.durationMs
                              }
                              ms)
                            </span>
                            <span
                              className="font-mono text-[11px] text-[#57534E]"
                              style={{fontFamily: 'var(--font-mono), monospace'}}
                            >
                              In-Modal Morph
                            </span>
                          </div>

                          <div className="p-4 rounded-lg bg-[#F2ECE1] border border-[#E5DEC9] flex items-center gap-3.5">
                            <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#D97706]/40 flex items-center justify-center shrink-0">
                              <Loader2 className="w-4 h-4 text-[#D97706] animate-spin" />
                            </div>
                            <div className="space-y-0.5">
                              <div
                                className="text-sm font-normal text-[#1C1917]"
                                style={{
                                  fontFamily: 'var(--font-display), serif',
                                }}
                              >
                                “
                                {
                                  OPEN_DOOR_INTAKE_SPEC.postIntakeWelcomePage
                                    .transitionState.headline
                                }
                                ”
                              </div>
                              <div className="text-[11px] text-[#57534E]">
                                {
                                  OPEN_DOOR_INTAKE_SPEC.postIntakeWelcomePage
                                    .transitionState.subcopySequence[1]
                                }
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-[#44403C] leading-relaxed">
                            {
                              OPEN_DOOR_INTAKE_SPEC.postIntakeWelcomePage
                                .transitionState.animationSpec
                            }
                          </p>
                        </div>

                        {/* 4. Minimalist Information Architecture Rules */}
                        <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-3">
                          <div className="text-xs font-semibold text-[#92400E]">
                            04. Minimalist Information Architecture
                          </div>
                          <p className="text-xs text-[#44403C] leading-relaxed">
                            {
                              OPEN_DOOR_INTAKE_SPEC.postIntakeWelcomePage
                                .minimalistArchitecture.viewportPrinciple
                            }
                          </p>
                          <div className="space-y-2 pt-1">
                            {OPEN_DOOR_INTAKE_SPEC.postIntakeWelcomePage.minimalistArchitecture.secondaryOptions.map(
                              (opt) => (
                                <div
                                  key={opt.id}
                                  className="p-3 rounded-lg bg-[#F2ECE1] border border-[#E5DEC9] text-xs space-y-1"
                                >
                                  <div className="flex items-center justify-between font-semibold text-[#1C1917]">
                                    <span>{opt.label}</span>
                                    <span
                                      className="text-[11px] font-mono text-[#92400E]"
                                      style={{
                                        fontFamily:
                                          'var(--font-mono), monospace',
                                      }}
                                    >
                                      {opt.role}
                                    </span>
                                  </div>
                                  <p className="text-[#44403C] leading-relaxed">
                                    {opt.description}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right 7 Columns: Live Rendered Post-Intake Welcome Card + Actionable First Step + Secondary Links */}
                      <div className="lg:col-span-7 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs">
                        <div className="space-y-5">
                          {/* Top Kicker */}
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#92400E] pb-3 border-b border-[#E5DEC9]">
                            <span
                              style={{fontFamily: 'var(--font-mono), monospace'}}
                            >
                              {simLane.welcomeCard.kicker}
                            </span>
                            <span
                              style={{fontFamily: 'var(--font-mono), monospace'}}
                            >
                              {simLane.welcomeCard.moduleDuration}
                            </span>
                          </div>

                          {/* 02. The Personalized Welcome Card Headline & Narrative Body */}
                          <div className="space-y-3">
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#57534E]">
                              02. The Personalized Welcome Card
                            </div>
                            <h4
                              className="text-2xl sm:text-3xl font-normal text-[#1C1917] leading-snug"
                              style={{fontFamily: 'var(--font-display), serif'}}
                            >
                              “{simLane.welcomeCard.headline}”
                            </h4>
                            <p className="text-sm sm:text-base text-[#44403C] leading-relaxed">
                              {simLane.welcomeCard.narrativeBody}
                            </p>
                          </div>

                          {/* Tailored Day-One Track Preview Box */}
                          <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-[#1C1917]">
                                Up First: {simLane.startingTrackTitle}
                              </span>
                              <span
                                className="font-mono text-[#92400E]"
                                style={{
                                  fontFamily: 'var(--font-mono), monospace',
                                }}
                              >
                                {simLane.firstSessionPassage}
                              </span>
                            </div>
                            <p className="text-xs text-[#44403C] leading-relaxed">
                              {simLane.welcomeCard.firstModulePreviewText}
                            </p>
                          </div>

                          {/* 03. The Actionable First Step (Single Primary Button) */}
                          <div className="space-y-2 pt-1">
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#57534E]">
                              03. The Actionable First Step (Single
                              High-Contrast CTA)
                            </div>
                            <button
                              type="button"
                              onClick={() => onOpenJourneyModal(simLane.tierId)}
                              className="w-full py-4 px-6 rounded-lg bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-semibold text-sm flex items-center justify-center gap-2.5 transition-all ring-2 ring-transparent hover:ring-[#D97706]/60 cursor-pointer shadow-xs"
                            >
                              <span>
                                {simLane.welcomeCard.actionableButtonLabel}
                              </span>
                              <ArrowRight className="w-4 h-4 text-[#D97706]" />
                            </button>
                          </div>
                        </div>

                        {/* Quiet Footer Bar: Minimalist Information Architecture */}
                        <div className="pt-4 border-t border-[#E5DEC9] space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#57534E]">
                            <div className="flex flex-wrap items-center gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  setShowSimHowItWorks((prev) => !prev)
                                }
                                className="font-medium text-[#44403C] hover:text-[#1C1917] underline underline-offset-4 cursor-pointer"
                              >
                                {showSimHowItWorks
                                  ? 'Hide ‘How it Works’ Guide'
                                  : 'How it Works (60-sec overview)'}
                              </button>
                              <span aria-hidden="true">·</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setSimAge((prev) => (prev === 12 ? 15 : 12));
                                }}
                                className="text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
                              >
                                Adjust Age or Starting Point
                              </button>
                            </div>

                            <span
                              className="font-mono text-[11px] text-[#92400E]"
                              style={{fontFamily: 'var(--font-mono), monospace'}}
                            >
                              Zero Nav Chrome · 1 Primary Action
                            </span>
                          </div>

                          {showSimHowItWorks && (
                            <div className="p-4 rounded-lg bg-[#F2ECE1] border border-[#E5DEC9] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                              {OPEN_DOOR_INTAKE_SPEC.postIntakeWelcomePage.minimalistArchitecture.howItWorksPillars.map(
                                (pillar) => (
                                  <div key={pillar.step} className="space-y-1">
                                    <div className="font-semibold text-[#1C1917]">
                                      <span className="font-mono text-[#92400E] mr-1">
                                        {pillar.step}.
                                      </span>
                                      {pillar.title}
                                    </div>
                                    <p className="text-[#44403C] leading-relaxed">
                                      {pillar.detail}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* --------------------------------------------------------------- */}
                {/* CATEGORY 02: DATA ARCHITECTURE (3x3 ENTRY LANE ROUTER & MATRIX) */}
                {/* --------------------------------------------------------------- */}
                {(layoutMode === 'grid' ||
                  activeAdminTab === 'data-architecture') && (
                  <div
                    className={
                      layoutMode === 'grid'
                        ? 'xl:col-span-7 rounded-2xl bg-[#1C1917] text-[#FAF7F2] border border-[#36312E] p-6 sm:p-8 space-y-6'
                        : 'rounded-2xl bg-[#1C1917] text-[#FAF7F2] border border-[#36312E] p-6 sm:p-8 space-y-6'
                    }
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#FBBF24] pb-4 border-b border-[#292524]">
                      <div className="flex items-center gap-2 font-semibold">
                        <Database className="w-4 h-4 text-[#D97706]" />
                        <span>Data Recording Architecture</span>
                      </div>
                      <span
                        className="font-mono text-[11px] text-[#A8A29E]"
                        style={{fontFamily: 'var(--font-mono), monospace'}}
                      >
                        3×3 Entry Lane Router
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start min-w-0">
                      <div className="lg:col-span-5 space-y-5 min-w-0">
                        <div className="space-y-2">
                          <div className="text-xs text-[#A8A29E]">
                            Deterministic Custom Entry Lane Assigned:
                          </div>
                          <div
                            className="text-2xl sm:text-3xl font-normal text-[#FAF7F2]"
                            style={{fontFamily: 'var(--font-display), serif'}}
                          >
                            {simLane.laneTitle}
                          </div>
                          <div
                            className="text-xs font-mono text-[#D97706]"
                            style={{fontFamily: 'var(--font-mono), monospace'}}
                          >
                            Lane ID: {simLane.laneCode}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#292524] border border-[#44403C] space-y-2 text-xs">
                          <div>
                            <span className="text-[#A8A29E]">
                              Day-One Track:{' '}
                            </span>
                            <strong className="text-[#FAF7F2]">
                              {simLane.startingTrackTitle}
                            </strong>
                          </div>
                          <div>
                            <span className="text-[#A8A29E]">
                              Opening Passage:{' '}
                            </span>
                            <span className="text-[#FBBF24]">
                              {simLane.firstSessionPassage}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-[#36312E] text-[11px] text-[#D6D3D1]">
                            <span className="text-[#A8A29E] block mb-1">
                              Storage Engine &amp; Routing Formula:
                            </span>
                            {
                              OPEN_DOOR_INTAKE_SPEC.dataRecordingArchitecture
                                .routingFormula
                            }
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onOpenJourneyModal(simLane.tierId)}
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#F59E0B] text-xs font-semibold text-[#1C1917] transition-colors cursor-pointer"
                        >
                          <span>
                            Test Full Sign-Up → ‘Open Door’ Flow in Modal
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Live JSON Profile Payload */}
                      <div className="lg:col-span-7 space-y-2 min-w-0">
                        <div className="text-xs font-semibold text-[#D6D3D1]">
                          Live Backend User Profile Record (Updates as you
                          adjust Age &amp; Familiarity above):
                        </div>
                        <pre
                          className="p-4 rounded-xl bg-[#141210] border border-[#292524] text-[11px] text-[#E7E5E4] font-mono overflow-x-auto max-w-full leading-relaxed"
                          style={{fontFamily: 'var(--font-mono), monospace'}}
                        >
                          {JSON.stringify(simBackendJson, null, 2)}
                        </pre>
                      </div>
                    </div>

                    {/* Complete 3x3 (9-Lane) Deterministic Routing Matrix Table */}
                    <div className="pt-4 border-t border-[#292524] space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono font-semibold text-[#FBBF24]">
                          Complete 3×3 Deterministic Entry Lane Matrix (9 Total
                          Lanes)
                        </span>
                        <span className="text-[11px] font-mono text-[#A8A29E]">
                          Click any row to load into the simulator
                        </span>
                      </div>

                      <div className="overflow-x-auto rounded-xl border border-[#292524]">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#141210] text-[#A8A29E] font-mono text-[11px] border-b border-[#292524]">
                              <th className="py-2.5 px-3">Lane Code</th>
                              <th className="py-2.5 px-3">Tier &amp; Age</th>
                              <th className="py-2.5 px-3">Posture</th>
                              <th className="py-2.5 px-3">Assigned Track</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#292524]">
                            {([5, 12, 16] as const).flatMap((tierSampleAge) =>
                              FAMILIARITY_OPTIONS_SPEC.map((famOpt) => {
                                const lane = computeCustomEntryLane(
                                  tierSampleAge,
                                  famOpt.id
                                );
                                const isCurrent =
                                  lane.laneCode === simLane.laneCode;
                                return (
                                  <tr
                                    key={lane.laneCode}
                                    onClick={() => {
                                      setSimAge(tierSampleAge);
                                      setSimFamiliarity(famOpt.id);
                                    }}
                                    className={`cursor-pointer transition-colors ${
                                      isCurrent
                                        ? 'bg-[#D97706]/20 text-[#FAF7F2]'
                                        : 'bg-[#1C1917] hover:bg-[#292524]/70 text-[#D6D3D1]'
                                    }`}
                                  >
                                    <td className="py-2.5 px-3 font-mono text-[11px] text-[#FBBF24] whitespace-nowrap">
                                      {lane.laneCode}
                                    </td>
                                    <td className="py-2.5 px-3 whitespace-nowrap">
                                      {lane.tierName} (Age {lane.age})
                                    </td>
                                    <td className="py-2.5 px-3 font-mono text-[11px]">
                                      {lane.familiarityCode}
                                    </td>
                                    <td className="py-2.5 px-3">
                                      {lane.startingTrackTitle}
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* --------------------------------------------------------------- */}
                {/* CATEGORY 03: MAINTENANCE LOGS & USER ENGAGEMENT CSV EXPORT      */}
                {/* --------------------------------------------------------------- */}
                {(layoutMode === 'grid' ||
                  activeAdminTab === 'maintenance-logs') && (
                  <div
                    className={
                      layoutMode === 'grid'
                        ? 'xl:col-span-5 rounded-2xl bg-[#1C1917] text-[#FAF7F2] border border-[#36312E] p-6 sm:p-8 space-y-6'
                        : 'rounded-2xl bg-[#1C1917] text-[#FAF7F2] border border-[#36312E] p-6 sm:p-8 space-y-6'
                    }
                  >
                    {/* User Engagement Log & Long-Term Growth CSV Export Panel */}
                    <div className="p-5 rounded-2xl bg-[#141210] border border-[#D97706]/40 space-y-5">
                      <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#292524]">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-mono text-[#FBBF24]">
                            <FileText className="w-4 h-4 text-[#D97706]" />
                            <span>
                              Long-Term Growth Analysis · User Engagement Log
                              Export
                            </span>
                          </div>
                          <p className="text-xs text-[#A8A29E] leading-relaxed">
                            The exported CSV (
                            <code className="text-[#FDE68A] font-mono">
                              engagement-log-YYYY-MM-DD.csv
                            </code>
                            ) includes all engagement logs, cumulative growth
                            point history, and stage breakdowns (Bedtime/Archive/Harbor)
                            for the current session (
                            {engagementCsvRecords.length} events ·{' '}
                            {growthPoints} Growth Pts · Latest:{' '}
                            <span className="text-[#FAF7F2]">
                              {recentActivityLabel}
                            </span>
                            ).
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={handleExportEngagementCsv}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D97706] hover:bg-[#F59E0B] text-[#141210] text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Export Engagement Log (.csv)</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleCopyEngagementCsv}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#292524] hover:bg-[#36312E] border border-[#44403C] text-[#FAF7F2] text-xs font-mono transition-colors cursor-pointer"
                          >
                            {copiedCsv ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-[#34D399]" />
                                <span>CSV Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-[#FBBF24]" />
                                <span>Copy CSV</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* D3 Growth Point Progression Trend Line Chart with Interactive Tooltips */}
                      <GrowthPointD3Chart
                        data={[...engagementCsvRecords].reverse()}
                      />

                      {/* Preview Table of Exportable Engagement Log Rows */}
                      <div className="overflow-x-auto max-h-56 overflow-y-auto rounded-xl border border-[#292524]">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead className="sticky top-0 bg-[#1C1917] text-[#A8A29E] font-mono text-[11px] border-b border-[#292524]">
                            <tr>
                              <th className="py-2 px-3">ID</th>
                              <th className="py-2 px-3">Timestamp</th>
                              <th className="py-2 px-3">
                                Engagement / Reflection Event
                              </th>
                              <th className="py-2 px-3">Category</th>
                              <th className="py-2 px-3">Stage</th>
                              <th className="py-2 px-3">
                                Stage Breakdown (Bedtime/Archive/Harbor)
                              </th>
                              <th className="py-2 px-3 text-right">Pts</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#292524]">
                            {engagementCsvRecords.map((rec) => (
                              <tr
                                key={rec.logId}
                                className="bg-[#141210] hover:bg-[#292524]/50 text-[#D6D3D1]"
                              >
                                <td className="py-2 px-3 font-mono text-[11px] text-[#FBBF24] whitespace-nowrap">
                                  {rec.logId}
                                </td>
                                <td className="py-2 px-3 font-mono text-[11px] text-[#A8A29E] whitespace-nowrap">
                                  {rec.timestamp}
                                </td>
                                <td className="py-2 px-3 text-[#FAF7F2]">
                                  {rec.actionLabel}
                                </td>
                                <td className="py-2 px-3 font-mono text-[11px] text-[#A7F3D0] whitespace-nowrap">
                                  {rec.category}
                                </td>
                                <td className="py-2 px-3 text-[11px] text-[#A8A29E] whitespace-nowrap">
                                  {rec.developmentalStage}
                                </td>
                                <td className="py-2 px-3 font-mono text-[10.5px] text-[#FDE68A] whitespace-nowrap">
                                  {rec.stagePointsBreakdown}
                                </td>
                                <td className="py-2 px-3 font-mono text-[11px] text-[#34D399] text-right whitespace-nowrap">
                                  +{rec.pointsAwarded} ({rec.cumulativePoints})
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#292524]">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-mono text-[#FBBF24]">
                          <Activity className="w-4 h-4 text-[#D97706]" />
                          <span>System Maintenance Logs &amp; Audit Trail</span>
                        </div>
                        <p className="text-xs text-[#A8A29E]">
                          {maintenanceStatus}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleRunMaintenanceCheck}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D97706] hover:bg-[#F59E0B] text-[#141210] text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Run Router &amp; Cache Audit</span>
                      </button>
                    </div>

                    {/* Subsystem Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#A8A29E] mr-1">
                        <Filter className="w-3 h-3 text-[#D97706]" />
                        <span>Subsystem:</span>
                      </span>
                      {[
                        'ALL',
                        'LANE_ROUTER',
                        'SQLITE_VAult',
                        'ZERO_KNOWLEDGE_ENC',
                        'CACHE_SYNC',
                      ].map((sub) => (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => setLogFilter(sub)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                            logFilter === sub
                              ? 'bg-[#D97706] text-[#141210] font-semibold'
                              : 'bg-[#141210] text-[#A8A29E] hover:text-[#FAF7F2] border border-[#292524]'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>

                    {/* Log Entries Stream */}
                    <div className="space-y-3">
                      {filteredLogs.map((log) => (
                        <div
                          key={log.id}
                          className="p-4 rounded-xl bg-[#141210] border border-[#292524] space-y-1.5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                            <span className="inline-flex items-center gap-1.5 text-[#FBBF24]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                              <span>{log.subsystem}</span>
                              <span>·</span>
                              <span className="text-[#A7F3D0]">
                                {log.severity}
                              </span>
                            </span>
                            <span className="inline-flex items-center gap-1 text-[#A8A29E]">
                              <Clock className="w-3 h-3" />
                              <span>{log.timestamp}</span>
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-[#FAF7F2]">
                            {log.summary}
                          </div>
                          <p className="text-xs text-[#A8A29E] leading-relaxed">
                            {log.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
