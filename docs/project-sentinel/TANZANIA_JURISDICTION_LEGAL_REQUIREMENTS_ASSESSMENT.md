# Project Sentinel — Tanzania Jurisdiction Legal Requirements Assessment

**Jurisdiction:** United Republic of Tanzania — Mainland and Zanzibar distinction expressly retained  
**Assessment stream:** Phase 00D — International Legal, Child Protection & Intellectual Property Governance  
**Status:** Preliminary desk assessment; not counsel-reviewed; not a compliance determination  
**Research date:** 8 November 2026  
**Application state:** Not deployed; no real learner/child data should be processed during this assessment  
**Branch:** `project-sentinel/phase-00d-international-governance`

## 1. Executive assessment

Tanzania's Personal Data Protection Act 2022 (Act No. 11 of 2022) commenced on 13 June 2023. Its express scope provision applies to Mainland Tanzania and Zanzibar, but excludes non-Union matters in Zanzibar. The product must therefore not treat "Tanzania" as a single undifferentiated legal territory for every activity: data protection, child welfare, copyright, education and other non-Union subject matters may require separate Zanzibar analysis.

The Act creates a Personal Data Protection Commission (PDPC), registration requirements and rules for sensitive personal data, including written consent. Where the person whose consent is sought is a minor or otherwise unable to consent, consent is sought from a parent, guardian or other legally recognized representative. The Law of the Child Act 2009 (now available in a revised 2025 edition) defines the child framework and regulates parental responsibility, custody, foster care and child welfare. The exact interplay between the Act's definition of "minor", the child-law definition, Zanzibar's separate non-Union laws and product account autonomy must be confirmed by counsel.

Tanzania's PDPC states that a person must not collect or process personal data without registration as a controller or processor. The official PDPC site also lists the 2023 Personal Data Collection and Processing Regulations and the 2024 amendment. A regulator publication page now records the regulations as published 23 March 2026; the legal effect of that publication date, any republication/consolidation and any further amendments should be checked against the Gazette and OAG MIS before implementation.

The Personal Data Protection Act's definition of sensitive personal data expressly includes **data relating to children** and, where processed for what they reveal, religious or philosophical beliefs. Section 30 therefore makes the sensitive-data regime directly relevant to child profiles and child data generally, not only to prayer/reflection content. It requires prior written consent subject to statutory exceptions; where the data subject is a minor, consent is sought from a parent, guardian or another person recognized by law as acting on the person's behalf. Religious reflections and beliefs are additionally sensitive by category. The Act's cross-border transfer framework and PDPC permit/registration procedures require a provider-location map before selecting hosting, AI, analytics or support services.

**Current jurisdiction status:** Research in progress. Tanzania is not approved for launch. Mainland/Zanzibar applicability, local privacy, child-protection and IP counsel review remains required.

## 2. Legal-source register and status

| Source | Relevant provisions / subject | Status located | Use |
|---|---|---|---|
| Personal Data Protection Act 2022, Act 11/2022 | scope, definitions, principles, child/minor consent, sensitive data, registration, transfers, security and rights | OAG MIS records commencement 13 June 2023; official PDPC Act PDF located | Binding Union legislation within statutory scope |
| Personal Data Protection (Personal Data Collection and Processing) Regulations 2023, GN 449C/2023 | registration, processing, children, DPIA, security and transfers | OAG MIS records commencement 4 July 2023; PDPC page updated/published 23 March 2026 | Binding subsidiary legislation; confirm current consolidation |
| 2024 Amendment Regulations, GN 808/2024 | amendments to 2023 Regulations | OAG MIS records publication/commencement 13 Sep 2024 | Binding amendment |
| Law of the Child Act 2009, Chapter 13 | child definition, best interests, parental responsibility, custody, foster care and protection | OAG MIS lists revised Act published 25 Apr 2025 | Binding Mainland legislation; Zanzibar-specific law must be separately mapped where relevant |
| Cybercrimes Act 2015, Chapter 443 | cyber offences, unlawful content, investigation/evidence | OAG MIS revised Act record and Government eLibrary copy | Binding legislation; child online-safety applicability requires counsel review |
| Copyright and Neighbouring Rights Act, Chapter 218 | copyright, derivative works, economic rights, licences, folklore and neighbouring rights | OAG MIS revised Act published 25 Apr 2025; revised text labelled R.E. 2023 | Binding Mainland legislation; Zanzibar territorial scope requires separate advice |
| Zanzibar data protection, child welfare and copyright instruments | Non-Union matters and local applicability | Not fully identified in this desk review | Critical research gap |

Primary references:
- Personal Data Protection Act: https://oagmis.oag.go.tz/portal/acts/237
- Official PDPC Act PDF: https://www.pdpc.go.tz/media/media/THE_PERSONAL_DATA_PROTECTION_ACT.pdf
- Personal Data Collection and Processing Regulations: https://oagmis.oag.go.tz/portal/legislation/1350
- 2024 Amendment Regulations: https://oagmis.oag.go.tz/portal/legislation/3833
- PDPC publications page (current publication listing): https://pdpc.go.tz/publications/
- PDPC registration requirements: https://pdpc.go.tz/services/registration/
- Law of the Child Act, revised record: https://oagmis.oag.go.tz/portal/revised-acts/revised/118
- Cybercrimes Act, revised record: https://oagmis.oag.go.tz/portal/acts/89
- Copyright and Neighbouring Rights Act, revised text: https://oagmis.oag.go.tz/portal/acts/revised/322/download

## 3. Territorial scope: Mainland Tanzania and Zanzibar

The Personal Data Protection Act section 2 states that it applies to Mainland Tanzania and Zanzibar, except that in Zanzibar it does not apply to non-Union matters. This is a material boundary. The project must identify whether a particular processing operation relates to a Union or non-Union matter and whether separate Zanzibar laws or authorities apply.

The Act's application provisions also address manual/automated processing and processing by controllers domiciled in the United Republic or processing in the United Republic by a non-domiciled controller/processor, subject to the statutory wording and transit exception. Do not rely on the location of the server alone to determine applicability.

**Proposed control:** the jurisdiction register must represent Mainland Tanzania and Zanzibar as distinct legal subprofiles for non-Union topics. The product must not enable Zanzibar users on the assumption that every Mainland child-protection, copyright or education rule applies identically.

## 4. Children, welfare and consent

### 4.1 Child and minor definitions

The Law of the Child Act 2009 (Chapter 13) is the principal child-rights and welfare statute for Mainland Tanzania. OAG MIS records the revised Act as published 25 April 2025. The Personal Data Protection Act section 3 expressly defines “child” by reference to the Child Act. The Act separately uses “minor” in section 30(4) for representative consent. The precise current text of the revised Child Act and applicable Zanzibar legislation should still be checked by counsel before the product assigns a final age rule.

For the global product baseline, keep under-18 users within the child-protection safeguards until counsel confirms any narrower or different statutory category for a specific purpose. This is a conservative product baseline, not a claim that every Tanzanian legal rule uses the same age definition.

### 4.2 Sensitive-data consent for minors

Section 3 of the Personal Data Protection Act defines sensitive personal data to include **data related to children** and, where processed for what they reveal, religious or philosophical beliefs. This means the sensitive-data regime is relevant to child personal data generally, not only to a child's faith journal. Section 30 provides that sensitive personal data must not be processed without prior written consent of the data subject, subject to statutory exceptions. Where the person from whom consent is sought is a minor, a person of unsound mind or another person unable to consent, consent is to be sought from their parents, guardian, heirs, attorneys or another person recognized by law as acting on their behalf. The provision also lists exceptions to the written-consent prohibition; each exception must be tested against the actual purpose and facts.

Child-related data is expressly within the statutory sensitive-data definition; religious beliefs and private spiritual reflections are also sensitive where processed for what they reveal. Accordingly, the app must assess the section 30 written-consent/representative requirements for child data generally, with an additional purpose-specific review for belief/reflection content. A parent/guardian's consent to a learner account must not be treated as blanket written consent to every sensitive-data use, AI processing, disclosure, analytics, sponsorship report or cross-border transfer.

### 4.3 Best interests, parental responsibility and alternative care

The Law of the Child Act provides for child welfare, best interests, parental responsibility, custody, foster care and alternative care. Product permissions must be based on the actual legal role and mandate, not merely a claimed relationship. A school, church, home, NGO, sponsor, relative or mentor must not receive guardian-level access solely because of its relationship with the learner.

**Proposed controls:**
- Separate identity from legal authority verification.
- Record authority source, type, scope, learner assignment, evidence, reviewer, expiry, dispute and revocation.
- Ask local counsel to map parental responsibility, custody, guardianship, foster care and institutional care separately for Mainland and Zanzibar.
- Provide age-appropriate notices and hear the child's views without undue influence.
- Keep legal authority, account autonomy and spiritual development as separate system concepts.

### 4.4 Child-data DPIA and risk assessment

The Personal Data Protection Act and 2023 Regulations establish obligations for controllers/processors, including risk assessment and security. The Regulations must be reviewed in their complete current form to determine the precise DPIA triggers and required contents. Given the app's child profiles, religious data, family relationships, journals, AI and analytics, the project should require a documented child-data DPIA as a global pre-processing gate irrespective of the narrowest local statutory trigger.

## 5. Sensitive religious data and private reflections

The Act's section 30 is a significant control point for sensitive personal data and prior written consent. The exact definition of sensitive personal data and the complete exceptions must be confirmed from the current consolidated Act and PDPC guidance. The app should not assume that its religious educational purpose creates a broad exemption.

**Proposed controls:**
- Do not infer religion from reading, prayer, search, attendance or engagement.
- Treat prayers, spiritual reflections, private journals and belief disclosures as sensitive/high-risk.
- Use separate, purpose-specific consent and notices where legally required; preserve withdrawal.
- Do not transmit private reflections to AI, analytics, sponsors, institutions or family reports by default.
- Assess any non-profit/religious-body ground only if the operator's legal form and relationship to the data subject satisfy the exact statutory conditions.
- Do not deny general public learning access solely because a household does not identify as Christian.

## 6. Registration, controller/processor obligations and security

The PDPC's official registration page states that a person must not collect or process personal data without being registered with the Commission as a data controller or data processor. It describes different documentary requirements for public institutions, private organizations and NGOs, and identifies the DPO as the person coordinating the registration submission. The operator's legal form is not yet selected/confirmed; registration must be assessed for the actual entity and any processor role.

The Act and Regulations also govern data-subject rights, security, controller/processor responsibilities and breach response. Exact notification deadlines, DPO requirements, records and current prescribed forms should be confirmed against the full current legislation and PDPC guidance before production.

**Proposed controls:**
- Complete PDPC registration before personal-data collection/processing.
- Appoint and document the required data-protection officer/representative function.
- Maintain processing records, privacy notices, rights request process, retention schedule and incident register.
- Execute written controller-processor contracts and review subprocessor chain.
- Encrypt, restrict and log access to learner and reflection data.
- Establish breach triage and regulator/data-subject communication procedures based on the current Act and Regulations.

## 7. Cross-border transfers and hosting

Sections 31–32 regulate transfers to countries with adequate protection and to countries without adequate protection. Section 31 permits transfers to an adequate-protection country subject to the statutory necessity and purpose conditions and a provisional necessity assessment. Section 32 provides additional conditions for other destinations, including an adequacy assessment and specified exceptions (which include consent in the circumstances set out in the section) and permits Commission authorization where appropriate safeguards are demonstrated. The Commission may prohibit a transfer. The PDPC website also exposes a cross-border data-transfer permit service. The precise permit application, destination assessment, onward-transfer and sensitive-data conditions must be confirmed from current regulations and Commission practice.

**Proposed control:** no foreign hosting, AI, analytics, backup, support access or subprocessor data flow until:
1. the applicable Mainland/Zanzibar legal profile is established;
2. PDPC registration status is confirmed;
3. the transfer route/permit and safeguards are confirmed;
4. controller-processor and onward-transfer contracts are executed; and
5. data categories, especially sensitive child religious data, are reviewed separately.

Do not select a cloud region based solely on price or latency. The provider-neutral Phase 00C architecture remains unchanged.

## 8. AI, profiling and automated processing

The present desk review has not completed a clause-by-clause assessment of all automated decision provisions, regulations and PDPC guidance. The product should therefore apply the global safeguard: AI is an assistive learning tool, not a legal, safeguarding or spiritual authority.

- No AI decision about legal capacity, guardian status, safeguarding credibility or access to essential rights.
- No child private journal or belief data sent to model training by default.
- Minimize identifiers and content sent to AI.
- Review provider retention, training, data location and subprocessors.
- Provide understandable notices and human review for consequential outcomes.
- Do not convert engagement or devotional activity into spiritual-worth scores.

## 9. Online safety and child safeguarding

The Cybercrimes Act 2015 (Chapter 443) is an important part of Tanzania's cybercrime and electronic-evidence framework. The Law of the Child Act supplies child-welfare protections. However, this desk review has not completed the full legal mapping of online child sexual exploitation, grooming, harmful content, mandatory reporting, platform/intermediary duties, takedown, evidence preservation or relevant Zanzibar non-Union laws.

The app should not assume that the absence of a single standalone "online safety act" removes obligations under child-protection, criminal, communications or cybercrime legislation.

**Operational controls before launch:**
- Disable open adult-to-child messaging by default.
- Provide child-friendly report, block and escalation tools.
- Establish a safeguarding lead and trained response roles.
- Define incident triage, evidence preservation, local referral and emergency escalation.
- Do not promise absolute confidentiality where a lawful safeguarding disclosure may be required.
- Complete Mainland and Zanzibar legal mapping for reporting and cooperation obligations.

## 10. Copyright and Scripture/content rights

The OAG MIS revised Copyright and Neighbouring Rights Act is Chapter 218, R.E. 2023, with the revised text published 25 April 2025. It contains provisions on protected works, derivative works, economic rights, distribution, moral rights, free use, temporary reproduction, licences and neighbouring rights. The revised text's own copyright notice restricts reproduction/distribution of the OAG publication itself; consult its terms before copying the legislative compilation.

The statutory structure indicates that translation/adaptation, reproduction, distribution and communication must be assessed as separate rights. Section 18 addresses authorization and section 20 licences. The precise scope of each right and exception must be read in full by local IP counsel. Do not assume educational use or a Bible study purpose automatically permits complete digital reproduction or commercial distribution.

**Territorial issue:** Copyright is not necessarily a Union matter. The Mainland Act's application to Zanzibar non-Union matters must not be presumed. Obtain a separate Zanzibar copyright opinion and check applicable Zanzibar instruments before distributing copyrighted material to Zanzibar learners.

The rights inventory must separately identify:
- biblical source text and each translation/edition;
- commentary, introductions, notes and study guides;
- recorded readings, performers, music and sound recordings;
- artwork, images, maps, videos and films;
- API data, database rights, caching and offline access;
- AI input, retrieval, embeddings, training and generated derivatives;
- user uploads and contributor grants.

A licence for display does not imply offline, audio, adaptation, commercial, institutional, AI or sublicensing rights. Record owner, edition, source, territory, permitted acts, quotation limits, attribution, term, expiry, AI permissions and takedown requirements. Public-domain status must be checked separately for Mainland and Zanzibar where the legal regime differs.

## 11. Proposed Tanzania-specific product requirements

| ID | Requirement | Proposed response | Priority |
|---|---|---|---|
| TZ-01 | Mainland/Zanzibar scope split | Maintain separate subprofiles for Union and non-Union matters | Critical |
| TZ-02 | Child/minor age definitions require full confirmation | Conservative under-18 product safeguard pending counsel | Critical |
| TZ-03 | Child-related data is expressly sensitive; sensitive-data prior written consent applies subject to exceptions | Treat child personal data generally as sensitive under the Act's definition; separately record any additional religious-belief processing purpose | Critical |
| TZ-04 | Minor sensitive-data consent by legally recognized representative | Verify parent/guardian/recognized authority and scope | Critical |
| TZ-05 | PDPC registration before processing | Entity classification and registration gate | Critical |
| TZ-06 | Current 2023 Regulations and 2024 amendment | Reconcile with current PDPC publication and Gazette status | Critical |
| TZ-07 | Cross-border permit/safeguards | No foreign data flow until PDPC route and contracts confirmed | Critical |
| TZ-08 | Child welfare and alternative care | Mainland/Zanzibar care and authority mapping | High |
| TZ-09 | Online safety and mandatory reporting | Complete cybercrime/child-protection operational legal map | Critical |
| TZ-10 | Mainland copyright may not resolve Zanzibar rights | Separate Zanzibar copyright clearance | Critical |
| TZ-11 | Rights differ by text, translation, audio and media | Item-level licence registry | Critical |
| TZ-12 | AI and profiling duties need full legal review | Human review, minimization, no spiritual/authority decisions | High |

## 12. Proposed Tanzania acceptance tests

| ID | Scenario | Expected result |
|---|---|---|
| TZ-AT-001 | Learner located in Mainland Tanzania creates a personalized account | Applicable PDPA and Law of the Child requirements are evaluated before personal-data processing |
| TZ-AT-002 | Learner located in Zanzibar uses a non-Union subject feature | Zanzibar-specific law review is required; Mainland-only rule is not silently assumed |
| TZ-AT-003 | Operator cannot determine whether a matter is Union or non-Union | Affected processing/market feature remains blocked pending legal classification |
| TZ-AT-004 | Minor's sensitive religious data is collected | Prior written consent/recognized representative and all applicable statutory grounds are validated |
| TZ-AT-005 | Parent consents to account but not optional AI/reflection processing | Optional purposes remain disabled |
| TZ-AT-006 | Caregiver claims authority without evidence | No guardian-level permission or consent status is granted |
| TZ-AT-007 | Operator has not completed PDPC registration | Personal-data collection/processing is blocked |
| TZ-AT-008 | Vendor proposes foreign storage or AI processing | Applicable cross-border permit, safeguards and contracts are confirmed before transfer |
| TZ-AT-009 | PDPC regulations or amendment version is unclear | Counsel/regulator validation is required before controls are marked final |
| TZ-AT-010 | Child-data DPIA has not been completed | Child profile, sensitive reflection and AI features remain blocked under the project baseline |
| TZ-AT-011 | Child reports grooming, abuse or exploitation | Child-safe reporting and Mainland/Zanzibar escalation procedure is followed |
| TZ-AT-012 | App enables adult-to-child direct messaging | Test fails unless separately justified, safeguarded and approved |
| TZ-AT-013 | Bible translation is licensed for Mainland Tanzania only | Content is withheld from Zanzibar until separate territorial rights are cleared |
| TZ-AT-014 | App caches translation for offline use | Offline reproduction is disabled unless licence expressly authorizes it |
| TZ-AT-015 | AI uses a translation or commentary as prompt/context | AI-input and derivative permissions are verified separately from display rights |
| TZ-AT-016 | Audio recording is available | Underlying text, performer, producer and sound-recording rights are all cleared |
| TZ-AT-017 | Sponsor or institution requests private journal | Access is denied by default; sponsorship/institution status does not create guardian authority |

## 13. Legal questions requiring Tanzanian counsel

1. Confirm current PDPA consolidated text, 2023 Regulations, 2024 amendments and legal effect of the PDPC's 23 March 2026 publication/republication.
2. Confirm the statutory definition of minor/child and its interaction with the Law of the Child Act and Zanzibar laws for each processing purpose.
3. Determine the exact Union/non-Union boundary for data protection, child welfare, online safety, copyright, education and digital services.
4. Confirm whether and how the PDPA applies to foreign operators serving Mainland and Zanzibar users.
5. Confirm controller/processor registration, DPO, fees, renewal, foreign entities and registration-before-processing requirements.
6. Confirm all lawful bases and the full section 30 sensitive-data exceptions for religious/belief/reflection content, especially for minors.
7. Confirm evidence and scope of parental, guardian, foster, kinship, institutional and other representative authority.
8. Confirm DPIA triggers and required contents for child data, sensitive data, AI, family access and profiling.
9. Confirm cross-border permit process, adequacy/safeguards, consent, onward transfers and data-localization obligations.
10. Confirm breach-notification deadlines, data-subject notice and incident handling.
11. Identify current Mainland and Zanzibar child-online-safety, mandatory reporting, cybercrime, communications and platform obligations.
12. Confirm Mainland and Zanzibar copyright laws, amendments, translation rights, educational exceptions, online display, offline caching, audio and AI uses.
13. Confirm consumer, subscription, advertising, payments and education-sector requirements.

## 14. Unresolved dependencies and defects

- **PS-01 / identity:** production identity and authority workflow absent.
- **PS-02 / journal:** no real encryption/storage evidence; do not collect child reflections.
- **PS-06 / access:** server-side resource authorization not demonstrated.
- **PS-07 / content:** item-level Bible and media licences unverified.
- **PS-08 / AI:** provider data flows and child-safety controls unverified.
- **PS-11 / jurisdiction:** Mainland/Zanzibar applicability and counsel review remain open.
- **PS-12 / rights:** rights inventory and territory-specific licence matrix incomplete.
- **PS-13 / safeguarding:** online reporting and mandatory-reporting procedures not mapped.
- **PS-14 / transfers:** hosting, AI, analytics and support locations remain unknown.
- **TZ-OPEN-01:** 2026 PDPC publication/republication and current consolidated Regulations require Gazette reconciliation.
- **TZ-OPEN-02:** Zanzibar non-Union child, privacy, online-safety and copyright law mapping incomplete.
- **TZ-OPEN-03:** full cross-border permit and breach-notification procedure requires counsel/PDPC confirmation.

## 15. Tanzania assessment disposition

**Status: Research in progress — not counsel reviewed — not launch approved.**

The assessment identifies clear design gates for registration, sensitive-data authorization, cross-border review and a Mainland/Zanzibar split. The exact child/minor definitions, current regulatory consolidation, Zanzibar non-Union laws and detailed online-safety duties remain material open issues. No application source, UI, infrastructure, database schema or Phase 00C architecture was changed.
