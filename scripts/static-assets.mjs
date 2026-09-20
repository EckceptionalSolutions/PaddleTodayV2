import { readFile, writeFile, mkdir, appendFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { assetOrigin, prepareAssets, packageFrontend, verifyAssets } from './lib/static-assets.mjs';

const directory = resolve('tmp/static-assets');
const manifestPath = resolve(directory, 'manifest.json');
const command = process.argv[2];
try {
  if (command === 'prepare') {
    await mkdir(directory, { recursive: true });
    const manifest = await prepareAssets({ source: resolve('public'), staging: resolve(directory, 'upload'),
      origin: assetOrigin(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_ASSET_CONTAINER) });
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    if (process.env.GITHUB_ENV) await appendFile(process.env.GITHUB_ENV,
      `PUBLIC_ASSET_BASE_URL=${manifest.baseUrl}\nASSET_RELEASE=${manifest.release}\n`);
    console.log(`Prepared ${manifest.files.length} assets (${(manifest.bytes / 1048576).toFixed(2)} MiB).\nPUBLIC_ASSET_BASE_URL=${manifest.baseUrl}`);
  } else {
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    if (command === 'verify') {
      await verifyAssets(manifest);
      const origin = assetOrigin(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_ASSET_CONTAINER);
      await verifyAssets({ ...manifest, baseUrl: `${origin}/legacy` }, { cacheControl: 'public, max-age=300' });
      console.log(`Verified ${manifest.files.length} public assets, MIME types, cache headers, and browser CORS.`);
    } else if (command === 'package') {
      await packageFrontend({ source: resolve('dist'), destination: resolve('tmp/frontend'), manifest,
        baseUrl: process.env.PUBLIC_ASSET_BASE_URL });
      console.log(`Frontend packaged without ${(manifest.bytes / 1048576).toFixed(2)} MiB of gallery/map assets. Full dist remains available for the API.`);
    } else throw new Error('Choose prepare, verify, or package.');
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
