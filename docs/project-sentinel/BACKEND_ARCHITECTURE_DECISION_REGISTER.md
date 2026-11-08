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

## Open owner decisions
1. Is Cloud Run the preferred deployment candidate to evaluate first, or should comparison begin provider-neutral across several platforms?
2. Is PostgreSQL acceptable as the leading database candidate for evaluation?
3. Should one account be able to manage multiple learner profiles?
4. What guardian/teen relationship and independent-privacy model is intended?
5. Which launch jurisdictions and age bands are in scope for the first release?
6. Is offline use a first-release requirement?
7. What are the initial and three-year learner, traffic and media-volume expectations?
8. What monthly infrastructure/operations budget range should the evaluation use?
9. What privacy level and recovery model is required for private journaling?
10. Which AI use cases may access which learner data, and under what consent?

## Change control
A decision is not approved because it appears in a proposal. Record approver, date, rationale, alternatives considered, consequences and superseding decision. Reopen only when new evidence or material scope change warrants it.
