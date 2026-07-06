import { existsSync, readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { applicationDefault, cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const root = process.cwd();
const dataDir = join(root, 'curriculum', 'website-data');
const dryRun = process.argv.includes('--dry-run');
const confirmSeed = process.env.CONFIRM_SEED === 'true';
const firestoreNamespace = (process.env.FIRESTORE_NAMESPACE || 'apps/dcc').replace(
  /^\/+|\/+$/g,
  '',
);

const readJson = async (fileName) => JSON.parse(await readFile(join(dataDir, fileName), 'utf8'));

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
      'No Application Default Credentials found. Run gcloud auth application-default login or set FIREBASE_SERVICE_ACCOUNT_PATH outside git.',
    );
  }

  initializeApp({
    credential: applicationDefault(),
    projectId,
  });
}

async function main() {
  const quizzes = await readJson('quizzes.seed.json');
  const answerKeys = await readJson('quizAnswerKeys.seed.json');

  for (const quiz of quizzes) {
    for (const question of quiz.questions ?? []) {
      if (question.correctAnswer !== undefined || question.explanation !== undefined) {
        throw new Error(`Public quiz ${quiz.id}/${question.id} still includes answer data.`);
      }
    }
  }

  console.log(
    `Quiz seed validation passed. quizzes=${quizzes.length} answerKeys=${answerKeys.length}`,
  );

  if (dryRun) {
    console.log('Dry run only. No Firestore writes were made.');
    return;
  }

  if (!confirmSeed) {
    throw new Error('Real Firestore writes require CONFIRM_SEED=true.');
  }

  await initializeAdminApp();
  const db = getFirestore();
  const batch = db.batch();

  for (const quiz of quizzes) {
    batch.set(db.doc(`${firestoreNamespace}/quizzes/${quiz.id}`), quiz);
  }

  for (const answerKey of answerKeys) {
    batch.set(db.doc(`${firestoreNamespace}/quizAnswerKeys/${answerKey.id}`), answerKey, {
      merge: true,
    });
  }

  await batch.commit();
  console.log('Quiz seed complete. Public quiz docs replaced and private answer keys updated.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
