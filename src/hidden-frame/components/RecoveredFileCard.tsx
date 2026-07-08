import { Link } from 'react-router-dom';
import type { HiddenFrameFileRecord, HiddenFrameFileState } from '../data/hiddenFrameFiles';

interface RecoveredFileCardProps {
  file: HiddenFrameFileRecord;
  state?: HiddenFrameFileState;
}

export function RecoveredFileCard({ file, state = file.state }: RecoveredFileCardProps) {
  const isInteractive = state === 'available' || state === 'unlocked' || state === 'completed';
  const statusLabel =
    state === 'unlocked'
      ? 'Unlocked'
      : state === 'completed'
        ? 'Recovered'
        : state === 'locked'
          ? 'Locked'
          : state === 'future'
            ? 'Future'
            : file.statusLabel;

  const content = (
    <>
      {file.thumbnail && (
        <img className="recovered-file-card__thumb" src={file.thumbnail} alt="" aria-hidden="true" />
      )}
      <div className="recovered-file-card__body">
        <p className="recovered-file-card__number">File {file.fileNumber}</p>
        <h2>{file.title}</h2>
        <p>{file.description}</p>
        <span className="recovered-file-card__status">{statusLabel}</span>
      </div>
    </>
  );

  if (isInteractive) {
    return (
      <Link
        className={`recovered-file-card recovered-file-card--${state}`}
        to={file.route}
        aria-label={`Open recovered file ${file.fileNumber}: ${file.title}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <article
      className={`recovered-file-card recovered-file-card--${state}`}
      aria-disabled="true"
      aria-label={`Recovered file ${file.fileNumber}: ${file.title}. ${statusLabel}.`}
    >
      {content}
    </article>
  );
}
