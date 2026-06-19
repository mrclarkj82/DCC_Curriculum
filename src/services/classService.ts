import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  type Unsubscribe,
} from 'firebase/firestore';
import { dccDocumentPath } from '../config/firestoreNamespace';
import { db } from '../firebase/client';
import type { ActiveClassItem, ActiveItemType, ClassRecord } from '../types';

export const classRecordFromData = (data: Record<string, unknown>): ClassRecord => ({
  id: String(data.id ?? ''),
  name: String(data.name ?? ''),
  period: String(data.period ?? ''),
  teacherIds: Array.isArray(data.teacherIds) ? data.teacherIds.map(String) : [],
  studentIds: Array.isArray(data.studentIds) ? data.studentIds.map(String) : [],
  activeProgramAreaId: String(data.activeProgramAreaId ?? ''),
  activeItemType: (data.activeItemType as ActiveItemType) ?? 'lesson',
  activeItemId: String(data.activeItemId ?? ''),
  schoolYear: String(data.schoolYear ?? ''),
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});

export async function getClassById(classId: string): Promise<ClassRecord | null> {
  const snapshot = await getDoc(doc(db, dccDocumentPath('classes', classId)));

  if (!snapshot.exists()) {
    return null;
  }

  return classRecordFromData(snapshot.data());
}

export async function getClassesForUser(classIds: string[]): Promise<ClassRecord[]> {
  const classRecords = await Promise.all(classIds.map((classId) => getClassById(classId)));

  return classRecords.filter((classRecord): classRecord is ClassRecord => Boolean(classRecord));
}

export function subscribeToClass(
  classId: string,
  onClassRecord: (classRecord: ClassRecord | null) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    doc(db, dccDocumentPath('classes', classId)),
    (snapshot) => {
      onClassRecord(snapshot.exists() ? classRecordFromData(snapshot.data()) : null);
    },
    onError,
  );
}

export async function updateActiveClassItem(
  classId: string,
  activeItem: Pick<ActiveClassItem, 'programAreaId' | 'type' | 'id'>,
): Promise<void> {
  await updateDoc(doc(db, dccDocumentPath('classes', classId)), {
    activeProgramAreaId: activeItem.programAreaId,
    activeItemType: activeItem.type,
    activeItemId: activeItem.id,
    updatedAt: serverTimestamp(),
  });
}
