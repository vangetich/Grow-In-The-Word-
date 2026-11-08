# Phase 06 — Central Growth Record Specification

**Status:** Conceptual specification for review; not an approved physical database schema.

## Purpose
Create one authoritative, durable and permission-aware record of learner activity and progress across experiences without collapsing private reflection into general analytics or equating learning metrics with spiritual worth.

## Principles
1. One authoritative learner identity and record boundary.
2. Activity is not mastery.
3. Knowledge is not spiritual worth.
4. Continuity is not unrestricted visibility.
5. Age is not familiarity.
6. Modules use versioned service contracts, not direct cross-module table access.
7. Server-side authorization is authoritative.
8. Event ingestion is idempotent and auditable.

## Logical entities
LearnerProfile, LearningEvent, ScriptureActivity, LearningJourney, AssessmentEvidence, GrowthMilestone, SavedReference, ReflectionRecord metadata, ConsentRecord, FamilyRelationship, AccessPolicy and DevelopmentTransition. See DATA_SCHEMA_AUDIT.md for proposed responsibilities.

## Service boundary
Proposed commands: createLearningEvent; recordScriptureActivity; recordAssessmentEvidence; updateLearningJourney; awardGrowthMilestone; saveReference; getLearnerGrowthSummary; exportLearnerRecord; requestLearnerDataDeletion.

Each command authenticates actor, resolves learner ownership, authorizes purpose/scope, validates payload/schema, enforces idempotency and returns a traceable result. Reads return only fields permitted for the requesting actor and purpose.

## Event envelope
Minimum logical fields: eventId, learnerId, eventType, occurredAt, recordedAt, actorId, actorRole, sourceModule, schemaVersion, idempotencyKey, provenance and typed/minimised payload.

Private journal body must never be included in general LearningEvent payloads.

## Privacy domains
- General learning record: activities, validated references and progress evidence.
- Private journal: separately protected content and keys; no default parent or AI access.
- Family projection: only explicitly permitted fields and aggregates.
- Audit domain: sensitive access and policy-change metadata, excluding private content.

## Mastery and formation
Mastery is a pedagogical inference based on defined evidence and rubric versions, not a raw activity counter. Spiritual reflection may be supported but must never produce a holiness, salvation, divine-favour or spiritual-worth score.

## Sync and concurrency
Use idempotency keys, optimistic concurrency/version checks and explicit conflict outcomes. Offline writes must reconcile without silent overwrite. Failed writes must be surfaced and recoverable.

## Migration
Inventory existing state and semantics; determine whether demo values are seed data or user data; never silently merge initial values 45/70/40 into durable learner history; build versioned migrations with backup/rollback; validate ownership and consistency; retire local state only after parity and acceptance tests.

## Non-goals
Not a spiritual judgement engine, parent surveillance system, universal store for journal text or replacement for every module-specific content model.
