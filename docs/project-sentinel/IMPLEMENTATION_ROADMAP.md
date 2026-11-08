# Project Sentinel — Controlled Implementation Roadmap

## Phase 00 — Documentation baseline
Create audit branch and foundational documents; verify findings against code; complete architecture reconciliation and decision review. **Status:** documentation baseline created; review branch remains separate from main.

## Phase 00B — Evidence verification and architecture review
- **Completed:** complete recursive tree inventory (75 tracked files); selected route/component/configuration review; line-referenced evidence report; updated defect, security, data and architecture registers.
- **Outstanding:** confirm deployment/provider configuration; inspect live AI Studio/Cloud Run setup if used; establish whether external auth/database/storage exists; verify translation rights; run install/build/lint/test in a controlled environment; verify browser behavior and accessibility.
- **Exit:** reproducible runtime baseline, provider map, rights register and owner-reviewed risk disposition. Static review alone does not satisfy exit.

## Phase 00C — Preliminary backend architecture design
- **Created:** nine provider-neutral design documents covering architecture vision, domain boundaries, trust/data flows, database/storage requirements, identity/authorization/consent, API/service contracts, infrastructure evaluation, architecture decisions and acceptance tests.
- **Status:** design package created on the audit branch; owner review and approval outstanding.
- **Constraints:** no production provider selected; no physical database schema; no source-code changes; no deployment, privileged operations or real-data migration.
- **Outstanding parallel gates:** runtime/build/browser assurance and Bible/content provenance remain open under Phase 00B.
- **Exit:** owner reviews domain boundaries, privacy model, provider evaluation criteria, unresolved decisions and test plan; only then proceed to Phase 00D requirements/evaluation.

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
