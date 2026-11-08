'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Compass,
  BookOpen,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MapPin,
  HelpCircle,
  Layers,
  Clock,
  Sliders,
} from 'lucide-react';
export interface HowToUseAppSectionProps {
  onOpenJourneyModal: (defaultTier?: 'bedtime' | 'archive' | 'harbor') => void;
  onOpenFeatureAtlasModal?: () => void;
  onEngageContent?: (points: number, label: string) => void;
  isNightSanctuary?: boolean;
  onToggleNightSanctuary?: () => void;
}

interface StepGuideItem {
  stepNumber: string;
  title: string;
  subtitle: string;
  timeEstimate: string;
  whatItIs: string;
  howItWorks: string[];
  whereToFindIt: string;
  whyItMatters: string;
  targetAnchor?: string;
  actionLabel: string;
  actionType: 'modal-any' | 'modal-bedtime' | 'modal-archive' | 'modal-harbor' | 'scroll' | 'toggle-night';
}

interface FeatureGuideItem {
  id: string;
  category: 'onboarding' | 'tiers' | 'study' | 'family-privacy' | 'rhythm-admin';
  categoryLabel: string;
  title: string;
  ageScope: string;
  purposeBadge: string;
  what: string;
  how: string;
  where: string;
  why: string;
  keyStepsOutline: string[];
  targetAnchor: string;
  ctaLabel: string;
  modalTier?: 'bedtime' | 'archive' | 'harbor';
}

interface SetOutlineBlueprint {
  id: string;
  title: string;
  audience: string;
  tierBadge: string;
  recommendedCadence: string;
  goalSummary: string;
  whatYouNeed: string;
  whereToStart: string;
  whyThisOutlineWorks: string;
  steps: {
    phase: string;
    time: string;
    actionTitle: string;
    detail: string;
    whereInApp: string;
  }[];
  launchAnchor: string;
  launchLabel: string;
  modalTier?: 'bedtime' | 'archive' | 'harbor';
}

const STEP_BY_STEP_WORKFLOW: StepGuideItem[] = [
  {
    stepNumber: 'Step 01',
    title: 'Choose Your Role & Open Door Starting Point',
    subtitle: 'Calibration by Age (3–18) & Scripture Familiarity',
    timeEstimate: '60 Seconds',
    whatItIs:
      'A judgment-free 2-step intake flow that tunes the reading level, historical context notes, and privacy settings to the exact reader stepping in.',
    howItWorks: [
      'Click "Begin the Journey" in the top bar or hero section to open the Open Door modal.',
      'Select either Option A (Parent/Guardian setting up for Ages 3–12) or Option B (Teen setting up independently for Ages 13–18).',
      'Slide the Age Selector (3 to 18) and choose one of three conversational Familiarity postures: Curious Beginner, Story Connector, or Deep-Dive Scholar.',
    ],
    whereToFindIt:
      'Top Navigation Bar ("Begin the Journey" button), Hero Section ("Start Here: Open Door Intake" card), or Section #design-spec (Tab 01).',
    whyItMatters:
      'Eliminates "bible trivia embarrassment" for newcomers while preventing boredom for experienced readers—routing every child or teen into a dignified custom entry lane.',
    actionLabel: 'Launch Step 01: Open Door Intake',
    actionType: 'modal-any',
  },
  {
    stepNumber: 'Step 02',
    title: 'Enter Your Age-Matched Developmental Sanctuary',
    subtitle: 'Bedtime Sanctuary (3–7) · Ancient Archive (8–12) · Safe Harbor (13–18)',
    timeEstimate: '8–20 Minutes / Session',
    whatItIs:
      'Three distinct reading and listening environments engineered so the app physically matures alongside a child across fifteen formative years.',
    howItWorks: [
      'Ages 3–7 (Bedtime Sanctuary): Dim the screen to 2100K amber, play acoustic spoken-word narratives, and read a single whispered parent-child wonder question.',
      'Ages 8–12 (Ancient Archive): Scrub interactive Near Eastern maps, unlock original Hebrew/Greek root ciphers, or start the 14-Day Late-Comer Bridge.',
      'Ages 13–18 (Safe Harbor): Interrogate raw biblical laments, listen to 3-minute scholar audio briefings, and write in a device-encrypted private journal.',
    ],
    whereToFindIt:
      'Three-Tier Preview Grid (#three-tier-grid), Bedtime Sanctuary Preview, Phase 03 Historical Archive (#phase-3-archive), and Phase 04 Safe Harbor (#phase-4-harbor).',
    whyItMatters:
      'Children do not outgrow faith when the medium respects their growing intellect, nervous system, and need for honest historical reality.',
    targetAnchor: '#three-tier-grid',
    actionLabel: 'Explore the Three Sanctuaries',
    actionType: 'scroll',
  },
  {
    stepNumber: 'Step 03',
    title: 'Study Texts Deeply in the Bible Study & Reading Studio',
    subtitle: 'Parallel Versions, Hover-to-Peek Lexicon & Auto-Saved Bookmarks',
    timeEstimate: 'Self-Paced Study',
    whatItIs:
      'An interactive multi-column scripture studio with parallel translation switching, Hebrew/Greek lexical hover tooltips, cross-references, and automatic session bookmarking.',
    howItWorks: [
      'Choose a curated passage (e.g., Psalm 23, Genesis 1, Habakkuk 1, or Matthew 5) and toggle between Narrative Paraphrase, Literary Standard, or Interlinear Root.',
      'Hover over any amber-highlighted key term (like "Covenant", "Hesed", or "Shalom") for an instant 1-sentence peek definition, or tap/click it to open the full lexical drawer.',
      'Your active passage, verse, and translation are automatically saved to your local browser ("Last Read" bookmark) so you can resume with one click.',
    ],
    whereToFindIt:
      'Section #bible-study-studio ("Interactive Bible Study & Reading Studio"), directly below the Parent-Mentor Architecture section.',
    whyItMatters:
      'Transforms passive reading into active discovery—letting readers see the vivid agricultural and historical metaphors underneath English translations.',
    targetAnchor: '#bible-study-studio',
    actionLabel: 'Open Bible Study Studio',
    actionType: 'scroll',
  },
  {
    stepNumber: 'Step 04',
    title: 'Search by Life Question, Theme, or Historical Era',
    subtitle: 'Semantic Archive Search & Guided Question Routing',
    timeEstimate: '1–3 Minutes',
    whatItIs:
      'A natural-language search engine across scripture passages, historical artifacts, emotional questions (anxiety, grief, doubt, justice), and family prompts.',
    howItWorks: [
      'Type any question, feeling, keyword, or biblical place into the Semantic Search Archive bar (or click one of the suggested inquiry chips).',
      'Filter results by developmental tier (Ages 3–7, Ages 8–12, Ages 13–18, or Parent-Mentor) to see age-calibrated explanations.',
      'Click any result card to inspect the historical context, root word note, and discussion prompt.',
    ],
    whereToFindIt:
      'Section #semantic-search ("Semantic Archive & Topic Search") or inside the Teen Safe Harbor "No-Filter Query Bar" (#phase-4-harbor).',
    whyItMatters:
      'Readers rarely think in chapter-and-verse numbers when facing real life; semantic search meets them at the exact point of their curiosity or struggle.',
    targetAnchor: '#semantic-search',
    actionLabel: 'Jump to Semantic Search',
    actionType: 'scroll',
  },
  {
    stepNumber: 'Step 05',
    title: 'Connect as a Family Without Violating Teen Privacy',
    subtitle: 'Parent-Mentor Portal, Dinner-Table Prompts & Zero-Knowledge Sync',
    timeEstimate: '5 Minutes at Dinner or Bedtime',
    whatItIs:
      'A dedicated parent and educator bridge that equips adults with open-ended Socratic conversation starters while mathematically protecting teen journal privacy.',
    howItWorks: [
      'Open the Parent-Mentor Architecture section to view synced weekly themes across your children’s age tiers.',
      'Use the "3-Minute Dinner-Table Socratic Prompts" to spark pressure-free family conversations where adults listen first.',
      'In Teen Safe Harbor, Co-Reading Sync shares only the passage topic being studied—never the teen’s AES-256-GCM encrypted journal entries.',
    ],
    whereToFindIt:
      'Section #phase-5-architecture ("Parent-Mentor Architecture & Co-Reading Sync") and the "Parent View" link in the top navigation bar.',
    whyItMatters:
      'Builds trust between parents and growing youth by replacing surveillance and lectures with shared curiosity.',
    targetAnchor: '#phase-5-architecture',
    actionLabel: 'View Parent-Mentor Portal',
    actionType: 'scroll',
  },
  {
    stepNumber: 'Step 06',
    title: 'Nurture Unhurried Habits with Growth Seeds & Night Sanctuary',
    subtitle: 'Non-Punitive Progress Tracking & Circadian 2100K Mode',
    timeEstimate: 'Ongoing Daily Rhythm',
    whatItIs:
      'A persistent bottom floating sanctuary bar that tracks your organic reading growth (Seed → Sprout → Sapling → Deep-Rooted Tree) and toggles 2100K Night Sanctuary mode.',
    howItWorks: [
      'Every time you read a passage, inspect a Hebrew/Greek root, or journal, you earn non-punitive Growth Points in the bottom floating Sanctuary Dashboard Bar.',
      'Click the Growth Seed badge in the bottom bar to open the Longitudinal Growth Tracker Modal, set your weekly session goal (2–7 sessions), and review recent milestones.',
      'Click the "2100K Night" toggle in the top header or bottom bar at any time to shift the entire app into a zero-blue-light evening palette.',
    ],
    whereToFindIt:
      'Persistent Bottom Floating Bar (SanctuaryDashboardBar) and Top Right Header ("2100K Night" toggle button).',
    whyItMatters:
      'Never punishes a missed day with guilt-inducing broken streaks—celebrating cumulative reflection and protecting healthy evening sleep.',
    actionLabel: 'Toggle 2100K Night Sanctuary Preview',
    actionType: 'toggle-night',
  },
];

const FEATURE_ATLAS_ITEMS: FeatureGuideItem[] = [
  {
    id: 'open-door-intake',
    category: 'onboarding',
    categoryLabel: 'Onboarding & Routing',
    title: 'Open Door 3×3 Intake & Custom Entry Lane Router',
    ageScope: 'All Ages (3–18) & Parents',
    purposeBadge: 'Zero-Jargon Personalization',
    what: 'An interactive age slider (3–18 with synced birth year) paired with a 3-option scripture familiarity selector that assigns one of 9 deterministic starting lanes.',
    how: 'Evaluates age tier × familiarity posture ("Curious Explorer", "Story Connector", or "Deep-Dive Scholar") and automatically configures glossary tooltips, primer notes, and privacy vaults.',
    where: 'Triggered via "Begin the Journey" (Top Navbar / Hero), the Hero "Start Here" card (#grow-with-me-preview-card), or inspected live in #design-spec (Tab 01).',
    why: 'Ensures a 12-year-old or 16-year-old stepping in for the very first time is never placed in a toddler interface or overwhelmed by unexplained church terminology.',
    keyStepsOutline: [
      'Choose Parent/Guardian Gateway (Ages 3–12) or Independent Teen Gateway (Ages 13–18).',
      'Drag the tactile Age Slider to set the reader’s exact age.',
      'Select the honest familiarity quote that matches your background to unlock your custom first module.',
    ],
    targetAnchor: '#grow-with-me-preview-card',
    ctaLabel: 'Open Intake Modal Now',
    modalTier: 'archive',
  },
  {
    id: 'bedtime-sanctuary',
    category: 'tiers',
    categoryLabel: 'Three Life-Stage Tiers',
    title: 'Tier 01 · The Bedtime Sanctuary & Morning Bridge',
    ageScope: 'Ages 3–7 (Early Childhood)',
    purposeBadge: '2100K Sleep-Safe Audio',
    what: 'An obsidian-umber evening environment pairing acoustic cello narration, gentle breath pacing, fine-line botanical art, and whispered parent-child wonder prompts.',
    how: 'Eliminates blue light (0% 460nm emission), plays 8–12 minute narrated stories with an automatic screen sleep fade, and queues a 60-second "Morning Bridge" prompt for breakfast.',
    where: 'Located in the Three-Tier Preview Grid (#three-tier-grid, Card 01) and interactive age snapshot (Ages 4 & 7) in #age-evolution.',
    why: 'Between ages 3 and 7, spiritual trust is formed through nervous-system safety, warmth, and a parent’s unhurried voice—not frantic cartoons.',
    keyStepsOutline: [
      'Activate 2100K Night Sanctuary mode 15 minutes before sleep.',
      'Tap the oversized amber audio playhead to start the evening psalm or narrative.',
      'Whisper the single Parent Wonder Prompt together before sleep.',
    ],
    targetAnchor: '#three-tier-grid',
    ctaLabel: 'Jump to Bedtime Sanctuary',
  },
  {
    id: 'ancient-archive-bridge',
    category: 'tiers',
    categoryLabel: 'Three Life-Stage Tiers',
    title: 'Tier 02 · Historical Archive & 14-Day Late-Comer Bridge',
    ageScope: 'Ages 8–12 (Tweens & Late Beginners)',
    purposeBadge: 'Archaeology & Context',
    what: 'A museum-grade field notebook featuring a Near Eastern Detective Map, Street-Level Context toggle, Hebrew/Greek Root Ciphers, Relic Exhibition Case, and a 14-Day "Roots & Resilience" ramp.',
    how: 'Tweens switch between 4 interactive field tools (Detective Map, Root Ciphers, Relic Case, and 14-Day Bridge) to investigate real Iron Age and First-Century history.',
    where: 'Located in Section #phase-3-archive ("Phase 03 · The Historical Archive & Late-Comer Bridge").',
    why: 'Tweens crave concrete evidence. Treating them as historical detectives prevents them from dismissing scripture as a fairy tale.',
    keyStepsOutline: [
      'Toggle "12-Year-Old Late-Comer Bridge" if starting fresh with zero prior background.',
      'Click geographical pins on the Near Eastern Detective Map (Babylon, Nineveh, Judea, Galilee).',
      'Switch between "Standard Verse" and "Street-Level Historical Context" to uncover the real cultural tension.',
    ],
    targetAnchor: '#phase-3-archive',
    ctaLabel: 'Explore Historical Archive',
  },
  {
    id: 'safe-harbor-vault',
    category: 'tiers',
    categoryLabel: 'Three Life-Stage Tiers',
    title: 'Tier 03 · Teen Safe Harbor, Text Collision & Encrypted Vault',
    ageScope: 'Ages 13–18 (Adolescents)',
    purposeBadge: 'Zero-Knowledge Teen Autonomy',
    what: 'An editorial seminar studio combining a No-Filter Query Bar, Raw Text Collision Engine, 3-Minute Scholar Audio Briefings, Moderated Peer Roundtables, and an AES-256-GCM Private Commonplace Vault.',
    how: 'Teens select hard existential questions (e.g., suffering, hypocrisy, anxiety, science), compare raw biblical laments with modern realities, read theologian-moderated peer notes, and lock private entries locally.',
    where: 'Located in Section #phase-4-harbor ("Phase 04 · The Safe Harbor & Wrestling Ring").',
    why: 'Teens stay engaged when their intellectual autonomy is respected, hard questions aren’t dodged, and their private journal is never surveilled.',
    keyStepsOutline: [
      'Select an unfiltered question in the No-Filter Query Bar (e.g., "Why does God allow innocent suffering?").',
      'Inspect the Raw Text Collision side-by-side and play the 3-Minute Scholar Audio Briefing.',
      'Write personal thoughts in the Encrypted Commonplace Vault (saved locally with AES-256-GCM).',
    ],
    targetAnchor: '#phase-4-harbor',
    ctaLabel: 'Enter Teen Safe Harbor',
  },
  {
    id: 'bible-study-reading-studio',
    category: 'study',
    categoryLabel: 'Reading & Study Tools',
    title: 'Bible Study & Reading Studio (Hover-to-Peek + Auto-Bookmark)',
    ageScope: 'Ages 8–18 & Adults',
    purposeBadge: 'Lexicon & Parallel Texts',
    what: 'A full-featured reading studio offering 3 parallel translation lenses, inline highlighted key terms with hover micro-tooltips, tap-to-open Hebrew/Greek dictionary sheets, and automatic "Last Read" localStorage bookmarking.',
    how: 'Hovering over highlighted terms previews a 1-sentence definition; clicking opens the complete lexical root sheet. Every verse selection and translation switch auto-saves to your "Last Read" banner.',
    where: 'Located in Section #bible-study-studio ("Interactive Bible Study & Reading Studio").',
    why: 'Gives readers scholarly tools—original languages, manuscript context, and cross-references—in a calm, accessible interface.',
    keyStepsOutline: [
      'Pick a passage from the Left Passage Library and select your Translation Lens (or enable Parallel Compare).',
      'Hover over any amber-underlined word to peek at its 1-sentence definition, then click for full Hebrew/Greek root study.',
      'Use the "Resume Last Read" banner at the top of the studio on your next visit to pick up at your exact verse.',
    ],
    targetAnchor: '#bible-study-studio',
    ctaLabel: 'Launch Reading Studio',
  },
  {
    id: 'semantic-search-archive',
    category: 'study',
    categoryLabel: 'Reading & Study Tools',
    title: 'Semantic Archive & Life-Question Search Engine',
    ageScope: 'All Ages (Tier-Filterable)',
    purposeBadge: 'Instant Topic Discovery',
    what: 'An interactive search directory indexing passages by human emotion, ethical dilemma, historical era, and Hebrew/Greek concept.',
    how: 'Filter by life stage or type keywords like "fear", "covenant", "exile", "doubt", or "bedtime" to surface matched scripture artifacts and conversation guides.',
    where: 'Located in Section #semantic-search ("Semantic Archive & Topic Search").',
    why: 'Bridges the gap between everyday human experiences and ancient biblical wisdom in seconds.',
    keyStepsOutline: [
      'Click a quick-topic filter chip or type your own question in the search input.',
      'Filter by Developmental Tier to tailor the explanation depth.',
      'Open the matched card to read the passage, historical context, and discussion prompt.',
    ],
    targetAnchor: '#semantic-search',
    ctaLabel: 'Search the Archive',
  },
  {
    id: 'parent-mentor-portal',
    category: 'family-privacy',
    categoryLabel: 'Family & Privacy',
    title: 'Parent-Mentor Architecture & Co-Reading Sync',
    ageScope: 'Parents, Guardians & Youth Mentors',
    purposeBadge: 'Connection Without Surveillance',
    what: 'A family stewardship hub providing weekly synced reading themes, 3-minute dinner-table Socratic prompts, and cryptographic boundaries protecting teen journals.',
    how: 'Syncs the general passage theme a child or teen is exploring to the parent’s dashboard and generates age-appropriate open-ended questions—while keeping teen journal entries 100% unreadable to anyone else.',
    where: 'Located in Section #phase-5-architecture ("Parent-Mentor Architecture") and via "Parent View" in the top navbar.',
    why: 'Helps parents lead meaningful spiritual conversations at home without triggering adolescent defensiveness.',
    keyStepsOutline: [
      'Select your child’s current tier in the Parent-Mentor Architecture simulator.',
      'Read the synced passage summary and copy the Dinner-Table Socratic Prompt.',
      'Review the Cryptographic Privacy Boundary verifying how teen journals remain zero-knowledge.',
    ],
    targetAnchor: '#phase-5-architecture',
    ctaLabel: 'Open Parent-Mentor Section',
  },
  {
    id: 'growth-seed-and-admin',
    category: 'rhythm-admin',
    categoryLabel: 'Rhythm & Administration',
    title: 'Growth Seed Tracker, Age Evolution Timeline & Admin Console',
    ageScope: 'All Users & Platform Maintainers',
    purposeBadge: 'Longitudinal Rhythm & System Specs',
    what: 'Includes the persistent bottom Sanctuary Dashboard Bar (Growth Seed stages), the 15-Year Age Evolution Scrubber (#age-evolution), and the password-protected Admin Backend Maintenance Console (#admin-backend-console).',
    how: 'Tracks organic engagement points without streak penalties; lets families scrub from Age 4 to Age 18 on Psalm 23; and houses technical routing specs behind an Admin authentication wall.',
    where: 'Bottom Floating Bar (Growth Seed), Section #age-evolution (15-Year Scrubber), and Footer / Section #admin-backend-console (Admin Console).',
    why: 'Keeps user-facing Christian formation clean and serene while providing full longitudinal transparency and dedicated backend maintenance tools.',
    keyStepsOutline: [
      'Click the Growth Seed pill in the bottom bar to view your botanical stage and customize your weekly reading rhythm.',
      'Scrub ages 4, 7, 10, 14, and 18 in #age-evolution to see how the UI matures on the exact same Psalm.',
      'For maintainers: scroll to #admin-backend-console to unlock internal routing & data architecture specs.',
    ],
    targetAnchor: '#age-evolution',
    ctaLabel: 'View 15-Year Age Evolution',
  },
];

const SET_OUTLINE_BLUEPRINTS: SetOutlineBlueprint[] = [
  {
    id: 'outline-early-childhood',
    title: 'Outline 01 · Early Childhood Evening & Morning Rhythm',
    audience: 'Parents with Children Ages 3–7',
    tierBadge: 'Tier 01 · Bedtime Sanctuary',
    recommendedCadence: '10 Mins Evening + 1 Min Morning · 3–5 Nights/Week',
    goalSummary:
      'Build a calm, physical association between scripture, emotional safety, and unhurried parental warmth at bedtime.',
    whatYouNeed: 'A quiet room, Night Sanctuary Mode (2100K) active, and gentle audio volume.',
    whereToStart: 'Three-Tier Grid → Card 01 (The Bedtime Sanctuary) or Open Door Intake (Age 4–6).',
    whyThisOutlineWorks:
      'Protects natural melatonin onset while planting foundational images of God’s care through story and gentle question-asking.',
    steps: [
      {
        phase: '01. Prepare (1 Min)',
        time: '8:00 PM',
        actionTitle: 'Activate 2100K Night Sanctuary Canvas',
        detail:
          'Tap the "2100K Night" button in the top navigation bar so the screen shifts to warm obsidian-umber with zero blue light.',
        whereInApp: 'Top Navigation Bar or Bottom Sanctuary Bar',
      },
      {
        phase: '02. Listen (6–8 Mins)',
        time: '8:02 PM',
        actionTitle: 'Play the Evening Audio Narrative',
        detail:
          'Start a gentle story like "The Night the Wind Listened" or "The Shepherd Who Knows Your Name" (Psalm 23) as the screen slowly dims.',
        whereInApp: 'Bedtime Sanctuary (#three-tier-grid) or Age Evolution (Age 4)',
      },
      {
        phase: '03. Wonder (2 Mins)',
        time: '8:10 PM',
        actionTitle: 'Ask the Single Whispered Wonder Prompt',
        detail:
          'Read the Parent Whisper Prompt aloud (e.g., "What is the quietest, safest place you can imagine resting tonight?") and listen without correcting.',
        whereInApp: 'Bedtime Sanctuary Companion Card',
      },
      {
        phase: '04. Recall (1 Min)',
        time: 'Next Morning',
        actionTitle: 'Share the Morning Bridge Recall Question',
        detail:
          'Over breakfast, ask the 1-sentence recall question synced to your Parent Dashboard to connect last night’s peace to the new day.',
        whereInApp: 'Parent-Mentor Portal (#phase-5-architecture)',
      },
    ],
    launchAnchor: '#three-tier-grid',
    launchLabel: 'Start Early Childhood Outline',
    modalTier: 'bedtime',
  },
  {
    id: 'outline-tween-bridge',
    title: 'Outline 02 · Tween & Late-Beginner 14-Day Discovery Outline',
    audience: 'Tweens Ages 8–12 (Including First-Time Readers)',
    tierBadge: 'Tier 02 · Historical Archive',
    recommendedCadence: '15 Mins / Session · 3–4 Days/Week for 2 Weeks',
    goalSummary:
      'Equip 8-to-12-year-olds to investigate the Bible as real Ancient Near Eastern history, geography, and language rather than disconnected fables.',
    whatYouNeed: 'Curiosity—zero prior church or Bible trivia knowledge required.',
    whereToStart: 'Phase 03 Historical Archive (#phase-3-archive) & Bible Study Studio (#bible-study-studio).',
    whyThisOutlineWorks:
      'Meets the concrete-operational tween brain with maps, museum artifacts, and original Hebrew/Greek root words.',
    steps: [
      {
        phase: '01. Calibrate (2 Mins)',
        time: 'Day 1',
        actionTitle: 'Enable the 12-Year-Old Late-Comer Bridge',
        detail:
          'In Phase 03 (#phase-3-archive), toggle ON the "12-Year-Old Late-Comer Bridge" to unlock the 14-Day "Roots & Resilience" track with jargon-free primers.',
        whereInApp: 'Section #phase-3-archive (Top Right Toggle)',
      },
      {
        phase: '02. Locate (4 Mins)',
        time: 'Minutes 3–6',
        actionTitle: 'Pinpoint the Geography on the Detective Map',
        detail:
          'Click the interactive coordinates (e.g., Judean Wilderness, Nineveh, or Babylon) and toggle "Street-Level Context" to see what was happening politically.',
        whereInApp: 'Section #phase-3-archive → Detective Map Tab',
      },
      {
        phase: '03. Decode (5 Mins)',
        time: 'Minutes 7–11',
        actionTitle: 'Hover & Tap Original Hebrew/Greek Key Terms',
        detail:
          'Move to the Bible Study Studio (#bible-study-studio), hover over highlighted words like "Hesed" or "Covenant" for a quick peek, and tap to inspect the ancient metaphor.',
        whereInApp: 'Section #bible-study-studio (Reading Canvas)',
      },
      {
        phase: '04. Bookmark (1 Min)',
        time: 'Minute 15',
        actionTitle: 'Save Progress & Grow Your Seed',
        detail:
          'Your exact verse and translation save automatically to the "Last Read" bookmark bar, and your Growth Seed advances in the bottom dashboard.',
        whereInApp: 'Bible Study Studio Top Bar & Bottom Sanctuary Bar',
      },
    ],
    launchAnchor: '#phase-3-archive',
    launchLabel: 'Start Tween Discovery Outline',
    modalTier: 'archive',
  },
  {
    id: 'outline-teen-inquiry',
    title: 'Outline 03 · Teen Independent Inquiry & Seminar Outline',
    audience: 'Teens & Young Adults Ages 13–18',
    tierBadge: 'Tier 03 · Safe Harbor',
    recommendedCadence: '15–20 Mins Self-Directed · Whenever Questions Arise',
    goalSummary:
      'Create an unvarnished, sovereign space to wrestle with doubt, suffering, justice, and primary biblical texts with 100% encrypted privacy.',
    whatYouNeed: 'Independent Teen Gateway mode (AES-256-GCM local vault enabled).',
    whereToStart: 'Phase 04 Safe Harbor (#phase-4-harbor) & Parallel Bible Study Studio (#bible-study-studio).',
    whyThisOutlineWorks:
      'Honors adolescent autonomy and critical thinking by pairing raw biblical laments (Job, Habakkuk, Psalms) with zero-surveillance journaling.',
    steps: [
      {
        phase: '01. Interrogate (3 Mins)',
        time: 'Step 1',
        actionTitle: 'Select a Hard Question in the No-Filter Query Bar',
        detail:
          'In Safe Harbor (#phase-4-harbor), select or search an unfiltered question about suffering, hypocrisy, anxiety, or faith and science.',
        whereInApp: 'Section #phase-4-harbor (No-Filter Query Bar)',
      },
      {
        phase: '02. Collide (5 Mins)',
        time: 'Step 2',
        actionTitle: 'Compare the Raw Text Collision & Scholar Briefing',
        detail:
          'Read the unabridged biblical text alongside the modern ethical tension, and play the 3-Minute Scholar Audio Briefing for historical depth.',
        whereInApp: 'Section #phase-4-harbor (Raw Text Collision Engine)',
      },
      {
        phase: '03. Compare (4 Mins)',
        time: 'Step 3',
        actionTitle: 'Read Moderated Peer Seminar Perspectives',
        detail:
          'See how other thoughtful 13–18-year-olds wrestle with the same passage in a theologian-moderated roundtable—with zero likes, followers, or clout metrics.',
        whereInApp: 'Section #phase-4-harbor (Peer Seminar Panel)',
      },
      {
        phase: '04. Lock (5 Mins)',
        time: 'Step 4',
        actionTitle: 'Record Honest Reflections in the Encrypted Vault',
        detail:
          'Write your raw thoughts in the Commonplace Vault. Entries are encrypted client-side on your device—no parent or server can ever read them.',
        whereInApp: 'Section #phase-4-harbor (Zero-Knowledge Vault)',
      },
    ],
    launchAnchor: '#phase-4-harbor',
    launchLabel: 'Start Teen Safe Harbor Outline',
    modalTier: 'harbor',
  },
  {
    id: 'outline-family-mentor',
    title: 'Outline 04 · Parent-Mentor Co-Reading & Dinner-Table Outline',
    audience: 'Parents, Guardians & Youth Educators',
    tierBadge: 'Cross-Tier Family Stewardship',
    recommendedCadence: '10 Mins Weekly Prep + 5 Mins at the Dinner Table',
    goalSummary:
      'Walk alongside children from ages 3 to 18 using shared themes and Socratic questions that invite dialogue rather than lectures.',
    whatYouNeed: 'Parent-Mentor Architecture (#phase-5-architecture) & Semantic Search (#semantic-search).',
    whereToStart: 'Section #phase-5-architecture ("Parent-Mentor Architecture & Co-Reading Sync").',
    whyThisOutlineWorks:
      'Gives parents confidence to discuss ancient context and hard questions while respecting each child’s developmental stage.',
    steps: [
      {
        phase: '01. Sync (2 Mins)',
        time: 'Weekly Check-In',
        actionTitle: 'Review Synced Weekly Themes Across Ages',
        detail:
          'Open #phase-5-architecture to see the shared biblical theme your child or teen is exploring (without intruding on private journals).',
        whereInApp: 'Section #phase-5-architecture',
      },
      {
        phase: '02. Prepare (4 Mins)',
        time: 'Before Dinner',
        actionTitle: 'Preview the Historical & Lexical Background',
        detail:
          'Open the Bible Study Studio (#bible-study-studio) in Parallel Compare mode to brush up on the Hebrew/Greek root words in 3 minutes.',
        whereInApp: 'Section #bible-study-studio',
      },
      {
        phase: '03. Ask (5 Mins)',
        time: 'At the Table',
        actionTitle: 'Use the 3-Minute Socratic Dinner Prompt',
        detail:
          'Ask the open-ended question provided in the Parent-Mentor card (e.g., "Why do you think the author kept this hard question in the text?").',
        whereInApp: 'Section #phase-5-architecture (Socratic Prompt Card)',
      },
      {
        phase: '04. Look Ahead (2 Mins)',
        time: 'Seasonally',
        actionTitle: 'Preview Next Age Transitions on the 15-Year Scrubber',
        detail:
          'Use the Age Evolution Scrubber (#age-evolution) to see how your child’s reading environment will mature over the next few years.',
        whereInApp: 'Section #age-evolution',
      },
    ],
    launchAnchor: '#phase-5-architecture',
    launchLabel: 'Open Parent-Mentor Guide',
  },
];

const QUICK_DIRECTORY_MAP = [
  {
    placeName: 'Open Door Intake & Role Selector',
    sectionLocation: 'Top Navbar ("Begin the Journey") & Hero Right Card',
    anchor: '#grow-with-me-preview-card',
    whatYouFindThere: 'Age 3–18 slider, Birth-Year sync, 3 Familiarity options, and Parent vs. Teen gateway.',
  },
  {
    placeName: 'Three Life-Stage Sanctuaries Overview',
    sectionLocation: 'Section 02 · Three-Tier Preview Grid',
    anchor: '#three-tier-grid',
    whatYouFindThere: 'Side-by-side comparison of Bedtime Sanctuary (3–6), Ancient Archive (8–12), and Safe Harbor (13–18).',
  },
  {
    placeName: '15-Year Longitudinal Age Scrubber',
    sectionLocation: 'Section 03 · Age Evolution Scrubber',
    anchor: '#age-evolution',
    whatYouFindThere: 'Interactive slider comparing how Psalm 23 adapts across Ages 4, 7, 10, 14, and 18.',
  },
  {
    placeName: 'Near Eastern Map, Relics & 14-Day Bridge',
    sectionLocation: 'Section 04 · Phase 03 Historical Archive',
    anchor: '#phase-3-archive',
    whatYouFindThere: 'Interactive map coordinates, Street-Level context toggle, Root Ciphers, Relic Case, and Late-Comer Bridge.',
  },
  {
    placeName: 'No-Filter Query Bar & Encrypted Teen Vault',
    sectionLocation: 'Section 05 · Phase 04 Safe Harbor',
    anchor: '#phase-4-harbor',
    whatYouFindThere: 'Hard question selector, Raw Text Collision, 3-Min Scholar Audio, Peer Seminars, and AES-256-GCM Vault.',
  },
  {
    placeName: 'Parent-Mentor Portal & Socratic Prompts',
    sectionLocation: 'Section 06 · Phase 05 Parent-Mentor Architecture',
    anchor: '#phase-5-architecture',
    whatYouFindThere: 'Co-Reading theme sync, Dinner-Table conversation prompts, and Teen Privacy boundary proof.',
  },
  {
    placeName: 'Bible Study & Reading Studio',
    sectionLocation: 'Section 07 · Interactive Reading Studio',
    anchor: '#bible-study-studio',
    whatYouFindThere: 'Parallel translations, Hover-to-Peek key terms, tap-to-open Hebrew/Greek dictionary, and Auto-Saved "Last Read" bookmark.',
  },
  {
    placeName: 'Semantic Search Archive',
    sectionLocation: 'Section 08 · Semantic Topic & Question Search',
    anchor: '#semantic-search',
    whatYouFindThere: 'Natural-language search across passages, emotions, historical eras, and tier-specific guides.',
  },
  {
    placeName: 'Growth Seed Tracker & 2100K Night Toggle',
    sectionLocation: 'Persistent Bottom Floating Bar & Top Header',
    anchor: '#how-to-use',
    whatYouFindThere: 'Non-punitive Growth Seed stages (Seed → Canopy), weekly rhythm goal setter, and full-page 2100K Night mode.',
  },
  {
    placeName: 'Admin & Backend Maintenance Console',
    sectionLocation: 'Bottom Section · Password-Protected Admin Area',
    anchor: '#admin-backend-console',
    whatYouFindThere: 'Internal Screen 03 Post-Intake Routing specs, 3×3 Entry Lane Router matrix, and Maintenance Logs (Admin Auth required).',
  },
];

export default function HowToUseAppSection({
  onOpenJourneyModal,
  onOpenFeatureAtlasModal,
  onEngageContent,
  isNightSanctuary = false,
  onToggleNightSanctuary,
}: HowToUseAppSectionProps) {
  const router = useRouter();
  const [walkthroughStage, setWalkthroughStage] = useState<number>(0);
  const [activeGuideTab, setActiveGuideTab] = useState<
    'steps' | 'features' | 'outlines' | 'directory'
  >('steps');
  const [selectedFeatureCategory, setSelectedFeatureCategory] = useState<
    'all' | 'onboarding' | 'tiers' | 'study' | 'family-privacy' | 'rhythm-admin'
  >('all');
  const [activeOutlineId, setActiveOutlineId] = useState<string>(
    SET_OUTLINE_BLUEPRINTS[0].id
  );

  const onboardingWalkthroughStages = [
    {
      stageNum: 'Stage 01 of 04',
      tabLabel: '01. How the App Works',
      kicker: 'THE 3-STEP SANCTUARY RHYTHM',
      headline: 'How Grow In The Word Works from Day One',
      summary:
        'Instead of dropping children, tweens, and teens into a generic bible reader, Grow In The Word calibrates to their developmental age and familiarity in 60 seconds, then evolves alongside them for fifteen years.',
      cards: [
        {
          badge: '01 · CALIBRATE (60 SECS)',
          title: 'The Open Door Intake & Role Check',
          body: 'Select Parent Gateway (Ages 3–12) or Independent Teen Gateway (Ages 13–18), slide to the reader’s exact age, and pick one of 3 honest familiarity postures—assigning a tailored starting lane with zero test anxiety.',
          where: 'Top Navbar ("Begin the Journey") or #design-spec',
          anchor: '#grow-with-me-preview-card',
        },
        {
          badge: '02 · EXPLORE (8–20 MINS)',
          title: 'Engage Your Age-Matched Tier & Study Studio',
          body: 'Listen to 2100K bedtime audio (Ages 3–6), investigate Near Eastern maps & root ciphers (Ages 8–12), wrestle with laments in an encrypted vault (Ages 13–18), or compare parallel texts in the Reading Studio.',
          where: 'Sections #three-tier-grid, #phase-3-archive, #phase-4-harbor & #bible-study-studio',
          anchor: '#three-tier-grid',
        },
        {
          badge: '03 · GROW (UNHURRIED)',
          title: 'Auto-Bookmark & Cultivate Your Growth Seed',
          body: 'Your exact verse and translation save automatically in localStorage ("Last Read"), while every reflection nurtures your botanical Growth Seed in the bottom bar—with zero guilt-inducing streak resets.',
          where: 'Bible Study Studio Top Bar & Bottom Floating Sanctuary Bar',
          anchor: '#bible-study-studio',
        },
      ],
    },
    {
      stageNum: 'Stage 02 of 04',
      tabLabel: '02. Purpose of Each Tier',
      kicker: 'SANCTUARY (3–6) · ARCHIVE (8–12) · HARBOR (13–18)',
      headline: 'The Purpose of Each Developmental Tier',
      summary:
        'A 4-year-old needs nervous-system safety; a 10-year-old demands historical proof; a 16-year-old requires intellectual autonomy. Each tier is purpose-built for its stage.',
      cards: [
        {
          badge: 'TIER 01 · AGES 3–6',
          title: 'The Bedtime Sanctuary — Calm, Safety & Wonder',
          body: 'Purpose: Associate scripture with physical safety and parental warmth before sleep. Uses a 2100K zero-blue-light obsidian canvas, 58 BPM acoustic cello storytelling, sleepy-hand audio bookmarks, and Morning Bridge recall prompts.',
          where: 'Section #three-tier-grid (Card 01)',
          anchor: '#three-tier-grid',
        },
        {
          badge: 'TIER 02 · AGES 8–12',
          title: 'The Ancient Archive — Concrete History, Not Cartoons',
          body: 'Purpose: Satisfy tween investigative curiosity so faith isn’t dismissed as a fairy tale. Features the Near Eastern Detective Map, Street-Level context toggles, Hebrew/Greek Root Ciphers, and the 14-Day Late-Comer Bridge.',
          where: 'Section #phase-3-archive ("The Ancient Archive Detective Map")',
          anchor: '#phase-3-archive',
        },
        {
          badge: 'TIER 03 · AGES 13–18',
          title: 'The Safe Harbor — Autonomy, Inquiry & Safe Community',
          body: 'Purpose: Give teens a judgment-free seminar space to own their faith and wrestle with hard questions. Combines a No-Filter Query Bar, Raw Text Collision, theologian-moderated peer cohorts, and an AES-256-GCM encrypted vault.',
          where: 'Section #phase-4-harbor ("The Safe Harbor & Wrestling Ring")',
          anchor: '#phase-4-harbor',
        },
      ],
    },
    {
      stageNum: 'Stage 03 of 04',
      tabLabel: '03. Where to Find Study Tools',
      kicker: 'LEXICON · PARALLEL VERSIONS · SEMANTIC SEARCH · PARENT SYNC',
      headline: 'Where to Find Every Study & Family Tool',
      summary:
        'All scholarly and family study instruments are organized in dedicated, distraction-free studios on the main sanctuary page and indexed in the top Feature Atlas modal.',
      cards: [
        {
          badge: 'BIBLE STUDY STUDIO',
          title: 'Parallel Translations, Hover-to-Peek & Auto-Bookmark',
          body: 'Located at #bible-study-studio. Switch between Narrative Paraphrase, Literary Standard, and Hebrew/Greek Interlinear Root. Hover over highlighted key terms for a 1-sentence peek definition, or tap for the full root dictionary.',
          where: 'Section 07 · #bible-study-studio ("Study Studio" in Navbar)',
          anchor: '#bible-study-studio',
        },
        {
          badge: 'SEMANTIC SEARCH & MAPS',
          title: 'Natural-Language Topic Search & Archaeological Atlas',
          body: 'Search by human emotion, life question, or historical era in #semantic-search, or inspect Iron Age and First-Century geographical coordinates and museum relics in #phase-3-archive.',
          where: 'Section 08 · #semantic-search & Section 04 · #phase-3-archive',
          anchor: '#semantic-search',
        },
        {
          badge: 'PARENT & TEEN TOOLS',
          title: 'Dinner-Table Socratic Prompts & Encrypted Teen Vault',
          body: 'Parents find synced weekly reading themes and 3-minute Socratic dinner questions in #phase-5-architecture, while teens access their client-side encrypted commonplace journal in #phase-4-harbor.',
          where: 'Section 06 · #phase-5-architecture & Section 05 · #phase-4-harbor',
          anchor: '#phase-5-architecture',
        },
      ],
    },
    {
      stageNum: 'Stage 04 of 04',
      tabLabel: '04. Why Minimalist & Privacy-First',
      kicker: 'THE ARCHITECTURAL CONVICTION BEHIND OUR DESIGN',
      headline: 'The ‘Why’ Behind Our Minimalist, Privacy-First Sanctuary',
      summary:
        'Every visual and cryptographic decision in Grow In The Word is designed to protect attention, sleep, and authentic spiritual formation.',
      cards: [
        {
          badge: 'WHY WARM ALABASTER & 2100K?',
          title: 'Protecting Nervous Systems & Natural Sleep',
          body: 'Loud primary colors and clinical white glare trigger cognitive alertness and suppress melatonin. Our Warm Alabaster (#F9F6F0) day paper and 2100K Obsidian (#1C1917) night mode keep reading calm and restorative.',
          where: 'Toggleable anytime via "Night Sanctuary" in the Top Navbar',
          anchor: '#design-spec',
        },
        {
          badge: 'WHY ZERO-KNOWLEDGE PRIVACY?',
          title: 'Authentic Teen Wrestling Requires Real Sovereignty',
          body: 'If a 15-year-old suspects their journal is visible to parents or algorithms, they perform rather than reflect. Client-side AES-256-GCM encryption guarantees their journal belongs strictly to them.',
          where: 'Verified in #phase-4-harbor & #design-spec (Tab 02)',
          anchor: '#phase-4-harbor',
        },
        {
          badge: 'WHY ZERO STREAK MANIPULATION?',
          title: 'Formation Over Dopamine Gamification',
          body: 'Broken streak counters create guilt and turn scripture into a chore. Our botanical Growth Seed (Seed → Canopy) celebrates cumulative curiosity and reflection without ever penalizing a rest day.',
          where: 'Persistent Bottom Sanctuary Dashboard Bar',
          anchor: '#evidence',
        },
      ],
    },
  ];

  const activeWalkthrough =
    onboardingWalkthroughStages[walkthroughStage] ||
    onboardingWalkthroughStages[0];

  const filteredFeatures =
    selectedFeatureCategory === 'all'
      ? FEATURE_ATLAS_ITEMS
      : FEATURE_ATLAS_ITEMS.filter(
          (item) => item.category === selectedFeatureCategory
        );

  const currentOutline =
    SET_OUTLINE_BLUEPRINTS.find((o) => o.id === activeOutlineId) ||
    SET_OUTLINE_BLUEPRINTS[0];

  const handleScrollToAnchor = (anchor: string, label: string) => {
    if (onEngageContent) {
      onEngageContent(5, `Used App Guide: ${label}`);
    }
    if (typeof document !== 'undefined') {
      const target = document.querySelector(anchor);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      // Route fallback for dedicated studios that were decoupled into individual pages
      const routeMap: Record<string, string> = {
        '#three-tier-grid': '/tiers',
        '#phase-3-archive': '/ancient-archive',
        '#phase-4-harbor': '/safe-harbor',
        '#phase-5-architecture': '/parent-portal',
        '#bible-study-studio': '/bible-study-studio',
        '#semantic-search': '/semantic-search',
        '#age-evolution': '/timeline',
        '#growth-tracker': '/growth-tracker',
      };
      if (routeMap[anchor]) {
        router.push(routeMap[anchor]);
        return;
      }
      const directory = document.querySelector('#formation-studios-directory');
      if (directory) {
        directory.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleStepAction = (step: StepGuideItem) => {
    if (onEngageContent) {
      onEngageContent(5, `App Guide Step: ${step.stepNumber}`);
    }
    if (step.actionType === 'modal-any') {
      onOpenJourneyModal();
    } else if (step.actionType === 'modal-bedtime') {
      onOpenJourneyModal('bedtime');
    } else if (step.actionType === 'modal-archive') {
      onOpenJourneyModal('archive');
    } else if (step.actionType === 'modal-harbor') {
      onOpenJourneyModal('harbor');
    } else if (step.actionType === 'toggle-night' && onToggleNightSanctuary) {
      onToggleNightSanctuary();
    } else if (step.targetAnchor) {
      handleScrollToAnchor(step.targetAnchor, step.title);
    }
  };

  return (
    <section
      id="how-to-use"
      aria-labelledby="how-to-use-heading"
      className="py-20 lg:py-28 border-b border-[#E5DEC9] bg-[#FAF7F2] min-w-0"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        {/* Section Header: Clear Orientation & The 4 W's Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#E5DEC9]">
          <div className="max-w-3xl space-y-3 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#92400E]">
              <Compass className="w-4 h-4 text-[#D97706] shrink-0" />
              <span>Complete Orientation &amp; Onboarding Walkthrough</span>
              <span aria-hidden="true">·</span>
              <span>How · What · Where · Why</span>
            </div>
            <h2
              id="how-to-use-heading"
              className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-[#1C1917] leading-[1.12]"
              style={{
                fontFamily: 'var(--font-display), serif',
                textWrap: 'balance',
              }}
            >
              How to Use <span className="italic font-normal text-[#92400E]">Grow In The Word</span>
            </h2>
            <p className="text-base sm:text-lg text-[#44403C] leading-relaxed">
              An interactive onboarding walkthrough explaining how the app works, the purpose of each developmental tier (Sanctuary, Archive, Harbor), where to find study tools, and the ‘why’ behind our minimalist, privacy-first design.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onOpenFeatureAtlasModal && (
              <button
                type="button"
                onClick={onOpenFeatureAtlasModal}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-[#D97706]/50 bg-[#F2ECE1] hover:bg-[#EAE3D5] text-xs font-semibold text-[#1C1917] transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Open Feature Atlas Modal</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => onOpenJourneyModal()}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-[#1C1917] hover:bg-[#292524] text-xs font-semibold text-[#FAF7F2] transition-colors cursor-pointer"
            >
              <span>Start Step 01: Open Door Intake</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
            </button>
          </div>
        </div>

        {/* Interactive 4-Stage 'Grow In The Word' Onboarding Walkthrough */}
        <div className="mt-8 rounded-2xl bg-[#F2ECE1] border border-[#E5DEC9] overflow-hidden shadow-2xs min-w-0">
          {/* Walkthrough Top Stage Selector Bar */}
          <div className="px-5 sm:px-7 py-4 bg-[#1C1917] text-[#FAF7F2] border-b border-[#292524] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#FBBF24]">
              <span>Interactive Onboarding Walkthrough</span>
              <span aria-hidden="true">·</span>
              <span>{activeWalkthrough.stageNum}</span>
            </div>

            <div
              role="tablist"
              aria-label="Onboarding Walkthrough Stages"
              className="flex flex-wrap items-center gap-1.5"
            >
              {onboardingWalkthroughStages.map((st, idx) => {
                const isSelected = idx === walkthroughStage;
                return (
                  <button
                    key={st.tabLabel}
                    role="tab"
                    aria-selected={isSelected}
                    type="button"
                    onClick={() => {
                      setWalkthroughStage(idx);
                      onEngageContent?.(
                        5,
                        `Explored Walkthrough: ${st.tabLabel}`
                      );
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#D97706] text-[#1A1A1A]'
                        : 'bg-[#292524] text-[#D6D3D1] hover:text-white'
                    }`}
                  >
                    {st.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Walkthrough Stage Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b border-[#E5DEC9]">
              <div className="space-y-2 max-w-3xl">
                <div className="text-xs font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                  {activeWalkthrough.kicker}
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-normal text-[#1C1917]"
                  style={{ fontFamily: 'var(--font-display), serif' }}
                >
                  {activeWalkthrough.headline}
                </h3>
                <p className="text-sm sm:text-base text-[#44403C] leading-relaxed">
                  {activeWalkthrough.summary}
                </p>
              </div>

              {/* Prev / Next Stage Stepper Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  disabled={walkthroughStage === 0}
                  onClick={() =>
                    setWalkthroughStage((prev) => Math.max(0, prev - 1))
                  }
                  className="px-3.5 py-2 rounded-lg border border-[#D6CEBF] bg-[#FAF7F2] hover:bg-[#EAE3D5] disabled:opacity-40 text-xs font-semibold text-[#1C1917] transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  Previous Stage
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setWalkthroughStage((prev) =>
                      prev < onboardingWalkthroughStages.length - 1
                        ? prev + 1
                        : 0
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1C1917] hover:bg-[#292524] text-xs font-semibold text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  <span>
                    {walkthroughStage < onboardingWalkthroughStages.length - 1
                      ? 'Next Walkthrough Stage'
                      : 'Restart Walkthrough'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
                </button>
              </div>
            </div>

            {/* 3 Cards for the Active Walkthrough Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {activeWalkthrough.cards.map((card) => (
                <div
                  key={card.title}
                  className="p-5 sm:p-6 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] flex flex-col justify-between space-y-4 min-w-0"
                >
                  <div className="space-y-2.5">
                    <div className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                      {card.badge}
                    </div>
                    <h4
                      className="text-xl font-normal text-[#1C1917] leading-snug"
                      style={{ fontFamily: 'var(--font-display), serif' }}
                    >
                      {card.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                      {card.body}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-[#E5DEC9] space-y-2.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#57534E]">
                      <MapPin className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                      <span>{card.where}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleScrollToAnchor(card.anchor, card.title)
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1917] hover:text-[#92400E] transition-colors cursor-pointer"
                    >
                      <span>Jump to Section</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Executive Overview: The What, Why, How & Where Pillars */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-2 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                01 · WHAT IT IS
              </span>
              <BookOpen className="w-4 h-4 text-[#92400E] shrink-0" />
            </div>
            <h3
              className="text-lg font-medium text-[#1C1917]"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              A 15-Year Scripture Ecosystem
            </h3>
            <p className="text-xs text-[#44403C] leading-relaxed">
              One continuous digital sanctuary that adapts its typography, historical depth, and privacy architecture from age 3 bedtime audio to age 18 seminar study.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-2 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                02 · WHY IT EXISTS
              </span>
              <Shield className="w-4 h-4 text-[#4A5D4E] shrink-0" />
            </div>
            <h3
              className="text-lg font-medium text-[#1C1917]"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              Faith Without Friction or Fear
            </h3>
            <p className="text-xs text-[#44403C] leading-relaxed">
              Replaces overstimulating cartoons, punitive streak counters, and dodged questions with calm circadian design, real Near Eastern history, and encrypted teen reflection.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-2 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                03 · HOW IT WORKS
              </span>
              <Sliders className="w-4 h-4 text-[#D97706] shrink-0" />
            </div>
            <h3
              className="text-lg font-medium text-[#1C1917]"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              Age × Familiarity Calibration
            </h3>
            <p className="text-xs text-[#44403C] leading-relaxed">
              Calibrates via a 60-second Open Door check, routing readers into tailored tiers, parallel translations, hover-to-peek root lexicons, and auto-saved bookmarks.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-2 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                04 · WHERE TO FIND IT
              </span>
              <MapPin className="w-4 h-4 text-[#92400E] shrink-0" />
            </div>
            <h3
              className="text-lg font-medium text-[#1C1917]"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              Direct Single-Page Sanctuary
            </h3>
            <p className="text-xs text-[#44403C] leading-relaxed">
              Every sanctuary tier, study studio, search bar, and parent guide lives on this page—accessible via the navigation bar, quick-jump buttons below, or floating dashboard.
            </p>
          </div>
        </div>

        {/* Interactive Guide Navigation Tabs */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="How to Use This App Sections"
            className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F2ECE1] border border-[#E5DEC9] rounded-xl w-fit"
          >
            {[
              {
                id: 'steps',
                label: '01. Step-by-Step Walkthrough (6 Steps)',
                icon: Layers,
              },
              {
                id: 'features',
                label: '02. Feature Atlas (How · What · Where · Why)',
                icon: Sparkles,
              },
              {
                id: 'outlines',
                label: '03. Set Outlines & Daily Routines',
                icon: Clock,
              },
              {
                id: 'directory',
                label: '04. Where to Find Everything (Map)',
                icon: MapPin,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeGuideTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() =>
                    setActiveGuideTab(
                      tab.id as 'steps' | 'features' | 'outlines' | 'directory'
                    )
                  }
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#1C1917] text-[#FAF7F2]'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-[#57534E] font-mono">
            Click any card’s action button to jump straight to that tool
          </div>
        </div>

        {/* TAB 01: STEP-BY-STEP WALKTHROUGH */}
        {activeGuideTab === 'steps' && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {STEP_BY_STEP_WORKFLOW.map((step) => (
                <div
                  key={step.stepNumber}
                  className="rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 sm:p-7 flex flex-col justify-between space-y-6 min-w-0"
                >
                  <div className="space-y-4 min-w-0">
                    {/* Top Meta Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5DEC9]">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-[#1C1917] text-[#FAF7F2] text-xs font-mono font-semibold">
                          {step.stepNumber}
                        </span>
                        <span className="text-xs font-semibold text-[#92400E]">
                          {step.subtitle}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#57534E] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E5DEC9]">
                        {step.timeEstimate}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3
                      className="text-2xl font-normal text-[#1C1917] leading-snug"
                      style={{ fontFamily: 'var(--font-display), serif' }}
                    >
                      {step.title}
                    </h3>

                    {/* What It Is */}
                    <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] space-y-1">
                      <div className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                        WHAT IT IS &amp; PURPOSE
                      </div>
                      <p className="text-sm text-[#44403C] leading-relaxed">
                        {step.whatItIs}
                      </p>
                    </div>

                    {/* How It Works (Numbered Sub-Steps) */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#1C1917]">
                        HOW TO DO IT (STEP-BY-STEP):
                      </div>
                      <ul className="space-y-2">
                        {step.howItWorks.map((instruction, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-[#44403C] leading-relaxed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Where & Why Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>WHERE TO FIND IT</span>
                        </div>
                        <p className="text-xs text-[#57534E] leading-relaxed">
                          {step.whereToFindIt}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-semibold text-[#4A5D4E]">
                          <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>WHY IT MATTERS</span>
                        </div>
                        <p className="text-xs text-[#57534E] leading-relaxed">
                          {step.whyItMatters}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-[#E5DEC9] flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => handleStepAction(step)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1C1917] hover:bg-[#292524] text-xs font-semibold text-[#FAF7F2] transition-colors cursor-pointer"
                    >
                      <span>
                        {step.actionType === 'toggle-night'
                          ? isNightSanctuary
                            ? 'Switch Back to Day Alabaster Mode'
                            : 'Toggle 2100K Night Sanctuary Mode'
                          : step.actionLabel}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 02: COMPLETE FEATURE ATLAS (HOW · WHAT · WHERE · WHY) */}
        {activeGuideTab === 'features' && (
          <div className="mt-8 space-y-6">
            {/* Category Filter Bar */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Features (8)' },
                { id: 'onboarding', label: 'Onboarding & Routing' },
                { id: 'tiers', label: 'Three Life-Stage Sanctuaries' },
                { id: 'study', label: 'Bible Study & Search Tools' },
                { id: 'family-privacy', label: 'Parent Sync & Teen Privacy' },
                { id: 'rhythm-admin', label: 'Growth Seed & Admin Console' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    setSelectedFeatureCategory(
                      cat.id as
                        | 'all'
                        | 'onboarding'
                        | 'tiers'
                        | 'study'
                        | 'family-privacy'
                        | 'rhythm-admin'
                    )
                  }
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    selectedFeatureCategory === cat.id
                      ? 'bg-[#92400E] text-[#FAF7F2] border-[#92400E]'
                      : 'bg-[#F2ECE1] text-[#44403C] border-[#E5DEC9] hover:border-[#92400E]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFeatures.map((feat) => (
                <div
                  key={feat.id}
                  className="rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 sm:p-7 flex flex-col justify-between space-y-6 min-w-0"
                >
                  <div className="space-y-4 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5DEC9]">
                      <span className="text-xs font-mono font-semibold text-[#92400E]">
                        {feat.categoryLabel} · {feat.ageScope}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#FAF7F2] border border-[#E5DEC9] text-xs font-semibold text-[#1C1917]">
                        {feat.purposeBadge}
                      </span>
                    </div>

                    <h3
                      className="text-2xl font-normal text-[#1C1917]"
                      style={{ fontFamily: 'var(--font-display), serif' }}
                    >
                      {feat.title}
                    </h3>

                    {/* 2x2 Matrix of WHAT, HOW, WHERE, WHY */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] space-y-1">
                        <div className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                          WHAT IT DOES
                        </div>
                        <p className="text-xs text-[#44403C] leading-relaxed">
                          {feat.what}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] space-y-1">
                        <div className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#1C1917]">
                          HOW IT WORKS
                        </div>
                        <p className="text-xs text-[#44403C] leading-relaxed">
                          {feat.how}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] space-y-1">
                        <div className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                          WHERE TO FIND IT
                        </div>
                        <p className="text-xs text-[#44403C] leading-relaxed">
                          {feat.where}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] space-y-1">
                        <div className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#4A5D4E]">
                          WHY IT WAS BUILT
                        </div>
                        <p className="text-xs text-[#44403C] leading-relaxed">
                          {feat.why}
                        </p>
                      </div>
                    </div>

                    {/* Quick Set Outline for this feature */}
                    <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] space-y-2">
                      <div className="text-xs font-semibold text-[#1C1917]">
                        Quick Usage Outline:
                      </div>
                      <ol className="space-y-1.5 list-decimal list-inside text-xs text-[#44403C]">
                        {feat.keyStepsOutline.map((line, i) => (
                          <li key={i} className="leading-relaxed">
                            {line}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5DEC9] flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleScrollToAnchor(feat.targetAnchor, feat.title)
                      }
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1C1917] hover:bg-[#292524] text-xs font-semibold text-[#FAF7F2] transition-colors cursor-pointer"
                    >
                      <span>{feat.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
                    </button>

                    {feat.modalTier && (
                      <button
                        type="button"
                        onClick={() => onOpenJourneyModal(feat.modalTier)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-[#D6CEBF] bg-[#FAF7F2] hover:bg-[#EAE3D5] text-xs font-semibold text-[#1C1917] transition-colors cursor-pointer"
                      >
                        <span>Personalize Tier in Intake</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 03: SET OUTLINES & DAILY/WEEKLY ROUTINE BLUEPRINTS */}
        {activeGuideTab === 'outlines' && (
          <div className="mt-8 space-y-8">
            {/* Outline Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SET_OUTLINE_BLUEPRINTS.map((outline) => {
                const isSelected = outline.id === currentOutline.id;
                return (
                  <button
                    key={outline.id}
                    type="button"
                    onClick={() => setActiveOutlineId(outline.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] ring-2 ring-[#D97706]'
                        : 'bg-[#F2ECE1] text-[#1C1917] border-[#E5DEC9] hover:border-[#92400E]'
                    }`}
                  >
                    <div
                      className={`text-[11px] font-mono uppercase tracking-wider ${
                        isSelected ? 'text-[#F59E0B]' : 'text-[#92400E]'
                      }`}
                    >
                      {outline.tierBadge}
                    </div>
                    <div
                      className="text-base font-medium leading-snug"
                      style={{ fontFamily: 'var(--font-display), serif' }}
                    >
                      {outline.title}
                    </div>
                    <div
                      className={`text-xs ${
                        isSelected ? 'text-[#D6CEBF]' : 'text-[#57534E]'
                      }`}
                    >
                      {outline.audience}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Set Outline Blueprint Detail */}
            <div className="rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 sm:p-8 space-y-8 min-w-0">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E5DEC9]">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#92400E]">
                    <span>{currentOutline.tierBadge}</span>
                    <span>·</span>
                    <span>{currentOutline.recommendedCadence}</span>
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-normal text-[#1C1917]"
                    style={{ fontFamily: 'var(--font-display), serif' }}
                  >
                    {currentOutline.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#44403C] leading-relaxed">
                    {currentOutline.goalSummary}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      handleScrollToAnchor(
                        currentOutline.launchAnchor,
                        currentOutline.title
                      )
                    }
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1C1917] hover:bg-[#292524] text-xs font-semibold text-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    <span>{currentOutline.launchLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
                  </button>
                  {currentOutline.modalTier && (
                    <button
                      type="button"
                      onClick={() =>
                        onOpenJourneyModal(currentOutline.modalTier)
                      }
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-[#D6CEBF] bg-[#FAF7F2] hover:bg-[#EAE3D5] text-xs font-semibold text-[#1C1917] transition-colors cursor-pointer"
                    >
                      <span>Configure in Open Door Intake</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Outline Metadata Bar: What, Where, Why */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] space-y-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                    WHAT YOU NEED
                  </div>
                  <p className="text-xs text-[#44403C] leading-relaxed">
                    {currentOutline.whatYouNeed}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] space-y-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                    WHERE TO START IN THE APP
                  </div>
                  <p className="text-xs text-[#44403C] leading-relaxed">
                    {currentOutline.whereToStart}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] space-y-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#4A5D4E]">
                    WHY THIS SET OUTLINE WORKS
                  </div>
                  <p className="text-xs text-[#44403C] leading-relaxed">
                    {currentOutline.whyThisOutlineWorks}
                  </p>
                </div>
              </div>

              {/* 4-Step Session Sequence */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentOutline.steps.map((stepObj) => (
                  <div
                    key={stepObj.phase}
                    className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-semibold text-[#92400E]">
                          {stepObj.phase}
                        </span>
                        <span className="text-[#57534E]">{stepObj.time}</span>
                      </div>
                      <h4
                        className="text-lg font-medium text-[#1C1917]"
                        style={{ fontFamily: 'var(--font-display), serif' }}
                      >
                        {stepObj.actionTitle}
                      </h4>
                      <p className="text-xs text-[#44403C] leading-relaxed">
                        {stepObj.detail}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E5DEC9] flex items-center gap-1.5 text-[11px] font-mono text-[#57534E]">
                      <MapPin className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                      <span>{stepObj.whereInApp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 04: WHERE TO FIND EVERYTHING (ARCHITECTURAL DIRECTORY MAP) */}
        {activeGuideTab === 'directory' && (
          <div className="mt-8 space-y-6">
            <div className="rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 sm:p-8 space-y-6 min-w-0">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                  Complete Sanctuary Place Index
                </div>
                <h3
                  className="text-2xl font-normal text-[#1C1917]"
                  style={{ fontFamily: 'var(--font-display), serif' }}
                >
                  Where to Find Every Feature, Tool &amp; Study Space
                </h3>
                <p className="text-sm text-[#44403C]">
                  Use this directory map to jump immediately to any section of the app.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUICK_DIRECTORY_MAP.map((entry) => (
                  <div
                    key={entry.placeName}
                    className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] flex flex-col justify-between gap-4 min-w-0"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono font-semibold text-[#92400E]">
                          {entry.sectionLocation}
                        </span>
                        <span className="text-[11px] font-mono text-[#57534E] bg-[#F2ECE1] px-2 py-0.5 rounded">
                          {entry.anchor}
                        </span>
                      </div>
                      <h4
                        className="text-lg font-medium text-[#1C1917]"
                        style={{ fontFamily: 'var(--font-display), serif' }}
                      >
                        {entry.placeName}
                      </h4>
                      <p className="text-xs text-[#44403C] leading-relaxed">
                        {entry.whatYouFindThere}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E5DEC9] flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          handleScrollToAnchor(entry.anchor, entry.placeName)
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1917] hover:text-[#92400E] transition-colors cursor-pointer"
                      >
                        <span>Go to {entry.placeName}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
