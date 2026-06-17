import { Link, useParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { EvidenceChecklist } from '../components/EvidenceChecklist';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import { StatusBadge } from '../components/StatusBadge';
import { VocabularyList } from '../components/VocabularyList';
import { useAsyncData } from '../hooks/useAsyncData';
import { getAssignmentById } from '../services/assignmentService';
import { getLessonById } from '../services/lessonService';
import { getProgramAreaById } from '../services/programAreaService';

export function LessonDetailPage() {
  const { lessonId } = useParams();
  const { data, isLoading, error } = useAsyncData(
    async () => {
      if (!lessonId) {
        return { lesson: null, area: null, assignment: null };
      }

      const lesson = await getLessonById(lessonId);
      const [area, assignment] = await Promise.all([
        lesson ? getProgramAreaById(lesson.programAreaId) : Promise.resolve(null),
        lesson ? getAssignmentById(lesson.assignment.id) : Promise.resolve(null),
      ]);

      return { lesson, area, assignment };
    },
    [lessonId],
    'Unable to load this lesson from Firestore.',
  );

  if (isLoading) {
    return <LoadingState label="Loading lesson from Firestore..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!data?.lesson) {
    return (
      <EmptyState
        title="Lesson not found"
        message="Firestore does not have a lesson record for this ID yet. Run the curriculum seed importer or check the lesson link."
      />
    );
  }

  const { lesson, area, assignment } = data;

  return (
    <PageContainer
      eyebrow={`${area?.title ?? lesson.programAreaId} / ${lesson.quarter}`}
      title={lesson.title}
      description={lesson.learningTarget}
      actions={<StatusBadge status={lesson.status} />}
      className={lesson.programAreaId === 'video-production' ? 'studio-pink' : 'studio-cyan'}
    >
      <div className="detail-grid">
        <section className="card mission-panel">
          <h2>Learning Target</h2>
          <p>{lesson.learningTarget}</p>
          <dl className="detail-list">
            <div>
              <dt>Program Area</dt>
              <dd>{area?.title ?? lesson.programAreaId}</dd>
            </div>
            <div>
              <dt>Quarter</dt>
              <dd>{lesson.quarter}</dd>
            </div>
            <div>
              <dt>Unit</dt>
              <dd>{lesson.unit}</dd>
            </div>
          </dl>
        </section>

        <section className="card mission-panel">
          <h2>Bell Ringer</h2>
          <p>{lesson.bellRinger.prompt}</p>
        </section>

        <section className="card mission-panel">
          <h2>Video Segment</h2>
          <p>{lesson.video.source}</p>
          <p className="meta-line">
            {lesson.video.start}-{lesson.video.end}
          </p>
        </section>

        <section className="card mission-panel">
          <h2>Watch / Review</h2>
          {lesson.slides.url ? (
            <a className="secondary-button" href={lesson.slides.url} target="_blank" rel="noreferrer">
              Open {lesson.slides.title}
            </a>
          ) : (
            <p className="muted">Slides link placeholder.</p>
          )}
          <p className="meta-line">Status: {lesson.slides.status}</p>
        </section>

        <section className="card span-two mission-panel">
          <h2>Vocabulary</h2>
          <VocabularyList terms={lesson.vocabulary} />
        </section>

        <section className="card mission-panel">
          <h2>Assignment</h2>
          <p>{lesson.assignment.title}</p>
          {assignment && <Link to={`/assignments/${assignment.id}`}>Open assignment details</Link>}
        </section>

        <section className="card mission-panel">
          <h2>Submit Evidence</h2>
          <EvidenceChecklist items={lesson.assignment.evidenceRequired} />
        </section>

        <section className="card mission-panel">
          <h2>Exit Ticket</h2>
          <p>{lesson.exitTicket}</p>
        </section>

        <section className="card span-two mission-panel">
          <h2>Tags</h2>
          <div className="tag-row">
            {lesson.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
