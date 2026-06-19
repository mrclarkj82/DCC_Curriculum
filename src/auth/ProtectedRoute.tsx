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
  const { authError, firebaseUser, userProfile, role, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingState label="Checking secure studio access..." />;
  }

  if (!firebaseUser && !userProfile) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!userProfile) {
    return (
      <section className="state-box neon-card error-state">
        <p className="eyebrow">Profile Setup</p>
        <h2>Your Google sign-in worked, but your DCC profile is missing.</h2>
        <p>
          {authError ||
            'Ask an admin to check your allowed account settings, then sign out and sign back in.'}
        </p>
        <button className="outline-button" type="button" onClick={() => void signOut()}>
          Sign Out
        </button>
      </section>
    );
  }

  if (allowedRoles?.length && (!role || !allowedRoles.includes(role))) {
    return <AccessDenied />;
  }

  return <Outlet />;
}
