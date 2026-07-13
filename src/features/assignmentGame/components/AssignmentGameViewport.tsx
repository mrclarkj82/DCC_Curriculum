import {
  assignmentGameMovementInstructions,
  assignmentGameObjectiveTeaser,
  assignmentGameWorkingTitle,
} from '../gameShellConstants';
import type { AssignmentGamePlayerState } from '../playerMovementTypes';
import { AssignmentGamePlayer } from './AssignmentGamePlayer';

interface AssignmentGameViewportProps {
  isPaused: boolean;
  playerState: AssignmentGamePlayerState;
  previewKey: number;
}

export function AssignmentGameViewport({
  isPaused,
  playerState,
  previewKey,
}: AssignmentGameViewportProps) {
  return (
    <section className="assignment-game-viewport" aria-labelledby="assignment-game-viewport-title">
      <div className="assignment-game-viewport-header">
        <div>
          <p className="retro-label">Movement Prototype</p>
          <h2 id="assignment-game-viewport-title">{assignmentGameWorkingTitle}</h2>
          <p className="assignment-game-controls-note">{assignmentGameMovementInstructions}</p>
        </div>
        <span className="status-badge">Preview {previewKey}</span>
      </div>

      <div
        className="assignment-game-playfield assignment-game-playfield--interactive"
        aria-label="Interactive medieval movement prototype"
      >
        <div className="assignment-game-playfield-copy">
          <p className="retro-label">Playable Bounds</p>
          <h3>Moonlit Gate Courtyard</h3>
          <p>{assignmentGameObjectiveTeaser}</p>
        </div>
        <span className="assignment-game-castle-silhouette" aria-hidden="true" />
        <span className="assignment-game-ember-gate" aria-hidden="true" />
        <span className="assignment-game-floor-line" aria-hidden="true" />
        <AssignmentGamePlayer playerState={playerState} />
        {isPaused && <span className="assignment-game-paused-ribbon">Paused</span>}
      </div>
    </section>
  );
}
