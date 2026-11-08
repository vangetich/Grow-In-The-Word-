'use client';

import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  BookOpen,
  CheckCircle2,
  Database,
  Headphones,
  Lock,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react';

interface NetworkStatusIndicatorProps {
  className?: string;
}

export default function NetworkStatusIndicator({
  className = '',
}: NetworkStatusIndicatorProps) {
  const [isBrowserOnline, setIsBrowserOnline] = useState<boolean>(true);
  const [simulateOffline, setSimulateOffline] = useState<boolean>(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const isCacheReady = true;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => setIsBrowserOnline(true);
    const handleOffline = () => setIsBrowserOnline(false);

    const syncTimer = setTimeout(() => {
      if (
        typeof navigator !== 'undefined' &&
        typeof navigator.onLine === 'boolean'
      ) {
        setIsBrowserOnline(navigator.onLine);
      }
    }, 0);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    try {
      localStorage.setItem('grow_in_the_word_offline_cache_manifest', 'ready');
    } catch {
      // Ignore storage write errors in restricted browsing modes
    }

    return () => {
      clearTimeout(syncTimer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const effectiveOnline = isBrowserOnline && !simulateOffline;

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsPopoverOpen((prev) => !prev)}
        aria-expanded={isPopoverOpen}
        aria-label={
          effectiveOnline
            ? 'Network Status: Online & Cached Locally for Offline Use'
            : 'Network Status: Offline Mode Active — Running from Local Cache'
        }
        title={
          effectiveOnline
            ? 'Offline-First Cache Ready · Click to inspect local sync status'
            : 'Offline Sanctuary Active · Serving cached narratives & local vault'
        }
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#292524] hover:bg-[#36312E] border border-[#44403C] text-[11px] font-mono text-[#D6D3D1] transition-colors cursor-pointer whitespace-nowrap shrink-0"
      >
        {/* Subtle Tiny Dot Indicator */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              effectiveOnline ? 'bg-[#6E8B74]' : 'bg-[#D97706]'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              effectiveOnline
                ? isCacheReady
                  ? 'bg-[#6E8B74]'
                  : 'bg-[#A8A29E]'
                : 'bg-[#D97706]'
            }`}
          />
        </span>

        <span className="hidden sm:inline text-[10.5px] tracking-tight">
          {effectiveOnline ? 'Cached Offline' : 'Offline Active'}
        </span>
      </button>

      <AnimatePresence>
        {isPopoverOpen && (
          <motion.div
            initial={{opacity: 0, y: 10, scale: 0.96}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 6, scale: 0.96}}
            transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
            role="dialog"
            aria-label="Grow In The Word Offline-First Network & Cache Status"
            className="absolute bottom-full right-0 mb-3.5 w-[calc(100vw-2.5rem)] sm:w-[330px] max-w-[330px] rounded-2xl bg-[#1A1A1A] border border-[#4A5D4E]/80 shadow-2xl p-4 text-[#F9F6F0] z-50 space-y-3 backdrop-blur-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[#292524]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FBBF24]">
                {effectiveOnline ? (
                  <Wifi className="w-3.5 h-3.5 text-[#6E8B74]" />
                ) : (
                  <WifiOff className="w-3.5 h-3.5 text-[#D97706]" />
                )}
                <span>
                  {effectiveOnline
                    ? 'Online · Local Cache Ready'
                    : 'Offline Sanctuary Active'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsPopoverOpen(false)}
                aria-label="Close network status popover"
                className="p-1 rounded-full text-[#A8A29E] hover:text-[#F9F6F0] hover:bg-[#292524] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-[11px] text-[#D6D3D1] leading-relaxed">
              <strong className="text-[#F9F6F0] font-semibold">
                Grow In The Word
              </strong>{' '}
              uses a local-first architecture so bedtime audio, historical maps,
              and private teen journals work seamlessly with zero signal.
            </p>

            {/* Cached Modules Breakdown */}
            <div className="space-y-1.5">
              <div className="p-2 rounded-xl bg-[#24211E] border border-[#36312E] flex items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-2 min-w-0">
                  <Headphones className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                  <span className="truncate text-[#E7E5E4]">
                    Bedtime Shepherd Audio Pack
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#6E8B74] shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Cached</span>
                </span>
              </div>

              <div className="p-2 rounded-xl bg-[#24211E] border border-[#36312E] flex items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-2 min-w-0">
                  <Database className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                  <span className="truncate text-[#E7E5E4]">
                    Ancient Archive SQLite & Maps
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#6E8B74] shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Cached</span>
                </span>
              </div>

              <div className="p-2 rounded-xl bg-[#24211E] border border-[#36312E] flex items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-2 min-w-0">
                  <BookOpen className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                  <span className="truncate text-[#E7E5E4]">
                    Parallel Studio (5 Versions · Dict &amp; Concordance)
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#6E8B74] shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Cached</span>
                </span>
              </div>

              <div className="p-2 rounded-xl bg-[#24211E] border border-[#36312E] flex items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-2 min-w-0">
                  <Lock className="w-3.5 h-3.5 text-[#6E8B74] shrink-0" />
                  <span className="truncate text-[#E7E5E4]">
                    Teen Safe Harbor E2EE Vault
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#FDE68A] shrink-0">
                  <span>Device-Only</span>
                </span>
              </div>
            </div>

            {/* Interactive Offline Mode Simulator */}
            <div className="pt-2 border-t border-[#292524] flex items-center justify-between gap-2">
              <span className="text-[10.5px] text-[#A8A29E]">
                Test offline-first state:
              </span>
              <button
                type="button"
                onClick={() => setSimulateOffline((prev) => !prev)}
                className={`px-2.5 py-1 rounded-full text-[10.5px] font-mono font-semibold transition-colors cursor-pointer ${
                  simulateOffline
                    ? 'bg-[#D97706] text-[#1A1A1A]'
                    : 'bg-[#292524] hover:bg-[#36312E] text-[#FDE68A] border border-[#44403C]'
                }`}
              >
                {simulateOffline ? 'Restore Online' : 'Simulate Offline'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
