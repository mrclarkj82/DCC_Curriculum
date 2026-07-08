import { hiddenFrameRewardFrames } from '../data/hiddenFrameFrames';
import { FrameCard } from './FrameCard';

interface FrameCollectionGridProps {
  recoveredFrameIds: string[];
}

export function FrameCollectionGrid({ recoveredFrameIds }: FrameCollectionGridProps) {
  return (
    <div className="hidden-frame-frame-grid" aria-label="Recovered frame collection">
      {hiddenFrameRewardFrames.map((frame) => (
        <FrameCard
          key={frame.id}
          frame={frame}
          isRecovered={recoveredFrameIds.includes(frame.id)}
        />
      ))}
    </div>
  );
}
