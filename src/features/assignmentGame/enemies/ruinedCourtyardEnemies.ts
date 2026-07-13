import type { AssignmentGameEnemyDefinition } from '../enemyTypes';

export const assignmentGameEnemyStartingHealth = 40;
export const assignmentGameEnemyContactDamage = 10;

export const ruinedCourtyardEnemies: readonly AssignmentGameEnemyDefinition[] = [
  {
    id: 'hollow-squire-01',
    kind: 'hollowSquire',
    name: 'Hollow Squire',
    maxHealth: assignmentGameEnemyStartingHealth,
    contactDamage: assignmentGameEnemyContactDamage,
    spawn: { x: 66, y: 64 },
    patrolStart: { x: 52, y: 64 },
    patrolEnd: { x: 78, y: 64 },
    speed: 9,
    description: 'A cracked training armor patrols the lower courtyard stones.',
  },
  {
    id: 'ash-wisp-01',
    kind: 'ashWisp',
    name: 'Ash Wisp',
    maxHealth: assignmentGameEnemyStartingHealth,
    contactDamage: assignmentGameEnemyContactDamage,
    spawn: { x: 78, y: 34 },
    patrolStart: { x: 78, y: 25 },
    patrolEnd: { x: 78, y: 48 },
    speed: 12,
    description: 'A drifting ember spirit watches the sealed gate approach.',
  },
];
