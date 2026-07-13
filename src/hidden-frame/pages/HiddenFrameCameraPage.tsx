import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { CameraClueGrid } from '../components/CameraClueGrid';
import { CompressionLog } from '../components/CompressionLog';
import { HiddenFrameProgress } from '../components/HiddenFrameProgress';
import { hiddenFrameCameraClues } from '../data/hiddenFrameCameraClues';
import { useHiddenFrameProgress } from '../hooks/useHiddenFrameProgress';
import { hiddenFramePhase0AssetRoles } from '../hiddenFramePhase0Assets';

export function HiddenFrameCameraPage() {
  const { summary } = useHiddenFrameProgress();

  return (
    <section
      className="hidden-frame-page hidden-frame-page--camera"
      style={{ '--hf-page-bg': `url(${hiddenFramePhase0AssetRoles.unrealBackground})` } as CSSProperties}
    >
      <div className="hidden-frame-page__overlay" aria-hidden="true" />
      <div className="hidden-frame-page__inner">
        <header className="hidden-frame-section-header">
          <div>
            <p className="hidden-frame-kicker">Camera signal</p>
            <h1>Cinematography Index</h1>
            <p>
              The camera signal hides its answers in composition choices: thirds, lines, symmetry,
              headroom, look space, repetition, and center framing.
            </p>
          </div>
          <div className="hidden-frame-header-actions">
            <HiddenFrameProgress summary={summary} />
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/archive">
              Back to Archive
            </Link>
          </div>
        </header>

        <CompressionLog title="Observation scope" tone="signal">
          <p>
            These clues reward noticing how a frame is arranged. They are optional, ungraded, and
            contained inside the DCC website.
          </p>
        </CompressionLog>

        <CameraClueGrid clues={hiddenFrameCameraClues} />
      </div>
    </section>
  );
}
