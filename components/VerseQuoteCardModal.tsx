'use client';

import React, {useState, useRef} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  Share2,
  Download,
  Copy,
  Check,
  X,
  Sparkles,
  MessageCircle,
  Image as ImageIcon,
  Palette,
  ExternalLink,
} from 'lucide-react';
import {
  HighlightedVerse,
  HIGHLIGHT_COLORS,
} from '@/components/FullPageBibleReader';

interface VerseQuoteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  verse: HighlightedVerse | null;
  onEngage?: (points: number, label: string) => void;
}

export type QuoteCardBgTheme =
  | 'galilee-night'
  | 'judean-dawn'
  | 'olive-grove'
  | 'ancient-parchment';

interface QuoteCardThemeMeta {
  id: QuoteCardBgTheme;
  name: string;
  subtitle: string;
  gradientClass: string;
  canvasBg: [string, string]; // Top & bottom gradient colors for canvas
  textColor: string;
  accentColor: string;
  cardBorder: string;
  patternType: 'stars' | 'rays' | 'leaves' | 'texture';
}

const CARD_THEMES: Record<QuoteCardBgTheme, QuoteCardThemeMeta> = {
  'galilee-night': {
    id: 'galilee-night',
    name: 'Galilee Night',
    subtitle: 'Deep indigo, starry sky & quiet waters',
    gradientClass: 'from-[#0B1329] via-[#111C3D] to-[#1E1B4B]',
    canvasBg: ['#0B1329', '#1E1B4B'],
    textColor: '#FAF7F2',
    accentColor: '#FBBF24',
    cardBorder: 'border-[#38BDF8]/40',
    patternType: 'stars',
  },
  'judean-dawn': {
    id: 'judean-dawn',
    name: 'Judean Dawn',
    subtitle: 'Soft amber hills and morning light',
    gradientClass: 'from-[#291809] via-[#451A03] to-[#78350F]',
    canvasBg: ['#291809', '#78350F'],
    textColor: '#FFFBEB',
    accentColor: '#F59E0B',
    cardBorder: 'border-[#D97706]/50',
    patternType: 'rays',
  },
  'olive-grove': {
    id: 'olive-grove',
    name: 'Ancient Olive Grove',
    subtitle: 'Muted olive sanctuary and golden branches',
    gradientClass: 'from-[#0F1E17] via-[#1A2E24] to-[#2D3E33]',
    canvasBg: ['#0F1E17', '#2D3E33'],
    textColor: '#F0FDF4',
    accentColor: '#34D399',
    cardBorder: 'border-[#059669]/40',
    patternType: 'leaves',
  },
  'ancient-parchment': {
    id: 'ancient-parchment',
    name: 'Ancient Parchment',
    subtitle: 'Warm weathered stone and papyrus grain',
    gradientClass: 'from-[#24201C] via-[#332C26] to-[#1C1815]',
    canvasBg: ['#24201C', '#1C1815'],
    textColor: '#FAF7F2',
    accentColor: '#D97706',
    cardBorder: 'border-[#D97706]/60',
    patternType: 'texture',
  },
};

export default function VerseQuoteCardModal({
  isOpen,
  onClose,
  verse,
  onEngage,
}: VerseQuoteCardModalProps) {
  const [selectedTheme, setSelectedTheme] =
    useState<QuoteCardBgTheme>('galilee-night');
  const [copiedText, setCopiedText] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!isOpen || !verse) return null;

  const activeThemeMeta = CARD_THEMES[selectedTheme];
  const highlightMeta = HIGHLIGHT_COLORS[verse.color];

  // Formatted share text for WhatsApp & Clipboard
  const shareText = `“${verse.text}”\n— ${verse.bookName} ${verse.chapter}:${verse.verse} (${verse.version})\n\nGrow In The Word · A Decade-Spanning Scripture Companion (Ages 3–18)\nhttps://growintheword.app/bible-reader`;

  // WhatsApp Direct Share
  const handleShareToWhatsApp = () => {
    const encoded = encodeURIComponent(shareText);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
    onEngage?.(
      15,
      `Shared Scripture Quote Card to WhatsApp (${verse.bookName} ${verse.chapter}:${verse.verse})`
    );
  };

  // Copy Quote Text to Clipboard
  const handleCopyText = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2200);
      onEngage?.(
        5,
        `Copied Verse Quote (${verse.bookName} ${verse.chapter}:${verse.verse})`
      );
    }
  };

  // Render & Download Image Card using Canvas
  const handleDownloadCardImage = () => {
    setIsExportingImage(true);
    const canvas = document.createElement('canvas');
    const width = 1200;
    const height = 675; // Standard 16:9 social share card ratio
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setIsExportingImage(false);
      return;
    }

    // 1. Draw Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, activeThemeMeta.canvasBg[0]);
    gradient.addColorStop(1, activeThemeMeta.canvasBg[1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Decorative Pattern Elements
    ctx.save();
    if (activeThemeMeta.patternType === 'stars') {
      // Starry night speckles
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < 75; i++) {
        const x = (i * 137.5) % width;
        const y = (i * 269.3) % height;
        const r = (i % 3) * 0.8 + 0.6;
        ctx.globalAlpha = ((i % 5) + 3) / 10;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (activeThemeMeta.patternType === 'rays') {
      // Soft radial glow
      const radial = ctx.createRadialGradient(
        width / 2,
        height / 4,
        50,
        width / 2,
        height / 4,
        450
      );
      radial.addColorStop(0, 'rgba(245, 158, 11, 0.25)');
      radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);
    } else {
      // Soft ambient vignette
      const radial = ctx.createRadialGradient(
        width / 2,
        height / 2,
        100,
        width / 2,
        height / 2,
        500
      );
      radial.addColorStop(0, 'rgba(217, 119, 6, 0.15)');
      radial.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);
    }
    ctx.restore();

    // 3. Card Inner Border
    ctx.save();
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.45)';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, width - 80, height - 80);
    ctx.restore();

    // 4. Header: Grow In The Word watermark & Category
    ctx.save();
    ctx.fillStyle = activeThemeMeta.accentColor;
    ctx.font = 'bold 20px monospace';
    ctx.fillText('GROW IN THE WORD · SCRIPTURE SANCTUARY', 80, 100);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.font = '16px sans-serif';
    ctx.fillText(
      `HIGHLIGHT: ${highlightMeta.label.toUpperCase()}`,
      width - 320,
      100
    );
    ctx.restore();

    // 5. Verse Quote Text (Word Wrap)
    ctx.save();
    ctx.fillStyle = activeThemeMeta.textColor;
    ctx.font = 'italic 34px serif';
    ctx.textBaseline = 'top';

    const words = `“${verse.text}”`.split(' ');
    let line = '';
    let y = 180;
    const maxWidth = width - 180;
    const lineHeight = 52;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, 90, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 90, y);
    ctx.restore();

    // 6. Scripture Reference & Translation Tag
    ctx.save();
    ctx.fillStyle = activeThemeMeta.accentColor;
    ctx.font = 'bold 26px serif';
    ctx.fillText(
      `— ${verse.bookName} ${verse.chapter}:${verse.verse} (${verse.version})`,
      90,
      y + 70
    );

    // 7. Footer Tagline
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '16px monospace';
    ctx.fillText(
      'An unhurried space for ancient history & real life · Ages 3 to 18',
      90,
      height - 70
    );
    ctx.restore();

    // 8. Convert to PNG & Trigger Download
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `GrowInTheWord_${verse.bookName}_${verse.chapter}_${verse.verse}_QuoteCard.png`;
      link.href = dataUrl;
      link.click();

      onEngage?.(
        20,
        `Downloaded High-Res Scripture Quote Card (${verse.bookName} ${verse.chapter}:${verse.verse})`
      );
    } catch {
      // Fallback
    } finally {
      setIsExportingImage(false);
    }
  };

  // Native Web Share API if supported
  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${verse.bookName} ${verse.chapter}:${verse.verse} Quote Card`,
          text: shareText,
          url: 'https://growintheword.app/bible-reader',
        });
        onEngage?.(
          15,
          `Shared Verse Quote Card (${verse.bookName} ${verse.chapter}:${verse.verse})`
        );
      } catch {
        // User cancelled or unsupported
      }
    } else {
      handleShareToWhatsApp();
    }
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-card-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{opacity: 0, scale: 0.94, y: 16}}
          animate={{opacity: 1, scale: 1, y: 0}}
          exit={{opacity: 0, scale: 0.94, y: 16}}
          transition={{type: 'spring', stiffness: 360, damping: 28}}
          className="relative w-full max-w-2xl rounded-3xl bg-[#1C1917] text-[#FAF7F2] border border-[#D97706]/70 shadow-2xl p-5 sm:p-7 space-y-6 my-auto"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between pb-3.5 border-b border-[#2E2925]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#292524] border border-[#D97706] flex items-center justify-center text-[#D97706] shadow-xs">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#FBBF24]">
                  <span>Scripture Quote Card</span>
                  <span aria-hidden="true">·</span>
                  <span>WhatsApp &amp; Image Export</span>
                </div>
                <h3
                  id="quote-card-modal-title"
                  className="text-lg sm:text-xl font-normal text-[#FAF7F2]"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  {verse.bookName} {verse.chapter}:{verse.verse}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close quote card modal"
              className="w-8 h-8 rounded-full bg-[#292524] hover:bg-[#36312E] text-[#A8A29E] hover:text-[#FAF7F2] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* BACKGROUND THEME SELECTOR */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#A8A29E]">
              <span className="flex items-center gap-1.5 font-medium text-[#FAF7F2]">
                <Palette className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Card Image Background:</span>
              </span>
              <span className="text-[11px] font-mono text-[#FBBF24]">
                {activeThemeMeta.name}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                Object.keys(CARD_THEMES) as QuoteCardBgTheme[]
              ).map((themeKey) => {
                const theme = CARD_THEMES[themeKey];
                const isSelected = selectedTheme === themeKey;
                return (
                  <button
                    key={themeKey}
                    type="button"
                    onClick={() => setSelectedTheme(themeKey)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                      isSelected
                        ? 'border-[#D97706] bg-[#292524] ring-2 ring-[#D97706]/40 shadow-xs'
                        : 'border-[#36312E] bg-[#141210] hover:border-[#D97706]/50'
                    }`}
                  >
                    <div
                      className={`h-6 rounded-lg bg-gradient-to-r ${theme.gradientClass} border border-white/10`}
                    />
                    <div className="text-xs font-semibold text-[#FAF7F2] truncate">
                      {theme.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* VISUAL QUOTE CARD PREVIEW (WYSIWYG) */}
          <div
            className={`relative rounded-2xl bg-gradient-to-br ${activeThemeMeta.gradientClass} border ${activeThemeMeta.cardBorder} p-6 sm:p-8 shadow-2xl space-y-5 overflow-hidden transition-all duration-300`}
          >
            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between text-[11px] font-mono">
              <span
                className="font-bold tracking-wider uppercase text-xs"
                style={{color: activeThemeMeta.accentColor}}
              >
                Grow In The Word
              </span>
              <span className="px-2 py-0.5 rounded-full bg-black/40 text-white/80 border border-white/10 text-[10px]">
                {highlightMeta.label}
              </span>
            </div>

            <blockquote
              className="text-lg sm:text-2xl font-normal leading-relaxed italic"
              style={{
                fontFamily: 'var(--font-display), serif',
                color: activeThemeMeta.textColor,
              }}
            >
              “{verse.text}”
            </blockquote>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/15 text-xs">
              <span
                className="font-semibold text-sm"
                style={{color: activeThemeMeta.accentColor}}
              >
                — {verse.bookName} {verse.chapter}:{verse.verse} ({verse.version})
              </span>
              <span className="text-[11px] text-white/60 font-mono">
                growintheword.app
              </span>
            </div>
          </div>

          {/* SHARE & EXPORT ACTION BUTTONS */}
          <div className="space-y-3 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* WhatsApp Share Button */}
              <button
                type="button"
                onClick={handleShareToWhatsApp}
                className="min-h-[46px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-[#121B22] font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Share to WhatsApp</span>
              </button>

              {/* Download Image Card */}
              <button
                type="button"
                onClick={handleDownloadCardImage}
                disabled={isExportingImage}
                className="min-h-[46px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#F59E0B] text-[#1A1A1A] font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>{isExportingImage ? 'Generating...' : 'Save Card Image'}</span>
              </button>

              {/* Copy Formatted Text */}
              <button
                type="button"
                onClick={handleCopyText}
                className="min-h-[46px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#292524] hover:bg-[#36312E] text-[#FAF7F2] border border-[#44403C] font-semibold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                {copiedText ? (
                  <>
                    <Check className="w-4 h-4 text-[#A7F3D0]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#D97706]" />
                    <span>Copy Quote Text</span>
                  </>
                )}
              </button>
            </div>

            {/* Native Mobile Share fallback if available */}
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full py-2 text-xs text-[#FBBF24] hover:underline flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Open System Share Menu (Messages, Email, Social)</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
