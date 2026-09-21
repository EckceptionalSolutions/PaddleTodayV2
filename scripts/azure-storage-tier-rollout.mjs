import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const account = process.env.AZURE_STORAGE_ACCOUNT || 'paddletoday';
const resourceGroup = process.env.AZURE_RESOURCE_GROUP || 'paddletoday';
const containers = (process.env.AZURE_STORAGE_TIER_CONTAINERS || 'river-snapshots,river-history')
  .split(',').map((value) => value.trim()).filter(Boolean);
const mode = process.argv.includes('--apply') ? 'apply' : process.argv.includes('--verify') ? 'verify' : 'inventory';
const manifestPath = process.argv.find((value) => value.startsWith('--manifest='))?.slice('--manifest='.length)
  || process.env.AZURE_STORAGE_TIER_MANIFEST || '.local/azure-storage-tier-manifest.json';
const confirmed = process.argv.includes('--confirm-hot-tier');

function az(args) {
  const executable = process.platform === 'win32' ? (process.env.ComSpec || 'cmd.exe') : 'az';
  const executableArgs = process.platform === 'win32' ? ['/d', '/s', '/c', 'az.cmd', ...args] : args;
  return JSON.parse(execFileSync(executable, executableArgs, {
    encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true, shell: false,
  }));
}

function listBlobs(container) {
  return az(['storage', 'blob', 'list', '--account-name', account, '--container-name', container,
    '--auth-mode', 'login', '--include', 'm', '--output', 'json']);
}

function blobTier(blob) {
  return blob.properties?.accessTier || blob.properties?.blobTier || blob.accessTier || blob.blobTier || 'Unknown';
}

function normalizedBlob(container, blob) {
  return {
    container, name: blob.name, sizeBytes: Number(blob.properties?.contentLength ?? blob.contentLength ?? 0),
    lastModified: blob.properties?.lastModified ?? blob.lastModified ?? null,
    currentTier: blobTier(blob), targetTier: 'Hot',
  };
}

function inventory() {
  const blobs = containers.flatMap((container) => listBlobs(container).map((blob) => normalizedBlob(container, blob)));
  const result = { generatedAt: new Date().toISOString(), resourceGroup, account, auth: 'azure-cli-login',
    intendedChange: 'Move only reviewed active blobs to Hot; preserve RA-GRS and all blob contents.', blobs };
  writeFileSync(manifestPath, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify({ manifest: manifestPath, blobCount: blobs.length,
    byContainer: Object.fromEntries(containers.map((container) => [container, blobs.filter((blob) => blob.container === container).length])),
    byTier: blobs.reduce((counts, blob) => ({ ...counts, [blob.currentTier]: (counts[blob.currentTier] || 0) + 1 }), {}),
    next: 'Review the manifest and remove any blob that should remain Cool before using --apply --confirm-hot-tier.' }, null, 2));
}

function loadManifest() {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  if (!Array.isArray(manifest.blobs) || manifest.account !== account) throw new Error(`Manifest ${manifestPath} is missing blobs or targets a different account.`);
  return manifest;
}

function setTier(blob) {
  az(['storage', 'blob', 'set-tier', '--account-name', account, '--container-name', blob.container,
    '--name', blob.name, '--tier', blob.targetTier || 'Hot', '--auth-mode', 'login', '--output', 'none']);
}

function apply() {
  if (!confirmed) throw new Error('Apply is guarded. Re-run with --apply --confirm-hot-tier after reviewing the manifest.');
  const manifest = loadManifest();
  const candidates = manifest.blobs.filter((blob) => blob.targetTier === 'Hot' && blob.currentTier !== 'Hot');
  for (const blob of candidates) setTier(blob);
  console.log(JSON.stringify({ manifest: manifestPath, changed: candidates.length, tier: 'Hot' }, null, 2));
}

function verify() {
  const manifest = loadManifest();
  const failures = [];
  for (const expected of manifest.blobs.filter((blob) => blob.targetTier === 'Hot')) {
    const actual = listBlobs(expected.container).find((blob) => blob.name === expected.name);
    const tier = actual ? blobTier(actual) : 'Missing';
    if (tier !== 'Hot') failures.push({ container: expected.container, name: expected.name, observedTier: tier });
  }
  console.log(JSON.stringify({ manifest: manifestPath, checked: manifest.blobs.length, failures }, null, 2));
  process.exitCode = failures.length === 0 ? 0 : 1;
}

if (mode === 'inventory') inventory();
if (mode === 'apply') apply();
if (mode === 'verify') verify();
