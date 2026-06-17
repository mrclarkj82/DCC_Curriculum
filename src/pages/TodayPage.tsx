import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { EvidenceChecklist } from '../components/EvidenceChecklist';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import { StatusBadge } from '../components/StatusBadge';
import {
  activeClassItem,
  getAssignment,
  getBroadcastUpdate,
  getLesson,
  getMediaProject,
  getProgramArea,
  getQuiz,
} from '../data/seedData';
import { subscribeToClass } from '../services/classService';
import type { ClassRecord } from '../types';

export function TodayPage() {
  const { classIds } = useAuth();
  const [assignedClass, setAssignedClass] = useState<ClassRecord | null>(null);
  const [classLoading, setClassLoading] = useState(false);
  const [classError, setClassError] = useState<string | null>(null);

  useEffect(() => {
    if (!classIds.length) {
      setAssignedClass(null);
      setClassLoading(false);
      setClassError(null);
      return undefined;
    }

    setClassLoading(true);
    setClassError(null);

    return subscribeToClass(
      classIds[0],
      (classRecord) => {
        setAssignedClass(classRecord);
        setClassLoading(false);
      },
      (error) => {
        setClassError(
          error.message || 'Unable to load your class record. Please try again later.',
        );
        setAssignedClass(null);
        setClassLoading(false);
      },
    );
  }, [classIds]);

  const currentItem = assignedClass
    ? {
        id: assignedClass.activeItemId,
        type: assignedClass.activeItemType,
        programAreaId: assignedClass.activeProgramAreaId,
        status: 'active',
      }
    : activeClassItem;

  const lesson = currentItem.type === 'lesson' ? getLesson(currentItem.id) : undefined;
  const assignment =
    currentItem.type === 'assignment'
      ? getAssignment(currentItem.id)
      : lesson
        ? getAssignment(lesson.assignment.id)
        : undefined;
  const mediaProject =
    currentItem.type === 'mediaProject' ? getMediaProject(currentItem.id) : undefined;
  const broadcastUpdate =
    currentItem.type === 'broadcastUpdate' ? getBroadcastUpdate(currentItem.id) : undefined;
  const quiz = currentItem.type === 'quiz' ? getQuiz(currentItem.id) : undefined;
  const programArea = getProgramArea(currentItem.programAreaId);

  return (
    <PageContainer
      eyebrow="Daily Mission Board"
      title="Today's Mission"
      description="A clear classroom workflow for the active class item, whether it is an Unreal lesson, a Video Production project, or a Broadcast Desk Update."
      className="mission-board"
    >
      {!classIds.length && (
        <section className="card mission-panel neon-border no-class-panel">
          <p className="retro-label">No Class Assigned Yet</p>
          <h2>No class assigned yet</h2>
          <p>
            Your account is signed in, but a teacher or admin still needs to assign you to a class
            before the daily class item can load.
          </p>
          <Link className="outline-button" to="/areas">
            Open Program Areas
          </Link>
        </section>
      )}

      {classLoading && <LoadingState label="Loading your assigned class..." />}
      {classError && <ErrorState message={classError} />}

      <div className="today-grid">
        <section className="card mission-panel neon-border">
          <div className="card-header">
            <h2>Program Area</h2>
            <StatusBadge status={currentItem.status ?? 'active'} />
          </div>
          <p>{programArea?.title ?? 'Program area placeholder'}</p>
          <p className="muted">{programArea?.description}</p>
          {assignedClass && (
            <dl className="detail-list">
              <div>
                <dt>Class</dt>
                <dd>
                  {assignedClass.name} / {assignedClass.period}
                </dd>
              </div>
              <div>
                <dt>Active Program Area ID</dt>
                <dd>{assignedClass.activeProgramAreaId}</dd>
              </div>
              <div>
                <dt>Active Item Type</dt>
                <dd>{assignedClass.activeItemType}</dd>
              </div>
              <div>
                <dt>Active Item ID</dt>
                <dd>{assignedClass.activeItemId}</dd>
              </div>
            </dl>
          )}
        </section>

        <section className="card mission-panel">
          <h2>Bell Ringer</h2>
          <p>{lesson?.bellRinger.prompt ?? 'Bell ringer placeholder for active class item.'}</p>
        </section>

        <section className="card mission-panel">
          <h2>Studio Goal</h2>
          <p>
            {lesson?.learningTarget ??
              assignment?.instructions ??
              mediaProject?.studentTask ??
              broadcastUpdate?.studentInstructions ??
              quiz?.title ??
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
              : 'Video/resource placeholder for the active item when available.'}
          </p>
        </section>

        <section className="card mission-panel">
          <h2>Build / Produce</h2>
          <p>
            {lesson?.assignment.title ??
              assignment?.title ??
              mediaProject?.title ??
              broadcastUpdate?.title ??
              quiz?.title ??
              'Task placeholder'}
          </p>
          {lesson && <Link to={`/assignments/${lesson.assignment.id}`}>Open assignment</Link>}
          {assignment && currentItem.type === 'assignment' && (
            <Link to={`/assignments/${assignment.id}`}>Open assignment</Link>
          )}
        </section>

        <section className="card mission-panel">
          <h2>Submit Evidence</h2>
          <EvidenceChecklist
            items={
              assignment?.evidenceRequired ??
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
