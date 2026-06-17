import { useAuth } from '../auth/useAuth';
import { EvidenceChecklist } from '../components/EvidenceChecklist';
import { PageContainer } from '../components/PageContainer';

const firestoreCollections = [
  'programAreas',
  'lessons',
  'assignments',
  'quizzes',
  'mediaProjects',
  'broadcastUpdates',
  'classes',
  'users',
];

const seedCommands = [
  'npm run seed:curriculum -- --dry-run',
  'CONFIRM_SEED=true npm run seed:curriculum',
  '$env:CONFIRM_SEED="true"; npm run seed:curriculum',
  'set CONFIRM_SEED=true && npm run seed:curriculum',
];

export function AdminPage() {
  const { userProfile } = useAuth();

  return (
    <PageContainer
      eyebrow="Admin Content Status"
      title="Firestore Seed Control Room"
      description="Phase 5 adds Firestore-backed content and a safe seed importer. Full CMS tooling is still future work."
      className="studio-pink"
    >
      <div className="section-stack">
        <section className="card mission-panel neon-border">
          <p className="retro-label">Admin Access</p>
          <h2>Signed in as {userProfile?.displayName ?? 'admin user'}</h2>
          <p className="muted">
            Use Firebase Console for user role and roster edits until a safer admin CMS is built.
          </p>
        </section>

        <section className="content-section neon-section">
          <p className="retro-label">Expected Firestore Collections</p>
          <h2>Seed Targets</h2>
          <EvidenceChecklist items={firestoreCollections} />
        </section>

        <section className="content-section neon-section">
          <p className="retro-label">Seed Importer Commands</p>
          <h2>Curriculum Import</h2>
          <ul className="link-list">
            {seedCommands.map((command) => (
              <li key={command}>
                <code>{command}</code>
              </li>
            ))}
          </ul>
        </section>

        <section className="content-section neon-section">
          <p className="retro-label">Role Bootstrap Reminder</p>
          <h2>First Admin / Teacher Setup</h2>
          <ol className="ordered-list">
            <li>Sign in once with an approved school Google account.</li>
            <li>Open Firebase Console and find the created users document.</li>
            <li>Change the role to admin or teacher only for trusted staff accounts.</li>
            <li>Add class IDs to the user profile and matching class teacherIds/studentIds arrays.</li>
          </ol>
        </section>

        <section className="content-section neon-section">
          <p className="retro-label">Security Warning</p>
          <h2>No Secrets In Git</h2>
          <p className="muted">
            Do not commit service account files, `.env.local`, private school links, rosters,
            student media, or Firebase secrets. Store local credentials outside the repository.
          </p>
        </section>

        <section className="content-section neon-section">
          <p className="retro-label">Future CMS</p>
          <h2>Not Built Yet</h2>
          <p className="muted">
            Full curriculum editing, quiz publishing, submissions, grading, uploads, and portfolio
            management are intentionally left for later phases.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
