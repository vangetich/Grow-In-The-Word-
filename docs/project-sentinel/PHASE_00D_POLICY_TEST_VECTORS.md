# Project Sentinel — Phase 00D Policy Test Vectors

**Status:** Proposed design-level vectors; not executed against software  
**Companions:** PHASE_00D_JURISDICTION_RULE_CATALOGUE.md; PHASE_00D_POLICY_DECISION_SPECIFICATION.md  
**Purpose:** Verify that future policy evaluation preserves legal differences, applies product safeguards and fails safely.

## 1. Test conventions

- These are specification tests, not runtime test results.
- Each vector describes inputs and the expected policy outcome after rules are approved.
- `HOLD_FOR_REVIEW` is the expected result when a material legal or factual dependency is unresolved.
- A vector marked `COUNSEL_CONFIRM` must not be converted to a permissive executable test until local counsel approves the interpretation.
- Test fixtures must use synthetic data only.

## 2. Jurisdiction and child-threshold vectors

| ID | Jurisdiction / scenario | Key inputs | Expected result | Rules / rationale |
|---|---|---|---|---|
| POL-001 | Kenya, learner under 18, personal learner profile | Child status; profile purpose; no verified parent/guardian authorization | HOLD_FOR_REVIEW or DENY if approved rule specifies mandatory absence outcome | KE-LAW-001, KE-REG-002; no child-data processing without required route |
| POL-002 | Kenya, learner aged 17, UX band says “independent” | Age 17; app autonomy flag; no legal authorization | HOLD_FOR_REVIEW | Product autonomy cannot replace legal child-data authorization |
| POL-003 | Uganda, learner under 18, profile creation | Child status; authority unknown | HOLD_FOR_REVIEW | UG-LAW-001 |
| POL-004 | Uganda, age unknown and age-ascertainment control absent | Age UNKNOWN; child access possible | HOLD_FOR_REVIEW | UG-LAW-002; do not bypass age rule |
| POL-005 | Tanzania Mainland, child data processed as ordinary personal data | Child-related data flag; classifier says ordinary | DENY or HOLD_FOR_REVIEW | TZM-LAW-001; child-related data must be treated within sensitive classification |
| POL-006 | Tanzania Mainland, sensitive child data with no verified written authorization/ground | Child data; purpose; no established representative route | HOLD_FOR_REVIEW | TZM-LAW-002; exact conditions counsel-confirmed |
| POL-007 | Tanzania Zanzibar, non-Union processing subject matter with only Mainland analysis | Zanzibar location; Union/non-Union status unresolved | HOLD_FOR_REVIEW | TZZ-OPEN-001 through 004 |
| POL-008 | Rwanda, known learner aged 15, no parental-responsibility consent | Known child under 16; no qualifying consent | DENY or HOLD_FOR_REVIEW according to counsel-approved exception analysis | RW-LAW-001 |
| POL-009 | Rwanda, learner aged 17 | Under 18 for safeguarding; not under 16 for Art.9 trigger | Apply under-18 safeguarding baseline; do not apply under-16 trigger solely due to age | RW-LAW-001, RW-LAW-002, RB-01 |
| POL-010 | Rwanda, child status not known but facts indicate likely child | Knowledge predicate uncertain | HOLD_FOR_REVIEW | Art.9 knowledge trigger and child-protection duties need counsel interpretation |

## 3. Authority, autonomy and privacy vectors

| ID | Scenario | Key inputs | Expected result | Rules / rationale |
|---|---|---|---|---|
| POL-011 | Aunt/uncle claims caregiver relationship without legal evidence | Identity known; authority not verified | DENY protected guardian permissions; public access evaluated separately | RB-03 |
| POL-012 | Foster caregiver presents potentially relevant placement document | Identity verified; scope/validity/legal effect unresolved | HOLD_FOR_REVIEW | Care status alone does not establish blanket data-processing authority |
| POL-013 | Church leader requests learner dashboard access | Role = church leader; no legal authority | DENY | RB-03, RB-10 |
| POL-014 | School/institution requests assigned learner access | Institutional mandate and scope verified, purpose and expiry specified | ALLOW_WITH_CONTROLS only after local law, contract and learner privacy review | RB-03, RB-10 |
| POL-015 | Sponsor funds profile and asks for private journal | Sponsor funding; journal private | DENY | RB-07, RB-10 |
| POL-016 | Parent requests private reflection content | Parent verified; no separate approved legal basis or child-protection exception | DENY by default; escalate only under separately approved legal process | RB-07 |
| POL-017 | Learner reaches 18 | Adult threshold under applicable local rule confirmed; former guardian permission exists | Trigger adult transition and review/revoke prior guardian access unless valid continuing authority/authorization exists | Phase 00C autonomy model; local counsel validation |
| POL-018 | Spiritual maturity score is supplied as authority evidence | Maturity score present; legal evidence absent | DENY; reject input | RB-11 |

## 4. Sensitive data, purpose and AI vectors

| ID | Scenario | Key inputs | Expected result | Rules / rationale |
|---|---|---|---|---|
| POL-019 | Bible-reading events used to infer religious identity | Usage data; inferred belief attribute requested | DENY | RB-06 |
| POL-020 | Prayer journal content sent to AI tutor | Sensitive reflection; AI provider; no separately approved purpose/ground | DENY or HOLD_FOR_REVIEW; no transmission pending approval | RB-06, RB-07, RB-08 |
| POL-021 | Consent for profile creation reused for voice assessment | Profile consent; voice purpose not separately authorized | DENY | RB-08 |
| POL-022 | AI provider location or retention terms unknown | Child prompt content; vendor unknown | HOLD_FOR_REVIEW | Provider and transfer gate |
| POL-023 | Adaptive recommendation based on non-sensitive learning event | Approved purpose, minimization, DPIA decision and vendor route evidenced | ALLOW_WITH_CONTROLS if all applicable local rules pass | No automatic assumption that all personalization is prohibited |
| POL-024 | AI output states that it is divine authority or ranks spiritual worth | Generated content includes prohibited claim | DENY output; safety policy intervention | Product integrity baseline |

## 5. Transfer, storage and incident vectors

| ID | Scenario | Key inputs | Expected result | Rules / rationale |
|---|---|---|---|---|
| POL-025 | Kenya child data sent to overseas processor without verified transfer route | Destination/contract/grounds missing | HOLD_FOR_REVIEW | KE-LAW-005 |
| POL-026 | Rwanda data stored outside Rwanda; valid Art.50 certificate absent | Foreign storage; registration certificate missing | DENY or HOLD_FOR_REVIEW; block storage | RW-LAW-005 |
| POL-027 | Rwanda transfer safeguards exist but foreign-storage certificate is absent | Arts.48–49 transfer record present; Art.50 storage authorization absent | HOLD_FOR_REVIEW; transfer approval does not satisfy storage gate | RW-LAW-004, RW-LAW-005 |
| POL-028 | Uganda processor/subprocessor location unknown | Destination/access unknown | HOLD_FOR_REVIEW | UG-LAW-005 and vendor inventory |
| POL-029 | Rwanda personal-data breach discovered | Controller/processor role and discovery time recorded | Start counsel-approved 48-hour notification workflow; do not wait for a full investigation to begin escalation | RW-LAW-006 |
| POL-030 | Tanzania 2026 regulation publication exists but instrument status/content not reconciled | Source status unknown | HOLD_FOR_REVIEW for affected legal decision | TZM-REG-005 |

## 6. Content rights vectors

| ID | Scenario | Key inputs | Expected result | Rules / rationale |
|---|---|---|---|---|
| POL-031 | Bible translation source/edition has no licence record | Content item; rights unknown | HOLD_FOR_REVIEW; do not distribute | KE-OPEN-009 and relevant country IP rules |
| POL-032 | Licence allows display but not offline download | Offline cache requested | DENY offline use; online display may be separately evaluated | Exact mode-of-use limitation |
| POL-033 | Licence permits app display but not AI ingestion/model training | AI ingestion requested | DENY AI use | Separate rights purpose |
| POL-034 | Uganda content use after 2026 copyright amendment has not been reviewed | Online distribution, service-provider or adaptation use | HOLD_FOR_REVIEW | UG-IP-008 |
| POL-035 | Tanzania Zanzibar distribution supported only by Mainland rights analysis | Zanzibar distribution; territorial scope missing | HOLD_FOR_REVIEW | TZZ-OPEN-003 |

## 7. System integrity and failure vectors

| ID | Scenario | Expected result |
|---|---|---|
| POL-036 | Policy service unavailable during child journal write | Fail closed; do not write or transmit journal content |
| POL-037 | Client supplies guardian=true but authority service has no verified record | DENY protected action |
| POL-038 | Consent record is revoked after a previous ALLOW | Re-evaluate; deny or hold future processing and trigger approved withdrawal/deletion workflow |
| POL-039 | Policy version changes while an action is in flight | Re-evaluate under current approved version before commit |
| POL-040 | Missing jurisdiction is treated as “global/default” | Test fails; HOLD_FOR_REVIEW |
| POL-041 | Missing age is treated as adult | Test fails; HOLD_FOR_REVIEW |
| POL-042 | Unknown data classification is treated as non-sensitive | Test fails; HOLD_FOR_REVIEW |
| POL-043 | OPEN or SUSPENDED rule returns ALLOW | Test fails; evaluator must HOLD_FOR_REVIEW |
| POL-044 | Decision audit log contains journal text, prayer content or raw identity documents | Test fails; sensitive content must not be logged |
| POL-045 | Tanzania Zanzibar silently inherits Mainland policy | Test fails; separate territorial route required |
| POL-046 | Rwanda under-16 Art.9 rule is treated as the universal child-protection definition | Test fails; preserve separate age semantics |
| POL-047 | Product under-18 safeguarding baseline is labelled as statutory consent age in every country | Test fails; distinguish baseline from local law |
| POL-048 | Guidance is represented as binding legislation | Test fails; primary class and legal status must remain accurate |
| POL-049 | Product baseline exception is approved without named owner, rationale, expiry and review | Test fails; no silent exception |
| POL-050 | Spiritual progress, XP or religious engagement changes legal permissions | Test fails; prohibited input |

## 8. Acceptance and evidence requirements

A future implementation is not accepted by merely passing unit tests. Evidence must include:

- rule-catalogue schema validation;
- unit tests for each decision predicate and reason code;
- integration tests proving server-side enforcement;
- negative authorization tests for cross-learner access;
- policy-version and source-version traceability;
- synthetic fixtures for each jurisdiction and age edge;
- tests for missing, stale, conflicting and revoked facts;
- provider/transfer/storage tests using actual deployment inventory;
- content-rights tests against actual licence metadata;
- audit-log privacy tests;
- operational exercises for legal hold, safeguarding escalation, breach and revocation;
- security review and owner sign-off;
- jurisdiction-specific counsel sign-off for legal interpretation.

## 9. Disposition

These 50 vectors are proposed test cases for design review. They have not been executed and do not establish compliance, implementation readiness or launch approval.
