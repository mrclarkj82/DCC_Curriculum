import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  type Unsubscribe,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { dccCollectionPath, dccDocumentPath } from '../config/firestoreNamespace';
import { auth, cloudFunctions, db } from '../firebase/client';
import type { ClassJoinCode, ClassRecord, JoinClassResult } from '../types';
import { getClassById } from './classService';

const studentDomain = 'student.doralacademynv.org';
const codeAlphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const maxCodeAttempts = 16;

const joinClassWithCodeCallable = httpsCallable<{ code: string }, JoinClassResult>(
  cloudFunctions,
  'joinClassWithCode',
);

const classJoinCodeFromData = (
  data: Record<string, unknown>,
  fallbackCode: string,
): ClassJoinCode => ({
  code: String(data.code ?? fallbackCode),
  classId: String(data.classId ?? ''),
  className: String(data.className ?? ''),
  period: String(data.period ?? ''),
  createdBy: String(data.createdBy ?? ''),
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
  expiresAt: data.expiresAt ?? null,
  isActive: data.isActive === true,
  allowedEmailDomain: String(data.allowedEmailDomain ?? ''),
  usageCount: Number(data.usageCount ?? 0),
  lastUsedAt: data.lastUsedAt ?? null,
});

const normalizeJoinCode = (code: string): string => code.trim().replace(/\s+/g, '').toUpperCase();

const createRandomCode = (): string => {
  const randomValues = new Uint32Array(6);
  crypto.getRandomValues(randomValues);

  return Array.from(randomValues)
    .map((value) => codeAlphabet[value % codeAlphabet.length])
    .join('');
};

const getCurrentUid = (): string => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error('You must be signed in to manage class join codes.');
  }

  return uid;
};

async function createUniqueCode(): Promise<string> {
  for (let attempt = 0; attempt < maxCodeAttempts; attempt += 1) {
    const code = createRandomCode();
    const snapshot = await getDoc(doc(db, dccDocumentPath('classJoinCodes', code)));

    if (!snapshot.exists()) {
      return code;
    }
  }

  throw new Error('Unable to create a unique class code. Please try again.');
}

async function buildJoinCodeRecord(classRecord: ClassRecord, code: string): Promise<ClassJoinCode> {
  return {
    code,
    classId: classRecord.id,
    className: classRecord.name,
    period: classRecord.period,
    createdBy: getCurrentUid(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    expiresAt: null,
    isActive: true,
    allowedEmailDomain: studentDomain,
    usageCount: 0,
    lastUsedAt: null,
  };
}

async function getClassOrThrow(classId: string): Promise<ClassRecord> {
  const classRecord = await getClassById(classId);

  if (!classRecord) {
    throw new Error('Class record was not found.');
  }

  return classRecord;
}

export async function getJoinCodeForClass(classId: string): Promise<ClassJoinCode | null> {
  const snapshot = await getDocs(
    query(
      collection(db, dccCollectionPath('classJoinCodes')),
      where('classId', '==', classId),
      where('isActive', '==', true),
      limit(1),
    ),
  );

  if (snapshot.empty) {
    return null;
  }

  const documentSnapshot = snapshot.docs[0];

  return classJoinCodeFromData(documentSnapshot.data(), documentSnapshot.id);
}

export function subscribeToJoinCodeForClass(
  classId: string,
  onJoinCode: (joinCode: ClassJoinCode | null) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    query(
      collection(db, dccCollectionPath('classJoinCodes')),
      where('classId', '==', classId),
      where('isActive', '==', true),
      limit(1),
    ),
    (snapshot) => {
      if (snapshot.empty) {
        onJoinCode(null);
        return;
      }

      const documentSnapshot = snapshot.docs[0];
      onJoinCode(classJoinCodeFromData(documentSnapshot.data(), documentSnapshot.id));
    },
    onError,
  );
}

export async function generateJoinCodeForClass(classId: string): Promise<ClassJoinCode> {
  const existingCode = await getJoinCodeForClass(classId);

  if (existingCode) {
    return existingCode;
  }

  const classRecord = await getClassOrThrow(classId);
  const code = await createUniqueCode();
  const joinCode = await buildJoinCodeRecord(classRecord, code);

  await setDoc(doc(db, dccDocumentPath('classJoinCodes', code)), joinCode);

  return joinCode;
}

export async function regenerateJoinCodeForClass(classId: string): Promise<ClassJoinCode> {
  const classRecord = await getClassOrThrow(classId);
  const existingCode = await getJoinCodeForClass(classId);
  const code = await createUniqueCode();
  const nextJoinCode = await buildJoinCodeRecord(classRecord, code);
  const batch = writeBatch(db);

  if (existingCode) {
    batch.update(doc(db, dccDocumentPath('classJoinCodes', existingCode.code)), {
      isActive: false,
      updatedAt: serverTimestamp(),
    });
  }

  batch.set(doc(db, dccDocumentPath('classJoinCodes', code)), nextJoinCode);

  await batch.commit();

  return nextJoinCode;
}

export async function disableJoinCode(code: string): Promise<void> {
  const normalizedCode = normalizeJoinCode(code);

  if (!normalizedCode) {
    throw new Error('Choose a class code before disabling it.');
  }

  await updateDoc(doc(db, dccDocumentPath('classJoinCodes', normalizedCode)), {
    isActive: false,
    updatedAt: serverTimestamp(),
  });
}

export async function joinClassWithCode(code: string): Promise<JoinClassResult> {
  const normalizedCode = normalizeJoinCode(code);

  if (!normalizedCode) {
    throw new Error('Enter the class code your teacher gave you.');
  }

  try {
    const result = await joinClassWithCodeCallable({ code: normalizedCode });
    return result.data;
  } catch (error) {
    if (error instanceof Error && error.message) {
      throw new Error(error.message);
    }

    throw new Error('Something went wrong. Please ask your teacher.');
  }
}
