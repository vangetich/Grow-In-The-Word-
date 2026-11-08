'use client';

import React, {useState, useRef, useMemo, useEffect} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  BookOpen,
  Columns3,
  FileText,
  Search,
  Sparkles,
  BookMarked,
  SlidersHorizontal,
  Link2,
  ChevronRight,
  ChevronDown,
  X,
  Check,
  Compass,
  Feather,
  ArrowUpRight,
  Lock,
  Unlock,
  Layers,
  Globe,
  BookmarkCheck,
  RotateCcw,
  History,
  Clock,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import {useFocusTrap} from '@/lib/useFocusTrap';
import StudyTooltip from './StudyTooltip';
import FullPageBibleReader, {
  CHAPTERS_READ_STORAGE_KEY,
} from './FullPageBibleReader';
import WeeklyReadingVelocityChart from './WeeklyReadingVelocityChart';
import MonthlyReadingHeatmapChart from './MonthlyReadingHeatmapChart';
import {
  BIBLE_CANON_BOOKS,
  TOTAL_BIBLE_CHAPTERS,
} from '@/lib/full-bible-data';

export type BibleVersionId = 'AKJV' | 'AMP' | 'NASB' | 'NIV' | 'NLT';

export interface BibleVersionMeta {
  id: BibleVersionId;
  shortName: BibleVersionId;
  fullName: string;
  audienceTier: 'scholarly' | 'accessible';
  audienceLabel: string;
  translationPhilosophy: string;
  description: string;
  yearNote: string;
}

export interface DictionaryEntry {
  id: string;
  term: string;
  triggerWords: string[];
  originalWord: string;
  originalScript: string;
  transliteration: string;
  language: 'Hebrew' | 'Greek';
  pronunciation: string;
  oneSentencePeek: string;
  directDefinition: string;
  culturalAndHistoricalContext: string;
  dailyLifeArtifact: string;
  crossReferences: {
    reference: string;
    bookCategory: string;
    snippet: string;
    linkedPassageId?: string;
  }[];
}

export interface StudyPassageVerse {
  verseNumber: number;
  translations: Record<BibleVersionId, string>;
  nuanceCommentary: string;
  keyHighlightDifference: {
    version: BibleVersionId;
    phrase: string;
    insight: string;
  }[];
  dictionaryTermIds: string[];
}

export interface StudyPassage {
  id: string;
  reference: string;
  title: string;
  testament: 'Old Testament' | 'New Testament';
  book: string;
  historicalDate: string;
  themeTag: string;
  /** Subtle estimated reading & comparison duration to aid workflow (e.g., '2 min read') */
  estimatedReadTime: string;
  introContext: string;
  verses: StudyPassageVerse[];
}

export interface ConcordanceOccurrence {
  reference: string;
  testament: 'Old Testament' | 'New Testament';
  book: string;
  bookGroup: string;
  snippet: string;
  matchedWord: string;
  rootUsed: string;
  linkedPassageId?: string;
}

export interface ConcordanceWordStudy {
  id: string;
  englishWord: string;
  summaryTagline: string;
  totalBiblicalOccurrences: number;
  hebrewRoot: {
    script: string;
    transliteration: string;
    pronunciation: string;
    strongsRef: string;
    basicDefinition: string;
    concreteMetaphor: string;
  };
  greekRoot: {
    script: string;
    transliteration: string;
    pronunciation: string;
    strongsRef: string;
    basicDefinition: string;
    concreteMetaphor: string;
  };
  crossThematicLinks: {
    label: string;
    relationNote: string;
    targetConcordanceId?: string;
    targetDictionaryId?: string;
  }[];
  occurrences: ConcordanceOccurrence[];
}

interface LastReadBookmarkState {
  passageId: string;
  passageReference: string;
  verseNumber: number;
  readingMode: 'parallel' | 'single';
  activeTranslation: BibleVersionId;
  parallelTranslations: BibleVersionId[];
  updatedAtLabel: string;
}

export interface RecentReadEntry {
  passageId: string;
  reference: string;
  title: string;
  book: string;
  testament: 'Old Testament' | 'New Testament';
  themeTag: string;
  estimatedReadTime?: string;
  verseNumber: number;
  readingMode: 'parallel' | 'single';
  activeTranslation: BibleVersionId;
  parallelTranslations: BibleVersionId[];
  visitedAtLabel: string;
  timestamp: number;
}

const LAST_READ_STORAGE_KEY = 'grow_in_the_word_studio_last_read_v1';
const RECENT_READS_STORAGE_KEY = 'grow_in_the_word_studio_recent_reads_v1';
const MAX_RECENT_READS = 5;

const BIBLE_VERSIONS: BibleVersionMeta[] = [
  {
    id: 'AKJV',
    shortName: 'AKJV',
    fullName: 'Authorized King James Version',
    audienceTier: 'scholarly',
    audienceLabel: 'Traditional Cadence & Precision',
    translationPhilosophy: 'Formal Equivalence · Classic Literary Cadence',
    description:
      'Preserves the venerable poetic rhythm, early modern grammatical distinctions (thee/ye singular vs. plural), and solemn sanctuary cadence.',
    yearNote: '1611 / 1769 Standard Text',
  },
  {
    id: 'AMP',
    shortName: 'AMP',
    fullName: 'Amplified Bible',
    audienceTier: 'scholarly',
    audienceLabel: 'Expanded Word Meanings & Depth',
    translationPhilosophy: 'Amplified Lexical Expansion · Nuance Unpacked',
    description:
      'Unpacks subtle shades of original Hebrew and Greek vocabulary inline using brackets and italics so readers discover hidden depth without needing a lexicon.',
    yearNote: 'Expanded Lexical Edition',
  },
  {
    id: 'NASB',
    shortName: 'NASB',
    fullName: 'New American Standard Bible',
    audienceTier: 'scholarly',
    audienceLabel: 'Literal Word-for-Word Accuracy',
    translationPhilosophy: 'Strict Formal Equivalence · Structural Precision',
    description:
      'Renowned among biblical scholars for mirror-close adherence to original Hebrew, Aramaic, and Greek syntax and verb tenses.',
    yearNote: '1995 / 2020 Scholarly Standard',
  },
  {
    id: 'NIV',
    shortName: 'NIV',
    fullName: 'New International Version',
    audienceTier: 'accessible',
    audienceLabel: 'Balanced Modern Readability',
    translationPhilosophy: 'Optimal Equivalence · Thought & Word Balance',
    description:
      'Bridges scholarly accuracy with natural modern English phrasing—ideal for cross-generational reading, tweens, and teens.',
    yearNote: 'Balanced Contemporary Text',
  },
  {
    id: 'NLT',
    shortName: 'NLT',
    fullName: 'New Living Translation',
    audienceTier: 'accessible',
    audienceLabel: 'Dynamic Narrative Clarity',
    translationPhilosophy: 'Dynamic Equivalence · Heart-Level Clarity',
    description:
      'Translates ancient idioms into warm, immediate modern prose so younger readers and newcomers grasp the narrative flow immediately.',
    yearNote: 'Accessible Narrative Edition',
  },
];

const DICTIONARY_ENTRIES: Record<string, DictionaryEntry> = {
  shepherd: {
    id: 'shepherd',
    term: 'Shepherd (Ra‘ah)',
    triggerWords: ['shepherd', 'Shepherd', 'shepherds'],
    originalWord: 'רָעָה',
    originalScript: 'רָעָה',
    transliteration: "Ra'ah",
    language: 'Hebrew',
    pronunciation: 'rah-AH',
    oneSentencePeek:
      'An ancient royal title for a devoted covenant protector who pastures, guides, and risks his life for the flock.',
    directDefinition:
      'To tend, pasture, companion, and fiercely protect a flock. In the ancient Near East, “Shepherd” was not a sentimental postcard image—it was the primary royal title for a covenant protector who risked his life against predators and drought.',
    culturalAndHistoricalContext:
      'Judean wilderness shepherds lived outdoors with their sheep 24 hours a day across rocky wadis. Unlike hired hands, a true family shepherd knew each animal by its gait and scars, carrying a weighted wooden club (rod) to ward off wolves and a curved crook (staff) to lift lambs out of limestone crevices.',
    dailyLifeArtifact:
      'Judean Sling & Oak Club (Shevet): Excavated iron-studded shepherd clubs and woven wool slings from Iron Age Lachish show the gritty reality of wilderness defense.',
    crossReferences: [
      {
        reference: 'Psalm 23:1',
        bookCategory: 'Wisdom & Psalms',
        snippet: 'The LORD is my shepherd; I shall not want.',
        linkedPassageId: 'psalm-23',
      },
      {
        reference: 'Ezekiel 34:11–12',
        bookCategory: 'Major Prophets',
        snippet:
          'Behold, I Myself will search for My sheep and seek them out, as a shepherd cares for his herd in the day when he is among his scattered sheep.',
      },
      {
        reference: 'John 10:11',
        bookCategory: 'Gospels',
        snippet:
          'I am the good shepherd. The good shepherd lays down his life for the sheep.',
      },
    ],
  },
  soul: {
    id: 'soul',
    term: 'Soul / Whole Life-Breath (Nephesh)',
    triggerWords: ['soul', 'Soul'],
    originalWord: 'נֶפֶשׁ',
    originalScript: 'נֶפֶשׁ',
    transliteration: 'Nephesh',
    language: 'Hebrew',
    pronunciation: 'NEH-fesh',
    oneSentencePeek:
      'Literally “breathing throat” or whole life-vitality—your entire physical, emotional, and spiritual self, not a disembodied ghost.',
    directDefinition:
      'Your entire breathing, hungering, living self—not a disembodied ghost floating away from the body. Literally “throat” or “breathing appetite,” Nephesh means your whole physical, emotional, and spiritual vitality.',
    culturalAndHistoricalContext:
      'When an exhausted desert traveler took a drink of cold spring water and gasped with relief, ancient Hebrews said their Nephesh (“parched throat / life-vitality”) had been brought back to life. When Psalm 23 says God “restores my soul,” it pictures a lost, heat-exhausted sheep being revived with cool water and set back on its feet.',
    dailyLifeArtifact:
      'Limestone Water Cisterns: Hand-plastered subterranean cisterns carved into Judean bedrock were matters of life and death for restoring a traveler’s Nephesh.',
    crossReferences: [
      {
        reference: 'Psalm 23:3',
        bookCategory: 'Wisdom & Psalms',
        snippet:
          'He restores my soul; He guides me in the paths of righteousness for His name’s sake.',
        linkedPassageId: 'psalm-23',
      },
      {
        reference: 'Deuteronomy 6:5',
        bookCategory: 'Torah',
        snippet:
          'You shall love the LORD your God with all your heart and with all your soul (nephesh) and with all your might.',
      },
      {
        reference: 'Psalm 42:1–2',
        bookCategory: 'Wisdom & Psalms',
        snippet:
          'As the deer pants for the water brooks, so my soul (nephesh) pants for You, O God.',
      },
    ],
  },
  sheol: {
    id: 'sheol',
    term: 'Shadow of Death / Sheol (Tsalmaveth & Sheol)',
    triggerWords: [
      'shadow of death',
      'deepest darkness',
      'darkest valley',
      'dark valley',
      'Sheol',
    ],
    originalWord: 'צַלְמָוֶת / שְׁאוֹל',
    originalScript: 'צַלְמָוֶת',
    transliteration: 'Tsalmaveth / Sheol',
    language: 'Hebrew',
    pronunciation: 'tsahl-MAH-veth',
    oneSentencePeek:
      'A compound Hebrew term meaning “death-like canyon shadow” or the depths of Sheol, picturing sunless wilderness ravines and existential danger.',
    directDefinition:
      'Compound Hebrew word meaning “death-like shadow” or “canyon of total gloom,” closely tied to Sheol (the realm of the dead or the pit of human helplessness). It describes seasons of overwhelming grief, danger, or existential dread.',
    culturalAndHistoricalContext:
      'In the Judean wilderness between Jerusalem and the Dead Sea, narrow limestone gorges (such as Wadi Qelt) drop hundreds of feet. High canyon walls block the sun for most of the day, creating sudden chill, flash-flood hazards, and ambush points for predators.',
    dailyLifeArtifact:
      'Herodian Terracotta Oil Lamp: A palm-sized clay lamp held just enough olive oil to illuminate a single step ahead inside pitch-black rock tombs or narrow ravines.',
    crossReferences: [
      {
        reference: 'Psalm 23:4',
        bookCategory: 'Wisdom & Psalms',
        snippet:
          'Even though I walk through the valley of the shadow of death, I fear no evil, for You are with me.',
        linkedPassageId: 'psalm-23',
      },
      {
        reference: 'Job 38:17',
        bookCategory: 'Wisdom & Poetry',
        snippet:
          'Have the gates of death been revealed to you, or have you seen the gates of deep darkness (tsalmaveth)?',
      },
      {
        reference: 'Amos 5:8',
        bookCategory: 'Minor Prophets',
        snippet:
          'He who made the Pleiades and Orion, and turns deep darkness (tsalmaveth) into morning.',
      },
    ],
  },
  chesed: {
    id: 'chesed',
    term: 'Lovingkindness / Unfailing Covenant Love (Chesed)',
    triggerWords: [
      'mercy',
      'lovingkindness',
      'lovingkindnesses',
      'unfailing love',
      'faithfulness',
      'kindness',
      'faithful love',
    ],
    originalWord: 'חֶסֶד',
    originalScript: 'חֶסֶד',
    transliteration: 'Chesed',
    language: 'Hebrew',
    pronunciation: 'KHEH-sed',
    oneSentencePeek:
      'Fierce, loyal, covenantal love in action—steadfast mercy that refuses to abandon a promise even when the other party fails.',
    directDefinition:
      'Fierce, loyal, covenantal love in action. Chesed is so rich that no single English word can hold it—translators render it “mercy” (AKJV), “lovingkindness” (NASB), “steadfast faithful love” (AMP), or “unfailing love” (NIV/NLT).',
    culturalAndHistoricalContext:
      'In ancient village life, Chesed was not a fleeting warm feeling; it was the unbreakable loyalty of a family member or blood-covenant partner who showed up with grain during famine, paid a kinsman’s debt at the city gate, and refused to abandon you when you failed.',
    dailyLifeArtifact:
      'Covenant Salt & Threshold Seal: Sharing salt and bread at a tent threshold bound hosts and guests in a sacred pledge of protection and Chesed.',
    crossReferences: [
      {
        reference: 'Psalm 23:6',
        bookCategory: 'Wisdom & Psalms',
        snippet:
          'Surely goodness and lovingkindness (chesed) will follow me all the days of my life.',
        linkedPassageId: 'psalm-23',
      },
      {
        reference: 'Micah 6:8',
        bookCategory: 'Minor Prophets',
        snippet:
          'And what does the LORD require of you but to do justice, to love kindness (chesed), and to walk humbly with your God?',
        linkedPassageId: 'micah-6',
      },
      {
        reference: 'Lamentations 3:22',
        testament: 'Old Testament',
        bookCategory: 'Major Prophets',
        snippet:
          'The LORD’S lovingkindnesses (chasadim) indeed never cease, for His compassions never fail.',
        linkedPassageId: 'lamentations-3',
      } as DictionaryEntry['crossReferences'][number],
    ],
  },
  covenant: {
    id: 'covenant',
    term: 'Covenant (Berith / Diatheke)',
    triggerWords: [
      'Covenant',
      'covenant',
      'LORD',
      'name’s sake',
      'his name',
      'His name',
      'table',
      'portion',
      'inheritance',
    ],
    originalWord: 'בְּרִית',
    originalScript: 'בְּרִית',
    transliteration: 'Berith',
    language: 'Hebrew',
    pronunciation: 'beh-REETH',
    oneSentencePeek:
      'A solemn, binding relationship pledge sealed by oath and table fellowship that unites two parties into permanent family loyalty.',
    directDefinition:
      'A solemn, binding relationship commitment sealed by oath and blood—stronger than a modern legal contract because it binds persons into family rather than merely exchanging goods.',
    culturalAndHistoricalContext:
      'In the ancient world, contracts broke as soon as one party failed. A royal suzerain or kinship Berith, however, staked the protector’s own reputation (“for His name’s sake”) and banquet table on the survival of the weaker partner. Sitting at someone’s prepared table in the presence of enemies meant the host’s full tribal protection now shielded you.',
    dailyLifeArtifact:
      'Hittite & Near Eastern Treaty Tablets: Clay cuneiform tablets found at Boghazkoy and Mari show how ancient kings sealed lifelong alliances with public banquets and anointing oil.',
    crossReferences: [
      {
        reference: 'Psalm 23:5',
        bookCategory: 'Wisdom & Psalms',
        snippet:
          'You prepare a table before me in the presence of my enemies; You have anointed my head with oil.',
        linkedPassageId: 'psalm-23',
      },
      {
        reference: 'Genesis 15:18',
        bookCategory: 'Torah',
        snippet: 'On that day the LORD made a covenant (berith) with Abram.',
      },
      {
        reference: 'Jeremiah 31:33',
        bookCategory: 'Major Prophets',
        snippet:
          'I will put My law within them and on their heart I will write it; and I will be their God.',
      },
    ],
  },
  logos: {
    id: 'logos',
    term: 'The Word / Cosmic Self-Expression (Logos)',
    triggerWords: ['Word', 'word', 'Light', 'light'],
    originalWord: 'λόγος',
    originalScript: 'λόγος',
    transliteration: 'Logos',
    language: 'Greek',
    pronunciation: 'LAH-gos',
    oneSentencePeek:
      'God’s living, personal self-expression and creative wisdom—bridging Hebrew creation speech (Dabar) with Greek cosmic order.',
    directDefinition:
      'God’s living, personal self-expression, creative speech, and ordering intelligence made visible in Jesus of Nazareth.',
    culturalAndHistoricalContext:
      'When John wrote “In the beginning was the Logos,” he bridged two worlds at once: Jewish readers immediately heard Genesis 1 (“And God said, Let there be light”) and God’s dynamic Word (Dabar) that accomplishes what it speaks; Greek philosophical readers in Ephesus heard the ultimate rational principle holding the cosmos together—now revealed not as a cold equation, but as a living Person.',
    dailyLifeArtifact:
      'Ephesus Library of Celsus Inscriptions: First-century marble inscriptions in Asia Minor debated cosmic order (Logos), where John first proclaimed the incarnate Word.',
    crossReferences: [
      {
        reference: 'John 1:1',
        bookCategory: 'Gospels',
        snippet:
          'In the beginning was the Word (Logos), and the Word was with God, and the Word was God.',
        linkedPassageId: 'john-1',
      },
      {
        reference: 'John 1:14',
        bookCategory: 'Gospels',
        snippet:
          'And the Word became flesh, and dwelt (tabernacled) among us, and we saw His glory.',
      },
      {
        reference: 'Psalm 33:6',
        bookCategory: 'Wisdom & Psalms',
        snippet:
          'By the word of the LORD the heavens were made, and by the breath of His mouth all their host.',
      },
    ],
  },
  tabernacle: {
    id: 'tabernacle',
    term: 'Tabernacle / Sanctuary Dwelling (Mishkan / Skene)',
    triggerWords: ['house of the LORD', 'sanctuary', 'dwell', 'Presence'],
    originalWord: 'מִשְׁכָּן / σκηνή',
    originalScript: 'מִשְׁכָּן',
    transliteration: 'Mishkan / Skene',
    language: 'Hebrew',
    pronunciation: 'mish-KAHN',
    oneSentencePeek:
      'Literally “pitched tent” or “dwelling place”—the portable sanctuary where God’s presence camped right in the dust with His people.',
    directDefinition:
      'Literally “dwelling place” or “pitched tent.” The portable sanctuary tent where God’s presence traveled right in the dust and camp of His people—and later fulfilled when Christ “pitched His tent” (eskenosen) among humanity.',
    culturalAndHistoricalContext:
      'Ancient empires believed gods lived only inside immovable stone ziggurats served by elite priests. Israel’s Mishkan was a woven goat-hair and acacia-wood tent carried through the Sinai desert, proving that the Creator moves with refugees, nomads, and families wherever they camp.',
    dailyLifeArtifact:
      'Bedouin Goat-Hair Tent Weave: Dark, tightly spun goat-hair fabric expands when wet to seal out desert rain while letting loom-woven dyed linen glow inside by lamplight.',
    crossReferences: [
      {
        reference: 'Psalm 23:6',
        bookCategory: 'Wisdom & Psalms',
        snippet: 'And I will dwell in the house of the LORD forever.',
        linkedPassageId: 'psalm-23',
      },
      {
        reference: 'Exodus 25:8',
        bookCategory: 'Torah',
        snippet:
          'Let them construct a sanctuary for Me, that I may dwell (shakan) among them.',
      },
      {
        reference: 'John 1:14',
        bookCategory: 'Gospels',
        snippet:
          'And the Word became flesh and pitched His tent (tabernacled) among us.',
        linkedPassageId: 'john-1',
      },
    ],
  },
  mishpat: {
    id: 'mishpat',
    term: 'Restorative Justice (Mishpat)',
    triggerWords: ['justice', 'justly', 'fair'],
    originalWord: 'מִשְׁפָּט',
    originalScript: 'מִשְׁפָּט',
    transliteration: 'Mishpat',
    language: 'Hebrew',
    pronunciation: 'mish-PAHT',
    oneSentencePeek:
      'Active, restorative fairness that repairs broken community relationships and protects the vulnerable from exploitation.',
    directDefinition:
      'Active, restorative justice that puts broken community relationships back into right alignment—especially defending the vulnerable (the widow, orphan, immigrant, and poor) from exploitation.',
    culturalAndHistoricalContext:
      'In 8th-century BCE Judah during the prophet Micah’s life, wealthy landowners were using rigged stone weights in the marketplace to seize family farms while still offering expensive animal sacrifices at the Temple. Micah declares that God rejects hollow religious theater without Mishpat (fairness on Monday morning) and Chesed (compassionate loyalty).',
    dailyLifeArtifact:
      'Inscribed Judean Shekel Limestone Weights: Archaeologists excavating Jerusalem and Lachish uncovered carved stone scale weights used at city-gate markets to measure silver and grain fairly.',
    crossReferences: [
      {
        reference: 'Micah 6:8',
        bookCategory: 'Minor Prophets',
        snippet:
          'What does the LORD require of you but to do justice (mishpat), to love kindness (chesed), and to walk humbly with your God?',
        linkedPassageId: 'micah-6',
      },
      {
        reference: 'Isaiah 1:17',
        bookCategory: 'Major Prophets',
        snippet:
          'Learn to do good; seek justice (mishpat), reprove the ruthless, defend the orphan, plead for the widow.',
      },
      {
        reference: 'Amos 5:24',
        bookCategory: 'Minor Prophets',
        snippet:
          'But let justice (mishpat) roll down like waters and righteousness like an ever-flowing stream.',
      },
    ],
  },
  pharisee: {
    id: 'pharisee',
    term: 'Pharisee (Perushim / Pharisaios)',
    triggerWords: [
      'Pharisee',
      'Pharisees',
      'comprehended',
      'comprehend',
      'overcome',
    ],
    originalWord: 'פְּרוּשִׁים / Φαρισαῖος',
    originalScript: 'Φαρισαῖος',
    transliteration: 'Pharisaios',
    language: 'Greek',
    pronunciation: 'far-ih-SAH-yos',
    oneSentencePeek:
      'A First-Century Jewish lay renewal movement (“the set-apart ones”) devoted to rigorous Torah study and household holiness under Roman rule.',
    directDefinition:
      'From the Hebrew/Aramaic root “set apart.” A First-Century Jewish renewal movement of lay scholars deeply devoted to Torah study, synagogue life, and keeping Israel spiritually distinct under Roman occupation.',
    culturalAndHistoricalContext:
      'Modern readers often treat “Pharisee” as a flat synonym for “villain,” missing the real historical tension. Unlike the aristocratic Sadducees who collaborated with Rome, Pharisees were respected neighborhood teachers who cared deeply about scripture. Figures like Nicodemus (John 3) and Paul of Tarsus were Pharisees who wrestled intensely with how the eternal Logos fulfilled the Law.',
    dailyLifeArtifact:
      'First-Century Galilean Stone Purity Vessels (Kallal): Lathed chalkstone water jars found in Cana and Jerusalem reflect Pharisaic devotion to everyday household holiness.',
    crossReferences: [
      {
        reference: 'John 1:5',
        bookCategory: 'Gospels',
        snippet:
          'The Light shines in the darkness, and the darkness did not comprehend (or overpower) it.',
        linkedPassageId: 'john-1',
      },
      {
        reference: 'John 3:1–2',
        bookCategory: 'Gospels',
        snippet:
          'Now there was a man of the Pharisees, named Nicodemus, a ruler of the Jews; this man came to Jesus by night.',
      },
      {
        reference: 'Philippians 3:5',
        bookCategory: 'Epistles',
        snippet:
          'A Hebrew of Hebrews; as to the Law, a Pharisee; as to righteousness which is in the Law, found blameless.',
      },
    ],
  },
  shalom: {
    id: 'shalom',
    term: 'Wholeness & Flourishing Peace (Shalom / Eirene)',
    triggerWords: [
      'still waters',
      'quiet waters',
      'peaceful',
      'wait quietly',
      'waits silently',
      'good',
    ],
    originalWord: 'שָׁלוֹם',
    originalScript: 'שָׁלוֹם',
    transliteration: 'Shalom',
    language: 'Hebrew',
    pronunciation: 'shah-LOHM',
    oneSentencePeek:
      'Complete structural wholeness, safety, and human flourishing across every relationship—far deeper than the mere absence of noise.',
    directDefinition:
      'Complete wholeness, structural harmony, safety, and flourishing across every dimension of life—not merely the temporary absence of noise or conflict.',
    culturalAndHistoricalContext:
      'To build a stone wall with no missing or cracked stones was to make it Shalem (“whole/intact”). When a shepherd led sheep beside “waters of rest / still waters” (mei menuchot), or when Jeremiah wept over Jerusalem yet anchored his hope in quiet trust, Shalom meant deep inner completeness even when the surrounding world was fractured.',
    dailyLifeArtifact:
      'Silver Ketef Hinnom Priestly Blessing Scrolls (c. 600 BCE): Tiny rolled silver amulets bearing the oldest surviving biblical text: “The LORD lift up His countenance upon you and give you Shalom.”',
    crossReferences: [
      {
        reference: 'Psalm 23:2',
        bookCategory: 'Wisdom & Psalms',
        snippet:
          'He makes me lie down in green pastures; He leads me beside quiet waters.',
        linkedPassageId: 'psalm-23',
      },
      {
        reference: 'Lamentations 3:26',
        bookCategory: 'Major Prophets',
        snippet:
          'It is good that he waits silently for the salvation of the LORD.',
        linkedPassageId: 'lamentations-3',
      },
      {
        reference: 'Numbers 6:26',
        bookCategory: 'Torah',
        snippet:
          'The LORD lift up His countenance on you, and give you peace (shalom).',
      },
    ],
  },
};

const STUDY_PASSAGES: StudyPassage[] = [
  {
    id: 'psalm-23',
    reference: 'Psalm 23:1–6',
    title: 'The Shepherd’s Valley & Covenant Table',
    testament: 'Old Testament',
    book: 'Psalms',
    historicalDate: 'c. 1000 BCE · Judean Wilderness',
    themeTag: 'Providence · Refuge · Chesed',
    estimatedReadTime: '2 min read',
    introContext:
      'Composed by David out of lived experience tending flocks in the arid ravines of Judah. Compare how formal translations preserve the ancient sanctuary metaphors while dynamic versions illuminate the emotional security of the flock.',
    verses: [
      {
        verseNumber: 1,
        translations: {
          AKJV: 'The LORD is my shepherd; I shall not want.',
          AMP: 'The LORD is my Shepherd [to feed, to guide and to shield me], I shall not lack.',
          NASB: 'The LORD is my shepherd, I shall not want.',
          NIV: 'The LORD is my shepherd, I lack nothing.',
          NLT: 'The LORD is my shepherd; I have all that I need.',
        },
        nuanceCommentary:
          'Notice how AMP unpacks the Hebrew participle Ra‘ah (“Shepherd”) to include feeding, guiding, and shielding, while NLT clarifies for younger readers that “I shall not want” means “I have all that I need” rather than “I do not desire.”',
        keyHighlightDifference: [
          {
            version: 'AMP',
            phrase: '[to feed, to guide and to shield me]',
            insight:
              'Unpacks the royal Near Eastern shepherd duties implicit in the Hebrew verb.',
          },
          {
            version: 'NLT',
            phrase: 'I have all that I need',
            insight:
              'Clarifies archaic English “want” (lack) for younger or newer readers.',
          },
        ],
        dictionaryTermIds: ['shepherd', 'covenant'],
      },
      {
        verseNumber: 2,
        translations: {
          AKJV: 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.',
          AMP: 'He makes me lie down in [fresh, tender] green pastures; He leads me beside the still and restful waters.',
          NASB: 'He makes me lie down in green pastures; He leads me beside quiet waters.',
          NIV: 'He makes me lie down in green pastures, he leads me beside quiet waters,',
          NLT: 'He lets me rest in green meadows; he leads me beside peaceful streams.',
        },
        nuanceCommentary:
          'In Hebrew, “still waters” is literally mei menuchot—“waters of resting places.” Sheep are terrified of fast-moving, muddy flash floods because heavy wool pulls them under; the shepherd dams a quiet pool so the flock can drink in Shalom.',
        keyHighlightDifference: [
          {
            version: 'NASB',
            phrase: 'quiet waters',
            insight: 'Literal rendering of waters of rest (menuchah).',
          },
          {
            version: 'NLT',
            phrase: 'peaceful streams',
            insight: 'Paints an immediate visual picture of safe, calm water.',
          },
        ],
        dictionaryTermIds: ['shalom'],
      },
      {
        verseNumber: 3,
        translations: {
          AKJV: 'He restoreth my soul: he leadeth me in the paths of righteousness for his name’s sake.',
          AMP: 'He refreshes and restores my soul (life); He leads me in the paths of righteousness for His name’s sake [not for my earning, but His honor].',
          NASB: 'He restores my soul; He guides me in the paths of righteousness for His name’s sake.',
          NIV: 'he refreshes my soul. He guides me along the right paths for his name’s sake.',
          NLT: 'he renews my strength. He guides me along right paths, bringing honor to his name.',
        },
        nuanceCommentary:
          'Compare “soul” (AKJV/NASB), “soul (life)” (AMP), and “strength” (NLT). The Hebrew word Nephesh means one’s whole breathing vitality. AMP and NIV use “refreshes” to show physical and emotional revival after exhaustion.',
        keyHighlightDifference: [
          {
            version: 'AMP',
            phrase: 'refreshes and restores my soul (life)',
            insight:
              'Shows that Hebrew Nephesh encompasses both inner spirit and physical life-breath.',
          },
          {
            version: 'NLT',
            phrase: 'bringing honor to his name',
            insight:
              'Explains the ancient covenant idiom “for His name’s sake.”',
          },
        ],
        dictionaryTermIds: ['soul', 'covenant'],
      },
      {
        verseNumber: 4,
        translations: {
          AKJV: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.',
          AMP: 'Even though I walk through the [sunless] valley of the shadow of death, I fear no evil, for You are with me; Your rod [to protect] and Your staff [to guide], they comfort and console me.',
          NASB: 'Though I walk through the valley of the shadow of death, I fear no evil, for You are with me; Your rod and Your staff, they comfort me.',
          NIV: 'Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.',
          NLT: 'Even when I walk through the darkest valley, I will not be afraid, for you are close beside me. Your rod and your staff protect and comfort me.',
        },
        nuanceCommentary:
          'Notice the shift in pronoun from “He” (vv. 1–3) to “You” (v. 4): in the sunless canyon (Tsalmaveth), the Shepherd is no longer talked about from a distance—He is spoken to face-to-face. AMP distinguishes the defensive club (rod) from the guiding crook (staff).',
        keyHighlightDifference: [
          {
            version: 'AKJV',
            phrase: 'valley of the shadow of death',
            insight:
              'Preserves the iconic literal compound image of Tsalmaveth.',
          },
          {
            version: 'AMP',
            phrase: 'Your rod [to protect] and Your staff [to guide]',
            insight:
              'Distinguishes the two distinct tools carried by ancient Judean shepherds.',
          },
        ],
        dictionaryTermIds: ['sheol', 'shepherd'],
      },
      {
        verseNumber: 5,
        translations: {
          AKJV: 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.',
          AMP: 'You prepare a table before me in the presence of my enemies. You have anointed and refreshed my head with oil; my [brimming] cup runs over.',
          NASB: 'You prepare a table before me in the presence of my enemies; You have anointed my head with oil; my cup overflows.',
          NIV: 'You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows.',
          NLT: 'You prepare a feast for me in the presence of my enemies. You honor me by anointing my head with oil. My cup overflows with blessings.',
        },
        nuanceCommentary:
          'Here the metaphor transitions from wilderness pasture to a royal Bedouin covenant tent. NLT explains why a host poured olive oil on a guest’s head (“You honor me”), while NASB and AKJV preserve the concrete ritual language.',
        keyHighlightDifference: [
          {
            version: 'NASB',
            phrase: 'You have anointed my head with oil',
            insight:
              'Word-for-word preservation of the ancient hospitality & healing ritual.',
          },
          {
            version: 'NLT',
            phrase: 'You honor me by anointing my head with oil',
            insight:
              'Translates the cultural meaning of the gesture for modern readers.',
          },
        ],
        dictionaryTermIds: ['covenant'],
      },
      {
        verseNumber: 6,
        translations: {
          AKJV: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.',
          AMP: 'Surely goodness and mercy and unfailing love shall follow me all the days of my life, and I shall dwell forever [throughout all my days] in the house and in the presence of the LORD.',
          NASB: 'Surely goodness and lovingkindness will follow me all the days of my life, and I will dwell in the house of the LORD forever.',
          NIV: 'Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the LORD forever.',
          NLT: 'Surely your goodness and unfailing love will pursue me all the days of my life, and I will live in the house of the LORD forever.',
        },
        nuanceCommentary:
          'Look closely at the verb & noun pair: the Hebrew noun is Chesed (“mercy” in AKJV, “lovingkindness” in NASB, “unfailing love” in AMP/NLT), and the Hebrew verb radaph literally means “pursue / chase after” (captured vividly by NLT’s “will pursue me”).',
        keyHighlightDifference: [
          {
            version: 'NASB',
            phrase: 'goodness and lovingkindness',
            insight: 'Classic scholarly rendering of Hebrew Chesed.',
          },
          {
            version: 'NLT',
            phrase: 'unfailing love will pursue me',
            insight:
              'Captures the active force of the Hebrew verb radaph (to chase/pursue).',
          },
        ],
        dictionaryTermIds: ['chesed', 'tabernacle'],
      },
    ],
  },
  {
    id: 'john-1',
    reference: 'John 1:1–5',
    title: 'The Eternal Logos & Unconquered Light',
    testament: 'New Testament',
    book: 'John',
    historicalDate: 'c. 85–90 CE · Ephesus (Asia Minor)',
    themeTag: 'Creation · Logos · Light',
    estimatedReadTime: '3 min read',
    introContext:
      'John’s prologue deliberately echoes the opening words of Genesis (“In the beginning”) to unveil who Jesus is before time began. Compare how each version translates Greek Logos and the dual meaning of katelaben in verse 5.',
    verses: [
      {
        verseNumber: 1,
        translations: {
          AKJV: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
          AMP: 'In the beginning [before all time] was the Word (Christ), and the Word was with God, and the Word was God Himself.',
          NASB: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
          NIV: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
          NLT: 'In the beginning the Word already existed. The Word was with God, and the Word was God.',
        },
        nuanceCommentary:
          'The Greek imperfect verb ēn (“was / already existed”) denotes continuous, timeless existence before creation began. NLT renders this tense explicitly (“already existed”), while AMP clarifies that the Logos is personal (“God Himself”).',
        keyHighlightDifference: [
          {
            version: 'NASB',
            phrase: 'was with God, and the Word was God',
            insight:
              'Reflects the Greek preposition pros ton Theon (face-to-face relationship with God).',
          },
          {
            version: 'NLT',
            phrase: 'the Word already existed',
            insight:
              'Unpacks the Greek imperfect tense (ēn) for younger readers.',
          },
        ],
        dictionaryTermIds: ['logos'],
      },
      {
        verseNumber: 2,
        translations: {
          AKJV: 'The same was in the beginning with God.',
          AMP: 'He was [continually existing] in the beginning [co-eternally] with God.',
          NASB: 'He was in the beginning with God.',
          NIV: 'He was with God in the beginning.',
          NLT: 'He existed in the beginning with God.',
        },
        nuanceCommentary:
          'Notice how AKJV reads “The same” while NASB, AMP, NIV, and NLT use “He,” highlighting that the Greek pronoun houtos points to a living Person rather than an impersonal force.',
        keyHighlightDifference: [
          {
            version: 'AMP',
            phrase: '[continually existing] in the beginning [co-eternally]',
            insight:
              'Draws out the theological weight of the repeated Greek imperfect verb.',
          },
        ],
        dictionaryTermIds: ['logos'],
      },
      {
        verseNumber: 3,
        translations: {
          AKJV: 'All things were made by him; and without him was not any thing made that was made.',
          AMP: 'All things were made and came into existence through Him; and without Him not even one thing was made that has come into being.',
          NASB: 'All things came into being through Him, and apart from Him nothing came into being that has come into being.',
          NIV: 'Through him all things were made; without him nothing was made that has been made.',
          NLT: 'God created everything through him, and nothing was created except through him.',
        },
        nuanceCommentary:
          'NASB and AMP translate the Greek verb egeneto literally as “came into being,” contrasting things that “came into being” with the Word who simply “was” (v. 1).',
        keyHighlightDifference: [
          {
            version: 'NASB',
            phrase: 'came into being through Him',
            insight:
              'Preserves the contrast between eternal existence (ēn) and created becoming (egeneto).',
          },
        ],
        dictionaryTermIds: ['logos'],
      },
      {
        verseNumber: 4,
        translations: {
          AKJV: 'In him was life; and the life was the light of men.',
          AMP: 'In Him was life [and the power to bestow life], and the life was the Light of men.',
          NASB: 'In Him was life, and the life was the Light of men.',
          NIV: 'In him was life, and that life was the light of all mankind.',
          NLT: 'The Word gave life to everything that was created, and his life brought light to everyone.',
        },
        nuanceCommentary:
          'Greek has two words for life: bios (biological existence) and zōē (uncreated, indestructible spiritual and physical vitality). John uses zōē here, which becomes the unquenchable Light (phōs) guiding humanity.',
        keyHighlightDifference: [
          {
            version: 'AMP',
            phrase: 'life [and the power to bestow life]',
            insight: 'Highlights Greek zōē as self-existent, fountainhead life.',
          },
        ],
        dictionaryTermIds: ['logos', 'soul'],
      },
      {
        verseNumber: 5,
        translations: {
          AKJV: 'And the light shineth in darkness; and the darkness comprehended it not.',
          AMP: 'The Light shines on in the darkness, and the darkness did not understand it or overpower it [nor did it absorb or extinguish it].',
          NASB: 'The Light shines in the darkness, and the darkness did not comprehend it.',
          NIV: 'The light shines in the darkness, and the darkness has not overcome it.',
          NLT: 'The light shines in the darkness, and the darkness can never extinguish it.',
        },
        nuanceCommentary:
          'A masterclass in parallel Bible study! The Greek verb katelaben means to “grasp”—either with the mind (“comprehend/understand,” AKJV & NASB) or with hostile force (“overcome/extinguish,” NIV & NLT). AMP gives you both meanings side-by-side!',
        keyHighlightDifference: [
          {
            version: 'NASB',
            phrase: 'did not comprehend it',
            insight: 'Emphasizes intellectual/spiritual grasping of the Light.',
          },
          {
            version: 'NIV',
            phrase: 'has not overcome it',
            insight: 'Emphasizes hostile darkness failing to conquer the Light.',
          },
          {
            version: 'AMP',
            phrase:
              'did not understand it or overpower it [nor did it absorb or extinguish it]',
            insight:
              'Shows the full double-meaning of John’s Greek verb katelaben.',
          },
        ],
        dictionaryTermIds: ['pharisee', 'logos'],
      },
    ],
  },
  {
    id: 'micah-6',
    reference: 'Micah 6:6–8',
    title: 'What Does the Lord Require? Justice, Chesed & Humility',
    testament: 'Old Testament',
    book: 'Micah',
    historicalDate: 'c. 735–700 BCE · Moresheth & Jerusalem',
    themeTag: 'Justice · Chesed · Humility',
    estimatedReadTime: '2 min read',
    introContext:
      'Spoken as a dramatic covenant courtroom trial in 8th-century Judah. Notice how comparing AKJV, AMP, NASB, NIV, and NLT reveals the triad of Mishpat (justice), Chesed (mercy/lovingkindness), and walking humbly with God.',
    verses: [
      {
        verseNumber: 6,
        translations: {
          AKJV: 'Wherewith shall I come before the LORD, and bow myself before the high God? shall I come before him with burnt offerings, with calves of a year old?',
          AMP: 'With what shall I come before the LORD and bow myself before God on high? Shall I come before Him with burnt offerings, with yearling calves?',
          NASB: 'With what shall I come to the LORD and bow myself before the God on high? Shall I come to Him with burnt offerings, with yearling calves?',
          NIV: 'With what shall I come before the LORD and bow down before the exalted God? Shall I come before him with burnt offerings, with calves a year old?',
          NLT: 'What can we bring to the LORD? What kind of offerings should we give him when we bow before God Most High? Should we offer him burnt offerings and year-old calves?',
        },
        nuanceCommentary:
          'Year-old calves were the prime, most expensive offerings a wealthy family could bring to the Jerusalem altar. The speaker asks whether God can be appeased by religious luxury while neighbors are mistreated.',
        keyHighlightDifference: [
          {
            version: 'AKJV',
            phrase: 'Wherewith shall I come before the LORD',
            insight:
              'Solemn courtroom cadence of the ancient prophetic lawsuit (Riv).',
          },
          {
            version: 'NLT',
            phrase: 'What can we bring to the LORD?',
            insight: 'Direct conversational question for modern readers.',
          },
        ],
        dictionaryTermIds: ['covenant'],
      },
      {
        verseNumber: 7,
        translations: {
          AKJV: 'Will the LORD be pleased with thousands of rams, or with ten thousands of rivers of oil? shall I give my firstborn for my transgression, the fruit of my body for the sin of my soul?',
          AMP: 'Will the LORD be delighted with thousands of rams, or with ten thousand rivers of oil? Shall I present my firstborn for my acts of rebellion, the fruit of my body for the sin of my soul?',
          NASB: 'Does the LORD take delight in thousands of rams, in ten thousand rivers of oil? Shall I present my firstborn for my rebellious acts, the fruit of my body for the sin of my soul?',
          NIV: 'Will the LORD be pleased with thousands of rams, with ten thousand rivers of olive oil? Shall I offer my firstborn for my transgression, the fruit of my body for the sin of my soul?',
          NLT: 'Should we offer him thousands of rams and ten thousand rivers of olive oil? Would that please the LORD? Should we sacrifice our firstborn children to pay for our sins?',
        },
        nuanceCommentary:
          'Micah uses escalating hyperbole—from one calf, to thousands of rams, to 10,000 rivers of olive oil, to the horrific Canaanite practice of child sacrifice—exposing the folly of trying to bribe God while ignoring human suffering.',
        keyHighlightDifference: [
          {
            version: 'AMP',
            phrase: 'delighted with thousands of rams',
            insight:
              'Shows that God desires relational transformation, not transactional bribery.',
          },
        ],
        dictionaryTermIds: ['soul'],
      },
      {
        verseNumber: 8,
        translations: {
          AKJV: 'He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?',
          AMP: 'He has told you, O man, what is good; and what does the LORD require of you except to be just, and to love [and to diligently practice] kindness (compassion), and to walk humbly with your God [setting aside any overblown sense of importance or self-righteousness]?',
          NASB: 'He has told you, O man, what is good; and what does the LORD require of you but to do justice, to love kindness, and to walk humbly with your God?',
          NIV: 'He has shown you, O mortal, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God.',
          NLT: 'No, O people, the LORD has told you what is good, and this is what he requires of you: to do what is right, to love mercy, and to walk humbly with your God.',
        },
        nuanceCommentary:
          'Compare the three pillars across versions: 1) “do justly / do justice / do what is right” (Mishpat), 2) “love mercy / love kindness” (Chesed), and 3) “walk humbly” (hatzne‘a lekhet—literally “walk attentively, wisely, and unpretentiously”).',
        keyHighlightDifference: [
          {
            version: 'AKJV',
            phrase: 'do justly, and to love mercy, and to walk humbly',
            insight: 'The timeless poetic triad memorized across centuries.',
          },
          {
            version: 'NASB',
            phrase: 'do justice, to love kindness',
            insight:
              'Translates Chesed as “kindness” to emphasize active covenantal loyalty.',
          },
          {
            version: 'AMP',
            phrase:
              'love [and to diligently practice] kindness (compassion)',
            insight:
              'Unpacks both the inward affection and outward practice of Chesed.',
          },
        ],
        dictionaryTermIds: ['mishpat', 'chesed', 'shalom'],
      },
    ],
  },
  {
    id: 'lamentations-3',
    reference: 'Lamentations 3:21–26',
    title: 'New Every Morning: Hope in the Rubble',
    testament: 'Old Testament',
    book: 'Lamentations',
    historicalDate: 'c. 586 BCE · Post-Siege Jerusalem',
    themeTag: 'Grief · Chesed · Renewal',
    estimatedReadTime: '3 min read',
    introContext:
      'Written as an acrostic poem in the ashes of Jerusalem after the Babylonian siege. At the exact mathematical center of the book, the poet pivots from raw trauma to the unbreakable Chesed of God.',
    verses: [
      {
        verseNumber: 21,
        translations: {
          AKJV: 'This I recall to my mind, therefore have I hope.',
          AMP: 'But this I call to mind, therefore I have hope and expectation:',
          NASB: 'This I recall to my mind, therefore I have hope.',
          NIV: 'Yet this I call to mind and therefore I have hope:',
          NLT: 'Yet I still dare to hope when I remember this:',
        },
        nuanceCommentary:
          'Literally in Hebrew: “This I return to my heart (el-libbi).” In ancient Hebrew psychology, the heart (lev) was the seat of thought, memory, and decision—hence NASB/AKJV “recall to my mind.”',
        keyHighlightDifference: [
          {
            version: 'NASB',
            phrase: 'This I recall to my mind',
            insight:
              'Translates the Hebrew idiom “bring back to my heart” as intentional mental recall.',
          },
          {
            version: 'NLT',
            phrase: 'Yet I still dare to hope',
            insight: 'Captures the courage required to hope amidst ruins.',
          },
        ],
        dictionaryTermIds: ['soul'],
      },
      {
        verseNumber: 22,
        translations: {
          AKJV: 'It is of the LORD’s mercies that we are not consumed, because his compassions fail not.',
          AMP: 'It is because of the LORD’s lovingkindnesses that we are not consumed, because His [tender] compassions never fail.',
          NASB: 'The LORD’S lovingkindnesses indeed never cease, for His compassions never fail.',
          NIV: 'Because of the LORD’s great love we are not consumed, for his compassions never fail.',
          NLT: 'The faithful love of the LORD never ends! His mercies never cease.',
        },
        nuanceCommentary:
          'Notice NASB and AMP use the plural “lovingkindnesses” (chasadim)—meaning God’s covenantal love isn’t a single ration, but an overflowing multitude of daily mercies paired with rachamim (“womb-like tender compassions”).',
        keyHighlightDifference: [
          {
            version: 'AMP',
            phrase: 'lovingkindnesses ... [tender] compassions',
            insight:
              'Preserves the Hebrew plural chasadim alongside maternal-depth compassion (rachamim).',
          },
        ],
        dictionaryTermIds: ['chesed'],
      },
      {
        verseNumber: 23,
        translations: {
          AKJV: 'They are new every morning: great is thy faithfulness.',
          AMP: 'They are new every morning; great and abundant is Your stability and faithfulness.',
          NASB: 'They are new every morning; great is Your faithfulness.',
          NIV: 'They are new every morning; great is your faithfulness.',
          NLT: 'Great is his faithfulness; his mercies begin afresh each morning.',
        },
        nuanceCommentary:
          'The Hebrew word for faithfulness is ’emunah—derived from the root ’aman (to be firm, steady, unshakeable, where we get the word “Amen”). AMP highlights this architectural steadiness: “Your stability and faithfulness.”',
        keyHighlightDifference: [
          {
            version: 'AMP',
            phrase: 'great and abundant is Your stability and faithfulness',
            insight:
              'Brings out the bedrock architectural root of Hebrew ’emunah.',
          },
        ],
        dictionaryTermIds: ['chesed', 'covenant'],
      },
      {
        verseNumber: 24,
        translations: {
          AKJV: 'The LORD is my portion, saith my soul; therefore will I hope in him.',
          AMP: '“The LORD is my portion and my inheritance,” says my soul; “Therefore I have hope in Him and wait expectantly for Him.”',
          NASB: '“The LORD is my portion,” says my soul, “Therefore I have hope in Him.”',
          NIV: 'I say to myself, “The LORD is my portion; therefore I will wait for him.”',
          NLT: 'I say to myself, “The LORD is my inheritance; therefore, I will hope in him!”',
        },
        nuanceCommentary:
          'When land, homes, and savings were burned in 586 BCE, every earthly “portion” (cheleq—allotted land inheritance) was gone. The poet realizes that God Himself is the unburnable inheritance of the soul (Nephesh).',
        keyHighlightDifference: [
          {
            version: 'AMP',
            phrase: 'my portion and my inheritance',
            insight:
              'Explains the land-allotment metaphor behind Hebrew cheleq.',
          },
        ],
        dictionaryTermIds: ['soul', 'covenant'],
      },
      {
        verseNumber: 25,
        translations: {
          AKJV: 'The LORD is good unto them that wait for him, to the soul that seeketh him.',
          AMP: 'The LORD is good to those who wait [confidently] for Him, to those who seek Him [on the authority of God’s word].',
          NASB: 'The LORD is good to those who wait for Him, to the person who seeks Him.',
          NIV: 'The LORD is good to those whose hope is in him, to the one who seeks him;',
          NLT: 'The LORD is good to those who depend on him, to those who search for him.',
        },
        nuanceCommentary:
          'The Hebrew verb qavah (“wait”) originally pictured twisting fibers together into a strong rope under tension. Waiting on God is not passive boredom; it is braided resilience.',
        keyHighlightDifference: [
          {
            version: 'NASB',
            phrase: 'to the person who seeks Him',
            insight:
              'Translates Nephesh idiomatic singular (“to the soul/person”).',
          },
        ],
        dictionaryTermIds: ['soul', 'shalom'],
      },
      {
        verseNumber: 26,
        translations: {
          AKJV: 'It is good that a man should both hope and quietly wait for the salvation of the LORD.',
          AMP: 'It is good that one should hope in and wait quietly for the salvation (deliverance) of the LORD.',
          NASB: 'It is good that he waits silently for the salvation of the LORD.',
          NIV: 'it is good to wait quietly for the salvation of the LORD.',
          NLT: 'So it is good to wait quietly for salvation from the LORD.',
        },
        nuanceCommentary:
          'Ends the stanza with hushed stillness (dumam)—a quiet, unhurried trust that refuses panic even before deliverance arrives.',
        keyHighlightDifference: [
          {
            version: 'AMP',
            phrase: 'salvation (deliverance) of the LORD',
            insight:
              'Connects Hebrew teshuah to concrete rescue and restoration.',
          },
        ],
        dictionaryTermIds: ['shalom'],
      },
    ],
  },
  {
    id: 'isaiah-40',
    reference: 'Isaiah 40:28–31',
    title: 'Unsearchable Understanding & Renewed Wings',
    testament: 'Old Testament',
    book: 'Isaiah',
    historicalDate: 'c. 700–540 BCE · Judean & Exilic Horizon',
    themeTag: 'Endurance · Hope · Renewal',
    estimatedReadTime: '3 min read',
    introContext:
      'Addressed to weary exiles wondering if the Creator had forgotten their exhaustion. Compare how each version translates the Hebrew verb qavah (“wait upon / hope in / expectantly look for”) and the exchange of human fatigue for eagle-winged endurance.',
    verses: [
      {
        verseNumber: 28,
        translations: {
          AKJV: 'Hast thou not known? hast thou not heard, that the everlasting God, the LORD, the Creator of the ends of the earth, fainteth not, neither is weary? there is no searching of his understanding.',
          AMP: 'Do you not know? Have you not heard? The Everlasting God, the LORD, the Creator of the ends of the earth does not become tired or grow weary; there is no searching of His understanding.',
          NASB: 'Do you not know? Have you not heard? The Everlasting God, the LORD, the Creator of the ends of the earth does not become weary or tired. His understanding is inscrutable.',
          NIV: 'Do you not know? Have you not heard? The LORD is the everlasting God, the Creator of the ends of the earth. He will not grow tired or weary, and his understanding no one can fathom.',
          NLT: 'Have you never heard? Have you never understood? The LORD is the everlasting God, the Creator of all the earth. He never grows weak or weary. No one can measure the depths of his understanding.',
        },
        nuanceCommentary:
          'The Hebrew title El Olam (“Everlasting God / God of Eternity”) anchors the rhetorical question. NASB renders ein cheqer litsvunato as “His understanding is inscrutable,” while NLT unpacks it as “No one can measure the depths of his understanding.”',
        keyHighlightDifference: [
          {
            version: 'NASB',
            phrase: 'His understanding is inscrutable',
            insight: 'Concise formal rendering of Hebrew ein cheqer (beyond investigation).',
          },
          {
            version: 'NLT',
            phrase: 'No one can measure the depths of his understanding',
            insight: 'Accessible spatial metaphor for younger and modern readers.',
          },
        ],
        dictionaryTermIds: ['covenant', 'logos'],
      },
      {
        verseNumber: 29,
        translations: {
          AKJV: 'He giveth power to the faint; and to them that have no might he increaseth strength.',
          AMP: 'He gives strength to the weary, and to him who has no might He increases power.',
          NASB: 'He gives strength to the weary, and to him who lacks might He increases power.',
          NIV: 'He gives strength to the weary and increases the power of the weak.',
          NLT: 'He gives power to the weak and strength to the powerless.',
        },
        nuanceCommentary:
          'Hebrew synonymous parallelism pairs koach (vital capacity/endurance) with otsmah (abundant dynamic might), assuring exhausted listeners that acknowledging weakness is the exact doorway to receiving strength.',
        keyHighlightDifference: [
          {
            version: 'AMP',
            phrase: 'to him who has no might He increases power',
            insight: 'Preserves the Hebrew idiom ein onim (one drained of all vigor).',
          },
        ],
        dictionaryTermIds: ['soul'],
      },
      {
        verseNumber: 30,
        translations: {
          AKJV: 'Even the youths shall faint and be weary, and the young men shall utterly fall:',
          AMP: 'Even youths shall faint and be weary, and [selected] young men shall feebly stumble and fall exhausted;',
          NASB: 'Though youths grow weary and tired, and vigorous young men stumble badly,',
          NIV: 'Even youths grow tired and weary, and young men stumble and fall;',
          NLT: 'Even youths will become weak and tired, and young men will fall in exhaustion.',
        },
        nuanceCommentary:
          'The Hebrew noun bachurim refers to the most elite, athletic young runners in the community—hence AMP’s “[selected] young men” and NASB’s “vigorous young men.” Even peak human stamina eventually hits a wall.',
        keyHighlightDifference: [
          {
            version: 'AMP',
            phrase: '[selected] young men shall feebly stumble',
            insight: 'Brings out the Hebrew root bachar (chosen/prime athletes).',
          },
        ],
        dictionaryTermIds: ['soul'],
      },
      {
        verseNumber: 31,
        translations: {
          AKJV: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
          AMP: 'But those who wait for the LORD [who expect, look for, and hope in Him] will gain new strength and renew their power; they will lift up their wings [and rise up close to God] like eagles [rising toward the sun]; they will run and not become weary, they will walk and not grow tired.',
          NASB: 'Yet those who wait for the LORD will gain new strength; they will mount up with wings like eagles, they will run and not get tired, they will walk and not become weary.',
          NIV: 'but those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
          NLT: 'But those who trust in the LORD will find new strength. They will soar high on wings like eagles. They will run and not grow weary. They will walk and not faint.',
        },
        nuanceCommentary:
          'Look at how the translations render qovei YHWH: AKJV/NASB say “wait upon/for,” NIV says “hope in,” NLT says “trust in,” and AMP combines all three. Furthermore, the verb yachaliphu literally means “exchange”—trading worn-out garments of fatigue for fresh strength.',
        keyHighlightDifference: [
          {
            version: 'AKJV',
            phrase: 'they that wait upon the LORD shall renew their strength',
            insight: 'Classic cadence of patient, braided expectation (qavah).',
          },
          {
            version: 'NIV',
            phrase: 'those who hope in the LORD will renew their strength',
            insight: 'Clarifies that biblical waiting is active, hopeful confidence.',
          },
          {
            version: 'AMP',
            phrase: 'wait for the LORD [who expect, look for, and hope in Him]',
            insight: 'Shows the full semantic range of the Hebrew participle qovei.',
          },
        ],
        dictionaryTermIds: ['shalom', 'chesed'],
      },
    ],
  },
];

const DEFAULT_RECENT_READS: RecentReadEntry[] = STUDY_PASSAGES.slice(
  0,
  MAX_RECENT_READS
).map((passage, idx) => ({
  passageId: passage.id,
  reference: passage.reference,
  title: passage.title,
  book: passage.book,
  testament: passage.testament,
  themeTag: passage.themeTag,
  estimatedReadTime: passage.estimatedReadTime,
  verseNumber: passage.verses[0].verseNumber,
  readingMode: 'parallel',
  activeTranslation: 'AMP',
  parallelTranslations: ['NASB', 'AMP', 'NLT'],
  visitedAtLabel: idx === 0 ? 'Active in Studio' : `Saved Study #${idx + 1}`,
  timestamp: 1700000000000 - idx * 60000,
}));

const CONCORDANCE_STUDIES: ConcordanceWordStudy[] = [
  {
    id: 'peace',
    englishWord: 'Peace',
    summaryTagline:
      'More than the absence of conflict: structural wholeness, restful security, and reconciled relationship.',
    totalBiblicalOccurrences: 429,
    hebrewRoot: {
      script: 'שָׁלוֹם',
      transliteration: 'Shalom',
      pronunciation: 'shah-LOHM',
      strongsRef: 'H7965',
      basicDefinition:
        'Completeness, soundness, welfare, wholeness, and covenantal harmony.',
      concreteMetaphor:
        'An intact stone wall with no missing blocks, or a paid-in-full restitution where nothing is owed or broken.',
    },
    greekRoot: {
      script: 'εἰρήνη',
      transliteration: 'Eirēnē',
      pronunciation: 'ay-RAY-nay',
      strongsRef: 'G1515',
      basicDefinition:
        'To join or bind together that which has been separated or fractured; quietness of heart.',
      concreteMetaphor:
        'Weaving severed threads back into a single seamless garment.',
    },
    crossThematicLinks: [
      {
        label: 'Shalom (Wholeness)',
        relationNote: 'Open Hebrew dictionary entry on holistic flourishing',
        targetDictionaryId: 'shalom',
      },
      {
        label: 'Rest & Stillness',
        relationNote: 'Explore quiet waters (Menuchah) & waiting on God',
        targetConcordanceId: 'rest',
      },
      {
        label: 'Covenant Mercy (Chesed)',
        relationNote: 'Explore the loyal love that secures true peace',
        targetConcordanceId: 'mercy',
      },
      {
        label: 'Reconciliation & Justice',
        relationNote: 'See how Mishpat restores community Shalom',
        targetDictionaryId: 'mishpat',
      },
    ],
    occurrences: [
      {
        reference: 'Numbers 6:26',
        testament: 'Old Testament',
        book: 'Numbers',
        bookGroup: 'Torah / Pentateuch',
        snippet:
          'The LORD lift up His countenance on you, and give you peace (shalom).',
        matchedWord: 'peace',
        rootUsed: 'Shalom (שָׁלוֹם)',
      },
      {
        reference: 'Psalm 23:2',
        testament: 'Old Testament',
        book: 'Psalms',
        bookGroup: 'Wisdom & Poetry',
        snippet:
          'He lets me rest in green meadows; he leads me beside peaceful (menuchot) streams.',
        matchedWord: 'peaceful',
        rootUsed: 'Menuchah / Shalom',
        linkedPassageId: 'psalm-23',
      },
      {
        reference: 'Isaiah 26:3',
        testament: 'Old Testament',
        book: 'Isaiah',
        bookGroup: 'Major Prophets',
        snippet:
          'The steadfast of mind You will keep in perfect peace (shalom shalom), because he trusts in You.',
        matchedWord: 'peace',
        rootUsed: 'Shalom Shalom (שָׁלוֹם שָׁלוֹם)',
      },
      {
        reference: 'John 14:27',
        testament: 'New Testament',
        book: 'John',
        bookGroup: 'Gospels',
        snippet:
          'Peace (eirēnē) I leave with you; My peace I give to you; not as the world gives do I give to you.',
        matchedWord: 'Peace',
        rootUsed: 'Eirēnē (εἰρήνη)',
      },
      {
        reference: 'Ephesians 2:14',
        testament: 'New Testament',
        book: 'Ephesians',
        bookGroup: 'Pauline Epistles',
        snippet:
          'For He Himself is our peace (eirēnē), who made both groups into one and broke down the barrier of the dividing wall.',
        matchedWord: 'peace',
        rootUsed: 'Eirēnē (εἰρήνη)',
      },
    ],
  },
  {
    id: 'light',
    englishWord: 'Light',
    summaryTagline:
      'God’s self-revealing truth, guidance in deep canyons, and unconquered life shining in darkness.',
    totalBiblicalOccurrences: 272,
    hebrewRoot: {
      script: 'אוֹר',
      transliteration: '’Or',
      pronunciation: 'OHR',
      strongsRef: 'H216',
      basicDefinition:
        'Daybreak illumination, lamp flame, life-giving clarity, and moral truth.',
      concreteMetaphor:
        'Dawn breaking over the eastern hills of Moab to scatter night predators and reveal the safe footpath.',
    },
    greekRoot: {
      script: 'φῶς',
      transliteration: 'Phōs',
      pronunciation: 'FOHS',
      strongsRef: 'G5457',
      basicDefinition:
        'Radiant illumination that exposes hidden realities and imparts spiritual life.',
      concreteMetaphor:
        'An olive-oil lamp placed on a household stand so everyone in the room can see clearly.',
    },
    crossThematicLinks: [
      {
        label: 'The Word (Logos)',
        relationNote: 'See how Life & Light flow from the eternal Logos in John 1',
        targetConcordanceId: 'word',
      },
      {
        label: 'Shadow of Death (Tsalmaveth)',
        relationNote:
          'Compare deep canyon darkness with the Shepherd’s presence',
        targetDictionaryId: 'sheol',
      },
      {
        label: 'Soul / Vitality (Nephesh)',
        relationNote: 'Explore how the Light of life restores the human soul',
        targetDictionaryId: 'soul',
      },
    ],
    occurrences: [
      {
        reference: 'Genesis 1:3',
        testament: 'Old Testament',
        book: 'Genesis',
        bookGroup: 'Torah / Pentateuch',
        snippet:
          'Then God said, “Let there be light (’or)”; and there was light.',
        matchedWord: 'light',
        rootUsed: '’Or (אוֹר)',
      },
      {
        reference: 'Psalm 119:105',
        testament: 'Old Testament',
        book: 'Psalms',
        bookGroup: 'Wisdom & Poetry',
        snippet:
          'Your word is a lamp to my feet and a light (’or) to my path.',
        matchedWord: 'light',
        rootUsed: '’Or (אוֹר)',
      },
      {
        reference: 'John 1:4–5',
        testament: 'New Testament',
        book: 'John',
        bookGroup: 'Gospels',
        snippet:
          'In Him was life, and the life was the Light (phōs) of men. The Light shines in the darkness, and the darkness did not comprehend it.',
        matchedWord: 'Light',
        rootUsed: 'Phōs (φῶς)',
        linkedPassageId: 'john-1',
      },
      {
        reference: '1 John 1:5',
        testament: 'New Testament',
        book: '1 John',
        bookGroup: 'General Epistles',
        snippet:
          'God is Light (phōs), and in Him there is no darkness at all.',
        matchedWord: 'Light',
        rootUsed: 'Phōs (φῶς)',
      },
    ],
  },
  {
    id: 'mercy',
    englishWord: 'Mercy & Lovingkindness',
    summaryTagline:
      'Fierce covenant loyalty (Chesed) and tender womb-like compassion (Rachamim) that never fail.',
    totalBiblicalOccurrences: 312,
    hebrewRoot: {
      script: 'חֶסֶד',
      transliteration: 'Chesed',
      pronunciation: 'KHEH-sed',
      strongsRef: 'H2617',
      basicDefinition:
        'Unfailing covenantal love, steadfast loyalty, mercy, and active kindness toward the vulnerable.',
      concreteMetaphor:
        'A kinsman-redeemer arriving in famine or exile who refuses to walk away from his pledge.',
    },
    greekRoot: {
      script: 'ἔλεος',
      transliteration: 'Eleos',
      pronunciation: 'EH-leh-os',
      strongsRef: 'G1656',
      basicDefinition:
        'Active compassion that binds up wounds and forgives debt.',
      concreteMetaphor:
        'Pouring healing oil and wine onto a wounded traveler on the Jericho road.',
    },
    crossThematicLinks: [
      {
        label: 'Chesed Dictionary Deep-Dive',
        relationNote: 'Inspect full cultural context of Hebrew Chesed',
        targetDictionaryId: 'chesed',
      },
      {
        label: 'Restorative Justice (Mishpat)',
        relationNote: 'Paired with Chesed in Micah 6:8',
        targetDictionaryId: 'mishpat',
      },
      {
        label: 'Covenant (Berith)',
        relationNote: 'The binding promise that anchors God’s mercy',
        targetDictionaryId: 'covenant',
      },
    ],
    occurrences: [
      {
        reference: 'Psalm 23:6',
        testament: 'Old Testament',
        book: 'Psalms',
        bookGroup: 'Wisdom & Poetry',
        snippet:
          'Surely goodness and lovingkindness / mercy (chesed) will follow me all the days of my life.',
        matchedWord: 'mercy',
        rootUsed: 'Chesed (חֶסֶד)',
        linkedPassageId: 'psalm-23',
      },
      {
        reference: 'Lamentations 3:22–23',
        testament: 'Old Testament',
        book: 'Lamentations',
        bookGroup: 'Major Prophets',
        snippet:
          'The LORD’S lovingkindnesses (chasadim) indeed never cease, for His compassions never fail. They are new every morning.',
        matchedWord: 'lovingkindnesses',
        rootUsed: 'Chasadim (חֲסָדִים)',
        linkedPassageId: 'lamentations-3',
      },
      {
        reference: 'Micah 6:8',
        testament: 'Old Testament',
        book: 'Micah',
        bookGroup: 'Minor Prophets',
        snippet:
          'What does the LORD require of you but to do justice, to love mercy / kindness (chesed), and to walk humbly with your God?',
        matchedWord: 'mercy',
        rootUsed: 'Chesed (חֶסֶד)',
        linkedPassageId: 'micah-6',
      },
      {
        reference: 'Luke 1:78',
        testament: 'New Testament',
        book: 'Luke',
        bookGroup: 'Gospels',
        snippet:
          'Because of the tender mercy (splanchna eleous) of our God, with which the Sunrise from on high will visit us.',
        matchedWord: 'mercy',
        rootUsed: 'Eleos (ἔλεος)',
      },
    ],
  },
  {
    id: 'shepherd',
    englishWord: 'Shepherd',
    summaryTagline:
      'From wilderness flock-guardian to the Good Shepherd who knows each sheep by name.',
    totalBiblicalOccurrences: 118,
    hebrewRoot: {
      script: 'רָעָה',
      transliteration: "Ra'ah",
      pronunciation: 'rah-AH',
      strongsRef: 'H7462',
      basicDefinition:
        'To pasture, tend, companion, feed, and defend a flock through wilderness terrain.',
      concreteMetaphor:
        'Walking ahead of the sheep through rocky wadis with club and staff in hand.',
    },
    greekRoot: {
      script: 'ποιμήν',
      transliteration: 'Poimēn',
      pronunciation: 'poy-MANE',
      strongsRef: 'G4166',
      basicDefinition:
        'A protector-guide who lays down his own life for the safety of the flock.',
      concreteMetaphor:
        'Sleeping across the stone opening of the sheepfold at night to act as the living door.',
    },
    crossThematicLinks: [
      {
        label: 'Shepherd Dictionary Artifact',
        relationNote: 'View Judean sling, rod & staff archaeological context',
        targetDictionaryId: 'shepherd',
      },
      {
        label: 'Peace & Quiet Waters',
        relationNote: 'Explore how the Shepherd leads to Shalom',
        targetConcordanceId: 'peace',
      },
    ],
    occurrences: [
      {
        reference: 'Psalm 23:1',
        testament: 'Old Testament',
        book: 'Psalms',
        bookGroup: 'Wisdom & Poetry',
        snippet: 'The LORD is my shepherd (ro‘i); I shall not want.',
        matchedWord: 'shepherd',
        rootUsed: "Ra'ah (רֹעִי)",
        linkedPassageId: 'psalm-23',
      },
      {
        reference: 'Isaiah 40:11',
        testament: 'Old Testament',
        book: 'Isaiah',
        bookGroup: 'Major Prophets',
        snippet:
          'Like a shepherd (ro‘eh) He will tend His flock, in His arm He will gather the lambs and carry them in His bosom.',
        matchedWord: 'shepherd',
        rootUsed: "Ra'ah (רֹעֶה)",
      },
      {
        reference: 'John 10:11',
        testament: 'New Testament',
        book: 'John',
        bookGroup: 'Gospels',
        snippet:
          'I am the good shepherd (poimēn ho kalos); the good shepherd lays down His life for the sheep.',
        matchedWord: 'shepherd',
        rootUsed: 'Poimēn (ποιμήν)',
      },
    ],
  },
  {
    id: 'word',
    englishWord: 'Word & Truth',
    summaryTagline:
      'Creative speech that brings worlds into being and embodies God’s personal character.',
    totalBiblicalOccurrences: 1450,
    hebrewRoot: {
      script: 'דָּבָר',
      transliteration: 'Dabar',
      pronunciation: 'dah-VAHR',
      strongsRef: 'H1697',
      basicDefinition:
        'Speech, utterance, event, or matter—in Hebrew, a spoken word is an active event that accomplishes its purpose.',
      concreteMetaphor:
        'A royal decree sent out by courier that actively builds or rescues what it announces.',
    },
    greekRoot: {
      script: 'λόγος',
      transliteration: 'Logos',
      pronunciation: 'LAH-gos',
      strongsRef: 'G3056',
      basicDefinition:
        'Divine self-expression, reason, message, and the incarnate Person of Christ.',
      concreteMetaphor:
        'An unspoken thought made audible and visible so another person can know your heart.',
    },
    crossThematicLinks: [
      {
        label: 'Logos Dictionary Entry',
        relationNote: 'Explore Jewish & Greek backgrounds of John 1:1',
        targetDictionaryId: 'logos',
      },
      {
        label: 'Light (’Or / Phōs)',
        relationNote: 'See how God’s Word brings unconquered Light',
        targetConcordanceId: 'light',
      },
    ],
    occurrences: [
      {
        reference: 'Isaiah 55:11',
        testament: 'Old Testament',
        book: 'Isaiah',
        bookGroup: 'Major Prophets',
        snippet:
          'So will My word (dabar) be which goes forth from My mouth; it will not return to Me empty.',
        matchedWord: 'word',
        rootUsed: 'Dabar (דָּבָר)',
      },
      {
        reference: 'John 1:1',
        testament: 'New Testament',
        book: 'John',
        bookGroup: 'Gospels',
        snippet:
          'In the beginning was the Word (Logos), and the Word was with God, and the Word was God.',
        matchedWord: 'Word',
        rootUsed: 'Logos (λόγος)',
        linkedPassageId: 'john-1',
      },
      {
        reference: 'Hebrews 4:12',
        testament: 'New Testament',
        book: 'Hebrews',
        bookGroup: 'General Epistles',
        snippet:
          'For the word (logos) of God is living and active and sharper than any two-edged sword.',
        matchedWord: 'word',
        rootUsed: 'Logos (λόγος)',
      },
    ],
  },
  {
    id: 'rest',
    englishWord: 'Rest & Wait',
    summaryTagline:
      'Quiet trust beside still waters and braided hope that refuses panic in the dark.',
    totalBiblicalOccurrences: 164,
    hebrewRoot: {
      script: 'מְנוּחָה / קָוָה',
      transliteration: 'Menuchah / Qavah',
      pronunciation: 'meh-noo-KHAH / kah-VAH',
      strongsRef: 'H4496 / H6960',
      basicDefinition:
        'Resting place, quietness of spirit (Menuchah), and braided, expectant waiting (Qavah).',
      concreteMetaphor:
        'Twisting individual flax strands into a strong rope that holds under heavy weight.',
    },
    greekRoot: {
      script: 'ἀνάπαυσις',
      transliteration: 'Anapausis',
      pronunciation: 'an-AH-pow-sis',
      strongsRef: 'G372',
      basicDefinition:
        'Deep inner refreshment, cessation from crushing toil, and restoration of spirit.',
      concreteMetaphor:
        'Unbuckling a heavy wooden ox-yoke at the end of a hot harvest day.',
    },
    crossThematicLinks: [
      {
        label: 'Peace (Shalom)',
        relationNote: 'Explore how quiet rest anchors complete Shalom',
        targetConcordanceId: 'peace',
      },
      {
        label: 'Soul / Vitality (Nephesh)',
        relationNote: 'See how rest restores the parched Nephesh',
        targetDictionaryId: 'soul',
      },
    ],
    occurrences: [
      {
        reference: 'Psalm 23:2',
        testament: 'Old Testament',
        book: 'Psalms',
        bookGroup: 'Wisdom & Poetry',
        snippet:
          'He makes me lie down in green pastures; He leads me beside quiet / restful (menuchot) waters.',
        matchedWord: 'restful',
        rootUsed: 'Menuchah (מְנֻחוֹת)',
        linkedPassageId: 'psalm-23',
      },
      {
        reference: 'Lamentations 3:25–26',
        testament: 'Old Testament',
        book: 'Lamentations',
        bookGroup: 'Major Prophets',
        snippet:
          'The LORD is good to those who wait (qavah) for Him... It is good that he waits silently for the salvation of the LORD.',
        matchedWord: 'wait',
        rootUsed: 'Qavah (קָוָה)',
        linkedPassageId: 'lamentations-3',
      },
      {
        reference: 'Matthew 11:28',
        testament: 'New Testament',
        book: 'Matthew',
        bookGroup: 'Gospels',
        snippet:
          'Come to Me, all who are weary and heavy-laden, and I will give you rest (anapausis).',
        matchedWord: 'rest',
        rootUsed: 'Anapausis (ἀνάπαυσις)',
      },
    ],
  },
];

export interface HoveredPeekInstance {
  keyId: string;
  termId: string;
  matchedPhrase: string;
}

export interface BibleStudyReadingStudioProps {
  onEngageContent?: (points: number, label: string) => void;
  isNightSanctuary?: boolean;
  selectedPassageIdExternal?: string | null;
}

export default function BibleStudyReadingStudio({
  onEngageContent,
  isNightSanctuary = false,
  selectedPassageIdExternal,
}: BibleStudyReadingStudioProps) {
  // Reading Mode: Single Focus Mode vs. Parallel Studio Mode
  const [readingMode, setReadingMode] = useState<'parallel' | 'single'>('parallel');
  const [isFullPageReaderOpen, setIsFullPageReaderOpen] = useState<boolean>(false);
  const [fullPageCustomChapterId, setFullPageCustomChapterId] = useState<string | null>(null);
  const [chaptersReadMap, setChaptersReadMap] = useState<Record<string, boolean>>({
    'genesis-1': true,
    'psalms-1': true,
    'psalms-23': true,
    'john-1': true,
  });

  // Selected Passage
  const [selectedPassageId, setSelectedPassageId] = useState<string>('psalm-23');

  // Active Parallel Versions (up to 3 in Parallel Studio Mode)
  const [selectedVersions, setSelectedVersions] = useState<BibleVersionId[]>([
    'NASB',
    'AMP',
    'NLT',
  ]);

  // Single Focus Version
  const [singleFocusVersion, setSingleFocusVersion] =
    useState<BibleVersionId>('AMP');

  // Mobile active version tab (for swipe/tabbed card stack on small screens)
  const [mobileActiveVersion, setMobileActiveVersion] =
    useState<BibleVersionId>('AMP');

  // Active Highlighted Verse Number (Synchronized across all parallel versions)
  const [highlightedVerse, setHighlightedVerse] = useState<number>(4);

  // Synchronize when external trigger (e.g. DailyScripturePulse) requests a specific passage
  const lastAppliedExternalIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (
      selectedPassageIdExternal &&
      selectedPassageIdExternal !== lastAppliedExternalIdRef.current &&
      STUDY_PASSAGES.some((p) => p.id === selectedPassageIdExternal)
    ) {
      lastAppliedExternalIdRef.current = selectedPassageIdExternal;
      const matched = STUDY_PASSAGES.find(
        (p) => p.id === selectedPassageIdExternal
      );
      const timer = setTimeout(() => {
        setSelectedPassageId(selectedPassageIdExternal);
        if (matched) {
          setHighlightedVerse(matched.verses[0].verseNumber);
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedPassageIdExternal]);

  // Automated 'Last Read' Bookmark State (Persisted to & Restored from localStorage)
  const [hasRestoredBookmark, setHasRestoredBookmark] =
    useState<boolean>(false);
  const [lastReadBookmark, setLastReadBookmark] =
    useState<LastReadBookmarkState>({
      passageId: 'psalm-23',
      passageReference: 'Psalm 23:4',
      verseNumber: 4,
      readingMode: 'parallel',
      activeTranslation: 'AMP',
      parallelTranslations: ['NASB', 'AMP', 'NLT'],
      updatedAtLabel: 'Synced in session',
    });
  const [bookmarkPulse, setBookmarkPulse] = useState<boolean>(false);

  // 'Recent Reads' Side Drawer State (Persists last 5 passages visited across sessions in localStorage)
  const [recentReads, setRecentReads] =
    useState<RecentReadEntry[]>(DEFAULT_RECENT_READS);
  const [isRecentReadsDrawerOpen, setIsRecentReadsDrawerOpen] =
    useState<boolean>(false);
  const recentReadsDrawerRef = useFocusTrap<HTMLDivElement>(
    isRecentReadsDrawerOpen,
    () => setIsRecentReadsDrawerOpen(false)
  );

  // Hover-to-Peek Micro-Tooltip State for Inline Dictionary Terms
  const [hoveredPeek, setHoveredPeek] = useState<HoveredPeekInstance | null>(
    null
  );

  // Scroll-Lock Synchronization for Parallel Columns
  const [isScrollLocked, setIsScrollLocked] = useState<boolean>(true);
  const columnRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isSyncingScrollRef = useRef<boolean>(false);

  // Distraction-Free Typography Controls
  const [fontSizeStep, setFontSizeStep] = useState<
    'compact' | 'comfort' | 'editorial' | 'sanctuary'
  >('comfort');
  const [lineSpacingStep, setLineSpacingStep] = useState<
    'snug' | 'relaxed' | 'contemplative'
  >('relaxed');
  const [showTypographyControls, setShowTypographyControls] =
    useState<boolean>(false);

  // Interactive Tap-to-Define Bible Dictionary Bottom Sheet State
  const [activeDictionaryEntryId, setActiveDictionaryEntryId] = useState<
    string | null
  >(null);

  // Curated Concordance State
  const [isConcordanceOpen, setIsConcordanceOpen] = useState<boolean>(true);
  const [concordanceSearchQuery, setConcordanceSearchQuery] =
    useState<string>('');
  const [activeConcordanceId, setActiveConcordanceId] =
    useState<string>('peace');
  const [isRootPeekExpanded, setIsRootPeekExpanded] = useState<boolean>(true);
  const [testamentFilter, setTestamentFilter] = useState<
    'all' | 'Old Testament' | 'New Testament'
  >('all');

  const concordanceSectionRef = useRef<HTMLDivElement | null>(null);

  // 1. Restore 'Last Read' Bookmark & 'Recent Reads' (last 5 passages) from localStorage on initial client mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const restoreTimer = setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(LAST_READ_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<LastReadBookmarkState>;
          const validPassage = STUDY_PASSAGES.find(
            (p) => p.id === parsed.passageId
          );
          if (validPassage) {
            setSelectedPassageId(validPassage.id);
            const validVerse = validPassage.verses.some(
              (v) => v.verseNumber === parsed.verseNumber
            )
              ? parsed.verseNumber!
              : validPassage.verses[0].verseNumber;
            setHighlightedVerse(validVerse);

            if (
              parsed.readingMode === 'single' ||
              parsed.readingMode === 'parallel'
            ) {
              setReadingMode(parsed.readingMode);
            }
            if (
              parsed.activeTranslation &&
              BIBLE_VERSIONS.some((v) => v.id === parsed.activeTranslation)
            ) {
              setSingleFocusVersion(parsed.activeTranslation);
              setMobileActiveVersion(parsed.activeTranslation);
            }
            if (
              Array.isArray(parsed.parallelTranslations) &&
              parsed.parallelTranslations.length > 0
            ) {
              const validParallel = parsed.parallelTranslations.filter((id) =>
                BIBLE_VERSIONS.some((v) => v.id === id)
              );
              if (validParallel.length > 0) {
                setSelectedVersions(validParallel.slice(0, 3));
              }
            }
          }
        }

        // Restore persisted last 5 Recent Reads
        const rawRecent = window.localStorage.getItem(RECENT_READS_STORAGE_KEY);
        if (rawRecent) {
          const parsedRecent = JSON.parse(rawRecent);
          if (Array.isArray(parsedRecent) && parsedRecent.length > 0) {
            const validRecent: RecentReadEntry[] = parsedRecent
              .filter(
                (item: Partial<RecentReadEntry>) =>
                  item &&
                  typeof item.passageId === 'string' &&
                  STUDY_PASSAGES.some((p) => p.id === item.passageId)
              )
              .slice(0, MAX_RECENT_READS)
              .map((item: Partial<RecentReadEntry>, index: number) => {
                const matchedPassage = STUDY_PASSAGES.find(
                  (p) => p.id === item.passageId
                )!;
                const validVerse = matchedPassage.verses.some(
                  (v) => v.verseNumber === item.verseNumber
                )
                  ? item.verseNumber!
                  : matchedPassage.verses[0].verseNumber;
                const validTrans: BibleVersionId =
                  item.activeTranslation &&
                  BIBLE_VERSIONS.some((v) => v.id === item.activeTranslation)
                    ? item.activeTranslation
                    : 'AMP';
                const validParallel: BibleVersionId[] = Array.isArray(
                  item.parallelTranslations
                )
                  ? item.parallelTranslations.filter(
                      (id): id is BibleVersionId =>
                        BIBLE_VERSIONS.some((v) => v.id === id)
                    )
                  : ['NASB', 'AMP', 'NLT'];

                const fallbackParallel: BibleVersionId[] = [
                  'NASB',
                  'AMP',
                  'NLT',
                ];

                return {
                  passageId: matchedPassage.id,
                  reference: matchedPassage.reference,
                  title: matchedPassage.title,
                  book: matchedPassage.book,
                  testament: matchedPassage.testament,
                  themeTag: matchedPassage.themeTag,
                  estimatedReadTime: matchedPassage.estimatedReadTime,
                  verseNumber: validVerse,
                  readingMode:
                    item.readingMode === 'single' ? 'single' : 'parallel',
                  activeTranslation: validTrans,
                  parallelTranslations:
                    validParallel.length > 0
                      ? validParallel.slice(0, 3)
                      : fallbackParallel,
                  visitedAtLabel:
                    item.visitedAtLabel ||
                    (index === 0 ? 'Most Recent Session' : 'Saved in History'),
                  timestamp:
                    typeof item.timestamp === 'number'
                      ? item.timestamp
                      : Date.now() - index * 60000,
                };
              });

            if (validRecent.length > 0) {
              setRecentReads(validRecent);
            }
          }
        }

        const rawChaptersRead = window.localStorage.getItem(
          CHAPTERS_READ_STORAGE_KEY
        );
        if (rawChaptersRead) {
          const parsedRead = JSON.parse(rawChaptersRead);
          if (parsedRead && typeof parsedRead === 'object') {
            setChaptersReadMap(parsedRead);
          }
        }
      } catch {
        // Ignore storage read errors in restricted environments
      } finally {
        setHasRestoredBookmark(true);
      }
    }, 0);

    return () => clearTimeout(restoreTimer);
  }, []);

  const currentPassage = useMemo(
    () =>
      STUDY_PASSAGES.find((p) => p.id === selectedPassageId) ||
      STUDY_PASSAGES[0],
    [selectedPassageId]
  );

  // 2. Automatically save 'Last Read' Bookmark AND update 'Recent Reads' (last 5 passages) in localStorage
  useEffect(() => {
    if (!hasRestoredBookmark || typeof window === 'undefined') return;

    const bookPrefix = currentPassage.reference.split(':')[0];
    const activeTrans: BibleVersionId =
      readingMode === 'single'
        ? singleFocusVersion
        : mobileActiveVersion && selectedVersions.includes(mobileActiveVersion)
        ? mobileActiveVersion
        : selectedVersions[0] || 'AMP';

    const nextBookmark: LastReadBookmarkState = {
      passageId: currentPassage.id,
      passageReference: `${bookPrefix}:${highlightedVerse}`,
      verseNumber: highlightedVerse,
      readingMode,
      activeTranslation: activeTrans,
      parallelTranslations: selectedVersions,
      updatedAtLabel: 'Auto-saved to localStorage',
    };

    const now = Date.now();
    const timeFormatted = new Date(now).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const saveTimer = setTimeout(() => {
      setLastReadBookmark(nextBookmark);
      setBookmarkPulse(true);
      try {
        window.localStorage.setItem(
          LAST_READ_STORAGE_KEY,
          JSON.stringify(nextBookmark)
        );
      } catch {
        // Ignore write errors
      }

      setRecentReads((prev) => {
        const updatedEntry: RecentReadEntry = {
          passageId: currentPassage.id,
          reference: currentPassage.reference,
          title: currentPassage.title,
          book: currentPassage.book,
          testament: currentPassage.testament,
          themeTag: currentPassage.themeTag,
          estimatedReadTime: currentPassage.estimatedReadTime,
          verseNumber: highlightedVerse,
          readingMode,
          activeTranslation: activeTrans,
          parallelTranslations: selectedVersions,
          visitedAtLabel: `Visited ${timeFormatted}`,
          timestamp: now,
        };

        const filteredOthers = prev.filter(
          (item) => item.passageId !== currentPassage.id
        );
        const nextList = [updatedEntry, ...filteredOthers].slice(
          0,
          MAX_RECENT_READS
        );

        try {
          window.localStorage.setItem(
            RECENT_READS_STORAGE_KEY,
            JSON.stringify(nextList)
          );
        } catch {
          // Ignore write errors
        }

        return nextList;
      });
    }, 0);

    const pulseReset = setTimeout(() => setBookmarkPulse(false), 900);

    return () => {
      clearTimeout(saveTimer);
      clearTimeout(pulseReset);
    };
  }, [
    hasRestoredBookmark,
    currentPassage.id,
    currentPassage.reference,
    currentPassage.title,
    currentPassage.book,
    currentPassage.testament,
    currentPassage.themeTag,
    currentPassage.estimatedReadTime,
    highlightedVerse,
    readingMode,
    singleFocusVersion,
    mobileActiveVersion,
    selectedVersions,
  ]);

  const activeVerseData = useMemo(
    () =>
      currentPassage.verses.find((v) => v.verseNumber === highlightedVerse) ||
      currentPassage.verses[0],
    [currentPassage, highlightedVerse]
  );

  const activeDictionaryEntry = activeDictionaryEntryId
    ? DICTIONARY_ENTRIES[activeDictionaryEntryId] || null
    : null;

  const activeConcordanceStudy = useMemo(() => {
    if (concordanceSearchQuery.trim()) {
      const q = concordanceSearchQuery.trim().toLowerCase();
      const matched = CONCORDANCE_STUDIES.find(
        (study) =>
          study.englishWord.toLowerCase().includes(q) ||
          study.hebrewRoot.transliteration.toLowerCase().includes(q) ||
          study.greekRoot.transliteration.toLowerCase().includes(q) ||
          study.summaryTagline.toLowerCase().includes(q) ||
          study.occurrences.some((occ) => occ.snippet.toLowerCase().includes(q))
      );
      if (matched) return matched;
    }
    return (
      CONCORDANCE_STUDIES.find((s) => s.id === activeConcordanceId) ||
      CONCORDANCE_STUDIES[0]
    );
  }, [concordanceSearchQuery, activeConcordanceId]);

  const filteredOccurrences = useMemo(() => {
    return activeConcordanceStudy.occurrences.filter((occ) =>
      testamentFilter === 'all' ? true : occ.testament === testamentFilter
    );
  }, [activeConcordanceStudy, testamentFilter]);

  const groupedOccurrencesByTestament = useMemo(() => {
    const groups: Record<
      'Old Testament' | 'New Testament',
      ConcordanceOccurrence[]
    > = {
      'Old Testament': [],
      'New Testament': [],
    };
    filteredOccurrences.forEach((occ) => {
      groups[occ.testament].push(occ);
    });
    return groups;
  }, [filteredOccurrences]);

  // Toggle a Bible version in Parallel Studio Mode (up to 3 versions simultaneously)
  const handleToggleParallelVersion = (versionId: BibleVersionId) => {
    if (readingMode === 'single') {
      setSingleFocusVersion(versionId);
      setMobileActiveVersion(versionId);
      onEngageContent?.(5, `Switched Single Focus Reading to ${versionId}`);
      return;
    }

    setSelectedVersions((prev) => {
      if (prev.includes(versionId)) {
        if (prev.length <= 1) return prev; // Keep at least 1 version active
        const updated = prev.filter((id) => id !== versionId);
        if (mobileActiveVersion === versionId) {
          setMobileActiveVersion(updated[0]);
        }
        return updated;
      } else {
        const updated =
          prev.length >= 3
            ? [...prev.slice(1), versionId]
            : [...prev, versionId];
        setMobileActiveVersion(versionId);
        onEngageContent?.(
          5,
          `Added ${versionId} to Parallel Reading Comparison`
        );
        return updated;
      }
    });
  };

  const handleApplyAudiencePreset = (
    presetName: string,
    versions: BibleVersionId[]
  ) => {
    setReadingMode('parallel');
    setSelectedVersions(versions);
    setMobileActiveVersion(versions[0]);
    onEngageContent?.(10, `Applied ${presetName} Parallel Preset`);
  };

  // Synchronized Scroll Handler for Parallel Studio Columns
  const handleColumnScroll = (sourceVersionId: string) => {
    if (!isScrollLocked || isSyncingScrollRef.current) return;
    const sourceEl = columnRefs.current[sourceVersionId];
    if (!sourceEl) return;

    isSyncingScrollRef.current = true;
    const targetScrollTop = sourceEl.scrollTop;

    selectedVersions.forEach((verId) => {
      if (verId !== sourceVersionId) {
        const el = columnRefs.current[verId];
        if (el) {
          el.scrollTop = targetScrollTop;
        }
      }
    });

    requestAnimationFrame(() => {
      isSyncingScrollRef.current = false;
    });
  };

  const handleOpenDictionaryTerm = (termId: string) => {
    const entry = DICTIONARY_ENTRIES[termId];
    if (!entry) return;
    setHoveredPeek(null);
    setActiveDictionaryEntryId(termId);
    onEngageContent?.(10, `Explored Bible Dictionary: ${entry.term}`);
  };

  const handleSelectConcordanceWord = (studyId: string) => {
    setActiveConcordanceId(studyId);
    setConcordanceSearchQuery('');
    setIsConcordanceOpen(true);
    const study = CONCORDANCE_STUDIES.find((s) => s.id === studyId);
    if (study) {
      onEngageContent?.(
        10,
        `Searched Curated Concordance: "${study.englishWord}" (${study.hebrewRoot.transliteration} / ${study.greekRoot.transliteration})`
      );
    }
  };

  const handleJumpToConcordanceHub = () => {
    setIsConcordanceOpen(true);
    concordanceSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
    onEngageContent?.(5, 'Opened Curated Concordance Hub');
  };

  const handleRestoreLastReadBookmark = () => {
    setSelectedPassageId(lastReadBookmark.passageId);
    setHighlightedVerse(lastReadBookmark.verseNumber);
    setReadingMode(lastReadBookmark.readingMode);
    setSingleFocusVersion(lastReadBookmark.activeTranslation);
    setMobileActiveVersion(lastReadBookmark.activeTranslation);
    if (lastReadBookmark.parallelTranslations.length > 0) {
      setSelectedVersions(lastReadBookmark.parallelTranslations);
    }
    onEngageContent?.(
      5,
      `Restored Last Read Bookmark (${lastReadBookmark.passageReference} · ${lastReadBookmark.activeTranslation})`
    );
  };

  const handleSelectRecentReadEntry = (entry: RecentReadEntry) => {
    setSelectedPassageId(entry.passageId);
    setHighlightedVerse(entry.verseNumber);
    setReadingMode(entry.readingMode);
    setSingleFocusVersion(entry.activeTranslation);
    setMobileActiveVersion(entry.activeTranslation);
    if (entry.parallelTranslations.length > 0) {
      setSelectedVersions(entry.parallelTranslations);
    }
    setIsRecentReadsDrawerOpen(false);
    onEngageContent?.(
      10,
      `Jumped to Recent Read: ${entry.reference} (v.${entry.verseNumber} · ${entry.activeTranslation})`
    );
  };

  const handleResetRecentReads = () => {
    setRecentReads(DEFAULT_RECENT_READS);
    try {
      window.localStorage.setItem(
        RECENT_READS_STORAGE_KEY,
        JSON.stringify(DEFAULT_RECENT_READS)
      );
    } catch {
      // Ignore write errors
    }
    onEngageContent?.(5, 'Reset Recent Reads History to Curated 5 Passages');
  };

  // Typography CSS utility classes based on user controls
  const fontSizeClass =
    fontSizeStep === 'compact'
      ? 'text-[14.5px]'
      : fontSizeStep === 'comfort'
      ? 'text-[16px]'
      : fontSizeStep === 'editorial'
      ? 'text-[18px]'
      : 'text-[20px]';

  const lineSpacingClass =
    lineSpacingStep === 'snug'
      ? 'leading-snug'
      : lineSpacingStep === 'relaxed'
      ? 'leading-relaxed'
      : 'leading-[1.95]';

  // Helper to render verse text with interactive Hover-to-Peek Micro-Tooltip & Tap-to-Define Dictionary Bottom Sheet
  const renderVerseWithDictionaryLinks = (
    text: string,
    verseDictTermIds: string[],
    contextKeyPrefix: string
  ) => {
    if (!verseDictTermIds || verseDictTermIds.length === 0) {
      return <span>{text}</span>;
    }

    const triggers: {phrase: string; termId: string}[] = [];
    verseDictTermIds.forEach((termId) => {
      const entry = DICTIONARY_ENTRIES[termId];
      if (entry) {
        entry.triggerWords.forEach((word) => {
          triggers.push({phrase: word, termId});
        });
      }
    });

    triggers.sort((a, b) => b.phrase.length - a.phrase.length);

    if (triggers.length === 0) return <span>{text}</span>;

    const escapedPhrases = triggers.map((t) =>
      t.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );
    const pattern = new RegExp(`\\b(${escapedPhrases.join('|')})\\b`, 'gi');

    const parts = text.split(pattern);

    return (
      <>
        {parts.map((part, idx) => {
          const matchedTrigger = triggers.find(
            (t) => t.phrase.toLowerCase() === part.toLowerCase()
          );
          if (matchedTrigger) {
            const entry = DICTIONARY_ENTRIES[matchedTrigger.termId];
            if (!entry) return <React.Fragment key={idx}>{part}</React.Fragment>;

            const instanceKey = `${contextKeyPrefix}-part-${idx}`;
            const isPeekOpen = hoveredPeek?.keyId === instanceKey;

            return (
              <span
                key={idx}
                className="relative inline-block"
                onMouseEnter={() =>
                  setHoveredPeek({
                    keyId: instanceKey,
                    termId: entry.id,
                    matchedPhrase: part,
                  })
                }
                onMouseLeave={() =>
                  setHoveredPeek((prev) =>
                    prev?.keyId === instanceKey ? null : prev
                  )
                }
              >
                <button
                  type="button"
                  onFocus={() =>
                    setHoveredPeek({
                      keyId: instanceKey,
                      termId: entry.id,
                      matchedPhrase: part,
                    })
                  }
                  onBlur={() =>
                    setHoveredPeek((prev) =>
                      prev?.keyId === instanceKey ? null : prev
                    )
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDictionaryTerm(entry.id);
                  }}
                  aria-describedby={isPeekOpen ? `peek-${instanceKey}` : undefined}
                  className="inline font-medium text-[#1A1A1A] underline decoration-[#D97706] decoration-dotted decoration-2 underline-offset-4 hover:bg-[#D97706]/20 hover:text-[#92400E] px-0.5 rounded transition-colors cursor-pointer"
                >
                  {part}
                </button>

                {/* Hover-to-Peek One-Sentence Micro-Tooltip */}
                <AnimatePresence>
                  {isPeekOpen && (
                    <motion.div
                      id={`peek-${instanceKey}`}
                      role="tooltip"
                      initial={{opacity: 0, y: 6, scale: 0.96}}
                      animate={{opacity: 1, y: 0, scale: 1}}
                      exit={{opacity: 0, y: 4, scale: 0.96}}
                      transition={{duration: 0.16, ease: [0.16, 1, 0.3, 1]}}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 sm:w-72 p-3 rounded-xl bg-[#1A1A1A] text-[#F9F6F0] border border-[#D97706]/80 shadow-xl z-40 pointer-events-none text-left space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-[#292524] pb-1">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#FBBF24] font-semibold truncate">
                          {entry.term}
                        </span>
                        <span className="font-serif text-xs text-[#D97706] shrink-0">
                          {entry.originalScript} ({entry.transliteration})
                        </span>
                      </div>
                      <p className="text-[11.5px] text-[#E7E5E4] leading-snug font-sans font-normal">
                        {entry.oneSentencePeek}
                      </p>
                      <div className="text-[10px] font-mono text-[#D97706] flex items-center justify-between pt-0.5">
                        <span>Hover-to-Peek</span>
                        <span>Tap for full Dictionary →</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>
            );
          }
          return <React.Fragment key={idx}>{part}</React.Fragment>;
        })}
      </>
    );
  };

  return (
    <section
      id="bible-study-studio"
      className="w-full max-w-full min-w-0 overflow-x-clip py-16 sm:py-20 lg:py-28 border-b border-[#E5DEC9] bg-[#F9F6F0]"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10 min-w-0">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 min-w-0">
          <div className="max-w-3xl space-y-4 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#4A5D4E]">
              <span>The Bible Study &amp; Reading Studio</span>
              <span aria-hidden="true">·</span>
              <span>Parallel Engine · Descriptive Dictionary · Concordance</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#1A1A1A]"
              style={{
                fontFamily: 'var(--font-display), serif',
                textWrap: 'balance',
              }}
            >
              Nuance by contrast. Scholarly depth meets effortless clarity.
            </h2>
            <p className="text-sm sm:text-base text-[#44403C] leading-relaxed">
              Compare traditional &amp; scholarly translations (
              <strong className="font-semibold text-[#1A1A1A]">
                AKJV, AMP, NASB
              </strong>
              ) alongside accessible, modern narrative clarity (
              <strong className="font-semibold text-[#1A1A1A]">NIV, NLT</strong>
              ). Hover over any underlined term (like{' '}
              <em className="font-serif">Covenant</em> or{' '}
              <em className="font-serif">Sheol</em>) for a{' '}
              <strong className="font-semibold text-[#1A1A1A]">
                hover-to-peek micro-tooltip
              </strong>
              , tap to slide up the full{' '}
              <strong className="font-semibold text-[#1A1A1A]">
                Descriptive Bible Dictionary
              </strong>
              , or explore Hebrew &amp; Greek roots in the{' '}
              <strong className="font-semibold text-[#1A1A1A]">
                Curated Concordance
              </strong>
              .
            </p>
          </div>

          {/* Seamless Top Toggle: Single Focus Mode vs. Parallel Studio Mode */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-end shrink-0">
            <div
              role="group"
              aria-label="Reading Mode Switcher"
              className="inline-flex items-center p-1 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9]"
            >
              <button
                type="button"
                onClick={() => {
                  setReadingMode('single');
                  onEngageContent?.(5, 'Switched to Single Focus Reading Mode');
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  readingMode === 'single'
                    ? 'bg-[#1A1A1A] text-[#F9F6F0] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1A1A1A]'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Single Focus Mode</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setReadingMode('parallel');
                  onEngageContent?.(5, 'Switched to Parallel Studio Mode');
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  readingMode === 'parallel'
                    ? 'bg-[#1A1A1A] text-[#F9F6F0] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1A1A1A]'
                }`}
              >
                <Columns3 className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Parallel Studio ({selectedVersions.length}/3)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsFullPageReaderOpen(true);
                  onEngageContent?.(
                    15,
                    `Opened Full-Page Bible Reader (${currentPassage.reference})`
                  );
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#D97706] hover:bg-[#B45309] text-[#1A1A1A] shadow-xs transition-all cursor-pointer ml-1"
                title="Expand into Full-Page Bible Reading Form with AKJV, AMP, NASB, NIV & NLT"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#1A1A1A]" />
                <span>Full-Page Reader</span>
              </button>
            </div>

            <Link
              href={`/bible-reader?chapter=${selectedPassageId}&version=${
                readingMode === 'single'
                  ? singleFocusVersion
                  : selectedVersions[0] || 'AMP'
              }`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#D97706]/50 text-xs font-semibold text-[#92400E] transition-colors cursor-pointer"
              title="Open Dedicated Full-Page Bible Sanctuary Route"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Dedicated Full Page</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D97706]" />
            </Link>

            {/* Recent Reads Side Drawer Trigger Button */}
            <StudyTooltip
              category="SESSION CONTINUITY"
              label="Recent Reads Side Drawer (Last 5 Passages)"
              description="Persists the last 5 Bible passages you visited across browser sessions in localStorage so you can jump straight back into your study workflow."
              hint="Click to open your 5-passage study history"
              position="bottom"
              align="end"
            >
              <button
                type="button"
                onClick={() => setIsRecentReadsDrawerOpen(true)}
                aria-expanded={isRecentReadsDrawerOpen}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#292524] text-[#F9F6F0] border border-[#D97706]/60 text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <History className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Recent Reads</span>
                <span className="font-mono text-[10.5px] px-1.5 py-0.5 rounded bg-[#D97706] text-[#1A1A1A] font-bold">
                  {recentReads.length}/{MAX_RECENT_READS}
                </span>
              </button>
            </StudyTooltip>

            {/* Quick Concordance Hub Search Trigger Button in Toolbar */}
            <button
              type="button"
              onClick={handleJumpToConcordanceHub}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#F2ECE1] hover:bg-[#E5DEC9]/70 border border-[#E5DEC9] text-xs font-semibold text-[#1A1A1A] transition-colors cursor-pointer"
              title="Open Curated Concordance & Original Root Search"
            >
              <Search className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Concordance</span>
            </button>

            {/* Distraction-Free Typography Controls Toggle */}
            <button
              type="button"
              onClick={() => setShowTypographyControls((prev) => !prev)}
              aria-expanded={showTypographyControls}
              className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                showTypographyControls
                  ? 'bg-[#1A1A1A] text-[#F9F6F0] border-[#1A1A1A]'
                  : 'bg-[#F2ECE1] hover:bg-[#E5DEC9]/70 text-[#1A1A1A] border-[#E5DEC9]'
              }`}
              title="Customize Font Size & Line Spacing"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Aa Layout</span>
            </button>
          </div>
        </div>

        {/* AUTOMATED 'LAST READ' BOOKMARK BAR (localStorage Session Persistence) */}
        <div className="p-3.5 sm:px-5 rounded-2xl bg-[#F2ECE1] border border-[#D97706]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <motion.div
              animate={
                bookmarkPulse ? {scale: [1, 1.18, 1]} : {scale: 1}
              }
              transition={{duration: 0.35}}
              className="w-7 h-7 rounded-lg bg-[#1A1A1A] text-[#FBBF24] flex items-center justify-center shrink-0"
            >
              <BookmarkCheck className="w-4 h-4 text-[#D97706]" />
            </motion.div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#92400E]">
                  Automated ‘Last Read’ Bookmark
                </span>
                <span className="font-mono text-[10.5px] px-2 py-0.5 rounded bg-[#F9F6F0] border border-[#E5DEC9] text-[#4A5D4E]">
                  {lastReadBookmark.updatedAtLabel}
                </span>
              </div>
              <div className="text-xs text-[#1A1A1A] mt-0.5">
                Active Session Bookmark:{' '}
                <strong className="font-semibold">
                  {lastReadBookmark.passageReference}
                </strong>{' '}
                ·{' '}
                {lastReadBookmark.readingMode === 'single' ? (
                  <span>
                    Single Focus (
                    <strong className="font-mono">
                      {lastReadBookmark.activeTranslation}
                    </strong>
                    )
                  </span>
                ) : (
                  <span>
                    Parallel (
                    <strong className="font-mono">
                      {lastReadBookmark.parallelTranslations.join(' · ')}
                    </strong>{' '}
                    — Focus:{' '}
                    <strong className="font-mono">
                      {lastReadBookmark.activeTranslation}
                    </strong>
                    )
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-center shrink-0">
            <button
              type="button"
              onClick={() => setIsRecentReadsDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F9F6F0] hover:bg-[#E5DEC9] border border-[#D97706]/50 text-[#1A1A1A] text-xs font-semibold transition-colors cursor-pointer"
            >
              <History className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Recent Reads ({recentReads.length}/5)</span>
            </button>

            <button
              type="button"
              onClick={handleRestoreLastReadBookmark}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#292524] text-[#F9F6F0] text-xs font-semibold transition-colors cursor-pointer"
              title="Restore exact saved verse and translation state from localStorage"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#D97706]" />
              <span>
                Resume {lastReadBookmark.passageReference} (
                {lastReadBookmark.activeTranslation})
              </span>
            </button>
          </div>
        </div>

        {/* SUBTLE 'CHAPTERS READ' COUNTER & LARGER BIBLICAL BOOKS PROGRESS TRACKER */}
        {(() => {
          const currentCanonBook =
            BIBLE_CANON_BOOKS.find(
              (b) =>
                b.name.toLowerCase() === currentPassage.book.toLowerCase() ||
                (b.id === 'psalms' &&
                  currentPassage.book.toLowerCase() === 'psalms')
            ) || BIBLE_CANON_BOOKS[18];

          const chapterMatch = currentPassage.reference.match(/\s(\d+)/);
          const currentChapterNum = chapterMatch
            ? parseInt(chapterMatch[1], 10)
            : 1;
          const currentReadKey = `${currentCanonBook.id}-${currentChapterNum}`;
          const isCurrentChapterRead = Boolean(chaptersReadMap[currentReadKey]);

          let currentBookReadCount = 0;
          for (let i = 1; i <= currentCanonBook.totalChapters; i++) {
            if (chaptersReadMap[`${currentCanonBook.id}-${i}`]) {
              currentBookReadCount++;
            }
          }
          const currentBookPercent = Math.min(
            100,
            Math.max(
              4,
              Math.round(
                (currentBookReadCount / currentCanonBook.totalChapters) * 100
              )
            )
          );

          const totalReadCount =
            Object.values(chaptersReadMap).filter(Boolean).length;

          const largerBooks = [
            {id: 'psalms', name: 'Psalms', total: 150, sampleCh: 23},
            {id: 'isaiah', name: 'Isaiah', total: 66, sampleCh: 40},
            {id: 'genesis', name: 'Genesis', total: 50, sampleCh: 1},
            {id: 'matthew', name: 'Matthew', total: 28, sampleCh: 5},
            {id: 'john', name: 'John', total: 21, sampleCh: 1},
            {id: 'romans', name: 'Romans', total: 16, sampleCh: 8},
          ];

          return (
            <div className="p-4 sm:px-5 rounded-2xl bg-[#F9F6F0] border border-[#E5DEC9] shadow-2xs space-y-3.5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
                      <span className="font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                        Chapters Read &amp; Book Progress Tracker
                      </span>
                      <span aria-hidden="true" className="text-[#E5DEC9]">
                        ·
                      </span>
                      <span className="font-semibold text-[#1A1A1A]">
                        {currentCanonBook.name}: {currentBookReadCount} of{' '}
                        {currentCanonBook.totalChapters} Chapters Read
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#4A5D4E] font-semibold">
                      Canon Total: {totalReadCount} /{' '}
                      {TOTAL_BIBLE_CHAPTERS.toLocaleString()} Chapters Read
                    </span>
                  </div>

                  {/* Subtle Continuous Progress Bar for Active Book */}
                  <div className="h-1.5 w-full rounded-full bg-[#E5DEC9] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D97706] to-[#4A5D4E] rounded-full transition-all duration-500"
                      style={{width: `${currentBookPercent}%`}}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setChaptersReadMap((prev) => {
                        const updated = {
                          ...prev,
                          [currentReadKey]: !prev[currentReadKey],
                        };
                        try {
                          window.localStorage.setItem(
                            CHAPTERS_READ_STORAGE_KEY,
                            JSON.stringify(updated)
                          );
                        } catch {
                          // ignore
                        }
                        return updated;
                      });
                      onEngageContent?.(
                        10,
                        `Tracked ${currentCanonBook.name} ${currentChapterNum} in Chapters Read Progress`
                      );
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      isCurrentChapterRead
                        ? 'bg-[#10B981]/15 text-[#047857] border-[#10B981]/40'
                        : 'bg-[#F2ECE1] hover:bg-[#E5DEC9] text-[#1A1A1A] border-[#D97706]/40'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>
                      {isCurrentChapterRead
                        ? `${currentCanonBook.name} ${currentChapterNum} Read ✓`
                        : `Mark ${currentCanonBook.name} ${currentChapterNum} Read`}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFullPageCustomChapterId(
                        `${currentCanonBook.id}-${currentChapterNum}`
                      );
                      setIsFullPageReaderOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#D97706] text-[#F9F6F0] hover:text-[#1A1A1A] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#D97706] group-hover:text-[#1A1A1A]" />
                    <span>
                      Read All {currentCanonBook.totalChapters}{' '}
                      {currentCanonBook.name} Chapters in Page Format
                    </span>
                  </button>
                </div>
              </div>

              {/* Larger Biblical Books Progress Row (Click any book to open its chapters in simple page format) */}
              <div className="pt-2.5 border-t border-[#E5DEC9]/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <span className="font-mono text-[#57534E]">
                  Larger Biblical Books Progress (Click to read all chapters in page format):
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {largerBooks.map((lb) => {
                    let count = 0;
                    for (let i = 1; i <= lb.total; i++) {
                      if (chaptersReadMap[`${lb.id}-${i}`]) count++;
                    }
                    const pct = Math.min(
                      100,
                      Math.round((count / lb.total) * 100)
                    );
                    return (
                      <button
                        key={lb.id}
                        type="button"
                        onClick={() => {
                          setFullPageCustomChapterId(
                            `${lb.id}-${lb.sampleCh}`
                          );
                          setIsFullPageReaderOpen(true);
                          onEngageContent?.(
                            10,
                            `Opened ${lb.name} (${lb.total} Chapters) in Full-Page Format`
                          );
                        }}
                        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#F2ECE1] hover:bg-[#E5DEC9] border border-[#E5DEC9] hover:border-[#D97706] text-[#1A1A1A] transition-colors cursor-pointer"
                        title={`Open ${lb.name} (${lb.total} chapters) in Full-Page Bible Reader`}
                      >
                        <span className="font-semibold">{lb.name}</span>
                        <span className="font-mono text-[10px] text-[#92400E]">
                          {count}/{lb.total} ch
                        </span>
                        <span className="w-10 h-1.5 rounded-full bg-[#E5DEC9] overflow-hidden inline-block">
                          <span
                            className="block h-full bg-[#D97706] rounded-full"
                            style={{width: `${Math.max(8, pct)}%`}}
                          />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

        {/* WEEKLY READING VELOCITY GRAPH (7-Day Consistency via Recharts) */}
        <WeeklyReadingVelocityChart
          totalChaptersReadCanon={
            Object.values(chaptersReadMap).filter(Boolean).length
          }
          activeBookName={currentPassage.book}
          onLogVelocitySession={onEngageContent}
        />

        {/* 30-DAY VISUAL READING HEATMAP & JOURNEY STREAKS (Recharts Gamification) */}
        <MonthlyReadingHeatmapChart
          totalChaptersReadCanon={
            Object.values(chaptersReadMap).filter(Boolean).length
          }
          activeBookName={currentPassage.book}
          onLogHeatmapSession={onEngageContent}
        />

        {/* Main Studio Container */}
        <div className="rounded-2xl bg-[#F9F6F0] border border-[#E5DEC9] shadow-sm overflow-hidden">
          {/* Studio Top Control Bar: Passage Picker + Audience Version Matrix + Typography Drawer */}
          <div className="p-4 sm:p-6 bg-[#F2ECE1]/70 border-b border-[#E5DEC9] space-y-5">
            {/* Row 1: Passage Selector & Audience Quick Presets */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#57534E]">
                  Select Study Passage
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {STUDY_PASSAGES.map((passage) => {
                    const isSelected = passage.id === selectedPassageId;
                    return (
                      <button
                        key={passage.id}
                        type="button"
                        onClick={() => {
                          setSelectedPassageId(passage.id);
                          setHighlightedVerse(passage.verses[0].verseNumber);
                          onEngageContent?.(
                            10,
                            `Opened ${passage.reference} in Parallel Studio`
                          );
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer inline-flex items-center gap-2 ${
                          isSelected
                            ? 'bg-[#1A1A1A] text-[#F9F6F0] border-[#1A1A1A] shadow-xs'
                            : 'bg-[#F9F6F0] text-[#44403C] border-[#E5DEC9] hover:border-[#D97706]'
                        }`}
                      >
                        <span>{passage.reference}</span>
                        <span className="hidden sm:inline text-[11px] font-normal opacity-80">
                          · {passage.title.split('&')[0].trim()}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-[#D97706] text-[#1A1A1A] font-bold'
                              : 'bg-[#F2ECE1] text-[#57534E]'
                          }`}
                        >
                          <Clock className="w-2.5 h-2.5" />
                          <span>{passage.estimatedReadTime}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Audience-Tailored Presets */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#57534E]">
                  Audience Version Presets (1-Tap Trio)
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyAudiencePreset('Scholarly Depth Trio', [
                        'AKJV',
                        'AMP',
                        'NASB',
                      ])
                    }
                    className="px-3 py-1.5 rounded-lg bg-[#F9F6F0] hover:bg-[#E5DEC9]/60 border border-[#E5DEC9] text-xs font-medium text-[#1A1A1A] transition-colors cursor-pointer"
                  >
                    Scholarly Trio (AKJV · AMP · NASB)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyAudiencePreset('Cross-Age Bridge', [
                        'NASB',
                        'AMP',
                        'NLT',
                      ])
                    }
                    className="px-3 py-1.5 rounded-lg bg-[#F9F6F0] hover:bg-[#E5DEC9]/60 border border-[#D97706]/50 text-xs font-medium text-[#1A1A1A] transition-colors cursor-pointer"
                  >
                    Nuance Bridge (NASB · AMP · NLT)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyAudiencePreset('Accessible Clarity', [
                        'NIV',
                        'NLT',
                        'AMP',
                      ])
                    }
                    className="px-3 py-1.5 rounded-lg bg-[#F9F6F0] hover:bg-[#E5DEC9]/60 border border-[#E5DEC9] text-xs font-medium text-[#1A1A1A] transition-colors cursor-pointer"
                  >
                    Younger &amp; Newcomer (NIV · NLT · AMP)
                  </button>
                </div>
              </div>
            </div>

            {/* Row 2: Audience-Tailored Version Selection Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-3 border-t border-[#E5DEC9]">
              {/* Older / Mature / Scholarly Readers (AKJV, AMP, NASB) */}
              <div className="lg:col-span-7 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                    <BookMarked className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>
                      Scholarly &amp; Traditional Depth (Older / Mature Readers)
                    </span>
                  </span>
                  <span className="text-[11px] font-mono text-[#57534E]">
                    Formal &amp; Amplified Precision
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {BIBLE_VERSIONS.filter(
                    (v) => v.audienceTier === 'scholarly'
                  ).map((ver) => {
                    const isSelected =
                      readingMode === 'parallel'
                        ? selectedVersions.includes(ver.id)
                        : singleFocusVersion === ver.id;
                    return (
                      <button
                        key={ver.id}
                        type="button"
                        onClick={() => handleToggleParallelVersion(ver.id)}
                        aria-pressed={isSelected}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1A1A1A] text-[#F9F6F0] border-[#D97706] ring-1 ring-[#D97706]'
                            : 'bg-[#F9F6F0] text-[#1A1A1A] border-[#E5DEC9] hover:border-[#D97706]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold tracking-wider text-[#D97706]">
                            {ver.shortName}
                          </span>
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                              isSelected
                                ? 'bg-[#D97706] text-[#1A1A1A]'
                                : 'border border-[#E5DEC9]'
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5" />}
                          </span>
                        </div>
                        <div className="mt-1 text-xs font-semibold truncate">
                          {ver.fullName}
                        </div>
                        <div
                          className={`mt-0.5 text-[11px] truncate ${
                            isSelected ? 'text-[#D6D3D1]' : 'text-[#57534E]'
                          }`}
                        >
                          {ver.audienceLabel}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Younger Readers / Newcomers (NIV, NLT) */}
              <div className="lg:col-span-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#4A5D4E]" />
                    <span>
                      Accessible &amp; Modern Clarity (Younger / Newcomers)
                    </span>
                  </span>
                  <span className="text-[11px] font-mono text-[#57534E]">
                    Readable Narrative Flow
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {BIBLE_VERSIONS.filter(
                    (v) => v.audienceTier === 'accessible'
                  ).map((ver) => {
                    const isSelected =
                      readingMode === 'parallel'
                        ? selectedVersions.includes(ver.id)
                        : singleFocusVersion === ver.id;
                    return (
                      <button
                        key={ver.id}
                        type="button"
                        onClick={() => handleToggleParallelVersion(ver.id)}
                        aria-pressed={isSelected}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1A1A1A] text-[#F9F6F0] border-[#D97706] ring-1 ring-[#D97706]'
                            : 'bg-[#F9F6F0] text-[#1A1A1A] border-[#E5DEC9] hover:border-[#D97706]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold tracking-wider text-[#D97706]">
                            {ver.shortName}
                          </span>
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                              isSelected
                                ? 'bg-[#D97706] text-[#1A1A1A]'
                                : 'border border-[#E5DEC9]'
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5" />}
                          </span>
                        </div>
                        <div className="mt-1 text-xs font-semibold truncate">
                          {ver.fullName}
                        </div>
                        <div
                          className={`mt-0.5 text-[11px] truncate ${
                            isSelected ? 'text-[#D6D3D1]' : 'text-[#57534E]'
                          }`}
                        >
                          {ver.audienceLabel}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Optional Expandable Distraction-Free Typography & Scroll-Lock Bar */}
            <AnimatePresence>
              {showTypographyControls && (
                <motion.div
                  initial={{opacity: 0, height: 0}}
                  animate={{opacity: 1, height: 'auto'}}
                  exit={{opacity: 0, height: 0}}
                  className="overflow-hidden"
                >
                  <div className="pt-3 border-t border-[#E5DEC9] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Font Size Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[#57534E]">
                          Font Size:
                        </span>
                        {(
                          [
                            {id: 'compact', label: 'Small'},
                            {id: 'comfort', label: 'Comfort'},
                            {id: 'editorial', label: 'Editorial'},
                            {id: 'sanctuary', label: 'Large XL'},
                          ] as const
                        ).map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setFontSizeStep(opt.id)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                              fontSizeStep === opt.id
                                ? 'bg-[#D97706] text-[#1A1A1A]'
                                : 'bg-[#F9F6F0] text-[#44403C] border border-[#E5DEC9]'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>

                      {/* Line Spacing Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[#57534E]">
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
                            onClick={() => setLineSpacingStep(opt.id)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                              lineSpacingStep === opt.id
                                ? 'bg-[#D97706] text-[#1A1A1A]'
                                : 'bg-[#F9F6F0] text-[#44403C] border border-[#E5DEC9]'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Synchronized Scroll Lock Toggle */}
                    {readingMode === 'parallel' && (
                      <button
                        type="button"
                        onClick={() => setIsScrollLocked((prev) => !prev)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                          isScrollLocked
                            ? 'bg-[#1A1A1A] text-[#F9F6F0] border-[#1A1A1A]'
                            : 'bg-[#F9F6F0] text-[#57534E] border-[#E5DEC9]'
                        }`}
                      >
                        {isScrollLocked ? (
                          <>
                            <Lock className="w-3.5 h-3.5 text-[#D97706]" />
                            <span>Columns Scroll-Locked</span>
                          </>
                        ) : (
                          <>
                            <Unlock className="w-3.5 h-3.5 text-[#57534E]" />
                            <span>Independent Column Scroll</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Passage Context Banner & Interactive Hover-to-Peek / Tap-to-Define Dictionary Strip */}
          <div className="px-4 sm:px-6 py-4 bg-[#F9F6F0] border-b border-[#E5DEC9] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="text-lg sm:text-xl font-normal text-[#1A1A1A]"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  {currentPassage.reference} — {currentPassage.title}
                </span>
                <span className="text-xs font-mono text-[#92400E] bg-[#D97706]/10 px-2.5 py-0.5 rounded-md border border-[#D97706]/30">
                  {currentPassage.historicalDate}
                </span>
                <span className="text-xs font-mono text-[#4A5D4E] bg-[#4A5D4E]/10 px-2.5 py-0.5 rounded-md border border-[#4A5D4E]/30 inline-flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#4A5D4E]" />
                  <span>Estimated: {currentPassage.estimatedReadTime}</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed max-w-3xl">
                {currentPassage.introContext}
              </p>
            </div>

            {/* Hover-to-Peek & Tap-to-Define Dictionary Term Strip */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#57534E] mr-1">
                Hover-to-Peek / Tap-to-Define:
              </span>
              {Object.values(DICTIONARY_ENTRIES)
                .slice(0, 6)
                .map((entry) => {
                  const stripKey = `strip-${entry.id}`;
                  const isStripPeekOpen = hoveredPeek?.keyId === stripKey;
                  return (
                    <span
                      key={entry.id}
                      className="relative inline-block"
                      onMouseEnter={() =>
                        setHoveredPeek({
                          keyId: stripKey,
                          termId: entry.id,
                          matchedPhrase: entry.term,
                        })
                      }
                      onMouseLeave={() =>
                        setHoveredPeek((prev) =>
                          prev?.keyId === stripKey ? null : prev
                        )
                      }
                    >
                      <button
                        type="button"
                        onClick={() => handleOpenDictionaryTerm(entry.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                          activeDictionaryEntryId === entry.id
                            ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706] font-semibold'
                            : 'bg-[#F2ECE1] hover:bg-[#E5DEC9] text-[#1A1A1A] border-[#E5DEC9]'
                        }`}
                      >
                        {entry.term.split('(')[0].trim()}
                      </button>

                      <AnimatePresence>
                        {isStripPeekOpen && (
                          <motion.div
                            role="tooltip"
                            initial={{opacity: 0, y: 6, scale: 0.96}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            exit={{opacity: 0, y: 4, scale: 0.96}}
                            transition={{duration: 0.16}}
                            className="absolute bottom-full right-0 mb-2 w-64 p-3 rounded-xl bg-[#1A1A1A] text-[#F9F6F0] border border-[#D97706]/80 shadow-xl z-40 pointer-events-none text-left space-y-1"
                          >
                            <div className="flex items-center justify-between gap-2 border-b border-[#292524] pb-1">
                              <span className="font-mono text-[10px] uppercase tracking-wider text-[#FBBF24] font-semibold truncate">
                                {entry.term}
                              </span>
                              <span className="font-serif text-xs text-[#D97706]">
                                {entry.originalScript}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#E7E5E4] leading-snug">
                              {entry.oneSentencePeek}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </span>
                  );
                })}
            </div>
          </div>

          {/* READING CANVAS: Single Focus Mode vs. Parallel Studio Mode */}
          {readingMode === 'single' ? (
            /* SINGLE FOCUS MODE: Distraction-free contemplative single translation */
            <div className="p-6 sm:p-10 lg:p-12 max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DEC9]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D97706] font-semibold">
                    Single Focus Sanctuary · {singleFocusVersion}
                  </span>
                  <h3
                    className="text-xl font-normal text-[#1A1A1A]"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    {
                      BIBLE_VERSIONS.find((v) => v.id === singleFocusVersion)
                        ?.fullName
                    }
                  </h3>
                </div>
                <span className="text-xs text-[#57534E]">
                  Hover over underlined terms to peek · Tap to open full
                  Dictionary
                </span>
              </div>

              <div className={`space-y-4 ${fontSizeClass} ${lineSpacingClass}`}>
                {currentPassage.verses.map((verse) => {
                  const isHighlighted =
                    verse.verseNumber === highlightedVerse;
                  return (
                    <div
                      key={verse.verseNumber}
                      onClick={() => setHighlightedVerse(verse.verseNumber)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isHighlighted
                          ? 'bg-[#D97706]/10 border-[#D97706] shadow-xs'
                          : 'bg-[#F9F6F0] border-transparent hover:bg-[#F2ECE1]/60 hover:border-[#E5DEC9]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs font-bold text-[#D97706] mt-1 shrink-0 select-none">
                          {verse.verseNumber}
                        </span>
                        <div className="text-[#1A1A1A]">
                          {renderVerseWithDictionaryLinks(
                            verse.translations[singleFocusVersion],
                            verse.dictionaryTermIds,
                            `single-${singleFocusVersion}-v${verse.verseNumber}`
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* PARALLEL STUDIO MODE: Synchronized Columns on Tablet/Desktop + Swipeable/Tabbed Stack on Mobile */
            <div className="p-4 sm:p-6 space-y-6">
              {/* Mobile Version Switcher Tabs */}
              <div className="flex md:hidden items-center justify-between gap-2 p-2 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9]">
                <span className="text-[11px] font-mono text-[#57534E] pl-1">
                  Mobile Card Stack:
                </span>
                <div className="flex items-center gap-1.5">
                  {selectedVersions.map((verId) => (
                    <button
                      key={verId}
                      type="button"
                      onClick={() => setMobileActiveVersion(verId)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                        mobileActiveVersion === verId
                          ? 'bg-[#1A1A1A] text-[#F9F6F0]'
                          : 'bg-[#F9F6F0] text-[#44403C] border border-[#E5DEC9]'
                      }`}
                    >
                      {verId}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parallel Columns Grid */}
              <div
                className={`grid grid-cols-1 ${
                  selectedVersions.length === 1
                    ? 'md:grid-cols-1'
                    : selectedVersions.length === 2
                    ? 'md:grid-cols-2'
                    : 'md:grid-cols-2 lg:grid-cols-3'
                } gap-4 sm:gap-5`}
              >
                {selectedVersions.map((versionId) => {
                  const versionMeta = BIBLE_VERSIONS.find(
                    (v) => v.id === versionId
                  )!;
                  const isHiddenOnMobile =
                    selectedVersions.includes(mobileActiveVersion) &&
                    mobileActiveVersion !== versionId;

                  return (
                    <div
                      key={versionId}
                      className={`${
                        isHiddenOnMobile ? 'hidden md:flex' : 'flex'
                      } flex-col rounded-2xl bg-[#F9F6F0] border border-[#E5DEC9] overflow-hidden shadow-xs`}
                    >
                      {/* Column Header */}
                      <div className="p-4 bg-[#F2ECE1]/80 border-b border-[#E5DEC9] flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#1A1A1A] text-[#F9F6F0]">
                              {versionMeta.shortName}
                            </span>
                            <span className="text-[11px] font-mono text-[#92400E]">
                              {versionMeta.audienceTier === 'scholarly'
                                ? 'Scholarly Depth'
                                : 'Accessible Clarity'}
                            </span>
                          </div>
                          <h3
                            className="mt-1.5 text-base font-normal text-[#1A1A1A]"
                            style={{fontFamily: 'var(--font-display), serif'}}
                          >
                            {versionMeta.fullName}
                          </h3>
                          <p className="text-[11px] text-[#57534E]">
                            {versionMeta.translationPhilosophy}
                          </p>
                        </div>
                      </div>

                      {/* Synchronized Scrollable Verse List */}
                      <div
                        ref={(el) => {
                          columnRefs.current[versionId] = el;
                        }}
                        onScroll={() => handleColumnScroll(versionId)}
                        className={`p-4 space-y-3 max-h-[540px] overflow-y-auto ${fontSizeClass} ${lineSpacingClass}`}
                      >
                        {currentPassage.verses.map((verse) => {
                          const isHighlighted =
                            verse.verseNumber === highlightedVerse;
                          return (
                            <div
                              key={verse.verseNumber}
                              onClick={() => {
                                setHighlightedVerse(verse.verseNumber);
                                setMobileActiveVersion(versionId);
                                onEngageContent?.(
                                  5,
                                  `Bookmarked & Compared ${currentPassage.reference.split(':')[0]}:${verse.verseNumber} (${versionId})`
                                );
                              }}
                              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                                isHighlighted
                                  ? 'bg-[#D97706]/12 border-[#D97706] shadow-xs'
                                  : 'bg-[#F9F6F0] border-[#E5DEC9]/70 hover:bg-[#F2ECE1]/60 hover:border-[#D97706]/40'
                              }`}
                            >
                              <div className="flex items-start gap-2.5">
                                <span
                                  className={`font-mono text-xs font-bold mt-1 px-1.5 py-0.5 rounded shrink-0 select-none ${
                                    isHighlighted
                                      ? 'bg-[#D97706] text-[#1A1A1A]'
                                      : 'bg-[#F2ECE1] text-[#57534E]'
                                  }`}
                                >
                                  v.{verse.verseNumber}
                                </span>
                                <div className="text-[#1A1A1A] min-w-0 flex-1">
                                  {renderVerseWithDictionaryLinks(
                                    verse.translations[versionId],
                                    verse.dictionaryTermIds,
                                    `parallel-${versionId}-v${verse.verseNumber}`
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Synchronized Verse "Nuance by Contrast" Scholar's Comparison Bar */}
          <div className="mx-4 sm:mx-6 mb-6 p-4 sm:p-5 rounded-2xl bg-[#F2ECE1] border border-[#D97706]/40 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D97706]" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                  Nuance by Contrast · Verse {activeVerseData.verseNumber}{' '}
                  Scholarly Note
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-[#57534E]">Jump to Verse:</span>
                {currentPassage.verses.map((v) => (
                  <button
                    key={v.verseNumber}
                    type="button"
                    onClick={() => setHighlightedVerse(v.verseNumber)}
                    className={`w-7 h-7 rounded-lg font-mono text-xs font-semibold transition-colors cursor-pointer ${
                      v.verseNumber === highlightedVerse
                        ? 'bg-[#D97706] text-[#1A1A1A]'
                        : 'bg-[#F9F6F0] text-[#44403C] border border-[#E5DEC9] hover:border-[#D97706]'
                    }`}
                  >
                    {v.verseNumber}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm text-[#1A1A1A] leading-relaxed">
              {activeVerseData.nuanceCommentary}
            </p>

            {/* Key Version Distinctions & Linked Dictionary Terms for Active Verse */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {activeVerseData.keyHighlightDifference.map((diff, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#F9F6F0] border border-[#E5DEC9] space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-[#D97706]">
                      {diff.version} Rendering
                    </span>
                  </div>
                  <div
                    className="text-xs font-semibold text-[#1A1A1A] italic"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    “{diff.phrase}”
                  </div>
                  <p className="text-[11px] text-[#44403C] leading-snug">
                    {diff.insight}
                  </p>
                </div>
              ))}

              {/* Quick Tap Dictionary Terms in this Verse */}
              <div className="p-3 rounded-xl bg-[#F9F6F0] border border-[#E5DEC9] flex flex-col justify-between gap-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#57534E]">
                  Verse {activeVerseData.verseNumber} Dictionary Roots
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeVerseData.dictionaryTermIds.map((termId) => {
                    const entry = DICTIONARY_ENTRIES[termId];
                    if (!entry) return null;
                    return (
                      <button
                        key={termId}
                        type="button"
                        onClick={() => handleOpenDictionaryTerm(termId)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#D97706]/15 hover:bg-[#D97706]/25 border border-[#D97706]/40 text-xs font-semibold text-[#1A1A1A] transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-3 h-3 text-[#D97706]" />
                        <span>{entry.term}</span>
                        <span className="font-mono text-[11px] text-[#92400E]">
                          ({entry.originalScript})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PART 3: THE CURATED CONCORDANCE HUB */}
        <div
          ref={concordanceSectionRef}
          className="rounded-2xl bg-[#F9F6F0] border border-[#E5DEC9] shadow-sm overflow-hidden"
        >
          <div className="p-5 sm:p-6 bg-[#F2ECE1]/70 border-b border-[#E5DEC9] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#4A5D4E]">
                <Layers className="w-3.5 h-3.5 text-[#D97706]" />
                <span>
                  The Curated Concordance &amp; Original Language Root Peek
                </span>
              </div>
              <h3
                className="text-xl sm:text-2xl font-normal text-[#1A1A1A]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Trace a single biblical word across Covenants, Testaments, and
                ancient roots.
              </h3>
            </div>

            {/* Search Input Box */}
            <div className="flex items-center gap-2 w-full lg:w-80">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#57534E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={concordanceSearchQuery}
                  onChange={(e) => setConcordanceSearchQuery(e.target.value)}
                  placeholder="Search word or root (e.g., Peace, Shalom, Light, Chesed)..."
                  aria-label="Search Curated Concordance"
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#F9F6F0] border border-[#E5DEC9] focus:border-[#D97706] focus:outline-none text-xs text-[#1A1A1A] placeholder:text-[#78716C]"
                />
                {concordanceSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setConcordanceSearchQuery('')}
                    aria-label="Clear concordance search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#57534E] hover:text-[#1A1A1A] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsConcordanceOpen((prev) => !prev)}
                className="px-3 py-2 rounded-xl bg-[#F9F6F0] border border-[#E5DEC9] text-xs font-semibold text-[#1A1A1A] hover:border-[#D97706] cursor-pointer shrink-0"
              >
                {isConcordanceOpen ? 'Collapse' : 'Expand'}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {isConcordanceOpen && (
              <motion.div
                initial={{opacity: 0, height: 0}}
                animate={{opacity: 1, height: 'auto'}}
                exit={{opacity: 0, height: 0}}
                className="p-5 sm:p-6 space-y-6"
              >
                {/* Curated Word Selector Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#57534E] mr-1">
                    Curated Word Studies:
                  </span>
                  {CONCORDANCE_STUDIES.map((study) => {
                    const isSelected = activeConcordanceStudy.id === study.id;
                    return (
                      <button
                        key={study.id}
                        type="button"
                        onClick={() => handleSelectConcordanceWord(study.id)}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1A1A1A] text-[#F9F6F0] border-[#1A1A1A] shadow-xs'
                            : 'bg-[#F2ECE1]/70 text-[#44403C] border-[#E5DEC9] hover:border-[#D97706]'
                        }`}
                      >
                        <span>{study.englishWord}</span>
                        <span
                          className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-[#D97706] text-[#1A1A1A]'
                              : 'bg-[#F9F6F0] text-[#57534E]'
                          }`}
                        >
                          {study.totalBiblicalOccurrences}x
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Concordance Word Overview + Original Language Root Peek */}
                <div className="p-5 rounded-2xl bg-[#F2ECE1]/70 border border-[#E5DEC9] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h4
                          className="text-2xl font-normal text-[#1A1A1A]"
                          style={{fontFamily: 'var(--font-display), serif'}}
                        >
                          “{activeConcordanceStudy.englishWord}”
                        </h4>
                        <span className="font-mono text-xs text-[#92400E] bg-[#D97706]/15 px-2.5 py-0.5 rounded-md border border-[#D97706]/30">
                          {activeConcordanceStudy.totalBiblicalOccurrences}{' '}
                          Canonical Occurrences
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#44403C] mt-1">
                        {activeConcordanceStudy.summaryTagline}
                      </p>
                    </div>

                    {/* Expandable Original Language Root Peek Tag */}
                    <button
                      type="button"
                      onClick={() => setIsRootPeekExpanded((prev) => !prev)}
                      aria-expanded={isRootPeekExpanded}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1A1A1A] text-[#F9F6F0] text-xs font-semibold cursor-pointer self-start sm:self-center shrink-0"
                    >
                      <Globe className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>
                        Original Language Root Peek:{' '}
                        {activeConcordanceStudy.hebrewRoot.transliteration} (
                        {activeConcordanceStudy.hebrewRoot.script}) &amp;{' '}
                        {activeConcordanceStudy.greekRoot.transliteration} (
                        {activeConcordanceStudy.greekRoot.script})
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#D97706] transition-transform ${
                          isRootPeekExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Expandable Hebrew & Greek Root Cards */}
                  <AnimatePresence initial={false}>
                    {isRootPeekExpanded && (
                      <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: 'auto'}}
                        exit={{opacity: 0, height: 0}}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 overflow-hidden"
                      >
                        {/* Hebrew Root Card */}
                        <div className="p-4 rounded-xl bg-[#F9F6F0] border border-[#E5DEC9] space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#92400E] font-semibold">
                              Old Testament Hebrew Root ·{' '}
                              {activeConcordanceStudy.hebrewRoot.strongsRef}
                            </span>
                            <span className="text-lg font-serif text-[#1A1A1A]">
                              {activeConcordanceStudy.hebrewRoot.script}
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-[#1A1A1A]">
                            {activeConcordanceStudy.hebrewRoot.transliteration}{' '}
                            <span className="text-xs font-mono font-normal text-[#57534E]">
                              (
                              {activeConcordanceStudy.hebrewRoot.pronunciation})
                            </span>
                          </div>
                          <p className="text-xs text-[#44403C] leading-relaxed">
                            <strong className="text-[#1A1A1A]">Meaning:</strong>{' '}
                            {activeConcordanceStudy.hebrewRoot.basicDefinition}
                          </p>
                          <p className="text-xs text-[#57534E] italic">
                            Concrete Picture:{' '}
                            {activeConcordanceStudy.hebrewRoot.concreteMetaphor}
                          </p>
                        </div>

                        {/* Greek Root Card */}
                        <div className="p-4 rounded-xl bg-[#F9F6F0] border border-[#E5DEC9] space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#4A5D4E] font-semibold">
                              New Testament Greek Root ·{' '}
                              {activeConcordanceStudy.greekRoot.strongsRef}
                            </span>
                            <span className="text-lg font-serif text-[#1A1A1A]">
                              {activeConcordanceStudy.greekRoot.script}
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-[#1A1A1A]">
                            {activeConcordanceStudy.greekRoot.transliteration}{' '}
                            <span className="text-xs font-mono font-normal text-[#57534E]">
                              ({activeConcordanceStudy.greekRoot.pronunciation})
                            </span>
                          </div>
                          <p className="text-xs text-[#44403C] leading-relaxed">
                            <strong className="text-[#1A1A1A]">Meaning:</strong>{' '}
                            {activeConcordanceStudy.greekRoot.basicDefinition}
                          </p>
                          <p className="text-xs text-[#57534E] italic">
                            Concrete Picture:{' '}
                            {activeConcordanceStudy.greekRoot.concreteMetaphor}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Curated Cross-Thematic Links */}
                  <div className="pt-2 border-t border-[#E5DEC9] flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A]">
                      <Link2 className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Curated Cross-Thematic Links:</span>
                    </span>
                    {activeConcordanceStudy.crossThematicLinks.map(
                      (link, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            if (link.targetConcordanceId) {
                              handleSelectConcordanceWord(
                                link.targetConcordanceId
                              );
                            } else if (link.targetDictionaryId) {
                              handleOpenDictionaryTerm(link.targetDictionaryId);
                            }
                          }}
                          title={link.relationNote}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F9F6F0] hover:bg-[#D97706]/15 border border-[#E5DEC9] hover:border-[#D97706] text-xs font-medium text-[#1A1A1A] transition-colors cursor-pointer"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="w-3 h-3 text-[#D97706]" />
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Occurrence Mapping Grouped by Testament & Book */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#57534E]">
                      Occurrence Mapping · Grouped by Testament &amp; Book
                    </div>
                    <div className="flex items-center gap-1.5">
                      {(
                        [
                          {id: 'all', label: 'All Testaments'},
                          {id: 'Old Testament', label: 'Old Testament'},
                          {id: 'New Testament', label: 'New Testament'},
                        ] as const
                      ).map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setTestamentFilter(tab.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                            testamentFilter === tab.id
                              ? 'bg-[#1A1A1A] text-[#F9F6F0]'
                              : 'bg-[#F2ECE1] text-[#44403C]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {(['Old Testament', 'New Testament'] as const).map(
                      (testament) => {
                        const list = groupedOccurrencesByTestament[testament];
                        if (list.length === 0) return null;
                        return (
                          <div
                            key={testament}
                            className="p-4 rounded-2xl bg-[#F2ECE1]/50 border border-[#E5DEC9] space-y-3"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-[#E5DEC9]">
                              <span
                                className="text-base font-normal text-[#1A1A1A]"
                                style={{
                                  fontFamily: 'var(--font-display), serif',
                                }}
                              >
                                {testament} Occurrences
                              </span>
                              <span className="font-mono text-xs text-[#92400E]">
                                {list.length} Key Passages
                              </span>
                            </div>

                            <div className="space-y-2.5">
                              {list.map((occ, idx) => (
                                <div
                                  key={idx}
                                  className="p-3.5 rounded-xl bg-[#F9F6F0] border border-[#E5DEC9] space-y-2"
                                >
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono text-xs font-bold text-[#1A1A1A]">
                                        {occ.reference}
                                      </span>
                                      <span className="text-[11px] text-[#57534E]">
                                        · {occ.book} ({occ.bookGroup})
                                      </span>
                                    </div>
                                    <span className="font-mono text-[11px] text-[#92400E] bg-[#D97706]/10 px-2 py-0.5 rounded">
                                      {occ.rootUsed}
                                    </span>
                                  </div>

                                  <p className="text-xs sm:text-sm text-[#1A1A1A] leading-relaxed">
                                    “{occ.snippet}”
                                  </p>

                                  {occ.linkedPassageId && (
                                    <div className="pt-1">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setSelectedPassageId(
                                            occ.linkedPassageId!
                                          );
                                          window.document
                                            .getElementById(
                                              'bible-study-studio'
                                            )
                                            ?.scrollIntoView({
                                              behavior: 'smooth',
                                            });
                                        }}
                                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#92400E] hover:underline cursor-pointer"
                                      >
                                        <span>
                                          Open {occ.reference} in Parallel
                                          Reading Engine
                                        </span>
                                        <ChevronRight className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* PART 2: THE DESCRIPTIVE BIBLE DICTIONARY MINIMALIST BOTTOM SHEET */}
      <AnimatePresence>
        {activeDictionaryEntry && (
          <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:p-4 pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setActiveDictionaryEntryId(null)}
              className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs pointer-events-auto"
            />

            {/* Warm Cream (#F9F6F0) Minimalist Bottom Sheet */}
            <motion.div
              initial={{y: '100%', opacity: 0.6}}
              animate={{y: 0, opacity: 1}}
              exit={{y: '100%', opacity: 0}}
              transition={{duration: 0.32, ease: [0.16, 1, 0.3, 1]}}
              role="dialog"
              aria-modal="true"
              aria-labelledby="dictionary-sheet-title"
              className="relative z-10 w-full max-w-2xl rounded-t-3xl sm:rounded-3xl bg-[#F9F6F0] text-[#1A1A1A] border border-[#E5DEC9] shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto pointer-events-auto space-y-6"
            >
              {/* Sheet Drag Handle Bar */}
              <div className="w-12 h-1.5 rounded-full bg-[#E5DEC9] mx-auto -mt-2 mb-2" />

              {/* Sheet Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E5DEC9]">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#92400E]">
                    <span>Descriptive Bible Dictionary</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {activeDictionaryEntry.language} Root:{' '}
                      {activeDictionaryEntry.transliteration} (
                      {activeDictionaryEntry.originalScript})
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>/{activeDictionaryEntry.pronunciation}/</span>
                  </div>
                  <h3
                    id="dictionary-sheet-title"
                    className="text-2xl sm:text-3xl font-normal text-[#1A1A1A]"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    {activeDictionaryEntry.term}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveDictionaryEntryId(null)}
                  aria-label="Close Bible Dictionary sheet"
                  className="p-2 rounded-full bg-[#F2ECE1] hover:bg-[#E5DEC9] text-[#1A1A1A] transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 1. Direct Definition */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider font-semibold text-[#4A5D4E]">
                  01 · Direct Definition (Ancient Audience Meaning)
                </div>
                <p className="text-sm sm:text-base text-[#1A1A1A] leading-relaxed">
                  {activeDictionaryEntry.directDefinition}
                </p>
              </div>

              {/* 2. Cultural & Historical Context */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                  02 · Cultural &amp; Historical Context (Daily Ancient Life)
                </div>
                <p className="text-sm text-[#1A1A1A] leading-relaxed">
                  {activeDictionaryEntry.culturalAndHistoricalContext}
                </p>
                <div className="pt-2 border-t border-[#E5DEC9] flex items-start gap-2 text-xs text-[#44403C]">
                  <Feather className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1A1A1A]">
                      Material Culture &amp; Artifact:
                    </strong>{' '}
                    {activeDictionaryEntry.dailyLifeArtifact}
                  </div>
                </div>
              </div>

              {/* 3. Scriptural Cross-References */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider font-semibold text-[#4A5D4E]">
                  03 · Scriptural Cross-References
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {activeDictionaryEntry.crossReferences.map((xref, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#F2ECE1]/60 border border-[#E5DEC9] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#1A1A1A]">
                            {xref.reference}
                          </span>
                          <span className="text-[11px] font-mono text-[#57534E]">
                            ({xref.bookCategory})
                          </span>
                        </div>
                        <p className="text-xs text-[#44403C] italic">
                          “{xref.snippet}”
                        </p>
                      </div>

                      {xref.linkedPassageId && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPassageId(xref.linkedPassageId!);
                            setActiveDictionaryEntryId(null);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] text-[#F9F6F0] text-xs font-semibold hover:bg-[#292524] transition-colors cursor-pointer shrink-0 self-start sm:self-center"
                        >
                          Compare Passage →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Dictionary Entries Quick Switcher */}
              <div className="pt-3 border-t border-[#E5DEC9] flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-[#57534E]">
                  Explore more ancient terms:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {Object.values(DICTIONARY_ENTRIES).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleOpenDictionaryTerm(item.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                        item.id === activeDictionaryEntry.id
                          ? 'bg-[#D97706] text-[#1A1A1A] font-semibold'
                          : 'bg-[#F2ECE1] text-[#44403C] hover:text-[#1A1A1A]'
                      }`}
                    >
                      {item.term.split('(')[0].trim()}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PART 4: 'RECENT READS' SIDE DRAWER (Persists Last 5 Passages Visited in localStorage) */}
      <AnimatePresence>
        {isRecentReadsDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.2}}
              onClick={() => setIsRecentReadsDrawerOpen(false)}
              className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs pointer-events-auto"
            />

            {/* Slide-Over Side Drawer */}
            <motion.div
              ref={recentReadsDrawerRef}
              initial={{x: '100%', opacity: 0.8}}
              animate={{x: 0, opacity: 1}}
              exit={{x: '100%', opacity: 0.8}}
              transition={{duration: 0.28, ease: [0.16, 1, 0.3, 1]}}
              role="dialog"
              aria-modal="true"
              aria-labelledby="recent-reads-drawer-title"
              tabIndex={-1}
              className="relative z-10 w-full max-w-md h-full bg-[#F9F6F0] text-[#1A1A1A] border-l border-[#E5DEC9] shadow-2xl flex flex-col justify-between pointer-events-auto overflow-hidden focus:outline-none"
            >
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 bg-[#F2ECE1] border-b border-[#E5DEC9] space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#92400E] font-semibold">
                      <History className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Cross-Session Study History</span>
                    </div>
                    <h3
                      id="recent-reads-drawer-title"
                      className="text-2xl font-normal text-[#1A1A1A]"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      Recent Reads ({recentReads.length}/{MAX_RECENT_READS})
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsRecentReadsDrawerOpen(false)}
                    aria-label="Close Recent Reads side drawer"
                    className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl bg-[#F9F6F0] hover:bg-[#E5DEC9] text-[#1A1A1A] border border-[#E5DEC9] transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-[#44403C] leading-relaxed">
                  Automatically persists the last{' '}
                  <strong className="text-[#1A1A1A]">5 passages</strong> you
                  visited in <code className="font-mono text-[11px]">localStorage</code>{' '}
                  across sessions—including your exact verse anchor, reading mode,
                  and active translations.
                </p>
              </div>

              {/* Scrollable List of Last 5 Visited Passages */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5">
                {recentReads.map((entry, idx) => {
                  const isCurrentlyActive =
                    entry.passageId === selectedPassageId;
                  return (
                    <div
                      key={entry.passageId}
                      className={`p-4 rounded-2xl border transition-all space-y-3 ${
                        isCurrentlyActive
                          ? 'bg-[#F2ECE1] border-[#D97706] ring-1 ring-[#D97706]/40 shadow-xs'
                          : 'bg-[#FAF7F2] border-[#E5DEC9] hover:border-[#D97706]/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-[#92400E]">
                          <span className="w-5 h-5 rounded-md bg-[#1A1A1A] text-[#FBBF24] inline-flex items-center justify-center text-[10px]">
                            0{idx + 1}
                          </span>
                          <span>
                            {entry.book} · {entry.testament}
                          </span>
                        </span>

                        <span className="inline-flex items-center gap-1 text-[#57534E]">
                          <Clock className="w-3 h-3 text-[#D97706]" />
                          <span>{entry.visitedAtLabel}</span>
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h4
                            className="text-lg font-normal text-[#1A1A1A]"
                            style={{fontFamily: 'var(--font-display), serif'}}
                          >
                            {entry.reference}
                          </h4>
                          {isCurrentlyActive && (
                            <span className="px-2 py-0.5 rounded bg-[#D97706]/20 text-[#92400E] font-mono text-[10px] font-semibold">
                              Currently Open
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#44403C] mt-0.5">
                          {entry.title}
                        </p>
                      </div>

                      {/* Saved Workflow Metadata */}
                      <div className="p-2.5 rounded-xl bg-[#F9F6F0] border border-[#E5DEC9] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#57534E]">
                        <span>
                          Anchor:{' '}
                          <strong className="text-[#1A1A1A]">
                            v.{entry.verseNumber}
                          </strong>
                        </span>
                        <span>·</span>
                        <span>
                          {entry.readingMode === 'single'
                            ? `Single (${entry.activeTranslation})`
                            : `Parallel (${entry.parallelTranslations.join('·')})`}
                        </span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1 text-[#4A5D4E]">
                          <Clock className="w-3 h-3" />
                          <span>{entry.estimatedReadTime || '2 min read'}</span>
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectRecentReadEntry(entry)}
                        className={`w-full min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center justify-between transition-colors cursor-pointer ${
                          isCurrentlyActive
                            ? 'bg-[#1A1A1A] text-[#F9F6F0] hover:bg-[#292524]'
                            : 'bg-[#F2ECE1] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-[#F9F6F0] border border-[#E5DEC9]'
                        }`}
                      >
                        <span>
                          {isCurrentlyActive
                            ? `Focus ${entry.reference} (v.${entry.verseNumber})`
                            : `Jump Back Into ${entry.reference}`}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#D97706]" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 sm:p-5 bg-[#F2ECE1] border-t border-[#E5DEC9] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetRecentReads}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F9F6F0] hover:bg-[#E5DEC9] border border-[#E5DEC9] text-xs font-medium text-[#57534E] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Reset 5-Passage Queue</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsRecentReadsDrawerOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#1A1A1A] text-[#F9F6F0] text-xs font-semibold hover:bg-[#292524] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full-Page Bible Reader Modal Overlay (Supports All 5 Current Versions: AKJV, AMP, NASB, NIV, NLT) */}
      {isFullPageReaderOpen && (
        <FullPageBibleReader
          initialChapterId={fullPageCustomChapterId || selectedPassageId}
          initialVersion={
            readingMode === 'single'
              ? singleFocusVersion
              : selectedVersions[0] || 'AMP'
          }
          isNightSanctuary={isNightSanctuary}
          onEngageContent={onEngageContent}
          isOverlay={true}
          onCloseOverlay={() => {
            setIsFullPageReaderOpen(false);
            setFullPageCustomChapterId(null);
          }}
        />
      )}
    </section>
  );
}
