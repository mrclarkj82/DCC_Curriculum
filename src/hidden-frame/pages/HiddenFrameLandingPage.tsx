import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';
import { CompressionLog } from '../components/CompressionLog';
import { HiddenFrameIcon } from '../components/HiddenFrameIcon';
import { HiddenFrameProgress } from '../components/HiddenFrameProgress';
import { useHiddenFrameProgress } from '../hooks/useHiddenFrameProgress';
import { hiddenFramePhase0AssetRoles, hiddenFramePhase0Assets } from '../hiddenFramePhase0Assets';

export function HiddenFrameLandingPage() {
  const { summary } = useHiddenFrameProgress();

  return (
    <section
      className="hidden-frame-page hidden-frame-page--landing"
      style={{ '--hf-page-bg': `url(${hiddenFramePhase0AssetRoles.archiveBackground})` } as CSSProperties}
    >
      <div className="hidden-frame-page__overlay" aria-hidden="true" />
      <div className="hidden-frame-page__inner">
        <header className="hidden-frame-hero">
          <div className="hidden-frame-hero__copy">
            <p className="hidden-frame-kicker">Optional archive signal</p>
            <h1>The Hidden Frame</h1>
            <p>
              Some records leave artifacts at the edge of the page. This archive is optional,
              ungraded, and contained entirely inside DCC Creative Studio.
            </p>
            <div className="hidden-frame-actions">
              <Link className="hidden-frame-button" to="/hidden-frame/archive">
                Open Archive
              </Link>
              <Link className="hidden-frame-secondary-link" to="/hidden-frame/collection">
                View Frames
              </Link>
              <Link className="hidden-frame-secondary-link" to="/hidden-frame/timeline">
                Timeline Signal
              </Link>
              <Link className="hidden-frame-secondary-link" to="/hidden-frame/camera">
                Camera Signal
              </Link>
              <HiddenFrameIcon
                destinationPath="/hidden-frame/archive"
                label="Open hidden frame archive"
                variant="visible"
                size="md"
              />
            </div>
            <HiddenFrameProgress summary={summary} />
          </div>
          <img
            className="hidden-frame-hero__art"
            src={hiddenFramePhase0Assets.ui.titleCard}
            alt="The Hidden Frame title art with the broken frame symbol"
          />
        </header>

        <div className="hidden-frame-grid hidden-frame-grid--two">
          <section className="hidden-frame-panel">
            <h2>Archive rules</h2>
            <ul className="hidden-frame-list">
              <li>Hidden Frame is not graded and does not replace assignments.</li>
              <li>It will never ask you to leave the DCC website.</li>
              <li>It will never ask you to contact strangers or use personal information.</li>
              <li>It will never ask you to bypass security or access private systems.</li>
            </ul>
          </section>
          <CompressionLog title="Archive message" tone="signal">
            <p>
              The first frame was never missing. It was waiting for someone to notice the edge.
            </p>
          </CompressionLog>
        </div>
      </div>
    </section>
  );
}
