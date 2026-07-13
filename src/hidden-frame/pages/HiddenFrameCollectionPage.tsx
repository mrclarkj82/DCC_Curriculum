import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { AchievementGrid } from '../components/AchievementGrid';
import { CompressionLog } from '../components/CompressionLog';
import { FrameCollectionGrid } from '../components/FrameCollectionGrid';
import { HiddenFrameProgress } from '../components/HiddenFrameProgress';
import { HiddenFrameResetPanel } from '../components/HiddenFrameResetPanel';
import { useHiddenFrameProgress } from '../hooks/useHiddenFrameProgress';
import { hiddenFramePhase0AssetRoles } from '../hiddenFramePhase0Assets';

export function HiddenFrameCollectionPage() {
  const { progress, summary, resetProgress } = useHiddenFrameProgress();

  return (
    <section
      className="hidden-frame-page hidden-frame-page--collection"
      style={{ '--hf-page-bg': `url(${hiddenFramePhase0AssetRoles.archiveBackground})` } as CSSProperties}
    >
      <div className="hidden-frame-page__overlay" aria-hidden="true" />
      <div className="hidden-frame-page__inner">
        <header className="hidden-frame-section-header">
          <div>
            <p className="hidden-frame-kicker">Frame collection</p>
            <h1>Recovered Frames</h1>
            <p>
              Frames are optional local collectibles. They are not grades, points, or classroom
              credit.
            </p>
          </div>
          <div className="hidden-frame-header-actions">
            <HiddenFrameProgress summary={summary} />
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/archive">
              Back to Archive
            </Link>
          </div>
        </header>

        {summary.chainComplete ? (
          <CompressionLog title="First chain complete" tone="signal">
            <p>
              Five frames recovered. The archive stays quiet, but it remembers the path you found.
            </p>
          </CompressionLog>
        ) : (
          <CompressionLog title="Collection waiting">
            <p>Recover files in the archive to add frames to this local collection.</p>
          </CompressionLog>
        )}

        <FrameCollectionGrid recoveredFrameIds={progress.recoveredFrameIds} />

        <section className="hidden-frame-collection-section">
          <div>
            <p className="hidden-frame-kicker">Recovered signals</p>
            <h2>Signal Badges</h2>
            <p>
              Badges are local discovery markers for this browser. They are not points,
              leaderboards, or assignment credit.
            </p>
          </div>
          <AchievementGrid earnedAchievementIds={progress.achievementIds} />
        </section>

        <HiddenFrameResetPanel onReset={resetProgress} />
      </div>
    </section>
  );
}
