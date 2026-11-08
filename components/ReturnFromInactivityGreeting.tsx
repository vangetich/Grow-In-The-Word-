'use client';

import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {Sprout, X, RotateCcw, Sparkles} from 'lucide-react';

const INACTIVITY_STORAGE_KEY = 'grow_in_the_word_last_visit_ts';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

interface ReturnFromInactivityGreetingProps {
  onNourishReturn?: (points: number, label: string) => void;
}

export default function ReturnFromInactivityGreeting({
  onNourishReturn,
}: ReturnFromInactivityGreetingProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [daysAway, setDaysAway] = useState<number>(9);
  const [isSimulated, setIsSimulated] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const now = Date.now();
        const storedTimestamp = localStorage.getItem(INACTIVITY_STORAGE_KEY);

        if (storedTimestamp) {
          const lastVisit = parseInt(storedTimestamp, 10);
          const elapsedMs = now - lastVisit;

          if (!Number.isNaN(lastVisit) && elapsedMs >= SEVEN_DAYS_MS) {
            const calculatedDays = Math.max(
              7,
              Math.floor(elapsedMs / (24 * 60 * 60 * 1000))
            );
            setDaysAway(calculatedDays);
            setIsVisible(true);
          } else {
            const sessionSeen = sessionStorage.getItem(
              'grow_in_the_word_inactivity_toast_shown'
            );
            if (!sessionSeen) {
              setDaysAway(8);
              setIsVisible(true);
              sessionStorage.setItem(
                'grow_in_the_word_inactivity_toast_shown',
                'true'
              );
            }
          }
        } else {
          const eightDaysAgo = now - 8 * 24 * 60 * 60 * 1000;
          localStorage.setItem(INACTIVITY_STORAGE_KEY, String(eightDaysAgo));
          setDaysAway(8);
          setIsVisible(true);
          sessionStorage.setItem(
            'grow_in_the_word_inactivity_toast_shown',
            'true'
          );
        }

        localStorage.setItem(INACTIVITY_STORAGE_KEY, String(now));
      } catch {
        setIsVisible(true);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  const handleSimulateReturn = () => {
    setIsSimulated(true);
    setDaysAway(10);
    setIsVisible(true);
    onNourishReturn?.(
      5,
      'Welcomed back after 7+ days away (Grace is new every morning)'
    );
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <div className="w-full pt-6 border-t border-[#E5DEC9]/80">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <AnimatePresence mode="wait">
          {isVisible ? (
            <motion.div
              key="inactivity-welcome-toast"
              role="status"
              aria-live="polite"
              initial={{opacity: 0, y: 10, scale: 0.99}}
              animate={{opacity: 1, y: 0, scale: 1}}
              exit={{opacity: 0, y: 6, scale: 0.99}}
              transition={{duration: 0.7, ease: [0.16, 1, 0.3, 1]}}
              className="w-full sm:w-auto flex-1 rounded-2xl bg-[#F2ECE1] border border-[#D97706]/35 px-4 sm:px-5 py-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#F9F6F0] border border-[#D97706]/50 flex items-center justify-center shrink-0">
                  <Sprout className="w-4 h-4 text-[#4A5D4E]" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#4A5D4E]">
                    <span>Return from Inactivity ({daysAway} days away)</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#92400E]">
                      Zero Guilt · Unbroken Rhythm
                    </span>
                    {isSimulated && (
                      <span className="px-1.5 py-0.5 rounded bg-[#D97706]/15 text-[#92400E] text-[10px]">
                        Preview Active
                      </span>
                    )}
                  </div>
                  <p
                    className="text-base sm:text-lg font-normal text-[#1A1A1A] tracking-tight mt-0.5"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Welcome back. Grace is new every morning.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-auto">
                <span
                  className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-[#78716C]"
                  style={{fontFamily: 'var(--font-mono), monospace'}}
                >
                  <Sparkles className="w-3 h-3 text-[#D97706]" />
                  <span>Lamentations 3:22–23</span>
                </span>

                <button
                  type="button"
                  onClick={handleDismiss}
                  aria-label="Dismiss welcome back toast"
                  className="p-1.5 rounded-lg text-[#57534E] hover:text-[#1A1A1A] hover:bg-[#E5DEC9]/70 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="inactivity-trigger-bar"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.3}}
              className="flex flex-wrap items-center justify-between gap-3 w-full text-xs text-[#78716C]"
            >
              <span>
                Anti-Shame Architecture: No broken-streak counters when life
                gets busy.
              </span>
              <button
                type="button"
                onClick={handleSimulateReturn}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F2ECE1] hover:bg-[#E5DEC9] border border-[#D97706]/40 text-xs font-medium text-[#1A1A1A] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-[#D97706]" />
                <span>Preview 7+ Day Return Greeting</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
