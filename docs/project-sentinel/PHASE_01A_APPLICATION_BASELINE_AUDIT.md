# Project Grow In The Word — Phase 01A Application Baseline Audit

**Date:** 9 November 2026  
**Repository:** `vangetich/Grow-In-The-Word-`  
**Audit branch:** `build/phase-01-application-foundation`  
**Baseline:** `main` commit `aff5e1142c2e56d481e8186306a834e99dcf8c2b`  
**Audit type:** Static repository inspection only  
**Status:** Initial baseline recorded; runtime verification pending

## 1. Executive summary

The existing application is a substantial Next.js App Router frontend, not a blank project. The inspected tree contains ten page routes, approximately forty-seven reusable TSX components, and a small `lib/` layer. The current product includes a landing page, Bible reader, study studio, tier experiences, growth tracker, semantic search, parent portal, Safe Harbor and timeline experiences.

The correct implementation strategy is to preserve and stabilize this application, not replace it. This audit makes no application-source changes and does not authorize production data collection, account creation, AI processing, deployment or legal-compliance claims.

## 2. Branch and repository baseline

- Default branch: `main`
- Implementation branch: `build/phase-01-application-foundation`
- The implementation branch was created from the latest `main` head and was verified to point to the same baseline commit.
- Project Sentinel governance work remains on `project-sentinel/phase-00d-international-governance`.
- The governance branch and `main` have diverged (74 commits ahead, 4 behind at inspection). Do not merge it wholesale. Reconcile specific documents and decisions through a controlled review.
- Repository tree inspection found no `.github/workflows/`, test/e2e directory, `app/api/`, `src/`, Prisma/Drizzle/Supabase/Firebase schema path, or database migration directory. This is a finding about the inspected repository tree, not proof that no external service exists.

## 3. Application inventory

### Routes observed

- `/`
- `/ancient-archive`
- `/bible-reader`
- `/bible-study-studio`
- `/growth-tracker`
- `/parent-portal`
- `/safe-harbor`
- `/semantic-search`
- `/tiers`
- `/timeline`

### Main implementation areas observed

- `app/page.tsx`: large client-rendered landing/studio page (1,009 lines).
- `components/FullPageBibleReader.tsx`: large client-rendered Bible reader (4,550 lines).
- `components/TeenSafeHarborPhase4.tsx`: teen Safe Harbor experience (1,445 lines).
- `components/PrivateJournalingVault.tsx`: private-journal presentation and mock encryption output (496 lines).
- `lib/full-bible-data.ts`: bundled Bible passage/version data (2,443 lines).
- `app/parent-portal/page.tsx` and `components/Phase5ArchitectureAndParentPortal.tsx`: parent/mentor guidance experience.

The component inventory includes reading, study, prayer, reflection, growth visualization, onboarding, parent guidance, Safe Harbor, and navigation components. The present UI and its existing routes should be retained while behavior is audited and corrected incrementally.

## 4. Dependency and build configuration observations

The current `package.json` declares:

- Next.js `^15.0.0`
- React / React DOM `^18.3.1`
- ESLint `^10.14.0`
- `eslint-config-next` `^16.4.5`
- Tailwind CSS `^4.0.0`
- TypeScript `^5.6.3`
- Motion `^11.11.17`

The repository contains `bun.lock`; README setup instructions instead prescribe `npm install`. Package manager and lockfile policy should be made consistent before repeatable CI is introduced.

The package scripts currently include `"lint": "next lint"`. The Next.js / eslint-config-next major versions do not match, and the ESLint major version is newer than the Next.js major. Treat this as a dependency compatibility risk requiring a controlled package-manager install and actual lint run; do not upgrade or downgrade versions by guesswork.

`next.config.ts` sets `eslint.ignoreDuringBuilds: true`, which means the production build is configured not to gate on ESLint. TypeScript build errors are not ignored. The current configuration also uses standalone output and a custom webpack cache/watch configuration.

`app/layout.tsx` metadata describes the product as a “Decade-Spanning Scripture Companion & UI/UX Spec”; product-facing metadata should eventually be reviewed for clarity, but it is not a Phase 01A blocker.

## 5. High-priority findings and defect register additions

### PS-33 — Safe Harbor privacy and encryption guarantees are unsupported by the inspected implementation
**Severity:** Critical for any real teen use  
**Evidence:** `components/TeenSafeHarborPhase4.tsx` initializes journal entries in React component state, stores the entered journal text in `contentPreview`, and creates a display string labelled `AES-256-GCM` using a random hexadecimal suffix. Static inspection found no `crypto.subtle` encryption/decryption or durable encrypted-storage operation in this component. The UI nevertheless promises zero-knowledge local encryption, no parent access and device-only keys.

**Required control:** Keep the journal demo-only and prevent real sensitive entries from being solicited until a reviewed encryption, key-management, persistence, recovery, deletion and threat model exists. Replace inaccurate cryptographic and absolute privacy claims with explicit demo-state wording before real users, especially minors, can use it.

### PS-34 — Private Journaling Vault explicitly generates mock ciphertext
**Severity:** Critical for any real sensitive journal use  
**Evidence:** `components/PrivateJournalingVault.tsx` contains a function named `generateMockCiphertext` and a comment identifying deterministic mock ciphertext for an encrypted-view demonstration. The interface describes AES-256-GCM hardware-locked / zero-knowledge protection and says entries cannot be read by family members, administrators or servers.

**Required control:** Treat the component as a visual prototype only. Do not present mock ciphertext as encryption or store real personal reflections in it. Correct claims and gate real journal functionality until genuine, independently reviewed controls are implemented.

### PS-35 — Absolute parent/guardian privacy and notification promises are not supported by a verified authorization architecture
**Severity:** High / safeguarding and trust  
**Evidence:** Safe Harbor copy promises that nothing is reported to parents and no parent notifications occur for hard-topic searches or journal writing. The repository inspection did not identify authenticated identity, server-side resource-level authorization, a verified guardian relationship service, or a production data boundary.

**Required control:** Do not promise absolute secrecy or parental visibility rules as operational guarantees. Preserve the Project Sentinel distinction between lawful authority, account autonomy and spiritual maturity. Any future guardian access must be scoped, reviewable, revocable and grounded in verified authority; private reflection access must not be automatic.

### PS-36 — Bible translation rights and source provenance are unresolved
**Severity:** High before public distribution of bundled text  
**Evidence:** `lib/full-bible-data.ts` contains passage text under AKJV, AMP, NASB, NIV and NLT identifiers. `components/FullPageBibleReader.tsx` also contains an external request to `bible-api.com` and mapping/fallback behavior. The inspected repository does not provide a complete per-translation rights inventory, licence grant, attribution requirements, permitted display/storage scope, or API terms assessment.

**Required control:** Keep bundled translations and external text integrations under rights review. Confirm each translation's exact edition, rights holder, licence, permitted use, attribution, territory and caching/offline rules. Until approved, use text with verified public-domain status or documented permission.

### PS-37 — Build/lint assurance is not currently enforceable from the inspected configuration
**Severity:** High for release assurance  
**Evidence:** `next.config.ts` ignores ESLint during builds; `package.json` combines Next.js 15 with `eslint-config-next` 16 and ESLint 10; no test script, test directory or CI workflow was found in the inspected tree.

**Required control:** Establish a reproducible install and baseline first. Then align the supported Next.js / ESLint toolchain, add explicit typecheck/lint/test commands and CI gates in a separate reviewed change. Do not silently suppress lint failures.

### PS-38 — Reader and growth state are browser-local and route-local rather than a verified central learner record
**Severity:** Medium / architecture  
**Evidence:** `components/FullPageBibleReader.tsx` persists reader state, highlights and audio bookmarks in browser `localStorage`. Page-level routes initialize separate hard-coded growth-point and engagement state. No central durable learner record or authenticated cross-device persistence was identified in the inspected tree.

**Required control:** Clearly label current persistence as browser-local/demo behavior. Defer account-linked synchronization and central learner record implementation until identity, consent, data minimization, access boundaries, retention and backend architecture are approved.

### PS-39 — Demo mentor identities and pastoral/clinical authority need provenance
**Severity:** Medium / user trust  
**Evidence:** Safe Harbor topic content includes named mentor identities and roles such as “Youth Counselor” and “Clinical & Theological Mentor.” The inspected component presents these as content data; the repository inspection did not establish that these are real, credential-verified contributors or approved synthetic personas.

**Required control:** Verify contributor identity, credentials, permissions and content review, or label personas and sample audio/transcripts as fictional demonstration content. Do not imply clinical care, counselling or professional supervision without verified governance.

## 6. Verification status

| Check | Status | Evidence |
|---|---|---|
| Repository and branch inspection | PASSED | GitHub branch and tree metadata retrieved |
| Static source/config inspection | PASSED | Relevant files read from implementation branch |
| Dependency compatibility | NOT RUN | Manifest mismatch observed; no install performed |
| Dependency installation | NOT RUN | No execution environment used |
| Production build | NOT RUN | No build command executed |
| ESLint | NOT RUN | No lint command executed |
| TypeScript check | NOT RUN | No typecheck command executed |
| Automated unit/integration/e2e tests | UNAVAILABLE | No test suite or test script identified |
| CI | UNAVAILABLE | No workflow files or status checks identified for baseline commit |
| Browser/mobile runtime smoke test | NOT RUN | No browser session/runtime evidence available |
| Security/privacy penetration test | NOT RUN | Out of scope for static repository inspection |
| Legal/licensing validation | NOT RUN | Requires documented rights evidence and qualified review |

No statement in this report should be interpreted as confirmation that the app builds, runs, is secure, is legally compliant, or is ready for children or public launch.

## 7. Work that can safely proceed now

1. Frontend route/component inventory and UX consistency improvements using clearly labelled synthetic demo data.
2. Reader usability, accessibility, responsive layout and navigation fixes that do not expand data collection.
3. Build tooling reconciliation after obtaining a reproducible install and recording the actual failure/output.
4. Test harness and CI design using synthetic fixtures only.
5. Documentation and feature-state corrections that remove unverified privacy/security claims.

## 8. Work that remains gated

Do not enable or implement production versions of authentication, child account creation, guardian verification, private journals, AI transmission, analytics on sensitive reflections, peer community, clinical/pastoral support claims, cross-border storage, or backend persistence until their architecture, lawful basis, security controls, safeguarding operations and required approvals are established.

No spiritual maturity, holiness, salvation, divine favour or moral worth score may be used for authorization or access decisions. Activity must not be represented as mastery.

## 9. Phase 01A acceptance criteria

Phase 01A is complete only when:

- The repository branch and source baseline are recorded.
- A package manager and lockfile strategy are agreed and reproducible.
- Install, build, lint and TypeScript checks have been executed with captured results, or their blockers are explicitly recorded.
- Existing routes and critical user flows have a documented smoke-test inventory.
- PS-33 through PS-39 are entered into the continuing defect register or formally reconciled against existing entries.
- Unsafe demo security/privacy claims are visibly corrected or the affected feature is disabled for real-user use.
- Bible translation and media provenance has an owner and a documented rights-review path.
- Project Sentinel governance decisions are preserved without blindly merging the diverged governance branch.
- A reviewed Phase 01A exit report identifies what is safe to build in Phase 01B.

## 10. Immediate next actions

1. Run a reproducible dependency installation in the owner's development environment using the repository's chosen package manager and capture the complete output.
2. Run build, lint and TypeScript checks; diagnose the actual failures before changing dependency versions or build configuration.
3. Prepare a narrowly scoped source change to clearly label or disable the two mock-encryption journal experiences and remove unsupported privacy guarantees before exposing them to real users.

**Audit conclusion:** The existing frontend is a strong starting point for controlled product development, but the repository is not yet verified as build-ready, and its teen journal/privacy claims are materially stronger than the inspected implementation. Continue with frontend stabilization and demo-safe UX work; keep sensitive data, identity, backend, AI and production safeguarding features gated.
