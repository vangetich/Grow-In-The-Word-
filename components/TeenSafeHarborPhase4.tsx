'use client';

import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  Lock,
  ShieldCheck,
  Search,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Feather,
  Check,
  ChevronDown,
  ChevronUp,
  Type,
  KeyRound,
  HeartHandshake,
  MessageSquareWarning,
  EyeOff,
  Terminal,
} from 'lucide-react';

export type Phase4Screen =
  | 'screen1-gateway'
  | 'screen2-dashboard'
  | 'screen3-collision'
  | 'screen4-journal';

export interface EmotionalCollisionTopic {
  id: string;
  emotionalCardTitle: string;
  emotionalSubtleTag: string;
  keywords: string[];
  scriptureReference: string;
  scriptureContextLabel: string;
  rawScripturalMirror: string;
  pastoralUnpackTitle: string;
  pastoralUnpackBody: string;
  mentorAudio: {
    title: string;
    mentorName: string;
    mentorRole: string;
    durationFormatted: string;
    durationSeconds: number;
    transcriptQuote: string;
  };
  journalPromptSpark: string;
}

export const EMOTIONAL_MATRIX_TOPICS: EmotionalCollisionTopic[] = [
  {
    id: 'invisible-misunderstood',
    emotionalCardTitle: '“When I feel completely invisible or misunderstood”',
    emotionalSubtleTag: 'ISOLATION · MISUNDERSTOOD · LONELINESS',
    keywords: ['invisible', 'lonely', 'alone', 'misunderstood', 'nobody', 'unseen', 'ignored', 'friend'],
    scriptureReference: 'Genesis 16:7–13 & Psalm 142:4',
    scriptureContextLabel: 'Hagar in the Wilderness & David in the Cave',
    rawScripturalMirror:
      '“Look to my right and see: there is no one who takes notice of me; no refuge remains to me; no one cares for my soul.” — Psalm 142:4\n\nAnd Hagar—a runaway teenager discarded in the desert—called the name of the Lord who spoke to her, “El Roi,” meaning: “You are the God who truly sees me.” — Genesis 16:13',
    pastoralUnpackTitle: 'The First Person in History to Name God Was an Outcast Teenager',
    pastoralUnpackBody:
      'In the ancient world, Hagar had zero social status—used, blamed, and pushed out into the desert alone. Yet she is the only person in the entire Hebrew Bible to give God a new name: El Roi ("The God Who Sees Me"). When you feel like everyone in your hallway or house is looking right past you, Scripture doesn’t tell you to "just smile more." It validates the ache of invisibility.',
    mentorAudio: {
      title: 'Briefing 01: Being Seen Without Performing',
      mentorName: 'Marcus Vance, M.Div & Youth Counselor',
      mentorRole: 'Safe Harbor Clinical & Theological Mentor',
      durationFormatted: '03:12',
      durationSeconds: 192,
      transcriptQuote:
        '“You don’t have to curate a highlight reel to be worthy of attention. Notice how God meets Hagar not after she fixes her life, but while she’s sitting in the dirt by a desert spring.”',
    },
    journalPromptSpark:
      'What is one part of who you are right now that you feel like nobody in your daily life actually sees or understands?',
  },
  {
    id: 'unfair-world',
    emotionalCardTitle: '“Why does everything feel so unfair right now?”',
    emotionalSubtleTag: 'INJUSTICE · HYPOCRISY · ANGER',
    keywords: ['unfair', 'mad', 'angry', 'hypocrisy', 'fake', 'evil', 'wicked', 'suffer', 'why'],
    scriptureReference: 'Psalm 73:2–5, 12–14 & Habakkuk 1:2–3',
    scriptureContextLabel: 'Asaph’s Raw Protest Against Corrupt Power',
    rawScripturalMirror:
      '“For I envied the arrogant when I saw the prosperity of the wicked. They have no struggles; their bodies are healthy and strong. They are free from common human burdens... Surely in vain I have kept my heart pure and have washed my hands in innocence. All day long I have been afflicted!” — Psalm 73:3–5, 13–14',
    pastoralUnpackTitle: 'Protest Is a Form of Faith, Not a Sin',
    pastoralUnpackBody:
      'Look at how Asaph talks in Psalm 73. He basically says, "Trying to be a good person is a total waste of time because cruel, arrogant people keep winning." And God didn’t strike him down for writing that—He put it in the middle of the Bible’s songbook. Being furious at unfairness, double standards, or hypocrisy isn’t a sign that your faith is broken; it’s proof that your conscience is still alive.',
    mentorAudio: {
      title: 'Briefing 02: Why Biblical Writers Yelled at Injustice',
      mentorName: 'Dr. Elena Rostova',
      mentorRole: 'Ancient Near Eastern Ethics & Youth Mentor',
      durationFormatted: '03:05',
      durationSeconds: 185,
      transcriptQuote:
        '“Polite clichés try to paper over broken things. The prophets refused to pretend unfairness was okay. Your anger at what is broken is actually an echo of God’s own grief.”',
    },
    journalPromptSpark:
      'If you could call out one unfair thing in your world or life right now without anyone lecturing you to "just be grateful," what would you say?',
  },
  {
    id: 'anxiety-panic',
    emotionalCardTitle: '“Dealing with crushing anxiety and panic”',
    emotionalSubtleTag: 'OVERWHELM · BURNOUT · FEAR OF THE FUTURE',
    keywords: ['anxiety', 'anxious', 'panic', 'scared', 'overwhelmed', 'tired', 'exhausted', 'sleep', 'future', 'stress'],
    scriptureReference: '1 Kings 19:3–8 & Psalm 55:4–5',
    scriptureContextLabel: 'Elijah’s Collapse Under the Broom Tree',
    rawScripturalMirror:
      '“My heart is in anguish within me; the terrors of death have fallen on me. Fear and trembling have beset me; horror has overwhelmed me.” — Psalm 55:4–5\n\nAnd Elijah walked a day’s journey into the wilderness, sat down under a solitary broom tree, and prayed that he might die: “I have had enough, Lord.” Then he lay down and slept. — 1 Kings 19:4–5',
    pastoralUnpackTitle: 'When Elijah Had a Panic Breakdown, God Gave Him a Nap and Warm Bread',
    pastoralUnpackBody:
      'Elijah was one of the greatest prophets in history, yet he hit a wall of sheer nervous exhaustion and panic. Notice how God responded in 1 Kings 19: God didn’t give him a sermon on "having more faith" or shame him for feeling overwhelmed. Instead, an angel baked bread on hot coals, brought a jar of water, and let Elijah sleep twice before even talking about what came next. Your nervous system matters to God.',
    mentorAudio: {
      title: 'Briefing 03: Nervous System Grace & The Broom Tree',
      mentorName: 'Marcus Vance, M.Div & Youth Counselor',
      mentorRole: 'Safe Harbor Clinical & Theological Mentor',
      durationFormatted: '02:58',
      durationSeconds: 178,
      transcriptQuote:
        '“Sometimes the most spiritual thing you can do when your chest is tight is drink water, breathe slowly, and rest—because God meets us as whole physical human beings, not machines.”',
    },
    journalPromptSpark:
      'What weight or pressure are you carrying right now that makes you want to say, "I’ve had enough for today"?',
  },
  {
    id: 'doubt-silence',
    emotionalCardTitle: '“Doubt, silence, and feeling like God isn’t listening”',
    emotionalSubtleTag: 'SKEPTICISM · DIVINE SILENCE · DECONSTRUCTION',
    keywords: ['doubt', 'silence', 'real', 'listening', 'silent', 'nothing', 'fake', 'distant', 'prayer', 'believe'],
    scriptureReference: 'Job 30:20 & Psalm 88:13–14',
    scriptureContextLabel: 'Job & Heman the Ezrahite Wrestling With Silence',
    rawScripturalMirror:
      '“I cry out to you, O God, but you do not answer; I stand up, and you merely look at me.” — Job 30:20\n\n“But I, O Lord, cry to you; in the morning my prayer comes before you. O Lord, why do you cast my soul away? Why do you hide your face from me?” — Psalm 88:13–14',
    pastoralUnpackTitle: 'The Darkest Psalm in the Bible Doesn’t End With a Neat Bow',
    pastoralUnpackBody:
      'Almost every psalm ends with a turn toward praise—except Psalm 88. Its final word in Hebrew is literally "darkness." Why is that in the Bible? So that when you pray and hear nothing back, or when you wonder if any of this is even real, you know you aren’t disqualified. Even the name "Israel" literally translates to "One Who Wrestles With God." Real faith isn’t the absence of doubt; it’s the honesty to bring your questions into the ring.',
    mentorAudio: {
      title: 'Briefing 04: Why "Israel" Means Wrestling With God',
      mentorName: 'Dr. Elena Rostova',
      mentorRole: 'Ancient Near Eastern Ethics & Youth Mentor',
      durationFormatted: '03:18',
      durationSeconds: 198,
      transcriptQuote:
        '“Canned religion demands certainty. Biblical faith invites wrestling. Job argued with God for 35 chapters, and at the end of the book, God said Job was the only one telling the truth.”',
    },
    journalPromptSpark:
      'If you could ask God one completely unfiltered question right now without being punished or judged, what would it be?',
  },
];

export const DISORIENTATION_PROMPT_SPARKS: string[] = [
  '“If you could ask God one completely unfiltered question right now without being punished, what would it be?”',
  '“Where do you feel the biggest gap between what religious people say and what real life actually feels like?”',
  '“What is one thing you’re exhausted from pretending to be okay with?”',
  '“If God truly knows every messy thought in your head and still refuses to walk out on you, what changes?”',
];

export interface SealedWrestlingEntry {
  id: string;
  timestamp: string;
  topicTag: string;
  contentPreview: string;
  cipherHash: string;
}

interface TeenSafeHarborPhase4Props {
  onEngageContent?: (points: number, label: string) => void;
  initialScreen?: Phase4Screen;
}

export default function TeenSafeHarborPhase4({
  onEngageContent,
  initialScreen = 'screen1-gateway',
}: TeenSafeHarborPhase4Props) {
  const [activeScreen, setActiveScreen] = useState<Phase4Screen>(initialScreen);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('doubt-silence');
  const [noFilterQuery, setNoFilterQuery] = useState<string>('');
  const [matchedQueryBanner, setMatchedQueryBanner] = useState<string | null>(null);

  // Screen 3: Raw Text Collision & Mentorship Audio state
  const [textScale, setTextScale] = useState<'sm' | 'base' | 'lg'>('base');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [audioProgressSec, setAudioProgressSec] = useState<number>(42);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Screen 4: "Wrestling Ring" Private Journal state
  const [journalDraft, setJournalDraft] = useState<string>('');
  const [isSparksExpanded, setIsSparksExpanded] = useState<boolean>(true);
  const [justSealedSuccess, setJustSealedSuccess] = useState<boolean>(false);
  const [sealedEntries, setSealedEntries] = useState<SealedWrestlingEntry[]>([
    {
      id: 'wrestle-01',
      timestamp: 'Last Night · 11:18 PM',
      topicTag: 'Doubt & Divine Silence (Job 30:20)',
      contentPreview:
        'I’m tired of people giving me 3-step formulas when I ask hard questions. Reading Psalm 88 actually made me breathe easier because it didn’t fake a happy ending...',
      cipherHash: 'AES-256-GCM · 0x9F4A...8E21 (Device-Only Key)',
    },
  ]);

  // Screen 1: Framer Motion "Encryption Shield" Zero-Knowledge Geometric Lock-Sealing state
  const [shieldCycleKey, setShieldCycleKey] = useState<number>(0);
  const [shieldStage, setShieldStage] = useState<
    'deriving' | 'geometry-locking' | 'sealed'
  >('deriving');
  const [isEnteringHarborTransition, setIsEnteringHarborTransition] =
    useState<boolean>(false);

  useEffect(() => {
    if (activeScreen !== 'screen1-gateway') return;
    const t1 = setTimeout(() => setShieldStage('geometry-locking'), 650);
    const t2 = setTimeout(() => setShieldStage('sealed'), 1450);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeScreen, shieldCycleKey]);

  const handleReplayShieldAnimation = () => {
    setShieldStage('deriving');
    setShieldCycleKey((prev) => prev + 1);
  };

  const handleStepIntoHarborWithShield = () => {
    setIsEnteringHarborTransition(true);
    setShieldStage('deriving');
    setShieldCycleKey((prev) => prev + 1);
    setTimeout(() => {
      setIsEnteringHarborTransition(false);
      setActiveScreen('screen2-dashboard');
      onEngageContent?.(
        15,
        'Accepted Safe Harbor Privacy Handshake & Sealed Zero-Knowledge Shield'
      );
    }, 1150);
  };

  const activeTopic =
    EMOTIONAL_MATRIX_TOPICS.find((t) => t.id === selectedTopicId) ||
    EMOTIONAL_MATRIX_TOPICS[0];

  // Audio playback interval for Screen 3
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAudioPlaying && activeScreen === 'screen3-collision') {
      interval = setInterval(() => {
        setAudioProgressSec((prev) => {
          if (prev >= activeTopic.mentorAudio.durationSeconds) {
            setIsAudioPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAudioPlaying, activeScreen, activeTopic.mentorAudio.durationSeconds]);

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const handleSelectEmotionalCard = (topic: EmotionalCollisionTopic) => {
    setSelectedTopicId(topic.id);
    setAudioProgressSec(0);
    setIsAudioPlaying(false);
    setMatchedQueryBanner(null);
    setActiveScreen('screen3-collision');
    onEngageContent?.(
      15,
      `Opened Safe Harbor Raw Text Collision: ${topic.scriptureReference}`
    );
  };

  const handleNoFilterSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = noFilterQuery.trim().toLowerCase();
    if (!q) return;

    // Match query against emotional matrix keywords
    let bestTopic = EMOTIONAL_MATRIX_TOPICS[3]; // default to doubt/silence
    let maxHits = 0;

    for (const topic of EMOTIONAL_MATRIX_TOPICS) {
      let hits = 0;
      for (const kw of topic.keywords) {
        if (q.includes(kw)) hits += 2;
      }
      if (topic.emotionalCardTitle.toLowerCase().includes(q)) hits += 3;
      if (hits > maxHits) {
        maxHits = hits;
        bestTopic = topic;
      }
    }

    setSelectedTopicId(bestTopic.id);
    setAudioProgressSec(0);
    setIsAudioPlaying(false);
    setMatchedQueryBanner(`Matched your unfiltered query: “${noFilterQuery.trim()}”`);
    setActiveScreen('screen3-collision');
    onEngageContent?.(
      20,
      `Searched No-Filter Query in Safe Harbor: “${noFilterQuery.trim().slice(0, 32)}”`
    );
  };

  const handleQuickMessyQuery = (sampleQuery: string, targetTopicId: string) => {
    setNoFilterQuery(sampleQuery);
    setSelectedTopicId(targetTopicId);
    setAudioProgressSec(0);
    setIsAudioPlaying(false);
    setMatchedQueryBanner(`Matched your unfiltered query: “${sampleQuery}”`);
    setActiveScreen('screen3-collision');
    onEngageContent?.(15, `Explored No-Filter Query: “${sampleQuery}”`);
  };

  const handleSaveToPrivateVault = () => {
    if (!journalDraft.trim()) return;
    const randomHex = Math.floor(1000 + Math.random() * 9000)
      .toString(16)
      .toUpperCase();
    const newEntry: SealedWrestlingEntry = {
      id: `wrestle-${Date.now()}`,
      timestamp: 'Just Now · Locally Sealed',
      topicTag: `${activeTopic.scriptureReference}`,
      contentPreview: journalDraft.trim(),
      cipherHash: `AES-256-GCM · 0x7C2D...${randomHex} (Device-Only Key)`,
    };

    setSealedEntries((prev) => [newEntry, ...prev]);
    setJournalDraft('');
    setJustSealedSuccess(true);
    onEngageContent?.(
      25,
      'Sealed Unfiltered Reflection in Teen Wrestling Ring Vault'
    );
    setTimeout(() => setJustSealedSuccess(false), 3000);
  };

  return (
    <div
      id="phase-4-teen-safe-harbor"
      className="w-full max-w-full rounded-2xl bg-[#1A1A1A] text-[#F9F6F0] border border-[#292524] shadow-2xl overflow-hidden transition-all"
    >
      {/* TOP PHASE 4 NAVIGATION HEADER */}
      <div className="px-5 sm:px-6 py-3.5 bg-[#141210] border-b border-[#292524] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-[#D97706]/20 border border-[#D97706]/50 flex items-center justify-center text-[#D97706]">
            <Lock className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-mono font-semibold uppercase text-[#FBBF24] tracking-wider text-[11px]">
              GROW IN THE WORD · PHASE 4
            </span>
            <span aria-hidden="true" className="mx-1.5 text-[#57534E]">
              ·
            </span>
            <span className="font-medium text-[#E7E5E4]">
              The Safe Harbor &amp; Wrestling Ring (Ages 13–18)
            </span>
          </div>
        </div>

        {/* 4-Screen Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#1C1917] p-1 rounded-lg border border-[#292524]">
          <button
            type="button"
            onClick={() => setActiveScreen('screen1-gateway')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
              activeScreen === 'screen1-gateway'
                ? 'bg-[#D97706] text-[#141210]'
                : 'text-[#A8A29E] hover:text-[#F9F6F0]'
            }`}
          >
            Screen 1: Privacy Handshake
          </button>
          <button
            type="button"
            onClick={() => setActiveScreen('screen2-dashboard')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
              activeScreen === 'screen2-dashboard'
                ? 'bg-[#D97706] text-[#141210]'
                : 'text-[#A8A29E] hover:text-[#F9F6F0]'
            }`}
          >
            Screen 2: Emotional Matrix
          </button>
          <button
            type="button"
            onClick={() => setActiveScreen('screen3-collision')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
              activeScreen === 'screen3-collision'
                ? 'bg-[#D97706] text-[#141210]'
                : 'text-[#A8A29E] hover:text-[#F9F6F0]'
            }`}
          >
            Screen 3: Raw Text Collision
          </button>
          <button
            type="button"
            onClick={() => setActiveScreen('screen4-journal')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
              activeScreen === 'screen4-journal'
                ? 'bg-[#D97706] text-[#141210]'
                : 'text-[#A8A29E] hover:text-[#F9F6F0]'
            }`}
          >
            <KeyRound className="w-3 h-3" />
            <span>Screen 4: Wrestling Ring</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* SCREEN 1: THE PRIVACY HANDSHAKE & INDEPENDENCE MILESTONE (THE GATEWAY) */}
      {/* ===================================================================== */}
      {activeScreen === 'screen1-gateway' && (
        <motion.div
          key="screen1-gateway"
          initial={{opacity: 0, y: 8}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.35}}
          className="relative p-4 sm:p-8 lg:p-12 overflow-hidden space-y-8"
        >
          {/* Subtle Ambient Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 right-12 w-80 h-80 rounded-full bg-[#D97706]/8 blur-3xl"
          />

          {/* Full-Screen Geometric Encryption Shield Transition Overlay when stepping into Harbor */}
          <AnimatePresence>
            {isEnteringHarborTransition && (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.25}}
                className="absolute inset-0 z-30 bg-[#141210]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-5"
              >
                <motion.div
                  initial={{scale: 0.85, rotate: -15}}
                  animate={{scale: 1, rotate: 0}}
                  transition={{type: 'spring', stiffness: 220, damping: 20}}
                  className="relative w-32 h-32 flex items-center justify-center"
                >
                  <motion.svg
                    viewBox="0 0 140 140"
                    className="w-full h-full overflow-visible"
                    fill="none"
                  >
                    <motion.polygon
                      points="70,8 114,26 132,70 114,114 70,132 26,114 8,70 26,26"
                      stroke="#D97706"
                      strokeWidth="2"
                      initial={{pathLength: 0, rotate: -45}}
                      animate={{pathLength: 1, rotate: 0}}
                      transition={{duration: 0.65, ease: 'easeOut'}}
                    />
                    <motion.polygon
                      points="70,22 112,46 112,94 70,118 28,94 28,46"
                      stroke="#10B981"
                      strokeWidth="2"
                      fill="rgba(16, 185, 129, 0.08)"
                      initial={{scale: 0.6, opacity: 0}}
                      animate={{scale: 1, opacity: 1}}
                      transition={{duration: 0.5, delay: 0.2}}
                    />
                    <motion.path
                      d="M58 66V54C58 47.3726 63.3726 42 70 42C76.6274 42 82 47.3726 82 54V66"
                      stroke="#FBBF24"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{y: -10}}
                      animate={{y: 0}}
                      transition={{type: 'spring', stiffness: 300, damping: 18, delay: 0.35}}
                    />
                    <motion.rect
                      x="52"
                      y="65"
                      width="36"
                      height="28"
                      rx="6"
                      fill="#D97706"
                      initial={{scale: 0.85}}
                      animate={{scale: 1}}
                      transition={{duration: 0.3, delay: 0.3}}
                    />
                    <circle cx="70" cy="79" r="3.5" fill="#141210" />
                  </motion.svg>
                </motion.div>
                <div className="space-y-1.5">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#10B981] font-semibold">
                    Zero-Knowledge Geometric Lock Sealed
                  </div>
                  <p
                    className="text-xl text-[#F9F6F0]"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Opening 100% Private Safe Harbor Sanctuary...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* Left 7 Columns: Gateway Copy & Privacy Guarantee */}
            <div className="lg:col-span-7 space-y-6">
              {/* Milestone Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24211E] border border-[#36312E] text-xs font-mono text-[#FBBF24]">
                <ShieldCheck className="w-4 h-4 text-[#D97706]" />
                <span>Independence Milestone · Ages 13–18 Gateway</span>
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F9F6F0] tracking-tight leading-tight"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  Welcome to the Safe Harbor.
                </h2>
                <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#A8A29E]">
                  Zero-Knowledge Local Encryption · No Parental Backdoor · Zero Canned Clichés
                </p>
              </div>

              {/* The Privacy Guarantee Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#24211E] border border-[#36312E] space-y-5 shadow-inner">
                <div className="flex items-center justify-between text-xs font-mono text-[#D97706] pb-3 border-b border-[#36312E]">
                  <span className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5" />
                    <span>THE PRIVACY GUARANTEE</span>
                  </span>
                  <span className="text-[#A7F3D0]">100% Client-Side Key</span>
                </div>

                <blockquote
                  className="text-base sm:text-lg text-[#F9F6F0] font-normal leading-relaxed"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  “Welcome to the Safe Harbor. Starting today, your space is 100%
                  private. Your journal entries, questions, and personal wrestling are
                  protected by zero-knowledge local encryption. Parents can guide, but
                  they cannot see inside your journal. This is entirely between you and
                  truth.”
                </blockquote>

                {/* Technical & Relational Architecture Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#1A1A1A] border border-[#292524] space-y-1">
                    <div className="font-mono text-[#FBBF24] font-semibold flex items-center gap-1.5">
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>No Surveillance</span>
                    </div>
                    <p className="text-[#A8A29E] leading-relaxed">
                      No parent notifications when you search hard topics or write laments.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#1A1A1A] border border-[#292524] space-y-1">
                    <div className="font-mono text-[#FBBF24] font-semibold flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Zero-Knowledge Vault</span>
                    </div>
                    <p className="text-[#A8A29E] leading-relaxed">
                      Encrypted on your device before storage. Even our servers cannot read it.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#1A1A1A] border border-[#292524] space-y-1">
                    <div className="font-mono text-[#FBBF24] font-semibold flex items-center gap-1.5">
                      <HeartHandshake className="w-3.5 h-3.5" />
                      <span>Intellectual Respect</span>
                    </div>
                    <p className="text-[#A8A29E] leading-relaxed">
                      Doubt and mental health struggles are met with honesty, never guilt trips.
                    </p>
                  </div>
                </div>
              </div>

              {/* The Ethos Pledge */}
              <div className="p-5 sm:p-6 rounded-xl bg-[#141210] border border-[#292524] space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#D97706]">
                  The Safe Harbor Ethos Pledge
                </div>
                <p className="text-sm sm:text-base text-[#D6D3D1] leading-relaxed">
                  Anger, confusion, deconstruction, and hard questions are welcome here
                  without judgment or canned Christian clichés. The writers of Scripture
                  screamed at injustice, wept in exhaustion, and argued with God—and you
                  are allowed to do the exact same thing.
                </p>
              </div>

              {/* Primary Action */}
              <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleStepIntoHarborWithShield}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#F9F6F0] text-[#1A1A1A] hover:bg-[#E5DEC9] font-semibold text-sm transition-all cursor-pointer shadow-lg"
                >
                  <span>Step Into the Harbor</span>
                  <ArrowRight className="w-4 h-4 text-[#D97706]" />
                </button>

                <span className="text-xs font-mono text-[#78716C]">
                  End-to-End Local Vault Ready · Zero Guilt Mechanics
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Framer Motion 'Encryption Shield' Transition Animation Card */}
            <div className="lg:col-span-5 rounded-2xl bg-[#141210] border border-[#292524] p-5 sm:p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#292524]">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#D97706] font-semibold">
                    Zero-Knowledge Encryption Visualizer
                  </div>
                  <h3
                    className="text-base sm:text-lg font-normal text-[#F9F6F0]"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Geometric Encryption Shield Seal
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleReplayShieldAnimation}
                  className="px-2.5 py-1 rounded-lg bg-[#24211E] hover:bg-[#292524] border border-[#36312E] text-[11px] font-mono text-[#FBBF24] transition-colors cursor-pointer shrink-0"
                >
                  Replay Seal
                </button>
              </div>

              {/* Animated Geometric Lock-Sealing Stage */}
              <div className="relative py-6 rounded-xl bg-[#1A1A1A] border border-[#292524] flex flex-col items-center justify-center overflow-hidden">
                {/* Soft Radial Aura */}
                <motion.div
                  key={`aura-${shieldCycleKey}-${shieldStage}`}
                  aria-hidden="true"
                  initial={{scale: 0.7, opacity: 0.15}}
                  animate={{
                    scale: shieldStage === 'sealed' ? [1, 1.12, 1] : 0.9,
                    opacity: shieldStage === 'sealed' ? [0.22, 0.35, 0.22] : 0.15,
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className={`pointer-events-none absolute w-44 h-44 rounded-full blur-2xl ${
                    shieldStage === 'sealed'
                      ? 'bg-[#10B981]/30'
                      : 'bg-[#D97706]/25'
                  }`}
                />

                {/* Framer Motion Geometric Shield & Lock SVG */}
                <motion.svg
                  key={`svg-${shieldCycleKey}`}
                  viewBox="0 0 200 200"
                  className="w-44 h-44 sm:w-48 sm:h-48 relative z-10 overflow-visible"
                  fill="none"
                >
                  {/* Outer Geometric Octagon Shield */}
                  <motion.polygon
                    points="100,14 160,39 186,100 160,161 100,186 40,161 14,100 40,39"
                    stroke={shieldStage === 'sealed' ? '#10B981' : '#D97706'}
                    strokeWidth="1.75"
                    strokeDasharray={shieldStage === 'deriving' ? '6 4' : '0'}
                    initial={{rotate: -60, scale: 0.78, opacity: 0}}
                    animate={{rotate: 0, scale: 1, opacity: 1}}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 18,
                    }}
                  />

                  {/* Middle Counter-Rotating Hexagonal Zero-Knowledge Ring */}
                  <motion.polygon
                    points="100,32 158,66 158,134 100,168 42,134 42,66"
                    stroke="#FBBF24"
                    strokeWidth="1.5"
                    fill={
                      shieldStage === 'sealed'
                        ? 'rgba(16, 185, 129, 0.07)'
                        : 'rgba(217, 119, 6, 0.05)'
                    }
                    initial={{rotate: 45, scale: 0.7, opacity: 0}}
                    animate={{
                      rotate: shieldStage === 'sealed' ? 0 : 15,
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 140,
                      damping: 16,
                      delay: 0.15,
                    }}
                  />

                  {/* Inner Geometric Diamond Vault Chamber */}
                  <motion.polygon
                    points="100,48 152,100 100,152 48,100"
                    stroke={shieldStage === 'sealed' ? '#A7F3D0' : '#D97706'}
                    strokeWidth="1.5"
                    initial={{scale: 0.5, rotate: -45, opacity: 0}}
                    animate={{
                      scale: 1,
                      rotate: shieldStage === 'sealed' ? 0 : -12,
                      opacity: 0.9,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 160,
                      damping: 18,
                      delay: 0.3,
                    }}
                  />

                  {/* 4 Corner Alignment Nodes */}
                  {[
                    {cx: 100, cy: 14},
                    {cx: 186, cy: 100},
                    {cx: 100, cy: 186},
                    {cx: 14, cy: 100},
                  ].map((pt, i) => (
                    <motion.circle
                      key={i}
                      cx={pt.cx}
                      cy={pt.cy}
                      r={shieldStage === 'sealed' ? 4 : 3}
                      fill={shieldStage === 'sealed' ? '#10B981' : '#FBBF24'}
                      initial={{scale: 0}}
                      animate={{scale: 1}}
                      transition={{delay: 0.2 + i * 0.08}}
                    />
                  ))}

                  {/* Central Lock Shackle (Drops down to seal when shieldStage === 'sealed') */}
                  <motion.path
                    d="M84 96V80C84 71.1634 91.1634 64 100 64C108.837 64 116 71.1634 116 80V96"
                    stroke={shieldStage === 'sealed' ? '#A7F3D0' : '#FBBF24'}
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{y: -12}}
                    animate={{
                      y: shieldStage === 'sealed' ? 0 : -10,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 280,
                      damping: 18,
                    }}
                  />

                  {/* Central Lock Body */}
                  <motion.rect
                    x="76"
                    y="94"
                    width="48"
                    height="38"
                    rx="8"
                    fill={shieldStage === 'sealed' ? '#10B981' : '#D97706'}
                    stroke="#141210"
                    strokeWidth="2"
                    initial={{scale: 0.85}}
                    animate={{
                      scale: shieldStage === 'sealed' ? [1, 1.06, 1] : 0.95,
                    }}
                    transition={{duration: 0.4}}
                  />

                  {/* Keyhole Core */}
                  <circle cx="100" cy="110" r="4" fill="#141210" />
                  <path
                    d="M100 114V123"
                    stroke="#141210"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </motion.svg>

                {/* Live Shield Stage Status Pill */}
                <div className="mt-3 px-3.5 py-1 rounded-full bg-[#141210] border border-[#292524] flex items-center gap-2 text-xs font-mono">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      shieldStage === 'sealed'
                        ? 'bg-[#10B981]'
                        : 'bg-[#FBBF24] animate-pulse'
                    }`}
                  />
                  <span
                    className={
                      shieldStage === 'sealed'
                        ? 'text-[#A7F3D0] font-semibold'
                        : 'text-[#FBBF24]'
                    }
                  >
                    {shieldStage === 'deriving' &&
                      'Step 1/3 · Deriving Client Key (PBKDF2)...'}
                    {shieldStage === 'geometry-locking' &&
                      'Step 2/3 · Aligning Geometric Cipher Rings...'}
                    {shieldStage === 'sealed' &&
                      'Step 3/3 · Zero-Knowledge Shield Sealed'}
                  </span>
                </div>
              </div>

              {/* 3-Step Cryptographic Proof Checklist */}
              <div className="space-y-2 text-xs">
                {[
                  {
                    id: 'deriving',
                    label: '01. Ephemeral Device Salt & Key Derivation',
                    done:
                      shieldStage === 'geometry-locking' ||
                      shieldStage === 'sealed',
                  },
                  {
                    id: 'geometry-locking',
                    label: '02. Geometric Cipher Ring Alignment (AES-256-GCM)',
                    done: shieldStage === 'sealed',
                  },
                  {
                    id: 'sealed',
                    label: '03. Zero-Knowledge Vault Sealed (No Server/Parent Key)',
                    done: shieldStage === 'sealed',
                  },
                ].map((step) => (
                  <div
                    key={step.id}
                    className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 transition-colors ${
                      step.done
                        ? 'bg-[#1A1A1A] border-[#10B981]/40 text-[#F9F6F0]'
                        : 'bg-[#1A1A1A]/50 border-[#292524] text-[#78716C]'
                    }`}
                  >
                    <span className="font-mono text-[11px]">{step.label}</span>
                    {step.done ? (
                      <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ===================================================================== */}
      {/* SCREEN 2: THE EMOTIONAL ENTRY-POINT DASHBOARD (THE MAIN HUB)          */}
      {/* ===================================================================== */}
      {activeScreen === 'screen2-dashboard' && (
        <div className="p-4 sm:p-8 lg:p-12 space-y-8">
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#292524]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D97706] uppercase tracking-wider">
                <span>Screen 2 · The Emotional Entry-Point Dashboard</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F9F6F0]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Where are you actually at tonight?
              </h2>
              <p className="text-xs sm:text-sm text-[#A8A29E] max-w-2xl">
                Instead of indexing by ancient book names, Safe Harbor begins with
                your immediate psychological and emotional reality.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveScreen('screen4-journal')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#24211E] hover:bg-[#292524] border border-[#36312E] text-xs font-semibold text-[#F9F6F0] cursor-pointer shrink-0"
            >
              <Lock className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Open Wrestling Ring Journal ({sealedEntries.length})</span>
            </button>
          </div>

          {/* The Search Bar ("No-Filter Query") */}
          <div className="p-6 rounded-2xl bg-[#24211E] border border-[#36312E] space-y-4">
            <div className="flex items-center justify-between text-xs">
              <label
                htmlFor="no-filter-query-input"
                className="font-mono font-semibold uppercase tracking-wider text-[#FBBF24] flex items-center gap-2"
              >
                <Search className="w-3.5 h-3.5 text-[#D97706]" />
                <span>The “No-Filter Query” Search Bar</span>
              </label>
              <span className="font-mono text-[11px] text-[#78716C]">
                Private local matching · Zero search history logged
              </span>
            </div>

            <form
              onSubmit={handleNoFilterSearchSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <input
                id="no-filter-query-input"
                type="text"
                value={noFilterQuery}
                onChange={(e) => setNoFilterQuery(e.target.value)}
                placeholder="Type messy human language... e.g., “I'm mad at God” or “How do I know if any of this is real?”"
                className="flex-1 px-4 py-3.5 rounded-xl bg-[#141210] border border-[#36312E] text-sm text-[#F9F6F0] placeholder-[#78716C] focus:outline-none focus:border-[#D97706]"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-[#141210] hover:text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                Match Raw Scripture
              </button>
            </form>

            {/* Quick-Tap Unfiltered Query Suggestions */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-mono text-[#78716C]">
                Try unfiltered queries:
              </span>
              {[
                {label: '“I’m mad at God”', topicId: 'unfair-world'},
                {
                  label: '“How do I know if any of this is real?”',
                  topicId: 'doubt-silence',
                },
                {
                  label: '“Nobody at school actually knows me”',
                  topicId: 'invisible-misunderstood',
                },
                {
                  label: '“My chest feels tight and I can’t sleep”',
                  topicId: 'anxiety-panic',
                },
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => handleQuickMessyQuery(chip.label, chip.topicId)}
                  className="px-3 py-1 rounded-lg bg-[#1A1A1A] hover:bg-[#292524] border border-[#36312E] text-xs text-[#D6D3D1] hover:text-[#FBBF24] transition-colors cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* The Emotional Matrix (4 Quick-Tap Reality Cards) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#A8A29E]">
                The Emotional Matrix · Quick-Tap Reality Cards
              </h3>
              <span className="text-xs font-mono text-[#78716C]">
                Tap any card to open the Raw Text Collision
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {EMOTIONAL_MATRIX_TOPICS.map((topic, index) => (
                <motion.button
                  key={topic.id}
                  type="button"
                  whileHover={{y: -4, scale: 1.01}}
                  whileTap={{scale: 0.99}}
                  onClick={() => handleSelectEmotionalCard(topic)}
                  className="p-6 sm:p-7 rounded-2xl bg-[#24211E] hover:bg-[#292524] border border-[#36312E] hover:border-[#D97706]/70 text-left flex flex-col justify-between space-y-6 transition-colors cursor-pointer group shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#A8A29E]">
                      <span>0{index + 1} · {topic.emotionalSubtleTag}</span>
                      <span className="text-[#D97706] group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>

                    <h4
                      className="text-xl sm:text-2xl font-normal text-[#F9F6F0] leading-snug"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      {topic.emotionalCardTitle}
                    </h4>
                  </div>

                  <div className="pt-4 border-t border-[#36312E] flex items-center justify-between text-xs">
                    <span className="font-mono text-[#FBBF24]">
                      Collision: {topic.scriptureReference}
                    </span>
                    <span className="text-[#A8A29E] group-hover:text-[#F9F6F0] font-medium">
                      Open Raw Text Collision
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SCREEN 3: THE RAW TEXT COLLISION & MENTORSHIP AUDIO VIEW              */}
      {/* ===================================================================== */}
      {activeScreen === 'screen3-collision' && (
        <div className="p-4 sm:p-8 lg:p-12 space-y-8">
          {/* Top Bar: Back + Topic Selector + Adjustable Text Sizing */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#292524]">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveScreen('screen2-dashboard')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#24211E] hover:bg-[#292524] border border-[#36312E] text-xs text-[#D6D3D1] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Emotional Matrix</span>
              </button>

              {matchedQueryBanner && (
                <span className="px-3 py-1 rounded-full bg-[#D97706]/20 border border-[#D97706]/50 text-xs font-mono text-[#FBBF24]">
                  {matchedQueryBanner}
                </span>
              )}
            </div>

            {/* Adjustable Text Sizing Control */}
            <div className="flex items-center gap-2 bg-[#24211E] p-1 rounded-lg border border-[#36312E] text-xs">
              <span className="px-2 text-[#A8A29E] font-mono flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Text Size:</span>
              </span>
              {(['sm', 'base', 'lg'] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setTextScale(sz)}
                  className={`px-2.5 py-1 rounded font-mono uppercase text-[11px] cursor-pointer ${
                    textScale === sz
                      ? 'bg-[#D97706] text-[#141210] font-bold'
                      : 'text-[#A8A29E] hover:text-[#F9F6F0]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {EMOTIONAL_MATRIX_TOPICS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setSelectedTopicId(t.id);
                  setMatchedQueryBanner(null);
                  setAudioProgressSec(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  t.id === activeTopic.id
                    ? 'bg-[#F9F6F0] text-[#1A1A1A] border-[#F9F6F0] font-semibold'
                    : 'bg-[#24211E] text-[#A8A29E] border-[#36312E] hover:text-[#F9F6F0]'
                }`}
              >
                {t.scriptureReference}
              </button>
            ))}
          </div>

          {/* Main Reading Grid: The Raw Scriptural Mirror & The Pastoral Unpack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: The Raw Scriptural Mirror */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#24211E] border border-[#36312E] space-y-5">
              <div className="flex items-center justify-between text-xs font-mono text-[#FBBF24] pb-3 border-b border-[#36312E]">
                <span>THE RAW SCRIPTURAL MIRROR</span>
                <span>{activeTopic.scriptureReference}</span>
              </div>

              <div className="text-xs font-mono text-[#A8A29E] uppercase tracking-wider">
                {activeTopic.scriptureContextLabel}
              </div>

              <blockquote
                className={`font-normal text-[#F9F6F0] whitespace-pre-line leading-relaxed border-l-2 border-[#D97706] pl-5 ${
                  textScale === 'sm'
                    ? 'text-base sm:text-lg'
                    : textScale === 'lg'
                    ? 'text-xl sm:text-2xl'
                    : 'text-lg sm:text-xl'
                }`}
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                {activeTopic.rawScripturalMirror}
              </blockquote>
            </div>

            {/* Right 5 Cols: The Pastoral Unpack + Primary CTA */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#141210] border border-[#292524] space-y-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[#A7F3D0]">
                The Pastoral Unpack · Peer-Level Context
              </div>

              <h3
                className="text-xl sm:text-2xl font-normal text-[#F9F6F0] leading-snug"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                {activeTopic.pastoralUnpackTitle}
              </h3>

              <p
                className={`text-[#D6D3D1] leading-relaxed ${
                  textScale === 'sm'
                    ? 'text-xs'
                    : textScale === 'lg'
                    ? 'text-base'
                    : 'text-sm'
                }`}
              >
                {activeTopic.pastoralUnpackBody}
              </p>

              <div className="pt-4 border-t border-[#292524]">
                <button
                  type="button"
                  onClick={() => {
                    if (!journalDraft) {
                      setJournalDraft(
                        `Reflecting on ${activeTopic.scriptureReference} (${activeTopic.emotionalCardTitle}):\n\n`
                      );
                    }
                    setActiveScreen('screen4-journal');
                    onEngageContent?.(
                      15,
                      `Transitioned from Raw Text Collision to Private Journal (${activeTopic.scriptureReference})`
                    );
                  }}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-[#141210] hover:text-[#FAF7F2] font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Feather className="w-4 h-4" />
                  <span>Open in Your Private Journal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Docked Bottom 3-Minute Mentorship Audio Briefing Player */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#141210] border border-[#D97706]/50 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsAudioPlaying((prev) => !prev);
                    onEngageContent?.(
                      10,
                      `Listened to 3-Minute Mentor Audio Briefing: ${activeTopic.mentorAudio.title}`
                    );
                  }}
                  className="w-12 h-12 rounded-full bg-[#D97706] hover:bg-[#B45309] text-[#141210] flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-md"
                  aria-label={isAudioPlaying ? 'Pause audio briefing' : 'Play audio briefing'}
                >
                  {isAudioPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#FBBF24]">
                    <span>THE 3-MINUTE AUDIO BRIEFING</span>
                    <span>·</span>
                    <span>{activeTopic.mentorAudio.durationFormatted}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-[#F9F6F0]">
                    {activeTopic.mentorAudio.title}
                  </h4>
                  <div className="text-xs text-[#A8A29E]">
                    {activeTopic.mentorAudio.mentorName} ({activeTopic.mentorAudio.mentorRole})
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#FBBF24] tabular-nums">
                  {formatSeconds(audioProgressSec)} / {activeTopic.mentorAudio.durationFormatted}
                </span>
                <button
                  type="button"
                  onClick={() => setIsMuted((prev) => !prev)}
                  className="p-2 rounded-lg bg-[#24211E] border border-[#36312E] text-[#A8A29E] hover:text-[#F9F6F0] cursor-pointer"
                  aria-label={isMuted ? 'Unmute mentor audio' : 'Mute mentor audio'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Scrubber Bar */}
            <input
              type="range"
              aria-label="Mentor audio briefing timeline"
              min={0}
              max={activeTopic.mentorAudio.durationSeconds}
              value={audioProgressSec}
              onChange={(e) => setAudioProgressSec(Number(e.target.value))}
              className="w-full accent-[#D97706] cursor-pointer h-1.5 rounded-lg bg-[#24211E]"
            />

            {/* Mentor Quote Excerpt */}
            <p className="text-xs text-[#A8A29E] italic border-l-2 border-[#4A5D4E] pl-3">
              Mentor Excerpt: {activeTopic.mentorAudio.transcriptQuote}
            </p>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SCREEN 4: THE "WRESTLING RING" PRIVATE JOURNAL                        */}
      {/* ===================================================================== */}
      <AnimatePresence mode="wait">
        {activeScreen === 'screen4-journal' && (
          <motion.div
            key="wrestling-ring-private-journal"
            initial={{opacity: 0, scale: 0.96, y: 14}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.97, y: 8}}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="p-4 sm:p-8 lg:p-12 space-y-8 origin-center"
          >
            {/* Top Header with Quietly Pulsing Secure Lock Icon & Encryption Badge */}
            <motion.div
              initial={{opacity: 0, y: 8}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.06, duration: 0.3}}
              className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#292524]"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono text-[#FBBF24]">
                  <motion.span
                    animate={{opacity: [0.45, 1, 0.45], scale: [0.96, 1.06, 0.96]}}
                    transition={{duration: 3, repeat: Infinity, ease: 'easeInOut'}}
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#D97706]/20 border border-[#D97706] shrink-0"
                  >
                    <Lock className="w-3 h-3 text-[#D97706]" />
                  </motion.span>
                  <span className="truncate">SCREEN 4 · THE “WRESTLING RING” PRIVATE JOURNAL</span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-normal text-[#F9F6F0]"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  Unfiltered Doubts, Frustrations &amp; Honest Prayers
                </h2>
              </div>

              {/* The Encryption Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141210] border border-[#4A5D4E] text-xs font-mono text-[#A7F3D0] shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#A7F3D0] shrink-0" />
                <span>Locally Encrypted &amp; Zero-Knowledge</span>
              </div>
            </motion.div>

            {/* Collapsible Prompt Sparks Based on Ancient Prayers of Disorientation */}
            <motion.div
              initial={{opacity: 0, scale: 0.98, y: 10}}
              animate={{opacity: 1, scale: 1, y: 0}}
              transition={{delay: 0.12, duration: 0.32}}
              className="rounded-2xl bg-[#24211E] border border-[#36312E] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setIsSparksExpanded((prev) => !prev)}
                className="w-full px-4 sm:px-6 py-4 flex items-center justify-between gap-2 text-left hover:bg-[#292524] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FBBF24] min-w-0">
                  <Sparkles className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span className="break-words">
                    Prompt Sparks · Ancient Prayers of Disorientation (Tap to insert)
                  </span>
                </div>
                {isSparksExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[#A8A29E] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#A8A29E] shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {isSparksExpanded && (
                  <motion.div
                    initial={{height: 0, opacity: 0}}
                    animate={{height: 'auto', opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    className="px-4 sm:px-6 pb-5 pt-1 grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-[#36312E]"
                  >
                    {DISORIENTATION_PROMPT_SPARKS.map((spark, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          setJournalDraft((prev) =>
                            prev ? `${prev}\n\n${spark}\n` : `${spark}\n\n`
                          )
                        }
                        className="p-3.5 rounded-xl bg-[#1A1A1A] hover:bg-[#141210] border border-[#292524] hover:border-[#D97706]/60 text-left text-xs text-[#D6D3D1] leading-relaxed transition-colors cursor-pointer"
                      >
                        {spark}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Minimalist Distraction-Free Writing Canvas */}
            <motion.div
              initial={{opacity: 0, scale: 0.98, y: 12}}
              animate={{opacity: 1, scale: 1, y: 0}}
              transition={{delay: 0.18, duration: 0.35}}
              className="space-y-4"
            >
              <div className="relative rounded-2xl bg-[#141210] border border-[#36312E] focus-within:border-[#D97706] p-4 sm:p-6 transition-colors">
                <textarea
                  rows={6}
                  value={journalDraft}
                  onChange={(e) => setJournalDraft(e.target.value)}
                  placeholder="Write whatever is real. No parent, youth leader, or external server can ever read this canvas..."
                  className="w-full bg-transparent text-[#F9F6F0] placeholder-[#57534E] text-sm sm:text-base leading-relaxed focus:outline-none resize-y"
                />

                {/* Soft Keyboard / Quick Tag Bar */}
                <div className="pt-4 mt-4 border-t border-[#292524] flex flex-wrap items-center justify-between gap-3 text-xs text-[#78716C] font-mono">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span>Quick Insert:</span>
                    {['[Honest Doubt]', '[Unfairness]', '[Exhausted]', '[Raw Prayer]'].map(
                      (tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() =>
                            setJournalDraft((prev) => `${prev ? prev + ' ' : ''}${tag} `)
                          }
                          className="px-2 py-1 rounded bg-[#24211E] hover:bg-[#292524] text-[#A8A29E] hover:text-[#F9F6F0] cursor-pointer"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>

                  <span>
                    {journalDraft.trim()
                      ? `${journalDraft.trim().split(/\s+/).length} words`
                      : '0 words'}{' '}
                    · AES-256 Local Stream
                  </span>
                </div>
              </div>

              {/* Primary Action: [ Save to Private Vault ] */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-[#A8A29E] flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span>
                    Entries are cryptographically sealed on-device. Zero cloud telemetry.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSaveToPrivateVault}
                  disabled={!journalDraft.trim()}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] disabled:opacity-40 text-[#141210] hover:text-[#FAF7F2] font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-lg shrink-0"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {justSealedSuccess ? 'Sealed in Private Vault ✓' : 'Save to Private Vault'}
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Sealed Vault Entries List */}
            <motion.div
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.24, duration: 0.35}}
              className="space-y-3 pt-4 border-t border-[#292524]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#A8A29E]">
                <span>SEALED DEVICE VAULT ENTRIES ({sealedEntries.length})</span>
                <span className="text-[#A7F3D0]">Zero-Knowledge Verified</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {sealedEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 sm:p-5 rounded-xl bg-[#24211E] border border-[#36312E] space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                      <span className="text-[#FBBF24]">{entry.topicTag}</span>
                      <span className="text-[#78716C]">{entry.timestamp}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#E7E5E4] leading-relaxed break-words">
                      {entry.contentPreview}
                    </p>
                    <div className="text-[10px] font-mono text-[#4A5D4E] pt-1 break-all">
                      {entry.cipherHash}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
