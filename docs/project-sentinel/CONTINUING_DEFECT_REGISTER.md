# Continuing Defect Register

Single ongoing register. Add new findings with evidence and severity; close only with a linked fix and verification. Avoid repeatedly reopening historical findings unless new evidence or risk warrants it.

| ID | Summary | Severity | Status | Next action |
|---|---|---|---|---|
| PS-01 | Onboarding/authentication demonstrative; real account lifecycle not verified | Critical | Open | Define identity provider and server session contract |
| PS-02 | Teen journal encryption/key custody/persistence unsupported by inspected code | Critical | Open | Security design and threat model |
| PS-03 | Admin mode enabled through demo client-side flow | Critical | Open | Prevent privileged use; implement server authorization |
| PS-04 | Growth values/logs fragmented across routes | High | Open | Central Growth Record and migration |
| PS-05 | No automated tests identified; build ignores ESLint | High | Open | Establish CI, lint and test gates |
| PS-06 | Parent/teen visibility enforcement not verified | Critical | Open | Resource-level authorization and consent |
| PS-07 | Bible data provenance/licensing not audited | High | Open | Catalogue translations, sources, rights and attribution |
| PS-08 | AI companion behavior and data boundaries unverified | High | Open | Inspect call sites, prompts, server boundaries and logging |

## Lifecycle
Open → Triaged → In Progress → Fixed (unverified) → Verified → Closed. Deferral requires rationale, risk acceptance authority, review date and compensating control.

Each entry should include affected path/line or commit, inspection/reproduction method, impact, acceptance criteria, remediation commit and verification result. Do not mark fixed based on a code change alone.
