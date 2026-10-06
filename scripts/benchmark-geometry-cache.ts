import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { GeometryCache } from '../src/server/routes/geometry-cache';

const directory = 'public/data/canonical-river-geometries/routes';
const files = (await readdir(directory)).filter(name => /^[a-z0-9-]+\.json$/.test(name)).sort();
let reads = 0;
const cache = new GeometryCache(async slug => { reads++; return readFile(join(directory, `${slug}.json`), 'utf8'); });
let originalBytes = 0;
for (const file of files) {
  originalBytes += Buffer.byteLength(await readFile(join(directory, file), 'utf8'));
  await cache.load(file.slice(0, -5));
}
const after = cache.stats();
const first = files[0].slice(0, -5);
const beforeReload = reads;
const reloaded = await cache.load(first);
const result = {
  date: '2026-10-06', fixture: 'Sequential reads of every available route geometry file, including legacy assets; no live providers',
  before: { entries: files.length, sourceBytes: originalBytes, note: 'Original indefinite promise cache retains all parsed values after this sweep' },
  after, evictedRouteReloaded: reads === beforeReload + 1 && !!reloaded,
  policy: { entries: 128, sourceBytes: 16777216, ttlSeconds: 900, negativeEntries: 128, negativeTtlSeconds: 60 },
  limit: 'Source bytes are an accounting proxy; parsed-object RSS and concurrent response buffers are not measured.'
};
if (process.argv[2]) await writeFile(process.argv[2], JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
