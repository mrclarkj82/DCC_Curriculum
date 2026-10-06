import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'));
const plan = readJson('curriculum/source/davinci-resolve-foundations-plan.json');
const lessons = readJson('curriculum/website-data/lessons.seed.json');
const assignments = readJson('curriculum/website-data/assignments.seed.json');
const projectId = readJson('.firebaserc').projects.default;
const publish =
  process.env.CONFIRM_DAVINCI_FOUNDATIONS === 'true' && !process.argv.includes('--dry-run');
const assignmentFields = [
  'instructions',
  'requiredSteps',
  'evidenceRequired',
  'reflectionPrompt',
  'extensionChallenge',
  'resources',
  'rubric',
  'submissionType',
];

const expectedIds = Array.from(
  { length: 11 },
  (_, i) => `vp-q2-l${String(i + 1).padStart(2, '0')}`,
);
if (
  plan.lessons.length !== 11 ||
  expectedIds.some((id) => !plan.lessons.some((item) => item.id === id)) ||
  plan.videoId !== 'MCDVcQIA3UM'
) {
  throw new Error('Refusing to publish an unexpected DaVinci foundations scope.');
}
initializeApp({ credential: applicationDefault(), projectId });
const db = getFirestore();
const targets = plan.lessons.flatMap((item) => {
  const lesson = lessons.find((record) => record.id === item.id);
  const assignment = assignments.find((record) => record.id === item.assignmentId);
  if (
    !lesson ||
    !assignment ||
    lesson.assignment.id !== assignment.id ||
    assignment.lessonId !== lesson.id
  ) {
    throw new Error(`Missing or mismatched foundations records for ${item.id}`);
  }
  return [
    {
      type: 'lessons',
      id: lesson.id,
      record: lesson,
      fields: ['video', 'assignment', 'lessonNumber'],
      allowCreate: Boolean(item.lesson),
    },
    {
      type: 'assignments',
      id: assignment.id,
      record: assignment,
      fields: assignmentFields,
      allowCreate: Boolean(item.assignment),
    },
  ];
});
const refs = targets.map((target) => db.doc(`apps/dcc/${target.type}/${target.id}`));
const snapshots = await db.getAll(...refs);
const changes = [];
for (let index = 0; index < targets.length; index += 1) {
  const target = targets[index];
  const snapshot = snapshots[index];
  if (!snapshot.exists && !target.allowCreate)
    throw new Error(`Refusing to create a partial missing record: ${snapshot.ref.path}`);
  const current = snapshot.data() ?? {};
  const fields = snapshot.exists ? target.fields : Object.keys(target.record);
  const payload = Object.fromEntries(fields.map((field) => [field, target.record[field]]));
  if (snapshot.exists && target.type === 'lessons') {
    payload.video = { ...current.video, ...payload.video };
    payload.assignment = { ...current.assignment, ...payload.assignment };
  }
  const changedFields = fields.filter(
    (field) => !isDeepStrictEqual(current[field], payload[field]),
  );
  if (changedFields.length) {
    changes.push({ ref: snapshot.ref, payload, fields, create: !snapshot.exists });
    console.log(
      `${publish ? '' : 'would '}${snapshot.exists ? 'update' : 'create'} ${snapshot.ref.path}: ${changedFields.join(', ')}`,
    );
  }
}
if (publish && changes.length) {
  const batch = db.batch();
  for (const change of changes) batch.set(change.ref, change.payload, { merge: true });
  await batch.commit();
  const verified = await db.getAll(...changes.map((change) => change.ref));
  for (let index = 0; index < verified.length; index += 1) {
    const actual = verified[index].data();
    for (const field of changes[index].fields) {
      if (!isDeepStrictEqual(actual?.[field], changes[index].payload[field])) {
        throw new Error(`Read-back verification failed: ${verified[index].ref.path}/${field}`);
      }
    }
  }
}
console.log(
  `${publish ? 'Publish' : 'Dry run'} complete: changed=${changes.length} created=${changes.filter((x) => x.create).length} unchanged=${targets.length - changes.length} failed=0`,
);
if (!publish)
  console.log(
    'No writes. Set CONFIRM_DAVINCI_FOUNDATIONS=true to publish only these twenty-two DCC content records.',
  );
