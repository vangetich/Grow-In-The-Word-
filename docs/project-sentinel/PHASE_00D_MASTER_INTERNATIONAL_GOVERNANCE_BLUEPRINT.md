# Project Sentinel — Phase 00D: Master International Governance Blueprint

**Project:** Grow In The Word  
**Milestone:** Phase 00D — International Legal, Child Protection & Intellectual Property Governance Architecture  
**Status:** Initial architecture proposal; owner review and qualified jurisdiction-specific legal review required  
**Baseline branch:** `project-sentinel/phase-00-audit`  
**Phase 00D branch:** `project-sentinel/phase-00d-international-governance`  
**Scope:** Documentation and requirements only. No application source, runtime configuration, production infrastructure, database schema or user data is changed.

## 1. Executive purpose

Grow In The Word is intended to serve learners across multiple countries, including children and teenagers. It is an explicitly Christian biblical learning and spiritual formation product. Its international expansion must therefore be governed by a coherent system for child protection, privacy and data protection, legal authority and consent, copyright and licensing, AI use, third-party providers, and market launch decisions.

Phase 00D establishes the governance architecture needed to evaluate and manage those obligations before implementation or launch. It does not certify legal compliance, replace local counsel, or imply that the application is ready to onboard minors internationally.

## 2. Governing design principle

**One global baseline of care, with jurisdiction-specific legal requirements applied wherever they are relevant.**

The global baseline is a product and engineering commitment. Applicable law is determined separately for each processing activity, service, user, territory and operational relationship. Where local law or a binding regulatory requirement is stricter than the global baseline, the stricter applicable requirement governs. Where legal rules conflict or applicability is uncertain, the affected processing or market must be held for qualified review rather than resolved through guesswork.

No single country's age threshold, consent rule, definition of guardian, retention period or copyright exception may be hardcoded as a universal rule.

## 3. Scope and explicit exclusions

### In scope
- Global child-rights and safeguarding principles.
- Privacy and personal-data governance for children and adults.
- Jurisdiction applicability assessment and legal-rule lifecycle.
- Age assurance, child assent, parental/guardian authorization and authority evidence.
- Progressive autonomy and care pathways.
- Sensitive belief and religious-reflection data safeguards.
- AI and third-party processor governance.
- International data transfers, residency and retention assessments.
- Copyright, content provenance, licence scope and permitted-use controls.
- Governance roles, evidence, auditability, risk acceptance and market launch gates.
- Testable requirements and assurance evidence.

### Out of scope for Phase 00D
- Editing application source code, UI, routes, components or existing learning modules.
- Implementing authentication, authorization, age verification or a jurisdiction rules engine.
- Selecting a final cloud provider, identity provider, database or data-residency topology.
- Creating a physical database schema or migrations.
- Importing, collecting or processing real child or learner data.
- Enabling real private journals, child-specific AI processing, institutional access or sponsor access.
- Reproducing or distributing Bible translations, commentaries, books, audio, images or other content without documented rights.
- Declaring the product compliant in any country or authorizing a public launch.

## 4. Relationship to existing architecture

Phase 00D extends governance requirements around the existing Phase 00C provider-neutral architecture. It does not replace or silently revise that architecture.

The following Phase 00C directions remain candidates or proposals, not final production decisions:
- Google Cloud Run is a leading hosting candidate for evaluation, not a selected production host.
- Managed PostgreSQL is a leading transactional database candidate, not an approved database deployment.
- A modular monolith is the proposed initial backend shape.
- The Central Growth Record remains a proposed authoritative domain service; its physical schema is deferred.
- Hybrid role-, attribute- and relationship-based authorization remains proposed pending security and legal review.
- Private journal content remains separated from ordinary growth records, analytics, family projections and AI context.
- Existing UI should be preserved and existing mock behavior replaced incrementally behind approved service contracts, not by wholesale redesign.

Phase 00D may add governance requirements and identify dependencies, but changes to Phase 00C domain boundaries or service contracts require an explicit decision-register amendment and owner approval.

## 5. Governance principles

1. **Best interests and dignity of the child:** child safety, rights and developmental needs are primary design considerations.
2. **Privacy by default:** collect the minimum data needed for a stated, lawful purpose; default child experiences to high privacy.
3. **Purpose limitation:** data collected for learning continuity must not silently become advertising, profiling, sponsor reporting, religious targeting or model-training data.
4. **Meaningful transparency:** provide clear, age-appropriate explanations to learners and understandable notices to parents, guardians and other authorized adults.
5. **Authority is evidenced and scoped:** family relationship, job title, church role, sponsorship or institutional affiliation alone does not establish legal authority.
6. **Progressive autonomy:** legal authority, account autonomy and spiritual development remain distinct dimensions.
7. **No spiritual-worth scoring:** no score or inference about holiness, salvation, divine favour, spiritual worth or God's approval.
8. **No coercive religious targeting:** disclose the Christian purpose honestly; do not infer a child's beliefs from behavior or use personal data to pressure religious participation.
9. **Least privilege:** each actor receives only the minimum permissions required for a verified purpose and time period.
10. **Safety before personalization:** if required legal authority, consent, safeguards or provenance are missing, restrict the affected personal-data processing.
11. **Rights before convenience:** deletion, access, correction, objection, portability and other applicable rights must be assessed and handled through lawful processes.
12. **Evidence before claims:** do not describe a feature as encrypted, private, compliant, licensed, age-verified or secure without testable evidence.
13. **Territorial copyright discipline:** permission must cover the actual work, use, technology, territory, audience and commercial context.
14. **Human accountability:** AI and automation do not replace safeguarding professionals, legal counsel or authorized human decision-makers.

## 6. Governance system architecture

The existing Trust, Safety & Governance Engine should contain a proposed International Governance subsystem with the following logical capabilities. These are domain responsibilities, not an instruction to create microservices.

### 6.1 Jurisdiction and legal-rules registry
Maintain versioned jurisdiction profiles, applicability notes, legal sources, effective dates, responsible reviewer, unresolved questions, impacted processing activities and review dates. Rules must be machine-readable only after legal interpretation and approval; unreviewed research notes must never be treated as executable policy.

### 6.2 Child protection and safeguarding
Define prohibited conduct, age-appropriate product controls, reporting and escalation routes, moderation standards, abuse-response responsibilities, staff/volunteer screening where applicable, evidence handling, emergency escalation and safeguarding incident review. Country-specific mandatory reporting and child-protection duties require local legal validation.

### 6.3 Privacy, data protection and consent
Maintain data inventories, purposes, lawful bases, notices, consent/authorization records, retention schedules, data-subject rights procedures, privacy impact assessments, processor records, incident response and international transfer assessments.

Consent is not a universal substitute for identifying another lawful basis. The legal basis, parental/guardian authorization, child assent, notice and other safeguards must be evaluated separately for each processing purpose and jurisdiction.

### 6.4 Identity, authority and progressive autonomy
Reuse the Phase 00C Learner Identity, Progressive Autonomy & Care Pathway. Authority states should be explicit and time-bounded: unverified, submitted/pending review, verified, expired, revoked, disputed, or rejected. Each relationship must carry evidence provenance, scope, effective period, reviewer and revocation history. Collect the least sensitive evidence sufficient for the jurisdiction and context; avoid retaining identity documents where a verified decision record is enough.

Support parent, legally appointed guardian, authorized kinship/foster caregiver, institutional representative acting under a documented mandate, and no-verified-caregiver pathways. A sponsor, donor, church leader, teacher or mentor is not a guardian by default.

### 6.5 Sensitive belief and reflection data
Treat religious beliefs, inferred religious affiliation and private spiritual reflections as high-sensitivity data for product governance. Do not infer religious identity from reading behavior, prayer use, search history or engagement. Keep private journal bodies outside the Central Growth Record, ordinary analytics, family projections, sponsor reports and AI context by default. Any proposed exception requires documented necessity, legal basis, explicit purpose, safeguards, retention limits and independent approval.

### 6.6 AI and third-party provider governance
For each model, API, analytics tool, hosting provider, notification provider, content API and subcontractor, document:
- Provider identity, role and processing locations.
- Data categories and purposes disclosed.
- Retention, training, human review and secondary-use terms.
- Contractual data-processing terms and subprocessors.
- Security and incident obligations.
- International transfer mechanism where required.
- Child-specific suitability and age restrictions.
- Deletion and access support.
- Model/content rights and output restrictions.

No child data may be sent to an AI provider merely because a model integration is technically available. Each use case requires purpose-specific approval and data minimization. Journal content is excluded by default.

### 6.7 Copyright, content provenance and licensing
Maintain a rights registry for every third-party content class and each material item used in the product. Record rights owner, source, work/edition, licence evidence, territory, audience, permitted formats, quotation limits, attribution, modification, commercial use, offline use, audio use, AI input/output use, expiry and takedown conditions.

Treat the underlying biblical source text, a modern translation, editorial apparatus, commentary, audio recording, performance, artwork and database/API delivery terms as distinct rights objects. Public-domain status must be checked for the relevant jurisdiction and edition. A general permission to quote or display content does not automatically grant rights for AI prompts, model training, embeddings, generated derivative materials, audio, offline downloads or commercial distribution.

### 6.8 Data location and international transfers
Map where data is collected, transmitted, stored, backed up, accessed by support staff, processed by AI providers and disclosed to subprocessors. Assess transfer restrictions and required safeguards per jurisdiction. Data residency is not presumed to be satisfied merely because the primary database is in a particular region.

### 6.9 Governance evidence and audit
Keep a traceable evidence chain linking each requirement to:
- Applicable jurisdiction and legal source.
- Product purpose and data category.
- Approved policy/rule version.
- Design and implementation control.
- Test case and result.
- Reviewer and approval date.
- Exceptions, compensating controls and expiry.
- Incident, complaint or regulatory change where relevant.

Do not place raw child data, journal text, identity documents or secrets in compliance logs.

## 7. Global baseline requirements

The following are proposed product requirements to be applied unless a stricter applicable rule requires more:

### Children and safety
- Age-appropriate content, interface, defaults and explanations.
- No behavioral advertising or sale of child personal data.
- No unrestricted direct messaging between unknown adults and children.
- Clear reporting and escalation pathways.
- No manipulative engagement mechanics, coercive streak penalties or exploitative purchase prompts directed at children.
- No public exposure of a child's full name, precise location, private reflections or learning profile by default.
- No child asked to resolve uncertain guardian authority by uploading sensitive legal records directly.
- Public non-personalized learning access may be considered for unaccompanied children only after a jurisdiction-specific assessment; it must not be used to bypass child-data requirements.

### Privacy and data
- Maintain a data inventory and purpose-to-data map.
- Minimize collection and use privacy-preserving age assurance where appropriate.
- Separate learner identity, legal representative, account autonomy, consent and resource permission.
- Use server-side resource-level authorization for protected data.
- Default private reflections and journal bodies to excluded from analytics and AI.
- Define retention and deletion for every personal-data category.
- Provide rights workflows and a documented exception process.
- Conduct a data protection impact assessment or equivalent high-risk assessment where required and as a global baseline for high-risk child-data processing.

### Family, institutions and sponsors
- Parent/guardian access is scoped, transparent and policy-based, not blanket.
- Institutional representatives see only assigned learners and expressly authorized data.
- Sponsors receive no guardian authority and no private learner data by virtue of funding.
- Mentors and church leaders receive no access without a separate verified and authorized basis.
- Authority expires, can be revoked and can be disputed.
- Adult transition at the applicable legal age requires a controlled review; the Phase 00C age-18 proposal is not a universal legal rule.

### AI
- No AI processing of child personal data without approved purpose, legal basis, age/guardian controls where required, provider review and documented safeguards.
- No model training on learner data by default.
- No use of private journal content by default.
- No AI claims of divine authority or fabricated scripture citations.
- AI outputs must distinguish Bible text, paraphrase, interpretation, disputed interpretation and factual claims.
- Escalate disclosures of imminent harm or abuse according to a legally reviewed safeguarding protocol; do not promise confidentiality that cannot lawfully be maintained.

## 8. Jurisdiction applicability method

For every market and processing activity, complete a documented assessment in this order:

1. Identify the service, entity, user groups and territorial connections.
2. Identify the activity: account creation, learning progress, journal, AI, analytics, communications, payments, content distribution, sponsorship or support.
3. Identify data categories, including child data, sensitive data, belief-related data, identifiers and device/location data.
4. Identify applicable laws, regulators, guidance, codes, effective dates and territorial scope.
5. Determine age definitions, consent rules, legal bases, parental/guardian requirements, child assent, age assurance and rights.
6. Determine safeguarding, online safety, reporting, advertising, consumer and accessibility obligations.
7. Determine international transfer, localization, processor and breach-notification obligations.
8. Determine copyright and content licensing restrictions for each relevant work and use.
9. Map legal requirements to product controls and test cases.
10. Obtain qualified local legal review and owner approval.
11. Record residual risks, launch restrictions, review date and change triggers.

A country is not launch-approved merely because a high-level legal summary exists.

## 9. Jurisdiction profile status model

Each jurisdiction profile must use one of these statuses:
- **Not assessed:** no structured legal assessment completed.
- **Research in progress:** sources collected; applicability and interpretation incomplete.
- **Counsel review required:** material questions require qualified local advice.
- **Controls specified:** requirements mapped to design and tests; implementation evidence may still be absent.
- **Implementation verified:** applicable controls have test evidence.
- **Approved for limited launch:** documented scope, restrictions, operational readiness and approvals exist.
- **Approved for launch:** all required legal, safeguarding, rights, technical and operational gates are evidenced.
- **Suspended:** new information or failure requires launch or processing pause.

Statuses must never be inferred from a country's inclusion in a roadmap or from another country's approval.

## 10. Copyright and content-rights decision model

Each content item or collection must be classified:
- Owned and documented.
- Licensed with verified scope.
- Public domain in specified territories and editions, with evidence.
- Openly licensed with conditions verified.
- User-supplied with rights and permissions assessed.
- Unverified or disputed.
- Prohibited / licence expired / withdrawn.

Only the first four categories may be considered for distribution, and only within the exact permitted scope. User-supplied material is not automatically cleared for redistribution. Unverified, disputed, expired or prohibited content must be withheld from the affected use until resolved.

The registry must separately assess display, quotation, adaptation, translation, audio, download/offline, commercial use, AI input, model training, embeddings, generated derivatives and sublicensing.

## 11. Governance ownership and separation of duties

The project must assign named accountable people or qualified external roles before launch:
- Product owner: approves product purpose, risk appetite and market scope.
- Privacy lead / DPO where legally required: oversees privacy obligations and DPIAs.
- Child safeguarding lead: owns safeguarding policy, escalation and incident handling.
- Local legal counsel: advises on country-specific law and launch conditions.
- IP/copyright counsel or rights manager: validates licences and permitted uses.
- Security lead: validates access controls, security, incident response and evidence.
- Engineering owner: implements approved controls and maintains traceability.
- Content editor / theological reviewer: reviews biblical accuracy, attribution and interpretive clarity.

One person may hold multiple roles in an early-stage project only where lawful and operationally appropriate, but approval of high-risk exceptions should not be self-certified by the implementer.

## 12. Risk and exception management

Every unresolved issue must have an ID, severity, affected jurisdiction/data/use, evidence, owner, mitigation, decision authority, review date and closure test. Critical child-safety, unlawful processing, unlicensed distribution or unauthorized-access risks block the affected feature or market. Exceptions must be narrow, time-limited, documented and supported by compensating controls. No exception may waive a statutory right or legal requirement.

## 13. Required downstream artefacts

Phase 00D will establish or commission:
1. International child protection and safeguarding standard.
2. Global child privacy and data protection requirements.
3. Jurisdiction and age-assurance rules specification.
4. Guardian authority, consent and progressive-autonomy requirements.
5. Scripture rights and licensing registry.
6. Global content copyright and provenance policy.
7. AI data-use and content-rights policy.
8. Third-party processor and international transfer assessment.
9. International jurisdiction compliance matrix.
10. Legal change monitoring register.
11. Global compliance acceptance test plan.
12. Child privacy threat model and DPIA requirements.
13. International launch readiness checklist.
14. International governance defect and decision registers.

These artefacts may be staged; this blueprint does not claim that all are complete.

## 14. Phase 00D exit criteria

Phase 00D may close only when:
- The global baseline is owner-reviewed.
- Priority launch jurisdictions are selected or explicitly deferred.
- Jurisdiction research is recorded with authoritative sources and uncertainty labels.
- Each high-risk processing purpose has a data map, legal-review question set and proposed controls.
- The authority, consent, age-assurance and progressive-autonomy model is reconciled with Phase 00C.
- The copyright registry model covers all known content types and AI/offline/territorial uses.
- Third-party and international transfer assessment requirements are defined.
- Acceptance tests are traceable to requirements and have clear expected outcomes.
- Open risks and dependencies are entered in the continuing defect register.
- No source code or Phase 00C architecture was changed without explicit approval.
- Owner approves the resulting design package and any transition to implementation planning.

Phase 00D exit is not a legal compliance certification, security certification or launch approval. Country launch approval is a separate gate.

## 15. Non-claims and legal notice

This document is an architecture and governance proposal, not legal advice. It does not determine the applicability or interpretation of any law, prove that a control is implemented, or establish that Grow In The Word is compliant in any country. Qualified local counsel and appropriate child-safeguarding specialists must review the relevant markets and processing activities before onboarding minors or launching. Regulatory guidance and law must be rechecked for current status at the time of implementation and launch.

## 16. Initial reference framework

The following are starting points for legal research, not an exhaustive or current legal opinion:
- UN Convention on the Rights of the Child.
- EU General Data Protection Regulation and relevant member-state rules.
- UK GDPR, Data Protection Act 2018 and ICO Age Appropriate Design Code.
- US Children's Online Privacy Protection Act and implementing rule.
- Kenya Data Protection Act 2019, Children Act 2022 and ODPC guidance on children's data.
- Relevant national data protection, child protection, online safety, consumer and copyright laws in each target market.
- WIPO Berne Convention and national copyright legislation.
- Applicable publisher-specific Bible translation and content licences.

All sources must be checked for current version, commencement, amendments, territorial scope and applicability during jurisdiction assessment.
