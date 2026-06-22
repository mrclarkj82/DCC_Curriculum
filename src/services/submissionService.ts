import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore';
import { dccCollectionPath, dccDocumentPath } from '../config/firestoreNamespace';
import { db } from '../firebase/client';
import type {
  ActiveClassItem,
  ActiveItemRecord,
  ActiveItemType,
  Assignment,
  BroadcastUpdate,
  Lesson,
  MediaProject,
  StudentSubmission,
  SubmissionDriveLink,
  SubmissionEvidenceChecklistItem,
  SubmissionKind,
  SubmissionReviewUpdate,
  SubmissionStatus,
  SubmissionTarget,
  SubmissionTargetType,
} from '../types';

export interface SubmissionLinkInput {
  url: string;
  label: string;
}

export interface SubmissionWritePayload {
  uid: string;
  studentName: string;
  studentEmail: string;
  classId: string;
  activeItemType: ActiveItemType;
  activeItemId: string;
  target: SubmissionTarget;
  links: SubmissionLinkInput[];
  reflection: string;
  textResponse: string;
  evidenceChecklist: SubmissionEvidenceChecklistItem[];
}

export interface ClassTargetSubmissions {
  submissions: StudentSubmission[];
}

export interface SubmissionSystemSummary {
  totalSubmissions: number;
  recentSubmissions: StudentSubmission[];
}

const genericReflectionPrompt =
  'Briefly explain what you made, what evidence you are submitting, and what you want your teacher to notice.';

export function makeSubmissionId(
  classId: string,
  targetType: SubmissionTargetType,
  targetId: string,
  uid: string,
): string {
  const safePart = (value: string) =>
    value
      .trim()
      .replace(/[^A-Za-z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

  return [classId, targetType, targetId, uid].map(safePart).join('_');
}

function evidenceChecklistFrom(requirements: string[]): SubmissionEvidenceChecklistItem[] {
  return requirements.map((label) => ({ label, complete: false }));
}

function submissionKindFor(
  programAreaId: string,
  targetType: SubmissionTargetType,
): SubmissionKind {
  if (targetType === 'broadcastUpdate') {
    return 'broadcast-evidence';
  }

  if (programAreaId === 'video-production') {
    return 'video-production';
  }

  if (programAreaId === 'unreal-engine') {
    return 'unreal-evidence';
  }

  return 'general';
}

export function resolveSubmissionTarget(
  activeItemType: ActiveItemType,
  record: ActiveItemRecord,
): SubmissionTarget | null {
  if (!record) {
    return null;
  }

  if (activeItemType === 'lesson' && 'assignment' in record) {
    const lesson = record as Lesson;
    const requirements = lesson.assignment?.evidenceRequired ?? [];
    const targetType: SubmissionTargetType = lesson.assignment?.id ? 'assignment' : 'lesson';

    return {
      targetType,
      targetId: lesson.assignment?.id || lesson.id,
      programAreaId: lesson.programAreaId,
      title: lesson.assignment?.title || lesson.title,
      submissionKind: submissionKindFor(lesson.programAreaId, targetType),
      requirements,
      evidenceChecklist: evidenceChecklistFrom(requirements),
      reflectionPrompt: genericReflectionPrompt,
    };
  }

  if (activeItemType === 'assignment' && 'requiredSteps' in record) {
    const assignment = record as Assignment;

    return {
      targetType: 'assignment',
      targetId: assignment.id,
      programAreaId: assignment.programAreaId,
      title: assignment.title,
      submissionKind: submissionKindFor(assignment.programAreaId, 'assignment'),
      requirements: assignment.evidenceRequired,
      evidenceChecklist: evidenceChecklistFrom(assignment.evidenceRequired),
      reflectionPrompt: assignment.reflectionPrompt || genericReflectionPrompt,
    };
  }

  if (activeItemType === 'mediaProject' && 'studentTask' in record) {
    const project = record as MediaProject;

    return {
      targetType: 'mediaProject',
      targetId: project.id,
      programAreaId: project.programAreaId,
      title: project.title,
      submissionKind: submissionKindFor(project.programAreaId, 'mediaProject'),
      requirements: project.evidenceRequired,
      evidenceChecklist: evidenceChecklistFrom(project.evidenceRequired),
      reflectionPrompt: project.reflectionPrompt || genericReflectionPrompt,
    };
  }

  if (activeItemType === 'broadcastUpdate' && 'submissionRequirements' in record) {
    const update = record as BroadcastUpdate;

    return {
      targetType: 'broadcastUpdate',
      targetId: update.id,
      programAreaId: update.programAreaId,
      title: update.title,
      submissionKind: 'broadcast-evidence',
      requirements: update.submissionRequirements,
      evidenceChecklist: evidenceChecklistFrom(update.submissionRequirements),
      reflectionPrompt: genericReflectionPrompt,
    };
  }

  return null;
}

export function resolveSubmissionTargetForActiveItem(
  activeItem: ActiveClassItem,
): SubmissionTarget | null {
  return resolveSubmissionTarget(activeItem.type, activeItem.record ?? null);
}

function linkTypeForUrl(url: string): SubmissionDriveLink['type'] {
  const normalizedUrl = url.toLowerCase();

  if (normalizedUrl.startsWith('https://drive.google.com/')) {
    return 'google-drive';
  }

  if (normalizedUrl.startsWith('https://docs.google.com/')) {
    return 'google-docs';
  }

  if (
    normalizedUrl.startsWith('https://youtube.com/') ||
    normalizedUrl.startsWith('https://www.youtube.com/') ||
    normalizedUrl.startsWith('https://youtu.be/')
  ) {
    return 'youtube';
  }

  return 'other-link';
}

export function isAcceptedSubmissionUrl(url: string): boolean {
  const normalizedUrl = url.trim().toLowerCase();

  return (
    normalizedUrl.startsWith('https://drive.google.com/') ||
    normalizedUrl.startsWith('https://docs.google.com/') ||
    normalizedUrl.startsWith('https://youtube.com/') ||
    normalizedUrl.startsWith('https://www.youtube.com/') ||
    normalizedUrl.startsWith('https://youtu.be/')
  );
}

function normalizeLinks(links: SubmissionLinkInput[]): {
  driveLinks: SubmissionDriveLink[];
  otherLinks: SubmissionDriveLink[];
} {
  const normalizedLinks = links
    .map((link) => ({
      url: link.url.trim(),
      label: link.label.trim(),
    }))
    .filter((link) => link.url);

  if (!normalizedLinks.length) {
    throw new Error('Add at least one Google Drive, Google Docs, or YouTube evidence link.');
  }

  const invalidLink = normalizedLinks.find((link) => !isAcceptedSubmissionUrl(link.url));

  if (invalidLink) {
    throw new Error(
      `Unsupported link: ${invalidLink.url}. Paste a Google Drive, Google Docs, YouTube, or youtu.be link.`,
    );
  }

  const withMetadata = normalizedLinks.map((link, index) => ({
    url: link.url,
    label: link.label || `Evidence link ${index + 1}`,
    type: linkTypeForUrl(link.url),
    addedAt: Timestamp.now(),
  }));

  return {
    driveLinks: withMetadata.filter((link) => link.type !== 'youtube'),
    otherLinks: withMetadata.filter((link) => link.type === 'youtube'),
  };
}

function checklistIsComplete(items: SubmissionEvidenceChecklistItem[]): boolean {
  return !items.length || items.every((item) => item.complete);
}

function submissionFromData(id: string, data: Record<string, unknown>): StudentSubmission {
  const linkFromData = (link: unknown): SubmissionDriveLink => {
    const typedLink = link as Partial<SubmissionDriveLink>;

    return {
      url: String(typedLink.url ?? ''),
      label: String(typedLink.label ?? ''),
      type: typedLink.type ?? 'google-drive',
      addedAt: typedLink.addedAt,
    };
  };
  const checklistItemFromData = (item: unknown): SubmissionEvidenceChecklistItem => {
    const typedItem = item as Partial<SubmissionEvidenceChecklistItem>;

    return {
      label: String(typedItem.label ?? ''),
      complete: Boolean(typedItem.complete),
    };
  };

  return {
    id: String(data.id ?? id),
    uid: String(data.uid ?? ''),
    studentName: String(data.studentName ?? ''),
    studentEmail: String(data.studentEmail ?? ''),
    classId: String(data.classId ?? ''),
    programAreaId: String(data.programAreaId ?? ''),
    targetType: data.targetType as SubmissionTargetType,
    targetId: String(data.targetId ?? ''),
    activeItemType: data.activeItemType as ActiveItemType,
    activeItemId: String(data.activeItemId ?? ''),
    title: String(data.title ?? ''),
    submissionKind: data.submissionKind as SubmissionKind,
    driveLinks: Array.isArray(data.driveLinks) ? data.driveLinks.map(linkFromData) : [],
    otherLinks: Array.isArray(data.otherLinks) ? data.otherLinks.map(linkFromData) : [],
    reflection: String(data.reflection ?? ''),
    textResponse: String(data.textResponse ?? ''),
    evidenceChecklist: Array.isArray(data.evidenceChecklist)
      ? data.evidenceChecklist.map(checklistItemFromData)
      : [],
    status: data.status as SubmissionStatus,
    teacherFeedback: String(data.teacherFeedback ?? ''),
    reviewedBy: String(data.reviewedBy ?? ''),
    reviewedAt: data.reviewedAt ?? null,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    submittedAt: data.submittedAt,
    resubmittedAt: data.resubmittedAt ?? null,
  };
}

async function writeSubmission(
  payload: SubmissionWritePayload,
  status: Extract<SubmissionStatus, 'submitted' | 'resubmitted'>,
): Promise<void> {
  const reflection = payload.reflection.trim();

  if (!reflection) {
    throw new Error('Add a reflection before submitting evidence.');
  }

  if (!checklistIsComplete(payload.evidenceChecklist)) {
    throw new Error('Check off each evidence item before submitting.');
  }

  const { driveLinks, otherLinks } = normalizeLinks(payload.links);
  const submissionId = makeSubmissionId(
    payload.classId,
    payload.target.targetType,
    payload.target.targetId,
    payload.uid,
  );
  const submissionRef = doc(db, dccDocumentPath('submissions', submissionId));
  const existingSubmission = await getDoc(submissionRef);
  const submissionData = {
    id: submissionId,
    uid: payload.uid,
    studentName: payload.studentName.trim(),
    studentEmail: payload.studentEmail.trim(),
    classId: payload.classId,
    programAreaId: payload.target.programAreaId,
    targetType: payload.target.targetType,
    targetId: payload.target.targetId,
    activeItemType: payload.activeItemType,
    activeItemId: payload.activeItemId,
    title: payload.target.title,
    submissionKind: payload.target.submissionKind,
    driveLinks,
    otherLinks,
    reflection,
    textResponse: payload.textResponse.trim(),
    evidenceChecklist: payload.evidenceChecklist,
    status,
    updatedAt: serverTimestamp(),
  };

  await setDoc(
    submissionRef,
    existingSubmission.exists()
      ? {
          ...submissionData,
          ...(status === 'resubmitted' ? { resubmittedAt: serverTimestamp() } : {}),
        }
      : {
          ...submissionData,
          teacherFeedback: '',
          reviewedBy: '',
          reviewedAt: null,
          createdAt: serverTimestamp(),
          submittedAt: serverTimestamp(),
          resubmittedAt: null,
        },
    { merge: true },
  );
}

export async function getSubmission(
  classId: string,
  targetType: SubmissionTargetType,
  targetId: string,
  uid: string,
): Promise<StudentSubmission | null> {
  const submissionId = makeSubmissionId(classId, targetType, targetId, uid);
  const snapshot = await getDoc(doc(db, dccDocumentPath('submissions', submissionId)));

  if (!snapshot.exists()) {
    return null;
  }

  return submissionFromData(snapshot.id, snapshot.data());
}

export function subscribeToSubmission(
  classId: string,
  targetType: SubmissionTargetType,
  targetId: string,
  uid: string,
  onSubmission: (submission: StudentSubmission | null) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  const submissionId = makeSubmissionId(classId, targetType, targetId, uid);

  return onSnapshot(
    doc(db, dccDocumentPath('submissions', submissionId)),
    (snapshot) => {
      onSubmission(snapshot.exists() ? submissionFromData(snapshot.id, snapshot.data()) : null);
    },
    onError,
  );
}

export async function submitWork(payload: SubmissionWritePayload): Promise<void> {
  await writeSubmission(payload, 'submitted');
}

export async function updateSubmission(payload: SubmissionWritePayload): Promise<void> {
  await writeSubmission(payload, 'submitted');
}

export async function resubmitWork(payload: SubmissionWritePayload): Promise<void> {
  await writeSubmission(payload, 'resubmitted');
}

export async function getSubmissionsForClassTarget(
  classId: string,
  targetType: SubmissionTargetType,
  targetId: string,
): Promise<StudentSubmission[]> {
  const snapshot = await getDocs(
    query(
      collection(db, dccCollectionPath('submissions')),
      where('classId', '==', classId),
      where('targetType', '==', targetType),
      where('targetId', '==', targetId),
    ),
  );

  return snapshot.docs.map((documentSnapshot) =>
    submissionFromData(documentSnapshot.id, documentSnapshot.data()),
  );
}

export function subscribeToSubmissionsForClassTarget(
  classId: string,
  targetType: SubmissionTargetType,
  targetId: string,
  onSubmissions: (submissions: StudentSubmission[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    query(
      collection(db, dccCollectionPath('submissions')),
      where('classId', '==', classId),
      where('targetType', '==', targetType),
      where('targetId', '==', targetId),
    ),
    (snapshot) => {
      onSubmissions(
        snapshot.docs.map((documentSnapshot) =>
          submissionFromData(documentSnapshot.id, documentSnapshot.data()),
        ),
      );
    },
    onError,
  );
}

export async function updateSubmissionReviewStatus({
  submissionId,
  status,
  teacherFeedback,
  reviewedBy,
}: SubmissionReviewUpdate): Promise<void> {
  await updateDoc(doc(db, dccDocumentPath('submissions', submissionId)), {
    status,
    teacherFeedback: teacherFeedback.trim(),
    reviewedBy,
    reviewedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getSubmissionSystemSummary(): Promise<SubmissionSystemSummary> {
  const submissionsCollection = collection(db, dccCollectionPath('submissions'));
  const [countSnapshot, recentSnapshot] = await Promise.all([
    getCountFromServer(submissionsCollection),
    getDocs(query(submissionsCollection, orderBy('updatedAt', 'desc'), limit(5))),
  ]);

  return {
    totalSubmissions: countSnapshot.data().count,
    recentSubmissions: recentSnapshot.docs.map((documentSnapshot) =>
      submissionFromData(documentSnapshot.id, documentSnapshot.data()),
    ),
  };
}
