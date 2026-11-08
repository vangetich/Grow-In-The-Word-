'use client';

import React from 'react';
import {motion, AnimatePresence, PanInfo} from 'motion/react';
import {
  X,
  Sprout,
  Flower2,
  TreeDeciduous,
  Trees,
  Feather,
  Compass,
  Moon,
  Sparkles,
  ArrowRight,
  Plus,
} from 'lucide-react';
import {GROWTH_STAGES, GrowthStageInfo} from '@/components/SanctuaryDashboardBar';
import {useFocusTrap} from '@/lib/useFocusTrap';

export interface GrowthTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  growthPoints: number;
  currentStage: GrowthStageInfo;
  onEarnPoints: (points: number, label: string) => void;
  seedIconLayoutId?: string;
}

const PILLAR_BREAKDOWN = [
  {
    id: 'reading',
    category: 'Reading & Bedtime Listening',
    ageTier: 'Tier 1 & All Ages',
    icon: Moon,
    accentColor: 'text-[#FBBF24]',
    borderColor: 'border-[#D97706]/40',
    pointsBadge: '+15 to +20 pts',
    description:
      'Engage with unhurried scripture passages, complete a 2100K Zero-Glow bedtime narrative, or share a Morning Bridge conversation over breakfast.',
    sampleActionLabel: 'Log Quiet Reading Session (+15 pts)',
    samplePoints: 15,
  },
  {
    id: 'journaling',
    category: 'Journaling & Honest Reflection',
    ageTier: 'Tier 3 · Safe Harbor',
    icon: Feather,
    accentColor: 'text-[#A7F3D0]',
    borderColor: 'border-[#4A5D4E]',
    pointsBadge: '+20 to +25 pts',
    description:
      'Write unfiltered prayers, doubts, or ethical reflections inside the locally encrypted Wrestling Ring vault with zero surveillance.',
    sampleActionLabel: 'Log Private Journal Reflection (+20 pts)',
    samplePoints: 20,
  },
  {
    id: 'exploring',
    category: 'Historical & Linguistic Exploring',
    ageTier: 'Tier 2 · Ancient Archive',
    icon: Compass,
    accentColor: 'text-[#FDE68A]',
    borderColor: 'border-[#D97706]/60',
    pointsBadge: '+15 to +35 pts',
    description:
      'Inspect Near Eastern archaeological artifacts, trace Bronze and Iron Age coordinates, or decipher Hebrew and Greek roots like Hesed and Shalom.',
    sampleActionLabel: 'Log Archive Artifact Discovery (+15 pts)',
    samplePoints: 15,
  },
];

export default function GrowthTrackerModal({
  isOpen,
  onClose,
  growthPoints,
  currentStage,
  onEarnPoints,
  seedIconLayoutId = 'sanctuary-growth-seed-icon',
}: GrowthTrackerModalProps) {
  const modalFocusTrapRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);
  const clampedPoints = Math.min(100, Math.max(0, growthPoints));
  const currentStageIndex = GROWTH_STAGES.findIndex(
    (s) => s.id === currentStage.id
  );
  const nextStage =
    currentStageIndex < GROWTH_STAGES.length - 1
      ? GROWTH_STAGES[currentStageIndex + 1]
      : null;

  const stageSpan = Math.max(1, currentStage.nextPoints - currentStage.minPoints);
  const stageProgressPct = nextStage
    ? Math.min(
        100,
        Math.max(
          0,
          Math.round(((clampedPoints - currentStage.minPoints) / stageSpan) * 100)
        )
      )
    : 100;
  const pointsToNextStage = nextStage
    ? Math.max(0, currentStage.nextPoints - clampedPoints)
    : 0;

  const renderStageIcon = (
    stageId: GrowthStageInfo['id'],
    sizeClass = 'w-5 h-5'
  ) => {
    if (stageId === 'seed') return <Sprout className={`${sizeClass} text-[#D97706]`} />;
    if (stageId === 'sprout') return <Flower2 className={`${sizeClass} text-[#84CC16]`} />;
    if (stageId === 'sapling') return <Sprout className={`${sizeClass} text-[#10B981]`} />;
    if (stageId === 'tree') return <TreeDeciduous className={`${sizeClass} text-[#F59E0B]`} />;
    return <Trees className={`${sizeClass} text-[#FBBF24]`} />;
  };

  const handleSwipeDismiss = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 90 || info.velocity.y > 420) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="growth-tracker-modal-title"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.22, ease: 'easeOut'}}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-2.5 py-3 sm:p-6 bg-[#141210]/80 backdrop-blur-xs overflow-y-auto overflow-x-hidden w-full max-w-full"
          onClick={onClose}
        >
          <motion.div
            ref={modalFocusTrapRef}
            tabIndex={-1}
            initial={{opacity: 0, scale: 0.94, y: 28}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.94, y: 36}}
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 28,
              mass: 0.9,
            }}
            drag="y"
            dragDirectionLock
            dragConstraints={{top: 0, bottom: 0}}
            dragElastic={{top: 0.04, bottom: 0.45}}
            onDragEnd={handleSwipeDismiss}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl mx-auto rounded-2xl bg-[#FAF7F2] text-[#1C1917] border border-[#E5DEC9] shadow-2xl overflow-hidden my-auto max-h-[92dvh] sm:max-h-[90dvh] flex flex-col touch-pan-y focus:outline-none"
          >
            {/* Mobile Swipe-to-Dismiss Handle Bar */}
            <div
              aria-hidden="true"
              className="sm:hidden flex flex-col items-center justify-center pt-2.5 pb-1 bg-[#F2ECE1] cursor-grab active:cursor-grabbing select-none shrink-0"
            >
              <div className="w-11 h-1.5 rounded-full bg-[#D6CEBF]" />
              <span className="text-[10px] font-mono text-[#78716C] mt-1">
                Swipe down to close
              </span>
            </div>

            {/* Modal Top Header */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#F2ECE1] border-b border-[#E5DEC9] flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#92400E] min-w-0">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span className="truncate">
                  Grow In The Word · Longitudinal Growth Seed Tracker
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Growth Tracker modal"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl text-[#57534E] hover:text-[#1C1917] hover:bg-[#E5DEC9] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 overflow-y-auto overscroll-contain min-w-0">
              {/* Current Stage & Next Evolution Hero Card */}
              <div className="p-4 sm:p-6 rounded-2xl bg-[#1C1917] text-[#FAF7F2] border border-[#292524] space-y-4 sm:space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#292524] border border-[#D97706] flex items-center justify-center shrink-0 shadow-md">
                      <motion.div
                        layoutId={seedIconLayoutId}
                        transition={{
                          layout: {type: 'spring', stiffness: 360, damping: 26},
                        }}
                        className="flex items-center justify-center"
                      >
                        {renderStageIcon(currentStage.id, 'w-6 h-6')}
                      </motion.div>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#FBBF24]">
                        Stage 0{currentStage.stageNumber} of 05 ·{' '}
                        {currentStage.ageHorizon}
                      </div>
                      <h2
                        id="growth-tracker-modal-title"
                        className="text-xl sm:text-2xl font-normal text-[#FAF7F2]"
                        style={{fontFamily: 'var(--font-display), serif'}}
                      >
                        {currentStage.name}
                      </h2>
                    </div>
                  </div>

                  <div className="px-3.5 py-2 rounded-xl bg-[#292524] border border-[#36312E] text-right self-start sm:self-center">
                    <div className="text-[10px] font-mono uppercase text-[#A8A29E]">
                      Total Growth Points
                    </div>
                    <div className="text-lg font-mono font-bold text-[#FBBF24] tabular-nums">
                      {clampedPoints} / 100 pts
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#D6D3D1] leading-relaxed">
                  {currentStage.description}
                </p>

                {/* Evolutionary Transition Progress Bar */}
                <div className="space-y-2 pt-2 border-t border-[#292524]">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-[#FAF7F2] flex items-center gap-1.5">
                      <span>{currentStage.name}</span>
                      {nextStage && (
                        <>
                          <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
                          <span className="text-[#FBBF24]">
                            {nextStage.name}
                          </span>
                        </>
                      )}
                    </span>
                    <span className="text-[#A8A29E]">
                      {nextStage
                        ? `${pointsToNextStage} pts needed for ${nextStage.name} (${stageProgressPct}%)`
                        : 'Maximum Evolutionary Stage Reached (100%)'}
                    </span>
                  </div>

                  <div className="w-full h-2.5 rounded-full bg-[#292524] overflow-hidden p-0.5">
                    <motion.div
                      initial={{width: 0}}
                      animate={{width: `${stageProgressPct}%`}}
                      transition={{duration: 0.6, ease: 'easeOut'}}
                      className="h-full rounded-full bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#10B981]"
                    />
                  </div>
                </div>
              </div>

              {/* Breakdown of How Growth Points Are Earned (Reading, Journaling, Exploring) */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3
                    className="text-lg sm:text-xl font-normal text-[#1C1917]"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    How Growth Points Are Earned
                  </h3>
                  <span className="text-xs text-[#57534E]">
                    Grace-driven formation through reading, journaling &amp;
                    exploring
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {PILLAR_BREAKDOWN.map((pillar) => {
                    const IconComponent = pillar.icon;
                    return (
                      <div
                        key={pillar.id}
                        className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <div className="w-9 h-9 rounded-lg bg-[#1C1917] text-[#D97706] flex items-center justify-center shrink-0">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="px-2 py-0.5 rounded bg-[#1C1917] text-[#FBBF24] font-mono text-[11px] font-semibold">
                              {pillar.pointsBadge}
                            </span>
                          </div>

                          <div>
                            <div className="text-[10px] font-mono uppercase tracking-wider text-[#92400E]">
                              {pillar.ageTier}
                            </div>
                            <h4 className="text-sm font-semibold text-[#1C1917]">
                              {pillar.category}
                            </h4>
                          </div>

                          <p className="text-xs text-[#44403C] leading-relaxed">
                            {pillar.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            onEarnPoints(
                              pillar.samplePoints,
                              pillar.sampleActionLabel
                            )
                          }
                          className="w-full min-h-[44px] py-2.5 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#1C1917] text-[#1C1917] hover:text-[#FAF7F2] border border-[#E5DEC9] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-4 h-4 text-[#D97706] shrink-0" />
                          <span>{pillar.sampleActionLabel}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 5-Stage Decade Evolution Trajectory */}
              <div className="space-y-2.5 pt-2 border-t border-[#E5DEC9]">
                <div className="text-xs font-mono uppercase tracking-wider text-[#57534E]">
                  Decade-Spanning Evolution Trajectory (Ages 3 to 18)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {GROWTH_STAGES.map((stage) => {
                    const isUnlocked = clampedPoints >= stage.minPoints;
                    const isCurrent = stage.id === currentStage.id;
                    return (
                      <div
                        key={stage.id}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isCurrent
                            ? 'bg-[#1C1917] text-[#FAF7F2] border-[#D97706] ring-1 ring-[#D97706]'
                            : isUnlocked
                            ? 'bg-[#F2ECE1] text-[#1C1917] border-[#D97706]/40'
                            : 'bg-[#FAF7F2] text-[#78716C] border-[#E5DEC9] opacity-70'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          {renderStageIcon(stage.id, 'w-4 h-4')}
                          <span className="text-[10px] font-mono">
                            {stage.minPoints}pt
                          </span>
                        </div>
                        <div className="text-xs font-semibold leading-tight truncate">
                          {stage.name}
                        </div>
                        <div
                          className={`text-[10px] truncate mt-0.5 ${
                            isCurrent ? 'text-[#D6D3D1]' : 'text-[#78716C]'
                          }`}
                        >
                          {stage.ageHorizon.split('·')[0]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer Action */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E5DEC9]">
                <span className="text-xs text-[#57534E]">
                  Grace-Driven Rhythm: Points never expire or reset if you miss a
                  day.
                </span>
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                  <a
                    href="#growth-seed-tracker"
                    onClick={onClose}
                    className="min-h-[44px] inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#F2ECE1] text-[#1C1917] hover:bg-[#E5DEC9] border border-[#D6CEBF] text-xs font-semibold transition-colors"
                  >
                    Open Inline Page Studio ↑
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#1C1917] text-[#FAF7F2] hover:bg-[#292524] text-xs font-semibold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
