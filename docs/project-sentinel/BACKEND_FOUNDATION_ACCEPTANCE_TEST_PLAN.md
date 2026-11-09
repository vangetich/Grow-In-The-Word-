# Backend Foundation Acceptance Test Plan

**Status:** Proposed acceptance criteria. No tests have been implemented or executed.

## 1. Purpose
Define testable conditions for a future backend foundation. This plan does not establish runtime readiness or claim any test has passed.

## 2. Architecture and boundary tests
| ID | Test | Expected result |
|---|---|---|
| BE-001 | Domain module attempts direct access to another domain's persistence adapter | Architecture test fails / boundary violation detected |
| BE-002 | API receives unknown or malformed request fields | Rejected with stable validation error |
| BE-003 | Client supplies actor role/admin flag/consent status | Ignored; server derives trusted context |
| BE-004 | Client changes learner identifier to another learner | Denied server-side |
| BE-005 | Policy service is unavailable for protected data | Fail closed |
| BE-006 | Sensitive data appears in application logs | Test fails; redaction enforced |

## 3. Identity, authorization and consent tests
| ID | Test | Expected result |
|---|---|---|
| BE-010 | Expired/revoked session | Unauthorized |
| BE-011 | Cross-learner read/write | Denied and audited |
| BE-012 | Guardian relationship exists but resource scope is not granted | Denied |
| BE-013 | Guardian authority/consent revoked | Subsequent access denied within defined revocation SLA |
| BE-014 | Teen journal requested through family projection | No journal body or metadata beyond approved scope |
| BE-015 | Purpose does not match consent | Denied |
| BE-016 | Admin operation attempted by ordinary account | Denied; no client-side bypass |
| BE-017 | Data export/deletion requested by unauthorized actor | Denied |

## 4. CGR and data integrity tests
| ID | Test | Expected result |
|---|---|---|
| BE-020 | Valid learning event submitted | One durable, attributable record |
| BE-021 | Duplicate idempotency key | No duplicate logical event |
| BE-022 | Event schema version unsupported | Rejected or routed through explicit compatibility policy |
| BE-023 | Journal body included in ordinary CGR payload | Rejected and not persisted |
| BE-024 | Client attempts to award mastery/milestone without authority | Denied; evidence/rubric validation required |
| BE-025 | Concurrent update with stale version | Conflict surfaced; no silent overwrite |
| BE-026 | Invalid scripture reference | Rejected with provenance-aware error |
| BE-027 | Demo seeded values offered for migration | Classified; never silently treated as user history |

## 5. Resilience and operations tests
| ID | Test | Expected result |
|---|---|---|
| BE-030 | Database transient failure | Bounded retry or safe error; no false success |
| BE-031 | Outbox consumer retries message | Idempotent downstream result |
| BE-032 | Queue poison message | Quarantined, observable and recoverable |
| BE-033 | Cache contains stale permission projection | Authorization still checked against authoritative policy |
| BE-034 | Backup restore exercise | Meets owner-approved RPO/RTO |
| BE-035 | Migration fails midway | Controlled rollback/forward-fix with reconciliation |
| BE-036 | Rate limit exceeded | Safe throttling and telemetry |
| BE-037 | Large history query | Bounded pagination and acceptable measured latency |

## 6. AI and content provenance tests
| ID | Test | Expected result |
|---|---|---|
| BE-040 | AI request attempts to include journal body | Excluded unless separately approved and purpose-authorized |
| BE-041 | AI response includes unsupported scripture citation | Citation validation flags/rejects it |
| BE-042 | Provider key inspected in browser bundle | No secret present |
| BE-043 | External translation is not licensed for requested use | Text is not redistributed; safe alternative shown |
| BE-044 | Translation fallback occurs | Exact fallback translation and source are disclosed; no silent substitution |

## 7. Test layers and tooling
- Unit: validation, policy evaluation, idempotency, domain invariants.
- Integration: repository adapters, transaction boundaries, migrations, outbox, provider adapters.
- Contract: OpenAPI/schema compatibility and consumer expectations.
- End-to-end: authenticated learner workflow and cross-module continuity.
- Security: IDOR/BOLA, privilege escalation, session, CSRF/XSS/injection, rate limits and privacy boundary.
- Resilience: retries, concurrency, outage, restore and migration recovery.
- Accessibility: critical existing user journeys remain usable after backend integration.

## 8. Exit criteria
- All critical authorization and privacy tests pass in CI.
- No unresolved critical defect affects real accounts, teen data, admin privileges or protected records.
- Build, lint, type-check and test commands execute reproducibly.
- Migration and rollback evidence exists before production data is written.
- Backup restore, observability, incident and support procedures are verified.
- Owner approves operational targets and residual risks.

## 9. Non-claims
This is a plan only. It is not a test report, security certification, legal compliance opinion, production readiness approval or evidence that a backend currently exists.

## Additional acceptance tests: care, autonomy and religious inclusion

| ID | Test | Expected result |
|---|---|---|
| BE-050 | Parent account manages two learner profiles | Each learner's records and permissions remain isolated |
| BE-051 | Relative claims guardian authority without verification | No guardian privilege granted |
| BE-052 | Verified authority is revoked or expires | Scoped access is removed within the approved revocation SLA |
| BE-053 | Institutional staff account requests an unassigned learner | Denied and audited |
| BE-054 | Institutional representative accesses an assigned learner | Only explicitly authorized projections/actions are available |
| BE-055 | Child has no verified caregiver and requests access | Public non-personalized content remains available; sensitive personal processing is not initiated |
| BE-056 | Learner transitions into 14–17 experience | Personal login and scoped autonomy only where legally and policy-authorized; guardian access is transparent |
| BE-057 | Learner reaches 18 | Adult-control transition occurs; former guardian access is revoked absent fresh lawful authorization |
| BE-058 | Learner or household is non-Christian/non-religious | No discriminatory access denial or inferred religious label; product purpose is transparently disclosed |
| BE-059 | Religious reflection enters analytics or AI context | Excluded unless separately justified, authorized and safeguarded |
| BE-060 | Spiritual maturity value is supplied as authorization input | Rejected; it is not a legal-capacity or permission attribute |


## 10. Additional governance, privacy and operational acceptance tests

These criteria extend BE-001 through BE-060. They are proposed tests and have not been implemented or executed.

| ID | Test | Expected result |
|---|---|---|
| BE-061 | Consent exists for one purpose, but a request attempts a different purpose or data category | Denied unless a separately valid basis/authority and required safeguards exist |
| BE-062 | Client submits a guardian, caregiver, mentor or institutional authority claim without verified evidence | No privileged relationship or learner access is created |
| BE-063 | A learner enters the 14–17 product experience | Product autonomy settings do not automatically establish legal capacity or independent consent |
| BE-064 | A learner has no verified caregiver or authority pathway | Public non-personalized learning remains available; personal tracking and sensitive processing remain disabled |
| BE-065 | A learner reaches the adult transition threshold | Former guardian access is revoked by default unless a fresh lawful authorization or verified legal exception applies |
| BE-066 | A deletion/correction request is approved | Change propagates to authorized projections, caches, search indexes, object versions and processors; backup/legal-retention exceptions are documented |
| BE-067 | Journal or religious-reflection content is submitted to ordinary CGR, analytics, search, family projection or AI context | Content is excluded or rejected; only separately approved minimal metadata may be processed |
| BE-068 | A processor, region, subprocessor or support path is not approved for the data category and purpose | Transfer/processing is blocked pending policy and legal review |
| BE-069 | A log or trace captures credentials, journal body, private prompt content or unnecessary child data | Test fails; redaction and restricted audit handling are enforced |
| BE-070 | Authorization/consent policy evaluation is unavailable or stale for a protected action | Fail closed; no stale cache may grant access |
| BE-071 | Backup restore is performed | Recovery meets owner-approved RPO/RTO and proves integrity and access controls |
| BE-072 | Migration preflight encounters seeded/demo/browser-local values of uncertain provenance | Values are quarantined or excluded; no silent conversion into verified learner history |
| BE-073 | Load test runs against owner-approved expected and peak workload profiles | Measured latency, throughput, error rate and resource use meet approved operation-specific targets |
| BE-074 | A Phase 00C document or review is used to justify deployment, provider selection or privileged implementation without required approvals | Governance gate rejects the change; evidence and approval record are required |

### Evidence and execution status
- **Verified:** the current repository evidence and the absence of runtime execution are recorded in the Phase 00B evidence report.
- **Proposed:** all BE acceptance criteria in this plan.
- **Assumption:** the eventual test harness can exercise domain services, persistence adapters, policy decisions and deployment controls.
- **Unresolved:** test framework, CI platform, test data strategy, performance profiles, RPO/RTO, revocation SLA and legal acceptance thresholds.
- **Approval:** owner and security/privacy/legal reviewers must approve thresholds before the tests can be considered release gates. No test in this plan is marked passed.


## 10. Additional governance, privacy and operational acceptance tests

These criteria extend BE-001 through BE-060. They are proposed tests and have not been implemented or executed.

| ID | Test | Expected result |
|---|---|---|
| BE-061 | Consent exists for one purpose, but a request attempts a different purpose or data category | Denied unless a separately valid basis/authority and required safeguards exist |
| BE-062 | Client submits a guardian, caregiver, mentor or institutional authority claim without verified evidence | No privileged relationship or learner access is created |
| BE-063 | A learner enters the 14–17 product experience | Product autonomy settings do not automatically establish legal capacity or independent consent |
| BE-064 | A learner has no verified caregiver or authority pathway | Public non-personalized learning remains available; personal tracking and sensitive processing remain disabled |
| BE-065 | A learner reaches the adult transition threshold | Former guardian access is revoked by default unless a fresh lawful authorization or verified legal exception applies |
| BE-066 | A deletion/correction request is approved | Change propagates to authorized projections, caches, search indexes, object versions and processors; backup/legal-retention exceptions are documented |
| BE-067 | Journal or religious-reflection content is submitted to ordinary CGR, analytics, search, family projection or AI context | Content is excluded or rejected; only separately approved minimal metadata may be processed |
| BE-068 | A processor, region, subprocessor or support path is not approved for the data category and purpose | Transfer/processing is blocked pending policy and legal review |
| BE-069 | A log or trace captures credentials, journal body, private prompt content or unnecessary child data | Test fails; redaction and restricted audit handling are enforced |
| BE-070 | Authorization/consent policy evaluation is unavailable or stale for a protected action | Fail closed; no stale cache may grant access |
| BE-071 | Backup restore is performed | Recovery meets owner-approved RPO/RTO and proves integrity and access controls |
| BE-072 | Migration preflight encounters seeded/demo/browser-local values of uncertain provenance | Values are quarantined or excluded; no silent conversion into verified learner history |
| BE-073 | Load test runs against owner-approved expected and peak workload profiles | Measured latency, throughput, error rate and resource use meet approved operation-specific targets |
| BE-074 | A Phase 00C document or review is used to justify deployment, provider selection or privileged implementation without required approvals | Governance gate rejects the change; evidence and approval record are required |

### Evidence and execution status
- **Verified:** the current repository evidence and the absence of runtime execution are recorded in the Phase 00B evidence report.
- **Proposed:** all BE acceptance criteria in this plan.
- **Assumption:** the eventual test harness can exercise domain services, persistence adapters, policy decisions and deployment controls.
- **Unresolved:** test framework, CI platform, test data strategy, performance profiles, RPO/RTO, revocation SLA and legal acceptance thresholds.
- **Approval:** owner and security/privacy/legal reviewers must approve thresholds before the tests can be considered release gates. No test in this plan is marked passed.
