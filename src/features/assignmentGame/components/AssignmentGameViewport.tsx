import { useEffect, useRef, useState } from 'react';
import {
  assignmentGameMovementInstructions,
  assignmentGameWorkingTitle,
} from '../gameShellConstants';
import type { AssignmentGameCombatState } from '../combatTypes';
import type { AssignmentGameDialogueState } from '../dialogueTypes';
import type { AssignmentGameEnemiesState } from '../enemyTypes';
import type { AssignmentGameInventoryState } from '../inventoryTypes';
import { ruinedCourtyardLevel } from '../levels/ruinedCourtyardLevel';
import type { AssignmentGamePlayerState } from '../playerMovementTypes';
import type { AssignmentGameProgressionState } from '../progressionTypes';
import { AssignmentGameCollectibleLayer } from './AssignmentGameCollectibleLayer';
import { AssignmentGameCombatLayer } from './AssignmentGameCombatLayer';
import { AssignmentGameDialoguePanel } from './AssignmentGameDialoguePanel';
import { AssignmentGameEnemyLayer } from './AssignmentGameEnemyLayer';
import { AssignmentGameHiddenFrameClue } from './AssignmentGameHiddenFrameClue';
import { AssignmentGameLevelMap } from './AssignmentGameLevelMap';
import { AssignmentGameNpcLayer } from './AssignmentGameNpcLayer';
import { AssignmentGamePlayer } from './AssignmentGamePlayer';

interface AssignmentGameViewportProps {
  combatState: AssignmentGameCombatState;
  dialogueState: AssignmentGameDialogueState;
  enemiesState: AssignmentGameEnemiesState;
  inventoryState: AssignmentGameInventoryState;
  isPaused: boolean;
  onAdvanceDialogue: () => void;
  onCloseDialogue: () => void;
  playerState: AssignmentGamePlayerState;
  previewKey: number;
  progressionState: AssignmentGameProgressionState;
}

export function AssignmentGameViewport({
  combatState,
  dialogueState,
  enemiesState,
  inventoryState,
  isPaused,
  onAdvanceDialogue,
  onCloseDialogue,
  playerState,
  previewKey,
  progressionState,
}: AssignmentGameViewportProps) {
  const viewportRef = useRef<HTMLElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState('');
  const fullscreenSupported =
    typeof document !== 'undefined' &&
    typeof document.fullscreenEnabled === 'boolean' &&
    document.fullscreenEnabled;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === viewportRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    setFullscreenError('');

    try {
      if (document.fullscreenElement === viewportRef.current) {
        await document.exitFullscreen();
        return;
      }

      if (!viewportRef.current || !fullscreenSupported) {
        setFullscreenError('Fullscreen is not available in this browser.');
        return;
      }

      await viewportRef.current.requestFullscreen();
    } catch {
      setFullscreenError('Fullscreen could not start. Try using your browser window controls.');
    }
  };

  return (
    <section
      ref={viewportRef}
      className={`assignment-game-viewport${isFullscreen ? ' is-fullscreen' : ''}`}
      aria-labelledby="assignment-game-viewport-title"
    >
      <div className="assignment-game-viewport-header">
        <div>
          <p className="retro-label">Level Prototype</p>
          <h2 id="assignment-game-viewport-title">
            {assignmentGameWorkingTitle}: {ruinedCourtyardLevel.name}
          </h2>
          <p className="assignment-game-controls-note">{assignmentGameMovementInstructions}</p>
        </div>
        <div className="assignment-game-viewport-actions">
          <span className="status-badge">Phase 10 Preview {previewKey}</span>
          <button
            className="outline-button"
            type="button"
            onClick={() => void toggleFullscreen()}
            disabled={!fullscreenSupported}
            aria-pressed={isFullscreen}
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>
      {fullscreenError && (
        <p className="assignment-game-fullscreen-error" role="status">
          {fullscreenError}
        </p>
      )}

      <div
        className="assignment-game-playfield assignment-game-playfield--interactive"
        aria-label={`${ruinedCourtyardLevel.name} top-down dialogue prototype`}
      >
        <AssignmentGameLevelMap level={ruinedCourtyardLevel} progressionState={progressionState} />
        <AssignmentGameCollectibleLayer inventoryState={inventoryState} />
        <AssignmentGameNpcLayer dialogueState={dialogueState} />
        <AssignmentGameEnemyLayer enemiesState={enemiesState} />
        <AssignmentGameCombatLayer combatState={combatState} />
        <AssignmentGamePlayer playerState={playerState} />
        <AssignmentGameDialoguePanel
          dialogueState={dialogueState}
          onAdvanceDialogue={onAdvanceDialogue}
          onCloseDialogue={onCloseDialogue}
        />
        <div className="assignment-game-progression-panel" aria-live="polite">
          <p className="retro-label">Assignment Progression</p>
          <strong>{progressionState.statusText}</strong>
          <span>{progressionState.nextStepText}</span>
          <AssignmentGameHiddenFrameClue
            isVisible={progressionState.unlockedGateIds.includes('ember-gate')}
          />
        </div>
        {isPaused && <span className="assignment-game-paused-ribbon">Paused</span>}
      </div>
    </section>
  );
}
