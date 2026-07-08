import type { AssignmentGameHudPlaceholder } from './gameShellTypes';

export const assignmentGameWorkingTitle = 'The Ember Gate';

export const assignmentGameShellSubtitle =
  'A Phase 2 shell for the future assignment-unlocked adventure.';

export const assignmentGameObjectiveTeaser =
  'Find the ember key beyond the old gate when the playable prototype arrives.';

export const assignmentGameContinueMessage =
  'Continue will activate in a later phase when student-specific saves are added.';

export const assignmentGameHudPlaceholders: AssignmentGameHudPlaceholder[] = [
  { label: 'Health', value: 'Future meter' },
  { label: 'Energy', value: 'Future cooldowns' },
  { label: 'Inventory', value: 'Future items' },
  { label: 'Objective', value: 'Future quest step' },
];
