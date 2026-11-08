# Identity, Authorization & Consent Architecture

**Status:** Preliminary target design; no identity provider or legal consent model selected.

## 1. Separate identity, learner and relationship
- Account subject: authenticated human or service identity from a trusted identity system.
- Learner profile: a person whose learning record is managed by the application; may or may not be the account holder.
- Relationship: guardian, parent, mentor, caregiver or other approved connection with explicit scope and lifecycle.
- Consent/authority record: evidence of a purpose-specific permission or legal authority, including source, timestamp, version and revocation/expiry status.
- Role: a coarse capability grouping; never sufficient alone to authorize a specific learner resource.

One account may eventually manage multiple learner profiles, but this is an unresolved product decision.

## 2. Authentication requirements
- Use a vetted identity provider or mature framework after comparison.
- Server validates issuer, audience, signature, expiry, nonce/state and session revocation as applicable.
- Secure session cookies or equivalent secure token handling; protect CSRF where relevant.
- Support account recovery, email verification where needed, session rotation/revocation and suspicious-login controls.
- Never store plaintext passwords or implement bespoke password cryptography.
- Do not place privileged credentials in browser code.
- Treat the current onboarding UI as a prototype until real account lifecycle is implemented.

## 3. Authorization model
Use resource-level authorization combining:
- actor identity;
- relationship to target learner/resource;
- requested action;
- resource classification;
- purpose;
- consent/authority status;
- age/developmental policy;
- context and policy version.

A hybrid RBAC + ABAC/ReBAC approach is proposed. RBAC provides broad capability categories; ABAC/ReBAC evaluates learner relationship, resource sensitivity, purpose and consent. Deny by default. Enforce at every server endpoint/service, not only navigation or UI.

Example actions: read own learning summary; submit activity; read family-safe projection; request export; manage consent; access private journal. Each action requires a separate policy rule.

## 4. Parent/teen boundary
Parent/guardian relationship is not blanket access. Family portal receives only a server-generated, policy-filtered projection. Private teen journal content is excluded by default. Changes in age tier, guardian status, custody/authority or consent trigger policy re-evaluation. Revocation must take effect promptly and be auditable. Emergency exceptions, if any, require legal/safeguarding design and must not be improvised in code.

## 5. Consent lifecycle
Model consent as purpose-specific, versioned and revocable evidence. Record who consented, for whom, under what authority, to which purpose/data class, under which notice/version, at what time, and how withdrawal is handled. Distinguish guardian permission from the learner's own assent/consent where required. Do not infer consent from continued use or a UI toggle without legally reviewed wording and evidence.

## 6. Administrative access
Remove demo admin gate before real privileged operations. Require strong authentication, least-privilege roles, scoped permissions, step-up authentication for high-risk actions, immutable audit evidence, time-bounded elevation and separation of duties where practical. Admin status must be determined server-side.

## 7. Data lifecycle rights
Define access, correction, export, retention, deletion, legal hold and account closure workflows. Propagate changes to derived projections, search, cache and processors. Backups require documented expiration behavior and exceptions. Obtain qualified legal advice for Kenya and every intended launch jurisdiction, especially child/teen privacy, parental authority, age assurance and cross-border processing.

## 8. Required authorization tests
Cross-learner ID substitution, sibling isolation, guardian revocation, teen private-resource denial, expired session, role escalation, purpose mismatch, consent withdrawal, export authorization, admin privilege boundary, direct object reference and policy-service failure. All protected-resource tests must be server-side.

## 9. Open owner/legal decisions
Minimum age and age assurance; supported jurisdictions; independent teen account rights; guardian verification and dispute handling; mentor scope; emergency disclosure; consent wording/version; retention; data residency; whether minors can use the app without an account guardian. These require owner decisions and qualified legal review.
