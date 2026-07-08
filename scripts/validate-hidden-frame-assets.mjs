import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(repoRoot, 'public');
const registryPath = path.join(repoRoot, 'src', 'hidden-frame', 'hiddenFramePhase0Assets.ts');
const appManifestPath = path.join(publicDir, 'hidden-frame', 'manifest.json');
const sourceManifestPath = path.join(publicDir, 'hidden-frame', 'hidden-frame-phase0-manifest.json');
const phase0DocsDir = path.join(repoRoot, 'docs', 'hidden-frame', 'phase0');

const missing = [];

function assertExists(label, targetPath) {
  if (!existsSync(targetPath)) {
    missing.push(`${label}: ${path.relative(repoRoot, targetPath)}`);
  }
}

function publicPathToFile(publicPath) {
  return path.join(publicDir, ...publicPath.replace(/^\//, '').split('/'));
}

function sourceManifestPathToFile(sourcePath) {
  if (sourcePath.startsWith('public/')) {
    return path.join(repoRoot, ...sourcePath.split('/'));
  }

  if (sourcePath.startsWith('previews/')) {
    return path.join(phase0DocsDir, ...sourcePath.split('/'));
  }

  return path.join(repoRoot, sourcePath);
}

function collectPublicPaths(value, paths = new Set()) {
  if (typeof value === 'string' && value.startsWith('/hidden-frame/')) {
    paths.add(value);
    return paths;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectPublicPaths(item, paths);
    }
    return paths;
  }

  if (value && typeof value === 'object') {
    for (const item of Object.values(value)) {
      collectPublicPaths(item, paths);
    }
  }

  return paths;
}

assertExists('TypeScript registry', registryPath);
assertExists('App manifest', appManifestPath);
assertExists('Original Phase 0 manifest', sourceManifestPath);

if (existsSync(registryPath)) {
  const registry = readFileSync(registryPath, 'utf8');
  const registryPaths = new Set(
    [...registry.matchAll(/['"](?<asset>\/hidden-frame\/[^'"]+)['"]/g)].map(
      (match) => match.groups.asset,
    ),
  );

  for (const assetPath of registryPaths) {
    assertExists(`Registry asset ${assetPath}`, publicPathToFile(assetPath));
  }
}

if (existsSync(appManifestPath)) {
  const appManifest = JSON.parse(readFileSync(appManifestPath, 'utf8'));

  for (const assetPath of collectPublicPaths(appManifest)) {
    assertExists(`App manifest asset ${assetPath}`, publicPathToFile(assetPath));
  }
}

if (existsSync(sourceManifestPath)) {
  const sourceManifest = JSON.parse(readFileSync(sourceManifestPath, 'utf8'));
  const sourceAssets = [
    ...(sourceManifest.symbols ?? []),
    ...(sourceManifest.backgrounds ?? []),
    ...(sourceManifest.ui ?? []),
    ...(sourceManifest.previews ?? []),
  ];

  for (const assetPath of sourceAssets) {
    assertExists(`Source manifest asset ${assetPath}`, sourceManifestPathToFile(assetPath));
  }
}

if (missing.length > 0) {
  console.error('Hidden Frame asset validation failed:');
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log('Hidden Frame asset validation passed.');
