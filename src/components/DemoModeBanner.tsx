import { useAuth } from '../auth/useAuth';

export function DemoModeBanner() {
  const { isLocalDemoMode } = useAuth();

  if (!isLocalDemoMode) {
    return null;
  }

  return (
    <div className="demo-banner">
      Local Demo Mode is for development only. Production access requires school Google sign-in and
      Firebase security rules.
    </div>
  );
}
