import { useState } from 'react';
import { Navigate, useLocation, type Location } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const getPostLoginRedirectPath = (state: unknown): string => {
  if (!state || typeof state !== 'object' || !('from' in state)) {
    return '/today';
  }

  const from = (state as { from?: Location }).from;

  if (!from?.pathname || from.pathname === '/login') {
    return '/today';
  }

  return `${from.pathname}${from.search}${from.hash}`;
};

export function LoginPage() {
  const location = useLocation();
  const {
    authError,
    isLocalDemoMode,
    loading,
    signInAsLocalDemo,
    signInWithGoogle,
    userProfile,
  } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!loading && userProfile) {
    return <Navigate to={getPostLoginRedirectPath(location.state)} replace />;
  }

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);

    try {
      await signInWithGoogle();
    } catch {
      // AuthProvider stores the readable error message for the login panel.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page synth-grid-bg">
      <section className="login-panel">
        <p className="eyebrow">School Google Sign-In</p>
        <h1>DCC Creative Studio Login</h1>
        <p>
          Students and teachers sign in with their school Google account. Approved school email
          domains are checked before a user profile is created.
        </p>

        {authError && (
          <div className="form-message error-state" role="alert">
            {authError}
          </div>
        )}

        <button
          className="gradient-button"
          type="button"
          onClick={() => void handleGoogleSignIn()}
          disabled={loading || isSubmitting}
        >
          {isSubmitting || loading ? 'Signing In...' : 'Sign In With Google'}
        </button>

        {import.meta.env.DEV && (
          <div className="local-demo-panel">
            <p className="retro-label">Local Demo Mode</p>
            <p className="muted">
              Local Demo Mode is available only during development. It never bypasses production
              Firebase Authentication or security rules.
            </p>
            <button className="outline-button" type="button" onClick={signInAsLocalDemo}>
              {isLocalDemoMode ? 'Local Demo Active' : 'Continue in Local Demo Mode'}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
