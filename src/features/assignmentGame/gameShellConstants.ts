import type { AssignmentGameHudPlaceholder } from './gameShellTypes';
import { ruinedCourtyardLevel } from './levels/ruinedCourtyardLevel';
import type { AssignmentGameMovementBounds, AssignmentGameVector } from './playerMovementTypes';

export const assignmentGameWorkingTitle = 'The Ember Gate';

export const assignmentGameShellSubtitle =
  'A Phase 9 Firestore save prototype for the assignment-unlocked adventure.';

export const assignmentGameObjectiveTeaser =
  ruinedCourtyardLevel.objectiveText;

export const assignmentGameContinueMessage =
  'Continue activates when a verified Firestore save exists for this student and assignment target.';

export const assignmentGameHudPlaceholders: AssignmentGameHudPlaceholder[] = [
  { label: 'Objective', value: ruinedCourtyardLevel.name },
];

export const assignmentGameMovementInstructions =
  'Move with Arrow keys or WASD. Press Space or J for sword, F or K for energy bolt. Press E or Enter near the Lantern Keeper, and press C near glowing items to collect them.';

export const assignmentGamePlayerSpawn: AssignmentGameVector = ruinedCourtyardLevel.playerSpawn;

export const assignmentGameMovementBounds: AssignmentGameMovementBounds =
  ruinedCourtyardLevel.movementBounds;

export const assignmentGamePlayerSpeed = 32;
