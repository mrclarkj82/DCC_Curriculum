import { HiddenFrameIcon } from '../../../hidden-frame';

export const assignmentGameHiddenFrameClueText =
  'THE FRAME REMEMBERS WHAT THE PAGE FORGOT.';

interface AssignmentGameHiddenFrameClueProps {
  isVisible: boolean;
}

export function AssignmentGameHiddenFrameClue({
  isVisible,
}: AssignmentGameHiddenFrameClueProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="assignment-game-hidden-frame-clue" aria-label="Optional Hidden Frame clue">
      <HiddenFrameIcon
        destinationPath="/hidden-frame/archive"
        label="Open Hidden Frame archive from The Ember Gate clue"
        size="md"
        variant="glitch"
      />
      <p>{assignmentGameHiddenFrameClueText}</p>
    </div>
  );
}
