'use client';

import React, {useState, useRef, useEffect} from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Compass,
  Moon,
  Scroll,
  Shield,
  Sparkles,
} from 'lucide-react';
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
    label: 'Bedtime Sanctuary',
    href: '#three-tier-grid',
    threshold: 0,
  },
  {
    id: 'tween',
    ageRange: 'Ages 8–12',
    label: 'Historical Archive',
    href: '#phase-3-archive',
    threshold: 0.33,
  },
  {
    id: 'teen',
    ageRange: 'Ages 13–18',
    label: 'Safe Harbor',
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
  const [isSubmenuDropdownOpen, setIsSubmenuDropdownOpen] = useState(false);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(1, latest));
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

  const checkTrackScroll = () => {
    if (scrollTrackRef.current) {
      const {scrollLeft, scrollWidth, clientWidth} = scrollTrackRef.current;
      setCanScrollLeft(scrollLeft > 8);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
    }
  };

  useEffect(() => {
    checkTrackScroll();
    window.addEventListener('resize', checkTrackScroll);
    return () => window.removeEventListener('resize', checkTrackScroll);
  }, []);

  const slideTrackLeft = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({left: -160, behavior: 'smooth'});
    }
  };

  const slideTrackRight = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({left: 160, behavior: 'smooth'});
    }
  };

  // Close dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSubmenuDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeStage = MILESTONE_STAGES[activeStageIndex];

  return (
    <div
      aria-label="Reading journey milestone progress from age 3 to 18"
      className="sticky top-[58px] sm:top-[65px] z-30 bg-[#1C1917] text-[#FAF7F2] border-b border-[#36312E] transition-colors duration-300"
    >
      {/* 2px Continuous Warm Amber Progress Fill */}
      <div className="relative h-[2px] w-full bg-[#36312E] overflow-hidden">
        <motion.div
          className="h-full bg-[#D97706] origin-left"
          style={{
            scaleX: smoothProgress,
          }}
        />
      </div>

      {/* Main Submenu Bar Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-3 text-[11px] text-[#A8A29E]">
        {/* Left: Live Interpolated Reader Age Indicator */}
        <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
          <span
            className="font-mono font-semibold text-[#FBBF24] tabular-nums"
            style={{fontFamily: 'var(--font-mono), monospace'}}
          >
            Journey Milestone: Age {currentAge}
          </span>
          <span aria-hidden="true" className="text-[#44403C]">
            ·
          </span>
          <span className="text-[#FAF7F2] font-medium hidden xs:inline truncate">
            {activeStage.label} ({activeStage.ageRange})
          </span>
        </div>

        {/* Center: Stage Anchors sitting cleanly in row and stages dropdown */}
        <div className="hidden md:flex items-center gap-4 text-xs font-medium shrink-0">
          {/* Stages overview dropdown */}
          <MilestoneMenu
            currentAge={currentAge}
            triggerLabel="Stages"
            align="center"
          />

          {MILESTONE_STAGES.map((stage, idx) => {
            const isReached = idx <= activeStageIndex;
            const isCurrent = idx === activeStageIndex;
            return (
              <a
                key={stage.id}
                href={stage.href}
                className={`flex items-center gap-1.5 transition-colors duration-150 whitespace-nowrap ${
                  isCurrent
                    ? 'text-[#FAF7F2] font-semibold'
                    : isReached
                    ? 'text-[#FBBF24]'
                    : 'text-[#A8A29E] hover:text-[#FAF7F2]'
                }`}
              >
                <span
                  className="font-mono tabular-nums text-[10px]"
                  style={{fontFamily: 'var(--font-mono), monospace'}}
                >
                  {stage.ageRange}
                </span>
                <span aria-hidden="true">·</span>
                <span
                  className={
                    isCurrent
                      ? 'underline decoration-[#D97706] underline-offset-4'
                      : ''
                  }
                >
                  {stage.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Right: Dropdown Menu Trigger for Tablet & Mobile Sizes */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="hidden xs:block md:hidden">
            <MilestoneMenu
              currentAge={currentAge}
              triggerLabel="Stages"
              align="center"
            />
          </div>

          {/* Submenu Dropdown Menu Button */}
          <button
            type="button"
            onClick={() => setIsSubmenuDropdownOpen((prev) => !prev)}
            aria-expanded={isSubmenuDropdownOpen}
            aria-label="Toggle Developmental Milestones & Stages Submenu"
            className="md:hidden inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF7F2] dark:bg-[#292524] border border-[#D97706]/60 text-[#1C1917] dark:text-[#FAF7F2] text-[10px] font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <span>Milestone Stages</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#D97706] transition-transform ${
                isSubmenuDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* TABLET & MOBILE SLIDE-IN SUBMENU DROPDOWN */}
      <AnimatePresence>
        {isSubmenuDropdownOpen && (
          <motion.div
            role="dialog"
            aria-label="Milestone Stages Mobile Menu"
            aria-modal="true"
            initial={{opacity: 0, y: -8, scale: 0.98}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: -8, scale: 0.98}}
            transition={{type: 'spring', stiffness: 360, damping: 28}}
            className="md:hidden absolute top-full left-0 right-0 z-40 bg-[#1C1917]/98 text-[#FAF7F2] border-b border-[#D97706]/70 shadow-2xl backdrop-blur-xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#2E2925]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#FBBF24]">
                  Developmental Stages Menu
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSubmenuDropdownOpen(false)}
                className="w-6 h-6 rounded-full bg-[#292524] text-[#A8A29E] hover:text-[#FAF7F2] flex items-center justify-center cursor-pointer"
                aria-label="Close stages menu"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Current Age Indicator in Dropdown */}
            <div className="p-3 rounded-xl bg-[#292524] border border-[#36312E] flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-[#A8A29E]">
                  Current Page Scroll Position:
                </span>
                <div className="font-bold text-[#FBBF24]">
                  Journey Milestone: Age {currentAge}
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#D97706]/20 text-[#FDE68A] border border-[#D97706]/40">
                {activeStage.label}
              </span>
            </div>

            {/* Stages Links Listed in User Prompt */}
            <div className="space-y-1.5 text-xs">
              <a
                href="#three-tier-grid"
                onClick={() => setIsSubmenuDropdownOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#24211E] hover:bg-[#2E2925] border border-[#36312E] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#1C1917] border border-[#D97706]/40 flex items-center justify-center text-[#D97706]">
                    <Moon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#A8A29E] block">
                      Ages 3–7
                    </span>
                    <strong className="text-xs text-[#FAF7F2]">
                      01. Bedtime Sanctuary
                    </strong>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#78716C]" />
              </a>

              <a
                href="#phase-3-archive"
                onClick={() => setIsSubmenuDropdownOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#24211E] hover:bg-[#2E2925] border border-[#36312E] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#1C1917] border border-[#D97706]/40 flex items-center justify-center text-[#D97706]">
                    <Scroll className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#A8A29E] block">
                      Ages 8–12
                    </span>
                    <strong className="text-xs text-[#FAF7F2]">
                      02. Historical Archive
                    </strong>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#78716C]" />
              </a>

              <a
                href="#phase-4-harbor"
                onClick={() => setIsSubmenuDropdownOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#24211E] hover:bg-[#2E2925] border border-[#36312E] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#1C1917] border border-[#D97706]/40 flex items-center justify-center text-[#D97706]">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#A8A29E] block">
                      Ages 13–18
                    </span>
                    <strong className="text-xs text-[#FAF7F2]">
                      03. Safe Harbor
                    </strong>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#78716C]" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
