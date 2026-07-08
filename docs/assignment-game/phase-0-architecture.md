# Phase 0 Assignment Game Architecture

This document audits the current DCC Creative Studio repository and proposes the Phase 1 architecture for an assignment-unlocked student game access gate. Phase 0 is documentation only. It does not add the game route, gate code, save code, or game implementation files.

## 1. Current Repository Summary

DCC Creative Studio is a React, Vite, TypeScript, and Firebase web app for a high school Digital Content Creators course. The current app supports Firebase Google SSO, student/teacher/admin roles, protected routes, Firestore-backed curriculum records, active class missions, teacher class management, student bell ringer and exit ticket responses, teacher student preview mode, and Google Drive / Docs / YouTube evidence link submissions.

The app is not Unreal-only. It supports at least two program areas:

- Unreal Engine Studio
- Video Production Studio

The app uses Cloud Firestore for application data and keeps DCC data namespaced under `apps/dcc` through `src/config/firestoreNamespace.ts`. Firebase Storage is configured but intentionally closed in `storage.rules`; current student evidence is link-based only.

## 2. Relevant Existing Files and Folders

- `src/App.tsx`: React Router route tree.
- `src/main.tsx`: app entry point.
- `src/auth/AuthProvider.tsx`: Firebase Auth state, Google SSO, user profile subscription, role helpers, and local demo profile.
- `src/auth/ProtectedRoute.tsx`: protected route wrapper and role-based access denial.
- `src/auth/RoleGate.tsx`: role-based UI helper.
- `src/pages/TodayPage.tsx`: student daily mission entry point, active class loading, active item resolution.
- `src/components/today/StudentTodayExperience.tsx`: renders active item content, response cards, and submission panel.
- `src/pages/AssignmentDetailPage.tsx`: dedicated assignment page and submission panel.
- `src/services/activeItemService.ts`: resolves class active item IDs into typed lesson, assignment, media project, broadcast update, quiz, or portfolio placeholder records.
- `src/services/assignmentService.ts`: Firestore reads for assignments.
- `src/services/submissionService.ts`: submission target resolution, student submission read/write, teacher review updates.
- `src/components/submissions/SubmissionPanel.tsx`: student evidence link workflow and submission subscription.
- `src/hooks/usePrimaryClassRecord.ts`: loads the signed-in user's first class record.
- `src/types/index.ts`: shared types for users, classes, active items, assignments, submissions, responses, and schedules.
- `src/firebase/client.ts`: Firebase app, Auth, Firestore, Functions, Storage, and Google provider initialization.
- `src/config/firestoreNamespace.ts`: DCC Firestore namespace helpers.
- `firestore.rules`: role, class, response, submission, curriculum, and admin security rules.
- `storage.rules`: currently denies all Storage reads/writes.
- `src/styles/theme.css`: core design tokens.
- `src/styles/synthwave.css`: DCC synthwave visual identity.
- `src/styles/globals.css`: global layout, typography, focus, and body background rules.
- `package.json`: Vite, TypeScript, ESLint, Firebase scripts.
- `firebase.json` and `.firebaserc`: Firebase Hosting target and project configuration.

## 3. Routing Findings

The app uses `react-router-dom` v6. The route tree is declared in `src/App.tsx`.

Current public routes:

- `/`
- `/login`

Current authenticated routes under `ProtectedRoute` and `AppShell`:

- `/today`
- `/join-class`
- `/areas`
- `/areas/unreal-engine`
- `/areas/video-production`
- `/lessons/:lessonId`
- `/assignments/:assignmentId`
- `/media-projects/:projectId`
- `/broadcast-updates/:updateId`

Teacher/admin routes are nested under `ProtectedRoute allowedRoles={['teacher', 'admin']}`:

- `/teacher`
- `/teacher/schedule`
- `/teacher/classes/:classId/student-preview`

Admin-only route:

- `/admin`

There is currently no `/student/...` route namespace. Adding `/student/game` would be consistent with the existing protected route tree if it is nested under the authenticated `AppShell`. Route-level role protection should use `ProtectedRoute allowedRoles={['student']}` or a page-level student gate if teacher/admin preview behavior is later needed.

## 4. Authentication and Student Identity Findings

Authentication uses Firebase Authentication with Google SSO in `src/auth/AuthProvider.tsx`. The provider:

- Tracks `firebaseUser` from `onAuthStateChanged`.
- Rejects non-approved email domains through `isAllowedEmailAccount`.
- Creates/subscribes to a Firestore user profile via `createUserProfileIfNeeded` and `subscribeToUserProfile`.
- Exposes `userProfile`, `role`, `classIds`, `isStudent`, `isTeacher`, `isAdmin`, and `isLocalDemoMode`.
- Supports a development-only local demo student profile with UID `local-demo-student`.

The shared `UserProfile` type has:

- `uid`
- `displayName`
- `email`
- `photoURL`
- `role`
- `classIds`

Student identity for the assignment game should always come from `userProfile.uid` after auth is loaded. Do not accept student IDs from route params or query strings. The access gate should confirm:

- Signed-in user has a profile.
- `userProfile.role === 'student'`.
- The student belongs to the relevant `ClassRecord.studentIds`.
- The class record is one of the student's assigned `classIds`.

## 5. Assignment Completion Findings

There is no dedicated `assignmentCompletions` collection in the current repo.

The best available completion signal is the existing submission workflow:

- `StudentTodayExperience` derives a submission target with `resolveSubmissionTargetForActiveItem(activeItem)`.
- `AssignmentDetailPage` derives a target with `resolveSubmissionTarget('assignment', assignment)`.
- `SubmissionPanel` subscribes to the current student's submission through `subscribeToSubmission(classId, targetType, targetId, uid)`.
- `submissionService.writeSubmission` requires:
  - at least one Google Drive, Google Docs, YouTube, or youtu.be link,
  - a non-empty reflection,
  - a complete evidence checklist,
  - a student-owned class-scoped submission document.
- Submission statuses are `submitted`, `resubmitted`, `needs_revision`, and `accepted`.

Recommended Phase 1 gate adapter:

```ts
async function canStudentAccessAssignmentGame(
  studentId: string,
  assignmentId: string,
  context: {
    classRecord: ClassRecord;
    activeItem: ActiveClassItem;
    userProfile: UserProfile;
  },
): Promise<AssignmentGameAccessResult>;
```

The adapter should connect to the existing system by resolving the same `SubmissionTarget` that the submission panel uses, then calling `getSubmission(classId, targetType, targetId, studentId)`.

For Phase 1, the completion rule should be:

- Student is authenticated and has `role === 'student'`.
- Student is in the active class roster.
- Active class item is the current mission, not an arbitrary assignment ID.
- A submission exists for the active target and current student.
- Submission status is one of `submitted`, `resubmitted`, or `accepted`.
- Submission has at least one evidence link.
- Submission reflection is non-empty.
- Submission evidence checklist is empty or all items are complete.

If later phases add a first-class completion collection, keep the adapter name and swap its internals to read that collection instead of deriving completion from submissions.

## 6. Database/Storage Findings

The existing backend database layer is Cloud Firestore:

- `src/firebase/client.ts` exports `db = getFirestore(app)`.
- `src/config/firestoreNamespace.ts` defaults to `apps/dcc`.
- `src/services/firestoreService.ts` provides generic collection and document reads.
- Domain services use Firebase client SDK imports directly when subscriptions or writes are needed.

Firebase Storage is not suitable for Phase 1 saves because `storage.rules` denies all access and current project instructions explicitly avoid uploads/media hosting unless a later phase requests them.

Recommended game progress persistence should use Firestore, not Storage.

Recommended collection:

```txt
apps/dcc/assignmentGameSaves/{saveId}
```

Recommended save ID for Phase 1:

```txt
{classId}_{uid}
```

This keeps one active save per student per class for the first slice. If the game later becomes assignment-by-assignment, the ID can become:

```txt
{classId}_{assignmentId}_{uid}
```

or a nested structure can be introduced:

```txt
apps/dcc/assignmentGameProgress/{uid}/classes/{classId}/assignments/{assignmentId}
```

Prefer the flat `assignmentGameSaves` collection for Phase 1 because the existing rules and services mostly use flat namespaced collections.

## 7. Recommended Game Entry Point

Primary entry point: `src/components/today/StudentTodayExperience.tsx`, near the existing `SubmissionPanel`.

Why:

- `/today` is already the active class workflow.
- It has `classRecord`, `activeItem`, `userProfile`, and the resolved submission target.
- It is the safest place to communicate "locked until required work is complete" because the student sees the assignment and evidence workflow in the same context.

Secondary entry point: `src/pages/AssignmentDetailPage.tsx`, below `SubmissionPanel`.

Why:

- It is where students already submit evidence for a specific assignment.
- It is a logical place to show locked/unlocked copy after the submission panel.
- It needs extra care to avoid unlocking stale assignments that are not the current active class item.

Do not add the game to the top nav in Phase 1. A global nav link would encourage direct navigation and make the access model feel like a general feature rather than an assignment reward.

## 8. Recommended Game Route

Recommended Phase 1 route:

```txt
/student/game
```

Add it inside the authenticated `AppShell` route tree in `src/App.tsx`. For Phase 1, the route should render a gate page only, not the game.

Why `/student/game`:

- It is short and student-facing.
- It can represent the current active class game unlock without putting untrusted assignment IDs in the URL.
- It avoids implying that any historical assignment can independently launch the game before the completion model is mature.
- It leaves room for later routes like `/student/assignments/:assignmentId/game` if assignment-specific progression becomes necessary.

Unauthorized access prevention:

- Route should be behind `ProtectedRoute`.
- Page should require `userProfile.role === 'student'`.
- Page should load the student's primary/current class with `usePrimaryClassRecord`.
- Page should resolve the class active item with `getActiveItem`.
- Page should call `canStudentAccessAssignmentGame`.
- Page should render locked copy if the gate fails.
- Page should never launch gameplay from route navigation alone.

## 9. Recommended Access Gate Strategy

Phase 1 should build access gating before building gameplay.

Recommended files:

- `src/services/assignmentGameAccessService.ts`
- `src/hooks/useAssignmentGameAccess.ts`
- `src/pages/AssignmentGamePage.tsx`
- `src/components/assignmentGame/AssignmentGameEntryCard.tsx`
- `src/components/assignmentGame/AssignmentGameGateView.tsx`

Recommended access result shape:

```ts
type AssignmentGameAccessState = 'loading' | 'locked' | 'unlocked' | 'unavailable';

interface AssignmentGameAccessResult {
  state: AssignmentGameAccessState;
  canAccess: boolean;
  reason: string;
  targetTitle: string;
  assignmentLink: string;
  submissionId: string | null;
}
```

Recommended implementation behavior:

- Use `resolveSubmissionTargetForActiveItem(activeItem)` for `/today` and `/student/game`.
- Use `resolveSubmissionTarget('assignment', assignment)` only on assignment detail pages.
- For direct route `/student/game`, resolve the active item from the class record and ignore arbitrary URL assignment IDs.
- Use `subscribeToSubmission` for live locked/unlocked UI in entry cards.
- Use `getSubmission` for one-time server-backed checks in service functions.
- Treat `needs_revision` as locked until the student resubmits.
- Treat teacher preview mode as read-only and locked for game access.

Firestore rules must also enforce the save side. Client-side gating alone is not enough.

## 10. Recommended Save System Strategy

Phase 1 may not need to write game saves if it only implements the access gate. Still, the gate should be designed with the save strategy in mind.

Recommended future save adapter:

- `src/services/assignmentGameSaveService.ts`
- `src/hooks/useAssignmentGameSave.ts`

Recommended save fields:

```ts
interface AssignmentGameSaveData {
  id: string;
  uid: string;
  classId: string;
  programAreaId: string;
  activeItemType: ActiveItemType;
  activeItemId: string;
  targetType: SubmissionTargetType;
  targetId: string;
  unlockSubmissionId: string;
  currentLevelId: string;
  checkpointId: string;
  playerPosition: { x: number; y: number };
  health: number;
  energy: number;
  inventory: Array<{ id: string; name: string; description: string }>;
  defeatedEnemyIds: string[];
  collectedItemIds: string[];
  progressionFlags: Record<string, boolean>;
  createdAt?: unknown;
  updatedAt?: unknown;
}
```

Recommended adapter behavior:

- Use Firestore when authenticated.
- Use localStorage only for development local demo mode.
- Do not use Firebase Storage.
- Do not store student media, private links beyond the existing submission document, or teacher feedback in game saves.
- Include `unlockSubmissionId` so Firestore rules can validate that the save belongs to a completed submission.

## 11. Proposed File/Folder Structure

Phase 1 should add gate-only files:

```txt
src/pages/AssignmentGamePage.tsx
src/components/assignmentGame/AssignmentGameEntryCard.tsx
src/components/assignmentGame/AssignmentGameGateView.tsx
src/hooks/useAssignmentGameAccess.ts
src/services/assignmentGameAccessService.ts
```

Future gameplay phases should add modular game files:

```txt
src/features/assignmentGame/types.ts
src/features/assignmentGame/level.ts
src/features/assignmentGame/gameState.ts
src/features/assignmentGame/playerMovement.ts
src/features/assignmentGame/combat.ts
src/features/assignmentGame/inventory.ts
src/features/assignmentGame/dialogue.ts
src/features/assignmentGame/progression.ts
src/services/assignmentGameSaveService.ts
src/hooks/useAssignmentGameSave.ts
src/components/assignmentGame/AssignmentGameExperience.tsx
src/components/assignmentGame/AssignmentGameHud.tsx
src/components/assignmentGame/AssignmentGameMenu.tsx
src/components/assignmentGame/AssignmentGameWorld.tsx
```

Do not add game engine dependencies in Phase 1. A later playable vertical slice can use deterministic TypeScript logic plus React/CSS/canvas if that fits the existing app.

## 12. Data Model Draft

Access gate input:

```ts
interface AssignmentGameAccessContext {
  studentId: string;
  userProfile: UserProfile | null;
  classRecord: ClassRecord | null;
  activeItem: ActiveClassItem | null;
  target: SubmissionTarget | null;
}
```

Access gate output:

```ts
interface AssignmentGameAccessResult {
  state: 'loading' | 'locked' | 'unlocked' | 'unavailable';
  canAccess: boolean;
  reason: string;
  targetTitle: string;
  assignmentLink: string;
  submissionId: string | null;
}
```

Firestore save draft:

```txt
apps/dcc/assignmentGameSaves/{classId}_{uid}
```

Document fields:

- `id`
- `uid`
- `classId`
- `programAreaId`
- `activeItemType`
- `activeItemId`
- `targetType`
- `targetId`
- `unlockSubmissionId`
- `currentLevelId`
- `checkpointId`
- `playerPosition`
- `health`
- `energy`
- `inventory`
- `defeatedEnemyIds`
- `collectedItemIds`
- `progressionFlags`
- `createdAt`
- `updatedAt`

## 13. Security Considerations

- Do not weaken Firebase Auth, role checks, Firestore rules, or Storage rules to make local testing easier.
- Do not allow students to unlock the game by typing `/student/game` directly.
- Do not trust route params for student identity.
- Do not allow teacher preview mode to create real student progress or submissions.
- Do not put game saves in student submission documents; keep them separate.
- Do not let students read classmates' game saves.
- Firestore save rules should require:
  - `request.auth.uid == request.resource.data.uid`,
  - `userRole() == 'student'`,
  - class exists,
  - student is in `classData(classId).studentIds`,
  - save program area matches class active program area,
  - save active item matches class active item,
  - target exists and matches program area,
  - `unlockSubmissionId` points to a completed submission owned by the same student,
  - bounded arrays and numeric fields.
- Admins may read saves if a future teacher/admin progress dashboard is explicitly requested; otherwise prefer owner-only reads.
- Storage must remain closed until a later upload phase designs rules.

## 14. Testing Strategy

Current test setup on `main`:

- No test script exists in `package.json`.
- No `*.test.*` or `*.spec.*` files were found.
- ESLint is available through `npm.cmd run lint`.
- Production build is available through `npm.cmd run build`.

Recommended Phase 1 tests:

- Add a lightweight Vite-native test runner only if approved by the Phase 1 scope, such as Vitest.
- Unit test `submissionCompletesAssignmentGameGate` or equivalent pure helper.
- Test locked access when no submission exists.
- Test locked access when submission has `needs_revision`.
- Test unlocked access when submission is submitted/resubmitted/accepted and has complete evidence.
- Test that non-student roles cannot unlock.
- Test that a student outside the class roster cannot unlock.
- Test route/page rendering for locked and unlocked states with simple component/server rendering.

If Phase 1 stays documentation plus tiny UI only, run `npm.cmd run lint` and `npm.cmd run build`. If tests are added, add and run `npm.cmd run test`.

## 15. Risks and Unknowns

- There is no dedicated assignment completion collection yet; using submissions as completion is practical but may not represent teacher-accepted mastery.
- `submitted` currently means student submitted work, not necessarily teacher approved it. The teacher may want unlock only after `accepted`.
- The app currently uses the first `classIds[0]` as the primary class. Multi-class student behavior may need a class selector later.
- `/student/game` is not an existing route namespace, though it fits the proposed student-only feature.
- Firestore rules for game saves do not exist yet.
- No automated test runner exists on `main`; adding one increases Phase 1 scope but improves confidence.
- Local demo mode has no class by default, so Phase 1 should decide whether demo mode needs mock class/active item data or stays locked.
- Phase 1 should not create gameplay files or game state beyond placeholder copy for locked/unlocked gate UI.

## 16. Phase 1 Implementation Plan

Phase 1 should implement the assignment game access gate only.

1. Add `/student/game` route inside the authenticated app shell.
2. Add `AssignmentGamePage` that loads `userProfile`, primary class, active item, and submission target.
3. Add `assignmentGameAccessService` with `canStudentAccessAssignmentGame(studentId, assignmentId)` and supporting helpers.
4. Add `useAssignmentGameAccess` for live locked/unlocked state.
5. Add `AssignmentGameEntryCard` below `SubmissionPanel` in `StudentTodayExperience`.
6. Add an optional entry card below `SubmissionPanel` in `AssignmentDetailPage`, gated to the current active class mission.
7. Render locked state copy when evidence is incomplete.
8. Render unlocked state copy and a disabled/future launch placeholder when evidence is complete.
9. Add Firestore rules only if Phase 1 writes gate/progress records. If Phase 1 is read-only gate UI, no new rules are required.
10. Keep all copy placeholders easy to edit.
11. Preserve synthwave styling with existing `.card`, `.mission-panel`, `.neon-border`, `.gradient-button`, and related classes.
12. Run lint and build.
13. Add tests if a test runner is introduced.

Phase 1 checklist:

- [ ] Create route `/student/game` inside protected app shell.
- [ ] Ensure route is student-only or page-gated to `userProfile.role === 'student'`.
- [ ] Add locked state when student is not signed in, not a student, not in class, active item is unavailable, target is unavailable, or submission is incomplete.
- [ ] Add unlocked state when the active assignment submission meets completion criteria.
- [ ] Add `canStudentAccessAssignmentGame(studentId, assignmentId)` adapter and document its connection to `getSubmission`.
- [ ] Add live entry card after the Today submission panel.
- [ ] Add assignment detail entry card only for the current active class mission.
- [ ] Add student-facing copy placeholders for locked and unlocked states.
- [ ] Do not implement gameplay yet.
- [ ] Do not create real game saves yet unless explicitly included in Phase 1.
- [ ] Add basic tests for the access helper and locked/unlocked render states if a test runner is introduced.
- [ ] Run `npm.cmd run lint`.
- [ ] Run `npm.cmd run build`.

## PR Notes for Phase 0

Testing notes for this documentation-only branch:

- `npm.cmd run lint` is appropriate because ESLint ignores Markdown and confirms no incidental app-code changes.
- `npm.cmd run build` is optional but useful to confirm the branch remains healthy after the audit-only change.
- No test command exists on `main` at Phase 0.

Phase 0 acceptance criteria:

- [x] Branch is isolated as `feature/assignment-game-architecture`.
- [x] Adds architecture documentation only.
- [x] Documents current repo structure, route/auth/data/rules/style findings.
- [x] Recommends a Phase 1 access gate strategy.
- [x] Recommends a future save system strategy.
- [x] Includes Phase 1 checklist.
