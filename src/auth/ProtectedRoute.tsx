import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { LoadingState } from '../components/LoadingState';
import type { UserRole } from '../types';
import { useAuth } from './useAuth';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

function AccessDenied() {
  return (
    <section className="state-box neon-card error-state">
      <p className="eyebrow">Access Denied</p>
      <h2>This area is not available for your current role.</h2>
      <p>
        If you believe this is a mistake, ask the project owner to check your role in Firebase
        Console.
      </p>
      <Link className="outline-button" to="/today">
        Back to Today
      </Link>
    </section>
  );
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { firebaseUser, userProfile, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingState label="Checking secure studio access..." />;
  }

  if (!firebaseUser && !userProfile) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!userProfile && !allowedRoles?.length) {
    return <Outlet />;
  }

  if (allowedRoles?.length && (!role || !allowedRoles.includes(role))) {
    return <AccessDenied />;
  }

  return <Outlet />;
}
