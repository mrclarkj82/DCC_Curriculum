import { Link } from 'react-router-dom';
import type { HiddenFrameCameraClue } from '../data/hiddenFrameCameraClues';
import { getHiddenFrameFileById } from '../data/hiddenFrameFiles';
import { CompositionGuideFrame } from './CompositionGuideFrame';

interface CameraClueCardProps {
  clue: HiddenFrameCameraClue;
}

export function CameraClueCard({ clue }: CameraClueCardProps) {
  const relatedFile = clue.relatedFileId ? getHiddenFrameFileById(clue.relatedFileId) : null;

  return (
    <article className={`hidden-frame-camera-card hidden-frame-camera-card--${clue.principle}`}>
      <CompositionGuideFrame
        imageLabel={clue.imageLabel}
        principle={clue.principle}
        thumbnail={clue.thumbnail}
      />
      <div className="hidden-frame-camera-card__body">
        <p className="hidden-frame-kicker">{clue.principle.replaceAll('-', ' ')}</p>
        <h2>{clue.title}</h2>
        <p>{clue.observation}</p>
        <p>{clue.prompt}</p>
        {relatedFile && (
          <Link className="hidden-frame-secondary-link" to={relatedFile.route}>
            Open File {relatedFile.fileNumber}
          </Link>
        )}
      </div>
    </article>
  );
}
