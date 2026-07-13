import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { CompressionLog } from '../components/CompressionLog';
import { HiddenFrameProgress } from '../components/HiddenFrameProgress';
import { UnrealSignalGrid } from '../components/UnrealSignalGrid';
import { getHiddenFrameFileById, type HiddenFrameFileRecord } from '../data/hiddenFrameFiles';
import { hiddenFrameUnrealClues } from '../data/hiddenFrameUnrealClues';
import { useHiddenFrameProgress } from '../hooks/useHiddenFrameProgress';
import { hiddenFramePhase0AssetRoles } from '../hiddenFramePhase0Assets';

const renderRoomFileIds = ['012', '013', '014'];
const renderRoomClues = hiddenFrameUnrealClues.filter((clue) =>
  ['coordinate', 'blueprint', 'trigger-volume'].includes(clue.concept),
);

export function HiddenFrameRenderRoomPage() {
  const { summary } = useHiddenFrameProgress();
  const renderRoomFiles = renderRoomFileIds
    .map((fileId) => getHiddenFrameFileById(fileId))
    .filter((file): file is HiddenFrameFileRecord => Boolean(file));

  return (
    <section
      className="hidden-frame-page hidden-frame-page--render-room"
      style={
        { '--hf-page-bg': `url(${hiddenFramePhase0AssetRoles.renderRoomBackground})` } as CSSProperties
      }
    >
      <div className="hidden-frame-page__overlay" aria-hidden="true" />
      <div className="hidden-frame-page__inner">
        <header className="hidden-frame-section-header">
          <div>
            <p className="hidden-frame-kicker">Render Room signal</p>
            <h1>The Render Room</h1>
            <p>
              The room is a web page, not a playable Unreal build. Its clues use Unreal concepts:
              transforms, logic, lighting, materials, collision, and camera perspective.
            </p>
          </div>
          <div className="hidden-frame-header-actions">
            <HiddenFrameProgress summary={summary} />
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/unreal">
              Unreal Index
            </Link>
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/archive">
              Back to Archive
            </Link>
          </div>
        </header>

        <CompressionLog title="Editor preview" tone="signal">
          <p>
            This route is optional and ungraded. It does not require installing Unreal Engine,
            opening private projects, or leaving DCC Creative Studio.
          </p>
        </CompressionLog>

        <div className="hidden-frame-render-room-shell" aria-label="Render Room status">
          <section className="hidden-frame-render-room-console">
            <p className="hidden-frame-kicker">Viewport status</p>
            <h2>Scene Responding</h2>
            <dl>
              <div>
                <dt>Transform</dt>
                <dd>Location vector pinned</dd>
              </div>
              <div>
                <dt>Logic</dt>
                <dd>Blueprint event path visible</dd>
              </div>
              <div>
                <dt>Interaction</dt>
                <dd>Trigger volume boundary detected</dd>
              </div>
            </dl>
          </section>

          <section className="hidden-frame-render-room-files">
            <p className="hidden-frame-kicker">Recovered file doors</p>
            <h2>Phase 5 Chain</h2>
            <div className="hidden-frame-render-room-file-list">
              {renderRoomFiles.map((file) => (
                <Link className="hidden-frame-render-room-file" key={file.id} to={file.route}>
                  <span>File {file.fileNumber}</span>
                  <strong>{file.title}</strong>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <UnrealSignalGrid clues={renderRoomClues} />
      </div>
    </section>
  );
}
