import { describe, expect, it } from 'vitest';
import {
  createNewAssignmentGameState,
  fireEnergyProjectile,
  performSwordAttack,
  restoreAssignmentGameStateFromSave,
  setAssignmentGameMode,
  snapshotAssignmentGameProgress,
  tickAssignmentGame,
} from './gameLogic';
import { assignmentGameLevel, emptyInputState } from './level';
import type { AssignmentGameRuntimeState, AssignmentGameSaveData } from './types';

function playableState() {
  return setAssignmentGameMode(createNewAssignmentGameState(), 'playing');
}

describe('assignment game logic', () => {
  it('moves the player with directional input', () => {
    const start = playableState();
    const moved = tickAssignmentGame(start, { ...emptyInputState, right: true }, 500);

    expect(moved.player.position.x).toBeGreaterThan(start.player.position.x);
  });

  it('damages nearby enemies with the sword attack', () => {
    const enemy = assignmentGameLevel.enemies[0];
    const state = {
      ...playableState(),
      player: {
        ...playableState().player,
        position: { x: enemy.position.x - 34, y: enemy.position.y },
        facing: 'right' as const,
      },
    };
    const attacked = performSwordAttack(state);

    expect(attacked.enemies[0].health).toBeLessThan(enemy.maxHealth);
  });

  it('damages enemies at range with an energy projectile', () => {
    const enemy = assignmentGameLevel.enemies[0];
    let state: AssignmentGameRuntimeState = {
      ...playableState(),
      player: {
        ...playableState().player,
        position: { x: enemy.position.x - 118, y: enemy.position.y },
        facing: 'right' as const,
      },
    };

    state = fireEnergyProjectile(state);

    for (let index = 0; index < 8; index += 1) {
      state = tickAssignmentGame(state, emptyInputState, 50);
    }

    expect(state.enemies[0].health).toBeLessThan(enemy.maxHealth);
  });

  it('adds the level collectible to inventory', () => {
    const collectible = assignmentGameLevel.collectibles[0];
    const state = {
      ...playableState(),
      player: {
        ...playableState().player,
        position: { ...collectible.position },
      },
    };
    const collected = tickAssignmentGame(state, emptyInputState, 16);

    expect(collected.inventory).toContainEqual(collectible.item);
  });

  it('serializes and restores save progress without losing state', () => {
    const collectible = assignmentGameLevel.collectibles[0];
    const collected = tickAssignmentGame(
      {
        ...playableState(),
        player: {
          ...playableState().player,
          position: { ...collectible.position },
        },
      },
      emptyInputState,
      16,
    );
    const progress = snapshotAssignmentGameProgress(collected);
    const saveData: AssignmentGameSaveData = {
      id: 'class-1_student-1',
      uid: 'student-1',
      classId: 'class-1',
      programAreaId: 'unreal-engine',
      activeItemType: 'assignment',
      activeItemId: 'assignment-1',
      targetType: 'assignment',
      targetId: 'assignment-1',
      unlockSubmissionId: 'class-1_assignment_assignment-1_student-1',
      ...progress,
    };
    const restored = restoreAssignmentGameStateFromSave(saveData);

    expect(restored.inventory[0]?.id).toBe(collectible.item.id);
    expect(restored.player.position).toEqual(progress.playerPosition);
  });
});
