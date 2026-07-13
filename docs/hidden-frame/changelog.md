# Hidden Frame Changelog

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
