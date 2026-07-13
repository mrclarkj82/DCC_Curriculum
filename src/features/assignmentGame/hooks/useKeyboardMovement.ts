import { useEffect, useRef, useState } from 'react';
import type { AssignmentGameVector } from '../playerMovementTypes';

const emptyDirection: AssignmentGameVector = { x: 0, y: 0 };
const movementKeys = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'w',
  'a',
  's',
  'd',
]);

function directionFromKeys(keys: Set<string>): AssignmentGameVector {
  const x =
    (keys.has('ArrowRight') || keys.has('d') ? 1 : 0) -
    (keys.has('ArrowLeft') || keys.has('a') ? 1 : 0);
  const y =
    (keys.has('ArrowDown') || keys.has('s') ? 1 : 0) -
    (keys.has('ArrowUp') || keys.has('w') ? 1 : 0);
  const magnitude = Math.hypot(x, y);

  if (!magnitude) {
    return emptyDirection;
  }

  return {
    x: x / magnitude,
    y: y / magnitude,
  };
}

function normalizedKey(key: string): string {
  return key.length === 1 ? key.toLowerCase() : key;
}

export function useKeyboardMovement(isEnabled: boolean): AssignmentGameVector {
  const pressedKeysRef = useRef<Set<string>>(new Set());
  const [inputDirection, setInputDirection] = useState<AssignmentGameVector>(emptyDirection);

  useEffect(() => {
    if (!isEnabled) {
      pressedKeysRef.current.clear();
      setInputDirection(emptyDirection);
      return undefined;
    }

    const syncDirection = () => {
      setInputDirection(directionFromKeys(pressedKeysRef.current));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = normalizedKey(event.key);

      if (!movementKeys.has(key)) {
        return;
      }

      event.preventDefault();
      pressedKeysRef.current.add(key);
      syncDirection();
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = normalizedKey(event.key);

      if (!movementKeys.has(key)) {
        return;
      }

      event.preventDefault();
      pressedKeysRef.current.delete(key);
      syncDirection();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      pressedKeysRef.current.clear();
      setInputDirection(emptyDirection);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isEnabled]);

  return inputDirection;
}
