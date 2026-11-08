'use client';

import React, {useState, useEffect, useMemo} from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import {
  TrendingUp,
  Activity,
  Plus,
  CheckCircle2,
  BookOpen,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export interface DailyVelocityPoint {
  day: string;
  fullDay: string;
  chaptersRead: number;
  minutesStudied: number;
  versesCompared: number;
  targetChapters: number;
}

const DEFAULT_VELOCITY_DATA: DailyVelocityPoint[] = [
  {
    day: 'Mon',
    fullDay: 'Monday',
    chaptersRead: 2,
    minutesStudied: 18,
    versesCompared: 12,
    targetChapters: 2,
  },
  {
    day: 'Tue',
    fullDay: 'Tuesday',
    chaptersRead: 1,
    minutesStudied: 12,
    versesCompared: 8,
    targetChapters: 2,
  },
  {
    day: 'Wed',
    fullDay: 'Wednesday',
    chaptersRead: 3,
    minutesStudied: 26,
    versesCompared: 19,
    targetChapters: 2,
  },
  {
    day: 'Thu',
    fullDay: 'Thursday',
    chaptersRead: 2,
    minutesStudied: 16,
    versesCompared: 11,
    targetChapters: 2,
  },
  {
    day: 'Fri',
    fullDay: 'Friday',
    chaptersRead: 2,
    minutesStudied: 20,
    versesCompared: 14,
    targetChapters: 2,
  },
  {
    day: 'Sat',
    fullDay: 'Saturday',
    chaptersRead: 4,
    minutesStudied: 34,
    versesCompared: 24,
    targetChapters: 2,
  },
  {
    day: 'Sun',
    fullDay: 'Sunday (Today)',
    chaptersRead: 2,
    minutesStudied: 22,
    versesCompared: 15,
    targetChapters: 2,
  },
];

const VELOCITY_STORAGE_KEY = 'grow_in_the_word_weekly_velocity_v1';

interface WeeklyReadingVelocityChartProps {
  totalChaptersReadCanon?: number;
  activeBookName?: string;
  onLogVelocitySession?: (points: number, label: string) => void;
}

export default function WeeklyReadingVelocityChart({
  totalChaptersReadCanon = 12,
  activeBookName = 'Psalms',
  onLogVelocitySession,
}: WeeklyReadingVelocityChartProps) {
  const [velocityData, setVelocityData] = useState<DailyVelocityPoint[]>(
    DEFAULT_VELOCITY_DATA
  );
  const [dailyTarget, setDailyTarget] = useState<number>(2);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [justLoggedToday, setJustLoggedToday] = useState<boolean>(false);

  // Restore saved 7-day velocity from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(VELOCITY_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.data) && parsed.data.length === 7) {
            setVelocityData(parsed.data);
          }
          if (typeof parsed.dailyTarget === 'number') {
            setDailyTarget(parsed.dailyTarget);
          }
        }
      } catch {
        // ignore storage errors
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const persistVelocity = (
    nextData: DailyVelocityPoint[],
    nextTarget: number
  ) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(
        VELOCITY_STORAGE_KEY,
        JSON.stringify({
          data: nextData,
          dailyTarget: nextTarget,
        })
      );
    } catch {
      // ignore
    }
  };

  const handleLogTodayStudy = () => {
    setVelocityData((prev) => {
      const next = prev.map((item, idx) => {
        if (idx === prev.length - 1) {
          return {
            ...item,
            chaptersRead: item.chaptersRead + 1,
            minutesStudied: item.minutesStudied + 10,
            versesCompared: item.versesCompared + 6,
          };
        }
        return item;
      });
      persistVelocity(next, dailyTarget);
      return next;
    });
    setJustLoggedToday(true);
    setTimeout(() => setJustLoggedToday(false), 2200);
    onLogVelocitySession?.(
      15,
      `Logged +1 Chapter & 10m in Weekly Reading Velocity (${activeBookName})`
    );
  };

  const handleChangeTarget = (target: number) => {
    setDailyTarget(target);
    setVelocityData((prev) => {
      const next = prev.map((d) => ({...d, targetChapters: target}));
      persistVelocity(next, target);
      return next;
    });
  };

  const metrics = useMemo(() => {
    const totalChapters7d = velocityData.reduce(
      (acc, d) => acc + d.chaptersRead,
      0
    );
    const totalMinutes7d = velocityData.reduce(
      (acc, d) => acc + d.minutesStudied,
      0
    );
    const activeDaysCount = velocityData.filter(
      (d) => d.chaptersRead > 0
    ).length;
    const consistencyPct = Math.round((activeDaysCount / 7) * 100);
    const avgDailyMinutes = Math.round(totalMinutes7d / 7);
    return {
      totalChapters7d,
      totalMinutes7d,
      activeDaysCount,
      consistencyPct,
      avgDailyMinutes,
    };
  }, [velocityData]);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DEC9] shadow-2xs space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1C1917] border border-[#D97706]/60 flex items-center justify-center shrink-0 text-[#D97706]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                Weekly Reading Velocity · Past 7 Days
              </span>
              <span aria-hidden="true" className="text-[#E5DEC9]">
                ·
              </span>
              <span className="font-mono text-[11px] text-[#4A5D4E] font-semibold">
                {metrics.activeDaysCount}/7 Days Consistent ({metrics.consistencyPct}%)
              </span>
            </div>
            <p className="text-xs text-[#57534E] mt-0.5">
              Visualizing 7-day reading consistency across{' '}
              <strong className="text-[#1C1917] font-semibold">
                {metrics.totalChapters7d} chapters
              </strong>{' '}
              and{' '}
              <strong className="text-[#1C1917] font-semibold">
                {metrics.totalMinutes7d} study minutes
              </strong>{' '}
              (avg {metrics.avgDailyMinutes}m/day · Canon total: {totalChaptersReadCanon} ch).
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Daily Chapter Goal Switcher */}
          <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#F2ECE1] border border-[#E5DEC9] text-[11px]">
            <span className="px-1.5 font-mono text-[#57534E]">Goal:</span>
            {[1, 2, 3].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleChangeTarget(t)}
                className={`px-2 py-0.5 rounded font-mono font-semibold transition-colors cursor-pointer ${
                  dailyTarget === t
                    ? 'bg-[#1C1917] text-[#FAF7F2]'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {t} ch/d
              </button>
            ))}
          </div>

          {/* Log Today's Velocity Button */}
          <button
            type="button"
            onClick={handleLogTodayStudy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              justLoggedToday
                ? 'bg-[#10B981] text-[#1A1A1A]'
                : 'bg-[#D97706] hover:bg-[#B45309] text-[#1A1A1A]'
            }`}
          >
            {justLoggedToday ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Logged +1 Ch Today!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Log Today (+1 Ch)</span>
              </>
            )}
          </button>

          {/* Expand / Collapse Graph */}
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            className="p-1.5 rounded-lg bg-[#F2ECE1] hover:bg-[#E5DEC9] text-[#1C1917] border border-[#E5DEC9] transition-colors cursor-pointer"
            title={isExpanded ? 'Collapse velocity graph' : 'Expand velocity graph'}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Recharts 7-Day Consistency Visualization */}
      {isExpanded && (
        <div className="pt-2 border-t border-[#E5DEC9] space-y-3">
          <div className="h-[210px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={velocityData}
                margin={{top: 10, right: 12, left: -18, bottom: 0}}
              >
                <defs>
                  <linearGradient id="velocityMinutesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D97706" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#D97706" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5DEC9"
                />
                <XAxis
                  dataKey="day"
                  tick={{fill: '#57534E', fontSize: 11, fontFamily: 'monospace'}}
                  axisLine={{stroke: '#E5DEC9'}}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="left"
                  tick={{fill: '#57534E', fontSize: 11, fontFamily: 'monospace'}}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{fill: '#92400E', fontSize: 10, fontFamily: 'monospace'}}
                  axisLine={false}
                  tickLine={false}
                  unit="m"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1C1917',
                    borderColor: '#D97706',
                    borderRadius: '10px',
                    color: '#FAF7F2',
                    fontSize: '12px',
                  }}
                  itemStyle={{color: '#FAF7F2'}}
                  labelStyle={{
                    color: '#FBBF24',
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}
                />
                <ReferenceLine
                  yAxisId="left"
                  y={dailyTarget}
                  stroke="#4A5D4E"
                  strokeDasharray="4 4"
                  label={{
                    value: `Daily Goal (${dailyTarget} ch)`,
                    position: 'insideTopLeft',
                    fill: '#4A5D4E',
                    fontSize: 10,
                  }}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="minutesStudied"
                  name="Study Minutes"
                  stroke="#D97706"
                  strokeWidth={2}
                  fill="url(#velocityMinutesGrad)"
                />
                <Bar
                  yAxisId="left"
                  dataKey="chaptersRead"
                  name="Chapters Read"
                  fill="#1C1917"
                  radius={[6, 6, 0, 0]}
                  barSize={26}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Legend & Summary Footer */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#57534E] pt-1">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#1C1917] inline-block" />
                <span>Chapters Read (Left Axis)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] inline-block" />
                <span>Study Minutes Curve (Right Axis)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-t border-dashed border-[#4A5D4E] inline-block" />
                <span>Target Rhythm ({dailyTarget} ch/day)</span>
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[10.5px] text-[#1C1917]">
              <span className="inline-flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-[#D97706]" />
                <strong>{metrics.totalChapters7d} ch</strong> / 7d
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#D97706]" />
                <strong>{metrics.totalMinutes7d} min</strong> / 7d
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1 text-[#4A5D4E]">
                <TrendingUp className="w-3 h-3" />
                <strong>{metrics.consistencyPct}% Consistency</strong>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
