import { Link, useParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { EvidenceChecklist } from '../components/EvidenceChecklist';
import { PageContainer } from '../components/PageContainer';
import { RubricTable } from '../components/RubricTable';
import { getAssignment, getLesson, getProgramArea } from '../data/seedData';

export function AssignmentDetailPage() {
  const { assignmentId } = useParams();
  const assignment = assignmentId ? getAssignment(assignmentId) : undefined;

  if (!assignment) {
    return (
      <EmptyState
        title="Assignment not found"
        message="This scaffold could not find an assignment record for the requested ID."
      />
    );
  }

  const lesson = getLesson(assignment.lessonId);
  const area = getProgramArea(assignment.programAreaId);

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
    </PageContainer>
  );
}
