# Project Sentinel — Phase 00D Acceptance Criteria & Test Plan

**Status:** Proposed requirements and tests; none have been implemented or executed  
**Companion:** PHASE_00D_MASTER_INTERNATIONAL_GOVERNANCE_BLUEPRINT.md  
**Scope:** Documentation, design review and evidence planning only

## 1. Purpose and test philosophy

This plan makes Phase 00D governance requirements verifiable. It does not claim that the current application satisfies them. Tests marked **design review** can be assessed against documents now; implementation tests require a later phase and must not be reported as passed until executed against working controls.

Each requirement must map to one or more acceptance tests, a responsible owner, evidence artefact and status. A policy statement without implementation or operational evidence is not a passed technical control.

## 2. Acceptance status vocabulary

- **Defined:** requirement is documented and internally consistent.
- **Owner reviewed:** owner has reviewed the proposed requirement.
- **Counsel reviewed:** qualified counsel has reviewed it for the specified jurisdiction and use.
- **Implemented:** control exists in the target environment.
- **Verified:** test evidence demonstrates the control works.
- **Blocked:** critical dependency, legal uncertainty or failure prevents approval.
- **Not applicable:** documented rationale and reviewer approval establish non-applicability.

Do not use "compliant" as a generic status for a country or product. Record the exact law, processing purpose, scope, date and evidence.

## 3. Global governance design tests

| ID | Test / review | Expected result | Stage |
|---|---|---|---|
| G00D-001 | Review global baseline against Phase 00C architecture | No contradiction with provider-neutral design, domain boundaries or deferred schema decisions | Design review |
| G00D-002 | Inspect phase scope and proposed changes | No application source, UI, runtime configuration, database schema or production data is modified | Repository audit |
| G00D-003 | Inspect jurisdiction rule model | Rules are jurisdiction-specific, versioned, dated, sourced and approval-gated; no universal hardcoded minor-consent age | Design review |
| G00D-004 | Inspect legal-source register | Each legal claim has authoritative source, jurisdiction, effective date/status, reviewer and uncertainty note | Design review |
| G00D-005 | Inspect global/local precedence rule | Stricter applicable legal requirement is applied; conflicts or uncertainty are escalated rather than guessed | Design review |
| G00D-006 | Inspect governance ownership | Product, privacy, safeguarding, legal, IP, security, engineering and content responsibilities are assigned before launch | Design review |
| G00D-007 | Inspect risk exception process | Critical child-safety, unlawful processing, unauthorized access and unlicensed distribution risks block affected use | Design review |
| G00D-008 | Inspect evidence chain | Requirements link to controls, tests, evidence, approvals, exceptions and review dates | Design review |
| G00D-009 | Inspect non-claims | No document or UI implies legal compliance, certification or launch approval without evidence | Repository/content review |

## 4. Child protection and safeguarding tests

| ID | Test / scenario | Expected result | Stage |
|---|---|---|---|
| G00D-010 | Child enters an age-inappropriate product flow | Flow is restricted or adapted under the approved jurisdiction and age policy | Implementation |
| G00D-011 | Unknown adult attempts unrestricted direct contact with a child | Contact is blocked; reporting and moderation controls apply | Implementation |
| G00D-012 | Learner reports abuse, grooming or exploitation | Clear report route, safe acknowledgement, triage and jurisdiction-reviewed escalation are available | Design + implementation |
| G00D-013 | Child-facing purchase or engagement mechanic is reviewed | No manipulative pressure, deceptive design, coercive streak penalty or exploitative targeting | Design review |
| G00D-014 | Child profile is exposed publicly by default | Test fails; private-by-default controls prevent public disclosure | Implementation |
| G00D-015 | Safeguarding incident requires escalation | Assigned responsible role, response timeframe, evidence-handling and referral protocol are documented | Operational test |
| G00D-016 | A market has mandatory reporting or age-specific safeguarding duties | Local obligations are identified and mapped to an operational procedure before launch | Counsel review |

## 5. Privacy, consent and age-assurance tests

| ID | Test / scenario | Expected result | Stage |
|---|---|---|---|
| G00D-020 | Same learner age is assessed under two jurisdictions | Applicable jurisdiction profiles may produce different requirements; no universal threshold is assumed | Design review |
| G00D-021 | Age assurance requests excessive identity data | Data minimization review rejects unnecessary collection; proportionate alternative assessed | Design review |
| G00D-022 | Child personal-data processing has no valid authorization or legal basis where required | Affected processing is blocked; no workaround via public-facing UI or AI call | Implementation |
| G00D-023 | Parent/guardian claims authority without verification | No protected guardian permissions are granted | Implementation |
| G00D-024 | Guardian authority expires, is disputed or revoked | Affected access and processing are suspended/re-evaluated according to approved policy; event is auditable | Implementation |
| G00D-025 | Child assent is relevant to the activity | Age-appropriate explanation and assent process is defined separately from legal consent | Design + counsel |
| G00D-026 | Data is requested for a new purpose | Purpose/legal-basis/notice/consent assessment occurs before processing | Implementation |
| G00D-027 | Child or representative exercises a data right | Request is authenticated, authority is verified, response deadlines and lawful exceptions are tracked | Operational test |
| G00D-028 | Retention period expires | Data is deleted or anonymized according to schedule, subject to documented lawful holds | Implementation |
| G00D-029 | Personal data appears in logs or telemetry | Sensitive values are redacted or excluded; test fails on leakage | Implementation |
| G00D-030 | High-risk child-data processing is proposed | DPIA or equivalent assessment is completed where required and as the global baseline before activation | Governance gate |

## 6. Identity, care and progressive-autonomy tests

| ID | Test / scenario | Expected result | Stage |
|---|---|---|---|
| G00D-040 | Parent account manages multiple learners | Learner records, consent and permissions remain isolated | Implementation |
| G00D-041 | Foster/kinship caregiver requests guardian-level access | Only verified legal authority or other valid jurisdiction-specific basis grants scoped access | Counsel + implementation |
| G00D-042 | Institutional representative requests learner access | Documented mandate, assigned learner scope, purpose and expiry are required | Implementation |
| G00D-043 | Sponsor funds learner access | Sponsor receives no guardian authority and no private learner data by default | Implementation |
| G00D-044 | Mentor or church leader requests access | No access is granted solely from role, relationship or self-declaration | Implementation |
| G00D-045 | Child has no verified caregiver | Safe public, non-personalized access is considered only if lawful; no personal/sensitive processing is initiated without required basis | Counsel + implementation |
| G00D-046 | Learner enters emerging-autonomy experience | Permissions are derived from applicable law, verified authority and product policy, not age band alone | Implementation |
| G00D-047 | Learner reaches legal adulthood in the applicable jurisdiction | Transition, notice and guardian-permission review follow local law; age 18 is not hardcoded as universal | Implementation |
| G00D-048 | Private journal is requested by parent, institution, sponsor or mentor | Denied by default; any exception requires separately approved legal basis, purpose and safeguards | Security test |
| G00D-049 | Spiritual maturity or religious activity is supplied to authorization policy | Rejected as a legal-capacity or permission input | Architecture test |

## 7. Sensitive belief, inclusion and religious transparency tests

| ID | Test / scenario | Expected result | Stage |
|---|---|---|---|
| G00D-050 | Household is non-Christian or non-religious | Product's Christian purpose is transparently disclosed; no discriminatory denial solely on household belief | Design review |
| G00D-051 | System infers religion from Bible reading or prayer usage | Inference is prohibited and not stored as a learner attribute | Implementation |
| G00D-052 | Religious reflection enters analytics, family projection or sponsor report | Excluded by default; no disclosure without a separately reviewed and authorized purpose | Implementation |
| G00D-053 | Religious reflection is sent to AI | Excluded by default; any exception requires documented necessity, legal basis, purpose-specific authorization and provider review | Security test |
| G00D-054 | AI or product language claims divine authority or spiritual-worth ranking | Prohibited; output evaluation detects and rejects such behavior | Content/AI evaluation |

## 8. AI and third-party provider tests

| ID | Test / scenario | Expected result | Stage |
|---|---|---|---|
| G00D-060 | New AI provider or model is proposed | Provider, location, terms, subprocessors, retention, training, safety and child suitability are assessed before use | Governance gate |
| G00D-061 | Child data is included in model training by default | Prohibited; no training use without explicit legal, contractual and product approval | Contract + implementation |
| G00D-062 | AI request includes unnecessary child identifiers | Data minimization gateway removes or blocks unnecessary data | Implementation |
| G00D-063 | AI provider changes retention, training or subprocessors | Change review is triggered; affected processing is paused if risk cannot be resolved | Operational test |
| G00D-064 | AI generates scripture citation | Citation is checked against approved source; fabricated or unsupported citation is flagged | Implementation |
| G00D-065 | AI output provides safeguarding or crisis response | Approved safety protocol applies; no false promise of absolute confidentiality | Evaluation |
| G00D-066 | Processor contract or transfer mechanism is absent where required | Processing is blocked pending legal/contractual approval | Governance gate |

## 9. Copyright, licensing and provenance tests

| ID | Test / scenario | Expected result | Stage |
|---|---|---|---|
| G00D-070 | Bible translation is selected for distribution | Rights owner, edition, licence evidence, territory, quotation limits and attribution are recorded | Rights review |
| G00D-071 | Licence permits display but not AI input | AI use is blocked even if ordinary display is allowed | Rights/implementation |
| G00D-072 | Content is assumed public domain globally | Assumption is rejected; status is checked by jurisdiction, edition and rights layer | Rights review |
| G00D-073 | Licence expires, is withdrawn or territory excludes a learner | Affected content/use is disabled or withheld; alternatives and takedown process are available | Implementation |
| G00D-074 | Audio, performance, commentary, artwork or study notes accompany Scripture | Each distinct rights object is separately assessed | Rights review |
| G00D-075 | User uploads third-party material | Upload does not automatically grant redistribution rights; permitted use and takedown route are assessed | Design + implementation |
| G00D-076 | AI generates derivative material from licensed text | Licence and applicable law are checked for the specific input/output use; no automatic permission is assumed | Rights review |
| G00D-077 | Offline download or caching is enabled | Licence explicitly permits relevant offline storage, access period and territory | Rights/implementation |
| G00D-078 | Attribution requirement exists | Required notice is displayed accurately and in the permitted location/format | Implementation |
| G00D-079 | Content has unknown or disputed provenance | Content is withheld from distribution until resolved | Governance gate |

## 10. International data transfer and market launch tests

| ID | Test / scenario | Expected result | Stage |
|---|---|---|---|
| G00D-080 | Data passes through hosting, AI, analytics, support or backup locations | End-to-end data-location and access map exists | Design review |
| G00D-081 | Cross-border transfer is proposed | Applicable transfer restriction and safeguard are reviewed for each affected jurisdiction | Counsel review |
| G00D-082 | New country is enabled in configuration | Market remains blocked until jurisdiction profile, rights, safeguards, support and approval gates pass | Implementation |
| G00D-083 | Law or regulator guidance changes | Change is triaged, impact assessed, affected rules/tests updated and approval recorded | Operational test |
| G00D-084 | Market has unresolved critical child-safety or licensing issue | Market or affected feature remains blocked | Governance gate |
| G00D-085 | Country is marked approved | Evidence exists for legal review, controls, test results, incident response, rights, operational readiness and owner approval | Launch audit |

## 11. Phase 00D repository preservation tests

| ID | Test | Expected result |
|---|---|---|
| G00D-090 | Compare Phase 00D branch with Phase 00C audit baseline | Changes are confined to approved Project Sentinel documentation paths |
| G00D-091 | Inspect application source paths | No application source files are modified |
| G00D-092 | Inspect Phase 00C architecture documents | No silent rewrite or removal; any required cross-reference is additive and explicitly reviewed |
| G00D-093 | Inspect infrastructure, environment and deployment files | No runtime, secrets, hosting, database or deployment configuration changes |
| G00D-094 | Inspect repository history and branch ancestry | Phase 00D branch descends from the Phase 00C audit branch; main remains untouched |
| G00D-095 | Inspect claims of test execution | No design-only test is reported as implementation-verified or passed |

## 12. Phase 00D exit checklist

Phase 00D can be recommended for owner acceptance when all of the following are true:

- [ ] Master international governance blueprint reviewed and owner-approved.
- [ ] Priority launch markets selected or explicitly deferred.
- [ ] Jurisdiction matrix contains authoritative sources, effective status, applicability questions and counsel-review status.
- [ ] Child safeguarding and privacy requirements are mapped to owners and evidence.
- [ ] Age assurance, consent, child assent and legal authority are separately specified.
- [ ] Progressive autonomy and care pathways remain consistent with Phase 00C.
- [ ] Sensitive belief and private journal boundaries are explicit.
- [ ] AI provider and data-use review requirements are specified.
- [ ] Scripture and other content rights registry model is defined.
- [ ] Data transfer and residency assessment is defined.
- [ ] Acceptance tests map to requirements and later implementation evidence.
- [ ] Critical gaps are entered in the continuing defect register.
- [ ] Phase 00C architecture and application source remain preserved.
- [ ] Owner approves next phase and any implementation scope.

## 13. Execution and reporting rules

- Design-review tests may be completed during Phase 00D using repository evidence and owner review.
- Counsel-review tests require written advice or a documented legal review record for the specified country and processing purpose.
- Implementation tests require a test environment, test data, reproducible steps and retained results.
- Operational tests require evidence of an actual procedure, accountable owner and exercise.
- A test result must include test ID, date, environment, version, evidence reference, outcome, defects and reviewer.
- A failed or blocked test must create or update a defect; it must not be hidden by changing the expected result.
- No test result is evidence of legal compliance beyond its expressly stated scope.

## 14. Non-claims

No test in this document has been executed merely because it has been written. This plan is not a legal opinion, certification, security assessment or launch authorization.


## 15. Kenya-specific requirements tests

The following Kenya-specific tests extend the global suite. They are proposed and have not been executed.

| ID | Test / scenario | Expected result | Stage |
|---|---|---|---|
| KE-AT-001 | Kenyan learner under 18 attempts account creation | Child status is identified; personal-data processing is blocked until section 33 authorization and best-interests controls are satisfied | Implementation |
| KE-AT-002 | Adult verifies email but has no verified parent/guardian authority | No child guardian permissions or consent status is granted | Implementation |
| KE-AT-003 | Parent consents to account but not optional AI or analytics | Optional purposes remain disabled and are not bundled with essential consent | Implementation |
| KE-AT-004 | Age assurance requests national ID for low-risk access | Necessity/proportionality review rejects unnecessary collection and assesses a less intrusive method | Design + implementation |
| KE-AT-005 | Child-data feature is activated without completed DPIA | Activation is blocked | Governance gate |
| KE-AT-006 | AI derives a religion label from Scripture engagement | Inference is prohibited, not persisted and not used for decisions | Implementation |
| KE-AT-007 | Religious journal content enters AI prompt or analytics stream | Default exclusion blocks transmission | Security test |
| KE-AT-008 | Sponsor requests child progress or journal data | Sponsorship alone grants no access; only separately authorized minimal information may be shared | Implementation |
| KE-AT-009 | Foster caregiver or relative requests guardian-level control | Specific lawful authority and scope are verified; relationship alone is insufficient | Counsel + implementation |
| KE-AT-010 | Person with care/control but no established parental responsibility seeks broad consent permissions | Escalate for legal assessment; do not infer blanket consent authority | Counsel review |
| KE-AT-011 | Learner turns 18 | Default adult-control transition occurs, with separately verified court-order extension exception | Counsel + implementation |
| KE-AT-012 | Sensitive child data is routed to a foreign AI provider | Transfer is blocked pending section 48/49 and Regulations assessment, required consent and safeguards | Governance gate |
| KE-AT-013 | Cloud vendor adds a new subprocessor or support region | Vendor and transfer review is triggered before data flow begins | Operational test |
| KE-AT-014 | Processor detects a child-data breach | Processor-to-controller escalation supports statutory timelines and evidence preservation | Operational test |
| KE-AT-015 | Bible translation is cleared for display only | Offline, audio, AI, training and derivative uses remain disabled unless separately licensed | Rights/implementation |
| KE-AT-016 | Copyright Act consolidation is still marked not latest | Copyright legal gate remains open; no completed Kenya rights review is claimed | Design review |
| KE-AT-017 | Kenya Law legal text is proposed for bulk ingestion into a commercial AI corpus | Website terms and applicable licence are checked; scraping, bulk redistribution or training is not presumed permitted | Rights review |

