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
import { AssignmentGameCollectibleLayer } from './AssignmentGameCollectibleLayer';
import { AssignmentGameCombatLayer } from './AssignmentGameCombatLayer';
import { AssignmentGameDialoguePanel } from './AssignmentGameDialoguePanel';
import { AssignmentGameEnemyLayer } from './AssignmentGameEnemyLayer';
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
}: AssignmentGameViewportProps) {
  return (
    <section className="assignment-game-viewport" aria-labelledby="assignment-game-viewport-title">
      <div className="assignment-game-viewport-header">
        <div>
          <p className="retro-label">Level Prototype</p>
          <h2 id="assignment-game-viewport-title">
            {assignmentGameWorkingTitle}: {ruinedCourtyardLevel.name}
          </h2>
          <p className="assignment-game-controls-note">{assignmentGameMovementInstructions}</p>
        </div>
        <span className="status-badge">Phase 8 Preview {previewKey}</span>
      </div>

      <div
        className="assignment-game-playfield assignment-game-playfield--interactive"
        aria-label={`${ruinedCourtyardLevel.name} top-down dialogue prototype`}
      >
        <AssignmentGameLevelMap level={ruinedCourtyardLevel} />
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
        {isPaused && <span className="assignment-game-paused-ribbon">Paused</span>}
      </div>
    </section>
  );
}
