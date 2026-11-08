# Current Architecture

## Status
Initial static architecture map from repository inventory and selected source review. Unknowns are marked; this is not a complete runtime/deployment diagram.

## Observed stack
- Next.js 15 App Router, React 19 and TypeScript.
- Tailwind CSS 4 and Motion for presentation/interaction.
- D3 and Recharts for visual analytics.
- Google GenAI SDK dependency; end-to-end companion behavior not verified.
- Bun lockfile, next.config.ts and .env.example.
- No first-party database schema, migration set, authentication provider or server API contract was identified in the inspected inventory. External services remain unverified.

## Observed experience domains
Landing/home and onboarding; Bedtime Shepherd and Morning Bridge; Ancient Archive Explorer and historical timeline; Teen Safe Harbor and private journaling interfaces; parent portal/architecture presentation; Bible reader and study studio; growth tracker, milestones and engagement visualizations.

## State ownership concerns
Inspected growth pages initialize growth points independently and maintain engagement logs in page-level React state. Different routes use different initial values. No central durable learner record was identified in reviewed code. Onboarding appears to generate a profile payload for display rather than submit it to a verified account service; social sign-in handoff is simulated.

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
