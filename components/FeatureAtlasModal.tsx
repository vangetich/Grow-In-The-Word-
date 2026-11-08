'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import {
  X,
  Compass,
  Search,
  MapPin,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useFocusTrap } from '@/lib/useFocusTrap';

export interface FeatureAtlasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenJourneyModal: (defaultTier?: 'bedtime' | 'archive' | 'harbor') => void;
  onEngageContent?: (points: number, label: string) => void;
  isNightSanctuary?: boolean;
  onToggleNightSanctuary?: () => void;
}

export interface AtlasUtilityItem {
  id: string;
  category: 'search-study' | 'tiers' | 'journaling-privacy' | 'onboarding-rhythm';
  categoryLabel: string;
  title: string;
  ageBadge: string;
  locationBadge: string;
  anchor: string;
  summary: string;
  howItWorks: string;
  whereToFindIt: string;
  whyBuilt: string;
  quickSteps: string[];
  actionLabel: string;
  actionType: 'scroll' | 'modal-intake' | 'toggle-night';
  modalTier?: 'bedtime' | 'archive' | 'harbor';
}

export const ECOSYSTEM_UTILITIES: AtlasUtilityItem[] = [
  {
    id: 'bible-study-studio',
    category: 'search-study',
    categoryLabel: 'Study & Lexicon Tools',
    title: 'Bible Study & Reading Studio (Hover-to-Peek + Auto-Bookmark)',
    ageBadge: 'Ages 8–18 & Adults',
    locationBadge: 'Section #bible-study-studio',
    anchor: '#bible-study-studio',
    summary:
      'Multi-lens scripture reader with parallel translation comparison, inline Hover-to-Peek key term tooltips, tap-to-open Hebrew/Greek root dictionary sheets, and automated localStorage "Last Read" bookmarks.',
    howItWorks:
      'Switch between Narrative Paraphrase, Literary Standard, and Hebrew/Greek Interlinear Root (or view them side-by-side). Hover over any highlighted key term for a 1-sentence micro-definition, or tap it to open the full lexical concordance drawer. Your active passage, verse, and translation are automatically saved in localStorage.',
    whereToFindIt:
      'Main Page → Section 07 (#bible-study-studio), directly below the Parent-Mentor Architecture section.',
    whyBuilt:
      'Gives growing readers and families direct access to original Hebrew and Greek metaphors without overwhelming academic clutter.',
    quickSteps: [
      'Select a passage from the Left Library (e.g., Psalm 23, Genesis 1, Habakkuk 1).',
      'Hover over amber-highlighted terms like "Covenant" or "Hesed" to peek at their 1-sentence meaning.',
      'Click any highlighted term to open the full root dictionary sheet, or click "Resume Last Read" to restore your saved session.',
    ],
    actionLabel: 'Go to Bible Study Studio',
    actionType: 'scroll',
  },
  {
    id: 'semantic-search',
    category: 'search-study',
    categoryLabel: 'Study & Lexicon Tools',
    title: 'Semantic Search Archive & Topic Finder',
    ageBadge: 'All Ages (Tier-Filterable)',
    locationBadge: 'Section #semantic-search',
    anchor: '#semantic-search',
    summary:
      'Natural-language search engine that indexes biblical passages, historical artifacts, emotional questions (anxiety, doubt, grief, justice), and family conversation prompts.',
    howItWorks:
      'Type any human question, emotion, historical empire, or biblical keyword into the search bar, then filter results by life stage (Bedtime 3–7, Archive 8–12, Safe Harbor 13–18, or Parent-Mentor).',
    whereToFindIt:
      'Main Page → Section 08 (#semantic-search), and inside Teen Safe Harbor’s "No-Filter Query Bar" (#phase-4-harbor).',
    whyBuilt:
      'Readers searching for comfort or answers rarely know exact chapter-and-verse numbers; semantic search connects real life to ancient wisdom immediately.',
    quickSteps: [
      'Type a topic (e.g., "fear", "suffering", "Babylon", "peace") or click a suggested topic chip.',
      'Select your age tier filter to calibrate the explanation depth.',
      'Inspect the matched scripture card, historical context note, and Socratic prompt.',
    ],
    actionLabel: 'Go to Semantic Search Archive',
    actionType: 'scroll',
  },
  {
    id: 'private-journaling-vault',
    category: 'journaling-privacy',
    categoryLabel: 'Private Journaling & Family Trust',
    title: 'Zero-Knowledge Encrypted Journaling Vault (AES-256-GCM)',
    ageBadge: 'Ages 13–18 (Safe Harbor)',
    locationBadge: 'Section #phase-4-harbor & #three-tier-grid',
    anchor: '#phase-4-harbor',
    summary:
      'Client-side encrypted commonplace book and reflection journal where teenagers record honest questions, doubts, and prayers with zero parent or server surveillance.',
    howItWorks:
      'Uses WebCrypto (PBKDF2 + AES-256-GCM) to derive a device-local encryption key. Reflections written in the Safe Harbor Commonplace Vault or Reflection Journal Overlay are encrypted before storage—no parent dashboard backdoor exists.',
    whereToFindIt:
      'Section #phase-4-harbor ("Phase 04 · The Safe Harbor & Wrestling Ring" → Encrypted Vault) and inside #three-tier-grid (Safe Harbor → Tab 04 Private Journal).',
    whyBuilt:
      'Adolescents can only wrestle honestly with faith when they know their private thoughts are not being monitored or graded.',
    quickSteps: [
      'Navigate to Safe Harbor (#phase-4-harbor) or select "03. The Safe Harbor" in the Three-Tier Grid.',
      'Write your personal reflection on the passage or ethical question.',
      'Lock and save your note locally with client-side AES-256-GCM encryption.',
    ],
    actionLabel: 'Open Teen Safe Harbor & Vault',
    actionType: 'scroll',
  },
  {
    id: 'tier-bedtime-sanctuary',
    category: 'tiers',
    categoryLabel: 'Three Life-Stage Tiers',
    title: 'Tier 01 · The Bedtime Sanctuary & Zero-Glow Player',
    ageBadge: 'Ages 3–6 (Early Childhood)',
    locationBadge: 'Section #three-tier-grid (Card 01)',
    anchor: '#three-tier-grid',
    summary:
      '2100K zero-blue-light evening sanctuary pairing 58 BPM acoustic cello narration, sleepy-hand audio bookmarks, gradual screen dimming, and Morning Bridge recall prompts.',
    howItWorks:
      'Shifts the screen to warm obsidian-umber (#1C1917), plays soothing spoken scripture stories, lets parents save timestamped audio bookmarks, and syncs a 60-second breakfast wonder question for the next morning.',
    whereToFindIt:
      'Section #three-tier-grid (Card 01 · The Bedtime Sanctuary interactive prototype).',
    whyBuilt:
      'Protects natural melatonin onset at bedtime while forming early spiritual trust through calm, safety, and a parent’s voice.',
    quickSteps: [
      'Select "01. The Bedtime Sanctuary" in the Three-Tier Preview Grid.',
      'Test the Bedtime Shepherd flow, Zero-Glow Player, or Quick Audio Scrubber with saved bookmarks.',
      'Adjust the Circadian Auto-Dimmer slider or launch Full-Screen Zero-Glow mode.',
    ],
    actionLabel: 'Explore Bedtime Sanctuary',
    actionType: 'scroll',
  },
  {
    id: 'tier-ancient-archive',
    category: 'tiers',
    categoryLabel: 'Three Life-Stage Tiers',
    title: 'Tier 02 · The Ancient Archive, Detective Map & 14-Day Bridge',
    ageBadge: 'Ages 8–12 (Tweens & Late Beginners)',
    locationBadge: 'Section #phase-3-archive',
    anchor: '#phase-3-archive',
    summary:
      'Interactive Near Eastern field notebook featuring archaeological map pins, Street-Level context toggles, Hebrew/Greek Root Ciphers, a Relic Exhibition Case, and the 14-Day Late-Comer Bridge.',
    howItWorks:
      'Tweens act as historical detectives—clicking coordinates (Jerusalem, Nineveh, Babylon, Capernaum), toggling between standard verses and street-level historical reality, and solving root-word ciphers.',
    whereToFindIt:
      'Section #phase-3-archive ("Phase 03 · The Ancient Archive Detective Map") and #three-tier-grid (Card 02).',
    whyBuilt:
      'Satisfies the concrete investigative curiosity of 8-to-12-year-olds so they never dismiss the Bible as a childhood fairy tale.',
    quickSteps: [
      'Toggle ON the "12-Year-Old Late-Comer Bridge" if starting with zero prior Bible background.',
      'Click map pins on the Near Eastern Detective Map and toggle "Street-Level Context".',
      'Solve linguistic Root Ciphers to unlock artifacts in the Relic Exhibition Case.',
    ],
    actionLabel: 'Explore Ancient Archive Map',
    actionType: 'scroll',
  },
  {
    id: 'tier-safe-harbor',
    category: 'tiers',
    categoryLabel: 'Three Life-Stage Tiers',
    title: 'Tier 03 · The Safe Harbor, Text Collision & Peer Seminars',
    ageBadge: 'Ages 13–18 (Adolescents)',
    locationBadge: 'Section #phase-4-harbor',
    anchor: '#phase-4-harbor',
    summary:
      'University-style seminar studio with a No-Filter Query Bar, Raw Text Collision Engine, 3-Minute Scholar Audio Briefings, and theologian-moderated peer cohorts.',
    howItWorks:
      'Places raw biblical laments (Habakkuk, Job, Ecclesiastes, Psalms) side-by-side with honest teen questions about injustice, doubt, and anxiety—supported by moderated peer reflections with zero clout metrics.',
    whereToFindIt:
      'Section #phase-4-harbor ("Phase 04 · The Safe Harbor & Wrestling Ring").',
    whyBuilt:
      'Replaces patronizing youth-group clichés with intellectual honesty, critical thinking, and safe community.',
    quickSteps: [
      'Pick a hard question in the No-Filter Query Bar.',
      'Compare the Raw Text Collision and listen to the 3-Minute Scholar Audio Briefing.',
      'Read moderated peer reflections or record private notes in the Encrypted Vault.',
    ],
    actionLabel: 'Go to Safe Harbor Studio',
    actionType: 'scroll',
  },
  {
    id: 'parent-mentor-portal',
    category: 'journaling-privacy',
    categoryLabel: 'Private Journaling & Family Trust',
    title: 'Parent-Mentor Portal & Co-Reading Dinner-Table Sync',
    ageBadge: 'Parents, Guardians & Mentors',
    locationBadge: 'Section #phase-5-architecture',
    anchor: '#phase-5-architecture',
    summary:
      'Equips parents and educators with synced weekly passage themes, 3-minute Socratic dinner-table prompts, and transparent cryptographic privacy boundaries.',
    howItWorks:
      'Shares the overarching biblical theme a child or teen is studying so parents can ask thoughtful, open-ended questions at dinner—while strictly blocking access to private teen journal entries.',
    whereToFindIt:
      'Section #phase-5-architecture ("Phase 05 · Parent-Mentor Architecture").',
    whyBuilt:
      'Fosters meaningful family dialogue rooted in mutual respect rather than surveillance.',
    quickSteps: [
      'Open #phase-5-architecture and choose your child’s developmental tier.',
      'Review the synced weekly passage theme and copy the 3-Minute Socratic Dinner Prompt.',
      'Inspect the Cryptographic Privacy Architecture diagram.',
    ],
    actionLabel: 'Open Parent-Mentor Portal',
    actionType: 'scroll',
  },
  {
    id: 'open-door-intake-router',
    category: 'onboarding-rhythm',
    categoryLabel: 'Onboarding, Rhythm & System',
    title: 'Open Door 3×3 Intake & Custom Entry Lane Router',
    ageBadge: 'All Ages (3–18)',
    locationBadge: 'Top Navbar & Section #design-spec',
    anchor: '#design-spec',
    summary:
      '60-second onboarding check combining a tactile Age Slider (3–18) and 3 conversational Familiarity cards to assign one of 9 tailored starting tracks.',
    howItWorks:
      'Computes the reader’s life stage × familiarity level (Curious Explorer, Story Connector, or Deep-Dive Scholar) and configures inline glossaries, historical primers, and privacy settings.',
    whereToFindIt:
      'Click "Begin the Journey" in the Navbar/Hero, or test the live simulator in #design-spec (Tab 01).',
    whyBuilt:
      'Removes test anxiety and church-jargon barriers so every newcomer or experienced reader starts in the right lane.',
    quickSteps: [
      'Click "Launch Open Door Intake" below or "Begin the Journey" in the header.',
      'Select Parent Gateway (Ages 3–12) or Independent Teen Gateway (Ages 13–18).',
      'Slide to your age and pick your familiarity posture to unlock your custom welcome card.',
    ],
    actionLabel: 'Launch Open Door Intake Modal',
    actionType: 'modal-intake',
  },
  {
    id: 'growth-seed-night-sanctuary',
    category: 'onboarding-rhythm',
    categoryLabel: 'Onboarding, Rhythm & System',
    title: 'Longitudinal Growth Seed Tracker Studio & 2100K Night Sanctuary',
    ageBadge: 'All Users (Ages 3–18)',
    locationBadge: 'Section #growth-seed-tracker & Bottom Bar',
    anchor: '#growth-seed-tracker',
    summary:
      'Inline responsive interactive studio and persistent bottom bar housing the 5-stage botanical tracker (Seed → Sprout → Sapling → Tree → Canopy), Weekly Rhythm Goal Setter, Daily Tiered Affirmations, Recharts & D3 Trajectory, and Milestone Card Generator.',
    howItWorks:
      'Every interaction awards gentle Growth Points without punishing missed days. Explore all 4 tracker windows inline inside Section #growth-seed-tracker or from the persistent bottom Sanctuary Dashboard Bar.',
    whereToFindIt:
      'Main Page → Section #growth-seed-tracker ("Longitudinal Growth Seed Tracker") and Persistent Bottom Floating Bar.',
    whyBuilt:
      'Replaces manipulative dopamine streak counters with unhurried longitudinal formation across all screen sizes.',
    quickSteps: [
      'Scroll to #growth-seed-tracker to explore Stage Evolution, Weekly Rhythm, Recharts/D3 Analytics, and Milestone Cards inline.',
      'Click any "+ Nourish Seed" or session node to earn points and watch smooth botanical transitions.',
    ],
    actionLabel: 'Go to Longitudinal Growth Seed Studio',
    actionType: 'scroll',
  },
  {
    id: 'admin-backend-console',
    category: 'onboarding-rhythm',
    categoryLabel: 'Onboarding, Rhythm & System',
    title: 'Authenticated Admin & Backend Maintenance Console',
    ageBadge: 'Administrators & Maintainers',
    locationBadge: 'Section #admin-backend-console',
    anchor: '#admin-backend-console',
    summary:
      'Password-protected backend dashboard housing Screen 03 Post-Intake Routing specs, the 3×3 Entry Lane Router matrix, and system maintenance logs.',
    howItWorks:
      'Keeps internal engineering and routing documentation separated from the serene user-facing landing page behind an administrative passcode gate.',
    whereToFindIt:
      'Bottom of Main Page → Section #admin-backend-console ("Admin Backend" link in Navbar).',
    whyBuilt:
      'Preserves a clean, distraction-free Christian formation experience for families while giving maintainers full technical visibility.',
    quickSteps: [
      'Scroll to #admin-backend-console at the bottom of the page.',
      'Unlock the console using the admin maintenance toggle or passcode.',
      'Switch between Post-Intake Routing, Data Architecture (3×3 Router), and Maintenance Logs.',
    ],
    actionLabel: 'Go to Admin Backend Console',
    actionType: 'scroll',
  },
];

export default function FeatureAtlasModal({
  isOpen,
  onClose,
  onOpenJourneyModal,
  onEngageContent,
  isNightSanctuary = false,
  onToggleNightSanctuary,
}: FeatureAtlasModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'search-study' | 'tiers' | 'journaling-privacy' | 'onboarding-rhythm'
  >('all');
  const [selectedUtilityId, setSelectedUtilityId] = useState<string>(
    ECOSYSTEM_UTILITIES[0].id
  );
  const modalFocusTrapRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);

  const handleSwipeDismiss = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 90 || info.velocity.y > 420) {
      onClose();
    }
  };

  const filteredUtilities = ECOSYSTEM_UTILITIES.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.howItWorks.toLowerCase().includes(q) ||
      item.whereToFindIt.toLowerCase().includes(q) ||
      item.ageBadge.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const activeUtility =
    filteredUtilities.find((u) => u.id === selectedUtilityId) ||
    filteredUtilities[0] ||
    ECOSYSTEM_UTILITIES[0];

  const handleUtilityAction = (util: AtlasUtilityItem) => {
    onEngageContent?.(5, `Feature Atlas Quick-Jump: ${util.title}`);
    if (util.actionType === 'modal-intake') {
      onClose();
      onOpenJourneyModal(util.modalTier);
    } else if (util.actionType === 'toggle-night' && onToggleNightSanctuary) {
      onToggleNightSanctuary();
    } else {
      onClose();
      if (typeof document !== 'undefined') {
        setTimeout(() => {
          const el = document.querySelector(util.anchor);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 80);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="feature-atlas-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-2.5 py-3 sm:p-6 bg-[#141210]/80 backdrop-blur-xs overflow-y-auto overflow-x-hidden w-full max-w-full"
          onClick={onClose}
        >
          <motion.div
            ref={modalFocusTrapRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 36 }}
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 28,
              mass: 0.9,
            }}
            drag="y"
            dragDirectionLock
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.04, bottom: 0.45 }}
            onDragEnd={handleSwipeDismiss}
            className="relative w-full max-w-5xl rounded-2xl bg-[#FAF7F2] border border-[#E5DEC9] text-[#1C1917] shadow-2xl overflow-hidden my-auto max-h-[92dvh] sm:max-h-[90dvh] flex flex-col min-w-0 touch-pan-y focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Swipe-to-Dismiss Handle Bar */}
            <div
              aria-hidden="true"
              className="sm:hidden flex flex-col items-center justify-center pt-2.5 pb-1 bg-[#1C1917] cursor-grab active:cursor-grabbing select-none shrink-0"
            >
              <div className="w-11 h-1.5 rounded-full bg-[#44403C]" />
              <span className="text-[10px] font-mono text-[#A8A29E] mt-1">
                Swipe down to close
              </span>
            </div>

            {/* Top Modal Header */}
            <div className="px-4 sm:px-7 py-3.5 sm:py-5 bg-[#1C1917] text-[#FAF7F2] border-b border-[#292524] flex items-start sm:items-center justify-between gap-3 sm:gap-4 shrink-0">
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FBBF24]">
                  <Compass className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                  <span>Grow In The Word · Quick-Reference Ecosystem Guide</span>
                </div>
                <h2
                  id="feature-atlas-modal-title"
                  className="text-xl sm:text-3xl font-normal tracking-tight text-[#FAF7F2]"
                  style={{ fontFamily: 'var(--font-display), serif' }}
                >
                  Interactive Feature Atlas &amp; Utility Map
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close Feature Atlas Modal"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl bg-[#292524] hover:bg-[#36312E] text-[#D6D3D1] hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="px-4 sm:px-7 py-3.5 sm:py-4 bg-[#F2ECE1] border-b border-[#E5DEC9] flex flex-col lg:flex-row lg:items-center justify-between gap-3 shrink-0">
              {/* Search Input */}
              <div className="relative flex-1 min-w-0">
                <Search className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search utilities (e.g., 'dictionary', 'bookmark', 'private journal', 'map', 'search')…"
                  aria-label="Search features in the Feature Atlas"
                  className="w-full min-h-[44px] pl-10 pr-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#D6CEBF] text-xs sm:text-sm text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:border-[#D97706]"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'All Utilities (10)' },
                  { id: 'search-study', label: 'Search & Study Tools' },
                  { id: 'tiers', label: 'Three Tiers (3–18)' },
                  { id: 'journaling-privacy', label: 'Private Journaling & Family' },
                  { id: 'onboarding-rhythm', label: 'Onboarding & Rhythm' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(
                        cat.id as
                          | 'all'
                          | 'search-study'
                          | 'tiers'
                          | 'journaling-privacy'
                          | 'onboarding-rhythm'
                      )
                    }
                    className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer inline-flex items-center justify-center ${
                      selectedCategory === cat.id
                        ? 'bg-[#1C1917] text-[#FAF7F2]'
                        : 'bg-[#FAF7F2] text-[#57534E] border border-[#E5DEC9] hover:text-[#1C1917]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Body: Master-Detail Utility Split View */}
            <div className="flex-1 overflow-y-auto overscroll-contain grid grid-cols-1 lg:grid-cols-12 min-h-0">
              {/* Left 5 Columns: Utility List */}
              <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#E5DEC9] bg-[#F2ECE1]/60 p-4 sm:p-5 space-y-2.5 overflow-y-auto max-h-[280px] sm:max-h-[340px] lg:max-h-none">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#57534E] px-1">
                  Select a Utility to Inspect ({filteredUtilities.length} shown)
                </div>

                {filteredUtilities.map((util) => {
                  const isSelected = util.id === activeUtility.id;
                  return (
                    <button
                      key={util.id}
                      type="button"
                      onClick={() => setSelectedUtilityId(util.id)}
                      className={`w-full min-h-[44px] text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                        isSelected
                          ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] ring-2 ring-[#D97706]'
                          : 'bg-[#FAF7F2] text-[#1C1917] border-[#E5DEC9] hover:border-[#92400E]'
                      }`}
                    >
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                    <span
                      className={
                        isSelected ? 'text-[#FBBF24]' : 'text-[#92400E]'
                      }
                    >
                      {util.categoryLabel}
                    </span>
                    <span
                      className={
                        isSelected ? 'text-[#D6D3D1]' : 'text-[#57534E]'
                      }
                    >
                      {util.ageBadge}
                    </span>
                  </div>
                  <div
                    className="text-base font-medium leading-snug"
                    style={{ fontFamily: 'var(--font-display), serif' }}
                  >
                    {util.title}
                  </div>
                  <div
                    className={`text-[11px] font-mono flex items-center gap-1 ${
                      isSelected ? 'text-[#A8A29E]' : 'text-[#78716C]'
                    }`}
                  >
                    <MapPin className="w-3 h-3 text-[#D97706] shrink-0" />
                    <span className="truncate">{util.locationBadge}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right 7 Columns: Active Utility Blueprint (What · How · Where · Why) */}
          <div className="lg:col-span-7 p-5 sm:p-7 space-y-6 bg-[#FAF7F2] overflow-y-auto">
            <div className="space-y-3 pb-4 border-b border-[#E5DEC9]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded bg-[#F2ECE1] border border-[#E5DEC9] text-xs font-mono font-semibold text-[#92400E]">
                  {activeUtility.categoryLabel} · {activeUtility.ageBadge}
                </span>
                <span className="text-xs font-mono text-[#57534E]">
                  {activeUtility.locationBadge}
                </span>
              </div>

              <h3
                className="text-2xl sm:text-3xl font-normal text-[#1C1917]"
                style={{ fontFamily: 'var(--font-display), serif' }}
              >
                {activeUtility.title}
              </h3>

              <p className="text-sm text-[#44403C] leading-relaxed">
                {activeUtility.summary}
              </p>
            </div>

            {/* How, Where, Why Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-1.5 sm:col-span-2">
                <div className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#1C1917]">
                  HOW IT WORKS
                </div>
                <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                  {activeUtility.howItWorks}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-semibold text-[#92400E]">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>WHERE TO FIND IT</span>
                </div>
                <p className="text-xs text-[#44403C] leading-relaxed">
                  {activeUtility.whereToFindIt}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-semibold text-[#4A5D4E]">
                  <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>WHY IT WAS BUILT</span>
                </div>
                <p className="text-xs text-[#44403C] leading-relaxed">
                  {activeUtility.whyBuilt}
                </p>
              </div>
            </div>

            {/* Step-by-Step Quick Reference */}
            <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-2.5">
              <div className="text-xs font-semibold text-[#1C1917]">
                Quick Step-by-Step Usage:
              </div>
              <ul className="space-y-2">
                {activeUtility.quickSteps.map((stepText, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-[#44403C] leading-relaxed"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                    <span>{stepText}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleUtilityAction(activeUtility)}
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-xs sm:text-sm font-semibold text-[#FAF7F2] transition-colors cursor-pointer"
              >
                <span>
                  {activeUtility.actionType === 'toggle-night'
                    ? isNightSanctuary
                      ? 'Return to Day Alabaster Mode'
                      : 'Toggle 2100K Night Sanctuary Mode'
                    : activeUtility.actionLabel}
                </span>
                <ArrowRight className="w-4 h-4 text-[#D97706]" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-[#D6CEBF] bg-[#F2ECE1] hover:bg-[#EAE3D5] text-xs font-semibold text-[#44403C] transition-colors cursor-pointer"
              >
                Close Atlas
              </button>
            </div>
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
