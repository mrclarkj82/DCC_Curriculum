import { useAuth } from '../auth/useAuth';

export function AuthDebugPanel() {
  const { userProfile, role, classIds } = useAuth();

  if (!import.meta.env.DEV || !userProfile) {
    return null;
  }

  return (
    <aside className="auth-debug-panel" aria-label="Development auth debug panel">
      <p className="retro-label">Auth Debug</p>
      <dl className="detail-list">
        <div>
          <dt>UID</dt>
          <dd>{userProfile.uid}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{userProfile.email}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{role ?? 'none'}</dd>
        </div>
        <div>
          <dt>Class IDs</dt>
          <dd>{classIds.length ? classIds.join(', ') : 'none'}</dd>
        </div>
      </dl>
    </aside>
  );
}
