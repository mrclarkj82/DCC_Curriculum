import { PageContainer } from '../components/PageContainer';

const adminTools = [
  'Manage program areas',
  'Import curriculum seed data',
  'Set active class item',
  'Publish/unpublish lessons',
  'Manage users and roles',
];

export function AdminPage() {
  return (
    <PageContainer
      eyebrow="Admin Placeholder"
      title="Admin Console"
      description="These tools are intentionally not implemented in Phase 3."
      className="studio-pink"
    >
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
