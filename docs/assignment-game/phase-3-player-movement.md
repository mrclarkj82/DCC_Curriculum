# Phase 3 Assignment Game Player Movement

Phase 3 adds the first local-only player movement prototype inside the gated `The Ember Gate` shell. The Phase 1 access gate still controls whether the shell renders.

## Added

- Keyboard movement with Arrow keys and WASD.
- Local player state for position, facing direction, movement status, and last input direction.
- Diagonal movement normalization so diagonal travel is not faster than straight travel.
- Rectangular viewport bounds so the player token stays inside the visible courtyard.
- A first-pass player sprite with directional idle frames and four-frame walking sheets.
- HUD movement readout alongside the existing placeholder Health, Energy, Inventory, and Objective items.
- Pause-safe input behavior: pausing stops movement, resuming keeps the current position, and Restart Preview resets to spawn.

## How Movement Works

Movement uses React state and browser keyboard events only. `useKeyboardMovement` tracks active movement keys, prevents Arrow-key page scrolling while the preview is active, and cleans up listeners when disabled or unmounted. `usePlayerMovement` advances the player with `requestAnimationFrame`, clamps the player to normalized viewport bounds, and resets when the local preview key changes.

## Player Sprite Assets

Player art lives in `public/assets/assignment-game/player/`. Idle sprites are 128x128 PNGs. Walking spritesheets are 512x128 PNGs with four horizontal 128x128 frames. The Phase 3 renderer switches idle and walking artwork by facing direction with CSS classes; it does not create any save state or backend dependency.

## Intentionally Not Implemented

- Combat, sword attacks, projectiles, enemies, damage, or health logic.
- Inventory behavior, item pickup, dialogue, or progression flags.
- Tile collision, wall collision, platform physics, jumping, gravity, or pathfinding.
- Save/load persistence, Firestore writes, localStorage, IndexedDB, Storage, or backend game state.
- A game engine dependency or any sprite asset pipeline beyond static public PNG files.

## Phase 4 Next Step

Phase 4 should introduce the first medieval level/map layout inside the existing movement viewport. Keep collision and persistence scoped carefully unless a later phase explicitly adds them.
