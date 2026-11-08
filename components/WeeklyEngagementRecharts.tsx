'use client';

import React, {useState, useMemo} from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import {motion} from 'motion/react';
import {
  TrendingUp,
  Target,
  Sparkles,
  Calendar,
  CheckCircle2,
  Award,
  Flame,
} from 'lucide-react';

export interface WeeklyDataPoint {
  day: string;
  dayFull: string;
  points: number;
  cumulativePoints: number;
  sessions: number;
  activitySnippet: string;
  isToday?: boolean;
}

const DEFAULT_WEEKLY_SERIES: WeeklyDataPoint[] = [
  {
    day: 'Mon',
    dayFull: 'Monday',
    points: 15,
    cumulativePoints: 15,
    sessions: 1,
    activitySnippet: 'Bedtime Shepherd Story · Psalm 23 (Valley)',
  },
  {
    day: 'Tue',
    dayFull: 'Tuesday',
    points: 10,
    cumulativePoints: 25,
    sessions: 1,
    activitySnippet: 'Audio Bookmark saved & Morning Bridge reflection',
  },
  {
    day: 'Wed',
    dayFull: 'Wednesday',
    points: 20,
    cumulativePoints: 45,
    sessions: 1,
    activitySnippet: 'Hebrew Word Study (Shalom & Chesed)',
  },
  {
    day: 'Thu',
    dayFull: 'Thursday',
    points: 15,
    cumulativePoints: 60,
    sessions: 1,
    activitySnippet: 'Bedtime Routine · Luke 8 (Quiet Lake)',
  },
  {
    day: 'Fri',
    dayFull: 'Friday',
    points: 20,
    cumulativePoints: 80,
    sessions: 1,
    activitySnippet: 'Safe Harbor Honest Lament & Reflection',
  },
  {
    day: 'Sat',
    dayFull: 'Saturday',
    points: 10,
    cumulativePoints: 90,
    sessions: 1,
    activitySnippet: 'Near Eastern Archaeology Timeline inspection',
  },
  {
    day: 'Sun',
    dayFull: 'Sunday (Today)',
    points: 15,
    cumulativePoints: 105,
    sessions: 1,
    activitySnippet: 'Breakfast Conversation Starter & Evening Shepherd',
    isToday: true,
  },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: {payload: WeeklyDataPoint; value: number}[];
}

function CustomRechartsTooltip({active, payload}: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl bg-[#1C1917]/95 border border-[#D97706]/70 p-3 shadow-2xl backdrop-blur-md text-[#FAF7F2] space-y-1.5 max-w-[240px]">
        <div className="flex items-center justify-between gap-2 border-b border-[#292524] pb-1.5">
          <span className="text-xs font-semibold text-[#FBBF24]">
            {data.dayFull}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#D97706]/20 text-[#FDE68A]">
            +{data.points} pts
          </span>
        </div>
        <div className="text-xs text-[#E7E5E4] font-medium leading-snug">
          {data.activitySnippet}
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#A8A29E] pt-1">
          <span>Weekly Total:</span>
          <span className="font-mono text-[#FAF7F2] font-semibold">
            {data.cumulativePoints} pts
          </span>
        </div>
      </div>
    );
  }
  return null;
}

interface WeeklyEngagementRechartsProps {
  currentPoints: number;
  weeklyGoal: number;
  weeklyCompleted: number;
  onOpenShareModal?: () => void;
}

export default function WeeklyEngagementRecharts({
  currentPoints,
  weeklyGoal,
  weeklyCompleted,
  onOpenShareModal,
}: WeeklyEngagementRechartsProps) {
  const [metricView, setMetricView] = useState<'daily' | 'cumulative'>('daily');
  const [selectedDay, setSelectedDay] = useState<WeeklyDataPoint | null>(
    DEFAULT_WEEKLY_SERIES[DEFAULT_WEEKLY_SERIES.length - 1]
  );

  const chartData = useMemo(() => {
    return DEFAULT_WEEKLY_SERIES.map((item, idx) => {
      if (idx === DEFAULT_WEEKLY_SERIES.length - 1 && currentPoints > 0) {
        return {
          ...item,
          cumulativePoints: Math.max(item.cumulativePoints, currentPoints),
        };
      }
      return item;
    });
  }, [currentPoints]);

  const totalWeeklyPoints = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.points, 0);
  }, [chartData]);

  return (
    <div className="space-y-4">
      {/* Chart Header & Metric View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#292524]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#FBBF24]">
            <TrendingUp className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Recharts Weekly Engagement Line Chart</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Pressure Rhythm</span>
          </div>
          <h4
            className="text-lg sm:text-xl font-normal text-[#F9F6F0] mt-0.5"
            style={{fontFamily: 'var(--font-display), serif'}}
          >
            Weekly Growth Velocity
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle Daily vs Cumulative */}
          <div className="flex items-center gap-1 bg-[#141210] p-1 rounded-lg border border-[#292524]">
            <button
              type="button"
              onClick={() => setMetricView('daily')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                metricView === 'daily'
                  ? 'bg-[#292524] text-[#F9F6F0] border border-[#44403C]'
                  : 'text-[#A8A29E] hover:text-[#F9F6F0]'
              }`}
            >
              Daily Gain
            </button>
            <button
              type="button"
              onClick={() => setMetricView('cumulative')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                metricView === 'cumulative'
                  ? 'bg-[#292524] text-[#F9F6F0] border border-[#44403C]'
                  : 'text-[#A8A29E] hover:text-[#F9F6F0]'
              }`}
            >
              Cumulative Flow
            </button>
          </div>

          {onOpenShareModal && (
            <button
              type="button"
              onClick={onOpenShareModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D97706]/20 hover:bg-[#D97706]/35 border border-[#D97706]/50 text-xs font-semibold text-[#FDE68A] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Award className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Share Milestone</span>
            </button>
          )}
        </div>
      </div>

      {/* Recharts Container */}
      <div className="relative w-full h-[250px] rounded-xl bg-[#141210] border border-[#292524] p-3 sm:p-4 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{top: 15, right: 15, bottom: 5, left: -15}}
            onClick={(state: any) => {
              if (state && state.activePayload && state.activePayload[0]) {
                setSelectedDay(state.activePayload[0].payload as WeeklyDataPoint);
              }
            }}
          >
            <defs>
              <linearGradient id="rechartsAmberArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D97706" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#D97706" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#292524"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#78716C"
              fontSize={11}
              fontFamily="var(--font-mono), monospace"
              tickLine={false}
              axisLine={{stroke: '#292524'}}
            />

            <YAxis
              stroke="#78716C"
              fontSize={11}
              fontFamily="var(--font-mono), monospace"
              tickLine={false}
              axisLine={{stroke: '#292524'}}
              domain={metricView === 'daily' ? [0, 30] : [0, 'auto']}
            />

            <Tooltip content={<CustomRechartsTooltip />} />

            {/* Target rhythm reference line */}
            {metricView === 'daily' && (
              <ReferenceLine
                y={15}
                stroke="#4A5D4E"
                strokeDasharray="4 4"
                label={{
                  value: 'Target Rhythm (15 pts/day)',
                  fill: '#86EFAC',
                  fontSize: 10,
                  position: 'insideTopRight',
                  fontFamily: 'var(--font-mono), monospace',
                }}
              />
            )}

            <Area
              type="monotone"
              dataKey={metricView === 'daily' ? 'points' : 'cumulativePoints'}
              stroke="none"
              fill="url(#rechartsAmberArea)"
            />

            <Line
              type="monotone"
              dataKey={metricView === 'daily' ? 'points' : 'cumulativePoints'}
              stroke="#D97706"
              strokeWidth={3}
              dot={{
                r: 4.5,
                fill: '#F59E0B',
                stroke: '#141210',
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: '#FDE68A',
                stroke: '#D97706',
                strokeWidth: 2,
              }}
              animationDuration={800}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Summary Pill & Selected Day Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
        <div className="sm:col-span-7 p-3.5 rounded-xl bg-[#1E1B18] border border-[#36312E] space-y-1.5 text-[#F9F6F0]">
          <div className="flex items-center justify-between text-[#A8A29E]">
            <span className="font-semibold text-[#FAF7F2]">
              {selectedDay ? selectedDay.dayFull : 'Select a Day'}
            </span>
            <span className="font-mono text-[#D97706] font-semibold">
              +{selectedDay ? selectedDay.points : 0} Growth Points
            </span>
          </div>
          <p className="text-xs text-[#D6D3D1] leading-relaxed italic">
            “{selectedDay ? selectedDay.activitySnippet : ''}”
          </p>
        </div>

        <div className="sm:col-span-5 p-3.5 rounded-xl bg-[#24211E] border border-[#36312E] flex flex-col justify-between space-y-2 text-[#FAF7F2]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#A8A29E]">Weekly Points Gain</span>
            <span className="font-mono text-sm font-bold text-[#FBBF24]">
              +{totalWeeklyPoints} pts
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#A8A29E]">
            <span>Quiet Sessions</span>
            <span className="font-mono text-[#D6D3D1]">
              {weeklyCompleted} of {weeklyGoal} goal met
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#1A1A1A] overflow-hidden">
            <div
              className="h-full bg-[#D97706] rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (weeklyCompleted / weeklyGoal) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
