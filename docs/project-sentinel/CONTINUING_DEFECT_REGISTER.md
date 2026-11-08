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
| PS-11 | No completed jurisdiction-by-jurisdiction legal applicability assessment exists | Critical | Open | Phase 00D jurisdiction register is a starter queue only; obtain current official sources and qualified local counsel review before processing minors or enabling a market |
| PS-12 | No verified content-rights inventory covers translation, commentary, media, API, offline and AI uses | Critical | Open | Existing PS-07 covers Bible provenance/licensing; expand item-level rights evidence and permitted-use matrix before distribution |
| PS-13 | International child-safeguarding operational procedures and accountable roles are not evidenced | Critical | Open | Define reporting, triage, escalation, incident evidence and local mandatory-reporting procedures; validate with safeguarding specialists and local counsel |
| PS-14 | End-to-end personal-data locations, subprocessors and international transfer map is unverified | High | Unverified | Identify actual auth, hosting, analytics, AI, storage, support and backup providers; assess territorial transfers and contracts before production data use |
| PS-15 | Kenya copyright legal source is not confirmed as the latest consolidated text | Critical | Open | Retrieved Kenya Law consolidation is dated 22 Apr 2022 and explicitly says it is not the latest available version; obtain current consolidated Copyright Act and subsequent amendments/regulations, then obtain local IP counsel review before rights clearance |
| PS-16 | Kenya operator legal-entity and ODPC controller/processor registration classification is unresolved | Critical | Open | Confirm entity form, controller/processor roles and applicability of education/faith-based mandatory registration categories before any Kenyan personal-data processing |
| PS-17 | Kenya child-data DPIA, section 33 authorization and authority-verification controls are not implemented or evidenced | Critical | Open | Complete purpose-specific DPIA, legal basis/parental consent map, age assurance and proportionate authority verification before processing children's data |
| PS-18 | Kenya sensitive religious-belief data processing and cross-border transfer conditions are not approved | Critical | Open | Determine section 45 grounds, child-data safeguards, sections 48–49 transfer conditions and ODPC guidance with local counsel; keep belief/reflection data out of AI and analytics by default |

## Lifecycle
Open → Triaged → In Progress → Fixed (unverified) → Verified → Closed. Deferral requires rationale, risk acceptance authority, review date and compensating control.

Each entry should include affected path/line or commit, inspection/reproduction method, impact, acceptance criteria, remediation commit and verification result. Do not mark fixed based on a code change alone.
