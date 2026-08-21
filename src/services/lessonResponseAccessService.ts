import { httpsCallable } from 'firebase/functions';
import { cloudFunctions } from '../firebase/client';
import type { LessonResponseAccess, ResponseKind } from '../types';

interface LessonResponseAccessPayload {
  classId: string;
  lessonId: string;
}

interface ScheduledLessonResponsePayload extends LessonResponseAccessPayload {
  responseKind: ResponseKind;
  response: string;
}

const getLessonResponseAccessCallable = httpsCallable<
  LessonResponseAccessPayload,
  LessonResponseAccess
>(cloudFunctions, 'getLessonResponseAccess');

const submitScheduledLessonResponseCallable = httpsCallable<
  ScheduledLessonResponsePayload,
  { status: 'submitted'; updatedAt: number }
>(cloudFunctions, 'submitScheduledLessonResponse');

export async function getLessonResponseAccess(
  classId: string,
  lessonId: string,
): Promise<LessonResponseAccess> {
  const result = await getLessonResponseAccessCallable({ classId, lessonId });
  return result.data;
}

export async function submitScheduledLessonResponse(
  payload: ScheduledLessonResponsePayload,
): Promise<void> {
  await submitScheduledLessonResponseCallable(payload);
}
