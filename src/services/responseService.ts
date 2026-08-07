import {
  collection,
  doc,
  getCountFromServer,
  getDocs,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore';
import { dccCollectionPath, dccDocumentPath } from '../config/firestoreNamespace';
import { db } from '../firebase/client';
import type {
  ActiveClassItem,
  BellRingerResponse,
  ExitTicketResponse,
  PromptField,
  ResponseKind,
  StudentResponseBase,
} from '../types';

const responseCollections: Record<ResponseKind, string> = {
  bellRinger: 'bellRingerResponses',
  exitTicket: 'exitTicketResponses',
};

export interface StudentResponseInput {
  uid: string;
  studentName: string;
  studentEmail: string;
  classId: string;
  programAreaId: string;
  activeItemType: StudentResponseBase['activeItemType'];
  activeItemId: string;
  prompt: string;
  response: string;
}

export interface ClassItemResponses {
  bellRingerResponses: BellRingerResponse[];
  exitTicketResponses: ExitTicketResponse[];
}

export interface ResponseSystemCounts {
  bellRingerResponses: number;
  exitTicketResponses: number;
  totalResponses: number;
}

export function makeResponseId(classId: string, activeItemId: string, uid: string): string {
  const safePart = (value: string) =>
    value
      .trim()
      .replace(/[^A-Za-z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

  return [classId, activeItemId, uid].map(safePart).join('_');
}

function promptText(field: PromptField | undefined): string {
  if (!field) {
    return '';
  }

  if (typeof field === 'string') {
    return field.trim();
  }

  return field.prompt.trim();
}

export function getBellRingerPrompt(activeItem: ActiveClassItem | null): string {
  const record = activeItem?.record;

  if (!activeItem || !record) {
    return '';
  }

  if (activeItem.type === 'lesson' && 'bellRinger' in record) {
    return promptText(record.bellRinger);
  }

  if (activeItem.type === 'assignment' && 'bellRinger' in record) {
    return promptText(record.bellRinger);
  }

  if (activeItem.type === 'mediaProject' && 'bellRinger' in record) {
    return promptText(record.bellRinger);
  }

  if (activeItem.type === 'broadcastUpdate' && 'bellRinger' in record) {
    return promptText(record.bellRinger);
  }

  return '';
}

export function getExitTicketPrompt(activeItem: ActiveClassItem | null): string {
  const record = activeItem?.record;

  if (!activeItem || !record) {
    return '';
  }

  if (activeItem.type === 'lesson' && 'exitTicket' in record) {
    return promptText(record.exitTicket);
  }

  if (activeItem.type === 'assignment' && 'exitTicket' in record) {
    return promptText(record.exitTicket);
  }

  if (activeItem.type === 'mediaProject') {
    const exitTicket = 'exitTicket' in record ? promptText(record.exitTicket) : '';
    const reflectionPrompt =
      'reflectionPrompt' in record ? promptText(record.reflectionPrompt) : '';
    return exitTicket || reflectionPrompt;
  }

  if (activeItem.type === 'broadcastUpdate' && 'exitTicket' in record) {
    return promptText(record.exitTicket);
  }

  return '';
}

function responseFromData<T extends BellRingerResponse | ExitTicketResponse>(
  id: string,
  kind: ResponseKind,
  data: Record<string, unknown>,
): T {
  return {
    id: String(data.id ?? id),
    kind,
    uid: String(data.uid ?? ''),
    studentName: String(data.studentName ?? ''),
    studentEmail: String(data.studentEmail ?? ''),
    classId: String(data.classId ?? ''),
    programAreaId: String(data.programAreaId ?? ''),
    activeItemType: data.activeItemType as StudentResponseBase['activeItemType'],
    activeItemId: String(data.activeItemId ?? ''),
    prompt: String(data.prompt ?? ''),
    response: String(data.response ?? ''),
    status: 'submitted',
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  } as T;
}

function studentResponseQuery(
  kind: ResponseKind,
  classId: string,
  activeItemId: string,
  uid: string,
) {
  return query(
    collection(db, dccCollectionPath(responseCollections[kind])),
    where('uid', '==', uid),
    where('classId', '==', classId),
    where('activeItemId', '==', activeItemId),
    limit(1),
  );
}

async function getResponse<T extends BellRingerResponse | ExitTicketResponse>(
  kind: ResponseKind,
  classId: string,
  activeItemId: string,
  uid: string,
): Promise<T | null> {
  const snapshot = await getDocs(studentResponseQuery(kind, classId, activeItemId, uid));
  const responseDocument = snapshot.docs[0];

  if (!responseDocument) {
    return null;
  }

  return responseFromData<T>(responseDocument.id, kind, responseDocument.data());
}

function subscribeToResponse<T extends BellRingerResponse | ExitTicketResponse>(
  kind: ResponseKind,
  classId: string,
  activeItemId: string,
  uid: string,
  onResponse: (response: T | null) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    studentResponseQuery(kind, classId, activeItemId, uid),
    (snapshot) => {
      const responseDocument = snapshot.docs[0];
      onResponse(
        responseDocument
          ? responseFromData<T>(responseDocument.id, kind, responseDocument.data())
          : null,
      );
    },
    onError,
  );
}

async function submitResponse(kind: ResponseKind, input: StudentResponseInput): Promise<void> {
  const trimmedResponse = input.response.trim();

  if (!trimmedResponse) {
    throw new Error('Write a response before saving.');
  }

  const responseId = makeResponseId(input.classId, input.activeItemId, input.uid);
  const responseRef = doc(db, dccDocumentPath(responseCollections[kind], responseId));
  // A filtered query remains authorized when a student has no response document yet.
  // A direct get cannot inspect resource.data until that first document exists.
  const existingResponse = await getDocs(
    studentResponseQuery(kind, input.classId, input.activeItemId, input.uid),
  );
  const responseData = {
    id: responseId,
    uid: input.uid,
    studentName: input.studentName.trim(),
    studentEmail: input.studentEmail.trim(),
    classId: input.classId,
    programAreaId: input.programAreaId,
    activeItemType: input.activeItemType,
    activeItemId: input.activeItemId,
    prompt: input.prompt.trim(),
    response: trimmedResponse,
    status: 'submitted',
    updatedAt: serverTimestamp(),
  };

  await setDoc(
    responseRef,
    !existingResponse.empty
      ? responseData
      : {
          ...responseData,
          createdAt: serverTimestamp(),
        },
    { merge: true },
  );
}

async function getResponsesForClassItem<T extends BellRingerResponse | ExitTicketResponse>(
  kind: ResponseKind,
  classId: string,
  activeItemId: string,
): Promise<T[]> {
  const snapshot = await getDocs(
    query(
      collection(db, dccCollectionPath(responseCollections[kind])),
      where('classId', '==', classId),
      where('activeItemId', '==', activeItemId),
      limit(500),
    ),
  );

  return snapshot.docs.map((documentSnapshot) =>
    responseFromData<T>(documentSnapshot.id, kind, documentSnapshot.data()),
  );
}

export async function getClassItemResponses(
  classId: string,
  activeItemId: string,
): Promise<ClassItemResponses> {
  const [bellRingerResponses, exitTicketResponses] = await Promise.all([
    getResponsesForClassItem<BellRingerResponse>('bellRinger', classId, activeItemId),
    getResponsesForClassItem<ExitTicketResponse>('exitTicket', classId, activeItemId),
  ]);

  return { bellRingerResponses, exitTicketResponses };
}

export function subscribeToResponsesForClassItem(
  classId: string,
  activeItemId: string,
  onResponses: (responses: ClassItemResponses) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  let bellRingerResponses: BellRingerResponse[] = [];
  let exitTicketResponses: ExitTicketResponse[] = [];

  const emitResponses = () => onResponses({ bellRingerResponses, exitTicketResponses });

  const bellRingerUnsubscribe = onSnapshot(
    query(
      collection(db, dccCollectionPath(responseCollections.bellRinger)),
      where('classId', '==', classId),
      where('activeItemId', '==', activeItemId),
      limit(500),
    ),
    (snapshot) => {
      bellRingerResponses = snapshot.docs.map((documentSnapshot) =>
        responseFromData<BellRingerResponse>(
          documentSnapshot.id,
          'bellRinger',
          documentSnapshot.data(),
        ),
      );
      emitResponses();
    },
    onError,
  );

  const exitTicketUnsubscribe = onSnapshot(
    query(
      collection(db, dccCollectionPath(responseCollections.exitTicket)),
      where('classId', '==', classId),
      where('activeItemId', '==', activeItemId),
      limit(500),
    ),
    (snapshot) => {
      exitTicketResponses = snapshot.docs.map((documentSnapshot) =>
        responseFromData<ExitTicketResponse>(
          documentSnapshot.id,
          'exitTicket',
          documentSnapshot.data(),
        ),
      );
      emitResponses();
    },
    onError,
  );

  return () => {
    bellRingerUnsubscribe();
    exitTicketUnsubscribe();
  };
}

export async function getBellRingerResponse(
  classId: string,
  activeItemId: string,
  uid: string,
): Promise<BellRingerResponse | null> {
  return getResponse('bellRinger', classId, activeItemId, uid);
}

export function subscribeToBellRingerResponse(
  classId: string,
  activeItemId: string,
  uid: string,
  onResponse: (response: BellRingerResponse | null) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return subscribeToResponse('bellRinger', classId, activeItemId, uid, onResponse, onError);
}

export async function submitBellRingerResponse(input: StudentResponseInput): Promise<void> {
  await submitResponse('bellRinger', input);
}

export async function getBellRingerResponsesForClassItem(
  classId: string,
  activeItemId: string,
): Promise<BellRingerResponse[]> {
  return getResponsesForClassItem('bellRinger', classId, activeItemId);
}

export async function getExitTicketResponse(
  classId: string,
  activeItemId: string,
  uid: string,
): Promise<ExitTicketResponse | null> {
  return getResponse('exitTicket', classId, activeItemId, uid);
}

export function subscribeToExitTicketResponse(
  classId: string,
  activeItemId: string,
  uid: string,
  onResponse: (response: ExitTicketResponse | null) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return subscribeToResponse('exitTicket', classId, activeItemId, uid, onResponse, onError);
}

export async function submitExitTicketResponse(input: StudentResponseInput): Promise<void> {
  await submitResponse('exitTicket', input);
}

export async function getExitTicketResponsesForClassItem(
  classId: string,
  activeItemId: string,
): Promise<ExitTicketResponse[]> {
  return getResponsesForClassItem('exitTicket', classId, activeItemId);
}

export async function getResponseSystemCounts(): Promise<ResponseSystemCounts> {
  const [bellRingerSnapshot, exitTicketSnapshot] = await Promise.all([
    getCountFromServer(collection(db, dccCollectionPath(responseCollections.bellRinger))),
    getCountFromServer(collection(db, dccCollectionPath(responseCollections.exitTicket))),
  ]);
  const bellRingerResponses = bellRingerSnapshot.data().count;
  const exitTicketResponses = exitTicketSnapshot.data().count;

  return {
    bellRingerResponses,
    exitTicketResponses,
    totalResponses: bellRingerResponses + exitTicketResponses,
  };
}
