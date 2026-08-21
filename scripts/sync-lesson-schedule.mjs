import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const root = process.cwd();
const dryRun = process.argv.includes('--dry-run');
const confirmSync = process.env.CONFIRM_SCHEDULE_SYNC === 'true';
const namespace = (process.env.FIRESTORE_NAMESPACE || 'apps/dcc').replace(/^\/+|\/+$/g, '');
const schedulePath = join(root, 'curriculum', 'website-data', 'lessonSchedule.seed.json');

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const loadProjectId = () => {
  const firebasercPath = join(root, '.firebaserc');
  return existsSync(firebasercPath) ? readJson(firebasercPath).projects?.default : undefined;
};
const matchesSeed = (liveRecord, seedRecord) =>
  Object.entries(seedRecord).every(([key, value]) =>
    JSON.stringify(liveRecord?.[key]) === JSON.stringify(value),
  );

const schedule = readJson(schedulePath);

if (!Array.isArray(schedule) || !schedule.length) {
  throw new Error('The aligned lesson schedule seed is empty or invalid.');
}

const ids = schedule.map((record) => record.id);

if (new Set(ids).size !== ids.length) {
  throw new Error('The aligned lesson schedule contains duplicate IDs.');
}

for (const record of schedule) {
  if (
    !record.id ||
    !record.lessonId ||
    !record.programAreaId ||
    !record.aDayDate ||
    !record.bDayDate ||
    record.activeItemType !== 'lesson'
  ) {
    throw new Error(`Invalid aligned schedule record ${record.id || '(missing id)'}.`);
  }
}

initializeApp({
  credential: applicationDefault(),
  projectId:
    process.env.FIREBASE_PROJECT_ID ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    process.env.GCLOUD_PROJECT ||
    loadProjectId(),
});

const db = getFirestore();
const collection = db.collection(`${namespace}/lessonSchedule`);
const comparisons = await Promise.all(
  schedule.map(async (record) => {
    const snapshot = await collection.doc(record.id).get();
    return {
      record,
      exists: snapshot.exists,
      matches: snapshot.exists && matchesSeed(snapshot.data(), record),
    };
  }),
);
const changes = comparisons.filter((comparison) => !comparison.matches);

console.log(
  `Aligned lesson schedule: total=${schedule.length} changed=${changes.length} unchanged=${schedule.length - changes.length}`,
);

for (const change of changes) {
  console.log(`${change.exists ? 'update' : 'create'} ${change.record.id}`);
}

if (dryRun) {
  console.log('Dry run only; no Firestore schedule records were changed.');
  process.exit(0);
}

if (!confirmSync) {
  throw new Error(
    'Real schedule writes require CONFIRM_SCHEDULE_SYNC=true. Run with --dry-run first.',
  );
}

if (changes.length) {
  const batch = db.batch();

  for (const change of changes) {
    batch.set(collection.doc(change.record.id), change.record, { merge: true });
  }

  await batch.commit();
}

const verification = await Promise.all(
  changes.map(async ({ record }) => {
    const snapshot = await collection.doc(record.id).get();
    return snapshot.exists && matchesSeed(snapshot.data(), record);
  }),
);

if (verification.some((verified) => !verified)) {
  throw new Error('Aligned lesson schedule read-back verification failed.');
}

console.log(`Schedule sync complete. changed=${changes.length} failed=0`);
