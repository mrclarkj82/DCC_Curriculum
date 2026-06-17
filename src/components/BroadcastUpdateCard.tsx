import { Link } from 'react-router-dom';
import type { BroadcastUpdate } from '../types';
import { StatusBadge } from './StatusBadge';

export function BroadcastUpdateCard({ update }: { update: BroadcastUpdate }) {
  return (
    <article className="card neon-card neon-card--pink compact-card">
      <div className="card-header">
        <h3>{update.title}</h3>
        <StatusBadge status={update.status} />
      </div>
      <p>{update.summary}</p>
      <p className="meta-line">Related: {update.relatedProjectIds.join(', ') || 'None yet'}</p>
      <Link className="outline-button" to={`/broadcast-updates/${update.id}`}>
        Open Update
      </Link>
    </article>
  );
}
