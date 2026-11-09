# Grow In The Word — Backend Architecture Vision

**Workstream:** Project Sentinel Phase 00C  
**Status:** Preliminary proposal; requires owner review  
**Evidence baseline:** Phase 00B static source review at commit 060ef2f9c651896aaf1d719e5b8f78ee251e054e; fb0c1c2fcb5db9f853320b486a4ad2d45e824807 is a documentation-only commit, not the source baseline.  
**Scope:** Logical architecture only. No provider, physical schema or deployment decision is approved.

## 1. Executive direction
Prepare the existing Next.js application for a secure, scalable, maintainable backend without replacing its current experience layer. The preferred starting pattern is a **modular monolith with explicit domain boundaries, versioned service contracts and replaceable infrastructure adapters**. This avoids premature microservices while allowing independently testable modules and later extraction where operational evidence justifies it.

The app is being developed in Google AI Studio and is not yet deployed or hosted. The repository contains Next.js 15 App Router, React 19 and TypeScript. The inspected tree did not identify application API routes, database migrations, CI workflows, tests or a service worker. This is repository evidence, not proof that no external provider configuration exists.

## 2. Outcomes
- Preserve current routes, visual identity and reusable components.
- Establish trusted identity, learner ownership, consent and server-side authorization before real learner data is persisted.
- Provide a Central Growth Record (CGR) service contract for validated learning evidence.
- Keep teen journal content in a separate privacy domain.
- Support auditability, data lifecycle controls, accessibility and safe failure behavior.
- Enable staged scaling through database indexing/partitioning, caching, background work and read models when measured demand requires them.
- Make infrastructure replaceable through ports/adapters rather than coupling domain logic to a vendor SDK.

## 3. Architectural style
### Proposed layers
1. Experience layer: existing Next.js routes and components.
2. Application/API boundary: request parsing, authentication context, rate limits, idempotency, validation and response mapping.
3. Domain modules: identity/profile, consent/governance, CGR, scripture/study, learning/assessment, family/mentorship, journal, AI gateway and engagement.
4. Ports/adapters: repositories, transaction manager, event publisher, object storage, search, cache, queue, identity provider and AI provider.
5. Infrastructure: selected managed runtime, relational database, storage, queue, secrets, telemetry, backup and recovery.

Domain modules must not read or write each other's persistence tables directly. Cross-domain interaction occurs through explicit application services or versioned events.

## 4. Core architectural invariants
- Server-side policy is authoritative; client state is never an authorization decision.
- Every learner-owned record has an explicit owner/scope and policy.
- A parent relationship does not automatically grant access to every teen resource.
- Journal body text is excluded from general CGR events, analytics and AI context by default.
- Activity, assessment evidence, mastery inference and spiritual reflection are distinct concepts.
- No holiness, salvation, divine-favour or spiritual-worth score.
- Bible text, commentary, inference and disputed interpretation remain distinguishable.
- Secrets and privileged provider credentials remain server-side.
- Writes are validated, attributable, idempotent where appropriate and auditable without logging sensitive bodies.
- Data export, correction, retention and deletion are designed from the start.

## 5. Scale strategy
Begin with a single deployable application boundary and one primary transactional store. Scale in measured stages:
- Optimize query plans and indexes before adding infrastructure.
- Use bounded pagination and cursor-based reads for event histories.
- Add cache only for safe, recomputable projections; never use cache as the authority for permissions.
- Move slow AI, media processing, notifications and large exports to durable background jobs.
- Add read models/materialized projections for analytics when query load warrants them.
- Consider database partitioning, replicas or domain extraction only after workload measurement and operational readiness.
- Define SLOs, load profiles, RPO/RTO and cost ceilings before production sizing.

No numerical capacity target is asserted until expected learner counts, event rates, content volume, geography and budget are supplied.

## 6. Explicit non-goals for Phase 00C
No physical database schema, provider selection, cloud project, production environment, identity integration, secret configuration, data migration, real journal storage, admin privilege implementation or source-code change. No microservices requirement is created.

## 7. Evidence and decision labels
- **Verified:** directly observed in the reviewed repository or explicitly stated by the owner.
- **Proposal:** recommended target design, not implemented.
- **Assumption:** provisional premise requiring validation.
- **Unknown:** evidence is not available.
- **Owner decision:** requires explicit approval.

## 8. Exit criteria
Phase 00C can be reviewed when all companion design documents exist, domain ownership and trust boundaries are coherent, open questions are recorded, proposed contracts are testable, and no proposal is misrepresented as deployed capability. Approval does not close Phase 00B runtime or content-provenance gates.


## 9. Evidence and decision review addendum — 2026-11-09

### Verified facts and source baseline
- The Phase 00B source review identifies 060ef2f9c651896aaf1d719e5b8f78ee251e054e as the source commit reviewed on 2026-11-08. The previously listed fb0c1c2fcb5db9f853320b486a4ad2d45e824807 is a documentation-only commit that updated the roadmap; it is not the Phase 00B source baseline.
- The owner confirms that the application is being developed in Google AI Studio and is not deployed or hosted. The standalone-output setting and .env.example placeholders/comments are configuration/documentation evidence, not evidence of a live deployment.
- The audit branch is three commits behind current main. Main-only commits modify the application UI/component tree, while the audit-branch changes reviewed here are documentation-only. The architecture remains a logical design; component-level implementation mapping must be reconciled against current main before implementation.

### Proposals
- Retain the modular-monolith direction, explicit domain ownership, typed service contracts and replaceable infrastructure adapters.
- Treat Cloud Run and managed PostgreSQL only as leading evaluation candidates, not selected providers.
- Treat the Central Growth Record as a domain service and authoritative record boundary, not a shared client-side store.
- Keep private reflections, safeguarding records and identity secrets outside general learning events, analytics and AI context by default.

### Assumptions requiring validation
- The existing Next.js application remains the experience layer for the first backend increment.
- A single deployable application boundary and one primary transactional store are operationally simpler than early microservices.
- The initial backend can be modularized without a full UI replacement; this requires runtime and integration evidence.

### Unresolved questions
- Launch jurisdictions, age bands, authentication provider, account recovery, consent evidence, retention, export/deletion, data residency, offline requirements, AI purposes, journal privacy model, capacity, RPO/RTO, availability targets and operating budget.
- Whether any external authentication, database, storage, analytics or AI services exist outside the inspected repository remains unverified.

### Owner approval required
Approve the logical architecture and domain boundaries before implementation. Separately approve provider evaluation criteria, launch scope, privacy/retention policy, operational targets and any journal/AI processing. No approval is implied by this proposal.
