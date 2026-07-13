import {
  assignmentGameMovementInstructions,
  assignmentGameWorkingTitle,
} from '../gameShellConstants';
import type { AssignmentGameCombatState } from '../combatTypes';
import type { AssignmentGameEnemiesState } from '../enemyTypes';
import { ruinedCourtyardLevel } from '../levels/ruinedCourtyardLevel';
import type { AssignmentGamePlayerState } from '../playerMovementTypes';
import { AssignmentGameCombatLayer } from './AssignmentGameCombatLayer';
import { AssignmentGameEnemyLayer } from './AssignmentGameEnemyLayer';
import { AssignmentGameLevelMap } from './AssignmentGameLevelMap';
import { AssignmentGamePlayer } from './AssignmentGamePlayer';

interface AssignmentGameViewportProps {
  combatState: AssignmentGameCombatState;
  enemiesState: AssignmentGameEnemiesState;
  isPaused: boolean;
  playerState: AssignmentGamePlayerState;
  previewKey: number;
}

export function AssignmentGameViewport({
  combatState,
  enemiesState,
  isPaused,
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
        <span className="status-badge">Phase 6 Preview {previewKey}</span>
      </div>

      <div
        className="assignment-game-playfield assignment-game-playfield--interactive"
        aria-label={`${ruinedCourtyardLevel.name} top-down enemy combat prototype`}
      >
        <AssignmentGameLevelMap level={ruinedCourtyardLevel} />
        <AssignmentGameEnemyLayer enemiesState={enemiesState} />
        <AssignmentGameCombatLayer combatState={combatState} />
        <AssignmentGamePlayer playerState={playerState} />
        {isPaused && <span className="assignment-game-paused-ribbon">Paused</span>}
      </div>
    </section>
  );
}
