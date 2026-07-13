import { Link } from 'react-router-dom';
import type { HiddenFrameObjectClue } from '../data/hiddenFrameObjectClues';
import { getHiddenFrameFileById } from '../data/hiddenFrameFiles';
import { ObjectInspectionFrame } from './ObjectInspectionFrame';

interface ObjectClueCardProps {
  clue: HiddenFrameObjectClue;
}

export function ObjectClueCard({ clue }: ObjectClueCardProps) {
  const relatedFile = clue.relatedFileId ? getHiddenFrameFileById(clue.relatedFileId) : null;

  return (
    <article className={`hidden-frame-object-card hidden-frame-object-card--${clue.concept}`}>
      <ObjectInspectionFrame
        concept={clue.concept}
        label={clue.objectLabel}
        note={clue.inspectionNote}
        thumbnail={clue.thumbnail}
      />
      <div className="hidden-frame-object-card__body">
        <p className="hidden-frame-kicker">{clue.concept.replaceAll('-', ' ')}</p>
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
