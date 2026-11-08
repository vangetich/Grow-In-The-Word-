'use client';

import React, {useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  Compass,
  MapPin,
  Scroll,
  Search,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
  Key,
  Layers,
  Lock,
  Unlock,
  Info,
  ChevronRight,
  Maximize2,
  RefreshCw,
  Award,
  Globe,
  Sliders,
  Eye,
  HelpCircle,
} from 'lucide-react';
import StudyTooltip from './StudyTooltip';

export type Phase3Screen = 'screen1-bridge' | 'screen2-desk' | 'screen3-case' | 'screen4-cipher';

export interface ArchaeologicalArtifact {
  id: string;
  name: string;
  era: string;
  location: string;
  material: string;
  archaeologicalSignificance: string;
  dailyLifeContext: string;
  scriptureAnchor: string;
  unlocked: boolean;
  iconSymbol: string;
}

export interface ExpeditionSite {
  id: string;
  title: string;
  subtitle: string;
  era: string;
  coordinates: {x: number; y: number}; // percentages on map
  scriptureReference: string;
  expeditionTheme: string;
  artifactToUnlock: string;
  briefing: {
    intelHook: string;
    historicalSetting: string;
    investigationGoal: string;
  };
  caseNarrative: {
    heading: string;
    leadParagraph: string;
    bodyParagraph: string;
    lifeRealitiesTitle: string;
    lifeRealitiesDetails: string[];
    archaeologicalEvidence: string;
  };
  cipherChallenge: {
    type: 'root-meaning' | 'trade-routes';
    title: string;
    prompt: string;
    hint: string;
    options: {
      id: string;
      label: string;
      sublabel: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  };
}

export const INITIAL_ARTIFACTS: ArchaeologicalArtifact[] = [
  {
    id: 'clay-bullae',
    name: 'Clay Bullae Seal Impression',
    era: '701 BCE · Iron Age II',
    location: 'City of David, Jerusalem',
    material: 'Fired Clay with Papyrus Twine Fiber Imprints',
    archaeologicalSignificance:
      'Excavated administrative clay seals that fastened legal scrolls. When ancient palaces burned, the papyrus was consumed by fire, but the wet clay seals were fired into stone—preserving exact personal names from biblical chronicles.',
    dailyLifeContext:
      'Ancient officials pressed their signet rings into wet clay lumps like a signature. It proved that a grain invoice or royal dispatch had not been tampered with along the caravan road.',
    scriptureAnchor: 'Jeremiah 32:10–14 & 2 Kings 19',
    unlocked: true,
    iconSymbol: '🏺',
  },
  {
    id: 'herodian-lamp',
    name: 'Herodian Terracotta Oil Lamp',
    era: '1st Century CE · Early Roman',
    location: 'Lower City of Jerusalem & Judean Hills',
    material: 'Wheel-thrown Pinkish-Buff Terracotta with Soot Nozzle',
    archaeologicalSignificance:
      'Spout lamp designed with minimal decorative flourishes in strict accordance with Second Temple aniconic sensibilities. Olive oil fueled a small flax wick that could burn for roughly 3 hours.',
    dailyLifeContext:
      'Homes had no glass windows, only tiny slits high up for air. Without this handheld clay lamp, entering a room at dusk meant total darkness.',
    scriptureAnchor: 'Psalm 119:105 & Matthew 25:1–4',
    unlocked: false,
    iconSymbol: '🪔',
  },
  {
    id: 'roman-sandal-nail',
    name: 'Iron Caliga Sandal Hobnail',
    era: '50 CE · Roman Imperial Provincial',
    location: 'Via Egnatia & Corinthian Paved Forum',
    material: 'Hand-Forged Wrought Iron with Faceted Hemispherical Head',
    archaeologicalSignificance:
      'Hundreds of these heavy faceted iron nails have been recovered along paved military roads. A Roman legionary or traveling courier wore sandals studded with 80–100 iron hobnails to prevent leather soles from shredding over limestone flagstones.',
    dailyLifeContext:
      'Paul walked over 10,000 miles across the Roman empire. Hearing the rhythmic metallic crunch of iron nails on stone meant an imperial tax collector, soldier, or merchant convoy was approaching.',
    scriptureAnchor: 'Acts 18:1–3 & Ephesians 6:15',
    unlocked: false,
    iconSymbol: '⚒️',
  },
  {
    id: 'leather-awl',
    name: 'Cilician Tentmaker’s Bone & Bronze Awl',
    era: '1st Century CE · Provincial Greece',
    location: 'Corinth Commercial Workshop District',
    material: 'Polished Cattle Bone Handle with Hardened Bronze Needle Point',
    archaeologicalSignificance:
      'A piercing tool used by leatherworkers to bore stitching holes through thick, greasy goatskin cloth (cilicium). Working leather caused calloused, stained hands—a physical badge of manual labor in Roman Corinth.',
    dailyLifeContext:
      'Rather than relying on wealthy patrons who could control his message, Paul rented a small ground-floor workshop booth in Corinth and stitched tents with Priscilla and Aquila from sunrise to midday.',
    scriptureAnchor: 'Acts 18:3 & 1 Corinthians 4:12',
    unlocked: false,
    iconSymbol: '📜',
  },
];

export const EXPEDITION_SITES: ExpeditionSite[] = [
  {
    id: 'ur-migration',
    title: 'Ur: The Desert Migration',
    subtitle: 'Bronze Age Mesopotamia · The Great Departure',
    era: 'c. 1900 BCE · Middle Bronze Age',
    coordinates: {x: 78, y: 64},
    scriptureReference: 'Genesis 12:1–4',
    expeditionTheme: 'Uprooting privilege for an unmapped desert horizon',
    artifactToUnlock: 'clay-bullae',
    briefing: {
      intelHook: 'Why leave the wealthiest walled metropolis on Earth to pitch wool tents in the desert?',
      historicalSetting:
        'Ur was no primitive village. It possessed complex canal irrigation, three-story brick residences, international trade docks connecting India to the Persian Gulf, and high-level astronomical records.',
      investigationGoal:
        'Examine how Abraham’s journey was not a primitive camping trip, but an audacious renunciation of urban imperial security for an unmapped promise.',
    },
    caseNarrative: {
      heading: 'Case File 01: Leaving the River Empire',
      leadParagraph:
        'In the 19th century BCE, the city of Ur was the beating commercial heart of the Mesopotamian plain. Barges lined the Euphrates loaded with carnelian beads from the Indus Valley and cedar logs from the Mediterranean coast. Its citizens slept behind towering baked-brick ramparts.',
      bodyParagraph:
        'When Abraham received the summons to "Go from your country, your people, and your father’s household," he was not moving from one rustic camp to another. He was liquidating generational urban capital to embrace the vulnerability of the semi-nomadic pastoralist.',
      lifeRealitiesTitle: 'What Was Life Really Like?',
      lifeRealitiesDetails: [
        'Water dictated survival: Leaving the Euphrates canal system meant living entirely at the mercy of seasonal wadi flash floods and deep hand-dug wells.',
        'Woven black goatskin tents: Wool and goatskin fibers naturally swelled when wet, creating a watertight roof during winter downpours while venting heat in the summer desert.',
        'Covenant oath customs: Treaties were not signed on paper. Animals were halved, and participants walked between the pieces—a visceral pledge that "may I become like this if I break my word."',
      ],
      archaeologicalEvidence:
        'Excavated cuneiform clay tablets from Ur and Mari show private land deeds and wool caravan inventories, proving that ancient pastoralists operated in close economic orbit with major city-states.',
    },
    cipherChallenge: {
      type: 'root-meaning',
      title: 'Decipher the Covenant Loyalty Root: Hesed (חֶסֶד)',
      prompt:
        'In ancient near eastern commerce, agreements were transactional: "I do for you so that you do for me." What revolutionary posture did the ancient Hebrew word HESED introduce into desert covenants?',
      hint: 'Think about what happens when one party becomes completely powerless and cannot repay the debt.',
      options: [
        {
          id: 'opt-a',
          label: 'A rigid contract enforceable by municipal court judges',
          sublabel: 'Standard Babylonian Hammurabi legal framework',
          isCorrect: false,
          explanation: 'Babylonian contracts were legally binding, but lacked the unilateral, enduring grace of Hesed.',
        },
        {
          id: 'opt-b',
          label: 'Relentless, tender covenant loyalty that will not let go even when unpaid',
          sublabel: 'Radical steadfast kindness born of family promise',
          isCorrect: true,
          explanation:
            'Hesed is often translated as "steadfast love" or "lovingkindness"—it is covenant faithfulness freely kept when the other party is helpless to reciprocate.',
        },
        {
          id: 'opt-c',
          label: 'A magical protective spell chanted over caravan cargo',
          sublabel: 'Ancient Mesopotamian incantation practice',
          isCorrect: false,
          explanation: 'Hebrew scripture consistently rejected incantations and sympathetic magic in favor of ethical trust.',
        },
      ],
    },
  },
  {
    id: 'jerusalem-siege',
    title: 'Jerusalem: The Iron Age Water Siege',
    subtitle: '701 BCE · King Hezekiah & Sennacherib’s War Machine',
    era: '701 BCE · Iron Age II',
    coordinates: {x: 48, y: 52},
    scriptureReference: '2 Kings 19–20 & 2 Chronicles 32',
    expeditionTheme: 'Hydraulic engineering under military blockade',
    artifactToUnlock: 'clay-bullae',
    briefing: {
      intelHook: 'How did an isolated hilltop city survive the most ruthless empire on Earth without firing an arrow?',
      historicalSetting:
        'The Assyrian military engine conquered the known world with psychological terror, siege ramps, and battering rams. In 701 BCE, Sennacherib surrounded Jerusalem "like a bird in a cage."',
      investigationGoal:
        'Investigate the 1,750-foot underground limestone water conduit carved in secret to outlast the siege.',
    },
    caseNarrative: {
      heading: 'Case File 02: The Underground Chiselers',
      leadParagraph:
        'Before the first Assyrian horse appeared on the northern hills, King Hezekiah knew that Jerusalem’s fatal flaw was its water supply. The Gihon Spring lay outside the city walls in the Kidron Valley—ripe for capture by the enemy.',
      bodyParagraph:
        'Two teams of stonecutters began carving through solid bedrock from opposite ends, working blindly in pitch blackness with iron picks. They navigated by following karst subterranean sound waves, meeting in the middle to redirect fresh spring water deep into the city pool of Siloam.',
      lifeRealitiesTitle: 'What Was Life Really Like?',
      lifeRealitiesDetails: [
        'Oxygen was scarce: Carving 100 feet beneath limestone meant soot from olive oil lamps choked the air. Chiselers worked in frantic, coughing shifts.',
        'Psychological warfare: Assyrian envoys stood outside the city walls speaking Hebrew aloud, trying to terrify ordinary citizens into mutiny before the rams struck.',
        'Clay seals stored provisions: Royal storage jars with the stamp "LMLK" (Belonging to the King) held grain, olive oil, and wine gathered from rural villages to feed the besieged capital.',
      ],
      archaeologicalEvidence:
        'In 1880, a 16-year-old wading in the tunnel discovered the Siloam Inscription carved into the tunnel wall, recording the exact moment "the pick struck against pick, and the water flowed 1,200 cubits."',
    },
    cipherChallenge: {
      type: 'root-meaning',
      title: 'Decipher the Peace Root: Shalom (שָׁלוֹם)',
      prompt:
        'When Jerusalem’s citizens prayed for Shalom during a siege, modern English readers often imagine "quiet feelings" or absence of war. What did Shalom actually mean to an ancient Near Eastern community?',
      hint: 'Look beyond internal tranquility to the physical wholeness and restoration of an entire broken system.',
      options: [
        {
          id: 'opt-a',
          label: 'Silence and the absence of loud battlefield noise',
          sublabel: 'A psychological retreat into calm thoughts',
          isCorrect: false,
          explanation: 'Ancient Hebrew words were rarely abstract; Shalom was deeply tangible and communal.',
        },
        {
          id: 'opt-b',
          label: 'Complete restoration, holistic health, and societal repair until nothing is missing',
          sublabel: 'Wholeness where all broken debts and gaps are made sound',
          isCorrect: true,
          explanation:
            'Shalom comes from the root shalam, meaning "to make whole, complete, or pay back." It means a society where justice, water, bread, and safety are fully restored.',
        },
        {
          id: 'opt-c',
          label: 'A diplomatic surrender treaty granting tribute to the emperor',
          sublabel: 'Vassal status under imperial suzerainty',
          isCorrect: false,
          explanation: 'Imperial vassalage was subjection, the antithesis of biblical Shalom.',
        },
      ],
    },
  },
  {
    id: 'corinth-workshop',
    title: 'Corinth: The Tentmaker’s Bench',
    subtitle: '50 CE · Early Roman Empire & Mediterranean Trade',
    era: '50 CE · Early Roman Period',
    coordinates: {x: 24, y: 38},
    scriptureReference: 'Acts 18:1–4',
    expeditionTheme: 'Grit, manual craft, and subversive hospitality',
    artifactToUnlock: 'leather-awl',
    briefing: {
      intelHook: 'Why did an intellectual rabbinic scholar spend his prime years smelling of boiled goat hide and wax?',
      historicalSetting:
        'Corinth was the sin city and economic gateway of Greece. Ships dragged their hulls across the 4-mile Diolkos stone trackway between two gulfs to avoid treacherous sea storms.',
      investigationGoal:
        'Examine how early faith was not built in ivory towers or royal palaces, but on the greasy workbenches of Greek tradespeople.',
    },
    caseNarrative: {
      heading: 'Case File 03: Needles, Wax & Dangerous Free Speech',
      leadParagraph:
        'Every day in the Corinthian agora, high-born Roman patrons paraded with their entourages, while freedmen, sailors, and dockworkers crowded into tiny rented workshops. In one of those cramped street shops, Paul sat shoulder-to-shoulder with two Jewish refugees expelled from Rome: Aquila and Priscilla.',
      bodyParagraph:
        'Their hands were stained with black wax and scarred from heavy bronze awls. As customers dropped off sails to be repaired or travel tents to be patched, Socratic conversations erupted about a crucified carpenter who had turned the Roman empire’s pyramid upside down.',
      lifeRealitiesTitle: 'What Was Life Really Like?',
      lifeRealitiesDetails: [
        'Manual labor was despised: Elite Greco-Roman culture viewed physical work as degrading fit only for slaves. By voluntarily choosing tradeswork, Paul chose solidarity with the working class.',
        'The Diolkos port tax: Sailors spent their layover days in Corinth buying supplies. Tentmakers catered directly to traveling merchant caravans and deck crews.',
        'Radical table fellowship: In Roman dining clubs, seats and food were distributed strictly by social rank. The early Corinthian gathering shocked neighbors by seating wealthy magistrates next to enslaved dock hands.',
      ],
      archaeologicalEvidence:
        'Excavations in the Corinthian forum uncovered ground-floor tabernae (artisan shops) complete with drainage basins, stone benches, and inscriptions of municipal officials like Erastus (Romans 16:23).',
    },
    cipherChallenge: {
      type: 'root-meaning',
      title: 'Decipher the Sacrificial Love Root: Agape (ἀγάπη)',
      prompt:
        'Greek possessed four distinct words for love: Eros (romantic desire), Philia (brotherly friendship), Storge (family affection), and Agape. In the rough streets of Corinth, what made AGAPE revolutionary?',
      hint: 'Think about whether Agape depends on how attractive or useful the other person is to you.',
      options: [
        {
          id: 'opt-a',
          label: 'An intense emotional feeling experienced when listening to temple music',
          sublabel: 'Mystical ecstatic passion',
          isCorrect: false,
          explanation: 'Agape is defined in scripture by actions and self-giving choice, not fleeting mystical thrills.',
        },
        {
          id: 'opt-b',
          label: 'Unconditional, willful goodwill that actively seeks the other’s good at personal cost',
          sublabel: 'Love directed even toward enemies and those who cannot repay',
          isCorrect: true,
          explanation:
            'Agape is other-centered, self-giving love. In 1 Corinthians 13, Paul describes it not as poetry, but as patience, kindness, and bearing all things in community.',
        },
        {
          id: 'opt-c',
          label: 'A business partnership contract among maritime guild members',
          sublabel: 'Commercial solidarity in trade',
          isCorrect: false,
          explanation: 'Guild partnerships were Philia based on mutual financial advantage.',
        },
      ],
    },
  },
];

export const ROADMAP_14_DAY = [
  {day: 1, figure: 'The Ancient Vault', era: 'Overview', theme: 'How a 66-book library survived centuries'},
  {day: 3, figure: 'Abraham & Sarah', era: 'c. 1900 BCE', theme: 'Leaving imperial safety for the unmapped desert'},
  {day: 5, figure: 'Joseph in Egypt', era: 'c. 1700 BCE', theme: 'Grain silos, betrayal, and surviving a foreign court'},
  {day: 7, figure: 'Ruth the Moabite', era: 'c. 1100 BCE', theme: 'Famine, immigrant resilience, and radical solidarity'},
  {day: 9, figure: 'David on the Run', era: 'c. 1010 BCE', theme: 'Outlaw hideouts in the desert caves of En-Gedi'},
  {day: 11, figure: 'Hezekiah’s Siege', era: '701 BCE', theme: 'Chiseling underground water tunnels under blockade'},
  {day: 13, figure: 'Daniel in Babylon', era: 'c. 605 BCE', theme: 'Cultural survival without losing your intellectual integrity'},
  {day: 14, figure: 'The Tentmakers', era: '50 CE', theme: 'Manual craft, street philosophy, and the early movement'},
];

interface AncientArchiveExplorerProps {
  onEngageContent?: (points: number, label: string) => void;
  onOpenJourneyModal?: (defaultTier: 'bedtime' | 'archive' | 'harbor') => void;
  initialScreen?: Phase3Screen;
}

export default function AncientArchiveExplorer({
  onEngageContent,
  onOpenJourneyModal,
  initialScreen = 'screen1-bridge',
}: AncientArchiveExplorerProps) {
  const [activeScreen, setActiveScreen] = useState<Phase3Screen>(initialScreen);
  const [selectedSiteId, setSelectedSiteId] = useState<string>('jerusalem-siege');
  const [artifacts, setArtifacts] = useState<ArchaeologicalArtifact[]>(INITIAL_ARTIFACTS);
  const [selectedArtifactId, setSelectedArtifactId] = useState<string>('clay-bullae');
  const [isArtifactInspectorOpen, setIsArtifactInspectorOpen] = useState(false);
  const [isExhibitionCaseOpen, setIsExhibitionCaseOpen] = useState(false);
  const [isPlainEnglishShieldActive, setIsPlainEnglishShieldActive] = useState(true);

  // Cipher mechanics
  const [selectedCipherOptionId, setSelectedCipherOptionId] = useState<string | null>(null);
  const [cipherFeedback, setCipherFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [unlockedCelebration, setUnlockedCelebration] = useState(false);

  const activeSite = EXPEDITION_SITES.find((s) => s.id === selectedSiteId) || EXPEDITION_SITES[0];
  const activeArtifact =
    artifacts.find((a) => a.id === selectedArtifactId) || artifacts[0];
  const unlockedCount = artifacts.filter((a) => a.unlocked).length;

  const handleSelectSite = (siteId: string) => {
    setSelectedSiteId(siteId);
    setSelectedCipherOptionId(null);
    setCipherFeedback('idle');
    const site = EXPEDITION_SITES.find((s) => s.id === siteId);
    if (site) {
      setSelectedArtifactId(site.artifactToUnlock);
      onEngageContent?.(15, `Inspected Expedition Site: ${site.title}`);
    }
  };

  const handleOpenArtifactDetail = (artifactId: string) => {
    setSelectedArtifactId(artifactId);
    setIsArtifactInspectorOpen(true);
    const item = artifacts.find((a) => a.id === artifactId);
    onEngageContent?.(10, `Inspected Archaeological Artifact: ${item?.name || 'Artifact'}`);
  };

  const handleVerifyCipher = () => {
    if (!selectedCipherOptionId) return;
    const option = activeSite.cipherChallenge.options.find(
      (o) => o.id === selectedCipherOptionId
    );
    if (option?.isCorrect) {
      setCipherFeedback('correct');
      setUnlockedCelebration(true);
      // Mark artifact as unlocked
      setArtifacts((prev) =>
        prev.map((a) =>
          a.id === activeSite.artifactToUnlock ? {...a, unlocked: true} : a
        )
      );
      onEngageContent?.(
        35,
        `Solved Ancient Linguistic Cipher & Unlocked Artifact: ${activeSite.cipherChallenge.title}`
      );
    } else {
      setCipherFeedback('incorrect');
      onEngageContent?.(5, 'Attempted Historical Cipher Challenge');
    }
  };

  const handleSealExpedition = () => {
    setUnlockedCelebration(false);
    setActiveScreen('screen2-desk');
    onEngageContent?.(20, `Sealed Expedition Case: ${activeSite.title}`);
  };

  return (
    <div
      id="ancient-archive-explorer"
      className="w-full max-w-full rounded-2xl bg-[#F9F6F0] text-[#1A1A1A] border border-[#E5DEC9] shadow-sm overflow-hidden transition-colors relative"
    >
      {/* PHASE 3 TOP NAV BANNER */}
      <div className="px-5 sm:px-6 py-3.5 bg-[#F2ECE1] border-b border-[#E5DEC9] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#D97706]/20 border border-[#D97706]/40 flex items-center justify-center text-[#D97706]">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-mono font-semibold uppercase text-[#92400E] tracking-wider text-[11px]">
              GROW IN THE WORD · PHASE 3
            </span>
            <span aria-hidden="true" className="mx-1.5 text-[#A8A29E]">·</span>
            <span className="font-semibold text-[#1C1917]">
              The Ancient Archive Detective Map & Late-Comer Bridge (Ages 8–12)
            </span>
          </div>
        </div>

        {/* Multi-Screen Switcher (Tabs) */}
        <div className="flex items-center gap-1.5 bg-[#FAF7F2] p-1 rounded-lg border border-[#E5DEC9] overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveScreen('screen1-bridge')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeScreen === 'screen1-bridge'
                ? 'bg-[#1C1917] text-[#FAF7F2]'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Screen 1: Late-Comer Bridge
          </button>
          <button
            type="button"
            onClick={() => setActiveScreen('screen2-desk')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeScreen === 'screen2-desk'
                ? 'bg-[#1C1917] text-[#FAF7F2]'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Screen 2: Explorer’s Desk
          </button>
          <button
            type="button"
            onClick={() => setActiveScreen('screen3-case')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeScreen === 'screen3-case'
                ? 'bg-[#1C1917] text-[#FAF7F2]'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Screen 3: Case & Inspector
          </button>
          <button
            type="button"
            onClick={() => setActiveScreen('screen4-cipher')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeScreen === 'screen4-cipher'
                ? 'bg-[#1C1917] text-[#FAF7F2]'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Screen 4: Cipher Mechanic
          </button>

          <StudyTooltip
            category="RELIC VAULT"
            label="Tween Scholar’s Exhibition Case"
            description="Every time you solve a historical cipher in Screen 4, its archaeological artifact is permanently unlocked here."
            hint="Tap to inspect unlocked relics"
            position="bottom"
            align="end"
          >
            <button
              type="button"
              onClick={() => setIsExhibitionCaseOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold bg-[#D97706]/15 hover:bg-[#D97706]/25 border border-[#D97706]/40 text-[#92400E] cursor-pointer whitespace-nowrap"
            >
              <Layers className="w-3 h-3 text-[#D97706]" />
              <span>Exhibition Case ({unlockedCount}/{artifacts.length})</span>
            </button>
          </StudyTooltip>
        </div>
      </div>

      {/* SCREEN 1: THE LATE-COMER BRIDGE (ROOTS & RESILIENCE ORIENTATION) */}
      {activeScreen === 'screen1-bridge' && (
        <div className="p-4 sm:p-8 lg:p-12 space-y-8">
          {/* Welcome Note Card */}
          <div className="relative rounded-2xl bg-[#F2ECE1] border border-[#E5DEC9] p-4 sm:p-8 space-y-5 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D97706]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5DEC9]">
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#92400E] uppercase tracking-wider">
                <Scroll className="w-4 h-4 text-[#D97706]" />
                <span>The Late-Comer Bridge · Absolute Integrity, Zero Pretense</span>
              </div>
              <div className="flex items-center gap-2">
                {/* The Plain-English Shield Toggle */}
                <StudyTooltip
                  category="NO-JARGON FILTER"
                  label="Plain-English Shield"
                  description="Translates ancient religious or scholarly terminology (like Covenant, Hesed, or Agora) into clear, everyday street language."
                  hint="Click to toggle plain-language definitions"
                  position="bottom"
                  align="end"
                >
                  <button
                    type="button"
                    onClick={() => setIsPlainEnglishShieldActive((prev) => !prev)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                      isPlainEnglishShieldActive
                        ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917]'
                        : 'bg-[#FAF7F2] text-[#57534E] border-[#E5DEC9]'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Plain-English Shield: {isPlainEnglishShieldActive ? 'ON' : 'OFF'}</span>
                  </button>
                </StudyTooltip>
              </div>
            </div>

            <div className="space-y-3 max-w-3xl">
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1A1A1A] leading-tight"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Welcome to the Archive.
              </h2>
              <blockquote className="text-base sm:text-lg text-[#374151] leading-relaxed italic border-l-2 border-[#D97706] pl-4">
                “Think of this less like a rulebook and more like a massive collection of ancient journals, letters, and eyewitness accounts from a turbulent past.”
              </blockquote>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Whether you’ve never opened a Bible before in your life or you’re arriving at age 12 with honest skepticism, there are no religious pop quizzes here. Everything is grounded in verifiable archaeology, Near Eastern geography, and real human survival.
              </p>
            </div>

            {/* Plain English Shield Inset Explanation */}
            {isPlainEnglishShieldActive && (
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D97706]/40 flex items-start gap-3 text-xs text-[#44403C]">
                <Info className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#1A1A1A]">Plain-English Shield Active:</strong> Whenever you encounter difficult ancient words (like <em>Covenant</em>, <em>Pharisee</em>, or <em>Hesed</em>), they are instantly defined in everyday street terms. No assumed church jargon.
                </p>
              </div>
            )}
          </div>

          {/* 14-Day "Roots & Resilience" Roadmap */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className="text-xl sm:text-2xl font-normal text-[#1A1A1A]"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  The 14-Day “Roots & Resilience” Roadmap
                </h3>
                <p className="text-xs text-[#57534E]">
                  A clean, pressure-free horizontal track introducing foundational historical figures through the lens of real-world survival.
                </p>
              </div>
              <span className="text-xs font-mono text-[#92400E] tabular-nums">
                Stage: Late-Comer Onboarding
              </span>
            </div>

            {/* Horizontal Timeline Track */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {ROADMAP_14_DAY.map((step) => (
                <div
                  key={step.day}
                  className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] hover:border-[#D97706]/60 transition-colors flex flex-col justify-between space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-[#D97706] tabular-nums">
                      Day 0{step.day}
                    </span>
                    <span className="text-[11px] font-mono text-[#78716C]">
                      {step.era}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1A1A1A]">
                      {step.figure}
                    </h4>
                    <p className="text-xs text-[#57534E] leading-relaxed mt-0.5">
                      {step.theme}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#E5DEC9]">
            <div className="text-xs text-[#57534E]">
              Ready to explore archaeological coordinates and inspect real artifacts?
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveScreen('screen2-desk');
                onEngageContent?.(15, 'Stepped through Late-Comer Bridge into Explorer’s Desk');
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1C1917] text-[#FAF7F2] hover:bg-[#292524] transition-all font-semibold text-sm cursor-pointer shadow-md"
            >
              <span>Open Your First Case File</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" />
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 2: THE EXPLORER'S DESK & GLOBAL MAP */}
      {activeScreen === 'screen2-desk' && (
        <div className="p-4 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
          {/* Desk Header & Case Status Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E5DEC9]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#92400E] uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5 text-[#D97706]" />
                <span>The Explorer’s Desk & Near Eastern Topographical Map</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-normal text-[#1A1A1A]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Ancient Near East & Mediterranean Expedition Map
              </h2>
            </div>

            {/* Case Status Bar (Adventure Inventory posture) */}
            <div className="flex items-center gap-3 bg-[#F2ECE1] p-2.5 rounded-xl border border-[#E5DEC9]">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#57534E]">Unlocked Relics:</span>
                <span className="font-mono font-bold text-[#92400E]">{unlockedCount} / {artifacts.length}</span>
              </div>
              <span className="text-[#E5DEC9]">|</span>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#57534E]">Active Site:</span>
                <span className="font-semibold text-[#1A1A1A]">{activeSite.title.split(':')[0]}</span>
              </div>
            </div>
          </div>

          {/* Topographical Map Canvas */}
          <div className="relative w-full rounded-2xl bg-[#EBE4D5] border-2 border-[#D6CBB7] p-4 sm:p-6 shadow-inner overflow-hidden min-h-[380px] sm:min-h-[460px] flex flex-col justify-between">
            {/* Parchment & Topo Grid Visual Accents */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(#92400E 1px, transparent 1px), radial-gradient(#92400E 1px, #EBE4D5 1px)',
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0, 20px 20px',
              }}
            />

            {/* Compass Rose Accent */}
            <div className="absolute top-4 right-4 pointer-events-none opacity-40">
              <Compass className="w-16 h-16 text-[#92400E]" />
            </div>

            {/* Map Regions Labels */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-[#78716C] tracking-wider sm:tracking-widest uppercase">
              <span>◄ Aegean Sea / Corinth</span>
              <span>Canaan &amp; Jerusalem</span>
              <span>Mesopotamia / Tigris &amp; Euphrates ►</span>
            </div>

            {/* Interactive Coordinate Pins on Map */}
            <div className="relative w-full h-[280px] sm:h-[320px]">
              {EXPEDITION_SITES.map((site) => {
                const isSelected = site.id === selectedSiteId;
                return (
                  <div
                    key={site.id}
                    style={{left: `${site.coordinates.x}%`, top: `${site.coordinates.y}%`}}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  >
                    <StudyTooltip
                      category={`GRID X:${site.coordinates.x}% · Y:${site.coordinates.y}%`}
                      label={`${site.title} (${site.era})`}
                      description={`Excavation anchor for ${site.scriptureReference}. Select this pin to load its field briefing and street-level artifact case.`}
                      hint="Tap pin to calibrate Expedition Desk"
                      position="top"
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectSite(site.id)}
                        className={`relative flex items-center justify-center p-2.5 rounded-full transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1C1917] text-[#FAF7F2] ring-4 ring-[#D97706]/40 scale-110 shadow-lg'
                            : 'bg-[#B45309] text-[#FAF7F2] hover:bg-[#1C1917] hover:scale-105 shadow-md'
                        }`}
                        aria-label={`Select site ${site.title}`}
                      >
                        <MapPin className="w-4 h-4 text-[#FDE68A]" />
                      </button>
                    </StudyTooltip>

                    {/* Pin Label Tooltip */}
                    <div
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-mono font-medium shadow-md transition-all pointer-events-none ${
                        isSelected
                          ? 'bg-[#1C1917] text-[#FAF7F2] border border-[#D97706]'
                          : 'bg-[#FAF7F2] text-[#1A1A1A] border border-[#E5DEC9] opacity-85 group-hover:opacity-100'
                      }`}
                    >
                      {site.title.split(':')[0]}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coordinate Grid Coordinates Bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#78716C] pt-2 border-t border-[#D6CBB7]/80">
              <StudyTooltip
                category="ARCHAEOLOGICAL TELEMETRY"
                label="Levant Basin Survey Coordinates"
                description="Real-world geographical reference frame spanning the Mediterranean coast, Judean hills, and Mesopotamian river valleys."
                hint={`Active Grid Pin: X ${activeSite.coordinates.x}% · Y ${activeSite.coordinates.y}%`}
                position="top"
                align="start"
                showIndicatorDot
              >
                <span className="cursor-help hover:text-[#1C1917] transition-colors underline decoration-dotted decoration-[#D97706]/60 underline-offset-4">
                  LAT 31°46&apos;N · LON 35°14&apos;E (LEVANT BASIN · GRID {activeSite.coordinates.x}E/{activeSite.coordinates.y}N)
                </span>
              </StudyTooltip>

              <StudyTooltip
                category="EXPEDITION RADAR"
                label="Copper Dial Artifact Calibration"
                description="Links each map coordinate directly to verifiable physical evidence—such as the Ketef Hinnom silver scrolls or Qumran clay jars."
                hint="Open Full Expedition Case below to inspect the relic"
                position="top"
                align="end"
                showIndicatorDot
              >
                <span className="cursor-help hover:text-[#1C1917] transition-colors underline decoration-dotted decoration-[#D97706]/60 underline-offset-4">
                  COPPER DIAL CALIBRATION: ACTIVE ARTIFACT RADAR
                </span>
              </StudyTooltip>
            </div>
          </div>

          {/* Unfolded Tactile "Case Briefing" Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#E5DEC9]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[#D97706] uppercase tracking-wider">
                  <StudyTooltip
                    category="CHRONOLOGICAL ANCHOR"
                    label="Site Coordinates & Historical Era"
                    description="Places the biblical text in its exact century so you can see what empires, trade routes, and daily survival pressures shaped the writer."
                    position="top"
                    align="start"
                    showIndicatorDot
                  >
                    <span className="cursor-help">Selected Site Coordinates · {activeSite.era}</span>
                  </StudyTooltip>
                </div>
                <h3
                  className="text-xl sm:text-2xl font-normal text-[#1A1A1A]"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  {activeSite.title}
                </h3>
                <p className="text-xs text-[#57534E]">
                  Scripture Anchor: <strong className="text-[#1A1A1A]">{activeSite.scriptureReference}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveScreen('screen3-case')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1C1917] text-[#FAF7F2] hover:bg-[#292524] text-xs font-semibold cursor-pointer shadow-xs"
                >
                  <span>Open Full Expedition Case</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D97706]" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-1.5">
                <div className="font-semibold text-[#92400E] uppercase text-[10px] tracking-wider font-mono">
                  The Intel Hook
                </div>
                <p className="text-[#374151] leading-relaxed">
                  {activeSite.briefing.intelHook}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-1.5">
                <div className="font-semibold text-[#92400E] uppercase text-[10px] tracking-wider font-mono">
                  Historical Setting
                </div>
                <p className="text-[#374151] leading-relaxed">
                  {activeSite.briefing.historicalSetting}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-1.5">
                <div className="font-semibold text-[#92400E] uppercase text-[10px] tracking-wider font-mono">
                  Investigation Goal
                </div>
                <p className="text-[#374151] leading-relaxed">
                  {activeSite.briefing.investigationGoal}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 3: THE EXPEDITION CASE & ARTIFACT INSPECTOR */}
      {activeScreen === 'screen3-case' && (
        <div className="p-4 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
          {/* Header & Site Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DEC9]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#92400E]">
                <span>Case File In Progress</span>
                <span aria-hidden="true">·</span>
                <span>{activeSite.title}</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-normal text-[#1A1A1A]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                {activeSite.caseNarrative.heading}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveScreen('screen2-desk')}
                className="px-3 py-1.5 rounded-lg border border-[#E5DEC9] bg-[#FAF7F2] text-xs font-semibold text-[#57534E] hover:text-[#1A1A1A] cursor-pointer"
              >
                Back to Map
              </button>
              <button
                type="button"
                onClick={() => setActiveScreen('screen4-cipher')}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#D97706] text-[#1A1A1A] font-semibold text-xs hover:bg-[#B45309] hover:text-[#FAF7F2] transition-colors cursor-pointer"
              >
                <span>Proceed to Cipher Challenge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Split Screen Layout: Narrative Text + Artifact Trigger Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Gritty Narrative Historical Text */}
            <div className="lg:col-span-8 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-4">
                <p className="text-sm sm:text-base text-[#1A1A1A] leading-relaxed">
                  {activeSite.caseNarrative.leadParagraph}
                </p>

                {/* Inline Embedded Artifact Inspection Trigger Banner */}
                <div className="my-4 p-4 rounded-xl bg-[#F2ECE1] border-2 border-[#D97706]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl shrink-0" role="img" aria-label="Artifact symbol">
                      {activeArtifact.iconSymbol}
                    </span>
                  <StudyTooltip
                    category="IN-SITU RECOVERY"
                    label="Archaeological Physical Evidence"
                    description="Concrete artifacts excavated from stratum layers dating precisely to the biblical narrative's time period."
                    hint="Tap Inspect Relic to examine high-res details"
                    position="bottom"
                    align="start"
                  >
                    <div className="min-w-0 cursor-help">
                      <div className="text-[11px] font-mono text-[#92400E] uppercase font-semibold">
                        Archaeological Evidence In-Situ
                      </div>
                      <div className="text-xs font-semibold text-[#1A1A1A] break-words">
                        {activeArtifact.name} ({activeArtifact.era})
                      </div>
                    </div>
                  </StudyTooltip>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenArtifactDetail(activeArtifact.id)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1C1917] text-[#FAF7F2] hover:bg-[#292524] text-xs font-medium cursor-pointer shrink-0"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Inspect Relic</span>
                </button>
              </div>

              <p className="text-sm sm:text-base text-[#374151] leading-relaxed">
                {activeSite.caseNarrative.bodyParagraph}
              </p>

              <div className="pt-2 text-xs text-[#78716C] font-mono border-t border-[#E5DEC9]">
                Physical Evidence: {activeSite.caseNarrative.archaeologicalEvidence}
              </div>
            </div>
          </div>

          {/* Right 4 Cols: "What Was Life Really Like?" Collapsible Drawer */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#92400E] uppercase tracking-wider font-mono">
                <BookOpen className="w-4 h-4 text-[#D97706]" />
                <span>{activeSite.caseNarrative.lifeRealitiesTitle}</span>
              </div>

              <p className="text-xs text-[#57534E]">
                Daily realities stripped of sanitized clichés. How people actually ate, worked, and survived:
              </p>

              <ul className="space-y-3">
                {activeSite.caseNarrative.lifeRealitiesDetails.map((detail, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] text-xs text-[#374151] leading-relaxed flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-1.5 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* SCREEN 4: THE CIPHER & PUZZLE MECHANIC */}
    {activeScreen === 'screen4-cipher' && (
      <div className="p-4 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DEC9]">
          <div>
            <StudyTooltip
              category="RETENTION GAME"
              label="Historical Decryption Cipher"
              description="Solve the historical survival riddle to demonstrate mastery of the cultural context and secure the artifact for your exhibition case."
              hint="Select the correct decryption tile below"
              position="bottom"
              align="start"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#D97706] uppercase tracking-wider cursor-help">
                <Key className="w-3.5 h-3.5" />
                <span>Screen 4 · Gamified Historical Retention</span>
              </div>
            </StudyTooltip>
            <h2
              className="text-2xl sm:text-3xl font-normal text-[#1A1A1A]"
              style={{fontFamily: 'var(--font-display), serif'}}
            >
              {activeSite.cipherChallenge.title}
            </h2>
          </div>

            <button
              type="button"
              onClick={() => setActiveScreen('screen3-case')}
              className="px-3 py-1.5 rounded-lg border border-[#E5DEC9] bg-[#FAF7F2] text-xs font-semibold text-[#57534E] hover:text-[#1A1A1A] cursor-pointer self-start sm:self-center"
            >
              Back to Case Reading
            </button>
          </div>

          {/* Decoding Tablet Workspace */}
          <div className="p-4 sm:p-8 rounded-2xl bg-[#EBE4D5] border-2 border-[#D6CBB7] shadow-inner space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#92400E]">
                The Decryption Prompt:
              </span>
              <p
                className="text-base sm:text-lg text-[#1A1A1A] font-normal leading-relaxed"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                {activeSite.cipherChallenge.prompt}
              </p>
              <div className="text-xs text-[#78716C] italic">
                Hint: {activeSite.cipherChallenge.hint}
              </div>
            </div>

            {/* Cipher Option Tiles */}
            <div className="grid grid-cols-1 gap-3.5">
              {activeSite.cipherChallenge.options.map((opt) => {
                const isSelected = selectedCipherOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSelectedCipherOptionId(opt.id);
                      setCipherFeedback('idle');
                    }}
                    className={`p-4 sm:p-5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] shadow-md ring-2 ring-[#D97706]'
                        : 'bg-[#FAF7F2] text-[#1A1A1A] border-[#D6CBB7] hover:border-[#D97706]/70'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <span className="text-sm font-semibold">{opt.label}</span>
                      <span
                        className={`text-[11px] font-mono ${
                          isSelected ? 'text-[#FDE68A]' : 'text-[#78716C]'
                        }`}
                      >
                        {opt.sublabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Bar & Feedback */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#D6CBB7]">
              <div>
                {cipherFeedback === 'correct' && (
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#166534]">
                    <Check className="w-4 h-4 text-[#166534]" />
                    <span>Cipher Solved! Artifact permanently unlocked for your Exhibition Case.</span>
                  </div>
                )}
                {cipherFeedback === 'incorrect' && (
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#991B1B]">
                    <span>Not quite. Re-read the hint above and inspect the street reality.</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleVerifyCipher}
                  disabled={!selectedCipherOptionId || cipherFeedback === 'correct'}
                  className="px-6 py-2.5 rounded-xl bg-[#1C1917] text-[#FAF7F2] hover:bg-[#292524] disabled:opacity-50 text-xs font-semibold transition-all cursor-pointer shadow-xs"
                >
                  Verify Decryption
                </button>

                {cipherFeedback === 'correct' && (
                  <button
                    type="button"
                    onClick={handleSealExpedition}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#D97706] text-[#1A1A1A] font-bold text-xs hover:bg-[#B45309] hover:text-[#FAF7F2] transition-colors cursor-pointer shadow-md"
                  >
                    <span>Seal Expedition & Claim Artifact</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ARTIFACT INSPECTOR DRAWER / MODAL */}
      <AnimatePresence>
        {isArtifactInspectorOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="artifact-inspector-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1A1A1A]/75 backdrop-blur-xs overflow-y-auto overflow-x-hidden w-full max-w-full"
          >
            <motion.div
              initial={{opacity: 0, scale: 0.96, y: 16}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={{opacity: 0, scale: 0.96, y: 12}}
              className="relative w-full max-w-2xl mx-auto rounded-2xl bg-[#F9F6F0] text-[#1A1A1A] border border-[#E5DEC9] shadow-2xl overflow-hidden my-auto"
            >
              {/* Header */}
              <div className="px-6 py-4 bg-[#F2ECE1] border-b border-[#E5DEC9] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-[#92400E]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>The Artifact Inspector · High-Res Archaeological Drawer</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsArtifactInspectorOpen(false)}
                  className="p-1 rounded-md text-[#78716C] hover:text-[#1A1A1A] cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#EBE4D5] border-2 border-[#D6CBB7] flex items-center justify-center text-3xl shrink-0 shadow-inner">
                    {activeArtifact.iconSymbol}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#D97706] uppercase">
                      {activeArtifact.era} · {activeArtifact.location}
                    </div>
                    <h3
                      id="artifact-inspector-title"
                      className="text-xl sm:text-2xl font-normal text-[#1A1A1A]"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      {activeArtifact.name}
                    </h3>
                    <div className="text-xs text-[#57534E]">
                      Material Composition: <strong>{activeArtifact.material}</strong>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-1">
                    <span className="font-mono uppercase text-[10px] text-[#92400E] font-semibold">
                      Archaeological Significance
                    </span>
                    <p className="text-[#374151]">
                      {activeArtifact.archaeologicalSignificance}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-1">
                    <span className="font-mono uppercase text-[10px] text-[#92400E] font-semibold">
                      Daily Life Reality
                    </span>
                    <p className="text-[#374151]">
                      {activeArtifact.dailyLifeContext}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] font-mono text-[11px] text-[#78716C]">
                    Scriptural Anchor: {activeArtifact.scriptureAnchor}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsArtifactInspectorOpen(false)}
                    className="px-5 py-2 rounded-xl bg-[#1C1917] text-[#FAF7F2] text-xs font-semibold cursor-pointer"
                  >
                    Return to Case Reading
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DIGITAL EXHIBITION CASE MODAL */}
      <AnimatePresence>
        {isExhibitionCaseOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exhibition-case-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1A1A1A]/75 backdrop-blur-xs overflow-y-auto overflow-x-hidden w-full max-w-full"
          >
            <motion.div
              initial={{opacity: 0, scale: 0.96, y: 16}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={{opacity: 0, scale: 0.96, y: 12}}
              className="relative w-full max-w-3xl mx-auto rounded-2xl bg-[#F9F6F0] text-[#1A1A1A] border border-[#E5DEC9] shadow-2xl overflow-hidden my-auto"
            >
              <div className="px-6 py-4 bg-[#F2ECE1] border-b border-[#E5DEC9] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-[#92400E]">
                  <Layers className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>The Tween Scholar&apos;s Exhibition Case · Unlocked Artifacts</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExhibitionCaseOpen(false)}
                  className="p-1 rounded-md text-[#78716C] hover:text-[#1A1A1A] cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-[#E5DEC9]">
                  <span className="text-[#57534E]">
                    Artifacts permanently secured through historical cipher decryptions:
                  </span>
                  <span className="font-mono font-bold text-[#92400E] tabular-nums">
                    {unlockedCount} / {artifacts.length} Claimed
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {artifacts.map((art) => (
                    <div
                      key={art.id}
                      className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                        art.unlocked
                          ? 'bg-[#FAF7F2] border-[#D97706]/60 shadow-xs'
                          : 'bg-[#F2ECE1]/60 border-[#E5DEC9] opacity-60'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#EBE4D5] border border-[#D6CBB7] flex items-center justify-center text-2xl shrink-0">
                        {art.unlocked ? art.iconSymbol : <Lock className="w-4 h-4 text-[#78716C]" />}
                      </div>
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#1A1A1A] truncate">
                            {art.name}
                          </span>
                          {art.unlocked && (
                            <span className="text-[10px] font-mono text-[#166534] bg-[#DCFCE7] px-1.5 py-0.5 rounded">
                              Claimed
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-[#78716C]">
                          {art.era}
                        </div>
                        <p className="text-[11px] text-[#57534E] line-clamp-2">
                          {art.dailyLifeContext}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsExhibitionCaseOpen(false)}
                    className="px-5 py-2 rounded-xl bg-[#1C1917] text-[#FAF7F2] text-xs font-semibold cursor-pointer"
                  >
                    Close Exhibition Case
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
