import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { EvidenceChecklist } from '../components/EvidenceChecklist';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import { RelatedQuizPanel } from '../components/quizzes/RelatedQuizPanel';
import { BellRingerResponseCard } from '../components/responses/BellRingerResponseCard';
import { ExitTicketResponseCard } from '../components/responses/ExitTicketResponseCard';
import { RubricTable } from '../components/RubricTable';
import { StatusBadge } from '../components/StatusBadge';
import { SubmissionPanel } from '../components/submissions/SubmissionPanel';
import { VideoSegmentLinks } from '../components/VideoSegmentLinks';
import { VocabularyList } from '../components/VocabularyList';
import { HiddenFrameIcon } from '../hidden-frame/components/HiddenFrameIcon';
import { useAsyncData } from '../hooks/useAsyncData';
import { usePrimaryClassRecord } from '../hooks/usePrimaryClassRecord';
import { getAssignmentById } from '../services/assignmentService';
import { getLessonById } from '../services/lessonService';
import { getLessonResponseAccess } from '../services/lessonResponseAccessService';
import { getProgramAreaById } from '../services/programAreaService';
import { resolveSubmissionTarget } from '../services/submissionService';
import type { ActiveClassItem, LessonResponseAccess } from '../types';

function formatScheduledDate(value: string): string {
  if (!value) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/Los_Angeles',
  }).format(new Date(`${value}T12:00:00-07:00`));
}

function responseAccessMessage(access: LessonResponseAccess): string {
  if (access.status === 'future') {
    return `Scheduled for ${access.cycleDay ?? ''} day on ${formatScheduledDate(access.scheduledDate)}. The prompt is visible now, but responses unlock on that date.`;
  }

  if (access.status === 'previous') {
    return `Past lesson from ${formatScheduledDate(access.scheduledDate)}. Bell ringer and exit ticket responses remain open.`;
  }

  if (access.status === 'current') {
    return `Current ${access.cycleDay ?? ''}-day lesson. Bell ringer and exit ticket responses are open.`;
  }

  return 'This lesson is not on your assigned A/B schedule, so responses are view-only.';
}

function StaticPromptCard({ title, prompt }: { title: string; prompt: string }) {
  return (
    <section className="card mission-panel">
      <h2>{title}</h2>
      <p>{prompt}</p>
    </section>
  );
}

export function LessonDetailPage() {
  const { lessonId } = useParams();
  const {
    userProfile,
    classRecord,
    isLoading: classLoading,
    error: classError,
  } = usePrimaryClassRecord();
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
  const [responseAccess, setResponseAccess] = useState<LessonResponseAccess | null>(null);
  const [responseAccessLoading, setResponseAccessLoading] = useState(false);
  const [responseAccessError, setResponseAccessError] = useState<string | null>(null);
  const loadedLessonId = data?.lesson?.id ?? '';

  useEffect(() => {
    setResponseAccess(null);
    setResponseAccessError(null);

    if (!loadedLessonId || !classRecord || userProfile?.role !== 'student') {
      setResponseAccessLoading(false);
      return;
    }

    let didCancel = false;
    setResponseAccessLoading(true);

    getLessonResponseAccess(classRecord.id, loadedLessonId)
      .then((access) => {
        if (!didCancel) {
          setResponseAccess(access);
          setResponseAccessLoading(false);
        }
      })
      .catch((nextError: unknown) => {
        if (!didCancel) {
          setResponseAccessError(
            nextError instanceof Error
              ? nextError.message
              : 'Unable to check this lesson response window.',
          );
          setResponseAccessLoading(false);
        }
      });

    return () => {
      didCancel = true;
    };
  }, [classRecord, loadedLessonId, userProfile?.role]);

  const activeItem = useMemo<ActiveClassItem | null>(() => {
    if (!data?.lesson) {
      return null;
    }

    return {
      id: data.lesson.id,
      type: 'lesson',
      programAreaId: data.lesson.programAreaId,
      title: data.lesson.title,
      status: data.lesson.status,
      record: data.lesson,
    };
  }, [data?.lesson]);

  if (isLoading) {
    return <LoadingState label="Loading lesson from Firestore..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!data?.lesson || !activeItem) {
    return (
      <EmptyState
        title="Lesson not found"
        message="Firestore does not have a lesson record for this ID yet. Run the curriculum seed importer or check the lesson link."
      />
    );
  }

  const { lesson, area, assignment } = data;
  const isStudent = userProfile?.role === 'student';
  const showInteractiveResponses = Boolean(isStudent && classRecord && responseAccess);
  const responseLocked = !responseAccess?.canRespond;
  const accessMessage = responseAccess ? responseAccessMessage(responseAccess) : '';
  const submissionTarget = assignment
    ? resolveSubmissionTarget('assignment', assignment)
    : resolveSubmissionTarget('lesson', lesson);
  const evidenceLocked = Boolean(
    isStudent &&
      (!classRecord ||
        classRecord.activeItemType !== 'lesson' ||
        classRecord.activeItemId !== lesson.id),
  );
  const evidenceLockedMessage =
    responseAccess?.status === 'future'
      ? 'Google Drive evidence unlocks when this lesson becomes the current class mission.'
      : 'Google Drive evidence can be edited while this lesson is the current class mission. Ask your teacher to reopen it if you need to revise past work.';

  return (
    <PageContainer
      eyebrow={`${area?.title ?? lesson.programAreaId} / ${lesson.quarter}`}
      title={lesson.title}
      description={lesson.learningTarget}
      actions={<StatusBadge status={lesson.status} />}
      className={lesson.programAreaId === 'video-production' ? 'studio-pink' : 'studio-cyan'}
    >
      <div className="section-stack">
        {classLoading && <LoadingState label="Loading your class access..." />}
        {classError && <ErrorState message={classError} />}
        {responseAccessLoading && <LoadingState label="Checking the lesson schedule..." />}
        {responseAccessError && <ErrorState message={responseAccessError} />}
        {responseAccess && <p className="form-message">{accessMessage}</p>}

        {showInteractiveResponses ? (
          <BellRingerResponseCard
            prompt={lesson.bellRinger.prompt}
            activeItem={activeItem}
            classRecord={classRecord!}
            userProfile={userProfile!}
            locked={responseLocked}
            lockedMessage={accessMessage}
            submitMode="scheduled-lesson"
          />
        ) : (
          <StaticPromptCard title="Bell Ringer" prompt={lesson.bellRinger.prompt} />
        )}

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
            <h2>Video Segment</h2>
            <VideoSegmentLinks video={lesson.video} />
          </section>

          <section className="card mission-panel">
            <h2>Watch / Review</h2>
            {lesson.slides.url ? (
              <a
                className="secondary-button"
                href={lesson.slides.url}
                target="_blank"
                rel="noreferrer"
              >
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

          <section className="card span-two mission-panel">
            <p className="retro-label">Assignment Inside This Lesson</p>
            <h2>{assignment?.title ?? lesson.assignment.title}</h2>
            <p>{assignment?.instructions ?? 'Complete the lesson evidence requirements below.'}</p>
          </section>

          {assignment && (
            <>
              <section className="card mission-panel">
                <h2>Skill Focus</h2>
                <EvidenceChecklist items={assignment.skillFocus} />
              </section>

              <section className="card span-two mission-panel">
                <h2>Required Steps</h2>
                <ol className="ordered-list">
                  {assignment.requiredSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>

              {assignment.resources?.length ? (
                <section className="card span-two mission-panel">
                  <h2>Lesson Resources</h2>
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
                </section>
              ) : null}

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

              {assignment.quizId && (
                <RelatedQuizPanel
                  quizId={assignment.quizId}
                  classRecord={classRecord}
                  userProfile={userProfile}
                  viewerMode="student"
                />
              )}
            </>
          )}
        </div>

        <SubmissionPanel
          classRecord={classRecord}
          activeItemType="lesson"
          activeItemId={lesson.id}
          target={submissionTarget}
          userProfile={userProfile}
          viewerMode="student"
          locked={evidenceLocked}
          lockedMessage={evidenceLockedMessage}
        />

        {showInteractiveResponses ? (
          <ExitTicketResponseCard
            prompt={lesson.exitTicket}
            activeItem={activeItem}
            classRecord={classRecord!}
            userProfile={userProfile!}
            locked={responseLocked}
            lockedMessage={accessMessage}
            submitMode="scheduled-lesson"
          />
        ) : (
          <StaticPromptCard title="Exit Ticket" prompt={lesson.exitTicket} />
        )}

        <section className="card mission-panel">
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
