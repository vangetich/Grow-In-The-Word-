'use client';

import React, {useState, useCallback} from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import JourneyScrollIndicator from '@/components/JourneyScrollIndicator';
import BibleStudyReadingStudio from '@/components/BibleStudyReadingStudio';
import JourneyOnboardingModal from '@/components/JourneyOnboardingModal';
import FeatureAtlasModal from '@/components/FeatureAtlasModal';
import SanctuaryDashboardBar from '@/components/SanctuaryDashboardBar';
import {ArrowLeft, BookOpen} from 'lucide-react';

export default function BibleStudyStudioPage() {
  const [isNightSanctuary, setIsNightSanctuary] = useState(false);
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);
  const [isFeatureAtlasOpen, setIsFeatureAtlasOpen] = useState(false);
  const [growthPoints, setGrowthPoints] = useState<number>(65);
  const [recentActivityLabel, setRecentActivityLabel] = useState<string>(
    'Engaged Scripture in Bible Study Reading Studio'
  );
  const [engagementLog, setEngagementLog] = useState<string[]>([
    'Engaged Scripture in Bible Study Reading Studio',
  ]);

  const handleEngageContent = useCallback((points: number, label: string) => {
    setGrowthPoints((prev) => Math.min(100, prev + points));
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
            <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Dedicated Studio · Parallel Reading &amp; Lexicon</span>
          </div>
        </div>

        {/* The Full Interactive BibleStudyReadingStudio */}
        <BibleStudyReadingStudio
          onEngageContent={handleEngageContent}
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
      />

      <JourneyOnboardingModal
        isOpen={isJourneyModalOpen}
        initialTier="archive"
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
