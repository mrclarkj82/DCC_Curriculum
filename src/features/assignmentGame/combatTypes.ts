import type {
  AssignmentGameFacingDirection,
  AssignmentGameVector,
} from './playerMovementTypes';

export interface AssignmentGameCombatStats {
  playerHealth: number;
  swordDamage: number;
  energyBoltDamage: number;
}

export interface AssignmentGameSwordAttack {
  id: string;
  direction: AssignmentGameFacingDirection;
  position: AssignmentGameVector;
  ageMs: number;
}

export interface AssignmentGameEnergyBolt {
  id: string;
  position: AssignmentGameVector;
  direction: AssignmentGameVector;
  ageMs: number;
}

export interface AssignmentGameCombatState {
  stats: AssignmentGameCombatStats;
  activeSwordAttack: AssignmentGameSwordAttack | null;
  energyBolts: readonly AssignmentGameEnergyBolt[];
  isAttacking: boolean;
  lastAction: string;
}
