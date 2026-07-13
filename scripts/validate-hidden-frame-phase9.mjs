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
  'src/hidden-frame/components/FinalExportPanel.tsx',
  'src/hidden-frame/components/Frame000Reveal.tsx',
  'src/hidden-frame/data/hiddenFrameFinalExport.ts',
  'src/hidden-frame/pages/HiddenFrameFinalExportPage.tsx',
  'src/hidden-frame/pages/HiddenFrameFrame000Page.tsx',
];

for (const relativePath of requiredFiles) {
  assert(existsSync(path.join(repoRoot, relativePath)), `Missing ${relativePath}`);
}

const appSource = readProjectFile('src/App.tsx');
for (const route of ['/hidden-frame/final-export', '/hidden-frame/frame-000']) {
  assert(appSource.includes(`path="${route}"`), `Missing ${route} route.`);
}

const finalDataSource = readProjectFile('src/hidden-frame/data/hiddenFrameFinalExport.ts');
assert(finalDataSource.includes("HIDDEN_FRAME_FINAL_FRAME_ID = 'frame-000'"), 'Missing final frame id.');
for (const frameId of ['frame-001', 'frame-008', 'frame-014', 'frame-017']) {
  assert(finalDataSource.includes(frameId), `Final prerequisite set is missing ${frameId}.`);
}
assert(
  finalDataSource.includes('canRevealFinalFrame'),
  'Final export status does not expose canRevealFinalFrame.',
);

const frameDataSource = readProjectFile('src/hidden-frame/data/hiddenFrameFrames.ts');
assert(frameDataSource.includes("id: 'frame-000'"), 'Frame 000 is missing from frame data.');
assert(frameDataSource.includes('FINAL EXPORT'), 'Frame 000 title/signal is missing.');

const progressSource = readProjectFile('src/hidden-frame/progress/hiddenFrameProgress.ts');
assert(
  progressSource.includes('markHiddenFrameFrameRecovered'),
  'Missing markHiddenFrameFrameRecovered progress helper.',
);

const frame000PageSource = readProjectFile('src/hidden-frame/pages/HiddenFrameFrame000Page.tsx');
assert(
  frame000PageSource.includes('recoverFrame') &&
    frame000PageSource.includes('HIDDEN_FRAME_FINAL_FRAME_ID'),
  'Frame 000 page does not recover the final frame locally.',
);

const revealSource = readProjectFile('src/hidden-frame/components/Frame000Reveal.tsx');
for (const phrase of [
  'first frame was never missing',
  'human choice',
  'Tools render the image',
]) {
  assert(revealSource.includes(phrase), `Frame 000 reveal is missing phrase: ${phrase}.`);
}

const cssSource = readProjectFile('src/styles/hidden-frame.css');
for (const className of ['hidden-frame-final-export-panel', 'hidden-frame-frame-000-reveal']) {
  assert(cssSource.includes(className), `Missing CSS for ${className}.`);
}

if (failures.length > 0) {
  console.error('Hidden Frame Phase 9 validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Hidden Frame Phase 9 validation passed.');
