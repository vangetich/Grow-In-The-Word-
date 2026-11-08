# Project Sentinel — Phase 00 Audit

**Project:** Grow In The Word  
**Repository:** vangetich/Grow-In-The-Word-  
**Baseline:** main at `060ef2f9c651896aaf1d719e5b8f78ee251e054e`  
**Audit branch:** project-sentinel/phase-00-audit  
**Status:** Static repository audit completed to current scope; runtime assurance outstanding  
**Date:** 2026-11-08

## Purpose
Establish an evidence-led baseline before extending the application. Preserve useful product work; do not replace the application wholesale.

## Scope and confidence
The recursive Git tree was complete (75 tracked files; not truncated). All application routes and a broad set of domain components/configuration files were inspected. This remains a static source review. The application was not installed, built, linted, executed, penetration-tested or tested against live services. No assumptions are made about external services not represented in the repository.

Evidence labels:
- **Observed:** directly present in inspected source.
- **Not identified in repository:** absent from the complete tracked tree or reviewed source; external services may still exist.
- **Unverified:** requires runtime, deployment, account or provider evidence.

## Technology baseline
- Next.js dependency `^15.4.9`; React/React DOM `^19.2.1`; TypeScript `5.9.3`.
- Tailwind CSS 4; Motion; D3; Recharts.
- `@google/genai` dependency `^2.4.0`; source-level use was not located in the inspected files/search, so an active AI workflow is **not verified**.
- Bun lockfile; scripts: dev, build, start, lint, clean. No test script identified.
- `next.config.ts` sets `eslint.ignoreDuringBuilds: true`; TypeScript build errors are not ignored.
- `eslint-config-next` is `16.0.8` while Next.js is `15.4.9`; compatibility should be verified in a real install/build.
- `.env.example` documents GEMINI_API_KEY and APP_URL and refers to AI Studio/Cloud Run runtime injection. Actual deployment and secret injection were not verified.
- Complete tracked tree contains no `app/api` route, schema/migration directory, test directory, CI workflow, service worker or root README. This is repository evidence only, not proof of absent external infrastructure.

## Evidence-backed findings

| ID | Area | Source evidence | Finding / risk |
|---|---|---|---|
| PS-01 | Identity/onboarding | [JourneyOnboardingModal.tsx L125-L220](https://github.com/vangetich/Grow-In-The-Word-/blob/main/components/JourneyOnboardingModal.tsx#L125-L220); [L620-L655](https://github.com/vangetich/Grow-In-The-Word-/blob/main/components/JourneyOnboardingModal.tsx#L620-L655) | Email path validates input then runs timed UI handoff; social handoff also advances UI. No account API submission/auth SDK was observed in this flow. Profile payload is client-computed. Real authentication/account persistence not established. **Critical before real accounts.** |
| PS-02 | Teen journal | [PrivateJournalingVault.tsx L70-L145](https://github.com/vangetich/Grow-In-The-Word-/blob/main/components/PrivateJournalingVault.tsx#L70-L145); [TeenSafeHarborPhase4.tsx L175-L215](https://github.com/vangetich/Grow-In-The-Word-/blob/main/components/TeenSafeHarborPhase4.tsx#L175-L215); [L315-L350](https://github.com/vangetich/Grow-In-The-Word-/blob/main/components/TeenSafeHarborPhase4.tsx#L315-L350) | Journal text/entries are React state; demo entry/content is pre-seeded; ciphertext is generated from a simple deterministic hash-like mock or a fabricated cipher label. No WebCrypto encryption or durable encrypted write is present in these inspected flows. UI claims exceed implementation. **Critical privacy risk.** |
| PS-03 | Admin | [AdminBackendMaintenanceSection.tsx L105-L140](https://github.com/vangetich/Grow-In-The-Word-/blob/main/components/AdminBackendMaintenanceSection.tsx#L105-L140); [L254-L285](https://github.com/vangetich/Grow-In-The-Word-/blob/main/components/AdminBackendMaintenanceSection.tsx#L254-L285) | Sign-in accepts any non-empty email/passcode; quick toggle inserts a known demo passcode and enables admin state. No server authorization is invoked. Demo-only; must not protect real operations. **Critical if privileged functions are connected.** |
| PS-04 | Learner continuity | [growth-tracker/page.tsx L14-L38](https://github.com/vangetich/Grow-In-The-Word-/blob/main/app/growth-tracker/page.tsx#L14-L38); [bible-reader/page.tsx L14-L35](https://github.com/vangetich/Grow-In-The-Word-/blob/main/app/bible-reader/page.tsx#L14-L35); [timeline/page.tsx L14-L30](https://github.com/vangetich/Grow-In-The-Word-/blob/main/app/timeline/page.tsx#L14-L30) | Growth points and engagement logs are route-local React state with differing seed values (45, 70, 40 in these examples; other routes also differ). No central durable learner record identified. **High data integrity risk.** |
| PS-05 | Assurance/configuration | [package.json L1-L42](https://github.com/vangetich/Grow-In-The-Word-/blob/main/package.json#L1-L42); [next.config.ts L1-L30](https://github.com/vangetich/Grow-In-The-Word-/blob/main/next.config.ts#L1-L30) | No test script; build ignores ESLint; no CI workflow in tracked tree. Build/lint/test have not been run. Dependency major-version alignment needs checking. **High assurance gap.** |
| PS-06 | Parent/teen boundary | [safe-harbor/page.tsx](https://github.com/vangetich/Grow-In-The-Word-/blob/main/app/safe-harbor/page.tsx); [TeenSafeHarborPhase4.tsx L535-L580](https://github.com/vangetich/Grow-In-The-Word-/blob/main/components/TeenSafeHarborPhase4.tsx#L535-L580); [Phase5ArchitectureAndParentPortal.tsx](https://github.com/vangetich/Grow-In-The-Word-/blob/main/components/Phase5ArchitectureAndParentPortal.tsx) | Strong privacy guarantees and simulated firewall responses are presented in UI, but no server-side policy enforcement or API boundary was found in the repository. **Critical before real teen data.** |
| PS-07 | Scripture data | [full-bible-data.ts L1-L100](https://github.com/vangetich/Grow-In-The-Word-/blob/main/lib/full-bible-data.ts#L1-L100); [FullPageBibleReader.tsx L310-L355](https://github.com/vangetich/Grow-In-The-Word-/blob/main/components/FullPageBibleReader.tsx#L310-L355) | Five translation labels are presented; translation/source/licence metadata is not included in the inspected version metadata. Non-curated chapters are fetched from bible-api.com with KJV. Rights, completeness, source integrity and fallback behavior require review. **High content/legal risk.** |
| PS-08 | AI companion | package.json; .env.example; tracked tree | GenAI package and key placeholder exist, but no active call site was found in inspected source/index search. Search indexing was incomplete, so AI use is **unverified**, not confirmed absent. **High unknown.** |
| PS-09 | Offline claims | [NetworkStatusIndicator.tsx L35-L70](https://github.com/vangetich/Grow-In-The-Word-/blob/main/components/NetworkStatusIndicator.tsx#L35-L70); [L143-L215](https://github.com/vangetich/Grow-In-The-Word-/blob/main/components/NetworkStatusIndicator.tsx#L143-L215) | The inspected component writes a localStorage marker and simulates offline mode; no service worker/cache implementation was identified in the tracked tree. Offline readiness/cache claims are not substantiated. **High reliability risk.** |
| PS-10 | Local persistence | [FullPageBibleReader.tsx L162-L287](https://github.com/vangetich/Grow-In-The-Word-/blob/main/components/FullPageBibleReader.tsx#L162-L287); [DailyPrayerModal.tsx L105-L165](https://github.com/vangetich/Grow-In-The-Word-/blob/main/components/DailyPrayerModal.tsx#L105-L165) | Bible reader preferences/progress and prayer petitions use browser localStorage. This is device/browser-local persistence, not authenticated cross-device learner continuity or encrypted journal storage. **Medium/high depending on data sensitivity.** |

## Existing product work to preserve
Candidate experience assets include Bedtime Shepherd, Morning Bridge, Zero Glow player, Ancient Archive Explorer, historical timeline, Teen Safe Harbor, journaling interfaces, parent portal presentation, Bible reader/study, semantic search, prayer, growth charts and navigation. See COMPONENT_INVENTORY.md. Their UI can be preserved while replacing simulated data/security behavior behind clear service contracts.

## Immediate safety decisions
1. Do not claim the current teen journal is encrypted, zero-knowledge or inaccessible to parents/servers.
2. Remove or disable demo admin access before connecting privileged operations.
3. Do not expose teen private journal content to parents or AI by default.
4. Do not equate engagement/assessment with spiritual worth, holiness, salvation or divine favour.
5. Do not perform learner-specific durable writes before identity and authorization contracts exist.
6. Do not advertise offline cache guarantees until actual assets/data are cached and tested.
7. Verify translation rights and provenance before distributing copyrighted translation text.

## Recommended sequence
Complete remaining deployment/provider evidence; establish test/build/lint baseline; approve architecture decisions; define identity, ownership and consent; design the Central Growth Record; implement behind tested service boundaries; integrate modules incrementally; remediate journal/admin risks; verify content rights and offline behavior.

## Limitations
This is a static source audit of the complete tracked tree and selected files, not a legal opinion, cryptographic review, penetration test, runtime test or production readiness certification. External services, GitHub secrets, deployment environment, provider dashboards and production behavior remain unverified.

**Conclusion:** preserve the existing application and strengthen it incrementally.