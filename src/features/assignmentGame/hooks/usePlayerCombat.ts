import { useEffect, useRef, useState } from 'react';
import type {
  AssignmentGameCombatState,
  AssignmentGameEnergyBolt,
  AssignmentGameSwordAttack,
} from '../combatTypes';
import { assignmentGameMovementBounds } from '../gameShellConstants';
import type {
  AssignmentGameFacingDirection,
  AssignmentGamePlayerState,
  AssignmentGameVector,
} from '../playerMovementTypes';

const assignmentGameCombatStats = {
  playerHealth: 100,
  swordDamage: 25,
  energyBoltDamage: 10,
};

const swordDurationMs = 220;
const energyBoltDurationMs = 900;
const energyBoltSpeed = 52;
const maxEnergyBolts = 4;

const initialCombatMessage =
  'Combat ready. Sword and energy attacks are local-only previews in this phase.';

type AssignmentGameCombatInternalState = Omit<AssignmentGameCombatState, 'isAttacking'>;

function createInitialCombatState(): AssignmentGameCombatInternalState {
  return {
    stats: assignmentGameCombatStats,
    activeSwordAttack: null,
    energyBolts: [],
    lastAction: initialCombatMessage,
  };
}

function directionVectorFromFacing(
  facingDirection: AssignmentGameFacingDirection,
): AssignmentGameVector {
  switch (facingDirection) {
    case 'north':
      return { x: 0, y: -1 };
    case 'south':
      return { x: 0, y: 1 };
    case 'east':
      return { x: 1, y: 0 };
    case 'west':
      return { x: -1, y: 0 };
  }
}

function combatKeyFromEvent(event: KeyboardEvent): 'sword' | 'energyBolt' | null {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

  if (key === ' ' || key === 'Space' || key === 'Spacebar' || key === 'j') {
    return 'sword';
  }

  if (key === 'f' || key === 'k') {
    return 'energyBolt';
  }

  return null;
}

function isBoltInBounds(bolt: AssignmentGameEnergyBolt): boolean {
  return (
    bolt.position.x >= assignmentGameMovementBounds.minX &&
    bolt.position.x <= assignmentGameMovementBounds.maxX &&
    bolt.position.y >= assignmentGameMovementBounds.minY &&
    bolt.position.y <= assignmentGameMovementBounds.maxY
  );
}

export function usePlayerCombat(
  isEnabled: boolean,
  resetKey: number,
  playerState: AssignmentGamePlayerState,
): AssignmentGameCombatState {
  const playerStateRef = useRef(playerState);
  const nextAttackIdRef = useRef(0);
  const [combatState, setCombatState] =
    useState<AssignmentGameCombatInternalState>(createInitialCombatState);

  useEffect(() => {
    playerStateRef.current = playerState;
  }, [playerState]);

  useEffect(() => {
    nextAttackIdRef.current = 0;
    setCombatState(createInitialCombatState());
  }, [resetKey]);

  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    const nextAttackId = (prefix: string) => {
      nextAttackIdRef.current += 1;
      return `${prefix}-${nextAttackIdRef.current}`;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const combatKey = combatKeyFromEvent(event);

      if (!combatKey || event.repeat) {
        return;
      }

      event.preventDefault();
      const currentPlayer = playerStateRef.current;

      if (combatKey === 'sword') {
        const swordAttack: AssignmentGameSwordAttack = {
          id: nextAttackId('sword'),
          direction: currentPlayer.facingDirection,
          position: currentPlayer.position,
          ageMs: 0,
        };

        setCombatState((currentState) => ({
          ...currentState,
          activeSwordAttack: swordAttack,
          lastAction: `Sword swing: ${currentState.stats.swordDamage} damage preview. No enemies are active yet.`,
        }));
        return;
      }

      const energyBolt: AssignmentGameEnergyBolt = {
        id: nextAttackId('bolt'),
        position: currentPlayer.position,
        direction: directionVectorFromFacing(currentPlayer.facingDirection),
        ageMs: 0,
      };

      setCombatState((currentState) => ({
        ...currentState,
        energyBolts: [...currentState.energyBolts, energyBolt].slice(-maxEnergyBolts),
        lastAction: `Energy bolt: ${currentState.stats.energyBoltDamage} damage preview. No enemies are active yet.`,
      }));
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnabled]);

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

      const deltaMs = Math.min(frameTime - previousFrameTime, 50);
      previousFrameTime = frameTime;

      setCombatState((currentState) => {
        if (!currentState.activeSwordAttack && !currentState.energyBolts.length) {
          return currentState;
        }

        const activeSwordAttack = currentState.activeSwordAttack
          ? {
              ...currentState.activeSwordAttack,
              ageMs: currentState.activeSwordAttack.ageMs + deltaMs,
            }
          : null;
        const nextSwordAttack =
          activeSwordAttack && activeSwordAttack.ageMs <= swordDurationMs
            ? activeSwordAttack
            : null;
        const energyBolts = currentState.energyBolts
          .map((bolt) => ({
            ...bolt,
            ageMs: bolt.ageMs + deltaMs,
            position: {
              x: bolt.position.x + bolt.direction.x * energyBoltSpeed * (deltaMs / 1000),
              y: bolt.position.y + bolt.direction.y * energyBoltSpeed * (deltaMs / 1000),
            },
          }))
          .filter((bolt) => bolt.ageMs <= energyBoltDurationMs && isBoltInBounds(bolt));

        return {
          ...currentState,
          activeSwordAttack: nextSwordAttack,
          energyBolts,
        };
      });

      animationFrameId = window.requestAnimationFrame(tick);
    };

    animationFrameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled]);

  return {
    ...combatState,
    isAttacking: Boolean(combatState.activeSwordAttack || combatState.energyBolts.length),
  };
}
