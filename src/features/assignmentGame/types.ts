import type { ActiveItemType, SubmissionTargetType } from '../../types';

export interface AssignmentGameVector {
  x: number;
  y: number;
}

export type AssignmentGameDirection = 'up' | 'down' | 'left' | 'right';

export interface AssignmentGameInventoryItem {
  id: string;
  name: string;
  description: string;
}

export interface AssignmentGamePlayer {
  position: AssignmentGameVector;
  facing: AssignmentGameDirection;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  swordCooldownMs: number;
  projectileCooldownMs: number;
}

export interface AssignmentGameEnemy {
  id: string;
  name: string;
  position: AssignmentGameVector;
  health: number;
  maxHealth: number;
  speed: number;
  attackDamage: number;
  attackCooldownMs: number;
  radius: number;
  alive: boolean;
}

export interface AssignmentGameProjectile {
  id: string;
  position: AssignmentGameVector;
  velocity: AssignmentGameVector;
  damage: number;
  ttlMs: number;
  radius: number;
}

export interface AssignmentGameCollectible {
  id: string;
  item: AssignmentGameInventoryItem;
  position: AssignmentGameVector;
  radius: number;
}

export interface AssignmentGameGuide {
  id: string;
  name: string;
  position: AssignmentGameVector;
  dialogue: string[];
}

export interface AssignmentGamePortal {
  id: string;
  name: string;
  position: AssignmentGameVector;
  radius: number;
}

export interface AssignmentGameLevel {
  id: string;
  title: string;
  subtitle: string;
  width: number;
  height: number;
  playerSpawn: AssignmentGameVector;
  guide: AssignmentGameGuide;
  enemies: Omit<AssignmentGameEnemy, 'health' | 'attackCooldownMs' | 'alive'>[];
  collectibles: AssignmentGameCollectible[];
  portal: AssignmentGamePortal;
}

export interface AssignmentGameInputState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

export type AssignmentGameMode = 'menu' | 'playing' | 'victory' | 'defeated';

export interface AssignmentGameRuntimeState {
  mode: AssignmentGameMode;
  currentLevelId: string;
  checkpointId: string;
  player: AssignmentGamePlayer;
  enemies: AssignmentGameEnemy[];
  projectiles: AssignmentGameProjectile[];
  inventory: AssignmentGameInventoryItem[];
  defeatedEnemyIds: string[];
  collectedItemIds: string[];
  progressionFlags: Record<string, boolean>;
  message: string;
  dialogue: string;
  elapsedMs: number;
  sequence: number;
}

export interface AssignmentGameProgressSnapshot {
  currentLevelId: string;
  checkpointId: string;
  playerPosition: AssignmentGameVector;
  health: number;
  energy: number;
  inventory: AssignmentGameInventoryItem[];
  defeatedEnemyIds: string[];
  collectedItemIds: string[];
  progressionFlags: Record<string, boolean>;
}

export interface AssignmentGameSaveData extends AssignmentGameProgressSnapshot {
  id: string;
  uid: string;
  classId: string;
  programAreaId: string;
  activeItemType: ActiveItemType;
  activeItemId: string;
  targetType: SubmissionTargetType;
  targetId: string;
  unlockSubmissionId: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}
