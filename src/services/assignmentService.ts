import { limit, where } from 'firebase/firestore';
import type { Assignment } from '../types';
import { getCollectionRecords, getDocumentRecord } from './firestoreService';

export async function getAssignments(): Promise<Assignment[]> {
  return getCollectionRecords<Assignment>('assignments', [limit(250)]);
}

export async function getAssignmentsByProgramArea(programAreaId: string): Promise<Assignment[]> {
  return getCollectionRecords<Assignment>('assignments', [
    where('programAreaId', '==', programAreaId),
    limit(250),
  ]);
}

export async function getAssignmentById(assignmentId: string): Promise<Assignment | null> {
  return getDocumentRecord<Assignment>('assignments', assignmentId);
}

export async function getAssignmentsByLessonId(lessonId: string): Promise<Assignment[]> {
  return getCollectionRecords<Assignment>('assignments', [
    where('lessonId', '==', lessonId),
    limit(50),
  ]);
}
