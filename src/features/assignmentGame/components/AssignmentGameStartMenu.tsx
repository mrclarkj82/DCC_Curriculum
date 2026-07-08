import { Link } from 'react-router-dom';
import {
  assignmentGameContinueMessage,
  assignmentGameShellSubtitle,
  assignmentGameWorkingTitle,
} from '../gameShellConstants';

interface AssignmentGameStartMenuProps {
  onNewGame: () => void;
}

export function AssignmentGameStartMenu({ onNewGame }: AssignmentGameStartMenuProps) {
  return (
    <section className="assignment-game-shell-panel assignment-game-start-menu">
      <div>
        <p className="retro-label">Unlocked Game Shell</p>
        <h2>{assignmentGameWorkingTitle}</h2>
        <p>{assignmentGameShellSubtitle}</p>
      </div>

      <div className="assignment-game-menu-actions" aria-label="Game shell actions">
        <button className="gradient-button" type="button" onClick={onNewGame}>
          New Game
        </button>
        <button
          className="outline-button"
          type="button"
          disabled
          aria-describedby="assignment-game-continue-note"
        >
          Continue
        </button>
        <Link className="outline-button" to="/today">
          Back to Today's Mission
        </Link>
      </div>

      <p className="muted" id="assignment-game-continue-note">
        {assignmentGameContinueMessage}
      </p>
    </section>
  );
}
