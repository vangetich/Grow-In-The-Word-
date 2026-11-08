# Project Sentinel — Phase 00 Audit

**Project:** Grow In The Word  
**Repository:** vangetich/Grow-In-The-Word-  
**Baseline:** main  
**Audit branch:** project-sentinel/phase-00-audit  
**Status:** Initial static audit; further verification required  
**Date:** 2026-11-08

## Purpose
Establish an evidence-led baseline before extending the application. Preserve useful product work; do not replace the application wholesale.

## Scope and confidence
This baseline uses repository inventory, package/configuration inspection and selected source review. It is not a runtime assurance report. Build, lint, tests, penetration testing and live backend behavior have not been verified. Findings are classified as observed in inspected code, not identified in inspected inventory, or unverified.

## Technology baseline
- Next.js 15 App Router, React 19, TypeScript 5.9.
- Tailwind CSS 4; Motion; D3; Recharts.
- Google GenAI SDK dependency.
- Bun lockfile; scripts include dev, build, start, lint and clean.
- No test script identified.
- next.config.ts configures ESLint to be ignored during builds.
- .env.example identifies GEMINI_API_KEY and APP_URL.

## Principal findings
| ID | Area | Initial finding | Risk |
|---|---|---|---|
| PS-01 | Identity | Onboarding includes client-side validation and simulated social sign-in; real authentication/persistence not established. | Critical |
| PS-02 | Teen journal | Inspected encryption/key language is demonstrative; real encryption, key custody and durable protected storage not established. | Critical |
| PS-03 | Admin | Inspected demo flow enables client admin state without verified server authorization. | Critical |
| PS-04 | Growth continuity | Growth values and engagement logs are page-level React state with differing initial values. | High |
| PS-05 | Assurance | No automated test suite/test script identified; lint is ignored during builds. Runtime checks not performed. | High |

## Reusable product work
The repository contains substantial experience and presentation work: Bedtime Shepherd, Zero Glow player, Morning Bridge, Ancient Archive Explorer, historical timeline, Teen Safe Harbor, journaling interfaces, parent portal/architecture screens, Bible reading/study interfaces, growth charts and navigation. See COMPONENT_INVENTORY.md.

These are candidate reusable assets, not proof that workflows are secure, persistent or production-ready.

## Immediate safety decisions
1. Do not represent the current teen journal as cryptographically protected until encryption, key management, persistence and threat-model testing are real.
2. Do not use demo admin controls for privileged operations.
3. Do not expose teen private journal content to parents by default.
4. Never turn engagement or assessment into a score of spiritual worth, holiness, salvation or divine favour.
5. Do not perform learner-specific durable writes before identity and authorization contracts exist.

## Recommended sequence
Complete static inspection; approve architecture decisions; define identity, ownership and consent; design the Central Growth Record; implement behind tested service boundaries; integrate modules incrementally; address journal/admin security; establish CI and staged release checks.

## Limitations / next audit work
Inspect remaining routes and components, identify external backend/deployment configuration, verify AI call sites and data flows, review Bible data provenance/licensing, accessibility and responsive behavior, and run build/lint/tests in a controlled environment.

**Conclusion:** preserve the existing application and strengthen it incrementally. This is an initial audit baseline, not certification of security, correctness or production readiness.
