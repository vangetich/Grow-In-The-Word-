# Current Architecture

## Status
Static architecture map from the complete recursive Git tree (75 tracked files; tree response not truncated) and selected source review. Runtime/deployment topology remains unverified.

## Observed stack and configuration
- Next.js 15 App Router, React 19, TypeScript 5.9; Tailwind CSS 4 and Motion.
- D3 and Recharts for visualizations.
- `@google/genai` is a package dependency; active source call sites were not found in reviewed code/search. Search index was incomplete; classify as unverified.
- `package.json` has dev/build/start/lint/clean scripts but no test script.
- `next.config.ts` ignores ESLint during builds and does not ignore TypeScript errors.
- `eslint-config-next` 16.0.8 with Next.js 15.4.9 requires compatibility verification.
- `.env.example` documents GEMINI_API_KEY and APP_URL with AI Studio/Cloud Run injection notes. Actual hosting and secret injection are not verified.

## Repository structure evidence
Tracked tree contains 75 files, including routes for home, tiers, growth tracker, Bible reader/studio, ancient archive, safe harbor, parent portal, semantic search and timeline. No `app/api` routes, database schema/migrations, tests, CI workflows, service worker or root README were identified in this complete tree. This does not rule out external services.

## Experience domains
Landing/home and onboarding; Bedtime Shepherd and Morning Bridge; Ancient Archive Explorer and historical timeline; Teen Safe Harbor and private journaling; parent portal/architecture presentation; Bible reader and study studio; semantic search; prayer; growth tracker, milestones and engagement visualizations.

## Current data and trust boundaries
- Onboarding UI validates form fields and advances through timed client-side transitions. The profile/routing payload is computed client-side; real account creation and persistence were not observed in the reviewed flow.
- Admin UI uses client state and a known demo passcode; it is not an authentication boundary.
- Teen journal content and entries are held in React state, including seeded example content. Inspected mock ciphertext is not encryption.
- Growth points/logs are held separately in multiple route-level React states, with inconsistent initial values.
- Bible reading progress and prayer petitions use localStorage. These are browser-local persistence, not a central account-owned learner record.
- Network indicator writes a localStorage marker and has a simulated offline toggle; actual offline caching is unverified.
- Bible reader fetches KJV chapters from bible-api.com for non-curated chapters; translation rights/provenance and API availability need validation.

## Target logical architecture
1. Identity and account ownership.
2. Authorization, consent and family relationship policy.
3. Central Growth Record domain service.
4. Scripture reference/catalogue and learning activity services.
5. Age-tier experience modules.
6. Bible study and reading services.
7. AI companion consuming only authorized, purpose-limited context.
8. Family/mentor portal with explicit visibility policy.
9. Analytics and engagement projections.
10. Trust, safety, audit, retention and governance controls.

## Target data flow
Experience modules submit typed commands/events through documented service contracts. The Central Growth Record validates ownership, authorization, schema and idempotency before durable storage. Read models expose only authorized projections to learner experiences, analytics, AI and family views.

Private journal content is a separate protected domain. A general growth event may record that a private reflection activity occurred, if appropriate and consented, but must not copy journal body text into the learner record.

## Constraints
- No direct cross-module database-table manipulation.
- Stable learner ownership on every learner-specific record.
- Server-side authorization is authoritative; client UI is not a security boundary.
- Events include provenance, timestamps, actor, source module and schema version.
- Activity, assessment evidence and mastery are distinct.
- Age band is a defaulting signal, not a proxy for biblical familiarity.
- AI is not spiritual authority and must not fabricate scripture citations.
