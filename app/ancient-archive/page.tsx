'use client';

import React, {useState, useCallback} from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import JourneyScrollIndicator from '@/components/JourneyScrollIndicator';
import AncientArchiveExplorer from '@/components/AncientArchiveExplorer';
import JourneyOnboardingModal from '@/components/JourneyOnboardingModal';
import FeatureAtlasModal from '@/components/FeatureAtlasModal';
import SanctuaryDashboardBar from '@/components/SanctuaryDashboardBar';
import {ArrowLeft, Scroll, Compass} from 'lucide-react';

export default function AncientArchivePage() {
  const [isNightSanctuary, setIsNightSanctuary] = useState(false);
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);
  const [isFeatureAtlasOpen, setIsFeatureAtlasOpen] = useState(false);
  const [selectedModalTier, setSelectedModalTier] = useState<'bedtime' | 'archive' | 'harbor'>('archive');
  const [growthPoints, setGrowthPoints] = useState<number>(55);
  const [recentActivityLabel, setRecentActivityLabel] = useState<string>(
    'Investigated Archaeological Coordinates in the Ancient Archive'
  );
  const [engagementLog, setEngagementLog] = useState<string[]>([
    'Investigated Archaeological Coordinates in the Ancient Archive',
  ]);

  const handleEngageContent = useCallback((points: number, label: string) => {
    setGrowthPoints((prev) => Math.min(100, prev + points));
    setRecentActivityLabel(label);
    setEngagementLog((prev) => [label, ...prev.slice(0, 9)]);
  }, []);

  const handleOpenJourneyModal = (tier: 'bedtime' | 'archive' | 'harbor' = 'archive') => {
    setSelectedModalTier(tier);
    setIsJourneyModalOpen(true);
    handleEngageContent(15, `Opened Ancient Archive Intake`);
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

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5DEC9] pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#92400E] hover:text-[#D97706] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Sanctuary Landing</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-[#57534E]">
            <Scroll className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Phase 3 Studio · Ancient Archive &amp; Detective Map</span>
          </div>
        </div>

        {/* Editorial Introduction */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#4A5D4E]">
            <span>Phase 3 Blueprint · Ages 8–12 &amp; Late Beginners</span>
            <span>·</span>
            <span>The Ancient Archive Detective Map</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1C1917] dark:text-[#F9F6F0]"
            style={{fontFamily: 'var(--font-display), serif'}}
          >
            A gripping, gritty ancient library. Zero cartoon clichés.
          </h1>
          <p className="text-sm sm:text-base text-[#44403C] dark:text-[#D6D3D1] leading-relaxed">
            Designed for curious tweens and 12-year-old newcomers entering without
            prior biblical background. Explore the 14-Day “Roots &amp; Resilience”
            Late-Comer Bridge, inspect real Near Eastern archaeological coordinates,
            uncover daily street realities, and solve linguistic root ciphers to
            unlock relics for your Exhibition Case.
          </p>
        </div>

        {/* The Full Interactive AncientArchiveExplorer */}
        <div className="pt-2">
          <AncientArchiveExplorer
            onEngageContent={handleEngageContent}
            onOpenJourneyModal={handleOpenJourneyModal}
          />
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
