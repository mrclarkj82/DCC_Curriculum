import type { AssignmentGameInventoryItemDefinition } from '../inventoryTypes';

export const ruinedCourtyardInventoryItems: readonly AssignmentGameInventoryItemDefinition[] = [
  {
    id: 'emberShard',
    name: 'Ember Shard',
    shortName: 'Shard',
    description: 'A warm splinter of the sealed gate flame.',
    position: { x: 47, y: 45 },
    interactionRadius: 8,
  },
  {
    id: 'rustyKey',
    name: 'Rusty Key',
    shortName: 'Key',
    description: 'An old key that does not fit this gate yet.',
    position: { x: 25, y: 65 },
    interactionRadius: 8,
  },
  {
    id: 'lanternOil',
    name: 'Lantern Oil',
    shortName: 'Oil',
    description: 'A small vial for a lantern that has not gone out.',
    position: { x: 71, y: 53 },
    interactionRadius: 8,
  },
];
