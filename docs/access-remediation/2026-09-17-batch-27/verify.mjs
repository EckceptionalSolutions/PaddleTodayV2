import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const parse = async (path) => JSON.parse(await readFile(path, 'utf8'));
const [selection, review, sources, controls, routeAudit] = await Promise.all([
  parse('docs/access-remediation/2026-09-17-batch-27/selection.json'),
  parse('docs/access-remediation/2026-09-17-batch-27/review.json'),
  parse('docs/access-remediation/2026-09-17-batch-27/source-metadata.json'),
  parse('src/data/route-access-official-map-controls.json'),
  parse('docs/access-remediation/2026-09-17-batch-27/route-audit.json'),
]);
const tripDetails = await readFile('src/data/trip-details/michigan.ts', 'utf8');
const routeSource = await readFile('src/data/routes/michigan.ts', 'utf8');

assert.equal(selection.siteCount, 1);
assert.equal(review.decisions.length, 1);
assert.equal(sources.sources.length, 1);
assert.equal(routeAudit.evidenceMode, 'refreshed');
assert.equal(routeAudit.routeCount, 1);
assert.equal(routeAudit.endpointCount, 2);
const takeOut = routeAudit.endpoints.find((endpoint) => endpoint.endpoint === 'takeOut');
assert.equal(takeOut.routeId, 'kalamazoo-river-comstock-mayors-riverfront');
assert.equal(takeOut.latitude, 42.29142);
assert.equal(takeOut.longitude, -85.56233);
assert.equal(takeOut.coordinateEvidenceRole, 'authoritative-access-anchor');
assert.equal(takeOut.severity, 'review');
assert.ok(takeOut.distanceFeetToNearestWaterway <= 150);
assert.equal(takeOut.waterProximity, 'within-100ft');

const control = controls.providers.find((provider) => provider.id === 'mi_mayors_riverfront_park_kalamazoo_access_anchor');
assert.equal(control?.coordinateRole, 'authoritative-access-anchor');
assert.equal(control?.controls?.[0]?.latitude, 42.29142);
assert.equal(control?.controls?.[0]?.longitude, -85.56233);
assert.match(tripDetails, /"mayors-riverfront-park"[^\n]*42\.29142, "longitude": -85\.56233/);
assert.doesNotMatch(tripDetails, /"mayors-riverfront-park"[^\n]*42\.29059, "longitude": -85\.56645/);
assert.match(routeSource, /remains an access anchor rather than a surveyed wet edge/);

console.log('Batch 27 verification passed: Mayor\'s Riverfront Park uses its published public-access GPS and is within 150 ft of the named river.');
