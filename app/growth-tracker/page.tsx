'use client';

import React, {useState, useCallback} from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import JourneyScrollIndicator from '@/components/JourneyScrollIndicator';
import LongitudinalGrowthSeedSection, {
  GrowthTrackerSectionTab,
} from '@/components/LongitudinalGrowthSeedSection';
import JourneyOnboardingModal from '@/components/JourneyOnboardingModal';
import FeatureAtlasModal from '@/components/FeatureAtlasModal';
import SanctuaryDashboardBar from '@/components/SanctuaryDashboardBar';
import {ArrowLeft, Sprout} from 'lucide-react';

export default function GrowthTrackerPage() {
  const [isNightSanctuary, setIsNightSanctuary] = useState(false);
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);
  const [isFeatureAtlasOpen, setIsFeatureAtlasOpen] = useState(false);
  const [growthPoints, setGrowthPoints] = useState<number>(45);
  const [recentActivityLabel, setRecentActivityLabel] = useState<string>(
    'Opened Dedicated Longitudinal Growth Seed Studio'
  );
  const [engagementLog, setEngagementLog] = useState<string[]>([
    'Opened Dedicated Longitudinal Growth Seed Studio',
    'Watered Rootlet Sprout via Evening Liturgy',
  ]);
  const [growthTrackerTab, setGrowthTrackerTab] =
    useState<GrowthTrackerSectionTab>('evolution');

  const handleEngageContent = useCallback((points: number, label: string) => {
    setGrowthPoints((prev) => Math.min(100, prev + points));
    setRecentActivityLabel(label);
    setEngagementLog((prev) => [label, ...prev.slice(0, 9)]);
  }, []);

  const handleSetGrowthPoints = useCallback((points: number, label: string) => {
    setGrowthPoints(Math.min(100, Math.max(0, points)));
    setRecentActivityLabel(label);
    setEngagementLog((prev) => [label, ...prev.slice(0, 9)]);
  }, []);

  return (
    <div
      className={`min-h-screen w-full flex flex-col pb-24 transition-colors duration-500 ${
        isNightSanctuary ? 'bg-[#1A1A1A] text-[#F9F6F0]' : 'bg-[#F9F6F0] text-[#1A1A1A]'
      }`}
    >
      <Navbar
        onOpenJourneyModal={() => setIsJourneyModalOpen(true)}
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
            <Sprout className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Dedicated Studio · Longitudinal Seed Evolution</span>
          </div>
        </div>

        {/* The Full Interactive Longitudinal Growth Seed Studio */}
        <LongitudinalGrowthSeedSection
          growthPoints={growthPoints}
          recentActivityLabel={recentActivityLabel}
          engagementLog={engagementLog}
          onEngageContent={handleEngageContent}
          onSetGrowthPoints={handleSetGrowthPoints}
          activeSectionTab={growthTrackerTab}
          onTabChange={setGrowthTrackerTab}
          isNightSanctuary={isNightSanctuary}
        />
      </main>

      <SanctuaryDashboardBar
        growthPoints={growthPoints}
        recentActivityLabel={recentActivityLabel}
        engagementLog={engagementLog}
        isNightSanctuary={isNightSanctuary}
        onToggleNightSanctuary={() => setIsNightSanctuary((prev) => !prev)}
        onManualNourish={handleEngageContent}
        onOpenJourneyModal={() => setIsJourneyModalOpen(true)}
        onNavigateToGrowthSection={(tab) => setGrowthTrackerTab(tab)}
      />

      <JourneyOnboardingModal
        isOpen={isJourneyModalOpen}
        initialTier="bedtime"
        onClose={() => setIsJourneyModalOpen(false)}
      />

      <FeatureAtlasModal
        isOpen={isFeatureAtlasOpen}
        onClose={() => setIsFeatureAtlasOpen(false)}
        onOpenJourneyModal={() => setIsJourneyModalOpen(true)}
        onEngageContent={handleEngageContent}
        isNightSanctuary={isNightSanctuary}
        onToggleNightSanctuary={() => setIsNightSanctuary((prev) => !prev)}
      />
    </div>
  );
}
