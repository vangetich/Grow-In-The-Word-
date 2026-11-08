import Link from 'next/link';
import { ArrowLeft, BookOpen, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1C1917] flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D97706]/10 text-[#D97706] mb-2">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#92400E] font-medium">
            404 · Uncharted Territory
          </p>
          <h1
            className="text-3xl sm:text-4xl font-normal text-[#1C1917]"
            style={{ fontFamily: 'var(--font-display), serif' }}
          >
            Passage Not Found
          </h1>
          <p className="text-sm text-[#78716C] leading-relaxed">
            The study room, milestone, or scroll you are looking for has moved or
            rests elsewhere in the sanctuary archive.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1C1917] hover:bg-[#292524] text-white text-sm font-medium transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Sanctuary</span>
          </Link>
          <Link
            href="/bible-study-studio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#F5EFE6] border border-[#E5DEC9] text-[#1C1917] text-sm font-medium transition-colors"
          >
            <BookOpen className="w-4 h-4 text-[#D97706]" />
            <span>Open Reading Studio</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
