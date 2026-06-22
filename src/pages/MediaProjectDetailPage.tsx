import { useParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { EvidenceChecklist } from '../components/EvidenceChecklist';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import { RubricTable } from '../components/RubricTable';
import { StatusBadge } from '../components/StatusBadge';
import { SubmissionPanel } from '../components/submissions/SubmissionPanel';
import { useAsyncData } from '../hooks/useAsyncData';
import { usePrimaryClassRecord } from '../hooks/usePrimaryClassRecord';
import { getMediaProjectById } from '../services/mediaProjectService';
import { getProgramAreaById } from '../services/programAreaService';
import { resolveSubmissionTarget } from '../services/submissionService';

export function MediaProjectDetailPage() {
  const { projectId } = useParams();
  const {
    userProfile,
    classRecord,
    isLoading: classLoading,
    error: classError,
  } = usePrimaryClassRecord();
  const { data, isLoading, error } = useAsyncData(
    async () => {
      if (!projectId) {
        return { project: null, area: null };
      }

      const project = await getMediaProjectById(projectId);
      const area = project ? await getProgramAreaById(project.programAreaId) : null;

      return { project, area };
    },
    [projectId],
    'Unable to load this media project from Firestore.',
  );

  if (isLoading) {
    return <LoadingState label="Loading media project from Firestore..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!data?.project) {
    return (
      <EmptyState
        title="Media project not found"
        message="Firestore does not have a media project record for this ID yet. Run the curriculum seed importer or check the project link."
      />
    );
  }

  const { project, area } = data;
  const submissionTarget = resolveSubmissionTarget('mediaProject', project);

  return (
    <PageContainer
      eyebrow={area?.title ?? project.programAreaId}
      title={project.title}
      description={project.description}
      actions={<StatusBadge status={project.status} />}
      className="studio-pink"
    >
      <div className="detail-grid">
        <section className="card mission-panel">
          <h2>Project Type</h2>
          <p>{project.projectType}</p>
        </section>

        <section className="card mission-panel">
          <h2>Build / Produce</h2>
          <p>{project.studentTask}</p>
        </section>

        <section className="card mission-panel">
          <h2>Skill Focus</h2>
          <EvidenceChecklist items={project.skillFocus} />
        </section>

        <section className="card mission-panel">
          <h2>Media Submissions</h2>
          <EvidenceChecklist items={project.submissionTypes} />
        </section>

        <section className="card mission-panel">
          <h2>Submit Evidence</h2>
          <EvidenceChecklist items={project.evidenceRequired} />
        </section>

        <section className="card mission-panel">
          <h2>Reflection Prompt</h2>
          <p>{project.reflectionPrompt}</p>
        </section>

        <section className="card span-two mission-panel">
          <h2>Rubric</h2>
          <RubricTable rubric={project.rubric} />
        </section>

        <section className="card span-two mission-panel">
          <h2>Tags</h2>
          <div className="tag-row">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>
      </div>
      {classLoading && <LoadingState label="Loading your class for submissions..." />}
      {classError && <ErrorState message={classError} />}
      <SubmissionPanel
        classRecord={classRecord}
        activeItemType="mediaProject"
        activeItemId={project.id}
        target={submissionTarget}
        userProfile={userProfile}
        viewerMode="student"
      />
    </PageContainer>
  );
}
