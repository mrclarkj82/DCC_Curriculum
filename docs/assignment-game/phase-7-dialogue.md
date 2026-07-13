# Phase 7 Dialogue

Phase 7 adds the first local-only NPC dialogue interaction to the gated Ruined Courtyard prototype.
The Phase 1 access gate still controls whether `AssignmentGameShell` can render, and dialogue state
does not persist outside the current browser session.

## Added

- Data-driven Lantern Keeper NPC definition with position, interaction radius, title, description,
  and dialogue lines.
- Starter Lantern Keeper dialogue:

```txt
You made it through the first gate.

Most students see only the assignment.
A few notice what waits after it.

Each completed task restores another piece of this place.
Return when the next gate opens.
```

- Local dialogue state for nearby NPC, active NPC, active line index, current line, and latest
  dialogue event.
- Intentional interaction through E or Enter while near the Lantern Keeper.
- Keyboard dialogue advancement with Enter or Space.
- Escape closes active dialogue without opening the pause menu.
- Dialogue panel with Next, Close, line counter, speaker name, and title.
- Lightweight CSS fallback Lantern Keeper NPC sprite. No optional image asset is required.
- Input-safe dialogue behavior: movement, combat, and enemies stop while dialogue is open.

## Access Gate Safety

- `/student/game` remains behind the existing authenticated student route protection.
- `StudentGamePage` still performs the assignment-game access check before rendering
  `AssignmentGameShell`.
- Locked students continue to see the locked gate state instead of the game shell.
- Direct navigation to `/student/game` does not bypass the page-level access gate.

## Intentionally Not Implemented

- Persistent dialogue state, Firestore saves, localStorage, IndexedDB, or Firebase Storage.
- Branching dialogue, quest flags, teacher-selected dialogue, or assignment progression.
- Inventory behavior, item pickup, rewards, collectibles, or area unlocks.
- Teacher/admin game controls.
- A new dependency or heavy game engine.

## Phase 8 Next Step

Phase 8 should add local-only inventory and collectibles for Ember Shard, Rusty Key, and Lantern
Oil. Keep inventory state local until the save-system phase and do not add Firestore writes,
assignment progression, or teacher/admin controls unless the phase explicitly expands.
