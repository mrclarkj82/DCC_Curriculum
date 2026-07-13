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
  'src/hidden-frame/components/AchievementBadge.tsx',
  'src/hidden-frame/components/AchievementGrid.tsx',
  'src/hidden-frame/components/HiddenFrameResetPanel.tsx',
  'src/hidden-frame/data/hiddenFrameAchievements.ts',
];

for (const relativePath of requiredFiles) {
  assert(existsSync(path.join(repoRoot, relativePath)), `Missing ${relativePath}`);
}

const achievementSource = readProjectFile('src/hidden-frame/data/hiddenFrameAchievements.ts');
for (const achievementId of [
  'archive-opened',
  'first-chain-recovered',
  'timeline-signal-recovered',
  'camera-signal-recovered',
  'render-room-signal-recovered',
  'object-signal-recovered',
  'ten-frames-recovered',
  'current-archive-recovered',
]) {
  assert(achievementSource.includes(`id: '${achievementId}'`), `Missing ${achievementId}.`);
}
for (const criteriaType of ['archive-visited', 'completed-files', 'recovered-frame-count']) {
  assert(achievementSource.includes(criteriaType), `Missing ${criteriaType} criteria.`);
}

const progressSource = readProjectFile('src/hidden-frame/progress/hiddenFrameProgress.ts');
assert(
  progressSource.includes('HIDDEN_FRAME_PROGRESS_SCHEMA_VERSION = 3'),
  'Progress schema was not migrated to version 3.',
);
assert(progressSource.includes('achievementIds'), 'Progress snapshot does not track achievementIds.');
assert(
  progressSource.includes('getEarnedHiddenFrameAchievementIds'),
  'Progress normalization does not derive achievements.',
);
assert(progressSource.includes('resetHiddenFrameProgress'), 'Missing resetHiddenFrameProgress.');
assert(
  progressSource.includes('sourceSchemaVersion < 2'),
  'Legacy migration does not distinguish Phase 1 progress from schema 2 progress.',
);

const hookSource = readProjectFile('src/hidden-frame/hooks/useHiddenFrameProgress.ts');
assert(hookSource.includes('resetProgress'), 'useHiddenFrameProgress does not expose resetProgress.');

const collectionPageSource = readProjectFile('src/hidden-frame/pages/HiddenFrameCollectionPage.tsx');
assert(collectionPageSource.includes('AchievementGrid'), 'Collection page does not render achievements.');
assert(collectionPageSource.includes('HiddenFrameResetPanel'), 'Collection page does not render reset panel.');
assert(
  collectionPageSource.includes('not points') &&
    collectionPageSource.includes('leaderboards') &&
    collectionPageSource.includes('assignment credit'),
  'Collection page does not clearly avoid grade/leaderboard language.',
);

const resetPanelSource = readProjectFile('src/hidden-frame/components/HiddenFrameResetPanel.tsx');
assert(
  resetPanelSource.includes('Confirm reset') && resetPanelSource.includes('Cancel'),
  'Reset panel does not use a confirmation flow.',
);
assert(
  resetPanelSource.includes('does not affect grades') &&
    resetPanelSource.includes('class records') &&
    resetPanelSource.includes('submissions'),
  'Reset panel does not clearly describe local-only safety.',
);

const cssSource = readProjectFile('src/styles/hidden-frame.css');
for (const className of [
  'hidden-frame-achievement-grid',
  'hidden-frame-achievement-badge',
  'hidden-frame-reset-panel',
]) {
  assert(cssSource.includes(className), `Missing CSS for ${className}.`);
}

if (failures.length > 0) {
  console.error('Hidden Frame Phase 7 validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Hidden Frame Phase 7 validation passed.');
