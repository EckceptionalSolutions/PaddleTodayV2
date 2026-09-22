import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const holdSource = await readFile('src/data/route-access-review-holds.ts', 'utf8');
const tripDetails = await readFile('src/data/trip-details/nebraska.ts', 'utf8');
const routeSource = await readFile('src/data/routes/nebraska.ts', 'utf8');
const controls = JSON.parse(await readFile('src/data/route-access-official-map-controls.json', 'utf8'));
const withheld = await readFile('src/data/generated/withheld-route-slugs.ts', 'utf8');
const releases = await readFile('src/data/route-coordinate-review-releases.ts', 'utf8');
const review = JSON.parse(await readFile('docs/access-remediation/2026-09-17-batch-25/review.json', 'utf8'));
const selection = JSON.parse(await readFile('docs/access-remediation/2026-09-17-batch-25/selection.json', 'utf8'));
const routeGeometries = await Promise.all([
  'loup-river-george-syas-monroe',
  'loup-river-george-syas-columbus',
  'loup-river-george-syas-adm-access',
].map(async (routeId) => JSON.parse(await readFile(`docs/access-remediation/2026-09-17-batch-25/geometry-review/${routeId}.json`, 'utf8'))));
const routeIds = [
  'loup-river-george-syas-monroe',
  'loup-river-george-syas-columbus',
  'loup-river-george-syas-adm-access',
];

assert.deepEqual(review.affectedRoutes, routeIds);
assert.deepEqual(selection.sites[0].dependentRoutes, routeIds);
assert.doesNotMatch(holdSource, /loup-river-george-syas-monroe/);
assert.doesNotMatch(withheld, /loup-river-george-syas-monroe/);
assert.match(releases, /loup-river-george-syas-monroe/);
for (const routeId of routeIds.slice(1)) {
  assert.match(holdSource, new RegExp(`['\"]${routeId}['\"]:`));
  assert.match(withheld, new RegExp(routeId));
}
assert.equal((tripDetails.match(/OBJECTID 97; 41\.42442894, -97\.6963078/g) ?? []).length, 3);
assert.doesNotMatch(`${routeSource}\n${tripDetails}`, /41\.43328221|-97\.68464875/);
assert.equal((routeSource.match(/"latitude": 41\.42442894/g) ?? []).length, 3);
assert.equal((routeSource.match(/"longitude": -97\.6963078/g) ?? []).length, 3);
const provider = controls.providers.find((item) => item.id === 'ne_ngpc_george_syas_paddlecraft_launch');
assert.ok(provider);
assert.equal(provider.coordinateRole, 'authoritative-water-entry');
assert.equal(provider.controls[0].featureId, 'b88540d4-96d4-4d74-9fed-473304b6e2f7');
assert.equal(provider.controls[0].latitude, 41.42442894);
assert.equal(provider.controls[0].longitude, -97.6963078);
assert.equal(routeGeometries[0].properties.traceMode, 'network-traced');
assert.equal(routeGeometries[0].geometry.coordinates.length, 1);
assert.ok(routeGeometries[0].properties.endpointSnapMaxFeet <= 250);
for (const geometry of routeGeometries.slice(1)) {
  assert.equal(geometry.properties.traceMode, 'named-fallback');
  assert.ok(geometry.properties.endpointSnapMaxFeet > 50000);
}
const publicMonroe = JSON.parse(await readFile('public/data/canonical-river-geometries/routes/loup-river-george-syas-monroe.json', 'utf8'));
assert.equal(publicMonroe.properties.traceMode, 'network-traced');
assert.equal(publicMonroe.geometry.coordinates.length, 1);
console.log('Batch 25 verification passed: the Syas launch coordinate is corrected; Monroe has validated geometry and is released; Columbus and ADM remain held.');
