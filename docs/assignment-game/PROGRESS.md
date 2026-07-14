# The Ember Gate Progress

## Current Status Summary

The Ember Gate is the assignment-unlocked student game inside DCC Creative Studio. The current
verified mainline state includes the Phase 0 architecture, Phase 1 access gate, Phase 2 shell,
Phase 3 player movement, Phase 4 Ruined Courtyard level, Phase 5 combat foundation, Phase 6
enemies, Phase 7 dialogue, and Phase 8 inventory. Phase 9 save and continue is in progress on
`feature/assignment-game-save-system`.

Verified on 2026-07-13:

- `origin/main`: `2fe6180` (`Merge pull request #15 from mrclarkj82/feature/assignment-game-inventory`).
- Phase 0 architecture PR #6: merged.
- Phase 1 access gate PR #7: merged.
- Phase 2 shell/start menu PR #8: merged.
- Phase 3 player movement PR #9: merged.
- Phase 4 Ruined Courtyard PR #11: merged.
- Phase 5 combat foundation PR #12: merged.
- Phase 6 enemies PR #13: merged and deployed.
- Phase 7 dialogue PR #14: merged and deployed.
- Phase 8 inventory PR #15: merged and deployed.
- Phase 9 save system branch: `feature/assignment-game-save-system`.
- Older vertical-slice PR #5: open draft on `feature/assignment-game`; reference only, do not merge or copy wholesale.
- `docs/assignment-game/` on `origin/main` contains Phase 0, Phase 2, Phase 3, Phase 4, Phase 5, control, acceptance, and progress docs.
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
| Phase 3 | Player Movement | Merged | PR #9 / `feature/assignment-game-player-movement` | Includes local movement and player sprites. |
| Phase 4 | First Medieval Level | Merged | PR #11 / `feature/assignment-game-level-one` | Builds Ruined Courtyard as a data-driven top-down level. |
| Phase 5 | Combat Foundation | Merged | PR #12 / `feature/assignment-game-combat` | Adds local-only sword and energy attack foundations. |
| Phase 6 | Enemies | Merged | PR #13 / `feature/assignment-game-enemies` | Adds local-only Hollow Squire and Ash Wisp enemies. |
| Phase 7 | Dialogue | Merged | PR #14 / `feature/assignment-game-dialogue` | Adds local-only Lantern Keeper NPC and data-driven dialogue. |
| Phase 8 | Inventory and Collectibles | Merged | PR #15 / `feature/assignment-game-inventory` | Adds local-only Ember Shard, Rusty Key, and Lantern Oil collectibles. |
| Phase 9 | Save and Continue System | In progress | `feature/assignment-game-save-system` | Adds Firestore saves, Continue support, and reviewed game save rules. |
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
| #9 | `[Phase 3] Assignment Game Player Movement` | Merged | Adds local movement, player state, and player sprites. |
| #10 | `[Goal] Assignment Game Project Control Docs` | Merged | Added root assignment-game rules, full-game acceptance criteria, and this progress log. |
| #11 | `[Phase 4] Assignment Game Ruined Courtyard Level` | Merged | Added data-driven Ruined Courtyard level and tileset assets. |
| #12 | `[Phase 5] Assignment Game Combat Foundation` | Merged | Added local-only sword and energy bolt combat foundation. |
| #13 | `[Phase 6] Assignment Game Enemies` | Merged | Added local-only Hollow Squire and Ash Wisp enemies. |
| #14 | `[Phase 7] Assignment Game Dialogue` | Merged | Added local-only Lantern Keeper NPC and dialogue. |
| #15 | `[Phase 8] Assignment Game Inventory` | Merged | Added local-only Ember Shard, Rusty Key, and Lantern Oil collectibles. |

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
- 2026-07-13: PR #9 merged into `main`.
- 2026-07-13: Phase 4 branch `feature/assignment-game-level-one` created from current `origin/main`.
- 2026-07-13: Phase 4 tile manifest had already been read. Tiles use `game_ready_64/` and 64x64 PNG files.
- 2026-07-13: Phase 4 extracted the eleven `game_ready_64/` tile PNGs into `public/assets/assignment-game/tiles/`.
- 2026-07-13: Phase 4 `npm.cmd install` passed. npm reported 6 moderate audit vulnerabilities and deprecation warnings for `node-domexception`, `glob`, and `uuid`.
- 2026-07-13: Phase 4 `npm.cmd run lint` passed.
- 2026-07-13: Phase 4 `npm.cmd run build` passed. Vite reported the existing chunk-size warning for bundles over 500 kB after minification.
- 2026-07-13: Phase 4 `npm.cmd run validate:curriculum` passed.
- 2026-07-13: Phase 4 `npm.cmd run validate:hidden-frame` passed.
- 2026-07-13: Phase 4 `git diff --check` passed with Git line-ending normalization warnings only.
- 2026-07-13: Verified Phase 4 tile dimensions: all eleven integrated tiles are 64x64 PNGs.
- 2026-07-13: Verified local Vite served `/assets/assignment-game/tiles/tile_stone_floor.png` and `/student/game` with HTTP 200 on port 5178.
- 2026-07-13: PR #11 merged into `main`.
- 2026-07-13: Phase 5 branch `feature/assignment-game-combat` created from current `origin/main`.
- 2026-07-13: Phase 5 `npm.cmd install` passed. npm reported 6 moderate audit vulnerabilities and deprecation warnings for `node-domexception`, `glob`, and `uuid`.
- 2026-07-13: Phase 5 `npm.cmd run lint` passed.
- 2026-07-13: Phase 5 `npm.cmd run build` passed. Vite reported the existing chunk-size warning for bundles over 500 kB after minification.
- 2026-07-13: Phase 5 `npm.cmd run validate:curriculum` passed.
- 2026-07-13: Phase 5 `npm.cmd run validate:hidden-frame` passed.
- 2026-07-13: Phase 5 `git diff --check` passed with Git line-ending normalization warnings only.
- 2026-07-13: Verified local Vite served `/student/game` and `/assets/assignment-game/player/player_idle_down.png` with HTTP 200 on port 5179.
- 2026-07-13: PR #12 merged into `main`.
- 2026-07-13: Phase 6 branch `feature/assignment-game-enemies` created from current `origin/main`.
- 2026-07-13: Phase 6 `npm.cmd install` passed. npm reported 6 moderate audit vulnerabilities and deprecation warnings for `node-domexception`, `glob`, and `uuid`.
- 2026-07-13: Phase 6 `npm.cmd run lint` passed.
- 2026-07-13: Phase 6 `npm.cmd run build` passed. Vite reported the existing chunk-size warning for bundles over 500 kB after minification.
- 2026-07-13: Phase 6 `npm.cmd run validate:curriculum` passed.
- 2026-07-13: Phase 6 `npm.cmd run validate:hidden-frame` passed.
- 2026-07-13: Phase 6 `git diff --check` passed with Git line-ending normalization warnings only.
- 2026-07-13: Verified local Vite served `/student/game` with HTTP 200 on port 5180.
- 2026-07-13: PR #13 merged into `main`.
- 2026-07-13: Main after PR #13 `npm.cmd run lint` passed.
- 2026-07-13: Main after PR #13 `npm.cmd run build` passed. Vite reported the existing chunk-size warning for bundles over 500 kB after minification.
- 2026-07-13: Main after PR #13 `npm.cmd run validate:curriculum` passed.
- 2026-07-13: Main after PR #13 `npm.cmd run validate:hidden-frame` passed.
- 2026-07-13: Deployed Phase 6 to Firebase Hosting target `dcc`; live URL is `https://dcccs.web.app`.
- 2026-07-13: Verified live `/student/game` returned HTTP 200 after Phase 6 deploy.
- 2026-07-13: Phase 7 branch `feature/assignment-game-dialogue` created from current `origin/main`.
- 2026-07-13: Phase 7 `npm.cmd install` passed. npm reported 6 moderate audit vulnerabilities and deprecation warnings for `node-domexception`, `glob`, and `uuid`.
- 2026-07-13: Phase 7 `npm.cmd run lint` passed.
- 2026-07-13: Phase 7 `npm.cmd run build` passed. Vite reported the existing chunk-size warning for bundles over 500 kB after minification.
- 2026-07-13: Phase 7 `npm.cmd run validate:curriculum` passed.
- 2026-07-13: Phase 7 `npm.cmd run validate:hidden-frame` passed.
- 2026-07-13: Verified local Vite served `/student/game` with HTTP 200 on port 5181.
- 2026-07-13: PR #14 merged into `main`.
- 2026-07-13: Main after PR #14 `npm.cmd run lint` passed.
- 2026-07-13: Main after PR #14 `npm.cmd run build` passed. Vite reported the existing chunk-size warning for bundles over 500 kB after minification.
- 2026-07-13: Main after PR #14 `npm.cmd run validate:curriculum` passed.
- 2026-07-13: Main after PR #14 `npm.cmd run validate:hidden-frame` passed.
- 2026-07-13: Deployed Phase 7 to Firebase Hosting target `dcc`; live URL is `https://dcccs.web.app`.
- 2026-07-13: Verified live `/student/game` returned HTTP 200 after Phase 7 deploy.
- 2026-07-13: Phase 8 branch `feature/assignment-game-inventory` created from current `origin/main`.
- 2026-07-13: Phase 8 `npm.cmd install` passed. npm reported 6 moderate audit vulnerabilities and deprecation warnings for `node-domexception`, `glob`, and `uuid`.
- 2026-07-13: Phase 8 `npm.cmd run lint` passed.
- 2026-07-13: Phase 8 `npm.cmd run build` passed. Vite reported the existing chunk-size warning for bundles over 500 kB after minification.
- 2026-07-13: Phase 8 `npm.cmd run validate:curriculum` passed.
- 2026-07-13: Phase 8 `npm.cmd run validate:hidden-frame` passed.
- 2026-07-13: Phase 8 `git diff --check` passed with Git line-ending normalization warnings only.
- 2026-07-13: Verified local Vite served `/student/game` with HTTP 200 on port 5182.
- 2026-07-13: PR #15 merged into `main`.
- 2026-07-13: Main after PR #15 `npm.cmd run lint` passed.
- 2026-07-13: Main after PR #15 `npm.cmd run build` passed. Vite reported the existing chunk-size warning for bundles over 500 kB after minification.
- 2026-07-13: Main after PR #15 `npm.cmd run validate:curriculum` passed.
- 2026-07-13: Main after PR #15 `npm.cmd run validate:hidden-frame` passed.
- 2026-07-13: Deployed Phase 8 to Firebase Hosting target `dcc`; live URL is `https://dcccs.web.app`.
- 2026-07-13: Verified live `/student/game` returned HTTP 200 after Phase 8 deploy.
- 2026-07-13: Phase 9 branch `feature/assignment-game-save-system` created from current `origin/main`.
- 2026-07-13: Phase 9 adds Firestore save documents under `apps/dcc/gameSaves`, strict save rules, `Save Progress`, and real `Continue` loading for the verified student and assignment target.
- 2026-07-13: Phase 9 `npm.cmd install` passed. npm reported 6 moderate audit vulnerabilities and deprecation warnings for `node-domexception`, `glob`, and `uuid`.
- 2026-07-13: Phase 9 `npm.cmd run lint` passed.
- 2026-07-13: Phase 9 `npm.cmd run build` passed. Vite reported the existing chunk-size warning for bundles over 500 kB after minification.
- 2026-07-13: Phase 9 `npm.cmd run validate:curriculum` passed.
- 2026-07-13: Phase 9 `npm.cmd run validate:hidden-frame` passed.
- 2026-07-13: Phase 9 `git diff --check` passed with Git line-ending normalization warnings only.
- 2026-07-13: Phase 9 `firebase.cmd deploy --only firestore:rules --dry-run` passed; `firestore.rules` compiled successfully.
- 2026-07-13: Verified local Vite served `/student/game` with HTTP 200 on port 5183.

## Asset Notes

- Required future runtime player asset location: `public/assets/assignment-game/player/`.
- Required future runtime tile asset location: `public/assets/assignment-game/tiles/`.
- Phase 3 PR #9 now contains player sprites under `public/assets/assignment-game/player/`.
- Phase 4 contains tileset PNGs under `public/assets/assignment-game/tiles/`.
- Missing optional image assets must use graceful fallback rendering and must not crash the game.

## Current Open Questions

- Should `useAssignmentGameAccess(studentId, assignmentId, ...)` rename the second parameter to `targetId` in a later cleanup so missions, assignments, media projects, and broadcast updates all fit the name?
- Should future combat-health work subtract enemy contact damage from player health, use invulnerability windows, or keep contact as a warning-only interaction for classroom play?
- Should later dialogue branch based on completed assignments, or should assignment progression unlock areas only while dialogue stays flavor-only?
- Should inventory items remain flavor-only until assignment progression, or should Rusty Key and Lantern Oil become usable once saves exist?
- What exact assignment progression model should unlock areas after the first gate: current active item only, completed historical targets, or teacher-selected milestones?
- Are teacher/admin troubleshooting controls needed, or should Phase 12 remain skipped unless classroom use proves the need?

## Next Step

Finish Phase 9 PR:

1. Validate `feature/assignment-game-save-system`.
2. Commit and push the save-system branch.
3. Open PR `[Phase 9] Assignment Game Save System`.
4. After the Phase 9 PR merges, deploy Firestore rules and Firebase Hosting target `dcc`.
5. Start Phase 10 assignment progression on `feature/assignment-game-progression`.
