'use client';

import React, {useState, useCallback, useEffect, useRef} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import Navbar from '@/components/Navbar';
import JourneyScrollIndicator from '@/components/JourneyScrollIndicator';
import HeroSection from '@/components/HeroSection';
import HowToUseAppSection from '@/components/HowToUseAppSection';
import DailyScripturePulse from '@/components/DailyScripturePulse';
import MissionAboutSection from '@/components/MissionAboutSection';
import EvidenceSection from '@/components/EvidenceSection';
import DesignSpecInspector from '@/components/DesignSpecInspector';
import FaqSection from '@/components/FaqSection';
import AdminBackendMaintenanceSection from '@/components/AdminBackendMaintenanceSection';
import EvidenceAndFooterSection from '@/components/EvidenceAndFooterSection';
import JourneyOnboardingModal from '@/components/JourneyOnboardingModal';
import BackToTopButton from '@/components/BackToTopButton';
import SanctuaryDashboardBar from '@/components/SanctuaryDashboardBar';
import FeatureAtlasModal from '@/components/FeatureAtlasModal';
import MilestoneMenu, {AgeRangeFilter} from '@/components/MilestoneMenu';
import StudioCardConfetti from '@/components/StudioCardConfetti';
import MilestoneOverviewSummary from '@/components/MilestoneOverviewSummary';
import {
  Compass,
  Sprout,
  Scroll,
  Shield,
  Users,
  BookOpen,
  Search,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Filter,
  Check,
} from 'lucide-react';

interface StudioCardConfig {
  id: string;
  title: string;
  href: string;
  ageLabel: string;
  stageName: string;
  journeySpan: string;
  progressPercent: number;
  description: string;
  actionText: string;
  icon: typeof Compass;
  applicableRanges: ('3-7' | '8-12' | '13-18')[];
  primaryStage?: '3-7' | '8-12' | '13-18';
  accentTheme: 'amber' | 'sage' | 'charcoal';
}

const STUDIO_CARDS: StudioCardConfig[] = [
  {
    id: 'tiers',
    title: '3 Developmental Tiers',
    href: '/tiers',
    ageLabel: 'Ages 3–18',
    stageName: 'Stage 01 Foundation · Bedtime, Archive & Safe Harbor',
    journeySpan: 'Years 1–5 Horizon (33% Arc)',
    progressPercent: 33,
    description:
      'Bedtime Sanctuary, Ancient Archive, and Safe Harbor architectures. Compare specs, privacy models, and formative milestones side-by-side.',
    actionText: 'Enter Tier Studio',
    icon: Compass,
    applicableRanges: ['3-7', '8-12', '13-18'],
    primaryStage: '3-7',
    accentTheme: 'amber',
  },
  {
    id: 'growth-tracker',
    title: 'Growth Seed Tracker',
    href: '/growth-tracker',
    ageLabel: '15-Year Arc',
    stageName: 'Longitudinal Gamification (Ages 3–18)',
    journeySpan: 'Full 15-Year Arc (100% Path)',
    progressPercent: 100,
    description:
      'Evolves from Planted Seed to Ancient Cedar over 15 years. Features weekly rhythms, D3 growth charts, and botanical share cards.',
    actionText: 'Open Seed Studio',
    icon: Sprout,
    applicableRanges: ['3-7', '8-12', '13-18'],
    accentTheme: 'sage',
  },
  {
    id: 'ancient-archive',
    title: 'Ancient Archive Map',
    href: '/ancient-archive',
    ageLabel: 'Ages 8–12',
    stageName: 'Stage 02 · Historical Archive Explorer',
    journeySpan: 'Years 6–10 of 15 (66% Arc)',
    progressPercent: 66,
    description:
      'Zero cartoon clichés. Real Near Eastern archaeological coordinates, 14-day Late-Comer Bridge, and interactive Hebrew/Greek root ciphers.',
    actionText: 'Inspect Archive',
    icon: Scroll,
    applicableRanges: ['8-12'],
    primaryStage: '8-12',
    accentTheme: 'amber',
  },
  {
    id: 'safe-harbor',
    title: 'Teen Safe Harbor & Ring',
    href: '/safe-harbor',
    ageLabel: 'Ages 13–18',
    stageName: 'Stage 03 · Adolescent Wrestling Ring',
    journeySpan: 'Years 11–15 of 15 (100% Arc)',
    progressPercent: 100,
    description:
      'Client-side zero-knowledge encrypted vault, raw text collisions with ancient laments, and theologian-moderated peer seminar tables.',
    actionText: 'Enter Safe Harbor',
    icon: Shield,
    applicableRanges: ['13-18'],
    primaryStage: '13-18',
    accentTheme: 'charcoal',
  },
  {
    id: 'parent-portal',
    title: 'Parent & Mentor Portal',
    href: '/parent-portal',
    ageLabel: 'Family & Mentors',
    stageName: 'Phase 5 · Family Spiritual Guidance',
    journeySpan: 'Continuous 15-Year Guidance',
    progressPercent: 100,
    description:
      'Developmental dinner conversation starters, age-transition strategies, and guidance tailored to each child’s spiritual readiness.',
    actionText: 'Open Mentor Portal',
    icon: Users,
    applicableRanges: ['3-7', '8-12', '13-18'],
    accentTheme: 'sage',
  },
  {
    id: 'bible-study-studio',
    title: 'Bible Study & Full-Page Reader',
    href: '/bible-study-studio',
    ageLabel: 'All Horizons',
    stageName: 'Full-Page Bible & Parallel Lexicon',
    journeySpan: 'Continuous Formation (All Ages)',
    progressPercent: 80,
    description:
      'Read the Bible in full-page form or side-by-side parallel columns across all 5 versions (AKJV, AMP, NASB, NIV, NLT) with Hebrew/Greek root cards.',
    actionText: 'Launch Studio',
    icon: BookOpen,
    applicableRanges: ['3-7', '8-12', '13-18'],
    accentTheme: 'amber',
  },
  {
    id: 'semantic-search',
    title: 'Semantic Search Index',
    href: '/semantic-search',
    ageLabel: 'Ages 8–18',
    stageName: 'Natural Language Discovery Archive',
    journeySpan: 'Years 6–15 Exploration (66% Arc)',
    progressPercent: 66,
    description:
      'Search passages by emotion, historical era, or philosophical question with trending youth queries and biblical genre markers.',
    actionText: 'Query Index',
    icon: Search,
    applicableRanges: ['8-12', '13-18'],
    accentTheme: 'charcoal',
  },
  {
    id: 'timeline',
    title: 'Age Evolution Timeline',
    href: '/timeline',
    ageLabel: 'Ages 3–18',
    stageName: 'Comprehensive 15-Year Pathway',
    journeySpan: 'Full 15-Year Spectrum (100%)',
    progressPercent: 100,
    description:
      'Follow the continuous spiritual development journey across all 15 formative years, from age 3 bedtime trust into resilient adult faith.',
    actionText: 'View Timeline',
    icon: Sparkles,
    applicableRanges: ['3-7', '8-12', '13-18'],
    accentTheme: 'amber',
  },
];

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function HomePage() {
  const router = useRouter();
  const mainContainerRef = useRef<HTMLElement | null>(null);

  // Standard useEffect with IntersectionObserver for scroll-triggered entrance animations and clean teardown
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const previousScrollRestoration =
      'scrollRestoration' in window.history
        ? window.history.scrollRestoration
        : null;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (window.location.hash) {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search
      );
    }

    window.scrollTo({top: 0, left: 0, behavior: 'instant'});
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const mainEl = mainContainerRef.current;
    if (!mainEl) {
      return () => {
        if (
          previousScrollRestoration &&
          'scrollRestoration' in window.history
        ) {
          window.history.scrollRestoration = previousScrollRestoration;
        }
      };
    }

    const revealElements = Array.from(
      mainEl.querySelectorAll<HTMLElement>('[data-scroll-reveal="true"]')
    );

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      revealElements.forEach((el) => {
        el.dataset.revealed = 'true';
      });
      return () => {
        if (
          previousScrollRestoration &&
          'scrollRestoration' in window.history
        ) {
          window.history.scrollRestoration = previousScrollRestoration;
        }
      };
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.dataset.revealed = 'true';
            obs.unobserve(target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08,
      }
    );

    revealElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (previousScrollRestoration && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);
  const [isFeatureAtlasOpen, setIsFeatureAtlasOpen] = useState(false);
  const [selectedModalTier, setSelectedModalTier] = useState<
    'bedtime' | 'archive' | 'harbor'
  >('bedtime');
  const [selectedStudioAgeFilter, setSelectedStudioAgeFilter] =
    useState<AgeRangeFilter>('all');

  // DOM node references and geometry snapshots for smooth CSS transition card repositioning (FLIP)
  const cardElementsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const prevCardRectsRef = useRef<Map<string, DOMRect>>(new Map());
  const animationFrameRef = useRef<number | null>(null);
  const cleanupTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // 'Night Sanctuary' State (Shifts entire app palette to deep charcoal & muted umber)
  const [isNightSanctuary, setIsNightSanctuary] = useState(false);

  // 'Growth Seed' Longitudinal Gamification State (Evolves Seed -> Sprout -> Sapling -> Tree -> Canopy)
  const [growthPoints, setGrowthPoints] = useState<number>(15);
  const [recentActivityLabel, setRecentActivityLabel] = useState<string>(
    'Planted your first Sanctuary Seed'
  );
  const [engagementLog, setEngagementLog] = useState<string[]>([
    'Planted your first Sanctuary Seed',
  ]);

  const handleEngageContent = useCallback((points: number, label: string) => {
    setGrowthPoints((prev) => Math.min(100, prev + points));
    setRecentActivityLabel(label);
    setEngagementLog((prev) => [label, ...prev.slice(0, 9)]);
  }, []);

  // Active confetti celebration states for developmental milestones
  const [celebratingCardId, setCelebratingCardId] = useState<string | null>(null);
  const [celebratedMilestones, setCelebratedMilestones] = useState<Record<string, boolean>>({});
  const [milestoneCelebrationBanner, setMilestoneCelebrationBanner] = useState<string | null>(null);

  // Load persisted celebrated milestones on mount to avoid SSR hydration mismatches
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem(
          'grow_in_the_word_celebrated_milestones'
        );
        if (stored) {
          setCelebratedMilestones(JSON.parse(stored));
        }
      } catch {
        // Fallback
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleCelebrateCardMilestone = useCallback(
    (card: StudioCardConfig) => {
      setCelebratingCardId(card.id);
      setCelebratedMilestones((prev) => {
        const updated = {...prev, [card.id]: true};
        try {
          localStorage.setItem(
            'grow_in_the_word_celebrated_milestones',
            JSON.stringify(updated)
          );
        } catch {
          // ignore
        }
        return updated;
      });

      const message = `Reached ${card.ageLabel} Milestone: ${card.title} (${card.progressPercent}% Formative Journey)`;
      setMilestoneCelebrationBanner(message);
      handleEngageContent(15, `Celebrated Milestone: ${card.title}`);

      // Auto-clear banner after 4.5 seconds
      setTimeout(() => {
        setMilestoneCelebrationBanner((curr) => (curr === message ? null : curr));
      }, 4500);
    },
    [handleEngageContent]
  );

  const handleFilterChange = useCallback(
    (range: AgeRangeFilter) => {
      // 1. Snapshot all currently mounted cards' DOMRects right before filter change
      const rects = new Map<string, DOMRect>();
      cardElementsRef.current.forEach((el, id) => {
        if (el) {
          rects.set(id, el.getBoundingClientRect());
        }
      });
      prevCardRectsRef.current = rects;

      setSelectedStudioAgeFilter(range);
      handleEngageContent(
        5,
        `Filtered Studios by ${
          range === 'all' ? 'All Horizons' : `Ages ${range}`
        }`
      );

      // Trigger celebratory confetti effect on the primary studio card when reaching an age milestone
      if (range !== 'all') {
        const primaryCard = STUDIO_CARDS.find((c) => c.primaryStage === range);
        if (primaryCard) {
          setCelebratingCardId(primaryCard.id);
          const rangeLabel =
            range === '3-7'
              ? 'Ages 3–7 Childhood Foundation'
              : range === '8-12'
              ? 'Ages 8–12 Tween Exploration'
              : 'Ages 13–18 Teen Resilience';
          const bannerMsg = `Milestone Reached! Celebrating ${rangeLabel} (${primaryCard.title})`;
          setMilestoneCelebrationBanner(bannerMsg);
          handleEngageContent(15, `Reached Age Milestone: ${rangeLabel}`);
          setTimeout(() => {
            setMilestoneCelebrationBanner((curr) =>
              curr === bannerMsg ? null : curr
            );
          }, 4500);
        }
      }
    },
    [handleEngageContent]
  );

  // CSS transitions to smoothly animate the repositioning and entrance of studio cards
  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const prevRects = prevCardRectsRef.current;

    if (!prefersReducedMotion && prevRects.size > 0) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current);
      }

      const animatingElements: {
        el: HTMLDivElement;
        deltaX: number;
        deltaY: number;
        isNew: boolean;
      }[] = [];

      cardElementsRef.current.forEach((el, id) => {
        if (!el) return;
        const newRect = el.getBoundingClientRect();
        const oldRect = prevRects.get(id);

        if (oldRect) {
          const deltaX = oldRect.left - newRect.left;
          const deltaY = oldRect.top - newRect.top;
          if (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5) {
            animatingElements.push({el, deltaX, deltaY, isNew: false});
          }
        } else {
          // Card newly entered the filtered view
          animatingElements.push({el, deltaX: 0, deltaY: 0, isNew: true});
        }
      });

      if (animatingElements.length > 0) {
        // Step 1: Invert - position elements where they came from (or initial enter state) with transition disabled
        animatingElements.forEach(({el, deltaX, deltaY, isNew}) => {
          el.style.transition = 'none';
          if (isNew) {
            el.style.transform = 'translate3d(0, 14px, 0) scale(0.96)';
            el.style.opacity = '0';
          } else {
            el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
          }
        });

        // Step 2: Force browser reflow to commit inverted positions
        void animatingElements[0].el.offsetHeight;

        // Step 3: Play - apply smooth spring-based CSS transitions to animate to natural layout position
        animationFrameRef.current = requestAnimationFrame(() => {
          animatingElements.forEach(({el}) => {
            el.style.transition =
              'transform 400ms cubic-bezier(0.34, 1.35, 0.64, 1), opacity 320ms cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease, box-shadow 200ms ease';
            el.style.transform = 'translate3d(0, 0, 0) scale(1)';
            el.style.opacity = '1';
          });
        });

        // Step 4: Clean up inline style overrides after transition completes
        cleanupTimeoutRef.current = setTimeout(() => {
          animatingElements.forEach(({el}) => {
            el.style.removeProperty('transition');
            el.style.removeProperty('transform');
            el.style.removeProperty('opacity');
          });
        }, 420);
      }
    }

    // Always update prevCardRectsRef with the latest layout rects
    const updatedRects = new Map<string, DOMRect>();
    cardElementsRef.current.forEach((el, id) => {
      if (el) {
        updatedRects.set(id, el.getBoundingClientRect());
      }
    });
    prevCardRectsRef.current = updatedRects;

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current);
      }
    };
  }, [selectedStudioAgeFilter]);

  const handleSetGrowthPoints = useCallback((points: number, label: string) => {
    setGrowthPoints(Math.min(100, Math.max(0, points)));
    setRecentActivityLabel(label);
    setEngagementLog((prev) => [label, ...prev.slice(0, 9)]);
  }, []);

  const handleToggleNightSanctuary = useCallback(() => {
    setIsNightSanctuary((prev) => {
      const next = !prev;
      handleEngageContent(
        10,
        next
          ? 'Activated 2100K Night Sanctuary Mode'
          : 'Returned to Day Parchment Mode'
      );
      return next;
    });
  }, [handleEngageContent]);

  const handleOpenJourneyModal = (
    defaultTier: 'bedtime' | 'archive' | 'harbor' = 'bedtime'
  ) => {
    setSelectedModalTier(defaultTier);
    setIsJourneyModalOpen(true);
    handleEngageContent(
      15,
      `Opened ‘Open Door’ Intake (${
        defaultTier === 'bedtime'
          ? 'Bedtime Sanctuary'
          : defaultTier === 'archive'
          ? 'Historical Archive'
          : 'Safe Harbor'
      })`
    );
  };

  const scrollRevealClassName =
    'w-full max-w-full min-w-0 opacity-0 translate-y-6 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 transition-[opacity,transform] duration-600 ease-out will-change-[opacity,transform]';

  // Night Sanctuary palette transformation classes (Deep Charcoal #1A1A1A / #1C1917 & Muted Umber #292524)
  const nightSanctuaryClasses = isNightSanctuary
    ? 'bg-[#1A1A1A] text-[#F9F6F0] [&_.bg-\\[\\#FAF7F2\\]]:!bg-[#1A1A1A] [&_.bg-\\[\\#F9F6F0\\]]:!bg-[#1A1A1A] [&_.bg-\\[\\#FAF7F2\\]\\/95]:!bg-[#1A1A1A]/95 [&_.bg-\\[\\#F9F6F0\\]\\/95]:!bg-[#1A1A1A]/95 [&_.bg-\\[\\#F2ECE1\\]]:!bg-[#292524] [&_.bg-\\[\\#F2ECE1\\]\\/60]:!bg-[#292524]/60 [&_.border-\\[\\#E5DEC9\\]]:!border-[#36312E] [&_.text-\\[\\#1C1917\\]]:!text-[#F9F6F0] [&_.text-\\[\\#1A1A1A\\]]:!text-[#F9F6F0] [&_.text-\\[\\#44403C\\]]:!text-[#D6D3D1] [&_.text-\\[\\#57534E\\]]:!text-[#A8A29E] [&_.text-\\[\\#92400E\\]]:!text-[#FBBF24] [&_.text-\\[\\#4A5D4E\\]]:!text-[#A7F3D0]'
    : 'bg-[#F9F6F0] text-[#1A1A1A]';

  return (
    <div
      className={`min-h-screen w-full max-w-full min-w-0 overflow-x-clip flex flex-col pb-24 transition-colors duration-500 ${nightSanctuaryClasses}`}
    >
      {/* Top Navigation Bar with Feature Atlas Modal & Night Sanctuary Toggle */}
      <Navbar
        onOpenJourneyModal={handleOpenJourneyModal}
        onOpenFeatureAtlasModal={() => {
          setIsFeatureAtlasOpen(true);
          handleEngageContent(5, 'Opened Ecosystem Feature Atlas Modal');
        }}
        isNightSanctuary={isNightSanctuary}
        onToggleNightSanctuary={handleToggleNightSanctuary}
      />

      {/* Subtle Journey Milestone Indicator (Age 3 Childhood -> Age 18 Teen Transition) */}
      <JourneyScrollIndicator />

      {/* Main Content Sequence with IntersectionObserver Scroll-Reveal Animations */}
      <main
        ref={mainContainerRef}
        className="flex-1 w-full max-w-full min-w-0 overflow-x-clip"
      >
        <div
          data-scroll-reveal="true"
          data-revealed="true"
          className={scrollRevealClassName}
        >
          <HeroSection onOpenJourneyModal={handleOpenJourneyModal} />
        </div>

        {/* Daily Scripture Pulse — Wisdom Verse, Hebrew/Greek Root, & Deep Dive into Studio */}
        <div data-scroll-reveal="true" className={scrollRevealClassName}>
          <DailyScripturePulse
            onEngageContent={handleEngageContent}
            isNightSanctuary={isNightSanctuary}
            onOpenPassageInStudio={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/bible-study-studio';
              }
            }}
          />
        </div>

        {/* How to Use This App — Step-by-Step Guide, Feature Atlas & Set Outlines */}
        <div data-scroll-reveal="true" className={scrollRevealClassName}>
          <HowToUseAppSection
            onOpenJourneyModal={handleOpenJourneyModal}
            onOpenFeatureAtlasModal={() => {
              setIsFeatureAtlasOpen(true);
              handleEngageContent(5, 'Opened Ecosystem Feature Atlas Modal');
            }}
            onEngageContent={handleEngageContent}
            isNightSanctuary={isNightSanctuary}
            onToggleNightSanctuary={handleToggleNightSanctuary}
          />
        </div>

        {/* Dedicated Formation Studios Directory (Individual Pages) */}
        <div data-scroll-reveal="true" className={scrollRevealClassName}>
          <section
            id="formation-studios-directory"
            className="w-full max-w-full min-w-0 overflow-x-clip py-16 sm:py-20 lg:py-24 border-b border-[#E5DEC9] bg-[#F2ECE1]/40"
          >
            <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8 min-w-0">
              {/* Header with Title and Filtering Controls */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5DEC9] pb-6 min-w-0">
                <div className="max-w-2xl space-y-3 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#92400E] dark:text-[#FBBF24] min-w-0">
                    <span>Dedicated Exploration Studios</span>
                    <span aria-hidden="true">·</span>
                    <span>15-Year Formative Roadmap</span>
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1C1917] dark:text-[#FAF7F2]"
                    style={{
                      fontFamily: 'var(--font-display), serif',
                      textWrap: 'balance',
                    }}
                  >
                    Dedicated Formation Studios &amp; Portals
                  </h2>
                  <p className="text-sm sm:text-base text-[#1C1917] dark:text-[#FAF7F2] font-medium leading-relaxed">
                    Explore each dedicated environment in the Grow In The Word ecosystem.
                    Each studio has been crafted as an independent, distraction-free space with
                    a subtle 15-year developmental journey progress indicator.
                  </p>
                </div>

                {/* Filter and Atlas Controls */}
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {/* Reusable MilestoneMenu Dropdown Selection for filtering */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#57534E] dark:text-[#A8A29E] hidden sm:inline">
                      Filter:
                    </span>
                    <MilestoneMenu
                      selectedRange={selectedStudioAgeFilter}
                      onSelectRange={handleFilterChange}
                      triggerLabel={
                        selectedStudioAgeFilter === 'all'
                          ? 'All Milestones'
                          : selectedStudioAgeFilter === '3-7'
                          ? 'Ages 3–7'
                          : selectedStudioAgeFilter === '8-12'
                          ? 'Ages 8–12'
                          : 'Ages 13–18'
                      }
                      align="center"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsFeatureAtlasOpen(true);
                      handleEngageContent(5, 'Opened Ecosystem Feature Atlas Modal');
                    }}
                    className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EAE4D5] dark:bg-[#292524] dark:hover:bg-[#36312E] border border-[#E5DEC9] dark:border-[#36312E] text-xs font-semibold text-[#1C1917] dark:text-[#F9F6F0] transition-colors cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-[#D97706]" />
                    <span>Feature Atlas</span>
                  </button>
                </div>
              </div>

              {/* Milestone Overview Summary Component with D3 Concentric Progress Ring Chart */}
              <MilestoneOverviewSummary
                selectedRange={selectedStudioAgeFilter}
                onSelectRange={handleFilterChange}
                celebratedMilestones={celebratedMilestones}
                onTriggerCelebration={(stageId) => {
                  const primaryCard = STUDIO_CARDS.find((c) => c.primaryStage === stageId);
                  if (primaryCard) {
                    handleCelebrateCardMilestone(primaryCard);
                  }
                }}
              />

              {/* Full-Page Bible Reader Sanctuary Callout Banner (All 5 Versions: AKJV, AMP, NASB, NIV, NLT) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] dark:bg-[#24211E] border border-[#D97706]/50 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#D97706]/15 text-[#92400E] dark:text-[#FBBF24] border border-[#D97706]/30 font-mono text-[11px] uppercase tracking-wider font-semibold">
                      <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Full-Page Bible Sanctuary</span>
                    </span>
                    <span className="text-xs font-mono text-[#57534E] dark:text-[#A8A29E]">
                      Continuous Book Page · Verse Lines · Full-Page Parallel
                    </span>
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-normal text-[#1C1917] dark:text-[#F9F6F0]"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Read the Bible in Full-Page Form across All 5 Current Translations
                  </h3>
                  <p className="text-xs sm:text-sm text-[#44403C] dark:text-[#D6D3D1] leading-relaxed">
                    Immerse in distraction-free, full-viewport Scripture reading with continuous drop-cap book chapters, adjustable parchment margins, and instant switching or parallel comparison across{' '}
                    <strong className="font-semibold text-[#1C1917] dark:text-[#F9F6F0]">
                      AKJV, AMP, NASB, NIV, and NLT
                    </strong>
                    .
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 shrink-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(['AKJV', 'AMP', 'NASB', 'NIV', 'NLT'] as const).map(
                      (ver) => (
                        <Link
                          key={ver}
                          href={`/bible-reader?version=${ver}`}
                          className="px-2.5 py-1.5 rounded-lg bg-[#F2ECE1] hover:bg-[#D97706] text-[#1C1917] hover:text-[#1A1A1A] dark:bg-[#1C1917] dark:text-[#F9F6F0] dark:hover:bg-[#D97706] dark:hover:text-[#1A1A1A] border border-[#E5DEC9] dark:border-[#36312E] font-mono text-xs font-bold transition-colors"
                          title={`Open Full-Page Bible Reader in ${ver}`}
                        >
                          {ver}
                        </Link>
                      )
                    )}
                  </div>

                  <Link
                    href="/bible-reader"
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#D97706] text-[#FAF7F2] hover:text-[#1A1A1A] text-xs sm:text-sm font-semibold transition-colors shadow-xs whitespace-nowrap"
                  >
                    <BookOpen className="w-4 h-4 text-[#D97706] group-hover:text-[#1A1A1A]" />
                    <span>Open Full-Page Bible Reader</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Quick Filter Selection Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[#57534E] dark:text-[#A8A29E] flex items-center gap-1.5 mr-1">
                    <Filter className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Age Range:</span>
                  </span>

                  {[
                    {id: 'all', label: 'All Horizons (8)'},
                    {id: '3-7', label: 'Ages 3–7 · Childhood'},
                    {id: '8-12', label: 'Ages 8–12 · Tweens'},
                    {id: '13-18', label: 'Ages 13–18 · Teens'},
                  ].map((tab) => {
                    const isSelected = selectedStudioAgeFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() =>
                          handleFilterChange(tab.id as AgeRangeFilter)
                        }
                        className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706] shadow-xs'
                            : 'bg-[#FAF7F2] dark:bg-[#292524] text-[#44403C] dark:text-[#D6D3D1] border-[#E5DEC9] dark:border-[#36312E] hover:border-[#D97706]/60'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs font-mono text-[#92400E] dark:text-[#FBBF24]">
                  {selectedStudioAgeFilter === 'all'
                    ? '15-Year Formative Spectrum'
                    : selectedStudioAgeFilter === '3-7'
                    ? 'Years 1–5 · Foundation (33% Journey)'
                    : selectedStudioAgeFilter === '8-12'
                    ? 'Years 6–10 · Exploration (66% Journey)'
                    : 'Years 11–15 · Resilience (100% Journey)'}
                </div>
              </div>

              {/* Optional Milestone Celebration Notification Banner */}
              {milestoneCelebrationBanner && (
                <div className="flex items-center justify-between p-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D97706]/15 via-[#F59E0B]/20 to-[#4A5D4E]/15 border border-[#D97706]/40 text-[#92400E] dark:text-[#FBBF24] text-xs font-semibold shadow-xs transition-all">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#D97706] shrink-0 animate-pulse" />
                    <span>{milestoneCelebrationBanner}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMilestoneCelebrationBanner(null)}
                    className="text-[#92400E] hover:text-[#B45309] dark:text-[#FBBF24] text-xs font-mono px-2 py-0.5 rounded hover:bg-[#D97706]/20 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Filtered 8 Studio Cards Grid with Header Progress Indicators & CSS Transition Repositioning */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-0 transition-all duration-300">
                {STUDIO_CARDS.filter((card) => {
                  if (selectedStudioAgeFilter === 'all') return true;
                  return card.applicableRanges.includes(selectedStudioAgeFilter);
                }).map((card) => {
                  const Icon = card.icon;
                  const isPrimaryTarget =
                    card.primaryStage === selectedStudioAgeFilter;
                  const isCelebrated = Boolean(celebratedMilestones[card.id]);
                  return (
                    <div
                      key={card.id}
                      ref={(el) => {
                        if (el) {
                          cardElementsRef.current.set(card.id, el);
                        } else {
                          cardElementsRef.current.delete(card.id);
                        }
                      }}
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest('a, button')) return;
                        router.push(card.href);
                      }}
                      className={`rounded-2xl bg-[#FAF7F2] dark:bg-[#24211E] border p-6 flex flex-col justify-between space-y-5 shadow-xs group will-change-transform cursor-pointer relative overflow-hidden transition-[transform,box-shadow,border-color,background-color,opacity] duration-350 ease-[cubic-bezier(0.34,1.45,0.64,1)] hover:scale-[1.025] hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-12px_rgba(41,37,36,0.16),0_8px_16px_-4px_rgba(217,119,6,0.12)] dark:hover:shadow-[0_22px_40px_-12px_rgba(0,0,0,0.7),0_8px_16px_-4px_rgba(217,119,6,0.25)] motion-reduce:transform-none motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:translate-y-0 ${
                        isPrimaryTarget
                          ? 'border-[#D97706] ring-2 ring-[#D97706]/40 hover:border-[#D97706] hover:ring-[#D97706]/60'
                          : isCelebrated
                          ? 'border-[#10B981]/50 dark:border-[#10B981]/40 hover:border-[#10B981]'
                          : 'border-[#E5DEC9] dark:border-[#36312E] hover:border-[#D97706]/80'
                      }`}
                    >
                      {/* Celebratory Milestone Confetti Animation Effect */}
                      <StudioCardConfetti
                        active={celebratingCardId === card.id}
                        onComplete={() => setCelebratingCardId(null)}
                        accentTheme={card.accentTheme}
                      />

                      <div className="space-y-3.5 relative z-10">
                        {/* Card Header Top Row */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1917] border border-[#E5DEC9] dark:border-[#36312E] flex items-center justify-center text-[#92400E] shrink-0 group-hover:scale-110 group-hover:border-[#D97706]/50 group-hover:bg-[#FAF7F2] dark:group-hover:bg-[#2A2420] transition-transform duration-300 ease-[cubic-bezier(0.34,1.45,0.64,1)] motion-reduce:group-hover:scale-100">
                            <Icon className="w-5 h-5 text-[#D97706] group-hover:rotate-6 transition-transform duration-300 ease-[cubic-bezier(0.34,1.45,0.64,1)] motion-reduce:group-hover:rotate-0" />
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap justify-end">
                            {isPrimaryTarget && (
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FAF7F2] font-semibold bg-[#D97706] px-2 py-0.5 rounded-full shadow-2xs">
                                Stage Focus
                              </span>
                            )}
                            {isCelebrated && (
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[#047857] dark:text-[#34D399] font-semibold bg-[#10B981]/15 px-2 py-0.5 rounded-full border border-[#10B981]/30">
                                Milestone Reached
                              </span>
                            )}
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#92400E] dark:text-[#FBBF24] font-semibold bg-[#D97706]/10 px-2.5 py-1 rounded-full border border-[#D97706]/30">
                              {card.ageLabel}
                            </span>
                          </div>
                        </div>

                        {/* Subtle 15-Year Progress Indicator within Card Header with Milestone Celebrate Button */}
                        <div className="p-2.5 rounded-xl bg-white/70 dark:bg-[#1C1917]/70 border border-[#E5DEC9] dark:border-[#36312E] space-y-1.5 group-hover:border-[#D97706]/30 transition-colors duration-200">
                          <div className="flex items-center justify-between text-[10.5px] font-mono">
                            <span className="text-[#57534E] dark:text-[#A8A29E] truncate">
                              {card.journeySpan}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0 ml-1">
                              <span className="font-semibold text-[#D97706]">
                                {card.progressPercent}% Journey
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCelebrateCardMilestone(card);
                                }}
                                title="Celebrate reaching this formative milestone with celebratory confetti"
                                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer ${
                                  isCelebrated
                                    ? 'bg-[#10B981]/15 text-[#047857] dark:text-[#34D399] border border-[#10B981]/30 hover:bg-[#10B981]/25'
                                    : 'bg-[#D97706]/15 text-[#92400E] dark:text-[#FBBF24] border border-[#D97706]/30 hover:bg-[#D97706]/25 hover:scale-105'
                                }`}
                              >
                                <Sparkles className="w-2.5 h-2.5 text-[#D97706]" />
                                <span>{isCelebrated ? 'Reached ✓' : 'Celebrate'}</span>
                              </button>
                            </div>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-[#E5DEC9] dark:bg-[#36312E] overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] rounded-full transition-all duration-500"
                              style={{width: `${card.progressPercent}%`}}
                            />
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h3
                            className="text-xl font-normal text-[#1C1917] dark:text-[#F9F6F0] group-hover:text-[#92400E] dark:group-hover:text-[#FBBF24] transition-colors duration-200"
                            style={{fontFamily: 'var(--font-display), serif'}}
                          >
                            {card.title}
                          </h3>
                          <p className="text-xs text-[#57534E] dark:text-[#A8A29E] leading-relaxed mt-2">
                            {card.description}
                          </p>
                        </div>
                      </div>

                      {/* Navigation CTA Button */}
                      <Link
                        href={card.href}
                        className="min-h-[44px] inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#292524] text-[#F9F6F0] group-hover:bg-[#D97706] group-hover:text-[#1A1A1A] text-xs font-semibold transition-colors duration-200 cursor-pointer relative z-10"
                      >
                        <span>{card.actionText}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200 ease-out motion-reduce:group-hover:translate-x-0" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        <div data-scroll-reveal="true" className={scrollRevealClassName}>
          <MissionAboutSection onOpenJourneyModal={handleOpenJourneyModal} />
        </div>

        <div data-scroll-reveal="true" className={scrollRevealClassName}>
          <EvidenceSection onOpenJourneyModal={handleOpenJourneyModal} />
        </div>

        <div data-scroll-reveal="true" className={scrollRevealClassName}>
          <DesignSpecInspector onOpenJourneyModal={handleOpenJourneyModal} />
        </div>

        <div data-scroll-reveal="true" className={scrollRevealClassName}>
          <FaqSection onOpenJourneyModal={handleOpenJourneyModal} />
        </div>

        {/* Dedicated Authenticated Admin & Maintenance Backend Console (Houses Data Recording Architecture & Screen 03 Post-Intake Routing) */}
        <div data-scroll-reveal="true" className={scrollRevealClassName}>
          <AdminBackendMaintenanceSection
            onOpenJourneyModal={handleOpenJourneyModal}
            onEngageContent={handleEngageContent}
          />
        </div>

        <div data-scroll-reveal="true" className={scrollRevealClassName}>
          <EvidenceAndFooterSection
            onOpenJourneyModal={handleOpenJourneyModal}
          />
        </div>
      </main>

      {/* Subtle Floating Back to Top Button (Appears after scrolling past Hero) */}
      <BackToTopButton />

      {/* Floating Sanctuary User Dashboard Status Bar with Evolving Growth Seed */}
      <SanctuaryDashboardBar
        growthPoints={growthPoints}
        recentActivityLabel={recentActivityLabel}
        engagementLog={engagementLog}
        isNightSanctuary={isNightSanctuary}
        onToggleNightSanctuary={handleToggleNightSanctuary}
        onManualNourish={handleEngageContent}
        onOpenJourneyModal={handleOpenJourneyModal}
        onNavigateToGrowthSection={() => {
          if (typeof window !== 'undefined') {
            window.location.href = '/growth-tracker';
          }
        }}
      />

      {/* Interactive Household Onboarding Modal for "Begin the Journey" CTA */}
      <JourneyOnboardingModal
        isOpen={isJourneyModalOpen}
        initialTier={selectedModalTier}
        onClose={() => setIsJourneyModalOpen(false)}
      />

      {/* Quick-Reference Feature Atlas Modal Accessible from Navbar */}
      <FeatureAtlasModal
        isOpen={isFeatureAtlasOpen}
        onClose={() => setIsFeatureAtlasOpen(false)}
        onOpenJourneyModal={handleOpenJourneyModal}
        onEngageContent={handleEngageContent}
        isNightSanctuary={isNightSanctuary}
        onToggleNightSanctuary={handleToggleNightSanctuary}
      />
    </div>
  );
}
