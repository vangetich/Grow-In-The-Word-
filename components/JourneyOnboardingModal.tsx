'use client';

import React, {useState} from 'react';
import {motion, AnimatePresence, PanInfo} from 'motion/react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Users,
  KeyRound,
  HeartHandshake,
  Database,
  Check,
  HelpCircle,
  Compass,
  SlidersHorizontal,
} from 'lucide-react';
import {
  FAMILIARITY_OPTIONS_SPEC,
  FamiliarityLevelId,
  computeCustomEntryLane,
} from '@/lib/design-spec-data';
import {useFocusTrap} from '@/lib/useFocusTrap';

type AccountRole = 'parent' | 'teen';
type FlowStage =
  | 'entry-choice'
  | 'frictionless-auth'
  | 'handoff-transition'
  | 'intake-screen-1-age'
  | 'intake-screen-2-familiarity'
  | 'post-intake-saving'
  | 'post-intake-welcome'
  | 'first-module-active';

interface JourneyOnboardingModalProps {
  isOpen: boolean;
  initialTier?: 'bedtime' | 'archive' | 'harbor';
  onClose: () => void;
}

export default function JourneyOnboardingModal({
  isOpen,
  initialTier = 'bedtime',
  onClose,
}: JourneyOnboardingModalProps) {
  const modalFocusTrapRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);
  const [accountRole, setAccountRole] = useState<AccountRole>('parent');
  const [flowStage, setFlowStage] = useState<FlowStage>('entry-choice');

  // Frictionless Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authMethodUsed, setAuthMethodUsed] = useState<
    'email' | 'apple' | 'google'
  >('email');
  const [formError, setFormError] = useState('');

  // Handoff Progress Micro-state
  const [handoffPhaseText, setHandoffPhaseText] = useState(
    'Preparing your household sanctuary…'
  );
  const [handoffProgress, setHandoffProgress] = useState(25);

  // 'Open Door' Intake Flow State (Screen 1: Age Check & Screen 2: Familiarity Check)
  const [readerAge, setReaderAge] = useState<number>(12);
  const [familiarityLevel, setFamiliarityLevel] =
    useState<FamiliarityLevelId>('beginner');
  const [showJsonArchitecture, setShowJsonArchitecture] = useState(false);

  // Post-Intake Saving & Welcome Page Secondary IA State
  const [savingProgress, setSavingProgress] = useState<number>(35);
  const [savingStepCopy, setSavingStepCopy] = useState<string>(
    'Setting up your personalized space…'
  );
  const [showHowItWorksDrawer, setShowHowItWorksDrawer] =
    useState<boolean>(false);

  const [prevProps, setPrevProps] = useState({ isOpen, initialTier });

  if (prevProps.isOpen !== isOpen || prevProps.initialTier !== initialTier) {
    setPrevProps({ isOpen, initialTier });
    if (initialTier === 'harbor') {
      setAccountRole('teen');
      setReaderAge(16);
      setFamiliarityLevel('some-stories');
    } else if (initialTier === 'archive') {
      setAccountRole('parent');
      setReaderAge(12);
      setFamiliarityLevel('beginner');
    } else {
      setAccountRole('parent');
      setReaderAge(5);
      setFamiliarityLevel('beginner');
    }
    setFlowStage('entry-choice');
    setFormError('');
    setShowHowItWorksDrawer(false);
  }

  const handleSwipeDismiss = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 90 || info.velocity.y > 420) {
      onClose();
    }
  };

  const currentYear = 2026;
  const birthYear = currentYear - readerAge;
  const computedLane = computeCustomEntryLane(readerAge, familiarityLevel);

  const handleRoleSwitch = (role: AccountRole) => {
    setAccountRole(role);
    if (role === 'teen' && readerAge < 13) {
      setReaderAge(16);
    } else if (role === 'parent' && readerAge > 12) {
      setReaderAge(12);
    }
  };

  const triggerSmoothHandoff = (method: 'email' | 'apple' | 'google') => {
    setAuthMethodUsed(method);
    setFlowStage('handoff-transition');
    setHandoffProgress(35);
    setHandoffPhaseText('Account secured. Setting up your custom space...');

    setTimeout(() => {
      setHandoffProgress(75);
      setHandoffPhaseText(
        accountRole === 'teen'
          ? 'Deriving local zero-knowledge vault key on your device…'
          : 'Provisioning COPPA-compliant family sanctuary…'
      );
    }, 600);

    setTimeout(() => {
      setHandoffProgress(100);
      setFlowStage('intake-screen-1-age');
    }, 1300);
  };

  const triggerPostIntakeWelcomeTransition = () => {
    setFlowStage('post-intake-saving');
    setSavingProgress(35);
    setSavingStepCopy('Customizing your environment...');

    setTimeout(() => {
      setSavingProgress(80);
    }, 450);

    // Lasts precisely 1.2 seconds as specified in the CRO & Narrative UX design spec
    setTimeout(() => {
      setSavingProgress(100);
      setFlowStage('post-intake-welcome');
    }, 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setFormError('Please enter a passphrase of at least 6 characters.');
      return;
    }
    setFormError('');
    triggerSmoothHandoff('email');
  };

  const profileBackendPayload = {
    intake_payload: {
      verified_age: readerAge,
      user_track:
        readerAge >= 13
          ? familiarityLevel === 'beginner'
            ? 'teen_curious_beginner'
            : 'teen_safe_harbor_scholar'
          : readerAge >= 8
          ? familiarityLevel === 'beginner'
            ? 'late_comer_beginner'
            : 'junior_historian'
          : 'bedtime_family_shepherd',
      assigned_entry_module:
        familiarityLevel === 'beginner'
          ? 'roots_and_resilience_intro'
          : readerAge >= 13
          ? 'safe_harbor_lament_vault'
          : readerAge >= 8
          ? 'historical_archive_chronicles'
          : 'bedtime_shepherd_setup',
      jargon_filter_enabled: familiarityLevel === 'beginner' || readerAge <= 12,
    },
    event: 'OPEN_DOOR_INTAKE_COMMITTED',
    account_stewardship_mode:
      accountRole === 'parent'
        ? 'PARENT_GUARDIAN_COPPA'
        : 'TEEN_INDEPENDENT_E2EE',
    inputs: {
      reader_age: readerAge,
      birth_year: birthYear,
      familiarity_selection: familiarityLevel,
      familiarity_enum: computedLane.familiarityCode,
    },
    computed_routing: {
      assigned_tier: computedLane.tierId.toUpperCase(),
      custom_entry_lane_id: computedLane.laneCode,
      custom_entry_lane_title: computedLane.laneTitle,
      welcome_cta_module: computedLane.welcomeCard.actionableButtonLabel,
      scaffolding_flags: computedLane.uiScaffoldingFlags,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cro-signup-modal-title"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.22, ease: 'easeOut'}}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-2.5 py-3 sm:p-6 bg-[#1C1917]/80 backdrop-blur-xs overflow-y-auto overflow-x-hidden w-full max-w-full"
        >
          <motion.div
            ref={modalFocusTrapRef as React.RefObject<HTMLDivElement>}
            tabIndex={-1}
            initial={{opacity: 0, scale: 0.94, y: 28}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.94, y: 36}}
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 28,
              mass: 0.9,
            }}
            drag="y"
            dragDirectionLock
            dragConstraints={{top: 0, bottom: 0}}
            dragElastic={{top: 0.04, bottom: 0.45}}
            onDragEnd={handleSwipeDismiss}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl mx-auto rounded-2xl bg-[#FAF7F2] border border-[#E5DEC9] shadow-2xl overflow-hidden my-auto max-h-[92dvh] sm:max-h-[90dvh] flex flex-col touch-pan-y focus:outline-none"
          >
            {/* Mobile Swipe-to-Dismiss Handle Bar */}
            <div
              aria-hidden="true"
              className="sm:hidden flex flex-col items-center justify-center pt-2.5 pb-1 bg-[#F2ECE1] cursor-grab active:cursor-grabbing select-none shrink-0"
            >
              <div className="w-11 h-1.5 rounded-full bg-[#D6CEBF]" />
              <span className="text-[10px] font-mono text-[#78716C] mt-1">
                Swipe down to close
              </span>
            </div>

            {/* Top Modal Header */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-[#F2ECE1] border-b border-[#E5DEC9] shrink-0">
              <div className="flex items-center gap-2 text-xs font-medium text-[#92400E] min-w-0">
                <span className="shrink-0">Grow In The Word</span>
                <span aria-hidden="true">·</span>
                <span className="truncate">
                  {flowStage === 'entry-choice' && 'Sign-Up · The Entry Choice'}
                  {flowStage === 'frictionless-auth' &&
                    (accountRole === 'parent'
                      ? 'Sign-Up · Parent/Guardian Account (Ages 3–12)'
                      : 'Sign-Up · Teen Safe Harbor Account (Ages 13–18)')}
                  {flowStage === 'handoff-transition' &&
                    'Security & Sanctuary Handoff'}
                  {flowStage === 'intake-screen-1-age' &&
                    'Open Door Intake (1 of 2) · The Age Check'}
                  {flowStage === 'intake-screen-2-familiarity' &&
                    'Open Door Intake (2 of 2) · The Familiarity Check'}
                  {flowStage === 'post-intake-saving' &&
                    'Post-Intake Routing Transition'}
                  {flowStage === 'post-intake-welcome' &&
                    'Post-Intake Welcome Sanctuary'}
                  {flowStage === 'first-module-active' &&
                    computedLane.startingTrackTitle}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl text-[#57534E] hover:text-[#1C1917] hover:bg-[#E5DEC9] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain min-w-0">
              {/* STAGE 1: THE ENTRY CHOICE: DEFINING THE RELATIONSHIP */}
              {flowStage === 'entry-choice' && (
                <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono font-medium text-[#D97706] tracking-wider uppercase" style={{fontFamily: 'var(--font-mono), monospace'}}>
                Step 1 of 3 · The Entry Choice
              </div>
              <h2
                id="cro-signup-modal-title"
                className="text-2xl sm:text-3xl font-normal text-[#1C1917]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Defining the Relationship
              </h2>
              <p className="text-sm text-[#44403C] leading-relaxed">
                Before asking for any credentials, we respect your role in the household. A parent setting up a profile for a 5-year-old has entirely different security and privacy needs than a 14-year-old opening a private journal space.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
              {/* Option A (The Parent Gateway) */}
              <button
                type="button"
                onClick={() => handleRoleSwitch('parent')}
                className={`p-6 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 cursor-pointer ${
                  accountRole === 'parent'
                    ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] ring-2 ring-[#D97706]'
                    : 'bg-[#F2ECE1] text-[#1C1917] border-[#E5DEC9] hover:border-[#D97706]/60'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-mono text-[#D97706] tabular-nums font-medium"
                      style={{fontFamily: 'var(--font-mono), monospace'}}
                    >
                      Option A · The Parent Gateway
                    </span>
                    <Users className="w-4 h-4 text-[#D97706]" />
                  </div>

                  <h3
                    className="text-lg sm:text-xl font-normal leading-snug"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    “I’m a parent or guardian setting this up for a child (Ages 3–12).”
                  </h3>

                  <p
                    className={`text-xs leading-relaxed ${
                      accountRole === 'parent'
                        ? 'text-[#E7E5E4]'
                        : 'text-[#44403C]'
                    }`}
                  >
                    Setting up <strong>Bedtime Sanctuary (3–7)</strong> or{' '}
                    <strong>Historical Archive (8–12)</strong> for my child.
                  </p>
                </div>

                <div
                  className={`mt-5 pt-3 border-t text-[11px] font-medium ${
                    accountRole === 'parent'
                      ? 'border-[#292524] text-[#FBBF24]'
                      : 'border-[#E5DEC9] text-[#92400E]'
                  }`}
                >
                  COPPA Family Stewardship · Circadian Bedtime Controls · Zero Ads
                </div>
              </button>

              {/* Option B (The Independent Gateway) */}
              <button
                type="button"
                onClick={() => handleRoleSwitch('teen')}
                className={`p-6 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 cursor-pointer ${
                  accountRole === 'teen'
                    ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] ring-2 ring-[#D97706]'
                    : 'bg-[#F2ECE1] text-[#1C1917] border-[#E5DEC9] hover:border-[#D97706]/60'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-mono text-[#D97706] tabular-nums font-medium"
                      style={{fontFamily: 'var(--font-mono), monospace'}}
                    >
                      Option B · The Independent Gateway
                    </span>
                    <Lock className="w-4 h-4 text-[#D97706]" />
                  </div>

                  <h3
                    className="text-lg sm:text-xl font-normal leading-snug"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    “I’m setting this up for myself (Ages 13–18+).”
                  </h3>

                  <p
                    className={`text-xs leading-relaxed ${
                      accountRole === 'teen'
                        ? 'text-[#E7E5E4]'
                        : 'text-[#44403C]'
                    }`}
                  >
                    Selecting Option B instantly flags account metadata to enforce strict, zero-knowledge privacy protocols for teen journaling later on, showing your autonomy and trust are respected from second one.
                  </p>
                </div>

                <div
                  className={`mt-5 pt-3 border-t text-[11px] font-medium ${
                    accountRole === 'teen'
                      ? 'border-[#292524] text-[#FBBF24]'
                      : 'border-[#E5DEC9] text-[#92400E]'
                  }`}
                >
                  Zero-Knowledge Privacy · AES-256 Device-Key Journaling · Private from Day One
                </div>
              </button>
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={() => setFlowStage('frictionless-auth')}
                className="group w-full min-h-[44px] inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#1C1917] hover:bg-[#292524] hover:ring-2 hover:ring-[#D97706]/60 active:scale-[0.985] text-sm font-semibold text-[#FAF7F2] transition-all duration-150 cursor-pointer"
              >
                <span>
                  {accountRole === 'parent'
                    ? 'Continue as Parent / Guardian (Ages 3–12)'
                    : 'Continue as Independent Teen User (Ages 13–18+)'}
                </span>
                <ArrowRight className="w-4 h-4 text-[#D97706] transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E] px-1">
                <button
                  type="button"
                  onClick={() => setFlowStage('intake-screen-1-age')}
                  className="min-h-[44px] inline-flex items-center font-semibold text-[#92400E] hover:underline underline-offset-4 cursor-pointer"
                >
                  Preview ‘Open Door’ Intake →
                </button>
                <button
                  type="button"
                  onClick={triggerPostIntakeWelcomeTransition}
                  className="min-h-[44px] inline-flex items-center font-semibold text-[#92400E] hover:underline underline-offset-4 cursor-pointer"
                >
                  Preview Post-Intake Welcome Page →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: FRICTIONLESS FORM DESIGN: RADICAL SIMPLICITY */}
        {flowStage === 'frictionless-auth' && (
          <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div
                  className="text-xs font-mono font-medium text-[#D97706] tracking-wider uppercase"
                  style={{fontFamily: 'var(--font-mono), monospace'}}
                >
                  Step 2 of 3 · Frictionless Sign-Up
                </div>
                <h2
                  id="cro-signup-modal-title"
                  className="text-2xl sm:text-3xl font-normal text-[#1C1917]"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  {accountRole === 'parent'
                    ? 'Create your family sanctuary'
                    : 'Create your private Safe Harbor'}
                </h2>
                <p className="text-xs sm:text-sm text-[#57534E]">
                  {accountRole === 'parent'
                    ? 'Provisions Bedtime Sanctuary (3–7) & Historical Archive (8–12) with COPPA family oversight.'
                    : 'Provisions Safe Harbor (13–18) with zero-knowledge, local device-key encryption.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setFlowStage('entry-choice')}
                className="min-h-[44px] px-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[#92400E] hover:underline underline-offset-4 cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Switch Role</span>
              </button>
            </div>

            {/* One-Tap Social Auth (Crucial for mobile conversion and zero password fatigue) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => triggerSmoothHandoff('apple')}
                className="min-h-[44px] flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl bg-white hover:bg-[#F2ECE1] border border-[#E5DEC9] text-xs font-semibold text-[#1C1917] transition-all hover:shadow-xs active:scale-[0.99] cursor-pointer"
              >
                <KeyRound className="w-4 h-4 text-[#1C1917]" />
                <span>Sign in with Apple</span>
              </button>

              <button
                type="button"
                onClick={() => triggerSmoothHandoff('google')}
                className="min-h-[44px] flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl bg-white hover:bg-[#F2ECE1] border border-[#E5DEC9] text-xs font-semibold text-[#1C1917] transition-all hover:shadow-xs active:scale-[0.99] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D97706]" />
                <span>Sign in with Google</span>
              </button>
            </div>

            {/* Subtle Divider */}
            <div className="relative flex items-center justify-center py-1">
              <div className="w-full border-t border-[#E5DEC9]" />
              <span className="bg-[#FAF7F2] px-3 text-[11px] font-mono text-[#78716C] whitespace-nowrap">
                or continue with email
              </span>
            </div>

            {/* The Email / Passphrase Alternative (Zero Bloat: No phone, no postal code, no surveys) */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  {accountRole === 'parent'
                    ? 'Parent / Guardian Email'
                    : 'Personal Email Address'}
                </label>
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={
                    accountRole === 'parent'
                      ? 'parent@household.com'
                      : 'reader@sanctuary.org'
                  }
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formError) setFormError('');
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5DEC9] text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706]"
                />
              </div>

              {/* Password field smoothly transitions in once email is entered */}
              <AnimatePresence>
                {(email.length > 2 || email.includes('@')) && (
                  <motion.div
                    initial={{opacity: 0, height: 0, y: -6}}
                    animate={{opacity: 1, height: 'auto', y: 0}}
                    exit={{opacity: 0, height: 0, y: -6}}
                    transition={{duration: 0.22, ease: 'easeOut'}}
                    className="overflow-hidden space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="signup-password"
                        className="text-xs font-semibold text-[#1C1917]"
                      >
                        {accountRole === 'parent'
                          ? 'Create Household Passphrase'
                          : 'Create Private Vault Passphrase'}
                      </label>
                      <span
                        className="text-[11px] font-mono text-[#78716C]"
                        style={{fontFamily: 'var(--font-mono), monospace'}}
                      >
                        {accountRole === 'teen'
                          ? 'Generates local AES-256 key'
                          : 'Min. 6 characters'}
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (formError) setFormError('');
                        }}
                        className="w-full px-4 py-3 pr-11 rounded-xl bg-white border border-[#E5DEC9] text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-[#78716C] hover:text-[#1C1917] cursor-pointer rounded-lg"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {formError && (
                <p className="text-xs text-red-700 font-medium">{formError}</p>
              )}

              <div className="pt-2 space-y-3.5">
                <button
                  type="submit"
                  className="group w-full min-h-[44px] inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#1C1917] hover:bg-[#292524] hover:ring-2 hover:ring-[#D97706]/60 active:scale-[0.985] text-sm font-semibold text-[#FAF7F2] transition-all duration-150 cursor-pointer shadow-sm"
                >
                  <span>Begin the Journey</span>
                  <ArrowRight className="w-4 h-4 text-[#D97706] transition-transform group-hover:translate-x-1" />
                </button>

                {/* THE TRUST & PRIVACY BADGE: INTEGRITY AT THE GATE (Placed directly beneath the submit button) */}
                <div className="p-3.5 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] text-center space-y-1">
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#1C1917]">
                    <ShieldCheck className="w-4 h-4 text-[#4A5D4E] shrink-0" />
                    <span className="leading-snug">
                      “We never sell your data or track your habits. Teen journals are locally encrypted and 100% private from day one. Your space is truly your own.”
                    </span>
                  </div>
                  <p className="text-[11px] text-[#57534E] leading-relaxed">
                    {accountRole === 'teen'
                      ? 'Zero-Knowledge Protocol: Your journal encryption key is derived directly on this device—never sent to parents or our servers.'
                      : 'COPPA-Compliant Family Stewardship: No targeted advertising, no third-party data broker sharing.'}
                  </p>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* STAGE 3: THE SUCCESS HANDOFF (The Breath of Transition) */}
        {flowStage === 'handoff-transition' && (
          <div className="p-10 sm:p-14 bg-[#1C1917] text-[#FAF7F2] text-center space-y-6 transition-all duration-300">
            {/* Soft, pulsing amber or sage-colored breathing ring */}
            <div className="relative flex items-center justify-center w-24 h-24 mx-auto my-2">
              <motion.div
                animate={{
                  scale: [1, 1.28, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`absolute inset-0 rounded-full border-2 ${
                  accountRole === 'teen'
                    ? 'border-[#4A5D4E] bg-[#4A5D4E]/20'
                    : 'border-[#D97706] bg-[#D97706]/20'
                }`}
              />
              <motion.div
                animate={{
                  scale: [0.92, 1.06, 0.92],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`w-14 h-14 rounded-full flex items-center justify-center border shadow-inner ${
                  accountRole === 'teen'
                    ? 'bg-[#1E2922] border-[#4A5D4E] text-[#A7F3D0]'
                    : 'bg-[#2A1E14] border-[#D97706] text-[#FBBF24]'
                }`}
              >
                <Lock className="w-6 h-6 animate-pulse" />
              </motion.div>
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3
                className="text-2xl sm:text-3xl font-normal text-[#FAF7F2]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Account secured. Setting up your custom space...
              </h3>

              <p className="text-xs text-[#A8A29E] leading-relaxed">
                {handoffPhaseText}
              </p>
            </div>

            {/* Smooth transition progress indicator */}
            <div className="max-w-xs mx-auto space-y-2 pt-2">
              <div className="h-1.5 rounded-full bg-[#292524] overflow-hidden">
                <motion.div
                  initial={{width: '25%'}}
                  animate={{width: `${handoffProgress}%`}}
                  transition={{duration: 0.4}}
                  className={`h-full ${
                    accountRole === 'teen' ? 'bg-[#4A5D4E]' : 'bg-[#D97706]'
                  }`}
                />
              </div>

              <div
                className="text-[11px] font-mono text-[#A8A29E] tabular-nums"
                style={{fontFamily: 'var(--font-mono), monospace'}}
              >
                {authMethodUsed === 'email'
                  ? 'Authenticated via Passphrase'
                  : `Authenticated via ${authMethodUsed === 'apple' ? 'Sign in with Apple' : 'Sign in with Google'}`}{' '}
                · {handoffProgress}% · Gliding into Open Door Intake…
              </div>
            </div>
          </div>
        )}

        {/* STAGE 4A: 'OPEN DOOR' INTAKE FLOW — SCREEN 1 (THE AGE CHECK) */}
        {flowStage === 'intake-screen-1-age' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#92400E]">
                Open Door Intake · Screen 1 of 2 (The Age Check)
              </div>
              <h2
                id="cro-signup-modal-title"
                className="text-2xl sm:text-3xl font-normal text-[#1C1917]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                “To help us curate a space that fits right where you are today, what year were you born?”
              </h2>
            </div>

            <div
              className={`rounded-xl p-6 sm:p-7 border transition-colors duration-200 ${
                readerAge <= 7
                  ? 'bg-[#1C1917] text-[#FAF7F2] border-[#292524]'
                  : 'bg-[#F2ECE1] text-[#1C1917] border-[#E5DEC9]'
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5 border-b border-current/10">
                <div>
                  <div className="text-xs opacity-75">Selected Reader Age</div>
                  <div
                    className="text-4xl sm:text-5xl font-normal tracking-tight tabular-nums mt-1"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    Age {readerAge}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs opacity-75">Birth Year</div>
                  <div
                    className="text-2xl sm:text-3xl font-mono font-medium text-[#D97706] tabular-nums mt-1"
                    style={{fontFamily: 'var(--font-mono), monospace'}}
                  >
                    {birthYear}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-xs opacity-80">
                  <span>Age 3 (Born 2023)</span>
                  <span>Age 12 (Born 2014)</span>
                  <span>Age 18 (Born 2008)</span>
                </div>
                <input
                  type="range"
                  aria-label="Select reader age from 3 to 18"
                  min={3}
                  max={18}
                  value={readerAge}
                  onChange={(e) => setReaderAge(Number(e.target.value))}
                  className="w-full accent-[#D97706] cursor-pointer h-2 rounded-lg"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {[5, 8, 10, 12, 14, 16, 18].map((presetAge) => (
                  <button
                    key={presetAge}
                    type="button"
                    onClick={() => setReaderAge(presetAge)}
                    className={`min-h-[44px] px-3 py-2 rounded-lg text-xs font-mono tabular-nums transition-colors cursor-pointer inline-flex items-center justify-center ${
                      readerAge === presetAge
                        ? 'bg-[#D97706] text-[#1C1917] font-semibold'
                        : 'bg-current/10 hover:bg-current/20'
                    }`}
                  >
                    {currentYear - presetAge} (Age {presetAge})
                  </button>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-current/10 flex items-center justify-between text-xs">
                <span className="opacity-80">Matched Sanctuary Environment:</span>
                <span className="font-semibold text-[#D97706]">
                  {computedLane.tierName}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#F2ECE1] border border-[#E5DEC9] flex items-start gap-2.5 text-xs text-[#44403C]">
              <HeartHandshake className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#1C1917]">No Locked Doors:</strong> Age
                simply sets your starting reading rhythm and visual comfort—you
                can explore any historical depth or adjust this anytime.
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFlowStage('entry-choice')}
                className="min-h-[44px] px-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setFlowStage('intake-screen-2-familiarity')}
                className="group min-h-[44px] inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-sm font-semibold text-[#FAF7F2] transition-colors cursor-pointer"
              >
                <span>Continue to Familiarity Check</span>
                <ArrowRight className="w-4 h-4 text-[#D97706] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}

        {/* STAGE 4B: 'OPEN DOOR' INTAKE FLOW — SCREEN 2 (THE FAMILIARITY CHECK) */}
        {flowStage === 'intake-screen-2-familiarity' && (
          <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#92400E]">
                Open Door Intake · Screen 2 of 2 (The Familiarity Check)
              </div>
              <h2
                id="cro-signup-modal-title"
                className="text-2xl sm:text-3xl font-normal text-[#1C1917]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Where are you starting from today?
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] flex items-start gap-3 text-xs text-[#44403C] leading-relaxed">
              <HeartHandshake className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1C1917] block mb-0.5">
                  The Radical Honesty Micro-Copy:
                </strong>
                “Wherever you&apos;re starting, you belong here. No prior knowledge is required, and no question is off-limits.”
              </div>
            </div>

            <div className="space-y-3">
              {FAMILIARITY_OPTIONS_SPEC.map((option) => {
                const isSelected = familiarityLevel === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFamiliarityLevel(option.id)}
                    className={`w-full p-5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] ring-2 ring-[#D97706]'
                        : 'bg-[#FAF7F2] text-[#1C1917] border-[#E5DEC9] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className="text-lg font-normal leading-snug"
                        style={{fontFamily: 'var(--font-display), serif'}}
                      >
                        {option.quoteLabel}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#D97706] shrink-0 mt-1" />
                      )}
                    </div>

                    <p
                      className={`mt-2 text-xs leading-relaxed ${
                        isSelected ? 'text-[#D6D3D1]' : 'text-[#57534E]'
                      }`}
                    >
                      {option.empathySubtitle}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFlowStage('intake-screen-1-age')}
                className="min-h-[44px] px-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Age Check</span>
              </button>

              <button
                type="button"
                onClick={triggerPostIntakeWelcomeTransition}
                className="group min-h-[44px] inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-sm font-semibold text-[#FAF7F2] transition-colors cursor-pointer"
              >
                <span>Complete Intake & Build My Space</span>
                <ArrowRight className="w-4 h-4 text-[#D97706] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}

        {/* STAGE 5A: POST-INTAKE SAVING TRANSITION STATE */}
        {flowStage === 'post-intake-saving' && (
          <div className="p-10 sm:p-14 bg-[#FAF7F2] text-[#1C1917] text-center space-y-6 transition-all duration-300">
            {/* Gentle Pulsing Amber Ring */}
            <div className="relative flex items-center justify-center w-24 h-24 mx-auto my-2">
              <motion.div
                animate={{
                  scale: [1, 1.28, 1],
                  opacity: [0.35, 0.8, 0.35],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 rounded-full border-2 border-[#D97706] bg-[#D97706]/15"
              />
              <div className="w-14 h-14 rounded-full bg-[#F2ECE1] border border-[#D97706] flex items-center justify-center shadow-xs">
                <Sparkles className="w-6 h-6 text-[#D97706] animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <div
                className="text-xs font-mono text-[#92400E] tabular-nums"
                style={{fontFamily: 'var(--font-mono), monospace'}}
              >
                Routing Custom Entry Lane · {computedLane.laneCode}
              </div>

              <h3
                className="text-2xl sm:text-3xl font-normal text-[#1C1917]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                {savingStepCopy}
              </h3>

              <p className="text-xs text-[#57534E] max-w-sm mx-auto leading-relaxed">
                Calibrating typographic measure, historical context primers, and
                privacy guardrails for Age {readerAge}…
              </p>
            </div>

            <div className="max-w-xs mx-auto h-1.5 rounded-full bg-[#E5DEC9] overflow-hidden">
              <div
                className="h-full bg-[#D97706] transition-all duration-500"
                style={{width: `${savingProgress}%`}}
              />
            </div>
          </div>
        )}

        {/* STAGE 5B: POST-INTAKE ROUTING & WELCOME PAGE */}
        {flowStage === 'post-intake-welcome' && (
          <div className="p-6 sm:p-9 space-y-7 bg-[#FAF7F2]">
            {/* 1. THE PERSONALIZED WELCOME CARD */}
            <div
              className={`rounded-xl p-6 sm:p-8 border space-y-5 ${
                computedLane.tierId === 'bedtime'
                  ? 'bg-[#1C1917] text-[#FAF7F2] border-[#292524]'
                  : 'bg-[#F2ECE1] text-[#1C1917] border-[#E5DEC9]'
              }`}
            >
              {/* Quiet Unboxed Metadata Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-current/10 text-xs">
                <span className="font-medium text-[#D97706]">
                  {computedLane.welcomeCard.kicker}
                </span>
                <span
                  className="font-mono opacity-75 tabular-nums"
                  style={{fontFamily: 'var(--font-mono), monospace'}}
                >
                  {computedLane.laneCode}
                </span>
              </div>

              {/* Narrative UX Welcome Headline (e.g., "Welcome. You're stepping into an open library where no question is off-limits.") */}
              <h2
                id="cro-signup-modal-title"
                className="text-2xl sm:text-3xl font-normal leading-[1.22] tracking-tight"
                style={{
                  fontFamily: 'var(--font-display), serif',
                  textWrap: 'balance',
                }}
              >
                “{computedLane.welcomeCard.headline}”
              </h2>

              {/* Narrative Welcome Body */}
              <p className="text-sm sm:text-[15px] leading-[1.7] opacity-90">
                {computedLane.welcomeCard.narrativeBody}
              </p>

              {/* Tailored Track Summary */}
              <div className="pt-4 border-t border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="opacity-75">Tailored Starting Track: </span>
                  <strong className="font-semibold">
                    {computedLane.startingTrackTitle}
                  </strong>
                </div>
                <span
                  className="font-mono text-[#D97706] tabular-nums"
                  style={{fontFamily: 'var(--font-mono), monospace'}}
                >
                  {computedLane.welcomeCard.moduleDuration}
                </span>
              </div>

              {/* 2. THE ACTIONABLE FIRST STEP (Single Primary Button: Pill-shaped deep charcoal with soft amber hover state) */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setFlowStage('first-module-active')}
                  className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#1C1917] hover:bg-[#292524] hover:ring-2 hover:ring-[#D97706]/60 border border-[#D97706]/40 hover:border-[#D97706] text-[15px] font-semibold text-[#FAF7F2] transition-all duration-150 shadow-sm cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{computedLane.welcomeCard.actionableButtonLabel}</span>
                  <ArrowRight className="w-4 h-4 text-[#D97706] transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* 3. MINIMALIST INFORMATION ARCHITECTURE (Quiet Secondary Options Without Clutter) */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs text-[#57534E]">
                <button
                  type="button"
                  onClick={() => setShowHowItWorksDrawer(!showHowItWorksDrawer)}
                  className="inline-flex items-center gap-1.5 font-medium text-[#44403C] hover:text-[#1C1917] hover:underline underline-offset-4 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>
                    {showHowItWorksDrawer
                      ? 'Hide 60-second guided tour'
                      : 'Curious how this space works? Take a 60-second guided tour.'}
                  </span>
                </button>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setFlowStage('intake-screen-1-age')}
                    className="inline-flex items-center gap-1 font-medium text-[#57534E] hover:text-[#1C1917] hover:underline underline-offset-4 cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    <span>Adjust Age ({readerAge}) or Familiarity</span>
                  </button>

                  <span aria-hidden="true" className="text-[#E5DEC9]">
                    ·
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setShowJsonArchitecture(!showJsonArchitecture)
                    }
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-[#92400E] hover:underline underline-offset-4 cursor-pointer"
                  >
                    <Database className="w-3 h-3" />
                    <span>
                      {showJsonArchitecture ? 'Hide JSON' : 'Profile JSON'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Expandable 60-Second 'How It Works' Drawer (Zero Clutter Default) */}
              {showHowItWorksDrawer && (
                <div className="p-5 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-3 text-xs text-[#44403C]">
                  <div className="font-semibold text-[#1C1917]">
                    How Your Personalized Sanctuary Works in 3 Quiet Steps:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9]">
                      <strong className="text-[#92400E] block mb-1">
                        01. No Streaks or Pressure
                      </strong>
                      Read or listen at your own rhythm. We never send guilt
                      notifications or gamified flames.
                    </div>
                    <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9]">
                      <strong className="text-[#92400E] block mb-1">
                        02. Inline Context Layers
                      </strong>
                      Tap any underlined phrase or map icon to see plain-English
                      historical notes and original root words.
                    </div>
                    <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9]">
                      <strong className="text-[#92400E] block mb-1">
                        03. Private Commonplace Notes
                      </strong>
                      Every question you write stays in your encrypted archive
                      and grows with you to age 18.
                    </div>
                  </div>
                </div>
              )}

              {showJsonArchitecture && (
                <pre
                  className="p-3.5 rounded-lg bg-[#1C1917] text-[#FAF7F2] text-[11px] font-mono overflow-x-auto leading-relaxed"
                  style={{fontFamily: 'var(--font-mono), monospace'}}
                >
                  {JSON.stringify(profileBackendPayload, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}

        {/* STAGE 6: FIRST ONBOARDING MODULE ACTIVE PREVIEW */}
        {flowStage === 'first-module-active' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between text-xs text-[#92400E] pb-3 border-b border-[#E5DEC9]">
              <div className="flex items-center gap-2 font-semibold">
                <Compass className="w-4 h-4 text-[#D97706]" />
                <span>{computedLane.startingTrackTitle}</span>
              </div>
              <span
                className="font-mono tabular-nums"
                style={{fontFamily: 'var(--font-mono), monospace'}}
              >
                Session 01 · {computedLane.firstSessionPassage}
              </span>
            </div>

            <div className="p-6 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-4">
              <blockquote
                className="text-lg sm:text-xl text-[#1C1917] leading-relaxed"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                {computedLane.welcomeCard.firstModulePreviewText}
              </blockquote>

              <div className="pt-3 border-t border-[#E5DEC9] text-xs text-[#44403C] leading-relaxed">
                <strong className="text-[#92400E] block mb-1">
                  Tailored Companion Prompt:
                </strong>
                {computedLane.welcomeCard.firstModulePrompt}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFlowStage('post-intake-welcome')}
                className="min-h-[44px] px-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Welcome Card</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#1C1917] text-[#FAF7F2] text-xs font-semibold hover:bg-[#292524] transition-colors cursor-pointer"
              >
                Return to Landing Page & Spec
              </button>
            </div>
          </div>
        )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
