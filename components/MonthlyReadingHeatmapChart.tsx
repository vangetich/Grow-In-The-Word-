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
  Flame,
  Calendar,
  Award,
  CheckCircle2,
  Plus,
  TrendingUp,
  Clock,
  BookOpen,
  Sparkles,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

export interface MonthlyHeatmapDay {
  dateKey: string; // YYYY-MM-DD
  dayLabel: string; // e.g. "Oct 12"
  shortDay: string; // e.g. "Mon"
  dayNumber: number; // 1 - 30
  chaptersRead: number;
  minutesStudied: number;
  versesCompared: number;
  isToday?: boolean;
}

const HEATMAP_STORAGE_KEY = 'grow_in_the_word_monthly_heatmap_v1';

// Generate default 30-day mock history ending today
const generateDefault30DayData = (): MonthlyHeatmapDay[] => {
  const data: MonthlyHeatmapDay[] = [];
  const today = new Date();

  // Pattern of chapters for realistic 30-day reading journey
  const sampleChapters = [
    1, 2, 0, 1, 2, 3, 2,
    1, 0, 2, 2, 1, 3, 2,
    0, 1, 2, 2, 3, 1, 2,
    2, 1, 3, 2, 1, 2, 4,
    2, 3,
  ];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;

    const monthName = d.toLocaleDateString('en-US', {month: 'short'});
    const dayName = d.toLocaleDateString('en-US', {weekday: 'short'});
    const dayNum = d.getDate();
    const dayLabel = `${monthName} ${dayNum}`;

    const idx = 29 - i;
    const chaptersRead = sampleChapters[idx % sampleChapters.length];
    const minutesStudied = chaptersRead * 9 + (idx % 4) * 3;
    const versesCompared = chaptersRead * 6 + (idx % 3) * 2;

    data.push({
      dateKey,
      dayLabel,
      shortDay: dayName,
      dayNumber: 30 - i,
      chaptersRead,
      minutesStudied,
      versesCompared,
      isToday: i === 0,
    });
  }

  return data;
};

interface MonthlyReadingHeatmapChartProps {
  totalChaptersReadCanon?: number;
  activeBookName?: string;
  onLogHeatmapSession?: (points: number, label: string) => void;
}

export default function MonthlyReadingHeatmapChart({
  totalChaptersReadCanon = 18,
  activeBookName = 'Psalms',
  onLogHeatmapSession,
}: MonthlyReadingHeatmapChartProps) {
  const [heatmapData, setHeatmapData] = useState<MonthlyHeatmapDay[]>(() =>
    generateDefault30DayData()
  );
  const [targetDailyChapters, setTargetDailyChapters] = useState<number>(2);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [justLoggedToday, setJustLoggedToday] = useState<boolean>(false);
  const [hoveredDay, setHoveredDay] = useState<MonthlyHeatmapDay | null>(null);

  // Restore saved 30-day heatmap from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(HEATMAP_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.data) && parsed.data.length === 30) {
            setHeatmapData(parsed.data);
          }
          if (typeof parsed.targetDailyChapters === 'number') {
            setTargetDailyChapters(parsed.targetDailyChapters);
          }
        }
      } catch {
        // ignore storage errors
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const persistHeatmap = (
    nextData: MonthlyHeatmapDay[],
    nextTarget: number
  ) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(
        HEATMAP_STORAGE_KEY,
        JSON.stringify({
          data: nextData,
          targetDailyChapters: nextTarget,
        })
      );
    } catch {
      // ignore
    }
  };

  const handleLogTodayRead = () => {
    setHeatmapData((prev) => {
      const next = prev.map((item) => {
        if (item.isToday) {
          return {
            ...item,
            chaptersRead: item.chaptersRead + 1,
            minutesStudied: item.minutesStudied + 12,
            versesCompared: item.versesCompared + 7,
          };
        }
        return item;
      });
      persistHeatmap(next, targetDailyChapters);
      return next;
    });
    setJustLoggedToday(true);
    setTimeout(() => setJustLoggedToday(false), 2400);
    onLogHeatmapSession?.(
      20,
      `Logged +1 Chapter in 30-Day Heatmap (${activeBookName})`
    );
  };

  const handleChangeTarget = (target: number) => {
    setTargetDailyChapters(target);
    persistHeatmap(heatmapData, target);
  };

  // Calculate 30-day streak & gamification metrics
  const metrics = useMemo(() => {
    const total30dChapters = heatmapData.reduce(
      (acc, d) => acc + d.chaptersRead,
      0
    );
    const total30dMinutes = heatmapData.reduce(
      (acc, d) => acc + d.minutesStudied,
      0
    );
    const activeDaysCount = heatmapData.filter((d) => d.chaptersRead > 0).length;
    const goalMetDaysCount = heatmapData.filter(
      (d) => d.chaptersRead >= targetDailyChapters
    ).length;
    const consistencyPct = Math.round((activeDaysCount / 30) * 100);

    // Current reading streak (consecutive active days up to today)
    let currentStreak = 0;
    for (let i = heatmapData.length - 1; i >= 0; i--) {
      if (heatmapData[i].chaptersRead > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    return {
      total30dChapters,
      total30dMinutes,
      activeDaysCount,
      goalMetDaysCount,
      consistencyPct,
      currentStreak,
    };
  }, [heatmapData, targetDailyChapters]);

  // Heatmap tile background color map
  const getTileBgClass = (chapters: number) => {
    if (chapters === 0)
      return 'bg-[#E5DEC9]/45 dark:bg-[#2A241F] border-[#D6CEBF]/50 dark:border-[#3E3834] text-[#78716C]';
    if (chapters === 1)
      return 'bg-[#FDE68A] text-[#92400E] dark:bg-[#D97706]/35 dark:text-[#FBBF24] border-[#F59E0B]/60';
    if (chapters === 2)
      return 'bg-[#F59E0B] text-[#1A1A1A] dark:bg-[#D97706]/70 dark:text-[#FAF7F2] border-[#D97706] font-semibold';
    if (chapters >= 3)
      return 'bg-[#1C1917] text-[#FAF7F2] dark:bg-[#F59E0B] dark:text-[#1A1A1A] border-[#D97706] font-bold shadow-xs';
    return 'bg-[#E5DEC9]';
  };

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1917]/95 border border-[#E5DEC9] dark:border-[#36312E] shadow-xs space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E5DEC9] dark:border-[#36312E] pb-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#1C1917] dark:bg-[#292524] border border-[#D97706]/60 flex items-center justify-center shrink-0 text-[#D97706]">
            <Flame className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#92400E] dark:text-[#FBBF24]">
                30-Day Reading Heatmap &amp; Journey Streaks
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D97706]/15 text-[#92400E] dark:text-[#FBBF24] border border-[#D97706]/40 font-mono text-[11px] font-bold">
                <Flame className="w-3 h-3 text-[#F59E0B]" />
                <span>{metrics.currentStreak}-Day Streak</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#D6D3D1] mt-0.5">
              Tracking consistent Bible study across the last 30 days:{' '}
              <strong className="text-[#1C1917] dark:text-[#FAF7F2] font-semibold">
                {metrics.total30dChapters} chapters read
              </strong>{' '}
              ·{' '}
              <strong className="text-[#1C1917] dark:text-[#FAF7F2] font-semibold">
                {metrics.total30dMinutes} mins
              </strong>{' '}
              ({metrics.activeDaysCount}/30 days active · {metrics.consistencyPct}% consistency).
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Goal Switcher */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#F2ECE1] dark:bg-[#292524] border border-[#E5DEC9] dark:border-[#36312E] text-xs">
            <span className="px-1.5 font-mono text-[#57534E] dark:text-[#A8A29E] text-[11px]">
              Goal:
            </span>
            {[1, 2, 3].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleChangeTarget(t)}
                className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-all cursor-pointer ${
                  targetDailyChapters === t
                    ? 'bg-[#1C1917] text-[#FAF7F2] dark:bg-[#FAF7F2] dark:text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] dark:text-[#D6D3D1] hover:text-[#1C1917]'
                }`}
              >
                {t} ch/d
              </button>
            ))}
          </div>

          {/* Log Today Button */}
          <button
            type="button"
            onClick={handleLogTodayRead}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              justLoggedToday
                ? 'bg-[#10B981] text-[#1A1A1A] scale-105'
                : 'bg-[#D97706] hover:bg-[#F59E0B] text-[#1A1A1A] shadow-xs'
            }`}
          >
            {justLoggedToday ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Logged +1 Ch!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Log Today (+1 Ch)</span>
              </>
            )}
          </button>

          {/* Toggle Expand / Collapse */}
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            className="p-2 rounded-xl bg-[#F2ECE1] dark:bg-[#292524] hover:bg-[#E5DEC9] dark:hover:bg-[#36312E] text-[#1C1917] dark:text-[#FAF7F2] border border-[#E5DEC9] dark:border-[#36312E] transition-colors cursor-pointer"
            title={isExpanded ? 'Collapse 30-Day Heatmap' : 'Expand 30-Day Heatmap'}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* 1. VISUAL 30-DAY HEATMAP MATRIX GRID */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#57534E] dark:text-[#A8A29E]">
              <span>30-Day Activity Matrix (Day 1 → Day 30)</span>
              <div className="flex items-center gap-2">
                <span>Intensity:</span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-xs bg-[#E5DEC9]/45 dark:bg-[#2A241F] border border-[#D6CEBF]/50" />
                  <span className="text-[10px]">0</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-xs bg-[#FDE68A] border border-[#F59E0B]/60" />
                  <span className="text-[10px]">1</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-xs bg-[#F59E0B] border border-[#D97706]" />
                  <span className="text-[10px]">2</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-xs bg-[#1C1917] dark:bg-[#F59E0B] border border-[#D97706]" />
                  <span className="text-[10px]">3+</span>
                </span>
              </div>
            </div>

            {/* 30-Day Heatmap Grid */}
            <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-1.5 pt-1">
              {heatmapData.map((dayItem) => {
                const isHovered = hoveredDay?.dateKey === dayItem.dateKey;
                return (
                  <div
                    key={dayItem.dateKey}
                    onMouseEnter={() => setHoveredDay(dayItem)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`relative p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-between h-[62px] ${getTileBgClass(
                      dayItem.chaptersRead
                    )} ${
                      dayItem.isToday
                        ? 'ring-2 ring-[#D97706] ring-offset-1 scale-105 z-10'
                        : ''
                    } ${isHovered ? 'scale-110 shadow-md z-20' : ''}`}
                  >
                    <div className="text-[9.5px] font-mono opacity-80 leading-none truncate">
                      {dayItem.shortDay}
                    </div>
                    <div className="text-xs font-bold leading-none">
                      {dayItem.dayLabel.split(' ')[1]}
                    </div>
                    <div className="text-[10px] font-mono font-bold leading-none">
                      {dayItem.chaptersRead > 0 ? `${dayItem.chaptersRead}ch` : '—'}
                    </div>

                    {/* Tooltip Hover Overlay */}
                    {isHovered && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-44 p-2.5 rounded-xl bg-[#1C1917] text-[#FAF7F2] border border-[#D97706] shadow-xl text-left pointer-events-none space-y-1 font-sans">
                        <div className="text-[10px] font-mono text-[#FBBF24] font-bold">
                          {dayItem.dayLabel} {dayItem.isToday ? '(Today)' : ''}
                        </div>
                        <div className="text-xs font-semibold">
                          {dayItem.chaptersRead} Chapters Read
                        </div>
                        <div className="text-[10.5px] text-[#D6D3D1] space-y-0.5 font-mono">
                          <div>⏱ {dayItem.minutesStudied} Mins Studied</div>
                          <div>📖 {dayItem.versesCompared} Verses Compared</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. RECHARTS 30-DAY VOLUME & VELOCITY COMPOSED CHART */}
          <div className="space-y-2 pt-2 border-t border-[#E5DEC9] dark:border-[#36312E]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[#92400E] dark:text-[#FBBF24]">
                Recharts 30-Day Volume &amp; Study Curve
              </span>
              <span className="font-mono text-[11px] text-[#57534E] dark:text-[#A8A29E]">
                Bar: Chapters · Curve: Study Mins
              </span>
            </div>

            <div className="h-[210px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={heatmapData}
                  margin={{top: 10, right: 12, left: -18, bottom: 0}}
                >
                  <defs>
                    <linearGradient
                      id="monthlyMinutesGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop stopColor="#D97706" stopOpacity={0.3} offset="5%" />
                      <stop stopColor="#D97706" stopOpacity={0.02} offset="95%" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5DEC9"
                  />
                  <XAxis
                    dataKey="dayLabel"
                    tick={{
                      fill: '#57534E',
                      fontSize: 10,
                      fontFamily: 'monospace',
                    }}
                    axisLine={{stroke: '#E5DEC9'}}
                    tickLine={false}
                    interval={3}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{
                      fill: '#57534E',
                      fontSize: 10,
                      fontFamily: 'monospace',
                    }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{
                      fill: '#92400E',
                      fontSize: 10,
                      fontFamily: 'monospace',
                    }}
                    axisLine={false}
                    tickLine={false}
                    unit="m"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1C1917',
                      borderColor: '#D97706',
                      borderRadius: '12px',
                      color: '#FAF7F2',
                      fontSize: '12px',
                      padding: '10px',
                    }}
                    itemStyle={{color: '#FAF7F2'}}
                    labelStyle={{
                      color: '#FBBF24',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      marginBottom: '4px',
                    }}
                  />
                  <ReferenceLine
                    yAxisId="left"
                    y={targetDailyChapters}
                    stroke="#4A5D4E"
                    strokeDasharray="4 4"
                    label={{
                      value: `Target (${targetDailyChapters} ch/d)`,
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
                    fill="url(#monthlyMinutesGrad)"
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="chaptersRead"
                    name="Chapters Read"
                    fill="#1C1917"
                    radius={[4, 4, 0, 0]}
                    barSize={14}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. GAMIFICATION BADGES & STATS FOOTER */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[#F2ECE1]/80 dark:bg-[#292524] border border-[#E5DEC9] dark:border-[#36312E] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#D97706]/15 text-[#D97706] flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-[#57534E] dark:text-[#A8A29E]">
                  30-Day Volume
                </div>
                <div className="text-sm font-bold text-[#1C1917] dark:text-[#FAF7F2]">
                  {metrics.total30dChapters} Chapters Read
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F2ECE1]/80 dark:bg-[#292524] border border-[#E5DEC9] dark:border-[#36312E] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#D97706]/15 text-[#D97706] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-[#57534E] dark:text-[#A8A29E]">
                  Total Immersion
                </div>
                <div className="text-sm font-bold text-[#1C1917] dark:text-[#FAF7F2]">
                  {metrics.total30dMinutes} Minutes Logged
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F2ECE1]/80 dark:bg-[#292524] border border-[#E5DEC9] dark:border-[#36312E] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#D97706]/15 text-[#D97706] flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-[#57534E] dark:text-[#A8A29E]">
                  Milestone Status
                </div>
                <div className="text-sm font-bold text-[#1C1917] dark:text-[#FAF7F2]">
                  Habit Pioneer Badge Unlocked! 🏆
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
