'use client';

import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import {motion, AnimatePresence} from 'motion/react';
import {
  ArrowRight,
  Volume2,
  Compass,
  Lock,
  BookOpen,
  Pause,
  Play,
} from 'lucide-react';
import {
  AGE_EVOLUTION_SNAPSHOTS,
  HERO_COPY_VARIANTS,
} from '@/lib/design-spec-data';
import AncientHistoryInsightPopover from '@/components/AncientHistoryInsightPopover';

interface HeroSectionProps {
  onOpenJourneyModal: (defaultTier?: 'bedtime' | 'archive' | 'harbor') => void;
}

export default function HeroSection({onOpenJourneyModal}: HeroSectionProps) {
  const [selectedCopyIndex, setSelectedCopyIndex] = useState<number>(0);
  const [isAutoRolling, setIsAutoRolling] = useState<boolean>(true);
  const [isHoverPaused, setIsHoverPaused] = useState<boolean>(false);
  const [selectedSnapshotIndex, setSelectedSnapshotIndex] = useState<number>(2); // Default Age 10 (Archive)
  const [imgError, setImgError] = useState(false);

  const heroPresets = [
    {label: 'Age 4 · Bedtime', index: 0},
    {label: 'Age 10 · Archive', index: 2},
    {label: 'Age 16 · Safe Harbor', index: 3},
  ];

  const totalVariants = HERO_COPY_VARIANTS.length;
  const isEffectivelyRolling = isAutoRolling && !isHoverPaused;

  // Rolling auto-scroll cycle across the 4 primary headings (pauses on hover over reel or via Pause button)
  useEffect(() => {
    if (!isEffectivelyRolling) return;
    const timer = window.setInterval(() => {
      setSelectedCopyIndex((prev) => (prev + 1) % totalVariants);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [isEffectivelyRolling, totalVariants]);

  const activeCopy =
    HERO_COPY_VARIANTS[selectedCopyIndex] ?? HERO_COPY_VARIANTS[0];
  const activeSnap = AGE_EVOLUTION_SNAPSHOTS[selectedSnapshotIndex];

  return (
    <section className="relative w-full max-w-full overflow-hidden border-b border-[#E5DEC9] bg-[#F9F6F0] pt-14 pb-20 lg:pt-20 lg:pb-28">
      {/* Subtle Non-Distracting Soft Amber Gradient Orb & Warm Grounding Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-[560px] sm:max-w-[760px] h-[340px] rounded-full bg-[#D97706]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-36 left-1/3 w-full max-w-[380px] h-[240px] rounded-full bg-[#4A5D4E]/8 blur-3xl"
      />

      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 min-w-0">
        {/* Center-Aligned Hero Fold: Disarms Skepticism with Radical Honesty */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Auto-Scrolling Moving Header Reel (Hover over reel to pause automatically) */}
          <div
            onMouseEnter={() => setIsHoverPaused(true)}
            onMouseLeave={() => setIsHoverPaused(false)}
            className="group/reel relative rounded-2xl px-3 py-3 sm:px-6 sm:py-4 transition-colors duration-300 hover:bg-[#F2ECE1]/60"
            title="Hover over heading reel to pause auto-scroll"
          >
            {/* Rolling Auto-Scroll Viewport for Kicker, Headline & Sub-Headline */}
            <div
              className="relative overflow-hidden min-h-[240px] sm:min-h-[250px] flex flex-col items-center justify-center"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCopy.id}
                  initial={{opacity: 0, y: 28}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -28}}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="space-y-5 w-full"
                >
                  {/* Eyebrow Text (Small, uppercase, spaced) with Ancient History Hover Insight */}
                  <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#4A5D4E] flex items-center justify-center flex-wrap gap-1 min-h-[24px]">
                    {activeCopy.kicker.includes('ANCIENT HISTORY') ? (
                      <>
                        <span>
                          {activeCopy.kicker.split('ANCIENT HISTORY')[0]}
                        </span>
                        <AncientHistoryInsightPopover>
                          ANCIENT HISTORY
                        </AncientHistoryInsightPopover>
                        <span>
                          {activeCopy.kicker.split('ANCIENT HISTORY')[1]}
                        </span>
                      </>
                    ) : (
                      <span>{activeCopy.kicker}</span>
                    )}
                  </div>

                  {/* Headline (Large Sophisticated Serif) */}
                  <h1
                    className="text-[#1A1A1A] font-normal tracking-tight leading-[1.06]"
                    style={{
                      fontFamily: 'var(--font-display), serif',
                      fontSize: 'clamp(2.5rem, 5vw, 4.35rem)',
                      textWrap: 'balance',
                    }}
                  >
                    {activeCopy.headline}
                  </h1>

                  {/* Sub-Headline (Clean Geometric Sans-Serif, max 2-3 lines) */}
                  <p className="max-w-2xl mx-auto text-[#44403C] text-base sm:text-lg leading-[1.68] font-normal">
                    {activeCopy.subHeadline}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pause / Resume Button & Reel Progress Controls Just Below the Moving Reel */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setIsAutoRolling((prev) => !prev)}
                aria-pressed={!isAutoRolling}
                aria-label={
                  isAutoRolling
                    ? 'Pause auto-scrolling header reel'
                    : 'Resume auto-scrolling header reel'
                }
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold border transition-all cursor-pointer shadow-2xs ${
                  !isEffectivelyRolling
                    ? 'bg-[#1A1A1A] text-[#F9F6F0] border-[#D97706]'
                    : 'bg-[#F2ECE1] hover:bg-[#E5DEC9] text-[#1A1A1A] border-[#E5DEC9]'
                }`}
              >
                {!isEffectivelyRolling ? (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>
                      {!isAutoRolling
                        ? 'Resume Auto-Scroll'
                        : 'Paused on Hover'}
                    </span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Pause Auto-Scroll</span>
                  </>
                )}
              </button>

              {/* 4-Heading Reel Selector Pills Directly Below Moving Reel */}
              <div
                role="group"
                aria-label="Select or inspect 1 of 4 rolling hero headings"
                className="inline-flex flex-wrap items-center justify-center gap-1 p-1 bg-[#F2ECE1] border border-[#E5DEC9] rounded-full"
              >
                {HERO_COPY_VARIANTS.map((variant, idx) => {
                  const isSelected = idx === selectedCopyIndex;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedCopyIndex(idx)}
                      title={variant.label}
                      className={`relative overflow-hidden px-3 py-1 text-xs font-medium rounded-full transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#1A1A1A] text-[#F9F6F0] font-semibold shadow-2xs'
                          : 'text-[#57534E] hover:text-[#1A1A1A]'
                      }`}
                    >
                      <span className="font-mono text-[10px] text-[#D97706]">
                        0{idx + 1}
                      </span>
                      <span className="hidden md:inline">{variant.label}</span>
                      {isSelected && isEffectivelyRolling && (
                        <motion.span
                          key={`progress-${variant.id}`}
                          initial={{scaleX: 0}}
                          animate={{scaleX: 1}}
                          transition={{duration: 4.8, ease: 'linear'}}
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D97706] origin-left"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Primary Pill-Shaped Deep Charcoal CTA Button with Soft Amber Hover State */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onOpenJourneyModal(activeSnap.tierId)}
              className="group inline-flex items-center justify-center gap-3 px-9 py-4 text-[15px] font-semibold text-[#F9F6F0] bg-[#1A1A1A] hover:bg-[#292524] hover:text-[#FAF7F2] hover:ring-2 hover:ring-[#D97706] hover:shadow-lg active:scale-[0.985] rounded-full transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D97706]"
            >
              <span>Begin the Journey</span>
              <ArrowRight className="w-4 h-4 text-[#D97706] group-hover:text-[#FBBF24] transition-transform duration-150 group-hover:translate-x-1" />
            </button>

            <a
              href="#how-to-use"
              className="inline-flex items-center justify-center px-6 py-4 text-sm font-semibold text-[#1A1A1A] bg-[#F2ECE1] hover:bg-[#E5DEC9] border border-[#E5DEC9] rounded-full transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              How to Use This App
            </a>

            <a
              href="#three-tier-grid"
              className="inline-flex items-center justify-center px-6 py-4 text-sm font-medium text-[#44403C] hover:text-[#1A1A1A] hover:bg-[#F2ECE1] rounded-full transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              Explore the Three Tiers
            </a>
          </div>

          {/* Quiet Integrity & Grounding Microcopy */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5 text-xs text-[#57534E]">
            <span className="font-medium text-[#4A5D4E]">
              Grow In The Word Ecosystem (Ages 3–18)
            </span>
            <span aria-hidden="true">·</span>
            <span>Zero religious coercion</span>
            <span aria-hidden="true">·</span>
            <span>Encrypted teen privacy from day one</span>
          </div>
        </div>

        {/* Below-Fold Visual Anchor: Responsive Grow-With-Me UI Preview Card (Fits in Single Vertical Viewport) */}
        <div
          id="grow-with-me-preview-card"
          className="mt-10 sm:mt-12 rounded-2xl border border-[#E5DEC9] bg-[#F2ECE1] overflow-hidden shadow-sm max-w-full"
        >
          {/* Unified Responsive Card Header Bar */}
          <div className="px-4 sm:px-6 py-3.5 bg-[#1A1A1A] text-[#F9F6F0] border-b border-[#292524] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-medium">
              <span className="font-semibold text-[#F9F6F0]">
                Grow-With-Me UI Preview
              </span>
              <span className="text-[#78716C]" aria-hidden="true">
                ·
              </span>
              <span className="text-[#FBBF24] font-medium">
                Same Passage Across Three Life Stages
              </span>
            </div>

            <div
              role="group"
              aria-label="Preview interface by age stage"
              className="grid grid-cols-3 sm:flex items-center gap-1 p-1 bg-[#292524] border border-[#44403C] rounded-xl w-full sm:w-auto min-w-0"
            >
              {heroPresets.map((preset) => {
                const isSelected = selectedSnapshotIndex === preset.index;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setSelectedSnapshotIndex(preset.index)}
                    className={`px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-medium rounded-lg transition-colors duration-150 text-center truncate sm:whitespace-nowrap cursor-pointer min-w-0 ${
                      isSelected
                        ? 'bg-[#D97706] text-[#1A1A1A] font-semibold shadow-2xs'
                        : 'text-[#E7E5E4] hover:text-white'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Responsive Card Body — Compact Vertical Footprint so all info fits in vertical view window */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left 4 Columns: Compact Editorial Photography & Stage Metadata */}
            <div className="lg:col-span-4 relative h-36 sm:h-44 lg:h-auto lg:min-h-[240px] w-full overflow-hidden bg-[#1A1A1A]">
              {!imgError ? (
                <Image
                  src="/images/hero_sanctuary_journal.jpg"
                  alt="Minimalist oak and travertine study table at golden hour with linen journal and matte charcoal tablet"
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="object-cover object-center transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1A1A1A] via-[#292524] to-[#44403C] p-4 text-center">
                  <BookOpen className="w-6 h-6 text-[#D97706] mb-1.5" />
                  <p className="text-xs text-[#F9F6F0] font-medium">
                    Grow In The Word Editorial Sanctuary
                  </p>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/95 via-[#1A1A1A]/40 to-transparent" />

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2 text-[11px] text-[#F9F6F0]">
                <span className="font-mono uppercase tracking-wider text-[#FBBF24] font-semibold">
                  {activeSnap.ageRangeLabel}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#1A1A1A]/80 border border-[#44403C] text-[#E7E5E4] font-mono">
                  {activeSnap.passageReference}
                </span>
              </div>
            </div>

            {/* Right 8 Columns: Active Passage Specimen + All-Stages Quick Strip */}
            <div
              className={`lg:col-span-8 p-4 sm:p-6 transition-colors duration-200 flex flex-col justify-between gap-4 ${
                activeSnap.tierId === 'bedtime'
                  ? 'bg-[#1A1A1A] text-[#F9F6F0]'
                  : 'bg-[#F9F6F0] text-[#1A1A1A]'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2.5 border-current/10">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span>{activeSnap.tierLabel}</span>
                    <span aria-hidden="true" className="opacity-50">
                      ·
                    </span>
                    <span className="opacity-80">{activeSnap.passageReference}</span>
                  </div>
                  <span
                    className="text-[11px] sm:text-xs font-mono tabular-nums text-[#D97706] font-semibold"
                    style={{fontFamily: 'var(--font-mono), monospace'}}
                  >
                    {activeSnap.readingMode}
                  </span>
                </div>

                <h2
                  className="text-lg sm:text-xl font-normal tracking-tight leading-snug"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  {activeSnap.passageTitle}
                </h2>

                <p
                  className="text-xs sm:text-sm leading-relaxed opacity-90"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  {activeSnap.primaryText}
                </p>
              </div>

              {/* Companion Architecture Note */}
              <div
                className={`p-3 sm:p-3.5 rounded-xl border border-current/10 space-y-1 text-xs ${
                  activeSnap.tierId === 'bedtime'
                    ? 'bg-[#24211E] text-[#E7E5E4]'
                    : 'bg-[#F2ECE1] text-[#44403C]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold text-[#D97706]">
                  {activeSnap.tierId === 'bedtime' && (
                    <Volume2 className="w-3.5 h-3.5 shrink-0" />
                  )}
                  {activeSnap.tierId === 'archive' && (
                    <Compass className="w-3.5 h-3.5 shrink-0" />
                  )}
                  {activeSnap.tierId === 'harbor' && (
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{activeSnap.companionNoteTitle}</span>
                </div>
                <p className="leading-relaxed text-[11px] sm:text-xs">
                  {activeSnap.companionNoteBody}
                </p>
              </div>

              {/* All 3 Life Stages Visible Overview Strip */}
              <div className="pt-2.5 border-t border-current/10 grid grid-cols-1 sm:grid-cols-3 gap-2">
                {heroPresets.map((preset) => {
                  const snap = AGE_EVOLUTION_SNAPSHOTS[preset.index];
                  const isCurrent = selectedSnapshotIndex === preset.index;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setSelectedSnapshotIndex(preset.index)}
                      className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-[#D97706] bg-[#D97706]/10'
                          : 'border-current/10 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#D97706] font-semibold">
                        <span>{snap.ageRangeLabel}</span>
                        {isCurrent && <span>Active</span>}
                      </div>
                      <div className="text-xs font-semibold truncate mt-0.5">
                        {snap.tierLabel.replace(/^0\d\.\s*/, '')}
                      </div>
                      <div className="text-[11px] opacity-75 truncate">
                        {snap.readingMode}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Architectural Proof & Principle Bar */}
        <div className="mt-12 pt-8 border-t border-[#E5DEC9] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div
              className="text-2xl font-normal text-[#1A1A1A] tabular-nums"
              style={{fontFamily: 'var(--font-display), serif'}}
            >
              Ages 3–18
            </div>
            <p className="mt-1 text-xs text-[#57534E] leading-relaxed">
              A single continuous library that matures in typography, depth, and
              historical scholarship across 15 formative years.
            </p>
          </div>

          <div>
            <div
              className="text-2xl font-normal text-[#1A1A1A] tabular-nums"
              style={{fontFamily: 'var(--font-display), serif'}}
            >
              From Story to Sleep
            </div>
            <p className="mt-1 text-xs text-[#57534E] leading-relaxed">
              Audio-first bedtime rituals for little ones that transition into
              archaeological maps for tweens and honest laments for teens.
            </p>
          </div>

          <div>
            <div
              className="text-2xl font-normal text-[#1A1A1A] tabular-nums"
              style={{fontFamily: 'var(--font-display), serif'}}
            >
              Absolute Privacy
            </div>
            <p className="mt-1 text-xs text-[#57534E] leading-relaxed">
              Teen reflections in The Safe Harbor are cryptographically
              private—built for honest wrestling, never parental policing.
            </p>
          </div>

          <div>
            <div
              className="text-2xl font-normal text-[#1A1A1A] tabular-nums"
              style={{fontFamily: 'var(--font-display), serif'}}
            >
              Zero Coercion
            </div>
            <p className="mt-1 text-xs text-[#57534E] leading-relaxed">
              No manipulative notifications, cartoon gimmicks, or rehearsed
              platitudes—just primary texts and radical hospitality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
