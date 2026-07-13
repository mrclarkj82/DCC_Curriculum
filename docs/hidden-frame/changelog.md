# Hidden Frame Changelog

## Phase 10 - 2026-07-13

- Added admin-only `/hidden-frame/expansion` behind the existing admin route guard.
- Added expansion manifest data in `hiddenFrameExpansionManifest.ts`.
- Added reusable components: `ExpansionSafetyPanel`, `ExpansionChecklist`, and `AssetRequestList`.
- Added `docs/hidden-frame/extension-guide.md` for future content expansion.
- Added `docs/hidden-frame/asset-requests.md` for future asset request tracking.
- Expanded `npm run validate:hidden-frame` with Phase 10 checks for admin guard, manifest coverage, answer-free tooling, docs, and CSS.
- Updated spec, canon, progress, roadmap, and acceptance criteria.

## Phase 9 - 2026-07-13

- Added `/hidden-frame/final-export` for the final prerequisite gate.
- Added `/hidden-frame/frame-000` for the Frame 000 reveal.
- Added final prerequisite data in `hiddenFrameFinalExport.ts`.
- Added Frame 000 / `FINAL EXPORT` to the frame collection data.
- Added reusable components: `FinalExportPanel` and `Frame000Reveal`.
- Added local Frame 000 recovery after the prerequisite frame set is complete.
- Expanded `npm run validate:hidden-frame` with Phase 9 checks for routes, prerequisites, Frame 000, final copy, and CSS.
- Updated spec, canon, progress, roadmap, and acceptance criteria.

## Phase 8 - 2026-07-13

- Added `/hidden-frame/compression` for the first safe Compression event route.
- Added structured Compression log data in `hiddenFrameCompressionLogs.ts`.
- Added reusable components: `GlitchText`, `RedactedText`, `CompressionWarningPanel`, and `CorruptedFileCard`.
- Added corrupted log cards, redacted text, glitch text, and warning panel styles.
- Framed The Compression as creative flattening/generic output, not malware, a security breach, a monster, or a threat.
- Expanded `npm run validate:hidden-frame` with Phase 8 checks for route, data-driven logs, safe copy, and Compression CSS.
- Updated spec, canon, progress, roadmap, and acceptance criteria.

## Phase 7 - 2026-07-13

- Migrated local Hidden Frame progress to schema version 3 with `achievementIds`.
- Added structured achievement data in `hiddenFrameAchievements.ts`.
- Added reusable components: `AchievementBadge`, `AchievementGrid`, and `HiddenFrameResetPanel`.
- Updated `/hidden-frame/collection` with signal badges, richer progress summary copy, and two-step local reset.
- Preserved optional, ungraded, non-leaderboard presentation.
- Expanded `npm run validate:hidden-frame` with Phase 7 checks for achievements, schema migration, reset copy, and collection UI.
- Updated spec, canon, progress, roadmap, and acceptance criteria.

## Phase 6 - 2026-07-13

- Added `/hidden-frame/objects` for the first Blender/object inspection signal route.
- Added Files 015 through 017: `The Name on the Mesh`, `The Folded Surface`, and `The Shadow Under the Model`.
- Added Frames 015 through 017: `MESH`, `UV MAP`, and `SHADOW`.
- Added structured object clue data for object names, model details, materials, UV maps, shadows, scale, camera view, and engraved text.
- Added reusable components: `ObjectInspectionFrame`, `ObjectClueCard`, and `ObjectClueGrid`.
- Expanded `npm run validate:hidden-frame` with Phase 6 checks for the objects route, object clue data, object files, frames, and CSS.
- Updated spec, canon, progress, roadmap, and acceptance criteria.

## Phase 5 - 2026-07-13

- Added `/hidden-frame/render-room` for the first Unreal-styled Render Room route.
- Added `/hidden-frame/unreal` for the broader Unreal Engine clue index.
- Added Files 012 through 014: `The Coordinate That Stayed`, `Blueprint Without Wires`, and `The Room That Knows You Entered`.
- Added Frames 012 through 014: `VECTOR`, `BLUEPRINT`, and `TRIGGER`.
- Added structured Unreal clue data for coordinates, rotation, scale, lighting, materials, Blueprints, trigger volumes, collision, and camera/player perspective.
- Added reusable components: `UnrealViewportReadout`, `UnrealClueCard`, and `UnrealSignalGrid`.
- Expanded `npm run validate:hidden-frame` with Phase 5 checks for Render Room routes, Unreal clue data, Unreal files, frames, and CSS.
- Updated spec, canon, progress, roadmap, and acceptance criteria.

## Phase 4 - 2026-07-13

- Added `/hidden-frame/camera` for the first cinematography/composition signal route.
- Added Files 009 through 011: `The Third Line`, `The Line That Leads`, and `The Space Ahead`.
- Added Frames 009 through 011: `THIRDS`, `LEADING LINES`, and `LOOK SPACE`.
- Added structured camera clue data for rule of thirds, leading lines, symmetry, headroom, look space, repetition, and central framing.
- Added reusable components: `CompositionGuideFrame`, `CameraClueCard`, and `CameraClueGrid`.
- Added CSS guide overlays for composition principles.
- Expanded `npm run validate:hidden-frame` with Phase 4 checks for the camera route, clue data, camera files, frames, and composition CSS.
- Updated spec, canon, progress, roadmap, and acceptance criteria.

## Phase 3 - 2026-07-13

- Added `/hidden-frame/timeline` for the first video-production signal route.
- Added Files 006 through 008: `The Timecode Drift`, `The Name Beneath the Frame`, and `The Sound Before the Cut`.
- Added Frames 006 through 008: `TIMECODE`, `LOWER THIRD`, and `BRIDGE`.
- Added structured video clue data for timecode, cut, lower-third, and sound-bridge clues.
- Added reusable components: `TimelineTrack`, `TimelineClueCard`, `VideoStillClueCard`, and `LowerThirdClueCard`.
- Updated progress logic so Files 001 through 005 still define first-chain completion while Phase 3 can add later files.
- Expanded `npm run validate:hidden-frame` with Phase 3 checks for the timeline route, video data, video files, frames, and chain boundary.
- Updated governance, spec, canon, progress, roadmap, and decisions docs.

## Governance Baseline - 2026-07-13

- Moved the canonical Hidden Frame specification and canon into `docs/hidden-frame/`.
- Added root-level compatibility pointers for the previous spec/canon paths.
- Added `AGENTS.md` Hidden Frame governance instructions.
- Added `ACCEPTANCE_CRITERIA.md`, `PROGRESS.md`, `roadmap.md`, and `decisions.md`.
- Recorded the Phase 1-10 full ARG implementation plan and current Phase 0-2 completion status.
- Established `feature/hidden-frame-full-arg` as the continuing full-ARG branch.

## Phase 2 - 2026-07-08

- Added the First Puzzle Chain for Files 001 through 005.
- Added data-driven clue text, hidden hints, canonical passwords, accepted variants, unlock targets, reward frame IDs, and Archivist completion messages.
- Added dynamic recovered file routing with `/hidden-frame/file/:fileId` while preserving `/hidden-frame/file/001`.
- Added `/hidden-frame/collection` with `FrameCard` and `FrameCollectionGrid` for Frames 001 through 005.
- Updated localStorage progress to schema version 2 with unlocked file IDs, completed file IDs, recovered frame IDs, first visit timestamp, chain completion timestamp, and migration from the Phase 1 shape.
- Improved `PasswordGate` with hidden-by-default hints, answer variants, accessible feedback, and a reduced-motion-safe unlock pulse.
- Improved archive cards with progress-derived available, locked, unlocked, completed, and future states.
- Expanded `npm run validate:hidden-frame` with Phase 2 checks for file data, password matching, locked-file protection, reward frames, and archive state rendering.
- Updated the technical specification and canon for the first playable puzzle chain.
- Intentionally postponed video-production integration, Unreal integration, admin tools, account sync, Firestore persistence, public navigation links, external scavenger hunts, and larger media assets.

## Phase 1 - 2026-07-08

- Added hidden routes for `/hidden-frame`, `/hidden-frame/archive`, and `/hidden-frame/file/001`.
- Added reusable components: `HiddenFrameIcon`, `RecoveredFileCard`, `PasswordGate`, `HiddenFrameProgress`, and `CompressionLog`.
- Added `hiddenFrameFiles.ts` for data-driven recovered file records and locked placeholders.
- Added localStorage-only Phase 1 progress tracking for archive visits and File 001 unlocks.
- Placed the first subtle `HiddenFrameIcon` on assignment detail pages.
- Updated the technical specification and canon with Phase 1 architecture, lore, password, limitations, and TODOs.
- Expanded `npm run validate:hidden-frame` with Phase 1 route, data, card-state, icon-placement, and password checks.
