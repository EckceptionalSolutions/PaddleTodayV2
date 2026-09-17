import { createHash } from 'node:crypto';
import { readdir, readFile, mkdir, copyFile, cp, writeFile } from 'node:fs/promises';
import { resolve, relative, sep, extname } from 'node:path';

export const assetDirectories = ['gallery', 'data'];
export const contentTypes = { '.json': 'application/json', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.md': 'text/markdown' };

export function assetOrigin(account, container) {
  if (!/^[a-z0-9]{3,24}$/.test(account || '') || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(container || '')) {
    throw new Error('Provide a valid AZURE_STORAGE_ACCOUNT and AZURE_ASSET_CONTAINER.');
  }
  return `https://${account}.blob.core.windows.net/${container}`;
}

export async function inventory(root, directories = assetDirectories) {
  const files = [];
  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) await walk(path);
      else if (entry.isFile()) {
        const body = await readFile(path);
        files.push({ path: relative(root, path).split(sep).join('/'), bytes: body.length,
          sha256: createHash('sha256').update(body).digest('hex'),
          contentType: contentTypes[extname(path).toLowerCase()] || 'application/octet-stream' });
      } else throw new Error(`Unsupported asset entry: ${path}`);
    }
  }
  for (const directory of directories) await walk(resolve(root, directory));
  return files.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
}

export async function prepareAssets({ source, staging, origin }) {
  const files = await inventory(source);
  if (!files.length) throw new Error('No static assets found.');
  const release = createHash('sha256').update(JSON.stringify(files)).digest('hex');
  const baseUrl = `${origin}/releases/${release}`;
  // An existing staging tree could upload stale files; always require a fresh directory.
  await mkdir(staging, { recursive: false });
  for (const file of files) {
    const destination = resolve(staging, file.path);
    await mkdir(resolve(destination, '..'), { recursive: true });
    await copyFile(resolve(source, file.path), destination);
  }
  return { release, baseUrl, files, bytes: files.reduce((sum, file) => sum + file.bytes, 0) };
}

export async function packageFrontend({ source, destination, manifest, baseUrl }) {
  if (baseUrl !== manifest.baseUrl) throw new Error('Frontend asset URL does not match the prepared release.');
  const actual = await inventory(source);
  if (JSON.stringify(actual) !== JSON.stringify(manifest.files)) throw new Error('Built assets changed after preparation. Refusing to publish mismatched assets.');
  const htmlFiles = await inventory(source, ['rivers']);
  let foundExternalGallery = false;
  for (const file of htmlFiles.filter((file) => file.path.endsWith('.html'))) {
    const html = await readFile(resolve(source, file.path), 'utf8');
    if (/\bsrc=["']\/gallery\//.test(html)) throw new Error(`Local gallery URL remains in ${file.path}.`);
    if (html.includes(`${baseUrl}/gallery/`)) foundExternalGallery = true;
  }
  if (!foundExternalGallery) {
    throw new Error('Build does not contain the configured external gallery URL.');
  }
  await mkdir(destination, { recursive: false });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    if (assetDirectories.includes(entry.name)) continue;
    await cp(resolve(source, entry.name), resolve(destination, entry.name), { recursive: true, errorOnExist: true, force: false });
  }
  const configPath = resolve(destination, 'staticwebapp.config.json');
  const config = JSON.parse(await readFile(configPath, 'utf8'));
  config.navigationFallback ??= { rewrite: '/index.html' };
  config.navigationFallback.exclude = [...new Set([...(config.navigationFallback.exclude || []), '/gallery/*', '/data/*'])];
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`);
}

export async function verifyAssets(manifest, { fetchImpl = fetch, site = 'https://paddletoday.com', concurrency = 12,
  cacheControl = 'public, max-age=31536000, immutable' } = {}) {
  let index = 0;
  // Every file must be publicly readable, correctly typed, and CORS-enabled before pages deploy.
  await Promise.all(Array.from({ length: Math.min(concurrency, manifest.files.length) }, async () => {
    while (index < manifest.files.length) {
      const file = manifest.files[index++];
      const url = `${manifest.baseUrl}/${file.path.split('/').map(encodeURIComponent).join('/')}`;
      const response = await fetchImpl(url, { method: 'HEAD', headers: { Origin: site }, signal: AbortSignal.timeout(30000) });
      if (!response.ok || Number(response.headers.get('content-length')) !== file.bytes
        || response.headers.get('content-type')?.split(';')[0] !== file.contentType
        || !['*', site].includes(response.headers.get('access-control-allow-origin'))
        || response.headers.get('cache-control') !== cacheControl) {
        throw new Error(`Public asset verification failed: ${file.path} (HTTP ${response.status}).`);
      }
    }
  }));
  // Check actual bytes as well as headers, across every published content type.
  const samples = [...new Map(manifest.files.map((file) => [file.contentType, file])).values()];
  for (const file of samples) {
    const response = await fetchImpl(`${manifest.baseUrl}/${file.path}`, { signal: AbortSignal.timeout(30000) });
    if (!response.ok || createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex') !== file.sha256) {
      throw new Error(`Public asset checksum failed: ${file.path}.`);
    }
  }
}
