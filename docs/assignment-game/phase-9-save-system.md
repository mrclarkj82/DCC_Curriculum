# Phase 9 Save And Continue System

Phase 9 adds the first persisted save loop for The Ember Gate. It keeps the existing assignment
access gate as the authority for entering the game, then writes a narrow Firestore save document
only after the signed-in student has a verified submission for the active class target.

## Added

- Student-specific save documents under `apps/dcc/gameSaves`.
- A save context derived from the already verified student, class, active item, submission target,
  and submission id.
- `Save Progress` in the shell toolbar after the game has unlocked.
- Start-menu `Continue` support that enables only when a Firestore save exists for the same
  student and target.
- Save hydration for:
  - Ruined Courtyard level id.
  - Player position and facing direction.
  - Defeated enemy ids.
  - Collected inventory item ids.
- Defensive save parsing so unknown collectible ids are ignored and saved player positions are
  clamped back into the existing movement bounds.
- Firestore rules for creating, reading, and updating save documents.

## Firestore Shape

Save documents live at:

```text
apps/dcc/gameSaves/{classId}_{targetType}_{targetId}_{uid}
```

Each document stores:

```text
id
uid
studentEmail
classId
programAreaId
targetType
targetId
activeItemType
activeItemId
submissionId
snapshot
createdAt
updatedAt
```

The `snapshot` currently stores:

```text
snapshotVersion: 1
levelId: ruined-courtyard
player.position.x
player.position.y
player.facingDirection
defeatedEnemyIds
collectedItemIds
```

## Rules Strategy

The rules fail closed and allow only the signed-in student to read or write their own save. A save
write must match:

- The authenticated uid and email.
- A real class where the uid is both in the class roster and in the user profile `classIds`.
- The class active program area, active item type, and active item id.
- A valid submission target.
- An existing submission by the same student with an accepted unlock status, at least one evidence
  link, and a non-empty reflection.
- The strict Phase 9 snapshot schema.

Students cannot list all game saves, delete saves, write saves for classmates, write saves for
inactive targets, or persist arbitrary future progression fields.

## Access Gate Safety

- `/student/game` remains behind the existing authenticated student route protection.
- `StudentGamePage` still runs the assignment access check before rendering `AssignmentGameShell`.
- Save context is created only after the access gate returns `allowed`.
- The save system does not unlock gameplay on its own. It only persists progress after the existing
  gate has already verified the current student and target.
- Locked students continue to see the locked gate state and never receive the game shell.

## Intentionally Not Implemented

- Assignment progression or new area unlocks.
- Teacher/admin save management.
- Save slots, manual save naming, cloud conflict resolution, or cross-target save migration.
- Dialogue history, health persistence, combat cooldown persistence, or NPC state persistence.
- Firebase Storage, localStorage, IndexedDB, or a heavy game engine.

## Phase 10 Next Step

Phase 10 should use verified assignment progress to unlock additional areas or gates. It should
reuse the save document cautiously, adding only reviewed progression fields that have matching
Firestore rules and clear classroom behavior.
