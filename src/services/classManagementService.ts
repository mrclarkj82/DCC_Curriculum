import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '../firebase/client';
import type { ActiveClassItem, ActiveItemType, ClassRecord } from '../types';
import { classRecordFromData } from './classService';
import { assignUserToClass, removeUserFromClass } from './userManagementService';

interface CreateClassInput {
  id: string;
  name: string;
  period: string;
  schoolYear: string;
  activeProgramAreaId?: string;
  activeItemType?: ActiveItemType;
  activeItemId?: string;
}

type ClassBasicUpdates = Partial<Pick<ClassRecord, 'name' | 'period' | 'schoolYear'>>;

export type ActiveItemUpdate = Pick<ActiveClassItem, 'programAreaId' | 'type' | 'id'>;

const sortClasses = (classes: ClassRecord[]) =>
  [...classes].sort((a, b) => {
    if (a.period !== b.period) {
      return a.period.localeCompare(b.period, undefined, { numeric: true });
    }

    return a.name.localeCompare(b.name);
  });

export async function getAllClasses(): Promise<ClassRecord[]> {
  const snapshot = await getDocs(collection(db, 'classes'));

  return sortClasses(
    snapshot.docs.map((documentSnapshot) => classRecordFromData(documentSnapshot.data())),
  );
}

export function subscribeToClasses(
  onClasses: (classes: ClassRecord[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    collection(db, 'classes'),
    (snapshot) => {
      onClasses(
        sortClasses(
          snapshot.docs.map((documentSnapshot) => classRecordFromData(documentSnapshot.data())),
        ),
      );
    },
    onError,
  );
}

export async function createClass(classData: CreateClassInput): Promise<void> {
  const classId = classData.id.trim();
  const classRef = doc(db, 'classes', classId);
  const existingClass = await getDoc(classRef);

  if (existingClass.exists()) {
    throw new Error(`Class ${classId} already exists.`);
  }

  await setDoc(classRef, {
    id: classId,
    name: classData.name.trim(),
    period: classData.period.trim(),
    teacherIds: [],
    studentIds: [],
    activeProgramAreaId: classData.activeProgramAreaId ?? 'unreal-engine',
    activeItemType: classData.activeItemType ?? 'lesson',
    activeItemId: classData.activeItemId ?? 'ue-q1-l01',
    schoolYear: classData.schoolYear.trim(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateClassBasicInfo(
  classId: string,
  updates: ClassBasicUpdates,
): Promise<void> {
  await updateDoc(doc(db, 'classes', classId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function assignStudentToClass(uid: string, classId: string): Promise<void> {
  await assignUserToClass(uid, classId, 'student');
}

export async function removeStudentFromClass(uid: string, classId: string): Promise<void> {
  await removeUserFromClass(uid, classId, 'student');
}

export async function assignTeacherToClass(uid: string, classId: string): Promise<void> {
  await assignUserToClass(uid, classId, 'teacher');
}

export async function removeTeacherFromClass(uid: string, classId: string): Promise<void> {
  await removeUserFromClass(uid, classId, 'teacher');
}

export async function updateClassActiveItem(
  classId: string,
  activeItem: ActiveItemUpdate,
): Promise<void> {
  await updateDoc(doc(db, 'classes', classId), {
    activeProgramAreaId: activeItem.programAreaId,
    activeItemType: activeItem.type,
    activeItemId: activeItem.id,
    updatedAt: serverTimestamp(),
  });
}
