# The Ember Gate Acceptance Criteria

These criteria define the target classroom-ready state for The Ember Gate, the assignment-unlocked
student game inside DCC Creative Studio. Each phase should satisfy only its approved scope and avoid
pulling later gameplay, persistence, or security work forward too early.

## 1. Access Gate

- `/student/game` is protected by the existing authenticated route structure.
- Only signed-in users with the `student` role can access the student game route.
- Locked students see a locked state, not gameplay.
- Direct navigation to `/student/game` does not bypass the gate.
- The gate checks the current signed-in student, not a route param or query string.
- The gate checks active class membership through the class roster and the student's `classIds`.
- The gate checks the active class assignment, mission, or target currently assigned by the teacher.
- The gate verifies submission status through the existing submission/completion system.
- The gate requires the active target to match the class active item.
- The gate fails closed if auth, class, active item, target, or submission data cannot be verified.
- The locked state includes a clear Back to Today path.
- Access checks do not weaken Firebase Auth, role checks, class checks, submission checks, or Firestore rules.

## 2. Shell And Start Menu

- The game shell renders only after the access gate returns unlocked access.
- The shell uses the working title `The Ember Gate`.
- The start menu includes New Game.
- Continue is visible but disabled until a save/load phase exists.
- Back to Today routes to `/today`.
- New Game opens a shell preview or gameplay viewport according to the current phase.
- The shell includes placeholder HUD areas for Health, Energy, Inventory, and Objective until those systems exist.
- Pause opens a pause menu.
- Resume returns to the same local preview state.
- Restart Preview resets current local preview state.
- Back to Start Menu exits the preview state.
- The shell does not create saves, combat, inventory, enemies, or dialogue before their phases.

## 3. Player Movement

- Player movement supports Arrow keys.
- Player movement supports WASD.
- The player can move up, down, left, and right.
- Diagonal movement is allowed and normalized so diagonal speed is not faster than straight movement.
- Player state includes position, facing direction, moving/idle status, and latest input direction.
- The player stays inside the visible gameplay bounds.
- Movement stops while paused.
- Resume keeps the current player position.
- Restart returns the player to the spawn point.
- Back to Start Menu clears the active local preview state.
- Movement uses local React state only until the save-system phase.
- Keyboard listeners are cleaned up when movement is disabled or the component unmounts.
- Arrow key movement prevents accidental page scroll while the game is active.

## 4. First Level: Ruined Courtyard

- The first level is named `Ruined Courtyard`.
- The level is represented by a data-driven level model, not hardcoded visual-only markup.
- The level model includes a stable level ID.
- The level model includes level dimensions.
- The level model includes player spawn coordinates.
- The level model includes blocked zones or blocked tiles.
- The level model includes objective text.
- The level visually includes stone floor.
- The level visually includes cracked stone.
- The level visually includes dirt or grass.
- The level visually includes castle walls.
- The level visually includes stairs or an entrance marker.
- The level visually includes a locked gate.
- The level visually includes magical boundary visuals.
- Use the provided `assignment-game-tileset.zip` assets from `game_ready_64/` if available.
- If a tile asset is missing, the level renders a graceful fallback instead of crashing.
- The level-only phase does not accidentally add combat, inventory, saves, dialogue, enemies, or progression.

## 5. Asset Integration

- Player assets come from `assignment-game-player-sprites.zip` when available.
- Player runtime assets belong under `public/assets/assignment-game/player/`.
- Player assets use `game_ready_128/`.
- Idle sprites are treated as 128x128 PNG files.
- Walking spritesheets are treated as 512x128 PNG files with four 128x128 horizontal frames.
- Tileset assets come from `assignment-game-tileset.zip` when available.
- Tile runtime assets belong under `public/assets/assignment-game/tiles/`.
- Tileset assets use `game_ready_64/`.
- Tile sprites are treated as 64x64 PNG files.
- Manifests are read before asset integration.
- Missing optional images use fallback rendering.
- Asset paths are centralized enough that later replacement does not require rewriting gameplay systems.

## 6. Combat: Sword And Energy Projectile

- Combat is introduced only in the combat phase.
- Starting player health is 100 unless the architecture is intentionally revised.
- Sword attack is short range.
- Sword damage starts at 25.
- Energy projectile is weaker than the sword.
- Energy Bolt damage starts at 10.
- Combat state is local-only until the save-system phase.
- Combat respects pause state.
- Combat does not damage locked or hidden gameplay states.
- Combat has visible feedback for attack direction, hit attempt, and hit result.
- Combat does not introduce Firestore writes.

## 7. Enemies: Hollow Squire And Ash Wisp

- Enemy implementation begins with Hollow Squire and Ash Wisp.
- Enemy health starts at 40 unless intentionally revised.
- Enemy contact damage starts at 10.
- Enemies cannot act while the game is paused.
- Enemies stay within level bounds or assigned patrol zones.
- Enemies have clear local state for health, status, and position.
- Enemies can be defeated by player combat.
- Enemy behavior does not require a heavy game engine dependency.
- Enemy state is local-only until persistence is explicitly approved.

## 8. Dialogue: Lantern Keeper NPC

- The first NPC is the Lantern Keeper.
- Dialogue is data-driven so future NPCs can be added without rewriting the component.
- Dialogue is reachable through an intentional interaction, not accidental collision only.
- Dialogue is keyboard accessible.
- Dialogue pauses or safely coexists with movement and combat input.
- Starter Lantern Keeper dialogue:

```txt
You made it through the first gate.

Most students see only the assignment.
A few notice what waits after it.

Each completed task restores another piece of this place.
Return when the next gate opens.
```

## 9. Inventory: Ember Shard, Rusty Key, Lantern Oil

- Inventory begins only in the inventory phase.
- Initial collectible items include Ember Shard, Rusty Key, and Lantern Oil.
- Items are represented by data, not hardcoded one-off UI.
- Collected items appear in the HUD or inventory UI.
- Item pickup respects level bounds and interaction distance.
- Inventory state is local-only until the save-system phase.
- Inventory does not create Firestore writes before reviewed save rules exist.

## 10. Save And Load With Firestore Later

- Save/load is implemented only in the save-system phase.
- Firestore is the persistence layer for student game progress.
- Firebase Storage is not used for game saves.
- Client-side checks are not sufficient for persisted save data.
- Firestore rules prove students can read and write only their own save documents.
- Firestore rules prevent students from forging assignment unlock/progression state.
- Save documents include enough identity context to scope progress to a student and class.
- Continue remains disabled until a real save document can be loaded safely.
- Save failures fail closed and never unlock content by default.

## 11. Assignment Progression

- Assignment progression uses existing assignment/submission completion signals unless a later phase creates a reviewed adapter.
- New areas unlock only from verified required work.
- Direct client changes cannot unlock future areas in persisted data.
- Progression checks include current student identity, class, active or eligible target, and completion status.
- Progression failures show clear student-facing copy and a Back to Today path.
- Progression remains compatible with multiple program areas.

## 12. Easter Egg Hidden Frame

- Easter egg integration is intentionally scoped to its approved phase.
- Hidden Frame clues do not expose student data or private app state.
- The first starter clue is:

```txt
THE FRAME REMEMBERS WHAT THE PAGE FORGOT.
```

- Easter egg clues are discoverable but do not block required classroom workflows.
- The integration respects the existing Hidden Frame routes and assets.

## 13. Teacher/Admin Controls If Supported

- Teacher/admin controls are added only if a later phase confirms the need.
- Controls must not impersonate real students.
- Controls must not create real student submissions or real game progress on behalf of students.
- Teacher/admin views respect assigned-class boundaries unless the user is an admin.
- Controls should support classroom troubleshooting without weakening student security.

## 14. Accessibility

- Gameplay screens include visible control instructions.
- Buttons are keyboard accessible.
- The game does not trap focus.
- Pause and Back to Today remain reachable.
- Important state changes have visible text, not color alone.
- Motion and animation respect the existing reduced-motion styling approach.
- Text remains readable across supported viewport sizes.
- The locked state, loading state, and error state are clear to students.

## 15. Testing And Validation

- Run `npm run lint` before marking a PR ready.
- Run `npm run build` before marking a PR ready.
- Run `npm run validate:curriculum` before marking a PR ready.
- Run `npm run validate:hidden-frame` before marking a PR ready.
- Document missing commands instead of pretending they ran.
- Document exact failures if a command fails.
- Include manual route and access-gate checks in PR notes.
- For frontend gameplay phases, manually verify locked and unlocked states.
- For asset phases, verify image dimensions and runtime URL loading where feasible.

## 16. Final Classroom-Ready Manual Verification

- A locked student visits `/student/game` and sees the locked state, not gameplay.
- An unlocked student opens `/student/game` and sees The Ember Gate.
- The student can return to `/today` from gameplay and locked states.
- The student can start a new game.
- Continue works only after the save-system phase is complete.
- Movement, combat, dialogue, inventory, progression, and saves behave according to their accepted phases.
- Refreshing `/student/game` does not bypass the access gate.
- Assignment progression unlocks only after verified required work.
- The game remains usable in both Unreal Engine Studio and Video Production Studio class contexts.
- No student can see another student's submissions, responses, or save data.
- Teacher/admin controls, if present, respect classroom privacy and role boundaries.
