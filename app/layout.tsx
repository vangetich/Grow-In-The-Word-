import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Grow In The Word — Decade-Spanning Scripture Companion & UI/UX Spec',
  description:
    'Public-facing landing page and complete minimalist brand & UI/UX design specification for Grow In The Word, a decade-spanning Bible app for ages 3 to 18.',
  openGraph: {
    title: 'Grow In The Word — Decade-Spanning Scripture Companion & UI/UX Spec',
    description:
      'An honest, unhurried space to explore ancient history, ask hard questions, and build a lifelong foundation of faith from ages 3 to 18.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grow In The Word — Decade-Spanning Scripture Companion & UI/UX Spec',
    description:
      'An honest, unhurried space to explore ancient history, ask hard questions, and build a lifelong foundation of faith from ages 3 to 18.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className="scroll-smooth overflow-x-clip w-full max-w-full"
    >
      <body
        suppressHydrationWarning
        className="bg-[#FAF7F2] text-[#1C1917] antialiased selection:bg-[#D97706]/20 selection:text-[#1C1917] overflow-x-clip w-full max-w-full min-h-screen"
        style={{fontFamily: 'var(--font-sans), sans-serif'}}
      >
        {children}
      </body>
    </html>
  );
}

