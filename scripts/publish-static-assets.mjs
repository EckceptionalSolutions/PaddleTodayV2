import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { publishAssets } from './lib/static-asset-publish.mjs';

try {
  const manifest = JSON.parse(await readFile('tmp/static-assets/manifest.json', 'utf8'));
  const result = await publishAssets({ manifest, source: resolve('tmp/static-assets/upload'),
    account: process.env.AZURE_STORAGE_ACCOUNT, container: process.env.AZURE_ASSET_CONTAINER,
    authMode: process.env.AZURE_STORAGE_AUTH_MODE || 'login' });
  console.log(`Assets: ${result.uploaded} uploaded, ${result.skipped} reused, ${result.bytesUploaded} bytes uploaded.`);
} catch (error) {
  console.error(`Asset publishing failed: ${error.message}`);
  process.exitCode = 1;
}
