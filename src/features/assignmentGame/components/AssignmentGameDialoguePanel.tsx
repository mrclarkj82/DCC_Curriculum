import type { AssignmentGameDialogueState } from '../dialogueTypes';

interface AssignmentGameDialoguePanelProps {
  dialogueState: AssignmentGameDialogueState;
  onAdvanceDialogue: () => void;
  onCloseDialogue: () => void;
}

export function AssignmentGameDialoguePanel({
  dialogueState,
  onAdvanceDialogue,
  onCloseDialogue,
}: AssignmentGameDialoguePanelProps) {
  if (!dialogueState.isOpen || !dialogueState.activeNpc || !dialogueState.currentLine) {
    return null;
  }

  return (
    <section
      className="assignment-game-dialogue-panel"
      role="dialog"
      aria-labelledby="assignment-game-dialogue-title"
      aria-live="polite"
    >
      <div className="assignment-game-dialogue-speaker">
        <p className="retro-label">Dialogue</p>
        <h3 id="assignment-game-dialogue-title">{dialogueState.activeNpc.name}</h3>
        <span>{dialogueState.activeNpc.title}</span>
      </div>
      <p className="assignment-game-dialogue-line">{dialogueState.currentLine.text}</p>
      <div className="assignment-game-dialogue-footer">
        <span>
          {dialogueState.activeLineIndex + 1} / {dialogueState.lineCount}
        </span>
        <div className="assignment-game-dialogue-actions">
          <button className="gradient-button" type="button" onClick={onAdvanceDialogue}>
            {dialogueState.isFinalLine ? 'Close' : 'Next'}
          </button>
          <button className="outline-button" type="button" onClick={onCloseDialogue}>
            End
          </button>
        </div>
      </div>
    </section>
  );
}
