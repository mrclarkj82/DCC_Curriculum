import { Link } from 'react-router-dom';
import {
  assignmentGameContinueMessage,
  assignmentGameShellSubtitle,
  assignmentGameWorkingTitle,
} from '../gameShellConstants';

interface AssignmentGameStartMenuProps {
  canContinue: boolean;
  continueMessage: string;
  isCheckingSave: boolean;
  onContinueGame: () => void;
  onNewGame: () => void;
}

export function AssignmentGameStartMenu({
  canContinue,
  continueMessage,
  isCheckingSave,
  onContinueGame,
  onNewGame,
}: AssignmentGameStartMenuProps) {
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
          disabled={!canContinue || isCheckingSave}
          aria-describedby="assignment-game-continue-note"
          onClick={onContinueGame}
        >
          {isCheckingSave ? 'Checking Save...' : 'Continue'}
        </button>
        <Link className="outline-button" to="/today">
          Back to Today's Mission
        </Link>
      </div>

      <p className="muted" id="assignment-game-continue-note">
        {continueMessage || assignmentGameContinueMessage}
      </p>
    </section>
  );
}
