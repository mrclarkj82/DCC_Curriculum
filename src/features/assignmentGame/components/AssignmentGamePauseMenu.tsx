interface AssignmentGamePauseMenuProps {
  onBackToStart: () => void;
  onRestartPreview: () => void;
  onResume: () => void;
}

export function AssignmentGamePauseMenu({
  onBackToStart,
  onRestartPreview,
  onResume,
}: AssignmentGamePauseMenuProps) {
  return (
    <section
      className="assignment-game-pause-menu"
      role="dialog"
      aria-modal="true"
      aria-labelledby="assignment-game-pause-title"
    >
      <div className="assignment-game-pause-panel">
        <p className="retro-label">Preview Paused</p>
        <h2 id="assignment-game-pause-title">Shell Menu</h2>
        <p className="muted">
          Restart Preview resets only this local Phase 2 shell screen. No progress is saved or
          loaded.
        </p>
        <div className="assignment-game-menu-actions">
          <button className="gradient-button" type="button" onClick={onResume} autoFocus>
            Resume
          </button>
          <button className="outline-button" type="button" onClick={onRestartPreview}>
            Restart Preview
          </button>
          <button className="outline-button" type="button" onClick={onBackToStart}>
            Back to Start Menu
          </button>
        </div>
      </div>
    </section>
  );
}
