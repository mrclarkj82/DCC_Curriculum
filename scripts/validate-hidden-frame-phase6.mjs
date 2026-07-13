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
  'src/hidden-frame/components/ObjectClueCard.tsx',
  'src/hidden-frame/components/ObjectClueGrid.tsx',
  'src/hidden-frame/components/ObjectInspectionFrame.tsx',
  'src/hidden-frame/data/hiddenFrameObjectClues.ts',
  'src/hidden-frame/pages/HiddenFrameObjectsPage.tsx',
];

for (const relativePath of requiredFiles) {
  assert(existsSync(path.join(repoRoot, relativePath)), `Missing ${relativePath}`);
}

const appSource = readProjectFile('src/App.tsx');
assert(appSource.includes('HiddenFrameObjectsPage'), 'App route does not import objects page.');
assert(appSource.includes('path="/hidden-frame/objects"'), 'Missing /hidden-frame/objects route.');

const fileDataSource = readProjectFile('src/hidden-frame/data/hiddenFrameFiles.ts');
assert(
  fileDataSource.includes("unlocksFileId: '015'"),
  'File 014 does not unlock File 015.',
);

const expectedObjectFiles = [
  ['015', 'The Name on the Mesh', 'MESH', 'frame-015', '016'],
  ['016', 'The Folded Surface', 'UV MAP', 'frame-016', '017'],
  ['017', 'The Shadow Under the Model', 'SHADOW', 'frame-017', undefined],
];

for (const [id, title, password, rewardFrameId, unlockTarget] of expectedObjectFiles) {
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

assert(fileDataSource.includes('hiddenFrameObjectFiles'), 'Missing object file group export.');

const frameDataSource = readProjectFile('src/hidden-frame/data/hiddenFrameFrames.ts');
for (const frameId of ['frame-015', 'frame-016', 'frame-017']) {
  assert(frameDataSource.includes(`id: '${frameId}'`), `${frameId} is missing.`);
}

const objectDataSource = readProjectFile('src/hidden-frame/data/hiddenFrameObjectClues.ts');
for (const concept of [
  'object-name',
  'model-detail',
  'material',
  'uv-map',
  'shadow',
  'scale',
  'camera-view',
  'engraved-text',
]) {
  assert(objectDataSource.includes(concept), `Object clue data is missing ${concept}.`);
}

const objectsPageSource = readProjectFile('src/hidden-frame/pages/HiddenFrameObjectsPage.tsx');
assert(
  objectsPageSource.includes('observation clues only') &&
    objectsPageSource.includes('leave DCC Creative Studio'),
  'Objects page does not include safe-scope copy.',
);

const cssSource = readProjectFile('src/styles/hidden-frame.css');
for (const className of [
  'hidden-frame-object-grid',
  'hidden-frame-object-card',
  'hidden-frame-object-inspection',
  'hidden-frame-object-inspection--uv-map',
  'hidden-frame-object-inspection--shadow',
]) {
  assert(cssSource.includes(className), `Missing CSS for ${className}.`);
}

if (failures.length > 0) {
  console.error('Hidden Frame Phase 6 validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Hidden Frame Phase 6 validation passed.');
