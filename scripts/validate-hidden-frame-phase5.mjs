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
  'src/hidden-frame/components/UnrealClueCard.tsx',
  'src/hidden-frame/components/UnrealSignalGrid.tsx',
  'src/hidden-frame/components/UnrealViewportReadout.tsx',
  'src/hidden-frame/data/hiddenFrameUnrealClues.ts',
  'src/hidden-frame/pages/HiddenFrameRenderRoomPage.tsx',
  'src/hidden-frame/pages/HiddenFrameUnrealPage.tsx',
];

for (const relativePath of requiredFiles) {
  assert(existsSync(path.join(repoRoot, relativePath)), `Missing ${relativePath}`);
}

const appSource = readProjectFile('src/App.tsx');
for (const route of ['/hidden-frame/render-room', '/hidden-frame/unreal']) {
  assert(appSource.includes(`path="${route}"`), `Missing ${route} route.`);
}
assert(appSource.includes('HiddenFrameRenderRoomPage'), 'App route does not import Render Room page.');
assert(appSource.includes('HiddenFrameUnrealPage'), 'App route does not import Unreal page.');

const fileDataSource = readProjectFile('src/hidden-frame/data/hiddenFrameFiles.ts');
assert(
  fileDataSource.includes("unlocksFileId: '012'"),
  'File 011 does not unlock File 012.',
);

const expectedUnrealFiles = [
  ['012', 'The Coordinate That Stayed', 'VECTOR', 'frame-012', '013'],
  ['013', 'Blueprint Without Wires', 'BLUEPRINT', 'frame-013', '014'],
  ['014', 'The Room That Knows You Entered', 'TRIGGER', 'frame-014', undefined],
];

for (const [id, title, password, rewardFrameId, unlockTarget] of expectedUnrealFiles) {
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

assert(fileDataSource.includes('hiddenFrameUnrealFiles'), 'Missing Unreal file group export.');

const frameDataSource = readProjectFile('src/hidden-frame/data/hiddenFrameFrames.ts');
for (const frameId of ['frame-012', 'frame-013', 'frame-014']) {
  assert(frameDataSource.includes(`id: '${frameId}'`), `${frameId} is missing.`);
}

const unrealDataSource = readProjectFile('src/hidden-frame/data/hiddenFrameUnrealClues.ts');
for (const concept of [
  'coordinate',
  'rotation',
  'scale',
  'lighting',
  'material',
  'blueprint',
  'trigger-volume',
  'collision',
  'camera-perspective',
]) {
  assert(unrealDataSource.includes(concept), `Unreal clue data is missing ${concept}.`);
}

const renderRoomPageSource = readProjectFile('src/hidden-frame/pages/HiddenFrameRenderRoomPage.tsx');
assert(
  renderRoomPageSource.includes('optional and ungraded') &&
    renderRoomPageSource.includes('leaving DCC Creative Studio'),
  'Render Room page does not include contained-safety copy.',
);

const unrealPageSource = readProjectFile('src/hidden-frame/pages/HiddenFrameUnrealPage.tsx');
assert(
  unrealPageSource.includes('not software instructions') &&
    unrealPageSource.includes('bypass security'),
  'Unreal page does not include safe-scope copy.',
);

const cssSource = readProjectFile('src/styles/hidden-frame.css');
for (const className of [
  'hidden-frame-render-room-shell',
  'hidden-frame-unreal-grid',
  'hidden-frame-unreal-card',
  'hidden-frame-unreal-readout',
]) {
  assert(cssSource.includes(className), `Missing CSS for ${className}.`);
}

if (failures.length > 0) {
  console.error('Hidden Frame Phase 5 validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Hidden Frame Phase 5 validation passed.');
