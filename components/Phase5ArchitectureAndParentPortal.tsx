'use client';

import React, {useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  Database,
  ShieldCheck,
  Lock,
  Layers,
  Cpu,
  Sliders,
  Users,
  Moon,
  Compass,
  HeartHandshake,
  Terminal,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  Sunrise,
  BookOpen,
  Smartphone,
  HardDrive,
  Cloud,
  KeyRound,
  RefreshCw,
} from 'lucide-react';

type ParentPortalViewId = 'view-a-sleep' | 'view-b-command' | 'view-c-mentor';

interface Phase5ArchitectureProps {
  onEngageContent?: (points: number, label: string) => void;
}

export default function Phase5ArchitectureAndParentPortal({
  onEngageContent,
}: Phase5ArchitectureProps) {
  // Interactive State Machine Age Simulator (Ages 3 to 18)
  const [simulatedAge, setSimulatedAge] = useState<number>(14);

  // Interactive Parent-Mentor Portal View Switcher
  const [activePortalView, setActivePortalView] =
    useState<ParentPortalViewId>('view-b-command');

  // Interactive Firewall Audit State
  const [firewallTestStatus, setFirewallTestStatus] = useState<
    'idle' | 'blocked' | 'teen-authorized'
  >('blocked');

  // Derive State Machine output from simulatedAge
  const stateMachineConfig =
    simulatedAge <= 7
      ? {
          tierStatus: 'TIER_1_BEDTIME_SANCTUARY',
          activePackage: 'Tier1_Sanctuary (28.4 MB Cached)',
          archivedPackages: 'Tier2_Archive (Lazy-Loaded), Tier3_Harbor (Unmounted)',
          canvasHex: '#F9F6F0 (Warm Cream)',
          accentHex: '#D97706 (2100K Soft Amber)',
          soundEngine: 'Acoustic Cello Lullaby Loop + Circadian Auto-Dimmer',
          portalMode: 'View A: Sleep & Routine Dashboard',
          encryptionPosture: 'Standard Household Profile Sync',
        }
      : simulatedAge <= 12
      ? {
          tierStatus: 'TIER_2_ANCIENT_ARCHIVE',
          activePackage: 'Tier2_Archive (42.1 MB Topo & Relics)',
          archivedPackages: 'Tier1_Sanctuary (Archived), Tier3_Harbor (Lazy-Loaded)',
          canvasHex: '#F2ECE1 (Weathered Limestone)',
          accentHex: '#B45309 (Archaeological Bronze)',
          soundEngine: 'Tactile Parchment & Artifact Acoustic Cues',
          portalMode: 'View B: The Expedition Command Post',
          encryptionPosture: 'Plain-English Shield + Progress Sync',
        }
      : {
          tierStatus: 'TIER_3_SAFE_HARBOR',
          activePackage: 'Tier3_Harbor (34.8 MB Vault & Audio)',
          archivedPackages: 'Tier1_Sanctuary (Archived), Tier2_Archive (On-Demand)',
          canvasHex: '#1A1A1A (Deep Grounding Charcoal)',
          accentHex: '#FBBF24 (High-Contrast Warm Amber)',
          soundEngine: '3-Minute Youth Mentor Briefing Stream',
          portalMode: 'View C: The Youth-Mentorship Hub (Firewall Active)',
          encryptionPosture: 'AES-256 Zero-Knowledge Hardware Enclave',
        };

  return (
    <section
      id="phase-5-architecture"
      className="py-16 sm:py-20 lg:py-28 border-b border-[#E5DEC9] bg-[#FAF7F2] w-full max-w-full overflow-x-clip"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-14">
        {/* Section Editorial Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#4A5D4E]">
            <span>Grow In The Word · Phase 5 System Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Full-Stack &amp; Family Systems Blueprint</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A1A]"
            style={{
              fontFamily: 'var(--font-display), serif',
              textWrap: 'balance',
            }}
          >
            Local-first resilience, zero-knowledge teen encryption, and non-coercive
            family governance.
          </h2>

          <p className="text-sm sm:text-base text-[#44403C] leading-relaxed">
            Designed for families traveling, camping, or navigating fluctuating
            connectivity—and engineered so teenage privacy is enforced mathematically
            in hardware, never left to policy promises.
          </p>
        </div>

        {/* =================================================================== */}
        {/* SECTION 1: CORE BACKEND & LOCAL-FIRST DATA ARCHITECTURE             */}
        {/* =================================================================== */}
        <div className="p-4 sm:p-8 rounded-2xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5DEC9]">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#92400E] font-semibold">
                Section 01 · Resilient Offline-First Infrastructure
              </div>
              <h3
                className="text-xl sm:text-2xl font-normal text-[#1C1917]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                The Core Backend &amp; Zero-Knowledge Teen Encryption Engine
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#1C1917] text-[#FBBF24] font-mono text-xs self-start sm:self-center">
              AES-256 Hardware Enclave
            </span>
          </div>

          {/* 3-Column Recommended Technology Stack */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono text-[#92400E]">
                <span>01. FRONTEND ENGINE</span>
                <Smartphone className="w-4 h-4 text-[#D97706]" />
              </div>
              <h4 className="text-base font-semibold text-[#1C1917]">
                React Native / Flutter
              </h4>
              <p className="text-xs text-[#44403C] leading-relaxed">
                High-performance 60fps cross-platform rendering for iOS and Android
                from a unified codebase, supporting zero-glow OLED black states and
                tactile map gestures.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono text-[#92400E]">
                <span>02. LOCAL DATABASE</span>
                <HardDrive className="w-4 h-4 text-[#D97706]" />
              </div>
              <h4 className="text-base font-semibold text-[#1C1917]">
                SQLite / Realm Offline Vault
              </h4>
              <p className="text-xs text-[#44403C] leading-relaxed">
                Massive local caching of 2100K audio loops, historical artifact
                textures, and full scripture texts directly on-device for zero-latency
                offline access.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono text-[#92400E]">
                <span>03. SYNC &amp; CLOUD</span>
                <Cloud className="w-4 h-4 text-[#D97706]" />
              </div>
              <h4 className="text-base font-semibold text-[#1C1917]">
                Firebase / Supabase Sync
              </h4>
              <p className="text-xs text-[#44403C] leading-relaxed">
                Handles lightweight profile metadata, parent portal summaries, and
                cross-device grace-driven streak synchronization when connectivity
                returns.
              </p>
            </div>
          </div>

          {/* Zero-Knowledge Cryptographic Pipeline Diagram */}
          <div className="p-4 sm:p-6 rounded-xl bg-[#1C1917] text-[#FAF7F2] border border-[#292524] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#FBBF24]">
              <span className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#D97706]" />
                <span>ARCHITECTURAL GUARANTEE: TIER 3 ZERO-KNOWLEDGE PIPELINE</span>
              </span>
              <span className="text-[#A7F3D0]">iOS Secure Enclave / Android Keystore</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#24211E] border border-[#36312E] space-y-1.5">
                <div className="font-mono text-[#D97706] uppercase">
                  Step 1 · On-Device Plaintext
                </div>
                <p className="text-[#E7E5E4] font-mono text-[11px] bg-[#141210] p-2.5 rounded border border-[#292524]">
                  &quot;Why does God feel so silent when my anxiety spikes at night?&quot;
                </p>
                <p className="text-[#A8A29E] text-[11px]">
                  Exists only in volatile RAM while the teen is actively typing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#24211E] border border-[#36312E] space-y-1.5">
                <div className="font-mono text-[#FBBF24] uppercase">
                  Step 2 · Hardware Key Sealing
                </div>
                <p className="text-[#A7F3D0] font-mono text-[11px] bg-[#141210] p-2.5 rounded border border-[#292524] break-all">
                  Key: Enclave_UID_994A (Never leaves device hardware)
                </p>
                <p className="text-[#A8A29E] text-[11px]">
                  AES-256-GCM cipher executed locally before SQLite write.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#24211E] border border-[#36312E] space-y-1.5">
                <div className="font-mono text-[#A8A29E] uppercase">
                  Step 3 · Cloud Ciphertext Storage
                </div>
                <p className="text-[#78716C] font-mono text-[11px] bg-[#141210] p-2.5 rounded border border-[#292524] break-all">
                  0x8F3C9A1D...4E7B20C19B (Mathematically Impenetrable)
                </p>
                <p className="text-[#A8A29E] text-[11px]">
                  Even if servers are subpoenaed or breached, notes cannot be decrypted.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* SECTION 2: METAMORPHOSIS STATE MACHINE & MODULAR COMPONENT SYSTEM   */}
        {/* =================================================================== */}
        <div className="p-4 sm:p-8 rounded-2xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DEC9]">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#92400E] font-semibold">
                Section 02 · Anti-Bloat Modular Architecture
              </div>
              <h3
                className="text-xl sm:text-2xl font-normal text-[#1C1917]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                The Metamorphosis State Machine Simulator
              </h3>
            </div>

            <div className="flex items-center gap-3 bg-[#FAF7F2] px-4 py-2 rounded-xl border border-[#E5DEC9]">
              <label
                htmlFor="state-machine-age-slider"
                className="text-xs font-mono font-semibold text-[#1C1917]"
              >
                calculated_age: <span className="text-[#D97706]">{simulatedAge} yrs</span>
              </label>
              <input
                id="state-machine-age-slider"
                type="range"
                min={3}
                max={18}
                value={simulatedAge}
                onChange={(e) => {
                  const nextAge = Number(e.target.value);
                  setSimulatedAge(nextAge);
                  if (nextAge <= 7) setActivePortalView('view-a-sleep');
                  else if (nextAge <= 12) setActivePortalView('view-b-command');
                  else setActivePortalView('view-c-mentor');
                  onEngageContent?.(
                    5,
                    `Simulated Metamorphosis State Machine at Age ${nextAge}`
                  );
                }}
                className="w-28 sm:w-36 accent-[#D97706] cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Isolated Feature Packages Status */}
            <div className="lg:col-span-5 p-5 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#92400E] font-semibold">
                Isolated Feature Packages (Lazy-Loaded)
              </div>
              <div className="space-y-2 text-xs font-mono">
                {[
                  {pkg: 'CoreAuth', desc: 'Always Mounted (3.2 MB)', active: true},
                  {
                    pkg: 'Tier1_Sanctuary',
                    desc: 'Ages 3–7 Audio & Zero-Glow',
                    active: simulatedAge <= 7,
                  },
                  {
                    pkg: 'Tier2_Archive',
                    desc: 'Ages 8–12 Topo Map & Relics',
                    active: simulatedAge >= 8 && simulatedAge <= 12,
                  },
                  {
                    pkg: 'Tier3_Harbor',
                    desc: 'Ages 13–18 AES-256 Vault',
                    active: simulatedAge >= 13,
                  },
                ].map((item) => (
                  <div
                    key={item.pkg}
                    className={`p-3 rounded-lg border flex items-center justify-between gap-2 ${
                      item.active
                        ? 'bg-[#1C1917] text-[#FAF7F2] border-[#D97706]'
                        : 'bg-[#F2ECE1]/70 text-[#78716C] border-[#E5DEC9]'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{item.pkg}</div>
                      <div className="text-[10px] opacity-80">{item.desc}</div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        item.active
                          ? 'bg-[#D97706] text-[#141210] font-bold'
                          : 'bg-[#E5DEC9] text-[#57534E]'
                      }`}
                    >
                      {item.active ? 'MOUNTED' : 'ARCHIVED'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Global Redux/Zustand State Output */}
            <div className="lg:col-span-7 p-5 rounded-xl bg-[#141210] text-[#E7E5E4] border border-[#292524] font-mono text-xs space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#FBBF24] border-b border-[#292524] pb-2">
                <span>GLOBAL REDUX / ZUSTAND STORE SNAPSHOT</span>
                <span>ZERO DATA LOSS TRANSITION</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 rounded-lg bg-[#1C1917] border border-[#292524]">
                  <div className="text-[#78716C]">tier_status:</div>
                  <div className="text-[#FBBF24] font-semibold mt-0.5 break-all">
                    {stateMachineConfig.tierStatus}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#1C1917] border border-[#292524]">
                  <div className="text-[#78716C]">theme_canvas_token:</div>
                  <div className="text-[#FAF7F2] font-semibold mt-0.5">
                    {stateMachineConfig.canvasHex}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#1C1917] border border-[#292524]">
                  <div className="text-[#78716C]">sound_engine_handler:</div>
                  <div className="text-[#A7F3D0] mt-0.5">
                    {stateMachineConfig.soundEngine}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#1C1917] border border-[#292524]">
                  <div className="text-[#78716C]">parent_portal_binding:</div>
                  <div className="text-[#FDE68A] mt-0.5">
                    {stateMachineConfig.portalMode}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[#A8A29E] pt-1">
                Encryption Posture: <strong className="text-[#FAF7F2]">{stateMachineConfig.encryptionPosture}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* SECTION 3: THE UNIFIED PARENT-MENTOR PORTAL (PORTAL VIEWS A, B, C)  */}
        {/* =================================================================== */}
        <div className="p-4 sm:p-8 rounded-2xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E5DEC9]">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#92400E] font-semibold">
                Section 03 · Dynamic Family Governance (Monitoring → Mentoring)
              </div>
              <h3
                className="text-xl sm:text-2xl font-normal text-[#1C1917]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                The Unified Parent-Mentor Portal
              </h3>
            </div>

            {/* 3 Portal Views Switcher */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF7F2] p-1.5 rounded-xl border border-[#E5DEC9]">
              {[
                {
                  id: 'view-a-sleep' as const,
                  label: 'View A (Ages 3–7): Sleep & Routine',
                },
                {
                  id: 'view-b-command' as const,
                  label: 'View B (Ages 8–12): Expedition Command',
                },
                {
                  id: 'view-c-mentor' as const,
                  label: 'View C (Ages 13–18): Youth-Mentorship Hub',
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActivePortalView(tab.id);
                    onEngageContent?.(10, `Explored Parent-Mentor Portal: ${tab.label}`);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activePortalView === tab.id
                      ? 'bg-[#1C1917] text-[#FAF7F2]'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* VIEW A: AGES 3-7 SLEEP & ROUTINE DASHBOARD */}
          {activePortalView === 'view-a-sleep' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-2">
                <div className="text-xs font-mono text-[#92400E] uppercase">
                  Bedtime Consistency Metrics
                </div>
                <div
                  className="text-2xl font-normal text-[#1C1917]"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  5 Quiet Nights This Week
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Average drift-to-sleep transition: 11 minutes into the acoustic
                  cello lullaby loop at 2100K Zero-Glow warmth.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-2">
                <div className="text-xs font-mono text-[#92400E] uppercase">
                  Favorite Soothing Audio Tracks
                </div>
                <ul className="space-y-1.5 text-xs text-[#1C1917] font-medium">
                  <li>1. The Shepherd in the Dark Valley (Psalm 23)</li>
                  <li>2. The Story of the Quiet Lake (Luke 8)</li>
                  <li>3. Starlight &amp; First Evening Rest (Genesis 1)</li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#D97706]/50 space-y-2">
                <div className="text-xs font-mono text-[#D97706] uppercase font-semibold">
                  Automated Morning Bridge Generator
                </div>
                <p className="text-xs text-[#1C1917] italic leading-relaxed">
                  “Hey Noah, do you remember who brought peace to the big waves last
                  night when the wind was loud?”
                </p>
                <div className="text-[11px] text-[#57534E]">
                  Ready for tomorrow’s breakfast table—zero quiz pressure.
                </div>
              </div>
            </div>
          )}

          {/* VIEW B: AGES 8-12 THE EXPEDITION COMMAND POST */}
          {activePortalView === 'view-b-command' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 sm:p-6 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-3">
                <div className="text-xs font-mono text-[#92400E] uppercase font-semibold">
                  This Week’s Historical Sites Explored
                </div>
                <h4
                  className="text-lg font-normal text-[#1C1917]"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  Jerusalem (701 BCE Siege) &amp; Corinth (50 CE Workshops)
                </h4>
                <p className="text-xs text-[#44403C] leading-relaxed">
                  Leo unlocked 2 archaeological relics in his Exhibition Case: the{' '}
                  <strong>Clay Bullae Seal Impression</strong> and the{' '}
                  <strong>Cilician Tentmaker’s Bronze Awl</strong>, plus solved the
                  Hebrew root cipher for <em>Shalom</em>.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-xl bg-[#1C1917] text-[#FAF7F2] border border-[#292524] space-y-3">
                <div className="text-xs font-mono text-[#FBBF24] uppercase font-semibold">
                  Dinner-Table Conversation Guide
                </div>
                <blockquote
                  className="text-base sm:text-lg font-normal text-[#FAF7F2] leading-snug"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  “Ask Leo what surprised him about how ancient trade routes worked
                  today—or why Paul chose to stitch leather tents with his hands.”
                </blockquote>
                <p className="text-xs text-[#A8A29E]">
                  Positions your tween as the historian at the table, sparking
                  curiosity instead of lecturing.
                </p>
              </div>
            </div>
          )}

          {/* VIEW C: AGES 13-18 THE YOUTH-MENTORSHIP HUB */}
          {activePortalView === 'view-c-mentor' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              <div className="lg:col-span-5 p-5 sm:p-6 rounded-xl bg-[#1C1917] text-[#FAF7F2] border border-[#292524] space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#A7F3D0]">
                  <Lock className="w-4 h-4 text-[#D97706]" />
                  <span>MONITORING DISABLED · MENTORING ACTIVE</span>
                </div>
                <h4
                  className="text-lg sm:text-xl font-normal text-[#FAF7F2]"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  Private Journal &amp; Search Queries Are Sealed
                </h4>
                <p className="text-xs text-[#A8A29E] leading-relaxed">
                  Because your teenager is in Tier 3 (Ages 13–18), their Wrestling
                  Ring entries and No-Filter queries are protected by hardware
                  encryption. You do not see their private doubts—protecting trust so
                  they can be honest with God.
                </p>
              </div>

              <div className="lg:col-span-7 p-5 sm:p-6 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-4">
                <div className="text-xs font-mono text-[#92400E] uppercase font-semibold">
                  Monthly Youth Counselor Guides for Parents
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-1.5">
                    <div className="text-[11px] font-mono text-[#D97706]">
                      GUIDE 01 · BY MARCUS VANCE, M.DIV
                    </div>
                    <h5 className="text-sm font-semibold text-[#1C1917]">
                      How to Listen When Your Teenager Is Wrestling With Doubt
                    </h5>
                    <p className="text-xs text-[#44403C] leading-relaxed">
                      Why quick answers shut teens down, and how non-anxious presence
                      builds lifelong trust.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-1.5">
                    <div className="text-[11px] font-mono text-[#D97706]">
                      GUIDE 02 · BY DR. ELENA ROSTOVA
                    </div>
                    <h5 className="text-sm font-semibold text-[#1C1917]">
                      The Broom Tree Principle: Burnout, Anxiety &amp; Rest
                    </h5>
                    <p className="text-xs text-[#44403C] leading-relaxed">
                      Practical rhythms for supporting overwhelmed high-schoolers
                      using 1 Kings 19.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =================================================================== */}
        {/* SECTION 4 & 5: PRIVACY FIREWALL, GRACE STREAKS & MVP ROADMAP        */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Section 4: Strict Privacy Firewall & Non-Coercive Grace Engine */}
          <div className="lg:col-span-6 p-4 sm:p-7 rounded-2xl bg-[#1C1917] text-[#FAF7F2] border border-[#292524] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-[#FBBF24]">
                Section 04 · Privacy Firewall &amp; Grace-Driven Engagement
              </div>
              <h3
                className="text-xl sm:text-2xl font-normal text-[#FAF7F2]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                API Gateway Firewall &amp; Anti-Guilt Streaks
              </h3>

              {/* Interactive API Firewall Inspector */}
              <div className="p-4 rounded-xl bg-[#141210] border border-[#36312E] space-y-3 font-mono text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[#A8A29E]">
                    ENDPOINT: /api/v1/tier3/wrestling-vault
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFirewallTestStatus('blocked')}
                      className={`px-2 py-1 rounded text-[10px] cursor-pointer ${
                        firewallTestStatus === 'blocked'
                          ? 'bg-[#991B1B] text-[#FAF7F2]'
                          : 'bg-[#24211E] text-[#A8A29E]'
                      }`}
                    >
                      Test Parent Token
                    </button>
                    <button
                      type="button"
                      onClick={() => setFirewallTestStatus('teen-authorized')}
                      className={`px-2 py-1 rounded text-[10px] cursor-pointer ${
                        firewallTestStatus === 'teen-authorized'
                          ? 'bg-[#166534] text-[#FAF7F2]'
                          : 'bg-[#24211E] text-[#A8A29E]'
                      }`}
                    >
                      Test Teen Hardware Key
                    </button>
                  </div>
                </div>

                {firewallTestStatus === 'blocked' ? (
                  <div className="p-3 rounded bg-[#991B1B]/20 border border-[#991B1B] text-[#FCA5A5] text-[11px] leading-relaxed">
                    HTTP 403 FORBIDDEN · STRICT_PRIVACY_FIREWALL: Parental access
                    queries to Tier 3 encrypted storage are structurally blocked at
                    the API gateway.
                  </div>
                ) : (
                  <div className="p-3 rounded bg-[#166534]/20 border border-[#166534] text-[#A7F3D0] text-[11px] leading-relaxed">
                    HTTP 200 OK · LOCAL_ENCLAVE_VERIFIED: Decrypted locally on teen
                    device via hardware key.
                  </div>
                )}
              </div>
            </div>

            {/* Non-Coercive Grace-Driven Streak Banner */}
            <div className="p-4 rounded-xl bg-[#24211E] border border-[#D97706]/50 space-y-1.5">
              <div className="text-[11px] font-mono text-[#FBBF24] uppercase">
                Non-Coercive Return Greeting (Zero Streak-Shaming)
              </div>
              <p
                className="text-sm sm:text-base text-[#FAF7F2] italic"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                “Welcome back. Grace is new every morning. Ready to pick up where you
                left off?”
              </p>
            </div>
          </div>

          {/* Section 5: Phased MVP Rollout Roadmap */}
          <div className="lg:col-span-6 p-4 sm:p-7 rounded-2xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-[#92400E] font-semibold">
                Section 05 · Phased Engineering Execution
              </div>
              <h3
                className="text-xl sm:text-2xl font-normal text-[#1C1917]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Phased MVP Rollout Roadmap
              </h3>
            </div>

            <div className="space-y-3">
              {[
                {
                  phase: 'Phase 1 · The Foundation & Front Door',
                  detail:
                    'Minimalist landing page, frictionless role-based sign-up, "Open Door" age & familiarity intake flow, and backend user profile architecture.',
                  status: 'COMPLETE & LIVE',
                },
                {
                  phase: 'Phase 2 · Tier 1 Rollout (The Bedtime Shepherd)',
                  detail:
                    '2100K Zero-Glow night-mode audio player, curated foundational sleep narratives, and the parent Morning Bridge breakfast prompt widget.',
                  status: 'COMPLETE & LIVE',
                },
                {
                  phase: 'Phase 3 · Tier 2 & 3 Expansion (Archive & Safe Harbor)',
                  detail:
                    'Ancient Archive detective map and artifact inspector for tweens + zero-knowledge encrypted Wrestling Ring vault and Emotional Matrix for teens.',
                  status: 'COMPLETE & LIVE',
                },
              ].map((step) => (
                <div
                  key={step.phase}
                  className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#1C1917]">
                      {step.phase}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534] font-mono text-[10px] font-semibold">
                      {step.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#44403C] leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
