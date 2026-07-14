import { useEffect, useMemo, useRef, useState } from 'react';
import { ruinedCourtyardInventoryItems } from '../inventory/ruinedCourtyardInventory';
import type {
  AssignmentGameInventoryItemId,
  AssignmentGameInventoryItemState,
  AssignmentGameInventoryState,
} from '../inventoryTypes';
import type { AssignmentGamePlayerState, AssignmentGameVector } from '../playerMovementTypes';

const initialInventoryEvent = 'Three useful relics shimmer in the Ruined Courtyard.';
const emptyCollectedItemIds: readonly AssignmentGameInventoryItemId[] = [];

type AssignmentGameInventoryRuntimeState = Pick<
  AssignmentGameInventoryState,
  'items' | 'lastInventoryEvent'
>;

function createInitialInventoryState(
  collectedItemIds: readonly AssignmentGameInventoryItemId[] = [],
): AssignmentGameInventoryRuntimeState {
  return {
    items: ruinedCourtyardInventoryItems.map((item) => ({
      ...item,
      status: collectedItemIds.includes(item.id) ? 'collected' : 'available',
    })),
    lastInventoryEvent: collectedItemIds.length
      ? 'Saved inventory restored.'
      : initialInventoryEvent,
  };
}

function distanceBetween(first: AssignmentGameVector, second: AssignmentGameVector): number {
  return Math.hypot(first.x - second.x, first.y - second.y);
}

function nearestAvailableItem(
  items: readonly AssignmentGameInventoryItemState[],
  position: AssignmentGameVector,
): AssignmentGameInventoryItemState | null {
  return (
    items.find(
      (item) =>
        item.status === 'available' &&
        distanceBetween(item.position, position) <= item.interactionRadius,
    ) ?? null
  );
}

function keyFromEvent(event: KeyboardEvent): string {
  return event.key.length === 1 ? event.key.toLowerCase() : event.key;
}

export function useAssignmentGameInventory(
  isEnabled: boolean,
  resetKey: number,
  playerState: AssignmentGamePlayerState,
  collectedItemIds: readonly AssignmentGameInventoryItemId[] = emptyCollectedItemIds,
): AssignmentGameInventoryState {
  const playerStateRef = useRef(playerState);
  const runtimeStateRef = useRef<AssignmentGameInventoryRuntimeState>(
    createInitialInventoryState(collectedItemIds),
  );
  const [runtimeState, setRuntimeState] =
    useState<AssignmentGameInventoryRuntimeState>(() =>
      createInitialInventoryState(collectedItemIds),
    );

  useEffect(() => {
    playerStateRef.current = playerState;
  }, [playerState]);

  useEffect(() => {
    runtimeStateRef.current = runtimeState;
  }, [runtimeState]);

  useEffect(() => {
    const initialState = createInitialInventoryState(collectedItemIds);
    runtimeStateRef.current = initialState;
    setRuntimeState(initialState);
  }, [collectedItemIds, resetKey]);

  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (keyFromEvent(event) !== 'c' || event.repeat) {
        return;
      }

      const nearbyItem = nearestAvailableItem(
        runtimeStateRef.current.items,
        playerStateRef.current.position,
      );

      if (!nearbyItem) {
        return;
      }

      event.preventDefault();

      setRuntimeState((currentState) => ({
        items: currentState.items.map((item) =>
          item.id === nearbyItem.id ? { ...item, status: 'collected' } : item,
        ),
        lastInventoryEvent: `${nearbyItem.name} collected.`,
      }));
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnabled]);

  const nearbyItem = useMemo(
    () => nearestAvailableItem(runtimeState.items, playerState.position),
    [playerState.position, runtimeState.items],
  );
  const collectedItems = runtimeState.items.filter((item) => item.status === 'collected');

  return {
    items: runtimeState.items,
    collectedItems,
    collectedCount: collectedItems.length,
    totalCount: runtimeState.items.length,
    nearbyItem,
    lastInventoryEvent: nearbyItem
      ? `Press C to collect ${nearbyItem.name}.`
      : runtimeState.lastInventoryEvent,
  };
}
