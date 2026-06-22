import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import { StatusBadge } from '../components/StatusBadge';
import { StudentTodayExperience } from '../components/today/StudentTodayExperience';
import { firestoreErrorMessage } from '../services/firestoreService';
import { canPreviewClass, getPreviewClassContext } from '../services/studentPreviewService';
import type { ActiveItemType, TeacherPreviewContext } from '../types';

const activeItemTypeLabels: Record<ActiveItemType, string> = {
  lesson: 'Lesson',
  assignment: 'Assignment',
  mediaProject: 'Media Project',
  broadcastUpdate: 'Broadcast Update',
  quiz: 'Quiz',
  portfolioCheckpoint: 'Portfolio Checkpoint',
};

export function TeacherStudentPreviewPage() {
  const { classId = '' } = useParams();
  const { userProfile } = useAuth();
  const [previewContext, setPreviewContext] = useState<TeacherPreviewContext | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let didCancel = false;
    setIsLoading(true);
    setError(null);
    setPreviewContext(null);

    if (!classId) {
      setError('Choose a class before opening student preview.');
      setIsLoading(false);
      return undefined;
    }

    getPreviewClassContext(classId)
      .then((context) => {
        if (didCancel) {
          return;
        }

        if (!canPreviewClass(userProfile, context.classRecord)) {
          setError('You can preview only classes assigned to you.');
          setPreviewContext(null);
          setIsLoading(false);
          return;
        }

        setPreviewContext(context);
        setIsLoading(false);
      })
      .catch((contextError: unknown) => {
        if (!didCancel) {
          setError(firestoreErrorMessage(contextError, 'Unable to load student preview.'));
          setIsLoading(false);
        }
      });

    return () => {
      didCancel = true;
    };
  }, [classId, userProfile]);

  if (!userProfile) {
    return <LoadingState label="Checking teacher preview access..." />;
  }

  return (
    <PageContainer
      eyebrow="TEACHER STUDENT PREVIEW MODE"
      title="Student Preview"
      description="View one assigned class exactly as a student would see Today's Mission, without joining the class as a student."
      className="mission-board teacher-preview-page"
    >
      {isLoading && <LoadingState label="Loading student preview..." />}
      {error && <ErrorState message={error} />}

      {previewContext && (
        <>
          <section className="card mission-panel neon-border teacher-preview-banner">
            <div className="section-heading-row">
              <div>
                <p className="retro-label">TEACHER STUDENT PREVIEW MODE</p>
                <h2>Preview activity does not count as real student work.</h2>
              </div>
              <StatusBadge status="preview" />
            </div>
            <p>
              You are viewing this class as a student would see it. This is not real student
              impersonation, and preview responses are saved separately from student completion
              data.
            </p>
            <dl className="detail-list response-summary-list">
              <div>
                <dt>Class</dt>
                <dd>
                  {previewContext.classRecord.name} / {previewContext.classRecord.period}
                </dd>
              </div>
              <div>
                <dt>Active Item</dt>
                <dd>{previewContext.activeItem.title ?? previewContext.activeItem.id}</dd>
              </div>
              <div>
                <dt>Active Type</dt>
                <dd>{activeItemTypeLabels[previewContext.classRecord.activeItemType]}</dd>
              </div>
              <div>
                <dt>Program Area</dt>
                <dd>
                  {previewContext.programArea?.title ??
                    previewContext.classRecord.activeProgramAreaId}
                </dd>
              </div>
            </dl>
            <div className="button-row">
              <Link className="secondary-button" to="/teacher">
                Back To Teacher Dashboard
              </Link>
              <Link className="outline-button" to="/today">
                Open Real Today Page
              </Link>
            </div>
          </section>

          <StudentTodayExperience
            classRecord={previewContext.classRecord}
            activeItem={previewContext.activeItem}
            programArea={previewContext.programArea}
            userProfile={userProfile}
            viewerMode="teacher-preview"
          />
        </>
      )}
    </PageContainer>
  );
}
