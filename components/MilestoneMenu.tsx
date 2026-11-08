'use client';

import React, {useState, useRef, useEffect} from 'react';
import Link from 'next/link';
import {motion, AnimatePresence} from 'motion/react';
import {
  ChevronDown,
  Moon,
  Scroll,
  Shield,
  Compass,
  Check,
  Sparkles,
} from 'lucide-react';

export type AgeRangeFilter = 'all' | '3-7' | '8-12' | '13-18';

export interface MilestoneStageOption {
  id: AgeRangeFilter;
  label: string;
  ageRange: string;
  stageName: string;
  href: string;
  pageHref: string;
  journeyCoverage: string;
  progressPercent: number;
  yearsSpan: string;
  icon: typeof Moon;
  description: string;
}

export const MILESTONE_STAGE_OPTIONS: MilestoneStageOption[] = [
  {
    id: '3-7',
    label: 'Stage 01 · Bedtime Sanctuary',
    ageRange: 'Ages 3–7',
    stageName: 'Bedtime Sanctuary',
    href: '#three-tier-grid',
    pageHref: '/tiers',
    journeyCoverage: '33% (Years 1–5)',
    progressPercent: 33,
    yearsSpan: 'Years 1–5 of 15',
    icon: Moon,
    description: 'Sensory-gentle bedtime liturgies, quiet wonder, and zero blue-light.',
  },
  {
    id: '8-12',
    label: 'Stage 02 · Historical Archive',
    ageRange: 'Ages 8–12',
    stageName: 'Ancient Archive',
    href: '#phase-3-archive',
    pageHref: '/ancient-archive',
    journeyCoverage: '66% (Years 6–10)',
    progressPercent: 66,
    yearsSpan: 'Years 6–10 of 15',
    icon: Scroll,
    description: 'Archaeological coordinates, root ciphers, and ancient Near Eastern contexts.',
  },
  {
    id: '13-18',
    label: 'Stage 03 · Safe Harbor',
    ageRange: 'Ages 13–18',
    stageName: 'Safe Harbor & Ring',
    href: '#phase-4-harbor',
    pageHref: '/safe-harbor',
    journeyCoverage: '100% (Years 11–15)',
    progressPercent: 100,
    yearsSpan: 'Years 11–15 of 15',
    icon: Shield,
    description: 'Zero-surveillance encrypted vault, raw text collisions, and peer seminars.',
  },
];

interface MilestoneMenuProps {
  currentAge?: number;
  selectedRange?: AgeRangeFilter;
  onSelectRange?: (range: AgeRangeFilter) => void;
  triggerLabel?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  showAllOption?: boolean;
}

export default function MilestoneMenu({
  currentAge,
  selectedRange = 'all',
  onSelectRange,
  triggerLabel = 'Explore Stages',
  align = 'center',
  className = '',
  showAllOption = true,
}: MilestoneMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleStageSelect = (range: AgeRangeFilter) => {
    if (onSelectRange) {
      onSelectRange(range);
    }
    setIsOpen(false);
  };

  const alignmentClass =
    align === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : align === 'right'
      ? 'right-0'
      : 'left-0';

  return (
    <div className={`relative inline-flex justify-center ${className}`} ref={containerRef}>
      {/* Reusable Centered Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${triggerLabel} dropdown menu`}
        className="min-h-[40px] min-w-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F2ECE1] hover:bg-[#EAE4D5] dark:bg-[#292524] dark:hover:bg-[#36312E] text-[#1C1917] dark:text-[#F9F6F0] border border-[#E5DEC9] dark:border-[#36312E] text-xs font-semibold text-center transition-all duration-150 cursor-pointer shadow-2xs hover:border-[#D97706]/70 focus:outline-hidden focus:ring-2 focus:ring-[#D97706]/40"
      >
        <span>{triggerLabel}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#92400E] dark:text-[#FBBF24] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#D97706]' : ''
          }`}
        />
      </button>

      {/* Centered Dropdown Menu Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{opacity: 0, y: 6, scale: 0.96}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 6, scale: 0.96}}
            transition={{duration: 0.16, ease: 'easeOut'}}
            className={`absolute top-full mt-2 w-[min(350px,calc(100vw-2rem))] sm:w-[380px] rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1917] text-[#1C1917] dark:text-[#F9F6F0] border border-[#E5DEC9] dark:border-[#36312E] shadow-2xl p-3.5 space-y-3 z-50 overflow-hidden ${alignmentClass}`}
          >
            {/* Centered Popover Header */}
            <div className="flex flex-col items-center justify-center text-center pb-2 border-b border-[#E5DEC9] dark:border-[#292524] px-1 gap-0.5">
              <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-semibold text-[#92400E] dark:text-[#FBBF24] uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-[#D97706]" />
                <span>15-Year Journey Milestones &amp; Stages</span>
              </div>
              {currentAge !== undefined && (
                <span className="text-[10px] text-[#78716C] dark:text-[#A8A29E] font-mono">
                  Current Horizon: Age {currentAge}
                </span>
              )}
            </div>

            {/* Optional All Horizons / Full Arc Option */}
            {showAllOption && (
              <button
                type="button"
                onClick={() => handleStageSelect('all')}
                className={`w-full min-h-[44px] p-2.5 rounded-xl border flex items-center justify-between transition-colors cursor-pointer text-left ${
                  selectedRange === 'all'
                    ? 'bg-[#F2ECE1] dark:bg-[#292524] border-[#D97706] ring-1 ring-[#D97706]/40'
                    : 'bg-white dark:bg-[#24211E] hover:bg-[#F5EFE6] dark:hover:bg-[#2A2624] border-[#E5DEC9] dark:border-[#36312E]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] dark:bg-[#1C1917] border border-[#E5DEC9] dark:border-[#36312E] flex items-center justify-center shrink-0 text-[#D97706]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1C1917] dark:text-[#F9F6F0]">
                      All Developmental Horizons
                    </div>
                    <div className="text-[10.5px] text-[#57534E] dark:text-[#A8A29E]">
                      Full 15-Year Spectrum (Ages 3–18)
                    </div>
                  </div>
                </div>
                {selectedRange === 'all' && (
                  <Check className="w-4 h-4 text-[#D97706] shrink-0" />
                )}
              </button>
            )}

            {/* 3 Selectable Stages */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase font-mono tracking-wider text-[#78716C] dark:text-[#A8A29E] px-1 text-center">
                Select Developmental Stage &amp; Horizon
              </div>

              {MILESTONE_STAGE_OPTIONS.map((stage) => {
                const Icon = stage.icon;
                const isSelected = selectedRange === stage.id;
                return (
                  <div
                    key={stage.id}
                    className={`rounded-xl border p-2.5 transition-all ${
                      isSelected
                        ? 'bg-[#F2ECE1] dark:bg-[#292524] border-[#D97706] ring-1 ring-[#D97706]/40'
                        : 'bg-white dark:bg-[#24211E] hover:bg-[#F5EFE6] dark:hover:bg-[#2A2624] border-[#E5DEC9] dark:border-[#36312E]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleStageSelect(stage.id)}
                        className="flex-1 flex items-start gap-2.5 text-left cursor-pointer min-w-0"
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                            isSelected
                              ? 'bg-[#D97706] text-[#FAF7F2] border-[#92400E]'
                              : 'bg-[#FAF7F2] dark:bg-[#1C1917] text-[#92400E] dark:text-[#FBBF24] border-[#E5DEC9] dark:border-[#36312E]'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs text-[#1C1917] dark:text-[#F9F6F0]">
                              {stage.stageName}
                            </span>
                            <span className="font-mono text-[10px] text-[#92400E] dark:text-[#FBBF24] font-semibold">
                              {stage.ageRange}
                            </span>
                          </div>
                          <p className="text-[10.5px] text-[#57534E] dark:text-[#A8A29E] leading-snug line-clamp-1">
                            {stage.description}
                          </p>
                        </div>
                      </button>

                      {/* Direct Page Link */}
                      <Link
                        href={stage.pageHref}
                        onClick={() => setIsOpen(false)}
                        title={`Go to ${stage.stageName} dedicated studio`}
                        className="min-h-[32px] px-2 py-1 rounded-md bg-[#FAF7F2] dark:bg-[#1C1917] hover:bg-[#D97706] hover:text-[#1A1A1A] border border-[#E5DEC9] dark:border-[#36312E] text-[10px] font-semibold transition-colors shrink-0 flex items-center gap-1"
                      >
                        <span>Studio</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>

                    {/* Subtle 15-Year Progress Indicator Bar */}
                    <div className="mt-2 pt-1.5 border-t border-[#E5DEC9]/60 dark:border-[#36312E]/60 flex items-center justify-between text-[9.5px] text-[#78716C] dark:text-[#A8A29E]">
                      <div className="flex items-center gap-1.5 flex-1 pr-3">
                        <span className="font-mono">{stage.yearsSpan}</span>
                        <div className="flex-1 h-1 rounded-full bg-[#E5DEC9] dark:bg-[#36312E] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] rounded-full"
                            style={{width: `${stage.progressPercent}%`}}
                          />
                        </div>
                      </div>
                      <span className="font-mono text-[#D97706] shrink-0 font-semibold">
                        {stage.journeyCoverage}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
