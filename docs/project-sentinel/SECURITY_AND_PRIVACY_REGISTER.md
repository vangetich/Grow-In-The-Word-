# Security and Privacy Register

Initial risk register; not a penetration test or compliance assessment.

| ID | Concern | Impact | Required control | Priority |
|---|---|---|---|---|
| SEC-01 | Onboarding authentication appears simulated | False account assurance / account risk | Trusted auth provider and server-side session validation | Critical |
| SEC-02 | Journal encryption/key custody/persistence not substantiated | Exposure of sensitive teen reflections | Authenticated encryption, robust key lifecycle, secure persistence, threat model and independent tests | Critical |
| SEC-03 | Admin demo controls enable client admin state | Privilege escalation if used for real operations | Server-side RBAC/ABAC, strong auth, audit trail, deny-by-default | Critical |
| SEC-04 | Parent/teen visibility enforcement unverified | Unauthorized disclosure | Resource-level policy, explicit consent, separate journal domain | Critical |
| SEC-05 | Growth data fragmented across routes | Incorrect/lost history | Central authoritative service and idempotency | High |
| SEC-06 | No automated test suite identified | Undetected regressions/access flaws | CI, unit/integration/e2e and authorization tests | High |
| SEC-07 | AI data handling unverified | Sensitive data leakage or unsafe advice | Data minimisation, redaction, context allowlist, output/citation checks | High |
| SEC-08 | Retention/export/deletion unverified | Uncontrolled data lifecycle | Documented and tested lifecycle APIs | High |

## Mandatory principles
Treat client state as untrusted. Deny access unless server-side policy allows it. Separate teen journal content from ordinary growth records. Parent relationship does not automatically grant access to every teen resource. Use least privilege, purpose limitation and data minimisation. Audit sensitive access without logging private content. Do not claim encryption or confidentiality without evidence. Review applicable privacy and child-protection law with qualified counsel before launch.

## Release gate
No production release of authentication, admin operations, parent access or teen journaling until relevant security controls and acceptance tests pass.
