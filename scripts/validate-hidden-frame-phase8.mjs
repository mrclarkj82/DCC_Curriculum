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
  'src/hidden-frame/components/CompressionWarningPanel.tsx',
  'src/hidden-frame/components/CorruptedFileCard.tsx',
  'src/hidden-frame/components/GlitchText.tsx',
  'src/hidden-frame/components/RedactedText.tsx',
  'src/hidden-frame/data/hiddenFrameCompressionLogs.ts',
  'src/hidden-frame/pages/HiddenFrameCompressionPage.tsx',
];

for (const relativePath of requiredFiles) {
  assert(existsSync(path.join(repoRoot, relativePath)), `Missing ${relativePath}`);
}

const appSource = readProjectFile('src/App.tsx');
assert(
  appSource.includes('HiddenFrameCompressionPage'),
  'App route does not import compression page.',
);
assert(
  appSource.includes('path="/hidden-frame/compression"'),
  'Missing /hidden-frame/compression route.',
);

const compressionDataSource = readProjectFile('src/hidden-frame/data/hiddenFrameCompressionLogs.ts');
for (const tone of ['warning', 'redacted', 'template', 'corrupted']) {
  assert(compressionDataSource.includes(tone), `Compression data is missing ${tone}.`);
}
for (const safeTheme of ['creative choice', 'generic output', 'template', 'human decision']) {
  assert(
    compressionDataSource.toLowerCase().includes(safeTheme),
    `Compression data is missing safe theme: ${safeTheme}.`,
  );
}

const compressionPageSource = readProjectFile('src/hidden-frame/pages/HiddenFrameCompressionPage.tsx');
assert(
  compressionPageSource.includes('not malware') &&
    compressionPageSource.includes('not') &&
    compressionPageSource.includes('real security breach') &&
    compressionPageSource.includes('not') &&
    compressionPageSource.includes('threat'),
  'Compression page does not clearly avoid real-threat language.',
);
assert(
  compressionPageSource.includes('hiddenFrameCompressionLogs.map'),
  'Compression page does not render logs from data.',
);

const cssSource = readProjectFile('src/styles/hidden-frame.css');
for (const className of [
  'hidden-frame-glitch-text',
  'hidden-frame-redacted-text',
  'hidden-frame-compression-warning',
  'hidden-frame-corrupted-card',
  'hidden-frame-corrupted-grid',
]) {
  assert(cssSource.includes(className), `Missing CSS for ${className}.`);
}

if (failures.length > 0) {
  console.error('Hidden Frame Phase 8 validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Hidden Frame Phase 8 validation passed.');
