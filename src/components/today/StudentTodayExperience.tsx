import { Link } from 'react-router-dom';
import { AssignmentGameEntryCard } from '../assignmentGame/AssignmentGameEntryCard';
import { EmptyState } from '../EmptyState';
import { EvidenceChecklist } from '../EvidenceChecklist';
import { QuizTakingPanel } from '../quizzes/QuizTakingPanel';
import { BellRingerResponseCard } from '../responses/BellRingerResponseCard';
import { ExitTicketResponseCard } from '../responses/ExitTicketResponseCard';
import { SubmissionPanel } from '../submissions/SubmissionPanel';
import { RubricTable } from '../RubricTable';
import { StatusBadge } from '../StatusBadge';
import { VocabularyList } from '../VocabularyList';
import { getBellRingerPrompt, getExitTicketPrompt } from '../../services/responseService';
import { resolveSubmissionTargetForActiveItem } from '../../services/submissionService';
import type {
  ActiveClassItem,
  Assignment,
  BroadcastUpdate,
  ClassRecord,
  Lesson,
  MediaProject,
  ProgramArea,
  Quiz,
  UserProfile,
  ViewerMode,
} from '../../types';
import { isTeacherPreviewMode } from '../../types';

interface StudentTodayExperienceProps {
  classRecord: ClassRecord;
  activeItem: ActiveClassItem;
  programArea: ProgramArea | null;
  userProfile: UserProfile;
  viewerMode: ViewerMode;
}

function LessonMission({
  lesson,
  programArea,
}: {
  lesson: Lesson;
  programArea: ProgramArea | null;
}) {
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

function QuizMission({
  quiz,
  classRecord,
  userProfile,
  viewerMode,
}: {
  quiz: Quiz | null;
  classRecord: ClassRecord;
  userProfile: UserProfile;
  viewerMode: ViewerMode;
}) {
  if (quiz) {
    return (
      <QuizTakingPanel
        quiz={quiz}
        classRecord={classRecord}
        userProfile={userProfile}
        viewerMode={viewerMode}
      />
    );
  }

  return (
    <section className="card mission-panel neon-border span-two">
      <p className="retro-label">Quiz</p>
      <h2>Quiz record not found</h2>
      <p className="muted">
        This class points to a quiz that is not available in Firestore yet. Ask your teacher to
        confirm the active quiz item.
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

export function StudentTodayExperience({
  classRecord,
  activeItem,
  programArea,
  userProfile,
  viewerMode,
}: StudentTodayExperienceProps) {
  const record = activeItem.record;
  const isQuizOrPortfolio = activeItem.type === 'quiz' || activeItem.type === 'portfolioCheckpoint';
  const showResponseCards =
    !isQuizOrPortfolio && (userProfile.role === 'student' || isTeacherPreviewMode(viewerMode));
  const submissionTarget = resolveSubmissionTargetForActiveItem(activeItem);
  const isMissingActiveRecord = activeItem.type !== 'portfolioCheckpoint' && !record;

  return (
    <>
      <section className="card mission-panel neon-border">
        <div className="card-header">
          <div>
            <p className="retro-label">Class</p>
            <h2>
              {classRecord.name} / {classRecord.period}
            </h2>
          </div>
          <StatusBadge status={activeItem.status ?? 'active'} />
        </div>
        <dl className="detail-list">
          <div>
            <dt>Program Area</dt>
            <dd>{programArea?.title ?? classRecord.activeProgramAreaId}</dd>
          </div>
          <div>
            <dt>Active Item Type</dt>
            <dd>{classRecord.activeItemType}</dd>
          </div>
          <div>
            <dt>Active Item ID</dt>
            <dd>{classRecord.activeItemId}</dd>
          </div>
        </dl>
      </section>

      {isMissingActiveRecord && (
        <EmptyState
          title="Active item not found"
          message="The class record points to an active item that is not in Firestore yet. Seed curriculum content or update the class active item."
        />
      )}

      {showResponseCards && (
        <div className="today-grid response-grid">
          <BellRingerResponseCard
            prompt={getBellRingerPrompt(activeItem)}
            activeItem={activeItem}
            classRecord={classRecord}
            userProfile={userProfile}
            viewerMode={viewerMode}
          />
          <ExitTicketResponseCard
            prompt={getExitTicketPrompt(activeItem)}
            activeItem={activeItem}
            classRecord={classRecord}
            userProfile={userProfile}
            viewerMode={viewerMode}
          />
        </div>
      )}

      {showResponseCards && (
        <SubmissionPanel
          classRecord={classRecord}
          activeItemType={activeItem.type}
          activeItemId={activeItem.id}
          target={submissionTarget}
          userProfile={userProfile}
          viewerMode={viewerMode}
        />
      )}

      {viewerMode === 'student' && showResponseCards && (
        <AssignmentGameEntryCard
          classRecord={classRecord}
          activeItem={activeItem}
          target={submissionTarget}
          userProfile={userProfile}
        />
      )}

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
        {activeItem.type === 'quiz' && (
          <QuizMission
            quiz={(record as Quiz | null) ?? null}
            classRecord={classRecord}
            userProfile={userProfile}
            viewerMode={viewerMode}
          />
        )}
        {activeItem.type === 'portfolioCheckpoint' && <PortfolioMission />}
      </div>
    </>
  );
}
