import type { AssignmentGameNpcDefinition } from '../dialogueTypes';

export const assignmentGameNpcs: readonly AssignmentGameNpcDefinition[] = [
  {
    id: 'lantern-keeper',
    name: 'Lantern Keeper',
    title: 'Keeper of the First Gate',
    description: 'A quiet guide watches the first restored gate.',
    position: { x: 35, y: 54 },
    interactionRadius: 10,
    dialogue: [
      {
        id: 'first-gate',
        text: 'You made it through the first gate.',
      },
      {
        id: 'assignment',
        text: 'Most students see only the assignment. A few notice what waits after it.',
      },
      {
        id: 'restores',
        text: 'Each completed task restores another piece of this place.',
      },
      {
        id: 'return',
        text: 'Return when the next gate opens.',
      },
    ],
  },
];
