# Project Sentinel — Uganda Jurisdiction Legal Requirements Assessment

**Jurisdiction:** Republic of Uganda  
**Assessment stream:** Phase 00D — International Legal, Child Protection & Intellectual Property Governance  
**Status:** Preliminary desk assessment; not counsel-reviewed; not a compliance determination  
**Research date:** 8 November 2026  
**Application state:** Not deployed; no real learner/child data should be processed during this assessment  
**Branch:** `project-sentinel/phase-00d-international-governance`

## 1. Executive assessment

Uganda's Data Protection and Privacy Act 2019 (Chapter 97) establishes a comparatively direct child-data rule: personal data relating to a child must not be collected or processed unless prior consent is obtained from a parent, guardian or another person having authority to make decisions on the child's behalf, subject to specified legal, research and statistical exceptions. The Data Protection and Privacy Regulations 2021 add an express age-ascertainment system and a high-risk processing DPIA requirement.

Religious or philosophical beliefs are expressly included in the Act's special-personal-data restrictions. Processing may be possible where the information is freely given with the data subject's consent, or under a narrow non-profit association exception for a body with religious/philosophical purposes relating to members or people in regular contact. Grow In The Word must not assume that its Christian purpose or a future non-profit structure automatically satisfies that exception.

The Children Act (Chapter 62) defines a child as a person below 18. This child-welfare definition should not be confused with a product autonomy band or with the precise legal authority required for each processing purpose. The Act recognizes parental responsibility, child welfare and protective arrangements; caregiver status must be verified on its actual legal basis.

Uganda's current copyright position requires special attention: ULII identifies the Copyright and Neighbouring Rights Act, Chapter 222, as amended by the Copyright and Neighbouring Rights (Amendment) Act 2026 (Act 8 of 2026), effective 22 May 2026. The amendment includes new definitions and provisions affecting accessible formats, service providers, technological protection measures and fair use. This materially changes the need to check the latest text rather than rely on older summaries.

**Current jurisdiction status:** Research in progress. Uganda is not approved for launch. Local privacy, child-protection, online-safety and IP counsel review remains required.

## 2. Legal-source register and status

| Source | Relevant provisions / subject | Status located | Use |
|---|---|---|---|
| Data Protection and Privacy Act 2019, Chapter 97 | ss. 1–3, 6–9, 12–20, 29–30, 31–38 | ULII latest-version record dated 31 Dec 2023; Act commenced 3 May 2019 | Binding primary legislation |
| Data Protection and Privacy Regulations 2021, SI 21/2021 | regs. 11–12 and remaining processing, registration and transfer provisions | ULII and PDPO official PDF located; exact full current amendment status to be confirmed | Binding subsidiary legislation |
| Children Act, Chapter 62 | child definition, welfare, rights, parental responsibility, guardianship, care/protection | ULII consolidated copy as at 31 Dec 2023; verify any subsequent changes | Binding primary legislation |
| Copyright and Neighbouring Rights Act, Chapter 222 | economic rights, moral rights, limitations, performers, sound recordings, service-provider provisions | ULII identifies latest text as at 22 May 2026, incorporating Act 8/2026 | Binding primary legislation as amended |
| Computer Misuse Act 2011 and amendments; Uganda Communications Act; other child-protection/criminal laws | online abuse, harmful content, unlawful access, exploitation, reporting and service-provider obligations | Current consolidated texts and applicability require targeted counsel verification | Binding law; research gap |
| PDPO guidance, registers and notices | registration, age verification, DPIA, transfers, complaints | Official regulator materials to be collected and version-checked | Regulator guidance |

Primary references:
- Data Protection and Privacy Act (ULII latest-version record): https://ulii.org/en/akn/ug/act/2019/9/eng%402023-12-31
- Data Protection and Privacy Act (official ICT Ministry PDF): https://ict.go.ug/ims/public/site/documents/Data-Protection-and-Privacy-Act-2019.pdf
- Data Protection and Privacy Regulations 2021 (ULII): https://ulii.org/en/akn/ug/act/si/2021/21/eng%402021-03-12
- Data Protection and Privacy Regulations (PDPO PDF): https://pdpo.go.ug/media/2022/03/Data_Protection_and_Privacy_Regulations-2021.pdf
- Children Act, Chapter 62 (ULII consolidated PDF): https://media.ulii.org/media/legislation/111651/source_file/6ade21c8c38a1588/1996-6.pdf
- Copyright and Neighbouring Rights Act, Chapter 222, latest ULII record: https://ulii.org/en/akn/ug/act/2006/19/eng%402026-05-22
- PDPO: https://pdpo.go.ug/

## 3. Territorial scope and operator classification

Section 1 of the Data Protection and Privacy Act applies to a person, institution or public body collecting, processing, holding or using personal data within Uganda, and to an entity outside Uganda processing personal data relating to Ugandan citizens. The statutory wording should be checked against actual learner location, citizenship, controller establishment and processing operations; do not assume that hosting outside Uganda removes all Ugandan obligations.

The Act recognizes data collectors, controllers and processors. The operator will likely be a controller for learner accounts, progress, family relationships and product purposes it determines. Vendors may be processors or independent/joint controllers depending on actual purposes and contractual arrangements.

Section 29 establishes a Data Protection Register and provides for registration of persons, institutions or public bodies collecting or processing personal data. The current prescribed registration process, fees, renewal/change requirements and treatment of foreign operators must be confirmed with PDPO before any Uganda-facing personal-data processing.

**Proposed control:** make operator/controller/processor classification and PDPO registration a pre-production gate. Do not treat registration of one entity as automatically satisfying all processor or joint-controller duties.

## 4. Children, consent and legal authority

### 4.1 Child definition and data-protection authorization

Children Act section 2 defines a child as a person below 18 years. Data Protection and Privacy Act section 8 prohibits collecting or processing a child's personal data unless:
- prior consent is obtained from a parent or guardian or another person with authority to make decisions on behalf of the child;
- processing is necessary to comply with law; or
- processing is for research or statistical purposes.

The statute does not, in section 8 itself, create a universal digital-consent age below 18. Do not infer that a teenager can independently authorize all personal-data processing merely because the interface gives them greater account autonomy. Equally, do not infer that every adult who knows or cares for a child has legal authority to provide the statutory consent.

Regulation 11 of the 2021 Regulations requires controllers/processors to establish a system to ascertain the age of persons whose data is collected, processed or stored and, where the data relates to a child, a system for obtaining parent/legal-guardian consent where necessary.

### 4.2 Authority verification and child participation

The Act refers not only to a parent or guardian but also to another person having authority to make decisions on the child's behalf. That phrase must be mapped against the Children Act, court orders, guardianship, foster/alternative care and other applicable instruments. It is not permission to rely on an unverified relationship, title or self-declaration.

**Proposed controls:**
- Separate identity verification from legal-authority verification.
- Record authority type, scope, source, evidence, verifier, validity period, expiry, revocation and dispute state.
- Obtain legal advice for kinship, foster, institutional and other alternative-care scenarios.
- Provide child-friendly explanations and meaningful opportunities for the child to express views; obtain child assent where appropriate even where legal consent is supplied by an authorized adult.
- Do not use the 3–7, 8–13, 14–17 and 18+ product experience bands as a substitute for legal status.

### 4.3 Best interests and welfare

The Children Act sets child welfare and protection principles. The product must apply those principles to learning design, data collection, family access, moderation and AI features. The app must not exploit vulnerability, shame a child for missed religious activity, or use spiritual performance as a score of worth.

The Regulations require a DPIA before high-risk processing. Regulation 12 requires a systematic description of the processing and purposes, assessment of risks and measures to address them. Child profiles, sensitive religious reflections, family dashboards, AI coaching, behavioral analytics and institutional access should be treated as high-risk design candidates pending the PDPO's current published list and counsel advice.

## 5. Sensitive personal data and Christian-purpose boundary

Section 9 prohibits collection or processing of special personal data, including religious or philosophical beliefs, subject to specified exceptions. Relevant exceptions include:
- information freely given with the consent of the data subject; and
- legitimate activities of a non-profit body or association established for political, philosophical, religious or trade-union purposes, where the processing relates to members or persons in regular contact with it in connection with its purposes and does not involve third-party disclosure without the data subject's consent.

The exception is conditional. A Christian app is not necessarily itself a qualifying non-profit body or association. The operator's legal form, user relationship, disclosure model and whether the information is truly freely given require local advice. The child-data rule in section 8 must also be assessed independently; the sensitive-data exception should not be treated as a shortcut around child authorization.

**Proposed controls:**
- No inferred religion field based on Scripture reading, prayer, search or engagement.
- Transparent Christian purpose and no compelled declaration of faith merely to access public, non-personalized learning content.
- Treat prayers, faith reflections, spiritual struggles and private journal entries as sensitive/high-risk content.
- Keep reflection bodies out of analytics, sponsor reporting, institutional dashboards, family projections and AI prompts by default.
- Review any sensitive-data use purpose by purpose and document statutory ground, consent, recipient, retention, security and transfer basis.

## 6. Privacy, retention, security and cross-border processing

The Act's principles in section 3 require accountability, fair/lawful processing, adequacy and non-excessiveness, retention limitation, data quality, transparency/participation and security safeguards. Sections 10–18 address privacy, direct collection, specified purposes, notice, minimality, quality, compatible further processing and retention/deletion.

Section 19 regulates processing personal data outside Uganda. A controller or processor based in Uganda that processes or stores personal data outside Uganda must ensure the destination has adequate measures at least equivalent to the Act or obtain the data subject's consent. The precise application to a foreign operator, remote access, subprocessors and onward transfers must be assessed with counsel; the text should not be simplified into a blanket permission to transfer on consent alone without reviewing all duties.

**Proposed controls:**
- Map hosting, database, backups, identity, AI, analytics, support access and all subprocessors by country.
- Complete transfer assessment and written vendor terms before cross-border data use.
- Minimize data and establish deletion/retention schedules by purpose.
- Encrypt data in transit and at rest; apply least privilege, audit logging and incident response.
- Confirm PDPO breach reporting deadlines and current procedures from the complete Act/regulations and regulator guidance before production.

## 7. AI, profiling and automated decisions

The reviewed Act contains general principles and data-subject rights, but a complete current legal analysis of automated decision-making, profiling and AI-specific duties remains open. The project should not assume the absence of a dedicated AI chapter means unrestricted automated profiling.

**Proposed baseline controls:**
- No AI decision on legal capacity, guardian authority, safeguarding credibility, spiritual worth or eligibility for essential rights.
- No child journal or belief data in model training by default.
- Minimize identifiers sent to AI providers; review retention, training, location and subprocessors.
- Provide age-appropriate transparency and human review for consequential recommendations or decisions.
- Verify all Scripture citations against approved sources; AI is not represented as divine authority.

## 8. Online safety and child safeguarding

The Children Act provides the core child welfare/protection framework. Uganda's Computer Misuse Act 2011 and amendments, communications legislation and criminal laws may apply to harmful online conduct, unlawful access, exploitation, child sexual abuse material and service-provider handling. However, the present desk search has not yet completed a provision-by-provision current review of those instruments, the current amendment status, mandatory reporting, takedown and evidence-preservation duties, or whether Grow In The Word's particular functionality makes it a regulated intermediary/service provider.

The Copyright and Neighbouring Rights Act 2026 amendment introduces/updates service-provider-related terminology and technological-protection provisions, but this must not be mistaken for a complete online-safety regime.

**Operational controls required before child-facing launch:**
- No open adult-to-child direct messaging by default.
- Child-safe reporting, block/mute and escalation routes.
- Documented grooming, exploitation, abuse, self-harm and imminent-harm triage.
- Trained safeguarding owner, response time targets, referral map and evidence-preservation procedure.
- Age-appropriate community rules and moderation; no public child profiles by default.
- Counsel to identify mandatory reporting, law-enforcement cooperation, content removal and data disclosure requirements for each product feature.

## 9. Copyright, Bible translations and content rights

The latest ULII record located identifies the Copyright and Neighbouring Rights Act, Chapter 222, as amended by the Copyright and Neighbouring Rights (Amendment) Act 2026 (Act 8 of 2026), with the amendment effective 22 May 2026. The amended Act includes definitions for derivative works, reproduction (including electronic storage), publication/making available, service providers, performers and sound recordings. It also addresses economic rights, moral rights, limitations/fair use, technological protection measures and neighbouring rights.

The 2026 amendment adds or changes provisions relevant to accessible formats and fair use, including educational use and online learning contexts. Those provisions must be read narrowly and in full. They do not establish a blanket licence to reproduce an entire commercial Bible translation or publisher database in a commercial app. Any educational limitation depends on statutory wording, qualifying user/institution, purpose, amount, acknowledgement, fair practice and other conditions.

Rights clearance must separately cover:
- underlying biblical text and each translation/edition;
- notes, introductions, cross-references and editorial content;
- commentaries, devotionals and study materials;
- audio readings, music, performances and sound recordings;
- artwork, photography, maps, video and film;
- API terms, databases, caching and offline distribution;
- AI input, retrieval, embeddings, training and generated derivatives.

A display licence does not imply offline, audio, adaptation, commercial, institutional, AI or sublicensing rights. For each item record owner, edition, territory, acts permitted, limits, attribution, commercial status, offline/cache, audio, adaptation, AI permissions, term, expiry and takedown. Check whether a rights holder's technological protection measure or terms prohibit particular uses.

## 10. Proposed Uganda-specific product requirements

| ID | Requirement | Proposed response | Priority |
|---|---|---|---|
| UG-01 | Under-18 child definition | Jurisdiction-specific child status; no global age shortcut | Critical |
| UG-02 | Section 8 parent/guardian/authorized-person consent | Purpose-specific authorization gate and evidence | Critical |
| UG-03 | Regulation 11 age ascertainment | Proportionate age-assurance system | Critical |
| UG-04 | Section 9 sensitive religious data restriction | Determine valid ground; no inferred belief; reflection isolation | Critical |
| UG-05 | Religious non-profit exception is conditional | Verify operator form, user relationship and disclosure scope with counsel | Critical |
| UG-06 | High-risk DPIA under Regulation 12 | Complete before child/sensitive/high-risk processing | Critical |
| UG-07 | Section 29 data-protection registration | Confirm and complete PDPO registration before processing | Critical |
| UG-08 | Section 19 overseas processing | Map destinations, adequacy and consent/other requirements | Critical |
| UG-09 | Child welfare and alternative-care authority | Evidence-based scoped Care & Access Pathway | High |
| UG-10 | Online safeguarding duties not fully mapped | Complete Computer Misuse/communications/child-protection legal review and operational playbook | Critical |
| UG-11 | 2026 copyright amendment | Use current amended Act; do not rely on pre-2026 summaries | Critical |
| UG-12 | Educational/fair-use exceptions are conditional | Counsel-approved use-by-use licence analysis | Critical |
| UG-13 | AI and automated decision review incomplete | Human review, no sensitive profiling, provider assessment | High |

## 11. Proposed Uganda acceptance tests

| ID | Scenario | Expected result |
|---|---|---|
| UG-AT-001 | Ugandan learner under 18 creates a personalized account | Child-data status is detected and personal-data processing is blocked until valid section 8 authorization or a documented statutory exception is established |
| UG-AT-002 | Adult verifies identity but cannot prove parent/guardian/decision-making authority | No child authorization or guardian permissions are granted |
| UG-AT-003 | A caregiver claims to be an authorized person | Authority is assessed against Ugandan law and evidence; relationship or title alone is insufficient |
| UG-AT-004 | Age is unknown or contradictory | Personalized child-data processing remains blocked pending proportionate resolution |
| UG-AT-005 | Child profile or family dashboard is activated without DPIA where high-risk | Activation is blocked |
| UG-AT-006 | Product stores religion inferred from Bible engagement | Inference and persistence are prohibited |
| UG-AT-007 | Prayer/reflection text is sent to analytics or AI | Default data-boundary control blocks transmission |
| UG-AT-008 | Operator relies on religious non-profit exception | Counsel evidence confirms qualifying entity, user relationship, purpose and disclosure limitations before activation |
| UG-AT-009 | Uganda learner data is stored or accessed outside Uganda | Destination adequacy and section 19 conditions are assessed and recorded before transfer |
| UG-AT-010 | Vendor adds a new foreign subprocessor | Transfer, security and contract review occurs before data flow |
| UG-AT-011 | Learner reports grooming or abuse | Child-safe reporting, safeguarding triage and jurisdiction-reviewed escalation operate; no promise of absolute secrecy |
| UG-AT-012 | Adult user attempts unsolicited private contact with child | Contact is blocked by default and reported/escalated under policy |
| UG-AT-013 | Commercial translation is selected for offline use | Offline use remains disabled unless the licence expressly permits it in Uganda |
| UG-AT-014 | Content team relies on 2026 educational fair-use provision for whole-Bible distribution | Use is blocked pending full statutory analysis and IP counsel approval |
| UG-AT-015 | Audio Bible recording is licensed but underlying text or performer rights are not | Distribution is blocked until all applicable rights layers are cleared |
| UG-AT-016 | AI model is proposed for training on child learning/reflection data | Training is disabled absent separate legal, contractual, safeguarding and product approval |
| UG-AT-017 | Current copyright or online-safety amendments are unverified | Relevant feature/market gate remains open; no compliance claim is made |

## 12. Legal questions requiring Ugandan counsel

1. Confirm current consolidated versions and commencement/amendment status of the Data Protection and Privacy Act, 2021 Regulations, Children Act, Computer Misuse Act, communications and criminal laws.
2. Confirm the territorial reach of section 1 for non-Ugandan learners located in Uganda, foreign operators and processing by foreign vendors.
3. Confirm mandatory PDPO registration, foreign-controller requirements, processor registration, renewal and notification obligations.
4. Confirm the legal interpretation of "another person having authority to make decisions on behalf of the child" for kinship, foster, institutional and alternative-care situations.
5. Confirm how section 8 authorization interacts with general lawful grounds and the section 9 special-data exceptions for children.
6. Determine whether the operator could qualify as a religious non-profit body/association under section 9(3), and which learners count as members or persons in regular contact.
7. Confirm current breach notification deadlines, regulator process and affected-person notification requirements.
8. Confirm cross-border transfer requirements for cloud hosting, AI, support access, backups and onward transfers under section 19 and current regulations.
9. Identify mandatory reporting, takedown, preservation and escalation duties for child sexual exploitation, grooming, abuse and other harmful content; assess service-provider status.
10. Confirm whether the 2026 copyright amendment creates any relevant notice-and-takedown or intermediary obligations for the app's actual functionality.
11. Obtain item-level copyright advice for Bible translations, audio, commentary, educational exceptions, offline access, commercial distribution and AI uses.
12. Confirm applicable consumer, advertising, payment, education and faith-based institutional rules.

## 13. Unresolved dependencies and defects

- **PS-01 / identity:** production identity and verified authority workflows remain absent.
- **PS-02 / journal:** no real encryption/storage evidence; do not collect real child reflections.
- **PS-06 / access boundaries:** no demonstrated server-side resource authorization.
- **PS-07 / rights:** item-level translation and media licences remain unverified.
- **PS-08 / AI:** provider data flows and model behavior remain unverified.
- **PS-11 / jurisdiction:** Uganda legal applicability and local counsel review remain open.
- **PS-12 / rights:** current rights registry and permission matrix remain open.
- **PS-13 / safeguarding:** mandatory reporting and online incident operations require local mapping.
- **PS-14 / transfers:** actual provider locations and onward transfers remain unknown.
- **UG-OPEN-01:** full current PDPO registration and breach procedure not yet independently confirmed.
- **UG-OPEN-02:** current online safety/Computer Misuse Act amendment and service-provider applicability analysis incomplete.
- **UG-OPEN-03:** operational interpretation of 2026 copyright amendments requires Ugandan IP counsel.

## 14. Uganda assessment disposition

**Status: Research in progress — not counsel reviewed — not launch approved.**

The statutory baseline is sufficiently clear to establish product design gates for child authorization, age ascertainment, sensitive religious data, DPIA, registration and overseas processing. Online safety and the practical scope of the 2026 copyright amendments remain material open work. No application source, UI, infrastructure, database schema or Phase 00C architecture was changed.
