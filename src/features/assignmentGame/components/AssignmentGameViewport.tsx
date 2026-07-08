import { assignmentGameObjectiveTeaser, assignmentGameWorkingTitle } from '../gameShellConstants';

interface AssignmentGameViewportProps {
  previewKey: number;
}

export function AssignmentGameViewport({ previewKey }: AssignmentGameViewportProps) {
  return (
    <section className="assignment-game-viewport" aria-labelledby="assignment-game-viewport-title">
      <div className="assignment-game-viewport-header">
        <div>
          <p className="retro-label">Shell Preview</p>
          <h2 id="assignment-game-viewport-title">{assignmentGameWorkingTitle}</h2>
        </div>
        <span className="status-badge">Preview {previewKey}</span>
      </div>

      <div className="assignment-game-playfield" aria-label="Non-playable medieval viewport mockup">
        <div className="assignment-game-playfield-copy">
          <p className="retro-label">Empty Play Area</p>
          <h3>Moonlit Gate Courtyard</h3>
          <p>{assignmentGameObjectiveTeaser}</p>
        </div>
        <span className="assignment-game-castle-silhouette" aria-hidden="true" />
        <span className="assignment-game-ember-gate" aria-hidden="true" />
        <span className="assignment-game-floor-line" aria-hidden="true" />
      </div>
    </section>
  );
}
