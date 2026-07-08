# Phase 2 Assignment Game Shell

Phase 2 adds the first reusable UI shell for the assignment-unlocked student game. The shell only renders after the Phase 1 access gate returns unlocked access for the signed-in student.

## Added

- `AssignmentGameShell` with local React state for `startMenu`, `shellPreview`, and `paused`.
- Start menu for the working title `The Ember Gate`.
- New Game action that opens a non-playable shell preview.
- Disabled Continue action with copy explaining that student-specific saves are not active yet.
- Back to Today's Mission action that returns to `/today`.
- Non-playable medieval viewport mockup.
- HUD placeholders for Health, Energy, Inventory, and Objective.
- Pause menu with Resume, Restart Preview, and Back to Start Menu.

## Intentionally Not Implemented

- Player movement.
- Combat, enemies, damage, or collision.
- Inventory data or item collection.
- Dialogue or progression flags.
- Save/load persistence.
- Firestore writes, Firestore rules, Storage uploads, or localStorage saves.
- Canvas gameplay or sprites.

## Phase 3 Next Step

Phase 3 should add the first player movement prototype inside the existing gated shell. Keep it local-only until a later persistence phase adds a reviewed save model and Firestore rules.
