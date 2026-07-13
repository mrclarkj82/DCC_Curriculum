import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { CompressionLog } from '../components/CompressionLog';
import { HiddenFrameProgress } from '../components/HiddenFrameProgress';
import { TimelineTrack } from '../components/TimelineTrack';
import { hiddenFrameVideoClues } from '../data/hiddenFrameVideoClues';
import { useHiddenFrameProgress } from '../hooks/useHiddenFrameProgress';
import { hiddenFramePhase0AssetRoles } from '../hiddenFramePhase0Assets';

export function HiddenFrameTimelinePage() {
  const { summary } = useHiddenFrameProgress();

  return (
    <section
      className="hidden-frame-page hidden-frame-page--timeline"
      style={{ '--hf-page-bg': `url(${hiddenFramePhase0AssetRoles.videoBackground})` } as CSSProperties}
    >
      <div className="hidden-frame-page__overlay" aria-hidden="true" />
      <div className="hidden-frame-page__inner">
        <header className="hidden-frame-section-header">
          <div>
            <p className="hidden-frame-kicker">Timeline signal</p>
            <h1>Video Production Drift</h1>
            <p>
              The timeline keeps its clues inside timecode, cuts, lower thirds, and sound bridges.
              Use only approved DCC video examples when a class video is referenced.
            </p>
          </div>
          <div className="hidden-frame-header-actions">
            <HiddenFrameProgress summary={summary} />
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/archive">
              Back to Archive
            </Link>
          </div>
        </header>

        <CompressionLog title="Signal scope" tone="signal">
          <p>
            This route is optional and ungraded. It does not ask students to leave the DCC website,
            search social media, or use personal information.
          </p>
        </CompressionLog>

        <TimelineTrack clues={hiddenFrameVideoClues} />
      </div>
    </section>
  );
}
