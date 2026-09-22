import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(path, 'utf8');
const parse = async (path) => JSON.parse(await read(path));
const [selection, review, sources, controls] = await Promise.all([
  parse('docs/access-remediation/2026-09-17-batch-26/selection.json'),
  parse('docs/access-remediation/2026-09-17-batch-26/review.json'),
  parse('docs/access-remediation/2026-09-17-batch-26/source-metadata.json'),
  parse('src/data/route-access-official-map-controls.json'),
]);
const audit = await parse('docs/access-point-quality-audit-refreshed.json');
const routeSource = await read('src/data/routes/wisconsin.ts');
const detailsSource = await read('src/data/trip-details/wisconsin.ts');
const generatedWithheld = await read('src/data/generated/withheld-route-slugs.ts');
const holdSource = await read('src/data/route-access-review-holds.ts');
const releasesSource = await read('src/data/route-coordinate-review-releases.ts');

assert.equal(selection.siteCount, 10);
assert.equal(selection.sites.length, 10);
assert.equal(review.siteCount, 10);
assert.equal(review.siteDecisions.length, 9);
assert.equal(sources.sources.length, 10);
assert.equal(audit.evidenceMode, 'refreshed');
assert.equal(audit.routeCount, 2998);
assert.equal(audit.endpointCount, 6642);
const auditedRiverside = audit.endpoints.find((endpoint) => endpoint.routeId === 'milwaukee-river-riverside-bruce-street' && endpoint.endpoint === 'putIn');
assert.equal(auditedRiverside.coordinateEvidenceRole, 'authoritative-water-entry');
assert.equal(auditedRiverside.waterProximity, 'within-100ft');
assert.ok(auditedRiverside.distanceFeetToNearestWaterway <= 100);
for (const routeId of [
  'verde-river-bignotti-sheep-crossing',
  'big-fork-river-johnson-big-falls-east',
  'south-fork-ogden-river-willows-magpie',
  'verde-river-skidmore-black-canyon',
]) {
  const endpoint = audit.endpoints.find((candidate) => candidate.routeId === routeId && candidate.endpointName.includes('access') || candidate.routeId === routeId && candidate.endpointName.includes('Landing') || candidate.routeId === routeId && candidate.endpointName.includes('Perception'));
  assert.equal(endpoint?.coordinateEvidenceRole, 'authoritative-access-anchor', `missing access-anchor role for ${routeId}`);
}

const routeId = 'milwaukee-river-riverside-bruce-street';
const routeStart = routeSource.indexOf(`"id": "${routeId}"`);
const routeEnd = routeSource.indexOf('\n  {\n    "id":', routeStart + 1);
const routeBlock = routeSource.slice(routeStart, routeEnd < 0 ? undefined : routeEnd);
const detailStart = detailsSource.indexOf(`"${routeId}": {`);
const detailEnd = detailsSource.indexOf('\n  "', detailStart + 4);
const detailBlock = detailsSource.slice(detailStart, detailEnd < 0 ? undefined : detailEnd);
assert.ok(routeStart >= 0 && detailStart >= 0);
assert.match(routeBlock, /43\.06739422/);
assert.match(routeBlock, /-87\.89480066/);
assert.doesNotMatch(routeBlock, /43\.0674,\s*"longitude": -87\.89238/);
assert.match(detailBlock, /43\.06739422/);
assert.match(detailBlock, /-87\.89480066/);
assert.doesNotMatch(detailBlock, /-87\.89238/);

const providerIds = new Set(controls.providers.map((provider) => provider.id));
for (const id of [
  'wi_milwaukee_riverside_park_canoe_launch',
  'az_verde_sheep_crossing_rap',
  'mn_big_fork_johnson_landing',
  'ut_perception_park_campground_access',
]) assert.ok(providerIds.has(id), `missing reviewed source control ${id}`);

const withheld = new Set(JSON.parse(generatedWithheld.match(/= (\[[\s\S]*?\]) as const;/)[1]));
assert.equal(withheld.size, 180);
assert.ok(!withheld.has('loup-river-george-syas-monroe'));
assert.ok(withheld.has('loup-river-george-syas-columbus'));
assert.ok(withheld.has('loup-river-george-syas-adm-access'));
assert.ok(!holdSource.includes('loup-river-george-syas-monroe'));
assert.ok(releasesSource.includes('loup-river-george-syas-monroe'));
assert.ok(holdSource.includes('loup-river-george-syas-columbus'));
assert.ok(holdSource.includes('loup-river-george-syas-adm-access'));
assert.ok(withheld.has('woonasquatucket-river-cricket-manton'));

const geometry = await parse(`public/data/canonical-river-geometries/routes/${routeId}.json`);
const monroeGeometry = await parse('public/data/canonical-river-geometries/routes/loup-river-george-syas-monroe.json');
const manifest = await parse('public/data/canonical-river-geometries.json');
assert.equal(geometry.properties.routeId, routeId);
assert.equal(monroeGeometry.properties.traceMode, 'network-traced');
assert.ok(monroeGeometry.properties.endpointSnapMaxFeet <= 250);
assert.equal(monroeGeometry.geometry.coordinates.length, 1);
assert.equal(manifest.routeCount, 2761);
assert.equal(manifest.matchedRouteCount, 2748);

console.log('Batch 26 verification passed: ten sites reviewed, Riverside corrected to the mapped ramp, access anchors documented, and only the geometry-validated Syas–Monroe route released.');
