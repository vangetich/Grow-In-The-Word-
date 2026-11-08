# Project Sentinel — Kenya Jurisdiction Legal Requirements Assessment

**Jurisdiction:** Republic of Kenya  
**Assessment stream:** Phase 00D — International Legal, Child Protection & Intellectual Property Governance  
**Status:** Preliminary desk assessment; not counsel-reviewed; not a compliance determination  
**Research date:** 8 November 2026  
**Application state:** Not deployed; no real learner/child data should be processed during this assessment  
**Branch:** `project-sentinel/phase-00d-international-governance`

## 1. Executive assessment

Kenya provides a useful first reference jurisdiction because the core child-data, privacy and copyright frameworks are identifiable in primary legislation and current regulator guidance. The strongest immediate design implications for Grow In The Word are:

1. A child is a person under 18 under the Children Act 2022. For personal-data processing relating to a child, Data Protection Act section 33 requires parental or guardian consent, processing that protects and advances the child's rights and best interests, and appropriate age-verification and consent mechanisms.
2. The ODPC's 2025 Guidance Notes for Processing Children's Data interpret the child-data requirements in detail. They emphasize prior best-interests assessment, verifiable parent/guardian consent, proportionate verification of authority, privacy-preserving age assurance, child-friendly safeguards and DPIA.
3. The Data Protection (General) Regulations expressly identify processing of personal data relating to children or vulnerable groups, sensitive personal data, certain profiling and other operations as high-risk DPIA cases. A DPIA is therefore a pre-processing gate for the relevant planned child-data features, not a post-launch paperwork exercise.
4. Religious beliefs are expressly treated as sensitive personal data in the ODPC's 2025 children's-data guidance and registration materials. The product must not infer a child's religious identity from Bible reading, prayer activity, search history or engagement. The narrow sensitive-data ground for certain religious/philosophical non-profit bodies must not be presumed to apply to this app or operator.
5. Kenya's cross-border transfer rules require a documented assessment of safeguards and transfer conditions. Sensitive personal data exported from Kenya attracts additional statutory safeguards and consent requirements. Actual cloud, AI, analytics, backup and support locations must be mapped before production data use.
6. Kenya's copyright framework gives rights holders control over reproduction, translation/adaptation, distribution and making available/communication of protected works. The consolidated Copyright Act text retrieved for this assessment is expressly marked as not the latest available version; the copyright analysis is therefore provisional until the current consolidated law and any later amendments are checked.
7. The Children Act recognizes a child's privacy and reasonable parental/legal-guardian supervision. This does not support a simplistic assumption that a guardian should have unrestricted access to every private reflection. Product access must be scoped, proportionate and assessed against the child's rights and applicable authority.

**Current jurisdiction status:** Research in progress. Kenya is not approved for launch. Local privacy, child-protection and IP counsel review remains required.

## 2. Legal-source register and status

| Source | Relevant provisions / subject | Source status for this assessment | Use |
|---|---|---|---|
| Data Protection Act 2019, Cap. 411C | ss. 2–4, 18, 25–26, 28–33, 35–40, 43–49, 50 | Kenya Law consolidated text marked legislation as at 31 Dec 2022; re-check live current version and amendments before reliance | Binding primary legislation |
| Data Protection (General) Regulations 2021, L.N. 263 | regs. 19, 22–28, 37, 41–50 | Kenya Law copy is legislation as at 31 Dec 2022; re-check current version | Binding subsidiary legislation |
| Data Protection (Registration of Data Controllers and Data Processors) Regulations 2021, L.N. 265 | regs. 4 and 13; Third Schedule | Official ODPC publication and regulator FAQ located; exact current consolidated text and any amendments to be checked | Binding subsidiary legislation; ODPC interpretation |
| ODPC Guidance Notes for Processing Children's Data (2025) | best interests, lawful basis and parental consent, verification, age assurance, sensitive data, DPIA, registration | Official ODPC guidance note dated 2025 | Regulator guidance; not an Act of Parliament |
| Children Act 2022, No. 29 | ss. 2, 8–15, 27–28, 31–35; Parts X–XII and alternative care provisions | Official Gazette supplement copy located; verify subsequent amendments/rules | Binding primary legislation |
| Copyright Act, Cap. 130 | ss. 22A–22D, 23–26, 28–33, Second Schedule | Retrieved Kenya Law consolidated text says legislation as at 22 Apr 2022 and expressly warns it is not the latest version | Binding primary legislation, but current text verification outstanding |
| Copyright (Amendment) Act 2022, No. 14 | amendment to principal Act | Official Gazette copy located; already reflected in 22 Apr 2022 consolidated text | Binding amendment |
| Constitution of Kenya 2010 | Arts. 31, 53 | Official text and ODPC guidance should be checked in full legal review | Constitutional rights framework |

Primary references:
- Data Protection Act: https://new.kenyalaw.org/akn/ke/act/2019/24/eng%402022-12-31/source
- Data Protection (General) Regulations: https://new.kenyalaw.org/akn/ke/act/ln/2021/263/eng%402022-12-31/source
- ODPC Children's Data Guidance 2025: https://www.odpc.go.ke/wp-content/uploads/2025/11/ODPC-%E2%80%93-Guidance-Note-for-Processing-Childrens-Data.pdf
- ODPC Data Protection Laws: https://www.odpc.go.ke/data-protection-laws-kenya/
- ODPC registration FAQs: https://www.odpc.go.ke/faqs/
- ODPC registration guidance: https://www.odpc.go.ke/wp-content/uploads/2024/02/ODPC-Guidance-Note-on-Registration-of-Data-Controllers-and-Data-Processors.pdf
- Children Act 2022: https://www.kenyalaw.org/kl/fileadmin/pdfdownloads/Acts/2022/TheChildrenAct_2022.pdf
- Copyright Act live record: https://new.kenyalaw.org/akn/ke/act/2001/12/eng%402022-04-22/source
- Copyright (Amendment) Act 2022: https://www.kenyalaw.org/kl/fileadmin/pdfdownloads/Acts/2022/TheCopyright_Amendment_Act_2022.pdf

## 3. Territorial scope and operator classification

### 3.1 Territorial scope

Data Protection Act section 4 applies to processing by a controller or processor established or ordinarily resident in Kenya and to processing by a controller or processor not established or ordinarily resident in Kenya where it processes personal data of data subjects located in Kenya. The Act therefore requires a territorial analysis; incorporation or hosting outside Kenya does not by itself remove Kenyan data-protection obligations for Kenyan-located data subjects.

### 3.2 Controller, processor and joint-controller mapping

The product owner/operator is likely to determine the purposes and essential means of learner-account, learning-progress, family, reflection and AI features and may therefore be a controller for those operations. Cloud, identity, analytics, AI and communications vendors may act as processors, independent controllers or joint controllers depending on actual contracts and decisions. Do not classify a provider solely by its marketing label.

### 3.3 Registration with ODPC

Data Protection Act section 18 and the Registration Regulations establish registration requirements subject to prescribed exemptions. ODPC's published FAQs state that provision of education and faith-based/religious institutions are categories not exempt from mandatory registration, regardless of the small-entity threshold. The operator's exact legal form and activities are not yet established. Counsel must confirm whether the app operator is classified under one or both categories and which registrations are required for the operator and any processor role. Do not assume that a small or pre-revenue project is automatically exempt.

**Proposed control:** make legal-entity classification and ODPC registration assessment a pre-production gate. Record controller/processor roles, registration number, scope, expiry/renewal and change-notification obligations where applicable.

## 4. Children, age and parental/guardian authorization

### 4.1 Child definition

Children Act 2022 section 2 defines a child as an individual who has not attained 18 years. ODPC's 2025 guidance treats the age of consent for processing a child's personal data as 18 and explains that verifiable informed parental or guardian consent is required under section 33.

### 4.2 Data Protection Act section 33

Section 33 provides that a controller or processor shall not process personal data relating to a child unless:
- consent is given by the child's parent or guardian; and
- processing protects and advances the rights and best interests of the child.

It also requires appropriate age-verification and consent mechanisms, selected with regard to available technology, processing volume, the proportion of data likely to relate to children, the possibility of harm and other factors specified by the Commissioner.

The section contains a specific exception for a controller or processor that exclusively provides counselling or child-protection services to a child. Grow In The Word is a biblical learning and spiritual-formation app, not a service that should assume it qualifies for this exception.

### 4.3 Lawful basis and parental authorization are separate checks

ODPC's 2025 guidance distinguishes the general lawful basis under section 30 from the additional parental/guardian consent safeguard under section 33. The product must not treat a parent's click as a universal lawful basis for every purpose, nor treat a general lawful basis as a substitute for the child-specific authorization requirement.

For every purpose, document:
- the Article/section 30 lawful basis;
- whether section 33 parental/guardian consent applies;
- the exact purpose and data categories covered;
- notice supplied to parent/guardian and child;
- verification of the person's authority;
- date, method, version and evidence of authorization;
- withdrawal and resulting processing consequences.

Consent must be specific, informed, freely given and demonstrable. Do not bundle optional AI, analytics, public sharing, sponsorship reports or marketing into essential account consent.

### 4.4 Age assurance

ODPC guidance calls for proportionate, privacy-preserving and data-minimizing age verification. It describes possible methods such as age declaration, age gates, identity documents or secure third-party checks, with greater certainty where processing risk is higher. These are examples, not a mandate to collect identity documents in every case.

**Proposed control:** adopt a risk-tiered age-assurance design. Prefer the least intrusive method capable of reliably supporting the decision. Do not retain raw identity documents where a verified decision token or evidence record is sufficient. Assess false acceptance, false rejection, accessibility, data leakage and appeal paths.

### 4.5 Parent/guardian authority verification

ODPC guidance says authority must be verified proportionately and in line with data minimization. It lists examples including signed forms, email verification, identity documents, third-party services and electronic signatures. The method must establish the authority relevant to the processing purpose, not merely the adult's identity.

**Proposed control:** distinguish identity verification from legal authority verification. Record the authority type, scope, evidence source, reviewer, effective period, expiry/revocation and dispute status. Do not automatically grant guardian permissions to relatives, sponsors, teachers, church leaders or institutional staff.

### 4.6 Evolving capacity and child participation

The ODPC guidance says the best-interests assessment should recognize the child's evolving capacity to form views. Children Act sections 28(3)–(4) provide for the child's views to be heard and given due weight according to age and maturity, voluntarily and without undue influence. This supports age-appropriate explanation, participation and product autonomy, but does not displace the specific section 33 parental/guardian consent requirements.

**Architecture distinction:** a teenager may receive a personal login and greater product agency under an approved policy while the required legal authorization for personal-data processing remains in place. Do not interpret a 14–17 experience band as independent legal consent capacity.

## 5. Best interests, privacy and family access

### 5.1 Best interests and DPIA

Children Act section 8 and Constitution Article 53(2) make the child's best interests paramount in matters concerning the child. ODPC's 2025 guidance calls for understanding the child's rights, identifying and assessing impacts, prioritizing mitigations and conducting a DPIA before processing children's data.

Data Protection Act section 31 requires a DPIA before processing where an operation is likely to result in high risk. General Regulations regulation 49 specifically includes processing sensitive personal data or data relating to children or vulnerable groups among high-risk processing operations requiring a DPIA before processing.

**Proposed control:** a child-data DPIA is a mandatory pre-activation gate for child profiles, progress tracking, family dashboards, private reflections, AI features, analytics, sponsorship and institutional access. Assess each distinct purpose and data flow, not only the app as a whole. Where a DPIA indicates high residual risk, section 31 requires prior consultation with the Data Commissioner; confirm submission timing and procedure with counsel and ODPC.

### 5.2 Child privacy and reasonable supervision

Children Act section 27 prohibits arbitrary or unlawful interference with a child's privacy, family/private affairs or correspondence. It also recognizes reasonable parental or legal-guardian supervision. Section 27(3) directs child personal-data processing to the Data Protection Act.

This provision does not itself define a product's detailed parent-dashboard permissions or settle every journal-access question. The product should avoid assuming either that parents have unrestricted technical access to all child content or that all parental supervision is prohibited.

**Proposed control:** guardian views should be purpose-limited (for example, agreed learning milestones or safety settings) and transparent to the learner. Private journal bodies should remain excluded by default. Any access exception requires a separately documented legal basis, necessity, safeguarding rationale, proportionality, notice where safe and lawful, and access logging.

### 5.3 Care, guardianship and alternative arrangements

Children Act Part III addresses parental responsibility, including equal parental responsibility of parents and transmission of responsibility in specified circumstances. Part X addresses guardianship, including appointment by court, testamentary and customary guardianship. The Act also recognizes foster care and alternative family care arrangements.

Section 31(4) provides that a person without parental responsibility but with care and control may, subject to the Act, do what is reasonable in the circumstances to safeguard or promote the child's welfare. That provision should not be treated as a blanket grant of authority to consent to all data processing or to access all learner records.

Where both parents are deceased, section 34 sets out a sequence of persons who may exercise parental responsibility, including testamentary or court-appointed guardians, a person with a relevant residence order, a fit person appointed by the Court, and in specified absence of those persons a relative or other fit person on alternative family-based care placement. This reinforces the need to assess the actual legal basis and evidence in orphan/alternative-care cases rather than applying a simple relationship field.

**Proposed control:** maintain separate authority pathways and scope permissions by documented legal status. For institutional representatives, require the institution's lawful mandate and specific learner assignment; do not infer guardian authority from employment. A sponsor does not acquire parental responsibility by funding access.

### 5.4 Transition at 18 and exceptions

Children Act section 35 allows parental responsibility to be extended beyond the eighteenth birthday by court order where special welfare circumstances exist, including specified special needs arising from severe disability or developmental disorder. This is an important exception to a simple age-18 rule.

**Proposed control:** at 18, default to adult-controlled account and permissions, but support a separately verified court-ordered extension or other lawful arrangement. Former guardian access must not persist merely because the account was historically family-managed. The system must not assume all parental responsibility ends in every case at 18, nor that it continues automatically.

## 6. Religious beliefs and sensitive personal data

ODPC's 2025 children's-data guidance expressly lists religious beliefs among sensitive personal data of children. ODPC registration materials also identify religious, philosophical, conscience and belief data as sensitive categories.

The Data Protection Act section 45(1)(a) provides a specific ground for certain legitimate activities with safeguards by a foundation, association or other non-profit body with a political, philosophical, religious or trade-union aim. The provision is conditional: processing must relate solely to members or persons in regular contact with the body in connection with its purposes, and personal data must not be disclosed outside the body without the data subject's consent.

Do not assume this exception applies merely because the app has a Christian purpose. The operator's legal form, relationship with users, processing context and intended disclosures are unknown. Even if the operator is a qualifying non-profit religious body, the statutory conditions and children's-data rules require legal analysis.

**Proposed controls:**
- Do not create an inferred religious-identity field from reading, prayer, attendance, searches or engagement.
- Keep product purpose transparent: this is a Christian biblical learning app.
- Do not require a declaration of Christian identity merely to view public, non-personalized content unless a specific lawful reason is established.
- Treat prayer entries, faith reflections, spiritual struggles and belief-related journal material as high-sensitivity data.
- Exclude private reflection bodies from analytics, sponsor reports, institution reports, family projections and AI context by default.
- Do not use religious activity to rank, reward, punish, profile or target a child.
- Assess any use of sensitive data separately for lawful basis, section 33 consent, section 45 ground, security, retention and cross-border transfer.

## 7. AI, profiling and automated decisions

Data Protection Act section 35 gives a data subject rights in relation to decisions based solely on automated processing, including profiling, that produce legal effects or significantly affect them. General Regulations regulation 22 adds transparency, meaningful information about logic, fairness, anti-bias measures, the ability to oppose profiling (including marketing profiling), and human intervention/ability to express a point of view.

This does not mean every adaptive content recommendation is automatically a significant automated decision. The actual effect and context must be assessed. Nevertheless, the app's AI coach and adaptive learning features require a documented assessment of profiling, inferred traits, decision impact, explainability, error correction and human review.

**Proposed controls:**
- AI must not determine legal capacity, guardian status, safeguarding credibility, spiritual worth or access to essential rights.
- Do not use religious reflections or inferred belief to determine learning eligibility, pricing, sponsor access or institutional decisions.
- Explain the role of AI in recommendations and learner analytics in age-appropriate language.
- Provide human review for consequential decisions and a way to challenge inaccurate learner records.
- No child data or private journal content is used for model training by default.
- Complete provider, processor, retention, subprocessor, location and contractual reviews before AI data is transmitted.

## 8. Registration, processors, security and breach response

### 8.1 ODPC registration

ODPC's published registration FAQs identify education and faith-based/religious institutions as categories not exempt from mandatory registration under the small-entity exemption. They also state that processing personal data about persons located in Kenya can require registration even where the controller/processor is not established in Kenya.

**Open legal question:** determine the operator's legal form, actual functions and controller/processor roles. Obtain counsel's confirmation of required registrations and whether any third-party processor has its own registration obligation.

### 8.2 Processor contracts and subprocessors

General Regulations regulations 24–25 require written controller-processor terms covering subject matter, duration, nature/purpose, data types, data-subject categories, controller rights/instructions, confidentiality, security, deletion/return and audit/inspection provisions. Processor engagement of third parties requires prior controller authorization and appropriate contracts.

**Proposed control:** no production integration with cloud, identity, analytics, email, AI, storage or support vendors until role classification, contract, subprocessor chain, data locations, deletion and security commitments are documented.

### 8.3 Breach response

Data Protection Act section 43 includes a 72-hour notification requirement to the Data Commissioner where the statutory risk threshold is met, and a processor must notify the controller without delay and, where reasonably practicable, within 48 hours. Exact triggering conditions, affected-person communications and exceptions must be reflected in the incident plan and verified by counsel.

**Proposed control:** create a child-data incident playbook with triage, containment, evidence preservation, risk assessment, regulator/guardian communications, child-safe notices, escalation and post-incident review.

## 9. International transfers and data residency

Data Protection Act sections 48–49 and General Regulations Part VII regulate transfers outside Kenya. The Act provides transfer routes subject to appropriate safeguards, specified necessity grounds and additional conditions. Section 49 requires consent and confirmation of appropriate safeguards for transfer of sensitive personal data out of Kenya. General Regulations regulations 42–48 elaborate safeguards, adequacy, necessity, consent, subsequent transfers and written transfer agreements.

General Regulations regulation 26 specifies local server/serving-copy requirements for defined strategic-interest processing, including certain early childhood and basic education processing under the Basic Education Act. Whether Grow In The Word's intended service falls within this category is a specific legal classification question; do not assume that all learning apps automatically fall within the same category, or that no localization rule can apply.

**Proposed control:** create a data-location map for production, backups, disaster recovery, support access, identity, telemetry, analytics, AI and subprocessors. Do not choose Cloud Run, Cloud SQL, Firestore or any provider region until transfer, residency, contractual and security requirements have been assessed. Cloud hosting outside Kenya is not automatically prohibited, but neither is it automatically cleared.

## 10. Copyright and Scripture content — preliminary assessment only

### 10.1 Current-version limitation

The Kenya Law Copyright Act record retrieved here is explicitly labelled legislation as at 22 April 2022 and warns that it is not the latest available version. Although it includes the Copyright (Amendment) Act 2022, this is not sufficient for final legal reliance in November 2026. A current consolidated Act and subsequent amendments/regulations must be obtained and checked before this section is closed.

### 10.2 Rights requiring clearance

The Copyright Act's section 26 (in the retrieved 2022 text) identifies exclusive rights including reproduction, translation/adaptation, public distribution, communication to the public and making a work available. Section 28 separately addresses sound recordings. Section 33 provides for assignment and licensing and recognizes that licences may be limited to particular acts, periods or territories.

For Grow In The Word, rights must be separated for:
- underlying biblical source text;
- each modern Bible translation and edition;
- translation editorial material, introductions, notes and cross-references;
- commentaries, devotionals and study guides;
- recorded Scripture readings and performances;
- music and sound recordings;
- artwork, photography, maps and illustrations;
- videos, films and broadcasts;
- API-delivered content and provider database terms;
- user-uploaded content and community contributions;
- AI-generated materials that may reproduce or adapt protected source content.

A licence to display a translation does not automatically grant rights to store offline, stream audio, reproduce at scale, translate, adapt, commercialize, provide to institutions, use as AI input, train models, create embeddings or generate derivative content. Each use must be checked against the actual licence and applicable law.

### 10.3 Rights registry controls

For each item record owner, title/edition, source, licence evidence, territory, audience, permitted acts, quotation limits, attribution, commercial use, offline/cache use, audio, adaptation, AI input, model training, generated derivatives, sublicensing, term, expiry and takedown requirements.

Unverified, disputed, expired or territory-incompatible content must be withheld from the affected use. Public-domain status must be checked by territory, edition and rights layer.

### 10.4 Kenya Law source-use note

Kenya Law's current website terms state restrictions on automated scraping, bulk extraction, commercial redistribution and AI/model training without an express licensing agreement, while raw legal documents may be made available under stated non-commercial reuse terms. The app must not assume that a public legal website can be scraped, mirrored or used for commercial AI retrieval/training without checking its applicable terms and licence. Prefer linking to official sources or separately licensed legal data.

## 11. Proposed Kenya-specific product requirements

| ID | Requirement | Proposed product/architecture response | Priority |
|---|---|---|---|
| KE-01 | Treat under-18 users as children for Kenya child-data rules | Jurisdiction profile and age policy; do not hardcode global age thresholds | Critical |
| KE-02 | Section 33 parental/guardian consent and best-interests conditions | Purpose-specific consent/authorization record and processing gate | Critical |
| KE-03 | Appropriate age-verification and consent mechanisms | Risk-tiered, proportionate, privacy-preserving age assurance | Critical |
| KE-04 | Verify legal authority, not only adult identity | Authority type, evidence, scope, reviewer, expiry and revocation | Critical |
| KE-05 | Prior DPIA for high-risk child/sensitive processing | DPIA gate before activating affected processing | Critical |
| KE-06 | Religious beliefs are sensitive child data | No inferred belief; restricted processing and separate purpose review | Critical |
| KE-07 | Child privacy and reasonable supervision both matter | Scoped transparent guardian views; journal body excluded by default | High |
| KE-08 | Alternative-care authority is fact-specific | Care pathway with legal evidence and no automatic relative/institution privileges | High |
| KE-09 | Court may extend parental responsibility beyond 18 in special cases | Adult transition with documented court-order exception | High |
| KE-10 | ODPC registration may be mandatory for education/religious categories | Operator classification and registration gate before production processing | Critical |
| KE-11 | Processor and subprocessor contracts required | Vendor due diligence and written processing terms | Critical |
| KE-12 | Cross-border transfers require statutory safeguards | End-to-end location and transfer assessment before production data | Critical |
| KE-13 | Sensitive data export has additional conditions | Sensitive-data transfer gate and counsel approval | Critical |
| KE-14 | Breach notification timelines apply | Incident response plan and vendor notification SLAs | Critical |
| KE-15 | AI/profiling transparency, challenge and human review may apply | Consequence-based AI assessment and human review | High |
| KE-16 | Copyright permissions are act-, territory- and term-specific | Item-level Scripture/media rights registry and runtime use restrictions | Critical |
| KE-17 | Current Copyright Act text not yet verified | Obtain current consolidated text and counsel review before licensing clearance | Critical |

## 12. Acceptance tests to add

| ID | Scenario | Expected result |
|---|---|---|
| KE-AT-001 | Kenyan learner under 18 attempts account creation | Child-data workflow identifies child status and blocks personal-data processing until required section 33 authorization and best-interests controls are satisfied |
| KE-AT-002 | Adult verifies email but has no verified parent/guardian authority | No child guardian permissions or consent status is granted |
| KE-AT-003 | Guardian consents to account but not optional AI or analytics | Essential authorized processing remains distinct; optional purposes remain disabled |
| KE-AT-004 | Age assurance proposes collecting national ID for low-risk access | Necessity/proportionality review rejects unnecessary collection and assesses a less intrusive method |
| KE-AT-005 | Child-data feature is activated without completed DPIA | Activation is blocked |
| KE-AT-006 | AI derives a religion label from Scripture engagement | Inference is prohibited, not persisted and not used for decisions |
| KE-AT-007 | Religious journal content enters AI prompt or analytics stream | Default exclusion blocks transmission |
| KE-AT-008 | Sponsor requests child progress or journal data | No access from sponsorship status alone; only separately authorized minimal information may be shared |
| KE-AT-009 | Foster caregiver or relative requests guardian-level control | Specific lawful authority and scope are verified; relationship alone is insufficient |
| KE-AT-010 | A person with care/control but no established parental responsibility seeks consent permissions | Escalate for legal assessment; do not infer blanket consent authority from section 31(4) |
| KE-AT-011 | Learner turns 18 | Default adult control transition occurs, with separately verified court-order extension exception |
| KE-AT-012 | Sensitive child data is routed to a foreign AI provider | Transfer is blocked pending section 48/49 and Regulations assessment, required consent and appropriate safeguards |
| KE-AT-013 | Cloud vendor adds a new subprocessor or support region | Vendor and transfer review is triggered before data flow begins |
| KE-AT-014 | Child data breach is detected by processor | Processor-to-controller escalation supports statutory timeline and evidence preservation |
| KE-AT-015 | Bible translation is cleared for display only | Offline, audio, AI, training and derivative uses remain disabled unless separately licensed |
| KE-AT-016 | Copyright Act consolidation is still marked not latest | Copyright legal gate remains open; no claim of completed Kenya rights review |
| KE-AT-017 | Kenya Law legal text is proposed for bulk ingestion into a commercial AI corpus | Website terms/licence are checked; scraping, bulk redistribution or training is not presumed permitted |

## 13. Legal questions requiring Kenyan counsel

1. Confirm the current consolidated status of the Data Protection Act, Children Act, General Regulations, Registration Regulations, Copyright Act and relevant subsidiary legislation as at intended launch.
2. Determine the correct controller/processor/joint-controller classification for the app operator, parent/guardian accounts, institutional sponsors and each third-party provider.
3. Confirm ODPC registration obligations for the operator's legal entity and activities, including whether the education and faith-based categories apply and whether any exemptions are available.
4. Confirm the correct interaction between section 30 lawful basis, section 33 parental/guardian consent and section 45 sensitive-data grounds for each processing purpose.
5. Confirm what evidence is sufficient to verify parents, guardians, testamentary/court-appointed guardians, customary guardians, foster/kinship caregivers and institutional representatives in different factual circumstances.
6. Confirm how child assent, evolving capacity and parent/guardian rights should be handled for older teenagers and private reflections.
7. Confirm section 35 adult-transition handling, including court-ordered extension of parental responsibility.
8. Determine whether the app's intended learning service falls within any localization requirement in General Regulations regulation 26 or other education-sector rules.
9. Confirm cross-border transfer pathways, adequacy/safeguard evidence, ODPC filings and consent requirements, especially for sensitive belief/reflection data and AI processing.
10. Confirm breach notification triggers and child/guardian communication requirements for each incident type.
11. Confirm whether any online safety, consumer protection, advertising, payments, education-sector or child-protection laws impose additional obligations on the app.
12. Obtain a current copyright-law opinion covering Bible translations, publisher/API licences, fair dealing, quotation, digital display, offline use, audio, commercial distribution and AI uses.
13. Confirm the legal basis and permissible handling of disclosures of abuse, self-harm or imminent harm in an educational/spiritual application, including when confidentiality may need to be limited and which reporting duties apply.

## 14. Unresolved dependencies and defects

- **PS-01 / identity:** no verified production identity and account lifecycle; no child account onboarding until authorization controls exist.
- **PS-02 / journal:** no real encryption or secure storage evidence; do not collect real child journal content.
- **PS-06 / parent-child boundary:** no demonstrated server-side resource authorization; parent and institution access must remain untrusted until implemented and tested.
- **PS-07 / Scripture provenance:** current translation licences and permitted use matrix remain unverified; no translation may be assumed cleared for AI or offline use.
- **PS-08 / AI:** active production AI use and provider data flows remain unverified; no child data should be sent to models.
- **PS-10 / runtime assurance:** no build, test, lint or browser verification has been completed.
- **PS-11 / jurisdiction:** Kenya counsel review and final current-law validation remain open.
- **PS-12 / rights:** Copyright Act current consolidated text and item-level licence evidence remain open.
- **PS-13 / safeguarding:** local safeguarding and mandatory-reporting operational process remains unverified.
- **PS-14 / transfer map:** actual hosting, identity, analytics, AI, support and backup data locations remain unknown.

## 15. Kenya assessment disposition

**Status: Research in progress — not counsel reviewed — not launch approved.**

The research establishes a substantial set of requirements for the design. It does not establish that the application, its operator or any provider is compliant. Before any Kenyan child-data processing begins, the project must complete legal-entity/controller classification, ODPC registration analysis, child-data DPIA, consent/authority design, vendor and transfer review, safeguarding procedures, current copyright-law verification and local counsel review.

No application code, UI, infrastructure, database schema or Phase 00C architecture was changed to produce this assessment.
