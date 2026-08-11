# Hidden Frame Changelog

## Assignment Marker Signal Flicker - 2026-08-11

- Added irregular flicker and glitch bursts to the broken-frame marker on assignment pages.
- Added cyan/red symbol separation, clipped ghost frames, scanline artifacts, and tiny position jumps.
- Accelerated the corruption effect on hover and keyboard focus.
- Disabled all new animation under `prefers-reduced-motion: reduce`.

## Phase 1 - 2026-07-08

- Added hidden routes for `/hidden-frame`, `/hidden-frame/archive`, and `/hidden-frame/file/001`.
- Added reusable components: `HiddenFrameIcon`, `RecoveredFileCard`, `PasswordGate`, `HiddenFrameProgress`, and `CompressionLog`.
- Added `hiddenFrameFiles.ts` for data-driven recovered file records and locked placeholders.
- Added localStorage-only Phase 1 progress tracking for archive visits and File 001 unlocks.
- Placed the first subtle `HiddenFrameIcon` on assignment detail pages.
- Updated the technical specification and canon with Phase 1 architecture, lore, password, limitations, and TODOs.
- Expanded `npm run validate:hidden-frame` with Phase 1 route, data, card-state, icon-placement, and password checks.
