import type { HiddenFrameVideoClue } from '../data/hiddenFrameVideoClues';
import { TimelineClueCard } from './TimelineClueCard';

interface TimelineTrackProps {
  clues: HiddenFrameVideoClue[];
}

export function TimelineTrack({ clues }: TimelineTrackProps) {
  return (
    <section className="hidden-frame-timeline-track" aria-label="Hidden Frame timeline clues">
      <div className="hidden-frame-timeline-track__rail" aria-hidden="true" />
      {clues.map((clue) => (
        <TimelineClueCard clue={clue} key={clue.id} />
      ))}
    </section>
  );
}
