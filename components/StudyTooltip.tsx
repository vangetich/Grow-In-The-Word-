'use client';

import React, {useState, useEffect, useId, useRef} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {HelpCircle, Sparkles} from 'lucide-react';

export interface StudyTooltipProps {
  /** Short title displayed in the tooltip header */
  label: string;
  /** Optional category tag (e.g., "ARCHIVAL COORDINATES", "STUDIO PERSISTENCE") */
  category?: string;
  /** Concise, unobtrusive explanation of the dashboard element */
  description: string;
  /** Optional quick actionable micro-hint */
  hint?: string;
  /** Preferred placement relative to the wrapped trigger */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Alignment for top/bottom placements */
  align?: 'center' | 'start' | 'end';
  /** Ephemeral auto-dismiss duration in ms after touch/click interaction (default 4500ms) */
  ephemeralDurationMs?: number;
  /** Optional small badge icon next to or around the trigger */
  showIndicatorDot?: boolean;
  /** Wrapped interactive dashboard element */
  children: React.ReactNode;
  className?: string;
}

/**
 * StudyTooltip: Ephemeral, unobtrusive onboarding & contextual help utility.
 * Displays a soft archival tooltip when a user hovers, focuses, or interacts with
 * complex dashboard elements (such as AncientArchiveExplorer coordinates or
 * BibleStudyReadingStudio controls) and automatically fades out to prevent clutter.
 */
export default function StudyTooltip({
  label,
  category = 'STUDY TOOLTIP',
  description,
  hint,
  position = 'top',
  align = 'center',
  ephemeralDurationMs = 4500,
  showIndicatorDot = false,
  children,
  className = '',
}: StudyTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }
  };

  const triggerEphemeralShow = () => {
    clearTimer();
    setIsVisible(true);
    dismissTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, ephemeralDurationMs);
  };

  const handleHide = () => {
    clearTimer();
    setIsVisible(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimer();
    };
  }, [isVisible]);

  const positionClasses =
    position === 'bottom'
      ? 'top-full mt-2'
      : position === 'left'
      ? 'right-full mr-2.5 top-1/2 -translate-y-1/2'
      : position === 'right'
      ? 'left-full ml-2.5 top-1/2 -translate-y-1/2'
      : 'bottom-full mb-2';

  const alignClasses =
    position === 'left' || position === 'right'
      ? ''
      : align === 'start'
      ? 'left-0'
      : align === 'end'
      ? 'right-0'
      : 'left-1/2 -translate-x-1/2';

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={triggerEphemeralShow}
      onMouseLeave={handleHide}
      onFocusCapture={triggerEphemeralShow}
      onBlurCapture={handleHide}
      onClickCapture={() => {
        // Show briefly on touch/click without blocking the child's click handler
        triggerEphemeralShow();
      }}
      aria-describedby={isVisible ? tooltipId : undefined}
    >
      {children}

      {showIndicatorDot && (
        <span
          aria-hidden="true"
          className="ml-1 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#D97706]/15 text-[#D97706] pointer-events-none shrink-0"
        >
          <HelpCircle className="w-2.5 h-2.5" />
        </span>
      )}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={{
              opacity: 0,
              y: position === 'bottom' ? -5 : position === 'top' ? 5 : 0,
              scale: 0.96,
            }}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{
              opacity: 0,
              y: position === 'bottom' ? -4 : position === 'top' ? 4 : 0,
              scale: 0.96,
            }}
            transition={{duration: 0.16, ease: [0.16, 1, 0.3, 1]}}
            className={`absolute z-50 ${positionClasses} ${alignClasses} w-64 sm:w-72 p-3 rounded-xl bg-[#1C1917]/95 text-[#FAF7F2] border border-[#D97706]/70 shadow-xl backdrop-blur-xs pointer-events-none text-left space-y-1.5`}
          >
            <div className="flex items-center justify-between gap-2 border-b border-[#292524] pb-1">
              <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[#FBBF24] font-semibold truncate">
                <Sparkles className="w-2.5 h-2.5 text-[#D97706] shrink-0" />
                <span>{category}</span>
              </span>
              <span className="font-mono text-[9.5px] text-[#A8A29E] shrink-0">
                Auto-fades
              </span>
            </div>

            <div className="text-xs font-semibold text-[#FAF7F2] leading-snug">
              {label}
            </div>

            <p className="text-[11px] text-[#E7E5E4] leading-relaxed font-sans font-normal">
              {description}
            </p>

            {hint && (
              <div className="pt-1 border-t border-[#292524]/80 text-[10px] font-mono text-[#D97706]">
                {hint}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
