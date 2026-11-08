# API & Service Contracts

**Status:** Contract proposal, not implemented routes or a finalized OpenAPI document.

## 1. Contract principles
- Version public API contracts (e.g. /api/v1) and keep domain service interfaces independent of transport.
- Use typed request/response schemas with runtime validation at boundaries.
- Use stable machine-readable error codes and correlation IDs.
- Never trust client-supplied actor identity, role, consent or relationship.
- Apply authorization per resource and action.
- Paginate collection responses; impose request/body/time limits.
- Support idempotency for event submissions and retryable commands.
- Avoid exposing persistence models directly as API DTOs.
- Document deprecation and compatibility windows.

## 2. Proposed logical service interfaces
| Service | Example operations | Contract responsibility |
|---|---|---|
| Identity/Profile | getCurrentAccount, getLearnerProfile, updateAllowedPreferences | Resolve trusted actor and learner scope |
| Governance | evaluateAccess, recordConsent, revokeConsent | Purpose, authority and policy decision |
| CGR | submitLearningEvent, recordAssessmentEvidence, getGrowthSummary | Validate and persist learning evidence |
| Scripture | resolveReference, getPermittedTranslationMetadata | Canonical reference and provenance |
| Study | startStudySession, recordReadingProgress | Study activity and session lifecycle |
| Family | getFamilyProjection, listAuthorizedLearners | Explicitly permitted family view |
| Reflection | createPrivateEntry, readPrivateEntry, deletePrivateEntry | Separate restricted domain; deferred |
| AI Gateway | requestCoaching, validateCitation | Allowlisted context and safe provider mediation |
| Data Rights | requestExport, requestDeletion, requestCorrection | Verified subject rights workflow |

Names are illustrative; final operation names follow domain discovery.

## 3. Example CGR event contract (logical)
Required semantics: event identifier, target learner scope, event type, occurred-at and recorded-at timestamps, trusted actor context, source module, schema version, idempotency key, provenance and validated minimal payload. Actor identity/role is derived server-side. Learner ID is checked against actor authority. Event type allowlist and payload schema are versioned.

Never accept journal body text on the ordinary CGR event endpoint. Never allow the client to self-award privileged milestones or mastery. Event acceptance does not itself mean mastery.

## 4. Response shape (illustrative)
Success response contains resource identifier, accepted status, version/ETag where concurrency applies, and correlation ID. Errors distinguish unauthenticated, forbidden, not found (where disclosure risk exists), validation failure, conflict, rate limited, dependency unavailable and internal error. Do not expose raw database or provider messages.

## 5. Reliability semantics
- Idempotency key scope includes authenticated actor, operation and bounded retention window.
- Duplicate submissions return the original logical result or a deterministic conflict.
- Optimistic concurrency/version checks protect concurrent updates.
- Outbox pattern for reliable downstream events after transaction commit.
- Retry only transient failures with bounded exponential backoff and jitter.
- Consumers are idempotent; poison messages are quarantined and observable.
- Long-running exports/AI tasks return a job reference and status endpoint.

## 6. Security requirements
TLS, request validation, output encoding, rate limits, CORS/CSRF policy, abuse controls, access checks, secret redaction, safe error mapping and audit metadata. API keys for external services remain server-side. Webhook signatures and replay protection are required if webhooks are introduced.

## 7. Contract deliverables for implementation phase
OpenAPI specification; domain DTO/schema definitions; authorization matrix; error catalogue; idempotency rules; versioning/deprecation policy; contract tests; threat model; sample sanitized requests/responses. None is claimed to exist in the current repository.
