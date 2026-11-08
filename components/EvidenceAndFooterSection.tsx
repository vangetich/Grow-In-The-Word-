'use client';

import React from 'react';
import {ArrowRight, ShieldCheck} from 'lucide-react';
import FaithFormationNewsletter from '@/components/FaithFormationNewsletter';
import ReturnFromInactivityGreeting from '@/components/ReturnFromInactivityGreeting';

interface EvidenceAndFooterSectionProps {
  onOpenJourneyModal: (defaultTier?: 'bedtime' | 'archive' | 'harbor') => void;
}

export default function EvidenceAndFooterSection({
  onOpenJourneyModal,
}: EvidenceAndFooterSectionProps) {
  const advisoryEndorsements = [
    {
      quote:
        'Adolescents rarely walk away from faith because ancient texts are too complex; they walk away because they were handed fragile, cartoon caricatures that shatter on first contact with history or personal grief. The Safe Harbor’s guided discussions and raw biblical laments treat teenagers with genuine dignity.',
      author: 'Prof. Elias Thorne, Ph.D.',
      role: 'Chair of Adolescent Developmental Psychology',
      organization: 'Advisory Fellow, Center for Youth Formation',
      metric: '3.4× Higher Voluntary Teen Journaling Depth vs. Gamified Apps',
    },
    {
      quote:
        'The Ancient Archive tier is a triumph of visual restraint. By pairing interactive cross-civilization timelines and primary Hebrew lexical roots with real Levantine topography, Grow In The Word invites eight-to-twelve-year-olds into deep historical literacy without a hint of condescension.',
      author: 'Dr. Miriam Al-Mansoor',
      role: 'Curator of Ancient Near Eastern Manuscripts',
      organization: 'Editorial & Archaeological Review Board',
      metric: '420+ Verified Timeline Events & Archival Field Notes',
    },
  ];

  return (
    <>
      {/* Scholarly & Developmental Advisory Board Endorsements */}
      <section className="py-16 lg:py-20 border-b border-[#E5DEC9] bg-[#F9F6F0]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5DEC9]">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-medium text-[#4A5D4E]">
                <span>Academic & Theological Review Board</span>
                <span aria-hidden="true">·</span>
                <span>Peer-Reviewed Curriculum Architecture</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-normal tracking-tight text-[#1A1A1A]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Vetted by developmental psychologists and Near Eastern
                historians.
              </h3>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {advisoryEndorsements.map((item) => (
              <article
                key={item.author}
                className="rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 sm:p-8 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div
                    className="text-xs font-mono text-[#92400E] tabular-nums pb-3 border-b border-[#E5DEC9]"
                    style={{fontFamily: 'var(--font-mono), monospace'}}
                  >
                    {item.metric}
                  </div>
                  <blockquote
                    className="text-base text-[#1A1A1A] leading-relaxed"
                    style={{fontFamily: 'var(--font-display), serif'}}
                  >
                    “{item.quote}”
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-[#E5DEC9] text-xs space-y-0.5">
                  <div className="font-semibold text-[#1A1A1A]">
                    {item.author}
                  </div>
                  <div className="text-[#44403C]">{item.role}</div>
                  <div className="text-[#78716C]">{item.organization}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Faith Formation Insights Newsletter Subscription */}
      <FaithFormationNewsletter />

      {/* Section 4: Call to Action (CTA) & Footer Anchor — Final Conversion Banner */}
      <section
        id="final-cta-banner"
        className="py-20 lg:py-28 bg-[#1A1A1A] text-[#F9F6F0] border-b border-[#292524]"
      >
        <div className="max-w-[1040px] mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D97706]">
            <span>Grow In The Word</span>
            <span aria-hidden="true">·</span>
            <span>The Core Integrity Guarantee</span>
          </div>

          {/* Exact Requested Banner Copy */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#F9F6F0] leading-[1.15]"
            style={{
              fontFamily: 'var(--font-display), serif',
              textWrap: 'balance',
            }}
          >
            “Whether you’re starting at age 4 or discovering this at age 15,
            there is a place for you here.”
          </h2>

          {/* Final Action Button: [ Create Your Free Account ] */}
          <div className="pt-2 flex flex-col items-center justify-center space-y-5">
            <button
              type="button"
              onClick={() => onOpenJourneyModal()}
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-semibold text-[#1A1A1A] bg-[#D97706] hover:bg-[#F59E0B] hover:ring-2 hover:ring-[#F9F6F0]/60 active:scale-[0.985] rounded-full transition-all duration-200 shadow-lg cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#F9F6F0]"
            >
              <span>Create Your Free Account</span>
              <ArrowRight className="w-4 h-4 text-[#1A1A1A] transition-transform duration-150 group-hover:translate-x-1" />
            </button>

            {/* Exact Requested Trust Microcopy */}
            <div className="max-w-xl mx-auto px-5 py-3 rounded-xl bg-[#292524]/90 border border-[#36312E] flex items-center justify-center gap-2.5 text-xs sm:text-sm text-[#E7E5E4]">
              <ShieldCheck className="w-4 h-4 text-[#D97706] shrink-0" />
              <span>
                No hidden fees. Zero manipulative notifications. Teen journals
                are encrypted and 100% private from day one.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Editorial Footer */}
      <footer className="bg-[#F9F6F0] text-[#57534E] py-12">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div
              className="text-xl font-semibold text-[#1A1A1A]"
              style={{fontFamily: 'var(--font-display), serif'}}
            >
              Grow In The Word
            </div>
            <p className="text-xs text-[#78716C]">
              An Open Space for Ancient History & Real Life (Ages 3 to 18) ·
              Public Landing Page & UI/UX Brand Specification
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#57534E]">
            <a
              href="#three-tier-grid"
              className="hover:text-[#1A1A1A] transition-colors"
            >
              Three-Tier Grid
            </a>
            <a
              href="#semantic-search"
              className="hover:text-[#1A1A1A] transition-colors"
            >
              Search Archive
            </a>
            <a
              href="#age-evolution"
              className="hover:text-[#1A1A1A] transition-colors"
            >
              Age Progression
            </a>
            <a
              href="#evidence"
              className="hover:text-[#1A1A1A] transition-colors"
            >
              Parent Stories
            </a>
            <a
              href="#design-spec"
              className="hover:text-[#1A1A1A] transition-colors"
            >
              Design & Copy Spec
            </a>
            <a href="#faq" className="hover:text-[#1A1A1A] transition-colors">
              FAQ
            </a>
            <button
              type="button"
              onClick={() => onOpenJourneyModal()}
              className="text-[#92400E] hover:underline underline-offset-4 cursor-pointer"
            >
              Create Your Free Account
            </button>
          </div>
        </div>

        {/* Return from Inactivity (7+ Days) Gentle Welcome Toast in Footer */}
        <div className="max-w-[1280px] mx-auto px-6 mt-6 pb-8">
          <ReturnFromInactivityGreeting />
        </div>
      </footer>
    </>
  );
}
