import { ErrorState } from '../ErrorState';
import { LoadingState } from '../LoadingState';
import { useAsyncData } from '../../hooks/useAsyncData';
import { getQuizById } from '../../services/quizService';
import type { ClassRecord, ResourceLink, UserProfile, ViewerMode } from '../../types';
import { QuizTakingPanel } from './QuizTakingPanel';

interface RelatedQuizPanelProps {
  quizId?: string;
  lessonId?: string;
  classRecord: ClassRecord | null;
  resources?: ResourceLink[];
  userProfile: UserProfile | null;
  viewerMode: ViewerMode;
}

export function RelatedQuizPanel({
  quizId,
  lessonId,
  classRecord,
  resources,
  userProfile,
  viewerMode,
}: RelatedQuizPanelProps) {
  const {
    data: quiz,
    isLoading,
    error,
  } = useAsyncData(
    () => (quizId ? getQuizById(quizId) : Promise.resolve(null)),
    [quizId],
    'Unable to load the linked quiz from Firestore.',
  );

  if (!quizId) {
    return null;
  }

  if (isLoading) {
    return <LoadingState label="Loading linked quiz..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!quiz) {
    return (
      <section className="card mission-panel neon-border span-two">
        <p className="retro-label">Linked Quiz</p>
        <h2>Quiz not found</h2>
        <p className="muted">Ask your teacher to confirm the quiz link for this assignment.</p>
      </section>
    );
  }

  if (!classRecord || !userProfile) {
    return (
      <section className="card mission-panel neon-border span-two">
        <p className="retro-label">Linked Quiz</p>
        <h2>{quiz.title}</h2>
        <p className="muted">Join your class to take this quiz and save a score.</p>
      </section>
    );
  }

  return (
    <QuizTakingPanel
      quiz={quiz}
      lessonId={lessonId}
      classRecord={classRecord}
      resources={resources}
      userProfile={userProfile}
      viewerMode={viewerMode}
    />
  );
}
