# The Ember Gate Progress

## Current Status Summary

The Ember Gate is the assignment-unlocked student game inside DCC Creative Studio. The current
verified mainline state includes the Phase 0 architecture, Phase 1 access gate, and Phase 2 shell.
Phase 3 player movement exists in draft PR #9 and is not merged into `main` yet.

Verified on 2026-07-13:

- `origin/main`: `d4fa1dd` (`Complete Phase 9 curriculum and ChatGPT slide handoff`).
- Phase 0 architecture PR #6: merged.
- Phase 1 access gate PR #7: merged.
- Phase 2 shell/start menu PR #8: merged.
- Phase 3 player movement PR #9: open draft on `feature/assignment-game-player-movement`.
- Older vertical-slice PR #5: open draft on `feature/assignment-game`; reference only, do not merge or copy wholesale.
- `docs/assignment-game/` on `origin/main` contains `phase-0-architecture.md` and `phase-2-shell.md`.
- `/student/game` is nested under authenticated routing and student-role route protection in `src/App.tsx`.
- `StudentGamePage` performs a page-level assignment-game access check before rendering `AssignmentGameShell`.
- `AssignmentGameEntryCard` appears in the student Today experience when a submission target exists.

## Working Rules

- Do not work directly on `main` for assignment-game phases.
- Use one small branch and one PR per assignment-game phase.
- Preserve the `/student/game` route protection and page-level access gate.
- Locked students must see locked UI, not gameplay.
- Keep The Ember Gate top-down 2D, not a side-scrolling platformer.
- Do not add Phaser, Pixi, Matter.js, or another heavy game engine.
- Do not add new dependencies unless a PR clearly justifies the need.
- Do not create Firestore saves or save rules until the save-system phase.
- Do not use Firebase Storage for saves.
- Keep implementation modular and data-driven.
- Update this file after each meaningful assignment-game step.
- Before marking a PR ready, run and document:
  - `npm run lint`
  - `npm run build`
  - `npm run validate:curriculum`
  - `npm run validate:hidden-frame`

## Phase Checklist

| Phase | Name | Status | PR / Branch | Notes |
| --- | --- | --- | --- | --- |
| Phase 0 | Architecture | Merged | PR #6 / `feature/assignment-game-architecture` | Mainline doc exists at `docs/assignment-game/phase-0-architecture.md`. |
| Phase 1 | Access Gate | Merged | PR #7 / `feature/assignment-game-gate` | Mainline gate uses existing submission/completion workflow. |
| Phase 2 | Game Shell and Start Menu | Merged | PR #8 / `feature/assignment-game-shell` | Mainline shell/start menu is available after access gate unlock. |
| Phase 3 | Player Movement | Ready for review after latest push | PR #9 / `feature/assignment-game-player-movement` | Includes local movement and player sprites. Asset path cleanup is aligned to the control docs, and validation passed locally. |
| Phase 4 | First Medieval Level | Pending | Recommended: `feature/assignment-game-level-one` | Build Ruined Courtyard as a data-driven top-down level. |
| Phase 5 | Combat Foundation | Pending | Recommended: `feature/assignment-game-combat` | Add sword and energy attack foundations only. |
| Phase 6 | Enemies | Pending | Recommended: `feature/assignment-game-enemies` | Add Hollow Squire and Ash Wisp only after combat foundation. |
| Phase 7 | Dialogue | Pending | Recommended: `feature/assignment-game-dialogue` | Add Lantern Keeper NPC and data-driven dialogue. |
| Phase 8 | Inventory and Collectibles | Pending | Recommended: `feature/assignment-game-inventory` | Add Ember Shard, Rusty Key, and Lantern Oil. |
| Phase 9 | Save and Continue System | Pending | Recommended: `feature/assignment-game-save-system` | Add Firestore saves and reviewed rules in the same phase. |
| Phase 10 | Assignment Progression | Pending | Recommended: `feature/assignment-game-progression` | Unlock new areas from verified assignment progress. |
| Phase 11 | Easter Egg Integration | Pending | Recommended: `feature/assignment-game-easter-egg` | Add Hidden Frame clue integration. |
| Phase 12 | Teacher/Admin Controls | Pending | Recommended: `feature/assignment-game-teacher-controls` | Build only if classroom support needs are confirmed. |
| Phase 13 | Polish and Final QA | Pending | Recommended: `feature/assignment-game-polish` | Classroom-ready pass and final manual verification. |

## PR Log

| PR | Title | State | Notes |
| --- | --- | --- | --- |
| #5 | `[Feature] Assignment Game Vertical Slice` | Open draft | Older branch. Reference only. Do not merge or copy wholesale. |
| #6 | `[Phase 0] Assignment Game Architecture` | Merged | Established architecture plan. |
| #7 | `[Phase 1] Assignment Game Access Gate` | Merged | Added route/page gate and Today entry card. |
| #8 | `[Phase 2] Assignment Game Shell and Start Menu` | Merged | Added shell, start menu, disabled Continue, preview viewport, HUD placeholders, pause menu. |
| #9 | `[Phase 3] Assignment Game Player Movement` | Ready for review after latest push | Adds local movement, player state, and player sprites. |
| #10 | `[Goal] Assignment Game Project Control Docs` | Merged | Added root assignment-game rules, full-game acceptance criteria, and this progress log. |

## Validation Log

- 2026-07-13: Repository/PR audit completed for this control-doc pass.
- 2026-07-13: `assignment-game-player-sprites.zip` found in `C:\Users\mrcla\Downloads`.
- 2026-07-13: Player sprite manifest read. Recommended folder is `game_ready_128`; idle sprites are 128x128; walk sheets are 512x128 with four 128x128 frames.
- 2026-07-13: `assignment-game-tileset.zip` found in `C:\Users\mrcla\Downloads`.
- 2026-07-13: Tileset manifest read. Recommended folder is `game_ready_64`; tiles are 64x64 PNG files.
- 2026-07-13: `npm.cmd install` passed. npm reported 6 moderate audit vulnerabilities and deprecation warnings for `node-domexception`, `glob`, and `uuid`.
- 2026-07-13: `npm.cmd run lint` passed.
- 2026-07-13: `npm.cmd run build` passed. Vite reported the existing chunk-size warning for bundles over 500 kB after minification.
- 2026-07-13: `npm.cmd run validate:curriculum` passed.
- 2026-07-13: `npm.cmd run validate:hidden-frame` passed.
- 2026-07-13: `git diff --check` passed with Git line-ending normalization warnings only.
- 2026-07-13: PR #10 merged into `main`.
- 2026-07-13: Phase 3 branch rebased onto current `origin/main`.
- 2026-07-13: Phase 3 player sprites moved to `public/assets/assignment-game/player/` to match the control docs.
- 2026-07-13: Phase 3 `npm.cmd run lint` passed.
- 2026-07-13: Phase 3 `npm.cmd run build` passed. Vite reported the existing chunk-size warning for bundles over 500 kB after minification.
- 2026-07-13: Phase 3 `npm.cmd run validate:curriculum` passed.
- 2026-07-13: Phase 3 `npm.cmd run validate:hidden-frame` passed.
- 2026-07-13: Phase 3 `git diff --check` passed with Git line-ending normalization warnings only.
- 2026-07-13: Verified Phase 3 player sprite dimensions: idle frames are 128x128; walking sheets are 512x128.
- 2026-07-13: Verified local Vite served `/assets/assignment-game/player/player_idle_down.png`, `/assets/assignment-game/player/player_walk_down_spritesheet.png`, and `/student/game` with HTTP 200 on port 5177.

## Asset Notes

- Required future runtime player asset location: `public/assets/assignment-game/player/`.
- Required future runtime tile asset location: `public/assets/assignment-game/tiles/`.
- Phase 3 PR #9 now contains player sprites under `public/assets/assignment-game/player/`.
- Phase 4 should use the tileset zip if available and should extract only `game_ready_64/` runtime tiles unless source/reference files are specifically needed.
- Missing optional image assets must use graceful fallback rendering and must not crash the game.

## Current Open Questions

- Should `useAssignmentGameAccess(studentId, assignmentId, ...)` rename the second parameter to `targetId` in a later cleanup so missions, assignments, media projects, and broadcast updates all fit the name?
- Should Phase 4 use CSS grid/DOM tiles first, or canvas rendering with the same data model? Keep the choice lightweight and avoid heavy engines either way.
- What exact assignment progression model should unlock areas after the first gate: current active item only, completed historical targets, or teacher-selected milestones?
- Are teacher/admin troubleshooting controls needed, or should Phase 12 remain skipped unless classroom use proves the need?

## Next Step

Finish Phase 3 PR #9:

1. Update PR #9 notes with the current validation and asset path.
2. Mark PR #9 ready after the pushed branch matches these validation notes.
3. After PR #9 merges, start Phase 4 on `feature/assignment-game-level-one`.
