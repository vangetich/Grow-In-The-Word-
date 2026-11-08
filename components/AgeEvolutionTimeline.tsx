'use client';

import React, {useState} from 'react';
import {AGE_EVOLUTION_SNAPSHOTS} from '@/lib/design-spec-data';
import {ArrowRight, Check} from 'lucide-react';

interface AgeEvolutionTimelineProps {
  onOpenJourneyModal: (defaultTier?: 'bedtime' | 'archive' | 'harbor') => void;
}

export default function AgeEvolutionTimeline({
  onOpenJourneyModal,
}: AgeEvolutionTimelineProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(2); // Age 10 default
  const active = AGE_EVOLUTION_SNAPSHOTS[selectedIndex];

  return (
    <section
      id="age-evolution"
      className="py-20 lg:py-28 border-b border-[#E5DEC9] bg-[#F2ECE1]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium text-[#92400E]">
              <span>Longitudinal UI Architecture</span>
              <span aria-hidden="true">·</span>
              <span>15-Year Reading Continuum</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1C1917]"
              style={{
                fontFamily: 'var(--font-display), serif',
                textWrap: 'balance',
              }}
            >
              Watch the interface grow up from age 3 to 18.
            </h2>
            <p className="text-base text-[#44403C] leading-relaxed">
              Select any milestone age below to inspect how Grow In The Word
              reconfigures its reading canvas, typographic measure, and
              commentary depth for the exact same biblical text.
            </p>
          </div>

          {/* Interactive Age Milestone Selector */}
          <div
            role="group"
            aria-label="Select reader age milestone"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#FAF7F2] border border-[#E5DEC9] rounded-xl"
          >
            {AGE_EVOLUTION_SNAPSHOTS.map((snap, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={snap.age}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                    isSelected
                      ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#F2ECE1]'
                  }`}
                >
                  Age {snap.age}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Showcase Panel */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Columns: Live Rendered Screen Specimen */}
          <div
            className={`lg:col-span-7 rounded-xl border p-6 sm:p-9 flex flex-col justify-between transition-colors duration-200 ${
              active.tierId === 'bedtime'
                ? 'bg-[#1C1917] text-[#FAF7F2] border-[#292524]'
                : 'bg-[#FAF7F2] text-[#1C1917] border-[#E5DEC9]'
            }`}
          >
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-current/10 text-xs">
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-[#D97706] font-semibold">
                    {active.tierLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="opacity-80">{active.ageRangeLabel}</span>
                </div>
                <span
                  className="font-mono tabular-nums opacity-75"
                  style={{fontFamily: 'var(--font-mono), monospace'}}
                >
                  {active.passageReference}
                </span>
              </div>

              <div className="space-y-4">
                <h3
                  className="text-2xl sm:text-3xl font-normal tracking-tight"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  {active.passageTitle}
                </h3>

                <p
                  className="text-base sm:text-lg leading-[1.75] opacity-95"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  {active.primaryText}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-current/10 space-y-3">
              <div className="text-xs font-semibold text-[#D97706]">
                {active.companionNoteTitle}
              </div>
              <p className="text-sm leading-relaxed opacity-90">
                {active.companionNoteBody}
              </p>
              <div
                className="pt-2 text-xs font-mono text-[#D97706] tabular-nums"
                style={{fontFamily: 'var(--font-mono), monospace'}}
              >
                Active System Layer: {active.interactivePrompt}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: UI/UX Specification Breakdown for This Age */}
          <div className="lg:col-span-5 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div>
                <div className="text-xs font-medium text-[#92400E]">
                  UI/UX Specification · Reader Age {active.age}
                </div>
                <h4
                  className="mt-1 text-2xl font-normal text-[#1C1917]"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  Why the interface looks and behaves this way at {active.age}
                </h4>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#E5DEC9]">
                <div className="text-xs font-semibold text-[#1C1917]">
                  Typographic & Optical Rules
                </div>
                <p
                  className="text-xs font-mono text-[#57534E] tabular-nums"
                  style={{fontFamily: 'var(--font-mono), monospace'}}
                >
                  {active.typographySpec}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#E5DEC9]">
                <div className="text-xs font-semibold text-[#1C1917]">
                  Stage-Specific Guardrails & Affordances
                </div>
                <ul className="space-y-2.5">
                  {active.uiCharacteristics.map((charItem) => (
                    <li
                      key={charItem}
                      className="flex items-start gap-2.5 text-sm text-[#44403C]"
                    >
                      <Check className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                      <span>{charItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-5 border-t border-[#E5DEC9]">
              <button
                type="button"
                onClick={() => onOpenJourneyModal(active.tierId)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#1C1917] text-[#FAF7F2] text-sm font-semibold hover:bg-[#292524] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Start with {active.tierLabel}</span>
                <ArrowRight className="w-4 h-4 text-[#D97706]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
