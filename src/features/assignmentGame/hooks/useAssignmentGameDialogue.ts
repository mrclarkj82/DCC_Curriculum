import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { assignmentGameNpcs } from '../dialogues/lanternKeeperDialogue';
import type {
  AssignmentGameDialogueRuntimeState,
  AssignmentGameDialogueState,
  AssignmentGameNpcDefinition,
} from '../dialogueTypes';
import type { AssignmentGamePlayerState, AssignmentGameVector } from '../playerMovementTypes';

const initialDialogueEvent = 'The Lantern Keeper waits near the sealed gate.';

interface UseAssignmentGameDialogueOptions {
  onDialogueOpenChange?: (isOpen: boolean) => void;
}

interface UseAssignmentGameDialogueResult {
  advanceDialogue: () => void;
  closeDialogue: () => void;
  dialogueState: AssignmentGameDialogueState;
}

function createInitialDialogueState(): AssignmentGameDialogueRuntimeState {
  return {
    activeNpcId: null,
    activeLineIndex: 0,
    nearbyNpcId: null,
    lastDialogueEvent: initialDialogueEvent,
  };
}

function distanceBetween(first: AssignmentGameVector, second: AssignmentGameVector): number {
  return Math.hypot(first.x - second.x, first.y - second.y);
}

function npcById(npcId: string | null): AssignmentGameNpcDefinition | null {
  return assignmentGameNpcs.find((npc) => npc.id === npcId) ?? null;
}

function nearestInteractableNpc(position: AssignmentGameVector): AssignmentGameNpcDefinition | null {
  return (
    assignmentGameNpcs.find(
      (npc) => distanceBetween(position, npc.position) <= npc.interactionRadius,
    ) ?? null
  );
}

function keyFromEvent(event: KeyboardEvent): string {
  return event.key.length === 1 ? event.key.toLowerCase() : event.key;
}

function isInteractionKey(key: string): boolean {
  return key === 'e' || key === 'Enter';
}

function isAdvanceKey(key: string): boolean {
  return key === 'Enter' || key === ' ' || key === 'Space' || key === 'Spacebar';
}

function stopDialogueKeyEvent(event: KeyboardEvent) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

export function useAssignmentGameDialogue(
  isEnabled: boolean,
  resetKey: number,
  playerState: AssignmentGamePlayerState,
  options: UseAssignmentGameDialogueOptions = {},
): UseAssignmentGameDialogueResult {
  const { onDialogueOpenChange } = options;
  const [dialogueRuntimeState, setDialogueRuntimeState] =
    useState<AssignmentGameDialogueRuntimeState>(createInitialDialogueState);
  const dialogueRuntimeStateRef = useRef(dialogueRuntimeState);

  useEffect(() => {
    dialogueRuntimeStateRef.current = dialogueRuntimeState;
  }, [dialogueRuntimeState]);

  const closeDialogue = useCallback(() => {
    const currentNpc = npcById(dialogueRuntimeStateRef.current.activeNpcId);

    setDialogueRuntimeState((currentState) => ({
      ...currentState,
      activeNpcId: null,
      activeLineIndex: 0,
      lastDialogueEvent: currentNpc
        ? `${currentNpc.name} finished speaking.`
        : currentState.lastDialogueEvent,
    }));
    onDialogueOpenChange?.(false);
  }, [onDialogueOpenChange]);

  const openDialogue = useCallback(
    (npcId: string) => {
      const npc = npcById(npcId);

      if (!npc) {
        return;
      }

      setDialogueRuntimeState((currentState) => ({
        ...currentState,
        activeNpcId: npc.id,
        activeLineIndex: 0,
        nearbyNpcId: npc.id,
        lastDialogueEvent: `${npc.name} is speaking.`,
      }));
      onDialogueOpenChange?.(true);
    },
    [onDialogueOpenChange],
  );

  const advanceDialogue = useCallback(() => {
    const currentState = dialogueRuntimeStateRef.current;
    const activeNpc = npcById(currentState.activeNpcId);

    if (!activeNpc) {
      return;
    }

    if (currentState.activeLineIndex >= activeNpc.dialogue.length - 1) {
      closeDialogue();
      return;
    }

    setDialogueRuntimeState((previousState) => ({
      ...previousState,
      activeLineIndex: previousState.activeLineIndex + 1,
      lastDialogueEvent: `${activeNpc.name} continues speaking.`,
    }));
  }, [closeDialogue]);

  useEffect(() => {
    setDialogueRuntimeState(createInitialDialogueState());
    onDialogueOpenChange?.(false);
  }, [onDialogueOpenChange, resetKey]);

  useEffect(() => {
    if (isEnabled) {
      return;
    }

    setDialogueRuntimeState((currentState) => ({
      ...currentState,
      activeNpcId: null,
      activeLineIndex: 0,
      nearbyNpcId: null,
    }));
    onDialogueOpenChange?.(false);
  }, [isEnabled, onDialogueOpenChange]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const nearbyNpc = nearestInteractableNpc(playerState.position);

    setDialogueRuntimeState((currentState) => {
      if (currentState.nearbyNpcId === nearbyNpc?.id) {
        return currentState;
      }

      return {
        ...currentState,
        nearbyNpcId: nearbyNpc?.id ?? null,
        lastDialogueEvent: nearbyNpc
          ? `${nearbyNpc.name} is close enough to talk.`
          : currentState.lastDialogueEvent,
      };
    });
  }, [isEnabled, playerState.position.x, playerState.position.y]);

  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = keyFromEvent(event);
      const currentState = dialogueRuntimeStateRef.current;

      if (currentState.activeNpcId) {
        if (key === 'Escape') {
          stopDialogueKeyEvent(event);
          closeDialogue();
          return;
        }

        if (isAdvanceKey(key)) {
          stopDialogueKeyEvent(event);
          advanceDialogue();
        }

        return;
      }

      if (currentState.nearbyNpcId && isInteractionKey(key)) {
        stopDialogueKeyEvent(event);
        openDialogue(currentState.nearbyNpcId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [advanceDialogue, closeDialogue, isEnabled, openDialogue]);

  const dialogueState = useMemo<AssignmentGameDialogueState>(() => {
    const activeNpc = npcById(dialogueRuntimeState.activeNpcId);
    const nearbyNpc = npcById(dialogueRuntimeState.nearbyNpcId);
    const lineCount = activeNpc?.dialogue.length ?? 0;
    const currentLine = activeNpc?.dialogue[dialogueRuntimeState.activeLineIndex] ?? null;

    return {
      ...dialogueRuntimeState,
      activeNpc,
      currentLine,
      isFinalLine: Boolean(activeNpc && dialogueRuntimeState.activeLineIndex >= lineCount - 1),
      isOpen: Boolean(activeNpc && currentLine),
      lineCount,
      nearbyNpc,
      npcs: assignmentGameNpcs,
    };
  }, [dialogueRuntimeState]);

  return {
    advanceDialogue,
    closeDialogue,
    dialogueState,
  };
}
