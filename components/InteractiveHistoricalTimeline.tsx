'use client';

import React, {useState, useRef} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  Clock,
  Compass,
  MapPin,
  Landmark,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Layers,
  ArrowRight,
  Check,
} from 'lucide-react';

export interface TimelineEvent {
  id: string;
  yearBceOrCe: string;
  yearNumeric: number;
  title: string;
  subtitle: string;
  biblicalAnchor: string;
  biblicalTextSnippet: string;
  archaeologicalArtifact: string;
  museumLocation: string;
  artifactSignificance: string;
  worldEmpireParallel: string;
  geographicRegion: string;
  coordinates: string;
  inquiryPrompt: string;
}

export interface TimelineEra {
  id: 'bronze' | 'iron' | 'persian' | 'second-temple';
  name: string;
  periodSpan: string;
  dateRangeLabel: string;
  summary: string;
  colorToken: string;
  events: TimelineEvent[];
}

export const HISTORICAL_ERAS: TimelineEra[] = [
  {
    id: 'bronze',
    name: 'Middle & Late Bronze Age',
    periodSpan: 'c. 1800 – 1200 BCE',
    dateRangeLabel: '1800–1200 BCE',
    summary:
      'Nomadic pastoral clans, clay tablet cuneiform treaties, and trade routes linking the Fertile Crescent between Mesopotamia and the Nile River Delta.',
    colorToken: '#D97706',
    events: [
      {
        id: 'bronze-ur-migration',
        yearBceOrCe: 'c. 1800 BCE',
        yearNumeric: -1800,
        title: 'Abrahamic Clan Migration along the Euphrates',
        subtitle: 'From Sumerian Urban Center to Canaanite Hill Country',
        biblicalAnchor: 'Genesis 12:1–4',
        biblicalTextSnippet:
          '“Go from your country, your people and your father’s household to the land I will show you…”',
        archaeologicalArtifact: 'Mari Royal Archives & Nuzi Clay Tablets',
        museumLocation: 'Musée du Louvre, Paris',
        artifactSignificance:
          'Cuneiform legal tablets excavated at Mari and Nuzi describe adoption contracts, nomadic grazing pacts, and inheritance customs matching Genesis patriarchal narratives with startling fidelity.',
        worldEmpireParallel:
          'Middle Kingdom Egypt (12th Dynasty) & Old Babylonian Empire under Hammurabi’s legal code.',
        geographicRegion: 'Ur of Chaldea → Haran → Shechem (Canaan)',
        coordinates: '31°14′N 35°17′E',
        inquiryPrompt:
          'Why did an ancient family leave fortified stone cities with irrigation to wander mountain ridge trails as pastoral outsiders?',
      },
      {
        id: 'bronze-merneptah-stele',
        yearBceOrCe: 'c. 1208 BCE',
        yearNumeric: -1208,
        title: 'The Merneptah Stele Victory Inscription',
        subtitle: 'Earliest Extra-Biblical Reference to “Israel” in History',
        biblicalAnchor: 'Joshua & Judges Transition',
        biblicalTextSnippet:
          '“In those days there was no king in Israel; everyone did what was right in his own eyes.”',
        archaeologicalArtifact: 'Merneptah Victory Stele (Black Granite)',
        museumLocation: 'Egyptian Museum, Cairo',
        artifactSignificance:
          'Pharaoh Merneptah lists military campaigns in Canaan. Hieroglyphic determinatives explicitly designate “Israel” as a distinct people group living in the central hill country.',
        worldEmpireParallel:
          'Late Bronze Age Collapse: Mycenaean Greece collapses, Hittite Empire dissolves, Sea Peoples destabilize coastal Levant.',
        geographicRegion: 'Thebes (Egypt) & Central Judean Highlands',
        coordinates: '25°43′N 32°36′E',
        inquiryPrompt:
          'How does physical stone testimony from an Egyptian Pharaoh confirm that biblical people were real historical groups rather than mythical folklore?',
      },
    ],
  },
  {
    id: 'iron',
    name: 'Iron Age I & II (Monarchy & Prophets)',
    periodSpan: 'c. 1000 – 586 BCE',
    dateRangeLabel: '1000–586 BCE',
    summary:
      'The emergence of fortified cities, stone terrace farming, monumental royal architecture in Jerusalem, and the prophetic call for covenant justice.',
    colorToken: '#C28E38',
    events: [
      {
        id: 'iron-tel-dan',
        yearBceOrCe: 'c. 840 BCE',
        yearNumeric: -840,
        title: 'The Tel Dan Stele & The “House of David”',
        subtitle: 'Aram-Damascus Royal Victory Monument in Upper Galilee',
        biblicalAnchor: '1 Kings 15 & 2 Kings 8',
        biblicalTextSnippet:
          '“The days of David drew near that he should die; and he charged Solomon his son, saying: I go the way of all the earth…”',
        archaeologicalArtifact: 'Tel Dan Basalt Inscription (Aramaic)',
        museumLocation: 'The Israel Museum, Jerusalem',
        artifactSignificance:
          'Discovered in 1993 at Tel Dan, this victory slab erected by King Hazael of Aram explicitly mentions defeating the king of the “House of David” (bytdwd), silencing critics who claimed David was fictional.',
        worldEmpireParallel:
          'Neo-Assyrian expansion under Shalmaneser III; Homeric oral tradition developing in the Aegean.',
        geographicRegion: 'Dan / Upper Jordan River Springs',
        coordinates: '33°14′N 35°39′E',
        inquiryPrompt:
          'When an enemy king brags on basalt about defeating the "House of David", what does that tell us about the credibility of the historical record?',
      },
      {
        id: 'iron-siloam-tunnel',
        yearBceOrCe: 'c. 701 BCE',
        yearNumeric: -701,
        title: 'Hezekiah’s Water Conduit & The Siloam Inscription',
        subtitle: '1,750-Foot Subterranean Defense Engineering Under Siege',
        biblicalAnchor: '2 Kings 20:20 & Isaiah 22:9–11',
        biblicalTextSnippet:
          '“He made the pool and the conduit and brought water into the city…”',
        archaeologicalArtifact: 'Siloam Paleo-Hebrew Rock Inscription',
        museumLocation: 'Istanbul Archaeology Museums, Turkey',
        artifactSignificance:
          'Carved into solid bedrock by two teams of miners digging toward each other in darkness with pickaxes to secure water from Gihon Spring before the Assyrian siege of Sennacherib.',
        worldEmpireParallel:
          'Sennacherib’s Neo-Assyrian Empire at its military peak; Assyrian relief panels carved in Nineveh.',
        geographicRegion: 'City of David / Ophel Ridge, Jerusalem',
        coordinates: '31°46′N 35°14′E',
        inquiryPrompt:
          'Why did Hebrew engineers carve an inscription celebrating the sound of each other’s pickaxes rather than praising a monarch?',
      },
    ],
  },
  {
    id: 'persian',
    name: 'Babylonian Exile & Persian Restoration',
    periodSpan: 'c. 586 – 332 BCE',
    dateRangeLabel: '586–332 BCE',
    summary:
      'Jerusalem’s destruction, deep communal lament along the canals of Babylon, and Cyrus the Great’s historic decree permitting displaced peoples to return home.',
    colorToken: '#4A5D4E',
    events: [
      {
        id: 'persian-cyrus-cylinder',
        yearBceOrCe: '539 BCE',
        yearNumeric: -539,
        title: 'The Cyrus Cylinder & The Edict of Restoration',
        subtitle: 'First Imperial Human Rights Charter for Displaced Captives',
        biblicalAnchor: 'Ezra 1:1–4 & 2 Chronicles 36:22–23',
        biblicalTextSnippet:
          '“Thus says Cyrus king of Persia: The Lord, the God of heaven, has given me all the kingdoms of the earth, and he has charged me to build him a house at Jerusalem…”',
        archaeologicalArtifact: 'Baked Clay Barrel-Cylinder in Babylonian Cuneiform',
        museumLocation: 'British Museum, London (Room 52)',
        artifactSignificance:
          'Discovered in Babylon in 1879, Cyrus the Great decrees that conquered peoples may return to their ancestral lands and rebuild their sanctuaries—mirroring Ezra 1 with precise administrative language.',
        worldEmpireParallel:
          'Achaemenid Persian Empire; Golden Age of Athens and early Greek philosophy (Socrates & Pythagoras).',
        geographicRegion: 'Babylon (Iraq) → Yehud Medinata (Persian Judah)',
        coordinates: '32°32′N 44°25′E',
        inquiryPrompt:
          'What happens to a community’s faith when it shifts from a royal stone palace to small communal scrolls copied during exile?',
      },
    ],
  },
  {
    id: 'second-temple',
    name: 'Second Temple & Roman Levant',
    periodSpan: 'c. 63 BCE – 70 CE',
    dateRangeLabel: '63 BCE–70 CE',
    summary:
      'Herod’s monumental limestone architecture, Greco-Roman olive and fishing economies, Dead Sea sectarians preserving ancient scrolls, and the life of Jesus.',
    colorToken: '#92400E',
    events: [
      {
        id: 'temple-dead-sea-scrolls',
        yearBceOrCe: 'c. 150 BCE – 68 CE',
        yearNumeric: -50,
        title: 'The Qumran Cave Scrolls & The Great Isaiah Scroll',
        subtitle: 'Bedouin Discovery of Over 900 Ancient Parchment Manuscripts',
        biblicalAnchor: 'Isaiah 40:3 & 53 (Preserved Whole)',
        biblicalTextSnippet:
          '“The grass withers, the flower fades, but the word of our God will stand forever.”',
        archaeologicalArtifact: 'The Great Isaiah Scroll (1QIsaᵃ)',
        museumLocation: 'The Shrine of the Book, Jerusalem',
        artifactSignificance:
          'A complete 24-foot leather scroll of Isaiah dated to 125 BCE, preserved in sealed clay jars for 2,000 years in desert caves, confirming biblical text transmission accuracy across millennia.',
        worldEmpireParallel:
          'Late Roman Republic transitioning into Pax Romana under Caesar Augustus; Han Dynasty Silk Road trade.',
        geographicRegion: 'Qumran Desert Cliffs, Dead Sea North Shore',
        coordinates: '31°44′N 35°27′E',
        inquiryPrompt:
          'Why did desert scribes spend decades copying Hebrew poetry onto leather skins inside remote limestone caves?',
      },
      {
        id: 'temple-capernaum-synagogue',
        yearBceOrCe: 'c. 28 CE',
        yearNumeric: 28,
        title: 'Capernaum Fishing Harbor & First-Century Basalt Synagogue',
        subtitle: 'The Operational Center of Jesus’ Public Galilean Ministry',
        biblicalAnchor: 'Mark 1:21–28 & Luke 4:31–37',
        biblicalTextSnippet:
          '“And they went into Capernaum, and immediately on the Sabbath he entered the synagogue and was teaching…”',
        archaeologicalArtifact: 'Black Basalt Foundation Stones & Olive Oil Presses',
        museumLocation: 'Capernaum Archaeological Park, Sea of Galilee',
        artifactSignificance:
          'Franciscan excavations uncovered 1st-century black basalt cobblestones beneath a later 4th-century limestone synagogue, directly adjacent to Peter’s octagonal insula house.',
        worldEmpireParallel:
          'Roman Empire under Emperor Tiberius; Pontius Pilate serving as prefect of Judaea.',
        geographicRegion: 'Kfar Nahum (Sea of Galilee North Shore)',
        coordinates: '32°52′N 35°34′E',
        inquiryPrompt:
          'How does knowing that Jesus taught in a small volcanic stone fishing village strip away grandiose religious clichés?',
      },
    ],
  },
];

interface InteractiveHistoricalTimelineProps {
  onEngageContent?: (points: number, label: string) => void;
  onOpenJourneyModal?: (tierId: 'bedtime' | 'archive' | 'harbor') => void;
  isNightSanctuary?: boolean;
}

export default function InteractiveHistoricalTimeline({
  onEngageContent,
  onOpenJourneyModal,
  isNightSanctuary = false,
}: InteractiveHistoricalTimelineProps) {
  const [selectedEraId, setSelectedEraId] = useState<TimelineEra['id']>('iron');
  const [selectedEventId, setSelectedEventId] = useState<string>('iron-tel-dan');
  const [viewMode, setViewMode] = useState<'timeline' | 'artifact-detail' | 'world-compare'>('timeline');
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  const activeEra = HISTORICAL_ERAS.find((e) => e.id === selectedEraId) || HISTORICAL_ERAS[1];
  const activeEvent =
    activeEra.events.find((ev) => ev.id === selectedEventId) ||
    HISTORICAL_ERAS.flatMap((e) => e.events).find((ev) => ev.id === selectedEventId) ||
    activeEra.events[0];

  const handleSelectEra = (eraId: TimelineEra['id']) => {
    setSelectedEraId(eraId);
    const targetEra = HISTORICAL_ERAS.find((e) => e.id === eraId);
    if (targetEra && targetEra.events.length > 0) {
      setSelectedEventId(targetEra.events[0].id);
    }
    onEngageContent?.(10, `Explored Historical Era: ${targetEra?.name || eraId}`);
  };

  const handleSelectEvent = (event: TimelineEvent) => {
    setSelectedEventId(event.id);
    onEngageContent?.(15, `Inspected Historical Evidence: ${event.title}`);
  };

  const scrollTimeline = (direction: 'left' | 'right') => {
    if (horizontalScrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      horizontalScrollRef.current.scrollBy({left: offset, behavior: 'smooth'});
    }
  };

  return (
    <div className="rounded-2xl border border-[#E5DEC9] bg-[#FAF7F2] p-6 sm:p-8 lg:p-10 space-y-8 shadow-xs">
      {/* Header with Era Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E5DEC9]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#92400E]">
            <Clock className="w-4 h-4 text-[#D97706]" />
            <span>The Ancient Archive · Cross-Civilization Interactive Timeline</span>
          </div>
          <h3
            className="mt-1 text-2xl sm:text-3xl font-normal text-[#1C1917]"
            style={{fontFamily: 'var(--font-display), serif'}}
          >
            Ancient History Without Platitudes
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#57534E] max-w-2xl leading-relaxed">
            Scroll horizontally across 2,000 years of Near Eastern archaeological discoveries.
            Every biblical narrative is anchored to tangible clay, stone, and papyrus.
          </p>
        </div>

        {/* View Mode Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F2ECE1] border border-[#E5DEC9] rounded-xl self-start">
          <button
            type="button"
            onClick={() => setViewMode('timeline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'timeline'
                ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            Chronology Track
          </button>
          <button
            type="button"
            onClick={() => setViewMode('artifact-detail')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'artifact-detail'
                ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            Artifact Inspector
          </button>
          <button
            type="button"
            onClick={() => setViewMode('world-compare')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'world-compare'
                ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            World Empires
          </button>
        </div>
      </div>

      {/* Era Navigation Ribbons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {HISTORICAL_ERAS.map((era) => {
          const isSelected = selectedEraId === era.id;
          return (
            <button
              key={era.id}
              type="button"
              onClick={() => handleSelectEra(era.id)}
              className={`p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] shadow-md ring-2 ring-[#D97706]/40'
                  : 'bg-[#F2ECE1] text-[#1C1917] border-[#E5DEC9] hover:border-[#D97706]/50'
              }`}
            >
              <div>
                <span
                  className="text-[11px] font-mono tabular-nums tracking-wide text-[#D97706]"
                  style={{fontFamily: 'var(--font-mono), monospace'}}
                >
                  {era.dateRangeLabel}
                </span>
                <h4
                  className="text-sm font-semibold mt-1"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  {era.name}
                </h4>
              </div>
              <div
                className={`mt-3 pt-2 text-[11px] border-t flex items-center justify-between ${
                  isSelected ? 'border-[#292524] text-[#FBBF24]' : 'border-[#E5DEC9] text-[#78716C]'
                }`}
              >
                <span>{era.events.length} Artifact Clues</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* HORIZONTAL TIMELINE TRACK WITH FRAMER MOTION ANIMATED SCROLLER */}
      <div className="relative p-5 rounded-2xl bg-[#F2ECE1] border border-[#E5DEC9] overflow-hidden">
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
            <Layers className="w-4 h-4 text-[#D97706]" />
            <span>Interactive Horizontal Track · Drag or Tap Artifact Nodes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollTimeline('left')}
              aria-label="Scroll left"
              className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] hover:bg-[#E5DEC9] text-[#1C1917] cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTimeline('right')}
              aria-label="Scroll right"
              className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] hover:bg-[#E5DEC9] text-[#1C1917] cursor-pointer transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Track Scroll Container */}
        <div
          ref={horizontalScrollRef}
          tabIndex={0}
          role="region"
          aria-label="Biblical Eras and Artifacts Timeline"
          className="flex items-stretch gap-4 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scrollbar-thin focus:outline-none focus:ring-1 focus:ring-[#D97706]"
        >
          {HISTORICAL_ERAS.flatMap((era) => era.events).map((ev) => {
            const isEventActive = activeEvent.id === ev.id;
            return (
              <motion.div
                key={ev.id}
                layout
                whileHover={{y: -3}}
                onClick={() => handleSelectEvent(ev)}
                className={`snap-start shrink-0 w-72 sm:w-80 rounded-xl p-5 border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isEventActive
                    ? 'bg-[#1C1917] text-[#FAF7F2] border-[#D97706] shadow-lg ring-1 ring-[#D97706]'
                    : 'bg-[#FAF7F2] text-[#1C1917] border-[#E5DEC9] hover:border-[#D97706]/60'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-mono font-medium text-[#D97706] tabular-nums"
                      style={{fontFamily: 'var(--font-mono), monospace'}}
                    >
                      {ev.yearBceOrCe}
                    </span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
                        isEventActive
                          ? 'bg-[#292524] text-[#FBBF24]'
                          : 'bg-[#F2ECE1] text-[#92400E]'
                      }`}
                      style={{fontFamily: 'var(--font-mono), monospace'}}
                    >
                      {ev.biblicalAnchor.split(' ')[0]}
                    </span>
                  </div>

                  <h5
                    className="text-base font-normal leading-snug"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    {ev.title}
                  </h5>

                  <p
                    className={`text-xs leading-relaxed line-clamp-2 ${
                      isEventActive ? 'text-[#D6D3D1]' : 'text-[#57534E]'
                    }`}
                  >
                    {ev.subtitle}
                  </p>
                </div>

                <div
                  className={`mt-4 pt-3 border-t text-[11px] flex items-center justify-between ${
                    isEventActive
                      ? 'border-[#292524] text-[#FBBF24]'
                      : 'border-[#E5DEC9] text-[#92400E]'
                  }`}
                >
                  <span className="truncate max-w-[200px]">{ev.archaeologicalArtifact}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* SELECTED EVENT DEEP-DIVE DRAWER (ANIMATED WITH FRAMER MOTION) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEvent.id + viewMode}
          initial={{opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -12}}
          transition={{duration: 0.3, ease: 'easeOut'}}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Main Inspection Column (7 cols) */}
          <div className="lg:col-span-7 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-[#E5DEC9]">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded bg-[#F2ECE1] text-[#92400E] font-medium"
                  style={{fontFamily: 'var(--font-mono), monospace'}}
                >
                  {activeEvent.yearBceOrCe}
                </span>
                <span className="text-xs text-[#57534E]">·</span>
                <span className="text-xs font-semibold text-[#1C1917]">
                  {activeEvent.biblicalAnchor}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#57534E]">
                <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{activeEvent.geographicRegion}</span>
              </div>
            </div>

            <div>
              <h4
                className="text-2xl sm:text-3xl font-normal text-[#1C1917]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                {activeEvent.title}
              </h4>
              <p className="mt-1 text-sm text-[#92400E] font-medium">
                {activeEvent.subtitle}
              </p>
            </div>

            {/* Scripture in Historical Context */}
            <blockquote
              className="p-4 rounded-xl bg-[#F2ECE1] border-l-4 border-[#D97706] text-sm text-[#1C1917] italic leading-relaxed"
              style={{fontFamily: 'var(--font-display), serif'}}
            >
              {activeEvent.biblicalTextSnippet}
              <span className="block not-italic text-xs text-[#78716C] mt-2 font-mono">
                — {activeEvent.biblicalAnchor}
              </span>
            </blockquote>

            {/* Physical Artifact Discovery Card */}
            <div className="p-5 rounded-xl bg-white border border-[#E5DEC9] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
                  <Landmark className="w-4 h-4 text-[#D97706]" />
                  <span>Physical Museum Artifact: {activeEvent.archaeologicalArtifact}</span>
                </div>
                <span className="text-[11px] font-mono text-[#78716C]">
                  {activeEvent.coordinates}
                </span>
              </div>

              <p className="text-xs text-[#44403C] leading-relaxed">
                {activeEvent.artifactSignificance}
              </p>

              <div className="pt-2 border-t border-[#E5DEC9] flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E]">
                <span className="font-medium text-[#92400E]">
                  Curated at: {activeEvent.museumLocation}
                </span>
                <span className="text-[11px] text-[#78716C]">
                  Peer-Reviewed Near Eastern Archaeology
                </span>
              </div>
            </div>

            {/* Non-Coercive Socratic Inquiry Prompt */}
            <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#92400E]">
                <HelpCircle className="w-4 h-4 text-[#D97706]" />
                <span>Historical Investigation Prompt for Readers</span>
              </div>
              <p className="text-xs sm:text-sm text-[#1C1917] leading-relaxed">
                “{activeEvent.inquiryPrompt}”
              </p>
            </div>
          </div>

          {/* Right Column: World Empire Parallels & Archaeological Notes (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* World Empires Comparison Card */}
            <div className="p-6 rounded-xl bg-[#1C1917] text-[#FAF7F2] border border-[#292524] space-y-4 shadow-sm">
              <div className="flex items-center justify-between text-xs text-[#D6D3D1] pb-3 border-b border-[#292524]">
                <div className="flex items-center gap-2 text-[#FBBF24] font-semibold">
                  <Compass className="w-4 h-4" />
                  <span>Synchronous World History</span>
                </div>
                <span
                  className="font-mono text-[11px] text-[#A8A29E]"
                  style={{fontFamily: 'var(--font-mono), monospace'}}
                >
                  Global Context
                </span>
              </div>

              <h5
                className="text-lg font-normal text-[#FAF7F2]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                What Was Happening in the Rest of the World?
              </h5>

              <p className="text-xs text-[#D6D3D1] leading-relaxed">
                {activeEvent.worldEmpireParallel}
              </p>

              <div className="pt-3 border-t border-[#292524] space-y-2 text-xs text-[#A8A29E]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FBBF24]" />
                  <span>Zero sectarian isolation: Bible read alongside world civilizations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FBBF24]" />
                  <span>Emphasizes linguistic, geographic, and economic realism</span>
                </div>
              </div>
            </div>

            {/* Family Discussion Anchor */}
            <div className="p-6 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#92400E]">
                <BookOpen className="w-4 h-4" />
                <span>Archive Pedagogy (Ages 8–12)</span>
              </div>

              <h5
                className="text-base font-normal text-[#1C1917]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                How Tweens Build Resilient Faith
              </h5>

              <p className="text-xs text-[#57534E] leading-relaxed">
                Around age 9, children transition from magical thinking to concrete evidence.
                Showing them the Cyrus Cylinder or Tel Dan Stele prevents the late-teen shock of
                assuming biblical stories were fairy tales invented out of thin air.
              </p>

              <button
                type="button"
                onClick={() => onOpenJourneyModal?.('archive')}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1C1917] hover:bg-[#292524] text-xs font-semibold text-[#FAF7F2] transition-colors cursor-pointer"
              >
                <span>Launch Full Historical Archive Module</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
