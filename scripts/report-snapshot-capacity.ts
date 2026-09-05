import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';

const budgetBytes = Number(process.env.SNAPSHOT_SUMMARY_MAX_BYTES || 4 * 1024 * 1024);
const candidates = [
  process.env.SNAPSHOT_SUMMARY_PATH,
  resolve(process.cwd(), '.local', 'river-snapshots', 'summary.json'),
  resolve(process.cwd(), 'tmp-summary.json'),
].filter((value): value is string => Boolean(value));

let payload: unknown = null;
let source = '';
for (const candidate of candidates) {
  try {
    payload = JSON.parse(await readFile(candidate, 'utf8'));
    source = candidate;
    break;
  } catch {
    // Try the next configured/local snapshot location.
  }
}

if (!payload || typeof payload !== 'object') {
  console.log(JSON.stringify({ measured: false, reason: 'no_local_snapshot_found', budgetBytes }));
  process.exit(0);
}

const serialized = JSON.stringify(payload);
const bytes = Buffer.byteLength(serialized);
const gzipBytes = gzipSync(serialized).byteLength;
const brotliBytes = brotliCompressSync(serialized).byteLength;
const rivers = Array.isArray((payload as { rivers?: unknown }).rivers)
  ? (payload as { rivers: unknown[] }).rivers
  : [];
const routeBytes = rivers.map((river) => Buffer.byteLength(JSON.stringify(river)));
const result = {
  measured: true,
  source,
  bytes,
  gzipBytes,
  brotliBytes,
  gzipSavingsPercent: bytes ? Math.round((1 - gzipBytes / bytes) * 1000) / 10 : 0,
  brotliSavingsPercent: bytes ? Math.round((1 - brotliBytes / bytes) * 1000) / 10 : 0,
  budgetBytes,
  headroomBytes: budgetBytes - bytes,
  routeCount: rivers.length,
  averageRouteBytes: routeBytes.length ? Math.round(routeBytes.reduce((sum, value) => sum + value, 0) / routeBytes.length) : 0,
  largestRouteBytes: routeBytes.length ? Math.max(...routeBytes) : 0,
};
console.log(JSON.stringify(result, null, 2));
if (bytes > budgetBytes) process.exitCode = 1;
