# Architecture Decision Register

Decisions are proposed until explicitly approved, except where marked accepted.

## ADR-001 — Preserve existing application
**Status:** Proposed  
**Decision:** Extend the current Next.js application incrementally; do not replace it wholesale.  
**Rationale:** Substantial experience/UI work can be reused.  
**Consequence:** Components need clear service boundaries and defect remediation.

## ADR-002 — Documentation-first audit branch
**Status:** Accepted for Phase 00  
**Decision:** Maintain the audit baseline in project-sentinel/phase-00-audit and avoid source changes on main during this audit.  
**Rationale:** Traceable review and safe separation from active application code.

## ADR-003 — Central Growth Record
**Status:** Proposed  
**Decision:** Establish a server-authorized central domain service for learner continuity.  
**Rationale:** Prevent fragmented state and support analytics/adaptive experiences.

## ADR-004 — Separate private teen journal domain
**Status:** Proposed  
**Decision:** Do not store journal bodies in ordinary growth records or expose them to parents/AI by default.  
**Rationale:** Minimise sensitive data exposure and respect adolescent privacy.

## ADR-005 — Server-side authorization
**Status:** Proposed  
**Decision:** UI visibility and client state never grant access. Enforce policy at service/resource boundaries.  
**Rationale:** Client applications are untrusted.

## ADR-006 — Constrain spiritual metrics
**Status:** Proposed  
**Decision:** Never calculate or display spiritual worth, holiness, salvation or divine-favour scores.  
**Rationale:** Avoid harmful theological and psychological implications.

## ADR-007 — Evidence labels
**Status:** Proposed  
**Decision:** Distinguish verified implementation, not identified and unverified findings.  
**Rationale:** Avoid overstating static audit conclusions.
