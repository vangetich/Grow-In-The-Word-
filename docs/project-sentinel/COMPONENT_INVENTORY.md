# Component Inventory

Candidate reusable assets and evidence-based treatment. Presence does not certify completeness, security or production readiness.

| Component / asset | Domain | Evidence / proposed treatment |
|---|---|---|
| JourneyOnboardingModal.tsx | Onboarding/identity UI | L125-L220 shows simulated handoff; preserve UI, replace with real identity service |
| BedtimeShepherd.tsx | Ages 3–7 | Preserve; verify audio assets, bookmarks and offline claims |
| BedtimeShepherdPhase2Flow.tsx | Ages 3–7 | Preserve; review progression/state ownership |
| MorningBridge.tsx | Ages 3–7 | Preserve; connect to authorized continuity data |
| ZeroGlowPlayer.tsx | Bedtime audio | Preserve; verify real media sources, cache lifecycle and accessibility |
| AncientArchiveExplorer.tsx | Ages 8–12 | Preserve; separate content model from presentation |
| InteractiveHistoricalTimeline.tsx | History | Preserve; validate sourcing, dates and citations |
| TeenSafeHarborPhase4.tsx | Teen experience | Preserve visual concepts; replace unsupported privacy/encryption claims |
| PrivateJournalingVault.tsx | Private reflection | L70-L145 uses React state, seeded content and mock ciphertext; prototype only until genuine security/persistence |
| ReflectionJournalOverlay.tsx | Reflection UI | Preserve UI; inspect sentiment/analysis copy and enforce privacy at service layer |
| Phase5ArchitectureAndParentPortal.tsx | Family/mentor | Preserve UI; firewall behavior shown in presentation needs real policy-enforced APIs |
| AdminBackendMaintenanceSection.tsx | Admin UI | L254-L285 is a client-side demo gate; do not connect privileged operations |
| BibleStudyReadingStudio.tsx | Bible study | Preserve; review scripture source, original-language claims and translation metadata |
| FullPageBibleReader.tsx | Bible reading | L162-L287 stores reader progress/preferences locally; standardize canonical references |
| lib/full-bible-data.ts | Scripture content | L31-L82 lists five translations without visible source/licence metadata; audit provenance and rights |
| DailyPrayerModal.tsx | Prayer petitions | L105-L165 uses localStorage; decide privacy, retention and account sync semantics |
| NetworkStatusIndicator.tsx | Offline status | L35-L70 writes a localStorage marker; offline cache claim is not substantiated |
| SemanticSearchSection.tsx | Scripture discovery | Preserve search UI; validate whether index is static/local and avoid claims of AI semantics absent evidence |
| LongitudinalGrowthSeedSection.tsx | Growth UI | Preserve as projection, not data authority |
| GrowthHistoryD3Chart.tsx | Analytics | Preserve as read-only visualization over validated projections |
| WeeklyEngagementRecharts.tsx | Analytics | Preserve as read-only visualization |
| GrowthTrackerModal.tsx | Growth UI | Connect to Central Growth Record read model |
| SanctuaryDashboardBar.tsx / Navbar.tsx | Navigation | Preserve; review accessibility/responsive behavior |
| FeatureAtlasModal.tsx | Product discovery UI | Preserve |
| lib/design-spec-data.ts | Design configuration | Preserve; document ownership/versioning |
| lib/useFocusTrap.ts | Accessibility utility | Preserve; test keyboard/focus behavior |

## Integration rule
Components remain experience boundaries. They must not independently define identity, access rights, durable history or authoritative mastery. Domain operations go through typed application services.
