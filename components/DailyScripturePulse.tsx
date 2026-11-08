'use client';

import React, {useState, useEffect, useMemo} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  Clock,
  RefreshCw,
  Copy,
  Check,
  Feather,
  Compass,
} from 'lucide-react';
import StudyTooltip from './StudyTooltip';

export interface WisdomVerseItem {
  id: string;
  reference: string;
  book: string;
  chapter: number;
  testament: 'Old Testament' | 'New Testament';
  theme: string;
  category: 'Trust & Guidance' | 'Stillness & Rest' | 'Justice & Mercy' | 'Endurance & Hope';
  readTime: string;
  linkedPassageId: string;
  translations: {
    AMP: string;
    NASB: string;
    NLT: string;
  };
  ancientRootWord: {
    original: string;
    transliteration: string;
    meaning: string;
  };
  practicalWisdomReflection: string;
}

export const DAILY_WISDOM_PULSES: WisdomVerseItem[] = [
  {
    id: 'proverbs-3-5',
    reference: 'Proverbs 3:5–6',
    book: 'Proverbs',
    chapter: 3,
    testament: 'Old Testament',
    theme: 'Wholehearted Trust & Straightened Paths',
    category: 'Trust & Guidance',
    readTime: '1 min reflection',
    linkedPassageId: 'isaiah-40',
    translations: {
      AMP: 'Trust in and rely confidently on the LORD with all your heart and do not rely on your own insight or understanding. In all your ways know and acknowledge and recognize Him, and He will make your paths straight and smooth.',
      NASB: 'Trust in the LORD with all your heart and do not lean on your own understanding. In all your ways acknowledge Him, and He will make your paths straight.',
      NLT: 'Trust in the LORD with all your heart; do not depend on your own understanding. Seek his will in all you do, and he will show you which path to take.',
    },
    ancientRootWord: {
      original: 'בָּטַח',
      transliteration: 'Bâtach',
      meaning: 'To stretch oneself face down on the earth in complete unreserved security, without anxious self-defense.',
    },
    practicalWisdomReflection:
      'Ancient Hebrew wisdom distinguishes between having intellect and leaning our whole body weight upon our own limited perspective. True wisdom is not shutting off your mind; it is bringing your intellect to the Creator who sees around the next bend.',
  },
  {
    id: 'psalm-46-10',
    reference: 'Psalm 46:10',
    book: 'Psalms',
    chapter: 46,
    testament: 'Old Testament',
    theme: 'Unhurried Stillness in the Midst of Tumult',
    category: 'Stillness & Rest',
    readTime: '1 min reflection',
    linkedPassageId: 'psalm-23',
    translations: {
      AMP: '“Be still and know (recognize, understand) that I am God. I will be exalted among the nations! I will be exalted in the earth.”',
      NASB: '“Cease striving and know that I am God; I will be exalted among the nations, I will be exalted in the earth.”',
      NLT: '“Be still, and know that I am God! I will be honored by every nation. I will be honored throughout the world.”',
    },
    ancientRootWord: {
      original: 'רָפָה',
      transliteration: 'Râphâh',
      meaning: 'Literally “let your hands drop limp” or “release your white-knuckled grip on the steering wheel.”',
    },
    practicalWisdomReflection:
      'NASB captures the active ancient verb best: “Cease striving.” In times of sensory overload, spiritual growth begins not with doing more, but by consciously unclenching your fists.',
  },
  {
    id: 'isaiah-40-31',
    reference: 'Isaiah 40:29 & 31',
    book: 'Isaiah',
    chapter: 40,
    testament: 'Old Testament',
    theme: 'Renewed Strength & Braided Endurance',
    category: 'Endurance & Hope',
    readTime: '1 min reflection',
    linkedPassageId: 'isaiah-40',
    translations: {
      AMP: 'He gives strength to the weary, and to him who has no might He increases power. ... But those who wait for the LORD [who expect, look for, and hope in Him] will gain new strength and renew their power; they will lift up their wings like eagles; they will run and not become weary, they will walk and not grow tired.',
      NASB: 'He gives strength to the weary, and to him who lacks might He increases power. ... Yet those who wait for the LORD will gain new strength; they will mount up with wings like eagles, they will run and not get tired, they will walk and not become weary.',
      NLT: 'He gives power to the weak and strength to the powerless. ... But those who trust in the LORD will find new strength. They will soar high on wings like eagles. They will run and not grow weary. They will walk and not faint.',
    },
    ancientRootWord: {
      original: 'קָוָה',
      transliteration: 'Qâvâh',
      meaning: 'To twist or braid strands of flax together until they form an unbreakable tension cable under weight.',
    },
    practicalWisdomReflection:
      'Biblical waiting is not passive boredom; it is active braiding. Acknowledging that you are out of stamina is not spiritual failure—it is the exact threshold where divine strength exchanges worn-out fatigue.',
  },
  {
    id: 'micah-6-8',
    reference: 'Micah 6:8',
    book: 'Micah',
    chapter: 6,
    testament: 'Old Testament',
    theme: 'The Triad: Justice, Lovingkindness & Humility',
    category: 'Justice & Mercy',
    readTime: '1 min reflection',
    linkedPassageId: 'micah-6',
    translations: {
      AMP: 'He has told you, O man, what is good; and what does the LORD require of you except to be just, and to love [and to diligently practice] kindness (compassion), and to walk humbly with your God?',
      NASB: 'He has told you, O man, what is good; and what does the LORD require of you but to do justice, to love kindness, and to walk humbly with your God?',
      NLT: 'No, O people, the LORD has told you what is good, and this is what he requires of you: to do what is right, to love mercy, and to walk humbly with your God.',
    },
    ancientRootWord: {
      original: 'חֶסֶד',
      transliteration: 'Chesed',
      meaning: 'Stubborn, covenantal, action-oriented loyalty that refuses to abandon the vulnerable even when it costs.',
    },
    practicalWisdomReflection:
      'True religion according to 8th-century prophets was never about ceremonial luxury or performance. It was about measurable everyday fairness (Mishpat) and tenacious kindness (Chesed).',
  },
  {
    id: 'john-1-5',
    reference: 'John 1:4–5',
    book: 'John',
    chapter: 1,
    testament: 'New Testament',
    theme: 'Unconquered Light in the Deepest Night',
    category: 'Trust & Guidance',
    readTime: '1 min reflection',
    linkedPassageId: 'john-1',
    translations: {
      AMP: 'In Him was life [and the power to bestow life], and the life was the Light of men. The Light shines on in the darkness, and the darkness did not understand it or overpower it [nor did it absorb or extinguish it].',
      NASB: 'In Him was life, and the life was the Light of men. The Light shines in the darkness, and the darkness did not comprehend it.',
      NLT: 'The Word gave life to everything that was created, and his life brought light to everyone. The light shines in the darkness, and the darkness can never extinguish it.',
    },
    ancientRootWord: {
      original: 'κατέλαβεν',
      transliteration: 'Katelaben',
      meaning: 'To seize or grasp—both intellectually (“comprehend”) and physically with hostile intent (“extinguish or conquer”).',
    },
    practicalWisdomReflection:
      'No matter how thick shadow or confusion seems, darkness possesses zero kinetic power to blow out light. Even the smallest candle flame commands the whole room.',
  },
];

export interface DailyScripturePulseProps {
  onEngageContent?: (points: number, label: string) => void;
  isNightSanctuary?: boolean;
  onOpenPassageInStudio?: (passageId: string) => void;
}

export default function DailyScripturePulse({
  onEngageContent,
  isNightSanctuary = false,
  onOpenPassageInStudio,
}: DailyScripturePulseProps) {
  const [pulseIndex, setPulseIndex] = useState<number>(0);

  // Synchronize with day of year after initial mount to eliminate SSR hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => {
      const dayOfYear = Math.floor(
        (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      setPulseIndex(dayOfYear % DAILY_WISDOM_PULSES.length);
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  const [activeVersion, setActiveVersion] = useState<'AMP' | 'NASB' | 'NLT'>('AMP');
  const [copied, setCopied] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  const currentVerse = useMemo(
    () => DAILY_WISDOM_PULSES[pulseIndex] || DAILY_WISDOM_PULSES[0],
    [pulseIndex]
  );

  const handleNextPulse = () => {
    setIsRotating(true);
    setPulseIndex((prev) => (prev + 1) % DAILY_WISDOM_PULSES.length);
    setCopied(false);
    onEngageContent?.(5, 'Rotated Daily Scripture Pulse Wisdom');
    setTimeout(() => setIsRotating(false), 300);
  };

  const handleCopyVerse = () => {
    const textToCopy = `“${currentVerse.translations[activeVersion]}” — ${currentVerse.reference} (${activeVersion})\nGrow in the Word · Daily Scripture Pulse`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      onEngageContent?.(5, `Copied Daily Scripture Pulse (${currentVerse.reference})`);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  const handleDeepDiveStudio = () => {
    onEngageContent?.(10, `Deep Dived into Studio from Daily Pulse: ${currentVerse.reference}`);
    if (onOpenPassageInStudio) {
      onOpenPassageInStudio(currentVerse.linkedPassageId);
    }
    const studioEl = document.getElementById('bible-study-studio');
    if (studioEl) {
      studioEl.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <section
      id="daily-scripture-pulse"
      aria-label="Daily Scripture Pulse"
      suppressHydrationWarning
      className="w-full max-w-full min-w-0 py-8 sm:py-12 px-4 sm:px-6"
    >
      <div className="max-w-[1280px] mx-auto min-w-0">
        <div
          className={`relative rounded-3xl border overflow-hidden p-6 sm:p-8 lg:p-10 shadow-sm transition-colors duration-500 ${
            isNightSanctuary
              ? 'bg-[#1C1917] border-[#292524] text-[#FAF7F2]'
              : 'bg-[#F2ECE1]/80 border-[#E5DEC9] text-[#1A1A1A]'
          }`}
        >
          {/* Subtle warm amber aura in top right corner */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5DEC9]/80 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D97706] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D97706]" />
              </span>

              <StudyTooltip
                category="DAILY PULSE"
                label="Daily Scripture Pulse"
                description="A fresh, unhurried wisdom anchor updated daily to center your mind before diving into parallel translation comparisons."
                position="bottom"
                align="start"
              >
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#92400E] font-semibold cursor-help">
                  <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Daily Scripture Pulse</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#57534E]">{currentVerse.category}</span>
                </div>
              </StudyTooltip>
            </div>

            {/* Read Time & Refresh Controls */}
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E5DEC9] text-xs font-mono text-[#57534E]">
                <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{currentVerse.readTime}</span>
              </span>

              {/* Translation Selector Tabs */}
              <div
                role="group"
                aria-label="Daily Verse Translation"
                className="inline-flex items-center p-0.5 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9]"
              >
                {(['AMP', 'NASB', 'NLT'] as const).map((ver) => (
                  <button
                    key={ver}
                    type="button"
                    onClick={() => setActiveVersion(ver)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      activeVersion === ver
                        ? 'bg-[#1A1A1A] text-[#FAF7F2]'
                        : 'text-[#57534E] hover:text-[#1A1A1A]'
                    }`}
                  >
                    {ver}
                  </button>
                ))}
              </div>

              {/* Refresh / Next Pulse Button */}
              <button
                type="button"
                onClick={handleNextPulse}
                title="Explore another wisdom pulse"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#E5DEC9] border border-[#E5DEC9] text-xs font-semibold text-[#1A1A1A] transition-colors cursor-pointer"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-[#D97706] transition-transform ${
                    isRotating ? 'rotate-180' : ''
                  }`}
                />
                <span className="hidden sm:inline">Next Pulse</span>
              </button>
            </div>
          </div>

          {/* Main Verse Presentation */}
          <div className="py-6 sm:py-8 space-y-6 min-w-0">
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D97706]">
                <Compass className="w-3.5 h-3.5 text-[#D97706]" />
                <span>
                  {currentVerse.book} · Chapter {currentVerse.chapter} ({currentVerse.testament})
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={`${currentVerse.id}-${activeVersion}`}
                  initial={{opacity: 0, y: 6}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -6}}
                  transition={{duration: 0.2}}
                  className="text-xl sm:text-2xl lg:text-3xl font-normal leading-relaxed text-[#1A1A1A] italic"
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    textWrap: 'pretty',
                  }}
                >
                  “{currentVerse.translations[activeVersion]}”
                </motion.blockquote>
              </AnimatePresence>

              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-sm font-bold tracking-wide text-[#92400E]">
                  — {currentVerse.reference} ({activeVersion})
                </span>

                <button
                  type="button"
                  onClick={handleCopyVerse}
                  className="inline-flex items-center gap-1.5 text-xs text-[#57534E] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#166534]" />
                      <span className="text-[#166534] font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Verse</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Ancient Root Insight & Practical Wisdom Callout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 border-t border-[#E5DEC9]/80 min-w-0">
              {/* Left 4 Cols: Ancient Root Insight */}
              <div className="md:col-span-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-1.5 min-w-0">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#92400E] font-semibold uppercase">
                  <span>Ancient Root Insight</span>
                  <span className="font-serif text-sm text-[#1A1A1A]">
                    {currentVerse.ancientRootWord.original}
                  </span>
                </div>
                <div className="text-xs font-semibold text-[#1A1A1A]">
                  {currentVerse.ancientRootWord.transliteration}
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  {currentVerse.ancientRootWord.meaning}
                </p>
              </div>

              {/* Right 8 Cols: Practical Reflection + Deep Dive CTA Button */}
              <div className="md:col-span-8 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DEC9] flex flex-col justify-between gap-4 min-w-0">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#4A5D4E] font-semibold uppercase">
                    <Feather className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>The Unhurried Mindset</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                    {currentVerse.practicalWisdomReflection}
                  </p>
                </div>

                {/* Deep Dive Action Button leading directly to BibleStudyReadingStudio */}
                <div className="pt-2 border-t border-[#E5DEC9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
                  <div className="text-xs font-mono text-[#78716C]">
                    Study full chapter with Hebrew/Greek concordance &amp; 5 translations:
                  </div>

                  <StudyTooltip
                    category="STUDIO LINK"
                    label="Deep Dive in Reading Studio"
                    description="Opens this scripture's corresponding passage in the Bible Study & Reading Studio for synchronized parallel comparison."
                    position="top"
                    align="end"
                  >
                    <button
                      type="button"
                      onClick={handleDeepDiveStudio}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A1A1A] text-[#FAF7F2] hover:bg-[#292524] font-semibold text-xs transition-all cursor-pointer shadow-md shrink-0 self-start sm:self-auto"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Deep Dive in Bible Study Studio</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
                    </button>
                  </StudyTooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
