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
  const { summary, visitArchive, getFileState } = useHiddenFrameProgress();

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
              File 001 is available. Recover each signal word to unlock the next file and collect
              the first five frames.
            </p>
          </div>
          <div className="hidden-frame-header-actions">
            <HiddenFrameProgress summary={summary} />
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/timeline">
              Timeline signal
            </Link>
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/camera">
              Camera signal
            </Link>
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/render-room">
              Render Room
            </Link>
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/objects">
              Object signal
            </Link>
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/compression">
              Compression
            </Link>
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/final-export">
              Final Export
            </Link>
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/collection">
              Frame collection
            </Link>
            <Link className="hidden-frame-secondary-link" to="/hidden-frame">
              Return to signal
            </Link>
          </div>
        </header>

        <CompressionLog title="Archive initialized">
          <p>
            First chain visible. Locked records open only when the previous file has been recovered.
          </p>
        </CompressionLog>

        <div className="recovered-file-grid" aria-label="Recovered file list">
          {hiddenFrameFiles.map((file) => (
            <RecoveredFileCard key={file.id} file={file} state={getFileState(file)} />
          ))}
        </div>
      </div>
    </section>
  );
}
