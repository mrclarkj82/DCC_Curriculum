import type { HiddenFrameVideoClue } from '../data/hiddenFrameVideoClues';

interface VideoStillClueCardProps {
  clue: HiddenFrameVideoClue;
}

export function VideoStillClueCard({ clue }: VideoStillClueCardProps) {
  return (
    <figure className="hidden-frame-video-still">
      <img src={clue.thumbnail} alt="" aria-hidden="true" />
      <figcaption>
        <span>{clue.visualLabel}</span>
        <strong>{clue.timecode}</strong>
      </figcaption>
    </figure>
  );
}
