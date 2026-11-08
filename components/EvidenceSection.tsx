'use client';

import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Quote, GraduationCap, HeartHandshake } from 'lucide-react';

interface EvidenceSectionProps {
  onOpenJourneyModal: (tierId?: 'bedtime' | 'archive' | 'harbor') => void;
}

type RoleFilter = 'all' | 'parent' | 'educator';
type StageFilter = 'all' | 'bedtime' | 'archive' | 'harbor' | 'multi-child';

interface TestimonialItem {
  id: string;
  roleType: 'parent' | 'educator';
  roleBadgeLabel: string;
  stageCategory: Exclude<StageFilter, 'all'>;
  stageLabel: string;
  tierTarget: 'bedtime' | 'archive' | 'harbor';
  ageSpanServed: string;
  quote: string;
  beforeState: string;
  observedImpact: string;
  authorName: string;
  authorCredentials: string;
  location: string;
  durationUsed: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'parent-bedtime-rachel',
    roleType: 'parent',
    roleBadgeLabel: 'Parent Perspective',
    stageCategory: 'bedtime',
    stageLabel: 'Bedtime Sanctuary',
    tierTarget: 'bedtime',
    ageSpanServed: 'Ages 4 & 6',
    quote:
      'For the first time, our four- and six-year-olds ask for a Psalm before sleep instead of begging for another bright cartoon episode. The warm amber screen and solo cello narration lower the temperature of the whole bedroom in five minutes.',
    beforeState:
      'Overstimulated bedtime meltdowns caused by loud, hyper-colored children’s bible cartoons.',
    observedImpact:
      'Unhurried 10-minute evening ritual with whispered parent-child wonder prompts and zero blue-light stress.',
    authorName: 'Rachel & David M.',
    authorCredentials: 'Parents of 4 & 6-year-olds',
    location: 'Austin, TX',
    durationUsed: '11 months in Bedtime Sanctuary',
  },
  {
    id: 'educator-bedtime-elena',
    roleType: 'educator',
    roleBadgeLabel: 'Early Childhood Educator',
    stageCategory: 'bedtime',
    stageLabel: 'Bedtime Sanctuary',
    tierTarget: 'bedtime',
    ageSpanServed: 'Ages 3–6 Classroom & Home',
    quote:
      'As an early childhood Montessori director, I am deeply protective of young children’s sensory environments. Grow In The Word is the rare digital tool that respects the three-to-six nervous system—replacing frantic animation and reward bells with fine-line botanical stillness and unhurried wonder.',
    beforeState:
      'Most children’s apps hijack early attention spans with gamified streaks and slapstick sound effects.',
    observedImpact:
      'Cultivates quiet auditory imagination, emotional security, and receptive listening in children ages 3–6.',
    authorName: 'Elena Vance, M.Ed.',
    authorCredentials: 'Early Childhood Montessori Director (14 Years)',
    location: 'Portland, OR',
    durationUsed: 'Recommended to 60+ school families',
  },
  {
    id: 'parent-archive-marcus',
    roleType: 'parent',
    roleBadgeLabel: 'Parent Perspective',
    stageCategory: 'archive',
    stageLabel: 'Ancient Archive',
    tierTarget: 'archive',
    ageSpanServed: 'Age 10',
    quote:
      'My ten-year-old son was starting to lump Bible stories in with Greek mythology because everything he’d seen looked like a fairy tale. Scrubbing the Iron Age timeline and inspecting Hezekiah’s Tunnel in the Ancient Archive completely flipped a switch for his analytical mind.',
    beforeState:
      'Tween skepticism that biblical narratives were disconnected from real world history.',
    observedImpact:
      'Self-directed 20-minute investigations into Ancient Near Eastern geography, artifacts, and Hebrew root words.',
    authorName: 'Marcus T.',
    authorCredentials: 'Father of a 10-year-old explorer',
    location: 'Seattle, WA',
    durationUsed: '8 months in Ancient Archive',
  },
  {
    id: 'educator-archive-julian',
    roleType: 'educator',
    roleBadgeLabel: 'Humanities & History Educator',
    stageCategory: 'archive',
    stageLabel: 'Ancient Archive',
    tierTarget: 'archive',
    ageSpanServed: 'Ages 8–12 (Grades 3–7)',
    quote:
      'Between ages eight and twelve, students crave concrete historical anchors. By placing scripture alongside Assyrian, Babylonian, and Roman archaeological strata—and letting kids tap directly into Hebrew and Greek lexical roots—this platform treats tweens like capable historians rather than passive consumers.',
    beforeState:
      'Traditional youth curricula oversimplify ancient Near Eastern context and lose curious middle-grade readers.',
    observedImpact:
      'Measurable jump in historical literacy, map comprehension, and primary-source curiosity among 8–12-year-olds.',
    authorName: 'Dr. Julian Sterling',
    authorCredentials: 'Middle School Humanities & Ancient History Chair',
    location: 'Chicago, IL',
    durationUsed: 'Used in 6th-Grade Ancient Civilizations Seminar',
  },
  {
    id: 'parent-harbor-hannah',
    roleType: 'parent',
    roleBadgeLabel: 'Parent Perspective',
    stageCategory: 'harbor',
    stageLabel: 'Safe Harbor',
    tierTarget: 'harbor',
    ageSpanServed: 'Age 16',
    quote:
      'When our sixteen-year-old walked through a season of heavy grief after losing a close friend, she shut down around church clichés. Knowing her Safe Harbor journal was cryptographically locked on her own phone gave her the safety to wrestle honestly with Habakkuk and Job.',
    beforeState:
      'Fear of parental surveillance and frustration with rehearsed “everything happens for a reason” platitudes.',
    observedImpact:
      'Deep, self-owned spiritual resilience built through private lament journaling and Socratic inquiry.',
    authorName: 'Dr. Hannah L.',
    authorCredentials: 'Mother of a 16-year-old daughter',
    location: 'Boston, MA',
    durationUsed: '14 months in Safe Harbor',
  },
  {
    id: 'educator-harbor-thomas',
    roleType: 'educator',
    roleBadgeLabel: 'High School Seminar Educator',
    stageCategory: 'harbor',
    stageLabel: 'Safe Harbor',
    tierTarget: 'harbor',
    ageSpanServed: 'Ages 13–18 (Grades 8–12)',
    quote:
      'Adolescents don’t abandon faith because they have hard questions; they leave when they feel their intellect is policed. Safe Harbor’s Socratic prompts, parallel translation studio, and theologian-moderated peer cohorts create the healthiest high-school discussion culture I’ve witnessed in twenty years of teaching.',
    beforeState:
      'Teens isolating in silent doubt or encountering toxic, unmoderated debates on social algorithms.',
    observedImpact:
      'Substantive critical thinking and respectful peer solidarity without follower counts or performative pressure.',
    authorName: 'Rev. Thomas K., M.Div.',
    authorCredentials: 'High School Ethics & Literature Seminar Director',
    location: 'Nashville, TN',
    durationUsed: 'Advises 4 High School Seminar Cohorts',
  },
  {
    id: 'parent-multichild-sarah',
    roleType: 'parent',
    roleBadgeLabel: 'Multi-Stage Family',
    stageCategory: 'multi-child',
    stageLabel: 'All Three Tiers',
    tierTarget: 'archive',
    ageSpanServed: 'Ages 5, 10 & 15',
    quote:
      'Having one calm ecosystem that meets our five-year-old with bedtime cello stories, our ten-year-old with archaeological maps, and our fifteen-year-old with Socratic seminar notes on the exact same passage has united our family’s spiritual language.',
    beforeState:
      'Juggling three disconnected apps that either talked down to our older kids or overwhelmed our youngest.',
    observedImpact:
      'Shared weekly Scripture passages tailored to each child’s exact developmental posture from age 5 to 15.',
    authorName: 'Sarah & Jonathan K.',
    authorCredentials: 'Parents of three children (Ages 5, 10 & 15)',
    location: 'Denver, CO',
    durationUsed: '16 months across all 3 tiers',
  },
  {
    id: 'parent-harbor-claire',
    roleType: 'parent',
    roleBadgeLabel: 'Parent Perspective',
    stageCategory: 'harbor',
    stageLabel: 'Safe Harbor',
    tierTarget: 'harbor',
    ageSpanServed: 'Ages 14 & 17',
    quote:
      'Instead of invading our sons’ privacy, the Parent Portal simply tells us the general historical theme they’re exploring—like Justice in the Prophets—and gives us one open-ended Sunday dinner question. Our table conversations have never been more honest.',
    beforeState:
      'Awkward dinner-table lectures or total silence around faith, ethics, and current events.',
    observedImpact:
      'Non-coercive family dialogue rooted in mutual respect, teen autonomy, and shared intellectual curiosity.',
    authorName: 'Claire & Mateo R.',
    authorCredentials: 'Parents of 14 & 17-year-old sons',
    location: 'Minneapolis, MN',
    durationUsed: '9 months in Safe Harbor & Parent Portal',
  },
];

export default function EvidenceSection({
  onOpenJourneyModal,
}: EvidenceSectionProps) {
  const [activeRoleFilter, setActiveRoleFilter] = useState<RoleFilter>('all');
  const [activeStageFilter, setActiveStageFilter] = useState<StageFilter>('all');

  const filteredTestimonials = TESTIMONIALS.filter((item) => {
    const matchesRole =
      activeRoleFilter === 'all' || item.roleType === activeRoleFilter;
    const matchesStage =
      activeStageFilter === 'all' || item.stageCategory === activeStageFilter;
    return matchesRole && matchesStage;
  });

  return (
    <section
      id="testimonials"
      className="relative py-20 lg:py-28 border-b border-[#E5DEC9] bg-[#FAF7F2]"
    >
      <div id="evidence" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      <div className="max-w-[1280px] mx-auto px-6 space-y-12">
        {/* Section Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#E5DEC9]">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#4A5D4E]">
              <span>Field Evidence &amp; Endorsements</span>
              <span aria-hidden="true">·</span>
              <span>Parents &amp; Educators (Ages 3–18)</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1C1917]"
              style={{
                fontFamily: 'var(--font-display), serif',
                textWrap: 'balance',
              }}
            >
              Trusted in quiet bedrooms, family kitchens, and humanities
              seminars.
            </h2>

            <p className="text-base text-[#44403C] leading-relaxed">
              Hear from parents and classroom educators observing how Grow In
              The Word nurtures calm wonder in early childhood (ages 3–6),
              historical literacy in middle childhood (ages 8–12), and resilient
              critical thinking in adolescence (ages 13–18)—without noise,
              manipulation, or coercion.
            </p>
          </div>

          {/* Minimalist Role Perspective Filter (All Voices · Parents · Educators) */}
          <div className="space-y-2 shrink-0">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#57534E]">
              Filter by Perspective
            </div>
            <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#F2ECE1] border border-[#E5DEC9]">
              {(
                [
                  { id: 'all', label: 'All Voices (8)' },
                  { id: 'parent', label: 'Parents (5)' },
                  { id: 'educator', label: 'Educators (3)' },
                ] as const
              ).map((tab) => {
                const isActive = activeRoleFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveRoleFilter(tab.id)}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#1C1917] text-[#FAF7F2]'
                        : 'text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quantitative Impact Strip — Minimalist Archival Hairline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[#92400E]">
              Early Childhood · Ages 3–6
            </div>
            <div
              className="text-3xl sm:text-4xl font-normal text-[#1C1917] tabular-nums"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              94%
            </div>
            <div className="text-xs font-semibold text-[#1C1917]">
              Calmer Bedtime Transitions
            </div>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Parents &amp; early childhood educators report reduced evening
              restlessness within two weeks of switching to 2100K acoustic
              storytelling.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[#92400E]">
              Middle Childhood · Ages 8–12
            </div>
            <div
              className="text-3xl sm:text-4xl font-normal text-[#1C1917] tabular-nums"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              3.4×
            </div>
            <div className="text-xs font-semibold text-[#1C1917]">
              Deeper Historical Retention
            </div>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Tweens using the Ancient Archive timeline &amp; root lens retain
              geographical and cultural context at over triple the rate of cartoon
              summaries.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[#4A5D4E]">
              Adolescence · Ages 13–18
            </div>
            <div
              className="text-3xl sm:text-4xl font-normal text-[#1C1917] tabular-nums"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              89%
            </div>
            <div className="text-xs font-semibold text-[#1C1917]">
              Sustained Teen Engagement
            </div>
            <p className="text-xs text-[#57534E] leading-relaxed">
              High schoolers remain active in Safe Harbor after 6 months—citing
              zero-knowledge privacy and non-judgmental Socratic seminars.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[#92400E]">
              Longitudinal Span · Ages 3–18
            </div>
            <div
              className="text-3xl sm:text-4xl font-normal text-[#1C1917] tabular-nums"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              15 Yrs
            </div>
            <div className="text-xs font-semibold text-[#1C1917]">
              Continuity Across Life Stages
            </div>
            <p className="text-xs text-[#57534E] leading-relaxed">
              One cohesive architecture that matures alongside the child from
              preschool wonder to pre-college philosophical synthesis.
            </p>
          </div>
        </div>

        {/* Secondary Stage Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: 'all', label: 'All Stages (Ages 3–18)' },
                { id: 'bedtime', label: '01. Bedtime Sanctuary (Ages 3–6)' },
                { id: 'archive', label: '02. Ancient Archive (Ages 8–12)' },
                { id: 'harbor', label: '03. Safe Harbor (Ages 13–18)' },
                { id: 'multi-child', label: 'Multi-Stage Households' },
              ] as const
            ).map((stage) => {
              const active = activeStageFilter === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStageFilter(stage.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#1C1917] text-[#FAF7F2]'
                      : 'bg-[#F2ECE1] text-[#44403C] border border-[#E5DEC9] hover:text-[#1C1917]'
                  }`}
                >
                  {stage.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-[#57534E] tabular-nums">
            Showing {filteredTestimonials.length} of {TESTIMONIALS.length} verified
            field accounts
          </div>
        </div>

        {/* Minimalist Editorial Testimonial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {filteredTestimonials.map((item) => {
            const isEducator = item.roleType === 'educator';

            return (
              <article
                key={item.id}
                className="lg:col-span-6 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 sm:p-8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-5">
                  {/* Top Unboxed Typographic Metadata Line (Zero Static Pill Clutter) */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-[#E5DEC9] text-xs">
                    <div className="flex flex-wrap items-center gap-2 font-mono uppercase tracking-wider text-[#4A5D4E] font-semibold">
                      {isEducator ? (
                        <GraduationCap className="w-3.5 h-3.5 text-[#92400E] shrink-0" />
                      ) : (
                        <HeartHandshake className="w-3.5 h-3.5 text-[#4A5D4E] shrink-0" />
                      )}
                      <span>{item.roleBadgeLabel}</span>
                      <span aria-hidden="true" className="text-[#A8A29E]">
                        ·
                      </span>
                      <span className="text-[#92400E]">{item.ageSpanServed}</span>
                      <span aria-hidden="true" className="text-[#A8A29E]">
                        ·
                      </span>
                      <span className="text-[#57534E]">{item.stageLabel}</span>
                    </div>

                    <Quote className="w-4 h-4 text-[#D97706]/50 shrink-0" />
                  </div>

                  {/* Primary Editorial Quote */}
                  <blockquote
                    className="text-lg sm:text-xl font-normal text-[#1C1917] leading-[1.6]"
                    style={{ fontFamily: 'var(--font-display), serif' }}
                  >
                    “{item.quote}”
                  </blockquote>

                  {/* Before -> Observed Impact Architectural Strip */}
                  <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E5DEC9] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#78716C]">
                        Prior Challenge
                      </div>
                      <p className="text-[#57534E] leading-relaxed">
                        {item.beforeState}
                      </p>
                    </div>
                    <div className="space-y-1 sm:border-l sm:border-[#E5DEC9] sm:pl-4">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#4A5D4E] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#4A5D4E] shrink-0" />
                        <span>Observed Impact</span>
                      </div>
                      <p className="text-[#1C1917] font-medium leading-relaxed">
                        {item.observedImpact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Attribution Footer & Stage Action */}
                <div className="pt-4 border-t border-[#E5DEC9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-[#1C1917]">
                      {item.authorName}
                    </div>
                    <div className="text-xs text-[#57534E]">
                      {item.authorCredentials} · {item.location} ·{' '}
                      <span className="font-mono text-[11px] text-[#92400E]">
                        {item.durationUsed}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenJourneyModal(item.tierTarget)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#92400E] hover:text-[#D97706] transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
                  >
                    <span>Explore {item.stageLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
