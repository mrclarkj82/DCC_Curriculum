import type { CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CompressionLog } from '../components/CompressionLog';
import { HiddenFrameProgress } from '../components/HiddenFrameProgress';
import { PasswordGate } from '../components/PasswordGate';
import { getHiddenFrameFileById } from '../data/hiddenFrameFiles';
import { useHiddenFrameProgress } from '../hooks/useHiddenFrameProgress';
import { hiddenFramePhase0AssetRoles } from '../hiddenFramePhase0Assets';

export function HiddenFrameFilePage() {
  const { fileId } = useParams();
  const { summary, completeFile, getFileState } = useHiddenFrameProgress();
  const file = getHiddenFrameFileById(fileId ?? '001');

  if (!file) {
    return (
      <section
        className="hidden-frame-page hidden-frame-page--file"
        style={{ '--hf-page-bg': `url(${hiddenFramePhase0AssetRoles.archiveBackground})` } as CSSProperties}
      >
        <div className="hidden-frame-page__overlay" aria-hidden="true" />
        <div className="hidden-frame-page__inner">
          <h1>Recovered file unavailable</h1>
          <p>This record is not part of the current archive index.</p>
          <Link className="hidden-frame-secondary-link" to="/hidden-frame/archive">
            Return to archive
          </Link>
        </div>
      </section>
    );
  }

  const fileState = getFileState(file);
  const fileIsCompleted = fileState === 'completed';
  const fileIsLocked = fileState === 'locked' || fileState === 'future';
  const nextFiles = [file.unlocksFileId, ...(file.unlocksFileIds ?? [])]
    .filter((nextFileId): nextFileId is string => Boolean(nextFileId))
    .map((nextFileId) => getHiddenFrameFileById(nextFileId))
    .filter((nextFile): nextFile is NonNullable<typeof nextFile> => Boolean(nextFile));
  const background = file.background ?? hiddenFramePhase0AssetRoles.archiveBackground;

  return (
    <section
      className="hidden-frame-page hidden-frame-page--file"
      style={{ '--hf-page-bg': `url(${background})` } as CSSProperties}
    >
      <div className="hidden-frame-page__overlay" aria-hidden="true" />
      <div className="hidden-frame-page__inner">
        <header className="hidden-frame-section-header">
          <div>
            <p className="hidden-frame-kicker">File {file.fileNumber}</p>
            <h1>{file.title}</h1>
            <p>{file.description}</p>
          </div>
          <div className="hidden-frame-header-actions">
            <HiddenFrameProgress summary={summary} />
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/collection">
              Collection
            </Link>
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/archive">
              Back to Archive
            </Link>
          </div>
        </header>

        <div className="hidden-frame-grid hidden-frame-grid--file">
          <section className="hidden-frame-file-art" aria-labelledby="hidden-frame-clue-title">
            <p className="hidden-frame-kicker">Recovered clue</p>
            <h2 id="hidden-frame-clue-title">Check the frame</h2>
            <p>{file.clueText}</p>
          </section>

          {fileIsLocked && (
            <CompressionLog title="Record locked">
              <p>
                {file.prerequisiteFileId
                  ? `Recover File ${file.prerequisiteFileId} before opening this record.`
                  : 'This record is reserved for a later archive release.'}
              </p>
            </CompressionLog>
          )}

          {!fileIsLocked && file.passwordAnswer && file.recoveredMessage && (
            <PasswordGate
              acceptedAnswers={file.acceptedAnswers}
              correctAnswer={file.passwordAnswer}
              hintText={file.hintText}
              initiallyUnlocked={fileIsCompleted}
              onUnlock={() => completeFile(file.id)}
              successContent={
                <article className="recovered-file">
                  <p className="hidden-frame-kicker">
                    {file.completionMeta?.label ?? 'Frame recovered'}
                  </p>
                  <h2>Archive note</h2>
                  <p>{file.recoveredMessage}</p>
                  <CompressionLog title="Frame note" tone="signal">
                    <p>
                      {file.completionMeta?.nextStep ??
                        'Observation recorded. The archive remembers careful edges.'}
                    </p>
                  </CompressionLog>
                  <div className="hidden-frame-actions">
                    {nextFiles.map((nextFile) => (
                      <Link className="hidden-frame-button" key={nextFile.id} to={nextFile.route}>
                        Continue to File {nextFile.fileNumber}
                      </Link>
                    ))}
                    <Link className="hidden-frame-secondary-link" to="/hidden-frame/collection">
                      View frame collection
                    </Link>
                  </div>
                </article>
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
