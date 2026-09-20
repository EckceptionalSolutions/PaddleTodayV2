import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { assetOrigin } from './lib/static-assets.mjs';

const manifest = JSON.parse(await readFile('tmp/static-assets/manifest.json', 'utf8'));
const account = process.env.AZURE_STORAGE_ACCOUNT;
const container = process.env.AZURE_ASSET_CONTAINER;
if (manifest.baseUrl !== `${assetOrigin(account, container)}/releases/${manifest.release}`) throw new Error('Asset destination differs from the prepared release.');
const types = new Map(manifest.files.map((file) => [extname(file.path).slice(1), file.contentType]));
for (const [prefix, cacheControl] of [
  [`releases/${manifest.release}`, 'public, max-age=31536000, immutable'],
  // Stable paths for old mobile releases and cached pages. Never delete old names.
  ['legacy', 'public, max-age=300'],
]) {
  for (const [extension, contentType] of types) {
    const args = ['storage', 'blob', 'upload-batch', '--account-name', account, '--destination', container,
      '--source', resolve('tmp/static-assets/upload'), '--destination-path', prefix,
      '--pattern', `*.${extension}`, '--content-type', contentType, '--content-cache-control', cacheControl,
      '--overwrite', 'true', '--validate-content', '--no-progress', '--only-show-errors', '--output', 'none',
      '--auth-mode', process.env.AZURE_STORAGE_AUTH_MODE || 'login'];
    console.log(`Uploading ${extension} assets to ${prefix}.`);
    const windows = process.platform === 'win32';
    execFileSync(windows ? (process.env.ComSpec || 'cmd.exe') : 'az', windows ? ['/d', '/s', '/c', 'az.cmd', ...args] : args,
      { stdio: 'inherit', windowsHide: true });
  }
}
