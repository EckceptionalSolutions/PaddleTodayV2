import { readFile, writeFile } from 'node:fs/promises';
import { listRivers } from '../src/lib/rivers';
import { canonicalRiverRouteLineFromFeature } from '../src/lib/canonical-river-geometries.js';
import { coverageAnchorForRoutes } from '../src/lib/river-coverage.js';
import { coordinateBounds, geometryLines, simplifyOverviewLine } from '../src/lib/explore-map-geometry.js';

const features = [];
let originalPoints = 0;
let overviewPoints = 0;
for (const river of listRivers()) {
  const raw = await readFile(`public/data/canonical-river-geometries/routes/${river.slug}.json`, 'utf8')
    .then(JSON.parse).catch((error) => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
  if (!raw) continue;
  const accesses = [...(river.accessPoints || [])].sort((a, b) => (a.mileFromStart || 0) - (b.mileFromStart || 0));
  const points = (accesses.length >= 2 ? accesses : [river.putIn, river.takeOut])
    .filter((point) => Number.isFinite(point?.longitude) && Number.isFinite(point?.latitude));
  const traced = canonicalRiverRouteLineFromFeature(raw, points) || raw;
  const original = geometryLines(traced.geometry);
  const lines = original.map((line) => simplifyOverviewLine(line));
  const anchor = coverageAnchorForRoutes([{ river }], new Map([[river.slug, traced]]));
  originalPoints += original.reduce((sum, line) => sum + line.length, 0);
  overviewPoints += lines.reduce((sum, line) => sum + line.length, 0);
  features.push({
    type: 'Feature', bbox: coordinateBounds(original.flat()),
    properties: { routeId: river.slug, overview: true, anchor: anchor ? [anchor.longitude, anchor.latitude] : null },
    geometry: lines.length === 1 ? { type: 'LineString', coordinates: lines[0] }
      : { type: 'MultiLineString', coordinates: lines },
  });
}
const output = JSON.stringify({ type: 'FeatureCollection', features }) + '\n';
const path = 'public/data/explore-map-overview.json';
if (await readFile(path, 'utf8').catch(() => '') !== output) await writeFile(path, output);
console.log(`[explore-overview] ${features.length} routes, ${originalPoints} → ${overviewPoints} points, ${Buffer.byteLength(output)} bytes.`);
