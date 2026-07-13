import { useEffect, useState } from 'react';
import { AssignmentGameHud } from './components/AssignmentGameHud';
import { AssignmentGamePauseMenu } from './components/AssignmentGamePauseMenu';
import { AssignmentGameStartMenu } from './components/AssignmentGameStartMenu';
import { AssignmentGameViewport } from './components/AssignmentGameViewport';
import { assignmentGameWorkingTitle } from './gameShellConstants';
import { useAssignmentGameDialogue } from './hooks/useAssignmentGameDialogue';
import { useAssignmentGameEnemies } from './hooks/useAssignmentGameEnemies';
import { useAssignmentGameInventory } from './hooks/useAssignmentGameInventory';
import { usePlayerCombat } from './hooks/usePlayerCombat';
import { usePlayerMovement } from './hooks/usePlayerMovement';
import type { AssignmentGameShellState } from './gameShellTypes';

export function AssignmentGameShell() {
  const [shellState, setShellState] = useState<AssignmentGameShellState>('startMenu');
  const [previewKey, setPreviewKey] = useState(0);
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const isPreviewVisible = shellState === 'shellPreview' || shellState === 'paused';
  const isPreviewActive = shellState === 'shellPreview';
  const isGameInputEnabled = isPreviewActive && !isDialogueOpen;
  const playerState = usePlayerMovement(isGameInputEnabled, previewKey);
  const combatState = usePlayerCombat(isGameInputEnabled, previewKey, playerState);
  const enemiesState = useAssignmentGameEnemies(
    isGameInputEnabled,
    previewKey,
    combatState,
    playerState,
  );
  const inventoryState = useAssignmentGameInventory(
    isGameInputEnabled,
    previewKey,
    playerState,
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
      {shellState === 'startMenu' && <AssignmentGameStartMenu onNewGame={startNewGame} />}

      {isPreviewVisible && (
        <div className="assignment-game-shell-panel assignment-game-shell-preview">
          <div className="assignment-game-shell-toolbar">
            <div>
              <p className="retro-label">Game Shell</p>
              <h2>{assignmentGameWorkingTitle}</h2>
            </div>
            <button
              className="outline-button"
              type="button"
              onClick={() => setShellState('paused')}
              disabled={shellState === 'paused' || dialogueState.isOpen}
            >
              Pause
            </button>
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
            Phase 8 adds local-only Ember Shard, Rusty Key, and Lantern Oil collectibles.
            Progression and saves are intentionally not active yet.
          </p>

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
