# Grow In The Word · Decade-Spanning Scripture Companion (Ages 3–18)

**Grow In The Word** is a high-end, minimalist, and non-coercive Bible study companion and spiritual formation ecosystem designed for children, tweens, and teens (ages 3 to 18), as well as parents, educators, and mentors.

The platform rejects manipulative psychological levers (such as dopamine-spiked gamification streaks and punitive guilt mechanics) in favor of fine-line botanical stillness, unhurried wonder, and academic integrity.

---

## 🌟 Key Architecture & Features

### 1. Full-Page Bible Reader (`/components/FullPageBibleReader.tsx` & `/bible-reader`)
- **5 Parallel Translations**: Instant switching and side-by-side comparison across **AKJV** (Authorized King James Version), **AMP** (Amplified Bible), **NASB** (New American Standard Bible), **NIV** (New International Version), and **NLT** (New Living Translation).
- **Distraction-Free Reading Canvas**: Continuous book chapter pages, drop-cap verse numbers, adjustable typography (Small, Medium, Large, Extra Large), margins, and Zen Immersion mode.
- **Audio Narration & Guided Audio Reading**: Web Speech API audio stream with a 4-bar rhythmic pulse indicator to help younger readers follow along, narration speed switcher (**0.8x**, **1.0x**, **1.2x**), and a **visual reading-time remaining timer** adjusting dynamically based on narration speed.
- **Persistent Audio Timestamp Bookmarks**: Automatically or manually records playback position (e.g. `Verse 4 · 01:24`) per chapter and version in `localStorage` with instant resume buttons.
- **Text Highlighting & Note-Taking Popover**: Color-painted verse highlights stored locally, with a small non-obtrusive popover note editor on click to add, edit, or delete personal reflections, questions, and prayers.
- **Cross-Reference Peek Popover**: Hovering or clicking subtle `[Ref]` badges reveals referenced verse text and thematic context instantly without interrupting the reading flow.

### 2. Bible Study Reading Studio (`/components/BibleStudyReadingStudio.tsx`)
- **Lexical & Cultural Dictionary**: Deep original-language insights into Hebrew and Greek terms (*Ra‘ah* Shepherd, *Nephesh* Soul, *Chesed* Lovingkindness, *Logos* Word, *Mishpat* Justice, *Shalom* Wholeness) complete with ancient artifact cross-references.
- **7-Day Reading Velocity Chart**: Recharts-powered area and bar graph visualizing daily chapter consistency and study minutes over the past week.
- **30-Day Visual Reading Heatmap**: Matrix grid and Recharts volume curve tracking 30-day chapter activity, active streaks (*18-Day Streak 🔥*), and habit milestones.
- **Reading Goal Tracker Card**: Interactive daily/weekly chapter goal input with a stunning **SVG visual progress ring** showing completion percentage co-ordinated with canon progress.

### 3. Multi-Tier Formation Studios & Parent Portal
- **Bedtime Sanctuary (Ages 3–7)**: Gentle bedtime stories, morning bridge conversation starters, and soft lullaby liturgy.
- **Ancient Archive (Ages 8–12)**: Levantine topography, Iron Age archaeology, and historical Levantine context.
- **Safe Harbor (Ages 13–18)**: Honest theological inquiries, encrypted personal journals, and mentor discussion prompts.
- **Parent/Guardian Dashboard**: Age-appropriate activity viewing, family discussion prompts, and transparency regarding the app's non-coercive approach to faith exploration.
- **Onboarding & Feature Atlas**: Engaging interactive onboarding flows tailored to each developmental stage.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 with custom warm grounding palette (`#1C1917` deep charcoal, `#FAF7F2` cream, `#D97706` soft amber)
- **Animation**: Framer Motion (`motion/react`)
- **Visualizations**: Recharts (Composed charts, area charts, bar charts, custom SVG progress rings)
- **Icons**: Lucide React
- **Persistence**: `localStorage` for offline-first privacy and seamless session continuity

---

## 🚀 Getting Started & Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server on port 3000:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.
