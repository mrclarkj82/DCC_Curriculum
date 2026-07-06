import { existsSync, readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { applicationDefault, cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const root = process.cwd();
const dataDir = join(root, 'curriculum', 'website-data');
const calendarDir = join(root, 'curriculum', 'calendar');
const dryRun = process.argv.includes('--dry-run');
const confirmSeed = process.env.CONFIRM_SEED === 'true';
const firestoreNamespace = (process.env.FIRESTORE_NAMESPACE || 'apps/dcc').replace(
  /^\/+|\/+$/g,
  '',
);
const namespacedCollection = (collectionName) => `${firestoreNamespace}/${collectionName}`;

const seedTargets = [
  ['programAreas.seed.json', 'programAreas'],
  ['lessons.seed.json', 'lessons'],
  ['assignments.seed.json', 'assignments'],
  ['quizzes.seed.json', 'quizzes'],
  ['quizAnswerKeys.seed.json', 'quizAnswerKeys'],
  ['mediaProjects.seed.json', 'mediaProjects'],
  ['broadcastUpdates.seed.json', 'broadcastUpdates'],
  ['classes.seed.json', 'classes'],
  ['lessonSchedule.seed.json', 'lessonSchedule'],
];

const activeItemTypes = new Set([
  'lesson',
  'assignment',
  'mediaProject',
  'broadcastUpdate',
  'quiz',
  'portfolioCheckpoint',
]);

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

async function readJson(fileName) {
  const filePath = join(dataDir, fileName);
  const parsed = JSON.parse(await readFile(filePath, 'utf8'));

  assert(Array.isArray(parsed), `${fileName} must contain a JSON array`);

  return parsed;
}

async function readCalendarJson(fileName) {
  const filePath = join(calendarDir, fileName);
  return JSON.parse(await readFile(filePath, 'utf8'));
}

function assertUniqueIds(label, records) {
  const ids = records.map((record) => record.id);
  assert(new Set(ids).size === ids.length, `${label} contains duplicate IDs`);
}

function assertProgramAreaIds(label, records, programAreaIds) {
  for (const record of records) {
    assert(record.programAreaId, `${label}/${record.id} is missing programAreaId`);
    assert(
      programAreaIds.has(record.programAreaId),
      `${label}/${record.id} uses unknown programAreaId ${record.programAreaId}`,
    );
  }
}

function parseDate(value) {
  const parsed = new Date(`${value}T00:00:00Z`);
  assert(!Number.isNaN(parsed.getTime()), `Invalid date ${value}`);
  return parsed;
}

function isWeekend(value) {
  const day = parseDate(value).getUTCDay();
  return day === 0 || day === 6;
}

function loadProjectIdFromFirebaserc() {
  const firebasercPath = join(root, '.firebaserc');

  if (!existsSync(firebasercPath)) {
    return undefined;
  }

  try {
    const firebaserc = JSON.parse(readFileSync(firebasercPath, 'utf8'));
    return firebaserc.projects?.default;
  } catch {
    return undefined;
  }
}

function hasApplicationDefaultCredentials() {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return true;
  }

  const possibleCredentialPaths = [
    process.env.APPDATA
      ? join(process.env.APPDATA, 'gcloud', 'application_default_credentials.json')
      : '',
    process.env.HOME
      ? join(process.env.HOME, '.config', 'gcloud', 'application_default_credentials.json')
      : '',
    process.env.USERPROFILE
      ? join(process.env.USERPROFILE, '.config', 'gcloud', 'application_default_credentials.json')
      : '',
  ].filter(Boolean);

  return possibleCredentialPaths.some((credentialPath) => existsSync(credentialPath));
}

async function loadSeeds() {
  const data = {};

  for (const [fileName] of seedTargets) {
    data[fileName] = await readJson(fileName);
  }

  data['instructional-days.json'] = await readCalendarJson('instructional-days.json');

  return data;
}

function validateSeeds(data) {
  const programAreas = data['programAreas.seed.json'];
  const lessons = data['lessons.seed.json'];
  const assignments = data['assignments.seed.json'];
  const quizzes = data['quizzes.seed.json'];
  const quizAnswerKeys = data['quizAnswerKeys.seed.json'];
  const mediaProjects = data['mediaProjects.seed.json'];
  const broadcastUpdates = data['broadcastUpdates.seed.json'];
  const classes = data['classes.seed.json'];
  const lessonSchedule = data['lessonSchedule.seed.json'];
  const instructionalDays = data['instructional-days.json'];

  assertUniqueIds('programAreas', programAreas);
  assertUniqueIds('lessons', lessons);
  assertUniqueIds('assignments', assignments);
  assertUniqueIds('quizzes', quizzes);
  assertUniqueIds('quizAnswerKeys', quizAnswerKeys);
  assertUniqueIds('mediaProjects', mediaProjects);
  assertUniqueIds('broadcastUpdates', broadcastUpdates);
  assertUniqueIds('classes', classes);
  assertUniqueIds('lessonSchedule', lessonSchedule);

  const programAreaIds = new Set(programAreas.map((record) => record.id));
  const lessonIds = new Set(lessons.map((record) => record.id));
  const assignmentIds = new Set(assignments.map((record) => record.id));
  const quizIds = new Set(quizzes.map((record) => record.id));
  const mediaProjectIds = new Set(mediaProjects.map((record) => record.id));
  const broadcastUpdateIds = new Set(broadcastUpdates.map((record) => record.id));
  const instructionalDayByDate = new Map(
    instructionalDays.days.map((instructionalDay) => [instructionalDay.date, instructionalDay]),
  );

  assertProgramAreaIds('lessons', lessons, programAreaIds);
  assertProgramAreaIds('assignments', assignments, programAreaIds);
  assertProgramAreaIds('quizzes', quizzes, programAreaIds);
  assertProgramAreaIds('mediaProjects', mediaProjects, programAreaIds);
  assertProgramAreaIds('broadcastUpdates', broadcastUpdates, programAreaIds);

  for (const assignment of assignments) {
    if (assignment.lessonId) {
      assert(
        lessonIds.has(assignment.lessonId),
        `Assignment ${assignment.id} references missing lesson ${assignment.lessonId}`,
      );
    }
  }

  for (const quiz of quizzes) {
    for (const lessonId of quiz.lessonIds ?? []) {
      assert(lessonIds.has(lessonId), `Quiz ${quiz.id} references missing lesson ${lessonId}`);
    }

    for (const question of quiz.questions ?? []) {
      assert(
        question.correctAnswer === undefined,
        `Public quiz ${quiz.id}/${question.id} must not include correctAnswer`,
      );
      assert(
        question.explanation === undefined,
        `Public quiz ${quiz.id}/${question.id} must not include explanation`,
      );
    }
  }

  for (const answerKey of quizAnswerKeys) {
    assert(quizIds.has(answerKey.quizId), `Answer key ${answerKey.id} references missing quiz`);
    assert(
      answerKey.id === answerKey.quizId,
      `Answer key ${answerKey.id} must use the same document ID as quizId`,
    );
    assert(
      Array.isArray(answerKey.answers),
      `Answer key ${answerKey.id} must include an answers array`,
    );
  }

  for (const update of broadcastUpdates) {
    for (const projectId of update.relatedProjectIds ?? []) {
      assert(
        mediaProjectIds.has(projectId),
        `Broadcast update ${update.id} references missing media project ${projectId}`,
      );
    }
  }

  assert(
    Array.isArray(instructionalDays.days),
    'instructional-days.json must include a days array',
  );

  for (const instructionalDay of instructionalDays.days) {
    assert(instructionalDay.date, 'Instructional day record is missing date');
    assert(
      !isWeekend(instructionalDay.date) || instructionalDay.isInstructionalDay === false,
      `Weekend ${instructionalDay.date} must not be instructional`,
    );
  }

  const q1UnrealSchedule = lessonSchedule.filter(
    (item) => item.programAreaId === 'unreal-engine' && item.quarter === 'Q1',
  );
  const q1UnrealLessonNumbers = new Set(q1UnrealSchedule.map((item) => item.lessonNumber));

  for (let lessonNumber = 1; lessonNumber <= 16; lessonNumber += 1) {
    assert(
      q1UnrealLessonNumbers.has(lessonNumber),
      `Q1 Unreal lesson schedule is missing lesson ${lessonNumber}`,
    );
  }

  for (const scheduleItem of lessonSchedule) {
    assert(
      programAreaIds.has(scheduleItem.programAreaId),
      `Lesson schedule ${scheduleItem.id} uses unknown programAreaId ${scheduleItem.programAreaId}`,
    );
    assert(
      scheduleItem.activeItemType === 'lesson',
      `Lesson schedule ${scheduleItem.id} must use activeItemType lesson`,
    );
    assert(
      lessonIds.has(scheduleItem.lessonId),
      `Lesson schedule ${scheduleItem.id} references missing lesson ${scheduleItem.lessonId}`,
    );
    assert(scheduleItem.aDayDate, `Lesson schedule ${scheduleItem.id} is missing aDayDate`);
    assert(scheduleItem.bDayDate, `Lesson schedule ${scheduleItem.id} is missing bDayDate`);
    assert(
      scheduleItem.aDayCycle === 'A',
      `Lesson schedule ${scheduleItem.id} aDayCycle must be A`,
    );
    assert(
      scheduleItem.bDayCycle === 'B',
      `Lesson schedule ${scheduleItem.id} bDayCycle must be B`,
    );
    assert(
      !isWeekend(scheduleItem.aDayDate),
      `Lesson schedule ${scheduleItem.id} A day falls on a weekend`,
    );
    assert(
      !isWeekend(scheduleItem.bDayDate),
      `Lesson schedule ${scheduleItem.id} B day falls on a weekend`,
    );

    const aDay = instructionalDayByDate.get(scheduleItem.aDayDate);
    const bDay = instructionalDayByDate.get(scheduleItem.bDayDate);

    assert(aDay, `Lesson schedule ${scheduleItem.id} A day is not in instructional-days.json`);
    assert(bDay, `Lesson schedule ${scheduleItem.id} B day is not in instructional-days.json`);
    assert(aDay.isInstructionalDay, `Lesson schedule ${scheduleItem.id} A day is not instructional`);
    assert(bDay.isInstructionalDay, `Lesson schedule ${scheduleItem.id} B day is not instructional`);
    assert(
      aDay.cycleDay === 'A',
      `Lesson schedule ${scheduleItem.id} A day does not match cycle A`,
    );
    assert(
      bDay.cycleDay === 'B',
      `Lesson schedule ${scheduleItem.id} B day does not match cycle B`,
    );
  }

  const warnings = [];

  for (const classRecord of classes) {
    assert(
      programAreaIds.has(classRecord.activeProgramAreaId),
      `Class ${classRecord.id} uses unknown activeProgramAreaId ${classRecord.activeProgramAreaId}`,
    );
    assert(
      activeItemTypes.has(classRecord.activeItemType),
      `Class ${classRecord.id} uses unsupported activeItemType ${classRecord.activeItemType}`,
    );
    assert(classRecord.activeItemId, `Class ${classRecord.id} is missing activeItemId`);
    assert(
      Array.isArray(classRecord.teacherIds),
      `Class ${classRecord.id} teacherIds must be an array`,
    );
    assert(
      Array.isArray(classRecord.studentIds),
      `Class ${classRecord.id} studentIds must be an array`,
    );
    assert(
      classRecord.teacherIds.length === 0 && classRecord.studentIds.length === 0,
      `Class ${classRecord.id} seed record must not include teacherIds or studentIds`,
    );

    if (classRecord.activeItemType === 'lesson') {
      assert(
        lessonIds.has(classRecord.activeItemId),
        `Class ${classRecord.id} references missing lesson`,
      );
    }

    if (classRecord.activeItemType === 'assignment') {
      assert(
        assignmentIds.has(classRecord.activeItemId),
        `Class ${classRecord.id} references missing assignment`,
      );
    }

    if (classRecord.activeItemType === 'mediaProject') {
      assert(
        mediaProjectIds.has(classRecord.activeItemId),
        `Class ${classRecord.id} references missing media project`,
      );
    }

    if (classRecord.activeItemType === 'broadcastUpdate') {
      assert(
        broadcastUpdateIds.has(classRecord.activeItemId),
        `Class ${classRecord.id} references missing broadcast update`,
      );
    }

    if (classRecord.activeItemType === 'quiz') {
      assert(
        quizIds.has(classRecord.activeItemId),
        `Class ${classRecord.id} references missing quiz`,
      );
    }

    if (classRecord.activeItemType === 'portfolioCheckpoint') {
      warnings.push(
        `Class ${classRecord.id} points to portfolioCheckpoint ${classRecord.activeItemId}; placeholder validation only.`,
      );
    }
  }

  return warnings;
}

async function initializeAdminApp() {
  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    process.env.GCLOUD_PROJECT ||
    loadProjectIdFromFirebaserc();
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (serviceAccountPath) {
    const credentialPath = resolve(root, serviceAccountPath);
    const serviceAccount = JSON.parse(await readFile(credentialPath, 'utf8'));
    initializeApp({
      credential: cert(serviceAccount),
      projectId,
    });
    return;
  }

  if (!hasApplicationDefaultCredentials()) {
    throw new Error(
      'No Application Default Credentials found. For real seeding, run gcloud auth application-default login or set FIREBASE_SERVICE_ACCOUNT_PATH to a local service account JSON file stored outside git.',
    );
  }

  initializeApp({
    credential: applicationDefault(),
    projectId,
  });
}

async function writeSeeds(data) {
  await initializeAdminApp();
  const db = getFirestore();
  const totals = {
    created: 0,
    updated: 0,
    skipped: 0,
    failed: 0,
  };

  for (const [fileName, collectionName] of seedTargets) {
    console.log(`\n${collectionName}`);

    for (const record of data[fileName]) {
      try {
        const documentRef = db.collection(namespacedCollection(collectionName)).doc(record.id);
        const snapshot = await documentRef.get();

        if (collectionName === 'quizzes') {
          await documentRef.set(record);
        } else {
          await documentRef.set(record, { merge: true });
        }

        if (snapshot.exists) {
          totals.updated += 1;
          console.log(`  updated ${record.id}`);
        } else {
          totals.created += 1;
          console.log(`  created ${record.id}`);
        }
      } catch (error) {
        totals.failed += 1;
        console.error(
          `  failed ${record.id}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
  }

  return totals;
}

async function main() {
  const data = await loadSeeds();
  const warnings = validateSeeds(data);

  console.log('Curriculum seed validation passed.');
  for (const warning of warnings) {
    console.warn(`Warning: ${warning}`);
  }

  if (dryRun) {
    const skipped = seedTargets.reduce((total, [fileName]) => total + data[fileName].length, 0);
    console.log(`Dry run only. skipped=${skipped} created=0 updated=0 failed=0`);
    return;
  }

  if (!confirmSeed) {
    throw new Error(
      'Real Firestore writes require CONFIRM_SEED=true. Run with --dry-run to validate only.',
    );
  }

  const totals = await writeSeeds(data);
  console.log(
    `\nSeed complete. created=${totals.created} updated=${totals.updated} skipped=${totals.skipped} failed=${totals.failed}`,
  );

  if (totals.failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
