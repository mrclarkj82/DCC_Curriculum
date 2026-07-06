import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ErrorState } from '../ErrorState';
import { LoadingState } from '../LoadingState';
import { StatusBadge } from '../StatusBadge';
import {
  submitQuizAttempt,
  subscribeToQuizAttempt,
} from '../../services/quizService';
import type {
  ClassRecord,
  Quiz,
  QuizAttempt,
  QuizAttemptAnswerInput,
  UserProfile,
  ViewerMode,
} from '../../types';
import { isTeacherPreviewMode } from '../../types';

interface QuizTakingPanelProps {
  quiz: Quiz;
  classRecord: ClassRecord;
  userProfile: UserProfile;
  viewerMode: ViewerMode;
}

function formatTimestamp(value: unknown): string {
  if (!value) {
    return 'Not submitted';
  }

  if (typeof value === 'string') {
    return value || 'Submitted';
  }

  if (typeof value === 'number') {
    return new Date(value).toLocaleString();
  }

  const timestamp = value as { seconds?: number; toDate?: () => Date };

  if (typeof timestamp.toDate === 'function') {
    return timestamp.toDate().toLocaleString();
  }

  if (typeof timestamp.seconds === 'number') {
    return new Date(timestamp.seconds * 1000).toLocaleString();
  }

  return 'Submitted';
}

function scoreLabel(attempt: QuizAttempt): string {
  return `${attempt.score}/${attempt.questionCount} (${Math.round(attempt.percentage)}%)`;
}

export function QuizTakingPanel({
  quiz,
  classRecord,
  userProfile,
  viewerMode,
}: QuizTakingPanelProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [attemptLoading, setAttemptLoading] = useState(false);
  const [attemptError, setAttemptError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isPreview = isTeacherPreviewMode(viewerMode);
  const isStudent = userProfile.role === 'student';
  const answeredCount = useMemo(
    () => quiz.questions.filter((question) => answers[question.id]?.trim()).length,
    [answers, quiz.questions],
  );
  const canSubmit =
    isStudent && !isPreview && quiz.isPublished && !attempt && answeredCount === quiz.questions.length;

  useEffect(() => {
    if (!isStudent || isPreview) {
      setAttempt(null);
      setAttemptLoading(false);
      setAttemptError(null);
      return undefined;
    }

    setAttemptLoading(true);
    setAttemptError(null);

    return subscribeToQuizAttempt(
      classRecord.id,
      quiz.id,
      userProfile.uid,
      (nextAttempt) => {
        setAttempt(nextAttempt);
        setAttemptLoading(false);
      },
      (error) => {
        setAttemptError(error.message || 'Unable to load your quiz score.');
        setAttemptLoading(false);
      },
    );
  }, [classRecord.id, isPreview, isStudent, quiz.id, userProfile.uid]);

  const handleAnswerChange = (questionId: string, selectedAnswer: string) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    if (!isStudent || isPreview) {
      setSubmitError('Teacher preview mode cannot submit real quiz attempts.');
      return;
    }

    if (!quiz.isPublished) {
      setSubmitError('This quiz is not published yet.');
      return;
    }

    if (attempt) {
      setSubmitError('Your quiz score is already submitted.');
      return;
    }

    if (answeredCount !== quiz.questions.length) {
      setSubmitError('Answer every question before submitting the quiz.');
      return;
    }

    const payloadAnswers: QuizAttemptAnswerInput[] = quiz.questions.map((question) => ({
      questionId: question.id,
      selectedAnswer: answers[question.id],
    }));

    setIsSubmitting(true);

    try {
      const result = await submitQuizAttempt({
        classId: classRecord.id,
        quizId: quiz.id,
        answers: payloadAnswers,
      });
      setAttempt(result.attempt);
      setAnswers({});
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit quiz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="card mission-panel neon-border span-two quiz-panel">
      <div className="section-heading-row">
        <div>
          <p className="retro-label">Self-Grading Quiz</p>
          <h2>{quiz.title}</h2>
        </div>
        <StatusBadge status={attempt ? 'submitted' : quiz.isPublished ? 'open' : 'not published'} />
      </div>

      <dl className="detail-list quiz-summary-list">
        <div>
          <dt>Questions</dt>
          <dd>{quiz.questions.length}</dd>
        </div>
        <div>
          <dt>Answered</dt>
          <dd>
            {attempt ? `${attempt.answeredCount}/${attempt.questionCount}` : `${answeredCount}/${quiz.questions.length}`}
          </dd>
        </div>
        <div>
          <dt>Score Visibility</dt>
          <dd>Students see scores only</dd>
        </div>
      </dl>

      {attemptLoading && <LoadingState label="Checking for an existing quiz score..." />}
      {attemptError && <ErrorState message={attemptError} />}
      {submitError && <ErrorState message={submitError} />}

      {attempt && (
        <div className="quiz-score-card">
          <p className="retro-label">Your Score</p>
          <h3>{scoreLabel(attempt)}</h3>
          <p className="muted">
            Submitted {formatTimestamp(attempt.submittedAt)}. Answer keys stay hidden after
            submission.
          </p>
        </div>
      )}

      {!quiz.isPublished && (
        <p className="muted">
          This quiz is present in Firestore, but it is not published for student attempts yet.
        </p>
      )}

      {isPreview && (
        <p className="muted">
          Teacher Student Preview Mode shows the quiz layout only. Preview mode cannot create a real
          score.
        </p>
      )}

      {!attempt && quiz.isPublished && (
        <form className="quiz-form" onSubmit={handleSubmit}>
          {quiz.questions.map((question, index) => (
            <fieldset className="quiz-question-card" key={question.id}>
              <legend>
                <span className="retro-label">Question {index + 1}</span>
                {question.text}
              </legend>

              {question.choices?.length ? (
                <div className="quiz-choice-list">
                  {question.choices.map((choice) => {
                    const inputId = `${question.id}-${choice.replace(/[^A-Za-z0-9]+/g, '-')}`;

                    return (
                      <label className="quiz-choice" htmlFor={inputId} key={choice}>
                        <input
                          id={inputId}
                          type="radio"
                          name={question.id}
                          value={choice}
                          checked={answers[question.id] === choice}
                          disabled={isSubmitting || isPreview || !isStudent}
                          onChange={(event) =>
                            handleAnswerChange(question.id, event.currentTarget.value)
                          }
                        />
                        <span>{choice}</span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <label className="quiz-text-answer">
                  Answer
                  <input
                    value={answers[question.id] ?? ''}
                    disabled={isSubmitting || isPreview || !isStudent}
                    onChange={(event) => handleAnswerChange(question.id, event.target.value)}
                  />
                </label>
              )}
            </fieldset>
          ))}

          <button className="gradient-button" type="submit" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? 'Grading...' : 'Submit Quiz'}
          </button>
          {!canSubmit && !attempt && isStudent && !isPreview && (
            <p className="muted">Answer every question to unlock submit.</p>
          )}
        </form>
      )}
    </section>
  );
}
