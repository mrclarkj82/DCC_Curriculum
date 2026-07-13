import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { CompressionLog } from '../components/CompressionLog';
import { HiddenFrameProgress } from '../components/HiddenFrameProgress';
import { ObjectClueGrid } from '../components/ObjectClueGrid';
import { hiddenFrameObjectClues } from '../data/hiddenFrameObjectClues';
import { useHiddenFrameProgress } from '../hooks/useHiddenFrameProgress';
import { hiddenFramePhase0AssetRoles } from '../hiddenFramePhase0Assets';

export function HiddenFrameObjectsPage() {
  const { summary } = useHiddenFrameProgress();

  return (
    <section
      className="hidden-frame-page hidden-frame-page--objects"
      style={{ '--hf-page-bg': `url(${hiddenFramePhase0AssetRoles.unrealBackground})` } as CSSProperties}
    >
      <div className="hidden-frame-page__overlay" aria-hidden="true" />
      <div className="hidden-frame-page__inner">
        <header className="hidden-frame-section-header">
          <div>
            <p className="hidden-frame-kicker">Object signal</p>
            <h1>Object Inspection Index</h1>
            <p>
              The object signal hides its clues in names, mesh details, materials, UV maps,
              shadows, scale, camera view, and small in-site surface marks.
            </p>
          </div>
          <div className="hidden-frame-header-actions">
            <HiddenFrameProgress summary={summary} />
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/render-room">
              Render Room
            </Link>
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/archive">
              Back to Archive
            </Link>
          </div>
        </header>

        <CompressionLog title="Object scope" tone="signal">
          <p>
            These are observation clues only. They do not ask students to upload files, open private
            project folders, install software, or leave DCC Creative Studio.
          </p>
        </CompressionLog>

        <ObjectClueGrid clues={hiddenFrameObjectClues} />
      </div>
    </section>
  );
}
