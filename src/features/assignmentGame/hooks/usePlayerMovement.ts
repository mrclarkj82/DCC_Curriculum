import { useEffect, useRef, useState } from 'react';
import {
  assignmentGameMovementBounds,
  assignmentGamePlayerSpawn,
  assignmentGamePlayerSpeed,
} from '../gameShellConstants';
import type {
  AssignmentGameFacingDirection,
  AssignmentGamePlayerState,
  AssignmentGameVector,
} from '../playerMovementTypes';
import type { AssignmentGameSavedPlayerState } from '../saveTypes';
import { useKeyboardMovement } from './useKeyboardMovement';

const idleInputDirection: AssignmentGameVector = { x: 0, y: 0 };

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function facingDirectionFromInput(
  inputDirection: AssignmentGameVector,
  fallbackDirection: AssignmentGameFacingDirection,
): AssignmentGameFacingDirection {
  if (!inputDirection.x && !inputDirection.y) {
    return fallbackDirection;
  }

  if (Math.abs(inputDirection.x) > Math.abs(inputDirection.y)) {
    return inputDirection.x > 0 ? 'east' : 'west';
  }

  return inputDirection.y > 0 ? 'south' : 'north';
}

function createInitialPlayerState(
  savedPlayerState: AssignmentGameSavedPlayerState | null = null,
): AssignmentGamePlayerState {
  const savedPosition = savedPlayerState?.position;

  return {
    position: savedPosition
      ? {
          x: clamp(
            savedPosition.x,
            assignmentGameMovementBounds.minX,
            assignmentGameMovementBounds.maxX,
          ),
          y: clamp(
            savedPosition.y,
            assignmentGameMovementBounds.minY,
            assignmentGameMovementBounds.maxY,
          ),
        }
      : assignmentGamePlayerSpawn,
    facingDirection: savedPlayerState?.facingDirection ?? 'south',
    isMoving: false,
    lastInputDirection: idleInputDirection,
  };
}

export function usePlayerMovement(
  isEnabled: boolean,
  resetKey: number,
  savedPlayerState: AssignmentGameSavedPlayerState | null = null,
): AssignmentGamePlayerState {
  const inputDirection = useKeyboardMovement(isEnabled);
  const inputDirectionRef = useRef(inputDirection);
  const [playerState, setPlayerState] =
    useState<AssignmentGamePlayerState>(() => createInitialPlayerState(savedPlayerState));

  useEffect(() => {
    inputDirectionRef.current = inputDirection;
  }, [inputDirection]);

  useEffect(() => {
    setPlayerState(createInitialPlayerState(savedPlayerState));
  }, [resetKey, savedPlayerState]);

  useEffect(() => {
    if (!isEnabled) {
      setPlayerState((currentState) => ({
        ...currentState,
        isMoving: false,
        lastInputDirection: idleInputDirection,
      }));
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
      const currentInputDirection = inputDirectionRef.current;

      setPlayerState((currentState) => {
        if (!currentInputDirection.x && !currentInputDirection.y) {
          if (!currentState.isMoving) {
            return currentState;
          }

          return {
            ...currentState,
            isMoving: false,
            lastInputDirection: idleInputDirection,
          };
        }

        const nextPosition = {
          x: clamp(
            currentState.position.x +
              currentInputDirection.x * assignmentGamePlayerSpeed * deltaSeconds,
            assignmentGameMovementBounds.minX,
            assignmentGameMovementBounds.maxX,
          ),
          y: clamp(
            currentState.position.y +
              currentInputDirection.y * assignmentGamePlayerSpeed * deltaSeconds,
            assignmentGameMovementBounds.minY,
            assignmentGameMovementBounds.maxY,
          ),
        };

        return {
          position: nextPosition,
          facingDirection: facingDirectionFromInput(
            currentInputDirection,
            currentState.facingDirection,
          ),
          isMoving: true,
          lastInputDirection: currentInputDirection,
        };
      });

      animationFrameId = window.requestAnimationFrame(tick);
    };

    animationFrameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled]);

  return playerState;
}
