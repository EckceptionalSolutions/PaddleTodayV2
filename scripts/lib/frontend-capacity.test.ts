import { mkdtemp, mkdir, open, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, expect, it } from 'vitest';
import { verifyCloudflareFrontendCapacity, verifyFrontendCapacity } from './frontend-capacity.mjs';
const roots: string[] = [];
afterEach(async () => { await Promise.all(roots.splice(0).map(root => rm(root, { recursive: true, force: true }))); });
async function fixture() { const root = await mkdtemp(join(tmpdir(), 'frontend-capacity-')); roots.push(root); return root; }
it('counts nested files and fails on empty or unknown-tier deployments', async () => {
  const root = await fixture(); await expect(verifyFrontendCapacity(root, 'Free')).rejects.toThrow('empty');
  await mkdir(join(root, 'explore')); await writeFile(join(root, 'explore/index.html'), 'hello');
  expect(await verifyFrontendCapacity(root, 'Free')).toMatchObject({ files: 1, bytes: 5, headroomBytes: 249999995 });
  await expect(verifyFrontendCapacity(root, 'Unknown')).rejects.toThrow('Unknown');
});
it('refuses oversized Free packages that would still fit Standard', async () => {
  const root = await fixture(); const file = await open(join(root, 'large.bin'), 'w');
  try { await file.truncate(250_000_001); } finally { await file.close(); }
  await expect(verifyFrontendCapacity(root, 'Free')).rejects.toThrow('exceeds Free');
  expect(await verifyFrontendCapacity(root, 'Standard')).toMatchObject({ bytes: 250_000_001 });
  await expect(verifyCloudflareFrontendCapacity(root)).rejects.toThrow('Workers Free');
});
it('permits total storage above SWA Free when each asset fits Workers limits', async () => {
  const root = await fixture();
  for (let index = 0; index < 11; index++) {
    const file = await open(join(root, `${index}.bin`), 'w');
    try { await file.truncate(24_000_000); } finally { await file.close(); }
  }
  await expect(verifyFrontendCapacity(root, 'Free')).rejects.toThrow('exceeds Free');
  expect(await verifyCloudflareFrontendCapacity(root)).toMatchObject({ files: 11, bytes: 264_000_000, largestFileBytes: 24_000_000 });
});
