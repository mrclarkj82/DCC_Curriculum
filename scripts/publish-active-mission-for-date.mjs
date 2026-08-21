import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';

const root = process.cwd();
const confirmPublish = process.env.CONFIRM_ACTIVE_MISSION === 'true';
const namespace = (process.env.FIRESTORE_NAMESPACE || 'apps/dcc').replace(/^\/+|\/+$/g, '');
const dateArgument = process.argv.find((argument) => argument.startsWith('--date='));
const targetDate = dateArgument?.slice('--date='.length) || '';

if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) {
  throw new Error('Pass an instructional date as --date=YYYY-MM-DD.');
}

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const loadProjectId = () => {
  const firebasercPath = join(root, '.firebaserc');

  if (!existsSync(firebasercPath)) {
    return undefined;
  }

  return readJson(firebasercPath).projects?.default;
};

const calendars = readJson(
  join(root, 'curriculum', 'website-data', 'blockLessonCalendars.seed.json'),
);
const classSeeds = readJson(join(root, 'curriculum', 'website-data', 'classes.seed.json'));
const scheduledDays = calendars.flatMap((calendar) =>
  calendar.months.flatMap((month) =>
    month.weeks.flatMap((week) =>
      week.days
        .filter((day) => day.date === targetDate && day.status === 'instructional')
        .map((day) => ({ ...day, schoolYear: calendar.schoolYear })),
    ),
  ),
);

if (scheduledDays.length !== 1) {
  throw new Error(
    `Expected exactly one instructional mission for ${targetDate}; found ${scheduledDays.length}.`,
  );
}

const scheduledDay = scheduledDays[0];
const expectedActiveItem = {
  activeProgramAreaId: scheduledDay.programAreaId,
  activeItemType: scheduledDay.activeItemType,
  activeItemId: scheduledDay.lessonId,
};
const projectId =
  process.env.FIREBASE_PROJECT_ID ||
  process.env.GOOGLE_CLOUD_PROJECT ||
  process.env.GCLOUD_PROJECT ||
  loadProjectId();

initializeApp({ credential: applicationDefault(), projectId });
const db = getFirestore();
const classCollection = db.collection(`${namespace}/classes`);
const activeItemCollection = db.collection(`${namespace}/${scheduledDay.activeItemType}s`);
const activeItemSnapshot = await activeItemCollection.doc(scheduledDay.lessonId).get();

if (!activeItemSnapshot.exists) {
  throw new Error(
    `Refusing to publish missing ${scheduledDay.activeItemType} ${scheduledDay.lessonId}.`,
  );
}

const classCycleFromPeriod = (period) => {
  const match = String(period ?? '')
    .trim()
    .toUpperCase()
    .match(/^([AB])\s*\d+$/);

  return match?.[1] || null;
};
const targetClasses = classSeeds.filter(
  (classRecord) =>
    classRecord.schoolYear === scheduledDay.schoolYear &&
    classCycleFromPeriod(classRecord.period) === scheduledDay.cycleDay,
);

if (!targetClasses.length) {
  throw new Error(
    `No seeded ${scheduledDay.cycleDay}-day classes found for school year ${scheduledDay.schoolYear}.`,
  );
}

let changed = 0;
let skipped = 0;

console.log(
  `${targetDate}: ${scheduledDay.lessonId} / ${scheduledDay.lessonTitle} (${scheduledDay.cycleDay} Day)`,
);

for (const classRecord of targetClasses) {
  const classRef = classCollection.doc(classRecord.id);
  const classSnapshot = await classRef.get();

  if (!classSnapshot.exists) {
    throw new Error(`Refusing to create partial class ${classRecord.id}; the live class does not exist.`);
  }

  const current = classSnapshot.data();
  const matches = Object.entries(expectedActiveItem).every(([key, value]) => current?.[key] === value);
  const label = `${classRecord.id} (${current?.name || classRecord.name} / ${current?.period || classRecord.period})`;

  if (matches) {
    skipped += 1;
    console.log(`unchanged ${label}`);
    continue;
  }

  if (!confirmPublish) {
    changed += 1;
    console.log(`would update ${label}: ${current?.activeItemId || 'none'} -> ${scheduledDay.lessonId}`);
    continue;
  }

  await classRef.update({
    ...expectedActiveItem,
    updatedAt: FieldValue.serverTimestamp(),
  });
  const readBack = (await classRef.get()).data();
  const verified = Object.entries(expectedActiveItem).every(([key, value]) => readBack?.[key] === value);

  if (!verified) {
    throw new Error(`Read-back verification failed for ${classRecord.id}.`);
  }

  changed += 1;
  console.log(`updated ${label}: ${scheduledDay.lessonId}`);
}

console.log(
  `${confirmPublish ? 'Publish' : 'Dry run'} complete. changed=${changed} skipped=${skipped} failed=0`,
);

if (!confirmPublish && changed > 0) {
  console.log('Set CONFIRM_ACTIVE_MISSION=true to publish these shared class active-item fields.');
}
