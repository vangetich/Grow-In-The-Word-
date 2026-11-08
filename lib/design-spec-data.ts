export interface ColorToken {
  name: string;
  token: string;
  hex: string;
  rgb: string;
  proportion: string;
  contrastRatio: string;
  role: string;
  psychRationale: string;
  darkText: boolean;
}

export interface HeroCopyVariant {
  id: 'flagship' | 'intellectual-trust' | 'family-rhythm';
  label: string;
  focusPillar: string;
  kicker: string;
  headline: string;
  subHeadline: string;
  copywriterRationale: string;
}

export interface AgeStageSnapshot {
  age: number;
  tierId: 'bedtime' | 'archive' | 'harbor';
  tierLabel: string;
  ageRangeLabel: string;
  readingMode: string;
  passageReference: string;
  passageTitle: string;
  primaryText: string;
  companionNoteTitle: string;
  companionNoteBody: string;
  interactivePrompt: string;
  uiCharacteristics: string[];
  typographySpec: string;
}

export interface TierSpecification {
  id: 'bedtime' | 'archive' | 'harbor';
  index: string;
  name: string;
  ageSpan: string;
  subtitle: string;
  signatureHook: string;
  rootsAndRhythmsCopy: string;
  visualConceptSpec: string;
  imagePath: string;
  imageAlt: string;
  expandedStrategistDescription: string;
  keyBenefits: string[];
  developmentalPosture: string;
  coreExperience: string;
  antiCringeGuardrail: string;
  uiArchitecture: {
    surfacePalette: string;
    typographyScale: string;
    primaryModality: string;
    sessionDuration: string;
  };
  sampleArtifact: {
    kicker: string;
    heading: string;
    excerpt: string;
    annotationLabel: string;
    annotationContent: string;
    interactiveFeatureLabel: string;
    interactiveFeatureDetail: string;
  };
  metrics: {
    statValue: string;
    statUnit: string;
    statContext: string;
  };
}

export interface CtaVisualStateSpec {
  id: 'resting' | 'hover' | 'focus' | 'active' | 'loading';
  stateName: string;
  trigger: string;
  cssProperties: string;
  visualChanges: string;
  psychologicalIntent: string;
}

export type FamiliarityLevelId = 'beginner' | 'some-stories' | 'deeper-dive';

export interface FamiliarityOptionSpec {
  id: FamiliarityLevelId;
  quoteLabel: string;
  internalCode: 'CURIOUS_EXPLORER' | 'STORY_CONNECTOR' | 'DEEP_DIVE_SCHOLAR';
  empathySubtitle: string;
  scaffoldingBehavior: string;
  glossarySupport: string;
}

export interface CustomEntryLaneResult {
  laneCode: string;
  laneTitle: string;
  tierId: 'bedtime' | 'archive' | 'harbor';
  tierName: string;
  age: number;
  birthYear: number;
  familiarityCode: 'CURIOUS_EXPLORER' | 'STORY_CONNECTOR' | 'DEEP_DIVE_SCHOLAR';
  startingTrackTitle: string;
  firstSessionPassage: string;
  welcomeCard: {
    kicker: string;
    headline: string;
    narrativeBody: string;
    actionableButtonLabel: string;
    moduleDuration: string;
    firstModulePreviewText: string;
    firstModulePrompt: string;
  };
  uiScaffoldingFlags: {
    jargonFreePrimer: boolean;
    inlineHistoricalGlossary: boolean;
    hebrewGreekRootLens: boolean;
    unabridgedSeminarNotes: boolean;
    circadianNightCanvas: boolean;
    zeroKnowledgeTeenVault: boolean;
  };
}

export const FAMILIARITY_OPTIONS_SPEC: FamiliarityOptionSpec[] = [
  {
    id: 'beginner',
    quoteLabel:
      '“I’m a total beginner—just curious and exploring for the first time.”',
    internalCode: 'CURIOUS_EXPLORER',
    empathySubtitle:
      'Starts at the very beginning with plain-English context, zero church jargon, and clear historical orientation.',
    scaffoldingBehavior:
      'Enables "Open Door Primers" before every passage—explaining who wrote the text, when it happened, and why it matters in everyday human language.',
    glossarySupport:
      'Auto-expands unfamiliar names, places, and ancient customs inline.',
  },
  {
    id: 'some-stories',
    quoteLabel:
      '“I know a few basic stories, but want to dig deeper into what it all means.”',
    internalCode: 'STORY_CONNECTOR',
    empathySubtitle:
      'Bridges familiar narratives into one cohesive historical timeline so isolated stories finally click together.',
    scaffoldingBehavior:
      'Activates "Big Picture Threading"—connecting familiar moments (like David, Ruth, or the Gospels) to the broader ancient Near Eastern story.',
    glossarySupport:
      'Highlights geographical maps, cultural tensions, and literary callbacks.',
  },
  {
    id: 'deeper-dive',
    quoteLabel:
      '“I’ve grown up around this and am looking for a deeper, more grounded study.”',
    internalCode: 'DEEP_DIVE_SCHOLAR',
    empathySubtitle:
      'Moves past surface-level Sunday-school summaries into original languages, manuscript history, and hard questions.',
    scaffoldingBehavior:
      'Unlocks "Unvarnished Seminar Mode"—surfacing original Hebrew/Greek lexical metaphors, literary nuance, and honest theological tensions.',
    glossarySupport:
      'Enables full interlinear root lenses and cross-tradition scholarly notes.',
  },
];

export const OPEN_DOOR_INTAKE_SPEC = {
  screen1AgeCheck: {
    title: 'Screen 01 · The Age Check',
    promptHeadline: 'How old is the reader stepping in today?',
    uxRationale:
      'Standard dropdown forms feel like a medical intake chart. Instead, we use an oversized Fraunces editorial numeral paired with a smooth tactile slider and instant birth-year synchronization (2008–2023). Moving the slider shifts the ambient preview card in real time without asking for intrusive full birthdates (MM/DD/YYYY).',
    radicalHonestyMicrocopy:
      'Age only sets your starting reading rhythm and visual comfort—you can explore any historical depth or adjust this anytime.',
  },
  screen2FamiliarityCheck: {
    title: 'Screen 02 · The Familiarity Check',
    promptHeadline: 'Where are you starting from today?',
    uxRationale:
      'Many new users—especially teens and parents returning to faith—feel quiet embarrassment if they don’t know bible trivia, while lifelong churchgoers feel bored by elementary recaps. Framing the three choices in warm, first-person conversational quotes removes test anxiety.',
    radicalHonestyMicrocopy:
      'There are no wrong answers, no quizzes, and zero prior knowledge required. This simply tunes how much background context we place beside the text on day one.',
  },
  postIntakeWelcomePage: {
    title: 'Screen 03 · Post-Intake Routing & Welcome Page',
    transitionCopy: 'Setting up your personalized space…',
    transitionSubcopy:
      'Calibrating typographic measure, historical context layers, and privacy guardrails',
    transitionState: {
      headline: 'Setting up your personalized space…',
      durationMs: 900,
      animationSpec:
        'A calm 900ms in-modal crossfade with a warm amber progress line (35% → 72% → 100%) and subtle breathing ring—eliminating jarring full-page reloads while confirming that custom scaffolding is being assembled.',
      subcopySequence: [
        'Recording age & familiarity posture to local profile…',
        'Calibrating typographic measure & historical context layers…',
        'Preparing your personalized welcome card…',
      ],
    },
    welcomeCardPrinciples:
      'A clean archival text card acknowledging their exact starting point in warm, dignified prose (e.g., for a 12-year-old beginner: "Welcome. You’re stepping into an open library where no question is off-limits.").',
    actionableFirstStepRule:
      'A single, high-contrast primary button (#1C1917 Deep Sanctuary Charcoal with #D97706 Soft Amber arrow) inviting the reader directly into their tailored Day-One onboarding module (e.g., "Start ‘Roots & Resilience’ Track" or "Begin ‘The Bedtime Shepherd’ Setup").',
    minimalistArchitecture: {
      viewportPrinciple:
        'Zero competing primary buttons, zero multi-tab navigation bars, and zero notification badges. Secondary orientation utilities sit quietly beneath a 1px Weathered Limestone hairline.',
      secondaryOptions: [
        {
          id: 'how-it-works',
          label: 'How it Works (60-sec overview)',
          role: 'Inline Progressive Disclosure Drawer',
          description:
            'Expands a calm 3-step summary explaining how the reading margin, historical lenses, and privacy guardrails work without leaving the welcome card.',
        },
        {
          id: 'adjust-intake',
          label: 'Adjust Age or Starting Point',
          role: 'Frictionless Backtrack Link',
          description:
            'Lets the user immediately tweak Screen 1 (Age) or Screen 2 (Familiarity) if they want to preview a different track.',
        },
        {
          id: 'inspect-json',
          label: 'Inspect Profile Routing JSON',
          role: 'Transparency & Architecture Toggle',
          description:
            'Reveals the exact `user_onboarding_profile` and `ui_scaffolding_flags` payload generated by their two intake answers.',
        },
      ],
      howItWorksPillars: [
        {
          step: '01',
          title: 'Unhurried Daily Rhythm',
          detail:
            'Each module takes 5–10 quiet minutes with zero streak penalties, leaderboards, or guilt notifications.',
        },
        {
          step: '02',
          title: 'Context on Demand',
          detail:
            'Tap any highlighted place, artifact, or Hebrew/Greek root word to open plain-English historical notes right beside the verse.',
        },
        {
          step: '03',
          title: 'Adapts Any Time',
          detail:
            'You can switch tracks, adjust historical depth, or explore the open scripture library whenever your curiosity shifts.',
        },
      ],
    },
    secondaryArchitecture: [
      {
        label: 'How It Works (60-Second Guide)',
        purpose:
          'Opens an inline, non-intrusive 3-pillar orientation drawer explaining how the sanctuary adapts without losing place.',
      },
      {
        label: 'Adjust Age or Starting Point',
        purpose:
          'Allows immediate friction-free editing of Screen 1 or Screen 2 inputs.',
      },
      {
        label: 'Browse Open Library First',
        purpose:
          'Respects user autonomy by letting self-directed readers explore the full text before starting a guided track.',
      },
    ],
  },
  dataRecordingArchitecture: {
    storageEngine:
      'Deterministic Profile Vector (`user_onboarding_profile`) stored with zero third-party ad telemetry.',
    routingFormula:
      'Tier(reader_age) × Scaffolding(familiarity_level) → 1 of 9 Custom Entry Lanes',
  },
};

export function computeCustomEntryLane(
  age: number,
  familiarityId: FamiliarityLevelId
): CustomEntryLaneResult {
  const currentYear = 2026;
  const birthYear = currentYear - age;
  const famOption =
    FAMILIARITY_OPTIONS_SPEC.find((f) => f.id === familiarityId) ||
    FAMILIARITY_OPTIONS_SPEC[0];

  // TIER 1: Ages 3–7 (Bedtime Sanctuary)
  if (age <= 7) {
    const laneMap: Record<
      FamiliarityLevelId,
      {
        code: string;
        title: string;
        track: string;
        passage: string;
        welcomeHeadline: string;
        welcomeBody: string;
        ctaLabel: string;
        duration: string;
        previewText: string;
        previewPrompt: string;
      }
    > = {
      beginner: {
        code: 'LANE_1A_GENTLE_WONDER',
        title: 'Bedtime Sanctuary · First Wonder Primer',
        track: 'The Bedtime Shepherd Setup (Spoken Audio & Lantern Calm)',
        passage: 'Psalm 23 & Genesis 1 · Warm 2100K Audio Introduction',
        welcomeHeadline: 'Your evening sanctuary is ready.',
        welcomeBody:
          'Set your phone by the bedside, dim the screen, and let the soothing rhythms guide your child into deep, peaceful rest.',
        ctaLabel: 'Step Into Your First Session',
        duration: '6-minute soothing audio + 1 parent wonder prompt',
        previewText:
          '“When the sun goes down and the hills grow quiet, the Shepherd finds soft green grass and cool, still water so everyone can rest…”',
        previewPrompt:
          'Parent Wonder Whisper: “What is the quietest, coziest place you love to rest?”',
      },
      'some-stories': {
        code: 'LANE_1B_STORY_WEAVER',
        title: 'Bedtime Sanctuary · Connected Evening Tales',
        track: 'Songs of Comfort & Parables of Kindness',
        passage: 'Luke 15 & Psalm 139 · Read-Along Evening Cadence',
        welcomeHeadline:
          'Welcome. A peaceful evening rhythm for stories your child is beginning to love.',
        welcomeBody:
          'We’ve connected familiar moments of kindness and courage into unhurried bedtime narrations—paired with simple, sleepy-hand lantern interactions and calm parent-child wonder prompts.',
        ctaLabel: 'Start ‘Songs of Comfort’ Evening Track',
        duration: '8-minute read-along audio ritual',
        previewText:
          '“Even before you speak a word, God knows the sound of your laugh and watches over your bed through the quiet night…”',
        previewPrompt:
          'Parent Wonder Whisper: “Who is someone you love who helps you feel brave?”',
      },
      'deeper-dive': {
        code: 'LANE_1C_EARLY_POETRY',
        title: 'Bedtime Sanctuary · Rich Poetic Cadence',
        track: 'The Great Psalms & Wisdom Stories for Young Listeners',
        passage: 'Psalm 104 & Proverbs 3 · Acoustic Cello & Wonder Prompts',
        welcomeHeadline:
          'Welcome. Deep poetic beauty tuned for young ears and peaceful nights.',
        welcomeBody:
          'For families who already treasure these stories, we’ve curated rich, literary evening readings from the Psalms and Prophets—nurturing a lifelong ear for sacred poetry without a single loud cartoon.',
        ctaLabel: 'Open ‘The Great Evening Psalms’',
        duration: '10-minute literary audio & reflection',
        previewText:
          '“He wraps Himself in light as with a garment; He stretches out the starry heavens like a tent across the quiet desert…”',
        previewPrompt:
          'Parent Wonder Whisper: “If you could paint the night sky, what colors would you use?”',
      },
    };
    const chosen = laneMap[familiarityId];
    return {
      laneCode: chosen.code,
      laneTitle: chosen.title,
      tierId: 'bedtime',
      tierName: '01. Bedtime Sanctuary (Ages 3–7)',
      age,
      birthYear,
      familiarityCode: famOption.internalCode,
      startingTrackTitle: chosen.track,
      firstSessionPassage: chosen.passage,
      welcomeCard: {
        kicker: `Personalized Sanctuary Ready · Age ${age} · Bedtime Sanctuary`,
        headline: chosen.welcomeHeadline,
        narrativeBody: chosen.welcomeBody,
        actionableButtonLabel: chosen.ctaLabel,
        moduleDuration: chosen.duration,
        firstModulePreviewText: chosen.previewText,
        firstModulePrompt: chosen.previewPrompt,
      },
      uiScaffoldingFlags: {
        jargonFreePrimer: familiarityId === 'beginner',
        inlineHistoricalGlossary: false,
        hebrewGreekRootLens: familiarityId === 'deeper-dive',
        unabridgedSeminarNotes: false,
        circadianNightCanvas: true,
        zeroKnowledgeTeenVault: false,
      },
    };
  }

  // TIER 2: Ages 8–12 (Historical Archive)
  if (age <= 12) {
    const laneMap: Record<
      FamiliarityLevelId,
      {
        code: string;
        title: string;
        track: string;
        passage: string;
        welcomeHeadline: string;
        welcomeBody: string;
        ctaLabel: string;
        duration: string;
        previewText: string;
        previewPrompt: string;
      }
    > = {
      beginner: {
        code: 'LANE_2A_FIELD_EXPLORER',
        title: 'Historical Archive · Roots & Resilience Primer',
        track: 'Roots & Resilience (Beginner Historical & Map Track)',
        passage: 'Genesis 12 & Psalm 23 · Fertile Crescent Field Notebook',
        welcomeHeadline: 'Welcome to your open library.',
        welcomeBody:
          'You’re stepping into a space where history is real, questions are encouraged, and there are no prerequisites. Take your time, look around, and explore at your own pace.',
        ctaLabel: 'Step Into Your First Session',
        duration: '5-minute interactive map & story primer',
        previewText:
          '“Before these words were printed in books, they were written on papyrus and leather scrolls by real people living between the Nile River and the Euphrates…”',
        previewPrompt:
          'Field Explorer Note: Tap any highlighted city name to see where it sits on satellite terrain today.',
      },
      'some-stories': {
        code: 'LANE_2B_TIMELINE_DETECTIVE',
        title: 'Historical Archive · Connecting the Kingdoms',
        track: 'Atlas & Timeline Detective (Bridging the Big Story)',
        passage: '1 Samuel 17 & Ruth 1 · Iron Age Levantine Timeline',
        welcomeHeadline:
          'Welcome. Let’s connect the stories you know into one real historical timeline.',
        welcomeBody:
          'If you’ve heard a few famous Bible stories before, this space shows you how they actually fit together alongside ancient Egypt, Assyria, and Rome—with interactive timelines and archaeological field notes.',
        ctaLabel: 'Open ‘Timeline Detective’ Module',
        duration: '7-minute interactive timeline & passage',
        previewText:
          '“Around 1000 BCE in the limestone valleys of Judea, shepherds and poets composed songs that survived the rise and fall of three empires…”',
        previewPrompt:
          'Timeline Discovery: Scrub the bar to see what was happening in Greece and Egypt at the exact same moment.',
      },
      'deeper-dive': {
        code: 'LANE_2C_JUNIOR_ARCHIVIST',
        title: 'Historical Archive · Manuscripts & Root Languages',
        track: 'Dead Sea Scrolls, Hebrew Metaphors & Ancient Empires',
        passage: 'Jonah 1 & Isaiah 40 · Hebrew Root Lexicon Active',
        welcomeHeadline:
          'Welcome. Your archival desk is ready for original languages and deep history.',
        welcomeBody:
          'Since you already know the main storylines, we’ve unlocked our Hebrew and Greek root-word lenses, Dead Sea Scroll manuscript comparisons, and Near Eastern archaeological commentary from day one.',
        ctaLabel: 'Enter ‘Manuscripts & Root Words’ Studio',
        duration: '10-minute archival & lexical exploration',
        previewText:
          '“When Jonah boarded a merchant vessel at Joppa bound for Tarshish, he was sailing 2,500 miles in the opposite direction of Nineveh…”',
        previewPrompt:
          'Lexical Root Lens Active: Tap “Chesed” (חֶסֶד) to inspect how ancient translators rendered covenant loyalty.',
      },
    };
    const chosen = laneMap[familiarityId];
    return {
      laneCode: chosen.code,
      laneTitle: chosen.title,
      tierId: 'archive',
      tierName: '02. Historical Archive (Ages 8–12)',
      age,
      birthYear,
      familiarityCode: famOption.internalCode,
      startingTrackTitle: chosen.track,
      firstSessionPassage: chosen.passage,
      welcomeCard: {
        kicker: `Personalized Field Archive Ready · Age ${age} · Historical Archive`,
        headline: chosen.welcomeHeadline,
        narrativeBody: chosen.welcomeBody,
        actionableButtonLabel: chosen.ctaLabel,
        moduleDuration: chosen.duration,
        firstModulePreviewText: chosen.previewText,
        firstModulePrompt: chosen.previewPrompt,
      },
      uiScaffoldingFlags: {
        jargonFreePrimer: familiarityId !== 'deeper-dive',
        inlineHistoricalGlossary: true,
        hebrewGreekRootLens: familiarityId !== 'beginner',
        unabridgedSeminarNotes: familiarityId === 'deeper-dive',
        circadianNightCanvas: false,
        zeroKnowledgeTeenVault: false,
      },
    };
  }

  // TIER 3: Ages 13–18 (Safe Harbor)
  const laneMap: Record<
    FamiliarityLevelId,
    {
      code: string;
      title: string;
      track: string;
      passage: string;
      welcomeHeadline: string;
      welcomeBody: string;
      ctaLabel: string;
      duration: string;
      previewText: string;
      previewPrompt: string;
    }
  > = {
    beginner: {
      code: 'LANE_3A_OPEN_INQUIRY',
      title: 'Safe Harbor · Roots & Resilience Beginner Track',
      track: 'Roots & Resilience (Unvarnished Introduction to Ancient Wisdom)',
      passage: 'Ecclesiastes 1 & Mark 4 · Zero-Jargon Modern Synthesis',
      welcomeHeadline: 'Welcome to your Safe Harbor.',
      welcomeBody:
        'A private, encrypted sanctuary where hard questions are welcomed, laments are honored, and no faith answers are forced. Your thoughts remain entirely your own.',
      ctaLabel: 'Open Your Exploration Map',
      duration: '6-minute guided inquiry + private vault setup',
      previewText:
        '“Thousands of years before modern psychology, ancient poets wrote with startling honesty about meaning, anxiety, injustice, and hope…”',
      previewPrompt:
        'First Private Reflection Prompt: What is one big question about life or faith you’ve always wished people would answer honestly?',
    },
    'some-stories': {
      code: 'LANE_3B_SOCRATIC_BRIDGE',
      title: 'Safe Harbor · Guided Ethics & Historical Depth',
      track: 'Wrestling with Justice, Doubt & The Prophets',
      passage: 'Habakkuk 1 & Matthew 5 · Guided Discussion + Peer Roundtable',
      welcomeHeadline:
        'Welcome to Safe Harbor. A judgment-free studio to ask the questions that actually matter.',
      welcomeBody:
        'You’ve outgrown simplified childhood summaries. Here, we connect the ancient texts you’ve heard about to real modern ethics, honest lament, and moderated peer roundtables—with a private journal locked to your device.',
      ctaLabel: 'Begin ‘Justice & Honest Doubt’ Module',
      duration: '8-minute Socratic dialogue & peer perspectives',
      previewText:
        '“O Lord, how long shall I cry for help, and You will not hear? Why do You make me see iniquity, and why do You idly look at wrong?” — Habakkuk 1:2–3',
      previewPrompt:
        'Socratic Prompt: Why do you think ancient scripture preserves raw arguments with God instead of editing them out?',
    },
    'deeper-dive': {
      code: 'LANE_3C_SEMINAR_SCHOLAR',
      title: 'Safe Harbor · Deconstruction-Proof Seminar',
      track: 'Lament, Original Languages & Unabridged Commentary',
      passage: 'Job 38, Psalm 23 & Romans 8 · Full Lexicon + Private Vault',
      welcomeHeadline:
        'Welcome. An unvarnished seminar space for deep scholarship and owned faith.',
      welcomeBody:
        'If you’ve grown up around church, you know when tough questions are being dodged. We’ve enabled full Hebrew and Greek lexical roots, multi-tradition scholarly commentary, and your encrypted reflection vault from the start.',
      ctaLabel: 'Enter ‘Unabridged Seminar’ Track',
      duration: '10-minute seminar reading & interlinear lens',
      previewText:
        '“Where were you when I laid the foundation of the earth? Tell Me, if you have understanding… when the morning stars sang together?” — Job 38:4, 7',
      previewPrompt:
        'Seminar Synthesis: Compare how Ancient Near Eastern wisdom literature frames suffering versus modern Western individualism.',
    },
  };
  const chosen = laneMap[familiarityId];
  return {
    laneCode: chosen.code,
    laneTitle: chosen.title,
    tierId: 'harbor',
    tierName: '03. Safe Harbor (Ages 13–18)',
    age,
    birthYear,
    familiarityCode: famOption.internalCode,
    startingTrackTitle: chosen.track,
    firstSessionPassage: chosen.passage,
    welcomeCard: {
      kicker: `Private Safe Harbor Ready · Age ${age} · Encrypted Vault Active`,
      headline: chosen.welcomeHeadline,
      narrativeBody: chosen.welcomeBody,
      actionableButtonLabel: chosen.ctaLabel,
      moduleDuration: chosen.duration,
      firstModulePreviewText: chosen.previewText,
      firstModulePrompt: chosen.previewPrompt,
    },
    uiScaffoldingFlags: {
      jargonFreePrimer: familiarityId === 'beginner',
      inlineHistoricalGlossary: true,
      hebrewGreekRootLens: familiarityId !== 'beginner',
      unabridgedSeminarNotes: true,
      circadianNightCanvas: false,
      zeroKnowledgeTeenVault: true,
    },
  };
}

export interface SecurityCroSpec {
  entryChoiceSplit: {
    rationale: string;
    parentPath: {
      title: string;
      ageScope: string;
      tiersProvisioned: string;
      securityModel: string;
      croCopy: string;
    };
    teenPath: {
      title: string;
      ageScope: string;
      tiersProvisioned: string;
      securityModel: string;
      croCopy: string;
    };
  };
  frictionlessForm: {
    socialAuthSpec: string;
    inputFieldsCount: number;
    fieldsDetail: string[];
    eliminatedFriction: string[];
  };
  trustPrivacyBadge: {
    exactMicrocopy: string;
    placementRule: string;
    cryptographicGuarantee: string;
  };
  successHandoff: {
    timingCurve: string;
    phases: {
      phase: string;
      duration: string;
      visualState: string;
      userExperience: string;
    }[];
  };
}

export const SECURITY_CRO_SIGNUP_SPEC: SecurityCroSpec = {
  entryChoiceSplit: {
    rationale:
      'Combining 5-year-old parental controls and 16-year-old private journaling into a single generic registration form causes both cognitive friction for parents and immediate surveillance suspicion for teens. A clean binary fork at Step 1 resolves legal compliance (COPPA) and psychological safety simultaneously.',
    parentPath: {
      title: 'Option A (The Parent Gateway): “I’m a parent or guardian setting this up for a child (Ages 3–12).”',
      ageScope: 'For Children Ages 3–12',
      tiersProvisioned: '01. Bedtime Sanctuary (3–7) & 02. Historical Archive (8–12)',
      securityModel:
        'COPPA-Compliant Family Stewardship · Parent-managed profile switching · Zero third-party analytics or ad trackers.',
      croCopy:
        'Set up calming bedtime stories and interactive historical timelines for your children.',
    },
    teenPath: {
      title: 'Option B (The Independent Gateway): “I’m setting this up for myself (Ages 13–18+).”',
      ageScope: 'Ages 13–18+',
      tiersProvisioned: '03. Safe Harbor (13–18)',
      securityModel:
        'Zero-Knowledge Client-Side Encryption (AES-256-GCM) · Selecting Option B instantly flags account metadata to enforce strict, zero-knowledge privacy protocols for teen journaling later on.',
      croCopy:
        'Create your own private space for guided discussions, modern ethics, and encrypted journaling.',
    },
  },
  frictionlessForm: {
    socialAuthSpec:
      'One-tap OAuth / Passkey buttons ("Sign in with Apple", "Sign in with Google") rendered in quiet archival monochrome (#FAF7F2 surface, #E5DEC9 1px border) with zero password fatigue.',
    inputFieldsCount: 2,
    fieldsDetail: [
      '01. Email Address (single-line input with instant syntax validation & zero marketing opt-in checkboxes)',
      '02. Password / Vault Passphrase (single-line input smoothly revealed once email entered, with eye toggle and local key-derivation feedback)',
    ],
    eliminatedFriction: [
      'No confirm-password repetition field',
      'No phone number or SMS verification traps',
      'No postal codes or geographic tracking',
      'No mandatory church affiliation or demographic survey before entry',
    ],
  },
  trustPrivacyBadge: {
    exactMicrocopy:
      '“We never sell your data or track your habits. Teen journals are locally encrypted and 100% private from day one. Your space is truly your own.”',
    placementRule:
      'Anchored directly beneath the primary submit button in a soft, muted text style with an integrity shield icon.',
    cryptographicGuarantee:
      'In Teen mode, PBKDF2 / WebCrypto derives the journal encryption key locally on the user’s device before authentication completes, ensuring even servers cannot read reflections.',
  },
  successHandoff: {
    timingCurve: 'cubic-bezier(0.16, 1, 0.3, 1) · Zero full-page reloads',
    phases: [
      {
        phase: 'Phase 01 · Cryptographic & Sanctuary Handshake',
        duration: '0ms – 550ms',
        visualState:
          'Submit button locks height, dims to Warm Umber (#292524), and displays a soft amber rhythmic pulse ("Generating private vault key…" or "Preparing family sanctuary…").',
        userExperience:
          'Reassures the user that real security provisioning is occurring without a jarring layout shift.',
      },
      {
        phase: 'Phase 02 · Open Door Intake (Screens 1 & 2)',
        duration: '550ms – Intake Completion',
        visualState:
          'Renders Screen 1 (The Age Check slider) followed by Screen 2 (The Familiarity Check with Radical Honesty Micro-Copy).',
        userExperience:
          'Captures developmental stage and starting familiarity with zero test anxiety.',
      },
      {
        phase: 'Phase 03 · Post-Intake Transition & Welcome Page',
        duration: '900ms Transition → Welcome Card',
        visualState:
          'Displays "Setting up your personalized space…" before unveiling the Personalized Welcome Card, single Actionable First Step CTA, and quiet secondary How It Works links.',
        userExperience:
          'Guides the reader directly into their tailored first session (e.g., "Roots & Resilience" or "Bedtime Shepherd").',
      },
    ],
  },
};

export const HERO_COPY_VARIANTS: HeroCopyVariant[] = [
  {
    id: 'flagship',
    label: 'Grow In The Word · Radical Hospitality',
    focusPillar: 'Disarms Skepticism & Invites Both Parents and Searching Teens',
    kicker: 'AN OPEN SPACE FOR ANCIENT HISTORY & REAL LIFE',
    headline: 'Faith without friction. Questions without fear.',
    subHeadline:
      'A decade-spanning ecosystem designed to help children, tweens, and teens explore the Bible, wrestle with hard truths, and build a lasting foundation—at their own pace, with zero coercion.',
    copywriterRationale:
      'Instantly disarms skepticism with four balanced words per sentence ("Faith without friction. Questions without fear."), uniting parents of young children and independent teenagers under one non-coercive promise.',
  },
  {
    id: 'intellectual-trust',
    label: 'Grow in The Word · Wonder, Trust & Growth',
    focusPillar: 'Balanced Appeal for Parents & Growing Readers',
    kicker:
      'Grow In The Word · A Decade-Spanning Scripture Companion for Ages 3 to 18',
    headline: 'Where wonder takes root, and faith grows up with your child.',
    subHeadline:
      'An honest, unhurried sanctuary to explore ancient history, ask hard questions, and build a lifelong foundation of faith—from first bedtime stories at three to deep philosophical dialogue at eighteen, without coercion or cringe.',
    copywriterRationale:
      'Pairs organic botanical imagery ("wonder takes root") with developmental maturity ("faith grows up with your child"), reassuring parents that their child will never outgrow the space.',
  },
  {
    id: 'family-rhythm',
    label: 'Grow in The Word · Sacred Curiosity & Depth',
    focusPillar: 'Emphasizes Intellectual Integrity & Safe Questioning',
    kicker: 'Grow In The Word · Fifteen Years of Unhurried Formation',
    headline: 'A quiet sanctuary for sacred wonder and honest questions.',
    subHeadline:
      'Built for families who want more than loud cartoons and easy clichés. Grow In The Word evolves across fifteen formative years—offering soothing bedtime psalms for little ones, interactive ancient history for tweens, and a trusted harbor for teens to wrestle with real faith.',
    copywriterRationale:
      'Directly contrasts the app against noisy digital alternatives while mapping the three developmental stages inside the sub-headline for immediate clarity.',
  },
];

export const COLOR_PALETTE_SPEC: ColorToken[] = [
  {
    name: 'Warm Cream (Primary Canvas)',
    token: '--surface-canvas',
    hex: '#F9F6F0',
    rgb: '249, 246, 240',
    proportion: '60% Dominant Neutral Canvas (Day)',
    contrastRatio: '16.8:1 vs Deep Charcoal',
    role: 'Primary page background, reading margin canvas, and soft paper-like reflection surface.',
    psychRationale:
      'Creates a soft, welcoming, archival paper texture that eliminates clinical white (#FFFFFF) glare.',
    darkText: true,
  },
  {
    name: 'Deep Charcoal (Text & Structure)',
    token: '--surface-obsidian',
    hex: '#1A1A1A',
    rgb: '26, 26, 26',
    proportion: '30% Structural Anchor & Night Canvas',
    contrastRatio: '16.8:1 vs Warm Cream',
    role: 'Primary display typography, pill CTA buttons, and Night Sanctuary grounding frames.',
    psychRationale:
      'Offers high-contrast readability and scholarly permanence without the harshness of pure black (#000000).',
    darkText: false,
  },
  {
    name: 'Soft Amber (Accent & Warmth)',
    token: '--accent-amber',
    hex: '#D97706',
    rgb: '217, 119, 6',
    proportion: '10% High-Intent Accent (#D97706 / #C28E38)',
    contrastRatio: '4.6:1 on Charcoal / 3.4:1 on Cream',
    role: 'Used sparingly for active states, hover rings, audio waveforms, and copper compass highlights.',
    psychRationale:
      'Signifies gentle lantern light and warmth without resorting to loud primary cartoon colors.',
    darkText: false,
  },
  {
    name: 'Muted Sage (Grounding Tone)',
    token: '--accent-sage',
    hex: '#4A5D4E',
    rgb: '74, 93, 78',
    proportion: 'Organic Grounding Accent',
    contrastRatio: '6.8:1 WCAG AA/AAA on Warm Cream',
    role: 'Botanical growth indicators, privacy badges, and organic grounding accents.',
    psychRationale:
      'Introduces a quiet, organic sense of peace and rootedness across the decade-spanning journey.',
    darkText: false,
  },
  {
    name: 'Travertine Parchment',
    token: '--surface-container',
    hex: '#F2ECE1',
    rgb: '242, 236, 225',
    proportion: '20% Structural Card Surface',
    contrastRatio: '14.7:1 vs Charcoal Ink',
    role: 'Secondary container fill, Three-Tier Preview cards, and historical sidebar callouts.',
    psychRationale:
      'Maintains a subtle luminance delta against Warm Cream so tactile cards separate naturally without heavy drop shadows.',
    darkText: true,
  },
  {
    name: 'Weathered Limestone',
    token: '--border-hairline',
    hex: '#E5DEC9',
    rgb: '229, 222, 201',
    proportion: '5% Structural Dividers',
    contrastRatio: '1.25:1 Subtle Hairline',
    role: '1px architectural grid lines, specimen borders, and table rules.',
    psychRationale:
      'Replaces harsh gray wireframe lines with quiet bookbinding thread warmth.',
    darkText: true,
  },
];

export const THREE_TIER_SPECS: TierSpecification[] = [
  {
    id: 'bedtime',
    index: '01',
    name: 'The Bedtime Sanctuary',
    ageSpan: 'Ages 3–6',
    subtitle:
      'Candlelit audio narratives, gentle breath pacing, and quiet wonder for early childhood.',
    signatureHook: '“Where the Day Softens into Wonder.”',
    rootsAndRhythmsCopy:
      '“Where the Day Softens into Wonder.” A zero-blue-light evening sanctuary that replaces overstimulating cartoons with warm acoustic storytelling, linen-textured botanical line art, and unhurried parent-child connection.',
    visualConceptSpec:
      'Warm obsidian-umber night canvas (#1C1917) with a fine-line botanical crescent vignette, 2100K candlelight audio wave (#D97706), and a single-tap sleepy-hand wonder card.',
    imagePath: '/images/tier_bedtime_sanctuary.jpg',
    imageAlt:
      'Warm evening bedside sanctuary with soft amber nightlight and natural linen bedding',
    expandedStrategistDescription:
      'Designed for the final fifteen minutes before sleep, Bedtime Sanctuary wraps three-to-six-year-olds in acoustic cello melodies, unhurried spoken scripture, and fine-line botanical vignettes rather than loud, cartoonish graphics. A single sleepy-hand tap dims the 2100K warm-amber screen while unlocking a whispered parent-child wonder prompt—helping young hearts associate faith with physical safety, emotional warmth, and unhurried presence.',
    keyBenefits: [
      '2100K zero-blue-light obsidian-umber canvas that protects natural melatonin onset',
      'Fine-line botanical & celestial illustrations—zero frantic cartoons or dopamine loops',
      'Single-tap sleepy-hand lantern controls & whispered parent-child wonder prompts',
    ],
    developmentalPosture:
      'Between ages 3 and 6, spiritual formation is rooted in nervous-system safety, rhythm, and the warmth of a trusted voice—never loud animations or moralistic lectures.',
    coreExperience:
      'Designed specifically for the final 15 minutes of the day. The interface shifts to a warm 2100K obsidian-umber canvas (#1C1917), pairing acoustic cello and spoken-word storytelling with one gentle “wonder question” for parent and child.',
    antiCringeGuardrail:
      'Strictly bans cartoon mascots, slapstick sound effects, streak counters, and moralizing “be a good kid” fables.',
    uiArchitecture: {
      surfacePalette:
        'Warm Obsidian-Umber (#1C1917) & Deep Linen (#24201D) with Candlelight Amber (#D97706)',
      typographyScale: 'Fraunces 24px / 1.65lh · Oversized 56px tactile audio controls',
      primaryModality: 'Soothing Spoken Narrative + Tactile Botanical Wonder Cards',
      sessionDuration: '8 to 12 minutes · Automatic 18% → 0% screen sleep fade',
    },
    sampleArtifact: {
      kicker: 'Sample Evening Ritual · Ages 3–6',
      heading: 'The Night the Wind Listened',
      excerpt:
        '“The waves were loud against the wooden boat, and the friends were wide awake. Jesus stood up in the dark and spoke to the water the way a mother speaks to a restless child: Peace, be still.”',
      annotationLabel: 'Parent Whisper Prompt',
      annotationContent:
        '“When you hear loud thunder or feel worried inside, what helps your body remember that you are safe?”',
      interactiveFeatureLabel: 'Circadian Audio & Simple Touch',
      interactiveFeatureDetail:
        'A single gentle tap dims the screen from 18% to 0% over 6 minutes while acoustic narration continues.',
    },
    metrics: {
      statValue: '0%',
      statUnit: 'Blue-Light Stress',
      statContext: 'Warm 2100K amber night-canvas preserves natural melatonin onset at bedtime',
    },
  },
  {
    id: 'archive',
    index: '02',
    name: 'The Ancient Archive',
    ageSpan: 'Ages 8–12',
    subtitle: 'Interactive timelines, ancient cartography, and engaging historical context.',
    signatureHook: '“History, Not Cartoons.”',
    rootsAndRhythmsCopy:
      '“History, Not Cartoons.” An interactive exploration of the Ancient Near East. Tweens act as historical detectives, discovering real geography, culture, and artifact clues behind every narrative.',
    visualConceptSpec:
      'A textured, parchment-style flat lay featuring an old map coordinate and a copper compass icon.',
    imagePath: '/images/tier_historical_archive.jpg',
    imageAlt:
      'Curated museum flat-lay of ancient Near Eastern parchment fragments and brass astrolabe on limestone',
    expandedStrategistDescription:
      'The Ancient Archive transforms scripture into a living museum field notebook where curious tweens scrub through interactive timelines to see how biblical events align with ancient world civilizations. By exploring 3D topographic maps, museum artifacts, and original Hebrew and Greek root words, eight-to-twelve-year-olds discover the real geographical and cultural context behind every narrative. This investigative approach satisfies their growing hunger for concrete facts and prevents them from dismissing faith as a childhood fairy tale.',
    keyBenefits: [
      'Interactive cross-civilization timelines connecting scripture to world history',
      'Tactile archaeological field notes, Near Eastern maps, and copper compass coordinates',
      'Builds deep historical literacy by treating tweens as capable historical detectives',
    ],
    developmentalPosture:
      'Between ages 8 and 12, children become rigorous detectives of reality. If scripture is presented like a fairy tale, they categorize it alongside mythology and outgrow it by thirteen.',
    coreExperience:
      'Transforms the app into a museum-grade field notebook. Tweens scrub across interactive Iron Age and Second Temple timelines, explore where Babylon and Nineveh sit on satellite terrain, and tap English words to uncover original Hebrew and Greek metaphors.',
    antiCringeGuardrail:
      'Never talks down to tweens with “rad” youth-slang paraphrases or sanitized plot summaries that hide historical complexity.',
    uiArchitecture: {
      surfacePalette: 'Warm Cream (#F9F6F0) & Textured Parchment Flat-Lay (#F2ECE1) with Copper (#C28E38)',
      typographyScale: 'Fraunces 20px Scripture + Plus Jakarta Sans 14px Field Notes',
      primaryModality: 'Interactive Historical Timeline + Archaeological Atlas',
      sessionDuration: '15 to 20 minutes · Self-directed inquiry trails',
    },
    sampleArtifact: {
      kicker: 'Sample Field Inquiry · Age 10',
      heading: 'Why Did Jonah Run Toward Tarshish?',
      excerpt:
        '“Jonah rose to flee to Tarshish from the presence of the Lord. He went down to Joppa and found a merchant ship going to the farthest western edge of the known Mediterranean world.”',
      annotationLabel: 'Historical Timeline Context · 760 BCE (Assyrian Ascendancy)',
      annotationContent:
        'Nineveh lay 550 miles east in the Assyrian Empire—a fierce superpower. Tarshish (modern southern Spain) was 2,500 miles west. Jonah wasn’t being lazy; he was protesting God’s mercy toward a rival empire.',
      interactiveFeatureLabel: 'Interactive Timeline & Root Lens',
      interactiveFeatureDetail:
        'Scrub from 2000 BCE to 100 CE to compare biblical manuscripts alongside Egyptian, Babylonian, and Roman artifacts.',
    },
    metrics: {
      statValue: '420+',
      statUnit: 'Timeline & Artifact Clues',
      statContext: 'High-resolution British Museum, Louvre, and Israel Museum contextual entries',
    },
  },
  {
    id: 'harbor',
    index: '03',
    name: 'The Safe Harbor',
    ageSpan: 'Ages 13–18',
    subtitle:
      'Sovereign independence, Socratic critical thinking, and theologian-moderated peer community.',
    signatureHook: '“Own Your Questions. Wrestle in Private.”',
    rootsAndRhythmsCopy:
      '“Own Your Questions. Wrestle in Private.” Built for teen independence, rigorous critical thinking, and moderated seminar community—pairing raw biblical laments with a zero-knowledge encrypted commonplace vault.',
    visualConceptSpec:
      'An editorial seminar & monospaced commonplace canvas (#FAF7F2 / #1C1917) uniting encrypted private reflection, primary-source critique, and moderated cohort dialogue.',
    imagePath: '/images/tier_safe_harbor.jpg',
    imageAlt:
      'Moody warm architectural study space at dusk with amber desk lamp and open reflection journal',
    expandedStrategistDescription:
      'The Safe Harbor gives teenagers an intellectually honest studio built around three adolescent essentials: real independence through client-side zero-knowledge encryption, rigorous critical thinking through Socratic interrogation of raw ancient texts, and genuine belonging inside theologian-moderated peer roundtables. Rather than policing doubt or serving rehearsed clichés, it honors a teenager’s agency to test ideas, compare translations, and witness how thoughtful peers navigate anxiety, justice, and purpose without social-media vanity metrics.',
    keyBenefits: [
      'Independence: Zero-knowledge AES-256-GCM journal vault with zero parental backdoor',
      'Critical Thinking: Socratic prompts, manuscript comparisons & unfiltered lament collisions',
      'Safe Community: Theologian-moderated peer seminars with zero follower counts or public wars',
    ],
    developmentalPosture:
      'Adolescents do not abandon faith because they have hard questions; they walk away when they feel their autonomy is policed, their intellect is underestimated, or their doubts are met with rehearsed clichés.',
    coreExperience:
      'An editorial sanctuary modeled after university seminar tables and private commonplace books. Teens interrogate unabridged scripture alongside modern ethical dilemmas, record private reflections locally on their device, and participate in asynchronous, pre-moderated peer cohorts.',
    antiCringeGuardrail:
      'Zero surveillance telemetry reported to parents, zero performative purity-culture guilt, and zero toxic social media popularity metrics.',
    uiArchitecture: {
      surfacePalette: 'Editorial Alabaster (#FAF7F2) & Obsidian Seminar Canvas (#1C1917) with Sage (#4A5D4E)',
      typographyScale: 'Plus Jakarta Sans 16px Prose + JetBrains Mono Encrypted Commonplace',
      primaryModality: 'Zero-Knowledge Vault + Socratic Text Collision + Moderated Peer Roundtable',
      sessionDuration: 'Self-directed inquiry, seminar synthesis & private journaling',
    },
    sampleArtifact: {
      kicker: 'Sample Seminar Dialogue · Age 16',
      heading: 'Habakkuk & The Permission to Argue with God',
      excerpt:
        '“O Lord, how long shall I cry for help, and You will not hear? Why do You make me see iniquity, and why do You idly look at wrong?” — Habakkuk 1:2–3',
      annotationLabel: 'Guided Modern Application & Peer Roundtable',
      annotationContent:
        'Over one-third of the Psalms and the entirety of Job and Habakkuk are laments—raw protests against unanswered prayer and systemic injustice. Bringing your grief and doubt into dialogue is an act of fidelity, not rebellion.',
      interactiveFeatureLabel: 'Moderated Peer Seminar + Private Vault',
      interactiveFeatureDetail:
        'Read thoughtful reflections from peers ages 13–18 on this passage, or lock personal notes in your device-encrypted journal.',
    },
    metrics: {
      statValue: '100%',
      statUnit: 'Encrypted Teen Privacy',
      statContext: 'Zero public follower counts or parent surveillance—built for authentic teen inquiry',
    },
  },
];

export const AGE_EVOLUTION_SNAPSHOTS: AgeStageSnapshot[] = [
  {
    age: 4,
    tierId: 'bedtime',
    tierLabel: '01. Bedtime Sanctuary',
    ageRangeLabel: 'Ages 3–7 · Pre-Reader & Early Listener',
    readingMode: 'Soothing Audio + Simple Lantern Touch',
    passageReference: 'Psalm 23:1–2 · The Quiet Meadow',
    passageTitle: 'The Shepherd Who Knows Your Name',
    primaryText:
      '“God is like a gentle shepherd who walks ahead of the flock. When the sun goes down and the hills grow quiet, He finds soft green grass and cool, still water so everyone can rest without being afraid.”',
    companionNoteTitle: 'Simple Bedtime Interaction & Parent Wonder Prompt',
    companionNoteBody:
      'Tap the warm amber lantern to hear the quiet stream soundscape, then ask softly: “What is the quietest, safest place you can imagine resting tonight?”',
    interactivePrompt: '12-minute cello & spoken-word bedtime narration · 2100K warm screen filter active',
    uiCharacteristics: [
      'Zero blue-light dark obsidian canvas (#1C1917)',
      'Single-tap warm amber audio playhead for sleepy hands',
      'No sudden sound effects, badges, streaks, or cartoon mascots',
    ],
    typographySpec: 'Fraunces Regular 24px / 1.65 line-height · Generous letter comfort',
  },
  {
    age: 7,
    tierId: 'bedtime',
    tierLabel: '01. Bedtime Sanctuary',
    ageRangeLabel: 'Ages 3–7 · Emerging Independent Reader',
    readingMode: 'Read-Along Synchronized Cadence',
    passageReference: 'Genesis 1:14–18 · The Rhythm of Day & Night',
    passageTitle: 'The Great Lights in the Vault of the Sky',
    primaryText:
      '“And God made two great lights—the brighter light to govern the busy day, and the softer light to watch over the quiet night. He set the stars in their places like tiny lanterns across the dark.”',
    companionNoteTitle: 'Evening Observation Prompt',
    companionNoteBody:
      '“Why do you think the world needs darkness and rest just as much as it needs sunshine?”',
    interactivePrompt: 'Gentle word-by-word amber underline follows the narrator at 110 words per minute',
    uiCharacteristics: [
      'High-legibility syllable spacing for emerging readers',
      'Tactile linen illustration vignettes instead of loud animations',
      'Co-reading parent & child split view',
    ],
    typographySpec: 'Fraunces Regular 22px / 1.60 line-height · 55ch max measure',
  },
  {
    age: 10,
    tierId: 'archive',
    tierLabel: '02. Historical Archive',
    ageRangeLabel: 'Ages 8–12 · Concrete Historian & Explorer',
    readingMode: 'Interactive Timeline + Near Eastern Field Notes',
    passageReference: 'Psalm 23:1–4 · 1000 BCE Iron Age Judea',
    passageTitle: 'A Song of David in the Limestone Ravines',
    primaryText:
      '“The Lord is my shepherd; I shall not want. He makes me lie down in green pastures; He leads me beside still waters. Even though I walk through the valley of deep shadow, I will fear no evil, for You are with me.”',
    companionNoteTitle: 'Interactive Timeline & Linguistic Note · Hebrew: גֵּיא צַלְמָוֶת (Gey Tsalmavet)',
    companionNoteBody:
      'In the Judean desert between Bethlehem and the Dead Sea, flash floods carved narrow limestone canyons called wadis. “Valley of deep shadow” refers to real slot canyons where sunlight only reaches the floor for minutes at noon. Shepherds carried a heavy oak club (rod) and a curved walking staff to guide sheep safely through the dark narrows.',
    interactivePrompt: 'Interactive Historical Timeline: 1000 BCE United Monarchy & Levantine Geography',
    uiCharacteristics: [
      'Interactive timeline scrubber linking biblical events to world history',
      'Tap any underlined phrase to inspect original Hebrew/Greek roots',
      'Treats tweens as capable researchers rather than children to be entertained',
    ],
    typographySpec: 'Fraunces 20px Primary Text + Plus Jakarta Sans 14px Archival Marginalia',
  },
  {
    age: 14,
    tierId: 'harbor',
    tierLabel: '03. Safe Harbor',
    ageRangeLabel: 'Ages 13–18 · Critical Thinker & Peer Seminar',
    readingMode: 'Guided Discussion + Modern Application',
    passageReference: 'Psalm 23 & Job 38 · Suffering, Presence & Honest Doubt',
    passageTitle: 'When the Valley Does Not Immediately End',
    primaryText:
      '“Even though I walk through the valley of the shadow of death, I will fear no evil, for You are with me; Your rod and Your staff, they comfort me. You prepare a table before me in the presence of my enemies.”',
    companionNoteTitle: 'Guided Discussion & Modern Application · Why Doesn’t the Poem Promise an Airlift?',
    companionNoteBody:
      'Notice the grammar shift in verse 4: the poet stops talking about God in the third person (“He leads me”) and starts speaking directly to God in the second person (“You are with me”) specifically when entering the dark canyon. In our moderated Peer Seminar, teens discuss how presence—not toxic positivity—helps us navigate grief and anxiety today.',
    interactivePrompt: 'Moderated Peer Seminar (42 teen reflections) + Private Encrypted Journal',
    uiCharacteristics: [
      'Guided discussion questions for personal reflection or youth roundtables',
      'Moderated peer insights showing how other teens wrestle with the text',
      'Zero parent surveillance: private journal is cryptographically locked to the teen’s device',
    ],
    typographySpec: 'Plus Jakarta Sans 16px Body + Fraunces 21px Literary Blockquote',
  },
  {
    age: 18,
    tierId: 'harbor',
    tierLabel: '03. Safe Harbor',
    ageRangeLabel: 'Ages 13–18 · Young Adult Synthesis',
    readingMode: 'Seminar Edition + Cross-Tradition Commentary',
    passageReference: 'Ecclesiastes 3 & Psalm 23 · Vocation, Mortality & Meaning',
    passageTitle: 'Building a Faith That Survives First Contact with Adulthood',
    primaryText:
      '“He has made everything beautiful in its time. Also, He has put eternity into man’s heart, yet so that he cannot find out what God has done from the beginning to the end.”',
    companionNoteTitle: 'Seminar Commentary · Holding Mystery Without Cynicism',
    companionNoteBody:
      'By eighteen, simplistic Sunday-school formulas usually collapse under the weight of real history and adult complexity. The Hebrew concept of “Havel” (vapor/breath) in Ecclesiastes isn’t nihilism—it is an invitation to stop trying to control outcomes and live with grounded generosity.',
    interactivePrompt: 'Export 15-Year Personal Reflection Archive (PDF / Markdown / Print Book)',
    uiCharacteristics: [
      'Full interlinear lexicon and primary manuscript apparatus',
      'Long-form essay companions from historians, poets, and theologians',
      'Graduates with a 15-year searchable archive of their own questions and growth',
    ],
    typographySpec: 'Editorial Seminar Layout · 68ch measure · Tabular manuscript apparatus',
  },
];

export const CTA_VISUAL_STATES: CtaVisualStateSpec[] = [
  {
    id: 'resting',
    stateName: '01. Resting (Default)',
    trigger: 'Initial viewport render',
    cssProperties:
      'bg-[#1C1917] text-[#FAF7F2] px-8 py-4 rounded-lg shadow-xs border border-transparent',
    visualChanges:
      'Deep Sanctuary Charcoal fill (#1C1917) with Warm Alabaster label (#FAF7F2) and Soft Lantern Amber arrow (#D97706).',
    psychologicalIntent:
      'Communicates grounded permanence and calm authority without aggressive neon urgency.',
  },
  {
    id: 'hover',
    stateName: '02. Hover (Pointer Engagement)',
    trigger: 'Mouse enter / pointer hover (160ms cubic-bezier(0.16, 1, 0.3, 1))',
    cssProperties:
      'bg-[#292524] text-[#FAF7F2] ring-2 ring-[#D97706]/60 shadow-md [&>svg]:translate-x-1',
    visualChanges:
      'Surface warms to Umber Charcoal (#292524), a soft 2px amber halo appears around the perimeter, and the directional arrow glides +4px right.',
    psychologicalIntent:
      'Signals responsive warmth and gentle forward invitation (“stepping across a threshold”).',
  },
  {
    id: 'focus',
    stateName: '03. Focus-Visible (Keyboard Accessibility)',
    trigger: 'Tab key navigation',
    cssProperties:
      'bg-[#1C1917] outline-2 outline-offset-3 outline-[#D97706] ring-2 ring-[#D97706]/30',
    visualChanges:
      'Crisp 2px Soft Lantern Amber focus ring offset by 3px against the Warm Alabaster canvas (exceeds WCAG AA 4.6:1 contrast).',
    psychologicalIntent:
      'Ensures accessible, unmistakable orientation for keyboard and assistive-technology users.',
  },
  {
    id: 'active',
    stateName: '04. Active / Pressed (Tactile Confirmation)',
    trigger: 'Mouse down / touch tap (80ms response)',
    cssProperties:
      'bg-[#141210] scale-[0.985] ring-2 ring-[#D97706] shadow-inner',
    visualChanges:
      'Subtle 1.5% inward physical compression (scale 0.985) with deepened obsidian surface and solid amber border lock.',
    psychologicalIntent:
      'Provides immediate physical button reassurance before the onboarding modal glides into view.',
  },
  {
    id: 'loading',
    stateName: '05. Success Handoff / Key Provisioning',
    trigger: 'Form submission inside sign-up screen',
    cssProperties:
      'bg-[#292524] text-[#E7E5E4] border border-[#D97706]/50 cursor-wait',
    visualChanges:
      'Label updates to “Setting up your personalized space…” before smooth cross-fade into the Post-Intake Welcome Card.',
    psychologicalIntent:
      'Builds tangible security trust and transitions into the welcome screen with zero jarring page reloads.',
  },
];

export const CTA_SPECIFICATION = {
  buttonText: 'Begin the Journey',
  microCopy:
    'We never sell your data. Teen journals are encrypted and private from day one.',
  visualStyling: {
    background:
      '#1C1917 (Deep Sanctuary Charcoal) shifting to #292524 with a 2px #D97706 (Soft Amber) halo on hover',
    text: '#FAF7F2 (Warm Alabaster Cream) · Plus Jakarta Sans 600 SemiBold · 15px · tracking -0.01em',
    padding:
      '16px vertical × 32px horizontal (2:1 spatial ratio) · 8px architectural border radius',
    transition:
      '160ms cubic-bezier(0.16, 1, 0.3, 1) transform, ring, and background transition',
  },
  conversionFlowSteps: [
    {
      step: '01. The Entry Choice (Binary Role Fork)',
      title: 'Parent/Guardian (Ages 3–12) vs. Teen/User (Ages 13–18)',
      description:
        'Eliminates confusion at entry with two distinct architectural cards: Parent/Guardian Account (provisions COPPA-compliant Bedtime Sanctuary & Historical Archive) or Teen Independent Account (provisions Safe Harbor with device-locked AES-256 journal encryption).',
      fieldsRequired: 'Single-Tap Role Card Selection (Parent 3–12 or Teen 13–18)',
    },
    {
      step: '02. Frictionless Form & Explicit Trust Badge',
      title: 'One-Tap Social/Passkey Auth or 2-Field Email + Password',
      description:
        'Offers clean monochrome Apple/Google one-tap auth or just Email + Password—zero phone numbers, birthdates, or credit cards. Directly beneath the submit button sits the explicit Trust & Privacy Badge: "We never sell your data. Teen journals are encrypted and private from day one."',
      fieldsRequired: '1-Tap Social Auth OR Email + Password (2 fields maximum)',
    },
    {
      step: '03. Open Door Intake → Post-Intake Welcome Page',
      title: 'Age & Familiarity Check → Personalized Welcome Card & First Module CTA',
      description:
        'Users complete Screen 1 (Age Slider) and Screen 2 (Familiarity Check), triggering a brief "Setting up your personalized space…" transition that unveils their Personalized Welcome Card, single Actionable First Step button, and quiet secondary How It Works guide.',
      fieldsRequired: 'Age Slider (3–18) + 1-Click Familiarity Card → Single Action CTA',
    },
  ],
  placementStrategy: [
    {
      zone: '01. Primary Hero Anchor (Left Column, Below Sub-Headline)',
      rationale:
        'Positioned immediately after the mission statement ("without coercion or cringe") while the parent’s trust and emotional resonance are at their peak.',
    },
    {
      zone: '02. Top Navigation Bar (Right Zone Contract)',
      rationale:
        'Persistent quiet utility button in the 3-zone header for visitors ready to onboard after exploring the Three-Tier Preview Grid.',
    },
    {
      zone: '03. Post-Tier Synthesis Footer Anchor',
      rationale:
        'High-contrast Soft Amber button on Deep Sanctuary Charcoal placed after parents see the longitudinal 15-year proof.',
    },
  ],
};
