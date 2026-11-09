# Project Sentinel — Controlled Implementation Roadmap

## Phase 00 — Documentation baseline
Create audit branch and foundational documents; verify findings against code; complete architecture reconciliation and decision review. **Status:** documentation baseline created; review branch remains separate from main.

## Phase 00B — Evidence verification and architecture review
- **Completed:** complete recursive tree inventory (75 tracked files); selected route/component/configuration review; line-referenced evidence report; updated defect, security, data and architecture registers.
- **Outstanding:** confirm deployment/provider configuration; inspect live AI Studio/Cloud Run setup if used; establish whether external auth/database/storage exists; verify translation rights; run install/build/lint/test in a controlled environment; verify browser behavior and accessibility.
- **Exit:** reproducible runtime baseline, provider map, rights register and owner-reviewed risk disposition. Static review alone does not satisfy exit.

## Phase 00C — Preliminary backend architecture design
- **Created and reviewed:** nine provider-neutral architecture documents plus BACKEND_ARCHITECTURE_REVIEW_RECORD.md.
- **Status:** documentation review complete on project-sentinel/phase-00-audit; owner approval and legal/security review remain outstanding.
- **Architecture direction:** modular monolith, explicit domain ownership, server-side resource authorization, Central Growth Record service contract, separate private-reflection boundary, typed/versioned contracts and replaceable infrastructure adapters.
- **Candidate evaluation only:** Google Cloud Run and managed PostgreSQL are leading candidates to assess; neither is selected for production.
- **Constraints:** no physical schema, production vendor/region selection, source-code changes, deployment, privileged operations or real-data migration.
- **Environment:** owner confirms development in Google AI Studio; the app is not deployed or hosted. Repository placeholders and standalone-output configuration do not prove deployment.
- **Source dependency:** audit branch is 3 commits behind current main; main-only UI/component changes must be reconciled before implementation. No merge was performed in this milestone.
- **Outstanding parallel gates:** runtime/build/browser assurance, jurisdiction/privacy/safeguarding review and Bible/content provenance remain separate and open.
- **Exit:** owner approves logical boundaries, unresolved decisions, provider evaluation criteria, operational targets and test plan; implementation still waits for runtime, legal, security and source-reconciliation gates.

## Phase 01 — Identity, authorization and persistence
Select/verify authentication and database providers. Define account/learner ownership, family relationship, consent and resource authorization. Establish migrations, audit logging, secrets management and test harness. Exit: validated identity and persistence contracts.

## Phase 02 — Central Growth Record
Only after Phase 01 decisions are supported by evidence, finalize physical schema, service boundary, event envelope and read models. Add idempotency, concurrency, sync failure handling, export/deletion. Integrate one low-risk module as pilot. Exit: CGR acceptance tests pass and continuity works across routes.

## Phase 03 — Incremental module integration
Integrate Bedtime Shepherd, Ancient Archive, Bible Study and growth projections through service contracts. Migrate only validated data; do not import demo defaults as user history. Exit: modules use authoritative records and existing UI remains intact.

## Parallel security workstream — Teen journal and admin
Disable or clearly label demo security claims and controls. Design genuine journal encryption/key lifecycle and server-side admin authorization. Test parent/teen access boundaries independently. Exit: security review and acceptance evidence before release.

## Content and offline workstreams
Verify Bible translation rights/source provenance before distributing texts. Implement or remove offline-readiness promises until actual caching, update and conflict behavior are tested.

## Later phases
Proceed through Spiritual Growth, Biblical World Explorer, Wisdom & Life Application, AI Companion, Adult Study and Personal Growth only after data, privacy and governance dependencies are met.

## Change control
Every milestone needs scope, affected modules, dependency check, migration plan, acceptance tests, rollback plan, defect-register updates and owner approval. Keep main protected from unreviewed implementation changes.

## Phase 00C owner decisions and care pathway refinement
- Owner supports Google Cloud Run as the leading hosting candidate, subject to comparison and approval; managed PostgreSQL is the leading database candidate, subject to provider evaluation.
- Owner supports one parent/guardian account managing multiple learner profiles with separate learner-level privacy boundaries.
- Added a proposed progressive-autonomy model for ages 14–17 and adult control from 18, subject to applicable law and verified authority.
- Added the Care & Access Pathway covering legally authorized guardians, kinship/foster care, institutional care and children without verified caregivers.
- Explicitly separates legal authority, account autonomy and spiritual development. Spiritual maturity is not an authorization attribute.
- Added safeguards for non-Christian/non-religious households: transparent Christian purpose, no inferred belief, no discriminatory denial and purpose-limited handling of religious reflections.
- Detailed design: LEARNER_IDENTITY_PROGRESSIVE_AUTONOMY_AND_CARE_PATHWAY.md. Legal and safeguarding review remains mandatory before implementation.
