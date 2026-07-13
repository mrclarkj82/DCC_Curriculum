import type { HiddenFrameCameraClue } from '../data/hiddenFrameCameraClues';
import { CameraClueCard } from './CameraClueCard';

interface CameraClueGridProps {
  clues: HiddenFrameCameraClue[];
}

export function CameraClueGrid({ clues }: CameraClueGridProps) {
  return (
    <section className="hidden-frame-camera-grid" aria-label="Hidden Frame camera clues">
      {clues.map((clue) => (
        <CameraClueCard clue={clue} key={clue.id} />
      ))}
    </section>
  );
}
