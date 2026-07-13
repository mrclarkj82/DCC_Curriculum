import type { AssignmentGameVector } from './playerMovementTypes';

export type AssignmentGameEnemyKind = 'hollowSquire' | 'ashWisp';
export type AssignmentGameEnemyStatus = 'alive' | 'defeated';

export interface AssignmentGameEnemyDefinition {
  id: string;
  kind: AssignmentGameEnemyKind;
  name: string;
  maxHealth: number;
  contactDamage: number;
  spawn: AssignmentGameVector;
  patrolStart: AssignmentGameVector;
  patrolEnd: AssignmentGameVector;
  speed: number;
  description: string;
}

export interface AssignmentGameEnemyState extends AssignmentGameEnemyDefinition {
  health: number;
  position: AssignmentGameVector;
  patrolDirection: 1 | -1;
  status: AssignmentGameEnemyStatus;
  lastHitBy?: string;
}

export interface AssignmentGameEnemiesState {
  enemies: readonly AssignmentGameEnemyState[];
  defeatedCount: number;
  remainingCount: number;
  lastEnemyEvent: string;
}
