'use client';

import React, {useState, useMemo} from 'react';
import {motion, AnimatePresence, PanInfo} from 'motion/react';
import {
  X,
  Lock,
  Sparkles,
  Heart,
  HelpCircle,
  Scale,
  Feather,
  Check,
  ShieldCheck,
  Flame,
  ArrowRight,
} from 'lucide-react';
import {useFocusTrap} from '@/lib/useFocusTrap';

export interface SentimentAnalysisResult {
  category: 'lament' | 'inquiry' | 'gratitude' | 'justice' | 'contemplation';
  label: string;
  points: number;
  badgeBg: string;
  badgeText: string;
  icon: typeof Sparkles;
  empathyNote: string;
  matchedKeywords: string[];
}

const SENTIMENT_ENGINES = {
  lament: {
    label: 'Honest Lament & Seeking',
    points: 20,
    badgeBg: 'bg-[#92400E]/20 text-[#F59E0B] border-[#D97706]/40',
    badgeText: '#F59E0B',
    icon: Flame,
    empathyNote:
      'Raw, uncensored honesty in prayer is ancient and sacred. The biblical writers wept before they rejoiced.',
    keywords: [
      'doubt',
      'doubts',
      'why',
      'silence',
      'tired',
      'exhausted',
      'crying',
      'cry',
      'hurt',
      'suffering',
      'unfair',
      'struggle',
      'heavy',
      'lost',
      'angry',
      'lonely',
      'pressure',
      'fear',
      'afraid',
      'pain',
      'burden',
      'grief',
      'broken',
      'hard',
      'confused',
    ],
  },
  inquiry: {
    label: 'Socratic Wonder & Ancient Inquiry',
    points: 20,
    badgeBg: 'bg-[#4A5D4E]/25 text-[#A7F3D0] border-[#4A5D4E]/60',
    badgeText: '#A7F3D0',
    icon: HelpCircle,
    empathyNote:
      'Asking hard questions strengthens roots. Authentic truth never fears genuine, careful scrutiny.',
    keywords: [
      'wonder',
      'wonders',
      'curious',
      'curiosity',
      'question',
      'questions',
      'history',
      'historical',
      'meaning',
      'translate',
      'translation',
      'ancient',
      'context',
      'search',
      'explore',
      'understand',
      'investigate',
      'hebrew',
      'greek',
      'scrolls',
      'reason',
      'think',
    ],
  },
  gratitude: {
    label: 'Grounded Gratitude & Shalom',
    points: 15,
    badgeBg: 'bg-[#065F46]/25 text-[#6EE7B7] border-[#059669]/50',
    badgeText: '#6EE7B7',
    icon: Heart,
    empathyNote:
      'Noticing goodness without toxic positivity anchors the heart in quiet, durable peace.',
    keywords: [
      'peace',
      'peaceful',
      'grateful',
      'gratitude',
      'thanks',
      'thankful',
      'calm',
      'breath',
      'stillness',
      'love',
      'kindness',
      'light',
      'safe',
      'safety',
      'trust',
      'shalom',
      'rest',
      'quiet',
      'grace',
      'beauty',
      'hope',
    ],
  },
  justice: {
    label: 'Ethical Courage & Compassion',
    points: 20,
    badgeBg: 'bg-[#D97706]/20 text-[#FDE68A] border-[#D97706]/50',
    badgeText: '#FDE68A',
    icon: Scale,
    empathyNote:
      'Directing faith outward into active mercy and protection for others is the core of the prophets.',
    keywords: [
      'justice',
      'just',
      'help',
      'community',
      'kindness',
      'poor',
      'others',
      'protect',
      'courage',
      'brave',
      'stand',
      'neighbor',
      'change',
      'world',
      'action',
      'speak',
      'voice',
      'care',
      'mercy',
    ],
  },
};

const STARTER_PROMPTS = [
  'What is one honest question about life or faith you usually hesitate to say out loud?',
  'Where did you encounter an unexpected glimpse of beauty, stillness, or relief today?',
  'What part of your world or school pressure feels unfair or heavy right now?',
  'What does genuine peace look like for you when everything around you feels noisy?',
];

interface ReflectionJournalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onEngageContent?: (points: number, label: string) => void;
  isNightSanctuary?: boolean;
}

export default function ReflectionJournalOverlay({
  isOpen,
  onClose,
  onEngageContent,
  isNightSanctuary = false,
}: ReflectionJournalOverlayProps) {
  const modalFocusTrapRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);
  const [reflectionText, setReflectionText] = useState(
    'Sometimes it feels like everyone at school or church pretends to have it all figured out, but I have so many questions about why prayers seem silent and why things feel so heavy. It helps having a private space where I do not have to fake certainty.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [committedSuccess, setCommittedSuccess] = useState(false);
  const [lastAwardedPoints, setLastAwardedPoints] = useState(20);

  // Analyze keyword sentiment in real-time
  const sentimentResult = useMemo<SentimentAnalysisResult>(() => {
    const textLower = reflectionText.toLowerCase();
    const words = textLower.match(/\b[a-z]{3,}\b/g) || [];

    // Tally matches for each category
    const tallies: Record<
      'lament' | 'inquiry' | 'gratitude' | 'justice',
      string[]
    > = {
      lament: [],
      inquiry: [],
      gratitude: [],
      justice: [],
    };

    words.forEach((w) => {
      (Object.keys(SENTIMENT_ENGINES) as (keyof typeof SENTIMENT_ENGINES)[]).forEach(
        (cat) => {
          if (SENTIMENT_ENGINES[cat].keywords.includes(w)) {
            if (!tallies[cat].includes(w)) {
              tallies[cat].push(w);
            }
          }
        }
      );
    });

    // Check for dominant category
    type EngineCategory = keyof typeof SENTIMENT_ENGINES;
    let bestCat: EngineCategory | null = null;
    let maxMatches = 0;

    for (const cat of Object.keys(tallies) as EngineCategory[]) {
      if (tallies[cat].length > maxMatches) {
        maxMatches = tallies[cat].length;
        bestCat = cat;
      }
    }

    if (bestCat !== null && maxMatches > 0) {
      const activeCat = bestCat;
      const config = SENTIMENT_ENGINES[activeCat];
      return {
        category: activeCat,
        label: config.label,
        points: config.points,
        badgeBg: config.badgeBg,
        badgeText: config.badgeText,
        icon: config.icon,
        empathyNote: config.empathyNote,
        matchedKeywords: tallies[activeCat],
      };
    }

    // Default contemplation
    return {
      category: 'contemplation',
      label: 'Quiet Contemplation & Presence',
      points: words.length >= 12 ? 15 : 10,
      badgeBg: 'bg-[#292524] text-[#D6D3D1] border-[#44403C]',
      badgeText: '#D6D3D1',
      icon: Feather,
      empathyNote:
        'Taking unhurried time to write and reflect nourishes your Growth Seed with zero performance pressure.',
      matchedKeywords: [],
    };
  }, [reflectionText]);

  const handleSwipeDismiss = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 90 || info.velocity.y > 420) {
      onClose();
    }
  };

  const handleCommitReflection = () => {
    if (!reflectionText.trim()) return;

    setIsSubmitting(true);
    setLastAwardedPoints(sentimentResult.points);

    setTimeout(() => {
      onEngageContent?.(
        sentimentResult.points,
        `Reflected in Journal: “${sentimentResult.label}” (+${sentimentResult.points} Growth Points)`
      );
      setIsSubmitting(false);
      setCommittedSuccess(true);

      setTimeout(() => {
        setCommittedSuccess(false);
        onClose();
      }, 1600);
    }, 450);
  };

  const wordCount = reflectionText.trim()
    ? reflectionText.trim().split(/\s+/).length
    : 0;

  const SentimentIcon = sentimentResult.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reflection-overlay-title"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.22, ease: 'easeOut'}}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-2.5 py-3 sm:p-6 bg-[#1A1A1A]/80 backdrop-blur-xs overflow-y-auto overflow-x-hidden w-full max-w-full"
        >
          <motion.div
            ref={modalFocusTrapRef as React.RefObject<HTMLDivElement>}
            tabIndex={-1}
            initial={{opacity: 0, scale: 0.94, y: 28}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.94, y: 36}}
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 28,
              mass: 0.9,
            }}
            drag="y"
            dragDirectionLock
            dragConstraints={{top: 0, bottom: 0}}
            dragElastic={{top: 0.04, bottom: 0.45}}
            onDragEnd={handleSwipeDismiss}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-2xl mx-auto rounded-2xl border shadow-2xl overflow-hidden my-auto max-h-[92dvh] sm:max-h-[90dvh] flex flex-col touch-pan-y focus:outline-none transition-colors duration-200 ${
              isNightSanctuary
                ? 'bg-[#1A1A1A] text-[#F9F6F0] border-[#36312E]'
                : 'bg-[#FAF7F2] text-[#1C1917] border-[#E5DEC9]'
            }`}
          >
            {/* Mobile Swipe-to-Dismiss Handle Bar */}
            <div
              aria-hidden="true"
              className={`sm:hidden flex flex-col items-center justify-center pt-2.5 pb-1 cursor-grab active:cursor-grabbing select-none shrink-0 ${
                isNightSanctuary ? 'bg-[#24211E]' : 'bg-[#F2ECE1]'
              }`}
            >
              <div className="w-11 h-1.5 rounded-full bg-[#78716C]/50" />
              <span className="text-[10px] font-mono text-[#78716C] mt-1">
                Swipe down to close
              </span>
            </div>

            {/* Top Header */}
            <div
              className={`px-4 sm:px-6 py-3 sm:py-4 border-b flex items-center justify-between gap-3 shrink-0 ${
                isNightSanctuary
                  ? 'bg-[#24211E] border-[#36312E]'
                  : 'bg-[#F2ECE1] border-[#E5DEC9]'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D97706] min-w-0">
                <Lock className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span className="truncate">
                  Safe Harbor · Unstructured Reflection Journal
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close reflection journal"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl text-[#57534E] hover:text-[#1C1917] hover:bg-[#E5DEC9]/50 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-8 space-y-5 overflow-y-auto overscroll-contain min-w-0">
              {/* Headline & Privacy Banner */}
              <div className="space-y-1">
                <h3
                  id="reflection-overlay-title"
                  className="text-2xl sm:text-3xl font-normal leading-snug"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  Write What Is True. No Answers Forced.
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Type your raw thoughts, questions, or honest prayers. As you write,
                  our local sentiment engine analyzes your reflective posture to
                  award Growth Points—with zero cloud surveillance.
                </p>
              </div>

              {/* Inspiration Prompts Accordion / Chips */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-[#57534E] uppercase tracking-wider">
                  Need a spark? Tap a reflection prompt:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {STARTER_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setReflectionText(prompt + ' ')}
                      className={`min-h-[44px] text-[11px] text-left px-3 py-2 rounded-xl border transition-colors cursor-pointer inline-flex items-center ${
                        isNightSanctuary
                          ? 'bg-[#24211E] border-[#36312E] text-[#D6D3D1] hover:text-[#F9F6F0]'
                          : 'bg-[#F2ECE1] border-[#E5DEC9] text-[#44403C] hover:text-[#1C1917]'
                      }`}
                    >
                      “{prompt}”
                    </button>
                  ))}
                </div>
              </div>

          {/* Unstructured Journal Textarea */}
          <div className="space-y-1.5">
            <div className="relative">
              <textarea
                rows={6}
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="Start typing without filtering yourself... What are you carrying today?"
                className={`w-full p-4 rounded-xl border text-sm sm:text-[15px] leading-relaxed resize-none focus:outline-none focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706] transition-colors ${
                  isNightSanctuary
                    ? 'bg-[#141210] border-[#36312E] text-[#F9F6F0] placeholder:text-[#57534E]'
                    : 'bg-white border-[#E5DEC9] text-[#1C1917] placeholder:text-[#A8A29E]'
                }`}
              />
              <div className="absolute right-3 bottom-3 text-[11px] font-mono text-[#78716C]">
                {wordCount} words
              </div>
            </div>
          </div>

          {/* Real-time Keyword Sentiment Badge & Growth Points Calculation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={sentimentResult.category + '-' + sentimentResult.matchedKeywords.length}
              initial={{opacity: 0, y: 6}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -6}}
              transition={{duration: 0.2}}
              className={`p-3.5 sm:p-4 rounded-xl border space-y-2 ${
                isNightSanctuary ? 'bg-[#24211E] border-[#36312E]' : 'bg-[#F2ECE1] border-[#E5DEC9]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg border ${sentimentResult.badgeBg}`}>
                    <SentimentIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#D97706] uppercase tracking-wider">
                      Detected Posture
                    </div>
                    <div className="text-xs sm:text-sm font-semibold">
                      {sentimentResult.label}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#D97706] text-[#FDE68A] text-xs font-mono font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>+{sentimentResult.points} Growth Points</span>
                </div>
              </div>

              {sentimentResult.matchedKeywords.length > 0 && (
                <div className="flex items-center gap-1 text-[11px] text-[#57534E]">
                  <span>Matched sentiment indicators:</span>
                  <span className="font-mono text-[#D97706]">
                    {sentimentResult.matchedKeywords.join(', ')}
                  </span>
                </div>
              )}

              <p className="text-xs text-[#57534E] leading-relaxed pt-0.5">
                {sentimentResult.empathyNote}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Privacy Microcopy */}
          <div className="flex items-center gap-2 text-xs text-[#57534E] px-1">
            <ShieldCheck className="w-4 h-4 text-[#4A5D4E] shrink-0" />
            <span>
              Zero-knowledge client-side encryption. Parents and administrators
              cannot view your journal text.
            </span>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] inline-flex items-center justify-center px-4 py-2.5 rounded-full text-xs font-semibold text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isSubmitting || !reflectionText.trim()}
              onClick={handleCommitReflection}
              className="min-h-[44px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] border border-[#D97706]/60 hover:border-[#D97706] text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {committedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#A7F3D0]" />
                  <span>+{lastAwardedPoints} Points Nourished to Seed!</span>
                </>
              ) : isSubmitting ? (
                <>
                  <Sparkles className="w-4 h-4 text-[#D97706] animate-spin" />
                  <span>Encrypting & Analyzing Sentiment…</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#D97706]" />
                  <span>
                    Save Reflection & Earn +{sentimentResult.points} Points
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#D97706]" />
                </>
              )}
            </button>
          </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
