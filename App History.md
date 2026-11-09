# Grow In The Word · App Development History & Component Evolution

This document records the chronological development history, component architecture, and feature evolution of **Grow In The Word**.

---

## 📅 Chronological Iteration History

### Phase 1: Brand Foundation & Landing Page Architecture
- **Color Palette & Typography**: Established the signature warm grounding palette—deep charcoal (`#1C1917`), cream/ivory (`#FAF7F2` / `#F9F6F0`), and soft amber (`#D97706`). Integrated serif display fonts for high-end editorial typography.
- **Navbar & Navigation**: Created the sticky Navbar with an ivory background (`#F9F6F0`), clean horizontal pan-x navigation, and a top-right slide-in dropdown menu for tablet/mobile viewports.
- **Ancient History Insight Popover**: Designed an interactive popover for the hero kicker ("ANCIENT HISTORY") explaining deep temporal creation continuity, covenant, and moral landmarks without dashed underlines, featuring neat slider and scroll view modes.
- **Mission & Testimonials Sections**: Architected editorial sections expanding on the app's commitment to a safe, honest, and non-coercive environment for ages 3 to 18.

### Phase 2: Full-Page Bible Reader & Multi-Version Comparison
- **5 Parallel Translations**: Built the immersive Full-Page Bible Reader supporting AKJV, AMP, NASB, NIV, and NLT.
- **Accessibility & Typography Controls**: Added font-size dropdown toggles (Small, Medium, Large, Extra Large) and margin/spacing drawers.
- **Text Highlighting & Note-Taking**: Implemented color-painted text highlighting saved in `localStorage`, paired with a verse-note popover editor supporting Reflections, Questions, and Prayers.
- **Audio Narration & Guided Audio Reading**: Integrated Web Speech API narration with 4-bar rhythmic pulse indicators and speed controllers (**0.8x**, **1.0x**, **1.2x**).
- **Persistent Timestamp Bookmarking**: Added automatic and manual audio timestamp recording (e.g. `Verse 4 · 01:24`) with an instant resume button and notification toast.
- **Visual Reading-Time Remaining Timer**: Calculated remaining narration time based on verse count and narration speed.
- **Cross-Reference Peek Popover**: Added interactive `[Ref]` badges on verses displaying referenced verse text and thematic context on hover or click.

### Phase 3: Bible Study Reading Studio & Gamified Analytics
- **Lexical & Cultural Dictionary**: Built rich original-language Hebrew and Greek word studies (*Ra‘ah*, *Nephesh*, *Chesed*, *Logos*, *Mishpat*, *Shalom*) with material culture artifacts.
- **Scripture Insight Popover**: Added verse-selection popover offering age-aligned Reflection Prompts (`Ages 3–7`, `Ages 8–12`, `Ages 13–18`) and local reflection storage.
- **7-Day Reading Velocity Chart**: Integrated Recharts composed chart tracking 7-day chapter reading consistency and study minutes.
- **30-Day Visual Reading Heatmap**: Created a 30-day activity matrix grid and Recharts volume curve tracking reading streaks (*18-Day Streak 🔥*).
- **Reading Goal Tracker Card**: Added daily/weekly chapter goal configuration featuring an animated **SVG circular progress ring**.

### Phase 4: Multi-Tier Formation Studios & Parent Portal
- **Three-Tier Preview & Studios**: Bedtime Sanctuary (Ages 3–7), Ancient Archive (Ages 8–12), and Safe Harbor (Ages 13–18).
- **Parent/Guardian Dashboard**: Age-appropriate activity viewing, family discussion prompts, and alignment on non-coercive faith exploration.
- **User Onboarding & Feature Atlas**: Interactive onboarding modal walkthroughs and an ecosystem feature guide.

### Phase 5: Semantic Search Voice Input, Saved Verses Vault & Data Ownership
- **My Saved Verses & Notes Dashboard Modal**: Centralized dashboard inside `FullPageBibleReader` to search, filter by highlight color or note presence, edit reflections inline, and delete highlights.
- **Backup My Data (.json)**: Added client-side JSON export in the Saved Verses & Notes dashboard so users own and back up all highlights and personal reflections.
- **Voice-to-Text Semantic Search**: Integrated Web Speech API microphone input in `SemanticSearchSection` for spoken biblical queries, paired with a **Clear Recent Searches** sidebar button.

### Phase 6: Daily Prayer & Morning Daily Affirmation in SanctuaryDashboardBar
- **Age-Appropriate Meditative Daily Prayer**: Added non-coercive, meditative prayers for ages `3–7`, `8–12`, and `13–18` in `SanctuaryDashboardBar` and `DailyPrayerModal` with a **Save to Favorites** toggle persisted to `localStorage`.
- **Daily Affirmation & Growth History Pinning**: Created the gentle morning **Daily Affirmation** component in `SanctuaryDashboardBar` allowing users to pin favorite faith reflections directly to their **Growth History**.

---

## 🧩 Component Architecture Directory

| Component File | Primary Purpose & Features |
| :--- | :--- |
| `/app/page.tsx` | Main landing page assembling hero, mission, studio previews, and navigation. |
| `/components/Navbar.tsx` | Sticky ivory header, desktop navigation, and mobile dropdown menu. |
| `/components/FullPageBibleReader.tsx` | 5-version parallel Bible reader, audio narration, reading-time timer, cross-reference peek, verse note popover, Saved Verses & Notes dashboard, and JSON data backup. |
| `/components/BibleStudyReadingStudio.tsx` | Passage picker, lexicons, Scripture Insight age-stage popover, cross-references, and analytics charts. |
| `/components/SemanticSearchSection.tsx` | Semantic search index with Voice-to-Text speech recognition, literary genre filters, and Clear Recent Searches sidebar. |
| `/components/WeeklyReadingVelocityChart.tsx` | Recharts 7-day velocity chart with daily goals and study time curves. |
| `/components/MonthlyReadingHeatmapChart.tsx` | 30-day visual heatmap matrix and Recharts volume curve. |
| `/components/ReadingGoalTrackerCard.tsx` | Daily/weekly chapter goal tracker with SVG visual progress ring. |
| `/components/AncientHistoryInsightPopover.tsx` | Hero "Ancient History" hover/click insight popover with neat sliders. |
| `/components/SanctuaryDashboardBar.tsx` | Side-bar menu with Daily Affirmation (Pin to Growth History), Daily Prayer (Ages 3–7, 8–12, 13–18 + Save to Favorites), Growth History, and Night Sanctuary toggle. |
| `/components/DailyPrayerModal.tsx` | Guided age-appropriate meditative prayers, Favorites vault, and private petition sanctuary. |
| `/components/Phase5ArchitectureAndParentPortal.tsx` | Parent portal for activity monitoring and family discussion prompts. |
| `/components/JourneyOnboardingModal.tsx` | Engaging multi-stage onboarding flow for ages 3–18. |
| `/components/VerseQuoteCardModal.tsx` | High-res quote card image generator for WhatsApp sharing. |

