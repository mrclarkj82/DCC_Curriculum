# Phase 5 Combat Foundation

Phase 5 adds local-only combat feedback inside the existing gated Ruined Courtyard prototype. The
Phase 1 access gate still controls whether the shell renders. Combat does not persist and does not
interact with enemies yet.

## Added

- Local combat state for player health, sword damage, energy bolt damage, active sword attack, active energy bolts, and last combat action.
- Starting combat values:
  - Player Health: 100
  - Sword Damage: 25
  - Energy Bolt Damage: 10
- Sword controls: Space or J.
- Energy bolt controls: F or K.
- Visible sword arc feedback based on facing direction.
- Visible energy bolt projectiles that travel briefly and expire inside the level bounds.
- Pause-safe combat behavior: inputs and projectile updates stop while paused.
- Restart Preview resets local combat state.
- HUD readouts for Health, Sword, Energy Bolt, and Combat.

## Intentionally Not Implemented

- Enemies, enemy health, enemy contact damage, defeat logic, or AI.
- Actual hit detection against enemies or props.
- Inventory behavior, item pickup, dialogue, or progression flags.
- Save/load persistence, Firestore writes, localStorage, IndexedDB, Storage, or backend game state.
- Teacher/admin controls.
- A new dependency or heavy game engine.

## Phase 6 Next Step

Phase 6 should add the first enemies, Hollow Squire and Ash Wisp, using the Phase 5 local combat
state. Keep enemy state local-only and do not add saves, inventory, dialogue, or assignment
progression unless a later instruction explicitly expands the scope.
