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
  'docs/hidden-frame/asset-requests.md',
  'docs/hidden-frame/extension-guide.md',
  'src/hidden-frame/components/AssetRequestList.tsx',
  'src/hidden-frame/components/ExpansionChecklist.tsx',
  'src/hidden-frame/components/ExpansionSafetyPanel.tsx',
  'src/hidden-frame/data/hiddenFrameExpansionManifest.ts',
  'src/hidden-frame/pages/HiddenFrameExpansionPage.tsx',
];

for (const relativePath of requiredFiles) {
  assert(existsSync(path.join(repoRoot, relativePath)), `Missing ${relativePath}`);
}

const appSource = readProjectFile('src/App.tsx');
assert(
  appSource.includes("allowedRoles={['admin']}") &&
    appSource.includes('path="/hidden-frame/expansion"'),
  'Expansion route is missing or is not admin guarded.',
);

const manifestSource = readProjectFile('src/hidden-frame/data/hiddenFrameExpansionManifest.ts');
for (const extensionPath of [
  'hiddenFrameFiles.ts',
  'hiddenFrameFrames.ts',
  'hiddenFrameVideoClues.ts',
  'hiddenFrameCameraClues.ts',
  'hiddenFrameUnrealClues.ts',
  'hiddenFrameObjectClues.ts',
  'hiddenFrameCompressionLogs.ts',
  'hiddenFrameFinalExport.ts',
]) {
  assert(manifestSource.includes(extensionPath), `Missing expansion point for ${extensionPath}.`);
}
assert(
  !manifestSource.includes('passwordAnswer') && !manifestSource.includes('acceptedAnswers'),
  'Expansion manifest must not expose puzzle answers.',
);

const expansionPageSource = readProjectFile('src/hidden-frame/pages/HiddenFrameExpansionPage.tsx');
for (const safePhrase of [
  'does not display',
  'puzzle answers',
  'student progress',
  'submissions',
  'rosters',
  'private class data',
]) {
  assert(expansionPageSource.includes(safePhrase), `Expansion page is missing: ${safePhrase}`);
}

const guideSource = readProjectFile('docs/hidden-frame/extension-guide.md');
assert(
  guideSource.includes('Do not expose puzzle answers') &&
    guideSource.includes('Do not show student progress'),
  'Extension guide is missing safety rules.',
);

const assetRequestsSource = readProjectFile('docs/hidden-frame/asset-requests.md');
assert(
  assetRequestsSource.includes('asset-approved-video-stills') &&
    assetRequestsSource.includes('asset-object-detail-pack'),
  'Asset request tracking is incomplete.',
);

const cssSource = readProjectFile('src/styles/hidden-frame.css');
for (const className of [
  'hidden-frame-expansion-safety',
  'hidden-frame-expansion-grid',
  'hidden-frame-asset-request-list',
]) {
  assert(cssSource.includes(className), `Missing CSS for ${className}.`);
}

if (failures.length > 0) {
  console.error('Hidden Frame Phase 10 validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Hidden Frame Phase 10 validation passed.');
