# Phase 6 Enemies

Phase 6 adds the first local-only enemies to the gated Ruined Courtyard prototype. The Phase 1
access gate still controls whether `AssignmentGameShell` can render, and enemy state does not
persist outside the current browser session.

## Added

- Data-driven enemy definitions for:
  - Hollow Squire
  - Ash Wisp
- Starting enemy values:
  - Enemy Health: 40
  - Enemy Contact Damage: 10
- Local enemy runtime state for health, status, position, patrol direction, and last hit source.
- Patrol movement constrained to each enemy's configured patrol start and end points.
- Pause-safe enemy behavior: enemies do not patrol or process hits while the preview is paused.
- Sword and energy bolt hit checks against living enemies.
- Defeated state when enemy health reaches zero.
- HUD readouts for enemy count, defeated count, contact damage, and the latest enemy event.
- Lightweight CSS fallback enemy sprites and health bars. No optional image asset is required.

## Access Gate Safety

- `/student/game` remains behind the existing authenticated student route protection.
- `StudentGamePage` still performs the assignment-game access check before rendering
  `AssignmentGameShell`.
- Locked students continue to see the locked gate state instead of the game shell.
- Direct navigation to `/student/game` does not bypass the page-level access gate.

## Intentionally Not Implemented

- Persistent enemy state, saves, localStorage, IndexedDB, Firestore writes, or Firebase Storage.
- Player health reduction from contact damage. Contact damage is exposed as Phase 6 preview data
  for the later combat-health pass.
- Enemy pathfinding, chasing, ranged attacks, spawn waves, loot drops, or progression flags.
- Inventory behavior, item pickup, dialogue, or assignment progression.
- Teacher/admin game controls.
- A new dependency or heavy game engine.

## Phase 7 Next Step

Phase 7 should add the Lantern Keeper NPC and data-driven dialogue. Keep dialogue local to the
current unlocked shell, pause or coordinate movement/combat input while a dialogue panel is open,
and do not add inventory, saves, or assignment progression unless the phase explicitly expands.
