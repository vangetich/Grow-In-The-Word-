'use client';

import React, {useState} from 'react';
import {motion, AnimatePresence, LayoutGroup, PanInfo} from 'motion/react';
import {
  Sprout,
  Flower2,
  TreeDeciduous,
  Trees,
  Sparkles,
  Moon,
  Sun,
  ChevronUp,
  ChevronDown,
  Search,
  BookOpen,
  Plus,
  Share2,
  Check,
  Target,
  X,
  Lock,
  Scroll,
  Copy,
  RotateCcw,
  Feather,
  Heart,
  Volume2,
  TrendingUp,
  Activity,
} from 'lucide-react';
import MilestoneShareModal from '@/components/MilestoneShareModal';
import GrowthHistoryD3Chart from '@/components/GrowthHistoryD3Chart';
import WeeklyEngagementRecharts from '@/components/WeeklyEngagementRecharts';
import GrowthTrackerModal from '@/components/GrowthTrackerModal';
import NetworkStatusIndicator from '@/components/NetworkStatusIndicator';
import DailyPrayerModal from '@/components/DailyPrayerModal';

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

const EARN_POINTS_GUIDE = [
  {
    icon: Moon,
    title: 'Bedtime Sanctuary Audio',
    desc: 'Listen to bedtime narratives or save an audio bookmark',
    points: '+15 pts',
  },
  {
    icon: Scroll,
    title: 'Historical Eras & Artifacts',
    desc: 'Explore timelines & inspect archaeological artifacts',
    points: '+15 pts',
  },
  {
    icon: BookOpen,
    title: 'Hebrew & Greek Root Words',
    desc: 'Examine ancient root lenses (Chesed, Ruach, Shalom)',
    points: '+10 pts',
  },
  {
    icon: Lock,
    title: 'Safe Harbor Private Vault',
    desc: 'Lock an encrypted reflection in the zero-knowledge vault',
    points: '+20 pts',
  },
  {
    icon: Target,
    title: 'Weekly Reading Rhythm',
    desc: 'Complete an unhurried, low-pressure reading session',
    points: '+20 pts',
  },
];

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
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(false);

  const handleJumpToInlineSection = (
    tab: 'evolution' | 'rhythm' | 'analytics' | 'milestone'
  ) => {
    setIsSeedTooltipOpen(false);
    setIsAffirmationWidgetOpen(false);
    setIsDashboardExpanded(false);
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
  const [isSeedTooltipOpen, setIsSeedTooltipOpen] = useState(false);
  const tooltipTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterSeed = () => {
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    setIsSeedTooltipOpen(true);
  };

  const handleMouseLeaveSeed = () => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setIsSeedTooltipOpen(false);
    }, 250);
  };

  // Personalized Low-Pressure Weekly Reading Goal State
  const [weeklyGoalTarget, setWeeklyGoalTarget] = useState<number>(3);
  const [weeklyCompletedSessions, setWeeklyCompletedSessions] =
    useState<number>(2);

  const currentStage =
    [...GROWTH_STAGES]
      .reverse()
      .find((stage) => growthPoints >= stage.minPoints) || GROWTH_STAGES[0];

  // Dashboard Tab state: 'overview' vs 'recharts' vs 'history'
  const [dashboardActiveTab, setDashboardActiveTab] = useState<
    'overview' | 'recharts' | 'history'
  >('overview');

  // Growth Bloom Celebration Thresholds (e.g., 20, 50, 80 pts milestones)
  const BLOOM_THRESHOLDS = [20, 25, 50, 80, 100];
  const [prevGrowthPoints, setPrevGrowthPoints] = useState(growthPoints);
  const [growthBloomActive, setGrowthBloomActive] = useState(false);
  const [pointPulseActive, setPointPulseActive] = useState(false);
  const [bloomCelebratedStage, setBloomCelebratedStage] =
    useState<GrowthStageInfo>(currentStage);

  // Synchronously adjust bloom & point pulse celebration during render upon point increase (React 19 pattern)
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

    if (crossedThreshold !== undefined || newStage.stageNumber > oldStage.stageNumber) {
      setBloomCelebratedStage(newStage);
      setGrowthBloomActive(true);
    }
  }

  // Auto-dismiss rhythmic point pulse after 2.2 seconds
  React.useEffect(() => {
    if (!pointPulseActive) return;
    const timer = setTimeout(() => {
      setPointPulseActive(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, [pointPulseActive]);

  // Auto-dismiss bloom celebration banner after 4.5 seconds
  React.useEffect(() => {
    if (!growthBloomActive) return;
    const timer = setTimeout(() => {
      setGrowthBloomActive(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, [growthBloomActive]);

  // Daily Affirmation & Growth Tracker Modal State
  const [isAffirmationWidgetOpen, setIsAffirmationWidgetOpen] = useState(false);
  const [isGrowthTrackerModalOpen, setIsGrowthTrackerModalOpen] = useState(false);
  const [selectedAffirmationIndex, setSelectedAffirmationIndex] =
    useState<number>(0);
  const [copiedAffirmation, setCopiedAffirmation] = useState(false);

  const activeFormationTierId: 'bedtime' | 'archive' | 'harbor' =
    currentStage.id === 'seed' || currentStage.id === 'sprout'
      ? 'bedtime'
      : currentStage.id === 'sapling'
      ? 'archive'
      : 'harbor';

  const tierAffirmations = DAILY_AFFIRMATIONS_DATA[activeFormationTierId];
  const activeDailyAffirmation =
    tierAffirmations[selectedAffirmationIndex % tierAffirmations.length];

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

  // Determine which visible surface owns the unified Growth Seed Framer Motion layoutId
  const activeSeedLayoutTarget: GrowthSeedSurfaceTarget = isGrowthTrackerModalOpen
    ? 'tracker-modal'
    : growthBloomActive
    ? 'bloom-banner'
    : isSeedTooltipOpen
    ? 'seed-tooltip'
    : isDashboardExpanded
    ? 'expanded-drawer'
    : 'compact-bar';

  // Unified Growth Seed motion wrapper using shared layoutId for smooth cross-component transitions on point/stage updates
  const renderUnifiedGrowthSeedIcon = (
    stageId: GrowthStageInfo['id'],
    sizeClass: string,
    surfaceTarget: GrowthSeedSurfaceTarget
  ) => {
    const isLayoutOwner = activeSeedLayoutTarget === surfaceTarget;
    return (
      <motion.div
        layoutId={isLayoutOwner ? GROWTH_SEED_LAYOUT_ID : undefined}
        initial={false}
        animate={
          growthBloomActive
            ? {
                scale: [1, 1.38, 0.95, 1.16, 1],
                opacity: [0.8, 1, 0.92, 1, 1],
                rotate: [0, -10, 12, -6, 0],
              }
            : pointPulseActive
            ? {
                scale: [0.92, 1.26, 0.97, 1.14, 1],
                opacity: [0.65, 1, 0.88, 1, 1],
                rotate: [0, -4, 4, 0],
              }
            : {scale: 1, opacity: 1, rotate: 0}
        }
        transition={
          growthBloomActive
            ? {
                layout: {type: 'spring', stiffness: 360, damping: 26},
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : pointPulseActive
            ? {
                layout: {type: 'spring', stiffness: 360, damping: 26},
                duration: 1.05,
                repeat: 1,
                ease: 'easeInOut',
              }
            : {
                layout: {type: 'spring', stiffness: 360, damping: 26},
                type: 'spring',
                stiffness: 320,
                damping: 20,
              }
        }
        className="flex items-center justify-center"
      >
        {renderGrowthBotanicalIcon(stageId, sizeClass)}
      </motion.div>
    );
  };

  return (
    <LayoutGroup id="sanctuary-growth-seed-group">
      <div
        aria-label="Floating Sanctuary User Dashboard, Weekly Reading Goal, and Growth Seed Status Bar"
        className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-40 w-auto sm:w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-[820px]"
      >
        {/* Expandable Dashboard Drawer */}
        <AnimatePresence>
          {isDashboardExpanded && (
            <motion.div
              initial={{opacity: 0, y: 24, scale: 0.95}}
              animate={{opacity: 1, y: 0, scale: 1}}
              exit={{opacity: 0, y: 28, scale: 0.95}}
              transition={{type: 'spring', stiffness: 340, damping: 28, mass: 0.9}}
              drag="y"
              dragDirectionLock
              dragConstraints={{top: 0, bottom: 0}}
              dragElastic={{top: 0.04, bottom: 0.45}}
              onDragEnd={(_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                if (info.offset.y > 85 || info.velocity.y > 400) {
                  setIsDashboardExpanded(false);
                }
              }}
              className="mb-2.5 rounded-2xl bg-[#1A1A1A] text-[#F9F6F0] border border-[#36312E] p-4 sm:p-6 shadow-2xl space-y-5 max-h-[78dvh] overflow-y-auto overscroll-contain touch-pan-y"
            >
              {/* Mobile Swipe-to-Dismiss Handle */}
              <div
                aria-hidden="true"
                className="sm:hidden flex flex-col items-center justify-center -mt-1 pb-1 cursor-grab active:cursor-grabbing select-none"
              >
                <div className="w-11 h-1.5 rounded-full bg-[#44403C]" />
                <span className="text-[10px] font-mono text-[#A8A29E] mt-1">
                  Swipe down to close
                </span>
              </div>

              {/* Header Row */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#292524]">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#292524] border border-[#D97706] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {renderUnifiedGrowthSeedIcon(
                      currentStage.id,
                      'w-5 h-5',
                      'expanded-drawer'
                    )}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#FBBF24]">
                      <span>Grow In The Word User Dashboard</span>
                      <span aria-hidden="true">·</span>
                      <span>{currentStage.ageHorizon}</span>
                    </div>
                    <h3
                      className="text-xl sm:text-2xl font-normal text-[#F9F6F0]"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      Stage 0{currentStage.stageNumber}: {currentStage.name}
                    </h3>
                    <p className="text-xs text-[#D6D3D1] leading-relaxed max-w-lg">
                      {currentStage.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleJumpToInlineSection('evolution')}
                    className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#292524] hover:bg-[#36312E] border border-[#D97706] text-[#FDE68A] text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
                    title="View the full-width responsive Growth Seed Tracker section on the page"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Full Inline Studio ↑</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleTriggerTestGrowthBloom}
                    className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#292524] hover:bg-[#36312E] border border-[#D97706]/50 text-[#FBBF24] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    title="Preview the Growth Bloom celebration animation"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Test Bloom</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPrayerModalOpen(true)}
                    className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#292524] hover:bg-[#36312E] border border-[#D97706]/70 text-[#FDE68A] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    title="Open Private Daily Prayer Request & Petition Sanctuary"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Daily Prayer (+15)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsShareModalOpen(true)}
                    className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#292524] hover:bg-[#36312E] border border-[#4A5D4E] text-[#F9F6F0] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Share Milestone</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogWeeklySession}
                    className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#D97706] hover:bg-[#F59E0B] text-[#1A1A1A] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log Quiet Session (+20)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsDashboardExpanded(false)}
                    aria-label="Close expanded dashboard drawer"
                    className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-[#292524] hover:bg-[#36312E] text-[#A8A29E] hover:text-[#F9F6F0] transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sub-Tab Navigation: Overview & Goals vs. Weekly Engagement (Recharts) vs. Growth History */}
              <div
                role="tablist"
                aria-label="Sanctuary Dashboard Views"
                className="flex flex-wrap items-center gap-1.5 p-1 bg-[#141210] rounded-xl border border-[#292524] self-start"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={dashboardActiveTab === 'overview'}
                  onClick={() => setDashboardActiveTab('overview')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    dashboardActiveTab === 'overview'
                      ? 'bg-[#292524] text-[#F9F6F0] border border-[#44403C]'
                      : 'text-[#A8A29E] hover:text-[#F9F6F0]'
                  }`}
                >
                  Overview &amp; Goals
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={dashboardActiveTab === 'recharts'}
                  onClick={() => setDashboardActiveTab('recharts')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    dashboardActiveTab === 'recharts'
                      ? 'bg-[#D97706]/20 text-[#FDE68A] border border-[#D97706]/50'
                      : 'text-[#A8A29E] hover:text-[#F9F6F0]'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Weekly Engagement (Recharts)</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={dashboardActiveTab === 'history'}
                  onClick={() => setDashboardActiveTab('history')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    dashboardActiveTab === 'history'
                      ? 'bg-[#D97706]/20 text-[#FDE68A] border border-[#D97706]/50'
                      : 'text-[#A8A29E] hover:text-[#F9F6F0]'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Growth History</span>
                </button>
              </div>

              {dashboardActiveTab === 'overview' && (
                <>
                  {/* PERSONALIZED WEEKLY READING GOAL WIDGET */}
                  <div className="p-4 rounded-xl bg-[#24211E] border border-[#36312E] space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#F9F6F0]">
                    <Target className="w-4 h-4 text-[#D97706]" />
                    <span>
                      Personalized Weekly Reading Goal (Low-Pressure Rhythm)
                    </span>
                  </div>

                  {/* Weekly Target Selector */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {WEEKLY_GOAL_PRESETS.map((preset) => {
                      const active = weeklyGoalTarget === preset.target;
                      return (
                        <button
                          key={preset.target}
                          type="button"
                          onClick={() => handleChangeWeeklyGoal(preset.target)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            active
                              ? 'bg-[#D97706] text-[#1A1A1A]'
                              : 'bg-[#1A1A1A] text-[#A8A29E] border border-[#36312E] hover:text-[#F9F6F0]'
                          }`}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Visual Growth Seed Nodes Representing Each Weekly Session */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2.5">
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
                              `Updated Weekly Reading Goal (${
                                idx + 1
                              }/${weeklyGoalTarget} sessions)`
                            );
                          }}
                          title={`Session ${idx + 1} of ${weeklyGoalTarget}`}
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                            isDone
                              ? 'bg-[#4A5D4E]/35 border-[#D97706] text-[#FBBF24] shadow-xs'
                              : 'bg-[#1A1A1A] border-[#36312E] text-[#57534E] hover:border-[#D97706]/50'
                          }`}
                        >
                          {isDone ? (
                            renderGrowthBotanicalIcon(currentStage.id, 'w-4 h-4')
                          ) : (
                            <span
                              className="text-xs font-mono tabular-nums"
                              style={{fontFamily: 'var(--font-mono), monospace'}}
                            >
                              0{idx + 1}
                            </span>
                          )}
                        </button>
                      );
                    })}
                    <div className="pl-1 space-y-0.5">
                      <div className="text-xs font-semibold text-[#F9F6F0]">
                        {weeklyCompletedSessions} of {weeklyGoalTarget} quiet
                        sessions completed
                      </div>
                      <div className="text-[11px] text-[#A8A29E]">
                        {weeklyCompletedSessions >= weeklyGoalTarget
                          ? 'Weekly rhythm complete! Your Growth Seed is flourishing.'
                          : 'Zero streak penalties—each session gently waters your Growth Seed.'}
                      </div>
                    </div>
                  </div>

                  {weeklyCompletedSessions >= weeklyGoalTarget && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#FBBF24]">
                      <Check className="w-3.5 h-3.5" />
                      <span>Goal Reached</span>
                    </span>
                  )}
                </div>
              </div>

              {/* DAILY AFFIRMATION WIDGET (Surfaces a gentle verse or thought-provoking prompt updated every 24 hours based on growth tier) */}
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#24211E] via-[#2A241F] to-[#24211E] border border-[#D97706]/40 space-y-3.5 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#36312E]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#FBBF24]">
                    <Sparkles className="w-4 h-4 text-[#D97706]" />
                    <span>Daily Affirmation · {activeDailyAffirmation.tierLabel}</span>
                    <span className="text-[11px] font-mono text-[#A8A29E] hidden sm:inline">
                      ({activeDailyAffirmation.cycleDay})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyDailyAffirmation}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1A1A1A] hover:bg-[#292524] text-[11px] font-medium text-[#D6D3D1] transition-colors cursor-pointer"
                      title="Copy Daily Affirmation & Prompt"
                    >
                      {copiedAffirmation ? (
                        <>
                          <Check className="w-3 h-3 text-[#A7F3D0]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleCycleDailyAffirmation}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#D97706]/20 hover:bg-[#D97706]/35 text-[#FDE68A] text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3 text-[#D97706]" />
                      <span>Next Prompt (+5)</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <blockquote
                    className="text-base sm:text-lg font-normal text-[#FAF7F2] leading-snug"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    {activeDailyAffirmation.verse}
                  </blockquote>
                  <div className="flex items-center justify-between text-xs text-[#D97706] font-mono">
                    <span>— {activeDailyAffirmation.scriptureReference}</span>
                    <span className="text-[#A8A29E] text-[11px] font-sans">
                      {activeDailyAffirmation.theme}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#1A1A1A]/90 border border-[#36312E] flex items-start gap-2.5 text-xs text-[#D6D3D1]">
                  <Feather className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F9F6F0] block mb-0.5">
                      Today’s Formation Reflection Prompt:
                    </strong>
                    “{activeDailyAffirmation.prompt}”
                  </div>
                </div>
              </div>

              {/* 5-Stage Seed-to-Tree Evolution Track */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-[#A8A29E]">
                  <span>
                    Seed-to-Tree Longitudinal Progression (Ages 3 → 18)
                  </span>
                  <span
                    className="font-mono text-[#FBBF24] tabular-nums"
                    style={{fontFamily: 'var(--font-mono), monospace'}}
                  >
                    {clampedProgress} / 100 Growth
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {GROWTH_STAGES.map((stage) => {
                    const unlocked = growthPoints >= stage.minPoints;
                    const isCurrent = currentStage.id === stage.id;
                    return (
                      <div
                        key={stage.id}
                        className={`p-2.5 rounded-xl border transition-all ${
                          isCurrent
                            ? 'bg-[#292524] border-[#D97706] ring-1 ring-[#D97706]'
                            : unlocked
                            ? 'bg-[#292524]/60 border-[#44403C]'
                            : 'bg-[#141210]/60 border-[#292524] opacity-55'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          {renderGrowthBotanicalIcon(stage.id, 'w-4 h-4')}
                          <span
                            className="text-[10px] font-mono text-[#A8A29E] tabular-nums"
                            style={{fontFamily: 'var(--font-mono), monospace'}}
                          >
                            {stage.minPoints}+
                          </span>
                        </div>
                        <div className="mt-1.5 text-[11px] font-semibold text-[#F9F6F0] truncate">
                          {stage.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {dashboardActiveTab === 'recharts' && (
            <WeeklyEngagementRecharts
              currentPoints={growthPoints}
              weeklyGoal={weeklyGoalTarget}
              weeklyCompleted={weeklyCompletedSessions}
              onOpenShareModal={() => setIsShareModalOpen(true)}
            />
          )}

          {dashboardActiveTab === 'history' && (
            <GrowthHistoryD3Chart
              currentPoints={growthPoints}
              currentStage={currentStage}
              onOpenShareModal={() => setIsShareModalOpen(true)}
            />
          )}

          {/* Bottom Utility Row: Recent Reflections Log + Quick Links */}
          <div className="pt-3 border-t border-[#292524] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#D6D3D1] truncate">
                  <Sparkles className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                  <span className="truncate">
                    Latest:{' '}
                    <strong className="text-[#F9F6F0]">
                      {recentActivityLabel}
                    </strong>
                    {engagementLog.length > 1
                      ? ` (${engagementLog.length} milestones)`
                      : ''}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href="#semantic-search"
                    onClick={() => setIsDashboardExpanded(false)}
                    className="inline-flex items-center gap-1 text-[#FBBF24] hover:underline underline-offset-4"
                  >
                    <Search className="w-3 h-3" />
                    <span>Search Archive</span>
                  </a>
                  <span aria-hidden="true" className="text-[#57534E]">
                    ·
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsDashboardExpanded(false);
                      onOpenJourneyModal();
                    }}
                    className="inline-flex items-center gap-1 text-[#F9F6F0] hover:text-[#FBBF24] cursor-pointer"
                  >
                    <BookOpen className="w-3 h-3 text-[#D97706]" />
                    <span>Open Intake Sanctuary</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Growth Bloom Celebration Banner */}
        <AnimatePresence>
          {growthBloomActive && (
            <motion.div
              initial={{opacity: 0, y: 14, scale: 0.95}}
              animate={{opacity: 1, y: 0, scale: 1}}
              exit={{opacity: 0, y: -10, scale: 0.95}}
              transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
              className="mb-2.5 rounded-2xl bg-gradient-to-r from-[#1C1917] via-[#2A231C] to-[#1C1917] border border-[#D97706] p-3.5 sm:p-4 text-[#F9F6F0] shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 overflow-hidden relative"
            >
              {/* Shimmer background glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D97706]/20 via-transparent to-transparent pointer-events-none" />

              <div className="flex items-center gap-3 relative z-10 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#D97706]/20 border border-[#D97706] flex items-center justify-center shrink-0 text-[#F59E0B]">
                  {renderUnifiedGrowthSeedIcon(
                    (bloomCelebratedStage || currentStage).id,
                    'w-5 h-5',
                    'bloom-banner'
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-[#FBBF24] bg-[#D97706]/20 px-2 py-0.5 rounded-full border border-[#D97706]/40">
                      Growth Bloom
                    </span>
                    <span className="text-xs text-[#E7E5E4] font-medium truncate">
                      Stage Reached: {(bloomCelebratedStage || currentStage).name}!
                    </span>
                  </div>
                  <p className="text-xs text-[#A8A29E] mt-0.5 truncate">
                    {(bloomCelebratedStage || currentStage).description} (+{growthPoints} pts)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 relative z-10 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(true)}
                  className="px-2.5 py-1.5 rounded-full bg-[#D97706] hover:bg-[#F59E0B] text-[#1A1A1A] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  Share Card
                </button>
                <button
                  type="button"
                  onClick={() => setGrowthBloomActive(false)}
                  className="p-1 rounded-full text-[#A8A29E] hover:text-[#F9F6F0] hover:bg-[#292524] transition-colors cursor-pointer"
                  aria-label="Dismiss bloom banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Compact Floating Dashboard Bar */}
        <div className="rounded-full bg-[#1A1A1A]/95 backdrop-blur-md text-[#F9F6F0] border border-[#36312E] shadow-xl px-4 sm:px-5 py-2.5 flex items-center justify-between gap-3 sm:gap-4">
          {/* Left Zone: Interactive Growth Seed Visual Element + Interactive Tooltip Popover */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="relative"
              onMouseEnter={handleMouseEnterSeed}
              onMouseLeave={handleMouseLeaveSeed}
            >
              <button
                type="button"
                onClick={() => {
                  setIsSeedTooltipOpen(false);
                  setIsGrowthTrackerModalOpen(true);
                }}
                aria-expanded={isGrowthTrackerModalOpen}
                aria-label={`Growth Seed: ${currentStage.name}. Click to open Growth Tracker Modal`}
                className="relative min-h-[44px] min-w-[44px] w-11 h-11 rounded-full bg-[#292524] hover:bg-[#36312E] border border-[#D97706]/60 hover:border-[#D97706] flex items-center justify-center shrink-0 cursor-pointer transition-colors shadow-xs"
              >
                {/* Growth Bloom Radial Animation Rings & Particle Sparks */}
                {growthBloomActive && (
                  <>
                    <motion.span
                      initial={{scale: 0.8, opacity: 0.95}}
                      animate={{scale: 2.3, opacity: 0}}
                      transition={{duration: 1.8, repeat: Infinity, ease: 'easeOut'}}
                      className="absolute inset-0 rounded-full border-2 border-[#D97706] pointer-events-none"
                    />
                    <motion.span
                      initial={{scale: 0.8, opacity: 0.75}}
                      animate={{scale: 1.7, opacity: 0}}
                      transition={{duration: 1.8, delay: 0.35, repeat: Infinity, ease: 'easeOut'}}
                      className="absolute inset-0 rounded-full border border-[#F59E0B] pointer-events-none"
                    />

                    {/* 4 Radiating Celebratory Particle Sparks */}
                    {[
                      {x: -18, y: -18},
                      {x: 18, y: -18},
                      {x: -18, y: 18},
                      {x: 18, y: 18},
                    ].map((offset, i) => (
                      <motion.span
                        key={i}
                        initial={{x: 0, y: 0, opacity: 1, scale: 0.5}}
                        animate={{
                          x: offset.x * 1.5,
                          y: offset.y * 1.5,
                          opacity: [1, 1, 0],
                          scale: [0.5, 1.2, 0],
                        }}
                        transition={{
                          duration: 1.4,
                          delay: i * 0.1,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                        className="absolute w-1.5 h-1.5 rounded-full bg-[#FBBF24] pointer-events-none shadow-[0_0_8px_#D97706]"
                      />
                    ))}

                    {/* Floating Milestone Bloom Tooltip Badge */}
                    <motion.div
                      initial={{opacity: 0, y: 6, scale: 0.8}}
                      animate={{opacity: 1, y: -28, scale: 1}}
                      exit={{opacity: 0, scale: 0.8}}
                      transition={{type: 'spring', stiffness: 380, damping: 20}}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#1A1A1A] text-[9.5px] font-bold font-mono tracking-tight pointer-events-none whitespace-nowrap shadow-xl border border-[#FDE68A]"
                    >
                      Bloom! {currentStage.name}
                    </motion.div>
                  </>
                )}

                {/* Soft Rhythmic Halo Ring on Any Point Increase */}
                {pointPulseActive && !growthBloomActive && (
                  <motion.span
                    layoutId="sanctuary-growth-seed-halo"
                    initial={{scale: 0.85, opacity: 0}}
                    animate={{
                      scale: [0.9, 1.55, 1.2],
                      opacity: [0, 0.75, 0],
                    }}
                    transition={{
                      duration: 1.1,
                      repeat: 1,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 rounded-full border border-[#D97706]/80 bg-[#D97706]/15 pointer-events-none"
                  />
                )}

                {renderUnifiedGrowthSeedIcon(
                  currentStage.id,
                  'w-4 h-4',
                  'compact-bar'
                )}
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#D97706] animate-pulse" />
              </button>

              {/* Interactive Tooltip Popover */}
              <AnimatePresence>
                {isSeedTooltipOpen && (
                  <motion.div
                    initial={{opacity: 0, y: 16, scale: 0.94}}
                    animate={{opacity: 1, y: 0, scale: 1}}
                    exit={{opacity: 0, y: 20, scale: 0.94}}
                    transition={{type: 'spring', stiffness: 340, damping: 28}}
                    drag="y"
                    dragDirectionLock
                    dragConstraints={{top: 0, bottom: 0}}
                    dragElastic={{top: 0.04, bottom: 0.45}}
                    onDragEnd={(_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                      if (info.offset.y > 70 || info.velocity.y > 380) {
                        setIsSeedTooltipOpen(false);
                      }
                    }}
                    onMouseEnter={handleMouseEnterSeed}
                    onMouseLeave={handleMouseLeaveSeed}
                    role="tooltip"
                    className="absolute bottom-full left-0 mb-3.5 w-[min(380px,calc(100vw-2rem))] rounded-2xl bg-[#1A1A1A] border border-[#D97706]/70 shadow-2xl p-4 sm:p-5 text-[#F9F6F0] z-50 space-y-3.5 backdrop-blur-md touch-pan-y"
                  >
                    {/* Tooltip Header */}
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#36312E]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#292524] border border-[#D97706] flex items-center justify-center shrink-0">
                          {renderUnifiedGrowthSeedIcon(
                            currentStage.id,
                            'w-4 h-4',
                            'seed-tooltip'
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#D97706] uppercase tracking-wider">
                            <span>Stage 0{currentStage.stageNumber}</span>
                            <span aria-hidden="true">·</span>
                            <span>{currentStage.name}</span>
                          </div>
                          <div
                            className="text-base font-normal text-[#F9F6F0]"
                            style={{fontFamily: 'var(--font-display), serif'}}
                          >
                            {currentStage.name}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsSeedTooltipOpen(false);
                        }}
                        className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl text-[#A8A29E] hover:text-[#F9F6F0] hover:bg-[#292524] cursor-pointer"
                        aria-label="Close tooltip"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Progress Level Card */}
                    <div className="p-3 rounded-xl bg-[#24211E] border border-[#36312E] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#D6D3D1] font-medium">
                          {growthPoints} / 100 Growth Points
                        </span>
                        <span className="text-[11px] font-mono text-[#FBBF24]">
                          {nextStage
                            ? `${pointsToNext} pts to ${nextStage.name}`
                            : 'Canopy Level (Flourishing)'}
                        </span>
                      </div>

                      <div className="h-2 rounded-full bg-[#1A1A1A] overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] rounded-full"
                          initial={{width: 0}}
                          animate={{width: `${Math.max(6, clampedProgress)}%`}}
                          transition={{duration: 0.35}}
                        />
                      </div>

                      <p className="text-[11px] text-[#A8A29E] leading-relaxed">
                        {currentStage.description}
                      </p>
                    </div>

                    {/* How to Earn More Points Section */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-[#FBBF24] uppercase tracking-wider">
                        <span>How to Earn Points</span>
                        <span className="text-[10px] text-[#A8A29E] font-normal lowercase">
                          (zero guilt · unhurried)
                        </span>
                      </div>

                      <div className="space-y-1.5 max-h-[175px] overflow-y-auto pr-1">
                        {EARN_POINTS_GUIDE.map((item, idx) => {
                          const IconComponent = item.icon;
                          return (
                            <div
                              key={idx}
                              className="p-2 rounded-lg bg-[#24211E]/70 border border-[#36312E] flex items-center justify-between gap-2.5 text-xs"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-6 h-6 rounded-md bg-[#1A1A1A] border border-[#44403C] flex items-center justify-center shrink-0">
                                  <IconComponent className="w-3.5 h-3.5 text-[#D97706]" />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-medium text-[#F9F6F0] text-[11px] truncate">
                                    {item.title}
                                  </div>
                                  <div className="text-[10px] text-[#A8A29E] truncate">
                                    {item.desc}
                                  </div>
                                </div>
                              </div>
                              <span className="text-[11px] font-mono font-semibold text-[#FDE68A] shrink-0 bg-[#292524] px-1.5 py-0.5 rounded border border-[#44403C]">
                                {item.points}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tooltip Quick Actions */}
                    <div className="pt-2 border-t border-[#36312E] flex flex-wrap items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          handleLogWeeklySession();
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#D97706] hover:bg-[#F59E0B] text-[#1A1A1A] text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Log Session (+20)</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleJumpToInlineSection('evolution')}
                          className="px-2.5 py-1 rounded-full bg-[#292524] hover:bg-[#36312E] text-[11px] text-[#FDE68A] hover:text-[#F9F6F0] border border-[#D97706]/50 cursor-pointer"
                        >
                          Inline Studio ↑
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsSeedTooltipOpen(false);
                            setIsGrowthTrackerModalOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-full bg-[#292524] hover:bg-[#36312E] text-[11px] text-[#FBBF24] hover:text-[#F9F6F0] border border-[#D97706]/40 cursor-pointer"
                        >
                          Modal →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-[#F9F6F0] truncate">
                  {currentStage.name}
                </span>
                <span aria-hidden="true" className="text-[#57534E]">
                  ·
                </span>
                <span
                  className="font-mono text-[11px] text-[#FBBF24] tabular-nums shrink-0"
                  style={{fontFamily: 'var(--font-mono), monospace'}}
                >
                  {weeklyCompletedSessions}/{weeklyGoalTarget} wk
                </span>
              </div>

              {/* Subtle Linear Growth Bar */}
              <div className="mt-1 w-full max-w-[7rem] sm:max-w-[10rem] h-1.5 rounded-full bg-[#292524] overflow-hidden">
                <motion.div
                  className="h-full bg-[#D97706] rounded-full"
                  initial={{width: '15%'}}
                  animate={{width: `${Math.max(8, clampedProgress)}%`}}
                  transition={{duration: 0.35, ease: 'easeOut'}}
                />
              </div>
            </div>
          </div>

          {/* Center Zone (Desktop): Daily Affirmation Widget, Weekly Goal & Milestone Share Triggers */}
          <div className="hidden md:flex items-center gap-2 text-xs shrink-0">
            {/* Daily Affirmation Trigger & Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsAffirmationWidgetOpen((prev) => !prev)}
                aria-expanded={isAffirmationWidgetOpen}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#292524] hover:bg-[#36312E] border border-[#D97706]/60 hover:border-[#D97706] text-[11px] font-medium text-[#FDE68A] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                title="Daily Affirmation & Thought Prompt"
              >
                <Sparkles className="w-3 h-3 text-[#D97706]" />
                <span>Daily Affirmation</span>
              </button>

              {/* Floating Daily Affirmation Popover */}
              <AnimatePresence>
                {isAffirmationWidgetOpen && (
                  <motion.div
                    initial={{opacity: 0, y: 16, scale: 0.94}}
                    animate={{opacity: 1, y: 0, scale: 1}}
                    exit={{opacity: 0, y: 20, scale: 0.94}}
                    transition={{type: 'spring', stiffness: 340, damping: 28}}
                    drag="y"
                    dragDirectionLock
                    dragConstraints={{top: 0, bottom: 0}}
                    dragElastic={{top: 0.04, bottom: 0.45}}
                    onDragEnd={(_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                      if (info.offset.y > 70 || info.velocity.y > 380) {
                        setIsAffirmationWidgetOpen(false);
                      }
                    }}
                    className="absolute bottom-full right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mb-3.5 w-[min(360px,calc(100vw-2rem))] rounded-2xl bg-[#1A1A1A] border border-[#D97706]/80 shadow-2xl p-4 text-[#F9F6F0] z-50 space-y-3 backdrop-blur-md touch-pan-y"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#292524]">
                      <div className="flex items-center gap-1.5 text-xs text-[#FBBF24] font-mono">
                        <Feather className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>Daily Affirmation · {activeDailyAffirmation.cycleDay}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsAffirmationWidgetOpen(false)}
                        aria-label="Close daily affirmation popover"
                        className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-[#A8A29E] hover:text-[#F9F6F0] rounded-xl hover:bg-[#292524] cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <p
                        className="text-sm italic text-[#FAF7F2] leading-relaxed"
                        style={{fontFamily: 'var(--font-display), serif'}}
                      >
                        “{activeDailyAffirmation.verse}”
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-[#A8A29E]">
                        <span className="font-mono text-[#D97706] font-semibold">{activeDailyAffirmation.scriptureReference}</span>
                        <span className="capitalize text-[#78716C]">{activeDailyAffirmation.tierLabel}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#24211E] border border-[#36312E] space-y-1">
                      <div className="text-[10px] uppercase font-mono tracking-wider text-[#A8A29E]">Today&apos;s Reflection</div>
                      <p className="text-xs text-[#D6D3D1] leading-relaxed">
                        {activeDailyAffirmation.prompt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={handleCopyDailyAffirmation}
                        className="min-h-[44px] px-2 inline-flex items-center gap-1 text-[11px] text-[#A8A29E] hover:text-[#F9F6F0] cursor-pointer"
                      >
                        <Copy className="w-3 h-3 text-[#D97706]" />
                        <span>{copiedAffirmation ? 'Copied to clipboard!' : 'Copy verse'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCycleDailyAffirmation}
                        className="min-h-[44px] px-2 inline-flex items-center gap-1 text-[11px] text-[#FBBF24] hover:underline cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Next reflection ({((selectedAffirmationIndex % tierAffirmations.length) + 1)}/{tierAffirmations.length})</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Daily Prayer Request Utility Trigger */}
            <button
              type="button"
              onClick={() => setIsPrayerModalOpen(true)}
              aria-expanded={isPrayerModalOpen}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full bg-[#292524] hover:bg-[#36312E] border border-[#D97706]/60 hover:border-[#D97706] text-[11px] font-medium text-[#FDE68A] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title="Daily Prayer & Petition Vault"
            >
              <Heart className="w-3 h-3 text-[#D97706]" />
              <span>Daily Prayer</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setDashboardActiveTab('history');
                setIsDashboardExpanded(true);
              }}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#292524] hover:bg-[#36312E] border border-[#44403C] text-[11px] font-medium text-[#E7E5E4] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <TrendingUp className="w-3 h-3 text-[#D97706]" />
              <span>Growth History</span>
            </button>
          </div>

          {/* Right Zone: Share Milestone + Offline Network Status + Night Sanctuary Toggle + Expand Dashboard Drawer */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              aria-label="Share Milestone"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-full bg-[#292524] hover:bg-[#36312E] border border-[#4A5D4E] text-[11px] font-semibold text-[#FDE68A] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Share2 className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="hidden sm:inline">Share Milestone</span>
            </button>
            <NetworkStatusIndicator />
            <button
              type="button"
              onClick={onToggleNightSanctuary}
              aria-pressed={isNightSanctuary}
              className={`min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isNightSanctuary
                  ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706]'
                  : 'bg-[#292524] hover:bg-[#36312E] text-[#F9F6F0] border-[#44403C]'
              }`}
            >
              {isNightSanctuary ? (
                <>
                  <Sun className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Day Cream</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#FBBF24]" />
                  <span className="hidden sm:inline">Night Sanctuary</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsDashboardExpanded((prev) => !prev)}
              aria-expanded={isDashboardExpanded}
              aria-label="Toggle Sanctuary Formation Dashboard"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1 px-3 py-2 rounded-full bg-[#292524] hover:bg-[#36312E] border border-[#44403C] text-xs font-medium text-[#D6D3D1] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="hidden sm:inline">Dashboard</span>
              {isDashboardExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#D97706]" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5 text-[#D97706]" />
              )}
            </button>
          </div>
        </div>
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
        seedIconLayoutId={
          activeSeedLayoutTarget === 'tracker-modal'
            ? GROWTH_SEED_LAYOUT_ID
            : undefined
        }
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
