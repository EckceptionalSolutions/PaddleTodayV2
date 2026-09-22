// Run from the repository root: node node_modules/tsx/dist/cli.mjs docs/access-remediation/2026-09-17-batch-29/verify.ts
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { listAllRiversForAudit, listRivers } from '../../../src/lib/rivers';
import { routeAccessReviewHolds } from '../../../src/data/route-access-review-holds';

type Point = { latitude: number; longitude: number };
type Occurrence = { routeId: string; endpoint: 'putIn' | 'takeOut' | 'accessPoint' };
const dir = 'docs/access-remediation/2026-09-17-batch-29';
const selection = JSON.parse(readFileSync(`${dir}/selection.json`, 'utf8')) as {
  sites: Array<{ name: string; previousCoordinate: Point; occurrences: Occurrence[] }>;
};
const review = JSON.parse(readFileSync(`${dir}/review.json`, 'utf8')) as {
  decisions: Array<{ name: string; previousCoordinate: Point; updatedCoordinate: Point; routeIds: string[]; decision: string }>;
  coordinatesChanged: number;
  uniquePublicRoutesWithChangedCoordinates: number;
  publicEndpointOccurrencesChanged: number;
  newRouteHolds: number;
};
const sources = JSON.parse(readFileSync(`${dir}/source-metadata.json`, 'utf8')) as { sources: unknown[] };
const audit = JSON.parse(readFileSync('docs/access-point-quality-audit.json', 'utf8')) as {
  evidenceMode: string;
  auditScope: string;
  routeCount: number;
  endpointCount: number;
  sourceIssues: unknown[];
  endpoints: Array<{ routeId: string; endpoint: string; latitude: number; longitude: number; hydrographyCoverageComplete: boolean }>;
};
const controls = JSON.parse(readFileSync('src/data/route-access-official-map-controls.json', 'utf8')) as {
  providers: Array<{ id: string; coordinateRole: string; controls: Array<Point & { featureId: string; name: string }> }>;
};
const registry = JSON.parse(readFileSync('src/data/generated/route-access-registry.json', 'utf8')) as {
  entries: Array<{ id: string; authoritativeAccess: { provider: string; featureId: string; coordinateRole: string } | null; accessCoordinate: Point | null; waterEntryCoordinate: Point | null }>;
};
const all = new Map(listAllRiversForAudit().map(route => [route.id, route]));
const visible = new Set(listRivers().map(route => route.id));
const decisions = new Map(review.decisions.map(item => [item.name, item]));

assert.equal(selection.sites.length, 10, 'the frozen batch must contain ten sites');
assert.equal(review.decisions.length, 10, 'all selected sites need decisions');
assert.equal(sources.sources.length, 14, 'source trail must include findings and limits for every site');
assert.equal(review.coordinatesChanged, 2);
assert.equal(review.uniquePublicRoutesWithChangedCoordinates, 9);
assert.equal(review.publicEndpointOccurrencesChanged, 9);
assert.equal(review.newRouteHolds, 0);
assert.equal(audit.evidenceMode, 'refreshed', 'canonical audit must use current network-backed evidence');
assert.equal(audit.auditScope, 'public-routes');
assert.equal(audit.routeCount, listRivers().length);
assert.equal(audit.routeCount, 2761);
assert.equal(audit.endpointCount, 6082);

let checkedOccurrences = 0;
const changedRoutes = new Set<string>();
for (const site of selection.sites) {
  const decision = decisions.get(site.name);
  assert.ok(decision, `Missing decision for ${site.name}`);
  assert.deepEqual(decision.previousCoordinate, site.previousCoordinate, `Frozen coordinate mismatch for ${site.name}`);
  for (const occurrence of site.occurrences) {
    const route = all.get(occurrence.routeId);
    assert.ok(route, `Missing route inventory record ${occurrence.routeId}`);
    assert.ok(visible.has(route.id), `Selected route unexpectedly withheld: ${route.id}`);
    const point = occurrence.endpoint === 'accessPoint'
      ? (route.accessPoints ?? []).find(candidate => candidate.latitude === decision.updatedCoordinate.latitude
        && candidate.longitude === decision.updatedCoordinate.longitude)
      : route[occurrence.endpoint];
    assert.ok(point, `Missing ${occurrence.endpoint} for ${route.id} / ${site.name}`);
    assert.equal(point.latitude, decision.updatedCoordinate.latitude, `${route.id} latitude for ${site.name}`);
    assert.equal(point.longitude, decision.updatedCoordinate.longitude, `${route.id} longitude for ${site.name}`);
    const audited = audit.endpoints.find(row => row.routeId === route.id && row.endpoint === occurrence.endpoint
      && row.latitude === decision.updatedCoordinate.latitude && row.longitude === decision.updatedCoordinate.longitude);
    assert.ok(audited, `Canonical audit is stale for ${route.id} / ${occurrence.endpoint}`);
    assert.equal(audited.hydrographyCoverageComplete, true, `Incomplete hydrography for corrected occurrence ${route.id}`);
    checkedOccurrences += 1;
    if (decision.previousCoordinate.latitude !== decision.updatedCoordinate.latitude
      || decision.previousCoordinate.longitude !== decision.updatedCoordinate.longitude) {
      changedRoutes.add(route.id);
      const points = [route.putIn, route.takeOut, ...(route.accessPoints ?? [])];
      const namePattern = decision.name.startsWith('Columbus') ? /Columbus.*(?:landing|access)/i : /Esmond Park/i;
      assert.ok(!points.some(candidate => candidate && namePattern.test(candidate.name)
        && candidate.latitude === decision.previousCoordinate.latitude && candidate.longitude === decision.previousCoordinate.longitude),
      `${route.id} retains the prior ${decision.name} coordinate`);
      if (occurrence.endpoint === 'putIn') {
        assert.equal(route.latitude, decision.updatedCoordinate.latitude, `${route.id} center latitude`);
        assert.equal(route.longitude, decision.updatedCoordinate.longitude, `${route.id} center longitude`);
      }
    }
  }
  for (const id of decision.routeIds) {
    assert.ok(visible.has(id), `Decision route is not public: ${id}`);
    assert.ok(!routeAccessReviewHolds[id], `Unexpected review hold on ${id}`);
  }
}
assert.equal(changedRoutes.size, 9, 'nine unique public routes must reflect the two coordinate corrections');

for (const [id, point] of [
  ['nc_hammocks_beach_huggins_mainland_access', { latitude: 34.671, longitude: -77.1429 }],
  ['blm_gila_box_dry_canyon_takeout', { latitude: 32.8922, longitude: -109.4921 }],
  ['mi_riverside_kayak_park_access', { latitude: 42.186122, longitude: -86.373262 }],
  ['ia_mitchell_interstate_park_cedar_access', { latitude: 43.319134, longitude: -92.879648 }],
  ['ri_esmond_park_portage_access', { latitude: 41.87905, longitude: -71.5023667 }],
] as const) {
  const provider = controls.providers.find(candidate => candidate.id === id);
  assert.equal(provider?.coordinateRole, 'authoritative-access-anchor', `Wrong coordinate role for ${id}`);
  const control = provider?.controls.find(candidate => candidate.latitude === point.latitude && candidate.longitude === point.longitude);
  assert.ok(control, `Missing source-backed access-area control for ${id}`);
}

const esmondRegistry = registry.entries.find(entry => entry.id.includes('esmond-park-dam-portage'));
assert.ok(esmondRegistry, 'Missing Esmond Park registry entry');
assert.equal(esmondRegistry.authoritativeAccess?.provider, 'ri_esmond_park_portage_access');
assert.equal(esmondRegistry.authoritativeAccess?.coordinateRole, 'authoritative-access-anchor');
assert.ok(esmondRegistry.accessCoordinate);
assert.ok(Math.abs(esmondRegistry.accessCoordinate.latitude - 41.87905) < 1e-7);
assert.ok(Math.abs(esmondRegistry.accessCoordinate.longitude - -71.5023667) < 1e-7);
assert.equal(esmondRegistry.waterEntryCoordinate, null, 'do not invent an Esmond wet-edge coordinate');

const iowaTripDetails = readFileSync('src/data/trip-details/iowa.ts', 'utf8');
assert.match(iowaTripDetails, /no developed canoe\/kayak launch exists below the dam/i);
assert.match(iowaTripDetails, /do not proceed if the carry or landing is unsuitable/i);
const rhodeIslandRoutes = readFileSync('src/data/routes/rhode-island-woonasquatucket.ts', 'utf8');
assert.match(rhodeIslandRoutes, /ExploreRI Esmond Park Portage access listing/);
assert.match(rhodeIslandRoutes, /41\.87905, longitude: -71\.5023667/);

const validation = {
  checkedAt: new Date().toISOString(),
  sitesReviewed: review.decisions.length,
  coordinatesChanged: review.coordinatesChanged,
  uniqueRoutesWithChangedCoordinates: changedRoutes.size,
  selectedOccurrencesChecked: checkedOccurrences,
  uniqueRoutesRetainedPublic: new Set(selection.sites.flatMap(site => site.occurrences.map(item => item.routeId))).size,
  newRouteHolds: review.newRouteHolds,
  publicAudit: {
    evidenceMode: audit.evidenceMode,
    routeCount: audit.routeCount,
    endpointCount: audit.endpointCount,
    sourceIssues: audit.sourceIssues.length,
    correctedOccurrencesHydrographyComplete: true,
  },
  sourceBackedAccessAnchorsChecked: 5,
  wetEdgeCoordinatesUnresolved: 10,
  validationNotes: [
    'Full typecheck is blocked by six existing errors in src/data/routes/new-york.ts, src/data/routes/wisconsin.ts, and src/data/trip-details/iowa.ts (the Iowa error is outside this batch’s changed lines).',
    'Route geometry audit passed with 2,748/2,761 public routes matched; the same 13 existing unmatched routes remain.',
  ],
};
writeFileSync(`${dir}/validation.json`, `${JSON.stringify(validation, null, 2)}\n`);
console.log(validation);
