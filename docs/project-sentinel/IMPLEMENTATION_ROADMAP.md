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

## Phase 00D — International legal, child protection and intellectual property governance
- **Created on the Phase 00D branch:** master international governance blueprint, governance acceptance criteria/test plan and starter jurisdiction assessment register.
- **Status:** initial documentation baseline created; preliminary Kenya desk assessment added. Kenya, Uganda, Tanzania and Rwanda now have preliminary desk assessments. All remain research-in-progress, not counsel-reviewed and not launch-approved. Tanzania requires separate Mainland/Zanzibar treatment for non-Union matters; Rwanda's under-16 data-consent trigger and under-18 child-protection definition must remain distinct; Uganda's 2026 copyright amendment requires specific IP review.
- **Scope:** global baseline plus jurisdiction-specific assessment; child protection; privacy and consent; age assurance; legal authority and progressive autonomy; sensitive belief data; AI/provider governance; international transfers; copyright and content licensing; launch gates.
- **Constraints:** documentation-only; preserve application source and Phase 00C architecture; no jurisdiction engine, authentication changes, database schema, production provider selection, real child-data processing or launch approval.
- **Exit:** owner-approved blueprint; priority jurisdictions assessed with authoritative current sources and counsel status; controls mapped to evidence and acceptance tests; rights inventory model defined; critical gaps registered; no claim of legal compliance or launch readiness.
- **Deliverables:** PHASE_00D_MASTER_INTERNATIONAL_GOVERNANCE_BLUEPRINT.md; PHASE_00D_ACCEPTANCE_CRITERIA_AND_TEST_PLAN.md; INTERNATIONAL_JURISDICTION_REGISTER.md; KENYA_JURISDICTION_LEGAL_REQUIREMENTS_ASSESSMENT.md; UGANDA_JURISDICTION_LEGAL_REQUIREMENTS_ASSESSMENT.md; TANZANIA_JURISDICTION_LEGAL_REQUIREMENTS_ASSESSMENT.md; RWANDA_JURISDICTION_LEGAL_REQUIREMENTS_ASSESSMENT.md.
- **Branch:** `project-sentinel/phase-00d-international-governance`, based on `project-sentinel/phase-00-audit`.

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


## Phase 00D — East African comparative governance synthesis

- **Created:** `EAST_AFRICAN_COMPARATIVE_LEGAL_REQUIREMENTS_AND_JURISDICTION_DIFFERENCES_MATRIX.md`.
- **Scope:** comparative regional baseline, four-country legal-difference matrix, feature-level gates, jurisdiction-policy inputs/outputs, fail-closed conditions, vendor/transfer review, Scripture/content-rights model, online-safety governance, 25 comparative acceptance criteria and 16 policy test vectors.
- **Key preserved differences:** Kenya/Uganda under-18 child-data authorization; Tanzania child-related data as sensitive and Mainland/Zanzibar distinction; Rwanda under-16 Article 9 consent trigger versus under-18 child protection; Rwanda foreign-storage certificate; Uganda Act 8 of 2026 copyright amendments.
- **Status:** draft synthesis; owner review and local counsel review outstanding in all four jurisdictions.
- **Constraints:** no application source changes; no Phase 00C architecture rewrite; no jurisdiction engine implementation; no provider selection; no real child-data processing; no launch approval.
- **Next exit evidence:** owner review, jurisdiction-specific counsel answers, current-source verification, approved rule catalogue and traceable policy test cases.

## Phase 00D — Jurisdiction rule catalogue and policy decision specification

- **Created:** `PHASE_00D_JURISDICTION_RULE_CATALOGUE.md`, `PHASE_00D_POLICY_DECISION_SPECIFICATION.md`, and `PHASE_00D_POLICY_TEST_VECTORS.md`.
- **Acceptance coverage:** PDS-001–PDS-020 added to `PHASE_00D_ACCEPTANCE_CRITERIA_AND_TEST_PLAN.md`; 50 proposed synthetic policy vectors cover age/jurisdiction differences, authority, sensitive data, AI, transfer/storage, rights and fail-safe behavior.
- **Design:** rule classes LAW, REG, BASELINE, OPEN, OPS and IP; explicit rule lifecycle; required provenance and applicability fields; deterministic decision pipeline; DENY/HOLD precedence; server-side enforcement boundary.
- **Key distinctions preserved:** product under-18 safeguarding baseline is not a universal statutory consent age; Rwanda under-16 Art.9 trigger is separate from under-18 protection; Tanzania Mainland and Zanzibar non-Union matters are not interchangeable; Rwanda foreign storage authorization is separate from transfer safeguards.
- **Status:** draft documentation only; source validation, owner approval and local counsel review remain outstanding. No rule is implementation-eligible.
- **Constraints:** no application source/UI changes; no Phase 00C rewrite; no policy engine, schema, provider selection, real child-data processing or launch approval.
- **Next exit evidence:** source-by-source legal review, Zanzibar assessment, owner-approved policy outcomes, accountable roles, exception process, synthetic test review and explicit authorization for a later implementation phase.
