# Project Sentinel — Controlled Implementation Roadmap

## Phase 00 — Documentation baseline
Create audit branch and foundational documents; verify findings against code; complete architecture reconciliation and decision review. Exit: owner-reviewed baseline; no source-code changes required.

## Phase 00B — Assurance completion
Inspect remaining routes, AI call sites, Bible data provenance, environment and deployment configuration. Run build/lint/tests in a controlled environment when execution access is available. Establish CI and test strategy. Exit: reproducible technical baseline and prioritised defects.

## Phase 01 — Identity, authorization and persistence
Select/verify authentication and database providers. Define account/learner ownership, family relationship, consent and resource authorization. Establish migrations, audit logging, secrets management and test harness. Exit: validated identity and persistence contracts.

## Phase 02 — Central Growth Record
Implement schema, service boundary, event envelope and read models. Add idempotency, concurrency, sync failure handling, export/deletion. Integrate one low-risk module as pilot. Exit: CGR acceptance tests pass and continuity works across routes.

## Phase 03 — Incremental module integration
Integrate Bedtime Shepherd, Ancient Archive, Bible Study and growth projections through service contracts. Migrate only validated data; do not import demo defaults as user history. Exit: modules use authoritative records and existing UI remains intact.

## Parallel security workstream — Teen journal and admin
Disable or clearly label demo security claims and controls. Design genuine journal encryption/key lifecycle and server-side admin authorization. Test parent/teen access boundaries independently. Exit: security review and acceptance evidence before release.

## Later phases
Proceed through Spiritual Growth, Biblical World Explorer, Wisdom & Life Application, AI Companion, Adult Study and Personal Growth only after data, privacy and governance dependencies are met.

## Change control
Every milestone needs scope, affected modules, dependency check, migration plan, acceptance tests, rollback plan, defect-register updates and owner approval. Keep main protected from unreviewed implementation changes.
