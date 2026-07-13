import type { AssignmentGameHudPlaceholder } from './gameShellTypes';
import { ruinedCourtyardLevel } from './levels/ruinedCourtyardLevel';
import type { AssignmentGameMovementBounds, AssignmentGameVector } from './playerMovementTypes';

export const assignmentGameWorkingTitle = 'The Ember Gate';

export const assignmentGameShellSubtitle =
  'A Phase 7 local dialogue prototype for the future assignment-unlocked adventure.';

export const assignmentGameObjectiveTeaser =
  ruinedCourtyardLevel.objectiveText;

export const assignmentGameContinueMessage =
  'Continue will activate in a later phase when student-specific saves are added.';

export const assignmentGameHudPlaceholders: AssignmentGameHudPlaceholder[] = [
  { label: 'Inventory', value: 'Future items' },
  { label: 'Objective', value: ruinedCourtyardLevel.name },
];

export const assignmentGameMovementInstructions =
  'Move with Arrow keys or WASD. Press Space or J for sword, F or K for energy bolt. Press E or Enter near the Lantern Keeper to talk.';

export const assignmentGamePlayerSpawn: AssignmentGameVector = ruinedCourtyardLevel.playerSpawn;

export const assignmentGameMovementBounds: AssignmentGameMovementBounds =
  ruinedCourtyardLevel.movementBounds;

export const assignmentGamePlayerSpeed = 32;
