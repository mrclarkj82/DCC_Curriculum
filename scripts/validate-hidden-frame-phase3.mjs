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
  'src/hidden-frame/components/LowerThirdClueCard.tsx',
  'src/hidden-frame/components/TimelineClueCard.tsx',
  'src/hidden-frame/components/TimelineTrack.tsx',
  'src/hidden-frame/components/VideoStillClueCard.tsx',
  'src/hidden-frame/data/hiddenFrameVideoClues.ts',
  'src/hidden-frame/pages/HiddenFrameTimelinePage.tsx',
];

for (const relativePath of requiredFiles) {
  assert(existsSync(path.join(repoRoot, relativePath)), `Missing ${relativePath}`);
}

const appSource = readProjectFile('src/App.tsx');
assert(appSource.includes('HiddenFrameTimelinePage'), 'App route does not import timeline page.');
assert(appSource.includes('path="/hidden-frame/timeline"'), 'Missing /hidden-frame/timeline route.');

const fileDataSource = readProjectFile('src/hidden-frame/data/hiddenFrameFiles.ts');
const expectedVideoFiles = [
  ['006', 'The Timecode Drift', 'TIMECODE', 'frame-006', '007'],
  ['007', 'The Name Beneath the Frame', 'LOWER THIRD', 'frame-007', '008'],
  ['008', 'The Sound Before the Cut', 'BRIDGE', 'frame-008', undefined],
];

for (const [id, title, password, rewardFrameId, unlockTarget] of expectedVideoFiles) {
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
for (const frameId of ['frame-006', 'frame-007', 'frame-008']) {
  assert(frameDataSource.includes(`id: '${frameId}'`), `${frameId} is missing.`);
}

const videoDataSource = readProjectFile('src/hidden-frame/data/hiddenFrameVideoClues.ts');
for (const term of [
  'timecode',
  'lower-third',
  'sound-bridge',
  'approvedVideoReference',
  '00:00:06:12',
]) {
  assert(videoDataSource.includes(term), `Video clue data does not include ${term}.`);
}

const timelinePageSource = readProjectFile('src/hidden-frame/pages/HiddenFrameTimelinePage.tsx');
assert(
  timelinePageSource.includes('It does not ask students to leave the DCC website'),
  'Timeline page does not include contained-safety copy.',
);

const progressCorePath = path.join(
  repoRoot,
  'src/hidden-frame/progress/hiddenFrameProgressCore.ts',
);
const { completeHiddenFrameFileProgress } = await import(pathToFileURL(progressCorePath).href);

const firstChainFiles = [
  { id: '001', state: 'available', unlocksFileId: '002', rewardFrameId: 'frame-001' },
  { id: '002', state: 'locked', prerequisiteFileId: '001', unlocksFileId: '003', rewardFrameId: 'frame-002' },
  { id: '003', state: 'locked', prerequisiteFileId: '002', unlocksFileId: '004', rewardFrameId: 'frame-003' },
  { id: '004', state: 'locked', prerequisiteFileId: '003', unlocksFileId: '005', rewardFrameId: 'frame-004' },
  { id: '005', state: 'locked', prerequisiteFileId: '004', unlocksFileId: '006', rewardFrameId: 'frame-005' },
];
const allFiles = [
  ...firstChainFiles,
  { id: '006', state: 'locked', prerequisiteFileId: '005', unlocksFileId: '007', rewardFrameId: 'frame-006' },
];
let progress = {
  unlockedFileIds: ['001'],
  completedFileIds: [],
  recoveredFrameIds: [],
  chainCompletedAt: null,
};

for (const file of firstChainFiles) {
  progress = completeHiddenFrameFileProgress(
    progress,
    file.id,
    allFiles,
    '2026-07-13T00:00:00.000Z',
    firstChainFiles,
  );
}

assert(progress.chainCompletedAt, 'Completing Files 001-005 did not complete the first chain.');
assert(progress.unlockedFileIds.includes('006'), 'Completing File 005 did not unlock File 006.');

if (failures.length > 0) {
  console.error('Hidden Frame Phase 3 validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Hidden Frame Phase 3 validation passed.');
