import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { CompressionLog } from '../components/CompressionLog';
import { Frame000Reveal } from '../components/Frame000Reveal';
import { HiddenFrameProgress } from '../components/HiddenFrameProgress';
import {
  getHiddenFrameFinalExportStatus,
  HIDDEN_FRAME_FINAL_FRAME_ID,
} from '../data/hiddenFrameFinalExport';
import { useHiddenFrameProgress } from '../hooks/useHiddenFrameProgress';
import { hiddenFramePhase0AssetRoles } from '../hiddenFramePhase0Assets';

export function HiddenFrameFrame000Page() {
  const { progress, summary, recoverFrame, hasRecoveredFrame } = useHiddenFrameProgress();
  const finalStatus = getHiddenFrameFinalExportStatus(progress.recoveredFrameIds);
  const hasFrame000 = hasRecoveredFrame(HIDDEN_FRAME_FINAL_FRAME_ID);

  useEffect(() => {
    if (finalStatus.canRevealFinalFrame && !hasFrame000) {
      recoverFrame(HIDDEN_FRAME_FINAL_FRAME_ID);
    }
  }, [finalStatus.canRevealFinalFrame, hasFrame000, recoverFrame]);

  return (
    <section
      className="hidden-frame-page hidden-frame-page--frame-000"
      style={{ '--hf-page-bg': `url(${hiddenFramePhase0AssetRoles.archiveBackground})` } as CSSProperties}
    >
      <div className="hidden-frame-page__overlay" aria-hidden="true" />
      <div className="hidden-frame-page__inner">
        <header className="hidden-frame-section-header">
          <div>
            <p className="hidden-frame-kicker">Frame 000</p>
            <h1>{finalStatus.canRevealFinalFrame ? 'The First Frame' : 'Frame Locked'}</h1>
            <p>
              {finalStatus.canRevealFinalFrame
                ? 'The final frame is recovered locally on this browser.'
                : 'Recover the prerequisite frame set before opening Frame 000.'}
            </p>
          </div>
          <div className="hidden-frame-header-actions">
            <HiddenFrameProgress summary={summary} />
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/final-export">
              Final Export
            </Link>
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/collection">
              Collection
            </Link>
          </div>
        </header>

        {finalStatus.canRevealFinalFrame ? (
          <Frame000Reveal />
        ) : (
          <CompressionLog title="Frame 000 waiting">
            <p>
              {finalStatus.recoveredPrerequisiteCount}/{finalStatus.totalPrerequisiteCount}
              prerequisite frames recovered locally. The archive opens this frame only inside the
              DCC site.
            </p>
          </CompressionLog>
        )}
      </div>
    </section>
  );
}
