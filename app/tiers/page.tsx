'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import JourneyScrollIndicator from '@/components/JourneyScrollIndicator';
import ThreeTierGrid from '@/components/ThreeTierGrid';
import JourneyOnboardingModal from '@/components/JourneyOnboardingModal';
import FeatureAtlasModal from '@/components/FeatureAtlasModal';
import SanctuaryDashboardBar from '@/components/SanctuaryDashboardBar';
import {ArrowLeft, Compass, Shield, Moon, Scroll} from 'lucide-react';

export default function TiersPage() {
  const [isNightSanctuary, setIsNightSanctuary] = useState(false);
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);
  const [isFeatureAtlasOpen, setIsFeatureAtlasOpen] = useState(false);
  const [selectedModalTier, setSelectedModalTier] = useState<'bedtime' | 'archive' | 'harbor'>('bedtime');
  const [growthPoints, setGrowthPoints] = useState<number>(35);
  const [recentActivityLabel, setRecentActivityLabel] = useState<string>('Explored Developmental Tiers Architecture');
  const [engagementLog, setEngagementLog] = useState<string[]>([
    'Explored Developmental Tiers Architecture',
  ]);

  const handleEngageContent = (points: number, label: string) => {
    setGrowthPoints((prev) => Math.min(100, prev + points));
    setRecentActivityLabel(label);
    setEngagementLog((prev) => [label, ...prev.slice(0, 9)]);
  };

  const handleOpenJourneyModal = (tier: 'bedtime' | 'archive' | 'harbor' = 'bedtime') => {
    setSelectedModalTier(tier);
    setIsJourneyModalOpen(true);
    handleEngageContent(15, `Opened Intake for ${tier} Tier`);
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
        {/* Navigation Breadcrumb & Back Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5DEC9] pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#92400E] hover:text-[#D97706] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Sanctuary Landing</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-[#57534E]">
            <Compass className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Dedicated Studio · Three Developmental Tiers</span>
          </div>
        </div>

        {/* Editorial Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#4A5D4E]">
            <span>Ages 3–18 Architectural Progression</span>
            <span>·</span>
            <span>Zero-Compromise Formative Stages</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1C1917] dark:text-[#F9F6F0]"
            style={{fontFamily: 'var(--font-display), serif'}}
          >
            The Three Developmental Tiers
          </h1>
          <p className="text-sm sm:text-base text-[#44403C] dark:text-[#D6D3D1] leading-relaxed">
            From the sensory peace of early childhood bedtime liturgies, through the historical grit
            of archaeological detective maps, to the sovereign intellectual privacy of the teen
            wrestling ring.
          </p>
        </div>

        {/* The Full Interactive ThreeTierGrid */}
        <div className="pt-2">
          <ThreeTierGrid
            onSelectTierForJourney={handleOpenJourneyModal}
            onEngageContent={handleEngageContent}
          />
        </div>
      </main>

      {/* Floating Dashboard & Modals */}
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
