# Component Inventory

Initial list of candidate reusable assets. Presence does not certify completeness or security.

| Component / asset | Domain | Proposed treatment |
|---|---|---|
| JourneyOnboardingModal.tsx | Onboarding/identity UI | Preserve UI; replace simulated auth with identity adapter |
| BedtimeShepherd.tsx | Ages 3–7 | Preserve; integrate learning/activity contracts |
| BedtimeShepherdPhase2Flow.tsx | Ages 3–7 | Preserve; review progression/state ownership |
| MorningBridge.tsx | Ages 3–7 | Preserve; connect to authorized continuity data |
| ZeroGlowPlayer.tsx | Bedtime audio | Preserve; review accessibility and content rights |
| AncientArchiveExplorer.tsx | Ages 8–12 | Preserve; separate content model from presentation |
| InteractiveHistoricalTimeline.tsx | History | Preserve; validate sourcing and citations |
| TeenSafeHarborPhase4.tsx | Teen experience | Preserve visual concepts; audit privacy claims |
| PrivateJournalingVault.tsx | Private reflection | Prototype until encryption, key management and persistence are real |
| ReflectionJournalOverlay.tsx | Reflection UI | Preserve; enforce privacy classification in service layer |
| Phase5ArchitectureAndParentPortal.tsx | Family/mentor | Preserve UI; replace demo controls with policy-enforced APIs |
| BibleStudyReadingStudio.tsx | Bible study | Preserve; review scripture source and translation metadata |
| FullPageBibleReader.tsx | Bible reading | Preserve; standardize canonical references |
| lib/full-bible-data.ts | Scripture content | Audit provenance, licensing and version metadata |
| LongitudinalGrowthSeedSection.tsx | Growth UI | Preserve as projection, not data authority |
| GrowthHistoryD3Chart.tsx | Analytics | Preserve as read-only visualization |
| WeeklyEngagementRecharts.tsx | Analytics | Preserve as read-only visualization |
| GrowthTrackerModal.tsx | Growth UI | Connect to Central Growth Record read model |
| SanctuaryDashboardBar.tsx / Navbar.tsx | Navigation | Preserve; review accessibility/responsive behavior |
| FeatureAtlasModal.tsx | Product discovery UI | Preserve |
| lib/design-spec-data.ts | Design configuration | Preserve; document ownership/versioning |
| lib/useFocusTrap.ts | Accessibility utility | Preserve; test keyboard/focus behavior |

Components remain experience boundaries. They must not independently define identity, access rights, durable history or authoritative mastery. Domain operations go through typed application services.
