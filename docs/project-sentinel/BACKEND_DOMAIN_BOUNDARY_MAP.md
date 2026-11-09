# Backend Domain Boundary Map

**Status:** Preliminary proposal; no production services or persistence boundaries implemented.

## 1. Domain map

| Domain | Owns | Must not own |
|---|---|---|
| Identity & Account | Authenticated subject mapping, account lifecycle references | Learner progress or journal bodies |
| Learner Profile | Learner identity, preferences, age-band and lifecycle metadata | Authentication credentials or inferred spiritual worth |
| Consent & Governance | Consent evidence, guardian relationship authority, purpose and policy decisions | Unrestricted content access |
| Central Growth Record | Validated learning events, assessment evidence, journeys, milestones and approved projections | Private journal text or credentials |
| Scripture Catalogue | Canonical references, translation metadata, provenance and permitted content identifiers | Unlicensed text distribution |
| Study & Learning | Study sessions, reading activity, learning tasks and validated outcomes | Identity provider internals |
| Assessment & Mastery | Rubric versions, evidence evaluation and bounded mastery inferences | Raw activity as automatic proof of mastery |
| Private Reflection | Reflection content and encryption/key lifecycle, if approved and implemented | CGR analytics, parent dashboards or AI by default |
| Family & Mentorship | Relationships and explicitly permitted family projections | Implicit blanket parental access |
| AI Gateway | Purpose-limited context assembly, provider routing, safety and citation checks | Direct unrestricted database access |
| Engagement & Analytics | Aggregated, minimized metrics and derived read models | Source-of-truth mutation or sensitive journal content |
| Trust & Operations | Audit events, policy changes, security events and operational telemetry | Private content in logs |
| Content & Rights Registry | Source/version identifiers, provenance evidence, licence scope, attribution and permitted-use metadata | Unlicensed distribution or inferred permission |
| Safeguarding & Incident Handling | Restricted report intake, triage metadata, escalation/referral and controlled retention, if approved | General analytics, AI context or unrestricted family/admin access |

## 2. Ownership rules
- Each domain owns its validation rules and application service interface.
- A domain's data is changed only through its own application service.
- Cross-domain reads use explicit query contracts with least-privilege projections.
- Cross-domain writes use orchestrated application commands or versioned domain events.
- No shared mutable client store is a substitute for authoritative server persistence.
- The API boundary derives actor identity from a verified server session/token; it never trusts client-supplied actor IDs.

## 3. Proposed dependency direction
Experience → API/application boundary → domain application service → domain port → infrastructure adapter.

Allowed domain collaboration:
- CGR may request a consent/policy decision from Governance.
- Study may submit validated activity to CGR.
- Family views may request a policy-filtered CGR projection.
- AI Gateway may request allowlisted context through domain query services.
- Analytics consumes approved events/projections and cannot mutate source records.

Avoid circular dependencies. Governance is a cross-cutting policy capability, but should expose explicit decision interfaces rather than becoming a universal data owner.

## 4. Data classification
| Class | Examples | Default handling |
|---|---|---|
| Public | Public product content, approved scripture metadata | Public read subject to provenance |
| Internal | Operational configuration, non-sensitive metrics | Authenticated/role-limited |
| Personal | Profile, learning history, reading progress | Learner-scoped, purpose-limited |
| Sensitive | Child/teen data, family links, prayer/reflection metadata | Restricted, audited, minimal |
| Highly sensitive | Private journal body, authentication secrets, encryption keys | Separate controls; no general analytics/AI access |

Classification is provisional and must be reviewed against launch jurisdictions and legal advice.

## 5. Domain lifecycle and transition
A learner moving between age experiences must retain only records whose retention and access policy permits continuity. Age transition triggers policy re-evaluation, not automatic disclosure. Guardian authority, learner rights and applicable law must be resolved before implementation.

## 6. Existing UI mapping
- Bedtime Shepherd / Morning Bridge → age-adaptive experience clients; may submit learning activity through Study and CGR contracts.
- Ancient Archive / timeline → historical learning clients; content provenance belongs to Scripture/Content Catalogue or a dedicated content domain.
- Teen Safe Harbor / journal → restricted reflection client; separate private-reflection boundary.
- Parent Portal → Family projection client; server-filtered views only.
- Bible Reader / Study Studio → Scripture and Study clients.
- Growth Tracker / charts → CGR read projections and Analytics.
- Admin maintenance UI → privileged operations client only after genuine server-side admin authorization; current demo gate is not reusable as security.

## 7. Unresolved ownership questions
- Is one account allowed to manage multiple learner profiles?
- Can a learner have multiple guardians, mentors or custodians, and how are disputes/revocations handled?
- What is the minimum age and jurisdiction model for independent learner consent?
- Which reflection features are truly private journal content versus ordinary learning notes?
- Which content catalogue items are owned, licensed, linked or fetched externally?

## Additional domain boundary: Care & Access Pathway

Care relationships and authority evidence belong within Identity & Governance, with an explicit Care & Access workflow. Distinguish parent, legally appointed guardian, kinship/foster caregiver, institutional representative and unverified caregiver. No relationship label alone grants authorization. Institutional representatives receive scoped access only to learners and actions for which authority is verified. A child without verified authority may receive public non-personalized content but must not be enrolled into sensitive personalized processing by a workaround.

Religious identity is not required to access public learning content and must not be inferred. The product's Christian purpose must be disclosed transparently. Religious reflections/belief data require sensitive classification and purpose-limited processing.


## 8. Evidence and boundary review addendum — 2026-11-09

### Additional proposed boundaries
The following capabilities should be represented explicitly in the logical architecture without implying that they exist in the current application:

| Capability | Owns | Must not own |
|---|---|---|
| Content & Rights Registry | Source/edition/version identifiers, provenance evidence, licence scope, attribution, territory, permitted uses, expiry and takedown status | Legal conclusions unsupported by evidence, unlicensed distribution or automatic permission inference |
| Safeguarding & Incident Handling | Restricted report intake, triage metadata, case status, escalation/referral records and controlled retention, if this capability is approved | General learner analytics, AI coaching context, ordinary family projections or unrestricted administrative browsing |

The Content & Rights Registry is an architectural dependency only. Translation-by-translation and asset-by-asset rights verification remains a separate outstanding workstream. A missing or uncertain licence state must not be interpreted as permission.

Safeguarding records, if introduced, require a separately approved access model, accountable roles, escalation procedures, retention schedule and legal review. They must not be conflated with private journaling or ordinary support tickets.

### Evidence classification
- **Verified:** the Phase 00B source review found front-end experience components for Bible reading/study, family/teen experiences, reflection and growth; it did not identify a backend API or authoritative persistence layer in the reviewed 75-file tree.
- **Proposed:** the domain ownership and dependency rules in this document, including Content & Rights and Safeguarding capabilities.
- **Assumption:** these capabilities can be implemented as modules within the initial modular monolith.
- **Unresolved:** exact content ownership, rights metadata, safeguarding roles, case access, legal retention and whether safeguarding intake is in first-release scope.
- **Approval:** owner and qualified legal/safeguarding review are required before either capability processes real personal or child data.
