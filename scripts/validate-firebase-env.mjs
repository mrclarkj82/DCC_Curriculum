import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const requiredKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
];

const envFiles = ['.env', '.env.local', '.env.production', '.env.production.local'];

function parseEnvFile(filePath) {
  const values = {};
  const contents = readFileSync(filePath, 'utf8');

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const match = trimmed.match(/^([\w.-]+)\s*=\s*(.*)$/);

    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    const value = rawValue.replace(/^(['"])(.*)\1$/, '$2').trim();
    values[key] = value;
  }

  return values;
}

const loadedValues = {};

for (const fileName of envFiles) {
  const filePath = resolve(process.cwd(), fileName);

  if (existsSync(filePath)) {
    Object.assign(loadedValues, parseEnvFile(filePath));
  }
}

const missingKeys = requiredKeys.filter((key) => !(process.env[key] || loadedValues[key]));

if (missingKeys.length) {
  console.error('Firebase environment validation failed.');
  console.error('Missing required Vite env values:');

  for (const key of missingKeys) {
    console.error(`- ${key}`);
  }

  console.error(
    'Set these values in an uncommitted .env.local file or deployment environment before building.',
  );
  process.exit(1);
}

console.log('Firebase environment validation passed.');
