import type { HiddenFrameUnrealClue } from '../data/hiddenFrameUnrealClues';
import { UnrealClueCard } from './UnrealClueCard';

interface UnrealSignalGridProps {
  clues: HiddenFrameUnrealClue[];
}

export function UnrealSignalGrid({ clues }: UnrealSignalGridProps) {
  return (
    <div className="hidden-frame-unreal-grid" aria-label="Unreal Engine clue list">
      {clues.map((clue) => (
        <UnrealClueCard clue={clue} key={clue.id} />
      ))}
    </div>
  );
}
