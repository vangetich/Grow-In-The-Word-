# Phase 06 — Central Growth Record Acceptance Test Plan

**Status:** Proposed tests; not implemented or executed.

| Test | Scenario | Expected result |
|---|---|---|
| CGR-001 | Learner retrieves own record | Only own authorized record returned |
| CGR-002 | Cross-account read/write attempt | Denied server-side; security event recorded |
| CGR-003 | Valid learning event submitted | Durable record with unique ID |
| CGR-004 | Duplicate idempotency key | One logical event; deterministic response |
| CGR-005 | Invalid scripture reference | Rejected with validation error |
| CGR-006 | Journal body sent to ordinary growth endpoint | Rejected/excluded; never stored there |
| CGR-007 | Parent requests teen data | Only explicitly permitted projection returned |
| CGR-008 | Learner transitions age tier | Authorized history retained; policy re-evaluated |
| CGR-009 | Sync/persistence failure | Explicit failure and safe recovery; no silent loss |
| CGR-010 | Export/deletion request | Policy-compliant workflow with audit evidence |
| CGR-011 | Schema migration | Records preserved and migration version recorded |
| CGR-012 | Concurrent updates | Conflict detected; no silent overwrite |
| CGR-013 | Offline sync retry | No duplicate logical events |
| CGR-014 | Unauthorized milestone change | Denied; client cannot self-award privileged outcomes |
| CGR-015 | Analytics summary | Derived from authorized, validated records |
| CGR-016 | AI context assembly | Only allowlisted, purpose-authorized fields included |

## Test layers
Unit: schema validation, canonical reference validation, idempotency, policy evaluation.  
Integration: database transactions, migrations, auth and service boundaries.  
End-to-end: onboarding to activity capture to cross-route continuity.  
Security: privilege escalation, direct-object-reference tests, session expiry, consent revocation and parent/teen boundary.  
Resilience: retries, offline queue, concurrency, partial failures and backup restore.

## Exit criteria
All P0 tests pass; P1 tests have approved disposition; no critical unresolved security defects; migration/rollback evidence exists; lint/build/test checks run in CI. This plan is not evidence of passing tests.
