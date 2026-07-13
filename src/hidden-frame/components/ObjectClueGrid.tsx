import type { HiddenFrameObjectClue } from '../data/hiddenFrameObjectClues';
import { ObjectClueCard } from './ObjectClueCard';

interface ObjectClueGridProps {
  clues: HiddenFrameObjectClue[];
}

export function ObjectClueGrid({ clues }: ObjectClueGridProps) {
  return (
    <div className="hidden-frame-object-grid" aria-label="Blender object clue list">
      {clues.map((clue) => (
        <ObjectClueCard clue={clue} key={clue.id} />
      ))}
    </div>
  );
}
