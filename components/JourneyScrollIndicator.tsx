'use client';

import React, {useState} from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from 'motion/react';
import MilestoneMenu from '@/components/MilestoneMenu';

interface MilestoneStage {
  id: string;
  ageRange: string;
  label: string;
  href: string;
  threshold: number;
}

const MILESTONE_STAGES: MilestoneStage[] = [
  {
    id: 'childhood',
    ageRange: 'Ages 3–7',
    label: '01. Bedtime Sanctuary',
    href: '#three-tier-grid',
    threshold: 0,
  },
  {
    id: 'tween',
    ageRange: 'Ages 8–12',
    label: '02. Historical Archive',
    href: '#phase-3-archive',
    threshold: 0.33,
  },
  {
    id: 'teen',
    ageRange: 'Ages 13–18',
    label: '03. Safe Harbor',
    href: '#phase-4-harbor',
    threshold: 0.66,
  },
];

export default function JourneyScrollIndicator() {
  const {scrollYProgress} = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const [currentAge, setCurrentAge] = useState<number>(3);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(1, latest));
    // Interpolate smoothly from Age 3 at the top of the page to Age 18 at the bottom
    const mappedAge = Math.round(3 + clamped * 15);
    setCurrentAge(mappedAge);

    if (clamped < 0.33) {
      setActiveStageIndex(0);
    } else if (clamped < 0.66) {
      setActiveStageIndex(1);
    } else {
      setActiveStageIndex(2);
    }
  });

  const activeStage = MILESTONE_STAGES[activeStageIndex];

  return (
    <div
      aria-label="Reading journey milestone progress from age 3 to 18"
      className="sticky top-[69px] z-30 bg-[#FAF7F2]/90 dark:bg-[#1A1A1A]/90 backdrop-blur-md border-b border-[#E5DEC9] dark:border-[#36312E]"
    >
      {/* Subtle 2px Continuous Warm Amber Progress Fill */}
      <div className="relative h-[2px] w-full bg-[#E5DEC9]/60 dark:bg-[#36312E] overflow-hidden">
        <motion.div
          className="h-full bg-[#D97706] origin-left"
          style={{
            scaleX: smoothProgress,
          }}
        />
      </div>

      {/* Compact Milestone Bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between gap-3 text-[11px] text-[#57534E] dark:text-[#A8A29E]">
        {/* Left: Live Interpolated Reader Age Indicator */}
        <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
          <span
            className="font-mono font-semibold text-[#92400E] dark:text-[#FBBF24] tabular-nums"
            style={{fontFamily: 'var(--font-mono), monospace'}}
          >
            Journey Milestone: Age {currentAge}
          </span>
          <span aria-hidden="true" className="text-[#E5DEC9] dark:text-[#44403C]">
            ·
          </span>
          <span className="text-[#1C1917] dark:text-[#F9F6F0] font-medium hidden xs:inline truncate">
            {activeStage.label} ({activeStage.ageRange})
          </span>
        </div>

        {/* Center: Centered Milestone & Stages Dropdown Menu */}
        <div className="flex items-center justify-center">
          <MilestoneMenu
            currentAge={currentAge}
            triggerLabel="Stages"
            align="center"
          />
        </div>

        {/* Right: 3 Developmental Stage Anchors on wider screens */}
        <div className="hidden sm:flex items-center gap-5">
          {MILESTONE_STAGES.map((stage, idx) => {
            const isReached = idx <= activeStageIndex;
            const isCurrent = idx === activeStageIndex;
            return (
              <a
                key={stage.id}
                href={stage.href}
                className={`flex items-center gap-1.5 transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  isCurrent
                    ? 'text-[#1C1917] dark:text-[#F9F6F0] font-semibold'
                    : isReached
                    ? 'text-[#92400E] dark:text-[#FBBF24]'
                    : 'text-[#78716C] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-[#F9F6F0]'
                }`}
              >
                <span
                  className="font-mono tabular-nums"
                  style={{fontFamily: 'var(--font-mono), monospace'}}
                >
                  {stage.ageRange}
                </span>
                <span aria-hidden="true">·</span>
                <span className={isCurrent ? 'underline decoration-[#D97706] underline-offset-4' : ''}>
                  {stage.label.replace(/^0\d\.\s/, '')}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
