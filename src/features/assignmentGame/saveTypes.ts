import type { ActiveItemType, SubmissionTargetType } from '../../types';
import type { AssignmentGameEnemyState } from './enemyTypes';
import type { AssignmentGameInventoryItemId, AssignmentGameInventoryState } from './inventoryTypes';
import type {
  AssignmentGameFacingDirection,
  AssignmentGamePlayerState,
  AssignmentGameVector,
} from './playerMovementTypes';
import type { AssignmentGameProgressionSnapshot } from './progressionTypes';

export const assignmentGameSaveSnapshotVersion = 2;

export interface AssignmentGameSavedPlayerState {
  position: AssignmentGameVector;
  facingDirection: AssignmentGameFacingDirection;
}

export interface AssignmentGameSaveSnapshot {
  snapshotVersion: typeof assignmentGameSaveSnapshotVersion;
  levelId: string;
  player: AssignmentGameSavedPlayerState;
  defeatedEnemyIds: string[];
  collectedItemIds: AssignmentGameInventoryItemId[];
  progression: AssignmentGameProgressionSnapshot;
}

export interface AssignmentGameSaveContext {
  uid: string;
  studentEmail: string;
  classId: string;
  programAreaId: string;
  targetType: SubmissionTargetType;
  targetId: string;
  activeItemType: ActiveItemType;
  activeItemId: string;
  submissionId: string;
}

export interface AssignmentGameSaveDocument extends AssignmentGameSaveContext {
  id: string;
  snapshot: AssignmentGameSaveSnapshot;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export function createAssignmentGameSaveSnapshot(
  levelId: string,
  playerState: AssignmentGamePlayerState,
  enemies: readonly AssignmentGameEnemyState[],
  inventoryState: AssignmentGameInventoryState,
  progression: AssignmentGameProgressionSnapshot,
): AssignmentGameSaveSnapshot {
  return {
    snapshotVersion: assignmentGameSaveSnapshotVersion,
    levelId,
    player: {
      position: {
        x: playerState.position.x,
        y: playerState.position.y,
      },
      facingDirection: playerState.facingDirection,
    },
    defeatedEnemyIds: enemies
      .filter((enemy) => enemy.status === 'defeated')
      .map((enemy) => enemy.id),
    collectedItemIds: inventoryState.collectedItems.map((item) => item.id),
    progression,
  };
}
