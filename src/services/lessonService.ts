import { where } from 'firebase/firestore';
import type { Lesson } from '../types';
import { getCollectionRecords, getDocumentRecord } from './firestoreService';

const sortLessons = (lessons: Lesson[]) =>
  [...lessons].sort((a, b) => {
    if (a.quarter !== b.quarter) {
      return a.quarter.localeCompare(b.quarter);
    }

    return a.lessonNumber - b.lessonNumber;
  });

export async function getLessons(): Promise<Lesson[]> {
  return sortLessons(await getCollectionRecords<Lesson>('lessons'));
}

export async function getLessonsByProgramArea(programAreaId: string): Promise<Lesson[]> {
  return sortLessons(
    await getCollectionRecords<Lesson>('lessons', [where('programAreaId', '==', programAreaId)]),
  );
}

export async function getLessonById(lessonId: string): Promise<Lesson | null> {
  return getDocumentRecord<Lesson>('lessons', lessonId);
}
