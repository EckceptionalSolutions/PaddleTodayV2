import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFile, mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { assetOrigin } from './static-assets.mjs';

export const releaseCacheControl = 'public, max-age=31536000, immutable';
export const legacyCacheControl = 'public, max-age=300';

function runAzure(args) {
  const windows = process.platform === 'win32';
  const output = execFileSync(windows ? (process.env.ComSpec || 'cmd.exe') : 'az',
    windows ? ['/d', '/s', '/c', 'az.cmd', ...args] : args,
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true, maxBuffer: 32 * 1024 * 1024 });
  return output.trim() ? JSON.parse(output) : null;
}

// Match bytes as well as headers. Size alone cannot detect an edited legacy asset.
export function planAssetUploads(files, blobs, prefix, cacheControl, immutable = false) {
  if (!Array.isArray(blobs)) throw new Error('Azure asset inventory was not an array.');
  const existing = new Map(blobs.map(blob => [blob.name, blob]));
  return files.filter(file => {
    const blob = existing.get(`${prefix}/${file.path}`);
    if (!blob) return true;
    const properties = blob.properties ?? {};
    const settings = properties.contentSettings ?? {};
    const sameContent = Number(properties.contentLength) === file.bytes && settings.contentMd5 === file.md5;
    if (immutable && (Number(properties.contentLength) !== file.bytes || (settings.contentMd5 && !sameContent))) {
      throw new Error(`Immutable asset differs from its release: ${file.path}`);
    }
    return !sameContent || settings.contentType !== file.contentType || settings.cacheControl !== cacheControl;
  });
}

export async function publishAssets({ manifest, source, account, container, authMode = 'login',
  azure = runAzure, log = console.log }) {
  const origin = assetOrigin(account, container);
  if (!Array.isArray(manifest.files) || !manifest.files.length
    || manifest.release !== createHash('sha256').update(JSON.stringify(manifest.files)).digest('hex')
    || manifest.baseUrl !== `${origin}/releases/${manifest.release}`) {
    throw new Error('Asset destination or content manifest differs from the prepared release.');
  }
  const files = [];
  const paths = new Set();
  // Validate every staged file before the first remote mutation.
  for (const file of manifest.files) {
    if (typeof file.path !== 'string' || /[\\:\0]/.test(file.path)
      || file.path.split('/').some(part => !part || part === '.' || part === '..') || paths.has(file.path)) {
      throw new Error('Invalid or duplicate asset path.');
    }
    paths.add(file.path);
    const body = await readFile(resolve(source, file.path));
    if (body.length !== file.bytes || createHash('sha256').update(body).digest('hex') !== file.sha256) {
      throw new Error(`Staged asset changed after preparation: ${file.path}`);
    }
    files.push({ ...file, md5: createHash('md5').update(body).digest('base64') });
  }
  const common = ['--account-name', account, '--auth-mode', authMode, '--only-show-errors'];
  const targets = [
    { prefix: `releases/${manifest.release}`, cacheControl: releaseCacheControl, immutable: true },
    // Preserve names used by old mobile releases and cached pages. Never delete.
    { prefix: 'legacy', cacheControl: legacyCacheControl, immutable: false },
  ];
  for (const target of targets) {
    const blobs = await azure(['storage', 'blob', 'list', ...common, '--container-name', container,
      '--prefix', `${target.prefix}/`, '--num-results', '*', '--output', 'json']);
    target.files = planAssetUploads(files, blobs, target.prefix, target.cacheControl, target.immutable);
  }
  const stage = await mkdtemp(join(tmpdir(), 'paddle-asset-upload-'));
  const result = { uploaded: 0, skipped: 0, bytesUploaded: 0 };
  try {
    for (const [index, target] of targets.entries()) {
      result.skipped += files.length - target.files.length;
      const types = [...new Set(target.files.map(file => file.contentType))];
      for (const [typeIndex, contentType] of types.entries()) {
        const selected = target.files.filter(file => file.contentType === contentType);
        const selectedSource = join(stage, String(index), String(typeIndex));
        for (const file of selected) {
          const destination = join(selectedSource, file.path);
          await mkdir(dirname(destination), { recursive: true });
          await copyFile(resolve(source, file.path), destination);
        }
        await azure(['storage', 'blob', 'upload-batch', ...common, '--destination', container,
          '--source', selectedSource, '--destination-path', target.prefix, '--content-type', contentType,
          '--content-cache-control', target.cacheControl, '--tier', 'Hot', '--overwrite', 'true',
          '--validate-content', '--no-progress', '--output', 'none']);
        result.uploaded += selected.length;
        result.bytesUploaded += selected.reduce((sum, file) => sum + file.bytes, 0);
      }
      log(`Assets ${target.prefix}: uploaded ${target.files.length}, reused ${files.length - target.files.length}.`);
    }
  } finally {
    if (dirname(stage) !== resolve(tmpdir())) throw new Error('Unexpected asset staging directory.');
    await rm(stage, { recursive: true, force: true });
  }
  return result;
}
