# Backend Data Flow & Trust Boundaries

**Status:** Preliminary security architecture proposal.

## 1. Trust zones
1. Untrusted client: browser, mobile browser and client-side state.
2. Public edge: TLS termination, request size/rate controls and routing.
3. Authenticated application boundary: validated session/token and actor context.
4. Domain services: ownership, consent, purpose and resource policy enforcement.
5. Persistence boundary: transactional data, private content store, object storage and audit store.
6. External processors: AI, scripture APIs, email, analytics and other vendors.

Every transition is an explicit trust boundary. Data is not trusted merely because it originated in the application UI.

## 2. Standard write flow
1. Client sends a typed command with a correlation ID and idempotency key where appropriate.
2. Edge applies TLS, request-size, rate and abuse controls.
3. Server validates session and constructs actor context from trusted claims.
4. Application service resolves target learner and verifies actor-to-learner relationship.
5. Governance evaluates purpose, consent, scope, age/guardian policy and resource classification.
6. Domain validates schema, references, business rules and state transition.
7. Transaction writes authoritative data and audit metadata atomically where feasible.
8. An outbox/event mechanism publishes downstream work only after commit.
9. Response returns a stable resource identifier, version and safe status; no internal stack trace or sensitive data.

Client-supplied learnerId, actorRole, consent status, admin flag or parent relationship is a request hint at most and must be re-derived/verified server-side.

## 3. Standard read flow
Authenticate → resolve resource → authorize exact action and purpose → fetch minimum required fields → redact/filter → return bounded projection. Authorization must be checked on every request and every resource, including nested identifiers and exports.

## 4. Journal isolation
Private journal content is not part of CGR event payloads, generic logs, search indexes, family projections or AI prompts by default. If journal storage is later approved, it requires a dedicated threat model covering encryption at rest/in transit, key ownership and rotation, recovery, device compromise, backups, deletion, legal obligations and emergency/safety exceptions. Do not label the system zero-knowledge unless the design and implementation genuinely satisfy a defined zero-knowledge threat model.

## 5. AI data flow
AI requests pass through a server-side AI Gateway. It receives a narrowly scoped context assembled through authorized domain queries, applies minimization/redaction, tracks purpose and consent, and validates output. No direct client-side secret or unrestricted database credential. Scripture citations must be checked against an approved canonical reference catalogue. AI output is assistance, not divine authority or a substitute for pastoral, clinical or safeguarding professionals.

Default deny for:
- journal body and private reflections;
- unrelated family-member records;
- credentials, access tokens and encryption keys;
- unverified demographic or sensitive attributes;
- content outside the user-authorized purpose.

## 6. External content and provenance
Store source identity, retrieval time, translation/version, attribution, licence/permission status and integrity metadata for external content. A source/API response is not automatically licensed for redistribution. Runtime content fetching must have timeout, retry/backoff, fallback provenance and clear error behavior. Do not silently substitute a different translation.

## 7. Audit and observability
Record actor, action, resource class/identifier, decision, purpose, timestamp, correlation ID and policy version for sensitive operations. Do not log journal bodies, tokens, raw prompts containing sensitive content or full child profiles. Separate security audit logs from product analytics. Restrict log access and define retention.

## 8. Failure and abuse controls
- Deny by default on policy-service failure for protected resources.
- Use bounded retries and idempotency for retriable writes.
- Apply rate limits, abuse detection, input validation and output encoding.
- Protect against IDOR/BOLA, CSRF where cookie sessions are used, XSS, injection, SSRF and mass assignment.
- Do not expose secrets in client bundles, source maps, logs or error messages.
- Define incident response, breach assessment and notification obligations before launch.

## 9. Open threat-model questions
Deployment topology, session type, account recovery, child/guardian legal model, journal threat model, data residency, AI vendor retention/training terms, analytics vendors and operational access model remain unknown.
