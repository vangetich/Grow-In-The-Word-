# Project Sentinel — Rwanda Jurisdiction Legal Requirements Assessment

**Jurisdiction:** Republic of Rwanda  
**Assessment stream:** Phase 00D — International Legal, Child Protection & Intellectual Property Governance  
**Status:** Preliminary desk assessment; not counsel-reviewed; not a compliance determination  
**Research date:** 8 November 2026  
**Application state:** Not deployed; no real learner/child data should be processed during this assessment  
**Branch:** `project-sentinel/phase-00d-international-governance`

## 1. Executive assessment

Rwanda's Law No. 058/2021 of 13 October 2021 relating to the Protection of Personal Data and Privacy establishes a strong and operationally specific framework. Article 9 requires consent from a holder of parental responsibility when a controller, processor or third party knows that the data belongs to a child under 16. Consent given on the child's behalf is acceptable only if it is in the child's interests, subject to other laws; consent is not required where processing is necessary to protect the child's vital interests.

This creates a notable distinction from Kenya and Uganda: Rwanda's child-data provision uses an under-16 threshold, while Rwanda's child-protection law defines a child more broadly as a person under 18. Therefore, users aged 16–17 remain children for safeguarding and child-rights purposes even though Article 9's specific parental-consent trigger is drafted for children under 16. The general consent, capacity, sensitive-data, child welfare and other legal requirements still apply; the app must not interpret age 16 as a general adult status.

Rwanda treats religious or philosophical beliefs as sensitive personal data. The law requires a valid ground under Article 10 and safeguards under Article 11. Registration is required for controllers and processors. Rwanda's transfer and storage rules are especially significant: Article 48 regulates sharing/transfers outside Rwanda; Article 49 requires written transfer contracts; Article 50 requires storage in Rwanda unless the controller/processor holds a valid registration certificate authorizing storage outside Rwanda. The architecture must not assume that a foreign cloud region is available without prior legal and regulatory approval.

**Current jurisdiction status:** Research in progress. Rwanda is not approved for launch. Local privacy, child-protection, online-safety and IP counsel review remains required.

## 2. Legal-source register and status

| Source | Relevant provisions / subject | Status located | Use |
|---|---|---|---|
| Law No. 058/2021 of 13 Oct 2021, Protection of Personal Data and Privacy | arts. 2–11, 17–26, 29–30, 37–50, 52 and enforcement provisions | Official Gazette Special of 15 Oct 2021; official DPO site explains implementation | Binding primary legislation |
| DPO official guidance/FAQs | child consent, registration, DPO, sensitive data, transfers/storage, data-subject rights | Official supervisory-authority materials | Regulator guidance |
| Law No. 71/2018 of 31 Aug 2018 relating to the Protection of the Child | child definition, best interests, child rights, family/alternative care and protection | Official Gazette no. 37 bis of 10 Sep 2018 | Binding primary legislation |
| Law No. 31/2009 of 26 Oct 2009 on the Protection of Intellectual Property | copyright, neighbouring rights, licences and exceptions | Official law listed by RURA; current amendments/consolidation require verification | Binding primary legislation, current text validation outstanding |
| Law No. 24/2016 governing ICT; cybercrime legislation and related orders | online service, electronic communications, cyber offences and platform obligations | RURA legal register; exact current provisions and amendments need review | Binding framework; legal mapping incomplete |
| Rwanda Child Online Protection Policy | child online safety and policy commitments | Official RURA listing; confirm current version and implementation status | Policy, not automatically binding legislation |

Primary references:
- Official Gazette, Law 058/2021: https://dpo.gov.rw/fileadmin/DPO/Law_relating_to_the_protection_of_personal_data_and_privacy.pdf
- DPO, processing and quality: https://dpo.gov.rw/dpp-law/processing-and-quality-of-personal-data
- DPO, transfer/storage/retention: https://dpo.gov.rw/dpp-law/sharing-transferstorage-and-retention-of-personal-data
- DPO, controller/processor obligations: https://dpo.gov.rw/dpp-law/obligations-of-the-data-controller-and-the-data-processor
- DPO FAQs: https://dpo.gov.rw/faqs
- Child Protection Law 71/2018: https://www.minijust.gov.rw/fileadmin/user_upload/Minijust/Publications/Laws/Law.Protection_of_child_2018.pdf
- RURA ICT laws and policies register: https://www.rura.rw/sectors/ict/regulatory-instruments/policies-laws-and-orders

## 3. Territorial scope and operator classification

Law 058/2021 applies to processing within its territorial scope, including relevant controllers/processors established in Rwanda and specified processing involving data subjects in Rwanda. The exact extraterritorial triggers and any special cases must be confirmed against Article 2 and counsel advice for the intended business structure and data flows.

Article 29 requires a person intending to be a data controller or processor to register with the supervisory authority. The DPO's FAQ confirms that controllers and processors must register. The FAQ also states that a data protection officer must be designated under Article 40. The operator's entity type, controller/processor roles, foreign establishment and any representative requirements must be confirmed before production.

**Proposed control:** register the relevant controller and processor roles with the supervisory authority before processing. Designate an accountable DPO, maintain the processing inventory, and record certificate scope, expiry, renewal and any approved foreign-storage status.

## 4. Children, age and parental responsibility

### 4.1 Two different age thresholds

Article 9 of Law 058/2021 specifically addresses personal data belonging to a child under 16. Where the controller, processor or third party knows the data belongs to a child under 16, it must obtain consent from a holder of parental responsibility in accordance with relevant laws. The consent is acceptable only if it is given in the child's interests, subject to other laws. Consent is not required where processing is necessary to protect the child's vital interests.

Law 71/2018 relating to the Protection of the Child defines a child as a person under 18. Consequently:
- under 16: Article 9 parental-responsibility consent is triggered for known child data, subject to the stated exceptions;
- ages 16–17: the person remains a child for child-protection purposes, but Article 9's under-16 parental-consent rule is not the specific trigger; general data-protection consent/capacity rules, sensitive-data rules, child-rights safeguards and any other relevant law still apply;
- 18 and over: adult rules apply, subject to any specific lawful representation or incapacity provisions.

This is not a legal conclusion that a 16- or 17-year-old has unrestricted capacity to consent to every processing operation. Local counsel must interpret the interaction between the Data Protection Law, child law, civil capacity and any sector-specific legislation.

### 4.2 Best interests, parental responsibility and child participation

Article 9 expressly requires consent given on behalf of a child to be in the child's interests. Law 71/2018 supplies the wider child-protection framework. The product must not reduce the best-interests assessment to a checkbox or assume a parent/guardian's preference always resolves the child's privacy interests.

**Proposed controls:**
- Separate child assent/participation from legally valid consent.
- Verify the holder of parental responsibility and the scope of authority.
- Hear the child's views in age-appropriate ways and avoid undue influence.
- Preserve the Phase 00C Care & Access Pathway for guardians, foster/kinship care and institutional arrangements, subject to Rwanda-specific legal validation.
- Do not allow a school, church, sponsor, relative or mentor to obtain broad access solely from a relationship or job title.
- Treat 16–17-year-olds as minors for child-safeguarding UX even where Article 9's specific under-16 consent rule does not apply.

## 5. Sensitive religious data and safeguards

The law defines sensitive personal data to include information revealing religious or philosophical beliefs, among other categories. Article 10 establishes the permitted grounds for processing sensitive personal data, including data-subject consent, legal obligations/rights, vital interests, certain health purposes, and specified public-interest archiving/research/statistical purposes. Article 11 establishes safeguards.

The product must not assume that a Christian educational purpose alone authorizes sensitive-data processing. A non-profit or religious purpose does not automatically remove the need to identify a valid Article 10 ground and meet Article 11 safeguards.

**Proposed controls:**
- Treat prayer entries, private reflections, spiritual struggles and belief disclosures as sensitive data.
- No inferred religion field from reading, prayer, search or engagement.
- No private journal content in analytics, AI prompts, model training, sponsor reports, institution reports or family projections by default.
- Use purpose-specific, informed, withdrawable consent where consent is the applicable ground.
- Ensure notices are understandable in an official language the person understands; Rwanda DPO guidance says consent statements and notices must be understandable and clear.
- Review whether any legal obligation, vital-interest or other Article 10 ground actually applies before processing without consent.

## 6. Registration, DPIA, DPO and processing obligations

Article 29 requires controller and processor registration. Article 40 requires designation of a DPO. Articles 37–38 set processing principles and controller/processor duties, including lawful/fair/transparent processing, purpose limitation, minimization, accuracy, retention limitation, rights handling and notices.

The law's DPIA provisions appear in Article 38 and related provisions; exact triggers, supervisory-authority consultation and documentation must be checked in the complete law and current DPO guidance. The DPO FAQ lists a DPIA register and processing documentation among expected compliance artefacts. Given the app's child, sensitive religious, family, AI and profiling features, a DPIA is required as a project gate before activation even while the precise statutory threshold is verified.

**Proposed controls:**
- Complete controller/processor registration and designate a DPO.
- Maintain processing inventory, privacy notices, consent/withdrawal records, DPIA register, supplier contracts, retention schedule and breach register.
- Ensure data-subject rights handling covers access, rectification, restriction, objection, erasure, portability and automated-decision rights where applicable.
- Provide information about profiling/automated decision-making, logic, significance and likely consequences.
- Maintain written processor agreements, security measures and audit rights.

## 7. Data storage, international transfers and retention

Rwanda has a particularly important data-residency rule:
- Article 48 regulates sharing or transfer of personal data outside Rwanda. It provides multiple routes, including supervisory-authority authorization after proof of safeguards, data-subject consent and specified necessity grounds.
- Article 49 requires a written contract with a person authorized to access, share or transfer personal data outside Rwanda, setting out respective roles and responsibilities. The supervisory authority may prohibit or suspend a transfer to protect data-subject rights.
- Article 50 requires controllers/processors to store personal data in Rwanda. Storage outside Rwanda is permitted only if the controller/processor holds a valid registration certificate authorizing foreign storage.
- Article 52 limits retention to the period necessary for the purpose, subject to listed grounds for longer retention, and requires secure destruction at the end of the retention period.

The DPO's official FAQ repeats that foreign storage requires a valid authorization/registration certificate and that transfer outside Rwanda requires authorization and compliance with Article 48/49. The app must not interpret consent alone as permission to store all learner data abroad; Article 50 is a separate storage requirement.

**Proposed control:** Rwanda must be treated as a local-storage approval gate. No production hosting, backup, AI, analytics, support or foreign administrative access may begin until the operator has confirmed with the supervisory authority and counsel the required registration certificate, transfer route, contract, safeguards and scope. Determine whether remote access from outside Rwanda itself constitutes a regulated transfer or access requiring authorization.

## 8. AI, profiling and automated decisions

Articles 21 and related provisions address the data subject's right not to be subject to certain decisions based solely on automated processing. Article 38 requires relevant transparency, including information about automated decision-making/profiling, logic, significance and consequences. The precise statutory conditions and exceptions need full counsel review.

**Proposed controls:**
- Do not use AI to determine legal capacity, guardian status, safeguarding credibility, spiritual worth or access to essential rights.
- Provide human review and a way to challenge consequential learner assessments.
- Do not infer religion or emotional vulnerability from devotional activity.
- Do not use private child reflections for model training by default.
- Assess AI provider storage location and transfer requirements before any prompt contains personal data.

## 9. Online safety and child safeguarding

Law 71/2018 is the core child-protection law identified in this review. RURA's official ICT legal register lists the Law governing Information and Communication Technologies No. 24/2016 and Rwanda's Child Online Protection Policy. The policy is important for risk assessment but must not be represented as an Act or binding regulation without confirming its legal status.

The current desk review has not completed a provision-by-provision analysis of all cybercrime, ICT, communications, child sexual exploitation, harmful-content, reporting and intermediary obligations. This is a material open legal task.

**Operational controls before launch:**
- No open adult-to-child direct messaging by default.
- Child-friendly report/block/mute functions.
- Trained safeguarding lead and documented triage/escalation.
- Local referral contacts and emergency pathways.
- Evidence preservation and controlled access to reports.
- Age-appropriate community rules and moderation.
- No promise of absolute secrecy where a lawful safeguarding escalation is necessary.
- Counsel to confirm mandatory reporting, takedown, disclosure and cooperation requirements.

## 10. Copyright and Bible/content rights

RURA's official ICT legal register lists Law No. 31/2009 of 26 October 2009 on the Protection of Intellectual Property. The current consolidated text, amendments, regulations, implementing practice and any treaty changes must be obtained from the competent official source and checked by Rwandan IP counsel before distribution.

The rights analysis must cover economic and moral rights in literary/artistic works, translations/adaptations, reproduction, distribution, communication/making available, performances, sound recordings, audiovisual works, databases and any collective-management requirements. Do not assume that an older 2009 text is current or complete merely because it remains listed on a regulator's page.

The rights registry must separately clear:
- biblical source text and each translation/edition;
- editorial notes, introductions, commentaries and study guides;
- audio Scripture readings, music, performers and sound recordings;
- artwork, photography, maps, illustrations and video;
- third-party APIs and database terms;
- offline caching, local downloads and synchronization;
- AI input, retrieval, embeddings, model training and generated derivatives.

A display licence does not imply offline, audio, adaptation, commercial, institutional, AI or sublicensing rights. Record owner, edition, territory, acts permitted, quotation limits, attribution, term, expiry, AI permissions and takedown requirements. Verify public-domain status by jurisdiction and rights layer.

## 11. Proposed Rwanda-specific product requirements

| ID | Requirement | Proposed response | Priority |
|---|---|---|---|
| RW-01 | Under-16 child data requires holder of parental responsibility consent under Art. 9 | Specific parental-responsibility authorization gate | Critical |
| RW-02 | Ages 16–17 remain children under child-protection law | Preserve child safeguards; do not treat 16 as adult status | Critical |
| RW-03 | Consent on behalf of child must be in child's interests | Record best-interests assessment and child participation | Critical |
| RW-04 | Religious beliefs are sensitive personal data | Article 10 ground and Article 11 safeguards before processing | Critical |
| RW-05 | Controller and processor registration required | Register relevant entities and designate DPO | Critical |
| RW-06 | Article 50 Rwanda storage rule | Local-storage authorization gate before foreign storage | Critical |
| RW-07 | Articles 48–49 regulate transfers and written contracts | Transfer authorization/safeguards/contract gate | Critical |
| RW-08 | Retention and secure destruction | Purpose-based schedule and verifiable deletion | High |
| RW-09 | Profiling and automated-decision rights | Transparent AI, human review and challenge route | High |
| RW-10 | Child online-safety policy and ICT laws | Complete legal mapping and operational safeguarding | Critical |
| RW-11 | IP Law 31/2009 current status incomplete | Obtain current text/amendments and counsel opinion | Critical |
| RW-12 | AI and foreign providers may trigger storage/transfer rules | No child personal data to foreign AI without approved route | Critical |

## 12. Proposed Rwanda acceptance tests

| ID | Scenario | Expected result |
|---|---|---|
| RW-AT-001 | Known learner under 16 creates a personalized account | Article 9 parental-responsibility consent and child-interest condition are satisfied before personal-data processing |
| RW-AT-002 | Learner is 16 or 17 | Child-protection safeguards remain; Article 9 under-16 trigger is not misrepresented as the complete capacity rule |
| RW-AT-003 | Adult claims parental responsibility without evidence | No parental authorization status or guardian permissions are granted |
| RW-AT-004 | Parent consent is contrary to identified child interests | Processing is not activated until best-interests issue is resolved |
| RW-AT-005 | Religious reflection is collected | Article 10 ground and Article 11 safeguards are documented before collection |
| RW-AT-006 | App infers religion from Bible engagement | Inference is prohibited and not persisted |
| RW-AT-007 | Controller or processor has not registered | Personal-data processing remains blocked |
| RW-AT-008 | No DPO is designated | Governance gate fails pending designation |
| RW-AT-009 | Data is stored in a foreign cloud region | Storage remains blocked unless valid certificate authorizes foreign storage under Article 50 |
| RW-AT-010 | Data is transferred to a foreign AI provider | Article 48 route, safeguards, authorization/consent as applicable and Article 49 written contract are verified |
| RW-AT-011 | Foreign support engineer seeks access to learner records | Access/transfer characterization and authorization are confirmed before access |
| RW-AT-012 | Retention purpose ends | Data is securely destroyed unless a documented Article 52 ground permits retention |
| RW-AT-013 | AI makes consequential learner decision | Applicable automated-decision rights, notice and human review are provided |
| RW-AT-014 | Child reports abuse or grooming | Child-safe reporting and Rwanda-specific safeguarding escalation operate |
| RW-AT-015 | Adult initiates private contact with child | Contact is blocked by default unless separately approved and safeguarded |
| RW-AT-016 | Bible translation is licensed for display only | Offline, audio, adaptation, AI and commercial uses remain disabled unless separately licensed |
| RW-AT-017 | IP Law 31/2009 amendment status is not verified | Copyright gate remains open; no Rwanda distribution clearance is claimed |

## 13. Legal questions requiring Rwandan counsel

1. Confirm Article 2 territorial scope for the proposed foreign operator, foreign vendors, Rwandan residents and data subjects located in Rwanda.
2. Confirm the current child-protection law and the definition of child under Law 71/2018, including any later amendments.
3. Confirm the interaction of Article 9's under-16 parental-responsibility consent with general consent, civil capacity and child law for ages 16–17.
4. Confirm evidence of parental responsibility, court guardianship, foster/kinship care, institutional care and any other lawful representative authority.
5. Confirm the precise Article 10 grounds and Article 11 safeguards for religious-belief data, prayer entries and spiritual reflections involving children.
6. Confirm controller/processor registration, DPO, foreign entity representation, certificate duration/renewal and scope.
7. Confirm DPIA thresholds, required format, supervisory consultation and whether any child/sensitive processing requires prior authorization.
8. Confirm Article 48 transfer routes, Article 49 contract terms and whether consent alone suffices for any specific transfer.
9. Confirm Article 50 local storage requirements, foreign-storage certificate process, cloud backups, disaster recovery and remote foreign support access.
10. Confirm breach notification deadlines and data-subject communication duties.
11. Confirm all current ICT, cybercrime, child online-protection, mandatory-reporting, takedown and intermediary obligations.
12. Obtain current consolidated Law 31/2009 and amendments, and confirm copyright protection/limitations, Bible translation rights, offline, audio, commercial and AI uses.
13. Confirm consumer, subscription, advertising, payment and education-sector rules.

## 14. Unresolved dependencies and defects

- **PS-01 / identity:** no verified production identity and parental-responsibility workflow.
- **PS-02 / journal:** no real encryption/storage evidence; no real child reflections.
- **PS-06 / access:** server-side resource authorization not demonstrated.
- **PS-07 / rights:** Bible translation and media permissions remain unverified.
- **PS-08 / AI:** actual AI provider, prompts, retention and data locations unverified.
- **PS-11 / jurisdiction:** Rwanda legal applicability and local counsel review remain open.
- **PS-12 / rights:** current consolidated IP law and item-level rights matrix incomplete.
- **PS-13 / safeguarding:** local mandatory reporting and online safety procedures not evidenced.
- **PS-14 / transfers:** foreign hosting, AI, support and backup flows unknown.
- **RW-OPEN-01:** foreign storage and transfer approval path requires written DPO/counsel confirmation.
- **RW-OPEN-02:** current child online-safety and mandatory reporting law mapping incomplete.
- **RW-OPEN-03:** current IP Law 31/2009 amendment/consolidation and licence analysis incomplete.

## 15. Rwanda assessment disposition

**Status: Research in progress — not counsel reviewed — not launch approved.**

Rwanda presents a distinct design constraint: under-16 parental-responsibility consent for known child data, while under-18 child protection continues; sensitive religious data requires a valid Article 10 ground and safeguards; controller/processor registration and DPO designation are required; and foreign storage is restricted by Article 50 unless authorized by a valid certificate. These requirements make provider/location selection a legal gate. No application source, UI, infrastructure, database schema or Phase 00C architecture was changed.
