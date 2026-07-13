import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { AssetRequestList } from '../components/AssetRequestList';
import { ExpansionChecklist } from '../components/ExpansionChecklist';
import { ExpansionSafetyPanel } from '../components/ExpansionSafetyPanel';
import {
  hiddenFrameAssetRequests,
  hiddenFrameExpansionPoints,
} from '../data/hiddenFrameExpansionManifest';
import { hiddenFramePhase0AssetRoles } from '../hiddenFramePhase0Assets';

export function HiddenFrameExpansionPage() {
  return (
    <section
      className="hidden-frame-page hidden-frame-page--expansion"
      style={{ '--hf-page-bg': `url(${hiddenFramePhase0AssetRoles.archiveBackground})` } as CSSProperties}
    >
      <div className="hidden-frame-page__overlay" aria-hidden="true" />
      <div className="hidden-frame-page__inner">
        <header className="hidden-frame-section-header">
          <div>
            <p className="hidden-frame-kicker">Admin-only expansion index</p>
            <h1>Hidden Frame Expansion Tools</h1>
            <p>
              This admin-only page lists extension points and asset requests. It does not display
              puzzle answers, student progress, submissions, rosters, or private class data.
            </p>
          </div>
          <div className="hidden-frame-header-actions">
            <Link className="hidden-frame-secondary-link" to="/hidden-frame/archive">
              Back to Archive
            </Link>
            <Link className="hidden-frame-secondary-link" to="/admin">
              Admin Home
            </Link>
          </div>
        </header>

        <ExpansionSafetyPanel />

        <section className="hidden-frame-collection-section">
          <div>
            <p className="hidden-frame-kicker">Extension points</p>
            <h2>Content Systems</h2>
            <p>
              Add future Hidden Frame content through typed data modules first, then reusable
              components only when a new clue type needs them.
            </p>
          </div>
          <ExpansionChecklist points={hiddenFrameExpansionPoints} />
        </section>

        <section className="hidden-frame-collection-section">
          <div>
            <p className="hidden-frame-kicker">Asset requests</p>
            <h2>Future Content Needs</h2>
            <p>
              Requests are planning notes only. They do not contain student data, credentials, or
              private media.
            </p>
          </div>
          <AssetRequestList requests={hiddenFrameAssetRequests} />
        </section>
      </div>
    </section>
  );
}
