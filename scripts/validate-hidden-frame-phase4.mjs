import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
  'src/hidden-frame/components/CameraClueCard.tsx',
  'src/hidden-frame/components/CameraClueGrid.tsx',
  'src/hidden-frame/components/CompositionGuideFrame.tsx',
  'src/hidden-frame/data/hiddenFrameCameraClues.ts',
  'src/hidden-frame/pages/HiddenFrameCameraPage.tsx',
];

for (const relativePath of requiredFiles) {
  assert(existsSync(path.join(repoRoot, relativePath)), `Missing ${relativePath}`);
}

const appSource = readProjectFile('src/App.tsx');
assert(appSource.includes('HiddenFrameCameraPage'), 'App route does not import camera page.');
assert(appSource.includes('path="/hidden-frame/camera"'), 'Missing /hidden-frame/camera route.');

const fileDataSource = readProjectFile('src/hidden-frame/data/hiddenFrameFiles.ts');
const expectedCameraFiles = [
  ['009', 'The Third Line', 'THIRDS', 'frame-009', '010'],
  ['010', 'The Line That Leads', 'LEADING LINES', 'frame-010', '011'],
  ['011', 'The Space Ahead', 'LOOK SPACE', 'frame-011', undefined],
];

for (const [id, title, password, rewardFrameId, unlockTarget] of expectedCameraFiles) {
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
for (const frameId of ['frame-009', 'frame-010', 'frame-011']) {
  assert(frameDataSource.includes(`id: '${frameId}'`), `${frameId} is missing.`);
}

const cameraDataSource = readProjectFile('src/hidden-frame/data/hiddenFrameCameraClues.ts');
for (const principle of [
  'rule-of-thirds',
  'leading-lines',
  'symmetry',
  'headroom',
  'look-space',
  'repetition',
  'central-framing',
]) {
  assert(cameraDataSource.includes(principle), `Camera clue data is missing ${principle}.`);
}

const cameraPageSource = readProjectFile('src/hidden-frame/pages/HiddenFrameCameraPage.tsx');
assert(
  cameraPageSource.includes('optional, ungraded') &&
    cameraPageSource.includes('contained inside the DCC website'),
  'Camera page does not include contained-safety copy.',
);

const cssSource = readProjectFile('src/styles/hidden-frame.css');
for (const className of [
  'hidden-frame-camera-grid',
  'hidden-frame-composition-frame--rule-of-thirds',
  'hidden-frame-composition-frame--leading-lines',
  'hidden-frame-composition-frame--look-space',
]) {
  assert(cssSource.includes(className), `Missing CSS for ${className}.`);
}

if (failures.length > 0) {
  console.error('Hidden Frame Phase 4 validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Hidden Frame Phase 4 validation passed.');
