# Hidden Frame Progress

## Current Overall Status

The Hidden Frame is implemented through Phase 7. Phase 0 established the visual foundation, Phase 1 created the hidden page MVP, Phase 2 created the first playable five-file puzzle chain with local frame rewards, Phase 3 added the first video-production timeline arc, Phase 4 added the first cinematography/composition arc, Phase 5 added the first Unreal/Render Room arc, Phase 6 added the first Blender/object inspection arc, and Phase 7 added the local progression layer.

The current full-ARG working branch is:

`feature/hidden-frame-full-arg`

## Phase Status

| Phase | Name | Status | Notes |
|---|---|---:|---|
| 0 | Visual Foundation | Complete | Asset kit, visual identity, registry, docs foundation |
| 1 | Hidden Page MVP | Complete | Landing page, archive, File 001, icon, password gate, local progress |
| 2 | First Puzzle Chain | Complete | Files 001-005, unlock chain, collection route, frame rewards |
| 3 | Video Production Integration | Complete | Timeline route, video clue data, Files 006-008, timeline components |
| 4 | Cinematography Mystery Arc | Complete | Camera route, composition clue data, Files 009-011, guide overlays |
| 5 | Unreal Engine Integration | Complete | Render Room route, Unreal clue data, Files 012-014, viewport readouts |
| 6 | Blender/Object Mystery Arc | Complete | Objects route, object clue data, Files 015-017, inspection panels |
| 7 | Student Progression System | Complete | Achievement data, signal badges, reset panel, schema v3 migration |
| 8 | Compression Event | Next | Glitch/redaction/compression antagonist systems |
| 9 | Final Export | Not Started | Frame 000 and completion ending |
| 10 | Admin and Expansion Tools | Not Started | Long-term content expansion tools and docs |

## Completed Phase Summaries

### Phase 0: Visual Foundation

Phase 0 established:

- Broken frame symbol assets.
- Background textures.
- Title card.
- Style board.
- Design tokens.
- Asset manifest.
- TypeScript asset registry.
- Hidden Frame documentation foundation.

Do not modify Phase 0 assets unless required to fix broken references.

### Phase 1: Hidden Page MVP

Phase 1 added:

- `/hidden-frame`
- `/hidden-frame/archive`
- `/hidden-frame/file/001`
- `HiddenFrameIcon`
- `RecoveredFileCard`
- `PasswordGate`
- `HiddenFrameProgress`
- `CompressionLog`
- LocalStorage progress adapter.
- Subtle icon placement in the curriculum UI.

### Phase 2: First Puzzle Chain

Phase 2 added:

- Files 001 through 005 as data-driven recovered files.
- `/hidden-frame/file/:fileId`.
- `/hidden-frame/collection`.
- Local unlock sequencing.
- Frame rewards 001 through 005.
- Hidden-by-default hints and answer variants.
- Schema version 2 localStorage progress with Phase 1 migration.
- `FrameCard` and `FrameCollectionGrid`.
- Phase 2 validation script.

### Phase 3: Video Production Integration

Phase 3 added:

- `/hidden-frame/timeline`.
- Video timeline clue data in `hiddenFrameVideoClues.ts`.
- Files 006 through 008 for TIMECODE, LOWER THIRD, and BRIDGE.
- Frames 006 through 008.
- `TimelineTrack`, `TimelineClueCard`, `VideoStillClueCard`, and `LowerThirdClueCard`.
- Phase 3 validation script.

### Phase 4: Cinematography Mystery Arc

Phase 4 added:

- `/hidden-frame/camera`.
- Camera/composition clue data in `hiddenFrameCameraClues.ts`.
- Files 009 through 011 for THIRDS, LEADING LINES, and LOOK SPACE.
- Frames 009 through 011.
- `CompositionGuideFrame`, `CameraClueCard`, and `CameraClueGrid`.
- Phase 4 validation script.

### Phase 5: Unreal Engine Integration

Phase 5 added:

- `/hidden-frame/render-room`.
- `/hidden-frame/unreal`.
- Unreal clue data in `hiddenFrameUnrealClues.ts`.
- Files 012 through 014 for VECTOR, BLUEPRINT, and TRIGGER.
- Frames 012 through 014.
- `UnrealViewportReadout`, `UnrealClueCard`, and `UnrealSignalGrid`.
- Phase 5 validation script.

### Phase 6: Blender/Object Mystery Arc

Phase 6 added:

- `/hidden-frame/objects`.
- Object clue data in `hiddenFrameObjectClues.ts`.
- Files 015 through 017 for MESH, UV MAP, and SHADOW.
- Frames 015 through 017.
- `ObjectInspectionFrame`, `ObjectClueCard`, and `ObjectClueGrid`.
- Phase 6 validation script.

### Phase 7: Student Progression System

Phase 7 added:

- Schema version 3 localStorage progress with `achievementIds`.
- Achievement data in `hiddenFrameAchievements.ts`.
- `AchievementBadge` and `AchievementGrid`.
- `HiddenFrameResetPanel` with two-step local-only reset confirmation.
- Richer progress summary counts for frames and recovered signals.
- Phase 7 validation script.

## Active Phase

### Phase 8: The Compression Event

Objective:

Add the first safe Compression event layer without making it feel like malware, a threat, or a real security breach.

Required work:

- Add `/hidden-frame/compression`.
- Add Compression log data.
- Add glitch/redaction/corrupted visual states.
- Add Compression warning panels with safe antagonist language.
- Preserve calm, school-appropriate scope.
- Update docs and validation.

## Backlog

### Phase 8 Backlog

- `/hidden-frame/compression`.
- Compression logs and warning panels.
- Glitch/redaction/corrupted states.
- Safe antagonist language.

### Phase 9 Backlog

- `/hidden-frame/final-export`.
- `/hidden-frame/frame-000`.
- Final prerequisite check.
- Ending sequence and Frame 000 reward.

### Phase 10 Backlog

- Content expansion workflow.
- Optional dev/admin preview tools.
- Asset request tracking.
- Data validation.
- Long-term documentation cleanup.

## Open Questions

- Should progress remain localStorage-only through Phase 10, or should later persistence only be designed behind an adapter?
- Should the archive remain discoverable only through hidden icons/direct routes, or should a future hidden footer link be added?
- Should future content packs be separated by unit, phase, or clue type?
- What approved video production artifacts should Phase 3 reference first?

## Known Constraints

- Phase 0 assets are canonical.
- The ARG must stay optional and ungraded.
- The ARG must stay inside the DCC site.
- No external scavenger hunt behavior.
- No horror/gore/occult/conspiracy tone.
- No personal data collection.
- No real hacking simulation.
- No public leaderboard unless explicitly approved later.

## Validation Log

### 2026-07-08

- `git diff --check`: passed for Phase 2 work.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed with existing Vite large chunk warning.
- `npm.cmd run validate:curriculum`: passed.
- `npm.cmd run validate:hidden-frame`: passed.
- Route smoke checks returned `200` for `/hidden-frame/archive`, `/hidden-frame/file/005`, and `/hidden-frame/collection`.

### 2026-07-13

- Governance continuation started on `feature/hidden-frame-full-arg`.
- Governance docs committed and pushed.
- Phase 3 implementation started and validated during development.
- Phase 4 committed and pushed as `fc21e45`.
- Phase 5 implemented with Render Room and Unreal clue support.
- `git diff --check`: passed for Phase 5 work.
- `npm.cmd run lint`: passed.
- `npm.cmd run validate:hidden-frame`: passed through Phase 5.
- `npm.cmd run validate:curriculum`: passed.
- `npm.cmd run build`: passed with existing Vite large chunk warning.
- Route smoke checks returned `200` for `/hidden-frame/render-room`, `/hidden-frame/unreal`, and `/hidden-frame/file/012`.
- Phase 5 committed and pushed as `bdaddf2`.
- Phase 6 implemented with object inspection clue support.
- `git diff --check`: passed for Phase 6 work.
- `npm.cmd run lint`: passed.
- `npm.cmd run validate:hidden-frame`: passed through Phase 6.
- `npm.cmd run validate:curriculum`: passed.
- `npm.cmd run build`: passed with existing Vite large chunk warning.
- Route smoke checks returned `200` for `/hidden-frame/objects` and `/hidden-frame/file/015`.
- Phase 6 committed and pushed as `0015595`.
- Phase 7 implemented with local achievements, schema v3 progress, and reset support.
- `git diff --check`: passed for Phase 7 work.
- `npm.cmd run lint`: passed.
- `npm.cmd run validate:hidden-frame`: passed through Phase 7.
- `npm.cmd run validate:curriculum`: passed.
- `npm.cmd run build`: passed with existing Vite large chunk warning.
- Route smoke checks returned `200` for `/hidden-frame/collection`.
