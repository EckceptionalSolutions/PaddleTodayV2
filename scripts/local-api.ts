import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Only the public project ID is needed by the local token verifier. Never load
// Firebase Admin or cloud-storage credentials into this development process.
try {
  const contents = await readFile(resolve(process.cwd(), '.env.local'), 'utf8');
  const match = contents.match(/^\s*PUBLIC_FIREBASE_PROJECT_ID\s*=\s*([^\r\n#]+)\s*$/m);
  if (!process.env.PUBLIC_FIREBASE_PROJECT_ID && match?.[1]) process.env.PUBLIC_FIREBASE_PROJECT_ID = match[1].trim().replace(/^['"]|['"]$/g, '');
} catch (error) {
  if (!(error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT')) throw error;
}

if (!process.env.PUBLIC_FIREBASE_PROJECT_ID) {
  throw new Error('Set PUBLIC_FIREBASE_PROJECT_ID in the ignored .env.local before starting the local API.');
}

process.env.CANOE_API_HOST ||= '127.0.0.1';
await import('../src/server/bootstrap');
