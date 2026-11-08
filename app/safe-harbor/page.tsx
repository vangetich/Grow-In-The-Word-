'use client';

import React, {useState, useCallback} from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import JourneyScrollIndicator from '@/components/JourneyScrollIndicator';
import TeenSafeHarborPhase4 from '@/components/TeenSafeHarborPhase4';
import JourneyOnboardingModal from '@/components/JourneyOnboardingModal';
import FeatureAtlasModal from '@/components/FeatureAtlasModal';
import SanctuaryDashboardBar from '@/components/SanctuaryDashboardBar';
import {ArrowLeft, Shield, Lock, MessageSquare} from 'lucide-react';

export default function SafeHarborPage() {
  const [isNightSanctuary, setIsNightSanctuary] = useState(false);
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);
  const [isFeatureAtlasOpen, setIsFeatureAtlasOpen] = useState(false);
  const [selectedModalTier, setSelectedModalTier] = useState<'bedtime' | 'archive' | 'harbor'>('harbor');
  const [growthPoints, setGrowthPoints] = useState<number>(75);
  const [recentActivityLabel, setRecentActivityLabel] = useState<string>(
    'Accessed Teen Safe Harbor Wrestling Ring & Vault'
  );
  const [engagementLog, setEngagementLog] = useState<string[]>([
    'Accessed Teen Safe Harbor Wrestling Ring & Vault',
  ]);

  const handleEngageContent = useCallback((points: number, label: string) => {
    setGrowthPoints((prev) => Math.min(100, prev + points));
    setRecentActivityLabel(label);
    setEngagementLog((prev) => [label, ...prev.slice(0, 9)]);
  }, []);

  const handleOpenJourneyModal = (tier: 'bedtime' | 'archive' | 'harbor' = 'harbor') => {
    setSelectedModalTier(tier);
    setIsJourneyModalOpen(true);
    handleEngageContent(15, `Opened Safe Harbor Intake`);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col pb-24 transition-colors duration-500 ${
        isNightSanctuary ? 'bg-[#1A1A1A] text-[#F9F6F0]' : 'bg-[#F9F6F0] text-[#1A1A1A]'
      }`}
    >
      <Navbar
        onOpenJourneyModal={handleOpenJourneyModal}
        onOpenFeatureAtlasModal={() => setIsFeatureAtlasOpen(true)}
        isNightSanctuary={isNightSanctuary}
        onToggleNightSanctuary={() => setIsNightSanctuary((prev) => !prev)}
      />
      <JourneyScrollIndicator />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5DEC9] pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#92400E] hover:text-[#D97706] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Sanctuary Landing</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-[#57534E]">
            <Shield className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Phase 4 Studio · The Teen Safe Harbor &amp; Wrestling Ring</span>
          </div>
        </div>

        {/* Editorial Header & Value Proposition for Teenagers (Ages 13–18) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end min-w-0">
          <div className="lg:col-span-7 space-y-4 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#4A5D4E] min-w-0">
              <span>Expanded Studio · Ages 13–18</span>
              <span aria-hidden="true">·</span>
              <span>The Safe Harbor &amp; Wrestling Ring</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1A1A1A] dark:text-[#F9F6F0]"
              style={{
                fontFamily: 'var(--font-display), serif',
                textWrap: 'balance',
              }}
            >
              A private studio for independent minds, honest doubt, and unvarnished truth.
            </h1>
            <p className="text-sm sm:text-base text-[#44403C] dark:text-[#D6D3D1] leading-relaxed">
              Teenagers don’t walk away from faith because they have hard
              questions—they walk away when their autonomy is policed,
              their intellect is underestimated, or their grief is met
              with rehearsed clichés. Safe Harbor replaces patronizing
              youth-group tropes with an editorial seminar studio built on
              three adolescent essentials: sovereign privacy, Socratic
              critical thinking, and theologian-moderated peer solidarity.
            </p>
          </div>

          {/* Architectural Callout Quote */}
          <div className="lg:col-span-5 p-5 sm:p-6 rounded-xl bg-[#FAF7F2] dark:bg-[#24211E] border border-[#E5DEC9] dark:border-[#36312E] space-y-2.5 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-wider text-[#92400E] min-w-0">
              <span>Teen Editorial Posture</span>
              <span>Zero Surveillance · Zero Clichés</span>
            </div>
            <p
              className="text-base sm:text-lg text-[#1C1917] dark:text-[#F9F6F0] leading-relaxed"
              style={{fontFamily: 'var(--font-display), serif'}}
            >
              “Bring your sharpest questions and your heaviest doubts. Nothing
              here is graded, nothing is reported to your parents, and no
              question is off-limits.”
            </p>
            <div className="text-xs text-[#57534E] dark:text-[#A8A29E] pt-1 border-t border-[#E5DEC9] dark:border-[#36312E] min-w-0">
              Designed with a high-contrast editorial aesthetic inspired
              by university seminar tables and private commonplace books.
            </div>
          </div>
        </div>

        {/* Three-Pillar Teen Feature & Benefit Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-w-0">
          <div className="lg:col-span-4 rounded-xl bg-[#FAF7F2] dark:bg-[#24211E] border border-[#E5DEC9] dark:border-[#36312E] p-6 flex flex-col justify-between space-y-5 min-w-0">
            <div className="space-y-3 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#4A5D4E] pb-2.5 border-b border-[#E5DEC9] dark:border-[#36312E] min-w-0">
                <span>PILLAR 01 · INDEPENDENCE</span>
                <span className="text-[#92400E] font-semibold">AES-256-GCM</span>
              </div>
              <h3
                className="text-xl font-normal text-[#1C1917] dark:text-[#F9F6F0]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Sovereign Privacy &amp; Self-Directed Agency
              </h3>
              <p className="text-xs sm:text-sm text-[#44403C] dark:text-[#D6D3D1] leading-relaxed">
                Real spiritual ownership requires a room with a lock on the
                inside. The Wrestling Ring Commonplace Vault generates a client-side
                encryption key directly on the teenager’s device.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-xl bg-[#FAF7F2] dark:bg-[#24211E] border border-[#E5DEC9] dark:border-[#36312E] p-6 flex flex-col justify-between space-y-5 min-w-0">
            <div className="space-y-3 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#4A5D4E] pb-2.5 border-b border-[#E5DEC9] dark:border-[#36312E] min-w-0">
                <span>PILLAR 02 · CRITICAL THINKING</span>
                <span className="text-[#92400E] font-semibold">SOCRATIC LENS</span>
              </div>
              <h3
                className="text-xl font-normal text-[#1C1917] dark:text-[#F9F6F0]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Raw Text Collisions &amp; Unfiltered Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-[#44403C] dark:text-[#D6D3D1] leading-relaxed">
                Pairs modern dilemmas—anxiety, hypocrisy, suffering, science, and
                injustice—directly with unabridged ancient laments (Job,
                Habakkuk, Ecclesiastes).
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-xl bg-[#FAF7F2] dark:bg-[#24211E] border border-[#E5DEC9] dark:border-[#36312E] p-6 flex flex-col justify-between space-y-5 min-w-0">
            <div className="space-y-3 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#4A5D4E] pb-2.5 border-b border-[#E5DEC9] dark:border-[#36312E] min-w-0">
                <span>PILLAR 03 · MODERATED COMMUNITY</span>
                <span className="text-[#92400E] font-semibold">COHORT SEMINAR</span>
              </div>
              <h3
                className="text-xl font-normal text-[#1C1917] dark:text-[#F9F6F0]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Peer Seminar Roundtables Without Toxicity
              </h3>
              <p className="text-xs sm:text-sm text-[#44403C] dark:text-[#D6D3D1] leading-relaxed">
                Teens read and contribute pseudonymous reflections alongside
                peers aged 13–18—curated by trained theologians with zero public comment wars.
              </p>
            </div>
          </div>
        </div>

        {/* The Full Interactive TeenSafeHarborPhase4 Component */}
        <div className="pt-2">
          <TeenSafeHarborPhase4 onEngageContent={handleEngageContent} />
        </div>
      </main>

      <SanctuaryDashboardBar
        growthPoints={growthPoints}
        recentActivityLabel={recentActivityLabel}
        engagementLog={engagementLog}
        isNightSanctuary={isNightSanctuary}
        onToggleNightSanctuary={() => setIsNightSanctuary((prev) => !prev)}
        onManualNourish={handleEngageContent}
        onOpenJourneyModal={handleOpenJourneyModal}
      />

      <JourneyOnboardingModal
        isOpen={isJourneyModalOpen}
        initialTier={selectedModalTier}
        onClose={() => setIsJourneyModalOpen(false)}
      />

      <FeatureAtlasModal
        isOpen={isFeatureAtlasOpen}
        onClose={() => setIsFeatureAtlasOpen(false)}
        onOpenJourneyModal={handleOpenJourneyModal}
        onEngageContent={handleEngageContent}
        isNightSanctuary={isNightSanctuary}
        onToggleNightSanctuary={() => setIsNightSanctuary((prev) => !prev)}
      />
    </div>
  );
}
