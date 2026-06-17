import { Link } from 'react-router-dom';
import type { ProgramArea } from '../types';
import { StatusBadge } from './StatusBadge';

export function ProgramAreaCard({ area }: { area: ProgramArea }) {
  const isVideoStudio = area.id === 'video-production';
  const toneClass = isVideoStudio ? 'neon-card--pink' : 'neon-card--cyan';
  const visualLabel = isVideoStudio ? 'VID' : '3D';

  return (
    <article className={`card neon-card program-area-card ${toneClass}`}>
      <span
        className={`program-card-visual ${isVideoStudio ? 'video' : ''}`.trim()}
        aria-hidden="true"
      >
        {visualLabel}
      </span>
      <div className="card-header">
        <h2>{area.title}</h2>
        <StatusBadge status={area.status} />
      </div>
      <p>{area.description}</p>
      <p className="meta-line">{area.supportedContentTypes.join(' / ')}</p>
      <Link className="outline-button" to={area.defaultRoute}>
        Launch {area.shortTitle}
      </Link>
    </article>
  );
}
