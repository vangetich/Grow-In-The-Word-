'use client';

import React, {useState} from 'react';
import {motion} from 'motion/react';
import {Compass, Moon, Scroll, Shield, ArrowRight, CheckCircle2, Sparkles, BookOpen} from 'lucide-react';

interface FeatureMode {
  id: string;
  badge: string;
  ageRange: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Moon;
  accentColor: string;
  keyPoints: string[];
  href: string;
}

const FEATURE_MODES: FeatureMode[] = [
  {
    id: 'bedtime',
    badge: 'Stage 01 · Ages 3–7',
    ageRange: 'Ages 3–7',
    title: 'Bedtime Sanctuary',
    subtitle: 'Acoustic peace, wonder questions, and calming psalms for young children.',
    description:
      'Designed to replace loud, overstimulating cartoons with gentle bedtime narration, 2100K warm parchment aesthetics, and soothing cello interludes that instill deep emotional security and foundational trust in God’s care.',
    icon: Moon,
    accentColor: 'from-amber-500/20 to-orange-500/10',
    keyPoints: [
      '2100K Warm Color Palette & Night Sanctuary Mode',
      'Gentle acoustic bedtime psalms & narration',
      'Wonder questions designed for bedtime conversations',
      'Zero cartoon clichés or high-pressure animations',
    ],
    href: '/tiers',
  },
  {
    id: 'archive',
    badge: 'Stage 02 · Ages 8–12',
    ageRange: 'Ages 8–12',
    title: 'Historical Archive Explorer',
    subtitle: 'Real Near Eastern archaeology, ciphers, and interactive timelines.',
    description:
      'For tweens ready to explore the historical roots of scripture. Features real archaeological coordinates from Jericho and Qumran, interactive Hebrew and Greek root ciphers, and immersive 14-day chronological bridges.',
    icon: Scroll,
    accentColor: 'from-amber-600/20 to-yellow-600/10',
    keyPoints: [
      'Real Near Eastern archaeological map coordinates',
      'Interactive Hebrew & Greek root ciphers (Chesed, Ruach)',
      '14-Day Late-Comer Bridge & Chronological Timeline',
      'Engaging historical inquiry without moralistic preachiness',
    ],
    href: '/ancient-archive',
  },
  {
    id: 'harbor',
    badge: 'Stage 03 · Ages 13–18',
    ageRange: 'Ages 13–18',
    title: 'Teen Safe Harbor & Ring',
    subtitle: 'Zero-knowledge encrypted vaults, Socratic tables, and raw lament.',
    description:
      'An honest theological wrestling ring for adolescents. Features local AES-256-GCM encrypted commonplace journals that parents cannot read, paired with pre-moderated Socratic roundtable seminars on doubt, ethics, and ancient laments.',
    icon: Shield,
    accentColor: 'from-stone-600/20 to-zinc-700/10',
    keyPoints: [
      'Client-side zero-knowledge encrypted private journal',
      'Socratic roundtable seminars moderated by theologians',
      'Space to wrestle with doubt, lament, and tough ethical questions',
      '100% private from parent monitoring and ad trackers',
    ],
    href: '/safe-harbor',
  },
];

interface FeaturesOverviewSectionProps {
  onOpenJourneyModal: (defaultTier?: 'bedtime' | 'archive' | 'harbor') => void;
}

export default function FeaturesOverviewSection({
  onOpenJourneyModal,
}: FeaturesOverviewSectionProps) {
  const [activeTab, setActiveTab] = useState<'bedtime' | 'archive' | 'harbor'>('bedtime');

  return (
    <section
      id="features-overview"
      className="py-20 lg:py-28 border-b border-[#E5DEC9] bg-[#F2ECE1]/60 dark:bg-[#1C1917] transition-colors"
    >
      <div className="max-w-[1280px] mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5DEC9] dark:border-[#36312E]">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#92400E] dark:text-[#FBBF24]">
              <Compass className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Core Architectural Modes</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1C1917] dark:text-[#F9F6F0]"
              style={{fontFamily: 'var(--font-display), serif', textWrap: 'balance'}}
            >
              Three developmental stages designed for unhurried formation.
            </h2>

            <p className="text-sm sm:text-base text-[#44403C] dark:text-[#D6D3D1] leading-relaxed">
              Explore how Bedtime Sanctuary, Historical Archive, and Safe Harbor evolve seamlessly across fifteen formative years to match your child’s spiritual and cognitive readiness.
            </p>
          </div>

          {/* Mode Switching Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#FAF7F2] dark:bg-[#292524] border border-[#E5DEC9] dark:border-[#36312E] rounded-xl w-fit">
            {FEATURE_MODES.map((mode) => {
              const isActive = activeTab === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setActiveTab(mode.id as 'bedtime' | 'archive' | 'harbor')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1C1917] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#1C1917]'
                      : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-[#F9F6F0]'
                  }`}
                >
                  {mode.ageRange}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature Grid / Detailed Active Mode Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FEATURE_MODES.map((mode) => {
            const Icon = mode.icon;
            const isHighlighted = activeTab === mode.id;
            return (
              <div
                key={mode.id}
                onClick={() => setActiveTab(mode.id as 'bedtime' | 'archive' | 'harbor')}
                className={`p-8 rounded-2xl bg-[#FAF7F2] dark:bg-[#24211E] border flex flex-col justify-between space-y-6 transition-all duration-300 cursor-pointer ${
                  isHighlighted
                    ? 'border-[#D97706] ring-2 ring-[#D97706]/30 shadow-md scale-[1.01]'
                    : 'border-[#E5DEC9] dark:border-[#36312E] opacity-80 hover:opacity-100 hover:border-[#D97706]/60'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1C1917] border border-[#E5DEC9] dark:border-[#36312E] flex items-center justify-center text-[#D97706]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#92400E] dark:text-[#FBBF24] bg-[#D97706]/10 px-3 py-1 rounded-full border border-[#D97706]/30 font-semibold">
                      {mode.badge}
                    </span>
                  </div>

                  <div>
                    <h3
                      className="text-2xl font-normal text-[#1C1917] dark:text-[#F9F6F0]"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      {mode.title}
                    </h3>
                    <p className="text-xs font-medium text-[#92400E] dark:text-[#FBBF24] mt-1">
                      {mode.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#44403C] dark:text-[#D6D3D1] leading-relaxed">
                    {mode.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-[#E5DEC9] dark:border-[#36312E]">
                    {mode.keyPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#1C1917] dark:text-[#F9F6F0]">
                        <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenJourneyModal(mode.id as 'bedtime' | 'archive' | 'harbor');
                    }}
                    className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#292524] dark:bg-[#1C1917] hover:bg-[#D97706] dark:hover:bg-[#D97706] text-[#FAF7F2] hover:text-[#1A1A1A] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Explore {mode.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
