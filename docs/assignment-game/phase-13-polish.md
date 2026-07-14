# Phase 13 Polish And Final QA

Phase 13 is the classroom-readiness pass for The Ember Gate. It avoids new game systems and focuses
on tightening naming, documentation, validation, and manual QA coverage across the accepted phases.

## Added

- Renamed the assignment-game access adapter's second identifier from `assignmentId` to `targetId`.
- Renamed `AssignmentGameAccessResult.assignmentId` to `targetId`.
- Preserved the existing route, access gate behavior, submission lookup, save system, progression
  rules, and Hidden Frame clue behavior.
- Updated the progress log to remove the resolved target naming question.

## Why Target Id

The game unlock target can be a lesson-derived assignment, standalone assignment, media project, or
broadcast update. `targetId` matches the existing submission target model and will age better than
assignment-specific naming.

## Access Gate Safety

- `/student/game` remains behind authenticated student route protection.
- `StudentGamePage` still passes the active submission target id to `useAssignmentGameAccess`.
- `canStudentAccessAssignmentGame` still validates the signed-in student, class roster, active
  item, target, and submission before returning unlocked access.
- No Firestore rules or persisted save shape changed in this polish pass.

## Intentionally Not Implemented

- New gameplay systems.
- Teacher/admin controls.
- New persistence fields.
- New routes.
- Hidden Frame progression tracking.

## Final QA Focus

- Locked student sees locked state, not gameplay.
- Unlocked student can start The Ember Gate.
- Continue loads only after a Firestore save exists.
- Save Progress preserves position, defeated enemies, collected items, and first-gate progression.
- The Hidden Frame clue is optional and links to `/hidden-frame/archive`.
- Back to Today's Mission routes to `/today`.
