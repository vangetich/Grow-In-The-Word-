'use client';

import React, {useState} from 'react';
import {
  Compass,
  Shield,
  BookOpen,
  Users,
  CheckCircle2,
  Heart,
  Scale,
  Sparkles,
  ArrowRight,
  Scroll,
  Lock,
} from 'lucide-react';

interface MissionAboutSectionProps {
  onOpenJourneyModal?: (defaultTier?: 'bedtime' | 'archive' | 'harbor') => void;
}

export default function MissionAboutSection({
  onOpenJourneyModal,
}: MissionAboutSectionProps) {
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);

  const pillars = [
    {
      id: 'non-coercive',
      icon: Scale,
      kicker: 'Pillar 01 · Pedagogical Integrity',
      title: 'Non-Coercive Theological Exploration',
      tagline: 'Faith nurtured through unforced wonder, never fear, guilt, or behavioral streaks.',
      body: 'Traditional youth faith media often relies on manipulative psychological levers: fear of missing out, dopamine-spiked gamification streaks, and punitive guilt mechanics. We reject this entirely. Grow In The Word approaches scripture with intellectual humility and theological gentleness, presenting ancient texts in their authentic literary genres and inviting children and teenagers to ask hard questions without threat of condemnation.',
      commitments: [
        'Zero gamified panic mechanics (no loss-aversion streaks or artificial urgency)',
        'Honest engagement with ancient laments, doubts, and unresolved questions',
        'Transparent linguistic root peeks (Hebrew Dabar, Greek Logos) rather than dogmatic oversimplifications',
        'Respect for each child’s developmental autonomy and natural spiritual pace',
      ],
      ageApplication: 'At age 4, this looks like peaceful bedtime wonder; at age 16, it looks like honest wrestling with existential grief in our Safe Harbor table.',
    },
    {
      id: 'archaeological',
      icon: Scroll,
      kicker: 'Pillar 02 · Historical Literacy',
      title: 'Real Archaeology Over Cartoon Caricatures',
      tagline: 'Grounded in Near Eastern history, Levantine topography, and ancient manuscript strata.',
      body: 'When children are taught biblical narratives as cartoon fables with smiling neon dinosaurs, their faith frequently shatters upon first contact with high school biology, ancient history, or university literature courses. We treat young minds with dignity by anchoring every passage in verified Ancient Near Eastern material culture: clay cuneiform treaty tablets, archaeological coordinates, and historical timelines that withstand mature scrutiny.',
      commitments: [
        'Real Near Eastern archaeological layers (Assyrian, Babylonian, Persian, Roman)',
        'Original language lexicons with pronunciation, cultural artifacts, and root metaphors',
        'Objective historical timelines vetted by academic Near Eastern scholars',
        'A lasting intellectual foundation that never needs to be painfully "unlearned"',
      ],
      ageApplication: 'Tweens (ages 8–12) explore Hezekiah’s Tunnel and Dead Sea Scroll manuscripts as capable junior historians, not passive spectators.',
    },
    {
      id: 'privacy',
      icon: Lock,
      kicker: 'Pillar 03 · Zero-Surveillance Sanctuary',
      title: 'Zero-Surveillance Youth Privacy & Client-Side Encryption',
      tagline: 'A sacred, confidential room for teenagers to articulate doubt and sorrow safely.',
      body: 'Adolescents will never write their true questions, moral anxieties, or spiritual grief into a software platform if they suspect their parents, church staff, or third-party advertisers have a backend dashboard monitoring their thoughts. Safe Harbor provides client-side zero-knowledge encrypted vaults. What a teenager writes in their personal lament journal is mathematically indecipherable to our servers and inaccessible to parents.',
      commitments: [
        'Client-side zero-knowledge encryption on all private reflections and questions',
        'No behavioral ad tracking, telemetry profiling, or data brokerage—ever',
        'Theologian-moderated peer tables with strict safety boundaries and anonymous handles',
        'A sanctuary that respects the adolescent conscience as sacred ground',
      ],
      ageApplication: 'Teens (ages 13–18) find a confidential safe harbor where authentic wrestling is honored rather than policed.',
    },
    {
      id: 'family-table',
      icon: Users,
      kicker: 'Pillar 04 · Intergenerational Partnership',
      title: 'Equipping the Family Table, Not Replacing It',
      tagline: 'Digital tools designed to extinguish themselves at dinner time.',
      body: 'Our technology exists to ignite face-to-face family conversations, not to monopolize screen time. Instead of giving parents a surveillance feed of their children’s clicks, we provide parents with the "Conversation Bridge"—timely, thought-provoking dinner table starters and bedtime litanies tailored to what their child is exploring, bridging generational wisdom and childhood wonder.',
      commitments: [
        'Developmentally staged parent guidance without invasive monitoring',
        'Unrushed dinner table discussion prompts designed for mixed-age households',
        'Bedtime liturgy audio streams that soothe the nervous system into restorative sleep',
        'Restoring the household as the primary sanctuary of spiritual warmth and trust',
      ],
      ageApplication: 'Parents transition gracefully from whispering bedtime blessings at age 3 to engaging in philosophical dialogue over dinner at age 17.',
    },
  ];

  const activePillar = pillars[activePillarIndex];
  const ActiveIcon = activePillar.icon;

  return (
    <section
      id="our-mission"
      className="w-full max-w-full overflow-hidden py-20 lg:py-28 border-b border-[#E5DEC9] bg-[#FAF7F2] transition-colors"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 space-y-16">
        {/* Section Header: Bold, Editorial, High-End */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#4A5D4E]">
            <Compass className="w-4 h-4 text-[#D97706]" />
            <span>Our Mission &amp; Architectural Constitution</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1C1917] leading-[1.12]"
            style={{fontFamily: 'var(--font-display), serif'}}
          >
            An honest, safe, and non-coercive environment for lifelong faith formation.
          </h2>
          <p className="text-base sm:text-lg text-[#44403C] leading-relaxed">
            Grow In The Word was founded on a simple conviction: children and adolescents
            do not need cartoon caricatures or emotional manipulation. They deserve the
            sublime depth of ancient scripture, authentic historical grounding, and the
            sacred dignity to explore faith without fear.
          </p>
        </div>

        {/* The 4 Architectural Pillars: Interactive Tabbed Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 4 Pillar Selectors */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#78716C] block px-1">
              Core Principles of Our Sanctuary (Click to Inspect)
            </span>
            {pillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              const isActive = activePillarIndex === idx;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActivePillarIndex(idx)}
                  className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                    isActive
                      ? 'bg-[#1C1917] text-[#FAF7F2] border-[#D97706] shadow-sm ring-1 ring-[#D97706]/40'
                      : 'bg-[#F9F6F0] text-[#1C1917] border-[#E5DEC9] hover:border-[#D97706]/60 hover:bg-[#F2ECE1]/60'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                      isActive
                        ? 'bg-[#D97706] text-[#1A1A1A] border-[#D97706]'
                        : 'bg-[#F2ECE1] text-[#92400E] border-[#E5DEC9]'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-[10.5px] font-mono uppercase tracking-wider font-semibold ${
                        isActive ? 'text-[#FBBF24]' : 'text-[#92400E]'
                      }`}
                    >
                      {pillar.kicker.split('·')[0].trim()}
                    </div>
                    <div
                      className="text-base font-semibold mt-0.5"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      {pillar.title}
                    </div>
                    <p
                      className={`text-xs mt-1 leading-snug line-clamp-2 ${
                        isActive ? 'text-[#D6D3D1]' : 'text-[#57534E]'
                      }`}
                    >
                      {pillar.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Pillar Focus Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#F9F6F0] border border-[#E5DEC9] p-6 sm:p-10 space-y-6 shadow-xs">
              <div className="space-y-2 border-b border-[#E5DEC9] pb-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#92400E] uppercase tracking-wider">
                  <ActiveIcon className="w-4 h-4 text-[#D97706]" />
                  <span>{activePillar.kicker}</span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-normal text-[#1C1917]"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  {activePillar.title}
                </h3>
                <p className="text-sm font-medium text-[#D97706]">
                  {activePillar.tagline}
                </p>
              </div>

              <div className="text-sm sm:text-base text-[#44403C] leading-relaxed space-y-4">
                <p>{activePillar.body}</p>
              </div>

              {/* Concrete Commitments */}
              <div className="p-5 rounded-2xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#4A5D4E] font-semibold">
                  Our Inviolable Commitments:
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#1C1917]">
                  {activePillar.commitments.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Age Application Note */}
              <div className="pt-2 border-t border-[#E5DEC9] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#57534E]">
                <div className="space-y-0.5">
                  <span className="font-semibold text-[#92400E]">
                    Developmental Spectrum in Practice:
                  </span>
                  <p className="font-sans text-xs text-[#44403C] leading-relaxed">
                    {activePillar.ageApplication}
                  </p>
                </div>

                {onOpenJourneyModal && (
                  <button
                    type="button"
                    onClick={() => onOpenJourneyModal('bedtime')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1C1917] text-[#FAF7F2] hover:bg-[#D97706] hover:text-[#1A1A1A] font-semibold transition-colors shrink-0 cursor-pointer shadow-2xs"
                  >
                    <span>Begin Experience</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 15-Year Formative Horizon Summary Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#1C1917] text-[#FAF7F2] border border-[#2E2925] relative overflow-hidden shadow-sm">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#D97706]/10 blur-3xl"
          />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FBBF24] font-semibold">
              The 15-Year Horizon (Ages 3 to 18)
            </span>
            <h3
              className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight"
              style={{fontFamily: 'var(--font-display), serif'}}
            >
              Growing with your child from unhurried bedtime wonder into resilient, adult conviction.
            </h3>
            <p className="text-sm sm:text-base text-[#D6D3D1] leading-relaxed">
              We accompany children across three distinct developmental horizons: Bedtime
              Sanctuary (ages 3–7), Ancient Archive (ages 8–12), and Safe Harbor (ages 13–18).
              At each transition, the visual language matures, the textual nuance deepens,
              and the room for honest questioning expands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
