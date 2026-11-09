# Infrastructure Options Assessment

**Status:** Evaluation framework only. No production vendor, hosting platform or database approved.

## 1. Current verified position
Owner states the app is being developed in Google AI Studio and has not yet been deployed or hosted. Repository evidence shows Next.js 15, React 19, TypeScript, Bun lockfile, standalone output configuration, Google GenAI SDK dependency and an environment example mentioning GEMINI_API_KEY and APP_URL. No deployment topology or external provider setup has been verified.

## 2. Hosting options to evaluate
| Option | Potential fit | Evidence/questions |
|---|---|---|
| Google Cloud Run | Managed container runtime; natural candidate for Next.js standalone/container deployment | Need build/runtime verification, region, networking, secrets, scaling-to-zero, min instances, ingress and cost |
| Managed Next.js platform | May reduce framework deployment operations | Need region/data location, server runtime limits, portability, costs and contractual terms |
| Self-managed container platform | More control | Higher operational burden, patching, scaling and incident response |

Cloud Run is a candidate, not a decision. AI Studio development does not automatically imply Cloud Run deployment.

## 3. Database options to evaluate
- Managed PostgreSQL: strong relational integrity, transactions and portability; verify region, connection pooling, backups, restore and cost.
- Managed document database: evaluate if access patterns are document-centric; verify relational reporting, transaction semantics and policy complexity.
- Backend-as-a-service: evaluate bundled identity/database/storage; verify authorization rules, portability, data location and vendor coupling.

PostgreSQL is the current leading architectural candidate, not an approved vendor or schema decision.

## 4. Supporting services
Evaluate managed object storage for approved media; durable queue/outbox for asynchronous tasks; cache for safe projections; search for licensed/indexable content; centralized secrets manager; metrics/logging/tracing; backup/restore. Introduce only when requirements justify them.

## 5. AI integration
The repository contains @google/genai and a GEMINI_API_KEY placeholder, but active application call sites and deployed service behavior are unverified. Any provider API key must be held server-side. AI Gateway must mediate context, consent, redaction, citation verification, quotas, logging and provider fallback. Review vendor data processing, retention, training, region and child-data terms before transmitting learner information.

## 6. Evaluation scorecard
Score each candidate against: security model; child/teen data suitability; regional availability/data residency; identity integration; transaction and migration support; scale characteristics; backups/RPO/RTO; observability; portability; developer experience; operational skills required; cost at low/expected/high load; support and contractual terms.

No numeric scores should be assigned until requirements and comparable vendor evidence are collected.

## 7. Cost and capacity model inputs
Expected registered/active learners; peak concurrency; read/write ratio; learning events per learner/day; AI requests and token budgets; media upload/download volume; retention period; geographic distribution; support hours; recovery objectives; monthly budget and growth runway.

## 8. Deployment readiness checklist
Reproducible dependency install and lockfile; lint/type-check/build; container or platform build; environment variable inventory; secret injection and rotation; health/readiness checks; structured logs; metrics/traces; TLS/domain; database migration job; backup/restore test; CI/CD approvals; rollback; staging environment; security review; load test; incident runbook.

## 9. Decision gate
Select a provider only after runtime assurance, requirements discovery, legal/data residency review, comparative evidence, cost model and owner approval. Do not provision production resources in Phase 00C.

## Owner-supported evaluation direction

The owner supports evaluating Google Cloud Run as the leading hosting candidate while comparing alternatives, and managed PostgreSQL as the leading transactional database candidate. A Cloud Run plus managed PostgreSQL pairing (including Cloud SQL for PostgreSQL as one candidate) should be evaluated first for integration fit, region/data residency, network connectivity, connection pooling, backups/PITR, high availability, cost and operational burden. Compare at least one alternative hosting approach and other managed PostgreSQL options; retain a document-database comparison only against concrete access patterns. No production provider is selected by this direction.


## 10. Evidence and provider-decision addendum — 2026-11-09

### Current environment facts
The owner confirms that the application is being developed in Google AI Studio and is not currently deployed or hosted. The repository's .env.example contains placeholders and explanatory comments about AI Studio secrets and a possible Cloud Run URL; these comments do not verify that a Cloud Run service, production secret, database or external backend exists. The Next.js standalone-output setting is a build configuration, not deployment evidence.

The Phase 00B source baseline is 060ef2f9c651896aaf1d719e5b8f78ee251e054e. The audit branch is 40 commits ahead of and 3 behind current main. Main-only changes include application UI/component updates; no merge was performed in this design milestone. Reconcile the source branch before implementation and rerun affected build/runtime checks.

### Candidate status
- Google Cloud Run remains the leading hosting candidate to evaluate alongside at least one credible alternative.
- Managed PostgreSQL remains the leading transactional database category to evaluate; Cloud SQL for PostgreSQL is one candidate, not a selection.
- No provider, region, database, storage, identity, queue, analytics or AI vendor is selected.
- No production resources should be provisioned as part of Phase 00C.

### Evaluation evidence required
For each candidate, obtain current regional availability, child-data and sensitive-data terms, data-processing/subprocessor terms, transfer and support-access details, backup/PITR and restore evidence, network and connection-pooling constraints, security controls, observability, portability/export, service limits, pricing at low/expected/high load and operational skill requirements. Evaluate the complete data path, not just the compute region.

### Evidence labels
- **Verified:** source configuration and dependencies described above; owner-confirmed non-deployment status.
- **Proposed:** provider-neutral ports/adapters and candidate comparison.
- **Assumption:** a managed runtime and managed relational database may reduce early operational burden.
- **Unresolved:** runtime compatibility, region, cost, scale, contractual terms, identity integration, networking, RPO/RTO and support model.
- **Approval:** vendor and region selection requires evidence review and explicit owner approval; legal/privacy review is a separate gate.
