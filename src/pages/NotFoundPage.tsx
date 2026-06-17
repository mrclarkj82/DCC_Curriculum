import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';

export function NotFoundPage() {
  return (
    <main className="standalone-page">
      <EmptyState
        title="Page not found"
        message="The route you opened does not exist in the Phase 3 scaffold."
      />
      <Link className="secondary-button" to="/today">
        Back to Today
      </Link>
    </main>
  );
}

