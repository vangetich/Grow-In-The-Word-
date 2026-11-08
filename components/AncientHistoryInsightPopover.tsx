'use client';

import React, {useState, useRef, useEffect} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  Scroll,
  Compass,
  BookOpen,
  Clock,
  ShieldCheck,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface AncientHistoryInsightPopoverProps {
  children?: React.ReactNode;
  className?: string;
  isDarkTheme?: boolean;
}

export const ANCIENT_HISTORY_INSIGHTS = [
  {
    title: 'The Scope of Creation and Covenant',
    icon: Compass,
    scriptureRef: 'Psalm 77:5 · Ezekiel 36:2',
    text: 'In biblical literature, phrases like “the years of ancient times” (Psalm 77:5) or “ancient high places” (Ezekiel 36:2) point back to the very roots of human existence, tracing a continuous line from Creation through the Patriarchs (Abraham, Isaac, and Jacob) to the writer’s own day.',
  },
  {
    title: 'Unchanging Moral and Spiritual Landmarks',
    icon: ShieldCheck,
    scriptureRef: 'Proverbs 22:28 · Jeremiah 18:15',
    text: 'Biblical expressions such as “ancient landmark” or “old paths” (Proverbs 22:28; Jeremiah 18:15) do not imply something obsolete or dismissed (as the modern idiom suggests). Instead, they represent divine order, eternal law, and faithful ways of living that people are warned not to abandon.',
  },
  {
    title: 'God’s Sovereignty Over Time',
    icon: Clock,
    scriptureRef: 'Genesis · Exodus · Promises',
    text: 'History in the Bible is linear rather than cyclical. “Ancient” events—whether the Genesis creation, the Exodus, or ancestral promises—are active anchors. They serve as proof of God’s reliability, reminding later generations of what He has already done and what He has promised to do.',
  },
  {
    title: 'The Weight of Tradition and Witness',
    icon: BookOpen,
    scriptureRef: 'Isaiah 44:7 · Jeremiah 5:15',
    text: 'Referring to “ancient people” or “ancient nations” (Isaiah 44:7; Jeremiah 5:15) establishes authority and antiquity, showing that God’s plans and judgments have spanned across generations of human empires.',
  },
];

export default function AncientHistoryInsightPopover({
  children = 'ANCIENT HISTORY',
  className = '',
  isDarkTheme = false,
}: AncientHistoryInsightPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'slider' | 'scroll'>('slider');
  const containerRef = useRef<HTMLSpanElement>(null);
  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const [scrollRatio, setScrollRatio] = useState(0);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 260);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleScrollBox = () => {
    if (!scrollBoxRef.current) return;
    const {scrollTop, scrollHeight, clientHeight} = scrollBoxRef.current;
    const maxScroll = Math.max(1, scrollHeight - clientHeight);
    setScrollRatio(Math.min(1, Math.max(0, scrollTop / maxScroll)));
  };

  const handleCustomScrollSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setScrollRatio(val);
    if (scrollBoxRef.current) {
      const {scrollHeight, clientHeight} = scrollBoxRef.current;
      scrollBoxRef.current.scrollTop = val * (scrollHeight - clientHeight);
    }
  };

  // Click outside and Escape key handler
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const currentInsight = ANCIENT_HISTORY_INSIGHTS[activeSlideIndex];
  const ActiveIcon = currentInsight.icon;

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      {/* Interactive Trigger Element: Reads as normal text with no dashed underline */}
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Ancient History: Biblical perspective and implications"
        className={`inline-flex items-center transition-colors cursor-pointer focus-visible:outline-1 focus-visible:outline-[#D97706] ${
          isDarkTheme
            ? 'text-inherit hover:text-[#FBBF24]'
            : 'text-inherit hover:text-[#92400E]'
        } ${className}`}
      >
        <span className="font-semibold tracking-inherit uppercase">
          {children}
        </span>
      </button>

      {/* Smaller Rectangular Popup Box with Neat Slight Sliders */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Biblical Context & Ancient History Insights"
            initial={{opacity: 0, y: 6, scale: 0.97}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 4, scale: 0.97}}
            transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 z-50 w-[min(330px,calc(100vw-1.5rem))] rounded-md bg-[#1C1917]/98 text-[#FAF7F2] border border-[#D97706]/70 shadow-2xl backdrop-blur-xl p-3.5 space-y-2.5 text-left font-normal tracking-normal normal-case"
          >
            {/* Compact Rectangular Header */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#2E2925]">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-xs bg-[#292524] border border-[#D97706]/60 flex items-center justify-center shrink-0 text-[#D97706]">
                  <Scroll className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9.5px] font-mono uppercase tracking-wider text-[#FBBF24] truncate">
                    Biblical Sense · Ancient History
                  </div>
                  <h4
                    className="text-xs font-semibold text-[#FAF7F2] truncate"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Temporal Continuity &amp; Covenant
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setViewMode((prev) =>
                      prev === 'slider' ? 'scroll' : 'slider'
                    )
                  }
                  className="px-1.5 py-0.5 rounded-xs bg-[#292524] hover:bg-[#36312E] border border-[#3E3834] text-[9px] font-mono text-[#D6D3D1] cursor-pointer"
                  title="Switch between Card Slider and Scroll View"
                >
                  {viewMode === 'slider' ? 'All 4' : 'Slide'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close insight box"
                  className="w-5 h-5 inline-flex items-center justify-center rounded-xs bg-[#292524] hover:bg-[#36312E] text-[#A8A29E] hover:text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Core Definition Quote */}
            <div className="p-2.5 rounded-xs bg-[#24211E] border-l-2 border-[#D97706] text-[11px] leading-snug text-[#E7E5E4] italic">
              “In a biblical setting or sense, the phrase &lsquo;ancient history&rsquo; (or references to ancient days, times, and paths) implies deep temporal continuity, the foundation of God’s covenant, and a standard of truth established long before the immediate present.”
            </div>

            {viewMode === 'slider' ? (
              /* NEAT SLIGHT SLIDER MODE: Interactive Pillar Slider + Stepper */
              <div className="space-y-2">
                {/* Active Pillar Rectangular Card with Animated Slide Transition */}
                <div className="p-2.5 rounded-xs bg-[#141210] border border-[#2E2925] min-h-[128px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlideIndex}
                      initial={{opacity: 0, x: 14}}
                      animate={{opacity: 1, x: 0}}
                      exit={{opacity: 0, x: -14}}
                      transition={{duration: 0.16, ease: 'easeOut'}}
                      className="space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <ActiveIcon className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                          <strong className="text-[11.5px] font-semibold text-[#FAF7F2] truncate">
                            {currentInsight.title}
                          </strong>
                        </div>
                      </div>
                      <div className="text-[9.5px] font-mono text-[#FBBF24]">
                        {currentInsight.scriptureRef}
                      </div>
                      <p className="text-[11px] text-[#D6D3D1] leading-relaxed pt-0.5">
                        {currentInsight.text}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Neat Slight Horizontal Slider Control */}
                <div className="pt-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveSlideIndex((prev) =>
                          prev === 0
                            ? ANCIENT_HISTORY_INSIGHTS.length - 1
                            : prev - 1
                        )
                      }
                      aria-label="Previous insight pillar"
                      className="w-5 h-5 rounded-xs bg-[#292524] hover:bg-[#36312E] border border-[#3E3834] flex items-center justify-center text-[#FAF7F2] cursor-pointer shrink-0"
                    >
                      <ChevronLeft className="w-3 h-3 text-[#D97706]" />
                    </button>

                    {/* Slight Range Slider */}
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="range"
                        min={0}
                        max={ANCIENT_HISTORY_INSIGHTS.length - 1}
                        step={1}
                        value={activeSlideIndex}
                        onChange={(e) =>
                          setActiveSlideIndex(parseInt(e.target.value, 10))
                        }
                        aria-label="Slide through 4 Ancient History biblical implications"
                        className="w-full h-1 bg-[#2E2925] accent-[#D97706] rounded-none appearance-none cursor-pointer"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveSlideIndex(
                          (prev) => (prev + 1) % ANCIENT_HISTORY_INSIGHTS.length
                        )
                      }
                      aria-label="Next insight pillar"
                      className="w-5 h-5 rounded-xs bg-[#292524] hover:bg-[#36312E] border border-[#3E3834] flex items-center justify-center text-[#FAF7F2] cursor-pointer shrink-0"
                    >
                      <ChevronRight className="w-3 h-3 text-[#D97706]" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[9.5px] font-mono text-[#A8A29E]">
                    <span>Slide Pillar {activeSlideIndex + 1} of 4</span>
                    <div className="flex items-center gap-1">
                      {ANCIENT_HISTORY_INSIGHTS.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveSlideIndex(idx)}
                          aria-label={`Go to pillar ${idx + 1}`}
                          className={`h-1 transition-all cursor-pointer ${
                            activeSlideIndex === idx
                              ? 'w-4 bg-[#D97706]'
                              : 'w-1.5 bg-[#3E3834] hover:bg-[#78716C]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* COMPACT SCROLLABLE BULLET LIST WITH NEAT SLIGHT SCROLL SLIDER */
              <div className="space-y-2">
                <div
                  ref={scrollBoxRef}
                  onScroll={handleScrollBox}
                  className="max-h-[155px] overflow-y-auto pr-1.5 space-y-2 scrollbar-thin"
                >
                  {ANCIENT_HISTORY_INSIGHTS.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <div
                        key={idx}
                        className="p-2 rounded-xs bg-[#141210] border border-[#2E2925] space-y-1"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <IconComp className="w-3 h-3 text-[#D97706] shrink-0" />
                            <strong className="text-[11px] font-semibold text-[#FAF7F2] truncate">
                              • {item.title}
                            </strong>
                          </div>
                        </div>
                        <div className="text-[9.5px] font-mono text-[#FBBF24] pl-4">
                          {item.scriptureRef}
                        </div>
                        <p className="text-[10.5px] text-[#D6D3D1] leading-snug pl-4">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Neat Slight Scroll Position Slider */}
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[9px] font-mono text-[#A8A29E] shrink-0">
                    Scroll
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.02}
                    value={scrollRatio}
                    onChange={handleCustomScrollSlider}
                    aria-label="Scroll through all insights"
                    className="w-full h-1 bg-[#2E2925] accent-[#D97706] rounded-none appearance-none cursor-pointer"
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
