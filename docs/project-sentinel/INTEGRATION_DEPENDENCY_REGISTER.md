# Integration Dependency Register

| ID | Dependency | Required before | Reason | Priority |
|---|---|---|---|---|
| DEP-01 | Identity and account ownership | Learner-specific persistence | Stable authenticated owner and learner scope | P0 |
| DEP-02 | Database and migration strategy | Central Growth Record | Durable storage, constraints, migrations and recovery | P0 |
| DEP-03 | Authorization, consent and family relationship model | Parent portal/protected records | Resource-level access, not UI-only visibility | P0 |
| DEP-04 | Canonical scripture reference model | Scripture activity persistence | Valid, unambiguous references | P1 |
| DEP-05 | Learning event contract | Analytics/adaptive coach | Consistent, attributable, versioned evidence | P1 |
| DEP-06 | Encryption and key management | Genuine teen journal | Content protection and key lifecycle/recovery | P0 |
| DEP-07 | Offline sync/conflict strategy | Cross-device continuity | Avoid silent loss and duplicate writes | P1 |
| DEP-08 | Automated tests and CI | Controlled implementation | Regression and security assurance | P0 |
| DEP-09 | Content provenance/licensing register | Bible reader/study | Translation rights and attribution | P1 |
| DEP-10 | AI safety/context policy | AI companion | Minimise data exposure and fabricated citations | P1 |
| DEP-11 | Observability/audit logging | Production rollout | Diagnose failures and investigate sensitive access | P1 |
| DEP-12 | Retention/export/deletion policy | Real user onboarding | Govern personal data lifecycle | P1 |

Identity, persistence and authorization should be designed together. Central Growth Record must not be a client-side global store masquerading as durable persistence. Teen journaling must not ship with security assurances until the security design is implemented and tested.
