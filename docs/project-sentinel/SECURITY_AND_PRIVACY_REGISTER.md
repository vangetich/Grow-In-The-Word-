# Security and Privacy Register

Static source findings only; this is not a penetration test, cryptographic review or compliance assessment.

| ID | Concern / evidence | Impact | Required control | Priority |
|---|---|---|---|---|
| SEC-01 | Onboarding flow validates input and uses timed client-side handoff; no account service call observed in reviewed flow (JourneyOnboardingModal.tsx L125-L220). | False account assurance if presented as real signup | Trusted auth provider, server-side session validation and account lifecycle | Critical |
| SEC-02 | PrivateJournalingVault.tsx L70-L145 uses seeded content, React state, fixed key fingerprint and deterministic mock ciphertext. TeenSafeHarborPhase4.tsx L315-L350 stores preview/hash-like label, not encrypted body. | Exposure of sensitive teen reflections; misleading guarantees | Real authenticated encryption, key lifecycle, secure persistence, threat model and independent tests | Critical |
| SEC-03 | AdminBackendMaintenanceSection.tsx L254-L285 enables admin for any non-empty credentials; quick toggle fills a known demo passcode and enables mode. | Privilege escalation if used for real operations | Remove demo gate; server-side RBAC/ABAC, strong auth, audit trail, deny-by-default | Critical |
| SEC-04 | Teen privacy guarantee claims in TeenSafeHarborPhase4.tsx L535-L580 and journal prompt copy at L1347-L1352 are not backed by a verified server/storage boundary. Parent portal shows simulated firewall outcomes. | Unauthorized disclosure / false privacy assurances | Resource-level policy, explicit consent, separate journal domain, accurate UX copy | Critical |
| SEC-05 | Growth state is fragmented across routes (e.g. growth-tracker/page.tsx L14-L38; bible-reader/page.tsx L14-L35; timeline/page.tsx L14-L30). | Incorrect/lost history | Central authoritative service and idempotency | High |
| SEC-06 | No test script/CI workflow identified; next.config.ts L1-L30 ignores ESLint during builds. | Undetected regressions/access flaws | CI, lint, unit/integration/e2e and authorization tests | High |
| SEC-07 | GenAI dependency and key placeholder exist, but active AI call site and data handling are unverified. | Sensitive data leakage or unsafe advice | Data minimisation, redaction, context allowlist, output/citation checks | High |
| SEC-08 | Retention/export/deletion behavior not established in inspected tree. | Uncontrolled data lifecycle | Documented and tested lifecycle APIs | High |
| SEC-09 | NetworkStatusIndicator.tsx L35-L70 writes a localStorage marker; actual offline cache/service worker not identified. | False offline readiness and data-loss expectations | Implement/test real cache strategy or revise UI claims | High |
| SEC-10 | Translation provenance/licensing metadata not present in inspected version metadata (full-bible-data.ts L31-L82). | Rights/attribution risk | Rights register, permitted source text, attribution and distribution review | High |

## Mandatory principles
Treat client state as untrusted. Deny access unless server-side policy allows it. Separate teen journal content from ordinary growth records. Parent relationship does not automatically grant access to every teen resource. Use least privilege, purpose limitation and data minimisation. Audit sensitive access without logging private content. Do not claim encryption or confidentiality without evidence. Review applicable privacy and child-protection law with qualified counsel before launch.

## Release gates
No production release of authentication, admin operations, parent access or teen journaling until relevant security controls and acceptance tests pass. Do not advertise offline guarantees until verified. Do not distribute translation text until rights and source provenance are established.
