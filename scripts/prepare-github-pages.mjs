import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const indexPath = join(distDir, 'index.html');
const routeFallbacks = [
  'login',
  'today',
  'join-class',
  'areas',
  'areas/unreal-engine',
  'areas/video-production',
  'teacher',
  'admin',
];

await copyFile(indexPath, join(distDir, '404.html'));
await Promise.all(
  routeFallbacks.map(async (route) => {
    const routeDir = join(distDir, ...route.split('/'));
    await mkdir(routeDir, { recursive: true });
    await copyFile(indexPath, join(routeDir, 'index.html'));
  }),
);
await writeFile(join(distDir, '.nojekyll'), '', 'utf8');
