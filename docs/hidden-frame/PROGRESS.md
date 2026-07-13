# Hidden Frame Progress

## Current Overall Status

The Hidden Frame is implemented through Phase 2. Phase 0 established the visual foundation, Phase 1 created the hidden page MVP, and Phase 2 created the first playable five-file puzzle chain with local frame rewards.

The current full-ARG working branch is:

`feature/hidden-frame-full-arg`

## Phase Status

| Phase | Name | Status | Notes |
|---|---|---:|---|
| 0 | Visual Foundation | Complete | Asset kit, visual identity, registry, docs foundation |
| 1 | Hidden Page MVP | Complete | Landing page, archive, File 001, icon, password gate, local progress |
| 2 | First Puzzle Chain | Complete | Files 001-005, unlock chain, collection route, frame rewards |
| 3 | Video Production Integration | Next | Timeline, timecode, lower thirds, editing clues |
| 4 | Cinematography Mystery Arc | Not Started | Rule of thirds, leading lines, symmetry, framing clues |
| 5 | Unreal Engine Integration | Not Started | Render Room, coordinates, rotation, Blueprint-style clues |
| 6 | Blender/Object Mystery Arc | Not Started | Object, material, UV, shadow, camera-view clues |
| 7 | Student Progression System | Not Started | Larger collection, achievements, reset, adapter boundary |
| 8 | Compression Event | Not Started | Glitch/redaction/compression antagonist systems |
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

## Active Phase

### Phase 3: Video Production Integration

Objective:

Create the first video-production expansion arc while keeping all clues inside the DCC website or approved class materials.

Required work:

- Add `/hidden-frame/timeline`.
- Add structured data for video/timeline clue entries.
- Add reusable timeline/video clue components.
- Support timecode, frame numbers, cuts, J-cuts/L-cuts, lower thirds, B-roll, pacing, sound bridges, and editing decisions.
- Reuse Phase 0 VHS/signal assets.
- Update docs and validation.

## Backlog

### Phase 4 Backlog

- `/hidden-frame/camera`.
- Composition clue data.
- Rule-of-thirds, leading-lines, symmetry, headroom, look-space, repetition, and central-framing clue components.

### Phase 5 Backlog

- `/hidden-frame/render-room`.
- `/hidden-frame/unreal`.
- Render Room page.
- Coordinate, rotation, lighting, material, Blueprint-style, trigger, collision, and perspective clue support.

### Phase 6 Backlog

- `/hidden-frame/objects`.
- Object/material/UV/shadow/camera-view clue data.
- Blender/object clue components.

### Phase 7 Backlog

- Expanded frame collection.
- Achievement data.
- Optional reset flow.
- Persistence adapter interface.
- Additional schema migration coverage.

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
- Next validation will run after governance docs are committed.
