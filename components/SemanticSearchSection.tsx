'use client';

import React, {useState, useMemo, useRef, useEffect, useCallback} from 'react';
import {
  Search,
  BookOpen,
  Compass,
  MessageSquareQuote,
  Sparkles,
  ArrowRight,
  X,
  Check,
  Sprout,
  Moon,
  ScrollText,
  Feather,
  Flame,
  Clock,
  History,
  Trash2,
  CornerDownLeft,
  Mic,
  MicOff,
} from 'lucide-react';
import StudyTooltip from './StudyTooltip';

export interface RecentSearchItem {
  id: string;
  query: string;
  timestamp: number;
  matchCount: number;
}

export type SearchItemCategory = 'passage' | 'history' | 'prompt';
export type SearchTierFilter = 'all' | 'bedtime' | 'archive' | 'harbor';
export type LiteraryGenreType = 'Historical' | 'Poetic' | 'Prophetic';

export interface SemanticSearchItem {
  id: string;
  title: string;
  category: SearchItemCategory;
  categoryLabel: string;
  tierId: 'bedtime' | 'archive' | 'harbor';
  tierLabel: string;
  ageRange: string;
  referenceOrEra: string;
  /** Specific canonical book & chapter anchor */
  bibleBook: string;
  /** Concise chapter-level context for quick teen/tween orientation */
  chapterContext: string;
  /** Literary genre classification to differentiate Historical, Poetic, and Prophetic texts */
  literaryGenre: LiteraryGenreType;
  /** Guidance on how to read this genre responsibly */
  genreReadingLens: string;
  summary: string;
  deepDiveContent: string;
  reflectionQuestion: string;
  semanticKeywords: string[];
}

export const SEMANTIC_LIBRARY_ITEMS: SemanticSearchItem[] = [
  {
    id: 'psalm-23-shepherd',
    title: 'Psalm 23 · The Quiet Shepherd & Still Waters',
    category: 'passage',
    categoryLabel: 'Scripture Passage',
    tierId: 'bedtime',
    tierLabel: '01. Bedtime Sanctuary',
    ageRange: 'Ages 3–7',
    referenceOrEra: 'Book of Psalms · Ancient Judah (~1000 BCE)',
    bibleBook: 'Psalms · Chapter 23 (Book I of the Psalter)',
    chapterContext:
      'Placed immediately after the suffering lament of Psalm 22, Chapter 23 shifts into a song of quiet trust set in Judean shepherd pastures.',
    literaryGenre: 'Poetic',
    genreReadingLens:
      'Hebrew Lyric Poetry: Uses vivid pastoral metaphors (still waters, dark valley, oil and cup) rather than literal geography to express emotional refuge.',
    summary:
      'A calming evening poem about safety, rest, and a shepherd who stays awake through the dark valley so the flock can sleep without fear.',
    deepDiveContent:
      'In the rocky hill country of Judea, sheep cannot drink from rushing streams because their wool weighs them down. A shepherd literally builds quiet stone pools—“still waters”—so little ones can drink safely before nightfall.',
    reflectionQuestion:
      'What is one thing that helps your heart feel calm and safe when the lights go out tonight?',
    semanticKeywords: [
      'sleep',
      'fear',
      'night',
      'anxiety',
      'bedtime',
      'comfort',
      'psalm',
      'shepherd',
      'peace',
      'dark',
      'poetic',
      'psalms',
    ],
  },
  {
    id: 'habakkuk-honest-doubt',
    title: 'Habakkuk 1:2–4 · Why Does Injustice Go Unanswered?',
    category: 'passage',
    categoryLabel: 'Scripture Passage',
    tierId: 'harbor',
    tierLabel: '03. Safe Harbor',
    ageRange: 'Ages 13–18',
    referenceOrEra: 'Minor Prophets · Late 7th Century BCE Jerusalem',
    bibleBook: 'Habakkuk · Chapter 1 (The Book of the Twelve)',
    chapterContext:
      'Written around 605 BCE as the Neo-Babylonian Empire rose to power; Chapter 1 records a direct dialogue between a troubled prophet and God.',
    literaryGenre: 'Prophetic',
    genreReadingLens:
      'Prophetic Disputation & Lament: Rather than predicting distant centuries, Hebrew prophecy confronts present-day corruption and wrestles aloud with God’s justice.',
    summary:
      'One of scripture’s boldest prophets begins not with polite praise, but by asking why God seems silent when violence and unfairness prevail.',
    deepDiveContent:
      'The name Habakkuk comes from a root meaning “to wrestle or embrace.” Rather than scolding Habakkuk for questioning divine justice, scripture preserves his raw complaint as sacred poetry—proving that honest doubt is a form of faithfulness, not rebellion.',
    reflectionQuestion:
      'Why do you think ancient editors kept raw arguments with God inside the Bible instead of smoothing them over?',
    semanticKeywords: [
      'doubt',
      'injustice',
      'suffering',
      'hard questions',
      'evil',
      'angry',
      'silence',
      'deconstruction',
      'teen',
      'prophetic',
      'habakkuk',
    ],
  },
  {
    id: 'genesis-12-fertile-crescent',
    title: 'Genesis 12 · Across the Fertile Crescent from Ur to Canaan',
    category: 'history',
    categoryLabel: 'Historical Context',
    tierId: 'archive',
    tierLabel: '02. Historical Archive',
    ageRange: 'Ages 8–12',
    referenceOrEra: 'Middle Bronze Age · ~1900 BCE Mesopotamia',
    bibleBook: 'Genesis · Chapter 12 (Ancestral Narratives)',
    chapterContext:
      'Pivots from the primeval prologue (Genesis 1–11) into historical geography, tracing Abraham’s family caravan from Ur and Haran into Shechem.',
    literaryGenre: 'Historical',
    genreReadingLens:
      'Historical Narrative & Travelogue: Grounded in real Bronze Age trade routes, city-states, and family treaties along the Euphrates and Jordan rivers.',
    summary:
      'Trace the 1,000-mile caravan route along the Euphrates River from the ziggurat city of Ur into the hill country of Canaan.',
    deepDiveContent:
      'Ur was a bustling metropolis with libraries, multi-story brick homes, and mathematical tablets. Stepping out into nomadic tent life meant leaving behind the most advanced urban security of the ancient world for an unseen promise.',
    reflectionQuestion:
      'Have you ever had to move to a new school, city, or stage of life where everything felt unfamiliar at first?',
    semanticKeywords: [
      'map',
      'geography',
      'archaeology',
      'abraham',
      'mesopotamia',
      'ur',
      'history',
      'timeline',
      'travel',
      'historical',
      'genesis',
    ],
  },
  {
    id: 'dead-sea-scrolls-qumran',
    title: 'The Dead Sea Scrolls · How 2,000-Year-Old Jars Survived in Caves',
    category: 'history',
    categoryLabel: 'Historical Context',
    tierId: 'archive',
    tierLabel: '02. Historical Archive',
    ageRange: 'Ages 8–12',
    referenceOrEra: 'Second Temple Period · 250 BCE – 68 CE (Qumran)',
    bibleBook: 'Isaiah · Chapters 1–66 (1QIsaᵃ Great Isaiah Scroll)',
    chapterContext:
      'Cave 1 at Qumran yielded a complete 24-foot parchment scroll of all 66 chapters of Isaiah copied ~125 BCE, predating medieval copies by 1,000 years.',
    literaryGenre: 'Prophetic',
    genreReadingLens:
      'Prophetic Manuscript Transmission: Demonstrates how Second Temple scribes preserved prophetic oracles word-for-word inside sealed limestone jars.',
    summary:
      'How a Bedouin shepherd tossing a stone into a cliffside cave in 1947 uncovered the oldest surviving manuscripts of the Hebrew Bible.',
    deepDiveContent:
      'The Great Isaiah Scroll—written on 17 sheets of sewn parchment over a century before Jesus—matched medieval manuscripts across a thousand-year gap with extraordinary precision, showing how carefully ancient scribes copied every letter.',
    reflectionQuestion:
      'If you could preserve one message in a clay jar for readers 2,000 years from now, what would you write?',
    semanticKeywords: [
      'manuscripts',
      'scrolls',
      'reliability',
      'history',
      'archaeology',
      'isaiah',
      'caves',
      'evidence',
      'scribes',
      'prophetic',
    ],
  },
  {
    id: 'prompt-science-and-scripture',
    title: '“Can I take both modern science and ancient scripture seriously?”',
    category: 'prompt',
    categoryLabel: 'Discussion Prompt',
    tierId: 'harbor',
    tierLabel: '03. Safe Harbor',
    ageRange: 'Ages 13–18',
    referenceOrEra: 'Socratic Seminar · Genesis 1 & Ancient Cosmology',
    bibleBook: 'Genesis · Chapter 1:1–2:3 (Cosmic Temple Prologue)',
    chapterContext:
      'Structured as a symmetrical 6-day poetic triad (Days 1–3 form realms; Days 4–6 fill those realms) culminating in Sabbath rest on Day 7.',
    literaryGenre: 'Poetic',
    genreReadingLens:
      'Exalted Cosmological Poetry: Asks “Who is the Creator and why does the universe have value?” rather than serving as a modern physics textbook.',
    summary:
      'Exploring the difference between *how* the physical cosmos operates (material mechanisms) and *why* it exists as a sacred temple of meaning.',
    deepDiveContent:
      'Ancient Near Eastern creation accounts were not written as 21st-century laboratory textbooks; they were liturgical poems contrasting a purposeful, life-giving Creator against Babylonian myths of chaos and violence (Enuma Elish).',
    reflectionQuestion:
      'How does reading Genesis 1 as an ancient temple-dedication poem change the tension between faith and science?',
    semanticKeywords: [
      'science',
      'evolution',
      'genesis',
      'creation',
      'cosmos',
      'physics',
      'poetry',
      'questions',
      'teen',
      'poetic',
    ],
  },
  {
    id: 'prompt-forgiveness-boundaries',
    title: '“What does forgiveness mean when someone isn’t sorry?”',
    category: 'prompt',
    categoryLabel: 'Discussion Prompt',
    tierId: 'harbor',
    tierLabel: '03. Safe Harbor',
    ageRange: 'Ages 13–18',
    referenceOrEra: 'Modern Ethics · Matthew 18 & Romans 12',
    bibleBook: 'Matthew · Chapter 18:15–35 & Romans · Chapter 12:17–21',
    chapterContext:
      'Matthew 18 pairs honest accountability (naming the harm directly in verses 15–17) with releasing internal vengeance in the parable of the unmerciful servant.',
    literaryGenre: 'Historical',
    genreReadingLens:
      'First-Century Gospel & Community Discourse: Grounded in real interpersonal conflict resolution inside early house-church communities.',
    summary:
      'Untangling the difference between releasing bitterness in your own heart and setting wise, protective boundaries against ongoing harm.',
    deepDiveContent:
      'In the Greek New Testament, *aphiemi* (forgiveness) means releasing a debt so resentment no longer poisons you—it never requires pretending abuse didn’t happen or forfeiting personal safety.',
    reflectionQuestion:
      'Where is the line between extending grace and protecting healthy boundaries in friendships?',
    semanticKeywords: [
      'forgiveness',
      'boundaries',
      'friendship',
      'hurt',
      'ethics',
      'grace',
      'justice',
      'relationships',
      'historical',
      'matthew',
    ],
  },
  {
    id: 'hebrew-word-chesed',
    title: 'Hebrew Word Study · “Chesed” (חֶסֶד) — Unbreakable Covenant Love',
    category: 'history',
    categoryLabel: 'Historical Context',
    tierId: 'archive',
    tierLabel: '02. Historical Archive',
    ageRange: 'Ages 8–12',
    referenceOrEra: 'Biblical Hebrew Lexicon · Ruth & Psalms',
    bibleBook: 'Ruth · Chapters 1–4 & Psalm 136',
    chapterContext:
      'In the Book of Ruth, Chapter 1–2 shows Chesed in action during the Bethlehem barley harvest as Ruth and Boaz protect a vulnerable widow.',
    literaryGenre: 'Historical',
    genreReadingLens:
      'Historical Short Story & Village Chronicle: Shows how covenant loyalty looks in ordinary farming towns during the era of the Judges.',
    summary:
      'Why no single English word can fully capture the Hebrew concept of loyal, stubborn, action-oriented kindness.',
    deepDiveContent:
      'Early English translators had to invent the compound word “lovingkindness” in 1535 just to translate *chesed*. It describes a love that refuses to walk away even when the other person has nothing left to offer.',
    reflectionQuestion:
      'When have you seen someone show stubborn kindness to a friend or family member who was having a hard day?',
    semanticKeywords: [
      'hebrew',
      'language',
      'love',
      'kindness',
      'ruth',
      'lexicon',
      'translation',
      'root word',
      'historical',
    ],
  },
  {
    id: 'prompt-bedtime-grateful-wonder',
    title: '“Where does the sun go when we close our eyes?”',
    category: 'prompt',
    categoryLabel: 'Discussion Prompt',
    tierId: 'bedtime',
    tierLabel: '01. Bedtime Sanctuary',
    ageRange: 'Ages 3–7',
    referenceOrEra: 'Parent-Child Wonder Whisper · Psalm 104 & Genesis 1',
    bibleBook: 'Psalms · Chapter 104:19–24 (Hymn of Day & Night)',
    chapterContext:
      'Psalm 104 celebrates how God appoints the moon for seasons and the sun to know its setting time so creatures can rest.',
    literaryGenre: 'Poetic',
    genreReadingLens:
      'Nature Hymn & Wonder Poetry: Uses musical rhythm and sensory imagery to help listeners marvel at the daily cycle of light and sleep.',
    summary:
      'A gentle two-minute bedtime conversation starter helping young children marvel at the rhythm of day and night.',
    deepDiveContent:
      'Young children process spiritual security through sensory rhythms—warmth, voice cadence, and predictable rest. Framing nightfall as a cozy blanket designed for rest lowers bedtime separation anxiety.',
    reflectionQuestion:
      'What was the brightest, happiest color you saw outside today before the stars came out?',
    semanticKeywords: [
      'kids',
      'bedtime',
      'wonder',
      'stars',
      'sun',
      'parent',
      'child',
      'sleep',
      'creation',
      'poetic',
      'psalm 104',
    ],
  },
];

export interface TrendingQueryItem {
  id: string;
  topicTitle: string;
  queryTerm: string;
  cohort: 'tweens' | 'teens';
  ageBadge: string;
  themeTag: string;
  contextNote: string;
  matchedItemId: string;
}

export const ANONYMIZED_TRENDING_QUERIES: TrendingQueryItem[] = [
  {
    id: 'trend-teen-injustice-doubt',
    topicTitle: 'Why does God feel silent when unfair things happen?',
    queryTerm: 'doubt',
    cohort: 'teens',
    ageBadge: 'Ages 13–18',
    themeTag: 'Habakkuk 1 · Lament',
    contextNote:
      'Exploring how ancient prophets wrestled openly with unanswered injustice.',
    matchedItemId: 'habakkuk-honest-doubt',
  },
  {
    id: 'trend-tween-dead-sea-scrolls',
    topicTitle: 'How did 2,000-year-old scrolls survive inside desert caves?',
    queryTerm: 'Dead Sea Scrolls',
    cohort: 'tweens',
    ageBadge: 'Ages 8–12',
    themeTag: 'Qumran Archaeology',
    contextNote:
      'Tracing the 1947 cave discovery and ancient scribal manuscript accuracy.',
    matchedItemId: 'dead-sea-scrolls-qumran',
  },
  {
    id: 'trend-teen-science-genesis',
    topicTitle: 'Can I take both modern science and Genesis 1 seriously?',
    queryTerm: 'science',
    cohort: 'teens',
    ageBadge: 'Ages 13–18',
    themeTag: 'Cosmology & Poetry',
    contextNote:
      'Reading Genesis 1 as an ancient temple-dedication poem vs. material physics.',
    matchedItemId: 'prompt-science-and-scripture',
  },
  {
    id: 'trend-tween-hebrew-chesed',
    topicTitle: 'Why did translators invent a new word for Hebrew “Chesed”?',
    queryTerm: 'Hebrew',
    cohort: 'tweens',
    ageBadge: 'Ages 8–12',
    themeTag: 'Root Word Cipher',
    contextNote:
      'Uncovering stubborn, action-oriented covenant kindness in Ruth and Psalms.',
    matchedItemId: 'hebrew-word-chesed',
  },
  {
    id: 'trend-teen-forgiveness-boundaries',
    topicTitle: 'Forgiveness vs. boundaries when someone isn’t sorry',
    queryTerm: 'forgiveness',
    cohort: 'teens',
    ageBadge: 'Ages 13–18',
    themeTag: 'Relational Ethics',
    contextNote:
      'Distinguishing Greek aphiemi (releasing bitterness) from personal safety.',
    matchedItemId: 'prompt-forgiveness-boundaries',
  },
  {
    id: 'trend-tween-ur-mesopotamia',
    topicTitle: 'What was daily street life like in Bronze Age Ur?',
    queryTerm: 'Mesopotamia',
    cohort: 'tweens',
    ageBadge: 'Ages 8–12',
    themeTag: 'Fertile Crescent Map',
    contextNote:
      'Following the 1,000-mile caravan route along the Euphrates River.',
    matchedItemId: 'genesis-12-fertile-crescent',
  },
];

const RECENT_SEARCHES_STORAGE_KEY = 'grow_in_the_word_recent_searches';

const INITIAL_RECENT_SEARCHES: RecentSearchItem[] = [
  {
    id: 'recent-1',
    query: 'Psalm 23 still waters',
    timestamp: Date.now() - 1000 * 60 * 35,
    matchCount: 2,
  },
  {
    id: 'recent-2',
    query: 'Dead Sea Scrolls',
    timestamp: Date.now() - 1000 * 60 * 180,
    matchCount: 3,
  },
  {
    id: 'recent-3',
    query: 'science and Genesis doubt',
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    matchCount: 2,
  },
];

function formatTimeAgo(timestamp: number): string {
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays}d ago`;
}

interface SemanticSearchSectionProps {
  onEngageContent: (points: number, actionLabel: string) => void;
  onOpenJourneyModal: (defaultTier?: 'bedtime' | 'archive' | 'harbor') => void;
  isNightSanctuary: boolean;
}

export default function SemanticSearchSection({
  onEngageContent,
  onOpenJourneyModal,
  isNightSanctuary,
}: SemanticSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | SearchItemCategory
  >('all');
  const [selectedTier, setSelectedTier] = useState<SearchTierFilter>('all');
  const [selectedGenre, setSelectedGenre] = useState<
    'all' | LiteraryGenreType
  >('all');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [activeItem, setActiveItem] = useState<SemanticSearchItem | null>(
    SEMANTIC_LIBRARY_ITEMS[0]
  );
  const [nourishedIds, setNourishedIds] = useState<string[]>([]);
  const [activeTrendingId, setActiveTrendingId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Voice-to-Text Speech Recognition State & Handler
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  const handleToggleVoiceSearch = useCallback(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        'Voice-to-Text speech recognition is not supported by your browser. Please try Chrome, Edge, or Safari.'
      );
      return;
    }

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setSearchQuery(transcript);
        setActiveTrendingId(null);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
      onEngageContent(5, 'Activated Voice-to-Text Speech Search');
    } catch {
      setIsListening(false);
    }
  }, [isListening, onEngageContent]);

  // Recent Searches state & sidebar view tab
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);
  const [sidebarTab, setSidebarTab] = useState<'recent' | 'trending'>('recent');

  // Load recent searches from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRecentSearches(parsed);
            return;
          }
        }
        setRecentSearches(INITIAL_RECENT_SEARCHES);
        window.localStorage.setItem(
          RECENT_SEARCHES_STORAGE_KEY,
          JSON.stringify(INITIAL_RECENT_SEARCHES)
        );
      } catch {
        setRecentSearches(INITIAL_RECENT_SEARCHES);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const saveRecentSearch = useCallback((rawQuery: string, count?: number) => {
    const q = rawQuery.trim();
    if (!q || q.length < 2) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (item) => item.query.toLowerCase() !== q.toLowerCase()
      );
      const computedCount =
        count !== undefined
          ? count
          : SEMANTIC_LIBRARY_ITEMS.filter((item) => {
              const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
              const haystack = [
                item.title,
                item.summary,
                item.deepDiveContent,
                item.referenceOrEra,
                item.bibleBook,
                ...item.semanticKeywords,
              ]
                .join(' ')
                .toLowerCase();
              return tokens.every((tok) => haystack.includes(tok));
            }).length;

      const newItem: RecentSearchItem = {
        id: `search-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        query: q,
        timestamp: Date.now(),
        matchCount: computedCount,
      };
      const updated = [newItem, ...filtered].slice(0, 10);
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(
            RECENT_SEARCHES_STORAGE_KEY,
            JSON.stringify(updated)
          );
        }
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const handleClearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(RECENT_SEARCHES_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleRemoveRecentSearch = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setRecentSearches((prev) => {
        const updated = prev.filter((item) => item.id !== id);
        try {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(
              RECENT_SEARCHES_STORAGE_KEY,
              JSON.stringify(updated)
            );
          }
        } catch {
          // ignore
        }
        return updated;
      });
    },
    []
  );

  const handleSelectRecentSearch = (item: RecentSearchItem) => {
    setSearchQuery(item.query);
    setActiveTrendingId(null);
    onEngageContent(5, `Revisited Recent Search: “${item.query}”`);
    saveRecentSearch(item.query, item.matchCount);
  };

  // Debounced auto-save for queries as user finishes typing
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 3) return;
    const timer = setTimeout(() => {
      saveRecentSearch(searchQuery);
    }, 1500);
    return () => clearTimeout(timer);
  }, [searchQuery, saveRecentSearch]);

  // Allow '/' keyboard shortcut to focus the semantic search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SEMANTIC_LIBRARY_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesTier =
        selectedTier === 'all' || item.tierId === selectedTier;
      const matchesGenre =
        selectedGenre === 'all' || item.literaryGenre === selectedGenre;
      if (!matchesCategory || !matchesTier || !matchesGenre) return false;
      if (!q) return true;

      const haystack = [
        item.title,
        item.summary,
        item.deepDiveContent,
        item.referenceOrEra,
        item.bibleBook,
        item.chapterContext,
        item.literaryGenre,
        item.genreReadingLens,
        item.reflectionQuestion,
        ...item.semanticKeywords,
      ]
        .join(' ')
        .toLowerCase();

      // Semantic token matching across query words
      const tokens = q.split(/\s+/).filter(Boolean);
      return tokens.every((tok) => haystack.includes(tok));
    });
  }, [searchQuery, selectedCategory, selectedTier, selectedGenre]);

  const handleSelectSearchResult = (item: SemanticSearchItem) => {
    setActiveItem(item);
    onEngageContent(10, `Explored “${item.title.split('·')[0].trim()}”`);
  };

  const handleNourishReflection = (item: SemanticSearchItem) => {
    if (!nourishedIds.includes(item.id)) {
      setNourishedIds((prev) => [...prev, item.id]);
      onEngageContent(
        20,
        `Reflected on ${item.categoryLabel}: “${item.title.split('·')[0].trim()}”`
      );
    }
  };

  const handleQuickPromptClick = (topic: string) => {
    setSearchQuery(topic);
    onEngageContent(5, `Searched semantic topic: “${topic}”`);
  };

  const [trendingCohortFilter, setTrendingCohortFilter] = useState<
    'all' | 'tweens' | 'teens'
  >('all');

  const filteredTrendingQueries = useMemo(() => {
    if (trendingCohortFilter === 'all') return ANONYMIZED_TRENDING_QUERIES;
    return ANONYMIZED_TRENDING_QUERIES.filter(
      (q) => q.cohort === trendingCohortFilter
    );
  }, [trendingCohortFilter]);

  const handleSelectTrendingQuery = (trending: TrendingQueryItem) => {
    setActiveTrendingId(trending.id);
    setSearchQuery(trending.queryTerm);
    setSelectedCategory('all');
    setSelectedTier('all');
    setSelectedGenre('all');
    const matched = SEMANTIC_LIBRARY_ITEMS.find(
      (item) => item.id === trending.matchedItemId
    );
    if (matched) {
      setActiveItem(matched);
    }
    onEngageContent(
      10,
      `Explored Trending ${trending.cohort === 'teens' ? 'Teen' : 'Tween'} Topic: “${trending.topicTitle}”`
    );
  };

  const getCategoryIcon = (cat: SearchItemCategory) => {
    if (cat === 'passage') {
      return <BookOpen className="w-3.5 h-3.5 text-[#D97706] shrink-0" />;
    }
    if (cat === 'history') {
      return <Compass className="w-3.5 h-3.5 text-[#D97706] shrink-0" />;
    }
    return (
      <MessageSquareQuote className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
    );
  };

  const getGenreBadgeMeta = (genre: LiteraryGenreType) => {
    if (genre === 'Historical') {
      return {
        icon: <ScrollText className="w-3 h-3 text-[#92400E] shrink-0" />,
        badgeClass:
          'bg-[#D97706]/12 text-[#92400E] border-[#D97706]/35',
        shortLabel: 'Historical Match',
      };
    }
    if (genre === 'Poetic') {
      return {
        icon: <Feather className="w-3 h-3 text-[#4A5D4E] shrink-0" />,
        badgeClass:
          'bg-[#4A5D4E]/12 text-[#2F3E33] border-[#4A5D4E]/35',
        shortLabel: 'Poetic Match',
      };
    }
    return {
      icon: <Flame className="w-3 h-3 text-[#B45309] shrink-0" />,
      badgeClass:
        'bg-[#B45309]/12 text-[#7C2D12] border-[#B45309]/35',
      shortLabel: 'Prophetic Match',
    };
  };

  return (
    <section
      id="semantic-search"
      aria-labelledby="semantic-search-heading"
      className="py-20 lg:py-24 border-b border-[#E5DEC9] bg-[#FAF7F2] transition-colors duration-500"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 min-w-0">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#92400E]">
            <span>Semantic Sanctuary Index</span>
            <span aria-hidden="true">·</span>
            <span>
              Passages, Archaeological Context &amp; Socratic Discussion Prompts
            </span>
            {isNightSanctuary && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-[#FBBF24]">
                  <Moon className="w-3 h-3" />
                  <span>2100K Night Sanctuary Active</span>
                </span>
              </>
            )}
          </div>
          <h2
            id="semantic-search-heading"
            className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1C1917]"
            style={{
              fontFamily: 'var(--font-display), serif',
              textWrap: 'balance',
            }}
          >
            Search by passage, historical era, or the honest question on your
            mind.
          </h2>
          <p className="text-base text-[#44403C] leading-relaxed">
            Whether your five-year-old needs a calming psalm before sleep, your
            ten-year-old is curious about the Dead Sea Scrolls, or your teenager
            is wrestling with doubt and science—explore how the archive responds
            across every stage.
          </p>
        </div>

        {/* Minimalist Semantic Search Input Bar with Subtle Focus Effects */}
        <div className="mt-8 space-y-4 min-w-0">
          <div
            className={`relative rounded-xl bg-[#F2ECE1] border transition-all duration-200 ${
              isInputFocused
                ? 'border-[#D97706] ring-4 ring-[#D97706]/15 shadow-sm'
                : 'border-[#E5DEC9] hover:border-[#D97706]/50'
            }`}
          >
            <div className="flex items-center px-4 sm:px-5 py-3.5 sm:py-4 gap-3.5">
              <Search
                className={`w-5 h-5 shrink-0 transition-colors duration-200 ${
                  isInputFocused ? 'text-[#D97706]' : 'text-[#57534E]'
                }`}
              />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveTrendingId(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    saveRecentSearch(searchQuery);
                  }
                }}
                placeholder="Search e.g. “Psalm 23”, “Dead Sea Scrolls”, “science and Genesis”, “honest doubt”, or “forgiveness”…"
                aria-label="Semantic search across scripture passages, historical context, and discussion prompts"
                className="w-full bg-transparent text-sm sm:text-base text-[#1C1917] placeholder:text-[#57534E]/75 focus:outline-none min-w-0"
              />
              {/* Voice-to-Text Microphone Button */}
              <button
                type="button"
                onClick={handleToggleVoiceSearch}
                aria-label={
                  isListening
                    ? 'Stop voice search listening'
                    : 'Start voice search (speak your biblical question)'
                }
                className={`min-h-[44px] px-3 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse ring-2 ring-rose-300 shadow-xs'
                    : 'bg-[#FAF7F2] text-[#92400E] border border-[#E5DEC9] hover:border-[#D97706] hover:bg-[#F2ECE1]'
                }`}
                title={
                  isListening
                    ? 'Listening... Speak your biblical query now'
                    : 'Voice-to-Text: Speak your biblical question'
                }
              >
                {isListening ? (
                  <>
                    <MicOff className="w-4 h-4 text-white" />
                    <span className="font-mono text-[11px]">Listening...</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 text-[#D97706]" />
                    <span className="hidden md:inline text-[11px] font-mono">Voice Search</span>
                  </>
                )}
              </button>

              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTrendingId(null);
                  }}
                  aria-label="Clear search query"
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg text-[#57534E] hover:text-[#1C1917] hover:bg-[#E5DEC9]/50 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <span
                  className="hidden sm:inline-flex items-center px-2 py-0.5 rounded border border-[#E5DEC9] bg-[#FAF7F2] text-[11px] font-mono text-[#57534E] shrink-0"
                  style={{fontFamily: 'var(--font-mono), monospace'}}
                >
                  Press /
                </span>
              )}
            </div>
          </div>

          {/* Active Voice Listening Banner Indicator */}
          {isListening && (
            <div className="px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 text-xs flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-rose-600 animate-bounce" />
                <span>Listening for your voice... Speak your biblical question or passage.</span>
              </div>
              <button
                type="button"
                onClick={handleToggleVoiceSearch}
                className="text-xs font-bold underline cursor-pointer hover:text-rose-900"
              >
                Stop Listening
              </button>
            </div>
          )}

          {/* Filter Row: Category Tabs + Developmental Tier Filter + Quick Semantic Queries */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                {id: 'all', label: 'All Entries'},
                {id: 'passage', label: 'Scripture Passages'},
                {id: 'history', label: 'Historical Context'},
                {id: 'prompt', label: 'Discussion Prompts'},
              ].map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(cat.id as 'all' | SearchItemCategory)
                    }
                    className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 inline-flex items-center justify-center ${
                      active
                        ? 'bg-[#1C1917] text-[#FAF7F2]'
                        : 'bg-[#F2ECE1] text-[#44403C] border border-[#E5DEC9] hover:text-[#1C1917]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Quick Semantic Concept Starters */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
              <span className="font-medium text-[#1C1917]">Try searching:</span>
              {[
                'sleep',
                'doubt',
                'science',
                'Dead Sea Scrolls',
                'forgiveness',
                'Hebrew',
              ].map((topic, index) => (
                <React.Fragment key={topic}>
                  {index > 0 && <span aria-hidden="true">·</span>}
                  <button
                    type="button"
                    onClick={() => handleQuickPromptClick(topic)}
                    className="min-h-[36px] px-1 text-[#92400E] hover:text-[#1C1917] underline underline-offset-4 cursor-pointer"
                  >
                    {topic}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Literary Genre Filter Bar (Helping Teens Differentiate Historical, Poetic & Prophetic Matches) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E5DEC9]/80">
            <div className="flex flex-wrap items-center gap-2">
              <StudyTooltip
                category="GENRE LITERACY"
                label="Biblical Literary Genre Lens"
                description="Scripture is an ancient library, not a single genre. Filtering by Historical, Poetic, or Prophetic context helps teens avoid reading metaphor as literal prose."
                hint="Select a literary lens to filter results"
                position="top"
                align="start"
                showIndicatorDot
              >
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#57534E] cursor-help">
                  Literary Genre Lens:
                </span>
              </StudyTooltip>

              {(
                [
                  {id: 'all', label: 'All Genres'},
                  {id: 'Historical', label: 'Historical Narrative'},
                  {id: 'Poetic', label: 'Poetic & Wisdom'},
                  {id: 'Prophetic', label: 'Prophetic & Lament'},
                ] as const
              ).map((genreTab) => {
                const isActive = selectedGenre === genreTab.id;
                return (
                  <button
                    key={genreTab.id}
                    type="button"
                    onClick={() => setSelectedGenre(genreTab.id)}
                    className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#D97706] text-[#1C1917] font-semibold shadow-2xs'
                        : 'bg-[#FAF7F2] text-[#44403C] border border-[#E5DEC9] hover:border-[#D97706]/60'
                    }`}
                  >
                    <span>{genreTab.label}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-[11px] font-mono text-[#78716C]">
              Book &amp; Chapter Context + Literary Genre shown on every match
            </span>
          </div>
        </div>

        {/* Three-Column Archival Workspace: Filtered Results (4) + Deep-Dive Reader (5) + Anonymized Trending Queries Sidebar (3) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start min-w-0">
          {/* Left 4 Columns: Filtered Results List */}
          <div className="lg:col-span-4 space-y-3 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E] pb-1">
              <span>
                Showing{' '}
                <strong className="text-[#1C1917] font-mono tabular-nums">
                  {filteredItems.length}
                </strong>{' '}
                curated entries
              </span>
              <div className="flex items-center gap-2">
                {(['all', 'bedtime', 'archive', 'harbor'] as const).map(
                  (tier, idx) => (
                    <React.Fragment key={tier}>
                      {idx > 0 && <span aria-hidden="true">·</span>}
                      <button
                        type="button"
                        onClick={() => setSelectedTier(tier)}
                        className={`cursor-pointer transition-colors ${
                          selectedTier === tier
                            ? 'font-semibold text-[#92400E] underline underline-offset-4'
                            : 'hover:text-[#1C1917]'
                        }`}
                      >
                        {tier === 'all'
                          ? 'All Ages'
                          : tier === 'bedtime'
                          ? '3–7'
                          : tier === 'archive'
                          ? '8–12'
                          : '13–18'}
                      </button>
                    </React.Fragment>
                  )
                )}
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="p-8 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] text-center space-y-3">
                <p className="text-sm text-[#44403C]">
                  No entries matched “{searchQuery}” under the current filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedTier('all');
                    setSelectedGenre('all');
                    setActiveTrendingId(null);
                  }}
                  className="min-h-[44px] px-4 py-2 rounded-lg bg-[#1C1917] text-[#FAF7F2] text-xs font-semibold cursor-pointer"
                >
                  Reset Search Filters
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredItems.map((item) => {
                  const isSelected = activeItem?.id === item.id;
                  const isNourished = nourishedIds.includes(item.id);
                  const genreMeta = getGenreBadgeMeta(item.literaryGenre);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectSearchResult(item)}
                      className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#F2ECE1] border-[#D97706] ring-2 ring-[#D97706]/30 shadow-xs'
                          : 'bg-[#F2ECE1]/60 border-[#E5DEC9] hover:bg-[#F2ECE1] hover:border-[#D97706]/50'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#92400E]">
                        <div className="flex items-center gap-1.5 font-medium">
                          {getCategoryIcon(item.category)}
                          <span>{item.categoryLabel}</span>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10.5px] font-mono font-semibold ${genreMeta.badgeClass}`}
                        >
                          {genreMeta.icon}
                          <span>{genreMeta.shortLabel}</span>
                        </span>
                      </div>

                      <h3
                        className="mt-2 text-base sm:text-lg font-normal text-[#1C1917] leading-snug"
                        style={{fontFamily: 'var(--font-display), serif'}}
                      >
                        {item.title}
                      </h3>

                      {/* Specific Bible Book & Chapter Context Strip */}
                      <div className="mt-2 p-2.5 rounded-lg bg-[#FAF7F2]/90 border border-[#E5DEC9] space-y-1">
                        <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                          <span className="font-semibold text-[#1C1917] truncate">
                            {item.bibleBook}
                          </span>
                          <span className="text-[#57534E] shrink-0">
                            {item.ageRange}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#57534E] leading-snug line-clamp-2">
                          {item.chapterContext}
                        </p>
                      </div>

                      <p className="mt-2 text-xs text-[#44403C] leading-relaxed line-clamp-2">
                        {item.summary}
                      </p>

                      {isNourished && (
                        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#92400E]">
                          <Sprout className="w-3.5 h-3.5 text-[#D97706]" />
                          <span>Reflected · Growth Seed Nourished</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Center 5 Columns: Deep-Dive Archival Reader & Reflection Panel */}
          <div className="lg:col-span-5 min-w-0">
            {activeItem && (
              <div className="lg:sticky lg:top-24 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] p-5 sm:p-7 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E5DEC9] text-xs">
                    <div className="flex items-center gap-2 font-semibold text-[#92400E]">
                      {getCategoryIcon(activeItem.category)}
                      <span>{activeItem.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{activeItem.referenceOrEra}</span>
                    </div>
                    <span
                      className="font-mono text-[#57534E] tabular-nums"
                      style={{fontFamily: 'var(--font-mono), monospace'}}
                    >
                      {activeItem.tierLabel} ({activeItem.ageRange})
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3
                      className="text-2xl sm:text-3xl font-normal text-[#1C1917] leading-snug"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      {activeItem.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#44403C] leading-relaxed">
                      {activeItem.summary}
                    </p>
                  </div>

                  {/* Canonical Book, Chapter & Literary Genre Context Box */}
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D97706]/40 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                        Book &amp; Chapter Context
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[11px] font-mono font-semibold ${
                          getGenreBadgeMeta(activeItem.literaryGenre).badgeClass
                        }`}
                      >
                        {getGenreBadgeMeta(activeItem.literaryGenre).icon}
                        <span>{activeItem.literaryGenre} Genre</span>
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-[#1C1917] font-mono">
                      {activeItem.bibleBook}
                    </div>
                    <p className="text-xs text-[#44403C] leading-relaxed">
                      {activeItem.chapterContext}
                    </p>
                    <div className="pt-2 border-t border-[#E5DEC9] text-[11.5px] text-[#57534E] leading-snug">
                      <strong className="text-[#1C1917]">How to read this genre:</strong>{' '}
                      {activeItem.genreReadingLens}
                    </div>
                  </div>

                  {/* Historical / Contextual Deep-Dive Box */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#92400E]">
                      <span>Archival &amp; Developmental Context Note</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                    </div>
                    <p className="text-xs sm:text-sm text-[#1C1917] leading-relaxed">
                      {activeItem.deepDiveContent}
                    </p>
                  </div>

                  {/* Guided Reflection Question */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-2">
                    <div className="text-xs font-semibold text-[#57534E]">
                      Unhurried Reflection Prompt (Zero Wrong Answers):
                    </div>
                    <p
                      className="text-base sm:text-lg font-normal text-[#1C1917] leading-snug"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      “{activeItem.reflectionQuestion}”
                    </p>
                  </div>
                </div>

                {/* Action Footer: Nourish Growth Seed + Open Tailored Tier Track */}
                <div className="pt-4 border-t border-[#E5DEC9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleNourishReflection(activeItem)}
                    className={`min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      nourishedIds.includes(activeItem.id)
                        ? 'bg-[#FAF7F2] border-[#D97706] text-[#92400E]'
                        : 'bg-[#FAF7F2] hover:bg-[#E5DEC9] border-[#E5DEC9] text-[#1C1917]'
                    }`}
                  >
                    {nourishedIds.includes(activeItem.id) ? (
                      <>
                        <Check className="w-4 h-4 text-[#D97706]" />
                        <span>Growth Seed Nourished (+20 XP)</span>
                      </>
                    ) : (
                      <>
                        <Sprout className="w-4 h-4 text-[#D97706]" />
                        <span>Reflect &amp; Nourish Seed (+20)</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenJourneyModal(activeItem.tierId)}
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1C1917] hover:bg-[#292524] text-xs font-semibold text-[#FAF7F2] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Explore in {activeItem.tierLabel.split('.')[1]?.trim()}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right 3 Columns: Anonymized Trending Queries Sidebar (Teens & Tweens) */}
          {/* Right 3 Columns: Recent Searches & Anonymized Trending Queries Sidebar */}
          <aside
            aria-label="Recent Searches and Anonymized Trending Queries"
            className="lg:col-span-3 lg:sticky lg:top-24 rounded-2xl bg-[#F2ECE1]/85 border border-[#E5DEC9] p-5 space-y-4 min-w-0 shadow-xs"
          >
            {/* View Switcher: Recent Searches (LocalStorage) vs Trending Archive Pulse */}
            <div
              role="tablist"
              aria-label="Sidebar view switcher"
              className="flex items-center gap-1 p-1 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9]"
            >
              <button
                type="button"
                role="tab"
                aria-selected={sidebarTab === 'recent'}
                onClick={() => setSidebarTab('recent')}
                className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  sidebarTab === 'recent'
                    ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                <History className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Recent ({recentSearches.length})</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={sidebarTab === 'trending'}
                onClick={() => setSidebarTab('trending')}
                className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  sidebarTab === 'trending'
                    ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Trending ({filteredTrendingQueries.length})</span>
              </button>
            </div>

            {/* TAB 1: RECENT SEARCHES (Persisted in localStorage) */}
            {sidebarTab === 'recent' && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5DEC9]">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#92400E]">
                      <Clock className="w-3 h-3 text-[#D97706]" />
                      <span>Private Study Trail</span>
                    </div>
                    <h3
                      className="text-base font-normal text-[#1C1917]"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      Recent Searches
                    </h3>
                  </div>

                  {recentSearches.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearRecentSearches}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-mono text-[#78716C] hover:text-[#991B1B] hover:bg-[#FEE2E2]/60 transition-colors cursor-pointer"
                      title="Clear all recent searches from localStorage"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear All</span>
                    </button>
                  )}
                </div>

                {recentSearches.length === 0 ? (
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] text-center space-y-2">
                    <History className="w-6 h-6 text-[#A8A29E] mx-auto opacity-70" />
                    <p className="text-xs text-[#57534E] leading-relaxed">
                      No recent searches yet. Search a passage, ancient artifact, or discussion question above to begin your study trail.
                    </p>
                    <div className="pt-1 flex flex-wrap justify-center gap-1.5">
                      {['Psalm 23', 'Dead Sea Scrolls', 'Genesis'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => handleQuickPromptClick(t)}
                          className="px-2 py-1 rounded-md text-[11px] bg-[#F2ECE1] hover:bg-[#E5DEC9] text-[#1C1917] transition-colors cursor-pointer"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[380px] overflow-y-auto overscroll-contain pr-0.5">
                    {recentSearches.map((item) => {
                      const isCurrent =
                        searchQuery.trim().toLowerCase() ===
                        item.query.trim().toLowerCase();
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleSelectRecentSearch(item)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleSelectRecentSearch(item);
                            }
                          }}
                          className={`w-full group p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                            isCurrent
                              ? 'bg-[#FAF7F2] border-[#D97706] ring-1 ring-[#D97706]/40 shadow-xs'
                              : 'bg-[#FAF7F2]/80 border-[#E5DEC9] hover:bg-[#FAF7F2] hover:border-[#D97706]/50'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div className="w-6 h-6 rounded-md bg-[#F2ECE1] border border-[#E5DEC9] flex items-center justify-center shrink-0 mt-0.5 text-[#D97706]">
                              <History className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-[#1C1917] truncate group-hover:text-[#92400E]">
                                “{item.query}”
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-[#78716C] font-mono mt-0.5">
                                <span>{formatTimeAgo(item.timestamp)}</span>
                                <span aria-hidden="true">·</span>
                                <span>{item.matchCount} entries</span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => handleRemoveRecentSearch(item.id, e)}
                            aria-label={`Remove search "${item.query}"`}
                            className="p-1 rounded-md text-[#A8A29E] hover:text-[#991B1B] hover:bg-[#E5DEC9]/50 transition-colors cursor-pointer shrink-0"
                            title="Remove from history"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* LocalStorage Zero-Tracking Note */}
                <div className="pt-2.5 border-t border-[#E5DEC9] text-[10px] text-[#78716C] leading-relaxed flex items-start gap-1.5">
                  <Clock className="w-3 h-3 text-[#D97706] shrink-0 mt-0.5" />
                  <span>
                    Saved privately in your browser’s localStorage. Never sent to a server or tracked.
                  </span>
                </div>
              </div>
            )}

            {/* TAB 2: ANONYMIZED TRENDING QUERIES */}
            {sidebarTab === 'trending' && (
              <div className="space-y-3.5">
                <div className="space-y-1 pb-2 border-b border-[#E5DEC9]">
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-wider text-[#4A5D4E]">
                    <span>Archive Pulse</span>
                    <span className="text-[#92400E] font-semibold">Anonymized</span>
                  </div>
                  <h3
                    className="text-base font-normal text-[#1C1917] leading-snug"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Trending Youth Queries
                  </h3>
                  <p className="text-[11px] text-[#57534E] leading-relaxed">
                    Quietly popular topics tweens (8–12) and teens (13–18) are exploring.
                  </p>
                </div>

                {/* Cohort Filter Switcher */}
                <div
                  role="group"
                  aria-label="Filter trending queries by age cohort"
                  className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9]"
                >
                  {[
                    {id: 'all', label: 'All Youth'},
                    {id: 'tweens', label: 'Tweens 8–12'},
                    {id: 'teens', label: 'Teens 13–18'},
                  ].map((tab) => {
                    const isSelected = trendingCohortFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() =>
                          setTrendingCohortFilter(
                            tab.id as 'all' | 'tweens' | 'teens'
                          )
                        }
                        className={`min-h-[32px] px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#1C1917] text-[#FAF7F2]'
                            : 'text-[#57534E] hover:text-[#1C1917]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Trending Topic Cards */}
                <div className="space-y-2 max-h-[360px] overflow-y-auto overscroll-contain pr-0.5">
                  {filteredTrendingQueries.map((trending) => {
                    const isActive =
                      activeTrendingId === trending.id ||
                      (searchQuery.toLowerCase() ===
                        trending.queryTerm.toLowerCase() &&
                        searchQuery.trim() !== '');
                    return (
                      <button
                        key={trending.id}
                        type="button"
                        onClick={() => handleSelectTrendingQuery(trending)}
                        className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer space-y-1 ${
                          isActive
                            ? 'bg-[#FAF7F2] border-[#D97706] ring-1 ring-[#D97706]/30 shadow-xs'
                            : 'bg-[#FAF7F2]/75 border-[#E5DEC9] hover:bg-[#FAF7F2] hover:border-[#D97706]/45'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                          <span
                            className={
                              trending.cohort === 'teens'
                                ? 'text-[#92400E] font-semibold'
                                : 'text-[#4A5D4E] font-semibold'
                            }
                          >
                            {trending.ageBadge}
                          </span>
                          <span className="text-[#57534E] truncate">
                            {trending.themeTag}
                          </span>
                        </div>

                        <div
                          className="text-xs font-semibold text-[#1C1917] leading-snug"
                          style={{fontFamily: 'var(--font-display), serif'}}
                        >
                          “{trending.topicTitle}”
                        </div>

                        <p className="text-[11px] text-[#57534E] leading-relaxed line-clamp-2">
                          {trending.contextNote}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2.5 border-t border-[#E5DEC9] text-[10px] text-[#57534E] leading-relaxed">
                  <strong className="text-[#1C1917] font-semibold block mb-0.5">
                    Zero-Knowledge Cohort Aggregation
                  </strong>
                  Refreshed from de-identified themes.
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
