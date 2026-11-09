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



## 16. Uganda-specific acceptance tests

Proposed only; not executed.

| ID | Test / scenario | Expected result | Stage |
|---|---|---|---|
| UG-AT-001 | Ugandan learner under 18 creates personalized account | Section 8 authorization or documented statutory exception is established before child personal-data processing | Implementation |
| UG-AT-002 | Adult verifies identity but not legal authority | No guardian permission or consent status is granted | Implementation |
| UG-AT-003 | Caregiver claims to be an authorized decision-maker | Authority is assessed against Ugandan law and evidence; relationship/title alone is insufficient | Counsel + implementation |
| UG-AT-004 | Age is unknown or contradictory | Personalized child-data processing remains blocked pending proportionate resolution | Implementation |
| UG-AT-005 | High-risk child/sensitive feature is activated without Regulation 12 DPIA | Activation is blocked | Governance gate |
| UG-AT-006 | App stores religion inferred from Bible engagement | Inference and persistence are prohibited | Implementation |
| UG-AT-007 | Prayer/reflection enters analytics or AI | Default data-boundary control blocks transmission | Security test |
| UG-AT-008 | Operator relies on religious non-profit exception | Counsel confirms qualifying entity, user relationship, purpose and disclosure limits | Counsel review |
| UG-AT-009 | Uganda learner data is processed/stored abroad | Section 19 destination adequacy and consent/other conditions are assessed before transfer | Counsel + implementation |
| UG-AT-010 | Vendor adds foreign subprocessor | Transfer, security and contract review occurs before data flow | Operational |
| UG-AT-011 | Child reports grooming or abuse | Child-safe report, safeguarding triage and local escalation operate | Operational |
| UG-AT-012 | Adult attempts unsolicited private contact with child | Contact is blocked by default and escalated under policy | Security test |
| UG-AT-013 | Commercial translation is selected for offline use | Offline use remains disabled unless expressly licensed for Uganda | Rights test |
| UG-AT-014 | Educational fair-use exception is relied on for whole-Bible distribution | Use remains blocked pending full statutory analysis and IP counsel approval | Counsel review |
| UG-AT-015 | Audio recording is licensed but text/performer rights are not | Distribution is blocked until all rights layers are cleared | Rights test |
| UG-AT-016 | AI model training on child learning/reflection data is proposed | Training remains disabled absent separate legal, contractual and safeguarding approval | Governance gate |
| UG-AT-017 | Current copyright or online-safety amendments are unverified | Relevant feature/market gate remains open | Design review |

## 17. Tanzania-specific acceptance tests

Proposed only; not executed.

| ID | Test / scenario | Expected result | Stage |
|---|---|---|---|
| TZ-AT-001 | Mainland Tanzania learner creates personalized account | Applicable PDPA and child-welfare requirements are evaluated before processing | Implementation |
| TZ-AT-002 | Zanzibar learner uses a non-Union subject feature | Zanzibar-specific law review is required; Mainland-only rule is not silently assumed | Counsel review |
| TZ-AT-003 | Union/non-Union classification is unclear | Affected processing remains blocked pending legal classification | Governance gate |
| TZ-AT-004 | Any personal data relating to a child is collected | The statutory sensitive-data definition is applied; section 30 written consent/representative requirements and any applicable exception are validated before processing | Counsel + implementation |
| TZ-AT-005 | Parent consents to account but not optional AI/reflection processing | Optional purposes remain disabled | Implementation |
| TZ-AT-006 | Caregiver claims authority without evidence | No guardian-level permission or consent status is granted | Implementation |
| TZ-AT-007 | Operator has not completed PDPC registration | Personal-data collection/processing is blocked | Governance gate |
| TZ-AT-008 | Vendor proposes foreign storage or AI processing | Applicable cross-border route, permit, safeguards and contracts are confirmed before transfer | Governance gate |
| TZ-AT-009 | Current 2023 Regulations and amendment status is unclear | Gazette/PDPC reconciliation and counsel validation required before rules are finalized | Counsel review |
| TZ-AT-010 | Child-data DPIA is incomplete | Child profile, sensitive reflection and AI features remain blocked under project baseline | Governance gate |
| TZ-AT-011 | Child reports grooming or abuse | Child-safe reporting and Mainland/Zanzibar escalation procedure operates | Operational |
| TZ-AT-012 | App enables adult-to-child direct messaging | Fails unless separately justified, safeguarded and approved | Security test |
| TZ-AT-013 | Translation is licensed for Mainland only | Content is withheld from Zanzibar until separate territorial rights are cleared | Rights test |
| TZ-AT-014 | App caches translation offline | Offline reproduction is disabled unless licence expressly authorizes it | Rights test |
| TZ-AT-015 | AI uses translation/commentary as prompt context | AI-input and derivative permissions are verified separately from display rights | Rights test |
| TZ-AT-016 | Audio recording is made available | Underlying text, performer, producer and sound-recording rights are all cleared | Rights test |
| TZ-AT-017 | Sponsor requests private journal | Access denied by default; sponsor/institution status creates no guardian authority | Security test |

## 18. Rwanda-specific acceptance tests

Proposed only; not executed.

| ID | Test / scenario | Expected result | Stage |
|---|---|---|---|
| RW-AT-001 | Known learner under 16 creates personalized account | Article 9 parental-responsibility consent and child-interest condition are satisfied before processing | Implementation |
| RW-AT-002 | Learner is 16 or 17 | Child safeguards remain; under-16 consent rule is not misrepresented as complete capacity rule | Design + counsel |
| RW-AT-003 | Adult claims parental responsibility without evidence | No authorization or guardian permissions are granted | Implementation |
| RW-AT-004 | Parent consent conflicts with identified child interests | Processing is not activated until best-interests issue is resolved | Governance gate |
| RW-AT-005 | Religious reflection is collected | Article 10 ground and Article 11 safeguards are documented before collection | Governance gate |
| RW-AT-006 | App infers religion from Bible engagement | Inference is prohibited and not persisted | Implementation |
| RW-AT-007 | Controller or processor has not registered | Personal-data processing remains blocked | Governance gate |
| RW-AT-008 | No DPO is designated | Governance gate fails pending designation | Governance gate |
| RW-AT-009 | Data is stored in foreign cloud region | Storage blocked unless valid certificate authorizes foreign storage under Article 50 | Governance gate |
| RW-AT-010 | Data is transferred to foreign AI provider | Article 48 route, safeguards, authorization/consent and Article 49 written contract are verified | Governance gate |
| RW-AT-011 | Foreign support engineer seeks learner-record access | Transfer/access characterization and required authorization confirmed before access | Counsel + security |
| RW-AT-012 | Retention purpose ends | Data securely destroyed unless documented Article 52 ground permits retention | Implementation |
| RW-AT-013 | AI makes consequential learner decision | Applicable automated-decision rights, notice and human review are provided | Implementation |
| RW-AT-014 | Child reports abuse or grooming | Child-safe reporting and Rwanda-specific escalation operate | Operational |
| RW-AT-015 | Adult initiates private contact with child | Contact blocked by default unless separately approved and safeguarded | Security test |
| RW-AT-016 | Translation licensed for display only | Offline, audio, adaptation, AI and commercial uses remain disabled unless separately licensed | Rights test |
| RW-AT-017 | IP Law 31/2009 amendment status is unverified | Copyright gate remains open; no Rwanda distribution clearance is claimed | Design review |



## 19. East African comparative governance acceptance tests

Proposed design/governance tests; not implemented or executed. The detailed acceptance evidence and expected outcomes are in `EAST_AFRICAN_COMPARATIVE_LEGAL_REQUIREMENTS_AND_JURISDICTION_DIFFERENCES_MATRIX.md`.

| ID | Test / review | Expected result | Stage |
|---|---|---|---|
| EA-COMP-001 | Country assessments and source versions are traceable | All four country profiles remain linked and versioned | Design review |
| EA-COMP-002 | Regional baseline is compared with local rules | No local rule is erased by regional generalization | Counsel + design |
| EA-COMP-003 | Tanzania territory is resolved | Mainland and Zanzibar non-Union rules can be distinguished | Counsel + design |
| EA-COMP-004 | Rwanda age thresholds are separated | Under-16 Art. 9 consent trigger is not treated as adulthood; under-18 child protections remain | Counsel + design |
| EA-COMP-005 | Kenya/Uganda child-data consent is correctly represented | Product autonomy cannot replace legally required authorization | Counsel + design |
| EA-COMP-006 | Tanzania child-data sensitivity is represented | Child-related data is classified under PDPA sensitive-data definition | Counsel + design |
| EA-COMP-007 | Religious-belief processing is purpose-limited | No inferred belief; separate ground, authorization and safeguards | Design + security |
| EA-COMP-008 | Caregiver authority is scoped | Authority evidence, scope, expiry and revocation are required | Design review |
| EA-COMP-009 | Child assent and legal authorization are distinct | Assent never substitutes for statutory authorization | Design review |
| EA-COMP-010 | DPIA/best-interests gates precede high-risk child processing | Documented approvals and residual-risk disposition exist | Governance gate |
| EA-COMP-011 | Registration requirements are resolved per entity/market | Regulator evidence or counsel-approved non-applicability | Counsel review |
| EA-COMP-012 | Vendor and remote access map is complete | Every processor, subprocessor and access location is inventoried | Security review |
| EA-COMP-013 | Transfer mechanisms are country-specific | Each destination and transfer route has approval | Counsel + design |
| EA-COMP-014 | Rwanda foreign storage is independently authorized | Valid Art. 50 certificate is evidenced where required | Counsel review |
| EA-COMP-015 | Breach response has local deadlines | Country-specific notification decision tree and contacts exist | Operational |
| EA-COMP-016 | AI use is separately assessed | Model purpose, training, transfers and child safeguards are documented | Governance gate |
| EA-COMP-017 | Consequential automated decisions receive human review | No prohibited AI-only decisions; audit trail exists | Design + security |
| EA-COMP-018 | Online safeguarding is locally operationalized | Referral/reporting SOPs and trained owners exist for each market | Operational |
| EA-COMP-019 | Copyright rights are item- and territory-specific | Rights registry and counsel review cover every distributed item | Rights review |
| EA-COMP-020 | Offline/AI permissions are distinct | Display rights are not treated as offline or AI rights | Rights review |
| EA-COMP-021 | Private reflections remain restricted | Parent, sponsor, analytics and AI access is denied by default | Security test |
| EA-COMP-022 | Public learning fallback is separate | Non-personalized use creates no persistent learner record | Architecture test |
| EA-COMP-023 | Policy decisions are explainable | Rule IDs, source versions, evidence and reasons are recorded | Design review |
| EA-COMP-024 | Legal change control is connected to tests | Each material legal change triggers impact assessment | Governance review |
| EA-COMP-025 | Desk research cannot approve launch | Launch requires counsel, technical and operational evidence | Governance gate |

## 14. Jurisdiction catalogue and policy-decision specification acceptance

The detailed 50-vector policy suite is maintained in `PHASE_00D_POLICY_TEST_VECTORS.md`. The catalogue and decision contract are maintained in `PHASE_00D_JURISDICTION_RULE_CATALOGUE.md` and `PHASE_00D_POLICY_DECISION_SPECIFICATION.md`.

| ID | Review / acceptance test | Expected result | Stage |
|---|---|---|---|
| PDS-001 | Validate required rule-record fields | Every rule has ID, class, jurisdiction, territory, source/status, applicability, decision effect, tests, owner and review date | Design review |
| PDS-002 | Inspect rule classification | LAW, REG, BASELINE, OPEN, OPS and IP remain distinct; no product baseline is described as legislation | Design review |
| PDS-003 | Inspect source status and commencement | Unverified, superseded or uncertain source cannot be marked approved | Source review |
| PDS-004 | Inspect Tanzania territory representation | Mainland and Zanzibar non-Union questions remain separately represented; no silent inheritance | Design review |
| PDS-005 | Inspect Rwanda age semantics | Under-16 Art.9 consent trigger remains distinct from under-18 child-protection baseline | Design review |
| PDS-006 | Inspect age and authority facts | Unknown age/authority cannot be treated as adult/authorized | Design review |
| PDS-007 | Inspect purpose separation | Profile, AI, voice, analytics, sharing, sponsorship and model training are independently evaluated | Design review |
| PDS-008 | Inspect sensitive belief handling | Belief/reflection data is not inferred or downgraded; default AI/analytics exclusion is explicit | Design review |
| PDS-009 | Inspect provider gates | Transfer and storage authorization are separately evaluated, including Rwanda Art.50 | Design review |
| PDS-010 | Inspect content rights rules | Licence is checked by work, edition, territory, medium, purpose and technical use | Design review |
| PDS-011 | Inspect decision precedence | DENY dominates; otherwise HOLD dominates; controls are enforceable; unknown is not permissive | Design review |
| PDS-012 | Inspect audit response | Decision records identify policy version and rule IDs without storing journal text or raw identity documents | Design review |
| PDS-013 | Inspect exception lifecycle | Exception has named approver, scope, rationale, expiry, compensating controls and review evidence | Design review |
| PDS-014 | Inspect future enforcement boundary | Decisions are enforced server-side; UI-only permission checks are rejected | Architecture review |
| PDS-015 | Trace all catalogue rules to tests | Every rule maps to one or more test IDs and evidence requirements | Traceability review |
| PDS-016 | Inspect OPEN rule outcomes | OPEN/SUSPENDED rules cannot produce ALLOW | Design review |
| PDS-017 | Inspect prohibited inputs | Spiritual maturity, XP, engagement and inferred religion cannot influence legal permission | Architecture review |
| PDS-018 | Inspect approval state | No rule becomes implementation-eligible before source validation, owner approval and required counsel review | Governance review |
| PDS-019 | Execute policy vectors in a future synthetic test harness | All 50 vectors pass against approved policy version; not a current-phase runtime test | Future implementation |
| PDS-020 | Reconcile Phase 00C contracts | Specification adds no conflicting identity, authorization, consent or data-boundary assumptions | Architecture review |

**Current status:** Defined as draft documentation only. PDS-001–PDS-020 have not been independently reviewed or executed. The policy vectors are proposed test cases, not passed results.
