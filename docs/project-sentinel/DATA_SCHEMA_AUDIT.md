# Data Schema and Persistence Audit

## Current evidence
- Growth tracker initializes growthPoints to 45 and keeps engagementLog in page-level React state.
- Bible reader initializes growthPoints to 70.
- Timeline initializes growthPoints to 40 and similarly keeps local logs.
- Some home-page localStorage use appears limited to celebration/milestone UI state.
- No central learner schema, migration set or shared persistence service was identified in reviewed inventory.
- Onboarding profileBackendPayload is generated/displayed as JSON; verified backend submission was not observed.

## Risks
Conflicting values across routes; loss on refresh/device change; unclear record ownership; analytics mistaken for source-of-truth; unknown deletion/export/retention; no verified offline or concurrent-write reconciliation.

## Proposed Central Growth Record entities
- LearnerProfile: stable learner identity, preferences, developmental defaults and account linkage.
- LearningEvent: immutable event with event ID, learner ID, actor, source, event type, occurredAt, recordedAt, schemaVersion, provenance and idempotency key.
- ScriptureActivity: canonical scripture reference, translation/source, activity type and linked event.
- LearningJourney: assigned pathway, status, sequence and progression rules.
- AssessmentEvidence: instrument, skill/domain, response/evidence reference, rubric/version and assessor.
- GrowthMilestone: definition/version, evidence links, awardedAt and rationale.
- SavedReference: user-owned scripture/content reference and metadata.
- ReflectionRecord: privacy classification and limited metadata; journal body excluded by default.
- ConsentRecord: subject, guardian/actor, purpose, scope, consent state, timestamps and revocation.
- FamilyRelationship: relationship, verification and permitted scope.
- AccessPolicy: resource-level policy and policy version.
- DevelopmentTransition: age-band transition and user/guardian choices.

## Event integrity
Stable unique IDs; idempotent ingestion; server-side ownership/authorization; canonical scripture reference validation; explicit timestamps/timezone semantics; schema versioning; audit trails for sensitive access; distinction between activity, evidence, inferred skill, mastery and spiritual reflection.

## Data minimisation
Collect only what is needed for a stated purpose. Keep private journal text out of general analytics, AI context, parent dashboards and event payloads. Define retention, export and deletion controls.

## Open questions
Database/auth providers, hosting, external APIs, backup policy, data residency, encryption configuration, retention schedule, export/deletion implementation and scripture data licensing require verification.
