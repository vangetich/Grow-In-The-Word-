# Architecture Reconciliation Matrix

Preliminary mapping of the fourteen-phase roadmap to inspected repository evidence.

| Phase | Intended capability | Observed baseline | Status / gap |
|---|---|---|---|
| 0 | Project Sentinel audit | Initial static audit and documentation branch | In progress |
| 1 | Core architecture and onboarding | JourneyOnboardingModal; simulated sign-in/payload behavior | Partial; real identity unverified |
| 2 | Bedtime Shepherd ages 3–7 | BedtimeShepherd, Phase2 flow, ZeroGlowPlayer, MorningBridge | UI present; persistence/content rights need validation |
| 3 | Ancient Archive ages 8–12 | AncientArchiveExplorer, InteractiveHistoricalTimeline | UI present; content and learning model need validation |
| 4 | Teen experience ages 13–17 | TeenSafeHarborPhase4, PrivateJournalingVault | UI present; encryption/privacy claims unsupported by inspected implementation |
| 5 | Technical/family governance | Phase5ArchitectureAndParentPortal and admin UI | Partial/demo; server authorization and consent unverified |
| 6 | Central Growth Record | Independent page-level growth state; no central service/schema identified | Missing in inspected baseline; foundational |
| 7 | Bible Study & Reading Studio | BibleStudyReadingStudio, FullPageBibleReader, full-bible-data | UI/data present; licensing and provenance need review |
| 8 | Spiritual Growth Engine | Growth/milestone interfaces | Partial; no verified formation domain engine |
| 9 | Biblical World Explorer | Historical explorer/timeline | Partial; sourcing and scope need validation |
| 10 | Wisdom & Life Application | Some reflection/emotional-entry UI | Partial; curriculum/safeguarding review needed |
| 11 | AI Biblical Companion | Google GenAI dependency | End-to-end behavior, safety and data boundaries unverified |
| 12 | Adult Study 18+ | No dedicated adult route identified in inspected inventory | Not identified; verify full tree |
| 13 | Personal Growth & Engagement | Growth tracker, D3/Recharts components | Partial; fragmented state and metrics |
| 14 | Trust, Safety & Governance | UI-level privacy concepts and admin screens | Enforceable governance not established |

“UI present” means reusable presentation/interaction code was identified, not that the capability is complete or production-ready. “Not identified” is limited to inspected inventory and does not rule out external services.

Cross-cutting dependency: identity → authorization/consent → durable data model → Central Growth Record → module integration → analytics/AI projections. Governance applies throughout.
