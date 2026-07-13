# Phase 4 Ruined Courtyard Level

Phase 4 adds the first data-driven top-down level for The Ember Gate. The Phase 1 access gate still
controls whether the shell renders, and Phase 3 movement remains local-only.

## Added

- Level data model types for tile IDs, dimensions, blocked zones, features, and level metadata.
- `Ruined Courtyard` as the first level.
- A 12 x 8 tile grid with 64px source tile assumptions.
- Player spawn and movement bounds sourced from the level model.
- Objective text sourced from the level model.
- Data-driven tile rendering with fallback backgrounds when an optional image asset is missing.
- Visual blocked zones for walls, voids, and the sealed Ember Gate.
- First-pass tiles from `assignment-game-tileset.zip` / `game_ready_64/`.
- Compact level metadata in the viewport for debugging and review.

## Asset Paths

Runtime tile assets live in `public/assets/assignment-game/tiles/`.

The integrated tiles are:

- `tile_stone_floor.png`
- `tile_cracked_stone_floor.png`
- `tile_grass_edge.png`
- `tile_dirt_path.png`
- `tile_castle_wall.png`
- `tile_castle_wall_top.png`
- `tile_castle_corner.png`
- `tile_stairs.png`
- `tile_shadow.png`
- `tile_water_or_void.png`
- `tile_locked_boundary.png`

## Intentionally Not Implemented

- Combat, sword attacks, projectiles, enemies, damage, or health logic.
- Inventory behavior, item pickup, dialogue, or progression flags.
- Tile collision, wall collision, pathfinding, platform physics, jumping, or gravity.
- Save/load persistence, Firestore writes, localStorage, IndexedDB, Storage, or backend game state.
- Teacher/admin controls.

## Phase 5 Next Step

Phase 5 should add the combat foundation only: short-range sword attack, weaker ranged energy bolt,
local-only combat state, and visible attack feedback. Keep enemies, inventory, saves, and progression
out of Phase 5 unless a later instruction explicitly expands the scope.
