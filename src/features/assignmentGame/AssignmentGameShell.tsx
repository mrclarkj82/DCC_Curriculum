import { useEffect, useState } from 'react';
import { AssignmentGameHud } from './components/AssignmentGameHud';
import { AssignmentGamePauseMenu } from './components/AssignmentGamePauseMenu';
import { AssignmentGameStartMenu } from './components/AssignmentGameStartMenu';
import { AssignmentGameViewport } from './components/AssignmentGameViewport';
import { assignmentGameWorkingTitle } from './gameShellConstants';
import { useAssignmentGameEnemies } from './hooks/useAssignmentGameEnemies';
import { usePlayerCombat } from './hooks/usePlayerCombat';
import { usePlayerMovement } from './hooks/usePlayerMovement';
import type { AssignmentGameShellState } from './gameShellTypes';

export function AssignmentGameShell() {
  const [shellState, setShellState] = useState<AssignmentGameShellState>('startMenu');
  const [previewKey, setPreviewKey] = useState(0);
  const isPreviewVisible = shellState === 'shellPreview' || shellState === 'paused';
  const isMovementEnabled = shellState === 'shellPreview';
  const playerState = usePlayerMovement(isMovementEnabled, previewKey);
  const combatState = usePlayerCombat(isMovementEnabled, previewKey, playerState);
  const enemiesState = useAssignmentGameEnemies(
    isMovementEnabled,
    previewKey,
    combatState,
    playerState,
  );

  const startNewGame = () => {
    setPreviewKey((currentKey) => currentKey + 1);
    setShellState('shellPreview');
  };

  const restartPreview = () => {
    setPreviewKey((currentKey) => currentKey + 1);
    setShellState('shellPreview');
  };

  const backToStartMenu = () => {
    setPreviewKey(0);
    setShellState('startMenu');
  };

  useEffect(() => {
    if (!isPreviewVisible) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
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
  }, [isPreviewVisible]);

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
              disabled={shellState === 'paused'}
            >
              Pause
            </button>
          </div>

          <AssignmentGameHud
            combatState={combatState}
            enemiesState={enemiesState}
            playerState={playerState}
          />
          <AssignmentGameViewport
            combatState={combatState}
            enemiesState={enemiesState}
            isPaused={shellState === 'paused'}
            playerState={playerState}
            previewKey={previewKey}
          />

          <p className="muted">
            Phase 6 adds local-only Hollow Squire and Ash Wisp enemies. Inventory data, dialogue,
            progression, and saves are intentionally not active yet.
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
