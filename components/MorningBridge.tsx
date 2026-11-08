'use client';

import React, {useState} from 'react';
import {motion} from 'motion/react';
import {
  Sunrise,
  Feather,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  BookOpen,
  Heart,
  Share2,
  Volume2,
  Calendar,
} from 'lucide-react';

export interface MorningBridgeStorySummary {
  id: string;
  storyTitle: string;
  scriptureReference: string;
  nightRecap: string;
  breakfastPrompt: string;
  gentleWonderQuestion: string;
  thematicTakeaway: string;
}

export const MORNING_BRIDGE_STORIES: MorningBridgeStorySummary[] = [
  {
    id: 'lake',
    storyTitle: 'The Story of the Quiet Lake',
    scriptureReference: 'Luke 8:22–25',
    nightRecap:
      'Last night, [Child’s Name] fell asleep listening to the story of the quiet lake and Jesus whispering peace to the stormy waves.',
    breakfastPrompt:
      '“Hey, do you remember who brought peace to the big waves last night when the wind was loud?”',
    gentleWonderQuestion:
      '“What do you think the water felt like once it became as smooth as warm glass?”',
    thematicTakeaway:
      'Physical safety and divine presence. Fear is greeted with peaceful authority, not scolding.',
  },
  {
    id: 'shepherd',
    storyTitle: 'The Shepherd in the Dark Valley',
    scriptureReference: 'Psalm 23:1–4',
    nightRecap:
      'Last night, [Child’s Name] fell asleep listening to the story of the gentle shepherd guarding the little sheep through the shadowy hills.',
    breakfastPrompt:
      '“Do you remember who walks right beside the little sheep even when the shadows get long?”',
    gentleWonderQuestion:
      '“What made the little sheep feel safe enough to close its eyes?”',
    thematicTakeaway:
      'Relational proximity. You do not have to be brave all by yourself.',
  },
  {
    id: 'starlight',
    storyTitle: 'The First Evening & Quiet Starlight',
    scriptureReference: 'Genesis 1:3–5',
    nightRecap:
      'Last night, [Child’s Name] fell asleep listening to the ancient poetry of God placing constellations in the evening sky and resting.',
    breakfastPrompt:
      '“Did you know that the quiet night was made on purpose so the whole world could rest?”',
    gentleWonderQuestion:
      '“Which star outside your window do you think was made first?”',
    thematicTakeaway:
      'Creation wonder. Darkness is not scary—it is God’s gift of rest to tired bodies.',
  },
  {
    id: 'sparrows',
    storyTitle: 'The Sparrows in the Morning Olive Grove',
    scriptureReference: 'Matthew 6:25–26',
    nightRecap:
      'Last night, [Child’s Name] fell asleep listening to the trusting morning sparrows who never worry about tomorrow’s crumbs.',
    breakfastPrompt:
      '“Did you hear the little birds outside this morning? Do you think they worry about breakfast?”',
    gentleWonderQuestion:
      '“Who remembers to feed every little bird in the trees?”',
    thematicTakeaway:
      'Gentle providence. Trusting goodness day by day without anxiety.',
  },
];

interface MorningBridgeProps {
  childName?: string;
  parentName?: string;
  onLogBreakfastReflection?: (points: number, label: string) => void;
  onReturnToShepherd?: () => void;
}

export default function MorningBridge({
  childName = 'Noah',
  parentName = 'Sarah',
  onLogBreakfastReflection,
  onReturnToShepherd,
}: MorningBridgeProps) {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [loggedToday, setLoggedToday] = useState(false);

  const activeStory =
    MORNING_BRIDGE_STORIES[selectedStoryIndex % MORNING_BRIDGE_STORIES.length];

  const formattedRecap = activeStory.nightRecap.replace(
    /\[Child’s Name\]/g,
    childName
  );

  const handleCopyPrompt = () => {
    const textToCopy = `Grow In The Word · Morning Bridge for ${childName}:\n\n${formattedRecap}\n\nBreakfast Conversation Starter:\n${activeStory.breakfastPrompt}\n\nGentle Wonder Question:\n${activeStory.gentleWonderQuestion}\n— Grow In The Word (Phase 2)`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2200);
    }
  };

  const handleLogReflection = () => {
    setLoggedToday(true);
    onLogBreakfastReflection?.(
      15,
      `Shared Morning Bridge conversation: "${activeStory.storyTitle}"`
    );
  };

  return (
    <div className="w-full rounded-2xl bg-[#F9F6F0] border border-[#E5DEC9] p-6 sm:p-8 lg:p-10 space-y-8 shadow-sm">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DEC9]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D97706]">
            <Sunrise className="w-4 h-4 text-[#D97706]" />
            <span>Grow In The Word · Phase 2 (Screen 4)</span>
            <span aria-hidden="true">·</span>
            <span>The Morning Bridge</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-normal text-[#1A1A1A]"
            style={{fontFamily: 'var(--font-display), serif'}}
          >
            Morning Bridge: From Sleep to Family Connection
          </h2>
          <p className="text-xs sm:text-sm text-[#57534E] max-w-xl">
            A post-sleep interface for parents, transforming subconscious bedtime peace
            into loving breakfast discipleship—with zero pop-quiz pressure.
          </p>
        </div>

        {/* Narrative Selector */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedStoryIndex((prev) => prev + 1)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F2ECE1] hover:bg-[#E5DEC9] text-xs font-semibold text-[#1A1A1A] transition-colors cursor-pointer"
            title="Cycle to another bedtime story summary"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#D97706]" />
            <span>
              Next Story ({((selectedStoryIndex % MORNING_BRIDGE_STORIES.length) + 1)}/
              {MORNING_BRIDGE_STORIES.length})
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Simulated Parent Lock-Screen Notification Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-[#57534E] uppercase tracking-wider font-mono">
            <span>Parent Lock-Screen Notification</span>
            <span className="text-[#A8A29E]">Today at 7:15 AM</span>
          </div>

          <div className="rounded-2xl bg-[#1C1917] text-[#FAF7F2] p-6 border border-[#36312E] shadow-xl space-y-4 relative overflow-hidden">
            {/* Top Brand Tag */}
            <div className="flex items-center justify-between text-xs text-[#A8A29E] pb-3 border-b border-[#292524]">
              <div className="flex items-center gap-2">
                <Feather className="w-3.5 h-3.5 text-[#D97706]" />
                <span className="font-semibold text-[#FAF7F2]">GROW IN THE WORD</span>
                <span>· Bedtime Shepherd</span>
              </div>
              <span className="font-mono text-[11px] text-[#FBBF24]">
                {activeStory.scriptureReference}
              </span>
            </div>

            {/* The Recap */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-[#D97706] uppercase tracking-wider font-semibold">
                Night Recap
              </span>
              <p
                className="text-base sm:text-lg font-normal text-[#FAF7F2] leading-relaxed"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                “{formattedRecap}”
              </p>
            </div>

            {/* The Breakfast Conversation Starter */}
            <div className="p-4 rounded-xl bg-[#24211E] border border-[#36312E] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#D97706] uppercase tracking-wider font-semibold">
                  The Breakfast Conversation Starter
                </span>
                <span className="text-[10px] text-[#A8A29E]">Low Pressure</span>
              </div>
              <p className="text-sm text-[#FDE68A] font-medium leading-relaxed">
                {activeStory.breakfastPrompt}
              </p>
            </div>

            {/* Gentle Wonder Question */}
            <div className="p-3 rounded-lg bg-[#141210] border border-[#292524] space-y-1 text-xs">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#A8A29E]">
                Follow-up Wonder Question
              </span>
              <p className="text-xs text-[#E7E5E4] italic">
                {activeStory.gentleWonderQuestion}
              </p>
            </div>

            {/* Action Row */}
            <div className="flex items-center justify-between pt-2 text-xs">
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-1.5 text-xs text-[#FBBF24] hover:underline cursor-pointer"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#86EFAC]" />
                    <span className="text-[#86EFAC]">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Copy to Family Chat</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleLogReflection}
                disabled={loggedToday}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  loggedToday
                    ? 'bg-[#065F46] text-[#A7F3D0]'
                    : 'bg-[#D97706] hover:bg-[#F59E0B] text-[#1A1A1A]'
                }`}
              >
                {loggedToday ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Logged (+15 pts)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Log Breakfast Chat (+15)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Why This Matters & Discipleship Guide */}
        <div className="lg:col-span-6 space-y-5">
          <div className="rounded-2xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 sm:p-7 space-y-4">
            <h3
              className="text-xl font-normal text-[#1A1A1A]"
              style={{fontFamily: 'var(--font-display), serif'}}
            >
              Why The Morning Bridge Matters
            </h3>
            <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
              Discipleship often feels strained when reduced to quizzes or compulsory devotions.
              The Morning Bridge uses the psychological power of narrative recall to turn breakfast
              table conversations into natural moments of relational warmth.
            </p>

            <div className="space-y-2 pt-2 border-t border-[#E5DEC9]">
              <div className="text-xs font-semibold text-[#1A1A1A]">
                Thematic Core: {activeStory.thematicTakeaway}
              </div>
              <p className="text-xs text-[#57534E] leading-relaxed">
                By asking questions about how characters felt or what they saw, parents invite
                their children to explore without the fear of giving a &quot;wrong&quot; answer.
              </p>
            </div>

            {onReturnToShepherd && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onReturnToShepherd}
                  className="w-full py-2.5 rounded-full bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] text-xs font-semibold transition-colors cursor-pointer text-center"
                >
                  Return to Bedtime Shepherd Hub
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
