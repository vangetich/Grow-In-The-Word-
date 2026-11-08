'use client';

import React from 'react';
import Link from 'next/link';
import {Moon, Sun, BookOpen} from 'lucide-react';
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
  return (
    <header className="sticky top-0 z-40 bg-[#F9F6F0]/95 backdrop-blur-md border-b border-[#E5DEC9] transition-colors duration-500">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-3.5 sm:py-4">
        {/* Zone 1: Brand Wordmark (single text element, no badges or subtitles) */}
        <Link
          href="/"
          className="text-lg sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97706]"
          style={{fontFamily: 'var(--font-display), serif'}}
        >
          Grow In The Word
        </Link>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-4 text-sm font-medium text-[#57534E]"
        >
          <a
            href="#how-to-use"
            className="text-[#92400E] font-semibold hover:text-[#1C1917] hover:underline underline-offset-8 decoration-[#D97706] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            How to Use
          </a>
          <Link
            href="/bible-reader"
            className="inline-flex items-center gap-1.5 text-[#92400E] font-semibold hover:text-[#1C1917] hover:underline underline-offset-8 decoration-[#D97706] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Full-Page Bible</span>
          </Link>
          <a
            href="#three-tier-grid"
            className="hover:text-[#1C1917] hover:underline underline-offset-8 decoration-[#D97706] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Three-Tier Preview
          </a>
          <a
            href="#growth-seed-tracker"
            className="text-[#92400E] font-semibold hover:text-[#1C1917] hover:underline underline-offset-8 decoration-[#D97706] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Growth Seed Tracker
          </a>
          <a
            href="#phase-3-archive"
            className="hover:text-[#1C1917] hover:underline underline-offset-8 decoration-[#D97706] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Ancient Archive
          </a>
          <a
            href="#phase-4-harbor"
            className="hover:text-[#1C1917] hover:underline underline-offset-8 decoration-[#D97706] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Safe Harbor
          </a>
          <Link
            href="/bible-study-studio"
            className="hover:text-[#1C1917] hover:underline underline-offset-8 decoration-[#D97706] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Study Studio
          </Link>
          <a
            href="#semantic-search"
            className="hover:text-[#1C1917] hover:underline underline-offset-8 decoration-[#D97706] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Search Archive
          </a>
        </nav>

        {/* Zone 3: Full-Page Bible CTA + Milestone Stages Dropdown + Feature Atlas Quick-Reference + Night Sanctuary Toggle + Primary Action */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <Link
            href="/bible-reader"
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs font-semibold rounded-lg border bg-[#D97706]/15 text-[#92400E] border-[#D97706]/50 hover:bg-[#D97706] hover:text-[#1A1A1A] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
            title="Read the Bible in Full-Page Form (AKJV · AMP · NASB · NIV · NLT)"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#D97706] group-hover:text-[#1A1A1A]" />
            <span>Full-Page Bible</span>
          </Link>

          <MilestoneMenu triggerLabel="Milestones" align="center" />

          {onOpenFeatureAtlasModal && (
            <button
              type="button"
              onClick={onOpenFeatureAtlasModal}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs font-semibold rounded-lg border bg-[#FAF7F2] text-[#1C1917] border-[#D6CEBF] hover:bg-[#F2ECE1] hover:border-[#D97706]/60 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
            >
              <span>Feature Atlas</span>
            </button>
          )}

          <button
            type="button"
            onClick={onToggleNightSanctuary}
            aria-pressed={isNightSanctuary}
            title={
              isNightSanctuary
                ? 'Return to Warm Alabaster Day Palette'
                : 'Activate Night Sanctuary (2100K Deep Charcoal & Muted Umber)'
            }
            className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs font-semibold rounded-lg border transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] ${
              isNightSanctuary
                ? 'bg-[#292524] text-[#FBBF24] border-[#D97706]/60 shadow-xs'
                : 'bg-[#F2ECE1] text-[#44403C] border-[#E5DEC9] hover:text-[#1C1917] hover:border-[#D97706]/50'
            }`}
          >
            {isNightSanctuary ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span className="hidden sm:inline">Night Sanctuary: On</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#92400E]" />
                <span className="hidden sm:inline">Night Sanctuary</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onOpenJourneyModal()}
            className="px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#FAF7F2] bg-[#1C1917] hover:bg-[#292524] hover:ring-2 hover:ring-[#D97706]/60 active:scale-[0.985] active:bg-[#141210] rounded-lg transition-all duration-150 shadow-xs whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
          >
            Begin the Journey
          </button>
        </div>
      </div>
    </header>
  );
}
