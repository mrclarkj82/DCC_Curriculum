import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { CompressionLog } from '../components/CompressionLog';
import { HiddenFrameProgress } from '../components/HiddenFrameProgress';
import { RecoveredFileCard } from '../components/RecoveredFileCard';
import { hiddenFrameFiles } from '../data/hiddenFrameFiles';
import { useHiddenFrameProgress } from '../hooks/useHiddenFrameProgress';
import { hiddenFramePhase0AssetRoles } from '../hiddenFramePhase0Assets';

export function HiddenFrameArchivePage() {
  const { summary, visitArchive, isFileUnlocked } = useHiddenFrameProgress();

  useEffect(() => {
    visitArchive();
  }, [visitArchive]);

  return (
    <section
      className="hidden-frame-page hidden-frame-page--archive"
      style={{ '--hf-page-bg': `url(${hiddenFramePhase0AssetRoles.archiveBackground})` } as CSSProperties}
    >
      <div className="hidden-frame-page__overlay" aria-hidden="true" />
      <div className="hidden-frame-page__inner">
        <header className="hidden-frame-section-header">
          <div>
            <p className="hidden-frame-kicker">Archive hub</p>
            <h1>Recovered Files</h1>
            <p>
              File 001 is available. The remaining records are placeholders for later phases and do
              not contain active puzzle content.
            </p>
          </div>
          <div className="hidden-frame-header-actions">
            <HiddenFrameProgress summary={summary} />
            <Link className="hidden-frame-secondary-link" to="/hidden-frame">
              Return to signal
            </Link>
          </div>
        </header>

        <CompressionLog title="Archive initialized">
          <p>Index visible. Locked records remain inactive until a future release.</p>
        </CompressionLog>

        <div className="recovered-file-grid" aria-label="Recovered file list">
          {hiddenFrameFiles.map((file) => (
            <RecoveredFileCard
              key={file.id}
              file={file}
              state={isFileUnlocked(file.id) ? 'unlocked' : file.state}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
