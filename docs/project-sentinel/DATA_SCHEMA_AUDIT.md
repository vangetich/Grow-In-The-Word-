# Data Schema and Persistence Audit

## Current evidence (static review)
- Growth tracker initializes growthPoints to 45 and keeps engagementLog in route-level React state (app/growth-tracker/page.tsx L14-L38).
- Bible reader initializes growthPoints to 70 (app/bible-reader/page.tsx L14-L35); timeline initializes 40 (app/timeline/page.tsx L14-L30). Other routes also use distinct demo starting values.
- Bible reader progress/preferences persist in localStorage (components/FullPageBibleReader.tsx L162-L287).
- Prayer petitions persist in localStorage (components/DailyPrayerModal.tsx L105-L165).
- These browser-local records are not a central authenticated account record or verified cross-device sync.
- Teen journal data is held in React state and seeded with demonstration content; inspected mock cipher generation does not encrypt the content (components/PrivateJournalingVault.tsx L70-L145; components/TeenSafeHarborPhase4.tsx L175-L215, L315-L350).
- No central learner schema, migration set or shared persistence service was identified in the complete tracked repository tree.
- Onboarding profile payload is computed client-side; a verified backend submission was not observed (JourneyOnboardingModal.tsx L125-L220).

## Risks
Conflicting growth values across routes; loss on refresh/device change; unclear record ownership; analytics mistaken for source-of-truth; private text stored in memory as though encrypted; unknown deletion/export/retention; no verified offline or concurrent-write reconciliation.

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
