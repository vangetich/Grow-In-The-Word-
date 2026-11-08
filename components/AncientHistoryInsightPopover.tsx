'use client';

import React, {useState, useRef, useEffect} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {Scroll, Compass, BookOpen, Clock, ShieldCheck, X, Sparkles, ChevronRight} from 'lucide-react';

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
    scriptureRef: 'Genesis · Exodus · Ancient Promises',
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
  const containerRef = useRef<HTMLSpanElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 280);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
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

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      {/* Interactive Trigger Element */}
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Ancient History: Biblical perspective & implications tooltip"
        className={`group inline-flex items-center gap-1 border-b-2 border-dashed transition-all cursor-help focus-visible:outline-2 focus-visible:outline-[#D97706] rounded-xs px-0.5 ${
          isDarkTheme
            ? 'text-[#FAF7F2] border-[#D97706] hover:text-[#FBBF24] hover:border-[#FBBF24]'
            : 'text-[#1C1917] border-[#D97706] hover:text-[#92400E] hover:border-[#92400E]'
        } ${className}`}
      >
        <span className="font-semibold tracking-[0.16em] uppercase">
          {children}
        </span>
        <Sparkles
          className={`w-3 h-3 text-[#D97706] transition-transform group-hover:scale-125 ${
            isOpen ? 'rotate-12 scale-110' : ''
          }`}
        />
      </button>

      {/* Popover Insight Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Biblical Context & Ancient History Insights"
            initial={{opacity: 0, y: 10, scale: 0.95}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 8, scale: 0.96}}
            transition={{type: 'spring', stiffness: 380, damping: 26}}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 z-50 w-[min(480px,calc(100vw-2rem))] max-h-[75vh] overflow-y-auto overscroll-contain rounded-2xl bg-[#1C1917]/98 text-[#FAF7F2] border border-[#D97706]/75 shadow-2xl backdrop-blur-xl p-5 space-y-4 text-left"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#2E2925]">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#292524] border border-[#D97706] flex items-center justify-center shrink-0 mt-0.5 text-[#D97706]">
                  <Scroll className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#FBBF24]">
                    <span>Biblical Setting &amp; Context</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#D97706]">Sacred Time</span>
                  </div>
                  <h4
                    className="text-lg font-normal text-[#FAF7F2] leading-snug mt-0.5"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    What “Ancient History” Means in Scripture
                  </h4>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsIsOpenFalse(setIsOpen)}
                aria-label="Close insight popover"
                className="w-7 h-7 inline-flex items-center justify-center rounded-lg bg-[#292524] hover:bg-[#36312E] text-[#A8A29E] hover:text-[#FAF7F2] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Core Thematic Overview */}
            <div className="p-3.5 rounded-xl bg-[#24211E] border border-[#36312E] space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FBBF24]">
                Theological Perspective
              </span>
              <p
                className="text-xs sm:text-[13px] italic text-[#FAF7F2] leading-relaxed"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                “In a biblical setting or sense, the phrase &lsquo;ancient history&rsquo; (or references to ancient days, times, and paths) implies deep temporal continuity, the foundation of God’s covenant, and a standard of truth established long before the immediate present.”
              </p>
            </div>

            {/* Scrollable Bullet Points */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#A8A29E] flex items-center justify-between">
                <span>Key Implications &amp; Scriptural Roots</span>
                <span className="text-[10px] text-[#D97706]">4 Pillars</span>
              </div>

              <ul className="space-y-3">
                {ANCIENT_HISTORY_INSIGHTS.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <li
                      key={idx}
                      className="p-3 rounded-xl bg-[#141210]/80 border border-[#2E2925] hover:border-[#D97706]/50 transition-colors space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <IconComp className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                          <strong className="text-xs font-semibold text-[#FAF7F2]">
                            {item.title}
                          </strong>
                        </div>
                        <span className="text-[10px] font-mono text-[#FBBF24] shrink-0">
                          {item.scriptureRef}
                        </span>
                      </div>
                      <p className="text-xs text-[#D6D3D1] leading-relaxed pl-5.5">
                        {item.text}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Footer Footnote */}
            <div className="pt-2 border-t border-[#2E2925] flex items-center justify-between text-[11px] text-[#A8A29E]">
              <span>Unhurried Formation · Non-Coercive Reflection</span>
              <span className="text-[#D97706] font-mono">15-Year Horizon</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

function setIsIsOpenFalse(fn: (val: boolean) => void) {
  fn(false);
}
