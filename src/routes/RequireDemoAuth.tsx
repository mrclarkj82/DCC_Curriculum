import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDemoAuth } from '../auth/DemoAuthContext';

export function RequireDemoAuth() {
  const { user } = useDemoAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

