import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { CompressionLog } from '../components/CompressionLog';
import { HiddenFrameProgress } from '../components/HiddenFrameProgress';
import { UnrealSignalGrid } from '../components/UnrealSignalGrid';
import { hiddenFrameUnrealClues } from '../data/hiddenFrameUnrealClues';
import { useHiddenFrameProgress } from '../hooks/useHiddenFrameProgress';
import { hiddenFramePhase0AssetRoles } from '../hiddenFramePhase0Assets';

export function HiddenFrameUnrealPage() {
  const { summary } = useHiddenFrameProgress();

  return (
    <section
      className="hidden-frame-page hidden-frame-page--unreal"
      style={{ '--hf-page-bg': `url(${hiddenFramePhase0AssetRoles.renderRoomBackground})` } as CSSProperties}
    >
      <div className="hidden-frame-page__overlay" aria-hidden="true" />
      <div className="hidden-frame-page__inner">
        <header className="hidden-frame-section-header">
          <div>
            <p className="hidden-frame-kicker">Unreal signal index</p>
            <h1>Viewport Clue Map</h1>
            <p>
              This index organizes the Render Room clues by Unreal Engine concepts: coordinates,
              rotation, scale, lighting, materials, Blueprints, trigger volumes, collision, and
              camera/player perspective.
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

        <CompressionLog title="Engine scope" tone="signal">
          <p>
            These are observation clues, not software instructions. They do not ask students to
            open private files, install tools, bypass security, or leave the DCC site.
          </p>
        </CompressionLog>

        <UnrealSignalGrid clues={hiddenFrameUnrealClues} />
      </div>
    </section>
  );
}
