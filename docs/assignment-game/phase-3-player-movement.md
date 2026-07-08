# Phase 3 Assignment Game Player Movement

Phase 3 adds the first local-only player movement prototype inside the gated `The Ember Gate` shell. The Phase 1 access gate still controls whether the shell renders.

## Added

- Keyboard movement with Arrow keys and WASD.
- Local player state for position, facing direction, movement status, and last input direction.
- Diagonal movement normalization so diagonal travel is not faster than straight travel.
- Rectangular viewport bounds so the player token stays inside the visible courtyard.
- A styled placeholder player token with lightweight facing and moving feedback.
- HUD movement readout alongside the existing placeholder Health, Energy, Inventory, and Objective items.
- Pause-safe input behavior: pausing stops movement, resuming keeps the current position, and Restart Preview resets to spawn.

## How Movement Works

Movement uses React state and browser keyboard events only. `useKeyboardMovement` tracks active movement keys, prevents Arrow-key page scrolling while the preview is active, and cleans up listeners when disabled or unmounted. `usePlayerMovement` advances the player with `requestAnimationFrame`, clamps the player to normalized viewport bounds, and resets when the local preview key changes.

## Intentionally Not Implemented

- Combat, sword attacks, projectiles, enemies, damage, or health logic.
- Inventory behavior, item pickup, dialogue, or progression flags.
- Tile collision, wall collision, platform physics, jumping, gravity, or pathfinding.
- Save/load persistence, Firestore writes, localStorage, IndexedDB, Storage, or backend game state.
- Generated art assets, sprite sheets, or a game engine dependency.

## Phase 4 Next Step

Phase 4 should introduce the first medieval level/map layout inside the existing movement viewport. Keep collision and persistence scoped carefully unless a later phase explicitly adds them.
