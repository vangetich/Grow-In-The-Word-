'use client';

import React, {useState} from 'react';
import {
  COLOR_PALETTE_SPEC,
  THREE_TIER_SPECS,
  CTA_SPECIFICATION,
  HERO_COPY_VARIANTS,
  CTA_VISUAL_STATES,
  SECURITY_CRO_SIGNUP_SPEC,
  FAMILIARITY_OPTIONS_SPEC,
  OPEN_DOOR_INTAKE_SPEC,
  FamiliarityLevelId,
  computeCustomEntryLane,
} from '@/lib/design-spec-data';
import {
  Check,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Lock,
  Users,
  HeartHandshake,
  BookOpen,
} from 'lucide-react';

interface DesignSpecInspectorProps {
  onOpenJourneyModal: (defaultTier?: 'bedtime' | 'archive' | 'harbor') => void;
}

export default function DesignSpecInspector({
  onOpenJourneyModal,
}: DesignSpecInspectorProps) {
  const [activeSpecTab, setActiveSpecTab] = useState<
    'open-door' | 'security-cro' | 'cta' | 'tiers' | 'hero' | 'visual'
  >('open-door');
  const [selectedCtaStateId, setSelectedCtaStateId] = useState<
    'resting' | 'hover' | 'focus' | 'active' | 'loading'
  >('hover');

  // Interactive Open Door Intake Frontend Preview State
  const [simAge, setSimAge] = useState<number>(12);
  const [simFamiliarity, setSimFamiliarity] =
    useState<FamiliarityLevelId>('beginner');

  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1800);
    }
  };

  const simLane = computeCustomEntryLane(simAge, simFamiliarity);
  const simBirthYear = 2026 - simAge;

  const activeCtaState =
    CTA_VISUAL_STATES.find((s) => s.id === selectedCtaStateId) ||
    CTA_VISUAL_STATES[0];

  return (
    <section
      id="design-spec"
      className="py-20 lg:py-28 border-b border-[#E5DEC9] bg-[#FAF7F2]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Top User-Facing Christian Formation Companion Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5DEC9]">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[#92400E]">
              <span>
                Guided Christian Formation &amp; Family Sanctuary Companion
              </span>
              <span aria-hidden="true">·</span>
              <span>Ages 3 to 18</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1C1917]"
              style={{
                fontFamily: 'var(--font-display), serif',
                textWrap: 'balance',
              }}
            >
              Personalized Scripture Paths, Family Trust &amp; Visual Calm
            </h2>
            <p className="text-base text-[#44403C] leading-relaxed">
              Explore how Grow In The Word welcomes each reader by age and
              scripture familiarity, protects teenage privacy, and maintains a
              warm, distraction-free reading environment across every stage of
              childhood and youth.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenJourneyModal(simLane.tierId)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1C1917] hover:bg-[#292524] text-xs font-semibold text-[#FAF7F2] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Begin the Journey</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
            </button>
          </div>
        </div>

        {/* Interactive User-Facing Companion Tabs */}
        <div
          role="tablist"
          aria-label="Christian Formation Companion Sections"
          className="mt-8 flex flex-wrap items-center gap-2 p-1.5 bg-[#F2ECE1] border border-[#E5DEC9] rounded-xl w-fit"
        >
          {[
            {
              id: 'open-door',
              label: '01. ‘Open Door’ Reader Path Finder',
            },
            {
              id: 'security-cro',
              label: '02. Family & Teen Privacy Promise',
            },
            {id: 'cta', label: '03. Gentle Onboarding Steps'},
            {id: 'tiers', label: '04. Three Life-Stage Sanctuaries'},
            {id: 'hero', label: '05. Core Formation Pillars'},
            {id: 'visual', label: '06. Warm Sanctuary Palette'},
          ].map((tab) => {
            const active = activeSpecTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() =>
                  setActiveSpecTab(
                    tab.id as
                      | 'open-door'
                      | 'security-cro'
                      | 'cta'
                      | 'tiers'
                      | 'hero'
                      | 'visual'
                  )
                }
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#1C1917] text-[#FAF7F2]'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 01: 'OPEN DOOR' INTAKE FLOW & POST-INTAKE WELCOME PAGE */}
        {activeSpecTab === 'open-door' && (
          <div className="mt-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left 7 Columns: Interactive Screen 1 (Age Check) + Screen 2 (Familiarity Check) Prototype */}
              <div className="lg:col-span-7 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 sm:p-8 space-y-8">
                {/* Screen 1 Specimen: The Age Check */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#92400E]">
                      {OPEN_DOOR_INTAKE_SPEC.screen1AgeCheck.title}
                    </span>
                    <span
                      className="text-xs font-mono text-[#57534E] tabular-nums"
                      style={{fontFamily: 'var(--font-mono), monospace'}}
                    >
                      Input 01 · Effortless Age & Birth-Year Slider
                    </span>
                  </div>

                  <div className="p-6 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-[#E5DEC9]">
                      <div>
                        <div className="text-xs text-[#57534E]">
                          {OPEN_DOOR_INTAKE_SPEC.screen1AgeCheck.promptHeadline}
                        </div>
                        <div
                          className="text-4xl sm:text-5xl font-normal text-[#1C1917] tabular-nums mt-1"
                          style={{fontFamily: 'var(--font-display), serif'}}
                        >
                          Age {simAge}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-[#57534E]">
                          Synced Birth Year
                        </div>
                        <div
                          className="text-2xl sm:text-3xl font-mono font-semibold text-[#92400E] tabular-nums mt-1"
                          style={{fontFamily: 'var(--font-mono), monospace'}}
                        >
                          Born {simBirthYear}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#57534E]">
                        <span>Age 3 (2023) · Bedtime</span>
                        <span>Age 10 (2016) · Archive</span>
                        <span>Age 18 (2008) · Safe Harbor</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Simulate reader age from 3 to 18"
                        min={3}
                        max={18}
                        value={simAge}
                        onChange={(e) => setSimAge(Number(e.target.value))}
                        className="w-full accent-[#D97706] cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {[4, 6, 8, 10, 12, 14, 16, 18].map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setSimAge(a)}
                          className={`px-2.5 py-1 rounded-md text-xs font-mono tabular-nums transition-colors cursor-pointer ${
                            simAge === a
                              ? 'bg-[#1C1917] text-[#FAF7F2] font-semibold'
                              : 'bg-[#F2ECE1] text-[#44403C] hover:bg-[#E5DEC9]'
                          }`}
                        >
                          Age {a} ({2026 - a})
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Screen 2 Specimen: The Familiarity Check + Radical Honesty Micro-Copy */}
                <div className="space-y-4 pt-6 border-t border-[#E5DEC9]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#92400E]">
                      {OPEN_DOOR_INTAKE_SPEC.screen2FamiliarityCheck.title}
                    </span>
                    <span
                      className="text-xs font-mono text-[#57534E]"
                      style={{fontFamily: 'var(--font-mono), monospace'}}
                    >
                      Input 02 · Non-Intimidating Posture Check
                    </span>
                  </div>

                  {/* Radical Honesty Micro-Copy Banner */}
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] flex items-start gap-3 text-xs text-[#44403C] leading-relaxed">
                    <HeartHandshake className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1C1917]">
                        The Radical Honesty Micro-Copy:
                      </strong>{' '}
                      “
                      {
                        OPEN_DOOR_INTAKE_SPEC.screen2FamiliarityCheck
                          .radicalHonestyMicrocopy
                      }
                      ”
                    </div>
                  </div>

                  {/* 3 Selectable Familiarity Cards */}
                  <div className="space-y-2.5">
                    {FAMILIARITY_OPTIONS_SPEC.map((opt) => {
                      const active = simFamiliarity === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSimFamiliarity(opt.id)}
                          className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                            active
                              ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] ring-2 ring-[#D97706]'
                              : 'bg-[#FAF7F2] text-[#1C1917] border-[#E5DEC9] hover:bg-[#E5DEC9]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className="text-base sm:text-lg font-normal"
                              style={{fontFamily: 'var(--font-display), serif'}}
                            >
                              {opt.quoteLabel}
                            </span>
                            <span
                              className="text-[11px] font-mono text-[#D97706] shrink-0"
                              style={{fontFamily: 'var(--font-mono), monospace'}}
                            >
                              {opt.internalCode}
                            </span>
                          </div>
                          <p
                            className={`mt-1.5 text-xs leading-relaxed ${
                              active ? 'text-[#D6D3D1]' : 'text-[#57534E]'
                            }`}
                          >
                            {opt.scaffoldingBehavior}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Frontend Christian Formation Companion Summary & Admin Backend Link */}
              <div className="lg:col-span-5 rounded-xl bg-[#FAF7F2] text-[#1C1917] border border-[#E5DEC9] p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex items-center justify-between text-xs text-[#92400E] pb-3 border-b border-[#E5DEC9]">
                    <div className="flex items-center gap-2 font-semibold">
                      <BookOpen className="w-4 h-4 text-[#D97706]" />
                      <span>Christian Formation Reading Companion</span>
                    </div>
                    <span
                      className="font-mono text-[11px] text-[#57534E]"
                      style={{fontFamily: 'var(--font-mono), monospace'}}
                    >
                      Age {simAge} Sanctuary Path
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-[#57534E]">
                      Recommended Scripture Companion Experience:
                    </div>
                    <div
                      className="text-2xl font-normal text-[#1C1917]"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      {simLane.tierName}
                    </div>
                    <p className="text-xs text-[#44403C] leading-relaxed">
                      “{simLane.welcomeCard.headline}”
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-2.5 text-xs">
                    <div>
                      <span className="text-[#57534E]">
                        First Guided Study:{' '}
                      </span>
                      <strong className="text-[#1C1917]">
                        {simLane.startingTrackTitle}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#57534E]">
                        Opening Scripture:{' '}
                      </span>
                      <span className="font-semibold text-[#92400E]">
                        {simLane.firstSessionPassage}
                      </span>
                    </div>
                    <p className="text-[#44403C] leading-relaxed pt-1 border-t border-[#E5DEC9]">
                      {simLane.welcomeCard.firstModulePreviewText}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F2ECE1]/70 border border-[#E5DEC9] space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>
                        Unrushed Pace &amp; Plain-English Context
                      </span>
                    </div>
                    <p className="text-[#57534E] leading-relaxed">
                      {simLane.welcomeCard.narrativeBody}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5DEC9] flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => onOpenJourneyModal(simLane.tierId)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#1C1917] hover:bg-[#292524] text-xs font-semibold text-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    <span>Begin This Scripture Journey</span>
                    <ArrowRight className="w-4 h-4 text-[#D97706]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 02: PRODUCT SECURITY & CRO SIGN-UP FLOW SPECIFICATION */}
        {activeSpecTab === 'security-cro' && (
          <div className="mt-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-6 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-[#92400E]">
                    01. The Entry Choice · Non-Confusing Role Fork
                  </div>
                  <h3
                    className="text-2xl font-normal text-[#1C1917]"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Parent/Guardian (Ages 3–12) vs. Teen/User (Ages 13–18)
                  </h3>
                  <p className="text-sm text-[#44403C] leading-relaxed">
                    {SECURITY_CRO_SIGNUP_SPEC.entryChoiceSplit.rationale}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#92400E]">
                        <span>Path A · Parent Setup</span>
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-sm font-semibold text-[#1C1917]">
                        {
                          SECURITY_CRO_SIGNUP_SPEC.entryChoiceSplit.parentPath
                            .ageScope
                        }
                      </div>
                      <p className="text-xs text-[#44403C] leading-relaxed">
                        {
                          SECURITY_CRO_SIGNUP_SPEC.entryChoiceSplit.parentPath
                            .securityModel
                        }
                      </p>
                      <button
                        type="button"
                        onClick={() => onOpenJourneyModal('bedtime')}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#92400E] hover:underline underline-offset-4 cursor-pointer"
                      >
                        <span>Test Parent Sign-Up Flow</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-[#1C1917] text-[#FAF7F2] border border-[#292524] space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#FBBF24]">
                        <span>Path B · Teen Reader</span>
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-sm font-semibold text-[#FAF7F2]">
                        {
                          SECURITY_CRO_SIGNUP_SPEC.entryChoiceSplit.teenPath
                            .ageScope
                        }
                      </div>
                      <p className="text-xs text-[#D6D3D1] leading-relaxed">
                        {
                          SECURITY_CRO_SIGNUP_SPEC.entryChoiceSplit.teenPath
                            .securityModel
                        }
                      </p>
                      <button
                        type="button"
                        onClick={() => onOpenJourneyModal('harbor')}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#FBBF24] hover:underline underline-offset-4 cursor-pointer"
                      >
                        <span>Test Teen Safe Harbor Flow</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-[#92400E]">
                    02. Frictionless Form & 03. Explicit Trust Badge
                  </div>
                  <h3
                    className="text-2xl font-normal text-[#1C1917]"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Zero-Bloat Input Architecture & Instant Integrity
                  </h3>
                  <p className="text-sm text-[#44403C] leading-relaxed">
                    {SECURITY_CRO_SIGNUP_SPEC.frictionlessForm.socialAuthSpec}
                  </p>

                  <div className="space-y-2 text-xs text-[#44403C]">
                    <div className="font-semibold text-[#1C1917]">
                      Eliminated Conversion Blockers:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SECURITY_CRO_SIGNUP_SPEC.frictionlessForm.eliminatedFriction.map(
                        (item) => (
                          <div
                            key={item}
                            className="flex items-start gap-2 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9]"
                          >
                            <Check className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <div className="text-xs font-semibold text-[#1C1917]">
                      The Trust & Privacy Badge Specimen (Placed 12px Below
                      Submit CTA):
                    </div>
                    <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
                        <ShieldCheck className="w-4 h-4 text-[#D97706] shrink-0" />
                        <span>
                          “
                          {
                            SECURITY_CRO_SIGNUP_SPEC.trustPrivacyBadge
                              .exactMicrocopy
                          }
                          ”
                        </span>
                      </div>
                      <p className="text-[11px] text-[#57534E] leading-relaxed">
                        {
                          SECURITY_CRO_SIGNUP_SPEC.trustPrivacyBadge
                            .cryptographicGuarantee
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 03: CTA Button State Machine */}
        {activeSpecTab === 'cta' && (
          <div className="mt-8 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-6 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-[#92400E]">
                    Conversion Optimization Deliverable · Button State Machine
                  </div>
                  <h3
                    className="text-2xl font-normal text-[#1C1917]"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Interactive “Begin the Journey” State Inspector
                  </h3>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {CTA_VISUAL_STATES.map((stateItem) => {
                      const active = selectedCtaStateId === stateItem.id;
                      return (
                        <button
                          key={stateItem.id}
                          type="button"
                          onClick={() => setSelectedCtaStateId(stateItem.id)}
                          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            active
                              ? 'bg-[#1C1917] text-[#FAF7F2]'
                              : 'bg-[#FAF7F2] text-[#44403C] border border-[#E5DEC9] hover:text-[#1C1917]'
                          }`}
                        >
                          {stateItem.stateName}
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-8 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] flex flex-col items-center justify-center space-y-4">
                    {selectedCtaStateId === 'resting' && (
                      <button
                        type="button"
                        onClick={() => onOpenJourneyModal()}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 text-[15px] font-semibold text-[#FAF7F2] bg-[#1C1917] rounded-lg shadow-xs cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Begin the Journey</span>
                        <ArrowRight className="w-4 h-4 text-[#D97706]" />
                      </button>
                    )}

                    {selectedCtaStateId === 'hover' && (
                      <button
                        type="button"
                        onClick={() => onOpenJourneyModal()}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 text-[15px] font-semibold text-[#FAF7F2] bg-[#292524] ring-2 ring-[#D97706]/60 rounded-lg shadow-md cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Begin the Journey</span>
                        <ArrowRight className="w-4 h-4 text-[#D97706] translate-x-1 transition-transform" />
                      </button>
                    )}

                    {selectedCtaStateId === 'focus' && (
                      <button
                        type="button"
                        onClick={() => onOpenJourneyModal()}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 text-[15px] font-semibold text-[#FAF7F2] bg-[#1C1917] outline-2 outline-offset-3 outline-[#D97706] ring-2 ring-[#D97706]/30 rounded-lg cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Begin the Journey</span>
                        <ArrowRight className="w-4 h-4 text-[#D97706]" />
                      </button>
                    )}

                    {selectedCtaStateId === 'active' && (
                      <button
                        type="button"
                        onClick={() => onOpenJourneyModal()}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 text-[15px] font-semibold text-[#FAF7F2] bg-[#141210] scale-[0.985] ring-2 ring-[#D97706] rounded-lg shadow-inner cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Begin the Journey</span>
                        <ArrowRight className="w-4 h-4 text-[#D97706] translate-x-1" />
                      </button>
                    )}

                    {selectedCtaStateId === 'loading' && (
                      <button
                        type="button"
                        onClick={() => onOpenJourneyModal()}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 text-[15px] font-semibold text-[#E7E5E4] bg-[#292524] border border-[#D97706]/50 rounded-lg cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Loader2 className="w-4 h-4 text-[#D97706] animate-spin" />
                        <span>Generating Local Vault Keys…</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5DEC9] space-y-2 text-xs">
                  <div>
                    <strong className="text-[#1C1917]">Trigger & Timing:</strong>{' '}
                    <span className="text-[#44403C]">
                      {activeCtaState.trigger}
                    </span>
                  </div>
                  <div>
                    <strong className="text-[#1C1917]">Visual Feedback:</strong>{' '}
                    <span className="text-[#44403C]">
                      {activeCtaState.visualChanges}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-[#92400E]">
                    End-to-End Conversion & Intake Sequence
                  </div>
                  <h3
                    className="text-2xl font-normal text-[#1C1917]"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    From Click to Custom Entry Lane
                  </h3>

                  <div className="space-y-3">
                    {CTA_SPECIFICATION.conversionFlowSteps.map((stepItem) => (
                      <div
                        key={stepItem.step}
                        className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] space-y-1.5"
                      >
                        <div className="text-xs font-mono text-[#92400E]">
                          {stepItem.step}
                        </div>
                        <div className="text-sm font-semibold text-[#1C1917]">
                          {stepItem.title}
                        </div>
                        <p className="text-xs text-[#44403C] leading-relaxed">
                          {stepItem.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 04: Content Strategist Three-Tier Matrix */}
        {activeSpecTab === 'tiers' && (
          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-[#E5DEC9] bg-[#F2ECE1] p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {THREE_TIER_SPECS.map((tier) => (
                  <div
                    key={tier.id}
                    className="rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] p-6 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-[#92400E]">
                        <span>
                          {tier.index}. {tier.name}
                        </span>
                        <span>{tier.ageSpan}</span>
                      </div>
                      <h4
                        className="text-xl font-normal text-[#1C1917]"
                        style={{fontFamily: 'var(--font-display), serif'}}
                      >
                        {tier.subtitle}
                      </h4>
                      <p className="text-sm text-[#44403C] leading-relaxed">
                        {tier.expandedStrategistDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E5DEC9] space-y-2 text-xs text-[#44403C]">
                      <div className="font-semibold text-[#1C1917]">
                        Highlighted Benefits:
                      </div>
                      {tier.keyBenefits.map((b) => (
                        <div key={b} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 05: Mission Copywriter Hero Spec */}
        {activeSpecTab === 'hero' && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {HERO_COPY_VARIANTS.map((variant) => (
                <div
                  key={variant.id}
                  className="rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 sm:p-7 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="text-xs font-semibold text-[#92400E]">
                      {variant.label}
                    </div>
                    <h3
                      className="text-2xl font-normal text-[#1C1917] leading-snug"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      “{variant.headline}”
                    </h3>
                    <p className="text-sm text-[#44403C] leading-relaxed">
                      “{variant.subHeadline}”
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5DEC9] space-y-1.5 text-xs text-[#57534E]">
                    <div className="font-semibold text-[#1C1917]">
                      Copywriter Rationale ({variant.focusPillar}):
                    </div>
                    <p className="leading-relaxed">
                      {variant.copywriterRationale}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 06: Visual & Aesthetic Direction */}
        {activeSpecTab === 'visual' && (
          <div className="mt-8 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COLOR_PALETTE_SPEC.map((swatch) => (
                <div
                  key={swatch.token}
                  onClick={() => handleCopyHex(swatch.hex)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCopyHex(swatch.hex);
                    }
                  }}
                  className="rounded-xl border border-[#E5DEC9] bg-[#F2ECE1] overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#D97706] transition-colors"
                >
                  <div>
                    <div
                      className="h-28 w-full p-4 flex items-end justify-between border-b border-[#E5DEC9]"
                      style={{backgroundColor: swatch.hex}}
                    >
                      <span
                        className={`text-xs font-mono font-medium tabular-nums ${
                          swatch.darkText ? 'text-[#1C1917]' : 'text-[#FAF7F2]'
                        }`}
                        style={{fontFamily: 'var(--font-mono), monospace'}}
                      >
                        {swatch.hex} · RGB({swatch.rgb})
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          swatch.darkText ? 'text-[#1C1917]' : 'text-[#FAF7F2]'
                        }`}
                      >
                        {copiedHex === swatch.hex ? 'Copied!' : 'Copy HEX'}
                      </span>
                    </div>

                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-[#92400E] font-mono">
                        <span>{swatch.token}</span>
                        <span>{swatch.contrastRatio}</span>
                      </div>
                      <h4
                        className="text-lg font-normal text-[#1C1917]"
                        style={{fontFamily: 'var(--font-display), serif'}}
                      >
                        {swatch.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#44403C]">
                        {swatch.proportion} — {swatch.role}
                      </p>
                      <p className="text-xs text-[#57534E] leading-relaxed">
                        {swatch.psychRationale}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
