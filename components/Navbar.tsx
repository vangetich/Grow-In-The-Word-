'use client';

import React, {useState, useRef, useEffect} from 'react';
import Link from 'next/link';
import {motion, AnimatePresence} from 'motion/react';
import {
  Moon,
  Sun,
  BookOpen,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Compass,
  ArrowRight,
  Shield,
  Layers,
  HeartHandshake,
  MessageSquareQuote,
  Target,
} from 'lucide-react';
import MilestoneMenu from '@/components/MilestoneMenu';

interface NavbarProps {
  onOpenJourneyModal: (defaultTier?: 'bedtime' | 'archive' | 'harbor') => void;
  onOpenFeatureAtlasModal?: () => void;
  isNightSanctuary: boolean;
  onToggleNightSanctuary: () => void;
}

export default function Navbar({
  onOpenJourneyModal,
  onOpenFeatureAtlasModal,
  isNightSanctuary,
  onToggleNightSanctuary,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position of the horizontal slider
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const {scrollLeft, scrollWidth, clientWidth} = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const slideLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({left: -220, behavior: 'smooth'});
    }
  };

  const slideRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({left: 220, behavior: 'smooth'});
    }
  };

  // Close mobile dropdown menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#F9F6F0] backdrop-blur-md border-b border-[#E5DEC9] transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Main Navbar Top Row */}
        <div className="flex items-center justify-between gap-3 sm:gap-5 py-3 sm:py-3.5">
          {/* Zone 1: Brand Wordmark */}
          <Link
            href="/"
            className="text-lg sm:text-2xl font-bold tracking-tight text-[#1C1917] dark:text-[#FAF7F2] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97706]"
            style={{fontFamily: 'var(--font-display), serif'}}
          >
            Grow In The Word
          </Link>

          {/* Zone 2: Horizontal Slide-to-Left / Right Nav Track (Desktop & Wider Screens) */}
          <div className="relative hidden xl:flex items-center flex-1 max-w-3xl mx-3 min-w-0">
            {/* Slide to Left Cue Button */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={slideLeft}
                aria-label="Slide navigation items left"
                className="absolute left-0 z-10 w-7 h-7 rounded-full bg-[#FAF7F2] dark:bg-[#292524] border border-[#E5DEC9] dark:border-[#36312E] text-[#1C1917] dark:text-[#FAF7F2] shadow-sm flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {/* Scrollable Container with pan-x slide effect */}
            <nav
              ref={scrollContainerRef}
              onScroll={checkScroll}
              aria-label="Primary Horizontal Navigation"
              className="flex items-center gap-4 overflow-x-auto scrollbar-none scroll-smooth px-6 py-1 text-sm font-medium text-[#57534E] dark:text-[#D6D3D1] whitespace-nowrap touch-pan-x"
              style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
            >
              <a
                href="#how-to-use"
                className="text-[#92400E] dark:text-[#FBBF24] font-semibold hover:text-[#1C1917] dark:hover:text-[#FAF7F2] hover:underline underline-offset-8 decoration-[#D97706] transition-colors py-1 shrink-0"
              >
                How to Use
              </a>
              <Link
                href="/bible-reader"
                className="inline-flex items-center gap-1.5 text-[#92400E] dark:text-[#FBBF24] font-semibold hover:text-[#1C1917] dark:hover:text-[#FAF7F2] hover:underline underline-offset-8 decoration-[#D97706] transition-colors py-1 shrink-0"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Full-Page Bible</span>
              </Link>
              <a
                href="#three-tier-grid"
                className="hover:text-[#1C1917] dark:hover:text-[#FAF7F2] hover:underline underline-offset-8 decoration-[#D97706] transition-colors py-1 shrink-0"
              >
                Three-Tier Preview
              </a>
              <a
                href="#growth-seed-tracker"
                className="text-[#92400E] dark:text-[#FBBF24] font-semibold hover:text-[#1C1917] dark:hover:text-[#FAF7F2] hover:underline underline-offset-8 decoration-[#D97706] transition-colors py-1 shrink-0"
              >
                Growth Seed Tracker
              </a>
              <a
                href="#phase-3-archive"
                className="hover:text-[#1C1917] dark:hover:text-[#FAF7F2] hover:underline underline-offset-8 decoration-[#D97706] transition-colors py-1 shrink-0"
              >
                Ancient Archive
              </a>
              <a
                href="#phase-4-harbor"
                className="hover:text-[#1C1917] dark:hover:text-[#FAF7F2] hover:underline underline-offset-8 decoration-[#D97706] transition-colors py-1 shrink-0"
              >
                Safe Harbor
              </a>
              <a
                href="#our-mission"
                className="hover:text-[#1C1917] dark:hover:text-[#FAF7F2] hover:underline underline-offset-8 decoration-[#D97706] transition-colors py-1 shrink-0"
              >
                Our Mission
              </a>
              <a
                href="#testimonials"
                className="hover:text-[#1C1917] dark:hover:text-[#FAF7F2] hover:underline underline-offset-8 decoration-[#D97706] transition-colors py-1 shrink-0"
              >
                Testimonials
              </a>
            </nav>

            {/* Slide to Right Cue Button */}
            {canScrollRight && (
              <button
                type="button"
                onClick={slideRight}
                aria-label="Slide navigation items right"
                className="absolute right-0 z-10 w-7 h-7 rounded-full bg-[#FAF7F2] dark:bg-[#292524] border border-[#E5DEC9] dark:border-[#36312E] text-[#1C1917] dark:text-[#FAF7F2] shadow-sm flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Zone 3: Action Buttons (Desktop CTAs & Mobile/Tablet Menu Button) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Desktop Quick-Access Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/bible-reader"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border bg-[#D97706]/15 text-[#92400E] dark:text-[#FBBF24] border-[#D97706]/50 hover:bg-[#D97706] hover:text-[#1A1A1A] transition-all whitespace-nowrap shrink-0 cursor-pointer"
                title="Read the Bible in Full-Page Form (AKJV · AMP · NASB · NIV · NLT)"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Full-Page Bible</span>
              </Link>

              <div className="hidden lg:block">
                <MilestoneMenu triggerLabel="Milestones" align="center" />
              </div>

              {onOpenFeatureAtlasModal && (
                <button
                  type="button"
                  onClick={onOpenFeatureAtlasModal}
                  className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border bg-[#FAF7F2] dark:bg-[#292524] text-[#1C1917] dark:text-[#FAF7F2] border-[#D6CEBF] dark:border-[#44403C] hover:border-[#D97706]/60 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Feature Atlas</span>
                </button>
              )}

              {/* Night Sanctuary Toggle */}
              <button
                type="button"
                onClick={onToggleNightSanctuary}
                aria-pressed={isNightSanctuary}
                title={
                  isNightSanctuary
                    ? 'Return to Warm Day Time Palette'
                    : 'Activate Night Sanctuary (2100K Muted Umber)'
                }
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isNightSanctuary
                    ? 'bg-[#292524] text-[#FBBF24] border-[#D97706]/60 shadow-xs'
                    : 'bg-[#F2ECE1] text-[#44403C] border-[#E5DEC9] hover:text-[#1C1917]'
                }`}
              >
                {isNightSanctuary ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#FBBF24]" />
                    <span className="hidden md:inline">Day Time</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#92400E]" />
                    <span className="hidden md:inline">Night Sanctuary</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onOpenJourneyModal()}
                className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#FAF7F2] bg-[#1C1917] hover:bg-[#292524] hover:ring-2 hover:ring-[#D97706]/60 rounded-lg transition-all shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
              >
                Begin Journey
              </button>
            </div>

            {/* TOP RIGHT TABLET & MOBILE DROPDOWN MENU BUTTON */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Full Navigation Menu"
              className="inline-flex xl:hidden items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#1C1917] text-[#FAF7F2] hover:bg-[#292524] border border-[#D97706]/60 transition-all cursor-pointer shadow-sm text-xs font-semibold"
            >
              {isMobileMenuOpen ? (
                <>
                  <X className="w-4 h-4 text-[#D97706]" />
                  <span className="hidden sm:inline">Close</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-[#D97706]" />
                  <span>Menu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* TOP RIGHT TABLET & MOBILE SLIDE-IN DROPDOWN MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-label="Mobile Navigation Menu"
            aria-modal="true"
            initial={{opacity: 0, x: 50, scale: 0.98}}
            animate={{opacity: 1, x: 0, scale: 1}}
            exit={{opacity: 0, x: 50, scale: 0.98}}
            transition={{type: 'spring', stiffness: 360, damping: 28}}
            className="xl:hidden fixed top-[60px] sm:top-[68px] right-3 sm:right-6 z-50 w-[min(360px,calc(100vw-1.5rem))] max-h-[82vh] overflow-y-auto rounded-3xl bg-[#1C1917]/98 text-[#FAF7F2] border border-[#D97706]/70 shadow-2xl backdrop-blur-xl p-5 space-y-4"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#2E2925]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D97706]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#FBBF24]">
                  Sanctuary Navigation
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-7 h-7 rounded-full bg-[#292524] text-[#A8A29E] hover:text-[#FAF7F2] flex items-center justify-center cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Complete Navigation Terms List */}
            <nav className="space-y-1.5 text-sm font-medium">
              <a
                href="#how-to-use"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#292524] transition-colors text-[#FDE68A]"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-[#D97706]" />
                  <span>How to Use</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#78716C]" />
              </a>

              <Link
                href="/bible-reader"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#D97706]/15 hover:bg-[#D97706]/25 border border-[#D97706]/40 text-[#FBBF24] font-semibold transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#D97706]" />
                  <span>Full-Page Bible (5 Versions)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D97706]" />
              </Link>

              <a
                href="#three-tier-grid"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#292524] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-[#D97706]" />
                  <span>Three-Tier Preview</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#78716C]" />
              </a>

              <a
                href="#growth-seed-tracker"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#292524] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Target className="w-4 h-4 text-[#D97706]" />
                  <span>Growth Seed Tracker</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#78716C]" />
              </a>

              <a
                href="#phase-3-archive"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#292524] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#D97706]" />
                  <span>Ancient Archive (Ages 8–12)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#78716C]" />
              </a>

              <a
                href="#phase-4-harbor"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#292524] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-[#D97706]" />
                  <span>Safe Harbor (Ages 13–18)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#78716C]" />
              </a>

              <a
                href="#our-mission"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#292524] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <HeartHandshake className="w-4 h-4 text-[#D97706]" />
                  <span>Our Mission</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#78716C]" />
              </a>

              <a
                href="#testimonials"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#292524] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquareQuote className="w-4 h-4 text-[#D97706]" />
                  <span>Testimonials</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#78716C]" />
              </a>
            </nav>

            {/* Quick Actions in Dropdown: Milestones, Atlas, Night Mode, Journey */}
            <div className="pt-3 border-t border-[#2E2925] space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <MilestoneMenu triggerLabel="Milestones" align="center" />

                {onOpenFeatureAtlasModal && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenFeatureAtlasModal();
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#292524] hover:bg-[#36312E] text-xs font-semibold text-[#FAF7F2] border border-[#44403C] transition-colors cursor-pointer text-center"
                  >
                    Feature Atlas
                  </button>
                )}
              </div>

              {/* Night Sanctuary Toggle Row */}
              <button
                type="button"
                onClick={onToggleNightSanctuary}
                className="w-full p-2.5 rounded-xl bg-[#292524] hover:bg-[#36312E] border border-[#44403C] flex items-center justify-between text-xs font-semibold text-[#FAF7F2] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {isNightSanctuary ? (
                    <Sun className="w-4 h-4 text-[#FBBF24]" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#D97706]" />
                  )}
                  <span>Night Sanctuary Palette</span>
                </div>
                <span className="font-mono text-[#FBBF24]">
                  {isNightSanctuary ? '2100K Active' : 'Day Time'}
                </span>
              </button>

              {/* Begin the Journey Primary Action */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenJourneyModal();
                }}
                className="w-full py-3 rounded-xl bg-[#D97706] hover:bg-[#F59E0B] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98] cursor-pointer"
              >
                <span>Begin the Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
