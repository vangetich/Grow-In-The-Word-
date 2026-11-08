'use client';

import React, {useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {ChevronDown, ShieldCheck} from 'lucide-react';

interface FaqItem {
  id: string;
  index: string;
  category: 'methodology' | 'privacy' | 'household';
  categoryLabel: string;
  question: string;
  answer: string;
  technicalNote: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    index: '01',
    category: 'methodology',
    categoryLabel: 'Methodology & Pedagogy',
    question:
      'How does the app teach scripture without coercion, moralism, or cartoon clichés?',
    answer:
      'Many children’s Bible apps flatten ancient texts into simplistic "be a good kid" fables wrapped in loud animations—which children inevitably outgrow or reject by adolescence. Our methodology treats scripture as a living literary and historical sanctuary. In Bedtime Sanctuary (3–7), we focus on emotional safety, acoustic beauty, and open-ended wonder questions. In Historical Archive (8–12), we introduce real Near Eastern geography, archaeology, and Hebrew/Greek root words. In Safe Harbor (13–18), we invite Socratic dialogue around lament, ethics, and doubt so young people build a resilient faith they genuinely own.',
    technicalNote:
      'Curriculum reviewed by developmental psychologists & Ancient Near Eastern historians',
  },
  {
    id: 'faq-2',
    index: '02',
    category: 'privacy',
    categoryLabel: 'Teen Privacy & Cryptography',
    question:
      'Are Teen Safe Harbor journals truly private from parents and youth leaders?',
    answer:
      'Yes, unconditionally. Developmental research shows that teenagers will not wrestle honestly with hard spiritual or ethical questions if they suspect their reflections are being monitored. When a teen account is created (or when a child transitions into Safe Harbor at age 13), their personal commonplace journal is encrypted locally on their device using AES-256-GCM before sync. Parents can see that the app is active, but neither parents nor our servers possess the decryption key to read their private entries.',
    technicalNote:
      'Zero-Knowledge Client-Side Encryption (PBKDF2 + AES-256-GCM) · Zero ad trackers',
  },
  {
    id: 'faq-3',
    index: '03',
    category: 'household',
    categoryLabel: 'Longitudinal Age Transitions',
    question:
      'What happens when my child grows from one age tier into the next?',
    answer:
      'Nothing is ever lost or reset. When a seven-year-old turns eight, their sanctuary gently unlocks the Historical Archive layer while preserving their favorite bedtime audio stories. When a twelve-year-old turns thirteen, they are invited into the "Open Door" intake check to calibrate their Safe Harbor seminar depth and private vault passphrase. By age eighteen, they can export a fifteen-year personal archive of their highlights, historical notes, and reflections as a keepsake book or Markdown vault.',
    technicalNote:
      'Continuous 15-Year Longitudinal Profile · 1-Click PDF / Markdown Export',
  },
  {
    id: 'faq-4',
    index: '04',
    category: 'methodology',
    categoryLabel: 'Theological & Historical Posture',
    question:
      'Which biblical translation and theological tradition does the platform follow?',
    answer:
      'Our primary text pairs readable literary English with an inline Hebrew, Aramaic, and Greek root lexicon so readers can inspect the original metaphors behind words like Chesed (covenant loyalty), Ruach (breath/spirit), and Shalom (wholeness). On contested theological or philosophical questions in Safe Harbor, our seminar notes present primary historical perspectives side by side with intellectual humility—showing how thoughtful believers across centuries have wrestled with the text rather than forcing a single partisan script.',
    technicalNote:
      'Interlinear Hebrew (Masoretic / DSS) & Greek (NA28) Lexical Apparatus',
  },
  {
    id: 'faq-5',
    index: '05',
    category: 'privacy',
    categoryLabel: 'Peer Community Safety',
    question:
      'How are the teen peer discussion roundtables moderated for safety?',
    answer:
      'Safe Harbor’s peer roundtables are the exact opposite of algorithm-driven social media. There are no public profiles, no follower counts, no direct messaging between users, and no popularity leaderboards. Teens respond pseudonymously (e.g., "Elena · Age 16") to structured Socratic prompts on a specific passage, and every reflection is reviewed by trained youth theologians and developmental educators before appearing in the seminar feed.',
    technicalNote:
      '100% Pre-Moderated Socratic Roundtables · Zero DMs or Social Metrics',
  },
  {
    id: 'faq-6',
    index: '06',
    category: 'household',
    categoryLabel: 'Household Membership & Billing',
    question:
      'Can one household account support multiple children across different tiers simultaneously?',
    answer:
      'Yes. A single household membership includes up to five individualized reader profiles across ages 3 to 18. You can have a four-year-old listening to 2100K cello-backed stories in Bedtime Sanctuary, a ten-year-old exploring Iron Age timelines in Historical Archive, and a sixteen-year-old journaling in Safe Harbor under one family plan—with a full 30-day unhurried trial and zero credit card required to begin.',
    technicalNote:
      'Up to 5 Reader Profiles Included · COPPA-Compliant Family Stewardship',
  },
];

interface FaqSectionProps {
  onOpenJourneyModal: (defaultTier?: 'bedtime' | 'archive' | 'harbor') => void;
}

export default function FaqSection({onOpenJourneyModal}: FaqSectionProps) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true,
  });
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'methodology' | 'privacy' | 'household'
  >('all');

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs =
    selectedCategory === 'all'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="faq"
      className="py-20 lg:py-28 border-b border-[#E5DEC9] bg-[#F2ECE1]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header & Category Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#E5DEC9]">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[#92400E]">
              <span>Methodology, Architecture & Privacy FAQ</span>
              <span aria-hidden="true">·</span>
              <span>Transparent Answers for Parents & Teens</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1C1917]"
              style={{
                fontFamily: 'var(--font-display), serif',
                textWrap: 'balance',
              }}
            >
              Common questions on our pedagogy, transitions, and privacy.
            </h2>

            <p className="text-base text-[#44403C] leading-relaxed">
              We believe trust begins with transparency. Explore how our
              curriculum honors every stage of development while safeguarding
              your family’s data and your teenager’s intellectual honesty.
            </p>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div
            role="group"
            aria-label="Filter FAQ by topic"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#FAF7F2] border border-[#E5DEC9] rounded-xl w-fit"
          >
            {[
              {id: 'all', label: 'All Questions (6)'},
              {id: 'methodology', label: 'Methodology'},
              {id: 'privacy', label: 'Privacy & Security'},
              {id: 'household', label: 'Age Transitions'},
            ].map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(
                      cat.id as 'all' | 'methodology' | 'privacy' | 'household'
                    )
                  }
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#1C1917] text-[#FAF7F2]'
                      : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#F2ECE1]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion List */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-3">
            {filteredFaqs.map((item) => {
              const isOpen = !!openIds[item.id];
              return (
                <div
                  key={item.id}
                  className="rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] overflow-hidden transition-colors hover:border-[#D97706]/60"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D97706]"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-[#92400E]">
                        <span
                          className="font-mono font-semibold tabular-nums"
                          style={{fontFamily: 'var(--font-mono), monospace'}}
                        >
                          {item.index}.
                        </span>
                        <span>{item.categoryLabel}</span>
                      </div>

                      <h3
                        className="text-lg sm:text-xl font-normal text-[#1C1917] leading-snug"
                        style={{fontFamily: 'var(--font-display), serif'}}
                      >
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`mt-1 p-1.5 rounded-lg border transition-transform duration-200 shrink-0 ${
                        isOpen
                          ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] rotate-180'
                          : 'bg-[#F2ECE1] text-[#57534E] border-[#E5DEC9]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${item.id}`}
                        initial={{height: 0, opacity: 0}}
                        animate={{height: 'auto', opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{
                          duration: 0.22,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-[#E5DEC9]/70 space-y-3">
                          <p className="text-sm sm:text-[15px] text-[#44403C] leading-[1.7] max-w-[68ch]">
                            {item.answer}
                          </p>

                          <div
                            className="pt-2 text-xs font-mono text-[#92400E] tabular-nums"
                            style={{fontFamily: 'var(--font-mono), monospace'}}
                          >
                            Architecture Guarantee: {item.technicalNote}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right 4 Columns: Integrity & Privacy Summary Card */}
          <aside className="lg:col-span-4 rounded-xl bg-[#1C1917] text-[#FAF7F2] border border-[#292524] p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FBBF24]">
              <ShieldCheck className="w-4 h-4" />
              <span>Our Unconditional Integrity Charter</span>
            </div>

            <h3
              className="text-2xl font-normal text-[#FAF7F2] leading-snug"
              style={{fontFamily: 'var(--font-display), serif'}}
            >
              Built like a private linen journal, never an ad network.
            </h3>

            <p className="text-xs sm:text-sm text-[#D6D3D1] leading-relaxed">
              We are 100% funded by household memberships—never by selling
              family data, profiling adolescent doubts, or running third-party
              ad trackers.
            </p>

            <div className="pt-4 border-t border-[#292524] space-y-2.5 text-xs text-[#E7E5E4]">
              <div>· Zero behavioral advertising or data brokers</div>
              <div>· Local AES-256-GCM encryption on Teen Safe Harbor vaults</div>
              <div>· Full 15-year data portability (Markdown & PDF export)</div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenJourneyModal()}
                className="w-full py-3 px-5 rounded-lg bg-[#D97706] hover:bg-[#F59E0B] text-xs font-semibold text-[#1C1917] transition-colors cursor-pointer"
              >
                Explore the ‘Open Door’ Intake Flow
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
