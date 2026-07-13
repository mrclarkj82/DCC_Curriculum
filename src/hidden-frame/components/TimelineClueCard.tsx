import { Link } from 'react-router-dom';
import type { HiddenFrameVideoClue } from '../data/hiddenFrameVideoClues';
import { getHiddenFrameFileById } from '../data/hiddenFrameFiles';
import { LowerThirdClueCard } from './LowerThirdClueCard';
import { VideoStillClueCard } from './VideoStillClueCard';

interface TimelineClueCardProps {
  clue: HiddenFrameVideoClue;
}

export function TimelineClueCard({ clue }: TimelineClueCardProps) {
  const relatedFile = getHiddenFrameFileById(clue.relatedFileId);

  return (
    <article className={`hidden-frame-timeline-card hidden-frame-timeline-card--${clue.clueType}`}>
      <div className="hidden-frame-timeline-card__meta">
        <p className="hidden-frame-kicker">{clue.timecode}</p>
        <span>Frame {clue.frameNumber}</span>
      </div>
      <VideoStillClueCard clue={clue} />
      <div className="hidden-frame-timeline-card__body">
        <h2>{clue.title}</h2>
        <p>{clue.summary}</p>
        <p>{clue.prompt}</p>
        {clue.lowerThirdText && <LowerThirdClueCard text={clue.lowerThirdText} />}
        {clue.approvedVideoReference && (
          <p className="hidden-frame-video-reference">
            <strong>{clue.approvedVideoReference.label}:</strong>{' '}
            {clue.approvedVideoReference.note}
          </p>
        )}
        {relatedFile && (
          <Link className="hidden-frame-secondary-link" to={relatedFile.route}>
            Open File {relatedFile.fileNumber}
          </Link>
        )}
      </div>
    </article>
  );
}
