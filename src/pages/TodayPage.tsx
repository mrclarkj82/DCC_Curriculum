import { Link } from 'react-router-dom';
import { EvidenceChecklist } from '../components/EvidenceChecklist';
import { PageContainer } from '../components/PageContainer';
import { StatusBadge } from '../components/StatusBadge';
import {
  activeClassItem,
  getBroadcastUpdate,
  getLesson,
  getMediaProject,
  getProgramArea,
} from '../data/seedData';

export function TodayPage() {
  const lesson = activeClassItem.type === 'lesson' ? getLesson(activeClassItem.id) : undefined;
  const mediaProject =
    activeClassItem.type === 'mediaProject' ? getMediaProject(activeClassItem.id) : undefined;
  const broadcastUpdate =
    activeClassItem.type === 'broadcastUpdate' ? getBroadcastUpdate(activeClassItem.id) : undefined;
  const programArea = getProgramArea(activeClassItem.programAreaId);

  return (
    <PageContainer
      eyebrow="Student Today"
      title="Today"
      description="A scaffold for the student's active class item. This layout is intentionally generic so it can support Unreal lessons, Video Production projects, or Broadcast Desk Updates."
    >
      <div className="today-grid">
        <section className="card">
          <div className="card-header">
            <h2>Active Program Area</h2>
            <StatusBadge status={activeClassItem.status} />
          </div>
          <p>{programArea?.title ?? 'Program area placeholder'}</p>
          <p className="muted">{programArea?.description}</p>
        </section>

        <section className="card">
          <h2>Bell Ringer</h2>
          <p>{lesson?.bellRinger.prompt ?? 'Bell ringer placeholder for active class item.'}</p>
        </section>

        <section className="card">
          <h2>Today's Goal</h2>
          <p>
            {lesson?.learningTarget ??
              mediaProject?.studentTask ??
              broadcastUpdate?.studentInstructions ??
              'Today goal placeholder.'}
          </p>
        </section>

        <section className="card">
          <h2>Slides and Resources</h2>
          {lesson?.slides.url ? (
            <a className="secondary-button" href={lesson.slides.url} target="_blank" rel="noreferrer">
              Open Slides
            </a>
          ) : (
            <button className="secondary-button" type="button" disabled>
              Slides placeholder
            </button>
          )}
          <p className="muted">Resource links will become data-driven in a later phase.</p>
        </section>

        <section className="card">
          <h2>Video or Resource Segment</h2>
          <p>
            {lesson
              ? `${lesson.video.source}: ${lesson.video.start}-${lesson.video.end}`
              : 'Video/resource placeholder for the active item.'}
          </p>
        </section>

        <section className="card">
          <h2>Assignment or Project Task</h2>
          <p>
            {lesson?.assignment.title ??
              mediaProject?.title ??
              broadcastUpdate?.title ??
              'Task placeholder'}
          </p>
          {lesson && <Link to={`/assignments/${lesson.assignment.id}`}>Open assignment</Link>}
        </section>

        <section className="card">
          <h2>Submission</h2>
          <EvidenceChecklist
            items={
              lesson?.assignment.evidenceRequired ??
              mediaProject?.evidenceRequired ??
              broadcastUpdate?.submissionRequirements ??
              []
            }
          />
          <button className="secondary-button" type="button" disabled>
            Submission button placeholder
          </button>
        </section>

        <section className="card">
          <h2>Exit Ticket</h2>
          <p>{lesson?.exitTicket ?? 'Exit ticket placeholder for the active item.'}</p>
        </section>
      </div>
    </PageContainer>
  );
}

