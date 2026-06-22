import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from 'firebase/firestore';
import { dccDocumentPath } from '../config/firestoreNamespace';
import { db } from '../firebase/client';
import type {
  ActiveItemType,
  ClassRecord,
  ResponseKind,
  TeacherPreviewContext,
  TeacherPreviewResponse,
  UserProfile,
} from '../types';
import { isAdminRole, isTeacherRole } from '../types';
import { getActiveItem } from './activeItemService';
import { getClassById } from './classService';
import { getProgramAreaById } from './programAreaService';

export interface TeacherPreviewResponseInput {
  teacherUid: string;
  teacherName: string;
  teacherEmail: string;
  classId: string;
  programAreaId: string;
  activeItemType: ActiveItemType;
  activeItemId: string;
  responseKind: ResponseKind;
  prompt: string;
  response: string;
}

export function canPreviewClass(
  userProfile: UserProfile | null | undefined,
  classRecord: ClassRecord,
): boolean {
  return Boolean(
    userProfile &&
      (isAdminRole(userProfile.role) ||
        (isTeacherRole(userProfile.role) && classRecord.teacherIds.includes(userProfile.uid))),
  );
}

function safePart(value: string): string {
  return value
    .trim()
    .replace(/[^A-Za-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function makeTeacherPreviewResponseId(
  classId: string,
  activeItemId: string,
  teacherUid: string,
  responseKind: ResponseKind,
): string {
  return `teacherPreview_${[classId, activeItemId, teacherUid, responseKind].map(safePart).join('_')}`;
}

function teacherPreviewResponseFromData(
  id: string,
  data: Record<string, unknown>,
): TeacherPreviewResponse {
  return {
    id: String(data.id ?? id),
    teacherUid: String(data.teacherUid ?? ''),
    teacherName: String(data.teacherName ?? ''),
    teacherEmail: String(data.teacherEmail ?? ''),
    classId: String(data.classId ?? ''),
    programAreaId: String(data.programAreaId ?? ''),
    activeItemType: data.activeItemType as ActiveItemType,
    activeItemId: String(data.activeItemId ?? ''),
    responseKind: data.responseKind as ResponseKind,
    prompt: String(data.prompt ?? ''),
    response: String(data.response ?? ''),
    status: 'preview-submitted',
    isPreview: true,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

export async function getPreviewClassContext(classId: string): Promise<TeacherPreviewContext> {
  const classRecord = await getClassById(classId);

  if (!classRecord) {
    throw new Error(`Class ${classId} was not found.`);
  }

  const [activeItem, programArea] = await Promise.all([
    getActiveItem(
      classRecord.activeItemType,
      classRecord.activeItemId,
      classRecord.activeProgramAreaId,
    ),
    getProgramAreaById(classRecord.activeProgramAreaId),
  ]);

  return { classRecord, activeItem, programArea };
}

export async function getTeacherPreviewResponse(
  classId: string,
  activeItemId: string,
  teacherUid: string,
  responseKind: ResponseKind,
): Promise<TeacherPreviewResponse | null> {
  const responseId = makeTeacherPreviewResponseId(
    classId,
    activeItemId,
    teacherUid,
    responseKind,
  );
  const snapshot = await getDoc(doc(db, dccDocumentPath('teacherPreviewResponses', responseId)));

  if (!snapshot.exists()) {
    return null;
  }

  return teacherPreviewResponseFromData(snapshot.id, snapshot.data());
}

export function subscribeToTeacherPreviewResponse(
  classId: string,
  activeItemId: string,
  teacherUid: string,
  responseKind: ResponseKind,
  onResponse: (response: TeacherPreviewResponse | null) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  const responseId = makeTeacherPreviewResponseId(
    classId,
    activeItemId,
    teacherUid,
    responseKind,
  );

  return onSnapshot(
    doc(db, dccDocumentPath('teacherPreviewResponses', responseId)),
    (snapshot) => {
      onResponse(
        snapshot.exists() ? teacherPreviewResponseFromData(snapshot.id, snapshot.data()) : null,
      );
    },
    onError,
  );
}

export async function submitTeacherPreviewResponse(
  input: TeacherPreviewResponseInput,
): Promise<void> {
  const trimmedResponse = input.response.trim();

  if (!trimmedResponse) {
    throw new Error('Write a preview response before saving.');
  }

  const responseId = makeTeacherPreviewResponseId(
    input.classId,
    input.activeItemId,
    input.teacherUid,
    input.responseKind,
  );
  const responseRef = doc(db, dccDocumentPath('teacherPreviewResponses', responseId));
  const existingResponse = await getDoc(responseRef);
  const responseData = {
    id: responseId,
    teacherUid: input.teacherUid,
    teacherName: input.teacherName.trim(),
    teacherEmail: input.teacherEmail.trim(),
    classId: input.classId,
    programAreaId: input.programAreaId,
    activeItemType: input.activeItemType,
    activeItemId: input.activeItemId,
    responseKind: input.responseKind,
    prompt: input.prompt.trim(),
    response: trimmedResponse,
    status: 'preview-submitted',
    isPreview: true,
    updatedAt: serverTimestamp(),
  };

  await setDoc(
    responseRef,
    existingResponse.exists()
      ? responseData
      : {
          ...responseData,
          createdAt: serverTimestamp(),
        },
    { merge: true },
  );
}
