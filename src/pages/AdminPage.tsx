import { useAuth } from '../auth/useAuth';
import { PageContainer } from '../components/PageContainer';

const adminTools = [
  'Manage Users',
  'Manage Roles',
  'Manage Classes',
  'Import curriculum seed data',
  'Set Active Class Item',
  'Publish/Unpublish Content',
];

export function AdminPage() {
  const { userProfile } = useAuth();

  return (
    <PageContainer
      eyebrow="Admin Placeholder"
      title="Admin Studio Tools"
      description="These tools are intentionally not implemented in Phase 3."
      className="studio-pink"
    >
      <section className="card mission-panel neon-border">
        <p className="retro-label">Admin Access</p>
        <h2>Signed in as {userProfile?.displayName ?? 'admin user'}</h2>
        <p className="muted">
          These are Phase 4 placeholders only. User, role, and class changes should be managed
          manually in Firebase Console until safer admin tooling is built.
        </p>
      </section>

      <div className="card-grid two">
        {adminTools.map((tool) => (
          <article className="card neon-card compact-card" key={tool}>
            <h2>{tool}</h2>
            <p className="muted">Future admin workflow placeholder.</p>
          </article>
        ))}
      </div>
    </PageContainer>
  );
}
