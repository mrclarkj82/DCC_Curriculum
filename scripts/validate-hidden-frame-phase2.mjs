import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function readProjectFile(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

const requiredFiles = [
  'src/hidden-frame/components/FrameCard.tsx',
  'src/hidden-frame/components/FrameCollectionGrid.tsx',
  'src/hidden-frame/data/hiddenFrameFrames.ts',
  'src/hidden-frame/pages/HiddenFrameCollectionPage.tsx',
  'src/hidden-frame/progress/hiddenFrameProgressCore.ts',
];

for (const relativePath of requiredFiles) {
  assert(existsSync(path.join(repoRoot, relativePath)), `Missing ${relativePath}`);
}

const appSource = readProjectFile('src/App.tsx');
for (const route of [
  '/hidden-frame/collection',
  '/hidden-frame/file/001',
  '/hidden-frame/file/:fileId',
]) {
  assert(appSource.includes(`path="${route}"`), `Missing route ${route}`);
}

const fileDataSource = readProjectFile('src/hidden-frame/data/hiddenFrameFiles.ts');
const expectedFiles = [
  ['001', 'The Edge of the Page', 'LUMEN', 'frame-001', '002'],
  ['002', 'The First Cut', 'CUT', 'frame-002', '003'],
  ['003', 'The Cropped Student', 'BORDER', 'frame-003', '004'],
  ['004', 'Render Failed', 'RENDER', 'frame-004', '005'],
  ['005', 'The Door Facing Light', 'ROTATION', 'frame-005', undefined],
];

for (const [id, title, password, rewardFrameId, unlockTarget] of expectedFiles) {
  assert(fileDataSource.includes(`id: '${id}'`), `File ${id} is missing.`);
  assert(fileDataSource.includes(`title: '${title}'`), `File ${id} title is incorrect.`);
  assert(
    fileDataSource.includes(`passwordAnswer: '${password}'`),
    `File ${id} password is incorrect.`,
  );
  assert(
    fileDataSource.includes(`rewardFrameId: '${rewardFrameId}'`),
    `File ${id} reward frame is incorrect.`,
  );

  if (unlockTarget) {
    assert(
      fileDataSource.includes(`unlocksFileId: '${unlockTarget}'`),
      `File ${id} does not unlock File ${unlockTarget}.`,
    );
  }
}

const frameDataSource = readProjectFile('src/hidden-frame/data/hiddenFrameFrames.ts');
for (const frameId of ['frame-001', 'frame-002', 'frame-003', 'frame-004', 'frame-005']) {
  assert(frameDataSource.includes(`id: '${frameId}'`), `${frameId} is missing.`);
}

const passwordUtilsPath = path.join(repoRoot, 'src/hidden-frame/utils/passwordGate.ts');
const { isHiddenFrameAnswerCorrect } = await import(pathToFileURL(passwordUtilsPath).href);

assert(
  isHiddenFrameAnswerCorrect('  lumen ', 'LUMEN'),
  'Password utility does not accept trimmed, case-insensitive answers.',
);
assert(
  isHiddenFrameAnswerCorrect(' the cut ', 'CUT', ['THE CUT']),
  'Password utility does not accept answer variants.',
);
assert(
  !isHiddenFrameAnswerCorrect('render', 'LUMEN'),
  'Password utility accepts an incorrect answer.',
);

const progressCorePath = path.join(
  repoRoot,
  'src/hidden-frame/progress/hiddenFrameProgressCore.ts',
);
const {
  completeHiddenFrameFileProgress,
  getHiddenFrameFileProgressState,
} = await import(pathToFileURL(progressCorePath).href);

const testFiles = [
  { id: '001', state: 'available', unlocksFileId: '002', rewardFrameId: 'frame-001' },
  {
    id: '002',
    state: 'locked',
    prerequisiteFileId: '001',
    unlocksFileId: '003',
    rewardFrameId: 'frame-002',
  },
  {
    id: '003',
    state: 'locked',
    prerequisiteFileId: '002',
    rewardFrameId: 'frame-003',
  },
];
const initialProgress = {
  unlockedFileIds: ['001'],
  completedFileIds: [],
  recoveredFrameIds: [],
  chainCompletedAt: null,
};
const blockedProgress = completeHiddenFrameFileProgress(
  initialProgress,
  '002',
  testFiles,
  '2026-07-08T00:00:00.000Z',
);

assert(
  blockedProgress.completedFileIds.length === 0,
  'Locked File 002 can be completed before File 001.',
);

const afterFileOne = completeHiddenFrameFileProgress(
  initialProgress,
  '001',
  testFiles,
  '2026-07-08T00:00:00.000Z',
);

assert(afterFileOne.completedFileIds.includes('001'), 'File 001 was not marked completed.');
assert(afterFileOne.unlockedFileIds.includes('002'), 'Completing File 001 did not unlock File 002.');
assert(
  afterFileOne.recoveredFrameIds.includes('frame-001'),
  'Completing File 001 did not add Frame 001.',
);
assert(
  getHiddenFrameFileProgressState(testFiles[1], afterFileOne) === 'unlocked',
  'Archive state for File 002 is not unlocked after File 001 completion.',
);

const archiveSource = readProjectFile('src/hidden-frame/pages/HiddenFrameArchivePage.tsx');
assert(
  archiveSource.includes('getFileState(file)'),
  'Archive page does not render progress-derived file states.',
);

if (failures.length > 0) {
  console.error('Hidden Frame Phase 2 validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Hidden Frame Phase 2 validation passed.');
