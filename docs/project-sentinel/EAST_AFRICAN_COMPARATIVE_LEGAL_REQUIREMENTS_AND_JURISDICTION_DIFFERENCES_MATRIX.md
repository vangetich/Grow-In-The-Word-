# Project Sentinel — East African Comparative Legal Requirements & Jurisdiction Differences Matrix

**Product:** Grow In The Word  
**Jurisdictions:** Kenya, Uganda, Tanzania (Mainland and Zanzibar distinction), Rwanda  
**Phase:** 00D — International Legal, Child Protection, Privacy, AI and Intellectual Property Governance  
**Research cut-off:** 8 November 2026  
**Status:** Comparative desk synthesis; owner review pending; not counsel-reviewed; not a compliance determination; not launch approval  
**Application state:** Not deployed. No real learner or child personal data is authorized for processing by this document.  
**Companion assessments:**  
- `KENYA_JURISDICTION_LEGAL_REQUIREMENTS_ASSESSMENT.md`
- `UGANDA_JURISDICTION_LEGAL_REQUIREMENTS_ASSESSMENT.md`
- `TANZANIA_JURISDICTION_LEGAL_REQUIREMENTS_ASSESSMENT.md`
- `RWANDA_JURISDICTION_LEGAL_REQUIREMENTS_ASSESSMENT.md`

---

## 1. Purpose and decision boundary

This matrix converts four preliminary jurisdiction assessments into a coherent, testable regional governance model for Grow In The Word. It is a synthesis and traceability document. It does not replace the underlying country assessments, primary legislation, regulator guidance or advice from locally qualified counsel.

It is intended to:

1. identify controls that should be consistent across the four markets;
2. preserve legal differences that cannot safely be generalized;
3. distinguish product policy choices from statutory requirements;
4. identify where geography, user age, data category, processing purpose, service provider or content licence changes the applicable rule;
5. define policy inputs and outputs for a future jurisdiction-aware policy service;
6. create acceptance criteria that can be verified before any relevant feature or market is enabled; and
7. keep unresolved legal questions visible as blockers rather than filling gaps with assumptions.

**No jurisdiction is approved for launch.** All four country assessments remain preliminary desk research and require local counsel review. The legal status of any rule must be checked against the latest official consolidated text, Gazette, regulator practice and relevant commencement provisions at the time of implementation and launch.

## 2. Governing design principles

### 2.1 One regional safety baseline; no false regional legal rule

Grow In The Word should implement a high-protection common baseline for children, privacy, sensitive beliefs, security, AI and content rights. The common baseline is a product risk-control choice. It must not be represented as a statement that all four countries have identical laws.

Where a local law is more specific or more protective, the local rule supplements or overrides the baseline. Where local law permits a less restrictive route, the product may still retain the stronger baseline unless the product owner, privacy lead and counsel approve a documented exception.

### 2.2 Purpose-specific decisions

A consent or authority record for creating a learner profile does not automatically authorize:
- AI coaching or model-provider disclosure;
- analytics, profiling or personalization beyond the stated purpose;
- private reflection or prayer-journal processing;
- voice recording, transcription or speech assessment;
- public sharing, community posting or direct messaging;
- sponsor, church, school or institutional reporting;
- advertising or commercial targeting;
- model training, fine-tuning, evaluation or dataset creation; or
- cross-border transfer or foreign storage.

Each purpose needs its own legal basis, notice, necessity assessment, safeguards and authorization where required.

### 2.3 Three separate dimensions of the learner relationship

The product must keep separate:
1. **Legal authority:** who may authorize a particular processing activity or act for a child.
2. **Product autonomy:** what a learner may do within the application.
3. **Developmental/spiritual progress:** learning, communication or formation outcomes.

Age bands, skill levels, spiritual maturity, Bible knowledge, activity streaks and engagement scores must never be used as substitutes for legal capacity or proof of caregiver authority.

### 2.4 No inferred religious identity

Use of Bible content, prayer tools or Christian learning features must not silently create a religious identity label. Religious belief and reflection data are sensitive across these frameworks. Do not infer, persist, score, sell, target or expose a learner's religious beliefs from usage patterns.

### 2.5 No source-code or Phase 00C architecture changes in this milestone

This matrix defines governance requirements and future policy-service inputs only. It does not authorize:
- a jurisdiction engine implementation;
- authentication, consent or guardian-flow changes;
- database migrations or a physical schema;
- provider or cloud-region selection;
- real child-data processing;
- new AI processing;
- Bible content ingestion or licensing;
- deployment or market activation.

Existing application code and Phase 00C architecture remain preserved.

## 3. Executive comparison — material legal differences

| Topic | Kenya | Uganda | Tanzania | Rwanda |
|---|---|---|---|---|
| General child-rights definition | Child under 18 under Children Act 2022 | Child under 18 under Children Act | Mainland Law of the Child Act framework; Zanzibar non-Union child law must be separately assessed | Child under 18 under child-protection law |
| Child-data consent trigger | DPA s.33 plus ODPC 2025 child-data guidance: parent/guardian consent and best-interests safeguards for child personal data; ODPC guidance treats age of consent as 18 | DPA s.8: prior consent from parent, guardian or another person with authority to decide for the child, subject to statutory exceptions | PDPA defines child by reference to Child Act; child-related data is expressly included in sensitive personal data; s.30 written-consent/representative rules apply subject to exceptions; Mainland/Zanzibar analysis required | Law 058/2021 Art. 9: parental-responsibility consent where controller knows data belongs to child under 16; separate child-protection safeguards remain under 18 |
| Sensitive belief data | Religious beliefs are sensitive personal data; DPA s.45 has a narrow qualifying-body exception requiring counsel analysis | Religious/philosophical beliefs are special personal data; narrow non-profit association exception must be proven | Child-related data and religious/philosophical belief data are within the sensitive-data framework; s.30 written consent and representative conditions require analysis | Religious/philosophical beliefs are sensitive personal data; Art. 10 ground and Art. 11 safeguards required |
| Age assurance | Risk-based, privacy-preserving approach in ODPC guidance; age and guardian authority verification | Regulations require age-ascertainment system; methods and proportionality need validation | Determine age under applicable child/minor law; avoid assuming one uniform Mainland/Zanzibar method | Must distinguish under-16 Art. 9 trigger from under-18 child protection; knowledge of child status matters under Art. 9 |
| DPIA | DPA s.31; General Regulations identify child and sensitive-data processing as high risk; prior consultation if high residual risk | Regulations 2021 reg. 12 high-risk DPIA | PDPA/Regulations DPIA obligations require processing-specific confirmation; project baseline requires DPIA before child/sensitive/high-risk features | Law and regulator requirements require DPIA for high-risk processing; precise current regulatory steps to be counsel-verified |
| Controller/processor registration | DPA s.18 and 2021 Registration Regulations; ODPC says education and faith-based/religious categories are not exempt; operator classification required | PDPO registration framework; confirm current category, thresholds and filing status | PDPC says registration before collecting/processing personal data | Registration of controllers/processors; certificate is important to cross-border authorization and storage |
| Cross-border/data residency | DPA ss.48–49 and General Regulations Part VII; sensitive-data export has additional conditions; defined localization category may apply | DPA s.19 destination adequacy and other statutory conditions; precise route/counsel confirmation | PDPA ss.31–32 distinguish adequate and other destinations; PDPC transfer permit/process and current practice to confirm | Arts. 48–49 transfer safeguards/contracts; Art. 50 foreign storage requires valid certificate authorizing foreign storage |
| Online child safety | Children Act, cybercrime/communications and other applicable rules; platform-specific duties need further mapping | Children Act, Computer Misuse/communications/criminal laws; reporting/platform status and duties need further mapping | Mainland and Zanzibar child protection, cybercrime/communications and reporting laws need separate mapping | Child protection, cybercrime/ICT and Child Online Protection policy; exact service duties and reporting pathway need further mapping |
| Copyright status | Copyright Act source used in preliminary assessment is expressly not latest; 2022 amendment identified; current consolidation still open | Copyright and Neighbouring Rights Act amended by Act 8 of 2026, commenced 22 May 2026; assess new service-provider, internet exploitation, orphan works, accessibility and treaty provisions | Copyright and Neighbouring Rights Act (Mainland) plus separate Zanzibar non-Union copyright law; current amendments and territory-specific coverage need counsel review | Law 31/2009 and current amendment/consolidation status require verification |
| Special architecture issue | ODPC child-data guidance and operator registration; possible s.45 religious-purpose exception is narrow | Explicit age ascertainment and special-data regime; 2026 copyright amendment | Mainland/Zanzibar is a legal routing dimension, not merely a locale setting; child data itself is sensitive | Rwanda-local storage authorization is separate from cross-border transfer authorization; under-16 and under-18 thresholds differ |

**Interpretation warning:** The table is a high-level synthesis, not a legal opinion. It intentionally uses “confirm”, “assess” and “counsel review” where the underlying assessments identify unresolved interpretation, territorial or current-law issues.

## 4. Comparative requirements matrix

Status labels:
- **Common baseline:** recommended product control across all four jurisdictions.
- **Local legal rule:** specific statutory or regulator requirement identified in the preliminary country assessment.
- **Open:** source, interpretation, territorial scope, regulator practice or counsel confirmation remains outstanding.

| Control domain | Regional baseline for Grow In The Word | Kenya | Uganda | Tanzania | Rwanda | Governance disposition |
|---|---|---|---|---|---|---|
| Territorial scope | Determine user location, operator establishment, processing location, target market and applicable law before activation | DPA s.4 has establishment/residence and data-subject location reach | Confirm Act territorial reach and any foreign controller obligations | PDPA applies Mainland and Zanzibar except Zanzibar non-Union matters | Confirm territorial scope and foreign controller/processor registration duties | **Hard gate:** market + territory classification |
| Child definition | Treat anyone under 18 as a child for product safeguarding unless counsel approves a narrower purpose-specific rule | Under 18 | Under 18 | Mainland under-18 child framework; Zanzibar review needed | Under 18 for child protection | **Common baseline:** under-18 safeguarding |
| Data-consent threshold | Do not infer adult consent capacity from UX band or account independence | DPA s.33 and ODPC guidance require parent/guardian consent for child data | DPA s.8 prior parent/guardian/authorized-person consent, subject to exceptions | Child-related data sensitive; s.30 written consent and representative route for minors | Art. 9 parental responsibility consent for known under-16 child data; general rules remain relevant to 16–17 | **Local rule engine input:** age + purpose + data category |
| Age assurance | Minimize proof; prefer assurance token and evidence metadata over retaining identity documents | ODPC recommends risk-based, privacy-preserving verification | Regulations expressly require age-ascertainment system | Method and threshold need local analysis | Must know whether data belongs to child under 16 for Art. 9; under-18 safeguarding remains | **Common baseline + local method configuration** |
| Parent/guardian authority | Verify legal authority, scope, identity, expiry and revocation; relationship/title alone is insufficient | ODPC guidance requires authority verification; Children Act has defined parental responsibility/guardianship routes | Must be parent, guardian or person with legal authority to decide; proof standard to counsel | Parent/guardian/other legally recognized representative; precise status and evidence require counsel | Holder of parental responsibility under Art. 9 | **Hard gate:** authority evidence and legal route |
| Child participation/assent | Age-appropriate notice, meaningful child voice and no coercion; assent does not replace legally required authorization | Children Act participation/privacy rights; ODPC child guidance | Children Act rights/participation; details require counsel mapping | Law of the Child Act; Zanzibar-specific review | Child rights law and best-interests framework | **Common baseline:** child-friendly assent/voice |
| Best interests | Document best-interests assessment before child-data feature activation and reassess material changes | ODPC guidance and DPA s.33 | Children Act principles and data protection obligations; exact DPIA interplay to counsel | Law of the Child Act and PDPA; detailed test to counsel | Child protection law and Art. 9 child-interest condition | **Common baseline:** documented assessment |
| Sensitive religious data | Treat explicit beliefs, prayers, private spiritual reflections and inferred belief as highly restricted; no inference by default | DPA s.45; narrow qualifying-body exception | Special personal data restrictions; narrow non-profit exception | Sensitive-data regime includes child data and belief data | Arts. 10–11 sensitive-data legal ground and safeguards | **Hard gate:** purpose-specific ground + minimization |
| Child data classification | Do not assume only journal data is sensitive | Sensitive-data status depends on categories and processing | Special-data categories include beliefs; child data governed by s.8 | Child-related data itself is included in sensitive personal data definition | Child-data rule under Art. 9; belief data separately sensitive | **Local classification table** |
| DPIA | Complete DPIA before child, sensitive, profiling, AI, voice or high-risk processing | s.31; child/sensitive processing high-risk under General Regulations | Regulation 12 high-risk DPIA | Statutory/regulatory DPIA route; verify exact thresholds and process | High-risk DPIA; verify current regulator process | **Hard gate:** signed DPIA and residual-risk disposition |
| Registration | Determine controller/processor roles and complete required registration before processing | ODPC category rules; education and faith-based categories not exempt per ODPC FAQs | PDPO registration framework; verify operator classification | PDPC registration before collection/processing | Controller/processor registration required | **Hard gate:** entity-specific registration evidence |
| DPO/privacy accountability | Assign named accountable privacy lead and DPO where required; document authority and contact | DPA and Regulations roles; confirm DPO applicability | Confirm Act/Regulations and PDPO expectations | PDPA/Regulations DPO requirements | DPO and registration requirements | **Common baseline:** named owner; local DPO trigger |
| Processor/subprocessor governance | Written processor terms, instruction limits, confidentiality, security, deletion, audit and subprocessor control | General Regulations regs. 24–25 | Contract and processor obligations to be confirmed against current Act/Regs | PDPA/Regulations controller-processor duties | Art. 49 written transfer/processing contracts and other law | **Common baseline:** vendor due diligence + DPA |
| Cross-border transfer | Inventory every destination, recipient, purpose, remote access and onward transfer before data flows | ss.48–49; safeguards and sensitive-data conditions | s.19 destination adequacy and statutory conditions | ss.31–32 adequate vs other destinations; PDPC permit/practice | Arts. 48–49 transfer rules | **Hard gate:** country-specific transfer approval |
| Local storage | Never assume a regional cloud region is lawful for all four markets | Check Reg. 26 defined localization categories | No blanket localization conclusion in current assessment; verify sector rules | Verify any localization/sector-specific conditions | Art. 50 certificate required for storage outside Rwanda | **Hard gate:** separate storage authorization from transfer |
| Security and breach | Encryption, access controls, logging, incident response, retention and deletion; local deadlines configured | DPA s.43 72-hour controller notice; processor 48-hour notice to controller | Verify current notification trigger/deadline and PDPO practice | Verify current PDPC notice deadline and procedure | Verify current DPO notification deadline and procedure | **Common baseline + local breach clock** |
| Automated decisions/profiling | No consequential automated decisions about legal status, access, safeguarding credibility or spiritual worth; meaningful human review | DPA s.35 and Reg. 22 | DPA/Regulations automated-decision provisions; exact threshold counsel | PDPA automated-processing provisions; exact threshold counsel | Law's automated decision provisions; exact threshold counsel | **Common baseline:** human review and explainability |
| AI use | No model training on child data, journal content or belief data by default; no AI spiritual authority claims | Apply DPA and ODPC child guidance | Apply DPA special-data/child rules | Apply PDPA sensitive child-data regime | Apply Arts. 9–11 and transfer/storage rules | **Hard gate:** separate AI purpose and vendor review |
| Direct messaging/community | Off by default for child profiles; no unmoderated adult-to-child private messaging | Child privacy/safety assessment | Child safeguarding and online-safety review | Mainland/Zanzibar safety review | Rwanda child-safety review | **Common baseline:** disabled pending safety case |
| Safeguarding report | Child-accessible report flow, trained reviewer, triage, emergency escalation, evidence preservation, anti-retaliation | Local child services/police/ODPC escalation map required | Uganda-specific referral/reporting map required | Separate Mainland/Zanzibar escalation maps | Rwanda-specific referral/reporting map required | **Operational gate:** named safeguarding lead and SOP |
| Parent/guardian visibility | Least privilege; no automatic access to private reflections; child privacy respected | Children Act s.27 privacy and reasonable supervision balance | Child privacy and caregiver authority require review | Child privacy/custody and guardian powers need review | Child privacy and parental responsibility need review | **Common baseline:** scoped family access |
| Institutional access | School/church/children's home/sponsor receives only assigned and necessary data; no implied parental authority | Verify lawful mandate/authority | Verify lawful mandate/authority | Verify mandate separately across Mainland/Zanzibar | Verify mandate/authority | **Common baseline:** scoped institutional role |
| Sponsorship | Funding does not confer custody, guardianship or journal access | Local contract/privacy review | Same | Same | Same | **Common baseline:** sponsor ≠ guardian |
| Bible translation | Rights record for each edition, language, territory, format, feature and use | Current Act consolidation open; 2022 amendment identified | 2026 amended Act; new provisions require IP counsel | Mainland and Zanzibar rights coverage separately verified | Current IP law and amendment status open | **Hard gate:** content rights registry |
| Audio/music/video | Clear text, composition, performance, master, producer, artwork and platform rights separately | Local law and contracts | Act 8/2026 affects online and neighbouring rights; verify all layers | Mainland/Zanzibar rights and neighbouring rights | Current IP provisions and rights chain | **Hard gate:** layered rights clearance |
| Offline/cache | No offline copy unless licence explicitly grants download/cache, duration, territory and user scope | Separate permission required | Separate permission required | Separate permission and territory required | Separate permission required | **Common baseline:** explicit offline right |
| AI input/training | Display licence does not imply AI prompt, embedding, retrieval, training or derivative rights | Explicit rights review | Explicit rights review | Explicit rights review | Explicit rights review | **Common baseline:** separate AI permission |
| Takedown/expiry | Disable use when licence expires, territory is excluded or credible rights complaint is received | Local process | Local process | Mainland/Zanzibar routing | Local process | **Common baseline:** rights expiry and takedown |

## 5. Regional baseline policy — proposed product standard

The following are proposed internal product standards, not claims that identical wording appears in every country's legislation.

### RB-01 — Under-18 safeguarding baseline
Treat every learner under 18 as a child for safeguarding, product safety, direct-contact restrictions and child-friendly design. Do not treat a country-specific data-consent threshold as a general adulthood threshold.

### RB-02 — No personalized child account without a verified legal route
Before creating a persistent personalized child profile, establish the applicable lawful basis, child-data authorization route, age assurance, caregiver authority and best-interests record. If the route is uncertain, offer only a non-personalized public learning experience without persistent child-level records.

### RB-03 — Separate consent by purpose
Use granular, versioned, revocable purpose records. A parent/guardian account creation action is not blanket consent for sensitive beliefs, private journals, AI, voice, sharing, analytics or transfers.

### RB-04 — Belief-data minimization
Do not infer religion or denomination. Do not send private prayers, reflections, confessions, pastoral disclosures or sensitive belief data to AI, analytics, sponsors or institutional dashboards by default. Any future exception requires a separate necessity, lawful-ground, child-interest, vendor, security and counsel review.

### RB-05 — Care & Access Pathway
Recognize only legally supported authority routes: parent with parental responsibility, legally appointed guardian, verified alternative/kinship/foster caregiver where law authorizes the relevant act, or properly mandated institutional representative. Record authority type, evidence, scope, start, expiry, review and revocation. Relationship or job title alone is insufficient.

### RB-06 — Learner privacy boundary
No guardian, church leader, teacher, sponsor or institutional representative receives automatic access to private journal/reflection content. Any legally required exception must be specific, proportionate, justified, auditable and reviewed under local law and child-safety policy.

### RB-07 — AI and automated decision safeguards
AI is an educational support tool, not a spiritual authority, safeguarding investigator, legal-capacity assessor or substitute parent. No AI-only determination of guardian status, consent validity, abuse credibility, learner worth, spiritual standing or rights eligibility. Consequential decisions require accountable human review.

### RB-08 — Vendor and transfer control
No child-data flow to a cloud, AI, analytics, identity, support or storage vendor until controller/processor roles, contracts, subprocessors, destination, remote access, transfer mechanism, storage authorization and retention are approved for the relevant jurisdiction.

### RB-09 — Child safety by default
Direct adult-to-child private messaging, public profiles, geolocation, open community discovery, targeted advertising and behaviorally manipulative engagement remain disabled unless a documented child-safety case and jurisdiction-specific legal approval supports the feature.

### RB-10 — Content-rights provenance
No Scripture translation, commentary, audio, music, artwork, video, API content or user-contributed asset is distributed until the rights registry identifies the rights holder, edition/version, territory, permitted act, term, attribution, format, commercial status, offline rights, adaptation rights, AI rights and takedown route.

### RB-11 — Retention, access and deletion
Purpose-limited retention schedules, access logging, export, correction, deletion, legal hold and account transition must be defined and implemented. Do not keep sensitive child data merely because storage is inexpensive or analytics might later be useful.

### RB-12 — Incident readiness
Each market requires a named privacy lead, safeguarding lead, incident owner, local referral map, regulator-notification decision tree and vendor escalation route before child-data processing begins.

## 6. Jurisdiction routing model — policy inputs, not implementation

A future policy service should evaluate a structured context, not merely a country code.

### 6.1 Required policy inputs

| Input | Example values | Why it matters |
|---|---|---|
| User location | Kenya; Uganda; Tanzania-Mainland; Tanzania-Zanzibar; Rwanda; unknown | Territorial scope and local rules |
| Operator establishment | Kenya; Uganda; foreign; multiple entities | Controller/processor territorial reach and registration |
| Learner age band | under 13; 13–15; 16–17; 18+; unknown | Child status and specific age thresholds |
| Age evidence status | unverified; self-declared; proportionately verified; disputed | Assurance strength and feature eligibility |
| Authority route | parent; legal guardian; court-appointed; kinship/foster; institutional mandate; none; disputed | Who can authorize the particular act |
| Authority scope | profile; education; sensitive data; AI; voice; transfer; sharing; private reflection | Prevent blanket authority |
| Data category | ordinary personal; child-related; sensitive belief; health; biometric/voice; journal; safety report | Local classification and additional safeguards |
| Processing purpose | account; learning; assessment; AI; analytics; voice; safeguarding; sponsor report | Purpose-specific legal basis and consent |
| Processing actor | controller; processor; joint controller; subprocessor; AI provider | Contract and accountability obligations |
| Storage location | domestic; foreign; multiple; unknown | Localization and foreign-storage rules |
| Transfer destination | country, provider, onward recipient, remote support location | Adequacy, safeguards, permit/certificate |
| Content item | Bible translation/version; commentary; media; API; user upload | Copyright territory and licensed acts |
| Content use | display; quote; reproduce; download; cache; audio; adapt; share; AI input; training | Rights scope |
| Feature risk | public; private; direct contact; profiling; consequential decision | DPIA, safeguarding and human review |

### 6.2 Required policy outputs

The future service should return a structured decision with at least:

- `ALLOW` — only when all required evidence and controls are present;
- `ALLOW_WITH_CONTROLS` — feature is permitted only with enumerated controls;
- `DENY` — prohibited or outside a granted authority/licence;
- `HOLD_FOR_REVIEW` — unresolved law, authority, risk or source;
- `PUBLIC_NON_PERSONALIZED_ONLY` — limited public learning without a persistent personalized learner record.

Every decision must include:
- jurisdiction profile and effective date;
- applicable rule IDs and source versions;
- user/authority/purpose facts relied on;
- missing evidence;
- required safeguards;
- decision reason;
- human reviewer where required;
- expiry/review trigger; and
- audit event identifier.

No policy output should be based on spiritual maturity, religious commitment, engagement score, learning level or AI inference of belief.

### 6.3 Fail-closed conditions

The policy service must return `HOLD_FOR_REVIEW` or `DENY`, not silently default to allow, where:
- location or applicable territory is unknown for a legally material feature;
- age is unknown or contradictory and child status changes the rule;
- caregiver authority is unverified or disputed;
- the requested purpose is outside the recorded authorization;
- a required DPIA, registration, transfer permit, foreign-storage certificate or vendor contract is absent;
- data classification is unresolved;
- a content licence is expired, territorially insufficient or silent on the requested act;
- current law or regulator guidance is not verified for the effective date; or
- a safeguarding report requires a human decision.

## 7. Product feature decision matrix

| Feature | Regional default | Jurisdiction-dependent evidence before activation |
|---|---|---|
| Public Bible reading without account | May be offered as public, non-personalized content if content rights and local rules are cleared | Content licence territory/format; analytics/cookie treatment; any local restrictions |
| Persistent learner profile under 18 | Hold until lawful basis, parent/guardian route, age assurance and best-interests assessment are documented | Kenya s.33; Uganda s.8; Tanzania sensitive child-data/s.30; Rwanda Art. 9 under 16 plus general rules |
| Learning progress analytics | Minimize; no sensitive belief inference; child-level analytics disabled until authorized | Purpose, lawful basis, retention, profiling threshold, DPIA and vendor transfer |
| Prayer/reflection journal | Private and off AI/analytics by default; do not collect real child journal content before controls exist | Sensitive-data ground, explicit purpose authorization, security, retention, child privacy, local transfer |
| AI tutor / coach | No child personal data or private reflection to model provider by default | DPIA, lawful basis/authorization, processor contract, subprocessor, transfer/storage approval, model-training prohibition, human review |
| Voice recording / speech analysis | Disabled for children until a dedicated assessment | Voice/biometric classification, consent, retention, transcription provider, transfer, safety and deletion |
| Parent dashboard | Minimal learning summaries; no automatic journal visibility | Verified authority, scope, child privacy, purpose and local rights |
| Church/school/children's-home dashboard | Assigned learner and minimum necessary records only | Institutional mandate, controller/processor role, child authority, notice, data sharing and retention |
| Sponsor-funded profile | Funding only; no access rights | Sponsorship contract, lawful authority route, disclosure restrictions, child dignity |
| Community, messaging, public profile | Disabled for child profiles by default | Child online-safety review, moderation, reporting, age gating, local law and operational staffing |
| Offline downloads | Disabled for protected/licensed text until rights proven | Licence rights by country, edition, device, cache period and user type |
| Scripture audio/music/video | Disabled until layered rights cleared | Text, composition, performer, producer/master, communication/making-available rights |
| AI use of Scripture/commentary | Retrieval/input only if licence expressly permits | Licence, terms of API, territory, training/embedding/derivative rights |
| Public sharing of learner output | Off for child profiles by default | Child assent/authority, privacy, copyright, moderation, takedown and territory |
| Safeguarding report | Provide safe route with minimal data and trained response | Local reporting law, emergency contacts, evidence retention, confidentiality limits |

## 8. Cross-border hosting and vendor decision matrix

| Jurisdiction | Minimum legal review before vendor selection | Specific caution |
|---|---|---|
| Kenya | DPA ss.48–49, General Regulations Part VII, sensitive-data transfer and localization categories, processor contract, ODPC registration | Do not assume all educational services are subject to localization, or that none are; assess exact service and learner cohort |
| Uganda | DPA s.19, destination adequacy and other transfer conditions; controller/processor roles; PDPO registration; contract/security | Verify current transfer procedure and regulator practice; do not rely on provider region name alone |
| Tanzania | PDPA ss.31–32, current PDPC transfer process/permit, destination safeguards, Mainland/Zanzibar scope, processor registration | Consent is not a blanket substitute for statutory transfer assessment or Commission requirements |
| Rwanda | Arts. 48–49 transfer requirements and Art. 50 foreign-storage certificate; registration; DPO; vendor and remote-support access | Foreign storage authorization is a distinct gate; remote access and backups must be mapped and counsel-classified |

**Provider-neutral rule:** no provider, cloud region, AI vendor or data architecture is selected by this matrix. A hosting decision must follow verified legal requirements and the actual technical data-flow map.

## 9. Scripture and content-rights comparison

A content item is not “licensed” in the abstract. Rights are granted by a specific owner, edition, territory, duration, format and permitted act.

### 9.1 Rights layers to inventory

1. Underlying biblical text / source-language text.
2. Specific translation, revision and edition.
3. Editorial apparatus, headings, introductions, footnotes and cross-references.
4. Commentary, study notes, maps and devotional material.
5. Audio Bible script and reading performance.
6. Musical composition, lyrics, arrangement, performer and master recording.
7. Video, illustrations, photographs, animations and fonts.
8. API, database, platform terms and provider restrictions.
9. User-created submissions, testimony, prayer, artwork and learner output.
10. AI-generated material and any source material used as model input or retrieval context.

### 9.2 Required rights metadata

Every item must record:
- title, creator, publisher, owner and rights contact;
- edition, revision, language and identifier;
- source and provenance evidence;
- copyright status and term;
- licensed countries/territories;
- permitted user groups and commercial/non-commercial status;
- display, reproduction, distribution, communication and making-available rights;
- quotation/excerpt limits and attribution;
- offline download/cache rights and expiry;
- audio, performance, broadcast and synchronization rights;
- adaptation, translation, accessibility and derivative-work permissions;
- AI prompt, retrieval, embedding, training, evaluation and output permissions;
- sublicense/processor rights;
- takedown, complaint, expiry and renewal procedure.

### 9.3 Country-specific IP cautions

- **Kenya:** preliminary assessment identified that the retrieved consolidated Copyright Act copy is expressly not the latest available. Current consolidation and subsequent amendments must be verified before rights conclusions.
- **Uganda:** Act 8 of 2026 commenced 22 May 2026 and amended the Copyright and Neighbouring Rights Act. It includes material changes relevant to online exploitation, service providers, orphan works, accessible formats and international treaty implementation. Obtain a focused IP opinion before implementing distribution, caching or platform notice workflows.
- **Tanzania:** assess Mainland and Zanzibar separately where copyright is a non-Union matter. Confirm current Act text, amendments, collecting-society requirements and the rights chain for each territory.
- **Rwanda:** verify current Law 31/2009 status, amendments, implementing instruments and treaty position before concluding any permitted use.

A public-domain claim must be made per work, edition, translation, jurisdiction and relevant related rights. The age of the underlying biblical source does not make a modern translation, recording, commentary, artwork or database public domain.

## 10. Safeguarding and online-safety governance model

The four assessments identify a need for more detailed country-specific operational mapping. Until that work is complete, apply the stronger internal baseline:

- no open adult-to-child private messaging;
- no public child profiles or child discovery;
- no targeted advertising or manipulative engagement patterns for children;
- clear child-accessible report and block controls;
- trained safeguarding reviewers and documented escalation;
- no promise of absolute confidentiality where a child may be at risk;
- minimum necessary collection in reports;
- role-based access and auditable incident records;
- evidence preservation under an approved retention/legal-hold process;
- no AI-only abuse or grooming determination;
- no disclosure of a report to a person who may be implicated;
- local emergency, child-protection and law-enforcement referral maps for each market;
- separate procedures for Mainland Tanzania and Zanzibar; and
- regular staff/vendor training and incident simulations.

**Open legal work:** identify mandatory-reporting duties, timelines, regulator/police referral obligations, intermediary/service-provider status, notice-and-takedown rules, evidence-preservation obligations and restrictions on disclosure for each country and relevant territory.

## 11. Proposed regional acceptance criteria

These are design/governance acceptance criteria. They are not implemented or executed.

| ID | Requirement | Acceptance evidence | Failure result |
|---|---|---|---|
| EA-COMP-001 | Every country assessment remains separately authoritative | Links and version/date references to all four country assessments | Block matrix approval |
| EA-COMP-002 | Regional baseline does not erase local law | Counsel-reviewed difference log and rule-to-source traceability | Block policy specification |
| EA-COMP-003 | Tanzania Mainland and Zanzibar are distinguishable | Territory model and non-Union legal review | Hold Tanzania activation |
| EA-COMP-004 | Rwanda under-16 data-consent and under-18 child-protection thresholds remain separate | Age/purpose decision table and tests | Block Rwanda policy approval |
| EA-COMP-005 | Kenya and Uganda child-data authorization are not replaced by product autonomy bands | Rules cite Kenya s.33/ODPC guidance and Uganda s.8 | Block child account activation |
| EA-COMP-006 | Tanzania child-data sensitive classification is represented | Data classification mapping and s.30 legal review | Block Tanzania child-data processing |
| EA-COMP-007 | Sensitive religious-belief processing is purpose-limited | Data map, lawful ground, authorization, DPIA and no-inference test | Block sensitive feature |
| EA-COMP-008 | Caregiver authority is verified and scoped | Evidence type, legal basis, scope, expiry and revocation tests | Deny caregiver access |
| EA-COMP-009 | Child assent/participation is not substituted for legal authorization | Separate consent/assent records and UI test | Block child-data processing |
| EA-COMP-010 | DPIA and best-interests review precede high-risk child processing | Approved DPIA, residual-risk decision and review date | Block feature |
| EA-COMP-011 | Registration obligations are confirmed per legal entity and jurisdiction | Regulator registration evidence or counsel-approved non-applicability | Block processing |
| EA-COMP-012 | Every vendor/subprocessor and remote access location is inventoried | Data-flow map, contract, security review and destination list | Block vendor data flow |
| EA-COMP-013 | Kenya, Uganda and Tanzania transfer routes are separately configured | Country-specific legal approval and test vectors | Block transfer |
| EA-COMP-014 | Rwanda foreign storage is independently authorized | Valid Art. 50 certificate and transfer review where applicable | Block foreign storage |
| EA-COMP-015 | Breach-notification clocks are jurisdiction-specific | Incident matrix, contact list and tabletop evidence | Block launch |
| EA-COMP-016 | AI purpose, model provider, training and transfer rights are separate | AI impact assessment, contract, opt-out/training controls and test evidence | Block child AI |
| EA-COMP-017 | Automated consequential decisions receive human review | Human-in-the-loop procedure and audit evidence | Block decision feature |
| EA-COMP-018 | Online safety has local referral and reporting procedures | Approved country SOPs, trained owners and simulated report tests | Block interactive child features |
| EA-COMP-019 | Copyright permissions are item-, territory- and act-specific | Complete rights registry and counsel review | Block content use |
| EA-COMP-020 | Offline and AI rights are separately licensed | Contract clauses or rights evidence for each act | Block offline/AI use |
| EA-COMP-021 | Child private reflections are excluded from parent/sponsor/AI/analytics by default | Resource-level authorization and data-flow tests | Block reflection feature |
| EA-COMP-022 | Public non-personalized fallback is technically separated from personalized child processing | Architecture/data-flow evidence and no persistent profile test | Disable fallback until verified |
| EA-COMP-023 | Jurisdiction policy decisions are explainable and auditable | Decision record with rule IDs, source version, evidence and reason | Block policy service |
| EA-COMP-024 | Legal updates trigger controlled re-review | Monitoring record, change impact and owner-approved version | Hold affected feature |
| EA-COMP-025 | No launch status is inferred from desk research completion | Launch checklist requires counsel, technical and operational evidence | Block launch approval |

## 12. Proposed jurisdiction-policy test vectors

These scenarios should become automated policy tests once the rules engine is specified. They are not runtime tests yet.

| Test ID | Input scenario | Expected decision | Reason |
|---|---|---|---|
| EA-POL-001 | Kenya learner age 15; no verified parent/guardian authority | `HOLD_FOR_REVIEW` or `PUBLIC_NON_PERSONALIZED_ONLY` | Kenya child-data authorization route absent |
| EA-POL-002 | Uganda learner age 17; only learner self-consent for personalized profile | `HOLD_FOR_REVIEW` | Under-18 child rule and s.8 authority route must be satisfied |
| EA-POL-003 | Tanzania Mainland learner age 12; parent agrees to profile but PDPC registration absent | `DENY` personalized processing | Registration and child-related sensitive-data conditions unresolved |
| EA-POL-004 | Tanzania Zanzibar learner; feature relies on Mainland-only non-Union law assessment | `HOLD_FOR_REVIEW` | Zanzibar non-Union legal route not established |
| EA-POL-005 | Rwanda learner age 15; no holder-of-parental-responsibility consent | `HOLD_FOR_REVIEW` | Article 9 under-16 condition not satisfied |
| EA-POL-006 | Rwanda learner age 17; system treats learner as adult because Art. 9 threshold is under 16 | `DENY` that classification; `HOLD_FOR_REVIEW` feature | Under-18 child-protection rules still apply |
| EA-POL-007 | Any jurisdiction; guardian consents to account but not AI | `DENY` AI processing | Purpose-specific authorization absent |
| EA-POL-008 | Any jurisdiction; prayer journal is sent to analytics by default | `DENY` data flow | Sensitive-belief minimization baseline |
| EA-POL-009 | Rwanda; foreign cloud storage but no valid Art. 50 certificate | `DENY` foreign storage | Separate storage authorization absent |
| EA-POL-010 | Tanzania; overseas transfer approved only by generic checkbox, no ss.31–32 analysis | `HOLD_FOR_REVIEW` | Transfer route not established |
| EA-POL-011 | Uganda; service provider uses copyrighted translation in online service after 2026 amendment without rights review | `HOLD_FOR_REVIEW` | Current amended Act and relevant rights unresolved |
| EA-POL-012 | Any jurisdiction; Bible edition licensed for web display only, user requests offline download | `DENY` offline copy | Licence does not include offline reproduction |
| EA-POL-013 | Any jurisdiction; Bible translation licensed for display but not AI input | `DENY` AI input | Separate AI permission absent |
| EA-POL-014 | Any jurisdiction; child is in an institutional care setting and institution claims full guardian access | `HOLD_FOR_REVIEW` | Mandate and scope must be verified; institution status is not blanket authority |
| EA-POL-015 | Any jurisdiction; safeguarding report identifies an adult who has caregiver access | `HOLD_FOR_REVIEW` and restrict implicated access | Human safeguarding triage and conflict-safe escalation |
| EA-POL-016 | Any jurisdiction; legal rule version expired or source status unknown | `HOLD_FOR_REVIEW` | Current legal source validation missing |

## 13. Open legal questions and counsel workstream

The following questions must be closed by appropriately qualified counsel before the relevant feature or market is approved.

### Kenya
- Confirm current consolidated Copyright Act and all post-2022 amendments/regulations.
- Confirm operator legal form, ODPC registration categories and any education/faith-based classifications.
- Confirm section 45 religious-purpose exception applicability, if any, and interaction with child-data safeguards.
- Confirm section 33 authorization/assent design and authority evidence standards for intended child cohorts.
- Confirm whether any planned education activity falls within Regulation 26 localization categories.
- Confirm transfer, breach and automated decision controls against current regulator guidance.

### Uganda
- Confirm exact legal effect of s.8 exceptions and authorized decision-maker evidence.
- Confirm PDPO registration category/threshold and current filings.
- Confirm religious-body/non-profit special-data exception applicability, if any.
- Confirm current transfer approval, destination adequacy and breach notification procedure.
- Complete child online-safety, mandatory reporting, intermediary and service-provider status analysis.
- Obtain IP opinion on Act 8 of 2026, including online services, service-provider provisions, orphan works, accessibility, TPM and AI-related content use.

### Tanzania
- Confirm current definition and legal treatment of child/minor under the revised 2025 Law of the Child Act and applicable Zanzibar laws.
- Confirm PDPA application and all non-Union carve-outs for child welfare, education, copyright and online safety.
- Reconcile 2023 Regulations, GN 808/2024 and the PDPC publication dated 23 March 2026; confirm which instrument/version is currently operative.
- Confirm registration, DPO, DPIA, breach and cross-border permit procedures.
- Confirm Mainland and Zanzibar copyright laws, collecting-society rules and territory-specific Bible translation permissions.
- Complete separate Mainland/Zanzibar safeguarding and mandatory-reporting maps.

### Rwanda
- Confirm Article 9 treatment of 16–17-year-olds, capacity, notice, consent and other legal bases.
- Confirm Articles 10–11 grounds and safeguards for religious-belief and child data.
- Confirm registration, DPO, DPIA, retention and breach notification requirements.
- Obtain written regulatory/counsel determination of Article 50 certificate requirements for primary storage, replicas, backups, disaster recovery and remote support.
- Confirm transfer requirements for AI, cloud, analytics and support vendors under Articles 48–49.
- Verify current IP Law 31/2009 consolidation/amendments and child online-safety reporting obligations.

### Regional
- Confirm the operator entity, controller/processor roles, establishment and target markets.
- Confirm local representation, complaint-handling, consumer and subscription requirements.
- Confirm mandatory child-abuse reporting, emergency escalation, preservation and disclosure restrictions.
- Confirm data-subject rights and child/guardian conflict procedures.
- Confirm current regulator contact details, forms, portals and filing practice.
- Define local counsel scope, opinion date, reliance entity, covered features, territories and review expiry.

## 14. Source and evidence register

The individual jurisdiction assessments contain the detailed source-by-source legal register and retrieval notes. The following are the key primary/official sources to revalidate when this matrix is approved or implemented.

### Kenya
- Data Protection Act 2019 (Kenya Law): https://new.kenyalaw.org/akn/ke/act/2019/24/eng%402022-12-31/source
- Data Protection (General) Regulations 2021 (Kenya Law): https://new.kenyalaw.org/akn/ke/act/ln/2021/263/eng%402022-12-31/source
- ODPC Guidance Note for Processing Children's Data (2025): https://www.odpc.go.ke/wp-content/uploads/2025/11/ODPC-%E2%80%93-Guidance-Note-for-Processing-Childrens-Data.pdf
- Children Act 2022: https://www.kenyalaw.org/kl/fileadmin/pdfdownloads/Acts/2022/TheChildrenAct_2022.pdf
- ODPC laws portal: https://www.odpc.go.ke/data-protection-laws-kenya/
- Copyright Act source used in preliminary review (explicitly not latest): https://new.kenyalaw.org/akn/ke/act/2001/12/eng%402022-04-22/source

### Uganda
- Data Protection and Privacy Act 2019 (Chapter 97): https://ulii.org/akn/ug/act/2019/9/eng
- Data Protection and Privacy Regulations 2021: https://ulii.org/akn/ug/act/si/2021/21/eng
- Children Act (Chapter 62): https://ulii.org/akn/ug/act/1997/6/eng
- Copyright and Neighbouring Rights (Amendment) Act 2026, Act 8 of 2026: https://ulii.org/en/akn/ug/act/2026/8/eng%402026-05-22
- Current amended Copyright and Neighbouring Rights Act (Chapter 222): https://ulii.org/en/akn/ug/act/2006/19/eng%402026-05-22
- Personal Data Protection Office: https://pdpo.go.ug/

### Tanzania
- Personal Data Protection Act 2022 (OAG MIS): https://oagmis.oag.go.tz/portal/acts/237
- Personal Data Protection Act (PDPC official copy): https://www.pdpc.go.tz/media/media/THE_PERSONAL_DATA_PROTECTION_ACT.pdf
- Personal Data Collection and Processing Regulations 2023 (GN 449C): https://oagmis.oag.go.tz/portal/legislation/1350
- 2024 Amendment Regulations (GN 808): https://oagmis.oag.go.tz/portal/legislation/3833
- 2024 Amendment Gazette text: https://oagmis.oag.go.tz/portal/legislation/3833/download
- PDPC publications (including regulations publication dated 23 March 2026): https://pdpc.go.tz/publications/
- Law of the Child Act (Mainland) and current revised text: https://oagmis.oag.go.tz/
- Copyright and Neighbouring Rights Act and Zanzibar non-Union laws: verify through current official OAG/Gazette sources and Zanzibar legal repositories before use.

### Rwanda
- Law No. 058/2021 relating to the Protection of Personal Data and Privacy (Official Gazette): https://www.gov.rw/fileadmin/user_upload/RISA/Publications/2.Laws/Law_relating_to_the_protection_of_personal_data_and_privacy.pdf
- National Cyber Security Authority / data protection regulator: https://www.ncsa.gov.rw/
- Law No. 71/2018 relating to the protection of the child: verify current official Gazette text through RwandaLII / official government source.
- Law No. 31/2009 on the Protection of Intellectual Property: verify current consolidated and amended official text before relying on it.

### Comparative reference — secondary only
- Comparative Study of Data Protection Legislation Frameworks across the East African Community: https://www.d4daccess.eu/sites/default/files/2024-05/COMPARATIVE%20STUDY%20OF%20THE%20DATA%20PROTECTION%20LEGISLATION%20FRAMEWORKS%20ACROSS%20THE%20EAC%20.pdf
- Comparative academic analysis (2024): https://nru.uncst.go.ug/items/2bc8d452-5d97-4813-9618-2587d25c3a1e

Secondary comparative sources are contextual only and must not override primary law or current regulator guidance.

## 15. Change control and review cadence

1. The monthly international legal monitoring process supplies candidate changes; it does not itself amend this matrix.
2. A change is recorded with official source, publication date, commencement date, legal status, affected territory, affected requirement/test IDs and counsel need.
3. A reviewer assesses whether the change affects data collection, consent, age assurance, authority, safeguarding, storage, transfer, AI, copyright or launch status.
4. The matrix is updated only after owner approval and, where material, counsel review.
5. Previous versions remain traceable. Do not silently overwrite a legal rule or effective date.
6. A source becomes stale when an amendment, new regulation, regulator direction, court decision or material change in enforcement practice is identified.
7. Any critical legal change triggers an affected-feature hold until impact is assessed.

## 16. Relationship to Phase 00C and future Jurisdiction Rules Engine

This matrix is a governance input to the future rules-engine specification. It does not authorize implementation.

The eventual policy capability should be provider-neutral and separated into:
- **Jurisdiction profile registry:** territory, laws, source versions, effective dates, local counsel status and review expiry.
- **Rule catalogue:** machine-readable rules with applicability predicates, legal basis, required evidence, exceptions and fail-closed behavior.
- **Decision evaluator:** takes verified context and returns an explainable policy decision.
- **Evidence ledger:** stores consent, authority, DPIA, registration, transfer, storage and licence evidence with provenance.
- **Policy audit log:** records rule versions, inputs, outputs, overrides, reviewers and timestamps.
- **Change-impact workflow:** compares legal updates with rules, features, tests and data flows.

The engine must not hardcode legal assumptions into UI components. The application should call a stable authorization/policy contract after the rule set and service boundaries are owner- and counsel-approved. Existing Phase 00C architecture remains the controlling design baseline unless a separately approved architecture decision changes it.

## 17. Disposition

**Comparative status:** Draft regional synthesis completed from four preliminary country assessments.  
**Owner review:** Pending.  
**Local counsel review:** Required in all four jurisdictions.  
**Online-safety/mandatory-reporting review:** Open in all four jurisdictions, with Tanzania requiring separate Mainland and Zanzibar procedures.  
**Copyright/current-law review:** Open in all four jurisdictions; Uganda 2026 amendment requires focused review.  
**Technical implementation:** Not authorized.  
**Real child-data processing:** Not authorized by this document.  
**Launch approval:** Not granted.

The next valid milestone is an owner review of this matrix, followed by targeted counsel questions and a controlled rule catalogue specification. Only after those steps should the project consider a Jurisdiction Rules Engine technical design.