'use client';

import React, {useState} from 'react';
import {ArrowRight, CheckCircle2, Mail, BookOpen} from 'lucide-react';

export default function FaithFormationNewsletter() {
  const [email, setEmail] = useState('');
  const [selectedStages, setSelectedStages] = useState<
    Record<'early' | 'tween' | 'teen', boolean>
  >({
    early: true,
    tween: true,
    teen: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSampleDispatch, setShowSampleDispatch] = useState(false);

  const toggleStage = (stageKey: 'early' | 'tween' | 'teen') => {
    setSelectedStages((prev) => ({
      ...prev,
      [stageKey]: !prev[stageKey],
    }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      setErrorMessage(
        'Please enter a valid email address (e.g., parent@household.com).'
      );
      return;
    }
    setErrorMessage('');
    setIsSubscribed(true);
  };

  return (
    <section
      id="faith-formation-insights"
      aria-labelledby="newsletter-heading"
      className="py-20 lg:py-24 border-b border-[#E5DEC9] bg-[#FAF7F2]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns: Editorial Proposition & Sample Dispatch Preview */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#92400E]">
                <span>Faith Formation Insights</span>
                <span aria-hidden="true">·</span>
                <span>Weekly Sunday Evening Letter for Parents</span>
                <span aria-hidden="true">·</span>
                <span>4-Minute Read</span>
              </div>

              <h2
                id="newsletter-heading"
                className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1C1917]"
                style={{
                  fontFamily: 'var(--font-display), serif',
                  textWrap: 'balance',
                }}
              >
                Quiet weekly reflections for raising thoughtful children.
              </h2>

              <p className="text-base text-[#44403C] leading-relaxed max-w-[62ch]">
                Every Sunday evening, our historians, developmental
                psychologists, and theologians send one unhurried essay to help
                you navigate bedtime wonder, tween historical curiosity, and
                adolescent questions at the dinner table—with zero spam or
                inbox clutter.
              </p>

              {/* Expandable Sample Issue Preview */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowSampleDispatch(!showSampleDispatch)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#92400E] hover:text-[#1C1917] underline underline-offset-4 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>
                    {showSampleDispatch
                      ? 'Hide Recent Issue Excerpt'
                      : 'Preview Issue No. 42: “When Your 10-Year-Old Asks If It Actually Happened”'}
                  </span>
                </button>

                {showSampleDispatch && (
                  <div className="mt-4 p-5 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] space-y-2.5">
                    <div
                      className="text-xs font-mono text-[#78716C] tabular-nums"
                      style={{fontFamily: 'var(--font-mono), monospace'}}
                    >
                      Dispatch No. 42 · Historical Archive Series (Ages 8–12)
                    </div>
                    <h3
                      className="text-lg font-normal text-[#1C1917]"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      “Why concrete history is a tween’s greatest ally”
                    </h3>
                    <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                      “Around age nine, a child’s brain undergoes a profound
                      shift toward concrete operational reasoning. When they ask,
                      ‘How do we know King David or Babylon were real places?’,
                      they aren’t losing faith—they are asking to graduate from
                      nursery rhymes to real history…”
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right 5 Columns: Minimalist Subscription Card */}
            <div className="lg:col-span-5 rounded-xl bg-[#FAF7F2] border border-[#E5DEC9] p-6 sm:p-8">
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-5" noValidate>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
                      <Mail className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Subscribe to Faith Formation Insights</span>
                    </div>
                    <p className="text-xs text-[#57534E]">
                      Tailor your weekly reflection by selecting your children’s
                      current stages:
                    </p>
                  </div>

                  {/* Optional Life-Stage Checkboxes */}
                  <div
                    role="group"
                    aria-label="Select age stages for weekly reflections"
                    className="grid grid-cols-3 gap-2"
                  >
                    {(
                      [
                        {id: 'early', label: 'Ages 3–7', sub: 'Bedtime'},
                        {id: 'tween', label: 'Ages 8–12', sub: 'Archive'},
                        {id: 'teen', label: 'Ages 13–18', sub: 'Harbor'},
                      ] as const
                    ).map((stage) => {
                      const active = selectedStages[stage.id];
                      return (
                        <button
                          key={stage.id}
                          type="button"
                          onClick={() => toggleStage(stage.id)}
                          className={`p-2.5 rounded-lg border text-center transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917]'
                              : 'bg-[#F2ECE1] text-[#44403C] border-[#E5DEC9] hover:border-[#D97706]/60'
                          }`}
                        >
                          <div
                            className="text-xs font-mono font-semibold tabular-nums"
                            style={{fontFamily: 'var(--font-mono), monospace'}}
                          >
                            {stage.label}
                          </div>
                          <div className="text-[11px] opacity-80">
                            {stage.sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Email Input Field */}
                  <div>
                    <label
                      htmlFor="newsletter-email-input"
                      className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                    >
                      Parent Email Address
                    </label>
                    <input
                      id="newsletter-email-input"
                      type="email"
                      placeholder="parent@household.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5DEC9] text-sm text-[#1C1917] focus:outline-none focus:border-[#D97706]"
                    />
                    {errorMessage && (
                      <p className="mt-1.5 text-xs text-red-700 font-medium">
                        {errorMessage}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#1C1917] hover:bg-[#292524] hover:ring-2 hover:ring-[#D97706]/60 active:scale-[0.985] text-sm font-semibold text-[#FAF7F2] transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Receive Sunday Reflections</span>
                    <ArrowRight className="w-4 h-4 text-[#D97706] transition-transform group-hover:translate-x-1" />
                  </button>

                  <p className="text-[11px] text-[#78716C] text-center">
                    Delivered once a week on Sunday evenings · One-click
                    unsubscribe anytime
                  </p>
                </form>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-11 h-11 rounded-full bg-[#D97706]/15 text-[#D97706] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>

                  <div className="space-y-1.5">
                    <h3
                      className="text-2xl font-normal text-[#1C1917]"
                      style={{fontFamily: 'var(--font-display), serif'}}
                    >
                      Welcome to Faith Formation Insights
                    </h3>
                    <p className="text-xs text-[#44403C] leading-relaxed max-w-xs mx-auto">
                      We have sent Issue No. 42 to{' '}
                      <strong className="text-[#1C1917]">{email}</strong>. Your
                      next reflection will arrive this Sunday evening.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubscribed(false);
                      setEmail('');
                    }}
                    className="text-xs font-semibold text-[#92400E] hover:underline underline-offset-4 cursor-pointer"
                  >
                    Update email or stage preferences
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
