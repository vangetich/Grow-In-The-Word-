'use client';

import React, {useState, useCallback, Suspense} from 'react';
import {useSearchParams} from 'next/navigation';
import FullPageBibleReader from '@/components/FullPageBibleReader';
import SanctuaryDashboardBar from '@/components/SanctuaryDashboardBar';
import JourneyOnboardingModal from '@/components/JourneyOnboardingModal';
import {BibleVersionId} from '@/lib/full-bible-data';

function FullPageBibleReaderContent() {
  const searchParams = useSearchParams();
  const initialChapterParam = searchParams.get('chapter') || 'psalm-23';
  const initialVersionParam = (searchParams.get('version') || 'AMP') as BibleVersionId;

  const [isNightSanctuary, setIsNightSanctuary] = useState(false);
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);
  const [growthPoints, setGrowthPoints] = useState<number>(70);
  const [recentActivityLabel, setRecentActivityLabel] = useState<string>(
    'Reading Scripture in Full-Page Bible Sanctuary'
  );
  const [engagementLog, setEngagementLog] = useState<string[]>([
    'Opened Full-Page Bible Reader (AKJV · AMP · NASB · NIV · NLT)',
  ]);

  const handleEngageContent = useCallback((points: number, label: string) => {
    setGrowthPoints((prev) => Math.min(100, prev + points));
    setRecentActivityLabel(label);
    setEngagementLog((prev) => [label, ...prev.slice(0, 9)]);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <FullPageBibleReader
        initialChapterId={initialChapterParam}
        initialVersion={initialVersionParam}
        isNightSanctuary={isNightSanctuary}
        onToggleNightSanctuary={() => setIsNightSanctuary((prev) => !prev)}
        onEngageContent={handleEngageContent}
        isOverlay={false}
      />

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
    </div>
  );
}

export default function FullPageBibleReaderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[#FAF7F2] text-[#1C1917] flex items-center justify-center font-mono text-xs uppercase tracking-widest">
          Opening Full-Page Bible Sanctuary...
        </div>
      }
    >
      <FullPageBibleReaderContent />
    </Suspense>
  );
}
