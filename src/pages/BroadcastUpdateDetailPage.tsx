import { Link, useParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { EvidenceChecklist } from '../components/EvidenceChecklist';
import { PageContainer } from '../components/PageContainer';
import { StatusBadge } from '../components/StatusBadge';
import { getBroadcastUpdate, getProgramArea } from '../data/seedData';

export function BroadcastUpdateDetailPage() {
  const { updateId } = useParams();
  const update = updateId ? getBroadcastUpdate(updateId) : undefined;

  if (!update) {
    return (
      <EmptyState
        title="Broadcast update not found"
        message="This scaffold could not find a Broadcast Desk Update record for the requested ID."
      />
    );
  }

  const area = getProgramArea(update.programAreaId);

  return (
    <PageContainer
      eyebrow={area?.title ?? update.programAreaId}
      title={update.title}
      description={update.summary}
      actions={<StatusBadge status={update.status} />}
    >
      <div className="detail-grid">
        <section className="card span-two">
          <h2>Student Instructions</h2>
          <p>{update.studentInstructions}</p>
        </section>

        <section className="card">
          <h2>Linked Resources</h2>
          {update.linkedResources.length ? (
            <EvidenceChecklist items={update.linkedResources} />
          ) : (
            <p className="muted">Linked resource placeholder.</p>
          )}
        </section>

        <section className="card">
          <h2>Related Projects</h2>
          <ul className="link-list">
            {update.relatedProjectIds.map((projectId) => (
              <li key={projectId}>
                <Link to={`/media-projects/${projectId}`}>{projectId}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>Submission Requirements</h2>
          <EvidenceChecklist items={update.submissionRequirements} />
        </section>

        <section className="card">
          <h2>Dates</h2>
          <dl className="detail-list">
            <div>
              <dt>Publish Date</dt>
              <dd>{update.publishDate || 'Publish date placeholder'}</dd>
            </div>
            <div>
              <dt>Due Date</dt>
              <dd>{update.dueDate || 'Due date placeholder'}</dd>
            </div>
          </dl>
        </section>

        <section className="card span-two">
          <h2>Tags</h2>
          <div className="tag-row">
            {update.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

