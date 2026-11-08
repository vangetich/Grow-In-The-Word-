'use client';

import React, {useState, useEffect, useRef} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  Moon,
  Sun,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Wifi,
  WifiOff,
  BatteryCharging,
  Compass,
  ArrowRight,
  ArrowLeft,
  Check,
  Bookmark,
  Volume2,
  VolumeX,
  Shield,
  Heart,
  Droplets,
  Sunrise,
  Feather,
  Copy,
  ChevronRight,
  Maximize2,
  Minimize2,
  Share2,
} from 'lucide-react';

export interface BedtimeNarrativeItem {
  id: string;
  title: string;
  subtitle: string;
  theme: 'safety' | 'waters' | 'creation' | 'morning';
  themeLabel: string;
  storyDurationMin: number;
  loopDurationMin: number;
  scriptureReference: string;
  iconName: 'branch' | 'anchor' | 'dove' | 'moon' | 'star';
  description: string;
  quoteSnippet: string;
  morningPrompt: {
    recap: string;
    conversationStarter: string;
    scriptureQuestion: string;
  };
}

export const BEDTIME_STORIES_CATALOG: BedtimeNarrativeItem[] = [
  {
    id: 'story-shepherd',
    title: 'The Shepherd in the Dark Valley',
    subtitle: 'Psalm 23 · Deep Assurance & Safe Shelter',
    theme: 'safety',
    themeLabel: 'Safety & Shelter',
    storyDurationMin: 6,
    loopDurationMin: 10,
    scriptureReference: 'Psalm 23:1–4',
    iconName: 'branch',
    description:
      'A quiet recounting of the gentle shepherd who guides the sheep through shadowy hills, keeping guard while the night winds settle.',
    quoteSnippet:
      '“Even when the valley turns purple and shadowy, the Shepherd stays right beside you. You do not have to be brave all by yourself.”',
    morningPrompt: {
      recap: 'Last night, [Child’s Name] fell asleep listening to the story of the Shepherd in the dark valley.',
      conversationStarter:
        '“Hey, do you remember who walked beside the sheep even when the shadows grew long last night?”',
      scriptureQuestion: 'What made the little sheep feel safe enough to close its eyes?',
    },
  },
  {
    id: 'story-lake',
    title: 'The Story of the Quiet Lake',
    subtitle: 'Luke 8:22–25 · Calming Storms & Restful Breath',
    theme: 'waters',
    themeLabel: 'Quiet Waters',
    storyDurationMin: 7,
    loopDurationMin: 12,
    scriptureReference: 'Luke 8:24',
    iconName: 'anchor',
    description:
      'The rhythmic rocking of the wooden fishing boat, the sudden stormy squall, and Jesus speaking three quiet words that soothe the sea into warm glass.',
    quoteSnippet:
      '“Jesus stood up in the dark boat and whispered to the howling waves the way a parent whispers to a restless child: Peace, be still.”',
    morningPrompt: {
      recap: 'Last night, [Child’s Name] fell asleep listening to the story of the quiet lake.',
      conversationStarter:
        '“Hey, do you remember who brought peace to the big waves last night when the wind was loud?”',
      scriptureQuestion: 'Did the water listen right away?',
    },
  },
  {
    id: 'story-creation',
    title: 'The First Evening & Quiet Starlight',
    subtitle: 'Genesis 1 · Creation & Gentle Slumber',
    theme: 'creation',
    themeLabel: 'Creation & Wonder',
    storyDurationMin: 8,
    loopDurationMin: 15,
    scriptureReference: 'Genesis 1:3–5',
    iconName: 'star',
    description:
      'The ancient poetry of God painting the indigo cosmos, placing constellations like night lanterns, and calling the darkness good.',
    quoteSnippet:
      '“And God looked upon the velvety evening, lit by soft ancient stars, and smiled: It is very good. Sleep now, little creation.”',
    morningPrompt: {
      recap: 'Last night, [Child’s Name] fell asleep listening to the creation of starlight and evening rest.',
      conversationStarter:
        '“Did you know that the night was made to give the whole world a rest?”',
      scriptureQuestion: 'Which star do you think was made first?',
    },
  },
  {
    id: 'story-morning-mercies',
    title: 'The Sparrows in the Morning Olive Grove',
    subtitle: 'Matthew 6 · Unhurried Provision & Sunrise Trust',
    theme: 'morning',
    themeLabel: 'Morning Light',
    storyDurationMin: 5,
    loopDurationMin: 10,
    scriptureReference: 'Lamentations 3:22–23',
    iconName: 'dove',
    description:
      'The morning sparrows that never worry about tomorrow’s crumbs, resting peacefully through the night knowing the day will bring bread.',
    quoteSnippet:
      '“Not a single tiny sparrow falls from the olive branch without the Father knowing. How much more does He watch over your sleep tonight?”',
    morningPrompt: {
      recap: 'Last night, [Child’s Name] fell asleep listening to the story of the trusting sparrows.',
      conversationStarter:
        '“Did you hear the birds outside this morning? Do you think they worry about breakfast?”',
      scriptureQuestion: 'Who remembers to feed every little bird in the trees?',
    },
  },
];

interface BedtimeShepherdPhase2FlowProps {
  onEngageContent?: (points: number, label: string) => void;
  initialParentName?: string;
  initialChildName?: string;
  onExit?: () => void;
}

export default function BedtimeShepherdPhase2Flow({
  onEngageContent,
  initialParentName = 'Sarah',
  initialChildName = 'Noah',
  onExit,
}: BedtimeShepherdPhase2FlowProps) {
  // Navigation: screen 1 (hub), 2 (library), 3 (zero-glow player), 4 (morning bridge)
  const [currentScreen, setCurrentScreen] = useState<1 | 2 | 3 | 4>(1);

  // Household personalization
  const [parentName, setParentName] = useState(initialParentName);
  const [childName, setChildName] = useState(initialChildName);
  const [streakCount] = useState(5);
  const [isOfflineCached] = useState(true);

  // Selected Story
  const [selectedStoryId, setSelectedStoryId] = useState<string>('story-shepherd');
  const activeStory =
    BEDTIME_STORIES_CATALOG.find((s) => s.id === selectedStoryId) ||
    BEDTIME_STORIES_CATALOG[0];

  // Screen 2 Library Filter
  const [activeThemeFilter, setActiveThemeFilter] = useState<
    'all' | 'safety' | 'waters' | 'creation' | 'morning'
  >('all');

  // Screen 3 Zero-Glow Player States
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSeconds, setPlaybackSeconds] = useState(85);
  const totalSeconds = (activeStory.storyDurationMin + activeStory.loopDurationMin) * 60;
  const storySeconds = activeStory.storyDurationMin * 60;
  const isLullabyPhase = playbackSeconds >= storySeconds;
  const [controlsVisible, setControlsVisible] = useState(true);
  const [savedBookmarks, setSavedBookmarks] = useState<
    {seconds: number; label: string}[]
  >([
    {seconds: 45, label: 'The Shepherd by the Brook'},
    {seconds: 140, label: 'The Still Waters Whisper'},
  ]);
  const [justBookmarked, setJustBookmarked] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Auto-hide controls after 3 seconds in Screen 3 (Zero-Glow requirement)
  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleScreenTap = () => {
    setControlsVisible(true);
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    if (currentScreen === 3) {
      hideControlsTimerRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 3200);
    }
  };

  useEffect(() => {
    if (currentScreen !== 3) return;
    const timer = setTimeout(() => {
      setControlsVisible(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, [currentScreen]);

  // Audio Playback Timer Simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentScreen === 3) {
      interval = setInterval(() => {
        setPlaybackSeconds((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return totalSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentScreen, totalSeconds]);

  const handleStartBedtimeRoutine = (story?: BedtimeNarrativeItem) => {
    if (story) {
      setSelectedStoryId(story.id);
    }
    setPlaybackSeconds(0);
    setIsPlaying(true);
    setCurrentScreen(3);
    onEngageContent?.(20, `Began Bedtime Shepherd Routine: ${story?.title || activeStory.title}`);
  };

  const handleSaveAudioBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newBm = {
      seconds: playbackSeconds,
      label: `Bedtime Moment at ${formatTime(playbackSeconds)}`,
    };
    setSavedBookmarks((prev) => [...prev, newBm]);
    setJustBookmarked(true);
    setTimeout(() => setJustBookmarked(false), 2000);
    onEngageContent?.(10, `Saved Bedtime Audio Bookmark at ${formatTime(playbackSeconds)}`);
    handleScreenTap();
  };

  const handleCopyMorningPrompt = () => {
    const formattedPrompt = `${activeStory.morningPrompt.recap.replace('[Child’s Name]', childName)}\n\nBreakfast Conversation Starter:\n${activeStory.morningPrompt.conversationStarter}\n\nGentle Wonder Question: ${activeStory.morningPrompt.scriptureQuestion}\n— Grow In The Word (Phase 2 Bedtime Shepherd)`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(formattedPrompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2200);
      onEngageContent?.(10, 'Saved Morning Bridge Breakfast Conversation Starter');
    }
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
  };

  // Filtered stories for Screen 2
  const filteredStories = BEDTIME_STORIES_CATALOG.filter((story) => {
    if (activeThemeFilter === 'all') return true;
    return story.theme === activeThemeFilter;
  });

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-[#E5DEC9] bg-[#F9F6F0] text-[#1A1A1A] shadow-xl relative transition-all">
      {/* Top Breadcrumb & Phase 2 Specification Banner */}
      <div className="px-5 py-3 bg-[#F2ECE1] border-b border-[#E5DEC9] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold uppercase text-[#D97706] tracking-wider">
            Grow In The Word
          </span>
          <span aria-hidden="true" className="text-[#A8A29E]">
            ·
          </span>
          <span className="text-[#57534E] font-medium">
            Phase 2: The “Bedtime Shepherd” (Ages 3–7)
          </span>
        </div>

        {/* Screen Switcher Tabs for Prototype Exploration */}
        <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-lg border border-[#E5DEC9]">
          {[
            {num: 1, label: '1. Parent Hub'},
            {num: 2, label: '2. Calm Library'},
            {num: 3, label: '3. Zero-Glow Player'},
            {num: 4, label: '4. Morning Bridge'},
          ].map((tab) => (
            <button
              key={tab.num}
              type="button"
              onClick={() => {
                setCurrentScreen(tab.num as 1 | 2 | 3 | 4);
                if (tab.num === 3) handleScreenTap();
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                currentScreen === tab.num
                  ? 'bg-[#1C1917] text-[#FAF7F2]'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* SCREEN 1: THE TIER 1 PARENT & CHILD HUB (THE ENTRY DASHBOARD) */}
      {/* ========================================================= */}
      {currentScreen === 1 && (
        <motion.div
          key="screen-1"
          initial={{opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -12}}
          transition={{duration: 0.25}}
          className="relative p-6 sm:p-10 lg:p-12 overflow-hidden"
        >
          {/* Soft Organic Amber Gradient Orb in Corner */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-[#D97706]/15 via-[#F59E0B]/5 to-transparent blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-8 relative z-10">
            {/* Quick State Indicators */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#57534E]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE9DC] border border-[#E5DEC9] text-[#92400E]">
                <Moon className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{streakCount} nights of peaceful rhythms</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE9DC] border border-[#E5DEC9] text-[#4A5D4E]">
                <Check className="w-3.5 h-3.5 text-[#4A5D4E]" />
                <span>Offline Audio Ready · 100% Cached</span>
              </div>
            </div>

            {/* The Greeting Header */}
            <div className="space-y-2">
              <h2
                className="text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight leading-tight"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Good evening, {parentName}. Ready for tonight&apos;s rest?
              </h2>
              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                Dim the room lights, settle in beside {childName}, and let ancient peaceful
                scripture rhythms dissolve the day’s fatigue.
              </p>
            </div>

            {/* The Hero Routine Card: Tonight's Bedtime Shepherd */}
            <div className="rounded-2xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 sm:p-8 space-y-6 shadow-sm hover:border-[#D97706]/40 transition-colors">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-[#E5DEC9]/80">
                <span className="font-mono text-[#D97706] font-semibold uppercase tracking-wider">
                  Tonight&apos;s Bedtime Shepherd
                </span>
                <span className="text-[#78716C] font-mono">
                  {activeStory.storyDurationMin} min story + {activeStory.loopDurationMin} min lullaby
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#4A5D4E]">
                  {activeStory.subtitle}
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-normal text-[#1A1A1A]"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  {activeStory.title}
                </h3>
                <p className="text-sm text-[#44403C] leading-relaxed italic">
                  {activeStory.quoteSnippet}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => handleStartBedtimeRoutine(activeStory)}
                  className="px-6 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-[#D97706]/30 hover:border-[#D97706]"
                >
                  <Play className="w-4 h-4 fill-current text-[#D97706]" />
                  <span>Begin Bedtime Routine</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentScreen(2)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97706] hover:underline underline-offset-4 cursor-pointer"
                >
                  <span>Choose Another Narrative from Library</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Personalization Pill */}
            <div className="pt-2 flex items-center gap-3 text-xs text-[#78716C]">
              <span>Household:</span>
              <input
                type="text"
                aria-label="Parent name"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-24 px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#E5DEC9] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D97706]"
              />
              <span>&amp; child:</span>
              <input
                type="text"
                aria-label="Child name"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-24 px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#E5DEC9] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D97706]"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* ========================================================= */}
      {/* SCREEN 2: THE CALM AUDIO LIBRARY (THE NARRATIVE SELECTION) */}
      {/* ========================================================= */}
      {currentScreen === 2 && (
        <motion.div
          key="screen-2"
          initial={{opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -12}}
          transition={{duration: 0.25}}
          className="p-6 sm:p-10 lg:p-12 space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DEC9]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D97706]">
                <span>The Calm Audio Library</span>
                <span aria-hidden="true">·</span>
                <span>Zero Flashing Banners or Distractions</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-normal text-[#1A1A1A]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Curated Bedtime Narratives
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setCurrentScreen(1)}
              className="inline-flex items-center gap-1.5 text-xs text-[#57534E] hover:text-[#1A1A1A] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Bedtime Hub</span>
            </button>
          </div>

          {/* Simple Curation Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              {id: 'all', label: 'All Stories'},
              {id: 'safety', label: 'Safety & Shelter'},
              {id: 'waters', label: 'Quiet Waters'},
              {id: 'creation', label: 'Creation & Wonder'},
              {id: 'morning', label: 'Morning Light'},
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveThemeFilter(f.id as typeof activeThemeFilter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  activeThemeFilter === f.id
                    ? 'bg-[#1C1917] text-[#FAF7F2]'
                    : 'bg-[#F2ECE1] text-[#57534E] hover:bg-[#E5DEC9]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Story Tiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredStories.map((story) => {
              const isSelected = selectedStoryId === story.id;
              return (
                <div
                  key={story.id}
                  onClick={() => handleStartBedtimeRoutine(story)}
                  className={`rounded-2xl p-6 border transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-md ${
                    isSelected
                      ? 'bg-[#F2ECE1] border-[#D97706] ring-1 ring-[#D97706]'
                      : 'bg-[#FAF7F2] border-[#E5DEC9] hover:border-[#D97706]/60'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#4A5D4E] font-semibold uppercase tracking-wider">
                        {story.themeLabel}
                      </span>
                      <span className="font-mono text-[#78716C]">
                        {story.storyDurationMin} min story + {story.loopDurationMin} min loop
                      </span>
                    </div>

                    <h3
                      className="text-xl font-normal text-[#1A1A1A]"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      {story.title}
                    </h3>

                    <p className="text-xs text-[#57534E] leading-relaxed">
                      {story.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E5DEC9] flex items-center justify-between">
                    <span className="text-xs font-mono text-[#D97706]">
                      {story.scriptureReference}
                    </span>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] text-xs font-semibold cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current text-[#D97706]" />
                      <span>Start Routine</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ========================================================= */}
      {/* SCREEN 3: THE "ZERO-GLOW" NIGHT-MODE PLAYER INTERFACE */}
      {/* ========================================================= */}
      {currentScreen === 3 && (
        <motion.div
          key="screen-3"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.4}}
          onClick={handleScreenTap}
          className="relative min-h-[520px] sm:min-h-[580px] bg-[#000000] text-[#E7E5E4] p-6 sm:p-10 flex flex-col justify-between select-none cursor-pointer overflow-hidden"
          style={{touchAction: 'manipulation'}}
        >
          {/* Top Bar: Minimal Status (Ultra-low brightness) */}
          <div
            className={`transition-opacity duration-500 flex items-center justify-between text-xs text-[#525252] ${
              controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D97706]/70 animate-pulse" />
              <span className="font-mono">Zero-Glow Bedtime Player · 2100K Warmth</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentScreen(1);
              }}
              className="text-[#737373] hover:text-[#D4D4D4] px-2.5 py-1 rounded-md bg-[#171717] border border-[#262626] text-xs cursor-pointer"
            >
              Exit Player
            </button>
          </div>

          {/* Central Ambient Visualizer: Single Slow-Pulsing Soft Amber Ring */}
          <div className="my-auto flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative flex items-center justify-center">
              {/* Resonant Outer Breathing Ring */}
              <motion.div
                animate={{
                  scale: [1, 1.45, 1],
                  opacity: [0.15, 0.45, 0.15],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-[#D97706]/40 pointer-events-none absolute"
              />

              {/* Inner Calming Ring */}
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.35, 0.75, 0.35],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#D97706]/20 via-[#B45309]/10 to-transparent border border-[#F59E0B]/50 flex items-center justify-center shadow-[0_0_40px_rgba(217,119,6,0.25)]"
              >
                <Moon className="w-8 h-8 text-[#FBBF24]/80 opacity-80" />
              </motion.div>
            </div>

            <div className="space-y-1 max-w-sm px-4">
              <h4
                className="text-lg sm:text-xl font-normal text-[#D4D4D4] tracking-wide"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                {activeStory.title}
              </h4>
              <p className="text-xs text-[#737373] font-mono">
                {isLullabyPhase
                  ? 'Acoustic Scripture-Loop Lullaby Phase'
                  : 'Spoken-Word Sleep Narrative'}
              </p>
            </div>
          </div>

          {/* Audio Arc Transition Bar & Hidden Controls */}
          <div
            className={`space-y-4 transition-opacity duration-500 ${
              controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Clean Progress Arc Showing Spoken Story -> Scripture Loop Lullaby */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#737373]">
                <span>{formatTime(playbackSeconds)}</span>
                <span className="text-[#A3A3A3]">
                  {isLullabyPhase ? 'Scripture Lullaby Loop' : 'Spoken Story'}
                </span>
                <span>{formatTime(totalSeconds)}</span>
              </div>

              {/* Multi-phase timeline line */}
              <div className="relative w-full h-1.5 rounded-full bg-[#171717] overflow-hidden flex">
                {/* Spoken portion marker */}
                <div
                  style={{width: `${(storySeconds / totalSeconds) * 100}%`}}
                  className="h-full border-r border-[#404040]"
                />
                <div
                  style={{
                    width: `${(playbackSeconds / totalSeconds) * 100}%`,
                  }}
                  className="absolute left-0 top-0 h-full bg-[#D97706] rounded-full transition-all duration-300"
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#525252] font-mono">
                <span>00:00 Story Starts</span>
                <span className="text-[#D97706]">
                  {formatTime(storySeconds)} Lullaby Loop Transition
                </span>
                <span>{formatTime(totalSeconds)} Drift to Sleep</span>
              </div>
            </div>

            {/* Play/Pause & Bookmark Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying((prev) => !prev);
                    handleScreenTap();
                  }}
                  className="p-2.5 rounded-full bg-[#171717] hover:bg-[#262626] border border-[#262626] text-[#D4D4D4] cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSaveAudioBookmark}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#171717] hover:bg-[#262626] border border-[#262626] text-xs text-[#D4D4D4] cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>{justBookmarked ? 'Bookmark Saved!' : 'Bookmark Timestamp'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentScreen(4);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D97706]/20 hover:bg-[#D97706]/35 border border-[#D97706]/60 text-xs font-semibold text-[#FDE68A] cursor-pointer"
              >
                <span>Preview Morning Bridge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-center text-[11px] text-[#525252] pt-1">
              Tap anywhere on screen to toggle ultra-low brightness controls (auto-fades in 3s)
            </p>
          </div>
        </motion.div>
      )}

      {/* ========================================================= */}
      {/* SCREEN 4: THE MORNING BRIDGE (PARENT NOTIFICATION & WIDGET) */}
      {/* ========================================================= */}
      {currentScreen === 4 && (
        <motion.div
          key="screen-4"
          initial={{opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -12}}
          transition={{duration: 0.25}}
          className="p-6 sm:p-10 lg:p-12 space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DEC9]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D97706]">
                <Sunrise className="w-4 h-4 text-[#D97706]" />
                <span>The Morning Bridge (Relational Family Discipleship)</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-normal text-[#1A1A1A]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Connecting Nighttime Rest with Morning Conversation
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setCurrentScreen(1)}
              className="inline-flex items-center gap-1.5 text-xs text-[#57534E] hover:text-[#1A1A1A] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Bedtime Hub</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Simulated Parent Lock-Screen Notification / Widget */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-semibold text-[#57534E] uppercase tracking-wider font-mono">
                Simulated Parent Morning Lock-Screen Widget
              </div>

              {/* iOS / Android Minimalist Lock-screen notification card */}
              <div className="rounded-2xl bg-[#1C1917] text-[#F9F6F0] p-5 sm:p-6 border border-[#36312E] shadow-xl space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-[#A8A29E] pb-3 border-b border-[#292524]">
                  <div className="flex items-center gap-2">
                    <Feather className="w-3.5 h-3.5 text-[#D97706]" />
                    <span className="font-semibold text-[#FAF7F2]">GROW IN THE WORD</span>
                    <span>· Morning Bridge</span>
                  </div>
                  <span className="font-mono text-[10px]">7:15 AM</span>
                </div>

                {/* The Recap */}
                <div className="space-y-1">
                  <div className="text-xs text-[#FBBF24] font-medium">Night Recap</div>
                  <p
                    className="text-base text-[#FAF7F2] font-normal leading-relaxed"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    “{activeStory.morningPrompt.recap.replace('[Child’s Name]', childName)}”
                  </p>
                </div>

                {/* The Breakfast Conversation Starter */}
                <div className="p-3.5 rounded-xl bg-[#24211E] border border-[#36312E] space-y-1.5">
                  <div className="text-[11px] font-mono text-[#D97706] uppercase tracking-wider font-semibold">
                    The Breakfast Conversation Starter
                  </div>
                  <p className="text-xs text-[#E7E5E4] leading-relaxed">
                    {activeStory.morningPrompt.conversationStarter}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-[#A8A29E] pt-1">
                  <span>Zero pop quizzes · Relational discipleship</span>
                  <button
                    type="button"
                    onClick={handleCopyMorningPrompt}
                    className="inline-flex items-center gap-1.5 text-xs text-[#FBBF24] hover:underline cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedPrompt ? 'Copied Prompt!' : 'Copy to Clipboard'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Why This Matters & Discipleship Guide */}
            <div className="lg:col-span-6 space-y-5">
              <div className="rounded-2xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 space-y-4">
                <h3
                  className="text-xl font-normal text-[#1A1A1A]"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  Why The Morning Bridge Matters
                </h3>
                <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                  Instead of religion feeling like an isolated chore, the Morning Bridge
                  connects the subconscious calm of nighttime listening into loving breakfast
                  conversations. It equips parents with low-pressure questions that invite wonder
                  rather than performance.
                </p>

                <div className="space-y-2 pt-2 border-t border-[#E5DEC9]">
                  <div className="text-xs font-semibold text-[#1A1A1A]">
                    Gentle Wonder Prompt for Today:
                  </div>
                  <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] text-xs text-[#57534E] italic">
                    “{activeStory.morningPrompt.scriptureQuestion}”
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onEngageContent?.(15, 'Shared Morning Bridge Discipleship Reflection');
                      setCurrentScreen(1);
                    }}
                    className="w-full py-2.5 rounded-full bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] text-xs font-semibold transition-colors cursor-pointer text-center"
                  >
                    Done · Return to Bedtime Shepherd Hub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
