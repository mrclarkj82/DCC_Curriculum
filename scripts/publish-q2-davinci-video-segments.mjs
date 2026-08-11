import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const root = process.cwd();
const confirmPublish = process.env.CONFIRM_Q2_VIDEO_SEGMENTS === 'true';
const namespace = (process.env.FIRESTORE_NAMESPACE || 'apps/dcc').replace(/^\/+|\/+$/g, '');
const lessonIds = [
  'vp-q2-l01',
  'vp-q2-l02',
  'vp-q2-l03',
  'vp-q2-l04',
  'vp-q2-l05',
  'vp-q2-l06',
  'vp-q2-l07',
];

const loadProjectId = () => {
  const firebasercPath = join(root, '.firebaserc');

  if (!existsSync(firebasercPath)) {
    return undefined;
  }

  const firebaserc = JSON.parse(readFileSync(firebasercPath, 'utf8'));
  return firebaserc.projects?.default;
};

const projectId =
  process.env.FIREBASE_PROJECT_ID ||
  process.env.GOOGLE_CLOUD_PROJECT ||
  process.env.GCLOUD_PROJECT ||
  loadProjectId();
const seedLessons = JSON.parse(
  readFileSync(join(root, 'curriculum', 'website-data', 'lessons.seed.json'), 'utf8'),
);
const expectedLessons = new Map(
  seedLessons.filter((lesson) => lessonIds.includes(lesson.id)).map((lesson) => [lesson.id, lesson]),
);
const videosMatch = (actual, expected) =>
  actual?.url === expected.url && actual?.start === expected.start && actual?.end === expected.end;

if (expectedLessons.size !== lessonIds.length) {
  throw new Error('The lesson seed is missing one or more Q2 DaVinci lessons.');
}

initializeApp({ credential: applicationDefault(), projectId });
const db = getFirestore();
const lessonCollection = db.collection(`${namespace}/lessons`);
let changed = 0;
let skipped = 0;

for (const lessonId of lessonIds) {
  const expectedVideo = expectedLessons.get(lessonId).video;
  const lessonRef = lessonCollection.doc(lessonId);
  const currentSnapshot = await lessonRef.get();

  if (!currentSnapshot.exists) {
    throw new Error(`Refusing to create partial lesson ${lessonId}; the live lesson does not exist.`);
  }

  const currentVideo = currentSnapshot.data()?.video;
  const matches = videosMatch(currentVideo, expectedVideo);

  if (matches) {
    skipped += 1;
    console.log(`unchanged ${lessonId}`);
    continue;
  }

  if (!confirmPublish) {
    changed += 1;
    console.log(`would update ${lessonId}`);
    continue;
  }

  await lessonRef.set({ video: expectedVideo }, { merge: true });
  const readBack = (await lessonRef.get()).data()?.video;

  if (!videosMatch(readBack, expectedVideo)) {
    throw new Error(`Read-back verification failed for ${lessonId}`);
  }

  changed += 1;
  console.log(`updated ${lessonId}`);
}

console.log(
  `${confirmPublish ? 'Publish' : 'Dry run'} complete. changed=${changed} skipped=${skipped} failed=0`,
);

if (!confirmPublish && changed > 0) {
  console.log('Set CONFIRM_Q2_VIDEO_SEGMENTS=true to publish only these seven video fields.');
}
