import { Link, useParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { EvidenceChecklist } from '../components/EvidenceChecklist';
import { PageContainer } from '../components/PageContainer';
import { StatusBadge } from '../components/StatusBadge';
import { VocabularyList } from '../components/VocabularyList';
import { getAssignment, getLesson, getProgramArea } from '../data/seedData';

export function LessonDetailPage() {
  const { lessonId } = useParams();
  const lesson = lessonId ? getLesson(lessonId) : undefined;

  if (!lesson) {
    return (
      <EmptyState
        title="Lesson not found"
        message="This scaffold could not find a lesson record for the requested ID."
      />
    );
  }

  const area = getProgramArea(lesson.programAreaId);
  const assignment = getAssignment(lesson.assignment.id);

  return (
    <PageContainer
      eyebrow={`${area?.title ?? lesson.programAreaId} / ${lesson.quarter}`}
      title={lesson.title}
      description={lesson.learningTarget}
      actions={<StatusBadge status={lesson.status} />}
    >
      <div className="detail-grid">
        <section className="card">
          <h2>Lesson Details</h2>
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
            <div>
              <dt>Video Segment</dt>
              <dd>
                {lesson.video.start}-{lesson.video.end}
              </dd>
            </div>
          </dl>
        </section>

        <section className="card">
          <h2>Bell Ringer</h2>
          <p>{lesson.bellRinger.prompt}</p>
        </section>

        <section className="card span-two">
          <h2>Vocabulary</h2>
          <VocabularyList terms={lesson.vocabulary} />
        </section>

        <section className="card">
          <h2>Slides</h2>
          {lesson.slides.url ? (
            <a className="secondary-button" href={lesson.slides.url} target="_blank" rel="noreferrer">
              Open {lesson.slides.title}
            </a>
          ) : (
            <p className="muted">Slides link placeholder.</p>
          )}
          <p className="meta-line">Status: {lesson.slides.status}</p>
        </section>

        <section className="card">
          <h2>Assignment Summary</h2>
          <p>{lesson.assignment.title}</p>
          {assignment && <Link to={`/assignments/${assignment.id}`}>Open assignment details</Link>}
        </section>

        <section className="card">
          <h2>Submission Evidence</h2>
          <EvidenceChecklist items={lesson.assignment.evidenceRequired} />
        </section>

        <section className="card">
          <h2>Exit Ticket</h2>
          <p>{lesson.exitTicket}</p>
        </section>

        <section className="card span-two">
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

