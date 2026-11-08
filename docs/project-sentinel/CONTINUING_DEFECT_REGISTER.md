# Continuing Defect Register

Single ongoing register. Add findings with evidence and severity; close only with a linked fix and verification. Avoid repeatedly reopening historical findings unless new evidence or risk warrants it.

| ID | Summary | Severity | Status | Evidence / next action |
|---|---|---|---|---|
| PS-01 | Onboarding is a client-side demonstration; real account lifecycle not verified | Critical | Open | JourneyOnboardingModal.tsx L125-L220, L620-L655; select and integrate identity provider |
| PS-02 | Teen journal claims encryption/privacy but stores plaintext React state and mock cipher labels | Critical | Open | PrivateJournalingVault.tsx L70-L145; TeenSafeHarborPhase4.tsx L175-L215, L315-L350; design threat model and real encryption/storage |
| PS-03 | Admin gate is bypassable through client-side quick toggle and accepts arbitrary non-empty credentials | Critical | Open | AdminBackendMaintenanceSection.tsx L254-L285; remove demo gate before any privileged integration |
| PS-04 | Growth points and logs are route-local and seeded inconsistently | High | Open | growth-tracker/page.tsx L14-L38; bible-reader/page.tsx L14-L35; timeline/page.tsx L14-L30; map all routes and define authoritative source |
| PS-05 | No automated test script/CI found; build skips ESLint | High | Open | package.json L1-L42; next.config.ts L1-L30; establish CI and run lint/build/test |
| PS-06 | Parent/teen privacy and firewall promises are presentation-only in inspected repository | Critical | Open | TeenSafeHarborPhase4.tsx L535-L580; Phase5ArchitectureAndParentPortal.tsx L570-L630; implement server-side policy |
| PS-07 | Bible translation provenance/licensing and API fallback are not documented | High | Open | full-bible-data.ts L31-L82; FullPageBibleReader.tsx L310-L355; rights/source review |
| PS-08 | AI companion and GenAI data boundaries unverified | High | Unverified | package.json L13; .env.example; inspect deployed service and source call sites |
| PS-09 | Offline cache readiness is not substantiated | High | Open | NetworkStatusIndicator.tsx L35-L70, L143-L215; implement cache/service worker or revise claim |
| PS-10 | Dependency compatibility concern: eslint-config-next 16.0.8 alongside next 15.4.9 | Medium | Open | package.json L13-L40; verify install/build and align versions if needed |

## Lifecycle
Open → Triaged → In Progress → Fixed (unverified) → Verified → Closed. Deferral requires rationale, risk acceptance authority, review date and compensating control.

Each entry should include affected path/line or commit, inspection/reproduction method, impact, acceptance criteria, remediation commit and verification result. Do not mark fixed based on a code change alone.
