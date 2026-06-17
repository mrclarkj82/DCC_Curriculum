import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { EvidenceChecklist } from '../components/EvidenceChecklist';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import { RubricTable } from '../components/RubricTable';
import { StatusBadge } from '../components/StatusBadge';
import { VocabularyList } from '../components/VocabularyList';
import { getActiveItem } from '../services/activeItemService';
import { subscribeToClass } from '../services/classService';
import { firestoreErrorMessage } from '../services/firestoreService';
import { getProgramAreaById } from '../services/programAreaService';
import type {
  ActiveClassItem,
  Assignment,
  BroadcastUpdate,
  ClassRecord,
  Lesson,
  MediaProject,
  ProgramArea,
  Quiz,
} from '../types';

function LessonMission({ lesson, programArea }: { lesson: Lesson; programArea: ProgramArea | null }) {
  return (
    <>
      <section className="card mission-panel neon-border span-two">
        <p className="retro-label">Today's Mission</p>
        <h2>{lesson.title}</h2>
        <p>{lesson.learningTarget}</p>
      </section>

      <section className="card mission-panel">
        <h2>Program Area</h2>
        <p>{programArea?.title ?? lesson.programAreaId}</p>
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
            Open Slides
          </a>
        ) : (
          <p className="muted">Slides are not linked yet. Use the teacher's in-class direction.</p>
        )}
        <Link to={`/lessons/${lesson.id}`}>Open full lesson</Link>
      </section>

      <section className="card mission-panel span-two">
        <h2>Vocabulary</h2>
        <VocabularyList terms={lesson.vocabulary} />
      </section>

      <section className="card mission-panel">
        <h2>Assignment Summary</h2>
        <p>{lesson.assignment.title}</p>
        <Link to={`/assignments/${lesson.assignment.id}`}>Open assignment</Link>
      </section>

      <section className="card mission-panel">
        <h2>Submission Evidence Placeholder</h2>
        <EvidenceChecklist items={lesson.assignment.evidenceRequired} />
      </section>

      <section className="card mission-panel">
        <h2>Exit Ticket</h2>
        <p>{lesson.exitTicket}</p>
      </section>

      <section className="card mission-panel">
        <h2>Help / Common Problems</h2>
        <p className="muted">
          If you get stuck, ask for help by naming the exact panel, tool, shortcut, setting, or
          evidence step that is blocking you.
        </p>
      </section>
    </>
  );
}

function AssignmentMission({
  assignment,
  programArea,
}: {
  assignment: Assignment;
  programArea: ProgramArea | null;
}) {
  return (
    <>
      <section className="card mission-panel neon-border span-two">
        <p className="retro-label">Assignment</p>
        <h2>{assignment.title}</h2>
        <p>{assignment.instructions}</p>
      </section>

      <section className="card mission-panel">
        <h2>Program Area</h2>
        <p>{programArea?.title ?? assignment.programAreaId}</p>
      </section>

      <section className="card mission-panel">
        <h2>Skill Focus</h2>
        <EvidenceChecklist items={assignment.skillFocus} />
      </section>

      <section className="card mission-panel span-two">
        <h2>Required Steps</h2>
        <ol className="ordered-list">
          {assignment.requiredSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="card mission-panel">
        <h2>Evidence Required</h2>
        <EvidenceChecklist items={assignment.evidenceRequired} />
      </section>

      <section className="card mission-panel">
        <h2>Reflection Prompt</h2>
        <p>{assignment.reflectionPrompt}</p>
      </section>

      <section className="card mission-panel span-two">
        <h2>Rubric Summary</h2>
        <RubricTable rubric={assignment.rubric} />
      </section>
    </>
  );
}

function MediaProjectMission({
  project,
  programArea,
}: {
  project: MediaProject;
  programArea: ProgramArea | null;
}) {
  return (
    <>
      <section className="card mission-panel neon-border span-two">
        <p className="retro-label">Video Production Project</p>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </section>

      <section className="card mission-panel">
        <h2>Program Area</h2>
        <p>{programArea?.title ?? project.programAreaId}</p>
      </section>

      <section className="card mission-panel">
        <h2>Production Goal</h2>
        <p>{project.projectType}</p>
      </section>

      <section className="card mission-panel span-two">
        <h2>Student Task</h2>
        <p>{project.studentTask}</p>
      </section>

      <section className="card mission-panel">
        <h2>Skill Focus</h2>
        <EvidenceChecklist items={project.skillFocus} />
      </section>

      <section className="card mission-panel">
        <h2>Submission Types</h2>
        <EvidenceChecklist items={project.submissionTypes} />
      </section>

      <section className="card mission-panel">
        <h2>Evidence Required</h2>
        <EvidenceChecklist items={project.evidenceRequired} />
      </section>

      <section className="card mission-panel">
        <h2>Reflection Prompt</h2>
        <p>{project.reflectionPrompt}</p>
      </section>

      <section className="card mission-panel span-two">
        <h2>Rubric Summary</h2>
        <RubricTable rubric={project.rubric} />
      </section>
    </>
  );
}

function BroadcastUpdateMission({
  update,
  programArea,
}: {
  update: BroadcastUpdate;
  programArea: ProgramArea | null;
}) {
  return (
    <>
      <section className="card mission-panel neon-border span-two">
        <p className="retro-label">Broadcast Desk Update</p>
        <h2>{update.title}</h2>
        <p>{update.summary}</p>
      </section>

      <section className="card mission-panel">
        <h2>Program Area</h2>
        <p>{programArea?.title ?? update.programAreaId}</p>
      </section>

      <section className="card mission-panel">
        <h2>Dates</h2>
        <dl className="detail-list">
          <div>
            <dt>Publish Date</dt>
            <dd>{update.publishDate || 'Not set yet'}</dd>
          </div>
          <div>
            <dt>Due Date</dt>
            <dd>{update.dueDate || 'Not set yet'}</dd>
          </div>
        </dl>
      </section>

      <section className="card mission-panel span-two">
        <h2>Student Instructions</h2>
        <p>{update.studentInstructions}</p>
      </section>

      <section className="card mission-panel">
        <h2>Related Project IDs</h2>
        <EvidenceChecklist items={update.relatedProjectIds} />
      </section>

      <section className="card mission-panel">
        <h2>Submission Requirements</h2>
        <EvidenceChecklist items={update.submissionRequirements} />
      </section>
    </>
  );
}

function QuizMission({ quiz }: { quiz: Quiz | null }) {
  return (
    <section className="card mission-panel neon-border span-two">
      <p className="retro-label">Quiz Placeholder</p>
      <h2>{quiz?.title ?? 'Quiz support is coming in a later phase.'}</h2>
      <p className="muted">
        Quiz support is coming in a later phase. For now, your teacher will give quiz directions
        outside this page.
      </p>
    </section>
  );
}

function PortfolioMission() {
  return (
    <section className="card mission-panel neon-border span-two">
      <p className="retro-label">Portfolio Placeholder</p>
      <h2>Portfolio checkpoints are coming in a later phase.</h2>
      <p className="muted">
        Your teacher will give portfolio checkpoint instructions outside this page until that
        workflow is built.
      </p>
    </section>
  );
}

export function TodayPage() {
  const { classIds, loading: authLoading, userProfile } = useAuth();
  const [assignedClass, setAssignedClass] = useState<ClassRecord | null>(null);
  const [classLoading, setClassLoading] = useState(false);
  const [classError, setClassError] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<ActiveClassItem | null>(null);
  const [programArea, setProgramArea] = useState<ProgramArea | null>(null);
  const [activeItemLoading, setActiveItemLoading] = useState(false);
  const [activeItemError, setActiveItemError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!assignedClass) {
      setActiveItem(null);
      setProgramArea(null);
      setActiveItemLoading(false);
      setActiveItemError(null);
      return;
    }

    let didCancel = false;
    setActiveItemLoading(true);
    setActiveItemError(null);

    Promise.all([
      getActiveItem(
        assignedClass.activeItemType,
        assignedClass.activeItemId,
        assignedClass.activeProgramAreaId,
      ),
      getProgramAreaById(assignedClass.activeProgramAreaId),
    ])
      .then(([nextActiveItem, nextProgramArea]) => {
        if (!didCancel) {
          setActiveItem(nextActiveItem);
          setProgramArea(nextProgramArea);
          setActiveItemLoading(false);
        }
      })
      .catch((error: unknown) => {
        if (!didCancel) {
          setActiveItem(null);
          setProgramArea(null);
          setActiveItemError(
            firestoreErrorMessage(error, 'Unable to load today\'s active class item.'),
          );
          setActiveItemLoading(false);
        }
      });

    return () => {
      didCancel = true;
    };
  }, [assignedClass]);

  if (authLoading) {
    return <LoadingState label="Loading your secure studio profile..." />;
  }

  if (!userProfile) {
    return (
      <PageContainer
        eyebrow="Profile Setup"
        title="Profile is still being prepared"
        description="Your Google sign-in worked, but the class portal still needs a user profile record before Today's Mission can load."
        className="mission-board"
      >
        <section className="card mission-panel neon-border">
          <p className="muted">Refresh in a moment, or ask your teacher to check your profile.</p>
        </section>
      </PageContainer>
    );
  }

  if (!classIds.length) {
    return (
      <PageContainer
        eyebrow="Daily Mission Board"
        title="No class assigned yet"
        description="Your teacher or admin needs to assign your account to a class before Today's Mission can load."
        className="mission-board"
      >
        <section className="card mission-panel neon-border no-class-panel">
          <p className="retro-label">No Class Assigned Yet</p>
          <h2>Today's Mission is waiting for a class assignment</h2>
          <p>
            Your teacher or admin needs to assign your account to a class before Today's Mission
            can load.
          </p>
          <Link className="outline-button" to="/areas">
            Open Program Areas
          </Link>
        </section>
      </PageContainer>
    );
  }

  const record = activeItem?.record;
  const isMissingActiveRecord =
    activeItem &&
    activeItem.type !== 'portfolioCheckpoint' &&
    activeItem.type !== 'quiz' &&
    !record;

  return (
    <PageContainer
      eyebrow="Daily Mission Board"
      title="Today's Mission"
      description="The active class item is loaded from your Firestore class record."
      className="mission-board"
    >
      {classLoading && <LoadingState label="Loading your assigned class..." />}
      {classError && <ErrorState message={classError} />}
      {activeItemLoading && <LoadingState label="Resolving the active class item..." />}
      {activeItemError && <ErrorState message={activeItemError} />}

      {assignedClass && (
        <section className="card mission-panel neon-border">
          <div className="card-header">
            <div>
              <p className="retro-label">Class</p>
              <h2>
                {assignedClass.name} / {assignedClass.period}
              </h2>
            </div>
            <StatusBadge status={activeItem?.status ?? 'active'} />
          </div>
          <dl className="detail-list">
            <div>
              <dt>Program Area</dt>
              <dd>{programArea?.title ?? assignedClass.activeProgramAreaId}</dd>
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
        </section>
      )}

      {isMissingActiveRecord && (
        <EmptyState
          title="Active item not found"
          message="The class record points to an active item that is not in Firestore yet. Seed curriculum content or update the class active item."
        />
      )}

      {activeItem && (
        <div className="today-grid">
          {activeItem.type === 'lesson' && record && (
            <LessonMission lesson={record as Lesson} programArea={programArea} />
          )}
          {activeItem.type === 'assignment' && record && (
            <AssignmentMission assignment={record as Assignment} programArea={programArea} />
          )}
          {activeItem.type === 'mediaProject' && record && (
            <MediaProjectMission project={record as MediaProject} programArea={programArea} />
          )}
          {activeItem.type === 'broadcastUpdate' && record && (
            <BroadcastUpdateMission update={record as BroadcastUpdate} programArea={programArea} />
          )}
          {activeItem.type === 'quiz' && <QuizMission quiz={(record as Quiz | null) ?? null} />}
          {activeItem.type === 'portfolioCheckpoint' && <PortfolioMission />}
        </div>
      )}
    </PageContainer>
  );
}
