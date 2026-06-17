import { Link } from 'react-router-dom';
import type { ProgramArea } from '../types';
import { StatusBadge } from './StatusBadge';

export function ProgramAreaCard({ area }: { area: ProgramArea }) {
  return (
    <article className="card">
      <div className="card-header">
        <h2>{area.title}</h2>
        <StatusBadge status={area.status} />
      </div>
      <p>{area.description}</p>
      <p className="meta-line">{area.supportedContentTypes.join(' / ')}</p>
      <Link className="text-link" to={area.defaultRoute}>
        Open {area.shortTitle}
      </Link>
    </article>
  );
}

