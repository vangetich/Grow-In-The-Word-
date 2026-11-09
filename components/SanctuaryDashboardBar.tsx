'use client';

import React, {useState, useRef, useEffect} from 'react';
import {motion, AnimatePresence, LayoutGroup, PanInfo} from 'motion/react';
import {
  Sprout,
  Flower2,
  TreeDeciduous,
  Trees,
  Sparkles,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
  Search,
  BookOpen,
  Plus,
  Share2,
  Check,
  Target,
  X,
  Copy,
  RotateCcw,
  Feather,
  Heart,
  TrendingUp,
  Activity,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Pin,
  Star,
  BookmarkCheck,
  BookMarked,
} from 'lucide-react';
import Link from 'next/link';
import MilestoneShareModal from '@/components/MilestoneShareModal';
import GrowthHistoryD3Chart from '@/components/GrowthHistoryD3Chart';
import WeeklyEngagementRecharts from '@/components/WeeklyEngagementRecharts';
import GrowthTrackerModal from '@/components/GrowthTrackerModal';
import NetworkStatusIndicator from '@/components/NetworkStatusIndicator';
import DailyPrayerModal, {
  AGE_APPROPRIATE_MEDITATIVE_PRAYERS,
} from '@/components/DailyPrayerModal';

export interface GrowthStageInfo {
  stageNumber: number;
  id: 'seed' | 'sprout' | 'sapling' | 'tree' | 'canopy';
  name: string;
  ageHorizon: string;
  minPoints: number;
  nextPoints: number;
  description: string;
}

export const GROWTH_STAGES: GrowthStageInfo[] = [
  {
    stageNumber: 1,
    id: 'seed',
    name: 'Planted Seed',
    ageHorizon: 'Age 3 · First Bedtime Wonder',
    minPoints: 0,
    nextPoints: 25,
    description:
      'Quietly resting in warm soil—every bedtime psalm and honest question waters the root.',
  },
  {
    stageNumber: 2,
    id: 'sprout',
    name: 'First Rootlet Sprout',
    ageHorizon: 'Ages 5–7 · Evening Rhythm',
    minPoints: 25,
    nextPoints: 50,
    description:
      'Breaking through the surface as familiar stories of kindness and comfort take hold.',
  },
  {
    stageNumber: 3,
    id: 'sapling',
    name: 'Young Olive Sapling',
    ageHorizon: 'Ages 8–12 · The Ancient Archive',
    minPoints: 50,
    nextPoints: 80,
    description:
      'Growing sturdy branches through interactive maps, timelines, and ancient context.',
  },
  {
    stageNumber: 4,
    id: 'tree',
    name: 'Deep-Rooted Sanctuary Tree',
    ageHorizon: 'Ages 13–15 · The Safe Harbor',
    minPoints: 80,
    nextPoints: 100,
    description:
      'Resilient in the wind—able to hold hard questions, lament, and real-world ethics.',
  },
  {
    stageNumber: 5,
    id: 'canopy',
    name: 'Ancient Cedar of Wisdom',
    ageHorizon: 'Ages 16–18 · Lifelong Foundation',
    minPoints: 100,
    nextPoints: 100,
    description:
      'A full, flourishing tree of owned faith spanning 15 years of unhurried formation.',
  },
];

const WEEKLY_GOAL_PRESETS = [
  {target: 2, label: '2 / wk · Gentle Rhythm'},
  {target: 3, label: '3 / wk · Steady Roots'},
  {target: 5, label: '5 / wk · Deep Sanctuary'},
];

export interface ReadingPlanDayItem {
  day: number;
  chapterRef: string;
  chapterQueryId: string;
  focusTitle: string;
}

export interface GuidedReadingPlan {
  id: string;
  title: string;
  ageGroupLabel: string;
  themeSummary: string;
  defaultDailyChapterGoal: number;
  days: ReadingPlanDayItem[];
}

export const GUIDED_READING_PLANS: GuidedReadingPlan[] = [
  {
    id: 'mark-tweens',
    title: 'Gospel of Mark for Tweens',
    ageGroupLabel: 'Ages 8–12 · Historical Archive',
    themeSummary:
      'Fast-paced eyewitness sequence exploring Jesus’ servant leadership, miracles, and parables across Galilee and Jerusalem.',
    defaultDailyChapterGoal: 1,
    days: [
      {
        day: 1,
        chapterRef: 'Mark 1',
        chapterQueryId: 'mark-1',
        focusTitle: 'The Wilderness Voice & Capernaum Healings',
      },
      {
        day: 2,
        chapterRef: 'Mark 4',
        chapterQueryId: 'mark-4',
        focusTitle: 'Parable of the Sower & Calming the Storm',
      },
      {
        day: 3,
        chapterRef: 'Mark 6',
        chapterQueryId: 'mark-6',
        focusTitle: 'Compassion in the Wilderness & Loaves',
      },
      {
        day: 4,
        chapterRef: 'Mark 8',
        chapterQueryId: 'mark-8',
        focusTitle: '“Who Do You Say I Am?” at Caesarea Philippi',
      },
      {
        day: 5,
        chapterRef: 'Mark 10',
        chapterQueryId: 'mark-10',
        focusTitle: 'Blessing the Children & Servant Greatness',
      },
      {
        day: 6,
        chapterRef: 'Mark 14',
        chapterQueryId: 'mark-14',
        focusTitle: 'Passover, Gethsemane & Honest Courage',
      },
      {
        day: 7,
        chapterRef: 'Mark 16',
        chapterQueryId: 'mark-16',
        focusTitle: 'Sunrise at the Empty Tomb',
      },
    ],
  },
  {
    id: 'psalms-bedtime',
    title: 'Psalms of Peace & Shelter',
    ageGroupLabel: 'Ages 3–7 · Bedtime Sanctuary',
    themeSummary:
      'Gentle evening psalms of safety, creation wonder, and the Good Shepherd for unhurried bedtime rest.',
    defaultDailyChapterGoal: 1,
    days: [
      {
        day: 1,
        chapterRef: 'Psalm 23',
        chapterQueryId: 'psalms-23',
        focusTitle: 'The Good Shepherd & Still Waters',
      },
      {
        day: 2,
        chapterRef: 'Psalm 4',
        chapterQueryId: 'psalms-4',
        focusTitle: 'In Peace I Will Lie Down and Sleep',
      },
      {
        day: 3,
        chapterRef: 'Psalm 8',
        chapterQueryId: 'psalms-8',
        focusTitle: 'Moon and Stars Which You Have Set in Place',
      },
      {
        day: 4,
        chapterRef: 'Psalm 121',
        chapterQueryId: 'psalms-121',
        focusTitle: 'The Keeper Who Never Slumbers',
      },
      {
        day: 5,
        chapterRef: 'Psalm 139',
        chapterQueryId: 'psalms-139',
        focusTitle: 'Fearfully and Wonderfully Made',
      },
    ],
  },
  {
    id: 'harbor-lament',
    title: 'Honest Lament & Wisdom',
    ageGroupLabel: 'Ages 13–18 · Safe Harbor',
    themeSummary:
      'Unvarnished biblical wrestling with doubt, justice, meaning, and grace for teens.',
    defaultDailyChapterGoal: 2,
    days: [
      {
        day: 1,
        chapterRef: 'Psalm 130',
        chapterQueryId: 'psalms-130',
        focusTitle: 'Out of the Depths: Honest Lament',
      },
      {
        day: 2,
        chapterRef: 'Ecclesiastes 3',
        chapterQueryId: 'ecclesiastes-3',
        focusTitle: 'A Time for Every Matter Under Heaven',
      },
      {
        day: 3,
        chapterRef: 'Micah 6',
        chapterQueryId: 'micah-6',
        focusTitle: 'Act Justly, Love Mercy, Walk Humbly',
      },
      {
        day: 4,
        chapterRef: 'John 1',
        chapterQueryId: 'john-1',
        focusTitle: 'Light Shining in the Darkness',
      },
      {
        day: 5,
        chapterRef: 'Romans 8',
        chapterQueryId: 'romans-8',
        focusTitle: 'Nothing Can Separate Us from Love',
      },
    ],
  },
];

const READING_PLAN_STORAGE_KEY = 'grow_in_the_word_reading_plan_state_v1';

export interface DailyAffirmationItem {
  id: string;
  tierId: 'bedtime' | 'archive' | 'harbor';
  tierLabel: string;
  ageHorizon: string;
  verse: string;
  scriptureReference: string;
  prompt: string;
  cycleDay: string;
  theme: string;
}

const DAILY_AFFIRMATIONS_DATA: Record<
  'bedtime' | 'archive' | 'harbor',
  DailyAffirmationItem[]
> = {
  bedtime: [
    {
      id: 'bedtime-1',
      tierId: 'bedtime',
      tierLabel: 'Bedtime Sanctuary',
      ageHorizon: 'Ages 3–7 · Night Sanctuary Rhythm',
      verse:
        '“In peace I will lie down and sleep, for You alone, O Lord, make me dwell in safety.”',
      scriptureReference: 'Psalm 4:8',
      prompt:
        'Where did your child see an unexpected moment of quiet, goodness, or safety today before sleep?',
      cycleDay: 'Day 1 of 7 · Evening Rest & Calm',
      theme: 'Safe Shelter & Gentle Night',
    },
    {
      id: 'bedtime-2',
      tierId: 'bedtime',
      tierLabel: 'Bedtime Sanctuary',
      ageHorizon: 'Ages 3–7 · Night Sanctuary Rhythm',
      verse:
        '“The Lord is my shepherd; I shall not want. He makes me lie down in green pastures; He leads me beside still waters.”',
      scriptureReference: 'Psalm 23:1–2',
      prompt:
        'If you and your child could sit quietly beside the calmest water tonight, what would you whisper thank you for?',
      cycleDay: 'Day 2 of 7 · Still Waters & Care',
      theme: 'Caretaker Love & Still Waters',
    },
  ],
  archive: [
    {
      id: 'archive-1',
      tierId: 'archive',
      tierLabel: 'Historical Archive',
      ageHorizon: 'Ages 8–12 · Ancient Archive Wonder',
      verse:
        '“Remember the days of old; consider the years of many generations; ask your father and he will show you, your elders and they will tell you.”',
      scriptureReference: 'Deuteronomy 32:7',
      prompt:
        'Ancient stories are not fairy tales—they happened in real dust and stone. What question are you curious to ask history today?',
      cycleDay: 'Day 1 of 7 · Field Artifacts & Roots',
      theme: 'Historical Curiosity & Memory',
    },
    {
      id: 'archive-2',
      tierId: 'archive',
      tierLabel: 'Historical Archive',
      ageHorizon: 'Ages 8–12 · Ancient Archive Wonder',
      verse:
        '“He has made everything beautiful in its time. Also, He has put eternity into man’s heart, yet so that he cannot find out what God has done from the beginning to the end.”',
      scriptureReference: 'Ecclesiastes 3:11',
      prompt:
        'When you look at ancient maps and museum artifacts, how does realizing people lived thousands of years ago change your perspective?',
      cycleDay: 'Day 2 of 7 · Eternity & Mystery',
      theme: 'Deep Time & Human Resilience',
    },
  ],
  harbor: [
    {
      id: 'harbor-1',
      tierId: 'harbor',
      tierLabel: 'Safe Harbor',
      ageHorizon: 'Ages 13–18 · Safe Harbor & Lament',
      verse:
        '“Out of the depths I cry to You, O Lord! Lord, hear my voice! Let Your ears be attentive to the voice of my pleas for mercy!”',
      scriptureReference: 'Psalm 130:1–2',
      prompt:
        'Faith has never required pretending certainty. What is an honest tension or question you are holding today without an easy answer?',
      cycleDay: 'Day 1 of 7 · Unvarnished Truth & Ethics',
      theme: 'Honest Lament & Freedom from Pretense',
    },
    {
      id: 'harbor-2',
      tierId: 'harbor',
      tierLabel: 'Safe Harbor',
      ageHorizon: 'Ages 13–18 · Safe Harbor & Lament',
      verse:
        '“He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly, to love mercy, and to walk humbly with your God.”',
      scriptureReference: 'Micah 6:8',
      prompt:
        'Where is one place in your school or online world where practicing quiet kindness or defending someone would make a real difference?',
      cycleDay: 'Day 2 of 7 · Justice, Mercy & Action',
      theme: 'Prophetic Compassion & Humility',
    },
  ],
};

export const GROWTH_SEED_LAYOUT_ID = 'sanctuary-growth-seed-icon';

export type GrowthSeedSurfaceTarget =
  | 'compact-bar'
  | 'seed-tooltip'
  | 'bloom-banner'
  | 'expanded-drawer'
  | 'tracker-modal';

export interface SanctuaryDashboardBarProps {
  growthPoints: number;
  recentActivityLabel: string;
  engagementLog: string[];
  isNightSanctuary: boolean;
  onToggleNightSanctuary: () => void;
  onManualNourish: (points: number, label: string) => void;
  onOpenJourneyModal: (defaultTier?: 'bedtime' | 'archive' | 'harbor') => void;
  onNavigateToGrowthSection?: (
    tab: 'evolution' | 'rhythm' | 'analytics' | 'milestone'
  ) => void;
}

export default function SanctuaryDashboardBar({
  growthPoints,
  recentActivityLabel,
  engagementLog,
  isNightSanctuary,
  onToggleNightSanctuary,
  onManualNourish,
  onOpenJourneyModal,
  onNavigateToGrowthSection,
}: SanctuaryDashboardBarProps) {
  // Sidebar Menu state
  const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<
    'none' | 'affirmation' | 'prayer' | 'history' | 'dashboard'
  >('none');

  const menuContainerRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  // Close sidebar on click outside or Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        isSidebarMenuOpen &&
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node) &&
        triggerButtonRef.current &&
        !triggerButtonRef.current.contains(event.target as Node)
      ) {
        setIsSidebarMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isSidebarMenuOpen) {
        setIsSidebarMenuOpen(false);
      }
    }

    if (isSidebarMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSidebarMenuOpen]);

  const handleToggleSubmenu = (
    submenu: 'affirmation' | 'prayer' | 'history' | 'dashboard'
  ) => {
    setExpandedSubmenu((prev) => (prev === submenu ? 'none' : submenu));
  };

  const handleJumpToInlineSection = (
    tab: 'evolution' | 'rhythm' | 'analytics' | 'milestone'
  ) => {
    setIsSidebarMenuOpen(false);
    setIsGrowthTrackerModalOpen(false);
    setIsShareModalOpen(false);
    if (onNavigateToGrowthSection) {
      onNavigateToGrowthSection(tab);
    }
    if (typeof document !== 'undefined') {
      const el = document.getElementById('growth-seed-tracker');
      if (el) {
        el.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }
  };

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [isGrowthTrackerModalOpen, setIsGrowthTrackerModalOpen] =
    useState(false);

  // Personalized Low-Pressure Weekly Reading Goal State
  const [weeklyGoalTarget, setWeeklyGoalTarget] = useState<number>(3);
  const [weeklyCompletedSessions, setWeeklyCompletedSessions] =
    useState<number>(2);

  // Guided Reading Plan State (e.g., 'Gospel of Mark for Tweens') with Daily Chapter Goals
  const [activePlanId, setActivePlanId] = useState<string>('mark-tweens');
  const [dailyChapterGoal, setDailyChapterGoal] = useState<number>(1);
  const [completedPlanDaysMap, setCompletedPlanDaysMap] = useState<
    Record<string, boolean>
  >({
    'mark-tweens-day-1': true,
    'mark-tweens-day-2': true,
  });

  // Restore Reading Plan progress from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(READING_PLAN_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.activePlanId) setActivePlanId(parsed.activePlanId);
          if (typeof parsed.dailyChapterGoal === 'number') {
            setDailyChapterGoal(parsed.dailyChapterGoal);
          }
          if (
            parsed.completedPlanDaysMap &&
            typeof parsed.completedPlanDaysMap === 'object'
          ) {
            setCompletedPlanDaysMap(parsed.completedPlanDaysMap);
          }
        }
      } catch {
        // ignore storage errors
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const persistReadingPlanState = (
    nextPlanId: string,
    nextGoal: number,
    nextMap: Record<string, boolean>
  ) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(
        READING_PLAN_STORAGE_KEY,
        JSON.stringify({
          activePlanId: nextPlanId,
          dailyChapterGoal: nextGoal,
          completedPlanDaysMap: nextMap,
        })
      );
    } catch {
      // ignore
    }
  };

  const activeReadingPlan =
    GUIDED_READING_PLANS.find((p) => p.id === activePlanId) ||
    GUIDED_READING_PLANS[0];

  const completedDaysInActivePlan = activeReadingPlan.days.filter(
    (d) => completedPlanDaysMap[`${activeReadingPlan.id}-day-${d.day}`]
  ).length;

  const handleToggleReadingPlanDay = (planId: string, dayNum: number, chapterRef: string) => {
    const key = `${planId}-day-${dayNum}`;
    setCompletedPlanDaysMap((prev) => {
      const isNowDone = !prev[key];
      const nextMap = {...prev, [key]: isNowDone};
      persistReadingPlanState(activePlanId, dailyChapterGoal, nextMap);
      if (isNowDone) {
        onManualNourish(
          15,
          `Completed Reading Plan Day ${dayNum}: ${chapterRef} (${activeReadingPlan.title})`
        );
      }
      return nextMap;
    });
  };

  const currentStage =
    [...GROWTH_STAGES]
      .reverse()
      .find((stage) => growthPoints >= stage.minPoints) || GROWTH_STAGES[0];

  // Growth History Sub-Tab state: 'recharts' | 'history' (D3) | 'pinned' (Pinned Affirmations)
  const [historyTab, setHistoryTab] = useState<'history' | 'recharts' | 'pinned'>(
    'recharts'
  );

  // Growth Bloom Celebration Thresholds
  const BLOOM_THRESHOLDS = [20, 25, 50, 80, 100];
  const [prevGrowthPoints, setPrevGrowthPoints] = useState(growthPoints);
  const [growthBloomActive, setGrowthBloomActive] = useState(false);
  const [pointPulseActive, setPointPulseActive] = useState(false);
  const [bloomCelebratedStage, setBloomCelebratedStage] =
    useState<GrowthStageInfo>(currentStage);

  // Synchronously adjust bloom & point pulse celebration during render upon point increase
  if (growthPoints !== prevGrowthPoints) {
    const crossedThreshold = BLOOM_THRESHOLDS.find(
      (thresh) => prevGrowthPoints < thresh && growthPoints >= thresh
    );
    const pointsIncreased = growthPoints > prevGrowthPoints;
    setPrevGrowthPoints(growthPoints);
    const oldStage =
      [...GROWTH_STAGES]
        .reverse()
        .find((s) => prevGrowthPoints >= s.minPoints) || GROWTH_STAGES[0];
    const newStage =
      [...GROWTH_STAGES]
        .reverse()
        .find((s) => growthPoints >= s.minPoints) || GROWTH_STAGES[0];

    if (pointsIncreased) {
      setPointPulseActive(true);
    }

    if (
      crossedThreshold !== undefined ||
      newStage.stageNumber > oldStage.stageNumber
    ) {
      setBloomCelebratedStage(newStage);
      setGrowthBloomActive(true);
    }
  }

  // Auto-dismiss rhythmic point pulse after 2.2 seconds
  useEffect(() => {
    if (!pointPulseActive) return;
    const timer = setTimeout(() => {
      setPointPulseActive(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, [pointPulseActive]);

  // Auto-dismiss bloom celebration banner after 4.5 seconds
  useEffect(() => {
    if (!growthBloomActive) return;
    const timer = setTimeout(() => {
      setGrowthBloomActive(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, [growthBloomActive]);

  // Daily Affirmation & Pinned Affirmations State
  const [selectedAffirmationIndex, setSelectedAffirmationIndex] =
    useState<number>(0);
  const [copiedAffirmation, setCopiedAffirmation] = useState(false);
  const [pinnedAffirmations, setPinnedAffirmations] = useState<DailyAffirmationItem[]>([]);

  // Favorite Prayers & Age-Group Prayer Sidebar State
  const [favoritePrayerIds, setFavoritePrayerIds] = useState<string[]>([]);
  const [sidebarPrayerAgeGroup, setSidebarPrayerAgeGroup] = useState<'3-7' | '8-12' | '13-18'>('8-12');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      try {
        const storedPinned = localStorage.getItem('grow_in_the_word_pinned_affirmations_v1');
        if (storedPinned) {
          const parsed = JSON.parse(storedPinned);
          if (Array.isArray(parsed)) setPinnedAffirmations(parsed);
        }
        const storedFavs = localStorage.getItem('grow_in_the_word_favorite_prayers_v1');
        if (storedFavs) {
          const parsed = JSON.parse(storedFavs);
          if (Array.isArray(parsed)) setFavoritePrayerIds(parsed);
        }
      } catch {}
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const activeFormationTierId: 'bedtime' | 'archive' | 'harbor' =
    currentStage.id === 'seed' || currentStage.id === 'sprout'
      ? 'bedtime'
      : currentStage.id === 'sapling'
      ? 'archive'
      : 'harbor';

  const tierAffirmations = DAILY_AFFIRMATIONS_DATA[activeFormationTierId];
  const activeDailyAffirmation =
    tierAffirmations[selectedAffirmationIndex % tierAffirmations.length];

  const handlePinAffirmation = (item: DailyAffirmationItem) => {
    setPinnedAffirmations((prev) => {
      const exists = prev.some((a) => a.id === item.id);
      const updated = exists ? prev.filter((a) => a.id !== item.id) : [...prev, item];
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('grow_in_the_word_pinned_affirmations_v1', JSON.stringify(updated));
        }
      } catch {}
      if (!exists) {
        onManualNourish(10, `Pinned Daily Affirmation (${item.scriptureReference}) to Growth History`);
      }
      return updated;
    });
  };

  const handleToggleSidebarFavoritePrayer = (prayerId: string, prayerTitle: string) => {
    setFavoritePrayerIds((prev) => {
      const isFav = prev.includes(prayerId);
      const updated = isFav ? prev.filter((id) => id !== prayerId) : [...prev, prayerId];
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('grow_in_the_word_favorite_prayers_v1', JSON.stringify(updated));
        }
      } catch {}
      if (!isFav) {
        onManualNourish(10, `Saved Age-Appropriate Meditative Prayer: “${prayerTitle}” to Favorites`);
      }
      return updated;
    });
  };

  const handleCopyDailyAffirmation = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(
        `Grow In The Word Daily Affirmation (${activeDailyAffirmation.tierLabel}):\n${activeDailyAffirmation.verse} — ${activeDailyAffirmation.scriptureReference}\n\nReflection Prompt: “${activeDailyAffirmation.prompt}”`
      );
      setCopiedAffirmation(true);
      setTimeout(() => setCopiedAffirmation(false), 2000);
    }
  };

  const handleCycleDailyAffirmation = () => {
    setSelectedAffirmationIndex((prev) => prev + 1);
    onManualNourish(
      5,
      `Read & Cycled Daily Affirmation (${activeDailyAffirmation.scriptureReference})`
    );
  };

  const handleTriggerTestGrowthBloom = () => {
    setBloomCelebratedStage(currentStage);
    setGrowthBloomActive(true);
  };

  const currentStageIndex = GROWTH_STAGES.findIndex(
    (s) => s.id === currentStage.id
  );
  const nextStage =
    currentStageIndex + 1 < GROWTH_STAGES.length
      ? GROWTH_STAGES[currentStageIndex + 1]
      : null;
  const pointsToNext = nextStage
    ? Math.max(0, nextStage.minPoints - growthPoints)
    : 0;

  const clampedProgress = Math.min(100, growthPoints);

  const handleLogWeeklySession = () => {
    setWeeklyCompletedSessions((prev) => {
      const next = prev >= weeklyGoalTarget ? 1 : prev + 1;
      onManualNourish(
        20,
        `Logged Weekly Reading Session (${next}/${weeklyGoalTarget} this week)`
      );
      return next;
    });
  };

  const handleChangeWeeklyGoal = (newTarget: number) => {
    setWeeklyGoalTarget(newTarget);
    if (weeklyCompletedSessions > newTarget) {
      setWeeklyCompletedSessions(newTarget);
    }
    onManualNourish(
      5,
      `Set Weekly Reading Rhythm to ${newTarget} quiet sessions/week`
    );
  };

  const renderGrowthBotanicalIcon = (
    stageId: GrowthStageInfo['id'],
    sizeClass = 'w-4 h-4'
  ) => {
    if (stageId === 'seed') {
      return <Sprout className={`${sizeClass} text-[#D97706] scale-90`} />;
    }
    if (stageId === 'sprout') {
      return <Sprout className={`${sizeClass} text-[#D97706]`} />;
    }
    if (stageId === 'sapling') {
      return <Flower2 className={`${sizeClass} text-[#D97706]`} />;
    }
    if (stageId === 'tree') {
      return <TreeDeciduous className={`${sizeClass} text-[#F59E0B]`} />;
    }
    return <Trees className={`${sizeClass} text-[#FBBF24]`} />;
  };

  return (
    <LayoutGroup id="sanctuary-growth-seed-group">
      {/* Growth Bloom Celebration Banner */}
      <AnimatePresence>
        {growthBloomActive && (
          <motion.div
            initial={{opacity: 0, y: 16, scale: 0.95}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: -10, scale: 0.95}}
            transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
            className="fixed bottom-20 sm:bottom-22 right-4 sm:right-6 z-50 max-w-[min(380px,calc(100vw-2rem))] rounded-2xl bg-gradient-to-r from-[#1C1917] via-[#2A231C] to-[#1C1917] border border-[#D97706] p-3.5 sm:p-4 text-[#F9F6F0] shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D97706]/20 via-transparent to-transparent pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#D97706]/20 border border-[#D97706] flex items-center justify-center shrink-0 text-[#F59E0B]">
                {renderGrowthBotanicalIcon(
                  (bloomCelebratedStage || currentStage).id,
                  'w-4 h-4'
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#FBBF24] bg-[#D97706]/20 px-2 py-0.5 rounded-full border border-[#D97706]/40">
                    Growth Bloom
                  </span>
                  <span className="text-xs text-[#E7E5E4] font-medium truncate">
                    {(bloomCelebratedStage || currentStage).name}
                  </span>
                </div>
                <p className="text-[11px] text-[#A8A29E] mt-0.5 truncate">
                  {(bloomCelebratedStage || currentStage).description} (+{growthPoints} pts)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 relative z-10 shrink-0">
              <button
                type="button"
                onClick={() => setIsShareModalOpen(true)}
                className="px-2.5 py-1 rounded-full bg-[#D97706] hover:bg-[#F59E0B] text-[#1A1A1A] text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                Share
              </button>
              <button
                type="button"
                onClick={() => setGrowthBloomActive(false)}
                className="p-1 rounded-full text-[#A8A29E] hover:text-[#F9F6F0] hover:bg-[#292524] transition-colors cursor-pointer"
                aria-label="Dismiss bloom banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side-Bar Menu (housing all 7 items with a series of sub menus) */}
      <AnimatePresence>
        {isSidebarMenuOpen && (
          <motion.div
            ref={menuContainerRef}
            role="dialog"
            aria-label="Sanctuary Sidebar Menu"
            aria-modal="true"
            initial={{opacity: 0, y: 20, scale: 0.94}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 24, scale: 0.94}}
            transition={{type: 'spring', stiffness: 320, damping: 28, mass: 0.9}}
            drag="y"
            dragDirectionLock
            dragConstraints={{top: 0, bottom: 0}}
            dragElastic={{top: 0.04, bottom: 0.4}}
            onDragEnd={(_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
              if (info.offset.y > 80 || info.velocity.y > 400) {
                setIsSidebarMenuOpen(false);
              }
            }}
            className="fixed bottom-20 sm:bottom-22 right-4 sm:right-6 z-50 w-[min(390px,calc(100vw-2rem))] max-h-[82vh] overflow-y-auto overscroll-contain rounded-3xl bg-[#1C1917]/98 text-[#FAF7F2] border border-[#2E2925] shadow-2xl backdrop-blur-xl p-4 sm:p-5 space-y-3.5 touch-pan-y"
          >
            {/* Mobile swipe dismiss indicator */}
            <div
              aria-hidden="true"
              className="sm:hidden flex flex-col items-center justify-center -mt-1 pb-1 cursor-grab active:cursor-grabbing select-none"
            >
              <div className="w-10 h-1 rounded-full bg-[#44403C]" />
            </div>

            {/* Menu Header with Stage & Points */}
            <div className="flex items-center justify-between pb-3 border-b border-[#2E2925]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#292524] border border-[#D97706]/70 flex items-center justify-center shrink-0 shadow-xs">
                  {renderGrowthBotanicalIcon(currentStage.id, 'w-4 h-4')}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FBBF24]">
                      Stage 0{currentStage.stageNumber}
                    </span>
                    <span aria-hidden="true" className="text-[#57534E]">·</span>
                    <span className="text-[11px] font-mono text-[#D97706] font-semibold">
                      {growthPoints} pts
                    </span>
                  </div>
                  <h4
                    className="text-base font-normal text-[#FAF7F2] truncate"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    {currentStage.name}
                  </h4>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSidebarMenuOpen(false)}
                aria-label="Close Sanctuary menu"
                className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-[#292524] hover:bg-[#36312E] text-[#A8A29E] hover:text-[#FAF7F2] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Series of Sub-Menus (Gathered 7 items) */}
            <div className="space-y-2">
              {/* ITEM 1: Daily Affirmation (Expandable Submenu) */}
              <div className="rounded-2xl bg-[#24211E]/90 border border-[#36312E] overflow-hidden transition-colors">
                <button
                  type="button"
                  onClick={() => handleToggleSubmenu('affirmation')}
                  aria-expanded={expandedSubmenu === 'affirmation'}
                  className="w-full p-3 flex items-center justify-between gap-3 text-left hover:bg-[#2A241F] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#1C1917] border border-[#D97706]/50 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#FAF7F2]">
                        Daily Affirmation
                      </div>
                      <div className="text-[10px] text-[#A8A29E] truncate">
                        {activeDailyAffirmation.scriptureReference} · {activeDailyAffirmation.theme}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 text-[#A8A29E]">
                    <span className="text-[10px] font-mono text-[#FBBF24]">
                      {activeDailyAffirmation.cycleDay.split('·')[0].trim()}
                    </span>
                    {expandedSubmenu === 'affirmation' ? (
                      <ChevronDown className="w-4 h-4 text-[#D97706]" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedSubmenu === 'affirmation' && (
                    <motion.div
                      initial={{opacity: 0, height: 0}}
                      animate={{opacity: 1, height: 'auto'}}
                      exit={{opacity: 0, height: 0}}
                      transition={{duration: 0.25}}
                      className="px-3.5 pb-3.5 pt-1 border-t border-[#36312E] space-y-3"
                    >
                      <blockquote
                        className="text-xs italic text-[#FAF7F2] leading-relaxed pt-1"
                        style={{fontFamily: 'var(--font-display), serif'}}
                      >
                        {activeDailyAffirmation.verse}
                      </blockquote>

                      <div className="p-2.5 rounded-xl bg-[#1C1917] border border-[#36312E] flex items-start gap-2 text-[11px] text-[#D6D3D1]">
                        <Feather className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[#FAF7F2] font-medium block">
                            Today&apos;s Reflection Prompt:
                          </span>
                          “{activeDailyAffirmation.prompt}”
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={handleCopyDailyAffirmation}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#1C1917] hover:bg-[#2E2925] text-[10.5px] font-medium text-[#D6D3D1] border border-[#36312E] transition-colors cursor-pointer"
                          >
                            {copiedAffirmation ? (
                              <>
                                <Check className="w-3 h-3 text-[#A7F3D0]" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-[#D97706]" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handlePinAffirmation(activeDailyAffirmation)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10.5px] font-semibold border transition-colors cursor-pointer ${
                              pinnedAffirmations.some((a) => a.id === activeDailyAffirmation.id)
                                ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706]'
                                : 'bg-[#1C1917] hover:bg-[#2E2925] text-[#FDE68A] border-[#D97706]/50'
                            }`}
                          >
                            <Pin className="w-3 h-3 text-current" />
                            <span>
                              {pinnedAffirmations.some((a) => a.id === activeDailyAffirmation.id)
                                ? 'Pinned to Growth History ✓'
                                : 'Pin to Growth History (+10)'}
                            </span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={handleCycleDailyAffirmation}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#D97706]/20 hover:bg-[#D97706]/35 text-[#FDE68A] text-[10.5px] font-semibold border border-[#D97706]/40 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3 text-[#D97706]" />
                          <span>Next (+5)</span>
                        </button>
                      </div>

                      {pinnedAffirmations.length > 0 && (
                        <div className="pt-1.5 border-t border-[#36312E]/80 flex items-center justify-between text-[10.5px]">
                          <span className="text-[#A8A29E]">
                            {pinnedAffirmations.length} affirmation{pinnedAffirmations.length === 1 ? '' : 's'} pinned
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setHistoryTab('pinned');
                              setExpandedSubmenu('history');
                            }}
                            className="text-[#FBBF24] hover:underline font-medium cursor-pointer"
                          >
                            View in Growth History →
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ITEM 2: Daily Prayer (Expandable Age-Appropriate Meditative Prayers + Vault Trigger) */}
              <div className="rounded-2xl bg-[#24211E]/90 border border-[#36312E] overflow-hidden transition-colors">
                <div className="p-3 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleSubmenu('prayer')}
                    aria-expanded={expandedSubmenu === 'prayer'}
                    className="flex items-center gap-2.5 min-w-0 flex-1 text-left cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#1C1917] border border-[#D97706]/50 flex items-center justify-center shrink-0">
                      <Heart className="w-3.5 h-3.5 text-[#D97706]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-[#FAF7F2]">
                          Daily Prayer
                        </span>
                        {favoritePrayerIds.length > 0 && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-[#D97706]/20 text-[#FBBF24] text-[9.5px] font-mono">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            {favoritePrayerIds.length}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#A8A29E] truncate">
                        Ages 3–7, 8–12 &amp; 13–18 meditative prayers
                      </div>
                    </div>
                    {expandedSubmenu === 'prayer' ? (
                      <ChevronDown className="w-4 h-4 text-[#D97706] shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#A8A29E] shrink-0" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPrayerModalOpen(true)}
                    className="px-2.5 py-1.5 rounded-xl bg-[#292524] hover:bg-[#36312E] border border-[#D97706]/70 text-[#FDE68A] text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Vault (+15)
                  </button>
                </div>

                <AnimatePresence>
                  {expandedSubmenu === 'prayer' && (
                    <motion.div
                      initial={{opacity: 0, height: 0}}
                      animate={{opacity: 1, height: 'auto'}}
                      exit={{opacity: 0, height: 0}}
                      transition={{duration: 0.25}}
                      className="px-3.5 pb-3.5 pt-2 border-t border-[#36312E] space-y-3"
                    >
                      {/* Age Group Switcher (3-7, 8-12, 13-18) */}
                      <div className="flex items-center gap-1 p-1 bg-[#1C1917] rounded-xl border border-[#36312E]">
                        {(
                          [
                            {id: '3-7', label: 'Ages 3–7'},
                            {id: '8-12', label: 'Ages 8–12'},
                            {id: '13-18', label: 'Ages 13–18'},
                          ] as const
                        ).map((grp) => {
                          const isSelected = sidebarPrayerAgeGroup === grp.id;
                          return (
                            <button
                              key={grp.id}
                              type="button"
                              onClick={() => setSidebarPrayerAgeGroup(grp.id)}
                              className={`flex-1 py-1 rounded-lg text-[10.5px] font-semibold transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#D97706] text-[#1A1A1A]'
                                  : 'text-[#A8A29E] hover:text-[#FAF7F2]'
                              }`}
                            >
                              {grp.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Meditative Prayers for Selected Age Group */}
                      <div className="space-y-2 max-h-[240px] overflow-y-auto pr-0.5">
                        {AGE_APPROPRIATE_MEDITATIVE_PRAYERS[sidebarPrayerAgeGroup].map(
                          (prayerItem) => {
                            const isFav = favoritePrayerIds.includes(prayerItem.id);
                            return (
                              <div
                                key={prayerItem.id}
                                className="p-2.5 rounded-xl bg-[#1C1917] border border-[#36312E] space-y-2"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#FBBF24] block">
                                      {prayerItem.scriptureAnchor} · {prayerItem.ageGroupLabel}
                                    </span>
                                    <div
                                      className="text-xs font-semibold text-[#FAF7F2]"
                                      style={{fontFamily: 'var(--font-display), serif'}}
                                    >
                                      {prayerItem.title}
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleToggleSidebarFavoritePrayer(
                                        prayerItem.id,
                                        prayerItem.title
                                      )
                                    }
                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold border transition-colors cursor-pointer shrink-0 ${
                                      isFav
                                        ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706]'
                                        : 'bg-[#24211E] text-[#FDE68A] border-[#D97706]/50 hover:bg-[#2E2925]'
                                    }`}
                                    title="Save to Favorites in localStorage"
                                  >
                                    <Star
                                      className={`w-3 h-3 ${isFav ? 'fill-current' : ''}`}
                                    />
                                    <span>{isFav ? 'Favorited' : 'Save to Favorites'}</span>
                                  </button>
                                </div>

                                <p
                                  className="text-xs italic text-[#FAF7F2] leading-relaxed"
                                  style={{fontFamily: 'var(--font-display), serif'}}
                                >
                                  “{prayerItem.prayerText}”
                                </p>

                                <p className="text-[10.5px] text-[#A8A29E] leading-snug">
                                  <strong className="text-[#D97706]">Quiet Prompt:</strong>{' '}
                                  {prayerItem.meditativePrompt}
                                </p>
                              </div>
                            );
                          }
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[10.5px] text-[#A8A29E]">
                        <span>Saved privately in localStorage</span>
                        <button
                          type="button"
                          onClick={() => setIsPrayerModalOpen(true)}
                          className="text-[#FBBF24] hover:underline font-medium cursor-pointer"
                        >
                          Open Full Prayer Sanctuary →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ITEM 3: Growth History (Expandable Submenu) */}
              <div className="rounded-2xl bg-[#24211E]/90 border border-[#36312E] overflow-hidden transition-colors">
                <button
                  type="button"
                  onClick={() => handleToggleSubmenu('history')}
                  aria-expanded={expandedSubmenu === 'history'}
                  className="w-full p-3 flex items-center justify-between gap-3 text-left hover:bg-[#2A241F] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#1C1917] border border-[#D97706]/50 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-3.5 h-3.5 text-[#D97706]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#FAF7F2]">
                        Growth History
                      </div>
                      <div className="text-[10px] text-[#A8A29E] truncate">
                        Visual charts, streakless rhythm &amp; analytics
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 text-[#A8A29E]">
                    <span className="text-[10px] font-mono text-[#FBBF24]">
                      {historyTab === 'history' ? 'D3 Chart' : 'Engagement'}
                    </span>
                    {expandedSubmenu === 'history' ? (
                      <ChevronDown className="w-4 h-4 text-[#D97706]" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedSubmenu === 'history' && (
                    <motion.div
                      initial={{opacity: 0, height: 0}}
                      animate={{opacity: 1, height: 'auto'}}
                      exit={{opacity: 0, height: 0}}
                      transition={{duration: 0.25}}
                      className="px-3.5 pb-3.5 pt-1 border-t border-[#36312E] space-y-3"
                    >
                      {/* Sub-view switcher */}
                      <div className="flex items-center gap-1 p-1 bg-[#1C1917] rounded-xl border border-[#36312E]">
                        <button
                          type="button"
                          onClick={() => setHistoryTab('recharts')}
                          className={`flex-1 py-1 rounded-lg text-[10.5px] font-semibold transition-colors cursor-pointer ${
                            historyTab === 'recharts'
                              ? 'bg-[#292524] text-[#FAF7F2] border border-[#44403C]'
                              : 'text-[#A8A29E] hover:text-[#FAF7F2]'
                          }`}
                        >
                          <Activity className="w-3 h-3 inline mr-1 text-[#D97706]" />
                          Weekly
                        </button>
                        <button
                          type="button"
                          onClick={() => setHistoryTab('history')}
                          className={`flex-1 py-1 rounded-lg text-[10.5px] font-semibold transition-colors cursor-pointer ${
                            historyTab === 'history'
                              ? 'bg-[#292524] text-[#FAF7F2] border border-[#44403C]'
                              : 'text-[#A8A29E] hover:text-[#FAF7F2]'
                          }`}
                        >
                          <TrendingUp className="w-3 h-3 inline mr-1 text-[#D97706]" />
                          D3 History
                        </button>
                        <button
                          type="button"
                          onClick={() => setHistoryTab('pinned')}
                          className={`flex-1 py-1 rounded-lg text-[10.5px] font-semibold transition-colors cursor-pointer ${
                            historyTab === 'pinned'
                              ? 'bg-[#292524] text-[#FDE68A] border border-[#44403C]'
                              : 'text-[#A8A29E] hover:text-[#FAF7F2]'
                          }`}
                        >
                          <Pin className="w-3 h-3 inline mr-1 text-[#D97706]" />
                          Pinned ({pinnedAffirmations.length})
                        </button>
                      </div>

                      {/* Render chosen chart or pinned affirmations */}
                      <div className="overflow-hidden rounded-xl border border-[#36312E] bg-[#141210] p-2">
                        {historyTab === 'recharts' ? (
                          <WeeklyEngagementRecharts
                            currentPoints={growthPoints}
                            weeklyGoal={weeklyGoalTarget}
                            weeklyCompleted={weeklyCompletedSessions}
                            onOpenShareModal={() => setIsShareModalOpen(true)}
                          />
                        ) : historyTab === 'history' ? (
                          <GrowthHistoryD3Chart
                            currentPoints={growthPoints}
                            currentStage={currentStage}
                            onOpenShareModal={() => setIsShareModalOpen(true)}
                          />
                        ) : (
                          <div className="p-3 space-y-2.5 max-h-[220px] overflow-y-auto">
                            {pinnedAffirmations.length === 0 ? (
                              <div className="py-6 text-center space-y-1 text-xs text-[#A8A29E]">
                                <Pin className="w-6 h-6 text-[#D97706]/40 mx-auto" />
                                <p className="font-semibold text-[#FAF7F2]">No pinned affirmations yet.</p>
                                <p className="text-[11px]">Pin daily faith reflections above to save them to your Growth History.</p>
                              </div>
                            ) : (
                              pinnedAffirmations.map((aff) => (
                                <div
                                  key={aff.id}
                                  className="p-3 rounded-xl bg-[#1C1917] border border-[#36312E] space-y-1.5"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-[11px] font-mono font-bold text-[#FDE68A]">
                                      {aff.scriptureReference} · {aff.theme}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handlePinAffirmation(aff)}
                                      className="text-[#A8A29E] hover:text-rose-400 p-0.5 cursor-pointer"
                                      title="Unpin"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <p
                                    className="text-xs italic text-[#FAF7F2] leading-relaxed"
                                    style={{fontFamily: 'var(--font-display), serif'}}
                                  >
                                    &ldquo;{aff.verse}&rdquo;
                                  </p>
                                  <p className="text-[10.5px] text-[#A8A29E] leading-snug">
                                    Prompt: &ldquo;{aff.prompt}&rdquo;
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={handleLogWeeklySession}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D97706] hover:bg-[#F59E0B] text-[#1A1A1A] text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Log Quiet Session (+20)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleJumpToInlineSection('evolution')}
                          className="text-xs text-[#FBBF24] hover:underline cursor-pointer"
                        >
                          Inline Studio ↑
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ITEM 4: Share Milestone (Direct Action Trigger) */}
              <div className="rounded-2xl bg-[#24211E]/90 border border-[#36312E] p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#1C1917] border border-[#D97706]/50 flex items-center justify-center shrink-0">
                    <Share2 className="w-3.5 h-3.5 text-[#D97706]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#FAF7F2]">
                      Share Milestone
                    </div>
                    <div className="text-[10px] text-[#A8A29E] truncate">
                      Generate and export milestone achievement cards
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-[#292524] hover:bg-[#36312E] border border-[#4A5D4E] text-[#FDE68A] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Share
                </button>
              </div>

              {/* ITEM 5: Cached Offline (Status & Service Worker Row) */}
              <div className="rounded-2xl bg-[#24211E]/90 border border-[#36312E] p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#1C1917] border border-[#D97706]/50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#FAF7F2]">
                      Cached Offline
                    </div>
                    <div className="text-[10px] text-[#A8A29E] truncate">
                      Chapters &amp; audio stored locally for distraction-free rest
                    </div>
                  </div>
                </div>

                <div className="shrink-0 scale-95 origin-right">
                  <NetworkStatusIndicator />
                </div>
              </div>

              {/* ITEM 6: Night Sanctuary (Toggle Switch Row) */}
              <div className="rounded-2xl bg-[#24211E]/90 border border-[#36312E] p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#1C1917] border border-[#D97706]/50 flex items-center justify-center shrink-0">
                    {isNightSanctuary ? (
                      <Sun className="w-3.5 h-3.5 text-[#FBBF24]" />
                    ) : (
                      <Moon className="w-3.5 h-3.5 text-[#D97706]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#FAF7F2]">
                      Night Sanctuary
                    </div>
                    <div className="text-[10px] text-[#A8A29E] truncate">
                      {isNightSanctuary
                        ? '2100K Warm Amber palette active'
                        : 'Day Time high-contrast reading active'}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onToggleNightSanctuary}
                  aria-pressed={isNightSanctuary}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isNightSanctuary
                      ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706]'
                      : 'bg-[#292524] hover:bg-[#36312E] text-[#F9F6F0] border-[#44403C]'
                  }`}
                >
                  {isNightSanctuary ? 'Day Time' : '2100K Night'}
                </button>
              </div>

              {/* ITEM 7: Dashboard (Expandable Submenu with Guided Reading Plans) */}
              <div className="rounded-2xl bg-[#24211E]/90 border border-[#36312E] overflow-hidden transition-colors">
                <button
                  type="button"
                  onClick={() => handleToggleSubmenu('dashboard')}
                  aria-expanded={expandedSubmenu === 'dashboard'}
                  className="w-full p-3 flex items-center justify-between gap-3 text-left hover:bg-[#2A241F] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#1C1917] border border-[#D97706]/50 flex items-center justify-center shrink-0">
                      <Target className="w-3.5 h-3.5 text-[#D97706]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#FAF7F2]">
                        Dashboard &amp; Reading Plans
                      </div>
                      <div className="text-[10px] text-[#A8A29E] truncate">
                        {activeReadingPlan.title} · Daily chapter goals &amp; rhythm
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 text-[#A8A29E]">
                    <span className="text-[10px] font-mono text-[#FBBF24]">
                      {completedDaysInActivePlan}/{activeReadingPlan.days.length} d
                    </span>
                    {expandedSubmenu === 'dashboard' ? (
                      <ChevronDown className="w-4 h-4 text-[#D97706]" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedSubmenu === 'dashboard' && (
                    <motion.div
                      initial={{opacity: 0, height: 0}}
                      animate={{opacity: 1, height: 'auto'}}
                      exit={{opacity: 0, height: 0}}
                      transition={{duration: 0.25}}
                      className="px-3.5 pb-3.5 pt-1 border-t border-[#36312E] space-y-3.5"
                    >
                      {/* GUIDED READING PLAN FEATURE */}
                      <div className="p-3 rounded-xl bg-[#1C1917] border border-[#D97706]/40 space-y-2.5 mt-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5 text-[#D97706]" />
                            <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#FBBF24] font-semibold">
                              Guided Reading Plan
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-[#10B981]">
                            {completedDaysInActivePlan}/{activeReadingPlan.days.length} Days Done
                          </span>
                        </div>

                        {/* Plan Selector Tabs */}
                        <div className="flex flex-wrap gap-1">
                          {GUIDED_READING_PLANS.map((plan) => {
                            const isSelected = plan.id === activeReadingPlan.id;
                            return (
                              <button
                                key={plan.id}
                                type="button"
                                onClick={() => {
                                  setActivePlanId(plan.id);
                                  setDailyChapterGoal(plan.defaultDailyChapterGoal);
                                  persistReadingPlanState(
                                    plan.id,
                                    plan.defaultDailyChapterGoal,
                                    completedPlanDaysMap
                                  );
                                }}
                                className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-colors cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#D97706] text-[#1A1A1A]'
                                    : 'bg-[#292524] text-[#D6D3D1] hover:text-[#FAF7F2] border border-[#36312E]'
                                }`}
                              >
                                {plan.title}
                              </button>
                            );
                          })}
                        </div>

                        {/* Active Plan Meta & Daily Chapter Goal Selector */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#A8A29E]">
                            <span>{activeReadingPlan.ageGroupLabel}</span>
                            <div className="flex items-center gap-1">
                              <span>Daily Goal:</span>
                              {[1, 2, 3].map((chGoal) => (
                                <button
                                  key={chGoal}
                                  type="button"
                                  onClick={() => {
                                    setDailyChapterGoal(chGoal);
                                    persistReadingPlanState(
                                      activeReadingPlan.id,
                                      chGoal,
                                      completedPlanDaysMap
                                    );
                                  }}
                                  className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold cursor-pointer ${
                                    dailyChapterGoal === chGoal
                                      ? 'bg-[#D97706] text-[#1A1A1A]'
                                      : 'bg-[#292524] text-[#A8A29E] hover:text-[#FAF7F2]'
                                  }`}
                                >
                                  {chGoal} ch/d
                                </button>
                              ))}
                            </div>
                          </div>
                          <p className="text-[11px] text-[#D6D3D1] leading-snug">
                            {activeReadingPlan.themeSummary}
                          </p>
                          {/* Progress Bar */}
                          <div className="w-full h-1.5 rounded-full bg-[#292524] overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#D97706] to-[#10B981] transition-all duration-300"
                              style={{
                                width: `${Math.round(
                                  (completedDaysInActivePlan /
                                    activeReadingPlan.days.length) *
                                    100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Daily Chapter Sequence Checklist */}
                        <div className="max-h-[160px] overflow-y-auto space-y-1.5 pr-1">
                          {activeReadingPlan.days.map((dayObj) => {
                            const dayKey = `${activeReadingPlan.id}-day-${dayObj.day}`;
                            const isDayDone = Boolean(completedPlanDaysMap[dayKey]);
                            return (
                              <div
                                key={dayObj.day}
                                className={`p-2 rounded-lg border flex items-center justify-between gap-2 text-[11px] transition-colors ${
                                  isDayDone
                                    ? 'bg-[#10B981]/10 border-[#10B981]/40 text-[#FAF7F2]'
                                    : 'bg-[#24211E] border-[#36312E] text-[#D6D3D1]'
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleToggleReadingPlanDay(
                                      activeReadingPlan.id,
                                      dayObj.day,
                                      dayObj.chapterRef
                                    )
                                  }
                                  className="flex items-start gap-2 text-left flex-1 min-w-0 cursor-pointer"
                                >
                                  <CheckCircle2
                                    className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                                      isDayDone
                                        ? 'text-[#10B981]'
                                        : 'text-[#57534E] hover:text-[#D97706]'
                                    }`}
                                  />
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-mono text-[10px] text-[#FBBF24] font-semibold">
                                        Day {dayObj.day} · {dayObj.chapterRef}
                                      </span>
                                    </div>
                                    <div
                                      className={`text-[10.5px] truncate ${
                                        isDayDone ? 'line-through opacity-75' : ''
                                      }`}
                                    >
                                      {dayObj.focusTitle}
                                    </div>
                                  </div>
                                </button>

                                <Link
                                  href={`/bible-reader?chapter=${dayObj.chapterQueryId}`}
                                  onClick={() => setIsSidebarMenuOpen(false)}
                                  className="px-2 py-1 rounded bg-[#292524] hover:bg-[#D97706] text-[#FBBF24] hover:text-[#1A1A1A] font-mono text-[9.5px] font-semibold transition-colors shrink-0"
                                >
                                  Read →
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Weekly Goal Selector */}
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between text-[11px] text-[#A8A29E]">
                          <span className="font-medium text-[#FAF7F2]">
                            Weekly Reading Rhythm
                          </span>
                          <span className="font-mono text-[#FBBF24]">
                            {weeklyCompletedSessions} of {weeklyGoalTarget} sessions
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          {WEEKLY_GOAL_PRESETS.map((preset) => {
                            const active = weeklyGoalTarget === preset.target;
                            return (
                              <button
                                key={preset.target}
                                type="button"
                                onClick={() => handleChangeWeeklyGoal(preset.target)}
                                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
                                  active
                                    ? 'bg-[#D97706] text-[#1A1A1A]'
                                    : 'bg-[#1C1917] text-[#A8A29E] border border-[#36312E] hover:text-[#FAF7F2]'
                                }`}
                              >
                                {preset.label.split('·')[0].trim()}
                              </button>
                            );
                          })}
                        </div>

                        {/* Clickable Session Seeds */}
                        <div className="flex items-center gap-1.5 pt-1">
                          {Array.from({length: weeklyGoalTarget}).map((_, idx) => {
                            const isDone = idx < weeklyCompletedSessions;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  setWeeklyCompletedSessions(idx + 1);
                                  onManualNourish(
                                    15,
                                    `Updated Weekly Reading Rhythm (${idx + 1}/${weeklyGoalTarget} sessions)`
                                  );
                                }}
                                title={`Session ${idx + 1} of ${weeklyGoalTarget}`}
                                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                                  isDone
                                    ? 'bg-[#4A5D4E]/40 border-[#D97706] text-[#FBBF24]'
                                    : 'bg-[#1C1917] border-[#36312E] text-[#57534E] hover:border-[#D97706]/50'
                                }`}
                              >
                                {isDone ? (
                                  renderGrowthBotanicalIcon(currentStage.id, 'w-3.5 h-3.5')
                                ) : (
                                  <span className="text-[10px] font-mono">
                                    0{idx + 1}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Stage Progression Track */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[11px] text-[#A8A29E]">
                          <span>Longitudinal Progression</span>
                          <span className="font-mono text-[#FBBF24]">
                            {clampedProgress}/100 Growth
                          </span>
                        </div>
                        <div className="grid grid-cols-5 gap-1">
                          {GROWTH_STAGES.map((stage) => {
                            const isCurrent = currentStage.id === stage.id;
                            const isUnlocked = growthPoints >= stage.minPoints;
                            return (
                              <div
                                key={stage.id}
                                className={`p-1.5 rounded-lg border text-center transition-all ${
                                  isCurrent
                                    ? 'bg-[#292524] border-[#D97706] ring-1 ring-[#D97706]'
                                    : isUnlocked
                                    ? 'bg-[#292524]/60 border-[#44403C]'
                                    : 'bg-[#141210]/60 border-[#292524] opacity-50'
                                }`}
                              >
                                <div className="flex justify-center mb-0.5">
                                  {renderGrowthBotanicalIcon(stage.id, 'w-3 h-3')}
                                </div>
                                <div className="text-[9px] font-mono text-[#A8A29E]">
                                  {stage.minPoints}+
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Action buttons inside Dashboard: Test Bloom, Search, Intake */}
                      <div className="pt-2 border-t border-[#36312E] flex flex-wrap items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={handleTriggerTestGrowthBloom}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#292524] hover:bg-[#36312E] border border-[#D97706]/50 text-[#FBBF24] text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3 text-[#D97706]" />
                          <span>Test Bloom</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsSidebarMenuOpen(false);
                            onOpenJourneyModal();
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#292524] hover:bg-[#36312E] text-[#FAF7F2] text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          <BookOpen className="w-3 h-3 text-[#D97706]" />
                          <span>Intake Sanctuary</span>
                        </button>
                      </div>

                      {/* Recent Activity */}
                      <div className="text-[10px] text-[#A8A29E] pt-1 border-t border-[#36312E]/60 flex items-center gap-1.5 truncate">
                        <Sparkles className="w-3 h-3 text-[#D97706] shrink-0" />
                        <span className="truncate">
                          Latest: <strong className="text-[#FAF7F2]">{recentActivityLabel}</strong>
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Discrete Round Button in place of the old Dashboard button, sitting on the right lower side of the screen below the Back to Top button */}
      <div className="fixed bottom-5 sm:bottom-6 right-4 sm:right-6 z-40">
        <motion.button
          ref={triggerButtonRef}
          type="button"
          onClick={() => setIsSidebarMenuOpen((prev) => !prev)}
          aria-expanded={isSidebarMenuOpen}
          aria-label="Toggle Sanctuary Sidebar Menu (Daily Affirmation, Daily Prayer, Growth History, Share Milestone, Cached Offline, Night Sanctuary, Dashboard)"
          title="Sanctuary Menu · Affirmations, Prayer, History, Night Mode & Dashboard"
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#1C1917]/95 hover:bg-[#292524] text-[#FAF7F2] border border-[#D97706]/70 hover:border-[#D97706] shadow-2xl flex items-center justify-center transition-all cursor-pointer backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
        >
          {/* Subtle amber beacon pulse dot */}
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#D97706] animate-pulse shadow-[0_0_8px_#D97706]" />

          {/* Growth Bloom Radial Animation Rings */}
          {growthBloomActive && (
            <>
              <motion.span
                initial={{scale: 0.8, opacity: 0.95}}
                animate={{scale: 2.2, opacity: 0}}
                transition={{duration: 1.8, repeat: Infinity, ease: 'easeOut'}}
                className="absolute inset-0 rounded-full border-2 border-[#D97706] pointer-events-none"
              />
              <motion.span
                initial={{scale: 0.8, opacity: 0.75}}
                animate={{scale: 1.7, opacity: 0}}
                transition={{duration: 1.8, delay: 0.35, repeat: Infinity, ease: 'easeOut'}}
                className="absolute inset-0 rounded-full border border-[#F59E0B] pointer-events-none"
              />
            </>
          )}

          {/* Point Pulse Halo */}
          {pointPulseActive && !growthBloomActive && (
            <motion.span
              initial={{scale: 0.85, opacity: 0}}
              animate={{scale: [0.9, 1.6, 1.2], opacity: [0, 0.75, 0]}}
              transition={{duration: 1.1, repeat: 1, ease: 'easeInOut'}}
              className="absolute inset-0 rounded-full border border-[#D97706]/80 bg-[#D97706]/15 pointer-events-none"
            />
          )}

          {/* Icon: X if open, Botanical stage icon if closed */}
          {isSidebarMenuOpen ? (
            <X className="w-5 h-5 text-[#FAF7F2]" />
          ) : (
            renderGrowthBotanicalIcon(currentStage.id, 'w-5 h-5')
          )}
        </motion.button>
      </div>

      {/* Milestone Achievement Social Sharing Modal */}
      <MilestoneShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        currentStage={currentStage}
        growthPoints={growthPoints}
        weeklyCompleted={weeklyCompletedSessions}
        weeklyGoal={weeklyGoalTarget}
      />

      {/* Growth Seed Tracker Modal */}
      <GrowthTrackerModal
        isOpen={isGrowthTrackerModalOpen}
        onClose={() => setIsGrowthTrackerModalOpen(false)}
        growthPoints={growthPoints}
        currentStage={currentStage}
        onEarnPoints={(pts, lbl) => {
          onManualNourish(pts, lbl);
        }}
      />

      {/* Private Daily Prayer & Petition Modal */}
      <DailyPrayerModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
        onPrayerAdded={(pts, label) => onManualNourish(pts, label)}
        isNightSanctuary={isNightSanctuary}
      />
    </LayoutGroup>
  );
}
