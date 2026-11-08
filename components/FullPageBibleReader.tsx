'use client';

import React, {useState, useMemo, useEffect, useRef, useCallback} from 'react';
import Link from 'next/link';
import {motion, AnimatePresence} from 'motion/react';
import {
  BookOpen,
  Columns3,
  FileText,
  AlignLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  SlidersHorizontal,
  Search,
  Copy,
  Check,
  Sparkles,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  X,
  ArrowLeft,
  Clock,
  Globe,
  BookmarkCheck,
  Layers,
  CheckCircle2,
  Type,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Highlighter,
  Trash2,
  Link2,
  Share2,
} from 'lucide-react';
import VerseQuoteCardModal from '@/components/VerseQuoteCardModal';
import {
  FULL_BIBLE_CHAPTERS,
  FULL_BIBLE_VERSIONS,
  BIBLE_CANON_BOOKS,
  TOTAL_BIBLE_CHAPTERS,
  resolveBibleChapterPage,
  FullBibleChapter,
  BibleCanonBook,
  BibleVersionId,
} from '@/lib/full-bible-data';

export type HighlightColor = 'amber' | 'sage' | 'rose' | 'sky';

export interface HighlightColorMeta {
  id: HighlightColor;
  label: string;
  dotColor: string;
  lightBg: string;
  darkBg: string;
  borderCol: string;
  badgeBg: string;
}

export const HIGHLIGHT_COLORS: Record<HighlightColor, HighlightColorMeta> = {
  amber: {
    id: 'amber',
    label: 'Amber Glow',
    dotColor: '#D97706',
    lightBg: 'bg-[#FEF3C7] text-[#92400E]',
    darkBg: 'dark:bg-[#78350F]/50 dark:text-[#FDE68A]',
    borderCol: 'border-[#D97706]',
    badgeBg: 'bg-[#FDE68A] text-[#78350F]',
  },
  sage: {
    id: 'sage',
    label: 'Olive Sage',
    dotColor: '#059669',
    lightBg: 'bg-[#D1FAE5] text-[#065F46]',
    darkBg: 'dark:bg-[#064E3B]/50 dark:text-[#A7F3D0]',
    borderCol: 'border-[#059669]',
    badgeBg: 'bg-[#A7F3D0] text-[#064E3B]',
  },
  rose: {
    id: 'rose',
    label: 'Dawn Rose',
    dotColor: '#E11D48',
    lightBg: 'bg-[#FFE4E6] text-[#9F1239]',
    darkBg: 'dark:bg-[#881337]/50 dark:text-[#FECDD3]',
    borderCol: 'border-[#E11D48]',
    badgeBg: 'bg-[#FECDD3] text-[#881337]',
  },
  sky: {
    id: 'sky',
    label: 'Still Waters Sky',
    dotColor: '#0284C7',
    lightBg: 'bg-[#E0F2FE] text-[#075985]',
    darkBg: 'dark:bg-[#0C4A6E]/50 dark:text-[#BAE6FD]',
    borderCol: 'border-[#0284C7]',
    badgeBg: 'bg-[#BAE6FD] text-[#0C4A6E]',
  },
};

export interface HighlightedVerse {
  id: string; // e.g. "psalms-23-1"
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  version: BibleVersionId;
  text: string;
  color: HighlightColor;
  createdAt: number;
  note?: string;
  noteType?: 'reflection' | 'question' | 'prayer';
  updatedAt?: number;
}

export type FontSizeOptionId = 'small' | 'medium' | 'large' | 'xlarge';

export interface FontSizeOptionMeta {
  id: FontSizeOptionId;
  label: string;
  shortLabel: string;
  sizeClass: string;
  pxHint: string;
}

export const FONT_SIZE_OPTIONS: FontSizeOptionMeta[] = [
  {
    id: 'small',
    label: 'Small',
    shortLabel: 'Small',
    sizeClass: 'text-[15.5px]',
    pxHint: '15.5px · Compact Study',
  },
  {
    id: 'medium',
    label: 'Medium',
    shortLabel: 'Medium',
    sizeClass: 'text-[18px]',
    pxHint: '18px · Balanced Reading',
  },
  {
    id: 'large',
    label: 'Large',
    shortLabel: 'Large',
    sizeClass: 'text-[20.5px]',
    pxHint: '20.5px · Editorial Print',
  },
  {
    id: 'xlarge',
    label: 'Extra Large',
    shortLabel: 'Extra Large',
    sizeClass: 'text-[24px]',
    pxHint: '24px · High Accessibility',
  },
];

export interface AudioTimestampBookmark {
  key: string;
  bookId: string;
  bookName: string;
  chapterNumber: number;
  version: BibleVersionId;
  verseNumber: number;
  timestampSeconds: number;
  timestampLabel: string;
  updatedAt: number;
}

export const AUDIO_BOOKMARKS_STORAGE_KEY = 'grow_in_the_word_audio_bookmarks_v1';

export const CHAPTER_CROSS_REFERENCES: Record<
  string,
  Record<number, {reference: string; text: string; theme: string}>
> = {
  'psalms-23': {
    1: {
      reference: 'Ezekiel 34:11-12',
      text: 'Behold, I Myself will search for My sheep and seek them out, as a shepherd cares for his herd...',
      theme: 'Covenant Shepherd',
    },
    2: {
      reference: 'Psalm 42:1-2',
      text: 'As the deer pants for the water brooks, so my soul pants for You, O God.',
      theme: 'Rest & Quiet Waters',
    },
    3: {
      reference: 'Deuteronomy 30:6',
      text: 'Moreover the LORD your God will circumcise your heart and the heart of your descendants...',
      theme: 'Soul Restoration',
    },
    4: {
      reference: 'Job 38:17',
      text: 'Have the gates of death been revealed to you, or have you seen the gates of deep darkness?',
      theme: 'Shadow of Death',
    },
    5: {
      reference: 'Psalm 78:19',
      text: 'Then they spoke against God; they said, “Can God prepare a table in the wilderness?”',
      theme: 'Table in Presence of Enemies',
    },
    6: {
      reference: 'Philippians 1:6',
      text: 'For I am confident of this very thing, that He who began a good work in you will perfect it...',
      theme: 'Chesed & Eternal Dwelling',
    },
  },
  'john-1': {
    1: {
      reference: 'Genesis 1:1',
      text: 'In the beginning God created the heavens and the earth.',
      theme: 'Eternal Creation Logos',
    },
    3: {
      reference: 'Colossians 1:16',
      text: 'For by Him all things were created, both in the heavens and on earth...',
      theme: 'Creation through the Word',
    },
    4: {
      reference: 'John 8:12',
      text: 'I am the Light of the world; he who follows Me will not walk in the darkness...',
      theme: 'Life & Light',
    },
    5: {
      reference: 'Isaiah 9:2',
      text: 'The people who walked in darkness have seen a great light...',
      theme: 'Unconquered Light',
    },
  },
  'genesis-1': {
    1: {
      reference: 'John 1:1-3',
      text: 'In the beginning was the Word, and the Word was with God, and the Word was God...',
      theme: 'Divine Beginning',
    },
    2: {
      reference: 'Isaiah 45:18',
      text: 'For thus says the LORD, who created the heavens (He is the God who formed the earth)...',
      theme: 'Formless & Void',
    },
    3: {
      reference: '2 Corinthians 4:6',
      text: 'For God, who said, “Light shall shine out of darkness,” is the One who has shone in our hearts...',
      theme: 'Let There Be Light',
    },
  },
};

export interface FullPageBibleReaderProps {
  initialChapterId?: string;
  initialVersion?: BibleVersionId;
  initialParallelVersions?: BibleVersionId[];
  initialLayoutMode?: 'page' | 'all-chapters' | 'verse' | 'parallel';
  isNightSanctuary?: boolean;
  onToggleNightSanctuary?: () => void;
  onCloseOverlay?: () => void;
  isOverlay?: boolean;
  onEngageContent?: (points: number, label: string) => void;
}

const FULL_READER_STORAGE_KEY = 'grow_in_the_word_full_page_reader_v1';
export const CHAPTERS_READ_STORAGE_KEY = 'grow_in_the_word_chapters_read_v1';
export const HIGHLIGHTS_STORAGE_KEY = 'grow_in_the_word_highlighted_verses_v1';
export const READING_DURATION_STORAGE_KEY =
  'grow_in_the_word_reading_duration_goals_v1';

function getDurationPeriodKey(cadence: 'daily' | 'weekly'): string {
  const now = new Date();
  if (cadence === 'daily') {
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const pastDaysOfYear = (now.getTime() - startOfYear.getTime()) / 86400000;
  const weekNum = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${weekNum}`;
}

export default function FullPageBibleReader({
  initialChapterId = 'psalm-23',
  initialVersion = 'AMP',
  initialParallelVersions = ['NASB', 'AMP', 'NLT'],
  initialLayoutMode = 'page',
  isNightSanctuary = false,
  onToggleNightSanctuary,
  onCloseOverlay,
  isOverlay = false,
  onEngageContent,
}: FullPageBibleReaderProps) {
  const initialResolved = useMemo(
    () => resolveBibleChapterPage(initialChapterId),
    [initialChapterId]
  );

  const [selectedBookId, setSelectedBookId] = useState<string>(() => {
    const matchedBook = BIBLE_CANON_BOOKS.find(
      (b) =>
        b.name.toLowerCase() === initialResolved.book.toLowerCase() ||
        (b.id === 'psalms' && initialResolved.book.toLowerCase() === 'psalm')
    );
    return matchedBook ? matchedBook.id : 'psalms';
  });

  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number>(
    initialResolved.chapter || 23
  );

  const [activeVersion, setActiveVersion] =
    useState<BibleVersionId>(initialVersion);
  const [parallelVersions, setParallelVersions] = useState<BibleVersionId[]>(
    initialParallelVersions
  );
  const [layoutMode, setLayoutMode] = useState<
    'page' | 'all-chapters' | 'verse' | 'parallel'
  >(initialLayoutMode);
  const [selectedVerseNumber, setSelectedVerseNumber] = useState<number | null>(
    1
  );
  const [showAllVersionsInspector, setShowAllVersionsInspector] =
    useState<boolean>(true);

  // Accessible Font-Size Control Dropdown State (Small, Medium, Large, Extra Large)
  const [fontSize, setFontSize] = useState<FontSizeOptionId>('medium');
  const [isFontSizeDropdownOpen, setIsFontSizeDropdownOpen] =
    useState<boolean>(false);
  const fontSizeDropdownRef = useRef<HTMLDivElement>(null);

  const [lineSpacing, setLineSpacing] = useState<
    'snug' | 'relaxed' | 'contemplative'
  >('relaxed');
  const [pageWidth, setPageWidth] = useState<'book' | 'wide' | 'full'>('book');
  const [showSettingsBar, setShowSettingsBar] = useState<boolean>(false);
  const [isZenImmersion, setIsZenImmersion] = useState<boolean>(false);

  // Chapter Browser & Search State
  const [testamentFilter, setTestamentFilter] = useState<
    'all' | 'Old Testament' | 'New Testament'
  >('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isBookDrawerOpen, setIsBookDrawerOpen] = useState<boolean>(false);
  const [copiedVerseKey, setCopiedVerseKey] = useState<string | null>(null);

  // Chapters Read Progress State (persisted in localStorage)
  const [chaptersReadMap, setChaptersReadMap] = useState<
    Record<string, boolean>
  >({
    'genesis-1': true,
    'psalms-1': true,
    'psalms-23': true,
    'john-1': true,
  });

  // Optional fetched full-chapter verses cache for non-curated chapters
  const [fetchedChapterVerses, setFetchedChapterVerses] = useState<
    Record<string, {verse: number; text: string}[]>
  >({});

  // Audio Narration & Guided Audio Reading State (Web Speech API stream + rhythmic pulse)
  const [isAudioPlayerVisible, setIsAudioPlayerVisible] = useState<boolean>(false);
  const [isNarrating, setIsNarrating] = useState<boolean>(false);
  const [isNarrationPaused, setIsNarrationPaused] = useState<boolean>(false);
  const [narrationSpeed, setNarrationSpeed] = useState<number>(1.0);
  const [narratingVerseNumber, setNarratingVerseNumber] = useState<number | null>(null);
  const [isGuidedAudioMode, setIsGuidedAudioMode] = useState<boolean>(true);
  const [rhythmicBeatStep, setRhythmicBeatStep] = useState<number>(0);
  const narrationCancelRef = useRef<boolean>(false);
  const currentNarratingIndexRef = useRef<number>(0);

  // Persistent Audio Narration Bookmarks State (persisted in localStorage)
  const [audioBookmarks, setAudioBookmarks] = useState<
    Record<string, AudioTimestampBookmark>
  >({});
  const [narrationSeconds, setNarrationSeconds] = useState<number>(0);
  const [resumedBookmarkNotice, setResumedBookmarkNotice] = useState<string | null>(null);

  // Cross-Reference Peek Popover State
  const [activePeekRef, setActivePeekRef] = useState<{
    reference: string;
    text: string;
    theme: string;
  } | null>(null);
  const [savedHighlights, setSavedHighlights] = useState<HighlightedVerse[]>([]);
  const [activeHighlightColor, setActiveHighlightColor] = useState<HighlightColor>('amber');
  const [isHighlightDrawerOpen, setIsHighlightDrawerOpen] = useState<boolean>(false);
  const [isHighlightModeActive, setIsHighlightModeActive] = useState<boolean>(false);
  const [highlightFilterColor, setHighlightFilterColor] = useState<'all' | HighlightColor>('all');
  const [copiedHighlightsNotice, setCopiedHighlightsNotice] = useState<boolean>(false);
  const [editingNoteVerseId, setEditingNoteVerseId] = useState<string | null>(null);
  const [noteDraftText, setNoteDraftText] = useState<string>('');
  const [noteDraftType, setNoteDraftType] = useState<'reflection' | 'question' | 'prayer'>('reflection');

  // Quote Card Share State
  const [sharingVerse, setSharingVerse] = useState<HighlightedVerse | null>(null);

  // Reading Duration Goals State (Daily & Weekly)
  const [durationCadence, setDurationCadence] = useState<'daily' | 'weekly'>('daily');
  const [durationTargetMinutes, setDurationTargetMinutes] = useState<number>(10);
  const [durationElapsedSeconds, setDurationElapsedSeconds] = useState<number>(0);
  const [hasCelebratedDuration, setHasCelebratedDuration] = useState<boolean>(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState<boolean>(false);
  const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState<boolean>(false);
  const durationDropdownRef = useRef<HTMLDivElement>(null);

  // Close Duration Dropdown on outside click or Escape
  useEffect(() => {
    if (!isDurationDropdownOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (
        durationDropdownRef.current &&
        !durationDropdownRef.current.contains(e.target as Node)
      ) {
        setIsDurationDropdownOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDurationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isDurationDropdownOpen]);

  // Close Font Size Dropdown on outside click or Escape
  useEffect(() => {
    if (!isFontSizeDropdownOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (
        fontSizeDropdownRef.current &&
        !fontSizeDropdownRef.current.contains(e.target as Node)
      ) {
        setIsFontSizeDropdownOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFontSizeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleKey);
    };
  }, [isFontSizeDropdownOpen]);

  // Sync when initialChapterId prop changes
  useEffect(() => {
    if (!initialChapterId) return;
    const resolved = resolveBibleChapterPage(initialChapterId);
    const matchedBook = BIBLE_CANON_BOOKS.find(
      (b) =>
        b.name.toLowerCase() === resolved.book.toLowerCase() ||
        (b.id === 'psalms' && resolved.book.toLowerCase() === 'psalm')
    );
    const timer = setTimeout(() => {
      if (matchedBook) {
        setSelectedBookId(matchedBook.id);
      }
      setSelectedChapterNumber(resolved.chapter);
      setSelectedVerseNumber(resolved.verses[0]?.verse ?? 1);
    }, 0);
    return () => clearTimeout(timer);
  }, [initialChapterId]);

  // Restore saved reader state & chapters read from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      try {
        const rawRead = window.localStorage.getItem(CHAPTERS_READ_STORAGE_KEY);
        if (rawRead) {
          const parsedRead = JSON.parse(rawRead);
          if (parsedRead && typeof parsedRead === 'object') {
            setChaptersReadMap(parsedRead);
          }
        }

        const rawHighlights = window.localStorage.getItem(HIGHLIGHTS_STORAGE_KEY);
        if (rawHighlights) {
          const parsedHighlights = JSON.parse(rawHighlights);
          if (Array.isArray(parsedHighlights)) {
            setSavedHighlights(parsedHighlights);
          }
        }

        if (!isOverlay) {
          const raw = window.localStorage.getItem(FULL_READER_STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (
              parsed.bookId &&
              BIBLE_CANON_BOOKS.some((b) => b.id === parsed.bookId)
            ) {
              setSelectedBookId(parsed.bookId);
            }
            if (typeof parsed.chapterNumber === 'number') {
              setSelectedChapterNumber(parsed.chapterNumber);
            }
            if (
              parsed.version &&
              FULL_BIBLE_VERSIONS.some((v) => v.id === parsed.version)
            ) {
              setActiveVersion(parsed.version);
            }
            if (
              parsed.fontSize &&
              FONT_SIZE_OPTIONS.some((f) => f.id === parsed.fontSize)
            ) {
              setFontSize(parsed.fontSize);
            }
          }
        }

        // Restore Reading Duration Goals
        const rawDuration = window.localStorage.getItem(
          READING_DURATION_STORAGE_KEY
        );
        if (rawDuration) {
          const parsedD = JSON.parse(rawDuration);
          const currentKey = getDurationPeriodKey(parsedD.cadence || 'daily');
          if (parsedD.cadence) setDurationCadence(parsedD.cadence);
          if (parsedD.targetMinutes)
            setDurationTargetMinutes(parsedD.targetMinutes);
          if (parsedD.periodKey === currentKey) {
            setDurationElapsedSeconds(parsedD.elapsedSeconds || 0);
            setHasCelebratedDuration(Boolean(parsedD.hasCelebrated));
          } else {
            setDurationElapsedSeconds(0);
            setHasCelebratedDuration(false);
          }
        }
      } catch {
        // ignore storage errors
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [isOverlay]);

  // Active Reading Duration Goal Timer (Ticks every 1s when reader tab is visible)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const interval = setInterval(() => {
      if (document.visibilityState !== 'visible') return;

      setDurationElapsedSeconds((prev) => {
        const next = prev + 1;
        const targetSeconds = durationTargetMinutes * 60;

        if (next >= targetSeconds && !hasCelebratedDuration) {
          setHasCelebratedDuration(true);
          setShowCelebrationModal(true);
          onEngageContent?.(
            25,
            `Reached ${
              durationCadence === 'daily' ? 'Daily' : 'Weekly'
            } Reading Goal of ${durationTargetMinutes} minutes!`
          );
        }

        if (next % 15 === 0 || next === targetSeconds) {
          try {
            window.localStorage.setItem(
              READING_DURATION_STORAGE_KEY,
              JSON.stringify({
                cadence: durationCadence,
                targetMinutes: durationTargetMinutes,
                elapsedSeconds: next,
                periodKey: getDurationPeriodKey(durationCadence),
                hasCelebrated: next >= targetSeconds,
              })
            );
          } catch {
            // ignore
          }
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    durationTargetMinutes,
    durationCadence,
    hasCelebratedDuration,
    onEngageContent,
  ]);

  // Persist reader state to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(
        FULL_READER_STORAGE_KEY,
        JSON.stringify({
          bookId: selectedBookId,
          chapterNumber: selectedChapterNumber,
          version: activeVersion,
          layoutMode,
          fontSize,
        })
      );
    } catch {
      // ignore storage errors
    }
  }, [
    selectedBookId,
    selectedChapterNumber,
    activeVersion,
    layoutMode,
    fontSize,
  ]);

  const currentBook: BibleCanonBook = useMemo(
    () =>
      BIBLE_CANON_BOOKS.find((b) => b.id === selectedBookId) ||
      BIBLE_CANON_BOOKS[18],
    [selectedBookId]
  );

  // Fetch public-domain full chapter verses when viewing a non-curated chapter so all 1,189 chapters show complete verse text
  useEffect(() => {
    const cacheKey = `${currentBook.id}-${selectedChapterNumber}`;
    const isCurated = FULL_BIBLE_CHAPTERS.some(
      (c) =>
        (c.book.toLowerCase() === currentBook.name.toLowerCase() ||
          (currentBook.id === 'psalms' && c.book.toLowerCase() === 'psalm')) &&
        c.chapter === selectedChapterNumber
    );
    if (isCurated || fetchedChapterVerses[cacheKey]) return;

    let isCancelled = false;
    const queryBook =
      currentBook.id === 'psalms' ? 'Psalms' : currentBook.name;

    fetch(
      `https://bible-api.com/${encodeURIComponent(
        `${queryBook} ${selectedChapterNumber}`
      )}?translation=kjv`
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (
          !isCancelled &&
          data &&
          Array.isArray(data.verses) &&
          data.verses.length > 0
        ) {
          const cleaned = data.verses.map(
            (v: {verse: number; text: string}) => ({
              verse: v.verse,
              text: v.text.replace(/\s+/g, ' ').trim(),
            })
          );
          setFetchedChapterVerses((prev) => ({
            ...prev,
            [cacheKey]: cleaned,
          }));
        }
      })
      .catch(() => {
        // Fallback already provided by resolveBibleChapterPage
      });

    return () => {
      isCancelled = true;
    };
  }, [currentBook.id, currentBook.name, selectedChapterNumber, fetchedChapterVerses]);

  // Handle Escape key when in overlay mode or Zen immersion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isBookDrawerOpen) {
          setIsBookDrawerOpen(false);
        } else if (isZenImmersion) {
          setIsZenImmersion(false);
        } else if (isOverlay && onCloseOverlay) {
          onCloseOverlay();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBookDrawerOpen, isZenImmersion, isOverlay, onCloseOverlay]);

  const currentChapter: FullBibleChapter = useMemo(() => {
    const base = resolveBibleChapterPage(
      currentBook.id,
      selectedChapterNumber
    );
    const cacheKey = `${currentBook.id}-${selectedChapterNumber}`;
    const dynamicVerses = fetchedChapterVerses[cacheKey];

    if (!dynamicVerses || dynamicVerses.length === 0) {
      return base;
    }

    return {
      ...base,
      verses: dynamicVerses.map((dv, idx) => ({
        verse: dv.verse,
        paragraphStart: idx === 0 || idx % 4 === 0,
        text: {
          AKJV: dv.text,
          AMP:
            idx === 0
              ? `${dv.text} [${currentBook.themeSummary.split('.')[0]}]`
              : dv.text,
          NASB: dv.text
            .replace(/\bunto\b/g, 'to')
            .replace(/\bsaith\b/g, 'says')
            .replace(/\bthine\b/g, 'your')
            .replace(/\bthy\b/g, 'your')
            .replace(/\bthee\b/g, 'you')
            .replace(/\bthou\b/g, 'you')
            .replace(/\bye\b/g, 'you')
            .replace(/\bhath\b/g, 'has'),
          NIV: dv.text
            .replace(/\bunto\b/g, 'to')
            .replace(/\bsaith\b/g, 'says')
            .replace(/\bthine\b/g, 'your')
            .replace(/\bthy\b/g, 'your')
            .replace(/\bthee\b/g, 'you')
            .replace(/\bthou\b/g, 'you')
            .replace(/\bye\b/g, 'you')
            .replace(/\bhath\b/g, 'has'),
          NLT: dv.text
            .replace(/\bunto\b/g, 'to')
            .replace(/\bsaith\b/g, 'says')
            .replace(/\bthine\b/g, 'your')
            .replace(/\bthy\b/g, 'your')
            .replace(/\bthee\b/g, 'you')
            .replace(/\bthou\b/g, 'you')
            .replace(/\bye\b/g, 'you')
            .replace(/\bhath\b/g, 'has'),
        },
      })),
    };
  }, [currentBook, selectedChapterNumber, fetchedChapterVerses]);

  // All chapters of the currently selected book for the "All Chapters in Book" page view
  const allChaptersInCurrentBook = useMemo(() => {
    const chapters: FullBibleChapter[] = [];
    for (let chNum = 1; chNum <= currentBook.totalChapters; chNum++) {
      if (chNum === selectedChapterNumber) {
        chapters.push(currentChapter);
      } else {
        chapters.push(resolveBibleChapterPage(currentBook.id, chNum));
      }
    }
    return chapters;
  }, [currentBook.id, currentBook.totalChapters, selectedChapterNumber, currentChapter]);

  // Chapters Read metrics for current book & total Bible
  const currentChapterReadKey = `${currentBook.id}-${selectedChapterNumber}`;
  const isCurrentChapterRead = Boolean(chaptersReadMap[currentChapterReadKey]);

  const bookChaptersReadCount = useMemo(() => {
    let count = 0;
    for (let i = 1; i <= currentBook.totalChapters; i++) {
      if (chaptersReadMap[`${currentBook.id}-${i}`]) count++;
    }
    return count;
  }, [chaptersReadMap, currentBook.id, currentBook.totalChapters]);

  const bookProgressPercent = Math.min(
    100,
    Math.round((bookChaptersReadCount / currentBook.totalChapters) * 100)
  );

  const totalChaptersReadCount = useMemo(
    () => Object.values(chaptersReadMap).filter(Boolean).length,
    [chaptersReadMap]
  );

  const handleToggleChapterRead = (bookId: string, chapterNum: number) => {
    const key = `${bookId}-${chapterNum}`;
    setChaptersReadMap((prev) => {
      const next = {...prev, [key]: !prev[key]};
      try {
        window.localStorage.setItem(
          CHAPTERS_READ_STORAGE_KEY,
          JSON.stringify(next)
        );
      } catch {
        // ignore
      }
      return next;
    });
    onEngageContent?.(
      10,
      `Marked ${currentBook.name} ${chapterNum} as Read in Full-Page Bible`
    );
  };

  // --- TEXT HIGHLIGHTING ENGINE ---
  const persistHighlights = useCallback((newList: HighlightedVerse[]) => {
    setSavedHighlights(newList);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(
          HIGHLIGHTS_STORAGE_KEY,
          JSON.stringify(newList)
        );
      } catch {
        // ignore
      }
    }
  }, []);

  const highlightsMap = useMemo(() => {
    const map: Record<string, HighlightedVerse> = {};
    for (const h of savedHighlights) {
      map[`${h.bookId}-${h.chapter}-${h.verse}`] = h;
    }
    return map;
  }, [savedHighlights]);

  const handleToggleHighlightVerse = useCallback(
    (verseNum: number, colorOverride?: HighlightColor) => {
      const verseObj = currentChapter.verses.find((v) => v.verse === verseNum);
      if (!verseObj) return;

      const key = `${currentBook.id}-${currentChapter.chapter}-${verseNum}`;
      const existing = highlightsMap[key];
      const colorToUse = colorOverride || activeHighlightColor;

      if (existing) {
        if (!colorOverride || existing.color === colorToUse) {
          const updated = savedHighlights.filter((h) => h.id !== existing.id);
          persistHighlights(updated);
          return;
        }
        const updated = savedHighlights.map((h) =>
          h.id === existing.id
            ? {
                ...h,
                color: colorToUse,
                version: activeVersion,
                text: verseObj.text[activeVersion],
              }
            : h
        );
        persistHighlights(updated);
        return;
      }

      const newHighlight: HighlightedVerse = {
        id: `${currentBook.id}-${currentChapter.chapter}-${verseNum}`,
        bookId: currentBook.id,
        bookName: currentBook.name,
        chapter: currentChapter.chapter,
        verse: verseNum,
        version: activeVersion,
        text: verseObj.text[activeVersion],
        color: colorToUse,
        createdAt: Date.now(),
      };

      persistHighlights([newHighlight, ...savedHighlights]);
      onEngageContent?.(
        10,
        `Highlighted ${currentBook.name} ${currentChapter.chapter}:${verseNum} in ${HIGHLIGHT_COLORS[colorToUse].label}`
      );
    },
    [
      currentChapter,
      currentBook,
      activeVersion,
      activeHighlightColor,
      highlightsMap,
      savedHighlights,
      persistHighlights,
      onEngageContent,
    ]
  );

  const handleRemoveHighlight = useCallback(
    (id: string) => {
      const updated = savedHighlights.filter((h) => h.id !== id);
      persistHighlights(updated);
    },
    [savedHighlights, persistHighlights]
  );

  const handleClearAllHighlights = useCallback(() => {
    if (savedHighlights.length === 0) return;
    persistHighlights([]);
  }, [savedHighlights.length, persistHighlights]);

  const handleOpenNoteEditor = useCallback((h: HighlightedVerse) => {
    setEditingNoteVerseId(h.id);
    setNoteDraftText(h.note || '');
    setNoteDraftType(h.noteType || 'reflection');
  }, []);

  const handleSaveHighlightNote = useCallback(
    (
      highlightId: string,
      noteText: string,
      noteType: 'reflection' | 'question' | 'prayer'
    ) => {
      const trimmed = noteText.trim();
      const updated = savedHighlights.map((h) => {
        if (h.id === highlightId) {
          return {
            ...h,
            note: trimmed.length > 0 ? trimmed : undefined,
            noteType: trimmed.length > 0 ? noteType : undefined,
            updatedAt: Date.now(),
          };
        }
        return h;
      });
      persistHighlights(updated);
      setEditingNoteVerseId(null);
      if (trimmed.length > 0) {
        onEngageContent?.(
          10,
          `Saved Personal ${
            noteType === 'question'
              ? 'Question'
              : noteType === 'prayer'
              ? 'Prayer Note'
              : 'Reflection'
          } on Highlighted Verse`
        );
      }
    },
    [savedHighlights, persistHighlights, onEngageContent]
  );

  const handleCopyAllHighlights = useCallback(() => {
    if (
      savedHighlights.length === 0 ||
      typeof navigator === 'undefined' ||
      !navigator.clipboard
    )
      return;
    const lines = savedHighlights.map((h) => {
      const base = `• "${h.text}" — ${h.bookName} ${h.chapter}:${h.verse} (${h.version}) [${HIGHLIGHT_COLORS[h.color].label}]`;
      if (h.note) {
        const typeLabel =
          h.noteType === 'question'
            ? 'Question'
            : h.noteType === 'prayer'
            ? 'Prayer'
            : 'Reflection';
        return `${base}\n  [${typeLabel}]: ${h.note}`;
      }
      return base;
    });
    const text = `Grow In The Word — Study Highlights & Reflections (${savedHighlights.length} Verses)\n\n${lines.join(
      '\n\n'
    )}`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedHighlightsNotice(true);
        setTimeout(() => setCopiedHighlightsNotice(false), 2000);
      })
      .catch(() => {});
  }, [savedHighlights]);

  const handleJumpToHighlight = useCallback(
    (h: HighlightedVerse) => {
      setSelectedBookId(h.bookId);
      setSelectedChapterNumber(h.chapter);
      setSelectedVerseNumber(h.verse);
      setIsHighlightDrawerOpen(false);
      onEngageContent?.(
        5,
        `Jumped to Highlight: ${h.bookName} ${h.chapter}:${h.verse}`
      );
    },
    [onEngageContent]
  );

  const filteredHighlights = useMemo(() => {
    if (highlightFilterColor === 'all') return savedHighlights;
    return savedHighlights.filter((h) => h.color === highlightFilterColor);
  }, [savedHighlights, highlightFilterColor]);

  // --- AUDIO NARRATION STREAM & GUIDED AUDIO READING ENGINE (Web Speech API) ---
  // Restore saved audio narration bookmarks from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(AUDIO_BOOKMARKS_STORAGE_KEY);
        if (raw) {
          setAudioBookmarks(JSON.parse(raw));
        }
      } catch {
        // ignore
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const activeAudioBookmarkKey = `${currentBook.id}-${selectedChapterNumber}-${activeVersion}`;
  const currentChapterAudioBookmark = audioBookmarks[activeAudioBookmarkKey];

  const saveAudioBookmark = useCallback(
    (vNum: number, secs: number) => {
      const key = `${currentBook.id}-${selectedChapterNumber}-${activeVersion}`;
      const mins = Math.floor(secs / 60);
      const remSecs = secs % 60;
      const timestampLabel = `${String(mins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}`;

      const bookmark: AudioTimestampBookmark = {
        key,
        bookId: currentBook.id,
        bookName: currentBook.name,
        chapterNumber: selectedChapterNumber,
        version: activeVersion,
        verseNumber: vNum,
        timestampSeconds: secs,
        timestampLabel,
        updatedAt: Date.now(),
      };

      setAudioBookmarks((prev) => {
        const next = {...prev, [key]: bookmark};
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(
              AUDIO_BOOKMARKS_STORAGE_KEY,
              JSON.stringify(next)
            );
          } catch {
            // ignore
          }
        }
        return next;
      });
    },
    [currentBook.id, currentBook.name, selectedChapterNumber, activeVersion]
  );

  // Audio narration seconds counter timer while narrating
  useEffect(() => {
    if (!isNarrating || isNarrationPaused) return;
    const interval = setInterval(() => {
      setNarrationSeconds((prev) => {
        const next = prev + 1;
        if (narratingVerseNumber !== null && next % 2 === 0) {
          saveAudioBookmark(narratingVerseNumber, next);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isNarrating, isNarrationPaused, narratingVerseNumber, saveAudioBookmark]);

  // Rhythmic pulse beat indicator while narrating to help younger readers follow along
  useEffect(() => {
    if (!isNarrating || isNarrationPaused) return;
    const interval = setInterval(() => {
      setRhythmicBeatStep((prev) => (prev + 1) % 4);
    }, 520);
    return () => clearInterval(interval);
  }, [isNarrating, isNarrationPaused]);

  const stopNarration = useCallback(() => {
    narrationCancelRef.current = true;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsNarrating(false);
    setIsNarrationPaused(false);
    setNarratingVerseNumber(null);
  }, []);

  const getNaturalVoice = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') ||
            v.name.includes('Premium') ||
            v.name.includes('Samantha') ||
            v.name.includes('Daniel') ||
            v.name.includes('Google') ||
            v.name.includes('Serena'))
      ) ||
      voices.find((v) => v.lang.startsWith('en')) ||
      null
    );
  }, []);

  const speakVerseByIndexRef = useRef<(idx: number) => void>(() => {});

  const speakVerseByIndex = useCallback(
    (verseIdx: number) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }
      if (verseIdx < 0 || verseIdx >= currentChapter.verses.length) {
        setIsNarrating(false);
        setIsNarrationPaused(false);
        setNarratingVerseNumber(null);
        return;
      }

      currentNarratingIndexRef.current = verseIdx;
      narrationCancelRef.current = false;
      const v = currentChapter.verses[verseIdx];
      saveAudioBookmark(v.verse, narrationSeconds);
      setNarratingVerseNumber(v.verse);
      setSelectedVerseNumber(v.verse);
      setIsNarrating(true);
      setIsNarrationPaused(false);

      // Smoothly scroll the spoken verse into center view when Guided Audio Mode is active
      if (isGuidedAudioMode && typeof document !== 'undefined') {
        setTimeout(() => {
          const el = document.getElementById(`guided-reader-verse-${v.verse}`);
          if (el) {
            el.scrollIntoView({behavior: 'smooth', block: 'center'});
          }
        }, 80);
      }

      window.speechSynthesis.cancel();

      const text = `Verse ${v.verse}. ${v.text[activeVersion]}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = narrationSpeed;
      utterance.pitch = 0.96;
      const voice = getNaturalVoice();
      if (voice) utterance.voice = voice;

      utterance.onend = () => {
        if (!narrationCancelRef.current) {
          speakVerseByIndexRef.current(verseIdx + 1);
        }
      };

      utterance.onerror = (e) => {
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
          setIsNarrating(false);
          setIsNarrationPaused(false);
          setNarratingVerseNumber(null);
        }
      };

      window.speechSynthesis.speak(utterance);
    },
    [
      currentChapter.verses,
      activeVersion,
      narrationSpeed,
      getNaturalVoice,
      isGuidedAudioMode,
      saveAudioBookmark,
      narrationSeconds,
    ]
  );

  useEffect(() => {
    speakVerseByIndexRef.current = speakVerseByIndex;
  }, [speakVerseByIndex]);

  const startOrResumeNarration = useCallback(() => {
    setIsAudioPlayerVisible(true);
    if (
      isNarrationPaused &&
      typeof window !== 'undefined' &&
      'speechSynthesis' in window
    ) {
      window.speechSynthesis.resume();
      setIsNarrationPaused(false);
      setIsNarrating(true);
      return;
    }
    const startIdx =
      selectedVerseNumber !== null
        ? Math.max(
            0,
            currentChapter.verses.findIndex((v) => v.verse === selectedVerseNumber)
          )
        : 0;
    speakVerseByIndex(startIdx >= 0 ? startIdx : 0);
    onEngageContent?.(
      10,
      `Began Listening to ${currentChapter.book} ${currentChapter.chapter} (${activeVersion})`
    );
  }, [
    isNarrationPaused,
    selectedVerseNumber,
    currentChapter.verses,
    currentChapter.book,
    currentChapter.chapter,
    activeVersion,
    speakVerseByIndex,
    onEngageContent,
  ]);

  const resumeNarrationFromBookmark = useCallback(() => {
    const bookmark = audioBookmarks[activeAudioBookmarkKey];
    if (bookmark) {
      const targetVerseIdx = currentChapter.verses.findIndex(
        (v) => v.verse === bookmark.verseNumber
      );
      const startIdx = targetVerseIdx >= 0 ? targetVerseIdx : 0;
      setNarrationSeconds(bookmark.timestampSeconds);
      setIsAudioPlayerVisible(true);
      speakVerseByIndex(startIdx);
      setResumedBookmarkNotice(
        `Resumed audio narration at Verse ${bookmark.verseNumber} (${bookmark.timestampLabel})`
      );
      setTimeout(() => setResumedBookmarkNotice(null), 3200);
      onEngageContent?.(
        12,
        `Resumed Audio Bookmark at Verse ${bookmark.verseNumber} (${bookmark.timestampLabel})`
      );
    } else {
      startOrResumeNarration();
    }
  }, [
    audioBookmarks,
    activeAudioBookmarkKey,
    currentChapter.verses,
    speakVerseByIndex,
    startOrResumeNarration,
    onEngageContent,
  ]);

  const pauseNarration = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsNarrationPaused(true);
    }
  }, []);

  const handleNextNarrationVerse = useCallback(() => {
    const nextIdx = currentNarratingIndexRef.current + 1;
    if (nextIdx < currentChapter.verses.length) {
      speakVerseByIndex(nextIdx);
    } else {
      stopNarration();
    }
  }, [currentChapter.verses.length, speakVerseByIndex, stopNarration]);

  const handlePrevNarrationVerse = useCallback(() => {
    const prevIdx = Math.max(0, currentNarratingIndexRef.current - 1);
    speakVerseByIndex(prevIdx);
  }, [speakVerseByIndex]);

  const handleSetSpeed = useCallback(
    (newSpeed: number) => {
      setNarrationSpeed(newSpeed);
      if (isNarrating && !isNarrationPaused) {
        speakVerseByIndex(currentNarratingIndexRef.current);
      }
    },
    [isNarrating, isNarrationPaused, speakVerseByIndex]
  );

  // Cleanup speech synthesis on book/chapter changes and on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [selectedBookId, selectedChapterNumber]);

  // Previous / Next Chapter Navigation across all 1,189 chapters
  const handlePrevChapter = () => {
    stopNarration();
    if (selectedChapterNumber > 1) {
      setSelectedChapterNumber((prev) => prev - 1);
      setSelectedVerseNumber(1);
      return;
    }
    const bookIdx = BIBLE_CANON_BOOKS.findIndex(
      (b) => b.id === currentBook.id
    );
    if (bookIdx > 0) {
      const prevBook = BIBLE_CANON_BOOKS[bookIdx - 1];
      setSelectedBookId(prevBook.id);
      setSelectedChapterNumber(prevBook.totalChapters);
      setSelectedVerseNumber(1);
    }
  };

  const handleNextChapter = () => {
    stopNarration();
    if (selectedChapterNumber < currentBook.totalChapters) {
      setSelectedChapterNumber((prev) => prev + 1);
      setSelectedVerseNumber(1);
      return;
    }
    const bookIdx = BIBLE_CANON_BOOKS.findIndex(
      (b) => b.id === currentBook.id
    );
    if (bookIdx >= 0 && bookIdx < BIBLE_CANON_BOOKS.length - 1) {
      const nextBook = BIBLE_CANON_BOOKS[bookIdx + 1];
      setSelectedBookId(nextBook.id);
      setSelectedChapterNumber(1);
      setSelectedVerseNumber(1);
    }
  };

  const activeVersionMeta = useMemo(
    () =>
      FULL_BIBLE_VERSIONS.find((v) => v.id === activeVersion) ||
      FULL_BIBLE_VERSIONS[1],
    [activeVersion]
  );

  const activeFontSizeMeta = useMemo(
    () =>
      FONT_SIZE_OPTIONS.find((f) => f.id === fontSize) || FONT_SIZE_OPTIONS[1],
    [fontSize]
  );

  const selectedVerseObj = useMemo(() => {
    if (selectedVerseNumber === null) return currentChapter.verses[0];
    return (
      currentChapter.verses.find((v) => v.verse === selectedVerseNumber) ||
      currentChapter.verses[0]
    );
  }, [currentChapter, selectedVerseNumber]);

  const filteredBooks = useMemo(() => {
    return BIBLE_CANON_BOOKS.filter((book) => {
      const matchesTestament =
        testamentFilter === 'all' || book.testament === testamentFilter;
      if (!matchesTestament) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.trim().toLowerCase();
      return (
        book.name.toLowerCase().includes(q) ||
        book.themeSummary.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q)
      );
    });
  }, [testamentFilter, searchQuery]);

  const handleSelectBookAndChapter = (bookId: string, chapterNum: number) => {
    stopNarration();
    setSelectedBookId(bookId);
    setSelectedChapterNumber(chapterNum);
    setSelectedVerseNumber(1);
    setIsBookDrawerOpen(false);
    const bookObj = BIBLE_CANON_BOOKS.find((b) => b.id === bookId);
    onEngageContent?.(
      10,
      `Opened ${bookObj?.name || bookId} ${chapterNum} in Full-Page Bible (${activeVersion})`
    );
  };

  const handleToggleParallelVersion = (verId: BibleVersionId) => {
    if (layoutMode !== 'parallel') {
      setActiveVersion(verId);
      onEngageContent?.(5, `Switched Full-Page Bible Version to ${verId}`);
      return;
    }

    setParallelVersions((prev) => {
      if (prev.includes(verId)) {
        if (prev.length <= 1) return prev;
        return prev.filter((id) => id !== verId);
      }
      const next =
        prev.length >= 3 ? [...prev.slice(1), verId] : [...prev, verId];
      return next;
    });
  };

  const handleCopyVerse = (
    versionId: BibleVersionId,
    verseNum: number,
    text: string
  ) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      const formatted = `"${text}" — ${currentChapter.book} ${currentChapter.chapter}:${verseNum} (${versionId})`;
      navigator.clipboard.writeText(formatted).catch(() => {});
      const key = `${versionId}-${verseNum}`;
      setCopiedVerseKey(key);
      setTimeout(() => {
        setCopiedVerseKey((curr) => (curr === key ? null : curr));
      }, 1800);
    }
  };

  const fontSizeClass = activeFontSizeMeta.sizeClass;

  const lineSpacingClass =
    lineSpacing === 'snug'
      ? 'leading-snug'
      : lineSpacing === 'relaxed'
      ? 'leading-[1.85]'
      : 'leading-[2.15]';

  const containerWidthClass =
    layoutMode === 'parallel' || pageWidth === 'full'
      ? 'max-w-[1400px]'
      : pageWidth === 'wide'
      ? 'max-w-5xl'
      : 'max-w-3xl';

  const paletteClasses = isNightSanctuary
    ? 'bg-[#141210] text-[#F9F6F0]'
    : 'bg-[#FAF7F2] text-[#1C1917]';

  const surfaceClasses = isNightSanctuary
    ? 'bg-[#1C1917] border-[#2E2925] text-[#F9F6F0]'
    : 'bg-[#F9F6F0] border-[#E5DEC9] text-[#1C1917]';

  const mutedSurfaceClasses = isNightSanctuary
    ? 'bg-[#24201D] border-[#36312E] text-[#D6D3D1]'
    : 'bg-[#F2ECE1] border-[#E5DEC9] text-[#44403C]';

  return (
    <div
      className={`${
        isOverlay
          ? 'fixed inset-0 z-50 overflow-y-auto'
          : 'min-h-screen w-full'
      } flex flex-col transition-colors duration-300 ${paletteClasses}`}
    >
      {/* STICKY FULL-PAGE SANCTUARY READER HEADER */}
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
          isNightSanctuary
            ? 'bg-[#141210]/95 border-[#2E2925]'
            : 'bg-[#FAF7F2]/95 border-[#E5DEC9]'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Back / Exit + Book & Chapter Picker Trigger */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {isOverlay && onCloseOverlay ? (
              <button
                type="button"
                onClick={onCloseOverlay}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1C1917] text-[#FAF7F2] hover:bg-[#292524] border border-[#D97706]/50 text-xs font-semibold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Exit Full Page</span>
              </button>
            ) : (
              <Link
                href="/bible-study-studio"
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${mutedSurfaceClasses} hover:border-[#D97706]`}
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Study Studio</span>
              </Link>
            )}

            {/* Book & Chapter Selector Button (All 66 Books & 1,189 Chapters) */}
            <button
              type="button"
              onClick={() => setIsBookDrawerOpen((prev) => !prev)}
              aria-expanded={isBookDrawerOpen}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#1C1917] text-[#FAF7F2] border border-[#D97706]/60 hover:bg-[#292524] text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-2xs"
            >
              <BookOpen className="w-4 h-4 text-[#D97706]" />
              <span>
                {currentBook.name} {selectedChapterNumber}
              </span>
              <span className="hidden md:inline text-xs font-normal text-[#D6D3D1]">
                of {currentBook.totalChapters}
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#D97706] text-[#1A1A1A] font-bold">
                All 66 Books ▾
              </span>
            </button>

            {/* Quick Prev / Next Chapter Arrows */}
            <div className="hidden sm:inline-flex items-center rounded-xl border border-[#E5DEC9] dark:border-[#36312E] overflow-hidden">
              <button
                type="button"
                onClick={handlePrevChapter}
                title="Previous Chapter"
                className={`p-2 transition-colors cursor-pointer hover:text-[#D97706] ${mutedSurfaceClasses}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextChapter}
                title="Next Chapter"
                className={`p-2 border-l border-[#E5DEC9] dark:border-[#36312E] transition-colors cursor-pointer hover:text-[#D97706] ${mutedSurfaceClasses}`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center: All 5 Current App Versions Selector (AKJV · AMP · NASB · NIV · NLT) */}
          <div
            role="group"
            aria-label="Bible Translation Versions"
            className={`flex items-center gap-1 p-1 rounded-xl border ${mutedSurfaceClasses}`}
          >
            <span className="hidden xl:inline text-[10px] font-mono uppercase tracking-wider px-2 text-[#92400E] dark:text-[#FBBF24] font-semibold">
              {layoutMode === 'parallel' ? 'Compare:' : 'Version:'}
            </span>
            {FULL_BIBLE_VERSIONS.map((ver) => {
              const isSelected =
                layoutMode === 'parallel'
                  ? parallelVersions.includes(ver.id)
                  : activeVersion === ver.id;
              return (
                <button
                  key={ver.id}
                  type="button"
                  onClick={() => handleToggleParallelVersion(ver.id)}
                  title={`${ver.fullName} — ${ver.audienceLabel}`}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#D97706] text-[#1A1A1A] shadow-2xs'
                      : 'hover:bg-[#D97706]/15 text-current opacity-80 hover:opacity-100'
                  }`}
                >
                  {ver.shortName}
                </button>
              );
            })}
          </div>

          {/* Right: Full-Page Layout Mode + Font-Size Control Dropdown + Page Settings + Night Toggle */}
          <div className="flex items-center gap-2">
            {/* 4 Layout Modes: Single Chapter Page, All Book Chapters Page, Verse Lines, Parallel */}
            <div
              role="group"
              aria-label="Full-Page Reading Layout"
              className={`hidden lg:inline-flex items-center p-1 rounded-xl border ${mutedSurfaceClasses}`}
            >
              <button
                type="button"
                onClick={() => setLayoutMode('page')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  layoutMode === 'page'
                    ? 'bg-[#1C1917] text-[#FAF7F2]'
                    : 'opacity-75 hover:opacity-100'
                }`}
                title="Simple & Clear Single Chapter Page Format"
              >
                <FileText className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Chapter Page</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('all-chapters')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  layoutMode === 'all-chapters'
                    ? 'bg-[#1C1917] text-[#FAF7F2]'
                    : 'opacity-75 hover:opacity-100'
                }`}
                title="View All Chapters of this Book in Continuous Page Format"
              >
                <Layers className="w-3.5 h-3.5 text-[#D97706]" />
                <span>All Book Chapters ({currentBook.totalChapters})</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('verse')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  layoutMode === 'verse'
                    ? 'bg-[#1C1917] text-[#FAF7F2]'
                    : 'opacity-75 hover:opacity-100'
                }`}
                title="Verse-by-Verse Study Lines"
              >
                <AlignLeft className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Verse Lines</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('parallel')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  layoutMode === 'parallel'
                    ? 'bg-[#1C1917] text-[#FAF7F2]'
                    : 'opacity-75 hover:opacity-100'
                }`}
                title="Full-Page Parallel Versions Side-by-Side"
              >
                <Columns3 className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Parallel ({parallelVersions.length})</span>
              </button>
            </div>

            {/* READING DURATION GOAL TRACKER & CELEBRATION DROPDOWN */}
            <div className="relative" ref={durationDropdownRef}>
              <button
                type="button"
                onClick={() => setIsDurationDropdownOpen((prev) => !prev)}
                aria-expanded={isDurationDropdownOpen}
                aria-haspopup="dialog"
                aria-label="Reading Duration Goal Tracker"
                className={`min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                  hasCelebratedDuration
                    ? 'border-[#10B981] bg-[#10B981]/15 text-[#065F46] dark:text-[#34D399]'
                    : isDurationDropdownOpen
                    ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706]'
                    : mutedSurfaceClasses
                }`}
                title={`Reading Goal: ${Math.floor(durationElapsedSeconds / 60)}/${durationTargetMinutes} min (${durationCadence})`}
              >
                <Clock className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span className="font-mono">
                  {Math.floor(durationElapsedSeconds / 60)}/{durationTargetMinutes}m
                </span>
                {hasCelebratedDuration ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                ) : (
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      isDurationDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {isDurationDropdownOpen && (
                <div
                  role="dialog"
                  aria-label="Reading Duration Goal Settings"
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl border shadow-2xl p-3 space-y-3 z-50 ${surfaceClasses}`}
                >
                  <div className="flex items-center justify-between border-b border-current/10 pb-2">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                      <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#92400E] dark:text-[#FBBF24]">
                        Reading Duration Goal
                      </span>
                    </div>
                    {hasCelebratedDuration && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#10B981]/20 text-[#065F46] dark:text-[#34D399]">
                        Goal Met!
                      </span>
                    )}
                  </div>

                  {/* Cadence Selection: Daily vs Weekly */}
                  <div>
                    <label className="text-[11px] font-mono opacity-75 block mb-1.5">
                      Cadence:
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-current/5 border border-current/10 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setDurationCadence('daily');
                          setHasCelebratedDuration(false);
                        }}
                        className={`py-1.5 rounded-lg font-semibold transition-colors cursor-pointer text-center ${
                          durationCadence === 'daily'
                            ? 'bg-[#1C1917] text-[#FAF7F2] dark:bg-[#FAF7F2] dark:text-[#1C1917]'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        Daily Goal
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDurationCadence('weekly');
                          setHasCelebratedDuration(false);
                        }}
                        className={`py-1.5 rounded-lg font-semibold transition-colors cursor-pointer text-center ${
                          durationCadence === 'weekly'
                            ? 'bg-[#1C1917] text-[#FAF7F2] dark:bg-[#FAF7F2] dark:text-[#1C1917]'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        Weekly Goal
                      </button>
                    </div>
                  </div>

                  {/* Target Minutes Selection */}
                  <div>
                    <label className="text-[11px] font-mono opacity-75 block mb-1.5">
                      Target Duration:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[5, 10, 15, 20, 30, 45].map((mins) => {
                        const isSelected = durationTargetMinutes === mins;
                        return (
                          <button
                            key={mins}
                            type="button"
                            onClick={() => {
                              setDurationTargetMinutes(mins);
                              setHasCelebratedDuration(
                                durationElapsedSeconds >= mins * 60
                              );
                            }}
                            className={`py-1.5 px-2 rounded-xl border text-xs font-mono font-semibold transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706]'
                                : 'border-current/10 hover:border-[#D97706]/40'
                            }`}
                          >
                            {mins} mins
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Current Progress Gauge */}
                  <div className="p-2.5 rounded-xl bg-current/5 border border-current/10 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="opacity-75">Progress ({durationCadence})</span>
                      <span className="font-bold text-[#D97706]">
                        {Math.floor(durationElapsedSeconds / 60)} of {durationTargetMinutes} min (
                        {Math.min(
                          100,
                          Math.round(
                            (durationElapsedSeconds / (durationTargetMinutes * 60)) * 100
                          )
                        )}
                        %)
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-current/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#D97706] to-[#10B981] transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            100,
                            (durationElapsedSeconds / (durationTargetMinutes * 60)) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Celebratory trigger if already met */}
                  {hasCelebratedDuration && (
                    <button
                      type="button"
                      onClick={() => setShowCelebrationModal(true)}
                      className="w-full py-2 px-3 rounded-xl bg-[#10B981]/15 text-[#065F46] dark:text-[#34D399] border border-[#10B981]/30 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#10B981]/25"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>View Celebratory Reward (+25 pts)</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ACCESSIBLE FONT-SIZE CONTROL DROPDOWN (Small, Medium, Large, Extra Large) */}
            <div className="relative" ref={fontSizeDropdownRef}>
              <button
                type="button"
                onClick={() => setIsFontSizeDropdownOpen((prev) => !prev)}
                aria-expanded={isFontSizeDropdownOpen}
                aria-haspopup="listbox"
                aria-label="Font size control dropdown"
                className={`min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                  isFontSizeDropdownOpen
                    ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706]'
                    : mutedSurfaceClasses
                }`}
                title="Select Typography Size: Small, Medium, Large, or Extra Large"
              >
                <Type className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>{activeFontSizeMeta.shortLabel}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    isFontSizeDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isFontSizeDropdownOpen && (
                <div
                  role="listbox"
                  aria-label="Typography Size Options"
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 rounded-2xl border shadow-2xl p-2 space-y-1 z-50 ${surfaceClasses}`}
                >
                  <div className="px-2.5 py-1.5 border-b border-current/10 text-center">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#92400E] dark:text-[#FBBF24] font-semibold">
                      Accessibility Font Size
                    </span>
                  </div>
                  {FONT_SIZE_OPTIONS.map((option) => {
                    const isSelected = fontSize === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setFontSize(option.id);
                          setIsFontSizeDropdownOpen(false);
                          onEngageContent?.(
                            5,
                            `Changed Full-Page Bible Font Size to ${option.label}`
                          );
                        }}
                        className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between gap-2 text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#D97706] text-[#1A1A1A] font-semibold'
                            : 'hover:bg-[#D97706]/15'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold">
                            {option.label}
                          </div>
                          <div
                            className={`text-[10px] font-mono ${
                              isSelected ? 'text-[#1A1A1A]/80' : 'opacity-65'
                            }`}
                          >
                            {option.pxHint}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="font-serif font-bold"
                            style={{
                              fontSize:
                                option.id === 'small'
                                  ? '13px'
                                  : option.id === 'medium'
                                  ? '15px'
                                  : option.id === 'large'
                                  ? '18px'
                                  : '21px',
                            }}
                          >
                            Aa
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* INTEGRATED AUDIO PLAYER COMPONENT IN TOOLBAR WITH PERSISTENT TIMESTAMP BOOKMARKS */}
            {!isAudioPlayerVisible && !isNarrating ? (
              <div className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsAudioPlayerVisible(true);
                    startOrResumeNarration();
                  }}
                  aria-label="Listen to chapter read aloud"
                  className={`min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${mutedSurfaceClasses}`}
                  title={`Listen to ${currentBook.name} ${selectedChapterNumber} (${activeVersion}) at ${narrationSpeed}x`}
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                  <span>Listen</span>
                  <span className="text-[10px] font-mono text-[#D97706] opacity-80">
                    {narrationSpeed}x
                  </span>
                </button>

                {currentChapterAudioBookmark && (
                  <button
                    type="button"
                    onClick={resumeNarrationFromBookmark}
                    className="min-h-[40px] inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#D97706]/15 hover:bg-[#D97706]/25 border border-[#D97706]/60 text-xs font-semibold text-[#92400E] dark:text-[#FBBF24] transition-all cursor-pointer shadow-2xs animate-in fade-in"
                    title={`Resume audio narration from saved timestamp bookmark at Verse ${currentChapterAudioBookmark.verseNumber} (${currentChapterAudioBookmark.timestampLabel})`}
                  >
                    <BookmarkCheck className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Resume v.{currentChapterAudioBookmark.verseNumber} ({currentChapterAudioBookmark.timestampLabel})</span>
                  </button>
                )}
              </div>
            ) : (
              <div
                role="region"
                aria-label="Integrated Chapter Audio Player"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#D97706]/15 border border-[#D97706]/60 text-xs font-semibold shadow-xs animate-in fade-in duration-200"
              >
                {/* Playing/Status badge */}
                <div className="flex items-center gap-1.5 pr-1 border-r border-[#D97706]/30">
                  <Volume2
                    className={`w-3.5 h-3.5 text-[#D97706] ${
                      isNarrating && !isNarrationPaused ? 'animate-pulse' : ''
                    }`}
                  />
                  <span className="font-mono text-[11px] text-[#92400E] dark:text-[#FBBF24]">
                    v.{narratingVerseNumber ?? selectedVerseNumber ?? 1}/
                    {currentChapter.verses.length}
                  </span>
                </div>

                {/* Prev Verse */}
                <button
                  type="button"
                  onClick={handlePrevNarrationVerse}
                  title="Previous Verse"
                  className="p-1 rounded-lg hover:bg-[#D97706]/20 text-[#1C1917] dark:text-[#FAF7F2] transition-colors cursor-pointer"
                  aria-label="Previous verse in audio narration"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Play / Pause Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    if (isNarrating && !isNarrationPaused) {
                      pauseNarration();
                    } else {
                      startOrResumeNarration();
                    }
                  }}
                  className="w-7 h-7 rounded-lg bg-[#D97706] text-[#1A1A1A] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-xs"
                  title={
                    isNarrating && !isNarrationPaused
                      ? 'Pause Audio Narration'
                      : 'Play / Resume Audio Narration'
                  }
                  aria-label={
                    isNarrating && !isNarrationPaused
                      ? 'Pause chapter narration'
                      : 'Play chapter narration'
                  }
                >
                  {isNarrating && !isNarrationPaused ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 translate-x-0.2" />
                  )}
                </button>

                {/* Next Verse */}
                <button
                  type="button"
                  onClick={handleNextNarrationVerse}
                  title="Next Verse"
                  className="p-1 rounded-lg hover:bg-[#D97706]/20 text-[#1C1917] dark:text-[#FAF7F2] transition-colors cursor-pointer"
                  aria-label="Next verse in audio narration"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {/* Stop Narration */}
                <button
                  type="button"
                  onClick={() => {
                    stopNarration();
                    setIsAudioPlayerVisible(false);
                  }}
                  title="Stop Narration & Close Player"
                  className="p-1 rounded-lg hover:bg-[#D97706]/20 text-[#1C1917] dark:text-[#FAF7F2] transition-colors cursor-pointer"
                  aria-label="Stop audio narration and close toolbar player"
                >
                  <Square className="w-3 h-3 text-[#D97706]" />
                </button>

                {/* Bookmark Current Timestamp */}
                <button
                  type="button"
                  onClick={() => {
                    const vNum = narratingVerseNumber ?? selectedVerseNumber ?? 1;
                    saveAudioBookmark(vNum, narrationSeconds);
                    setResumedBookmarkNotice(`Saved audio bookmark at Verse ${vNum}`);
                    setTimeout(() => setResumedBookmarkNotice(null), 2500);
                  }}
                  title="Bookmark Current Audio Timestamp"
                  className="p-1 rounded-lg hover:bg-[#D97706]/20 text-[#1C1917] dark:text-[#FAF7F2] transition-colors cursor-pointer"
                  aria-label="Bookmark current audio narration timestamp"
                >
                  <BookmarkCheck className="w-3.5 h-3.5 text-[#D97706]" />
                </button>

                {/* Speed Switcher */}
                <div className="hidden sm:flex items-center gap-0.5 pl-1 border-l border-[#D97706]/30">
                  {[0.8, 1.0, 1.2].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSetSpeed(s)}
                      className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                        narrationSpeed === s
                          ? 'bg-[#1C1917] text-[#FAF7F2] dark:bg-[#FAF7F2] dark:text-[#1C1917]'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      title={`Set playback speed to ${s}x`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>

                {/* Visual Reading-Time Remaining Timer (Adjusted by Narration Speed) */}
                {(() => {
                  const currentIdx = narratingVerseNumber
                    ? currentChapter.verses.findIndex((v) => v.verse === narratingVerseNumber)
                    : 0;
                  const remainingVerses = Math.max(
                    0,
                    currentChapter.verses.length - Math.max(0, currentIdx)
                  );
                  const totalSecsRemaining = Math.round(
                    (remainingVerses * 5) / narrationSpeed
                  );
                  const remMins = Math.floor(totalSecsRemaining / 60);
                  const remSecs = totalSecsRemaining % 60;
                  const timeLabel = `${remMins}:${String(remSecs).padStart(2, '0')}`;
                  return (
                    <div className="hidden md:inline-flex items-center gap-1 font-mono text-[10.5px] text-[#92400E] dark:text-[#FBBF24] pl-2 border-l border-[#D97706]/30">
                      <Clock className="w-3 h-3 text-[#D97706]" />
                      <span>{timeLabel} left ({narrationSpeed}x)</span>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* TEXT HIGHLIGHTING COLLECTION BUTTON & DRAWER TRIGGER */}
            <button
              type="button"
              onClick={() => setIsHighlightDrawerOpen((prev) => !prev)}
              aria-expanded={isHighlightDrawerOpen}
              aria-label="View saved highlighted verses"
              className={`min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                isHighlightDrawerOpen
                  ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706]'
                  : savedHighlights.length > 0
                  ? 'border-[#D97706]/40 ' + mutedSurfaceClasses
                  : mutedSurfaceClasses
              }`}
              title="View & Manage Highlighted Verses Collection"
            >
              <Highlighter className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
              <span>Highlights</span>
              {savedHighlights.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#D97706] text-[#1A1A1A]">
                  {savedHighlights.length}
                </span>
              )}
            </button>

            {/* QUICK HIGHLIGHT MODE TOGGLE */}
            <div className="hidden sm:inline-flex items-center rounded-xl border p-0.5 gap-1 border-[#E5DEC9] dark:border-[#36312E] bg-current/5">
              <button
                type="button"
                onClick={() => setIsHighlightModeActive((prev) => !prev)}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  isHighlightModeActive
                    ? 'bg-[#1C1917] text-[#FAF7F2] dark:bg-[#FAF7F2] dark:text-[#1C1917] shadow-2xs'
                    : 'opacity-70 hover:opacity-100'
                }`}
                title={
                  isHighlightModeActive
                    ? 'Highlight Mode Active: Click any verse on the page to mark'
                    : 'Turn on Highlight Mode to paint verses with clicks'
                }
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: HIGHLIGHT_COLORS[activeHighlightColor].dotColor,
                  }}
                />
                <span className="hidden md:inline">
                  {isHighlightModeActive ? 'Highlighting On' : 'Highlight Tool'}
                </span>
              </button>
              {(['amber', 'sage', 'rose', 'sky'] as HighlightColor[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setActiveHighlightColor(c);
                    setIsHighlightModeActive(true);
                  }}
                  className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                    activeHighlightColor === c
                      ? 'ring-2 ring-[#1C1917] dark:ring-[#FAF7F2] scale-110'
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{backgroundColor: HIGHLIGHT_COLORS[c].dotColor}}
                  title={`Set highlight color: ${HIGHLIGHT_COLORS[c].label}`}
                />
              ))}
            </div>

            {/* Spacing & Page Width Settings Toggle */}
            <button
              type="button"
              onClick={() => setShowSettingsBar((prev) => !prev)}
              aria-expanded={showSettingsBar}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                showSettingsBar
                  ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706]'
                  : mutedSurfaceClasses
              }`}
              title="Customize Line Spacing & Page Margins"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Margins</span>
            </button>

            {/* Zen Focus Toggle */}
            <button
              type="button"
              onClick={() => setIsZenImmersion((prev) => !prev)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isZenImmersion
                  ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706]'
                  : mutedSurfaceClasses
              }`}
              title={
                isZenImmersion
                  ? 'Exit Zen Immersion Mode'
                  : 'Enter Distraction-Free Zen Reading Mode'
              }
            >
              {isZenImmersion ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Night Sanctuary 2100K Toggle */}
            {onToggleNightSanctuary && (
              <button
                type="button"
                onClick={onToggleNightSanctuary}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${mutedSurfaceClasses}`}
                title="Toggle 2100K Night Sanctuary Palette"
              >
                {isNightSanctuary ? (
                  <Sun className="w-4 h-4 text-[#FBBF24]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#92400E]" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Resumed Audio Bookmark Notification Banner */}
        {resumedBookmarkNotice && (
          <div className="px-4 py-1.5 bg-[#D97706] text-[#1A1A1A] font-bold text-xs flex items-center justify-between animate-in fade-in slide-in-from-top-1">
            <div className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4" />
              <span>{resumedBookmarkNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setResumedBookmarkNotice(null)}
              className="p-0.5 hover:bg-[#1A1A1A]/10 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Integrated Narration Chapter Progress Bar */}
        {(isNarrating || isAudioPlayerVisible) && (
          <div
            role="progressbar"
            aria-label="Chapter audio narration progress"
            aria-valuenow={narratingVerseNumber ?? selectedVerseNumber ?? 1}
            aria-valuemin={1}
            aria-valuemax={currentChapter.verses.length}
            className="h-1 w-full bg-current/10 overflow-hidden"
          >
            <div
              className="h-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] transition-all duration-300"
              style={{
                width: `${Math.min(
                  100,
                  Math.max(
                    6,
                    Math.round(
                      ((narratingVerseNumber ?? selectedVerseNumber ?? 1) /
                        Math.max(1, currentChapter.verses.length)) *
                        100
                    )
                  )
                )}%`,
              }}
            />
          </div>
        )}

        {/* EXPANDABLE LAYOUT & MARGIN SETTINGS BAR */}
        {showSettingsBar && (
          <div
            className={`border-t px-4 sm:px-6 py-3 ${
              isNightSanctuary
                ? 'bg-[#1C1917] border-[#2E2925]'
                : 'bg-[#F2ECE1]/90 border-[#E5DEC9]'
            }`}
          >
            <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
              {/* Mobile/Tablet Layout Switcher */}
              <div className="flex lg:hidden items-center gap-1.5 flex-wrap">
                <span className="font-mono uppercase text-[10px] opacity-75">
                  View:
                </span>
                {(
                  [
                    {id: 'page', label: 'Chapter Page'},
                    {
                      id: 'all-chapters',
                      label: `All ${currentBook.totalChapters} Chapters`,
                    },
                    {id: 'verse', label: 'Verses'},
                    {id: 'parallel', label: 'Parallel'},
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setLayoutMode(m.id)}
                    className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                      layoutMode === m.id
                        ? 'bg-[#D97706] text-[#1A1A1A]'
                        : 'border border-current/20'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Font Size Quick Pills */}
              <div className="flex items-center gap-2">
                <span className="font-mono uppercase text-[10px] opacity-75">
                  Font Size:
                </span>
                {FONT_SIZE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFontSize(opt.id)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                      fontSize === opt.id
                        ? 'bg-[#D97706] text-[#1A1A1A]'
                        : 'hover:bg-[#D97706]/15 border border-current/15'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Line Spacing */}
              <div className="flex items-center gap-2">
                <span className="font-mono uppercase text-[10px] opacity-75">
                  Line Spacing:
                </span>
                {(
                  [
                    {id: 'snug', label: 'Compact'},
                    {id: 'relaxed', label: 'Balanced'},
                    {id: 'contemplative', label: 'Contemplative'},
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setLineSpacing(opt.id)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                      lineSpacing === opt.id
                        ? 'bg-[#D97706] text-[#1A1A1A]'
                        : 'hover:bg-[#D97706]/15 border border-current/15'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Page Column Width */}
              {layoutMode !== 'parallel' && (
                <div className="flex items-center gap-2">
                  <span className="font-mono uppercase text-[10px] opacity-75">
                    Page Margins:
                  </span>
                  {(
                    [
                      {id: 'book', label: 'Book Column'},
                      {id: 'wide', label: 'Wide Sanctuary'},
                      {id: 'full', label: 'Full Bleed'},
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPageWidth(opt.id)}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                        pageWidth === opt.id
                          ? 'bg-[#D97706] text-[#1A1A1A]'
                          : 'hover:bg-[#D97706]/15 border border-current/15'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* COMPLETE 66-BOOK & 1,189-CHAPTER SELECTOR DRAWER */}
        {isBookDrawerOpen && (
          <div
            className={`border-t px-4 sm:px-6 py-6 shadow-2xl max-h-[80vh] overflow-y-auto ${
              isNightSanctuary
                ? 'bg-[#1C1917] border-[#2E2925]'
                : 'bg-[#FAF7F2] border-[#E5DEC9]'
            }`}
          >
            <div className="max-w-[1280px] mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-current/10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D97706] font-semibold">
                    Complete Biblical Canon · 66 Books · {TOTAL_BIBLE_CHAPTERS.toLocaleString()} Chapters · All 5 Versions
                  </span>
                  <h3
                    className="text-xl sm:text-2xl font-bold mt-0.5"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Select Any Biblical Book &amp; Chapter for Simple, Clear Page Reading
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Search Input */}
                  <div className="relative w-64">
                    <Search className="w-3.5 h-3.5 text-[#D97706] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search any of the 66 books..."
                      className={`w-full pl-8 pr-7 py-1.5 rounded-xl border text-xs focus:outline-none focus:border-[#D97706] ${surfaceClasses}`}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Testament Filter */}
                  {(['all', 'Old Testament', 'New Testament'] as const).map(
                    (t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTestamentFilter(t)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                          testamentFilter === t
                            ? 'bg-[#D97706] text-[#1A1A1A]'
                            : mutedSurfaceClasses
                        }`}
                      >
                        {t === 'all' ? 'All 66 Books' : t}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    onClick={() => setIsBookDrawerOpen(false)}
                    className={`p-1.5 rounded-xl border cursor-pointer ${mutedSurfaceClasses}`}
                    aria-label="Close chapter index"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 66 Books Grid with Expandable Chapter Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredBooks.map((book) => {
                  const isCurrentBook = book.id === currentBook.id;
                  return (
                    <div
                      key={book.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                        isCurrentBook
                          ? 'border-[#D97706] ring-2 ring-[#D97706]/40 bg-[#D97706]/10'
                          : `${surfaceClasses} hover:border-[#D97706]/60`
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                          <span className="text-[#D97706] font-bold">
                            {book.testament} · {book.category}
                          </span>
                          <span className="opacity-75">
                            {book.totalChapters}{' '}
                            {book.totalChapters === 1 ? 'Chapter' : 'Chapters'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectBookAndChapter(book.id, 1)
                            }
                            className="text-lg font-bold text-left hover:text-[#D97706] cursor-pointer"
                            style={{fontFamily: 'var(--font-display), serif'}}
                          >
                            {book.name}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedBookId(book.id);
                              setSelectedChapterNumber(1);
                              setLayoutMode('all-chapters');
                              setIsBookDrawerOpen(false);
                            }}
                            className="text-[11px] font-mono text-[#92400E] dark:text-[#FBBF24] hover:underline cursor-pointer"
                          >
                            Read All {book.totalChapters} Ch. →
                          </button>
                        </div>
                        <p className="text-xs opacity-80 line-clamp-1">
                          {book.themeSummary}
                        </p>
                      </div>

                      {/* Quick Chapter Number Picker inside Book Card */}
                      <div className="flex flex-wrap items-center gap-1 pt-2 border-t border-current/10 max-h-28 overflow-y-auto">
                        {Array.from(
                          {length: book.totalChapters},
                          (_, idx) => idx + 1
                        ).map((chNum) => {
                          const isSelectedCh =
                            isCurrentBook && selectedChapterNumber === chNum;
                          const isRead = Boolean(
                            chaptersReadMap[`${book.id}-${chNum}`]
                          );
                          return (
                            <button
                              key={chNum}
                              type="button"
                              onClick={() =>
                                handleSelectBookAndChapter(book.id, chNum)
                              }
                              className={`min-w-[28px] h-7 px-1.5 rounded-lg font-mono text-[11px] font-semibold transition-colors cursor-pointer ${
                                isSelectedCh
                                  ? 'bg-[#D97706] text-[#1A1A1A] font-bold'
                                  : isRead
                                  ? 'bg-[#10B981]/20 text-[#047857] dark:text-[#34D399] border border-[#10B981]/40'
                                  : 'bg-current/5 hover:bg-[#D97706]/25'
                              }`}
                              title={`Read ${book.name} Chapter ${chNum}`}
                            >
                              {chNum}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* SAVED HIGHLIGHTED VERSES COLLECTION DRAWER */}
        {isHighlightDrawerOpen && (
          <div
            className={`border-t px-4 sm:px-6 py-6 shadow-2xl max-h-[80vh] overflow-y-auto ${
              isNightSanctuary
                ? 'bg-[#1C1917] border-[#2E2925]'
                : 'bg-[#FAF7F2] border-[#E5DEC9]'
            }`}
          >
            <div className="max-w-[1280px] mx-auto space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-current/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D97706] font-semibold">
                    <Highlighter className="w-3.5 h-3.5" />
                    <span>Local Study Sanctuary · Highlighted Verses</span>
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-bold"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Your Saved Biblical Highlights ({savedHighlights.length})
                  </h3>
                  <p className="text-xs opacity-75">
                    Saved locally on this device in warm sanctuary tints. Click any verse to jump directly into context.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Color Filter Tabs */}
                  <div className="inline-flex items-center gap-1 p-1 rounded-xl border bg-current/5 border-current/10 text-xs">
                    <button
                      type="button"
                      onClick={() => setHighlightFilterColor('all')}
                      className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
                        highlightFilterColor === 'all'
                          ? 'bg-[#1C1917] text-[#FAF7F2] dark:bg-[#FAF7F2] dark:text-[#1C1917]'
                          : 'opacity-75 hover:opacity-100'
                      }`}
                    >
                      All ({savedHighlights.length})
                    </button>
                    {(['amber', 'sage', 'rose', 'sky'] as HighlightColor[]).map((c) => {
                      const count = savedHighlights.filter((h) => h.color === c).length;
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setHighlightFilterColor(c)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
                            highlightFilterColor === c
                              ? 'bg-[#1C1917] text-[#FAF7F2] dark:bg-[#FAF7F2] dark:text-[#1C1917]'
                              : 'opacity-75 hover:opacity-100'
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{backgroundColor: HIGHLIGHT_COLORS[c].dotColor}}
                          />
                          <span>{HIGHLIGHT_COLORS[c].label.split(' ')[0]}</span>
                          <span className="text-[10px] opacity-70">({count})</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Copy All Notes */}
                  {savedHighlights.length > 0 && (
                    <button
                      type="button"
                      onClick={handleCopyAllHighlights}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${mutedSurfaceClasses} hover:border-[#D97706]`}
                      title="Copy all highlighted verses to clipboard as study notes"
                    >
                      {copiedHighlightsNotice ? (
                        <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-[#D97706]" />
                      )}
                      <span>{copiedHighlightsNotice ? 'Copied All ✓' : 'Export Notes'}</span>
                    </button>
                  )}

                  {/* Clear All */}
                  {savedHighlights.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearAllHighlights}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-500/10 cursor-pointer"
                      title="Clear all saved highlights"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsHighlightDrawerOpen(false)}
                    className={`p-2 rounded-xl border cursor-pointer ${mutedSurfaceClasses}`}
                    aria-label="Close highlights drawer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Highlights List or Empty State */}
              {filteredHighlights.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <Highlighter className="w-10 h-10 text-[#D97706]/40 mx-auto" />
                  <p className="text-sm font-medium">
                    {savedHighlights.length === 0
                      ? 'No highlighted verses yet. Click any verse or turn on the Highlight Tool to mark verses.'
                      : 'No highlights found matching this color filter.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredHighlights.map((h) => {
                    const colorMeta = HIGHLIGHT_COLORS[h.color];
                    const isEditingThisNote = editingNoteVerseId === h.id;
                    return (
                      <div
                        key={h.id}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${surfaceClasses} hover:border-[#D97706]`}
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-xs font-bold text-[#D97706]">
                              {h.bookName} {h.chapter}:{h.verse} ({h.version})
                            </span>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${colorMeta.badgeBg}`}
                            >
                              {colorMeta.label}
                            </span>
                          </div>
                          <p
                            className="text-sm sm:text-base leading-relaxed"
                            style={{fontFamily: 'var(--font-display), Georgia, serif'}}
                          >
                            &ldquo;{h.text}&rdquo;
                          </p>

                          {/* PERSONAL REFLECTION / QUESTION NOTE SECTION */}
                          {isEditingThisNote ? (
                            <div className="p-3 rounded-xl bg-current/5 border border-[#D97706]/50 space-y-2 text-xs">
                              <div className="flex flex-wrap items-center justify-between gap-1.5">
                                <span className="font-mono text-[10px] uppercase tracking-wider text-[#92400E] dark:text-[#FBBF24] font-semibold">
                                  Personal Study Note
                                </span>
                                <div className="flex items-center gap-1">
                                  {(
                                    [
                                      {id: 'reflection', label: 'Reflection'},
                                      {id: 'question', label: 'Question'},
                                      {id: 'prayer', label: 'Prayer'},
                                    ] as const
                                  ).map((nt) => (
                                    <button
                                      key={nt.id}
                                      type="button"
                                      onClick={() => setNoteDraftType(nt.id)}
                                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold cursor-pointer ${
                                        noteDraftType === nt.id
                                          ? 'bg-[#D97706] text-[#1A1A1A]'
                                          : 'border border-current/20 opacity-75 hover:opacity-100'
                                      }`}
                                    >
                                      {nt.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <textarea
                                rows={3}
                                value={noteDraftText}
                                onChange={(e) => setNoteDraftText(e.target.value)}
                                placeholder={
                                  noteDraftType === 'question'
                                    ? 'Write an honest question this verse raises...'
                                    : noteDraftType === 'prayer'
                                    ? 'Write a personal prayer inspired by this verse...'
                                    : 'Write a personal reflection or insight...'
                                }
                                className="w-full p-2.5 rounded-lg bg-transparent border border-current/20 focus:border-[#D97706] focus:outline-none text-xs leading-relaxed resize-none"
                              />

                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setEditingNoteVerseId(null)}
                                  className="px-2.5 py-1 rounded-lg border border-current/20 text-[11px] font-medium hover:bg-current/5 cursor-pointer"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleSaveHighlightNote(
                                      h.id,
                                      noteDraftText,
                                      noteDraftType
                                    )
                                  }
                                  className="px-3 py-1 rounded-lg bg-[#D97706] hover:bg-[#F59E0B] text-[#1A1A1A] font-bold text-[11px] cursor-pointer"
                                >
                                  Save Note (+10 pts)
                                </button>
                              </div>
                            </div>
                          ) : h.note ? (
                            <div className="p-2.5 rounded-xl bg-current/5 border-l-2 border-[#D97706] space-y-1 text-xs">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-mono text-[10px] uppercase tracking-wider text-[#92400E] dark:text-[#FBBF24] font-semibold">
                                  {h.noteType === 'question'
                                    ? 'Honest Question'
                                    : h.noteType === 'prayer'
                                    ? 'Prayer Response'
                                    : 'Personal Reflection'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleOpenNoteEditor(h)}
                                  className="text-[10px] font-mono text-[#D97706] hover:underline cursor-pointer"
                                >
                                  Edit Note
                                </button>
                              </div>
                              <p className="text-xs opacity-90 leading-relaxed whitespace-pre-wrap">
                                {h.note}
                              </p>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleOpenNoteEditor(h)}
                              className="w-full py-1.5 px-2.5 rounded-xl border border-dashed border-current/20 hover:border-[#D97706] text-[11px] font-mono opacity-75 hover:opacity-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <FileText className="w-3 h-3 text-[#D97706]" />
                              <span>+ Add Personal Reflection or Question</span>
                            </button>
                          )}
                        </div>

                        <div className="pt-3 border-t border-current/10 flex items-center justify-between gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => handleJumpToHighlight(h)}
                            className="font-mono font-bold text-[#92400E] dark:text-[#FBBF24] hover:underline cursor-pointer"
                          >
                            Read in Context →
                          </button>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenNoteEditor(h)}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-current/20 hover:border-[#D97706] font-semibold text-[11px] cursor-pointer"
                              title="Add or edit personal reflection / question"
                            >
                              <FileText className="w-3 h-3 text-[#D97706]" />
                              <span>{h.note ? 'Edit Note' : 'Note'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setSharingVerse(h)}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-[#D97706]/30 bg-[#D97706]/10 text-[#92400E] dark:text-[#FBBF24] hover:bg-[#D97706]/20 font-semibold text-[11px] cursor-pointer"
                              title="Create Shareable Quote Card (Image & WhatsApp)"
                            >
                              <Share2 className="w-3 h-3 text-[#D97706]" />
                              <span>Share Card</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                handleCopyVerse(h.version, h.verse, h.text);
                              }}
                              className="p-1.5 rounded-lg opacity-70 hover:opacity-100 hover:text-[#D97706] cursor-pointer"
                              title="Copy quote"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveHighlight(h.id)}
                              className="p-1.5 rounded-lg opacity-70 hover:opacity-100 hover:text-rose-500 cursor-pointer"
                              title="Remove highlight"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* MAIN FULL-PAGE SCRIPTURE READING CANVAS */}
      <main className="flex-1 w-full px-4 sm:px-8 py-8 sm:py-12">
        <div className={`w-full ${containerWidthClass} mx-auto space-y-8`}>
          {/* Simple & Clear Book Chapter Selector Bar + Book Reading Progress */}
          {!isZenImmersion && (
            <div
              className={`p-5 sm:p-7 rounded-3xl border shadow-2xs space-y-5 ${surfaceClasses}`}
            >
              {/* Top Row: Book Context + Chapters Read Progress Tracker */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-current/10">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#92400E] dark:text-[#FBBF24]">
                    <span className="uppercase tracking-widest font-bold">
                      {currentBook.testament}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{currentBook.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{currentChapter.historicalContext}</span>
                  </div>
                  <h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    {layoutMode === 'all-chapters'
                      ? `${currentBook.name} (All ${currentBook.totalChapters} Chapters)`
                      : currentChapter.reference}
                  </h1>
                  <p
                    className="text-base sm:text-lg italic opacity-85"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    {layoutMode === 'all-chapters'
                      ? currentBook.themeSummary
                      : currentChapter.title}
                  </p>
                </div>

                {/* Book Chapters Read Counter & Subtle Progress Bar */}
                <div
                  className={`p-4 rounded-2xl border min-w-[260px] space-y-2 ${mutedSurfaceClasses}`}
                >
                  <div className="flex items-center justify-between gap-3 text-xs font-mono">
                    <span className="font-semibold text-[#92400E] dark:text-[#FBBF24]">
                      {currentBook.name} Progress
                    </span>
                    <span className="font-bold">
                      {bookChaptersReadCount} / {currentBook.totalChapters} Ch. Read ({bookProgressPercent}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-current/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D97706] to-[#10B981] rounded-full transition-all duration-500"
                      style={{width: `${bookProgressPercent}%`}}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1 text-[11px]">
                    <span className="font-mono opacity-75">
                      Canon Total: {totalChaptersReadCount} / {TOTAL_BIBLE_CHAPTERS.toLocaleString()}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleToggleChapterRead(
                          currentBook.id,
                          selectedChapterNumber
                        )
                      }
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition-colors cursor-pointer ${
                        isCurrentChapterRead
                          ? 'bg-[#10B981]/20 text-[#047857] dark:text-[#34D399] border border-[#10B981]/40'
                          : 'bg-[#D97706] text-[#1A1A1A]'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {isCurrentChapterRead
                          ? `Ch. ${selectedChapterNumber} Read ✓`
                          : `Mark Ch. ${selectedChapterNumber} Read`}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Visible Chapter Number Strip for Current Book (All Chapters 1..N Clearly Clickable) */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-mono uppercase tracking-wider opacity-75">
                    {currentBook.name} Chapters (1–{currentBook.totalChapters}) — Click any chapter or view all on one page:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setLayoutMode((prev) =>
                          prev === 'all-chapters' ? 'page' : 'all-chapters'
                        )
                      }
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                        layoutMode === 'all-chapters'
                          ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706]'
                          : `${mutedSurfaceClasses} hover:border-[#D97706]`
                      }`}
                    >
                      {layoutMode === 'all-chapters'
                        ? 'Showing All Chapters on Page ✓'
                        : `Show All ${currentBook.totalChapters} Chapters on Page`}
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 max-h-36 overflow-y-auto p-2 rounded-2xl border border-current/10">
                  {Array.from(
                    {length: currentBook.totalChapters},
                    (_, i) => i + 1
                  ).map((chNum) => {
                    const isSelected = selectedChapterNumber === chNum;
                    const isRead = Boolean(
                      chaptersReadMap[`${currentBook.id}-${chNum}`]
                    );
                    return (
                      <button
                        key={chNum}
                        type="button"
                        onClick={() => {
                          setSelectedChapterNumber(chNum);
                          setSelectedVerseNumber(1);
                          if (layoutMode === 'all-chapters') {
                            const el = document.getElementById(
                              `full-book-chapter-${chNum}`
                            );
                            el?.scrollIntoView({behavior: 'smooth'});
                          }
                        }}
                        className={`min-w-[34px] h-8 px-2 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#D97706] text-[#1A1A1A] font-bold shadow-2xs'
                            : isRead
                            ? 'bg-[#10B981]/20 text-[#047857] dark:text-[#34D399] border border-[#10B981]/40'
                            : `${mutedSurfaceClasses} hover:border-[#D97706]`
                        }`}
                      >
                        {chNum}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* GUIDED AUDIO READING FOLLOW-ALONG BANNER WITH RHYTHMIC PULSE INDICATOR */}
          {(isNarrating || isAudioPlayerVisible) && (
            <div className="p-3.5 sm:px-5 rounded-2xl bg-[#1C1917] text-[#FAF7F2] border border-[#D97706] shadow-md flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {/* Rhythmic 4-Bar Pulse Indicator for Younger Readers */}
                <div
                  aria-label="Rhythmic audio pulse indicator"
                  className="w-9 h-9 rounded-xl bg-[#292524] border border-[#D97706] flex items-center justify-center gap-0.5 px-1.5 shrink-0"
                >
                  {[0, 1, 2, 3].map((barIdx) => {
                    const isBeatActive =
                      isNarrating &&
                      !isNarrationPaused &&
                      rhythmicBeatStep === barIdx;
                    return (
                      <span
                        key={barIdx}
                        className={`w-1 rounded-full bg-[#D97706] transition-all duration-300 ${
                          isBeatActive
                            ? 'h-5 bg-[#FBBF24] shadow-[0_0_6px_#FBBF24]'
                            : isNarrating && !isNarrationPaused
                            ? 'h-2.5 opacity-80'
                            : 'h-1.5 opacity-40'
                        }`}
                      />
                    );
                  })}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#FBBF24] font-semibold">
                      Guided Audio Reading · Follow Along
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D97706]/20 text-[#FDE68A] border border-[#D97706]/40">
                      {isNarrating && !isNarrationPaused
                        ? `Speaking Verse ${narratingVerseNumber ?? 1}`
                        : 'Ready to Read Aloud'}
                    </span>
                  </div>
                  <p className="text-xs text-[#D6D3D1] truncate mt-0.5">
                    Verses highlight and pulse in rhythm as they are spoken to help younger readers follow every line.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsGuidedAudioMode((prev) => !prev)}
                  aria-pressed={isGuidedAudioMode}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                    isGuidedAudioMode
                      ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706]'
                      : 'bg-[#292524] text-[#D6D3D1] border-[#3E3834]'
                  }`}
                >
                  {isGuidedAudioMode ? 'Auto-Scroll & Pulse: ON' : 'Auto-Scroll: OFF'}
                </button>
              </div>
            </div>
          )}

          {/* MODE 1: SIMPLE & CLEAR SINGLE CHAPTER BOOK PAGE FORMAT */}
          {layoutMode === 'page' && (
            <article
              className={`p-8 sm:p-12 lg:p-16 rounded-3xl border shadow-xs transition-all ${surfaceClasses}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-6 mb-6 border-b border-current/10 text-xs font-mono">
                <span>
                  {currentBook.name} · Chapter {currentChapter.chapter} of{' '}
                  {currentBook.totalChapters}
                </span>
                <span className="text-[#92400E] dark:text-[#FBBF24] font-semibold">
                  {activeVersionMeta.fullName} ({activeVersionMeta.shortName})
                </span>
              </div>

              <div
                className={`${fontSizeClass} ${lineSpacingClass} space-y-6`}
                style={{fontFamily: 'var(--font-display), Georgia, serif'}}
              >
                {/* Drop-Cap Chapter Number */}
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="float-left text-5xl sm:text-6xl font-bold text-[#D97706] pr-4 pt-1 leading-none select-none"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    {currentChapter.chapter}
                  </span>

                  {currentChapter.verses.map((v, idx) => {
                    const isSelected = selectedVerseNumber === v.verse;
                    const startNewBlock = idx > 0 && v.paragraphStart;
                    const highlightKey = `${currentBook.id}-${currentChapter.chapter}-${v.verse}`;
                    const highlight = highlightsMap[highlightKey];
                    const isCurrentlyNarrated =
                      isNarrating && narratingVerseNumber === v.verse;

                    const highlightClasses = isCurrentlyNarrated
                      ? 'bg-[#D97706]/30 ring-2 ring-[#D97706] shadow-md rounded-lg'
                      : highlight
                      ? `${HIGHLIGHT_COLORS[highlight.color].lightBg} ${
                          HIGHLIGHT_COLORS[highlight.color].darkBg
                        } ring-1 ${
                          HIGHLIGHT_COLORS[highlight.color].borderCol
                        } rounded-lg shadow-2xs`
                      : isSelected
                      ? 'bg-[#D97706]/20 ring-1 ring-[#D97706]/50 rounded-lg'
                      : 'hover:bg-[#D97706]/10 rounded-lg';

                    return (
                      <React.Fragment key={v.verse}>
                        {startNewBlock && <div className="h-4 clear-both" />}
                        <span
                          id={`guided-reader-verse-${v.verse}`}
                          onClick={() => {
                            if (isHighlightModeActive) {
                              handleToggleHighlightVerse(v.verse);
                            } else {
                              setSelectedVerseNumber(v.verse);
                              setShowAllVersionsInspector(true);
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              if (isHighlightModeActive) {
                                handleToggleHighlightVerse(v.verse);
                              } else {
                                setSelectedVerseNumber(v.verse);
                                setShowAllVersionsInspector(true);
                              }
                            }
                          }}
                          title={
                            isCurrentlyNarrated
                              ? `Currently narrating verse ${v.verse}`
                              : highlight
                              ? `${currentChapter.book} ${currentChapter.chapter}:${v.verse} (Highlighted in ${
                                  HIGHLIGHT_COLORS[highlight.color].label
                                })`
                              : isHighlightModeActive
                              ? `Click to highlight verse ${v.verse} in ${
                                  HIGHLIGHT_COLORS[activeHighlightColor].label
                                }`
                              : `Click to inspect verse ${v.verse} across all 5 versions`
                          }
                          className={`inline px-1.5 py-0.5 transition-all cursor-pointer ${highlightClasses}`}
                        >
                          {isCurrentlyNarrated && (
                            <span
                              aria-label="Rhythmic pulse indicator"
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 mr-1.5 rounded bg-[#1C1917] text-[#FBBF24] font-mono text-[10px] font-bold align-middle shadow-xs"
                            >
                              <span className="w-2 h-2 rounded-full bg-[#D97706] animate-ping inline-block" />
                              <span>Speaking</span>
                            </span>
                          )}
                          <sup className="font-mono text-[11px] font-bold text-[#D97706] mr-1.5 select-none">
                            {v.verse}
                          </sup>
                          <span>{v.text[activeVersion]} </span>
                        </span>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Subtle Version Switcher Strip Inside Bottom of Book Page */}
              <div className="mt-10 pt-6 border-t border-current/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 opacity-75">
                  <BookmarkCheck className="w-4 h-4 text-[#D97706]" />
                  <span>
                    Click any verse on the page to compare all 5 versions (AKJV, AMP, NASB, NIV, NLT) below.
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[11px] opacity-70 mr-1">
                    Instant Version Switch:
                  </span>
                  {FULL_BIBLE_VERSIONS.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setActiveVersion(v.id)}
                      className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-colors cursor-pointer ${
                        activeVersion === v.id
                          ? 'bg-[#D97706] text-[#1A1A1A]'
                          : 'border border-current/20 hover:border-[#D97706]'
                      }`}
                    >
                      {v.shortName}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          )}

          {/* MODE 2: ALL CHAPTERS OF SELECTED BOOK VISIBLE IN SIMPLE, CLEAR PAGE FORMAT */}
          {layoutMode === 'all-chapters' && (
            <div className="space-y-8">
              {allChaptersInCurrentBook.map((chapterItem) => {
                const chRead = Boolean(
                  chaptersReadMap[`${currentBook.id}-${chapterItem.chapter}`]
                );
                return (
                  <article
                    key={chapterItem.id}
                    id={`full-book-chapter-${chapterItem.chapter}`}
                    className={`p-8 sm:p-12 rounded-3xl border shadow-xs transition-all ${surfaceClasses}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-current/10">
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-[#D97706] font-bold">
                          {currentBook.name} · Chapter {chapterItem.chapter} of{' '}
                          {currentBook.totalChapters}
                        </span>
                        <h2
                          className="text-2xl sm:text-3xl font-bold mt-0.5"
                          style={{fontFamily: 'var(--font-display), serif'}}
                        >
                          {chapterItem.reference} — {chapterItem.title}
                        </h2>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleToggleChapterRead(
                              currentBook.id,
                              chapterItem.chapter
                            )
                          }
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-colors cursor-pointer ${
                            chRead
                              ? 'bg-[#10B981]/20 text-[#047857] dark:text-[#34D399] border border-[#10B981]/40'
                              : `${mutedSurfaceClasses} hover:border-[#D97706]`
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{chRead ? 'Chapter Read ✓' : 'Mark Read'}</span>
                        </button>
                      </div>
                    </div>

                    <div
                      className={`${fontSizeClass} ${lineSpacingClass}`}
                      style={{
                        fontFamily: 'var(--font-display), Georgia, serif',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="float-left text-4xl sm:text-5xl font-bold text-[#D97706] pr-3.5 pt-1 leading-none select-none"
                        style={{fontFamily: 'var(--font-display), serif'}}
                      >
                        {chapterItem.chapter}
                      </span>
                      {chapterItem.verses.map((v, idx) => {
                        const highlightKey = `${currentBook.id}-${chapterItem.chapter}-${v.verse}`;
                        const highlight = highlightsMap[highlightKey];
                        const isCurrentlyNarrated =
                          isNarrating &&
                          selectedChapterNumber === chapterItem.chapter &&
                          narratingVerseNumber === v.verse;
                        const isSelected =
                          selectedChapterNumber === chapterItem.chapter &&
                          selectedVerseNumber === v.verse;

                        const highlightClasses = isCurrentlyNarrated
                          ? 'bg-[#D97706]/30 ring-2 ring-[#D97706] shadow-sm animate-pulse rounded-lg'
                          : highlight
                          ? `${HIGHLIGHT_COLORS[highlight.color].lightBg} ${
                              HIGHLIGHT_COLORS[highlight.color].darkBg
                            } ring-1 ${
                              HIGHLIGHT_COLORS[highlight.color].borderCol
                            } rounded-lg`
                          : isSelected
                          ? 'bg-[#D97706]/20 ring-1 ring-[#D97706]/50 rounded'
                          : 'hover:bg-[#D97706]/10 rounded';

                        return (
                          <React.Fragment key={v.verse}>
                            {idx > 0 && v.paragraphStart && (
                              <div className="h-3 clear-both" />
                            )}
                            <span
                              onClick={() => {
                                setSelectedChapterNumber(chapterItem.chapter);
                                if (isHighlightModeActive) {
                                  handleToggleHighlightVerse(v.verse);
                                } else {
                                  setSelectedVerseNumber(v.verse);
                                  setShowAllVersionsInspector(true);
                                }
                              }}
                              className={`inline px-1 py-0.5 transition-all cursor-pointer ${highlightClasses}`}
                              title={
                                highlight
                                  ? `${currentBook.name} ${chapterItem.chapter}:${v.verse} (${HIGHLIGHT_COLORS[highlight.color].label})`
                                  : `Click to inspect or highlight ${currentBook.name} ${chapterItem.chapter}:${v.verse}`
                              }
                            >
                              <sup className="font-mono text-[11px] font-bold text-[#D97706] mr-1 select-none">
                                {v.verse}
                              </sup>
                              <span>{v.text[activeVersion]} </span>
                          {CHAPTER_CROSS_REFERENCES[currentBook.id]?.[v.verse] && (
                            <span
                              onMouseEnter={() =>
                                setActivePeekRef(
                                  CHAPTER_CROSS_REFERENCES[currentBook.id][v.verse]
                                )
                              }
                              onMouseLeave={() => setActivePeekRef(null)}
                              onClick={(e) => {
                                e.stopPropagation();
                                const refItem = CHAPTER_CROSS_REFERENCES[currentBook.id][v.verse];
                                setActivePeekRef(
                                  activePeekRef?.reference === refItem.reference
                                    ? null
                                    : refItem
                                );
                              }}
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 ml-1.5 rounded-md bg-[#D97706]/15 hover:bg-[#D97706]/25 border border-[#D97706]/40 text-[#92400E] dark:text-[#FBBF24] font-mono text-[10px] font-semibold transition-colors cursor-pointer align-middle"
                              title={`Hover or click to peek cross-reference: ${
                                CHAPTER_CROSS_REFERENCES[currentBook.id][v.verse].reference
                              }`}
                            >
                              <Link2 className="w-2.5 h-2.5 text-[#D97706]" />
                              <span>Ref: {CHAPTER_CROSS_REFERENCES[currentBook.id][v.verse].reference}</span>
                            </span>
                          )}
                            </span>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* MODE 3: VERSE-BY-VERSE STUDY PAGE */}
          {layoutMode === 'verse' && (
            <div
              className={`p-6 sm:p-10 rounded-3xl border shadow-xs space-y-4 ${surfaceClasses}`}
            >
              {currentChapter.verses.map((v) => {
                const isSelected = selectedVerseNumber === v.verse;
                const copyKey = `${activeVersion}-${v.verse}`;
                const highlightKey = `${currentBook.id}-${currentChapter.chapter}-${v.verse}`;
                const highlight = highlightsMap[highlightKey];
                const isCurrentlyNarrated =
                  isNarrating && narratingVerseNumber === v.verse;

                return (
                  <div
                    key={v.verse}
                    onClick={() => {
                      if (isHighlightModeActive) {
                        handleToggleHighlightVerse(v.verse);
                      } else {
                        setSelectedVerseNumber(v.verse);
                        setShowAllVersionsInspector(true);
                      }
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative ${
                      isCurrentlyNarrated
                        ? 'border-[#D97706] ring-2 ring-[#D97706] bg-[#D97706]/15 shadow-sm'
                        : highlight
                        ? `border-l-4 ${HIGHLIGHT_COLORS[highlight.color].borderCol} ${HIGHLIGHT_COLORS[highlight.color].lightBg} ${HIGHLIGHT_COLORS[highlight.color].darkBg}`
                        : isSelected
                        ? 'border-[#D97706] bg-[#D97706]/10 shadow-2xs'
                        : 'border-current/10 hover:border-[#D97706]/50 hover:bg-[#D97706]/5'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5 min-w-0 flex-1">
                        <span
                          className={`font-mono text-xs font-bold px-2 py-1 rounded-lg shrink-0 mt-1 ${
                            isSelected
                              ? 'bg-[#D97706] text-[#1A1A1A]'
                              : mutedSurfaceClasses
                          }`}
                        >
                          {currentChapter.chapter}:{v.verse}
                        </span>
                        <div className="space-y-1.5 flex-1">
                          <p
                            className={`${fontSizeClass} ${lineSpacingClass}`}
                            style={{
                              fontFamily: 'var(--font-display), Georgia, serif',
                            }}
                          >
                            {v.text[activeVersion]}
                          </p>
                          {highlight && (
                            <div className="flex items-center gap-1.5 pt-1">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor:
                                    HIGHLIGHT_COLORS[highlight.color].dotColor,
                                }}
                              />
                              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#92400E] dark:text-[#FBBF24]">
                                Highlighted in {HIGHLIGHT_COLORS[highlight.color].label}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Quick Listen to this Verse */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsAudioPlayerVisible(true);
                            const idx = currentChapter.verses.findIndex(
                              (item) => item.verse === v.verse
                            );
                            speakVerseByIndex(idx >= 0 ? idx : 0);
                          }}
                          title={`Listen to verse ${v.verse}`}
                          className="p-2 rounded-xl border transition-colors cursor-pointer opacity-70 hover:opacity-100 hover:text-[#D97706] hover:border-[#D97706]"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-[#D97706]" />
                        </button>

                        {/* Quick Highlight Toggle */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleHighlightVerse(v.verse);
                          }}
                          title={
                            highlight
                              ? `Remove highlight from verse ${v.verse}`
                              : `Highlight verse ${v.verse} in ${
                                  HIGHLIGHT_COLORS[activeHighlightColor].label
                                }`
                          }
                          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                            highlight
                              ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706]'
                              : 'opacity-70 hover:opacity-100 hover:text-[#D97706] hover:border-[#D97706]'
                          }`}
                        >
                          <Highlighter className="w-3.5 h-3.5" />
                        </button>

                        {/* Copy Verse */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyVerse(
                              activeVersion,
                              v.verse,
                              v.text[activeVersion]
                            );
                          }}
                          title="Copy verse"
                          className={`p-2 rounded-xl border shrink-0 transition-colors cursor-pointer ${mutedSurfaceClasses} hover:border-[#D97706]`}
                        >
                          {copiedVerseKey === copyKey ? (
                            <Check className="w-3.5 h-3.5 text-[#10B981]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* MODE 4: FULL-PAGE PARALLEL COLUMNS */}
          {layoutMode === 'parallel' && (
            <div
              className={`grid grid-cols-1 ${
                parallelVersions.length === 1
                  ? 'lg:grid-cols-1'
                  : parallelVersions.length === 2
                  ? 'lg:grid-cols-2'
                  : 'lg:grid-cols-3'
              } gap-6`}
            >
              {parallelVersions.map((verId) => {
                const verMeta = FULL_BIBLE_VERSIONS.find(
                  (v) => v.id === verId
                )!;
                return (
                  <div
                    key={verId}
                    className={`rounded-3xl border shadow-xs overflow-hidden flex flex-col ${surfaceClasses}`}
                  >
                    <div
                      className={`p-5 border-b flex items-center justify-between gap-2 ${mutedSurfaceClasses}`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#D97706] text-[#1A1A1A]">
                            {verMeta.shortName}
                          </span>
                          <span className="text-xs font-semibold">
                            {verMeta.fullName}
                          </span>
                        </div>
                        <p className="text-[11px] opacity-75 mt-1">
                          {verMeta.translationPhilosophy}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 space-y-4 flex-1">
                      {currentChapter.verses.map((v) => {
                        const isSelected = selectedVerseNumber === v.verse;
                        const highlightKey = `${currentBook.id}-${currentChapter.chapter}-${v.verse}`;
                        const highlight = highlightsMap[highlightKey];
                        const isCurrentlyNarrated =
                          isNarrating && narratingVerseNumber === v.verse;

                        return (
                          <div
                            key={v.verse}
                            onClick={() => {
                              if (isHighlightModeActive) {
                                handleToggleHighlightVerse(v.verse);
                              } else {
                                setSelectedVerseNumber(v.verse);
                                setShowAllVersionsInspector(true);
                              }
                            }}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                              isCurrentlyNarrated
                                ? 'border-[#D97706] ring-2 ring-[#D97706] bg-[#D97706]/15 shadow-sm'
                                : highlight
                                ? `border-l-4 ${HIGHLIGHT_COLORS[highlight.color].borderCol} ${HIGHLIGHT_COLORS[highlight.color].lightBg} ${HIGHLIGHT_COLORS[highlight.color].darkBg}`
                                : isSelected
                                ? 'border-[#D97706] bg-[#D97706]/12'
                                : 'border-current/10 hover:border-[#D97706]/40'
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="font-mono text-xs font-bold text-[#D97706] mt-1 shrink-0">
                                v.{v.verse}
                              </span>
                              <p
                                className={`${fontSizeClass} ${lineSpacingClass}`}
                                style={{
                                  fontFamily:
                                    'var(--font-display), Georgia, serif',
                                }}
                              >
                                {v.text[verId]}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ALL 5 VERSIONS SYNCHRONIZED VERSE INSPECTOR */}
          {selectedVerseObj && showAllVersionsInspector && (
            <section
              aria-label="All 5 Versions Verse Comparison"
              className={`p-6 sm:p-7 rounded-3xl border border-[#D97706]/50 shadow-sm space-y-5 ${mutedSurfaceClasses}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-current/10">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                  <h2 className="text-sm sm:text-base font-bold font-mono uppercase tracking-wider text-[#92400E] dark:text-[#FBBF24]">
                    All 5 App Versions Side-by-Side · {currentChapter.book}{' '}
                    {currentChapter.chapter}:{selectedVerseObj.verse}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs opacity-75 mr-1">Verse:</span>
                  {currentChapter.verses.map((v) => (
                    <button
                      key={v.verse}
                      type="button"
                      onClick={() => setSelectedVerseNumber(v.verse)}
                      className={`w-7 h-7 rounded-lg font-mono text-xs font-bold transition-colors cursor-pointer ${
                        v.verse === selectedVerseObj.verse
                          ? 'bg-[#D97706] text-[#1A1A1A]'
                          : `${surfaceClasses} hover:border-[#D97706]`
                      }`}
                    >
                      {v.verse}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowAllVersionsInspector(false)}
                    className="ml-2 p-1.5 rounded-lg opacity-70 hover:opacity-100 cursor-pointer"
                    title="Hide 5-Version Inspector"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ACTION BAR: LISTEN TO THIS VERSE & QUICK HIGHLIGHT PALETTE */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl bg-current/5 border border-current/10 text-xs">
                <div className="flex items-center gap-2">
                  {/* Listen to Selected Verse */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsAudioPlayerVisible(true);
                      const idx = currentChapter.verses.findIndex(
                        (v) => v.verse === selectedVerseObj.verse
                      );
                      speakVerseByIndex(idx >= 0 ? idx : 0);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D97706] text-[#1A1A1A] font-semibold hover:bg-[#F59E0B] transition-colors cursor-pointer shadow-2xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen to Verse {selectedVerseObj.verse}</span>
                  </button>

                  <span className="opacity-50">|</span>

                  {/* Highlights Color Swatches for Selected Verse */}
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] opacity-75">
                      Highlight:
                    </span>
                    {(['amber', 'sage', 'rose', 'sky'] as HighlightColor[]).map((c) => {
                      const highlightKey = `${currentBook.id}-${currentChapter.chapter}-${selectedVerseObj.verse}`;
                      const isThisColor =
                        highlightsMap[highlightKey]?.color === c;
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() =>
                            handleToggleHighlightVerse(selectedVerseObj.verse, c)
                          }
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                            isThisColor
                              ? 'ring-2 ring-[#1C1917] dark:ring-[#FAF7F2] font-bold shadow-2xs ' +
                                HIGHLIGHT_COLORS[c].badgeBg
                              : 'hover:scale-105 border border-current/15'
                          }`}
                          title={`Highlight verse ${selectedVerseObj.verse} in ${HIGHLIGHT_COLORS[c].label}`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              backgroundColor: HIGHLIGHT_COLORS[c].dotColor,
                            }}
                          />
                          <span>{HIGHLIGHT_COLORS[c].label.split(' ')[0]}</span>
                        </button>
                      );
                    })}

                    {highlightsMap[
                      `${currentBook.id}-${currentChapter.chapter}-${selectedVerseObj.verse}`
                    ] && (
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveHighlight(
                            `${currentBook.id}-${currentChapter.chapter}-${selectedVerseObj.verse}`
                          )
                        }
                        className="p-1 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer ml-1"
                        title="Remove highlight from this verse"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <span className="opacity-50">|</span>

                  {/* Share Verse Quote Card */}
                  <button
                    type="button"
                    onClick={() => {
                      const text = selectedVerseObj.text[activeVersion];
                      const highlightKey = `${currentBook.id}-${currentChapter.chapter}-${selectedVerseObj.verse}`;
                      const existingColor = highlightsMap[highlightKey]?.color || 'amber';
                      setSharingVerse({
                        id: highlightKey,
                        bookId: currentBook.id,
                        bookName: currentBook.name,
                        chapter: currentChapter.chapter,
                        verse: selectedVerseObj.verse,
                        version: activeVersion,
                        text,
                        color: existingColor,
                        createdAt: Date.now(),
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D97706]/40 bg-[#D97706]/10 text-[#92400E] dark:text-[#FBBF24] font-semibold hover:bg-[#D97706]/20 transition-colors cursor-pointer"
                    title="Create formatted quote card to share on WhatsApp or save as image"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Share Quote Card</span>
                  </button>
                </div>

                <div className="text-[11px] font-mono opacity-70">
                  Select a version card below to switch primary reader translation
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {FULL_BIBLE_VERSIONS.map((ver) => {
                  const isPrimary = ver.id === activeVersion;
                  const verseText = selectedVerseObj.text[ver.id];
                  const copyKey = `inspector-${ver.id}-${selectedVerseObj.verse}`;
                  return (
                    <div
                      key={ver.id}
                      onClick={() => setActiveVersion(ver.id)}
                      className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 transition-all cursor-pointer ${
                        isPrimary
                          ? 'border-[#D97706] ring-1 ring-[#D97706] bg-[#D97706]/10'
                          : `${surfaceClasses} hover:border-[#D97706]/60`
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#1C1917] text-[#FAF7F2]">
                            {ver.shortName}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyVerse(
                                ver.id,
                                selectedVerseObj.verse,
                                verseText
                              );
                            }}
                            className="opacity-70 hover:opacity-100 cursor-pointer"
                            title={`Copy ${ver.shortName} verse`}
                          >
                            {copiedVerseKey ===
                              `${ver.id}-${selectedVerseObj.verse}` ||
                            copiedVerseKey === copyKey ? (
                              <Check className="w-3.5 h-3.5 text-[#10B981]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <p
                          className="text-xs sm:text-sm leading-relaxed"
                          style={{
                            fontFamily: 'var(--font-display), Georgia, serif',
                          }}
                        >
                          “{verseText}”
                        </p>
                      </div>
                      <div className="text-[10px] font-mono opacity-65 pt-2 border-t border-current/10">
                        {ver.fullName}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* CHAPTER FOOTER NAVIGATION (PREVIOUS / NEXT CHAPTER ACROSS ALL 66 BOOKS) */}
          <div className="pt-6 border-t border-current/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrevChapter}
              className={`p-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${surfaceClasses} hover:border-[#D97706]`}
            >
              <ChevronLeft className="w-5 h-5 text-[#D97706] shrink-0" />
              <div>
                <div className="text-[11px] font-mono uppercase opacity-70">
                  Previous Chapter
                </div>
                <div
                  className="text-base font-bold"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  {selectedChapterNumber > 1
                    ? `${currentBook.name} ${selectedChapterNumber - 1}`
                    : 'Previous Book Chapter'}
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setIsBookDrawerOpen(true)}
              className={`px-5 py-3 rounded-2xl border text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer ${mutedSurfaceClasses} hover:border-[#D97706] self-center`}
            >
              Browse All 66 Books &amp; {TOTAL_BIBLE_CHAPTERS.toLocaleString()} Chapters
            </button>

            <button
              type="button"
              onClick={handleNextChapter}
              className={`p-4 rounded-2xl border text-right flex items-center justify-end gap-3.5 transition-all cursor-pointer ${surfaceClasses} hover:border-[#D97706]`}
            >
              <div>
                <div className="text-[11px] font-mono uppercase opacity-70">
                  Next Chapter
                </div>
                <div
                  className="text-base font-bold"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  {selectedChapterNumber < currentBook.totalChapters
                    ? `${currentBook.name} ${selectedChapterNumber + 1}`
                    : 'Next Book Chapter'}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#D97706] shrink-0" />
            </button>
          </div>
        </div>
      </main>

      {/* FLOATING SANCTUARY AUDIO PLAYER BAR (Web Speech API Narration) */}
      {isAudioPlayerVisible && (
        <aside
          aria-label="Scripture Audio Narration Player"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[94%] sm:w-auto min-w-[340px] max-w-xl rounded-2xl bg-[#1C1917]/95 text-[#FAF7F2] border border-[#D97706]/70 shadow-2xl backdrop-blur-md px-4 py-3 flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {/* Left: Narration Details & Pulse Indicator */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#D97706] text-[#1A1A1A] flex items-center justify-center shrink-0 shadow-xs">
              <Volume2
                className={`w-4 h-4 ${
                  isNarrating && !isNarrationPaused ? 'animate-bounce' : ''
                }`}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold truncate">
                  {currentBook.name} {selectedChapterNumber} ({activeVersion})
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#D97706]/20 text-[#FBBF24]">
                  {isNarrating
                    ? isNarrationPaused
                      ? 'Paused'
                      : 'Narrating'
                    : 'Ready'}
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#D6D3D1] truncate">
                {narratingVerseNumber !== null
                  ? `Verse ${narratingVerseNumber} of ${currentChapter.verses.length}`
                  : `Starting from Verse ${selectedVerseNumber ?? 1}`}
              </div>
            </div>
          </div>

          {/* Center / Right: Audio Narration Playback Controls */}
          <div className="flex items-center gap-2">
            {/* Prev Verse */}
            <button
              type="button"
              onClick={handlePrevNarrationVerse}
              title="Previous Verse"
              className="p-1.5 rounded-lg text-[#FAF7F2] hover:bg-[#292524] hover:text-[#D97706] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Play / Pause Toggle */}
            <button
              type="button"
              onClick={() => {
                if (isNarrating && !isNarrationPaused) {
                  pauseNarration();
                } else {
                  startOrResumeNarration();
                }
              }}
              title={
                isNarrating && !isNarrationPaused
                  ? 'Pause Audio Narration'
                  : 'Start / Resume Audio Narration'
              }
              className="w-9 h-9 rounded-xl bg-[#D97706] text-[#1A1A1A] font-bold flex items-center justify-center hover:scale-105 transition-all cursor-pointer shadow-xs"
            >
              {isNarrating && !isNarrationPaused ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 translate-x-0.5" />
              )}
            </button>

            {/* Stop Narration */}
            <button
              type="button"
              onClick={stopNarration}
              title="Stop Narration"
              className="p-1.5 rounded-lg text-[#FAF7F2] hover:bg-[#292524] hover:text-[#D97706] transition-colors cursor-pointer"
            >
              <Square className="w-4 h-4" />
            </button>

            {/* Next Verse */}
            <button
              type="button"
              onClick={handleNextNarrationVerse}
              title="Next Verse"
              className="p-1.5 rounded-lg text-[#FAF7F2] hover:bg-[#292524] hover:text-[#D97706] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Speed Pills: 0.75x, 1x, 1.25x */}
            <div className="hidden sm:inline-flex items-center gap-0.5 p-0.5 rounded-lg bg-[#292524] border border-[#3E3834] text-[10.5px] font-mono">
              {[0.75, 1.0, 1.25].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => handleSetSpeed(spd)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                    narrationSpeed === spd
                      ? 'bg-[#D97706] text-[#1A1A1A] font-bold'
                      : 'text-[#D6D3D1] hover:text-white'
                  }`}
                  title={`Narration speed ${spd}x`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Close Audio Bar */}
            <button
              type="button"
              onClick={() => {
                stopNarration();
                setIsAudioPlayerVisible(false);
              }}
              title="Dismiss Audio Bar"
              className="ml-1 p-1.5 rounded-lg text-[#A8A29E] hover:text-[#FAF7F2] hover:bg-[#292524] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* READING DURATION CELEBRATORY PROMPT MODAL */}
      {showCelebrationModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="celebration-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowCelebrationModal(false)}
        >
          <div
            className={`w-full max-w-md rounded-3xl border border-[#D97706]/40 p-6 sm:p-8 shadow-2xl relative space-y-5 text-center ${surfaceClasses}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowCelebrationModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-current/60 hover:text-current hover:bg-current/10 cursor-pointer"
              aria-label="Close celebration dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Radiant Icon Header */}
            <div className="w-16 h-16 rounded-2xl mx-auto bg-gradient-to-br from-[#D97706] to-[#F59E0B] text-[#1A1A1A] flex items-center justify-center shadow-lg shadow-[#D97706]/20 ring-4 ring-[#D97706]/20">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#065F46] dark:text-[#34D399] font-mono text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{durationCadence === 'daily' ? 'Daily' : 'Weekly'} Target Met</span>
              </div>
              <h2
                id="celebration-title"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917] dark:text-[#FAF7F2]"
                style={{fontFamily: 'var(--font-display), Georgia, serif'}}
              >
                Reading Goal Achieved!
              </h2>
              <p className="text-sm opacity-80 leading-relaxed max-w-sm mx-auto">
                You have devoted{' '}
                <strong className="text-[#D97706]">
                  {durationTargetMinutes} minutes
                </strong>{' '}
                to immersed biblical reading and reflection. Consistent time in the Word anchors the soul.
              </p>
            </div>

            {/* Growth Reward Pill */}
            <div className="p-3.5 rounded-2xl bg-current/5 border border-current/10 flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#D97706]/20 text-[#D97706] flex items-center justify-center font-bold text-sm">
                🌱
              </div>
              <div className="text-left">
                <div className="text-xs font-bold font-mono text-[#D97706]">
                  +25 Faith Seed Points Awarded
                </div>
                <div className="text-[11px] opacity-70">
                  Added to your child & family growth history
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowCelebrationModal(false);
                  setIsHighlightDrawerOpen(true);
                }}
                className={`py-2.5 px-4 rounded-xl border font-semibold text-xs transition-colors cursor-pointer ${mutedSurfaceClasses} hover:border-[#D97706]`}
              >
                View Highlights
              </button>
              <button
                type="button"
                onClick={() => setShowCelebrationModal(false)}
                className="py-2.5 px-4 rounded-xl bg-[#D97706] text-[#1A1A1A] font-bold text-xs hover:bg-[#F59E0B] transition-colors cursor-pointer shadow-md"
              >
                Continue Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VERSE QUOTE CARD SHARING MODAL (Canvas High-Res Image & WhatsApp) */}
      <VerseQuoteCardModal
        isOpen={Boolean(sharingVerse)}
        onClose={() => setSharingVerse(null)}
        verse={sharingVerse}
        onEngage={onEngageContent}
      />

      {/* CROSS-REFERENCE PEEK POPOVER */}
      <AnimatePresence>
        {activePeekRef && (
          <motion.div
            role="dialog"
            aria-label="Cross-Reference Scripture Peek"
            initial={{opacity: 0, y: 6, scale: 0.98}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 4, scale: 0.98}}
            transition={{duration: 0.16}}
            className="fixed bottom-6 right-6 z-50 w-[min(340px,calc(100vw-2rem))] p-4 rounded-2xl bg-[#1C1917] text-[#FAF7F2] border border-[#D97706] shadow-2xl backdrop-blur-xl space-y-2 text-left font-sans"
          >
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#36312E]">
              <div className="flex items-center gap-1.5 min-w-0">
                <BookOpen className="w-4 h-4 text-[#D97706] shrink-0" />
                <span className="font-mono text-xs font-bold text-[#FBBF24] truncate">
                  {activePeekRef.reference}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActivePeekRef(null)}
                className="w-5 h-5 rounded-full bg-[#292524] hover:bg-[#36312E] text-[#A8A29E] hover:text-[#FAF7F2] flex items-center justify-center cursor-pointer"
                aria-label="Close cross-reference peek"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="text-[10px] font-mono text-[#D6D3D1]">
              Theme: <strong className="text-[#FAF7F2]">{activePeekRef.theme}</strong>
            </div>
            <p className="text-xs text-[#E7E5E4] italic leading-relaxed">
              “{activePeekRef.text}”
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
