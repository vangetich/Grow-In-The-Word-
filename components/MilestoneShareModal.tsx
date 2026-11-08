'use client';

import React, {useState, useRef} from 'react';
import {motion, AnimatePresence, PanInfo} from 'motion/react';
import {
  X,
  Download,
  Share2,
  Check,
  Sprout,
  Lock,
  Compass,
  Moon,
  Sparkles,
} from 'lucide-react';
import {useFocusTrap} from '@/lib/useFocusTrap';

export interface MilestoneShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStage: {
    id: string;
    name?: string;
    label?: string;
    ageHorizon?: string;
    description: string;
    stageNumber?: number;
    minPoints?: number;
    nextPoints?: number;
    minScore?: number;
    nextThreshold?: number;
  };
  growthPoints?: number;
  weeklyCompleted?: number;
  weeklyGoal?: number;
  engagementScore?: number;
  streakDays?: number;
}

interface MilestonePreset {
  id: string;
  tierStageId: string;
  badgeText: string;
  title: string;
  subtitle: string;
  scriptureQuote: string;
  scriptureRef: string;
  tierLabel: string;
  theme: 'cream' | 'charcoal' | 'sage';
}

const MILESTONE_PRESETS: MilestonePreset[] = [
  {
    id: 'tier-seed',
    tierStageId: 'seed',
    badgeText: 'GROWTH TIER · STAGE 01 (SEED)',
    title: 'Planted in Quiet Soil',
    subtitle:
      'Beginning a non-coercive, grace-first rhythm of family scripture and unhurried bedtime peace.',
    scriptureQuote:
      '“Consider how the wild flowers grow. They do not labor or spin.”',
    scriptureRef: 'Luke 12:27',
    tierLabel: 'Seed Tier · 0–24 Growth Points',
    theme: 'cream',
  },
  {
    id: 'tier-sprout',
    tierStageId: 'sprout',
    badgeText: 'GROWTH TIER · STAGE 02 (SPROUT)',
    title: 'First Roots Taking Hold',
    subtitle:
      'Transitioning from simple listening into curious historical discovery and nightly family reflection.',
    scriptureQuote:
      '“He is like a tree planted by streams of water, which yields its fruit in season.”',
    scriptureRef: 'Psalm 1:3',
    tierLabel: 'Sprout Tier · 25–49 Growth Points',
    theme: 'sage',
  },
  {
    id: 'tier-sapling',
    tierStageId: 'sapling',
    badgeText: 'GROWTH TIER · STAGE 03 (SAPLING)',
    title: 'From Sprout to Sapling',
    subtitle:
      'Connecting ancient Near Eastern history, Hebrew root words, and lived resilience across generations.',
    scriptureQuote:
      '“Ask for the ancient paths, ask where the good way is, and walk in it, and you will find rest for your souls.”',
    scriptureRef: 'Jeremiah 6:16',
    tierLabel: 'Sapling Tier · 50–79 Growth Points',
    theme: 'cream',
  },
  {
    id: 'tier-tree',
    tierStageId: 'tree',
    badgeText: 'GROWTH TIER · STAGE 04 (DEEP-ROOTED TREE)',
    title: 'Deep Roots in Ancient Soil',
    subtitle:
      'Sustained engagement across acoustic sanctuary stories, archaeological case files, and honest lament.',
    scriptureQuote:
      '“They will be called oaks of righteousness, a planting of the Lord for the display of His splendor.”',
    scriptureRef: 'Isaiah 61:3',
    tierLabel: 'Tree Tier · 80–99 Growth Points',
    theme: 'sage',
  },
  {
    id: 'tier-canopy',
    tierStageId: 'canopy',
    badgeText: 'GROWTH TIER · STAGE 05 (FLOURISHING CANOPY)',
    title: 'A Shelter Across Generations',
    subtitle:
      'Fifteen years of adaptive biblical literacy—from childhood rest to unshakeable, autonomous faith.',
    scriptureQuote:
      '“From one generation to the next they will commend Your works; they willoka tell of Your mighty acts.”',
    scriptureRef: 'Psalm 145:4',
    tierLabel: 'Canopy Tier · 100+ Growth Points',
    theme: 'charcoal',
  },
  {
    id: '12-to-13-harbor',
    tierStageId: 'harbor',
    badgeText: 'INDEPENDENCE MILESTONE · AGE 13',
    title: 'Stepping Into the Safe Harbor',
    subtitle:
      'Crossing from guided childhood discovery into a 100% private, zero-knowledge sanctuary for authentic faith.',
    scriptureQuote:
      '“Your name shall no longer be called Jacob, but Israel, for you have striven with God and with men, and have prevailed.”',
    scriptureRef: 'Genesis 32:28',
    tierLabel: 'Tier 03 · Teen Safe Harbor (Ages 13–18)',
    theme: 'charcoal',
  },
];

// Fix typo in Psalm 145:4 quote cleanly
MILESTONE_PRESETS[4].scriptureQuote =
  '“One generation commends Your works to another; they tell of Your mighty acts.”';

const STAGE_ORDER = ['seed', 'sprout', 'sapling', 'tree', 'canopy'];

export default function MilestoneShareModal({
  isOpen,
  onClose,
  currentStage,
  growthPoints,
  weeklyCompleted,
  engagementScore,
  streakDays,
}: MilestoneShareModalProps) {
  const modalFocusTrapRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);
  const stageDisplayName =
    currentStage.name || currentStage.label || 'Young Olive Sapling';
  const pointsDisplay = growthPoints ?? engagementScore ?? 58;
  const rhythmDisplay = weeklyCompleted ?? streakDays ?? 5;

  const matchingPresetForStage =
    MILESTONE_PRESETS.find((p) => p.tierStageId === currentStage.id) ||
    MILESTONE_PRESETS[2];

  const [customPresetId, setCustomPresetId] = useState<string | null>(null);
  const [familySignature, setFamilySignature] = useState<string>(
    'The Miller Family Sanctuary'
  );
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadedSuccess, setDownloadedSuccess] = useState<boolean>(false);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const selectedPresetId = customPresetId ?? matchingPresetForStage.id;
  const setSelectedPresetId = (id: string | null) => setCustomPresetId(id);

  const activePreset =
    MILESTONE_PRESETS.find((p) => p.id === selectedPresetId) ||
    matchingPresetForStage;

  const activeStageIndex = Math.max(
    0,
    STAGE_ORDER.indexOf(
      activePreset.tierStageId === 'harbor'
        ? currentStage.id
        : activePreset.tierStageId
    )
  );

  // Word-wrapping helper for HTML5 2D Canvas
  const drawWrappedText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ): number => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
    return currentY + lineHeight;
  };

  const handleDownloadSocialImage = () => {
    setIsDownloading(true);
    try {
      const canvas = canvasRef.current || document.createElement('canvas');
      // 1080 x 1350 (4:5 Portrait Instagram / Social Milestone Card)
      canvas.width = 1080;
      canvas.height = 1350;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Background Fill
      const bgColors = {
        cream: '#F9F6F0',
        charcoal: '#1A1A1A',
        sage: '#243028',
      };
      const textPrimary = {
        cream: '#1A1A1A',
        charcoal: '#F9F6F0',
        sage: '#F9F6F0',
      };
      const textSecondary = {
        cream: '#57534E',
        charcoal: '#A8A29E',
        sage: '#CBD5E1',
      };
      const accentColor = '#D97706';

      ctx.fillStyle = bgColors[activePreset.theme];
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Subtle Editorial Frame Border
      ctx.strokeStyle =
        activePreset.theme === 'cream'
          ? '#E5DEC9'
          : 'rgba(249, 246, 240, 0.14)';
      ctx.lineWidth = 3;
      ctx.strokeRect(56, 56, canvas.width - 112, canvas.height - 112);

      // 3. Soft Ambient Corner Glow + Botanical Geometric Emblem
      const grad = ctx.createRadialGradient(900, 220, 20, 900, 220, 380);
      grad.addColorStop(0, 'rgba(217, 119, 6, 0.20)');
      grad.addColorStop(1, 'rgba(217, 119, 6, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Concentric Botanical Growth Rings in Top Right
      const ringCount = activeStageIndex + 2;
      for (let r = 1; r <= ringCount; r++) {
        ctx.beginPath();
        ctx.arc(880, 230, r * 28, 0, Math.PI * 2);
        ctx.strokeStyle =
          r === ringCount
            ? 'rgba(217, 119, 6, 0.45)'
            : 'rgba(217, 119, 6, 0.18)';
        ctx.lineWidth = r === ringCount ? 2.5 : 1.5;
        ctx.stroke();
      }

      // 4. Top Brand Header
      ctx.fillStyle = accentColor;
      ctx.font = '600 22px monospace';
      ctx.fillText('GROW IN THE WORD · SANCTUARY MILESTONE', 110, 145);

      ctx.fillStyle = textSecondary[activePreset.theme];
      ctx.font = '500 20px sans-serif';
      ctx.fillText(
        `CURRENT GROWTH TIER: ${stageDisplayName.toUpperCase()} (${pointsDisplay} PTS)`,
        110,
        185
      );

      // 5. Milestone Badge Pill
      ctx.fillStyle =
        activePreset.theme === 'cream'
          ? '#F2ECE1'
          : 'rgba(255, 255, 255, 0.07)';
      ctx.fillRect(110, 240, 560, 52);
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(110, 240, 560, 52);

      ctx.fillStyle = accentColor;
      ctx.font = '600 19px monospace';
      ctx.fillText(activePreset.badgeText, 134, 273);

      // 6. Main Serif Milestone Title
      ctx.fillStyle = textPrimary[activePreset.theme];
      ctx.font = '400 66px Georgia, serif';
      let nextY = drawWrappedText(
        ctx,
        activePreset.title,
        110,
        385,
        860,
        80
      );

      // 7. Subtitle
      ctx.fillStyle = textSecondary[activePreset.theme];
      ctx.font = '400 30px sans-serif';
      nextY = drawWrappedText(
        ctx,
        activePreset.subtitle,
        110,
        nextY + 24,
        840,
        46
      );

      // 8. Divider Line
      ctx.strokeStyle =
        activePreset.theme === 'cream'
          ? '#E5DEC9'
          : 'rgba(249, 246, 240, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(110, nextY + 36);
      ctx.lineTo(970, nextY + 36);
      ctx.stroke();

      // 9. Scripture Quote Box
      ctx.fillStyle = textPrimary[activePreset.theme];
      ctx.font = 'italic 36px Georgia, serif';
      const quoteEndY = drawWrappedText(
        ctx,
        activePreset.scriptureQuote,
        110,
        nextY + 108,
        840,
        54
      );

      ctx.fillStyle = accentColor;
      ctx.font = '600 23px monospace';
      ctx.fillText(`— ${activePreset.scriptureRef}`, 110, quoteEndY + 20);

      // 10. 5-Stage Evolution Progress Bar on Canvas
      const barY = 1045;
      ctx.fillStyle = textSecondary[activePreset.theme];
      ctx.font = '600 18px monospace';
      ctx.fillText('EVOLUTIONARY GROWTH TRAJECTORY', 110, barY - 20);

      STAGE_ORDER.forEach((stageKey, idx) => {
        const segX = 110 + idx * 172;
        const segW = 158;
        const isReached = idx <= activeStageIndex;
        ctx.fillStyle = isReached
          ? accentColor
          : activePreset.theme === 'cream'
          ? '#E5DEC9'
          : 'rgba(255,255,255,0.12)';
        ctx.fillRect(segX, barY, segW, 10);

        ctx.fillStyle = isReached
          ? textPrimary[activePreset.theme]
          : textSecondary[activePreset.theme];
        ctx.font = isReached ? '600 17px monospace' : '400 17px monospace';
        ctx.fillText(stageKey.toUpperCase(), segX, barY + 34);
      });

      // 11. Bottom Stats & Family Signature Footer
      const footerY = 1175;
      ctx.fillStyle =
        activePreset.theme === 'cream'
          ? '#F2ECE1'
          : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(110, footerY - 52, 860, 120);

      ctx.fillStyle = textPrimary[activePreset.theme];
      ctx.font = '600 25px sans-serif';
      ctx.fillText(
        familySignature || 'Grow In The Word Sanctuary',
        142,
        footerY - 2
      );

      ctx.fillStyle = textSecondary[activePreset.theme];
      ctx.font = '500 21px monospace';
      ctx.fillText(
        `${activePreset.tierLabel}  ·  ${pointsDisplay} Pts  ·  ${rhythmDisplay}-Day Rhythm`,
        142,
        footerY + 36
      );

      // Trigger PNG Download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `grow-in-the-word-${currentStage.id}-milestone.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadedSuccess(true);
      setTimeout(() => setDownloadedSuccess(false), 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyShareText = async () => {
    const shareSummary = `${activePreset.title} (${stageDisplayName} Tier · ${pointsDisplay} Growth Pts) — "${activePreset.scriptureQuote}" (${activePreset.scriptureRef}) · Shared from Grow In The Word`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareSummary);
      }
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    } catch {
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    }
  };

  const handleSwipeDismiss = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 90 || info.velocity.y > 420) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="milestone-share-title"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.22, ease: 'easeOut'}}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-2.5 py-3 sm:p-6 bg-[#1A1A1A]/80 backdrop-blur-md overflow-y-auto overflow-x-hidden w-full max-w-full"
        >
          <motion.div
            ref={modalFocusTrapRef}
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
            className="relative w-full max-w-4xl rounded-2xl bg-[#F9F6F0] text-[#1A1A1A] border border-[#E5DEC9] shadow-2xl overflow-hidden my-auto max-h-[92dvh] sm:max-h-[90dvh] flex flex-col touch-pan-y focus:outline-none"
          >
            {/* Mobile Swipe-to-Dismiss Handle Bar */}
            <div
              aria-hidden="true"
              className="sm:hidden flex flex-col items-center justify-center pt-2.5 pb-1 bg-[#F2ECE1] cursor-grab active:cursor-grabbing select-none shrink-0"
            >
              <div className="w-11 h-1.5 rounded-full bg-[#D6CEBF]" />
              <span className="text-[10px] font-mono text-[#78716C] mt-1">
                Swipe down to close
              </span>
            </div>

            {/* Top Bar */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#F2ECE1] border-b border-[#E5DEC9] flex items-center justify-between gap-3 sm:gap-4 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#D97706]/15 border border-[#D97706]/40 flex items-center justify-center text-[#92400E] shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#92400E] font-semibold">
                      Social-Ready Milestone Card Generator
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#4A5D4E]/15 text-[#4A5D4E] font-mono text-[10px] font-semibold">
                      Current Tier: {stageDisplayName}
                    </span>
                  </div>
                  <h2
                    id="milestone-share-title"
                    className="text-base sm:text-xl font-normal text-[#1A1A1A] truncate"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Share Your Family or Personal Growth Milestone
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close Milestone Share Generator"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl text-[#57534E] hover:text-[#1A1A1A] hover:bg-[#E5DEC9]/60 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 6 Columns: Live Framer Motion Branded Card Preview */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#57534E]">
                  <span className="font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Framer Motion Live Branded Card (4:5 Social Asset)</span>
                  </span>
                  <span className="font-mono text-[11px] text-[#92400E]">
                    1080 × 1350 PNG
                  </span>
                </div>

                {/* Framer Motion Animated Branded Card */}
                <motion.div
                  key={`${activePreset.id}-${activePreset.theme}`}
                  layout
                  initial={{opacity: 0.7, scale: 0.97, y: 6}}
                  animate={{opacity: 1, scale: 1, y: 0}}
                  whileHover={{scale: 1.01}}
                  transition={{type: 'spring', stiffness: 280, damping: 24}}
                  className={`relative rounded-2xl p-6 sm:p-7 border shadow-lg transition-colors overflow-hidden flex flex-col justify-between min-h-[430px] ${
                    activePreset.theme === 'cream'
                      ? 'bg-[#F9F6F0] text-[#1A1A1A] border-[#E5DEC9]'
                      : activePreset.theme === 'sage'
                      ? 'bg-[#243028] text-[#F9F6F0] border-[#3A4D3F]'
                      : 'bg-[#1A1A1A] text-[#F9F6F0] border-[#292524]'
                  }`}
                >
                  {/* Animated Ambient Glow + Geometric Botanical Emblem */}
                  <motion.div
                    aria-hidden="true"
                    animate={{
                      scale: [1, 1.08, 1],
                      opacity: [0.16, 0.26, 0.16],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="pointer-events-none absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#D97706]/25 blur-2xl"
                  />

                  {/* Top Card Header + Animated Botanical Tier Emblem */}
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[#D97706] font-semibold">
                          GROW IN THE WORD · SANCTUARY MILESTONE
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold border border-[#D97706]/50 bg-[#D97706]/10 text-[#D97706]">
                          {activePreset.id === '12-to-13-harbor' ? (
                            <Lock className="w-3 h-3" />
                          ) : activePreset.tierStageId === 'sapling' ? (
                            <Compass className="w-3 h-3" />
                          ) : activePreset.tierStageId === 'seed' ? (
                            <Moon className="w-3 h-3" />
                          ) : (
                            <Sprout className="w-3 h-3" />
                          )}
                          <span>{activePreset.badgeText}</span>
                        </div>
                      </div>

                      {/* Framer Motion SVG Botanical Growth Tier Emblem */}
                      <motion.div
                        initial={{rotate: -12, scale: 0.85}}
                        animate={{rotate: 0, scale: 1}}
                        transition={{type: 'spring', stiffness: 220, damping: 18}}
                        className="w-12 h-12 rounded-xl border border-[#D97706]/40 bg-[#D97706]/10 flex items-center justify-center shrink-0"
                        title={`Growth Tier Emblem: ${stageDisplayName}`}
                      >
                        <motion.svg
                          viewBox="0 0 48 48"
                          className="w-8 h-8"
                          fill="none"
                        >
                          {/* Concentric Growth Rings matching tier level */}
                          <motion.circle
                            cx="24"
                            cy="24"
                            r="19"
                            stroke="#D97706"
                            strokeWidth="1.2"
                            strokeDasharray="3 3"
                            animate={{rotate: 360}}
                            transition={{
                              duration: 24,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          />
                          <motion.circle
                            cx="24"
                            cy="24"
                            r="13"
                            stroke="#D97706"
                            strokeWidth="1.5"
                            initial={{pathLength: 0}}
                            animate={{pathLength: 1}}
                            transition={{duration: 0.9, ease: 'easeOut'}}
                          />
                          {/* Botanical Stem & Leaves */}
                          <motion.path
                            d="M24 33V17M24 23C24 19 18 17 16 20C16 23 20 25 24 23ZM24 26C24 22 30 20 32 23C32 26 28 28 24 26Z"
                            stroke="#D97706"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{pathLength: 0}}
                            animate={{pathLength: 1}}
                            transition={{duration: 0.8, delay: 0.15}}
                          />
                        </motion.svg>
                      </motion.div>
                    </div>

                    <motion.h3
                      initial={{opacity: 0, y: 6}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.25, delay: 0.05}}
                      className="text-2xl sm:text-3xl font-normal leading-tight pt-1"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      {activePreset.title}
                    </motion.h3>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        activePreset.theme === 'cream'
                          ? 'text-[#57534E]'
                          : 'text-[#D6D3D1]'
                      }`}
                    >
                      {activePreset.subtitle}
                    </p>
                  </div>

                  {/* Middle Quote & Tier Trajectory Bar */}
                  <div className="my-5 pt-4 border-t border-current/15 space-y-3 relative z-10">
                    <blockquote
                      className="text-sm sm:text-base italic leading-relaxed"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      {activePreset.scriptureQuote}
                    </blockquote>
                    <div className="text-[11px] font-mono text-[#D97706] font-semibold">
                      — {activePreset.scriptureRef}
                    </div>

                    {/* 5-Stage Evolution Progress Indicator */}
                    <div className="pt-2 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider opacity-75">
                        <span>Growth Tier Trajectory</span>
                        <span className="text-[#D97706] font-semibold">
                          Stage {activeStageIndex + 1} of 5 · {stageDisplayName}
                        </span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {STAGE_ORDER.map((stageKey, idx) => {
                          const reached = idx <= activeStageIndex;
                          return (
                            <div key={stageKey} className="space-y-1">
                              <motion.div
                                initial={{scaleX: 0}}
                                animate={{scaleX: 1}}
                                transition={{
                                  duration: 0.35,
                                  delay: idx * 0.06,
                                }}
                                className={`h-1.5 rounded-full origin-left ${
                                  reached
                                    ? 'bg-[#D97706]'
                                    : 'bg-current/15'
                                }`}
                              />
                              <div
                                className={`text-[9px] font-mono uppercase text-center ${
                                  reached
                                    ? 'text-[#D97706] font-semibold'
                                    : 'opacity-50'
                                }`}
                              >
                                {stageKey}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div
                    className={`p-3.5 rounded-xl border border-current/10 flex items-center justify-between gap-2 text-xs relative z-10 ${
                      activePreset.theme === 'cream'
                        ? 'bg-[#F2ECE1]'
                        : 'bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">
                        {familySignature || 'Grow In The Word Sanctuary'}
                      </div>
                      <div className="text-[11px] font-mono opacity-75">
                        {activePreset.tierLabel}
                      </div>
                    </div>
                    <div className="text-right font-mono text-[11px] text-[#D97706] font-semibold shrink-0">
                      <div>{pointsDisplay} Pts</div>
                      <div>{rhythmDisplay}-Day Rhythm</div>
                    </div>
                  </div>
                </motion.div>

                {/* Hidden high-res canvas for PNG generation */}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Right 6 Columns: Customization & Export Controls */}
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                      1. Select Growth Tier or Life-Stage Milestone
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPresetId(matchingPresetForStage.id)
                      }
                      className="text-[11px] font-mono text-[#92400E] hover:underline cursor-pointer"
                    >
                      Reset to Current Tier ({stageDisplayName})
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {MILESTONE_PRESETS.map((preset) => {
                      const active = preset.id === selectedPresetId;
                      const isUserCurrentStage =
                        preset.tierStageId === currentStage.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setSelectedPresetId(preset.id)}
                          className={`w-full min-h-[44px] text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                            active
                              ? 'bg-[#1A1A1A] text-[#F9F6F0] border-[#1A1A1A] shadow-xs'
                              : 'bg-white text-[#1A1A1A] border-[#E5DEC9] hover:bg-[#F2ECE1]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 w-full">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#D97706] font-semibold truncate">
                              {preset.tierStageId.toUpperCase()}
                            </span>
                            {isUserCurrentStage && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#D97706]/20 text-[#D97706] font-semibold shrink-0">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-semibold truncate">
                            {preset.title}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Family or Personal Signature Input */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="milestone-signature-input"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#57534E]"
                  >
                    2. Personalize Card Footer Signature
                  </label>
                  <input
                    id="milestone-signature-input"
                    type="text"
                    maxLength={42}
                    value={familySignature}
                    onChange={(e) => setFamilySignature(e.target.value)}
                    placeholder="e.g., The Miller Family Sanctuary"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white border border-[#D6CEBF] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                  <p className="text-[11px] text-[#57534E]">
                    Zero private journal contents or child personal data are ever
                    included on shared milestone cards.
                  </p>
                </div>

                {/* Export Actions */}
                <div className="pt-2 space-y-2.5">
                  <button
                    type="button"
                    onClick={handleDownloadSocialImage}
                    disabled={isDownloading}
                    className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-[#1A1A1A] font-semibold text-xs transition-colors cursor-pointer shadow-sm"
                  >
                    {downloadedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Downloaded High-Res PNG Card (1080×1350)</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>
                          {isDownloading
                            ? 'Generating PNG Asset...'
                            : `Download ${stageDisplayName} Tier Card (PNG)`}
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyShareText}
                    className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F2ECE1] hover:bg-[#E5DEC9] text-[#1A1A1A] border border-[#D6CEBF] font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {copiedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-[#4A5D4E]" />
                        <span>Copied Milestone Summary to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-[#92400E]" />
                        <span>Copy Milestone Reflection Text</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
