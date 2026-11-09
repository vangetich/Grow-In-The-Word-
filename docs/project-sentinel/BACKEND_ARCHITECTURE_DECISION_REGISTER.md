# Backend Architecture Decision Register — Phase 00C

**Status:** Proposed decisions only unless explicitly marked otherwise.  
**Review rule:** Owner approval required before implementation where noted.

| ID | Decision | Status | Rationale / consequence | Approval gate |
|---|---|---|---|---|
| ADR-BE-001 | Preserve existing Next.js application and evolve incrementally | Proposed | Retains substantial UI/product work; service contracts introduced behind components | Owner approval |
| ADR-BE-002 | Use modular monolith as initial backend shape | Proposed | Lower operational complexity than microservices; maintain domain isolation | Owner approval |
| ADR-BE-003 | Keep infrastructure provider-neutral during Phase 00C | Accepted for this design phase | Runtime and external provider evidence incomplete | Phase 00C scope |
| ADR-BE-004 | Evaluate PostgreSQL as primary transactional database candidate | Candidate only | Relational integrity and event/record transactions fit current domain needs | Infrastructure evaluation |
| ADR-BE-005 | Keep CGR as an authoritative domain service, not a client global store | Proposed | Supports consistent learner continuity and server-side authorization | CGR design approval |
| ADR-BE-006 | Separate private journal from CGR, analytics, family projection and AI | Proposed mandatory safeguard | Limits exposure of highly sensitive reflection data | Security approval |
| ADR-BE-007 | Use hybrid RBAC + ABAC/ReBAC authorization | Proposed | Role alone cannot capture learner ownership, relationship, purpose and consent | Security/legal review |
| ADR-BE-008 | Parent access is projection- and policy-based, not blanket | Proposed mandatory safeguard | Relationship does not equal unrestricted access | Owner/legal review |
| ADR-BE-009 | Use typed, versioned contracts and idempotent event ingestion | Proposed | Reliable retries, compatibility and traceability | Contract review |
| ADR-BE-010 | Add outbox/background processing when asynchronous workloads are introduced | Proposed | Avoid lost downstream work after transactional writes | Implementation design |
| ADR-BE-011 | AI access only through controlled server-side gateway | Proposed mandatory safeguard | Context minimization, provider isolation and citation checks | AI safety review |
| ADR-BE-012 | Defer physical CGR schema and migration design | Accepted constraint | Identity, consent, persistence, migration and workload evidence not yet complete | Phase 00D/01 |
| ADR-BE-013 | Do not implement privileged admin operations using current demo gate | Accepted safeguard | Existing client gate is not authentication/authorization | Before admin integration |
| ADR-BE-014 | Runtime assurance and content provenance remain separate open workstreams | Accepted | Architecture design must not falsely close Phase 00B | Phase 00B exit |

## Open owner decisions requiring explicit approval

The following remain open. Existing owner-supported directions are recorded below but do not constitute production implementation approval.

1. Approve or amend the modular-monolith direction, domain boundaries and server-side policy model.
2. Confirm first-release jurisdictions, age groups and the order in which markets will be assessed.
3. Select an authentication/account provider only after security, recovery, child-data, regional and contractual evaluation.
4. Confirm that Google Cloud Run and managed PostgreSQL should be evaluated first; neither is selected for production.
5. Approve data classification, purposes, retention, correction, export, deletion, legal hold and backup-expiry policy.
6. Set availability targets, RPO/RTO, expected learner/concurrency/event/media volumes, operating budget and support capacity.
7. Decide whether offline capability is a first-release requirement and define sync/conflict expectations.
8. Define AI use cases, permitted data categories, consent conditions, provider constraints and human escalation boundaries.
9. Decide whether private journaling is in first-release scope and approve its threat model, encryption/key recovery and emergency-access policy.
10. Approve the care/guardian verification model, institutional scope, dispute handling and adult-transition behavior after legal/safeguarding review.

## Owner-supported directions already recorded

- ADR-BE-015/016: Cloud Run and managed PostgreSQL are leading evaluation candidates only.
- ADR-BE-017: one parent/guardian account may manage multiple learner profiles, with separate learner-level boundaries.
- ADR-BE-018: proposed 14–17 progressive-autonomy experience and adult control from 18, subject to law.
- ADR-BE-019: proposed Care & Access Pathway for verified guardians, alternative care, institutional representation and no-verified-caregiver cases.

These directions remain subject to the qualifications in their rows and to the approval gates above.
## Change control
A decision is not approved because it appears in a proposal. Record approver, date, rationale, alternatives considered, consequences and superseding decision. Reopen only when new evidence or material scope change warrants it.

## Owner feedback recorded — preliminary direction (2026-11-08)

| ID | Direction | Status | Qualification |
|---|---|---|---|
| ADR-BE-015 | Evaluate Google Cloud Run as the leading hosting candidate while comparing alternatives | Owner-supported candidate | Not a production selection; runtime assurance and cost/region review remain |
| ADR-BE-016 | Evaluate managed PostgreSQL as the primary transactional database candidate | Owner-supported candidate | Compare managed providers and document-database alternatives; no physical schema approved |
| ADR-BE-017 | Support one parent/guardian account managing multiple learner profiles | Owner-supported product direction | Each learner retains separate identity, consent, privacy and resource-level authorization boundaries |
| ADR-BE-018 | Introduce progressive autonomy for ages 14–17 and adult account control from 18, subject to law | Proposed product direction | Age bands are experience design, not legal capacity or independent consent declarations |
| ADR-BE-019 | Introduce a Care & Access Pathway for guardianship, kinship/foster care, institutional care and no-verified-guardian cases | Proposed product requirement | Legal authority must be verified; no self-appointed guardian privilege |

The detailed design is in LEARNER_IDENTITY_PROGRESSIVE_AUTONOMY_AND_CARE_PATHWAY.md. Legal and safeguarding review is required before implementation. Spiritual maturity is not a permission or legal-capacity attribute.


## Evidence reconciliation and review status — 2026-11-09

- The Phase 00B source baseline is 060ef2f9c651896aaf1d719e5b8f78ee251e054e. Commit fb0c1c2fcb5db9f853320b486a4ad2d45e824807 is a documentation-only roadmap update, not the source baseline.
- The owner confirms the app is in Google AI Studio development and is not deployed or hosted.
- The audit branch is 40 commits ahead of and 3 behind main. Main-only commits modify UI/components. Do not treat this audit branch's component map as a current-main source audit; reconcile before implementation.
- No physical schema, production provider, cloud project, authentication service, privileged operation or real-data migration is approved by this register.
- ADR-BE-015 and ADR-BE-016 authorize evaluation priority only. They do not authorize Cloud Run, Cloud SQL, PostgreSQL or another provider for production.
