'use client';

import React, {useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  Moon,
  Play,
  Check,
  ChevronRight,
  ArrowLeft,
  Compass,
  Bookmark,
  Sparkles,
  Sunrise,
  Shield,
  Heart,
  Droplets,
  Volume2,
} from 'lucide-react';
import ZeroGlowPlayer, {ZeroGlowStoryData} from '@/components/ZeroGlowPlayer';
import MorningBridge from '@/components/MorningBridge';

export interface BedtimeShepherdNarrative {
  id: string;
  title: string;
  subtitle: string;
  theme: 'safety' | 'waters' | 'creation' | 'morning';
  themeLabel: string;
  storyDurationMin: number;
  loopDurationMin: number;
  scriptureReference: string;
  description: string;
  quoteSnippet: string;
}

export const BEDTIME_SHEPHERD_CATALOG: BedtimeShepherdNarrative[] = [
  {
    id: 'shepherd-valley',
    title: 'The Shepherd in the Dark Valley',
    subtitle: 'Psalm 23 · Deep Assurance & Safe Shelter',
    theme: 'safety',
    themeLabel: 'Safety & Shelter',
    storyDurationMin: 6,
    loopDurationMin: 10,
    scriptureReference: 'Psalm 23:1–4',
    description:
      'A gentle recounting of the shepherd guarding the sheep through the shadowy hills, keeping faithful watch while night winds settle.',
    quoteSnippet:
      '“Even when the valley turns purple and shadowy, the Shepherd stays right beside you. You do not have to be brave all by yourself.”',
  },
  {
    id: 'quiet-lake',
    title: 'The Story of the Quiet Lake',
    subtitle: 'Luke 8:22–25 · Calming Storms & Restful Breath',
    theme: 'waters',
    themeLabel: 'Quiet Waters',
    storyDurationMin: 7,
    loopDurationMin: 12,
    scriptureReference: 'Luke 8:24',
    description:
      'The rhythmic rocking of the wooden fishing boat, the sudden stormy squall, and Jesus speaking three quiet words that soothe the sea into warm glass.',
    quoteSnippet:
      '“Jesus stood up in the dark boat and whispered to the howling waves the way a parent whispers to a restless child: Peace, be still.”',
  },
  {
    id: 'starlight-rest',
    title: 'The First Evening & Quiet Starlight',
    subtitle: 'Genesis 1 · Creation & Gentle Slumber',
    theme: 'creation',
    themeLabel: 'Creation & Wonder',
    storyDurationMin: 8,
    loopDurationMin: 15,
    scriptureReference: 'Genesis 1:3–5',
    description:
      'The ancient poetry of God placing constellations like lanterns across the evening sky, declaring darkness good, and gifting sleep to tired bodies.',
    quoteSnippet:
      '“And God looked upon the velvety evening, lit by soft ancient stars, and smiled: It is very good. Sleep now, little creation.”',
  },
  {
    id: 'morning-sparrows',
    title: 'The Sparrows in the Morning Olive Grove',
    subtitle: 'Matthew 6 · Unhurried Provision & Sunrise Trust',
    theme: 'morning',
    themeLabel: 'Morning Light',
    storyDurationMin: 5,
    loopDurationMin: 10,
    scriptureReference: 'Matthew 6:25–26',
    description:
      'The sparrows resting peacefully through the cool night without worrying about tomorrow’s crumbs, trusting the morning will bring bread.',
    quoteSnippet:
      '“Not a single tiny sparrow falls from the olive branch without the Father knowing. How much more does He watch over your sleep tonight?”',
  },
];

interface BedtimeShepherdProps {
  initialParentName?: string;
  initialChildName?: string;
  onEngageContent?: (points: number, label: string) => void;
}

export default function BedtimeShepherd({
  initialParentName = 'Sarah',
  initialChildName = 'Noah',
  onEngageContent,
}: BedtimeShepherdProps) {
  const [activeScreen, setActiveScreen] = useState<'hub' | 'library' | 'player' | 'morning'>('hub');
  const [parentName, setParentName] = useState(initialParentName);
  const [childName, setChildName] = useState(initialChildName);
  const [streakCount] = useState(5);
  const [selectedStoryId, setSelectedStoryId] = useState<string>('shepherd-valley');
  const [activeFilter, setActiveFilter] = useState<'all' | 'safety' | 'waters' | 'creation' | 'morning'>('all');

  const activeStory =
    BEDTIME_SHEPHERD_CATALOG.find((s) => s.id === selectedStoryId) ||
    BEDTIME_SHEPHERD_CATALOG[0];

  const filteredStories = BEDTIME_SHEPHERD_CATALOG.filter((s) => {
    if (activeFilter === 'all') return true;
    return s.theme === activeFilter;
  });

  const handleStartRoutine = (story?: BedtimeShepherdNarrative) => {
    if (story) {
      setSelectedStoryId(story.id);
    }
    setActiveScreen('player');
    onEngageContent?.(20, `Began Bedtime Routine: ${story?.title || activeStory.title}`);
  };

  return (
    <div className="w-full rounded-2xl bg-[#F9F6F0] border border-[#E5DEC9] overflow-hidden shadow-sm relative transition-colors">
      {/* View Mode Header */}
      <div className="px-6 py-3 bg-[#F2ECE1] border-b border-[#E5DEC9] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold uppercase text-[#D97706] tracking-wider">
            GROW IN THE WORD
          </span>
          <span aria-hidden="true" className="text-[#A8A29E]">
            ·
          </span>
          <span className="text-[#57534E] font-medium">
            Phase 2: Bedtime Shepherd (Ages 3–7)
          </span>
        </div>

        {/* View Switchers */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF7F2] p-1 rounded-lg border border-[#E5DEC9]">
          <button
            type="button"
            onClick={() => setActiveScreen('hub')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
              activeScreen === 'hub'
                ? 'bg-[#1C1917] text-[#FAF7F2]'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Screen 1: Parent Hub
          </button>
          <button
            type="button"
            onClick={() => setActiveScreen('library')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
              activeScreen === 'library'
                ? 'bg-[#1C1917] text-[#FAF7F2]'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Screen 2: Calm Library
          </button>
          <button
            type="button"
            onClick={() => setActiveScreen('player')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
              activeScreen === 'player'
                ? 'bg-[#1C1917] text-[#FAF7F2]'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <Moon className="w-3 h-3 text-[#D97706]" />
            <span>Screen 3: Zero-Glow Player</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveScreen('morning')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
              activeScreen === 'morning'
                ? 'bg-[#1C1917] text-[#FAF7F2]'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <Sunrise className="w-3 h-3 text-[#D97706]" />
            <span>Screen 4: Morning Bridge</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SCREEN 1: THE TIER 1 PARENT & CHILD HUB (THE ENTRY DASHBOARD) */}
      {/* ========================================================= */}
      {activeScreen === 'hub' && (
        <div className="relative p-6 sm:p-10 lg:p-12 overflow-hidden">
          {/* Soft Organic Amber Gradient Orb */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-[#D97706]/15 via-[#F59E0B]/5 to-transparent blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-7 relative z-10">
            {/* Quick State Indicators */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
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
                Dim the room lights, place your phone on the nightstand, and let ancient
                peaceful rhythms guide {childName} into calm, deep sleep.
              </p>
            </div>

            {/* The Hero Routine Card */}
            <div className="rounded-2xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 sm:p-8 space-y-5 shadow-xs hover:border-[#D97706]/50 transition-colors">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-[#E5DEC9]">
                <span className="font-mono text-[#D97706] font-semibold uppercase tracking-wider">
                  Tonight&apos;s Bedtime Shepherd
                </span>
                <span className="text-[#78716C] font-mono">
                  {activeStory.storyDurationMin} min story + {activeStory.loopDurationMin} min lullaby
                </span>
              </div>

              <div className="space-y-1.5">
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
                  onClick={() => handleStartRoutine(activeStory)}
                  className="px-6 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-[#D97706]/40 hover:border-[#D97706]"
                >
                  <Play className="w-4 h-4 fill-current text-[#D97706]" />
                  <span>Begin Bedtime Routine</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveScreen('library')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97706] hover:underline underline-offset-4 cursor-pointer"
                >
                  <span>Choose Another Narrative from Library</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Household Editor */}
            <div className="flex items-center gap-2 text-xs text-[#78716C]">
              <span>Parent Name:</span>
              <input
                type="text"
                aria-label="Parent name"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-24 px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#E5DEC9] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D97706]"
              />
              <span className="ml-2">Child Name:</span>
              <input
                type="text"
                aria-label="Child name"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-24 px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#E5DEC9] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D97706]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SCREEN 2: THE CALM AUDIO LIBRARY (THE NARRATIVE SELECTION) */}
      {/* ========================================================= */}
      {activeScreen === 'library' && (
        <div className="p-6 sm:p-10 lg:p-12 space-y-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DEC9]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D97706]">
                <span>The Calm Audio Library</span>
                <span aria-hidden="true">·</span>
                <span>Zero Flashing Banners or Algorithmic Distractions</span>
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
              onClick={() => setActiveScreen('hub')}
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
                onClick={() => setActiveFilter(f.id as typeof activeFilter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  activeFilter === f.id
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
                  onClick={() => handleStartRoutine(story)}
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
        </div>
      )}

      {/* ========================================================= */}
      {/* SCREEN 3: ZERO-GLOW PLAYER MODAL / EMBED */}
      {/* ========================================================= */}
      {activeScreen === 'player' && (
        <ZeroGlowPlayer
          story={activeStory}
          isFullScreenOverlay={false}
          onClose={() => setActiveScreen('hub')}
          onOpenMorningBridge={() => setActiveScreen('morning')}
          onSaveBookmark={(sec, label) => {
            onEngageContent?.(10, `Saved Bedtime Audio Bookmark: "${label}"`);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* SCREEN 4: MORNING BRIDGE EMBED */}
      {/* ========================================================= */}
      {activeScreen === 'morning' && (
        <div className="p-4 sm:p-6">
          <MorningBridge
            childName={childName}
            parentName={parentName}
            onLogBreakfastReflection={onEngageContent}
            onReturnToShepherd={() => setActiveScreen('hub')}
          />
        </div>
      )}
    </div>
  );
}
