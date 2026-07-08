import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';
import { CompressionLog } from '../components/CompressionLog';
import { HiddenFrameProgress } from '../components/HiddenFrameProgress';
import { PasswordGate } from '../components/PasswordGate';
import { getHiddenFrameFileById } from '../data/hiddenFrameFiles';
import { useHiddenFrameProgress } from '../hooks/useHiddenFrameProgress';
import { hiddenFramePhase0AssetRoles, hiddenFramePhase0Assets } from '../hiddenFramePhase0Assets';

const phaseOneFile = getHiddenFrameFileById('001');

export function HiddenFrameFilePage() {
  const { summary, isFileUnlocked, unlockFile } = useHiddenFrameProgress();

  if (!phaseOneFile?.passwordAnswer || !phaseOneFile.recoveredMessage) {
    return (
      <section className="hidden-frame-page">
        <div className="hidden-frame-page__inner">
          <h1>Recovered file unavailable</h1>
          <Link className="hidden-frame-secondary-link" to="/hidden-frame/archive">
            Return to archive
          </Link>
        </div>
      </section>
    );
  }

  const fileIsUnlocked = isFileUnlocked(phaseOneFile.id);

  return (
    <section
      className="hidden-frame-page hidden-frame-page--file"
      style={{ '--hf-page-bg': `url(${hiddenFramePhase0AssetRoles.unrealBackground})` } as CSSProperties}
    >
      <div className="hidden-frame-page__overlay" aria-hidden="true" />
      <div className="hidden-frame-page__inner">
        <header className="hidden-frame-section-header">
          <div>
            <p className="hidden-frame-kicker">File {phaseOneFile.fileNumber}</p>
            <h1>{phaseOneFile.title}</h1>
            <p>{phaseOneFile.description}</p>
          </div>
          <div className="hidden-frame-header-actions">
            <HiddenFrameProgress summary={summary} />
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/archive">
              Back to Archive
            </Link>
          </div>
        </header>

        <div className="hidden-frame-grid hidden-frame-grid--file">
          <img
            className="hidden-frame-file-art"
            src={hiddenFramePhase0Assets.symbols.transparent}
            alt="Broken frame symbol for recovered File 001"
          />

          <PasswordGate
            correctAnswer={phaseOneFile.passwordAnswer}
            hintText={phaseOneFile.hintText}
            initiallyUnlocked={fileIsUnlocked}
            onUnlock={() => unlockFile(phaseOneFile.id)}
            successContent={
              <article className="recovered-file">
                <p className="hidden-frame-kicker">Recovered text</p>
                <h2>Archive note</h2>
                <p>{phaseOneFile.recoveredMessage}</p>
                <CompressionLog title="Frame note" tone="signal">
                  <p>Observation recorded. The archive remembers careful edges.</p>
                </CompressionLog>
              </article>
            }
          />
        </div>
      </div>
    </section>
  );
}
