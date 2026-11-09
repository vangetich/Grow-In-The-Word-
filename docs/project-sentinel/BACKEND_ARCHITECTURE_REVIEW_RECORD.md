# Phase 00C — Preliminary Backend Architecture Review Record

**Project:** Grow In The Word  
**Repository:** vangetich/Grow-In-The-Word-  
**Target branch:** project-sentinel/phase-00-audit  
**Review date:** 2026-11-09  
**Status:** Architecture package reviewed and refined; owner approval outstanding  
**Scope:** Provider-neutral logical architecture only. No application source changes.

## 1. Executive disposition

The nine Phase 00C architecture documents exist on the audit branch and have been reviewed as a coherent preliminary design package. The recommended direction remains a modular monolith with explicit domain boundaries, typed/versioned service contracts and replaceable infrastructure adapters. The package is suitable for owner review, but it is not an implementation authorization, production architecture approval, legal opinion, security certification or launch decision.

The application remains in Google AI Studio development and, as confirmed by the owner, is not deployed or hosted. No runtime, external provider, production secret, database or live service has been verified through this review.

## 2. Repository and evidence baseline

### 2.1 Source baseline and commit distinction

- Phase 00B records the source commit reviewed on 2026-11-08 as 060ef2f9c651896aaf1d719e5b8f78ee251e054e.
- Commit fb0c1c2fcb5db9f853320b486a4ad2d45e824807 is a documentation-only commit that updated the Project Sentinel roadmap. It must not be described as the source-code baseline.
- The audit branch and current main have diverged. GitHub comparison reports the audit branch 40 commits ahead of and 3 commits behind main, with 060ef2f9c651896aaf1d719e5b8f78ee251e054e as their merge base.
- The three main-only commits change app/page.tsx and multiple application components, including Bible reader/study and navigation/visualization components, and add README.md and App History.md. No merge or source-code modification was made during this Phase 00C review.
- The architecture documents remain on the requested audit branch. Their logical direction is still useful, but UI/component mappings must be reconciled against current main before implementation.

### 2.2 Owner-confirmed environment

The application is currently being developed in Google AI Studio and has not yet been deployed or hosted. The repository's .env.example contains placeholder values and explanatory comments about AI Studio secret injection and a possible Cloud Run URL. Those comments do not prove that Cloud Run, an API, an identity provider, a database or any external service is deployed. The Next.js standalone-output setting is a build configuration only.

### 2.3 Verified repository evidence

The Phase 00B static review records a complete 75-file tracked tree at its source baseline and selected route/component/configuration inspection. Among the findings:

- Next.js 15 App Router, React 19, TypeScript 5.9, Tailwind CSS 4, Motion, D3 and Recharts are present in the package/configuration baseline.
- The package includes @google/genai and a GEMINI_API_KEY placeholder, but active application AI call sites and external AI behavior remain unverified.
- No app/api routes, database schema/migrations, test directory, CI workflow, service worker or root README were identified in the reviewed 75-file tree.
- Onboarding is a client-side demonstration; a real authentication/account lifecycle was not verified.
- Teen journal content is held in React state with seeded content and mock cipher labels; the inspected path does not establish encryption or durable private storage.
- The admin gate is client-side demonstration logic and cannot protect privileged operations.
- Growth values are route-local and seeded inconsistently. Some reader/prayer state uses localStorage, not a verified authenticated learner record.
- Offline readiness and Bible translation/content rights are not established.
- No dependency install, build, lint, test, browser run, deployment inspection, penetration test or legal review was performed.

See PHASE_00B_EVIDENCE_VERIFICATION.md, PROJECT_SENTINEL_PHASE_00_AUDIT.md, CURRENT_ARCHITECTURE.md, DATA_SCHEMA_AUDIT.md, SECURITY_AND_PRIVACY_REGISTER.md and CONTINUING_DEFECT_REGISTER.md for the underlying evidence.

## 3. Evidence classification

### Verified facts
- The facts listed in Section 2 are grounded in the Phase 00B report and repository configuration at the recorded source baseline.
- The owner confirms non-deployment/non-hosting and current Google AI Studio development.
- The requested audit branch exists and contains the Phase 00C design package.
- The audit branch is behind current main by three commits; main-only commits contain application UI/component changes.

### Proposals
- Modular monolith as the first backend shape.
- Domain-owned application services and persistence ports; no direct cross-domain table access.
- Server-side identity, consent and resource-level authorization.
- Central Growth Record as an authoritative domain service.
- Separate private reflection and safeguarding boundaries.
- A controlled AI Gateway and purpose-limited external processor access.
- Typed/versioned contracts, idempotency, transactional outbox and bounded background work.
- Managed relational persistence as a category to evaluate; PostgreSQL is a leading candidate.
- Google Cloud Run as a leading hosting candidate to evaluate against alternatives.

### Assumptions
- The existing Next.js application remains the experience layer for the first backend increment.
- One deployable modular application and one primary transactional store are simpler to operate initially than microservices.
- Domain isolation can be maintained inside a modular monolith and tested through architecture/contract tests.
- Existing UI can be preserved while simulated behavior is replaced behind service contracts.

### Unresolved
- Authentication provider, session/recovery model and account lifecycle.
- Launch jurisdictions, age bands, child/teen legal model and caregiver authority verification.
- Data categories, lawful purposes, consent/assent, retention, export, correction and deletion.
- Database/hosting/storage/queue/AI vendors, regions, subprocessors and transfer mechanisms.
- Learner volumes, peak concurrency, event rates, media volume, offline synchronization, availability targets, RPO/RTO and budget.
- AI use cases and permitted data; private journal encryption/key recovery; safeguarding workflow and access roles.
- Bible translation, commentary, audio, image, video, API and other content rights. This remains a separate workstream.

### Decisions requiring owner approval
- Approve the proposed logical architecture and domain boundaries.
- Confirm first-release jurisdictions, age groups and product scope.
- Confirm the evaluation order for Cloud Run and managed PostgreSQL candidates; do not treat either as selected.
- Approve identity/account model, multiple learner profiles and the care/guardian pathway.
- Approve privacy classifications, purposes, retention/deletion and adult-transition behavior.
- Approve whether offline capability and AI features are in the first release.
- Approve expected capacity, availability, RPO/RTO, operating budget and support model.
- Approve the journal threat model and whether private journal storage is in scope.

## 4. Cross-document architecture review

| Document | Review result | Required control / dependency |
|---|---|---|
| BACKEND_ARCHITECTURE_VISION.md | Coherent modular-monolith direction; source-baseline wording corrected | Owner approval; source branch reconciliation before implementation |
| BACKEND_DOMAIN_BOUNDARY_MAP.md | Clear domain ownership and least-privilege collaboration | Add explicit content-rights and safeguarding capability boundaries; no implied implementation |
| BACKEND_DATA_FLOW_AND_TRUST_BOUNDARIES.md | Appropriate untrusted-client and server-policy model | Add processor/transfer, derived-data deletion and logging controls |
| DATABASE_AND_STORAGE_REQUIREMENTS.md | Logical storage classes and CGR requirements are sound | No physical schema until identity, retention, provider and workload evidence exists |
| IDENTITY_AUTHORIZATION_AND_CONSENT_ARCHITECTURE.md | Hybrid resource-level policy is appropriate | Keep legal authority, product autonomy and spiritual development distinct |
| API_AND_SERVICE_CONTRACTS.md | Typed/versioned contracts and idempotency are suitable | Contracts are not endpoints; authorize background jobs and exports too |
| INFRASTRUCTURE_OPTIONS_ASSESSMENT.md | Provider-neutral scorecard and candidate set retained | Explicitly record non-deployment; evaluate regions, contracts, cost and recovery before selection |
| BACKEND_ARCHITECTURE_DECISION_REGISTER.md | Proposed decisions and owner-supported directions retained | Replace stale open questions with current approval gates |
| BACKEND_FOUNDATION_ACCEPTANCE_TEST_PLAN.md | Tests cover boundaries, identity, CGR, resilience and care | Add governance, processor, deletion, recovery and performance criteria; none are passed |

## 5. Recommended target architecture

The first backend increment should be one deployable modular application, not a microservice fleet:

1. Existing Next.js experience layer, preserved and incrementally integrated.
2. Server-side transport/application boundary for authentication context, validation, rate limits, idempotency, policy evaluation and response mapping.
3. Domain modules for identity/account, learner profile, consent/governance, CGR, scripture/study, learning/assessment, family/care, private reflection, AI mediation, content rights and trust/operations.
4. Ports/adapters for persistence, transaction management, identity, object storage, queue/outbox, cache, search, email and AI providers.
5. Infrastructure selected only after runtime, legal, region, workload, security, cost and operational evaluation.

The Central Growth Record must store validated learning evidence and bounded projections. It must not become a general-purpose repository for private journal text, credentials, safeguarding narratives or raw AI prompts. Activity, assessment evidence, inferred skill and spiritual reflection remain distinct.

## 6. Security and privacy controls

Minimum design controls before protected data is processed:

- Server-side authentication and resource-level authorization on every request and background job.
- Least privilege, deny-by-default, verified relationship/authority, purpose limitation and consent/assent lifecycle.
- Isolation between learner profiles; guardian access is a policy-filtered projection, not blanket visibility.
- No real teen journal collection until a threat model, encryption/key lifecycle, recovery and deletion design are reviewed and tested.
- No real privileged admin operations behind the current client-side demo gate.
- Minimize child and sensitive religious data; do not infer religious identity or use spiritual maturity as an access attribute.
- AI Gateway with allowlisted context, redaction, purpose checks, provider terms review and citation validation.
- Secret management, TLS, CSRF/XSS/injection/SSRF/IDOR/BOLA controls, rate limits and safe errors.
- Audit security decisions without logging journal bodies, credentials or unnecessary child data.
- Data-rights propagation across derived stores and processors; documented retention and backup exceptions.
- Incident response, breach handling and safeguarding procedures before launch.

## 7. Scalability and reliability

Scale by evidence, not assumption. First establish workload profiles and operation-specific p50/p95/p99 latency targets. Use bounded cursor pagination, query/index analysis, connection pooling and transaction discipline. Add caches only for recomputable data and never as permission authority. Introduce durable queues/outbox for slow work and read models for measured dashboard/analytics load. Consider partitioning, replicas or domain extraction only after measured bottlenecks and operational readiness. Owner-approved availability, RPO/RTO, backup retention and restore-test targets are prerequisites.

## 8. Dependency order

1. Reconcile audit-branch source assumptions with current main.
2. Complete separate runtime/build/browser assurance in the actual AI Studio development environment and a reproducible local/CI environment.
3. Complete jurisdiction, child-safeguarding, privacy and content-rights workstreams independently.
4. Approve identity, account ownership, consent, authority and resource authorization.
5. Confirm data classification, retention, export/deletion, key management and processor constraints.
6. Evaluate hosting, database, storage and identity vendors with current region, contract, cost and operational evidence.
7. Finalize transport/API contracts and test harness.
8. Only then design physical schema/migrations and implement a low-risk pilot.
9. Integrate other modules incrementally; migrate only records with verified provenance and ownership.

## 9. Acceptance status

The proposed acceptance plan contains BE-001 through BE-074. These are design criteria only. No runtime or acceptance test was executed during this review. Phase 00B runtime assurance and content provenance remain open and are not closed by this architecture review.

## 10. Phase 00C non-goals and disposition

This review does not:
- finalize a physical database schema;
- select production vendors or regions;
- provision or deploy infrastructure;
- implement authentication, authorization or privileged operations;
- migrate real learner data;
- enable real teen journaling or AI processing of child data;
- certify security, legal compliance or launch readiness;
- close runtime assurance or content provenance.

**Disposition:** Phase 00C documentation review is complete on the requested audit branch. Owner approval and the dependencies above remain outstanding. No application source code was modified.
