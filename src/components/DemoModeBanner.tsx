import { useDemoAuth } from '../auth/DemoAuthContext';

export function DemoModeBanner() {
  const { isDemoMode } = useDemoAuth();

  if (!isDemoMode) {
    return null;
  }

  return (
    <div className="demo-banner">
      Demo student mode is temporary scaffold-only access. Firebase Google sign-in arrives in Phase 4.
    </div>
  );
}

