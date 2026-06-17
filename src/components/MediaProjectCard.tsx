import { Link } from 'react-router-dom';
import type { MediaProject } from '../types';
import { StatusBadge } from './StatusBadge';

export function MediaProjectCard({ project }: { project: MediaProject }) {
  return (
    <article className="card compact-card">
      <div className="card-header">
        <h3>{project.title}</h3>
        <StatusBadge status={project.status} />
      </div>
      <p>{project.description}</p>
      <p className="meta-line">{project.projectType}</p>
      <Link className="text-link" to={`/media-projects/${project.id}`}>
        View project
      </Link>
    </article>
  );
}

