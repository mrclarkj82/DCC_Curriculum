import { Link, useParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { EvidenceChecklist } from '../components/EvidenceChecklist';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import { RubricTable } from '../components/RubricTable';
import { SubmissionPanel } from '../components/submissions/SubmissionPanel';
import { HiddenFrameIcon } from '../hidden-frame/components/HiddenFrameIcon';
import { useAsyncData } from '../hooks/useAsyncData';
import { usePrimaryClassRecord } from '../hooks/usePrimaryClassRecord';
import { getAssignmentById } from '../services/assignmentService';
import { getLessonById } from '../services/lessonService';
import { getProgramAreaById } from '../services/programAreaService';
import { resolveSubmissionTarget } from '../services/submissionService';

export function AssignmentDetailPage() {
  const { assignmentId } = useParams();
  const {
    userProfile,
    classRecord,
    isLoading: classLoading,
    error: classError,
  } = usePrimaryClassRecord();
  const { data, isLoading, error } = useAsyncData(
    async () => {
      if (!assignmentId) {
        return { assignment: null, lesson: null, area: null };
      }

      const assignment = await getAssignmentById(assignmentId);
      const [lesson, area] = await Promise.all([
        assignment?.lessonId ? getLessonById(assignment.lessonId) : Promise.resolve(null),
        assignment ? getProgramAreaById(assignment.programAreaId) : Promise.resolve(null),
      ]);

      return { assignment, lesson, area };
    },
    [assignmentId],
    'Unable to load this assignment from Firestore.',
  );

  if (isLoading) {
    return <LoadingState label="Loading assignment from Firestore..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!data?.assignment) {
    return (
      <EmptyState
        title="Assignment not found"
        message="Firestore does not have an assignment record for this ID yet. Run the curriculum seed importer or check the assignment link."
      />
    );
  }

  const { assignment, lesson, area } = data;
  const submissionTarget = resolveSubmissionTarget('assignment', assignment);

  return (
    <PageContainer
      eyebrow={area?.title ?? assignment.programAreaId}
      title={assignment.title}
      description={assignment.instructions}
      className={assignment.programAreaId === 'video-production' ? 'studio-pink' : 'studio-cyan'}
    >
      <div className="detail-grid">
        <section className="card mission-panel">
          <h2>Skill Focus</h2>
          <EvidenceChecklist items={assignment.skillFocus} />
        </section>

        <section className="card mission-panel">
          <h2>Submission Type</h2>
          <p>{assignment.submissionType}</p>
          {lesson && <Link to={`/lessons/${lesson.id}`}>Back to lesson</Link>}
        </section>

        {assignment.resources?.length ? (
          <section className="card span-two mission-panel">
            <h2>Assignment Resources</h2>
            <div className="resource-link-list">
              {assignment.resources.map((resource) => (
                <a
                  className="secondary-button"
                  href={resource.url}
                  key={resource.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {resource.label}
                </a>
              ))}
            </div>
            {assignment.resources.some((resource) => resource.description) && (
              <ul className="ordered-list">
                {assignment.resources
                  .filter((resource) => resource.description)
                  .map((resource) => (
                    <li key={`${resource.url}-description`}>{resource.description}</li>
                  ))}
              </ul>
            )}
          </section>
        ) : null}

        <section className="card span-two mission-panel">
          <h2>Required Steps</h2>
          <ol className="ordered-list">
            {assignment.requiredSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="card mission-panel">
          <h2>Submit Evidence</h2>
          <EvidenceChecklist items={assignment.evidenceRequired} />
        </section>

        <section className="card mission-panel">
          <h2>Extension Challenge</h2>
          <p>{assignment.extensionChallenge || 'No extension challenge yet.'}</p>
          <div className="hidden-frame-assignment-marker">
            <HiddenFrameIcon />
          </div>
        </section>

        <section className="card span-two mission-panel">
          <h2>Rubric</h2>
          <RubricTable rubric={assignment.rubric} />
        </section>

        <section className="card span-two mission-panel">
          <h2>Reflection Prompt</h2>
          <p>{assignment.reflectionPrompt || 'Reflection prompt placeholder.'}</p>
        </section>
      </div>
      {classLoading && <LoadingState label="Loading your class for submissions..." />}
      {classError && <ErrorState message={classError} />}
      <SubmissionPanel
        classRecord={classRecord}
        activeItemType="assignment"
        activeItemId={assignment.id}
        target={submissionTarget}
        userProfile={userProfile}
        viewerMode="student"
      />
    </PageContainer>
  );
}
