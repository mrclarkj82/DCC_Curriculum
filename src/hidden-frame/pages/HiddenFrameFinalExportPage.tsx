import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { CompressionLog } from '../components/CompressionLog';
import { FinalExportPanel } from '../components/FinalExportPanel';
import { HiddenFrameProgress } from '../components/HiddenFrameProgress';
import { getHiddenFrameFinalExportStatus } from '../data/hiddenFrameFinalExport';
import { useHiddenFrameProgress } from '../hooks/useHiddenFrameProgress';
import { hiddenFramePhase0AssetRoles } from '../hiddenFramePhase0Assets';

export function HiddenFrameFinalExportPage() {
  const { progress, summary } = useHiddenFrameProgress();
  const finalStatus = getHiddenFrameFinalExportStatus(progress.recoveredFrameIds);

  return (
    <section
      className="hidden-frame-page hidden-frame-page--final-export"
      style={{ '--hf-page-bg': `url(${hiddenFramePhase0AssetRoles.archiveBackground})` } as CSSProperties}
    >
      <div className="hidden-frame-page__overlay" aria-hidden="true" />
      <div className="hidden-frame-page__inner">
        <header className="hidden-frame-section-header">
          <div>
            <p className="hidden-frame-kicker">Final export</p>
            <h1>Frame 000 Waiting</h1>
            <p>
              The final export opens only after the local prerequisite frame set is recovered. It
              remains optional, ungraded, and contained inside DCC Creative Studio.
            </p>
          </div>
          <div className="hidden-frame-header-actions">
            <HiddenFrameProgress summary={summary} />
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/compression">
              Compression
            </Link>
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/archive">
              Back to Archive
            </Link>
          </div>
        </header>

        <CompressionLog title="Export condition" tone="signal">
          <p>
            Frame 000 is not a grade or prize. It is the ending marker for the first optional
            Hidden Frame arc on this browser.
          </p>
        </CompressionLog>

        <FinalExportPanel {...finalStatus} />
      </div>
    </section>
  );
}
