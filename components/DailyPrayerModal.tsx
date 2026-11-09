'use client';

import React, {useState, useEffect, useRef, useCallback} from 'react';
import {motion, AnimatePresence, PanInfo} from 'motion/react';
import {
  Heart,
  Sparkles,
  Lock,
  Plus,
  Check,
  Trash2,
  Copy,
  Calendar,
  X,
  Feather,
  BookMarked,
  Filter,
  CheckCircle2,
  Clock,
  Star,
  BookmarkCheck,
  Compass,
} from 'lucide-react';

export interface MeditativePrayerItem {
  id: string;
  ageGroup: '3-7' | '8-12' | '13-18';
  ageGroupLabel: string;
  title: string;
  scriptureAnchor: string;
  prayerText: string;
  meditativePrompt: string;
}

export const AGE_APPROPRIATE_MEDITATIVE_PRAYERS: Record<
  '3-7' | '8-12' | '13-18',
  MeditativePrayerItem[]
> = {
  '3-7': [
    {
      id: 'meditative-bedtime-1',
      ageGroup: '3-7',
      ageGroupLabel: 'Ages 3–7 · Sanctuary Bedtime',
      title: 'Under the Shepherd’s Stars',
      scriptureAnchor: 'Psalm 4:8',
      prayerText:
        'Dear Lord, as night arrives and the quiet stars come out, I lay my head down knowing You hold the whole world with gentle hands. Thank You for keeping me safe today.',
      meditativePrompt:
        'Take three slow deep breaths. Imagine God tucking you in like a warm, peaceful blanket.',
    },
    {
      id: 'meditative-bedtime-2',
      ageGroup: '3-7',
      ageGroupLabel: 'Ages 3–7 · Sanctuary Bedtime',
      title: 'Good Shepherd Care',
      scriptureAnchor: 'Psalm 23:1–2',
      prayerText:
        'Good Shepherd, thank You for watching over me while I play, learn, and rest. Help me sleep peacefully beside Your still waters tonight.',
      meditativePrompt:
        'Quietly whisper thank you for one happy thing that brought a smile to your face today.',
    },
  ],
  '8-12': [
    {
      id: 'meditative-archive-1',
      ageGroup: '8-12',
      ageGroupLabel: 'Ages 8–12 · Ancient Archive',
      title: 'Courage & Curiosity in Truth',
      scriptureAnchor: 'Deuteronomy 31:6',
      prayerText:
        'Lord of history, as I explore the ancient stories of Your faithfulness, give me curiosity to ask honest questions and steady courage to walk in kindness with my friends.',
      meditativePrompt:
        'Pause for 10 quiet seconds. Ask God for calm courage in a decision or situation facing you tomorrow.',
    },
    {
      id: 'meditative-archive-2',
      ageGroup: '8-12',
      ageGroupLabel: 'Ages 8–12 · Ancient Archive',
      title: 'Light for Every Step',
      scriptureAnchor: 'Psalm 119:105',
      prayerText:
        'God of wisdom, thank You that I don’t have to pretend to know everything. Guide my steps like a lamp on an ancient pathway and teach me to love truth.',
      meditativePrompt:
        'Picture an ancient oil lamp lighting up a stone path just one peaceful step at a time.',
    },
  ],
  '13-18': [
    {
      id: 'meditative-harbor-1',
      ageGroup: '13-18',
      ageGroupLabel: 'Ages 13–18 · Safe Harbor',
      title: 'Honest Harbor & Unshakable Grace',
      scriptureAnchor: 'Psalm 130:1–2',
      prayerText:
        'Creator and Father, I bring You my real thoughts—the unspoken anxieties, the hard questions about the future, and my desire for authentic meaning. Thank You that Your grace does not demand fake certainty.',
      meditativePrompt:
        'Exhale the pressure to perform or impress others. Inhale quiet confidence that you are fully seen and loved.',
    },
    {
      id: 'meditative-harbor-2',
      ageGroup: '13-18',
      ageGroupLabel: 'Ages 13–18 · Safe Harbor',
      title: 'Justice, Mercy & Walking Humbly',
      scriptureAnchor: 'Micah 6:8',
      prayerText:
        'Sovereign God, in a world full of noise and social pressure, anchor my heart in quiet mercy. Give me boldness to act justly, compassion to defend the lonely, and humility to walk with You.',
      meditativePrompt:
        'Reflect on one person in your school or life who could use a gesture of quiet kindness from you this week.',
    },
  ],
};

export type PrayerCategory =
  | 'Gratitude'
  | 'Petition'
  | 'Wisdom'
  | 'Peace'
  | 'Loved Ones';

export interface DailyPrayerPetition {
  id: string;
  timestamp: number;
  dateString: string;
  category: PrayerCategory;
  content: string;
  isAnswered: boolean;
  answeredAt?: number;
  answerReflection?: string;
}

const STORAGE_KEY = 'grow_in_the_word_daily_prayers_v1';

const CATEGORY_OPTIONS: {
  category: PrayerCategory;
  label: string;
  color: string;
  starter: string;
}[] = [
  {
    category: 'Gratitude',
    label: 'Gratitude & Praise',
    color: 'border-[#4A5D4E] text-[#A7F3D0] bg-[#4A5D4E]/20',
    starter: 'Lord, today I am grateful for...',
  },
  {
    category: 'Petition',
    label: 'Personal Need',
    color: 'border-[#D97706] text-[#FDE68A] bg-[#D97706]/20',
    starter: 'In quiet trust, I bring this need to You...',
  },
  {
    category: 'Wisdom',
    label: 'Wisdom & Guidance',
    color: 'border-[#92400E] text-[#FBBF24] bg-[#92400E]/20',
    starter: 'Grant me clarity and discernment as I face...',
  },
  {
    category: 'Peace',
    label: 'Peace & Comfort',
    color: 'border-[#0284C7] text-[#BAE6FD] bg-[#0284C7]/20',
    starter: 'Calm the racing thoughts in my mind regarding...',
  },
  {
    category: 'Loved Ones',
    label: 'Loved Ones & Friends',
    color: 'border-[#E11D48] text-[#FECDD3] bg-[#E11D48]/20',
    starter: 'I lift up my family and friends, asking for...',
  },
];

const INITIAL_SEEDED_PRAYERS: DailyPrayerPetition[] = [
  {
    id: 'seed-prayer-1',
    timestamp: 1729000000000,
    dateString: 'Oct 28',
    category: 'Gratitude',
    content:
      'Thank You for the quiet sanctuary of evening. Keep our hearts anchored in peace through the night.',
    isAnswered: true,
    answeredAt: 1729086400000,
    answerReflection: 'Experienced deep, restorative rest and calm the next morning.',
  },
  {
    id: 'seed-prayer-2',
    timestamp: 1729086400000,
    dateString: 'Oct 29',
    category: 'Wisdom',
    content:
      'Give me patience with my questions and the courage to seek understanding without rushing for hasty answers.',
    isAnswered: false,
  },
];

interface DailyPrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrayerAdded?: (points: number, label: string) => void;
  isNightSanctuary?: boolean;
}

export default function DailyPrayerModal({
  isOpen,
  onClose,
  onPrayerAdded,
  isNightSanctuary = false,
}: DailyPrayerModalProps) {
  const [prayers, setPrayers] = useState<DailyPrayerPetition[]>(INITIAL_SEEDED_PRAYERS);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<'3-7' | '8-12' | '13-18'>('8-12');
  const [favoritePrayerIds, setFavoritePrayerIds] = useState<string[]>([]);

  // Restore stored petitions and favorite prayers from localStorage post-mount to guarantee identical SSR hydration
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPrayers(parsed);
          }
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEEDED_PRAYERS));
        }

        const storedFavs = localStorage.getItem('grow_in_the_word_favorite_prayers_v1');
        if (storedFavs) {
          const parsedFavs = JSON.parse(storedFavs);
          if (Array.isArray(parsedFavs)) {
            setFavoritePrayerIds(parsedFavs);
          }
        }
      } catch {
        // fallback
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleFavoritePrayer = useCallback(
    (item: MeditativePrayerItem) => {
      setFavoritePrayerIds((prev) => {
        const exists = prev.includes(item.id);
        const next = exists ? prev.filter((id) => id !== item.id) : [...prev, item.id];
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('grow_in_the_word_favorite_prayers_v1', JSON.stringify(next));
          } catch {}
        }
        if (!exists && onPrayerAdded) {
          onPrayerAdded(10, `Saved Daily Prayer to Favorites: “${item.title}” (${item.ageGroupLabel})`);
        }
        return next;
      });
    },
    [onPrayerAdded]
  );

  const [activeCategory, setActiveCategory] = useState<PrayerCategory>('Gratitude');
  const [prayerText, setPrayerText] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'answered' | 'favorites'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [answeringPrayerId, setAnsweringPrayerId] = useState<string | null>(null);
  const [answerNote, setAnswerNote] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Sync to localStorage
  const savePrayers = useCallback((next: DailyPrayerPetition[]) => {
    setPrayers(next);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save prayers to localStorage', err);
      }
    }
  }, []);

  // Focus trap & keyboard accessibility
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus initial element
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 80);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  const handleAddPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = prayerText.trim();
    if (!trimmed) return;

    const newPrayer: DailyPrayerPetition = {
      id: `prayer-${Date.now()}`,
      timestamp: Date.now(),
      dateString: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      category: activeCategory,
      content: trimmed,
      isAnswered: false,
    };

    const next = [newPrayer, ...prayers];
    savePrayers(next);
    setPrayerText('');

    if (onPrayerAdded) {
      onPrayerAdded(15, `Saved Daily Prayer Petition (${activeCategory})`);
    }
  };

  const handleToggleAnswered = (id: string) => {
    const target = prayers.find((p) => p.id === id);
    if (!target) return;

    if (!target.isAnswered) {
      // Opening answer reflection input
      setAnsweringPrayerId(id);
      setAnswerNote('');
    } else {
      // Unmarking answered
      const next = prayers.map((p) =>
        p.id === id
          ? {...p, isAnswered: false, answeredAt: undefined, answerReflection: undefined}
          : p
      );
      savePrayers(next);
    }
  };

  const handleConfirmAnswered = (id: string) => {
    const next = prayers.map((p) =>
      p.id === id
        ? {
            ...p,
            isAnswered: true,
            answeredAt: Date.now(),
            answerReflection: answerNote.trim() || 'Answered in God’s quiet faithfulness.',
          }
        : p
    );
    savePrayers(next);
    setAnsweringPrayerId(null);
    setAnswerNote('');

    if (onPrayerAdded) {
      onPrayerAdded(10, 'Reflected on Answered Prayer');
    }
  };

  const handleDeletePrayer = (id: string) => {
    const next = prayers.filter((p) => p.id !== id);
    savePrayers(next);
  };

  const handleCopyPrayer = async (prayer: DailyPrayerPetition) => {
    try {
      const text = `[Grow In The Word · Daily Prayer (${prayer.category})]\nDate: ${prayer.dateString}\n"${prayer.content}"${
        prayer.isAnswered ? `\nAnswer/Praise: ${prayer.answerReflection || 'Answered'}` : ''
      }`;
      await navigator.clipboard.writeText(text);
      setCopiedId(prayer.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy prayer', err);
    }
  };

  const filteredPrayers = prayers.filter((p) => {
    if (filterTab === 'active') return !p.isAnswered;
    if (filterTab === 'answered') return p.isAnswered;
    return true;
  });

  const activeCount = prayers.filter((p) => !p.isAnswered).length;
  const answeredCount = prayers.filter((p) => p.isAnswered).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="daily-prayer-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#141210]/75 backdrop-blur-sm"
        >
          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{opacity: 0, scale: 0.94, y: 32}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.94, y: 32}}
            transition={{type: 'spring', stiffness: 360, damping: 28}}
            drag="y"
            dragDirectionLock
            dragConstraints={{top: 0, bottom: 0}}
            dragElastic={{top: 0.04, bottom: 0.45}}
            onDragEnd={(_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
              if (info.offset.y > 85 || info.velocity.y > 400) {
                onClose();
              }
            }}
            className={`w-full max-w-2xl max-h-[92dvh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-2xl border shadow-2xl flex flex-col overflow-hidden touch-pan-y ${
              isNightSanctuary
                ? 'bg-[#1C1917] border-[#36312E] text-[#F9F6F0]'
                : 'bg-[#FAF7F2] border-[#E5DEC9] text-[#1C1917]'
            }`}
          >
            {/* Mobile Swipe Handle */}
            <div
              aria-hidden="true"
              className="sm:hidden flex flex-col items-center justify-center pt-2.5 pb-1 cursor-grab active:cursor-grabbing select-none"
            >
              <div
                className={`w-12 h-1.5 rounded-full ${
                  isNightSanctuary ? 'bg-[#44403C]' : 'bg-[#D6CEBC]'
                }`}
              />
              <span className="text-[10px] font-mono text-[#A8A29E] mt-1">
                Swipe down to dismiss
              </span>
            </div>

            {/* Header */}
            <div
              className={`p-4 sm:p-6 border-b flex items-start justify-between gap-4 ${
                isNightSanctuary ? 'border-[#292524] bg-[#24211E]/50' : 'border-[#E5DEC9] bg-[#F2ECE1]/50'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                    isNightSanctuary
                      ? 'bg-[#292524] border-[#D97706]/60 text-[#F59E0B]'
                      : 'bg-[#FAF7F2] border-[#D97706] text-[#D97706]'
                  }`}
                >
                  <Heart className="w-5 h-5 fill-current/20" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#D97706]">
                    <span>Spiritual Formation</span>
                    <span aria-hidden="true">·</span>
                    <span>Private Prayer Vault</span>
                  </div>
                  <h2
                    id="daily-prayer-title"
                    className="text-xl sm:text-2xl font-normal tracking-tight text-[#1C1917] dark:text-[#F9F6F0]"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Daily Prayer &amp; Petition Sanctuary
                  </h2>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isNightSanctuary ? 'text-[#D6D3D1]' : 'text-[#57534E]'
                    }`}
                  >
                    A distraction-free, zero-surveillance space to pour out your petitions,
                    confessions, gratitude, and loved ones before God.
                  </p>
                </div>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close prayer request dialog"
                className={`min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl transition-colors cursor-pointer shrink-0 ${
                  isNightSanctuary
                    ? 'hover:bg-[#292524] text-[#A8A29E] hover:text-[#F9F6F0]'
                    : 'hover:bg-[#EAE4D5] text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Privacy Reassurance Banner */}
            <div
              className={`px-4 sm:px-6 py-2 border-b flex items-center justify-between text-xs ${
                isNightSanctuary
                  ? 'bg-[#171514] border-[#292524] text-[#A8A29E]'
                  : 'bg-[#F5EFE6] border-[#E5DEC9] text-[#78716C]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>
                  <strong>Client-Side Sovereign Vault:</strong> Saved solely in local storage.
                  Never sent to any server or AI model.
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#D97706] shrink-0 ml-2">
                +15 pts / prayer
              </span>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-6">
              {/* Age-Appropriate Meditative Daily Prayers (Ages 3-7, 8-12, 13-18) */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border space-y-4 ${
                  isNightSanctuary
                    ? 'bg-[#24211E]/80 border-[#36312E]'
                    : 'bg-[#F2ECE1]/70 border-[#E5DEC9]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#D97706] font-semibold">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Guided Meditative Daily Prayers</span>
                    </div>
                    <p
                      className={`text-xs ${
                        isNightSanctuary ? 'text-[#A8A29E]' : 'text-[#57534E]'
                      }`}
                    >
                      Non-coercive, quiet prayers tailored to your developmental stage. Save favorites to your private vault.
                    </p>
                  </div>

                  {/* Age Group Selector (3-7, 8-12, 13-18) */}
                  <div
                    role="tablist"
                    aria-label="Select prayer age group"
                    className={`inline-flex rounded-xl p-1 border self-start sm:self-auto ${
                      isNightSanctuary
                        ? 'bg-[#1C1917] border-[#36312E]'
                        : 'bg-[#FAF7F2] border-[#E5DEC9]'
                    }`}
                  >
                    {(
                      [
                        {id: '3-7', label: 'Ages 3–7'},
                        {id: '8-12', label: 'Ages 8–12'},
                        {id: '13-18', label: 'Ages 13–18'},
                      ] as const
                    ).map((grp) => {
                      const isSelected = selectedAgeGroup === grp.id;
                      return (
                        <button
                          key={grp.id}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          onClick={() => setSelectedAgeGroup(grp.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#D97706] text-[#1A1A1A] shadow-xs'
                              : isNightSanctuary
                              ? 'text-[#A8A29E] hover:text-[#F9F6F0]'
                              : 'text-[#57534E] hover:text-[#1C1917]'
                          }`}
                        >
                          {grp.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Meditative Prayer Cards for Selected Age Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {AGE_APPROPRIATE_MEDITATIVE_PRAYERS[selectedAgeGroup].map((item) => {
                    const isFavorited = favoritePrayerIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                          isNightSanctuary
                            ? 'bg-[#1C1917] border-[#36312E]'
                            : 'bg-[#FAF7F2] border-[#E5DEC9]'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[#D97706] block">
                                {item.scriptureAnchor} · {item.ageGroupLabel}
                              </span>
                              <h3
                                className="text-sm sm:text-base font-semibold mt-0.5"
                                style={{fontFamily: 'var(--font-display), serif'}}
                              >
                                {item.title}
                              </h3>
                            </div>
                          </div>

                          <p
                            className="text-xs sm:text-sm italic leading-relaxed"
                            style={{fontFamily: 'var(--font-display), serif'}}
                          >
                            “{item.prayerText}”
                          </p>

                          <div
                            className={`p-2.5 rounded-lg border text-[11px] leading-snug ${
                              isNightSanctuary
                                ? 'bg-[#24211E] border-[#36312E] text-[#D6D3D1]'
                                : 'bg-[#F2ECE1]/70 border-[#E5DEC9] text-[#44403C]'
                            }`}
                          >
                            <strong className="text-[#D97706]">Meditative Pause:</strong>{' '}
                            {item.meditativePrompt}
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-current/10">
                          <button
                            type="button"
                            onClick={() => setPrayerText(item.prayerText)}
                            className="text-[11px] font-medium text-[#D97706] hover:underline cursor-pointer"
                          >
                            Use in Petition ↓
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleFavoritePrayer(item)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                              isFavorited
                                ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706]'
                                : isNightSanctuary
                                ? 'bg-[#24211E] text-[#FDE68A] border-[#D97706]/50 hover:bg-[#292524]'
                                : 'bg-white text-[#92400E] border-[#D97706]/50 hover:bg-[#F2ECE1]'
                            }`}
                          >
                            <Star
                              className={`w-3.5 h-3.5 ${
                                isFavorited ? 'fill-current' : ''
                              }`}
                            />
                            <span>
                              {isFavorited ? 'Saved to Favorites' : 'Save to Favorites'}
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Prayer Entry Form */}
              <form onSubmit={handleAddPrayer} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] dark:text-[#A8A29E]">
                    Select Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORY_OPTIONS.map((cat) => {
                      const isSelected = activeCategory === cat.category;
                      return (
                        <button
                          key={cat.category}
                          type="button"
                          onClick={() => {
                            setActiveCategory(cat.category);
                            if (!prayerText) {
                              setPrayerText(cat.starter);
                            }
                          }}
                          className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'border-[#D97706] bg-[#D97706] text-[#1A1A1A] shadow-xs'
                              : isNightSanctuary
                              ? 'border-[#36312E] bg-[#24211E] text-[#D6D3D1] hover:border-[#D97706]/60'
                              : 'border-[#E5DEC9] bg-[#FAF7F2] text-[#44403C] hover:border-[#D97706]/60'
                          }`}
                        >
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label
                      htmlFor="prayer-input-text"
                      className="font-medium text-[#1C1917] dark:text-[#F9F6F0]"
                    >
                      Your Prayer or Petition:
                    </label>
                    <span className="text-[11px] font-mono text-[#A8A29E]">
                      {prayerText.length} characters
                    </span>
                  </div>
                  <textarea
                    id="prayer-input-text"
                    rows={3}
                    value={prayerText}
                    onChange={(e) => setPrayerText(e.target.value)}
                    placeholder="Pour out your heart honestly... God hears every unspoken murmur and deep petition."
                    className={`w-full p-3.5 rounded-xl border text-sm sm:text-base leading-relaxed transition-colors outline-hidden resize-none ${
                      isNightSanctuary
                        ? 'bg-[#24211E] border-[#36312E] text-[#F9F6F0] focus:border-[#D97706] placeholder-[#78716C]'
                        : 'bg-white border-[#E5DEC9] text-[#1C1917] focus:border-[#D97706] placeholder-[#A8A29E]'
                    }`}
                    style={{fontFamily: 'var(--font-display), serif'}}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#78716C] dark:text-[#A8A29E]">
                    <Feather className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Unhurried reflection · No grading · No judgment</span>
                  </div>

                  <button
                    type="submit"
                    disabled={!prayerText.trim()}
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#F59E0B] disabled:opacity-50 disabled:cursor-not-allowed text-[#1A1A1A] font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Save to Prayer Vault (+15 pts)</span>
                  </button>
                </div>
              </form>

              {/* Petitions Filter & History Tabs */}
              <div className="pt-4 border-t border-[#E5DEC9] dark:border-[#292524] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#57534E] dark:text-[#A8A29E]">
                    <BookMarked className="w-4 h-4 text-[#D97706]" />
                    <span>Your Spiritual History</span>
                    <span className="font-mono text-[11px] text-[#D97706]">
                      ({prayers.length})
                    </span>
                  </div>

                  {/* Filter Pills */}
                  <div className="inline-flex flex-wrap rounded-xl p-1 bg-[#EAE4D5]/70 dark:bg-[#24211E] border border-[#E5DEC9] dark:border-[#36312E]">
                    <button
                      type="button"
                      onClick={() => setFilterTab('all')}
                      className={`min-h-[36px] px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        filterTab === 'all'
                          ? 'bg-[#FAF7F2] dark:bg-[#292524] text-[#1C1917] dark:text-[#F9F6F0] shadow-xs'
                          : 'text-[#78716C] dark:text-[#A8A29E]'
                      }`}
                    >
                      All ({prayers.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterTab('active')}
                      className={`min-h-[36px] px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        filterTab === 'active'
                          ? 'bg-[#FAF7F2] dark:bg-[#292524] text-[#1C1917] dark:text-[#F9F6F0] shadow-xs'
                          : 'text-[#78716C] dark:text-[#A8A29E]'
                      }`}
                    >
                      Active ({activeCount})
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterTab('answered')}
                      className={`min-h-[36px] px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        filterTab === 'answered'
                          ? 'bg-[#FAF7F2] dark:bg-[#292524] text-[#1C1917] dark:text-[#F9F6F0] shadow-xs'
                          : 'text-[#78716C] dark:text-[#A8A29E]'
                      }`}
                    >
                      Answered ({answeredCount})
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterTab('favorites')}
                      className={`min-h-[36px] px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer inline-flex items-center gap-1 ${
                        filterTab === 'favorites'
                          ? 'bg-[#FAF7F2] dark:bg-[#292524] text-[#D97706] shadow-xs'
                          : 'text-[#78716C] dark:text-[#A8A29E]'
                      }`}
                    >
                      <Star className="w-3 h-3 text-[#D97706] fill-current" />
                      <span>Favorites ({favoritePrayerIds.length})</span>
                    </button>
                  </div>
                </div>

                {/* Favorite Guided Prayers List when filterTab === 'favorites' */}
                {filterTab === 'favorites' && (
                  <div className="space-y-3">
                    {favoritePrayerIds.length === 0 ? (
                      <div
                        className={`p-8 rounded-2xl border text-center space-y-2 ${
                          isNightSanctuary
                            ? 'bg-[#24211E]/40 border-[#36312E] text-[#A8A29E]'
                            : 'bg-[#F2ECE1]/60 border-[#E5DEC9] text-[#78716C]'
                        }`}
                      >
                        <Star className="w-8 h-8 text-[#D97706]/50 mx-auto" />
                        <p className="text-sm font-medium">No favorite guided prayers saved yet.</p>
                        <p className="text-xs">
                          Click &ldquo;Save to Favorites&rdquo; on any age-appropriate meditative prayer above to keep it here.
                        </p>
                      </div>
                    ) : (
                      Object.values(AGE_APPROPRIATE_MEDITATIVE_PRAYERS)
                        .flat()
                        .filter((item) => favoritePrayerIds.includes(item.id))
                        .map((item) => (
                          <div
                            key={item.id}
                            className={`p-4 rounded-xl border space-y-2 ${
                              isNightSanctuary
                                ? 'bg-[#24211E] border-[#36312E]'
                                : 'bg-white border-[#E5DEC9]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-mono font-semibold text-[#D97706]">
                                {item.title} · {item.scriptureAnchor} ({item.ageGroupLabel})
                              </span>
                              <button
                                type="button"
                                onClick={() => handleToggleFavoritePrayer(item)}
                                className="text-xs text-rose-500 hover:underline cursor-pointer"
                              >
                                Remove Favorite
                              </button>
                            </div>
                            <p
                              className="text-sm italic leading-relaxed"
                              style={{fontFamily: 'var(--font-display), serif'}}
                            >
                              “{item.prayerText}”
                            </p>
                          </div>
                        ))
                    )}
                  </div>
                )}

                {/* Prayers List */}
                {filterTab !== 'favorites' && filteredPrayers.length === 0 && (
                  <div
                    className={`p-8 rounded-2xl border text-center space-y-2 ${
                      isNightSanctuary
                        ? 'bg-[#24211E]/40 border-[#36312E] text-[#A8A29E]'
                        : 'bg-[#F2ECE1]/60 border-[#E5DEC9] text-[#78716C]'
                    }`}
                  >
                    <Heart className="w-8 h-8 text-[#D97706]/50 mx-auto" />
                    <p className="text-sm font-medium">No prayers found in this category.</p>
                    <p className="text-xs">
                      Take a quiet moment to record a petition or note of gratitude above.
                    </p>
                  </div>
                )}

                {filterTab !== 'favorites' && filteredPrayers.length > 0 && (
                  <div className="space-y-3">
                    {filteredPrayers.map((prayer) => {
                      const isAnsweringThis = answeringPrayerId === prayer.id;
                      return (
                        <div
                          key={prayer.id}
                          className={`p-4 rounded-xl border transition-all space-y-3 ${
                            prayer.isAnswered
                              ? isNightSanctuary
                                ? 'bg-[#202922] border-[#2E4A35]'
                                : 'bg-[#F0F7F2] border-[#CDE5D4]'
                              : isNightSanctuary
                              ? 'bg-[#24211E] border-[#36312E]'
                              : 'bg-white border-[#E5DEC9]'
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                                  prayer.category === 'Gratitude'
                                    ? 'bg-[#4A5D4E]/15 border-[#4A5D4E]/40 text-[#4A5D4E] dark:text-[#A7F3D0]'
                                    : prayer.category === 'Petition'
                                    ? 'bg-[#D97706]/15 border-[#D97706]/40 text-[#92400E] dark:text-[#FDE68A]'
                                    : 'bg-[#292524]/10 border-[#78716C]/40 text-[#78716C] dark:text-[#D6D3D1]'
                                }`}
                              >
                                {prayer.category}
                              </span>
                              <span className="text-[11px] text-[#A8A29E] flex items-center gap-1 font-mono">
                                <Calendar className="w-3 h-3" />
                                {prayer.dateString}
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleCopyPrayer(prayer)}
                                title="Copy prayer reflection"
                                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg hover:bg-[#EAE4D5] dark:hover:bg-[#292524] text-[#78716C] dark:text-[#A8A29E] transition-colors cursor-pointer"
                              >
                                {copiedId === prayer.id ? (
                                  <Check className="w-4 h-4 text-[#10B981]" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeletePrayer(prayer.id)}
                                title="Delete prayer"
                                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg hover:bg-red-500/10 text-[#78716C] hover:text-red-500 dark:text-[#A8A29E] transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <p
                            className="text-sm sm:text-base leading-relaxed text-[#1C1917] dark:text-[#F9F6F0]"
                            style={{fontFamily: 'var(--font-display), serif'}}
                          >
                            “{prayer.content}”
                          </p>

                          {/* Answered Reflection Banner */}
                          {prayer.isAnswered && prayer.answerReflection && (
                            <div
                              className={`p-3 rounded-lg border text-xs sm:text-sm flex items-start gap-2.5 ${
                                isNightSanctuary
                                  ? 'bg-[#18231A] border-[#2A4430] text-[#A7F3D0]'
                                  : 'bg-[#EAF5EC] border-[#B9E0C2] text-[#2D5A38]'
                              }`}
                            >
                              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#10B981]" />
                              <div>
                                <span className="font-semibold block mb-0.5">
                                  Answered &amp; Grace Observed:
                                </span>
                                <span>{prayer.answerReflection}</span>
                              </div>
                            </div>
                          )}

                          {/* Inline Answer Form when Answering */}
                          {isAnsweringThis && (
                            <div className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1A1A1A] border border-[#D97706] space-y-2">
                              <label
                                htmlFor={`answer-input-${prayer.id}`}
                                className="block text-xs font-semibold text-[#D97706]"
                              >
                                How was this prayer answered or reflected in your life?
                              </label>
                              <textarea
                                id={`answer-input-${prayer.id}`}
                                rows={2}
                                value={answerNote}
                                onChange={(e) => setAnswerNote(e.target.value)}
                                placeholder="E.g., Felt unexpected peace during a stressful exam, a friend checked in, or God gave wisdom..."
                                className="w-full p-2.5 rounded-lg border text-xs sm:text-sm bg-white dark:bg-[#24211E] border-[#E5DEC9] dark:border-[#36312E] outline-hidden"
                              />
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setAnsweringPrayerId(null)}
                                  className="min-h-[44px] px-3 py-1.5 rounded-lg text-xs text-[#78716C] dark:text-[#A8A29E] cursor-pointer"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleConfirmAnswered(prayer.id)}
                                  className="min-h-[44px] px-4 py-1.5 rounded-lg bg-[#D97706] text-[#1A1A1A] text-xs font-semibold cursor-pointer"
                                >
                                  Save Answer (+10 pts)
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Toggle Answered Status Button */}
                          {!isAnsweringThis && (
                            <div className="flex items-center justify-between pt-1 border-t border-[#E5DEC9]/60 dark:border-[#36312E]/60 text-xs">
                              <button
                                type="button"
                                onClick={() => handleToggleAnswered(prayer.id)}
                                className={`min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                                  prayer.isAnswered
                                    ? 'text-[#10B981] hover:underline'
                                    : 'text-[#D97706] hover:bg-[#D97706]/10'
                                }`}
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>
                                  {prayer.isAnswered ? 'Answered · Click to Reopen' : 'Mark as Answered (+10 pts)'}
                                </span>
                              </button>

                              <span className="text-[10px] text-[#A8A29E] font-mono">
                                ID: {prayer.id.slice(-6)}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div
              className={`p-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${
                isNightSanctuary ? 'border-[#292524] bg-[#24211E]/50' : 'border-[#E5DEC9] bg-[#F2ECE1]/50'
              }`}
            >
              <div className="flex items-center gap-2 text-[#78716C] dark:text-[#A8A29E]">
                <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Encouraged daily practice: 2 minutes of quiet before sleep or after waking</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-[#292524] hover:bg-[#36312E] text-[#F9F6F0] font-semibold cursor-pointer transition-colors"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
