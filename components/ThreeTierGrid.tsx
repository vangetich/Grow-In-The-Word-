'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import {
  Volume2,
  Pause,
  Play,
  Compass,
  Lock,
  ArrowUpRight,
  BookOpen,
  Check,
  Users,
  Clock,
  Bookmark,
  Plus,
  Trash2,
  Feather,
  Moon,
} from 'lucide-react';
import {motion} from 'motion/react';
import {THREE_TIER_SPECS, TierSpecification} from '@/lib/design-spec-data';
import InteractiveHistoricalTimeline from '@/components/InteractiveHistoricalTimeline';
import PrivateJournalingVault from '@/components/PrivateJournalingVault';
import ReflectionJournalOverlay from '@/components/ReflectionJournalOverlay';
import BedtimeShepherdPhase2Flow from '@/components/BedtimeShepherdPhase2Flow';
import BedtimeShepherd from '@/components/BedtimeShepherd';
import ZeroGlowPlayer from '@/components/ZeroGlowPlayer';
import MorningBridge from '@/components/MorningBridge';
import AncientArchiveExplorer from '@/components/AncientArchiveExplorer';
import TeenSafeHarborPhase4 from '@/components/TeenSafeHarborPhase4';

export interface AudioBookmarkItem {
  id: string;
  seconds: number;
  timeFormatted: string;
  storyTitle: string;
  momentLabel: string;
  quoteSnippet: string;
}

const TOTAL_BEDTIME_SECONDS = 555; // 09:15

function formatAudioSeconds(sec: number): string {
  const clamped = Math.max(0, Math.min(TOTAL_BEDTIME_SECONDS, Math.floor(sec)));
  const mins = Math.floor(clamped / 60);
  const rem = clamped % 60;
  return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

interface ThreeTierGridProps {
  onSelectTierForJourney: (tierId: 'bedtime' | 'archive' | 'harbor') => void;
  onEngageContent?: (points: number, label: string) => void;
}

export default function ThreeTierGrid({
  onSelectTierForJourney,
  onEngageContent,
}: ThreeTierGridProps) {
  const [activeTierId, setActiveTierId] = useState<
    'bedtime' | 'archive' | 'harbor'
  >('bedtime');
  const [bedtimeViewMode, setBedtimeViewMode] = useState<
    'bedtime-shepherd' | 'zero-glow-player' | 'morning-bridge' | 'phase2-flow' | 'quick-player'
  >('bedtime-shepherd');
  const [archiveViewMode, setArchiveViewMode] = useState<
    'phase3-explorer' | 'timeline' | 'lexicon'
  >('phase3-explorer');
  const [isFullScreenZeroGlowActive, setIsFullScreenZeroGlowActive] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentAudioSeconds, setCurrentAudioSeconds] = useState<number>(222); // 03:42
  const [customBookmarkLabel, setCustomBookmarkLabel] = useState('');
  const [audioBookmarks, setAudioBookmarks] = useState<AudioBookmarkItem[]>([
    {
      id: 'bm-1',
      seconds: 105,
      timeFormatted: '01:45',
      storyTitle: 'Psalm 23 · The Quiet Shepherd',
      momentLabel: 'Still Waters & Soft Green Grass',
      quoteSnippet:
        '“He finds soft green grass and cool, still water so everyone can rest…”',
    },
    {
      id: 'bm-2',
      seconds: 222,
      timeFormatted: '03:42',
      storyTitle: 'Luke 8 · The Night the Wind Listened',
      momentLabel: '“Peace, Be Still” (Favorite Moment)',
      quoteSnippet:
        '“Jesus spoke to the water the way a mother speaks to a restless child: Peace, be still.”',
    },
    {
      id: 'bm-3',
      seconds: 410,
      timeFormatted: '06:50',
      storyTitle: 'Genesis 1 · Starlight & Evening Rest',
      momentLabel: 'Cello Lullaby & Sleep Breath',
      quoteSnippet:
        '“And the lake became as smooth as warm glass under the quiet stars.”',
    },
  ]);
  const [warmthDimLevel, setWarmthDimLevel] = useState<number>(85);
  const [selectedTimelineEra, setSelectedTimelineEra] = useState<
    'bronze' | 'iron' | 'persian' | 'second-temple'
  >('iron');
  const [selectedHebrewWord, setSelectedHebrewWord] = useState<
    'chesed' | 'ruach' | 'shalom'
  >('chesed');
  const [activeHarborMode, setActiveHarborMode] = useState<
    'phase4-flow' | 'discussion' | 'peer-community' | 'private-vault'
  >('phase4-flow');
  const [teenReflectionDraft, setTeenReflectionDraft] = useState(
    'Why does Habakkuk feel comfortable arguing this bluntly with God when I was always told doubt was dangerous?'
  );
  const [savedPrivateNote, setSavedPrivateNote] = useState(false);
  const [isReflectionOverlayOpen, setIsReflectionOverlayOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (!isPlayingAudio) return;
    const interval = setInterval(() => {
      setCurrentAudioSeconds((prev) =>
        prev >= TOTAL_BEDTIME_SECONDS ? 0 : prev + 1
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleSaveAudioBookmark = () => {
    const timeFormatted = formatAudioSeconds(currentAudioSeconds);
    const defaultLabel =
      currentAudioSeconds < 180
        ? 'Opening Cello & Quiet Boat'
        : currentAudioSeconds < 320
        ? '“Peace, Be Still” Whisper'
        : 'Starlight Sleep Fade-Out';

    const labelToUse = customBookmarkLabel.trim() || defaultLabel;
    const newBookmark: AudioBookmarkItem = {
      id: `bm-${Date.now()}`,
      seconds: currentAudioSeconds,
      timeFormatted,
      storyTitle: 'Luke 8 · The Night the Wind Listened',
      momentLabel: labelToUse,
      quoteSnippet: `Saved nightly timestamp at ${timeFormatted} for one-tap bedtime replay.`,
    };

    setAudioBookmarks((prev) => [newBookmark, ...prev]);
    setCustomBookmarkLabel('');
    onEngageContent?.(
      15,
      `Saved Bedtime Audio Bookmark at ${timeFormatted} (${labelToUse})`
    );
  };

  const handleJumpToBookmark = (bm: AudioBookmarkItem) => {
    setCurrentAudioSeconds(bm.seconds);
    setIsPlayingAudio(true);
    onEngageContent?.(
      10,
      `Replayed Bedtime Bookmark: “${bm.momentLabel}” (${bm.timeFormatted})`
    );
  };

  const handleRemoveBookmark = (id: string) => {
    setAudioBookmarks((prev) => prev.filter((item) => item.id !== id));
  };

  const historicalTimelineEras = {
    bronze: {
      dateRange: '1800 – 1200 BCE · Late Bronze Age',
      biblicalAnchor: 'Abraham, Sarah & The Fertile Crescent Migrations',
      worldContext:
        'Hammurabi’s Law Code in Babylon · Middle & New Kingdom Egypt · Canaanite City-States',
      artifactNote:
        'Mari Tablets (Louvre): Clay cuneiform letters showing the exact pastoral covenant customs described in Genesis.',
    },
    iron: {
      dateRange: '1000 – 586 BCE · Iron Age II',
      biblicalAnchor: 'Psalms of David, First Temple Jerusalem & The Prophets (Jonah, Isaiah)',
      worldContext:
        'Neo-Assyrian Empire (Nineveh) · Babylonian Ascendancy · Phoenician Maritime Trade to Tarshish',
      artifactNote:
        'Tel Dan Stele & Hezekiah’s Siloam Tunnel Inscription: Carved limestone records confirming the historical House of David and Jerusalem’s water engineering.',
    },
    persian: {
      dateRange: '539 – 330 BCE · Persian Period',
      biblicalAnchor: 'Return from Exile, Esther, Ezra & Nehemiah’s Rebuilding',
      worldContext:
        'Cyrus the Great of Persia · Classical Athens (Socrates & Plato) · Aramaic Lingua Franca',
      artifactNote:
        'The Cyrus Cylinder (British Museum): Records the royal decree allowing displaced peoples to return home and rebuild their sanctuaries.',
    },
    'second-temple': {
      dateRange: '50 BCE – 70 CE · Roman Levant',
      biblicalAnchor: 'The Gospels, Capernaum Fishing Villages & Early Epistles',
      worldContext:
        'Pax Romana (Augustus & Tiberius) · Herodian Architecture · Dead Sea Qumran Community',
      artifactNote:
        '1st-Century Galilee Boat & Magdala Stone: Reveals the daily material life of Galilean fishermen and first-century synagogue reading tables.',
    },
  };

  const hebrewLexicon = {
    chesed: {
      hebrew: 'חֶסֶד',
      transliteration: 'Chesed',
      commonTranslation: 'Lovingkindness / Mercy',
      archivalMeaning:
        'Fierce, stubborn covenant loyalty—love that refuses to let go even when a promise is broken.',
      occurrences: '248 times in the Hebrew Bible (especially Psalms & Prophets)',
    },
    ruach: {
      hebrew: 'רוּחַ',
      transliteration: 'Ruach',
      commonTranslation: 'Spirit / Wind / Breath',
      archivalMeaning:
        'The unseen vital breath that animates living beings and sweeps over the waters in Genesis 1:2.',
      occurrences: '378 times across Torah, Prophets, and Wisdom literature',
    },
    shalom: {
      hebrew: 'שָׁלוֹם',
      transliteration: 'Shalom',
      commonTranslation: 'Peace',
      archivalMeaning:
        'Not merely the absence of noise or conflict, but complete structural wholeness, justice, and restoration.',
      occurrences: '237 times in ancient Near Eastern covenant texts',
    },
  };

  const peerSeminarReflections = [
    {
      handle: 'Elena · Age 16 · Seattle',
      topic: 'On Habakkuk 1:2–4 & Unanswered Prayer',
      reflection:
        'Realizing that a whole book of the Bible starts with a prophet asking "Why are You silent while bad things happen?" honestly took a huge weight off my shoulders. Faith isn’t pretending everything is fine.',
      mentorNote:
        'Verified Seminar Contribution · Moderated by Dr. S. Cho (Youth Theologian)',
    },
    {
      handle: 'Marcus · Age 17 · Chicago',
      topic: 'Modern Application: Justice vs. Apathy',
      reflection:
        'In our school pressure culture, it’s easy to numb out when we see unfairness. Habakkuk shows that caring deeply enough to protest is actually part of loving truth.',
      mentorNote:
        'Verified Seminar Contribution · Moderated by Prof. E. Thorne',
    },
  ];

  return (
    <section
      id="three-tier-grid"
      className="py-20 lg:py-28 border-b border-[#E5DEC9] bg-[#F9F6F0]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Editorial Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#4A5D4E]">
            <span>The “Grow-With-Me” Architecture</span>
            <span aria-hidden="true">·</span>
            <span>The Three-Tier Preview Grid</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A1A]"
            style={{
              fontFamily: 'var(--font-display), serif',
              textWrap: 'balance',
            }}
          >
            Three tactile sanctuaries. Built for psychological maturity at every
            stage.
          </h2>

          <p className="text-base text-[#44403C] leading-relaxed">
            Grow In The Word evolves across three distinct life stages—moving
            from an audio-first bedtime ritual for young children, to an
            interactive Ancient Near Eastern archive for curious tweens, to an
            encrypted lament &amp; journaling harbor for teenagers.
          </p>

          {/* Grow In The Word Brand Pillars (Renamed from Variant B & Variant C) */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-[#F2ECE1] border border-[#E5DEC9] font-semibold text-[#1C1917]">
              Grow In The Word · Radical Hospitality
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[#F2ECE1] border border-[#E5DEC9] font-semibold text-[#92400E]">
              Grow In The Word · Wonder, Trust &amp; Growth
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[#F2ECE1] border border-[#E5DEC9] font-semibold text-[#4A5D4E]">
              Grow In The Word · Sacred Curiosity &amp; Depth
            </span>
          </div>
        </div>

        {/* Asymmetric 3-Tier Editorial Bento Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {THREE_TIER_SPECS.map((tier: TierSpecification) => {
            const isSelected = activeTierId === tier.id;
            const isDarkCard = tier.id === 'bedtime';

            return (
              <motion.div
                key={tier.id}
                onClick={() => setActiveTierId(tier.id)}
                role="button"
                tabIndex={0}
                whileHover={{
                  y: -6,
                  scale: 1.015,
                  transition: { type: 'spring', stiffness: 380, damping: 24 },
                }}
                whileTap={{ scale: 0.99 }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveTierId(tier.id);
                  }
                }}
                className={`lg:col-span-4 rounded-2xl border flex flex-col justify-between overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] shadow-xs hover:shadow-xl transition-colors duration-200 ${
                  isDarkCard
                    ? 'bg-[#1A1A1A] text-[#F9F6F0] border-[#292524]'
                    : 'bg-[#F2ECE1] text-[#1A1A1A] border-[#E5DEC9]'
                } ${
                  isSelected
                    ? 'ring-2 ring-[#D97706]'
                    : 'hover:border-[#D97706]/60'
                }`}
              >
                <div>
                  {/* Card Top Tactile Visual Concept Inset */}
                  <div className="relative h-56 w-full overflow-hidden border-b border-current/10">
                    {/* Background Editorial Image with Subtle Opacity */}
                    {!imageErrors[tier.id] && (
                      <Image
                        src={tier.imagePath}
                        alt={tier.imageAlt}
                        fill
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setImageErrors((prev) => ({...prev, [tier.id]: true}))
                        }
                        className="object-cover object-center opacity-25"
                      />
                    )}

                    {/* CARD 1 VISUAL CONCEPT: Warm Obsidian-Umber Sanctuary, Botanical Crescent Line-Art & 2100K Candlelight Audio Wave */}
                    {tier.id === 'bedtime' && (
                      <div className="relative z-10 w-full h-full bg-[#1C1917]/95 p-5 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#D6D3D1]">
                          <span>Ages 3–6 · The Bedtime Sanctuary</span>
                          <span className="text-[#FBBF24]">2100K Candlelight</span>
                        </div>

                        {/* Minimalist Botanical Crescent + Soft Amber Audio Waveform + Wonder Prompt */}
                        <div className="my-auto p-3.5 rounded-xl bg-[#24201D] border border-[#D97706]/35 shadow-inner space-y-2.5">
                          <div className="flex items-center justify-between gap-3">
                            {/* Fine-Line Botanical & Celestial Crescent Emblem (Zero Cartoonish Graphics) */}
                            <div className="w-10 h-10 rounded-full bg-[#1C1917] border border-[#D97706]/45 flex items-center justify-center shrink-0">
                              <Moon className="w-4 h-4 text-[#FBBF24] stroke-[1.5]" />
                            </div>

                            {/* Slow-Breathing 2100K Amber Acoustic Waveform */}
                            <div className="flex-1 flex items-center justify-center gap-1 h-9 px-2">
                              {[
                                24, 42, 34, 62, 86, 54, 78, 96, 68, 44, 74, 52,
                                32, 58, 38, 22,
                              ].map((heightPct, idx) => (
                                <span
                                  key={idx}
                                  style={{height: `${heightPct}%`}}
                                  className="w-1 rounded-full bg-gradient-to-t from-[#92400E] via-[#D97706] to-[#FDE68A]"
                                />
                              ))}
                            </div>

                            <div className="text-right shrink-0">
                              <div className="text-[10px] font-mono uppercase tracking-wider text-[#A7F3D0]">
                                58 BPM
                              </div>
                              <div className="text-[10px] font-mono text-[#D6D3D1]">
                                Cello &amp; Voice
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-[#36312E] flex items-center justify-between gap-2 text-[11px]">
                            <span
                              className="text-[#FAF7F2] italic truncate"
                              style={{fontFamily: 'var(--font-display), serif'}}
                            >
                              “Where did your heart feel safe and warm today?”
                            </span>
                            <span className="font-mono text-[10px] text-[#FBBF24] shrink-0">
                              18% → 0% Dim
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-[#D6D3D1]">
                          <span>Calm · Safety · Unhurried Wonder</span>
                          <span className="text-[#FBBF24]">
                            {isSelected ? 'Active Below' : 'Inspect Tier'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* CARD 2 VISUAL CONCEPT: Textured Parchment Flat-Lay + Old Map Coordinate + Copper Compass */}
                    {tier.id === 'archive' && (
                      <div className="relative z-10 w-full h-full bg-[#EFE8D8]/95 p-5 flex flex-col justify-between text-[#1A1A1A]">
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#57534E]">
                          <span>Ages 8–12 · The Ancient Archive</span>
                          <span className="text-[#92400E] font-semibold">
                            FIELD FOLIO IV
                          </span>
                        </div>

                        <div className="my-auto p-3.5 rounded-xl bg-[#F9F6F0] border border-[#C28E38]/40 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="space-y-1">
                            <div
                              className="text-[11px] font-mono font-semibold text-[#92400E] tabular-nums"
                              style={{fontFamily: 'var(--font-mono), monospace'}}
                            >
                              31.7683° N, 35.2137° E
                            </div>
                            <div
                              className="text-sm font-normal text-[#1A1A1A]"
                              style={{fontFamily: 'var(--font-display), serif'}}
                            >
                              Ancient Near East · Judean Hills
                            </div>
                            <div className="text-[11px] text-[#57534E]">
                              Iron Age II Stratum · Hezekiah Tunnel Clue
                            </div>
                          </div>

                          <div className="w-11 h-11 rounded-full bg-[#F2ECE1] border border-[#C28E38] flex items-center justify-center shrink-0">
                            <Compass className="w-6 h-6 text-[#C28E38]" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-[#57534E]">
                          <span>Parchment Map &amp; Artifact Clues</span>
                          <span className="text-[#92400E] font-semibold">
                            {isSelected ? 'Active Below' : 'Inspect Tier'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* CARD 3 VISUAL CONCEPT: Editorial Seminar & Encrypted Commonplace Canvas */}
                    {tier.id === 'harbor' && (
                      <div className="relative z-10 w-full h-full bg-[#F9F6F0]/95 p-5 flex flex-col justify-between text-[#1A1A1A]">
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#4A5D4E]">
                          <span>Ages 13–18 · The Safe Harbor</span>
                          <span className="inline-flex items-center gap-1 font-semibold">
                            <Lock className="w-3 h-3 text-[#4A5D4E]" />
                            <span>ZERO-KNOWLEDGE E2EE</span>
                          </span>
                        </div>

                        <div
                          className="my-auto p-3.5 rounded-xl bg-[#FFFFFF]/95 border border-[#E5DEC9] space-y-1.5 text-[11px] font-mono text-[#1A1A1A] shadow-2xs"
                          style={{fontFamily: 'var(--font-mono), monospace'}}
                        >
                          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#4A5D4E]">
                            <span>HABAKKUK 1:2 · SOCRATIC COLLISION</span>
                            <span className="text-[#92400E]">COHORT #14</span>
                          </div>
                          <div className="text-[#1A1A1A] leading-relaxed">
                            “Why do You make me see injustice, and remain silent
                            while I wrestle with doubt?”
                          </div>
                          <div className="text-[#4A5D4E] pt-0.5 flex items-center justify-between text-[10px]">
                            <span>&gt; Private Vault_042 [Device-Key]</span>
                            <span>42 Peer Notes</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-[#57534E]">
                          <span>Independence · Inquiry · Community</span>
                          <span className="text-[#4A5D4E] font-semibold">
                            {isSelected ? 'Active Below' : 'Inspect Tier'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Body with Grow In The Word Signature Copy + Content Strategist Expansion */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div
                        className={`text-xs font-mono uppercase tracking-wider ${
                          isDarkCard ? 'text-[#FBBF24]' : 'text-[#4A5D4E]'
                        }`}
                        style={{fontFamily: 'var(--font-mono), monospace'}}
                      >
                        Card {tier.index} · {tier.ageSpan}
                      </div>
                      <h3
                        className="mt-1 text-2xl font-normal tracking-tight"
                        style={{fontFamily: 'var(--font-display), serif'}}
                      >
                        {tier.name}
                      </h3>
                    </div>

                    {/* Primary Grow In The Word Copy Block */}
                    <div
                      className={`p-4 rounded-xl border text-sm leading-relaxed ${
                        isDarkCard
                          ? 'bg-[#141210] border-[#292524] text-[#F9F6F0]'
                          : 'bg-[#F9F6F0] border-[#E5DEC9] text-[#1A1A1A]'
                      }`}
                    >
                      <strong
                        className={`font-semibold ${
                          isDarkCard ? 'text-[#FBBF24]' : 'text-[#92400E]'
                        }`}
                      >
                        {tier.signatureHook}
                      </strong>{' '}
                      {tier.rootsAndRhythmsCopy.replace(tier.signatureHook, '').trim()}
                    </div>

                    {/* Expanded 3-Sentence Content Strategist Description */}
                    <p
                      className={`text-xs sm:text-sm leading-[1.68] ${
                        isDarkCard ? 'text-[#D6D3D1]' : 'text-[#44403C]'
                      }`}
                    >
                      {tier.expandedStrategistDescription}
                    </p>

                    {/* Key Benefits Checklist */}
                    <div
                      className={`pt-4 border-t space-y-2 text-xs ${
                        isDarkCard
                          ? 'border-[#292524] text-[#D6D3D1]'
                          : 'border-[#E5DEC9] text-[#44403C]'
                      }`}
                    >
                      <div className="font-semibold text-[#D97706]">
                        Key Stage Benefits:
                      </div>
                      <ul className="space-y-1.5">
                        {tier.keyBenefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-start gap-2 leading-relaxed"
                          >
                            <Check className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Footer Metric & Action */}
                <div
                  className={`px-6 py-4 border-t flex items-center justify-between ${
                    isDarkCard
                      ? 'border-[#292524] bg-[#141210]'
                      : 'border-[#E5DEC9] bg-[#F9F6F0]/60'
                  }`}
                >
                  <div>
                    <span
                      className="text-lg font-semibold tabular-nums text-[#D97706]"
                      style={{fontFamily: 'var(--font-mono), monospace'}}
                    >
                      {tier.metrics.statValue}
                    </span>
                    <span className="ml-2 text-xs opacity-80">
                      {tier.metrics.statUnit}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTierForJourney(tier.id);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#D97706] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Explore {tier.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Deep-Dive Sandbox for the Selected Tier */}
        <div className="mt-10 rounded-xl border border-[#E5DEC9] bg-[#F2ECE1] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E5DEC9]">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#92400E]">
                <span>Interactive Tier Prototype</span>
                <span aria-hidden="true">·</span>
                <span>
                  Click any tier above or switch tabs to test its signature UX
                </span>
              </div>
              <h3
                className="mt-1 text-2xl font-normal text-[#1C1917]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                {activeTierId === 'bedtime' &&
                  '01. Bedtime Sanctuary (Ages 3–6) — Calm, Safety & Unhurried Evening Wonder'}
                {activeTierId === 'archive' &&
                  '02. Historical Archive (Ages 8–12) — Interactive Timelines & Historical Context'}
                {activeTierId === 'harbor' &&
                  '03. Safe Harbor (Ages 13–18) — Sovereign Independence, Critical Thinking & Moderated Community'}
              </h3>
            </div>

            {/* Functional Tab Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-[#FAF7F2] border border-[#E5DEC9] rounded-lg self-start">
              {THREE_TIER_SPECS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTierId(t.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTierId === t.id
                      ? 'bg-[#1C1917] text-[#FAF7F2]'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {t.index}. {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Prototype 01: Bedtime Sanctuary / Phase 2: Bedtime Shepherd Flow */}
          {activeTierId === 'bedtime' && (
            <div className="mt-8 space-y-6">
              {/* UI/UX & Minimalist Brand Strategy Brief for Bedtime Sanctuary (Ages 3–6) */}
              <div className="p-5 sm:p-6 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5DEC9]">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#4A5D4E]">
                    <span>Minimalist Brand &amp; Visual Layout Spec</span>
                    <span aria-hidden="true">·</span>
                    <span>Ages 3–6 Bedtime Sanctuary</span>
                  </div>
                  <span className="text-xs font-mono text-[#92400E]">
                    Warm Obsidian #1C1917 · Candlelight Amber #D97706 · Alabaster #FAF7F2
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm">
                  <div className="space-y-1.5">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[#92400E] font-semibold">
                      01 · Tactile Visual Elements
                    </div>
                    <div
                      className="text-base font-normal text-[#1C1917]"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      Fine-Line Botanicals Over Cartoons
                    </div>
                    <p className="text-xs text-[#44403C] leading-relaxed">
                      Replaces primary-colored cartoon mascots with etched olive-branch and crescent line-art (`1.25px` stroke) alongside a slow-breathing 58 BPM candlelight audio wave that signals rest to young nervous systems.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[#92400E] font-semibold">
                      02 · Brief Layout Architecture
                    </div>
                    <div
                      className="text-base font-normal text-[#1C1917]"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      Three-Zone Sleepy-Hand Hierarchy
                    </div>
                    <p className="text-xs text-[#44403C] leading-relaxed">
                      Top circadian header (`2100K Zero-Blue`), center acoustic story &amp; whispered wonder card, and a single oversized `56px` tactile lantern playhead that dims luminance from `18% → 0%` over 6 minutes.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[#92400E] font-semibold">
                      03 · Early Childhood Benefits Copy
                    </div>
                    <div
                      className="text-base font-normal text-[#1C1917]"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      “Where the Day Softens into Wonder.”
                    </div>
                    <p className="text-xs text-[#44403C] leading-relaxed">
                      Nurtures emotional safety through the sound of a trusted voice, preserves natural melatonin production, and ends each day with a quiet parent-child wonder prompt rather than screen-time negotiations.
                    </p>
                  </div>
                </div>
              </div>
              {/* Bedtime Experience Mode Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9]">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-[#D97706] font-semibold uppercase">
                    Bedtime Module View
                  </span>
                  <span aria-hidden="true" className="text-[#A8A29E]">
                    ·
                  </span>
                  <span className="text-[#57534E]">
                    Explore modular Bedtime Shepherd screens or quick player
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setBedtimeViewMode('bedtime-shepherd')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      bedtimeViewMode === 'bedtime-shepherd'
                        ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                        : 'bg-[#F2ECE1] text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    Bedtime Shepherd (Screens 1 &amp; 2)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBedtimeViewMode('zero-glow-player')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      bedtimeViewMode === 'zero-glow-player'
                        ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                        : 'bg-[#F2ECE1] text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    Zero-Glow Player (Screen 3)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBedtimeViewMode('morning-bridge')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      bedtimeViewMode === 'morning-bridge'
                        ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                        : 'bg-[#F2ECE1] text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    Morning Bridge (Screen 4)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBedtimeViewMode('quick-player')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      bedtimeViewMode === 'quick-player'
                        ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                        : 'bg-[#F2ECE1] text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    Quick Scrubber
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFullScreenZeroGlowActive(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#D97706]/20 hover:bg-[#D97706]/35 border border-[#D97706]/50 text-[#FDE68A] transition-colors cursor-pointer"
                  >
                    <Moon className="w-3 h-3 text-[#D97706]" />
                    <span>Launch Full-Screen Zero-Glow</span>
                  </button>
                </div>
              </div>

              {bedtimeViewMode === 'bedtime-shepherd' && (
                <BedtimeShepherd onEngageContent={onEngageContent} />
              )}

              {bedtimeViewMode === 'zero-glow-player' && (
                <ZeroGlowPlayer
                  isFullScreenOverlay={false}
                  onOpenMorningBridge={() => setBedtimeViewMode('morning-bridge')}
                  onSaveBookmark={(sec, label) => {
                    onEngageContent?.(10, `Saved Bedtime Audio Bookmark: "${label}"`);
                  }}
                />
              )}

              {bedtimeViewMode === 'morning-bridge' && (
                <MorningBridge
                  onLogBreakfastReflection={onEngageContent}
                  onReturnToShepherd={() => setBedtimeViewMode('bedtime-shepherd')}
                />
              )}

              {bedtimeViewMode === 'phase2-flow' && (
                <BedtimeShepherdPhase2Flow onEngageContent={onEngageContent} />
              )}

              {bedtimeViewMode === 'quick-player' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div
                className="lg:col-span-7 rounded-xl p-6 sm:p-8 text-[#FAF7F2] border border-[#292524] transition-all duration-200 space-y-6"
                style={{
                  backgroundColor: '#1A1A1A',
                  filter: `brightness(${warmthDimLevel}%)`,
                }}
              >
                <div className="flex items-center justify-between text-xs text-[#D6D3D1] pb-4 border-b border-[#292524]">
                  <span>Evening Story 04 · Luke 8:22–25</span>
                  <span
                    className="font-mono tabular-nums text-[#FBBF24]"
                    style={{fontFamily: 'var(--font-mono), monospace'}}
                  >
                    2100K Warmth · {warmthDimLevel}% Luminance
                  </span>
                </div>

                <div>
                  <h4
                    className="text-2xl sm:text-3xl font-normal text-[#FAF7F2]"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    The Night the Wind Listened
                  </h4>

                  <p
                    className="mt-4 text-base sm:text-lg leading-[1.75] text-[#E7E5E4]"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    “The waves were loud against the wooden boat, and the
                    friends were wide awake. Jesus stood up in the dark and
                    spoke to the water the way a mother speaks to a restless
                    child:{' '}
                    <span className="underline decoration-[#D97706] underline-offset-4 text-[#FBBF24]">
                      Peace, be still.
                    </span>{' '}
                    And the lake became as smooth as warm glass.”
                  </p>
                </div>

                {/* Interactive Audio Scrubber with Bookmark Pins */}
                <div className="p-4 rounded-xl bg-[#141210] border border-[#292524] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A8A29E]">
                      Scrub Narration Timeline or Tap a Saved Bookmark Pin
                    </span>
                    <span
                      className="font-mono text-[#FBBF24] tabular-nums"
                      style={{fontFamily: 'var(--font-mono), monospace'}}
                    >
                      {formatAudioSeconds(currentAudioSeconds)} / 09:15
                    </span>
                  </div>

                  <div className="relative pt-1">
                    <input
                      type="range"
                      aria-label="Scrub bedtime audio timestamp"
                      min={0}
                      max={TOTAL_BEDTIME_SECONDS}
                      value={currentAudioSeconds}
                      onChange={(e) =>
                        setCurrentAudioSeconds(Number(e.target.value))
                      }
                      className="w-full accent-[#D97706] cursor-pointer"
                    />
                    {/* Visual Bookmark Markers along Timeline */}
                    <div className="flex flex-wrap items-center gap-2 pt-1.5">
                      {audioBookmarks.slice(0, 4).map((bm) => (
                        <button
                          key={bm.id}
                          type="button"
                          onClick={() => handleJumpToBookmark(bm)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono tabular-nums transition-colors cursor-pointer ${
                            Math.abs(currentAudioSeconds - bm.seconds) < 8
                              ? 'bg-[#D97706] text-[#1A1A1A] font-semibold'
                              : 'bg-[#292524] text-[#FBBF24] hover:bg-[#36312E]'
                          }`}
                          style={{fontFamily: 'var(--font-mono), monospace'}}
                        >
                          <Bookmark className="w-2.5 h-2.5 fill-current" />
                          <span>{bm.timeFormatted}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Save Current Timestamp as Audio Bookmark */}
                  <div className="pt-2 border-t border-[#292524] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      value={customBookmarkLabel}
                      onChange={(e) => setCustomBookmarkLabel(e.target.value)}
                      placeholder={`Label moment at ${formatAudioSeconds(
                        currentAudioSeconds
                      )} (e.g. “Peace, Be Still”)…`}
                      aria-label="Custom audio bookmark label"
                      className="flex-1 px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[#36312E] text-xs text-[#F9F6F0] placeholder:text-[#78716C] focus:outline-none focus:border-[#D97706]"
                    />
                    <button
                      type="button"
                      onClick={handleSaveAudioBookmark}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#292524] hover:bg-[#36312E] border border-[#D97706]/50 text-xs font-semibold text-[#FBBF24] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>
                        Bookmark {formatAudioSeconds(currentAudioSeconds)}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Tactile Audio Player Control */}
                <div className="pt-2 border-t border-[#292524] flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#D97706] text-[#1A1A1A] font-semibold text-sm hover:bg-[#F59E0B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" />
                        <span>
                          Pause Narration (
                          {formatAudioSeconds(currentAudioSeconds)} / 09:15)
                        </span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>
                          Play Narration (
                          {formatAudioSeconds(currentAudioSeconds)} / 09:15)
                        </span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2.5 text-xs text-[#D6D3D1]">
                    <Volume2 className="w-4 h-4 text-[#D97706]" />
                    <span>Solo Cello & Calm Voice · 58 BPM resting tempo</span>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Saved Nightly Audio Bookmarks Shelf + Circadian Dimmer */}
              <div className="lg:col-span-5 space-y-5">
                {/* Saved Audio Bookmarks Card */}
                <div className="p-5 rounded-xl bg-[#F9F6F0] border border-[#E5DEC9] space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#92400E]">
                      <Bookmark className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706]" />
                      <span>Saved Nightly Audio Bookmarks</span>
                    </div>
                    <span
                      className="text-[11px] font-mono text-[#57534E] tabular-nums"
                      style={{fontFamily: 'var(--font-mono), monospace'}}
                    >
                      {audioBookmarks.length} saved
                    </span>
                  </div>

                  <p className="text-xs text-[#57534E] leading-relaxed">
                    Tap any saved timestamp below to jump directly to your
                    child’s favorite calming story moment:
                  </p>

                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {audioBookmarks.map((bm) => {
                      const isActiveMoment =
                        Math.abs(currentAudioSeconds - bm.seconds) < 8;
                      return (
                        <div
                          key={bm.id}
                          className={`p-3 rounded-lg border transition-all flex items-start justify-between gap-2.5 ${
                            isActiveMoment
                              ? 'bg-[#1A1A1A] text-[#F9F6F0] border-[#D97706]'
                              : 'bg-[#F2ECE1] text-[#1A1A1A] border-[#E5DEC9] hover:border-[#D97706]/60'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => handleJumpToBookmark(bm)}
                            className="text-left flex-1 space-y-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="px-1.5 py-0.5 rounded bg-[#D97706]/20 text-[#D97706] font-mono text-[11px] font-semibold tabular-nums"
                                style={{
                                  fontFamily: 'var(--font-mono), monospace',
                                }}
                              >
                                {bm.timeFormatted}
                              </span>
                              <span className="text-xs font-semibold">
                                {bm.momentLabel}
                              </span>
                            </div>
                            <div
                              className={`text-[11px] ${
                                isActiveMoment
                                  ? 'text-[#D6D3D1]'
                                  : 'text-[#57534E]'
                              }`}
                            >
                              {bm.storyTitle}
                            </div>
                          </button>

                          {audioBookmarks.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveBookmark(bm.id)}
                              aria-label={`Remove bookmark ${bm.momentLabel}`}
                              className="p-1 rounded text-[#78716C] hover:text-[#DC2626] transition-colors cursor-pointer shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Circadian Dimmer Control */}
                <div className="p-5 rounded-xl bg-[#F9F6F0] border border-[#E5DEC9] space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#1A1A1A]">
                    <label htmlFor="circadian-dimmer">
                      Test Circadian Auto-Dimmer
                    </label>
                    <span
                      className="font-mono tabular-nums text-[#92400E]"
                      style={{fontFamily: 'var(--font-mono), monospace'}}
                    >
                      {warmthDimLevel}% Brightness
                    </span>
                  </div>
                  <input
                    id="circadian-dimmer"
                    type="range"
                    min={35}
                    max={100}
                    value={warmthDimLevel}
                    onChange={(e) => setWarmthDimLevel(Number(e.target.value))}
                    className="w-full accent-[#D97706] cursor-pointer"
                  />
                  <p className="text-xs text-[#57534E]">
                    Screen luminance lowers gradually over 6 minutes while the
                    acoustic story plays, helping young children drift naturally
                    to sleep.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

          {/* Interactive Prototype 02: Historical Archive (Phase 3 Detective Map + Timeline + Lexicon) */}
          {activeTierId === 'archive' && (
            <div className="mt-8 space-y-6">
              {/* Archive Sub-Navigation Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold uppercase text-[#92400E]">
                    Tier 2: The Historical Archive (Ages 8–12)
                  </span>
                  <span className="text-[#A8A29E]">·</span>
                  <span className="text-[#57534E]">
                    Explore Phase 3 Detective Map or Timeline Strata
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setArchiveViewMode('phase3-explorer')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      archiveViewMode === 'phase3-explorer'
                        ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                        : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    Phase 3: Detective Map & Case (All 4 Screens)
                  </button>
                  <button
                    type="button"
                    onClick={() => setArchiveViewMode('timeline')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      archiveViewMode === 'timeline'
                        ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                        : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    Historical Timeline
                  </button>
                  <button
                    type="button"
                    onClick={() => setArchiveViewMode('lexicon')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      archiveViewMode === 'lexicon'
                        ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                        : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    Ancient Root Lens
                  </button>
                </div>
              </div>

              {archiveViewMode === 'phase3-explorer' && (
                <AncientArchiveExplorer
                  onEngageContent={onEngageContent}
                  onOpenJourneyModal={onSelectTierForJourney}
                />
              )}

              {archiveViewMode === 'timeline' && (
                <InteractiveHistoricalTimeline
                  onEngageContent={onEngageContent}
                  onOpenJourneyModal={onSelectTierForJourney}
                />
              )}

              {archiveViewMode === 'lexicon' && (
                <div className="rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5DEC9]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#92400E]">
                      <Compass className="w-4 h-4 text-[#D97706]" />
                      <span>Linguistic Context: Ancient Hebrew & Greek Root Lens</span>
                    </div>
                    <span className="text-xs text-[#57534E]">
                      Exposing nuances lost in English Bible translations
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(['chesed', 'ruach', 'shalom'] as const).map((key) => {
                      const item = hebrewLexicon[key];
                      const active = selectedHebrewWord === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setSelectedHebrewWord(key);
                            onEngageContent?.(10, `Explored Hebrew Root: ${item.transliteration} (${item.hebrew})`);
                          }}
                          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            active
                              ? 'bg-[#1C1917] text-[#FAF7F2]'
                              : 'bg-[#F2ECE1] text-[#1C1917] hover:bg-[#E5DEC9]'
                          }`}
                        >
                          {item.hebrew} · {item.transliteration}
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-4 rounded-lg bg-[#F2ECE1] border border-[#E5DEC9] space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span
                        className="text-xl text-[#1C1917]"
                        style={{fontFamily: 'var(--font-display), serif'}}
                      >
                        {hebrewLexicon[selectedHebrewWord].hebrew} (
                        {hebrewLexicon[selectedHebrewWord].transliteration})
                      </span>
                      <span className="text-xs text-[#92400E] font-medium">
                        Common English Translation: “{hebrewLexicon[selectedHebrewWord].commonTranslation}”
                      </span>
                    </div>
                    <p className="text-xs text-[#44403C] leading-relaxed">
                      {hebrewLexicon[selectedHebrewWord].archivalMeaning}
                    </p>
                    <div className="text-[11px] font-mono text-[#57534E] pt-1">
                      Occurrences in Hebrew Bible: {hebrewLexicon[selectedHebrewWord].occurrences}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Interactive Prototype 03: Safe Harbor (Phase 4 Flow + Guided Discussions + Peer Community + Private Vault) */}
          {activeTierId === 'harbor' && (
            <div className="mt-8 space-y-6">
              {/* Sub-mode switcher inside Safe Harbor */}
              <div className="flex flex-wrap items-center gap-2">
                {(
                  [
                    {
                      id: 'phase4-flow',
                      label: '01. Phase 4: Safe Harbor & Wrestling Ring (All 4 Screens)',
                    },
                    {
                      id: 'discussion',
                      label: '02. Guided Discussion & Modern Application',
                    },
                    {
                      id: 'peer-community',
                      label: '03. Moderated Peer Seminar Community',
                    },
                    {
                      id: 'private-vault',
                      label: '04. Zero-Knowledge Private Journal',
                    },
                  ] as const
                ).map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setActiveHarborMode(mode.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      activeHarborMode === mode.id
                        ? 'bg-[#1C1917] text-[#FAF7F2]'
                        : 'bg-[#FAF7F2] text-[#44403C] border border-[#E5DEC9] hover:text-[#1C1917]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setIsReflectionOverlayOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#D97706] hover:bg-[#F59E0B] text-[#1A1A1A] transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
                >
                  <Feather className="w-3.5 h-3.5" />
                  <span>Open Reflection Journal (Sentiment Points)</span>
                </button>
              </div>

              {activeHarborMode === 'phase4-flow' && (
                <TeenSafeHarborPhase4 onEngageContent={onEngageContent} />
              )}

              {activeHarborMode === 'discussion' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  <div className="lg:col-span-6 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between text-xs text-[#57534E] pb-3 border-b border-[#E5DEC9]">
                      <span>Primary Text · Habakkuk 1:2–4</span>
                      <span>Ancient Near Eastern Lament</span>
                    </div>
                    <blockquote
                      className="text-lg sm:text-xl text-[#1C1917] leading-relaxed"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      “O Lord, how long shall I cry for help, and You will not
                      hear? Or cry to You ‘Violence!’ and You will not save?”
                    </blockquote>
                    <p className="text-sm text-[#44403C] leading-relaxed pt-2">
                      Over one-third of the Psalms and the entirety of Job and
                      Habakkuk are laments. In biblical wisdom, bringing raw
                      questions about injustice or divine silence directly to
                      God is honored as faithful engagement, never punished as
                      rebellion.
                    </p>
                  </div>

                  <div className="lg:col-span-6 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] p-6 sm:p-8 space-y-4">
                    <div className="text-xs font-semibold text-[#92400E]">
                      Guided Socratic Prompts & Modern-Day Application
                    </div>
                    <h4
                      className="text-xl font-normal text-[#1C1917]"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      Connecting Ancient Lament to Modern Teen Life
                    </h4>
                    <ul className="space-y-3 text-sm text-[#44403C] leading-relaxed">
                      <li>
                        <strong className="text-[#1C1917]">
                          Step 1 (Observe):
                        </strong>{' '}
                        What is the difference between cynical detachment and
                        Habakkuk’s honest protest?
                      </li>
                      <li>
                        <strong className="text-[#1C1917]">
                          Step 2 (Modern Application):
                        </strong>{' '}
                        When you see tragedy in the news or experience personal
                        burnout, how does permission to grieve honestly change
                        the way you pray or act?
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeHarborMode === 'peer-community' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {peerSeminarReflections.map((item) => (
                    <div
                      key={item.handle}
                      className="lg:col-span-6 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] p-6 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs text-[#92400E] font-semibold">
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5" />
                          <span>{item.handle}</span>
                        </div>
                        <span>{item.topic}</span>
                      </div>
                      <p
                        className="text-base text-[#1C1917] leading-relaxed"
                        style={{fontFamily: 'var(--font-display), serif'}}
                      >
                        “{item.reflection}”
                      </p>
                      <div className="pt-2 border-t border-[#E5DEC9] text-xs text-[#57534E]">
                        {item.mentorNote} · Zero public follower counts or likes
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeHarborMode === 'private-vault' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#92400E]">
                      <Lock className="w-4 h-4 text-[#D97706]" />
                      <span>Interactive Safe Harbor Prototype: Zero-Knowledge Private Vault</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#57534E]">
                      Ages 13–18 · Client-Side Key Generation
                    </span>
                  </div>

                  <PrivateJournalingVault
                    onEngageContent={onEngageContent}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reflection Journal Overlay for Unstructured Journaling & Sentiment Growth Points */}
      <ReflectionJournalOverlay
        isOpen={isReflectionOverlayOpen}
        onClose={() => setIsReflectionOverlayOpen(false)}
        onEngageContent={onEngageContent}
      />

      {/* Full-Screen Zero-Glow Night-Mode Player Overlay */}
      {isFullScreenZeroGlowActive && (
        <ZeroGlowPlayer
          isOpen={isFullScreenZeroGlowActive}
          isFullScreenOverlay={true}
          onClose={() => setIsFullScreenZeroGlowActive(false)}
          onOpenMorningBridge={() => {
            setIsFullScreenZeroGlowActive(false);
            setBedtimeViewMode('morning-bridge');
          }}
          onSaveBookmark={(sec, label) => {
            onEngageContent?.(10, `Saved Bedtime Audio Bookmark: "${label}"`);
          }}
        />
      )}
    </section>
  );
}
