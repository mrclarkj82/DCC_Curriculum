import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { CompressionWarningPanel } from '../components/CompressionWarningPanel';
import { CorruptedFileCard } from '../components/CorruptedFileCard';
import { HiddenFrameProgress } from '../components/HiddenFrameProgress';
import { hiddenFrameCompressionLogs } from '../data/hiddenFrameCompressionLogs';
import { useHiddenFrameProgress } from '../hooks/useHiddenFrameProgress';
import { hiddenFramePhase0AssetRoles } from '../hiddenFramePhase0Assets';

export function HiddenFrameCompressionPage() {
  const { summary } = useHiddenFrameProgress();

  return (
    <section
      className="hidden-frame-page hidden-frame-page--compression"
      style={
        { '--hf-page-bg': `url(${hiddenFramePhase0AssetRoles.compressionBackground})` } as CSSProperties
      }
    >
      <div className="hidden-frame-page__overlay" aria-hidden="true" />
      <div className="hidden-frame-page__inner">
        <header className="hidden-frame-section-header">
          <div>
            <p className="hidden-frame-kicker">Compression event</p>
            <h1>The Compression</h1>
            <p>
              The Compression is a story layer about creative choices becoming generic. It is not malware,
              not a real security breach, not a monster, and not a threat.
            </p>
          </div>
          <div className="hidden-frame-header-actions">
            <HiddenFrameProgress summary={summary} />
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/collection">
              Frame collection
            </Link>
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/final-export">
              Final Export
            </Link>
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/archive">
              Back to Archive
            </Link>
          </div>
        </header>

        <CompressionWarningPanel title="Flattening Detected" tone="warning">
          <p>
            When every strange edge is removed, the work may still be correct, but it becomes less
            specific. Check the frame for the human decision before accepting the template.
          </p>
        </CompressionWarningPanel>

        <div className="hidden-frame-corrupted-grid" aria-label="Compression log list">
          {hiddenFrameCompressionLogs.map((log) => (
            <CorruptedFileCard key={log.id} log={log} />
          ))}
        </div>
      </div>
    </section>
  );
}
