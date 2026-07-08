# Hidden Frame Changelog

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
