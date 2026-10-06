import { writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { listRivers } from '../src/lib/rivers';
import { getRoutePreviewPhoto } from '../src/data/route-gallery';

const sizes = listRivers().map(river => {
  const body = Buffer.from(JSON.stringify({ requestId: '00000000-0000-0000-0000-000000000000', routeId: river.slug, photo: getRoutePreviewPhoto(river) }));
  return { bytes: body.length, gzipBytes: gzipSync(body, { level: 4 }).length };
});
const stats = (field: 'bytes' | 'gzipBytes') => {
  const sorted = sizes.map(size => size[field]).sort((a, b) => a - b);
  return { min: sorted[0], median: sorted[Math.floor(sorted.length / 2)], p95: sorted[Math.floor(sorted.length * .95)], max: sorted.at(-1) };
};
const result = { date: '2026-10-06', routes: sizes.length, description: 'One featured-photo JSON response per public route, fixed 36-character request ID. Actual gzip negotiation applies only to eligible bodies; image downloads excluded.', bytes: stats('bytes'), gzipBytes: stats('gzipBytes') };
await writeFile('docs/audits/photo-preview-responses-2026-10-06.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
