import { useEffect, useRef, useState } from 'react';
import type { AssignmentGameCombatState, AssignmentGameEnergyBolt } from '../combatTypes';
import type {
  AssignmentGameEnemiesState,
  AssignmentGameEnemyState,
} from '../enemyTypes';
import { ruinedCourtyardEnemies } from '../enemies/ruinedCourtyardEnemies';
import type {
  AssignmentGamePlayerState,
  AssignmentGameVector,
} from '../playerMovementTypes';

const swordHitRange = 10;
const energyBoltHitRange = 6;
const contactRange = 5;
const initialEnemyEvent = 'Hollow Squire and Ash Wisp patrol the courtyard.';

type AssignmentGameEnemyRuntimeState = Pick<
  AssignmentGameEnemiesState,
  'enemies' | 'lastEnemyEvent'
>;

function createInitialEnemyState(): AssignmentGameEnemyState[] {
  return ruinedCourtyardEnemies.map((enemy) => ({
    ...enemy,
    health: enemy.maxHealth,
    position: enemy.spawn,
    patrolDirection: 1,
    status: 'alive',
  }));
}

function distanceBetween(first: AssignmentGameVector, second: AssignmentGameVector): number {
  return Math.hypot(first.x - second.x, first.y - second.y);
}

function moveEnemyOnPatrol(
  enemy: AssignmentGameEnemyState,
  deltaSeconds: number,
): AssignmentGameEnemyState {
  const patrolTarget = enemy.patrolDirection === 1 ? enemy.patrolEnd : enemy.patrolStart;
  const distanceToTarget = distanceBetween(enemy.position, patrolTarget);

  if (distanceToTarget <= enemy.speed * deltaSeconds) {
    return {
      ...enemy,
      position: patrolTarget,
      patrolDirection: (enemy.patrolDirection === 1 ? -1 : 1) as 1 | -1,
    };
  }

  const movementRatio = (enemy.speed * deltaSeconds) / Math.max(distanceToTarget, 0.01);

  return {
    ...enemy,
    position: {
      x: enemy.position.x + (patrolTarget.x - enemy.position.x) * movementRatio,
      y: enemy.position.y + (patrolTarget.y - enemy.position.y) * movementRatio,
    },
  };
}

function swordHitPosition(combatState: AssignmentGameCombatState): AssignmentGameVector | null {
  const swordAttack = combatState.activeSwordAttack;

  if (!swordAttack) {
    return null;
  }

  switch (swordAttack.direction) {
    case 'north':
      return { x: swordAttack.position.x, y: swordAttack.position.y - 8 };
    case 'south':
      return { x: swordAttack.position.x, y: swordAttack.position.y + 8 };
    case 'east':
      return { x: swordAttack.position.x + 8, y: swordAttack.position.y };
    case 'west':
      return { x: swordAttack.position.x - 8, y: swordAttack.position.y };
  }
}

function boltHit(
  enemy: AssignmentGameEnemyState,
  energyBolts: readonly AssignmentGameEnergyBolt[],
): AssignmentGameEnergyBolt | null {
  return (
    energyBolts.find((bolt) => distanceBetween(enemy.position, bolt.position) <= energyBoltHitRange) ??
    null
  );
}

function applyDamage(
  enemy: AssignmentGameEnemyState,
  damage: number,
  hitId: string,
): AssignmentGameEnemyState {
  const nextHealth = Math.max(enemy.health - damage, 0);

  return {
    ...enemy,
    health: nextHealth,
    status: nextHealth <= 0 ? 'defeated' : 'alive',
    lastHitBy: hitId,
  };
}

export function useAssignmentGameEnemies(
  isEnabled: boolean,
  resetKey: number,
  combatState: AssignmentGameCombatState,
  playerState: AssignmentGamePlayerState,
): AssignmentGameEnemiesState {
  const combatStateRef = useRef(combatState);
  const playerStateRef = useRef(playerState);
  const processedHitIdsRef = useRef<Set<string>>(new Set());
  const [enemyRuntimeState, setEnemyRuntimeState] = useState<AssignmentGameEnemyRuntimeState>(
    () => ({
      enemies: createInitialEnemyState(),
      lastEnemyEvent: initialEnemyEvent,
    }),
  );

  useEffect(() => {
    combatStateRef.current = combatState;
  }, [combatState]);

  useEffect(() => {
    playerStateRef.current = playerState;
  }, [playerState]);

  useEffect(() => {
    processedHitIdsRef.current.clear();
    setEnemyRuntimeState({
      enemies: createInitialEnemyState(),
      lastEnemyEvent: initialEnemyEvent,
    });
  }, [resetKey]);

  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    let animationFrameId = 0;
    let previousFrameTime: number | null = null;

    const tick = (frameTime: number) => {
      if (previousFrameTime === null) {
        previousFrameTime = frameTime;
      }

      const deltaSeconds = Math.min((frameTime - previousFrameTime) / 1000, 0.05);
      previousFrameTime = frameTime;

      setEnemyRuntimeState((currentRuntimeState) => {
        if (!currentRuntimeState.enemies.some((enemy) => enemy.status === 'alive')) {
          return currentRuntimeState;
        }

        const currentCombat = combatStateRef.current;
        const currentPlayer = playerStateRef.current;
        const currentSwordPosition = swordHitPosition(currentCombat);
        let nextEnemyEvent = currentRuntimeState.lastEnemyEvent;

        const nextEnemies = currentRuntimeState.enemies.map((enemy) => {
          if (enemy.status === 'defeated') {
            return enemy;
          }

          let nextEnemy = moveEnemyOnPatrol(enemy, deltaSeconds);

          if (
            currentCombat.activeSwordAttack &&
            currentSwordPosition &&
            distanceBetween(nextEnemy.position, currentSwordPosition) <= swordHitRange
          ) {
            const hitId = `${nextEnemy.id}:${currentCombat.activeSwordAttack.id}`;

            if (!processedHitIdsRef.current.has(hitId)) {
              processedHitIdsRef.current.add(hitId);
              nextEnemy = applyDamage(
                nextEnemy,
                currentCombat.stats.swordDamage,
                currentCombat.activeSwordAttack.id,
              );
              nextEnemyEvent =
                nextEnemy.status === 'defeated'
                  ? `${nextEnemy.name} was defeated by a sword strike.`
                  : `${nextEnemy.name} took ${currentCombat.stats.swordDamage} sword damage.`;
            }
          }

          const hittingBolt =
            nextEnemy.status === 'alive' ? boltHit(nextEnemy, currentCombat.energyBolts) : null;

          if (hittingBolt) {
            const hitId = `${nextEnemy.id}:${hittingBolt.id}`;

            if (!processedHitIdsRef.current.has(hitId)) {
              processedHitIdsRef.current.add(hitId);
              nextEnemy = applyDamage(
                nextEnemy,
                currentCombat.stats.energyBoltDamage,
                hittingBolt.id,
              );
              nextEnemyEvent =
                nextEnemy.status === 'defeated'
                  ? `${nextEnemy.name} was dispersed by an energy bolt.`
                  : `${nextEnemy.name} took ${currentCombat.stats.energyBoltDamage} energy damage.`;
            }
          }

          if (
            nextEnemy.status === 'alive' &&
            distanceBetween(nextEnemy.position, currentPlayer.position) <= contactRange
          ) {
            nextEnemyEvent = `${nextEnemy.name} is in contact range: ${nextEnemy.contactDamage} damage preview.`;
          }

          return nextEnemy;
        });

        return {
          enemies: nextEnemies,
          lastEnemyEvent: nextEnemyEvent,
        };
      });

      animationFrameId = window.requestAnimationFrame(tick);
    };

    animationFrameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled]);

  const defeatedCount = enemyRuntimeState.enemies.filter(
    (enemy) => enemy.status === 'defeated',
  ).length;

  return {
    enemies: enemyRuntimeState.enemies,
    defeatedCount,
    remainingCount: enemyRuntimeState.enemies.length - defeatedCount,
    lastEnemyEvent: enemyRuntimeState.lastEnemyEvent,
  };
}
