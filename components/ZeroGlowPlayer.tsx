'use client';

import React, {useState, useEffect, useRef} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  Moon,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Bookmark,
  Check,
  X,
  Sunrise,
  ArrowRight,
  Maximize2,
  Minimize2,
} from 'lucide-react';

export interface ZeroGlowStoryData {
  id: string;
  title: string;
  subtitle: string;
  scriptureReference: string;
  storyDurationMin: number;
  loopDurationMin: number;
  quoteSnippet: string;
}

const DEFAULT_ZERO_GLOW_STORY: ZeroGlowStoryData = {
  id: 'story-shepherd',
  title: 'The Shepherd in the Dark Valley',
  subtitle: 'Psalm 23 · Deep Assurance & Safe Shelter',
  scriptureReference: 'Psalm 23:1–4',
  storyDurationMin: 6,
  loopDurationMin: 10,
  quoteSnippet:
    '“Even when the valley turns purple and shadowy, the Shepherd stays right beside you. You do not have to be brave all by yourself.”',
};

interface ZeroGlowPlayerProps {
  story?: ZeroGlowStoryData;
  isOpen?: boolean;
  isFullScreenOverlay?: boolean;
  onClose?: () => void;
  onOpenMorningBridge?: () => void;
  onSaveBookmark?: (seconds: number, label: string) => void;
}

export default function ZeroGlowPlayer({
  story = DEFAULT_ZERO_GLOW_STORY,
  isOpen = true,
  isFullScreenOverlay = true,
  onClose,
  onOpenMorningBridge,
  onSaveBookmark,
}: ZeroGlowPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSeconds, setPlaybackSeconds] = useState(85);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [justBookmarked, setJustBookmarked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [visualizerTone, setVisualizerTone] = useState<'amber' | 'sage'>('amber');

  const totalSeconds = (story.storyDurationMin + story.loopDurationMin) * 60;
  const storySeconds = story.storyDurationMin * 60;
  const isLullabyPhase = playbackSeconds >= storySeconds;

  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleScreenTap = () => {
    setControlsVisible(true);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
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
  }, [isPlaying, totalSeconds]);

  if (!isOpen) return null;

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveBookmark?.(playbackSeconds, `${story.title} at ${formatTime(playbackSeconds)}`);
    setJustBookmarked(true);
    setTimeout(() => setJustBookmarked(false), 2000);
    handleScreenTap();
  };

  return (
    <div
      onClick={handleScreenTap}
      className={`${
        isFullScreenOverlay
          ? 'fixed inset-0 z-50 overflow-hidden'
          : 'relative w-full rounded-2xl overflow-hidden min-h-[540px]'
      } bg-[#000000] text-[#E7E5E4] p-6 sm:p-10 flex flex-col justify-between select-none cursor-pointer transition-colors`}
      style={{touchAction: 'manipulation'}}
      role="region"
      aria-label="Zero-Glow Night-Mode Sleep Player"
    >
      {/* Top Bar: Ultra-low luminance status */}
      <div
        className={`transition-opacity duration-500 flex flex-wrap items-center justify-between gap-2 text-xs text-[#525252] ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full animate-pulse ${
              visualizerTone === 'amber' ? 'bg-[#D97706]/70' : 'bg-[#4A5D4E]/80'
            }`}
          />
          <span className="font-mono">
            Zero-Glow Night Mode · 2100K Melatonin Protection
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Visualizer Tone Selector: Soft Amber or Muted Sage */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center rounded-md bg-[#121212] border border-[#262626] p-0.5 text-[11px] font-mono"
          >
            <button
              type="button"
              onClick={() => {
                setVisualizerTone('amber');
                handleScreenTap();
              }}
              className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                visualizerTone === 'amber'
                  ? 'bg-[#D97706]/25 text-[#FBBF24]'
                  : 'text-[#737373] hover:text-[#A3A3A3]'
              }`}
            >
              Soft Amber
            </button>
            <button
              type="button"
              onClick={() => {
                setVisualizerTone('sage');
                handleScreenTap();
              }}
              className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                visualizerTone === 'sage'
                  ? 'bg-[#4A5D4E]/35 text-[#A7F3D0]'
                  : 'text-[#737373] hover:text-[#A3A3A3]'
              }`}
            >
              Muted Sage
            </button>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted((prev) => !prev);
              handleScreenTap();
            }}
            className="text-[#737373] hover:text-[#D4D4D4] p-1.5 rounded-md bg-[#171717] border border-[#262626] cursor-pointer"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-[#737373] hover:text-[#D4D4D4] px-2.5 py-1 rounded-md bg-[#171717] border border-[#262626] text-xs cursor-pointer flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Exit Player</span>
            </button>
          )}
        </div>
      </div>

      {/* Central Ambient Visualizer: Single Slow-Pulsing Soft Amber or Muted Sage Ring (8s Cadence) */}
      <div className="my-auto flex flex-col items-center justify-center text-center space-y-6">
        <div className="relative flex items-center justify-center">
          {/* Outer Breathing Resonant Ring */}
          <motion.div
            animate={{
              scale: [1, 1.48, 1],
              opacity: [0.12, 0.45, 0.12],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`w-48 h-48 sm:w-64 sm:h-64 rounded-full border pointer-events-none absolute ${
              visualizerTone === 'amber'
                ? 'border-[#D97706]/40'
                : 'border-[#4A5D4E]/50'
            }`}
          />

          {/* Inner Calming Core */}
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
            className={`w-32 h-32 sm:w-44 sm:h-44 rounded-full flex items-center justify-center border ${
              visualizerTone === 'amber'
                ? 'bg-gradient-to-br from-[#D97706]/20 via-[#B45309]/10 to-transparent border-[#F59E0B]/50 shadow-[0_0_45px_rgba(217,119,6,0.22)]'
                : 'bg-gradient-to-br from-[#4A5D4E]/25 via-[#3A4A3E]/15 to-transparent border-[#637867]/60 shadow-[0_0_45px_rgba(74,93,78,0.28)]'
            }`}
          >
            <Moon
              className={`w-9 h-9 opacity-80 ${
                visualizerTone === 'amber'
                  ? 'text-[#FBBF24]/80'
                  : 'text-[#A7F3D0]/75'
              }`}
            />
          </motion.div>
        </div>

        <div className="space-y-1.5 max-w-sm px-4">
          <h4
            className="text-xl sm:text-2xl font-normal text-[#D4D4D4] tracking-wide"
            style={{fontFamily: 'var(--font-display), serif'}}
          >
            {story.title}
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
        {/* Progress Line */}
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
              style={{width: `${(playbackSeconds / totalSeconds) * 100}%`}}
              className={`absolute left-0 top-0 h-full rounded-full transition-all duration-300 ${
                visualizerTone === 'amber' ? 'bg-[#D97706]' : 'bg-[#4A5D4E]'
              }`}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#525252] font-mono">
            <span>00:00 Story Starts</span>
            <span
              className={
                visualizerTone === 'amber' ? 'text-[#D97706]' : 'text-[#637867]'
              }
            >
              {formatTime(storySeconds)} Lullaby Loop Transition
            </span>
            <span>{formatTime(totalSeconds)} Drift to Sleep</span>
          </div>
        </div>

        {/* Play/Pause & Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying((prev) => !prev);
                handleScreenTap();
              }}
              className="p-3 rounded-full bg-[#171717] hover:bg-[#262626] border border-[#262626] text-[#D4D4D4] cursor-pointer"
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
              onClick={handleBookmark}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#171717] hover:bg-[#262626] border border-[#262626] text-xs text-[#D4D4D4] cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{justBookmarked ? 'Bookmark Saved!' : 'Bookmark Timestamp'}</span>
            </button>
          </div>

          {onOpenMorningBridge && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenMorningBridge();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#D97706]/20 hover:bg-[#D97706]/35 border border-[#D97706]/60 text-xs font-semibold text-[#FDE68A] cursor-pointer"
            >
              <Sunrise className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Preview Morning Bridge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <p className="text-center text-[11px] text-[#525252] pt-1 font-mono">
          Tap anywhere on screen to reveal ultra-low brightness controls (auto-fades in 3s)
        </p>
      </div>
    </div>
  );
}
