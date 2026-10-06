import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep, basename } from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const directory = await mkdtemp(join(tmpdir(), 'paddle-photo-benchmark-'));
try {
  const samples = [];
  let seed = 179129;
  for (const [width, height, label] of [[640, 480, 'small'], [1920, 1080, 'large']]) {
    const raw = Buffer.alloc(width * height * 3);
    for (let n = 0; n < raw.length; n++) { seed = (1664525 * seed + 1013904223) >>> 0; raw[n] = seed >>> 24; }
    const bytes = await sharp(raw, { raw: { width, height, channels: 3 } }).jpeg({ quality: 80 }).toBuffer();
    const legacy = JSON.stringify({ kind: 'photo', uid: 'benchmark-owner', logId: '00000000-0000-0000-0000-000000000001', id: '00000000-0000-0000-0000-000000000002', data: bytes.toString('base64'), at: '2026-10-06T12:00:00Z' });
    await writeFile(join(directory, label + '.jpg'), bytes); await writeFile(join(directory, label + '.json'), legacy);
    samples.push({ label, width, height, jpegBytes: bytes.length, legacyJsonBytes: Buffer.byteLength(legacy), bytesSaved: Buffer.byteLength(legacy) - bytes.length, percentSaved: 100 * (1 - bytes.length / Buffer.byteLength(legacy)) });
  }
  const worker = join(directory, 'read-worker.mjs');
  await writeFile(worker, `import { readFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
const binary = process.argv[3] === 'binary';
globalThis.gc();
const startingRss = process.memoryUsage().rss;
let maxRss = startingRss;
const start = performance.now();
for (let n = 0; n < 40; n++) {
  globalThis.gc();
  const raw = await readFile(process.argv[2], binary ? undefined : 'utf8');
  const document = binary ? null : JSON.parse(raw);
  const bytes = binary ? raw : Buffer.from(document.data, 'base64');
  if (bytes.length === 0) throw new Error('Missing photo');
  maxRss = Math.max(maxRss, process.memoryUsage().rss);
}
console.log(JSON.stringify({ reads: 40, elapsedMsIncludingExplicitGc: performance.now() - start, startingRss, sampledMaxRss: maxRss, processPeakRss: process.resourceUsage().maxRSS * 1024 }));
`);
  const reads = {};
  for (const [mode, extension] of [['legacy', 'json'], ['binary', 'jpg']]) {
    reads[mode] = JSON.parse(execFileSync(process.execPath, ['--expose-gc', worker, join(directory, 'large.' + extension), mode], { encoding: 'utf8', windowsHide: true }));
  }
  const result = { date: '2026-10-06', node: process.version, storage: samples, reads,
    limits: 'Deterministic noise JPEG fixtures; isolated local read/parse/decode workers with explicit GC before each of 40 reads. OS process peak RSS and sampled RSS are observations, not production request peaks. Excludes authentication, HTTP, upload preprocessing and mobile queue storage. Existing JSON photos are read compatibly and are not bulk migrated.' };
  await writeFile('docs/audits/private-photo-improvements-2026-10-06.json', JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify(result, null, 2));
} finally {
  if (!resolve(directory).startsWith(resolve(tmpdir()) + sep) || !basename(directory).startsWith('paddle-photo-benchmark-')) throw new Error('Unexpected cleanup directory');
  await rm(directory, { recursive: true, force: true });
}
