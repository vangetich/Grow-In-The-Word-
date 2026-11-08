'use client';

import React, {useState, useEffect, useMemo} from 'react';
import {
  Target,
  CheckCircle2,
  Plus,
  BookOpen,
  Sparkles,
  Trophy,
  Flame,
  ArrowRight,
} from 'lucide-react';

const READING_GOAL_STORAGE_KEY = 'grow_in_the_word_reading_goal_v1';

interface ReadingGoalTrackerCardProps {
  totalChaptersReadCanon: number;
  activeBookName: string;
  onLogGoalSession?: (points: number, label: string) => void;
}

export default function ReadingGoalTrackerCard({
  totalChaptersReadCanon,
  activeBookName,
  onLogGoalSession,
}: ReadingGoalTrackerCardProps) {
  const [goalCadence, setGoalCadence] = useState<'daily' | 'weekly'>('daily');
  const [targetChapters, setTargetChapters] = useState<number>(2);
  const [completedChapters, setCompletedChapters] = useState<number>(4);
  const [justLogged, setJustLogged] = useState<boolean>(false);
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false);

  // Restore saved goal state from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(READING_GOAL_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (typeof parsed.targetChapters === 'number') {
            setTargetChapters(parsed.targetChapters);
          }
          if (typeof parsed.completedChapters === 'number') {
            setCompletedChapters(parsed.completedChapters);
          }
          if (parsed.goalCadence === 'daily' || parsed.goalCadence === 'weekly') {
            setGoalCadence(parsed.goalCadence);
          }
        }
      } catch {
        // ignore storage errors
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const persistGoalState = (cadence: 'daily' | 'weekly', target: number, completed: number) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(
        READING_GOAL_STORAGE_KEY,
        JSON.stringify({
          goalCadence: cadence,
          targetChapters: target,
          completedChapters: completed,
        })
      );
    } catch {
      // ignore
    }
  };

  const handleLogChapter = () => {
    const nextCompleted = completedChapters + 1;
    setCompletedChapters(nextCompleted);
    persistGoalState(goalCadence, targetChapters, nextCompleted);
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 2200);
    onLogGoalSession?.(
      15,
      `Logged Chapter towards ${goalCadence} reading goal (${activeBookName})`
    );
  };

  const handleCadenceChange = (cadence: 'daily' | 'weekly') => {
    setGoalCadence(cadence);
    const newTarget = cadence === 'daily' ? 2 : 12;
    setTargetChapters(newTarget);
    persistGoalState(cadence, newTarget, completedChapters);
  };

  const handleTargetChange = (val: number) => {
    setTargetChapters(val);
    persistGoalState(goalCadence, val, completedChapters);
  };

  // Progress calculations
  const progressRatio = Math.min(1, completedChapters / Math.max(1, targetChapters));
  const progressPercent = Math.round(progressRatio * 100);
  const isGoalMet = completedChapters >= targetChapters;

  // SVG Circular Progress Ring parameters
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-[#FAF7F2] dark:bg-[#1C1917] border border-[#E5DEC9] dark:border-[#36312E] shadow-xs space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DEC9] dark:border-[#36312E] pb-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#1C1917] dark:bg-[#292524] border border-[#D97706]/60 flex items-center justify-center shrink-0 text-[#D97706]">
            <Target className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#92400E] dark:text-[#FBBF24]">
                Reading Goal Tracker &amp; Progress Ring
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold ${
                  isGoalMet
                    ? 'bg-[#10B981]/20 text-[#047857] dark:text-[#34D399] border border-[#10B981]/40'
                    : 'bg-[#D97706]/15 text-[#92400E] dark:text-[#FBBF24] border border-[#D97706]/30'
                }`}
              >
                {isGoalMet ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Goal Met! 🎉</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{targetChapters - completedChapters} Ch. to Goal</span>
                  </>
                )}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#D6D3D1] mt-0.5">
              Set your {goalCadence} chapter target and track your progress through the canon with a visual progress ring.
            </p>
          </div>
        </div>

        {/* Cadence Toggle & Customize */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex items-center p-1 rounded-xl bg-[#F2ECE1] dark:bg-[#292524] border border-[#E5DEC9] dark:border-[#36312E] text-xs">
            {(['daily', 'weekly'] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleCadenceChange(c)}
                className={`px-3 py-1 rounded-lg font-mono font-bold capitalize transition-all cursor-pointer ${
                  goalCadence === c
                    ? 'bg-[#1C1917] text-[#FAF7F2] dark:bg-[#FAF7F2] dark:text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] dark:text-[#D6D3D1] hover:text-[#1C1917]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsCustomizing((prev) => !prev)}
            className="px-3 py-2 rounded-xl bg-[#F2ECE1] dark:bg-[#292524] hover:bg-[#E5DEC9] dark:hover:bg-[#36312E] border border-[#E5DEC9] dark:border-[#36312E] text-xs font-semibold text-[#1C1917] dark:text-[#FAF7F2] transition-colors cursor-pointer"
          >
            {isCustomizing ? 'Done' : 'Configure Goal'}
          </button>
        </div>
      </div>

      {/* Main Goal Body: SVG Progress Ring + Stats + Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: SVG Visual Progress Ring */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-[#F2ECE1]/60 dark:bg-[#24211E]/80 border border-[#E5DEC9] dark:border-[#36312E]">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Track Circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-[#E5DEC9] dark:stroke-[#3E3834]"
                strokeWidth="9"
                fill="transparent"
              />
              {/* Animated Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-[#D97706] transition-all duration-700 ease-out"
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Center Content inside Ring */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold font-mono tracking-tight text-[#1C1917] dark:text-[#FAF7F2]">
                {progressPercent}%
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#92400E] dark:text-[#FBBF24]">
                {completedChapters} / {targetChapters} Ch.
              </span>
            </div>
          </div>

          <div className="text-center mt-3 text-xs text-[#57534E] dark:text-[#A8A29E] font-mono">
            {goalCadence === 'daily' ? 'Daily Chapter Goal' : 'Weekly Chapter Goal'}
          </div>
        </div>

        {/* Right: Details & Quick Actions */}
        <div className="md:col-span-7 space-y-4">
          {isCustomizing ? (
            <div className="p-4 rounded-2xl bg-[#F2ECE1] dark:bg-[#292524] border border-[#E5DEC9] dark:border-[#36312E] space-y-3 animate-in fade-in">
              <div className="text-xs font-semibold text-[#1C1917] dark:text-[#FAF7F2]">
                Select Target Chapters ({goalCadence}):
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {(goalCadence === 'daily' ? [1, 2, 3, 4, 5] : [7, 14, 21, 28, 35]).map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleTargetChange(val)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                      targetChapters === val
                        ? 'bg-[#D97706] text-[#1A1A1A] shadow-xs'
                        : 'bg-[#FAF7F2] dark:bg-[#1C1917] text-[#1C1917] dark:text-[#FAF7F2] border border-[#E5DEC9] dark:border-[#36312E]'
                    }`}
                  >
                    {val} Chapters
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#57534E] dark:text-[#A8A29E]">
                Goal target automatically resets periodically to keep your spiritual formation rhythm unhurried and life-giving.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-xs font-mono text-[#57534E] dark:text-[#A8A29E]">
                  Current Focus: <strong className="text-[#1C1917] dark:text-[#FAF7F2]">{activeBookName}</strong>
                </div>
                <div className="text-sm font-semibold text-[#1C1917] dark:text-[#FAF7F2]">
                  {isGoalMet
                    ? `Wonderful! You have met your ${goalCadence} goal of ${targetChapters} chapters.`
                    : `Keep going! Read ${targetChapters - completedChapters} more chapter${targetChapters - completedChapters === 1 ? '' : 's'} to hit your ${goalCadence} milestone.`}
                </div>
              </div>

              {/* Progress Bar Linear alternative */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="opacity-75">Progress Rhythm</span>
                  <span className="font-bold text-[#D97706]">{completedChapters} of {targetChapters} chapters</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#E5DEC9] dark:bg-[#292524] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] rounded-full transition-all duration-500"
                    style={{width: `${Math.min(100, progressPercent)}%`}}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleLogChapter}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    justLogged
                      ? 'bg-[#10B981] text-[#1A1A1A] scale-105'
                      : 'bg-[#D97706] hover:bg-[#F59E0B] text-[#1A1A1A] shadow-xs'
                  }`}
                >
                  {justLogged ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Chapter Logged! (+1)</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Log Chapter (+1)</span>
                    </>
                  )}
                </button>

                <div className="text-[11px] font-mono text-[#57534E] dark:text-[#A8A29E] pl-1">
                  Canon Total: {totalChaptersReadCanon} ch read
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
