# Phase 8 Inventory And Collectibles

Phase 8 adds the first local-only collectible inventory loop to the gated Ruined Courtyard
prototype. The Phase 1 access gate still controls whether `AssignmentGameShell` can render, and
inventory state does not persist outside the current browser session.

## Added

- Data-driven collectible definitions for:
  - Ember Shard
  - Rusty Key
  - Lantern Oil
- Local inventory state for available items, collected items, nearby item, collection count, and
  latest inventory event.
- Intentional pickup interaction through the C key while near an available item.
- Item pickup radius checks against the player's current position.
- Collectible layer with visible item sprites, short labels, and Press C prompts.
- HUD readouts for collected item count, collected item names, and latest item status.
- Restart Preview resets collected items back to available.
- Lightweight CSS fallback item sprites. No optional image asset is required.

## Access Gate Safety

- `/student/game` remains behind the existing authenticated student route protection.
- `StudentGamePage` still performs the assignment-game access check before rendering
  `AssignmentGameShell`.
- Locked students continue to see the locked gate state instead of the game shell.
- Direct navigation to `/student/game` does not bypass the page-level access gate.

## Intentionally Not Implemented

- Persistent inventory state, Firestore saves, localStorage, IndexedDB, or Firebase Storage.
- Item rewards, usable items, equipment, keys that unlock doors, or progression flags.
- Assignment-based inventory unlocks or area unlocks.
- Teacher/admin inventory controls.
- A new dependency or heavy game engine.

## Phase 9 Next Step

Phase 9 should add the save and continue system. That phase must include reviewed Firestore data
shape, student-specific save documents, rules coverage, failure handling, and a real reason to
enable Continue. Do not persist inventory, dialogue, enemies, or progression before those rules and
tests exist.
