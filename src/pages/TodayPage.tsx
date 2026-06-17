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
      eyebrow="Daily Mission Board"
      title="Today's Mission"
      description="A clear classroom workflow for the active class item, whether it is an Unreal lesson, a Video Production project, or a Broadcast Desk Update."
      className="mission-board"
    >
      <div className="today-grid">
        <section className="card mission-panel neon-border">
          <div className="card-header">
            <h2>Program Area</h2>
            <StatusBadge status={activeClassItem.status} />
          </div>
          <p>{programArea?.title ?? 'Program area placeholder'}</p>
          <p className="muted">{programArea?.description}</p>
        </section>

        <section className="card mission-panel">
          <h2>Bell Ringer</h2>
          <p>{lesson?.bellRinger.prompt ?? 'Bell ringer placeholder for active class item.'}</p>
        </section>

        <section className="card mission-panel">
          <h2>Studio Goal</h2>
          <p>
            {lesson?.learningTarget ??
              mediaProject?.studentTask ??
              broadcastUpdate?.studentInstructions ??
              'Today goal placeholder.'}
          </p>
        </section>

        <section className="card mission-panel">
          <h2>Watch / Review</h2>
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

        <section className="card mission-panel">
          <h2>Video Segment</h2>
          <p>
            {lesson
              ? `${lesson.video.source}: ${lesson.video.start}-${lesson.video.end}`
              : 'Video/resource placeholder for the active item.'}
          </p>
        </section>

        <section className="card mission-panel">
          <h2>Build / Produce</h2>
          <p>
            {lesson?.assignment.title ??
              mediaProject?.title ??
              broadcastUpdate?.title ??
              'Task placeholder'}
          </p>
          {lesson && <Link to={`/assignments/${lesson.assignment.id}`}>Open assignment</Link>}
        </section>

        <section className="card mission-panel">
          <h2>Submit Evidence</h2>
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

        <section className="card mission-panel">
          <h2>Exit Ticket</h2>
          <p>{lesson?.exitTicket ?? 'Exit ticket placeholder for the active item.'}</p>
        </section>
      </div>
    </PageContainer>
  );
}
