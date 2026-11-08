'use client';

import React, {useState, useRef} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  Sprout,
  Flower2,
  TreeDeciduous,
  Trees,
  Sparkles,
  Moon,
  Feather,
  Compass,
  BookOpen,
  Lock,
  Scroll,
  Target,
  TrendingUp,
  Activity,
  Share2,
  Download,
  Copy,
  Check,
  RotateCcw,
  Plus,
  ArrowRight,
  CheckCircle2,
  Layers,
  Award,
} from 'lucide-react';
import {
  GROWTH_STAGES,
  GrowthStageInfo,
  DailyAffirmationItem,
} from '@/components/SanctuaryDashboardBar';
import WeeklyEngagementRecharts from '@/components/WeeklyEngagementRecharts';
import GrowthHistoryD3Chart from '@/components/GrowthHistoryD3Chart';

export type GrowthTrackerSectionTab =
  | 'evolution'
  | 'rhythm'
  | 'analytics'
  | 'milestone';

export interface LongitudinalGrowthSeedSectionProps {
  growthPoints: number;
  recentActivityLabel: string;
  engagementLog: string[];
  onEngageContent: (points: number, label: string) => void;
  onSetGrowthPoints?: (points: number, label: string) => void;
  activeSectionTab?: GrowthTrackerSectionTab;
  onTabChange?: (tab: GrowthTrackerSectionTab) => void;
  isNightSanctuary?: boolean;
}

const WEEKLY_GOAL_PRESETS = [
  {target: 2, label: '2 / wk · Gentle Rhythm', desc: 'Unhurried weekend & midweek reflection'},
  {target: 3, label: '3 / wk · Steady Roots', desc: 'Balanced family & personal cadence'},
  {target: 5, label: '5 / wk · Deep Sanctuary', desc: 'Daily weekday scripture & evening peace'},
];

const PILLAR_BREAKDOWN = [
  {
    id: 'reading',
    category: 'Reading & Bedtime Listening',
    ageTier: 'Tier 1 · Ages 3–6 & All Ages',
    icon: Moon,
    pointsBadge: '+15 to +20 pts',
    description:
      'Engage with unhurried scripture passages, complete a 2100K Zero-Glow bedtime narrative, or share a Morning Bridge conversation over breakfast.',
    sampleActionLabel: 'Log Quiet Reading Session (+15 pts)',
    samplePoints: 15,
  },
  {
    id: 'exploring',
    category: 'Historical & Linguistic Exploring',
    ageTier: 'Tier 2 · Ancient Archive (8–12)',
    icon: Compass,
    pointsBadge: '+15 to +35 pts',
    description:
      'Inspect Near Eastern archaeological artifacts, trace Bronze and Iron Age coordinates, or decipher Hebrew and Greek roots like Hesed and Shalom.',
    sampleActionLabel: 'Log Archive Artifact Discovery (+15 pts)',
    samplePoints: 15,
  },
  {
    id: 'journaling',
    category: 'Journaling & Honest Reflection',
    ageTier: 'Tier 3 · Safe Harbor (13–18)',
    icon: Feather,
    pointsBadge: '+20 to +25 pts',
    description:
      'Write unfiltered prayers, doubts, or ethical reflections inside the locally encrypted Wrestling Ring vault with zero surveillance.',
    sampleActionLabel: 'Log Private Journal Reflection (+20 pts)',
    samplePoints: 20,
  },
];

const QUICK_NOURISH_ACTIONS = [
  {
    icon: Moon,
    title: 'Bedtime Sanctuary Audio',
    desc: 'Listen to 58 BPM bedtime narratives or save a sleepy-hand audio bookmark',
    points: 15,
    badge: '+15 pts',
  },
  {
    icon: Scroll,
    title: 'Historical Eras & Artifacts',
    desc: 'Explore Near Eastern timelines & inspect museum-grade artifacts',
    points: 15,
    badge: '+15 pts',
  },
  {
    icon: BookOpen,
    title: 'Hebrew & Greek Root Words',
    desc: 'Examine ancient linguistic lenses (Hesed, Ruach, Shalom, Emet)',
    points: 10,
    badge: '+10 pts',
  },
  {
    icon: Lock,
    title: 'Safe Harbor Private Vault',
    desc: 'Lock an encrypted reflection in the zero-knowledge AES-256-GCM vault',
    points: 20,
    badge: '+20 pts',
  },
  {
    icon: Target,
    title: 'Weekly Reading Rhythm',
    desc: 'Complete an unhurried, low-pressure household or personal reading session',
    points: 20,
    badge: '+20 pts',
  },
];

const INLINE_AFFIRMATIONS: Record<
  'bedtime' | 'archive' | 'harbor',
  DailyAffirmationItem[]
> = {
  bedtime: [
    {
      id: 'bedtime-1',
      tierId: 'bedtime',
      tierLabel: 'Bedtime Sanctuary (Ages 3–6)',
      ageHorizon: 'Ages 3–6 · Night Sanctuary Rhythm',
      verse:
        '“In peace I will lie down and sleep, for You alone, O Lord, make me dwell in safety.”',
      scriptureReference: 'Psalm 4:8',
      prompt:
        'Where did your child see an unexpected moment of quiet, goodness, or safety today before sleep?',
      cycleDay: 'Day 1 of 7 · Evening Rest & Calm',
      theme: 'Safe Shelter & Gentle Night',
    },
    {
      id: 'bedtime-2',
      tierId: 'bedtime',
      tierLabel: 'Bedtime Sanctuary (Ages 3–6)',
      ageHorizon: 'Ages 3–6 · Night Sanctuary Rhythm',
      verse:
        '“The Lord is my shepherd; I shall not want. He makes me lie down in green pastures; He leads me beside still waters.”',
      scriptureReference: 'Psalm 23:1–2',
      prompt:
        'If you and your child could sit quietly beside the calmest water tonight, what would you whisper thank you for?',
      cycleDay: 'Day 2 of 7 · Still Waters & Care',
      theme: 'Caretaker Love & Still Waters',
    },
    {
      id: 'bedtime-3',
      tierId: 'bedtime',
      tierLabel: 'Bedtime Sanctuary (Ages 3–6)',
      ageHorizon: 'Ages 3–6 · Night Sanctuary Rhythm',
      verse:
        '“He counts the number of the stars; He calls all of them by their names.”',
      scriptureReference: 'Psalm 147:4',
      prompt:
        'Look up at the night sky together—if God knows every single star by name, how deeply does He know and love your name?',
      cycleDay: 'Day 3 of 7 · Named & Known',
      theme: 'Cosmic Wonder & Belonging',
    },
  ],
  archive: [
    {
      id: 'archive-1',
      tierId: 'archive',
      tierLabel: 'Ancient Archive (Ages 8–12)',
      ageHorizon: 'Ages 8–12 · Ancient Archive Wonder',
      verse:
        '“Remember the days of old; consider the years of many generations; ask your father and he will show you, your elders and they will tell you.”',
      scriptureReference: 'Deuteronomy 32:7',
      prompt:
        'Ancient stories are not fairy tales—they happened in real dust and stone. What question are you curious to ask history today?',
      cycleDay: 'Day 1 of 7 · Field Artifacts & Roots',
      theme: 'Historical Curiosity & Memory',
    },
    {
      id: 'archive-2',
      tierId: 'archive',
      tierLabel: 'Ancient Archive (Ages 8–12)',
      ageHorizon: 'Ages 8–12 · Ancient Archive Wonder',
      verse:
        '“He has made everything beautiful in its time. Also, He has put eternity into man’s heart.”',
      scriptureReference: 'Ecclesiastes 3:11',
      prompt:
        'When you inspect ancient maps and museum artifacts, how does realizing real people lived thousands of years ago change your perspective?',
      cycleDay: 'Day 2 of 7 · Eternity & Mystery',
      theme: 'Deep Time & Human Resilience',
    },
    {
      id: 'archive-3',
      tierId: 'archive',
      tierLabel: 'Ancient Archive (Ages 8–12)',
      ageHorizon: 'Ages 8–12 · Ancient Archive Wonder',
      verse:
        '“Ask for the ancient paths, ask where the good way is, and walk in it, and you will find rest for your souls.”',
      scriptureReference: 'Jeremiah 6:16',
      prompt:
        'What is one Hebrew or Greek root word you discovered recently that changed how you picture a familiar Bible passage?',
      cycleDay: 'Day 3 of 7 · Ancient Paths',
      theme: 'Linguistic Discovery & Context',
    },
  ],
  harbor: [
    {
      id: 'harbor-1',
      tierId: 'harbor',
      tierLabel: 'Safe Harbor (Ages 13–18)',
      ageHorizon: 'Ages 13–18 · Safe Harbor & Lament',
      verse:
        '“Out of the depths I cry to You, O Lord! Lord, hear my voice! Let Your ears be attentive to the voice of my pleas for mercy!”',
      scriptureReference: 'Psalm 130:1–2',
      prompt:
        'Faith has never required pretending certainty. What is an honest tension or question you are holding today without an easy answer?',
      cycleDay: 'Day 1 of 7 · Unvarnished Truth & Ethics',
      theme: 'Honest Lament & Freedom from Pretense',
    },
    {
      id: 'harbor-2',
      tierId: 'harbor',
      tierLabel: 'Safe Harbor (Ages 13–18)',
      ageHorizon: 'Ages 13–18 · Safe Harbor & Lament',
      verse:
        '“He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly, to love mercy, and to walk humbly with your God.”',
      scriptureReference: 'Micah 6:8',
      prompt:
        'Where is one place in your school or online world where practicing quiet kindness or defending someone would make a real difference?',
      cycleDay: 'Day 2 of 7 · Justice, Mercy & Action',
      theme: 'Prophetic Compassion & Humility',
    },
    {
      id: 'harbor-3',
      tierId: 'harbor',
      tierLabel: 'Safe Harbor (Ages 13–18)',
      ageHorizon: 'Ages 13–18 · Safe Harbor & Lament',
      verse:
        '“Your name shall no longer be called Jacob, but Israel, for you have striven with God and with men, and have prevailed.”',
      scriptureReference: 'Genesis 32:28',
      prompt:
        'Why do you think Scripture honors wrestling with hard questions rather than demanding blind, silent compliance?',
      cycleDay: 'Day 3 of 7 · Sacred Wrestling',
      theme: 'Autonomous Ownership & Integrity',
    },
  ],
};

interface MilestonePreset {
  id: string;
  tierStageId: string;
  badgeText: string;
  title: string;
  subtitle: string;
  scriptureQuote: string;
  scriptureRef: string;
  tierLabel: string;
  theme: 'cream' | 'charcoal' | 'sage';
}

const MILESTONE_PRESETS: MilestonePreset[] = [
  {
    id: 'tier-seed',
    tierStageId: 'seed',
    badgeText: 'GROWTH TIER · STAGE 01 (SEED)',
    title: 'Planted in Quiet Soil',
    subtitle:
      'Beginning a non-coercive, grace-first rhythm of family scripture and unhurried bedtime peace.',
    scriptureQuote:
      '“Consider how the wild flowers grow. They do not labor or spin.”',
    scriptureRef: 'Luke 12:27',
    tierLabel: 'Seed Tier · 0–24 Growth Points',
    theme: 'cream',
  },
  {
    id: 'tier-sprout',
    tierStageId: 'sprout',
    badgeText: 'GROWTH TIER · STAGE 02 (SPROUT)',
    title: 'First Roots Taking Hold',
    subtitle:
      'Transitioning from simple listening into curious historical discovery and nightly family reflection.',
    scriptureQuote:
      '“He is like a tree planted by streams of water, which yields its fruit in season.”',
    scriptureRef: 'Psalm 1:3',
    tierLabel: 'Sprout Tier · 25–49 Growth Points',
    theme: 'sage',
  },
  {
    id: 'tier-sapling',
    tierStageId: 'sapling',
    badgeText: 'GROWTH TIER · STAGE 03 (SAPLING)',
    title: 'From Sprout to Sapling',
    subtitle:
      'Connecting ancient Near Eastern history, Hebrew root words, and lived resilience across generations.',
    scriptureQuote:
      '“Ask for the ancient paths, ask where the good way is, and walk in it, and you will find rest for your souls.”',
    scriptureRef: 'Jeremiah 6:16',
    tierLabel: 'Sapling Tier · 50–79 Growth Points',
    theme: 'cream',
  },
  {
    id: 'tier-tree',
    tierStageId: 'tree',
    badgeText: 'GROWTH TIER · STAGE 04 (DEEP-ROOTED TREE)',
    title: 'Deep Roots in Ancient Soil',
    subtitle:
      'Sustained engagement across acoustic sanctuary stories, archaeological case files, and honest lament.',
    scriptureQuote:
      '“They will be called oaks of righteousness, a planting of the Lord for the display of His splendor.”',
    scriptureRef: 'Isaiah 61:3',
    tierLabel: 'Tree Tier · 80–99 Growth Points',
    theme: 'sage',
  },
  {
    id: 'tier-canopy',
    tierStageId: 'canopy',
    badgeText: 'GROWTH TIER · STAGE 05 (FLOURISHING CANOPY)',
    title: 'A Shelter Across Generations',
    subtitle:
      'Fifteen years of adaptive biblical literacy—from childhood rest to unshakeable, autonomous faith.',
    scriptureQuote:
      '“One generation commends Your works to another; they tell of Your mighty acts.”',
    scriptureRef: 'Psalm 145:4',
    tierLabel: 'Canopy Tier · 100+ Growth Points',
    theme: 'charcoal',
  },
  {
    id: '12-to-13-harbor',
    tierStageId: 'harbor',
    badgeText: 'INDEPENDENCE MILESTONE · AGE 13',
    title: 'Stepping Into the Safe Harbor',
    subtitle:
      'Crossing from guided childhood discovery into a 100% private, zero-knowledge sanctuary for authentic faith.',
    scriptureQuote:
      '“Your name shall no longer be called Jacob, but Israel, for you have striven with God and with men, and have prevailed.”',
    scriptureRef: 'Genesis 32:28',
    tierLabel: 'Tier 03 · Teen Safe Harbor (Ages 13–18)',
    theme: 'charcoal',
  },
];

const STAGE_ORDER = ['seed', 'sprout', 'sapling', 'tree', 'canopy'];

export default function LongitudinalGrowthSeedSection({
  growthPoints,
  recentActivityLabel,
  engagementLog,
  onEngageContent,
  onSetGrowthPoints,
  activeSectionTab,
  onTabChange,
}: LongitudinalGrowthSeedSectionProps) {
  const [internalTab, setInternalTab] =
    useState<GrowthTrackerSectionTab>('evolution');
  const currentTab = activeSectionTab ?? internalTab;

  const handleSelectTab = (tab: GrowthTrackerSectionTab) => {
    setInternalTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  // Weekly Goal & Sessions state
  const [weeklyGoalTarget, setWeeklyGoalTarget] = useState<number>(3);
  const [weeklyCompletedSessions, setWeeklyCompletedSessions] =
    useState<number>(2);

  // Daily Affirmation tier & prompt cycler state
  const [selectedAffirmationTier, setSelectedAffirmationTier] = useState<
    'bedtime' | 'archive' | 'harbor'
  >('bedtime');
  const [affirmationIndex, setAffirmationIndex] = useState<number>(0);
  const [copiedAffirmation, setCopiedAffirmation] = useState<boolean>(false);

  // Selected stage for inspection in Tab 1
  const [inspectedStageId, setInspectedStageId] = useState<
    GrowthStageInfo['id'] | null
  >(null);

  // Milestone Share Card Studio state (Tab 4)
  const [customPresetId, setCustomPresetId] = useState<string | null>(null);
  const [familySignature, setFamilySignature] = useState<string>(
    'The Miller Family Sanctuary'
  );
  const [isDownloadingPng, setIsDownloadingPng] = useState<boolean>(false);
  const [downloadedSuccess, setDownloadedSuccess] = useState<boolean>(false);
  const [copiedShareText, setCopiedShareText] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const clampedPoints = Math.min(100, Math.max(0, growthPoints));

  const currentStage =
    [...GROWTH_STAGES]
      .reverse()
      .find((stage) => clampedPoints >= stage.minPoints) || GROWTH_STAGES[0];

  const currentStageIndex = GROWTH_STAGES.findIndex(
    (s) => s.id === currentStage.id
  );
  const nextStage =
    currentStageIndex < GROWTH_STAGES.length - 1
      ? GROWTH_STAGES[currentStageIndex + 1]
      : null;

  const stageSpan = Math.max(
    1,
    currentStage.nextPoints - currentStage.minPoints
  );
  const stageProgressPct = nextStage
    ? Math.min(
        100,
        Math.max(
          0,
          Math.round(
            ((clampedPoints - currentStage.minPoints) / stageSpan) * 100
          )
        )
      )
    : 100;
  const pointsToNextStage = nextStage
    ? Math.max(0, currentStage.nextPoints - clampedPoints)
    : 0;

  const inspectedStage =
    GROWTH_STAGES.find((s) => s.id === inspectedStageId) || currentStage;

  const tierAffirmations = INLINE_AFFIRMATIONS[selectedAffirmationTier];
  const activeAffirmation =
    tierAffirmations[affirmationIndex % tierAffirmations.length];

  const matchingPresetForStage =
    MILESTONE_PRESETS.find((p) => p.tierStageId === currentStage.id) ||
    MILESTONE_PRESETS[2];
  const selectedPresetId = customPresetId ?? matchingPresetForStage.id;
  const activePreset =
    MILESTONE_PRESETS.find((p) => p.id === selectedPresetId) ||
    matchingPresetForStage;

  const activeStageIndex = Math.max(
    0,
    STAGE_ORDER.indexOf(
      activePreset.tierStageId === 'harbor'
        ? currentStage.id
        : activePreset.tierStageId
    )
  );

  const renderBotanicalStageIcon = (
    stageId: GrowthStageInfo['id'],
    sizeClass = 'w-5 h-5'
  ) => {
    if (stageId === 'seed')
      return <Sprout className={`${sizeClass} text-[#D97706]`} />;
    if (stageId === 'sprout')
      return <Flower2 className={`${sizeClass} text-[#84CC16]`} />;
    if (stageId === 'sapling')
      return <Sprout className={`${sizeClass} text-[#10B981]`} />;
    if (stageId === 'tree')
      return <TreeDeciduous className={`${sizeClass} text-[#F59E0B]`} />;
    return <Trees className={`${sizeClass} text-[#FBBF24]`} />;
  };

  const handleCopyAffirmation = async () => {
    const textToCopy = `${activeAffirmation.verse} — ${activeAffirmation.scriptureReference}\nReflection Prompt: ${activeAffirmation.prompt}`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
      }
      setCopiedAffirmation(true);
      setTimeout(() => setCopiedAffirmation(false), 2400);
    } catch {
      setCopiedAffirmation(true);
      setTimeout(() => setCopiedAffirmation(false), 2400);
    }
  };

  const handleCycleAffirmation = () => {
    setAffirmationIndex((prev) => prev + 1);
    onEngageContent(
      5,
      `Reflected on Daily Affirmation (${activeAffirmation.scriptureReference})`
    );
  };

  const drawWrappedText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ): number => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
    return currentY + lineHeight;
  };

  const handleDownloadSocialImage = () => {
    setIsDownloadingPng(true);
    try {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1350;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const bgColors = {
        cream: '#F9F6F0',
        charcoal: '#1A1A1A',
        sage: '#243028',
      };
      const textPrimary = {
        cream: '#1A1A1A',
        charcoal: '#F9F6F0',
        sage: '#F9F6F0',
      };
      const textSecondary = {
        cream: '#57534E',
        charcoal: '#A8A29E',
        sage: '#CBD5E1',
      };
      const accentColor = '#D97706';

      ctx.fillStyle = bgColors[activePreset.theme];
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle =
        activePreset.theme === 'cream'
          ? '#E5DEC9'
          : 'rgba(249, 246, 240, 0.14)';
      ctx.lineWidth = 3;
      ctx.strokeRect(56, 56, canvas.width - 112, canvas.height - 112);

      const grad = ctx.createRadialGradient(900, 220, 20, 900, 220, 380);
      grad.addColorStop(0, 'rgba(217, 119, 6, 0.20)');
      grad.addColorStop(1, 'rgba(217, 119, 6, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const ringCount = activeStageIndex + 2;
      for (let r = 1; r <= ringCount; r++) {
        ctx.beginPath();
        ctx.arc(880, 230, r * 28, 0, Math.PI * 2);
        ctx.strokeStyle =
          r === ringCount
            ? 'rgba(217, 119, 6, 0.45)'
            : 'rgba(217, 119, 6, 0.18)';
        ctx.lineWidth = r === ringCount ? 2.5 : 1.5;
        ctx.stroke();
      }

      ctx.fillStyle = accentColor;
      ctx.font = '600 22px monospace';
      ctx.fillText('GROW IN THE WORD · SANCTUARY MILESTONE', 110, 145);

      ctx.fillStyle = textSecondary[activePreset.theme];
      ctx.font = '500 20px sans-serif';
      ctx.fillText(
        `CURRENT GROWTH TIER: ${currentStage.name.toUpperCase()} (${clampedPoints} PTS)`,
        110,
        185
      );

      ctx.fillStyle =
        activePreset.theme === 'cream'
          ? '#F2ECE1'
          : 'rgba(255, 255, 255, 0.07)';
      ctx.fillRect(110, 240, 560, 52);
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(110, 240, 560, 52);

      ctx.fillStyle = accentColor;
      ctx.font = '600 19px monospace';
      ctx.fillText(activePreset.badgeText, 134, 273);

      ctx.fillStyle = textPrimary[activePreset.theme];
      ctx.font = '400 66px Georgia, serif';
      let nextY = drawWrappedText(
        ctx,
        activePreset.title,
        110,
        385,
        860,
        80
      );

      ctx.fillStyle = textSecondary[activePreset.theme];
      ctx.font = '400 30px sans-serif';
      nextY = drawWrappedText(
        ctx,
        activePreset.subtitle,
        110,
        nextY + 24,
        840,
        46
      );

      ctx.strokeStyle =
        activePreset.theme === 'cream'
          ? '#E5DEC9'
          : 'rgba(249, 246, 240, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(110, nextY + 36);
      ctx.lineTo(970, nextY + 36);
      ctx.stroke();

      ctx.fillStyle = textPrimary[activePreset.theme];
      ctx.font = 'italic 36px Georgia, serif';
      const quoteEndY = drawWrappedText(
        ctx,
        activePreset.scriptureQuote,
        110,
        nextY + 108,
        840,
        54
      );

      ctx.fillStyle = accentColor;
      ctx.font = '600 23px monospace';
      ctx.fillText(`— ${activePreset.scriptureRef}`, 110, quoteEndY + 20);

      const barY = 1045;
      ctx.fillStyle = textSecondary[activePreset.theme];
      ctx.font = '600 18px monospace';
      ctx.fillText('EVOLUTIONARY GROWTH TRAJECTORY', 110, barY - 20);

      STAGE_ORDER.forEach((stageKey, idx) => {
        const segX = 110 + idx * 172;
        const segW = 158;
        const isReached = idx <= activeStageIndex;
        ctx.fillStyle = isReached
          ? accentColor
          : activePreset.theme === 'cream'
          ? '#E5DEC9'
          : 'rgba(255,255,255,0.12)';
        ctx.fillRect(segX, barY, segW, 10);

        ctx.fillStyle = isReached
          ? textPrimary[activePreset.theme]
          : textSecondary[activePreset.theme];
        ctx.font = isReached ? '600 17px monospace' : '400 17px monospace';
        ctx.fillText(stageKey.toUpperCase(), segX, barY + 34);
      });

      const footerY = 1175;
      ctx.fillStyle =
        activePreset.theme === 'cream'
          ? '#F2ECE1'
          : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(110, footerY - 52, 860, 120);

      ctx.fillStyle = textPrimary[activePreset.theme];
      ctx.font = '600 25px sans-serif';
      ctx.fillText(
        familySignature || 'Grow In The Word Sanctuary',
        142,
        footerY - 2
      );

      ctx.fillStyle = textSecondary[activePreset.theme];
      ctx.font = '500 21px monospace';
      ctx.fillText(
        `${activePreset.tierLabel}  ·  ${clampedPoints} Pts  ·  ${weeklyCompletedSessions}/${weeklyGoalTarget} Wk Rhythm`,
        142,
        footerY + 36
      );

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `grow-in-the-word-${currentStage.id}-milestone.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadedSuccess(true);
      onEngageContent(10, `Exported ${currentStage.name} Milestone Card`);
      setTimeout(() => setDownloadedSuccess(false), 3000);
    } finally {
      setIsDownloadingPng(false);
    }
  };

  const handleCopyMilestoneText = async () => {
    const summary = `${activePreset.title} (${currentStage.name} · ${clampedPoints} Growth Pts) — ${activePreset.scriptureQuote} (${activePreset.scriptureRef}) · Grow In The Word`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(summary);
      }
      setCopiedShareText(true);
      setTimeout(() => setCopiedShareText(false), 2500);
    } catch {
      setCopiedShareText(true);
      setTimeout(() => setCopiedShareText(false), 2500);
    }
  };

  return (
    <section
      id="growth-seed-tracker"
      aria-labelledby="growth-seed-section-heading"
      className="w-full max-w-full min-w-0 overflow-x-clip py-14 sm:py-20 lg:py-28 border-b border-[#E5DEC9] bg-[#F2ECE1]/55 transition-colors duration-500"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 min-w-0">
        {/* Top Section Header & Live Stage Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end min-w-0">
          <div className="lg:col-span-7 space-y-3.5 min-w-0">
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E5DEC9] text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#92400E]">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
              <span>Grow In The Word · Longitudinal Growth Seed Tracker</span>
            </div>

            <h2
              id="growth-seed-section-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#1C1917]"
              style={{
                fontFamily: 'var(--font-display), serif',
                textWrap: 'balance',
              }}
            >
              Fifteen years of unhurried formation—explored in one responsive
              studio.
            </h2>

            <p className="text-sm sm:text-base text-[#44403C] leading-relaxed max-w-2xl">
              Every informative view from the Longitudinal Growth Seed
              Tracker—botanical stage evolution, how points are earned, weekly
              reading goals, daily tiered affirmations, Recharts &amp; D3
              analytics, and social milestone cards—is available right here
              inline, adapting smoothly across mobile, tablet, and desktop
              screens.
            </p>
          </div>

          {/* Live Stage Status Card */}
          <div className="lg:col-span-5 rounded-2xl bg-[#1C1917] text-[#FAF7F2] border border-[#292524] p-4 sm:p-5 shadow-lg space-y-3.5 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-[#292524] border border-[#D97706] flex items-center justify-center shrink-0">
                  {renderBotanicalStageIcon(currentStage.id, 'w-6 h-6')}
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#FBBF24] truncate">
                    Stage 0{currentStage.stageNumber} of 05 ·{' '}
                    {currentStage.ageHorizon}
                  </div>
                  <div
                    className="text-lg sm:text-xl font-normal text-[#FAF7F2] truncate"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    {currentStage.name}
                  </div>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-[#292524] border border-[#36312E] text-right shrink-0">
                <div className="text-[10px] font-mono uppercase text-[#A8A29E]">
                  Growth Score
                </div>
                <div className="text-sm sm:text-base font-mono font-bold text-[#FBBF24] tabular-nums">
                  {clampedPoints} / 100 pts
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#D6D3D1]">
                <span className="truncate">
                  {nextStage
                    ? `${pointsToNextStage} pts to ${nextStage.name}`
                    : 'Canopy Stage Reached (100%)'}
                </span>
                <span className="text-[#FBBF24] tabular-nums shrink-0">
                  {stageProgressPct}% Stage Progress
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#292524] overflow-hidden">
                <motion.div
                  initial={{width: 0}}
                  animate={{width: `${Math.max(8, clampedPoints)}%`}}
                  transition={{duration: 0.45, ease: 'easeOut'}}
                  className="h-full rounded-full bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#10B981]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Interactive Studio Navigation Bar (4 Core Windows Turned Into Inline Interactive Views) */}
        <div
          role="tablist"
          aria-label="Longitudinal Growth Seed Tracker Interactive Views"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-[#FAF7F2] border border-[#E5DEC9] shadow-xs min-w-0"
        >
          {[
            {
              id: 'evolution' as const,
              step: '01',
              title: 'Stage Evolution & Earn Guide',
              subtitle: '5 Botanical Tiers & 3 Formation Pillars',
              icon: Sprout,
            },
            {
              id: 'rhythm' as const,
              step: '02',
              title: 'Weekly Rhythm & Affirmations',
              subtitle: 'Low-Pressure Goals & Daily Verses',
              icon: Target,
            },
            {
              id: 'analytics' as const,
              step: '03',
              title: 'Recharts & 15-Year D3 Trajectory',
              subtitle: 'Weekly Velocity & Milestone History',
              icon: TrendingUp,
            },
            {
              id: 'milestone' as const,
              step: '04',
              title: 'Milestone Keepsake Card Studio',
              subtitle: '4:5 Social Preview & PNG Export',
              icon: Share2,
            },
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectTab(tab.id)}
                className={`group relative w-full text-left p-3 sm:p-4 rounded-xl border transition-all duration-300 ease-out cursor-pointer flex items-start gap-3 min-w-0 ${
                  isActive
                    ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] shadow-md'
                    : 'bg-[#F2ECE1]/60 hover:bg-[#F2ECE1] text-[#1C1917] border-transparent hover:border-[#D6CEBF]'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#D97706] text-[#1C1917]'
                      : 'bg-[#FAF7F2] text-[#92400E] border border-[#E5DEC9]'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider ${
                        isActive ? 'text-[#FBBF24]' : 'text-[#92400E]'
                      }`}
                    >
                      Window {tab.step}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#D97706] shrink-0" />
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold truncate mt-0.5">
                    {tab.title}
                  </div>
                  <div
                    className={`text-[11px] truncate mt-0.5 ${
                      isActive ? 'text-[#D6D3D1]' : 'text-[#57534E]'
                    }`}
                  >
                    {tab.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Smooth Page/View Transition Container */}
        <AnimatePresence mode="wait">
          {/* TAB 01: STAGE EVOLUTION & HOW GROWTH POINTS ARE EARNED */}
          {currentTab === 'evolution' && (
            <motion.div
              key="tab-evolution"
              initial={{opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
              className="space-y-6 sm:space-y-8 min-w-0"
            >
              {/* 5-Stage Interactive Botanical Trajectory (Ages 3 -> 18) */}
              <div className="rounded-2xl bg-[#FAF7F2] border border-[#E5DEC9] p-4 sm:p-6 lg:p-8 space-y-6 shadow-xs min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5DEC9] pb-4">
                  <div className="min-w-0">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#92400E]">
                      Interactive Decade Trajectory · Ages 3 to 18
                    </div>
                    <h3
                      className="text-xl sm:text-2xl font-normal text-[#1C1917] mt-0.5"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      Click any Botanical Stage to inspect or simulate its growth
                      threshold
                    </h3>
                  </div>
                  <span className="text-xs text-[#57534E] shrink-0">
                    Zero streak resets · Points never expire
                  </span>
                </div>

                {/* Responsive 5-Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 min-w-0">
                  {GROWTH_STAGES.map((stage) => {
                    const isUnlocked = clampedPoints >= stage.minPoints;
                    const isCurrent = stage.id === currentStage.id;
                    const isInspected = stage.id === inspectedStage.id;

                    return (
                      <div
                        key={stage.id}
                        onClick={() => setInspectedStageId(stage.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setInspectedStageId(stage.id);
                          }
                        }}
                        className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between gap-3 min-w-0 ${
                          isCurrent
                            ? 'bg-[#1C1917] text-[#FAF7F2] border-[#D97706] ring-2 ring-[#D97706]/50 shadow-md'
                            : isInspected
                            ? 'bg-[#F2ECE1] text-[#1C1917] border-[#D97706]'
                            : isUnlocked
                            ? 'bg-[#F2ECE1]/70 text-[#1C1917] border-[#D6CEBF] hover:border-[#D97706]/60'
                            : 'bg-[#FAF7F2] text-[#57534E] border-[#E5DEC9] hover:bg-[#F2ECE1]/40'
                        }`}
                      >
                        <div className="space-y-2 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#292524] flex items-center justify-center shrink-0">
                              {renderBotanicalStageIcon(stage.id, 'w-4 h-4')}
                            </div>
                            <span
                              className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                                isCurrent
                                  ? 'bg-[#D97706] text-[#1C1917]'
                                  : 'bg-[#E5DEC9]/60 text-[#57534E]'
                              }`}
                            >
                              {stage.minPoints}+ pts
                            </span>
                          </div>

                          <div className="min-w-0">
                            <div
                              className={`text-[10px] font-mono uppercase tracking-wider ${
                                isCurrent ? 'text-[#FBBF24]' : 'text-[#92400E]'
                              }`}
                            >
                              Stage 0{stage.stageNumber} ·{' '}
                              {stage.ageHorizon.split('·')[0]}
                            </div>
                            <h4 className="text-sm font-semibold leading-snug mt-0.5">
                              {stage.name}
                            </h4>
                          </div>

                          <p
                            className={`text-xs leading-relaxed ${
                              isCurrent ? 'text-[#D6D3D1]' : 'text-[#57534E]'
                            }`}
                          >
                            {stage.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-current/10 flex items-center justify-between gap-2 text-[11px] font-mono">
                          <span>
                            {isCurrent
                              ? 'Active Stage'
                              : isUnlocked
                              ? 'Unlocked'
                              : 'Future Horizon'}
                          </span>
                          {onSetGrowthPoints && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSetGrowthPoints(
                                  Math.max(5, stage.minPoints),
                                  `Previewed Stage 0${stage.stageNumber}: ${stage.name}`
                                );
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                                isCurrent
                                  ? 'bg-[#292524] text-[#FBBF24] hover:bg-[#36312E]'
                                  : 'bg-[#1C1917] text-[#FAF7F2] hover:bg-[#292524]'
                              }`}
                            >
                              Preview Stage
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 3 Core Formation Pillars (Reading, Exploring, Journaling) */}
                <div className="pt-4 border-t border-[#E5DEC9] space-y-4 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4
                      className="text-lg sm:text-xl font-normal text-[#1C1917]"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      How Growth Points Are Earned Across the 3 Life-Stage Tiers
                    </h4>
                    <span className="text-xs text-[#57534E]">
                      Tap any pillar below to nourish your Growth Seed
                      immediately
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0">
                    {PILLAR_BREAKDOWN.map((pillar) => {
                      const IconComponent = pillar.icon;
                      return (
                        <div
                          key={pillar.id}
                          className="p-4 sm:p-5 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] flex flex-col justify-between space-y-4 min-w-0 transition-all duration-300 hover:border-[#D97706]/60"
                        >
                          <div className="space-y-2.5 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <div className="w-9 h-9 rounded-lg bg-[#1C1917] text-[#D97706] flex items-center justify-center shrink-0">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <span className="px-2.5 py-0.5 rounded bg-[#1C1917] text-[#FBBF24] font-mono text-[11px] font-semibold">
                                {pillar.pointsBadge}
                              </span>
                            </div>

                            <div className="min-w-0">
                              <div className="text-[10px] font-mono uppercase tracking-wider text-[#92400E]">
                                {pillar.ageTier}
                              </div>
                              <h5 className="text-sm sm:text-base font-semibold text-[#1C1917] mt-0.5">
                                {pillar.category}
                              </h5>
                            </div>

                            <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                              {pillar.description}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              onEngageContent(
                                pillar.samplePoints,
                                pillar.sampleActionLabel
                              )
                            }
                            className="w-full py-2.5 px-3.5 rounded-xl bg-[#FAF7F2] hover:bg-[#1C1917] text-[#1C1917] hover:text-[#FAF7F2] border border-[#D6CEBF] text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                            <span className="truncate">
                              {pillar.sampleActionLabel}
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5 Quick-Nourish Micro-Actions (Previously in the Floating Seed Tooltip Pop-up) */}
                <div className="pt-4 border-t border-[#E5DEC9] space-y-3 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#92400E] font-semibold">
                      5 Everyday Ways to Nourish Your Seed (Interactive Quick
                      Log)
                    </span>
                    <span className="text-xs text-[#57534E]">
                      Previously tucked inside the bottom seed popover—now
                      accessible full-width
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 min-w-0">
                    {QUICK_NOURISH_ACTIONS.map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            onEngageContent(
                              item.points,
                              `Nourished Seed: ${item.title} (${item.badge})`
                            )
                          }
                          className="p-3.5 rounded-xl bg-[#FAF7F2] hover:bg-[#1C1917] text-[#1C1917] hover:text-[#FAF7F2] border border-[#E5DEC9] hover:border-[#1C1917] text-left transition-all duration-200 flex flex-col justify-between gap-2.5 cursor-pointer group min-w-0"
                        >
                          <div className="flex items-center justify-between gap-2 w-full">
                            <div className="w-7 h-7 rounded-lg bg-[#F2ECE1] group-hover:bg-[#292524] flex items-center justify-center shrink-0">
                              <IconComponent className="w-3.5 h-3.5 text-[#D97706]" />
                            </div>
                            <span className="text-[11px] font-mono font-semibold text-[#92400E] group-hover:text-[#FBBF24] bg-[#F2ECE1] group-hover:bg-[#292524] px-2 py-0.5 rounded">
                              {item.badge}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold leading-snug">
                              {item.title}
                            </div>
                            <p className="text-[11px] text-[#57534E] group-hover:text-[#D6D3D1] line-clamp-2 mt-1 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 02: WEEKLY READING RHYTHM & DAILY AFFIRMATION STUDIO */}
          {currentTab === 'rhythm' && (
            <motion.div
              key="tab-rhythm"
              initial={{opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-w-0"
            >
              {/* Left 6 Columns: Personalized Weekly Reading Goal Setter */}
              <div className="lg:col-span-6 rounded-2xl bg-[#FAF7F2] border border-[#E5DEC9] p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-6 shadow-xs min-w-0">
                <div className="space-y-4 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5DEC9] pb-3.5">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#92400E] font-semibold">
                      <Target className="w-4 h-4 text-[#D97706] shrink-0" />
                      <span>Personalized Weekly Reading Rhythm</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#4A5D4E]/15 text-[#4A5D4E] text-[11px] font-mono font-semibold">
                      Zero Streak Guilt
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3
                      className="text-xl sm:text-2xl font-normal text-[#1C1917]"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      Choose a gentle weekly cadence for your household
                    </h3>
                    <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                      Unlike gamified apps that punish missed days with broken
                      streaks, your Weekly Rhythm simply celebrates every quiet
                      session you complete.
                    </p>
                  </div>

                  {/* Preset Cadence Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    {WEEKLY_GOAL_PRESETS.map((preset) => {
                      const active = weeklyGoalTarget === preset.target;
                      return (
                        <button
                          key={preset.target}
                          type="button"
                          onClick={() => {
                            setWeeklyGoalTarget(preset.target);
                            setWeeklyCompletedSessions((prev) =>
                              Math.min(prev, preset.target)
                            );
                            onEngageContent(
                              5,
                              `Set Weekly Reading Rhythm to ${preset.target} sessions/week`
                            );
                          }}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            active
                              ? 'bg-[#1C1917] text-[#FAF7F2] border-[#D97706] shadow-xs'
                              : 'bg-[#F2ECE1]/70 text-[#1C1917] border-[#E5DEC9] hover:border-[#D97706]/50'
                          }`}
                        >
                          <div className="text-xs font-semibold">
                            {preset.label}
                          </div>
                          <div
                            className={`text-[11px] mt-1 leading-snug ${
                              active ? 'text-[#D6D3D1]' : 'text-[#57534E]'
                            }`}
                          >
                            {preset.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Interactive Session Nodes */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#1C1917]">
                        Tap a session node to log or update this week’s progress:
                      </span>
                      <span className="text-xs font-mono font-semibold text-[#92400E]">
                        {weeklyCompletedSessions} of {weeklyGoalTarget} sessions
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {Array.from({length: weeklyGoalTarget}).map((_, idx) => {
                        const isDone = idx < weeklyCompletedSessions;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setWeeklyCompletedSessions(idx + 1);
                              onEngageContent(
                                15,
                                `Completed Weekly Reading Session (${
                                  idx + 1
                                }/${weeklyGoalTarget})`
                              );
                            }}
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                              isDone
                                ? 'bg-[#1C1917] border-[#D97706] text-[#FBBF24] shadow-sm'
                                : 'bg-[#FAF7F2] border-[#D6CEBF] text-[#57534E] hover:border-[#D97706]'
                            }`}
                          >
                            {isDone ? (
                              renderBotanicalStageIcon(
                                currentStage.id,
                                'w-5 h-5'
                              )
                            ) : (
                              <span className="text-xs font-mono font-semibold">
                                0{idx + 1}
                              </span>
                            )}
                            <span className="text-[9px] font-mono uppercase">
                              {isDone ? 'Done' : 'Open'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5DEC9] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-[#57534E]">
                    {weeklyCompletedSessions >= weeklyGoalTarget
                      ? 'Weekly rhythm complete! Your Growth Seed is flourishing.'
                      : 'Each logged session adds +15 to +20 pts to your longitudinal seed.'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setWeeklyCompletedSessions((prev) =>
                        Math.min(weeklyGoalTarget, prev + 1)
                      );
                      onEngageContent(
                        20,
                        'Logged Quiet Family Scripture Session (+20 pts)'
                      );
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-[#1C1917] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log Quiet Session (+20 pts)</span>
                  </button>
                </div>
              </div>

              {/* Right 6 Columns: Daily Tiered Affirmation & Family Reflection Studio */}
              <div className="lg:col-span-6 rounded-2xl bg-[#1C1917] text-[#FAF7F2] border border-[#292524] p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-6 shadow-md min-w-0">
                <div className="space-y-4 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#292524] pb-3.5">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FBBF24]">
                      <Feather className="w-4 h-4 text-[#D97706] shrink-0" />
                      <span>Daily Sanctuary Affirmation &amp; Prompt</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#A8A29E]">
                      {activeAffirmation.cycleDay}
                    </span>
                  </div>

                  {/* Age Tier Filter Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      {id: 'bedtime' as const, label: 'Bedtime (Ages 3–6)'},
                      {id: 'archive' as const, label: 'Archive (Ages 8–12)'},
                      {id: 'harbor' as const, label: 'Safe Harbor (Ages 13–18)'},
                    ].map((tier) => {
                      const active = selectedAffirmationTier === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => {
                            setSelectedAffirmationTier(tier.id);
                            setAffirmationIndex(0);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#D97706] text-[#1C1917]'
                              : 'bg-[#292524] text-[#D6D3D1] hover:text-[#FAF7F2]'
                          }`}
                        >
                          {tier.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Verse & Reflection Card */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#24211E] border border-[#36312E] space-y-4">
                    <blockquote
                      className="text-lg sm:text-xl font-normal text-[#FAF7F2] leading-relaxed"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      {activeAffirmation.verse}
                    </blockquote>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#FBBF24]">
                      <span>— {activeAffirmation.scriptureReference}</span>
                      <span className="text-[#A8A29E] font-sans">
                        {activeAffirmation.theme}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#1A1A1A] border border-[#292524] space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#D97706]">
                        Today’s Formation Conversation Prompt
                      </div>
                      <p className="text-xs sm:text-sm text-[#E7E5E4] leading-relaxed">
                        “{activeAffirmation.prompt}”
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: Copy & Cycle */}
                <div className="pt-3 border-t border-[#292524] flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleCopyAffirmation}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#292524] hover:bg-[#36312E] text-xs font-semibold text-[#E7E5E4] transition-colors cursor-pointer"
                  >
                    {copiedAffirmation ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>Copied Verse &amp; Prompt</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>Copy Verse &amp; Prompt</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCycleAffirmation}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D97706]/20 hover:bg-[#D97706]/35 border border-[#D97706]/50 text-xs font-semibold text-[#FDE68A] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>
                      Next Reflection (
                      {(affirmationIndex % tierAffirmations.length) + 1}/
                      {tierAffirmations.length}) · +5 pts
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 03: WEEKLY RECHARTS & 15-YEAR D3 TRAJECTORY ANALYTICS */}
          {currentTab === 'analytics' && (
            <motion.div
              key="tab-analytics"
              initial={{opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
              className="space-y-6 min-w-0"
            >
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start min-w-0">
                {/* Left 6 Cols on XL: Weekly Engagement Recharts */}
                <div className="xl:col-span-6 rounded-2xl bg-[#1A1A1A] text-[#F9F6F0] border border-[#292524] p-4 sm:p-6 shadow-md min-w-0 overflow-hidden">
                  <WeeklyEngagementRecharts
                    currentPoints={clampedPoints}
                    weeklyGoal={weeklyGoalTarget}
                    weeklyCompleted={weeklyCompletedSessions}
                    onOpenShareModal={() => handleSelectTab('milestone')}
                  />
                </div>

                {/* Right 6 Cols on XL: Growth History D3 Trajectory */}
                <div className="xl:col-span-6 rounded-2xl bg-[#1A1A1A] text-[#F9F6F0] border border-[#292524] p-4 sm:p-6 shadow-md min-w-0 overflow-hidden">
                  <GrowthHistoryD3Chart
                    currentPoints={clampedPoints}
                    currentStage={currentStage}
                    onOpenShareModal={() => handleSelectTab('milestone')}
                  />
                </div>
              </div>

              {/* Recent Household Activity & Milestone Feed */}
              <div className="rounded-2xl bg-[#FAF7F2] border border-[#E5DEC9] p-4 sm:p-6 space-y-4 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#92400E] font-semibold">
                    <Activity className="w-4 h-4 text-[#D97706]" />
                    <span>Session Formation Log (Live Activity Stream)</span>
                  </div>
                  <span className="text-xs text-[#57534E]">
                    Latest: <strong>{recentActivityLabel}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 min-w-0">
                  {engagementLog.map((entry, idx) => (
                    <div
                      key={`${entry}-${idx}`}
                      className="p-3 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] flex items-center gap-2.5 text-xs text-[#1C1917] min-w-0"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#4A5D4E] shrink-0" />
                      <span className="truncate">{entry}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 04: INLINE SOCIAL-READY MILESTONE CARD GENERATOR */}
          {currentTab === 'milestone' && (
            <motion.div
              key="tab-milestone"
              initial={{opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
              className="rounded-2xl bg-[#FAF7F2] border border-[#E5DEC9] p-5 sm:p-6 lg:p-8 shadow-xs min-w-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start min-w-0">
                {/* Left 6 Columns: Live 4:5 Social Milestone Card Preview */}
                <div className="lg:col-span-6 space-y-3 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E]">
                    <span className="font-semibold text-[#1C1917] flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#D97706]" />
                      <span>
                        Interactive Milestone Keepsake Card (4:5 Social Ratio)
                      </span>
                    </span>
                    <span className="font-mono text-[11px] text-[#92400E]">
                      1080 × 1350 High-Res PNG
                    </span>
                  </div>

                  <motion.div
                    key={`${activePreset.id}-${activePreset.theme}`}
                    layout
                    initial={{opacity: 0.85, scale: 0.98}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.25}}
                    className={`relative rounded-2xl p-5 sm:p-7 border shadow-lg transition-colors overflow-hidden flex flex-col justify-between min-h-[390px] sm:min-h-[430px] min-w-0 ${
                      activePreset.theme === 'cream'
                        ? 'bg-[#F9F6F0] text-[#1A1A1A] border-[#E5DEC9]'
                        : activePreset.theme === 'sage'
                        ? 'bg-[#243028] text-[#F9F6F0] border-[#3A4D3F]'
                        : 'bg-[#1A1A1A] text-[#F9F6F0] border-[#292524]'
                    }`}
                  >
                    <div className="space-y-3 relative z-10 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="text-[10px] font-mono uppercase tracking-widest text-[#D97706] font-semibold">
                            GROW IN THE WORD · SANCTUARY MILESTONE
                          </div>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold border border-[#D97706]/50 bg-[#D97706]/10 text-[#D97706] max-w-full">
                            <Sprout className="w-3 h-3 shrink-0" />
                            <span className="truncate">
                              {activePreset.badgeText}
                            </span>
                          </div>
                        </div>

                        <div className="w-11 h-11 rounded-xl border border-[#D97706]/40 bg-[#D97706]/10 flex items-center justify-center shrink-0">
                          {renderBotanicalStageIcon(currentStage.id, 'w-5 h-5')}
                        </div>
                      </div>

                      <h3
                        className="text-2xl sm:text-3xl font-normal leading-tight pt-1"
                        style={{fontFamily: 'var(--font-display), serif'}}
                      >
                        {activePreset.title}
                      </h3>

                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          activePreset.theme === 'cream'
                            ? 'text-[#57534E]'
                            : 'text-[#D6D3D1]'
                        }`}
                      >
                        {activePreset.subtitle}
                      </p>
                    </div>

                    <div className="my-5 pt-4 border-t border-current/15 space-y-3 relative z-10 min-w-0">
                      <blockquote
                        className="text-sm sm:text-base italic leading-relaxed"
                        style={{fontFamily: 'var(--font-display), serif'}}
                      >
                        {activePreset.scriptureQuote}
                      </blockquote>
                      <div className="text-[11px] font-mono text-[#D97706] font-semibold">
                        — {activePreset.scriptureRef}
                      </div>

                      <div className="pt-2 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider opacity-75">
                          <span>Growth Tier Trajectory</span>
                          <span className="text-[#D97706] font-semibold">
                            Stage {activeStageIndex + 1} of 5 ·{' '}
                            {currentStage.name}
                          </span>
                        </div>
                        <div className="grid grid-cols-5 gap-1.5">
                          {STAGE_ORDER.map((stageKey, idx) => {
                            const reached = idx <= activeStageIndex;
                            return (
                              <div key={stageKey} className="space-y-1">
                                <div
                                  className={`h-1.5 rounded-full ${
                                    reached ? 'bg-[#D97706]' : 'bg-current/15'
                                  }`}
                                />
                                <div
                                  className={`text-[9px] font-mono uppercase text-center truncate ${
                                    reached
                                      ? 'text-[#D97706] font-semibold'
                                      : 'opacity-50'
                                  }`}
                                >
                                  {stageKey}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-3.5 rounded-xl border border-current/10 flex items-center justify-between gap-2 text-xs relative z-10 min-w-0 ${
                        activePreset.theme === 'cream'
                          ? 'bg-[#F2ECE1]'
                          : 'bg-white/5'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="font-semibold truncate">
                          {familySignature || 'Grow In The Word Sanctuary'}
                        </div>
                        <div className="text-[11px] font-mono opacity-75 truncate">
                          {activePreset.tierLabel}
                        </div>
                      </div>
                      <div className="text-right font-mono text-[11px] text-[#D97706] font-semibold shrink-0">
                        <div>{clampedPoints} Pts</div>
                        <div>
                          {weeklyCompletedSessions}/{weeklyGoalTarget} Wk
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <canvas ref={canvasRef} className="hidden" />
                </div>

                {/* Right 6 Columns: Customization & One-Click Export */}
                <div className="lg:col-span-6 space-y-5 min-w-0">
                  <div className="space-y-2.5 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                        1. Select Growth Tier or Life-Stage Milestone
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setCustomPresetId(matchingPresetForStage.id)
                        }
                        className="text-[11px] font-mono text-[#92400E] hover:underline cursor-pointer"
                      >
                        Reset to Active Stage ({currentStage.name})
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 min-w-0">
                      {MILESTONE_PRESETS.map((preset) => {
                        const active = preset.id === selectedPresetId;
                        const isUserCurrentStage =
                          preset.tierStageId === currentStage.id;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => setCustomPresetId(preset.id)}
                            className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-1 min-w-0 ${
                              active
                                ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] shadow-xs'
                                : 'bg-[#F2ECE1]/60 text-[#1C1917] border-[#E5DEC9] hover:bg-[#F2ECE1]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1 w-full">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[#D97706] font-semibold truncate">
                                {preset.tierStageId.toUpperCase()}
                              </span>
                              {isUserCurrentStage && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#D97706]/20 text-[#D97706] font-semibold shrink-0">
                                  Active
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-semibold truncate">
                              {preset.title}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1.5 min-w-0">
                    <label
                      htmlFor="inline-milestone-signature"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#57534E]"
                    >
                      2. Personalize Card Footer Signature
                    </label>
                    <input
                      id="inline-milestone-signature"
                      type="text"
                      maxLength={42}
                      value={familySignature}
                      onChange={(e) => setFamilySignature(e.target.value)}
                      placeholder="e.g., The Miller Family Sanctuary"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D6CEBF] text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                    />
                    <p className="text-[11px] text-[#57534E]">
                      Zero private journal contents or child personal data are
                      ever included on shared milestone cards.
                    </p>
                  </div>

                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={handleDownloadSocialImage}
                      disabled={isDownloadingPng}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-[#1C1917] font-semibold text-xs transition-colors cursor-pointer shadow-xs"
                    >
                      {downloadedSuccess ? (
                        <>
                          <Check className="w-4 h-4 shrink-0" />
                          <span className="truncate">Downloaded PNG Card!</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 shrink-0" />
                          <span className="truncate">
                            {isDownloadingPng
                              ? 'Generating PNG...'
                              : 'Download 4:5 Milestone PNG'}
                          </span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyMilestoneText}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#F2ECE1] hover:bg-[#E5DEC9] text-[#1C1917] border border-[#D6CEBF] font-semibold text-xs transition-colors cursor-pointer"
                    >
                      {copiedShareText ? (
                        <>
                          <Check className="w-4 h-4 text-[#4A5D4E] shrink-0" />
                          <span className="truncate">Copied Summary!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4 text-[#92400E] shrink-0" />
                          <span className="truncate">
                            Copy Milestone Summary
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
