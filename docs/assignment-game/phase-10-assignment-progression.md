# Phase 10 Assignment Progression

Phase 10 adds the first assignment-driven progression milestone to The Ember Gate. It uses the
existing verified submission unlock signal from `/student/game`; it does not create a second
student-completion system.

## Added

- A small progression snapshot model for the first gate:
  - `unlockedGateIds`
  - `unlockedAreaIds`
  - `completedTargetIds`
- Save snapshot version `2` with progression persisted inside `apps/dcc/gameSaves`.
- Defensive hydration so older Phase 9 saves can load and derive the first gate from the verified
  current target.
- A HUD progression readout.
- A restored Ember Gate visual state in the Ruined Courtyard map.
- A progression panel that tells the student the Gate Passage is restored.
- Firestore rules that allow only the reviewed first-gate progression shape and tie
  `completedTargetIds[0]` to the save document's verified target id.

## Progression Strategy

The first progression milestone is intentionally scoped to the active assignment target:

```text
completed target -> ember-gate open -> ember-gate-passage restored
```

Because `AssignmentGameShell` only receives a save context after `StudentGamePage` verifies access,
the client derives this first progression state from the same completion signal that unlocks the
game. The rules still enforce the persisted shape, so a direct client write cannot add future gates,
future areas, or unrelated completed target ids.

## Access Gate Safety

- `/student/game` remains behind the existing authenticated student route protection.
- `StudentGamePage` still performs the assignment-game access check before rendering gameplay.
- Locked students still see the locked state, not progression UI.
- Save writes still require a verified submission by the same student for the same class, target,
  active item, and program area.
- Future progression fields are rejected by Firestore rules until a later reviewed phase adds them.

## Intentionally Not Implemented

- A second playable map beyond the Ember Gate.
- Historical multi-assignment progression.
- Teacher-selected milestones.
- Teacher/admin progression controls.
- Progression based on quiz attempts or portfolio checkpoints.
- Any new dependency, game engine, or Firebase Storage usage.

## Phase 11 Next Step

Phase 11 should add the approved Hidden Frame Easter egg clue without exposing private student data
or bypassing the assignment gate.
