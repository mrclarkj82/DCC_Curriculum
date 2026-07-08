import type { AssignmentGameHudPlaceholder } from './gameShellTypes';
import type { AssignmentGameMovementBounds, AssignmentGameVector } from './playerMovementTypes';

export const assignmentGameWorkingTitle = 'The Ember Gate';

export const assignmentGameShellSubtitle =
  'A Phase 3 local movement prototype for the future assignment-unlocked adventure.';

export const assignmentGameObjectiveTeaser =
  'Walk the courtyard and test the first movement controls before the level map arrives.';

export const assignmentGameContinueMessage =
  'Continue will activate in a later phase when student-specific saves are added.';

export const assignmentGameHudPlaceholders: AssignmentGameHudPlaceholder[] = [
  { label: 'Health', value: 'Future meter' },
  { label: 'Energy', value: 'Future cooldowns' },
  { label: 'Inventory', value: 'Future items' },
  { label: 'Objective', value: 'Future quest step' },
];

export const assignmentGameMovementInstructions =
  'Move with Arrow keys or WASD. Press Escape or Pause to open the menu.';

export const assignmentGamePlayerSpawn: AssignmentGameVector = {
  x: 20,
  y: 72,
};

export const assignmentGameMovementBounds: AssignmentGameMovementBounds = {
  minX: 7,
  maxX: 93,
  minY: 18,
  maxY: 86,
};

export const assignmentGamePlayerSpeed = 32;
