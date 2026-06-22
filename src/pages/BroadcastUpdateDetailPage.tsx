import { Link, useParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { EvidenceChecklist } from '../components/EvidenceChecklist';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import { StatusBadge } from '../components/StatusBadge';
import { SubmissionPanel } from '../components/submissions/SubmissionPanel';
import { useAsyncData } from '../hooks/useAsyncData';
import { usePrimaryClassRecord } from '../hooks/usePrimaryClassRecord';
import { getBroadcastUpdateById } from '../services/broadcastUpdateService';
import { getProgramAreaById } from '../services/programAreaService';
import { resolveSubmissionTarget } from '../services/submissionService';

export function BroadcastUpdateDetailPage() {
  const { updateId } = useParams();
  const {
    userProfile,
    classRecord,
    isLoading: classLoading,
    error: classError,
  } = usePrimaryClassRecord();
  const { data, isLoading, error } = useAsyncData(
    async () => {
      if (!updateId) {
        return { update: null, area: null };
      }

      const update = await getBroadcastUpdateById(updateId);
      const area = update ? await getProgramAreaById(update.programAreaId) : null;

      return { update, area };
    },
    [updateId],
    'Unable to load this Broadcast Desk Update from Firestore.',
  );

  if (isLoading) {
    return <LoadingState label="Loading Broadcast Desk Update from Firestore..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!data?.update) {
    return (
      <EmptyState
        title="Broadcast update not found"
        message="Firestore does not have a Broadcast Desk Update record for this ID yet. Run the curriculum seed importer or check the update link."
      />
    );
  }

  const { update, area } = data;
  const submissionTarget = resolveSubmissionTarget('broadcastUpdate', update);

  return (
    <PageContainer
      eyebrow={area?.title ?? update.programAreaId}
      title={update.title}
      description={update.summary}
      actions={<StatusBadge status={update.status} />}
      className="studio-pink"
    >
      <div className="detail-grid">
        <section className="card span-two mission-panel neon-border">
          <h2>Production Update</h2>
          <p>{update.summary}</p>
        </section>

        <section className="card span-two mission-panel">
          <h2>Student Instructions</h2>
          <p>{update.studentInstructions}</p>
        </section>

        <section className="card mission-panel">
          <h2>Linked Resources</h2>
          {update.linkedResources.length ? (
            <EvidenceChecklist items={update.linkedResources} />
          ) : (
            <p className="muted">Linked resource placeholder.</p>
          )}
        </section>

        <section className="card mission-panel">
          <h2>Related Project</h2>
          <ul className="link-list">
            {update.relatedProjectIds.map((projectId) => (
              <li key={projectId}>
                <Link to={`/media-projects/${projectId}`}>{projectId}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="card mission-panel">
          <h2>Submission Requirements</h2>
          <EvidenceChecklist items={update.submissionRequirements} />
        </section>

        <section className="card mission-panel">
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

        <section className="card span-two mission-panel">
          <h2>Tags</h2>
          <div className="tag-row">
            {update.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>
      </div>
      {classLoading && <LoadingState label="Loading your class for submissions..." />}
      {classError && <ErrorState message={classError} />}
      <SubmissionPanel
        classRecord={classRecord}
        activeItemType="broadcastUpdate"
        activeItemId={update.id}
        target={submissionTarget}
        userProfile={userProfile}
        viewerMode="student"
      />
    </PageContainer>
  );
}
