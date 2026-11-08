# Architecture Reconciliation Matrix

Evidence-backed mapping of the fourteen-phase roadmap to the complete tracked repository tree and selected source review. Detailed evidence is in PHASE_00B_EVIDENCE_VERIFICATION.md.

| Phase | Intended capability | Observed evidence | Status / gap |
|---|---|---|---|
| 0 | Project Sentinel audit | Complete 75-file tree and static evidence report | Static pass complete; runtime/provider evidence outstanding |
| 1 | Core architecture and onboarding | JourneyOnboardingModal.tsx L125-L220: client validation and timed handoff | UI prototype; real identity/account persistence not verified |
| 2 | Bedtime Shepherd ages 3–7 | BedtimeShepherd.tsx, BedtimeShepherdPhase2Flow.tsx, ZeroGlowPlayer.tsx, MorningBridge.tsx | Experience UI present; actual audio cache/offline behavior unverified |
| 3 | Ancient Archive ages 8–12 | AncientArchiveExplorer.tsx, InteractiveHistoricalTimeline.tsx | Experience UI present; source quality and learning outcomes need validation |
| 4 | Teen experience ages 13–17 | TeenSafeHarborPhase4.tsx L175-L215/L315-L350; PrivateJournalingVault.tsx L70-L145 | UI present; journal encryption/privacy guarantees unsupported by inspected code |
| 5 | Technical/family governance | Phase5ArchitectureAndParentPortal.tsx; AdminBackendMaintenanceSection.tsx L254-L285 | Presentation/demo only; server authorization/consent not verified |
| 6 | Central Growth Record | app/growth-tracker/page.tsx L14-L38; app/bible-reader/page.tsx L14-L35; app/timeline/page.tsx L14-L30 | No central service/schema identified; route-local state confirms need, but schema design gated on identity/storage choices |
| 7 | Bible Study & Reading Studio | BibleStudyReadingStudio.tsx; FullPageBibleReader.tsx; full-bible-data.ts | UI/data present; translation provenance/licensing and complete canon coverage need review |
| 8 | Spiritual Growth Engine | Growth/milestone and reflection interfaces | Partial UI; no verified formation domain engine; avoid spiritual-worth scoring |
| 9 | Biblical World Explorer | Ancient Archive and historical timeline | Partial UI; historical sourcing and citation standards need validation |
| 10 | Wisdom & Life Application | SemanticSearchSection.tsx and reflection/emotional-entry content | Content/UI foundation; no verified adaptive wisdom engine |
| 11 | AI Biblical Companion | @google/genai dependency and GEMINI_API_KEY placeholder | Active call site/runtime not verified; do not claim operational AI |
| 12 | Adult Study 18+ | No dedicated adult route identified in complete tracked tree | Not identified in repository; product scope and adult privacy model need decision |
| 13 | Personal Growth & Engagement | Growth tracker, D3/Recharts charts and local route-level state | UI present; metrics are not centralized or validated learning outcomes |
| 14 | Trust, Safety & Governance | UI-level privacy concepts/admin screens; no API/service layer in tracked tree | Enforceable governance not established; release blocker for real teen data |

“UI present” means reusable presentation/interaction code was identified, not that capability is complete, persistent or production-ready. “Not identified” is limited to the repository and does not rule out external services.

Cross-cutting dependency: identity → authorization/consent → durable storage → Central Growth Record → module integration → analytics/AI projections. Governance applies throughout.
