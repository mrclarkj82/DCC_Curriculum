import type { Quiz } from '../types';
import { getCollectionRecords, getDocumentRecord } from './firestoreService';

export async function getQuizzes(): Promise<Quiz[]> {
  return getCollectionRecords<Quiz>('quizzes');
}

export async function getQuizById(quizId: string): Promise<Quiz | null> {
  return getDocumentRecord<Quiz>('quizzes', quizId);
}
