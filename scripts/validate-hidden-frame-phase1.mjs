import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const requiredFiles = [
  'src/App.tsx',
  'src/hidden-frame/components/HiddenFrameIcon.tsx',
  'src/hidden-frame/components/RecoveredFileCard.tsx',
  'src/hidden-frame/components/PasswordGate.tsx',
  'src/hidden-frame/components/HiddenFrameProgress.tsx',
  'src/hidden-frame/components/CompressionLog.tsx',
  'src/hidden-frame/data/hiddenFrameFiles.ts',
  'src/hidden-frame/hooks/useHiddenFrameProgress.ts',
  'src/hidden-frame/pages/HiddenFrameLandingPage.tsx',
  'src/hidden-frame/pages/HiddenFrameArchivePage.tsx',
  'src/hidden-frame/pages/HiddenFrameFilePage.tsx',
  'src/hidden-frame/progress/hiddenFrameProgress.ts',
  'src/hidden-frame/utils/passwordGate.ts',
  'src/pages/AssignmentDetailPage.tsx',
  'src/styles/hidden-frame.css',
];

const failures = [];

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function readProjectFile(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

for (const relativePath of requiredFiles) {
  assert(existsSync(path.join(repoRoot, relativePath)), `Missing ${relativePath}`);
}

const appSource = readProjectFile('src/App.tsx');
for (const route of ['/hidden-frame', '/hidden-frame/archive', '/hidden-frame/file/001']) {
  assert(appSource.includes(`path="${route}"`), `Missing route ${route}`);
}

const assignmentSource = readProjectFile('src/pages/AssignmentDetailPage.tsx');
assert(
  assignmentSource.includes('<HiddenFrameIcon />'),
  'Assignment detail page does not include the first HiddenFrameIcon placement.',
);

const fileDataSource = readProjectFile('src/hidden-frame/data/hiddenFrameFiles.ts');
assert(fileDataSource.includes("id: '001'"), 'File 001 is missing from hiddenFrameFiles.');
assert(
  fileDataSource.includes("title: 'The Edge of the Page'"),
  'File 001 title is not defined as expected.',
);
assert(fileDataSource.includes("state: 'available'"), 'No available recovered file state found.');
assert(fileDataSource.includes("state: 'locked'"), 'No locked recovered file state found.');
assert(fileDataSource.includes("passwordAnswer: 'LUMEN'"), 'Phase 1 password is not LUMEN.');

const cardSource = readProjectFile('src/hidden-frame/components/RecoveredFileCard.tsx');
for (const state of ['locked', 'available', 'unlocked', 'completed']) {
  assert(cardSource.includes(state), `RecoveredFileCard does not include ${state} state support.`);
}

const archiveSource = readProjectFile('src/hidden-frame/pages/HiddenFrameArchivePage.tsx');
assert(
  archiveSource.includes('<RecoveredFileCard'),
  'Archive page does not render RecoveredFileCard components.',
);

const passwordUtilsPath = path.join(repoRoot, 'src/hidden-frame/utils/passwordGate.ts');
const { isHiddenFrameAnswerCorrect } = await import(pathToFileURL(passwordUtilsPath).href);

assert(
  isHiddenFrameAnswerCorrect('  lumen ', 'LUMEN'),
  'Password utility does not accept trimmed, case-insensitive LUMEN.',
);
assert(
  !isHiddenFrameAnswerCorrect('render', 'LUMEN'),
  'Password utility accepts an incorrect answer.',
);

if (failures.length > 0) {
  console.error('Hidden Frame Phase 1 validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Hidden Frame Phase 1 validation passed.');
