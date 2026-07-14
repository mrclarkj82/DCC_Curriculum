# Phase 11 Easter Egg Integration

Phase 11 adds the first Hidden Frame Easter egg clue inside The Ember Gate. The clue is optional,
appears only after the assignment-gated game has unlocked and the Ember Gate progression state is
restored, and links to the existing Hidden Frame archive route.

## Added

- `AssignmentGameHiddenFrameClue` as a small game-side wrapper around the existing
  `HiddenFrameIcon`.
- The approved starter clue:

```text
THE FRAME REMEMBERS WHAT THE PAGE FORGOT.
```

- A link from the clue to `/hidden-frame/archive`.
- Hidden Frame spec/canon documentation for the assignment-game clue.
- Progress log updates for Phase 11.

## Access Gate Safety

- `/student/game` remains behind the existing authenticated student route protection.
- The clue is rendered only inside the game shell, which still requires the assignment access gate.
- The clue uses static copy and the existing Hidden Frame route; it does not read or expose student
  submissions, responses, saves, class records, or private app state.
- The clue does not create Firestore writes and does not affect assignment progression or save data.

## Intentionally Not Implemented

- New Hidden Frame files, passwords, puzzles, routes, or Firestore persistence.
- Student discovery tracking.
- Teacher/admin controls.
- Any required workflow step tied to the clue.
- Any external link or instruction to leave the DCC site.

## Phase 12 Next Step

Phase 12 should add teacher/admin controls only if classroom troubleshooting needs are confirmed.
If controls are skipped, move directly to Phase 13 polish and final QA.
