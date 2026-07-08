import type { AssignmentGameLevel } from './types';

export const assignmentGameLevel: AssignmentGameLevel = {
  id: 'ember-gate-approach',
  title: 'Ember Gate Approach',
  subtitle: 'A first playable assignment reward level',
  width: 760,
  height: 440,
  playerSpawn: { x: 86, y: 318 },
  guide: {
    id: 'guide-aldric',
    name: 'Aldric of the Signal Flame',
    position: { x: 148, y: 158 },
    dialogue: [
      'The gate listens for proof of craft. Clear the shades, claim the crest, and step into the light.',
      'Your sword is stronger up close. Your energy bolt is safer from range, but it drains focus.',
    ],
  },
  enemies: [
    {
      id: 'briar-shade',
      name: 'Briar Shade',
      position: { x: 448, y: 162 },
      maxHealth: 55,
      speed: 54,
      attackDamage: 8,
      radius: 18,
    },
    {
      id: 'gate-wisp',
      name: 'Gate Wisp',
      position: { x: 612, y: 298 },
      maxHealth: 46,
      speed: 68,
      attackDamage: 7,
      radius: 16,
    },
  ],
  collectibles: [
    {
      id: 'sunlit-crest',
      item: {
        id: 'sunlit-crest',
        name: 'Sunlit Crest',
        description: 'A warm bronze crest that hums near sealed gates.',
      },
      position: { x: 352, y: 318 },
      radius: 18,
    },
  ],
  portal: {
    id: 'ember-gate',
    name: 'Ember Gate',
    position: { x: 684, y: 92 },
    radius: 34,
  },
};

export const emptyInputState = {
  up: false,
  down: false,
  left: false,
  right: false,
};
