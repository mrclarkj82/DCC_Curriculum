import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { logger } from 'firebase-functions';
import { onSchedule } from 'firebase-functions/v2/scheduler';

export const schoolTimeZone = 'America/Los_Angeles';
export const activeSchoolYear = '2026-2027';
const scheduleOptions = {
  region: 'us-central1' as const,
  schedule: '0 5 * * 1-5',
  timeZone: schoolTimeZone,
  retryCount: 2,
  maxInstances: 1,
  timeoutSeconds: 60,
};

export type CycleDay = 'A' | 'B';

interface ScheduledLesson {
  cycleDay: CycleDay;
  lessonId: string;
  lessonTitle: string;
  programAreaId: string;
  activeItemType: 'lesson';
}

const tokenString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

export const dateInTimeZone = (value: Date, timeZone: string): string => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(value);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((entry) => entry.type === type)?.value ?? '';

  return `${part('year')}-${part('month')}-${part('day')}`;
};

export const classCycleFromPeriod = (period: unknown): CycleDay | null => {
  const match = tokenString(period).toUpperCase().match(/^([AB])\s*\d+$/);
  return match ? (match[1] as CycleDay) : null;
};

const scheduledLessonFromData = (
  data: Record<string, unknown>,
  cycleDay: CycleDay,
): ScheduledLesson => {
  const lessonId = tokenString(data.lessonId);
  const lessonTitle = tokenString(data.lessonTitle);
  const programAreaId = tokenString(data.programAreaId);
  const activeItemType = tokenString(data.activeItemType);

  if (!lessonId || !lessonTitle || !programAreaId || activeItemType !== 'lesson') {
    throw new Error('The aligned lesson schedule contains an invalid active mission.');
  }

  return {
    cycleDay,
    lessonId,
    lessonTitle,
    programAreaId,
    activeItemType: 'lesson',
  };
};

const findScheduledLesson = async (targetDate: string): Promise<ScheduledLesson | null> => {
  const scheduleCollection = getFirestore()
    .collection('apps')
    .doc('dcc')
    .collection('lessonSchedule');
  const [aDaySnapshot, bDaySnapshot] = await Promise.all([
    scheduleCollection.where('aDayDate', '==', targetDate).limit(2).get(),
    scheduleCollection.where('bDayDate', '==', targetDate).limit(2).get(),
  ]);
  const matches = [
    ...aDaySnapshot.docs.map((snapshot) =>
      scheduledLessonFromData(snapshot.data(), 'A'),
    ),
    ...bDaySnapshot.docs.map((snapshot) =>
      scheduledLessonFromData(snapshot.data(), 'B'),
    ),
  ];

  if (!matches.length) {
    return null;
  }

  if (matches.length !== 1) {
    throw new Error(
      `Expected one aligned lesson for ${targetDate}; found ${matches.length}.`,
    );
  }

  return matches[0];
};

const publishScheduledLesson = async (
  targetDate: string,
  scheduledLesson: ScheduledLesson,
): Promise<{ changed: number; unchanged: number }> => {
  const db = getFirestore();
  const appRef = db.collection('apps').doc('dcc');
  const lessonSnapshot = await appRef.collection('lessons').doc(scheduledLesson.lessonId).get();

  if (!lessonSnapshot.exists) {
    throw new Error(`Refusing to publish missing lesson ${scheduledLesson.lessonId}.`);
  }

  if (tokenString(lessonSnapshot.data()?.programAreaId) !== scheduledLesson.programAreaId) {
    throw new Error(
      `Lesson ${scheduledLesson.lessonId} does not match ${scheduledLesson.programAreaId}.`,
    );
  }

  const classSnapshot = await appRef.collection('classes').get();
  const targetClasses = classSnapshot.docs.filter((snapshot) => {
    const data = snapshot.data();
    return (
      tokenString(data.schoolYear) === activeSchoolYear &&
      classCycleFromPeriod(data.period) === scheduledLesson.cycleDay
    );
  });

  if (!targetClasses.length) {
    throw new Error(
      `No ${scheduledLesson.cycleDay}-day DCC classes were found for ${activeSchoolYear}.`,
    );
  }

  const changedClasses = targetClasses.filter((snapshot) => {
    const data = snapshot.data();
    return !(
      data.activeProgramAreaId === scheduledLesson.programAreaId &&
      data.activeItemType === scheduledLesson.activeItemType &&
      data.activeItemId === scheduledLesson.lessonId
    );
  });

  if (changedClasses.length) {
    const batch = db.batch();

    for (const classSnapshot of changedClasses) {
      batch.update(classSnapshot.ref, {
        activeProgramAreaId: scheduledLesson.programAreaId,
        activeItemType: scheduledLesson.activeItemType,
        activeItemId: scheduledLesson.lessonId,
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    await batch.commit();
  }

  logger.info('Aligned DCC mission publication complete.', {
    targetDate,
    cycleDay: scheduledLesson.cycleDay,
    activeItemId: scheduledLesson.lessonId,
    changed: changedClasses.length,
    unchanged: targetClasses.length - changedClasses.length,
  });

  return {
    changed: changedClasses.length,
    unchanged: targetClasses.length - changedClasses.length,
  };
};

export const publishScheduledDccMission = onSchedule(scheduleOptions, async (event) => {
  const targetDate = dateInTimeZone(new Date(event.scheduleTime), schoolTimeZone);
  const scheduledLesson = await findScheduledLesson(targetDate);

  if (!scheduledLesson) {
    logger.info('No aligned DCC lesson is scheduled; keeping teacher-selected active items.', {
      targetDate,
    });
    return;
  }

  await publishScheduledLesson(targetDate, scheduledLesson);
});
