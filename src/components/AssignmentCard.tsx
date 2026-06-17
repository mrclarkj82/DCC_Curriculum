import { Link } from 'react-router-dom';
import type { Assignment } from '../types';

export function AssignmentCard({ assignment }: { assignment: Assignment }) {
  return (
    <article className="card compact-card">
      <h3>{assignment.title}</h3>
      <p>{assignment.instructions}</p>
      <p className="meta-line">{assignment.submissionType}</p>
      <Link className="text-link" to={`/assignments/${assignment.id}`}>
        View assignment
      </Link>
    </article>
  );
}

