import { where } from 'firebase/firestore';
import type { Assignment } from '../types';
import { getCollectionRecords, getDocumentRecord } from './firestoreService';

export async function getAssignments(): Promise<Assignment[]> {
  return getCollectionRecords<Assignment>('assignments');
}

export async function getAssignmentById(assignmentId: string): Promise<Assignment | null> {
  return getDocumentRecord<Assignment>('assignments', assignmentId);
}

export async function getAssignmentsByLessonId(lessonId: string): Promise<Assignment[]> {
  return getCollectionRecords<Assignment>('assignments', [where('lessonId', '==', lessonId)]);
}
