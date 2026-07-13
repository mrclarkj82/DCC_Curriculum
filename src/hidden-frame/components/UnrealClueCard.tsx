import { Link } from 'react-router-dom';
import type { HiddenFrameUnrealClue } from '../data/hiddenFrameUnrealClues';
import { getHiddenFrameFileById } from '../data/hiddenFrameFiles';
import { UnrealViewportReadout } from './UnrealViewportReadout';

interface UnrealClueCardProps {
  clue: HiddenFrameUnrealClue;
}

export function UnrealClueCard({ clue }: UnrealClueCardProps) {
  const relatedFile = clue.relatedFileId ? getHiddenFrameFileById(clue.relatedFileId) : null;

  return (
    <article className={`hidden-frame-unreal-card hidden-frame-unreal-card--${clue.concept}`}>
      <UnrealViewportReadout
        concept={clue.concept}
        label={clue.viewportLabel}
        readout={clue.readout}
        thumbnail={clue.thumbnail}
      />
      <div className="hidden-frame-unreal-card__body">
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
