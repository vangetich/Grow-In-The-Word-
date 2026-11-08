'use client';

import React, {useMemo, useState, useRef, useEffect} from 'react';
import * as d3 from 'd3';
import {motion, AnimatePresence} from 'motion/react';
import {
  TrendingUp,
  Award,
  Calendar,
  Sparkles,
  Info,
  CheckCircle2,
  Flower2,
  TreeDeciduous,
  Sprout,
  Trees,
} from 'lucide-react';
import {GrowthStageInfo, GROWTH_STAGES} from '@/components/SanctuaryDashboardBar';

export interface HistoryDataPoint {
  id: string;
  dayLabel: string;
  dateStr: string;
  cumulativePoints: number;
  activityLabel: string;
  category: 'bedtime' | 'archive' | 'harbor' | 'reflection' | 'goal';
  milestoneReached?: 'sprout' | 'sapling' | 'tree' | 'canopy';
  milestoneTitle?: string;
  reflectionSnippet?: string;
}

export const DEFAULT_GROWTH_HISTORY: HistoryDataPoint[] = [
  {
    id: 'hp-1',
    dayLabel: 'Day 1',
    dateStr: 'Oct 15',
    cumulativePoints: 8,
    activityLabel: 'Evening Psalm 23 Bedtime Narration',
    category: 'bedtime',
    reflectionSnippet: 'Quiet 2100K bedtime listen with child before sleep.',
  },
  {
    id: 'hp-2',
    dayLabel: 'Day 3',
    dateStr: 'Oct 18',
    cumulativePoints: 18,
    activityLabel: 'Audio Bookmark saved: “Still Waters”',
    category: 'bedtime',
    reflectionSnippet: 'Bookmarked favorite reassuring moment in Luke 8.',
  },
  {
    id: 'hp-3',
    dayLabel: 'Day 5',
    dateStr: 'Oct 20',
    cumulativePoints: 26,
    activityLabel: 'Weekly Rhythm Session completed',
    category: 'goal',
    milestoneReached: 'sprout',
    milestoneTitle: 'First Rootlet Sprout (Stage 02 Reached at 25+ pts)',
    reflectionSnippet: 'Planted rootlets deep in peaceful, unforced rhythms.',
  },
  {
    id: 'hp-4',
    dayLabel: 'Day 7',
    dateStr: 'Oct 22',
    cumulativePoints: 38,
    activityLabel: 'Near Eastern Archaeology Timeline Exploration',
    category: 'archive',
    reflectionSnippet: 'Examined Iron Age Lachish letters & Hebrew seals.',
  },
  {
    id: 'hp-5',
    dayLabel: 'Day 9',
    dateStr: 'Oct 24',
    cumulativePoints: 52,
    activityLabel: 'Hebrew Word Study (Chesed & Shalom)',
    category: 'archive',
    milestoneReached: 'sapling',
    milestoneTitle: 'Young Olive Sapling (Stage 03 Reached at 50+ pts)',
    reflectionSnippet: 'Understood covenant love without legalistic guilt.',
  },
  {
    id: 'hp-6',
    dayLabel: 'Day 11',
    dateStr: 'Oct 26',
    cumulativePoints: 68,
    activityLabel: 'Safe Harbor Honest Lament & Reflection',
    category: 'reflection',
    reflectionSnippet: 'Engaged Habakkuk 1:2 doubt & questions openly.',
  },
  {
    id: 'hp-7',
    dayLabel: 'Day 13',
    dateStr: 'Oct 28',
    cumulativePoints: 84,
    activityLabel: 'Zero-Knowledge Encrypted Journal Locked',
    category: 'harbor',
    milestoneReached: 'tree',
    milestoneTitle: 'Sanctuary Tree (Stage 04 Reached at 80+ pts)',
    reflectionSnippet: 'Autonomous teen reflection sealed with zero external surveillance.',
  },
  {
    id: 'hp-8',
    dayLabel: 'Day 14 (Today)',
    dateStr: 'Oct 29',
    cumulativePoints: 94,
    activityLabel: 'Daily Affirmation & Bedtime Shepherd Routine',
    category: 'bedtime',
    reflectionSnippet: 'Continuous unhurried presence across household rhythms.',
  },
];

interface GrowthHistoryD3ChartProps {
  currentPoints: number;
  currentStage: GrowthStageInfo;
  onOpenShareModal?: () => void;
}

export default function GrowthHistoryD3Chart({
  currentPoints,
  currentStage,
  onOpenShareModal,
}: GrowthHistoryD3ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(680);
  const [selectedPoint, setSelectedPoint] = useState<HistoryDataPoint | null>(
    DEFAULT_GROWTH_HISTORY[DEFAULT_GROWTH_HISTORY.length - 1]
  );
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);

  // Resize listener for responsive D3 calculations
  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Dynamically attach the user's current live points to the latest point
  const trajectoryData = useMemo(() => {
    const list = [...DEFAULT_GROWTH_HISTORY];
    const last = {...list[list.length - 1]};
    last.cumulativePoints = Math.max(last.cumulativePoints, currentPoints);
    list[list.length - 1] = last;
    return list;
  }, [currentPoints]);

  // Chart dimensions
  const height = 260;
  const margin = {top: 24, right: 32, bottom: 36, left: 44};
  const innerWidth = Math.max(280, containerWidth - margin.left - margin.right);
  const innerHeight = height - margin.top - margin.bottom;

  // D3 Scales
  const xScale = useMemo(() => {
    return d3
      .scalePoint<string>()
      .domain(trajectoryData.map((d) => d.id))
      .range([0, innerWidth])
      .padding(0.15);
  }, [trajectoryData, innerWidth]);

  const yScale = useMemo(() => {
    const maxVal = Math.max(105, d3.max(trajectoryData, (d) => d.cumulativePoints) || 100);
    return d3
      .scaleLinear()
      .domain([0, maxVal])
      .range([innerHeight, 0])
      .nice();
  }, [trajectoryData, innerHeight]);

  // D3 Line Generator
  const linePath = useMemo(() => {
    const lineGen = d3
      .line<HistoryDataPoint>()
      .x((d) => xScale(d.id) ?? 0)
      .y((d) => yScale(d.cumulativePoints))
      .curve(d3.curveMonotoneX);

    return lineGen(trajectoryData) || '';
  }, [trajectoryData, xScale, yScale]);

  // D3 Area Fill Generator
  const areaPath = useMemo(() => {
    const areaGen = d3
      .area<HistoryDataPoint>()
      .x((d) => xScale(d.id) ?? 0)
      .y0(innerHeight)
      .y1((d) => yScale(d.cumulativePoints))
      .curve(d3.curveMonotoneX);

    return areaGen(trajectoryData) || '';
  }, [trajectoryData, xScale, yScale, innerHeight]);

  // Milestone Threshold lines
  const milestoneLines = [
    {threshold: 25, label: 'Sprout · 25 pts', stage: 'sprout', color: '#D97706'},
    {threshold: 50, label: 'Sapling · 50 pts', stage: 'sapling', color: '#F59E0B'},
    {threshold: 80, label: 'Tree · 80 pts', stage: 'tree', color: '#FBBF24'},
  ];

  return (
    <div className="space-y-4">
      {/* Chart Headline & Milestones Achieved Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#292524]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#FBBF24]">
            <TrendingUp className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Trajectory & Milestone Velocity</span>
            <span aria-hidden="true">·</span>
            <span>Zero Streak Pressure</span>
          </div>
          <h4
            className="text-lg sm:text-xl font-normal text-[#F9F6F0] mt-0.5"
            style={{fontFamily: 'var(--font-display), serif'}}
          >
            Growth Journey Over Time
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {trajectoryData
            .filter((pt) => pt.milestoneReached)
            .map((pt) => {
              const isSelected = selectedPoint?.id === pt.id;
              return (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => setSelectedPoint(pt)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#D97706] text-[#1A1A1A] font-semibold'
                      : 'bg-[#141210] text-[#FDE68A] border border-[#36312E] hover:border-[#D97706]'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>
                    {pt.milestoneReached?.toUpperCase()} ({pt.dateStr})
                  </span>
                </button>
              );
            })}

          {onOpenShareModal && (
            <button
              type="button"
              onClick={onOpenShareModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D97706]/20 hover:bg-[#D97706]/35 border border-[#D97706]/50 text-xs font-semibold text-[#FDE68A] transition-colors cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Share Milestone</span>
            </button>
          )}
        </div>
      </div>

      {/* D3 SVG Container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-xl bg-[#141210] border border-[#292524] p-3 sm:p-4 overflow-hidden"
      >
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${containerWidth} ${height}`}
          className="overflow-visible select-none"
        >
          <defs>
            {/* Smooth Warm Amber Area Gradient */}
            <linearGradient id="amberGrowthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D97706" stopOpacity="0.38" />
              <stop offset="70%" stopColor="#D97706" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.00" />
            </linearGradient>

            {/* Glowing Stroke Filter */}
            <filter id="amberGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D97706" floodOpacity="0.45" />
            </filter>
          </defs>

          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {/* Horizontal Grid lines */}
            {yScale.ticks(5).map((tickVal) => (
              <g key={tickVal} transform={`translate(0, ${yScale(tickVal)})`}>
                <line
                  x1={0}
                  x2={innerWidth}
                  stroke="#292524"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                />
                <text
                  x={-10}
                  y={4}
                  textAnchor="end"
                  fontSize="10"
                  fontFamily="var(--font-mono), monospace"
                  fill="#78716C"
                >
                  {tickVal}
                </text>
              </g>
            ))}

            {/* Milestone Threshold Lines: Sprout (25), Sapling (50), Tree (80) */}
            {milestoneLines.map((m) => {
              const yPos = yScale(m.threshold);
              return (
                <g key={m.threshold} transform={`translate(0, ${yPos})`}>
                  <line
                    x1={0}
                    x2={innerWidth}
                    stroke={m.color}
                    strokeDasharray="4 4"
                    strokeWidth={1.2}
                    strokeOpacity={0.65}
                  />
                  <rect
                    x={innerWidth - 95}
                    y={-14}
                    width={92}
                    height={16}
                    rx={4}
                    fill="#1A1A1A"
                    stroke={m.color}
                    strokeOpacity={0.5}
                    strokeWidth={0.8}
                  />
                  <text
                    x={innerWidth - 49}
                    y={-2}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontFamily="var(--font-mono), monospace"
                    fill={m.color}
                    fontWeight="600"
                  >
                    {m.label}
                  </text>
                </g>
              );
            })}

            {/* Area Fill */}
            <path d={areaPath} fill="url(#amberGrowthGradient)" />

            {/* Main Trajectory Line */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="#D97706"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#amberGlow)"
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{duration: 0.9, ease: 'easeOut'}}
            />

            {/* Interactive Data Points and Milestone Badges */}
            {trajectoryData.map((d) => {
              const cx = xScale(d.id) ?? 0;
              const cy = yScale(d.cumulativePoints);
              const isSelected = selectedPoint?.id === d.id;
              const isHovered = hoveredPointId === d.id;
              const hasMilestone = Boolean(d.milestoneReached);
              const milestoneLabelText = d.milestoneReached
                ? `★ ${d.milestoneReached.charAt(0).toUpperCase()}${d.milestoneReached.slice(1)}`
                : '';

              return (
                <g
                  key={d.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedPoint(d)}
                  onMouseEnter={() => setHoveredPointId(d.id)}
                  onMouseLeave={() => setHoveredPointId(null)}
                >
                  {/* Invisible enlarged hit target for effortless tapping */}
                  <circle cx={cx} cy={cy} r={18} fill="transparent" />

                  {/* Pulsing ring for milestone or active selected point */}
                  {(isSelected || hasMilestone) && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={hasMilestone ? 10 : 8}
                      fill="none"
                      stroke={hasMilestone ? '#FBBF24' : '#D97706'}
                      strokeWidth={1.5}
                      strokeOpacity={isSelected ? 1 : 0.7}
                      className={hasMilestone ? 'animate-pulse' : ''}
                    />
                  )}

                  {/* Central Node Circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={hasMilestone ? 6 : isSelected ? 5.5 : 4}
                    fill={hasMilestone ? '#FBBF24' : isSelected ? '#F59E0B' : '#D97706'}
                    stroke="#141210"
                    strokeWidth={2}
                  />

                  {/* Milestone Callout Pill if milestone (Sprout / Sapling / Tree) was reached */}
                  {hasMilestone && (
                    <g transform={`translate(${cx - 28}, ${cy - 28})`}>
                      <rect
                        x={0}
                        y={0}
                        width={56}
                        height={17}
                        rx={4}
                        fill="#D97706"
                        stroke="#FDE68A"
                        strokeWidth={1}
                      />
                      <text
                        x={28}
                        y={11.5}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontFamily="var(--font-mono), monospace"
                        fontWeight="700"
                        fill="#1A1A1A"
                      >
                        {milestoneLabelText}
                      </text>
                    </g>
                  )}

                  {/* X-Axis Day Labels */}
                  <text
                    x={cx}
                    y={innerHeight + 18}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="var(--font-mono), monospace"
                    fill={isSelected || isHovered ? '#F9F6F0' : '#A8A29E'}
                    fontWeight={isSelected ? '600' : '400'}
                  >
                    {d.dateStr}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Legend */}
        <div className="mt-2 pt-2 border-t border-[#292524] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#A8A29E]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
              <span>Quiet Session Points</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24] border border-[#FDE68A]" />
              <span>Milestone Evolution (Sprout, Sapling, Tree)</span>
            </span>
          </div>
          <span className="font-mono text-[#D6D3D1]">
            Tap any node to view session notes
          </span>
        </div>
      </div>

      {/* Selected Point Inspection Card */}
      {selectedPoint && (
        <motion.div
          key={selectedPoint.id}
          initial={{opacity: 0, y: 6}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.2}}
          className="p-4 rounded-xl bg-[#1E1B18] border border-[#36312E] space-y-2 text-[#F9F6F0]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-[#292524] border border-[#44403C] text-[10px] font-mono text-[#FBBF24]">
                {selectedPoint.dayLabel} · {selectedPoint.dateStr}
              </span>
              <span className="text-xs font-semibold text-[#F9F6F0]">
                {selectedPoint.activityLabel}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#D97706] font-semibold">
              <span>{selectedPoint.cumulativePoints} Cumulative Points</span>
            </div>
          </div>

          {selectedPoint.milestoneTitle && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#D97706]/20 border border-[#D97706]/50 text-xs font-semibold text-[#FDE68A]">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{selectedPoint.milestoneTitle}</span>
            </div>
          )}

          {selectedPoint.reflectionSnippet && (
            <p className="text-xs text-[#D6D3D1] italic leading-relaxed pt-0.5">
              “{selectedPoint.reflectionSnippet}”
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
