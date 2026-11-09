# Project Sentinel — Phase 00D Jurisdiction Rule Catalogue

**Product:** Grow In The Word  
**Phase:** 00D — International Governance  
**Scope:** Kenya, Uganda, Tanzania Mainland, Tanzania Zanzibar (separately unresolved where applicable), Rwanda  
**Status:** Draft policy-design artefact; not counsel-approved; not an executable ruleset; not launch approval  
**Research basis:** Four preliminary country assessments and the East African Comparative Legal Requirements & Jurisdiction Differences Matrix  
**Application impact:** Documentation only. No application source, configuration, schema, data or UI changes are authorized.

---

## 1. Purpose and authority boundary

This catalogue converts preliminary legal research and the proposed regional product baseline into individually traceable policy rules. It is intended to become the controlled source for a future policy decision service only after owner approval, current-source verification and jurisdiction-specific legal review.

It is not a legal opinion and must not be used as an autonomous legal interpretation engine. A catalogue entry records a researched proposition, its confidence and approval status; it does not make an unresolved proposition legally authoritative.

**No rule in this draft authorizes collection or processing of real child data, deployment, market activation, content distribution or production AI use.**

## 2. Rule classification taxonomy

Every rule MUST have exactly one primary class:

| Code | Class | Meaning | Decision treatment |
|---|---|---|---|
| LAW | Binding legal requirement | Requirement grounded in enacted legislation, regulation or binding order, with territorial and commencement status recorded | Mandatory when applicability is established |
| REG | Regulator guidance / code | Published regulator guidance, code or official interpretation; legal force must be described accurately | Apply as guidance; counsel assesses weight and applicability |
| BASELINE | Product baseline safeguard | Deliberately stricter or more consistent product protection adopted across markets | Apply unless formally excepted by authorized owner and counsel where law is implicated |
| OPEN | Unresolved legal question | Incomplete source, uncertain interpretation, territorial ambiguity, missing commencement or counsel question | Return HOLD_FOR_REVIEW for affected processing or feature |
| OPS | Operational control | Internal process needed to make a legal or product requirement effective (e.g. incident response, evidence review) | Block activation until owner and accountable function approve operational readiness |
| IP | Rights / licence condition | Contractual, statutory or rights-holder permission needed for content, API, media or model use | Block affected content/use until evidence establishes permission |

A rule may reference supporting rules of other classes, but it must not collapse them into one legal claim. The catalogue must explicitly label product policy as product policy.

## 3. Rule lifecycle and status

Allowed lifecycle values:

- `DRAFT`: authored, not yet source-validated.
- `SOURCE_CHECK_REQUIRED`: primary source/version/commencement must be checked.
- `RESEARCHED_UNREVIEWED`: desk research recorded; counsel has not approved.
- `OWNER_REVIEW_REQUIRED`: product owner decision required.
- `COUNSEL_REVIEW_REQUIRED`: jurisdiction-qualified legal review required.
- `APPROVED_POLICY`: owner-approved policy, with required counsel sign-off recorded for legal interpretation.
- `IMPLEMENTATION_ELIGIBLE`: approved rule with complete implementation contract and tests; does not mean implemented.
- `IMPLEMENTED_UNVERIFIED`: code/control exists but has not passed evidence-based verification.
- `VERIFIED`: required tests and operational evidence pass for the stated scope.
- `SUSPENDED`: rule/source/approval invalidated, expired or under review.

A rule MUST NOT move to APPROVED_POLICY or IMPLEMENTATION_ELIGIBLE merely because it appears in this document.

## 4. Required rule record schema

The following is the canonical conceptual record. It is a documentation contract, not a database schema or JSON API contract.

| Field | Required | Definition |
|---|---:|---|
| rule_id | Yes | Stable identifier; never recycle an ID |
| title | Yes | Short descriptive name |
| primary_class | Yes | LAW, REG, BASELINE, OPEN, OPS or IP |
| jurisdiction | Yes | KE, UG, TZ-MAINLAND, TZ-ZANZIBAR, RW or GLOBAL |
| territory_scope | Yes | Explicit territorial reach and exclusions |
| source_name | Yes | Official instrument, regulator publication, contract or policy |
| source_locator | Yes | Exact URL/document reference plus section/article/regulation/page |
| source_version | Yes | Consolidation, amendment, publication or retrieval version |
| legal_status | Yes | In force, enacted-not-commenced, repealed, guidance, uncertain, contract-active, etc. |
| effective_from | Conditional | Commencement/effective date, where known |
| effective_to | Conditional | End date/repeal/supersession, where applicable |
| source_checked_at | Yes | Date source was last verified against authoritative origin |
| applicability_predicates | Yes | Facts that must be true before rule applies |
| subject_scope | Yes | Child, adult, parent, guardian, controller, processor, publisher, etc. |
| data_categories | Yes | Personal, child, sensitive belief, voice, journal, usage, content, etc. |
| processing_purpose | Yes | Specific purpose; never use a blanket “app use” purpose |
| age_logic | Conditional | Threshold, knowledge trigger and age-band semantics; no universal age field |
| authority_requirement | Conditional | Required legal role, scope, evidence and verification state |
| required_controls | Yes | Safeguards needed to satisfy the rule |
| exceptions | Yes | Exact statutory exception or “none established”; no inferred exceptions |
| decision_effect | Yes | ALLOW, ALLOW_WITH_CONTROLS, DENY, HOLD_FOR_REVIEW or NOT_APPLICABLE |
| decision_reason_code | Yes | Stable machine-readable reason code proposal |
| linked_rules | No | Related rule IDs |
| test_ids | Yes | Acceptance criteria and policy vectors that exercise the rule |
| evidence_required | Yes | Evidence needed to prove the rule is satisfied |
| accountable_owner | Yes | Role accountable for keeping the rule current |
| counsel_status | Yes | Not requested, pending, reviewed with advice reference, or not applicable with rationale |
| owner_status | Yes | Pending, accepted, rejected, superseded |
| review_due | Yes | Next source/policy review date |
| supersedes / superseded_by | No | Rule version lineage |
| notes | No | Narrow explanation and unresolved questions |

### 4.1 Data type and evidence conventions

- Dates use ISO 8601 calendar dates.
- Age is represented as an assessed age band or threshold result plus assessment date and jurisdiction context; do not retain identity documents by default.
- Source references identify the actual instrument and provision, not only a general homepage.
- Evidence references point to controlled records; avoid copying unnecessary identity-document contents into the rule record.
- A missing required field is a validation failure, not an implied approval.

## 5. Regional baseline rules

These are proposed product controls, not statements that all countries impose identical statutory requirements.

| Rule ID | Rule | Primary class | Decision effect |
|---|---|---|---|
| RB-01 | Apply an under-18 safeguarding baseline across the product unless a documented, reviewed feature-specific exception is approved | BASELINE | ALLOW_WITH_CONTROLS |
| RB-02 | Evaluate legal age/capacity separately for each jurisdiction, purpose and data category; product UX age bands never establish legal consent capacity | BASELINE | HOLD_FOR_REVIEW if required age fact is unknown |
| RB-03 | Verify legal authority, not merely identity or relationship, before granting protected caregiver permissions | BASELINE | DENY or HOLD_FOR_REVIEW |
| RB-04 | Separate child assent from legally required parental/guardian or other authorized-person consent | BASELINE | HOLD_FOR_REVIEW when required authorization absent |
| RB-05 | Perform and record a best-interests assessment before activating child-facing high-risk processing | BASELINE | HOLD_FOR_REVIEW |
| RB-06 | Treat religious beliefs, explicit prayer/reflection content and inferred belief as restricted sensitive information; do not infer belief from feature use | BASELINE | DENY unauthorized inference; HOLD_FOR_REVIEW for proposed processing |
| RB-07 | Exclude private journal/reflection content from AI, analytics, sponsor reporting and institutional dashboards by default | BASELINE | DENY unless separately reviewed and authorized |
| RB-08 | Apply purpose limitation: profile creation, AI, voice, analytics, sharing, sponsor reporting and model training are distinct purposes | BASELINE | HOLD_FOR_REVIEW for unapproved new purpose |
| RB-09 | Use privacy-preserving, proportionate age assurance and retain the minimum result/evidence metadata necessary | BASELINE | HOLD_FOR_REVIEW if assurance is inadequate |
| RB-10 | Require resource-level authorization and least privilege for every learner record and family/institution relationship | BASELINE | DENY unauthorized access |
| RB-11 | No spiritual maturity, religious engagement, Bible knowledge or activity score may determine legal capacity, access rights or caregiver authority | BASELINE | DENY invalid policy input |
| RB-12 | No market or feature is launch-enabled solely because a rule catalogue entry exists; required evidence, counsel and operational approvals must be complete | BASELINE | HOLD_FOR_REVIEW |

## 6. Preliminary jurisdiction rule inventory

The records below are intentionally concise. They identify rule families and source provisions for structured review; the underlying country assessments remain the detailed research record. All are RESEARCHED_UNREVIEWED or COUNSEL_REVIEW_REQUIRED unless later evidence explicitly changes status.

### 6.1 Kenya (KE)

| Rule ID | Class | Rule proposition / source anchor | Applicability inputs | Required control / disposition |
|---|---|---|---|---|
| KE-LAW-001 | LAW | Data Protection Act 2019, s.33; child personal-data processing and consent safeguards | Child status, purpose, data category, controller and lawful basis | Establish applicable authorization and safeguards; HOLD pending counsel-approved purpose map |
| KE-REG-002 | REG | ODPC 2025 Guidance Note for Processing Children's Data; best interests, parent/guardian consent and authority verification; guidance treats child-data consent age as 18 | Child data, age, authority claim, processing purpose | Verify authority and document best interests; source/version check before implementation |
| KE-LAW-003 | LAW | Data Protection Act 2019, s.31; DPIA for high-risk processing | Processing risk, child/sensitive data, profiling, AI, voice | Complete DPIA and resolve residual risk before activation |
| KE-LAW-004 | LAW | Data Protection Act 2019, s.45; sensitive personal data | Religious beliefs/reflections and any other sensitive category | Establish a qualifying statutory ground and safeguards; do not presume non-profit exception |
| KE-LAW-005 | LAW | Data Protection Act 2019, ss.48–49; transfers outside Kenya | Data subject location, destination, data category, recipient and safeguards | Validate transfer route and sensitive-data conditions; HOLD if unresolved |
| KE-LAW-006 | LAW | Data Protection Act 2019, s.18 and applicable registration regulations | Entity, controller/processor role, activity category | Determine ODPC registration requirement and evidence before processing |
| KE-REG-007 | REG | ODPC registration FAQs/guidance; education and faith-based categories not exempt as a general assumption | Entity/activity classification | Confirm classification and registration with ODPC/counsel |
| KE-LAW-008 | LAW | Children Act 2022, ss.27–28 and ss.31–35; child privacy/participation and parental responsibility/guardianship | Child, caregiver relationship, legal order, age transition | Preserve child privacy and verify legal authority; section 35 extension requires specific court order analysis |
| KE-OPEN-009 | OPEN | Current consolidated Copyright Act and subsequent amendments not yet fully verified | Every translation, commentary, media item, API and use | HOLD distribution/use until current law and rights evidence are confirmed |
| KE-OPEN-010 | OPEN | Whether defined localization categories in General Regulations apply to this service/data flow | Entity, sector, data type, hosting/backup/support locations | Obtain current legal advice before provider/region selection |

### 6.2 Uganda (UG)

| Rule ID | Class | Rule proposition / source anchor | Applicability inputs | Required control / disposition |
|---|---|---|---|---|
| UG-LAW-001 | LAW | Data Protection and Privacy Act 2019, s.8; child personal data and prior consent from parent, guardian or other person with authority, subject to statutory exceptions | Child status, knowledge, purpose, authority, exception | Verify qualifying authority and exception; no assumption that relationship alone suffices |
| UG-LAW-002 | LAW | Data Protection and Privacy Regulations 2021; age-ascertainment system requirement | Service design, child access, age uncertainty | Define proportionate age assurance and evidence; counsel confirms implementation detail |
| UG-LAW-003 | LAW | Data Protection and Privacy Act special personal data provisions; religious/philosophical beliefs | Belief/reflection content and purpose | Establish applicable ground/exception and safeguards; default exclusion from AI/analytics |
| UG-LAW-004 | LAW | Data Protection and Privacy Regulations, reg.12; high-risk DPIA | Child/sensitive/high-risk processing | Complete DPIA and document mitigation/residual risk |
| UG-LAW-005 | LAW | Data Protection and Privacy Act, s.19; overseas processing/transfer conditions | Destination, adequacy/safeguards, recipient and access locations | Validate lawful route and contracts; HOLD unresolved transfers |
| UG-OPEN-006 | OPEN | Current PDPO registration categories, procedure, fees and status require verification | Entity/controller/processor role and processing activity | Obtain current PDPO/counsel confirmation before processing |
| UG-OPEN-007 | OPEN | Current breach notification, service-provider and mandatory reporting details require consolidated legal review | Incident type, data, child safety, service status | No incident workflow approval until local counsel/safeguarding review |
| UG-IP-008 | IP | Copyright and Neighbouring Rights Act as amended by Act 8 of 2026, commenced 22 May 2026 | Online exploitation, service provider role, translation, offline, accessibility, AI and media uses | Obtain focused local IP opinion and item-level rights clearance |

### 6.3 Tanzania Mainland (TZ-MAINLAND)

| Rule ID | Class | Rule proposition / source anchor | Applicability inputs | Required control / disposition |
|---|---|---|---|---|
| TZM-LAW-001 | LAW | Personal Data Protection Act 2022, including definition of sensitive personal data that includes data relating to children | Child-related data, controller, purpose | Treat child-related data as sensitive for classification and safeguards |
| TZM-LAW-002 | LAW | Personal Data Protection Act 2022, s.30; sensitive-data processing and written-consent/representative requirements, subject to statutory conditions/exceptions | Data category, child status, representative, purpose | Obtain counsel-confirmed ground and written authorization where required |
| TZM-LAW-003 | LAW | PDPA registration obligations and PDPC requirements before processing | Entity, controller/processor status, activity | Verify and obtain required registration before collection/processing |
| TZM-LAW-004 | LAW | PDPA cross-border transfer provisions, including ss.31–32 | Destination, recipient, data category, safeguards and permit process | Confirm current permit/adequacy route and evidence before transfer |
| TZM-REG-005 | REG | Personal Data Collection and Processing Regulations 2023 and 2024 amendment; current 2026 publication/Gazette status needs reconciliation | DPIA, DPO, breach, transfer and operational procedure | Source-check latest official version and obtain counsel interpretation |
| TZM-OPEN-006 | OPEN | Current Mainland child welfare, online-safety, mandatory-reporting and platform-specific duties require detailed mapping | Child-facing feature, user-generated content, messaging, incident | HOLD affected feature until operational and legal duties are mapped |
| TZM-OPEN-007 | OPEN | Mainland copyright and rights scope for translations, digital distribution, APIs and AI uses require current-law review | Content item, territory, mode of use | HOLD distribution/use until IP clearance |

### 6.4 Tanzania Zanzibar (TZ-ZANZIBAR)

| Rule ID | Class | Rule proposition / source anchor | Applicability inputs | Required control / disposition |
|---|---|---|---|---|
| TZZ-OPEN-001 | OPEN | Mainland PDPA does not automatically resolve non-Union matters in Zanzibar; territorial scope and applicable Zanzibar data law must be separately determined | User location, processing activity, Union/non-Union subject matter, controller | HOLD personal-data processing requiring unresolved Zanzibar legal analysis |
| TZZ-OPEN-002 | OPEN | Zanzibar child welfare, parental authority, online safety and reporting rules require a separate current-source assessment | Child status, feature, incident, caregiver role | Do not inherit Mainland assumptions; counsel assessment required |
| TZZ-OPEN-003 | OPEN | Zanzibar copyright and content-distribution rules require separate territorial review | Content rights, distribution territory, offline/API use | HOLD affected distribution until rights review |
| TZZ-OPEN-004 | OPEN | Whether Mainland registration/transfer instruments apply to a particular Zanzibar non-Union processing operation remains unresolved | Entity, data subject, processing, storage/transfer | HOLD until territory-specific opinion and regulator position are recorded |

### 6.5 Rwanda (RW)

| Rule ID | Class | Rule proposition / source anchor | Applicability inputs | Required control / disposition |
|---|---|---|---|---|
| RW-LAW-001 | LAW | Law No. 058/2021, Art.9; where controller/processor/third party knows data belongs to child under 16, parental-responsibility holder consent is required, subject to statutory conditions/exceptions | Knowledge of child status, age under 16, authority, purpose | Distinguish under-16 Art.9 trigger from under-18 safeguarding baseline |
| RW-LAW-002 | LAW | Child-protection law defines child protection obligations separately from Art.9 data-consent threshold | Child under 18, feature and risk | Apply under-18 safeguarding baseline; map local duties |
| RW-LAW-003 | LAW | Law No.058/2021, Arts.10–11; sensitive personal data grounds and safeguards | Religious belief/reflection or other sensitive data | Establish lawful ground and safeguards; default exclusion from AI/analytics |
| RW-LAW-004 | LAW | Law No.058/2021, Arts.48–49; international transfer requirements and contracts | Destination, recipient, data category, safeguards | Validate transfer basis and contract before transfer |
| RW-LAW-005 | LAW | Law No.058/2021, Art.50; foreign storage requires valid registration certificate authorizing foreign storage | Foreign storage, controller/processor registration certificate | Treat storage authorization as a distinct gate; HOLD foreign storage without evidence |
| RW-LAW-006 | LAW | Law No.058/2021, Art.43; breach notification timing, including 48-hour supervisory authority notification and processor-to-controller notification | Breach classification, controller/processor role, discovery time | Implement counsel-validated incident clock and processor escalation |
| RW-OPEN-007 | OPEN | Current registration/DPO requirements and foreign-controller applicability require source and counsel confirmation | Entity, role, processing and storage | HOLD until current regulator requirements evidenced |
| RW-OPEN-008 | OPEN | Current copyright/IP consolidation, online safety and mandatory reporting mapping incomplete | Content, platform feature, incident | HOLD affected content/features until reviewed |

## 7. Rule precedence and conflict principles

Apply the following order. This is a proposed product-policy evaluation order, not a claim about statutory hierarchy:

1. **Territorial applicability:** identify user/data-subject location, controller establishment, targeted market, processing location, recipient and subject matter. For Tanzania, determine Mainland versus Zanzibar and whether the matter is Union or non-Union.
2. **Source validity:** confirm instrument version, legal status, commencement, territorial reach and any superseding amendment.
3. **Subject and age status:** distinguish child-protection age, data-consent threshold, age-assurance knowledge trigger and adult status.
4. **Data classification:** classify ordinary personal data, child data, sensitive belief data, voice/biometric-like data, journal content and third-party data.
5. **Purpose:** evaluate each discrete processing purpose independently.
6. **Legal basis and authority:** establish lawful basis, qualifying representative, scope, evidence, validity and revocation.
7. **Required safeguards:** best interests, DPIA, minimization, transparency, security, retention and rights handling.
8. **Provider and location:** evaluate processor/subprocessor, access locations, storage, support, backup and transfer/storage authorization.
9. **Content rights:** verify rights for the exact work, edition, territory, medium, audience, term and technical use.
10. **Operational readiness:** confirm safeguarding, incident response, support, reporting and accountable owners.

Conflict rules:

- Applicable mandatory local law takes precedence over a conflicting product baseline.
- The common product baseline may be stricter than local law and remains in force unless a documented exception is approved.
- A product baseline must never be described as a statutory requirement.
- A regulator guidance proposition must not be silently promoted into legislation.
- Conflicting or incomplete legal sources produce HOLD_FOR_REVIEW.
- No rule may broaden an exception beyond the exact source and counsel-approved interpretation.
- A rule cannot authorize a purpose merely because a different purpose has valid consent.
- No “most permissive country wins” rule is allowed.

## 8. Required decision outputs

A future policy service may return only the following primary outcomes:

- `ALLOW`: all required legal, policy, authority and evidence conditions are satisfied; no additional controls are required.
- `ALLOW_WITH_CONTROLS`: processing may proceed only with enumerated enforceable controls and valid evidence.
- `DENY`: a known prohibition, missing mandatory authorization, invalid authority, expired permission or disallowed purpose prevents the requested action.
- `HOLD_FOR_REVIEW`: applicability, law, authority, source status, evidence or interpretation is uncertain; no affected processing occurs pending review.
- `NOT_APPLICABLE`: rule predicates are demonstrably false; rationale and evaluation evidence are retained.

A missing input must never be treated as false where that would incorrectly bypass a protective rule. Unknown age, unknown territory, unknown authority, unknown provider location or unknown licence scope must produce HOLD_FOR_REVIEW when material.

## 9. Catalogue validation rules

A catalogue release fails validation if any of the following occurs:

- duplicate or recycled rule ID;
- missing primary class, jurisdiction or territorial scope;
- missing source locator for LAW, REG or IP;
- legal status or commencement unknown but rule is marked approved;
- no source-check date;
- no applicability predicates;
- no decision effect or reason code;
- no test mapping;
- no owner or review date;
- an OPEN rule returns ALLOW;
- a Tanzania Zanzibar rule silently inherits Mainland rules;
- Rwanda Art.9 under-16 trigger is rewritten as a universal under-18 consent threshold;
- a product baseline is labelled as legislation;
- a guidance document is represented as binding legislation;
- an exception is applied without source and counsel rationale;
- a rule relies on spiritual maturity or engagement score as legal authority.

## 10. Source and counsel register

The country assessments are the source index for the present research cut-off:

- `KENYA_JURISDICTION_LEGAL_REQUIREMENTS_ASSESSMENT.md`
- `UGANDA_JURISDICTION_LEGAL_REQUIREMENTS_ASSESSMENT.md`
- `TANZANIA_JURISDICTION_LEGAL_REQUIREMENTS_ASSESSMENT.md`
- `RWANDA_JURISDICTION_LEGAL_REQUIREMENTS_ASSESSMENT.md`
- `EAST_AFRICAN_COMPARATIVE_LEGAL_REQUIREMENTS_AND_JURISDICTION_DIFFERENCES_MATRIX.md`

Before a rule is approved, attach the exact primary-source URL, version and provision, current status/commencement check, counsel name/qualification or firm, advice date, scope, limitations and linked written advice reference. Do not publish privileged advice in the public repository; store a controlled reference and approved non-privileged conclusion.

## 11. Review and change control

- Revalidate every LAW, REG and IP source before implementation and before each market launch.
- Review OPEN rules when the named source, counsel answer or regulator position becomes available.
- Review the catalogue at least quarterly during active product development and immediately after a material legal change.
- Record every changed rule as a new version; preserve previous versions and the reason for change.
- Re-run all linked tests after a change.
- Suspend a rule when its legal source is repealed, invalidated, superseded or materially uncertain.
- Monthly legal monitoring reports are inputs to review, not automatic approval to change a rule.

## 12. Disposition

**Draft only.** The catalogue is ready for owner review as a structured research-to-policy artefact. It is not ready for software implementation, child-data processing, provider selection or launch. Local counsel review and current-source validation remain required in each jurisdiction, with separate Zanzibar legal assessment.
