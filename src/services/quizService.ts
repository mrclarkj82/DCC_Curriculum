import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
  type Unsubscribe,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { dccCollectionPath, dccDocumentPath } from '../config/firestoreNamespace';
import { cloudFunctions, db } from '../firebase/client';
import type { Quiz, QuizAttempt, QuizAttemptAnswerInput } from '../types';
import { getCollectionRecords, getDocumentRecord } from './firestoreService';

interface SubmitQuizAttemptPayload {
  classId: string;
  quizId: string;
  answers: QuizAttemptAnswerInput[];
}

interface SubmitQuizAttemptResult {
  attempt: QuizAttempt;
  alreadySubmitted: boolean;
}

const submitQuizAttemptCallable = httpsCallable<
  SubmitQuizAttemptPayload,
  SubmitQuizAttemptResult
>(cloudFunctions, 'submitQuizAttempt');

export async function getQuizzes(): Promise<Quiz[]> {
  return getCollectionRecords<Quiz>('quizzes');
}

export async function getQuizById(quizId: string): Promise<Quiz | null> {
  return getDocumentRecord<Quiz>('quizzes', quizId);
}

export function makeQuizAttemptId(classId: string, quizId: string, uid: string): string {
  const safePart = (value: string) =>
    value
      .trim()
      .replace(/[^A-Za-z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

  return [classId, quizId, uid].map(safePart).join('_');
}

function quizAttemptFromData(id: string, data: Record<string, unknown>): QuizAttempt {
  return {
    id: String(data.id ?? id),
    uid: String(data.uid ?? ''),
    studentName: String(data.studentName ?? ''),
    studentEmail: String(data.studentEmail ?? ''),
    classId: String(data.classId ?? ''),
    programAreaId: String(data.programAreaId ?? ''),
    quizId: String(data.quizId ?? ''),
    quizTitle: String(data.quizTitle ?? ''),
    questionCount: Number(data.questionCount ?? 0),
    answeredCount: Number(data.answeredCount ?? 0),
    score: Number(data.score ?? 0),
    percentage: Number(data.percentage ?? 0),
    status: 'submitted',
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    submittedAt: data.submittedAt,
  };
}

export function subscribeToQuizAttempt(
  classId: string,
  quizId: string,
  uid: string,
  onAttempt: (attempt: QuizAttempt | null) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  const attemptId = makeQuizAttemptId(classId, quizId, uid);

  return onSnapshot(
    doc(db, dccDocumentPath('quizAttempts', attemptId)),
    (snapshot) => {
      onAttempt(snapshot.exists() ? quizAttemptFromData(snapshot.id, snapshot.data()) : null);
    },
    onError,
  );
}

export async function submitQuizAttempt(
  payload: SubmitQuizAttemptPayload,
): Promise<SubmitQuizAttemptResult> {
  try {
    const result = await submitQuizAttemptCallable(payload);
    return result.data;
  } catch (error) {
    if (error instanceof Error && error.message) {
      throw new Error(error.message);
    }

    throw new Error('Unable to submit quiz. Please try again or ask your teacher.');
  }
}

export async function getQuizAttemptsForClassQuiz(
  classId: string,
  quizId: string,
): Promise<QuizAttempt[]> {
  const snapshot = await getDocs(
    query(
      collection(db, dccCollectionPath('quizAttempts')),
      where('classId', '==', classId),
      where('quizId', '==', quizId),
    ),
  );

  return snapshot.docs.map((documentSnapshot) =>
    quizAttemptFromData(documentSnapshot.id, documentSnapshot.data()),
  );
}

export function subscribeToQuizAttemptsForClassQuiz(
  classId: string,
  quizId: string,
  onAttempts: (attempts: QuizAttempt[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    query(
      collection(db, dccCollectionPath('quizAttempts')),
      where('classId', '==', classId),
      where('quizId', '==', quizId),
    ),
    (snapshot) => {
      onAttempts(
        snapshot.docs.map((documentSnapshot) =>
          quizAttemptFromData(documentSnapshot.id, documentSnapshot.data()),
        ),
      );
    },
    onError,
  );
}
