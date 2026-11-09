# Database & Storage Requirements

**Status:** Requirements and options only. No physical schema or provider selection approved.

## 1. Workload categories
- Transactional identity/profile/consent and relationship records.
- Append-oriented learning activity and assessment evidence.
- Read-heavy learner progress summaries and dashboards.
- Scripture catalogue metadata, translation/version and provenance records.
- Media assets (audio, images, documents).
- Potentially highly sensitive private reflection content.
- Operational audit events, background-job state and analytics projections.

These categories have different retention, access, indexing and recovery requirements. Do not place all data into one undifferentiated table or bucket.

## 2. Primary transactional store requirements
Evaluate a managed relational database, with PostgreSQL as a strong candidate rather than an approved selection. Required capabilities:
- ACID transactions and referential integrity.
- Unique constraints and idempotency support.
- Row/record ownership model and server-enforced access policy.
- Schema migration/versioning and rollback strategy.
- Point-in-time recovery and tested backups.
- Encryption in transit and at rest; key-management integration.
- Indexing, query plans, bounded pagination and observability.
- Connection pooling and controlled concurrency for serverless runtimes.
- Regional availability, data residency and vendor exit/export path.
- Cost visibility and scaling path.

Do not rely solely on client-side row filters or security rules without a documented server-side threat model and tests.

## 3. Logical storage separation
| Store class | Candidate content | Requirements |
|---|---|---|
| Transactional relational | Identity references, profiles, consent, CGR, relationships | Strong consistency, constraints, migrations |
| Object/media | Approved audio, images, documents | Signed access, lifecycle, content type/size checks |
| Private reflection | Journal content if later approved | Dedicated access/key model, strict isolation |
| Cache | Recomputable public/catalogue/read projections | TTL, invalidation, no permission authority |
| Search | Approved indexable scripture/resources | Source provenance, deletion propagation |
| Queue/outbox | Notifications, exports, AI jobs, projection updates | Durable retry, idempotent consumers |
| Audit | Security and access decision metadata | Tamper resistance, restricted access, retention |

These are logical roles; early implementation may use fewer managed products if isolation and policy requirements remain satisfied.

## 4. CGR data requirements (logical only)
Future CGR records need stable identifiers, learner ownership, event type, occurred/recorded timestamps, actor provenance, source module, schema version, validation status and idempotency semantics. Assessment evidence and mastery inferences must retain rubric/version provenance. Reflection may have metadata-only events; journal body is excluded.

This is not a physical schema. Field types, normalization, table boundaries, indexes and partition keys remain deferred until identity, provider, retention, migration and workload evidence is complete.

## 5. Scale and performance
- Define expected monthly active learners, peak concurrent sessions, write events per learner/day, media growth, retention and geographic distribution.
- Establish p50/p95/p99 latency targets per operation.
- Use cursor pagination for event timelines and exports.
- Index access paths based on actual query patterns and explain plans.
- Avoid unbounded dashboard queries and N+1 data access.
- Use asynchronous processing for long-running work.
- Consider partitioning, replicas, caching and search only after load tests identify bottlenecks.
- Define tenant/account/learner access patterns before selecting partitioning keys.

## 6. Reliability and recovery
Owner must approve recovery point objective (RPO), recovery time objective (RTO), backup retention and restore-test frequency. Backups must be encrypted, access-controlled and tested. Deletion workflows must account for replicas, caches, search indexes, object versions, backups and legal retention exceptions.

## 7. Migration requirements
Inventory all browser-local and seeded values. Classify demo data versus user data before migration. Do not merge inconsistent starting scores (e.g. 45/70/40) as historical learner truth. Create versioned, repeatable migrations with preflight validation, backup, reconciliation counts, rollback/forward-fix plan and audit trail. Dual-write is not a default; if needed, define consistency and cutover rules.

## 8. Provider evaluation criteria
Security and compliance fit; data location; operational maturity; managed backup/restore; connection model; cost at projected load; portability; observability; developer ergonomics; integration with eventual hosting; contractual terms; exit/export. No provider selected by this document.

## 9. Inputs still required
User growth projections, expected content/media volume, budget, launch countries, retention rules, offline-sync requirement, guardian/teen model, journal privacy requirements, availability target and expected support/operations capacity.


## 10. Evidence and schema decision addendum — 2026-11-09

### Verified baseline
The Phase 00B review found browser-local preferences/progress and prayer-petition storage, route-local seeded growth state, and no central learner schema or migration set in the reviewed repository tree. This is evidence about the reviewed source baseline, not proof that no external database exists. External persistence remains unverified. The owner confirms that no application hosting/deployment is currently in place.

### Proposed logical requirements
- Separate transactional account/learner/governance records, learning events/evidence, approved content metadata, private reflection, safeguarding cases, media objects, derived projections, queues and security audit records by access and lifecycle requirements.
- Define ownership, purpose, classification, retention, correction, export, deletion, legal hold, backup expiry and processor propagation before choosing physical tables or buckets.
- Treat private journal storage as deferred. Do not persist real journal content until the threat model, cryptographic design, key recovery/loss behavior, access policy and deletion model are approved and tested.
- Distinguish source records from caches, analytics read models and search indexes. Derived stores must be rebuildable or have a documented reconciliation strategy.

### Assumptions and unresolved evidence
Workload assumptions, learner volumes, event rates, media growth, geography, concurrency, offline synchronization and retention are not yet quantified. PostgreSQL is a leading relational candidate only. No table design, index plan, partition key, database vendor or storage provider is approved.

### Approval gate
A physical schema and migration plan may be prepared only after identity/authorization, jurisdiction, data classification, retention, provider, source-data inventory and workload decisions are supported by evidence and approved. Demo seeds and browser-local values must never be silently migrated as verified learner history.
