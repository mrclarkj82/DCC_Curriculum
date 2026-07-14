import { useEffect, useState } from 'react';
import { AssignmentGameHud } from './components/AssignmentGameHud';
import { AssignmentGamePauseMenu } from './components/AssignmentGamePauseMenu';
import { AssignmentGameStartMenu } from './components/AssignmentGameStartMenu';
import { AssignmentGameViewport } from './components/AssignmentGameViewport';
import { assignmentGameWorkingTitle } from './gameShellConstants';
import { useAssignmentGameDialogue } from './hooks/useAssignmentGameDialogue';
import { useAssignmentGameEnemies } from './hooks/useAssignmentGameEnemies';
import { useAssignmentGameInventory } from './hooks/useAssignmentGameInventory';
import { useAssignmentGameSave } from './hooks/useAssignmentGameSave';
import { usePlayerCombat } from './hooks/usePlayerCombat';
import { usePlayerMovement } from './hooks/usePlayerMovement';
import { ruinedCourtyardLevel } from './levels/ruinedCourtyardLevel';
import type { AssignmentGameShellState } from './gameShellTypes';
import {
  createAssignmentGameSaveSnapshot,
  type AssignmentGameSaveContext,
  type AssignmentGameSaveSnapshot,
} from './saveTypes';
import type { AssignmentGameInventoryItemId } from './inventoryTypes';

const emptyDefeatedEnemyIds: readonly string[] = [];
const emptyCollectedItemIds: readonly AssignmentGameInventoryItemId[] = [];

interface AssignmentGameShellProps {
  saveContext: AssignmentGameSaveContext | null;
}

export function AssignmentGameShell({ saveContext }: AssignmentGameShellProps) {
  const [shellState, setShellState] = useState<AssignmentGameShellState>('startMenu');
  const [previewKey, setPreviewKey] = useState(0);
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [activeSaveSnapshot, setActiveSaveSnapshot] =
    useState<AssignmentGameSaveSnapshot | null>(null);
  const isPreviewVisible = shellState === 'shellPreview' || shellState === 'paused';
  const isPreviewActive = shellState === 'shellPreview';
  const isGameInputEnabled = isPreviewActive && !isDialogueOpen;
  const savedPlayerState = activeSaveSnapshot?.player ?? null;
  const savedDefeatedEnemyIds = activeSaveSnapshot?.defeatedEnemyIds ?? emptyDefeatedEnemyIds;
  const savedCollectedItemIds =
    activeSaveSnapshot?.collectedItemIds ?? emptyCollectedItemIds;
  const saveState = useAssignmentGameSave(saveContext);
  const playerState = usePlayerMovement(isGameInputEnabled, previewKey, savedPlayerState);
  const combatState = usePlayerCombat(isGameInputEnabled, previewKey, playerState);
  const enemiesState = useAssignmentGameEnemies(
    isGameInputEnabled,
    previewKey,
    combatState,
    playerState,
    savedDefeatedEnemyIds,
  );
  const inventoryState = useAssignmentGameInventory(
    isGameInputEnabled,
    previewKey,
    playerState,
    savedCollectedItemIds,
  );
  const { advanceDialogue, closeDialogue, dialogueState } = useAssignmentGameDialogue(
    isPreviewActive,
    previewKey,
    playerState,
    {
      onDialogueOpenChange: setIsDialogueOpen,
    },
  );

  const startNewGame = () => {
    setIsDialogueOpen(false);
    setActiveSaveSnapshot(null);
    setPreviewKey((currentKey) => currentKey + 1);
    setShellState('shellPreview');
  };

  const continueGame = () => {
    if (!saveState.saveDocument) {
      return;
    }

    setIsDialogueOpen(false);
    setActiveSaveSnapshot(saveState.saveDocument.snapshot);
    setPreviewKey((currentKey) => currentKey + 1);
    setShellState('shellPreview');
  };

  const restartPreview = () => {
    setIsDialogueOpen(false);
    setPreviewKey((currentKey) => currentKey + 1);
    setShellState('shellPreview');
  };

  const backToStartMenu = () => {
    setIsDialogueOpen(false);
    setPreviewKey(0);
    setShellState('startMenu');
  };

  const saveProgress = () => {
    const snapshot = createAssignmentGameSaveSnapshot(
      ruinedCourtyardLevel.id,
      playerState,
      enemiesState.enemies,
      inventoryState,
    );

    void saveState.saveProgress(snapshot);
  };

  useEffect(() => {
    if (!isPreviewVisible) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (dialogueState.isOpen) {
        return;
      }

      if (event.key !== 'Escape') {
        return;
      }

      setShellState((currentState) => {
        if (currentState === 'shellPreview') {
          return 'paused';
        }

        if (currentState === 'paused') {
          return 'shellPreview';
        }

        return currentState;
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dialogueState.isOpen, isPreviewVisible]);

  return (
    <section className="assignment-game-shell card mission-panel neon-border">
      {shellState === 'startMenu' && (
        <AssignmentGameStartMenu
          canContinue={Boolean(saveState.saveDocument)}
          continueMessage={saveState.message}
          isCheckingSave={saveState.isLoading}
          onContinueGame={continueGame}
          onNewGame={startNewGame}
        />
      )}

      {isPreviewVisible && (
        <div className="assignment-game-shell-panel assignment-game-shell-preview">
          <div className="assignment-game-shell-toolbar">
            <div>
              <p className="retro-label">Game Shell</p>
              <h2>{assignmentGameWorkingTitle}</h2>
            </div>
            <div className="assignment-game-shell-toolbar-actions">
              <button
                className="outline-button"
                type="button"
                onClick={saveProgress}
                disabled={
                  !saveState.canSave ||
                  saveState.isSaving ||
                  shellState === 'paused' ||
                  dialogueState.isOpen
                }
              >
                {saveState.isSaving ? 'Saving...' : 'Save Progress'}
              </button>
              <button
                className="outline-button"
                type="button"
                onClick={() => setShellState('paused')}
                disabled={shellState === 'paused' || dialogueState.isOpen}
              >
                Pause
              </button>
            </div>
          </div>

          <AssignmentGameHud
            combatState={combatState}
            dialogueState={dialogueState}
            enemiesState={enemiesState}
            inventoryState={inventoryState}
            playerState={playerState}
          />
          <AssignmentGameViewport
            combatState={combatState}
            dialogueState={dialogueState}
            enemiesState={enemiesState}
            inventoryState={inventoryState}
            isPaused={shellState === 'paused'}
            onAdvanceDialogue={advanceDialogue}
            onCloseDialogue={closeDialogue}
            playerState={playerState}
            previewKey={previewKey}
          />

          <p className="muted">
            Phase 9 saves player position, defeated enemies, and collected items to Firestore for
            this verified assignment target. Assignment progression is intentionally not active yet.
          </p>
          <p className="muted assignment-game-save-status">{saveState.message}</p>

          {shellState === 'paused' && (
            <AssignmentGamePauseMenu
              onBackToStart={backToStartMenu}
              onRestartPreview={restartPreview}
              onResume={() => setShellState('shellPreview')}
            />
          )}
        </div>
      )}
    </section>
  );
}
