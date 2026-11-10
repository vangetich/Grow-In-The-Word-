'use client';

import React, {useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {Quote, Star, ShieldCheck, Heart, Sparkles, ChevronLeft, ChevronRight} from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  parentName: string;
  role: string;
  childrenAges: string;
  highlightTheme: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote:
      'For years, we struggled with children’s Bible apps that felt like loud cartoon video games with moralistic lessons tacked on. Grow In The Word is an absolute breath of fresh air. My seven-year-old listens to the 2100K bedtime psalms every single night with absolute peace, and my fifteen-year-old actually respects the Safe Harbor journal because she knows her privacy is mathematically secured.',
    parentName: 'Sarah & David M.',
    role: 'Parents of three (Ages 7, 11, 15)',
    childrenAges: 'Ages 3–18 Household Membership',
    highlightTheme: 'Unhurried Formation & Privacy',
    rating: 5,
  },
  {
    id: 'test-2',
    quote:
      'As a youth pastor and father, I was deeply weary of Christian media that tries to manipulate teens with emotional coercion or shallow answers. The Historical Archive and Safe Harbor modules treat young people with intellectual dignity. They don’t shy away from hard questions about doubt, lament, and archaeology—they provide the actual historical context.',
    parentName: 'Marcus V.',
    role: 'High School Theology Teacher & Father',
    childrenAges: 'Ages 13–18 Teen Horizon',
    highlightTheme: 'Intellectual Rigor & Zero Coercion',
    rating: 5,
  },
  {
    id: 'test-3',
    quote:
      'The transition from bedtime stories to the Iron Age historical map felt completely natural for our son. He loves inspecting Hebrew root words and exploring the real Near Eastern archaeological coordinates. There are no gimmicks, no annoying pop-ups, and no advertising. It feels like stepping into a quiet library designed with profound reverence.',
    parentName: 'Elena R.',
    role: 'Homeschooling Mother of Two',
    childrenAges: 'Ages 8–12 Tween Archive',
    highlightTheme: 'Calm Sanctuary & Archaeological Truth',
    rating: 5,
  },
];

interface ParentEndorsementsSectionProps {
  onOpenJourneyModal: (defaultTier?: 'bedtime' | 'archive' | 'harbor') => void;
}

export default function ParentEndorsementsSection({
  onOpenJourneyModal,
}: ParentEndorsementsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      id="parent-endorsements"
      className="py-20 lg:py-28 border-b border-[#E5DEC9] bg-[#FAF7F2] dark:bg-[#1A1A1A] transition-colors"
    >
      <div className="max-w-[1280px] mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5DEC9] dark:border-[#36312E]">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#92400E] dark:text-[#FBBF24]">
              <Heart className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Parent Endorsements &amp; Family Stories</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1C1917] dark:text-[#F9F6F0]"
              style={{fontFamily: 'var(--font-display), serif', textWrap: 'balance'}}
            >
              Trusted by parents and educators seeking faith without friction.
            </h2>

            <p className="text-sm sm:text-base text-[#44403C] dark:text-[#D6D3D1] leading-relaxed">
              Read authentic reflections from households experiencing a decade-spanning ecosystem designed to help children wrestle with scripture with zero coercion.
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous endorsement"
              className="w-11 h-11 rounded-xl bg-[#F2ECE1] hover:bg-[#EAE4D5] dark:bg-[#292524] dark:hover:bg-[#36312E] border border-[#E5DEC9] dark:border-[#36312E] flex items-center justify-center text-[#1C1917] dark:text-[#F9F6F0] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-xs font-mono text-[#57534E] dark:text-[#A8A29E] px-2">
              {currentIndex + 1} / {TESTIMONIALS.length}
            </div>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next endorsement"
              className="w-11 h-11 rounded-xl bg-[#F2ECE1] hover:bg-[#EAE4D5] dark:bg-[#292524] dark:hover:bg-[#36312E] border border-[#E5DEC9] dark:border-[#36312E] flex items-center justify-center text-[#1C1917] dark:text-[#F9F6F0] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Testimonial Card Display with AnimatePresence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -12}}
                transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
                className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#24211E] border border-[#E5DEC9] dark:border-[#36312E] shadow-sm relative overflow-hidden space-y-6"
              >
                <div className="absolute top-6 right-6 text-[#D97706]/15 dark:text-[#D97706]/20 pointer-events-none">
                  <Quote className="w-20 h-20" />
                </div>

                <div className="flex items-center gap-1.5">
                  {Array.from({length: current.rating}).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
                  ))}
                  <span className="ml-2 text-xs font-mono font-semibold text-[#92400E] dark:text-[#FBBF24] bg-[#D97706]/10 px-2.5 py-0.5 rounded-full border border-[#D97706]/20">
                    {current.highlightTheme}
                  </span>
                </div>

                <blockquote
                  className="text-lg sm:text-xl lg:text-2xl font-normal text-[#1C1917] dark:text-[#F9F6F0] leading-relaxed relative z-10"
                  style={{fontFamily: 'var(--font-display), serif'}}
                >
                  “{current.quote}”
                </blockquote>

                <div className="pt-6 border-t border-[#E5DEC9] dark:border-[#36312E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-[#1C1917] dark:text-[#F9F6F0]">
                      {current.parentName}
                    </div>
                    <div className="text-xs text-[#57534E] dark:text-[#A8A29E]">
                      {current.role} · <span className="font-mono text-[#D97706]">{current.childrenAges}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#047857] dark:text-[#34D399] bg-[#10B981]/10 px-3 py-1.5 rounded-lg border border-[#10B981]/25 w-fit">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified Household Membership</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-[#D97706]' : 'w-2 bg-[#E5DEC9] dark:bg-[#36312E]'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side Stats & Call to Action */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-[#F2ECE1] dark:bg-[#292524] border border-[#E5DEC9] dark:border-[#36312E] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#92400E] dark:text-[#FBBF24]">
                <Sparkles className="w-4 h-4 text-[#D97706]" />
                <span>Zero Coercion Guarantee</span>
              </div>

              <h3
                className="text-xl font-normal text-[#1C1917] dark:text-[#F9F6F0]"
                style={{fontFamily: 'var(--font-display), serif'}}
              >
                Why families choose unhurried formation
              </h3>

              <p className="text-xs sm:text-sm text-[#44403C] dark:text-[#D6D3D1] leading-relaxed">
                Our curriculum respects children as thoughtful human beings. No artificial point streaks that induce anxiety, no guilt tactics, and absolute privacy for adolescent wrestling.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenJourneyModal('bedtime')}
                  className="w-full py-3 px-4 rounded-xl bg-[#1C1917] hover:bg-[#D97706] text-[#FAF7F2] hover:text-[#1A1A1A] text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  Start 30-Day Unhurried Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
