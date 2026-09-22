// Run from the repository root: node node_modules/tsx/dist/cli.mjs docs/access-remediation/2026-09-17-batch-30/verify.ts
import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { listAllRiversForAudit, listRivers } from '../../../src/lib/rivers';
import { routeAccessReviewHolds } from '../../../src/data/route-access-review-holds';
import { riverTripDetails } from '../../../src/data/river-trip-details';
import { isAccessPointForQualityAudit } from '../../../scripts/lib/access-point-audit-role';

type Point = { latitude: number; longitude: number };
type Occurrence = { routeId: string; endpoint: 'putIn' | 'takeOut' | 'accessPoint'; endpointName: string };
type Site = Point & {
  siteNumber: number;
  decision: string;
  newCoordinate?: Point;
  occurrences: Occurrence[];
  routeIds: string[];
  publicRouteIds: string[];
  heldRouteIds: string[];
  publicationAction: string;
};
const dir = 'docs/access-remediation/2026-09-17-batch-30';
const review = JSON.parse(readFileSync(`${dir}/review.json`, 'utf8')) as { sites: Site[] };
const all = new Map(listAllRiversForAudit().map(route => [route.id, route]));
const visible = new Set(listRivers().map(route => route.id));
assert.equal(review.sites.length, 10);
assert.equal(new Set(review.sites.flatMap(site => site.routeIds)).size, 20);
let checkedOccurrences = 0;
let checkedTripDetailCopies = 0;

for (const site of review.sites) {
  const expected = site.newCoordinate ?? site;
  for (const occurrence of site.occurrences) {
    const route = all.get(occurrence.routeId);
    assert.ok(route, `Missing inventory route ${occurrence.routeId}`);
    if (site.siteNumber === 1 && occurrence.endpoint === 'accessPoint') {
      assert.ok(!(route.accessPoints ?? []).some(point => point.id === 'gunpowder-york-road'), 'York access point must be removed');
      checkedOccurrences++;
      continue;
    }
    const point = occurrence.endpoint === 'accessPoint'
      ? route.accessPoints?.find(candidate => candidate.name === occurrence.endpointName)
      : route[occurrence.endpoint];
    assert.ok(point, `Missing ${occurrence.endpoint} ${occurrence.endpointName} on ${route.id}`);
    assert.equal(point.latitude, expected.latitude, `${route.id} ${occurrence.endpoint} latitude`);
    assert.equal(point.longitude, expected.longitude, `${route.id} ${occurrence.endpoint} longitude`);
    checkedOccurrences++;
    if (site.newCoordinate && site.siteNumber === 6) {
      if (occurrence.endpoint === 'accessPoint') throw new Error('Corrected Farm Field site must be checked as a terminal copy');
      const detailPoint = riverTripDetails[route.id]?.[occurrence.endpoint];
      assert.ok(detailPoint, `Missing trip-detail endpoint copy ${route.id} ${occurrence.endpoint}`);
      assert.equal(detailPoint.latitude, expected.latitude, `${route.id} trip-detail endpoint latitude`);
      assert.equal(detailPoint.longitude, expected.longitude, `${route.id} trip-detail endpoint longitude`);
      checkedTripDetailCopies++;
      for (const copy of route.accessPoints ?? []) {
        if (copy.name !== occurrence.endpointName) continue;
        assert.equal(copy.latitude, expected.latitude, `${route.id} access copy latitude`);
        assert.equal(copy.longitude, expected.longitude, `${route.id} access copy longitude`);
      }
      assert.ok(![route.putIn, route.takeOut, ...(route.accessPoints ?? [])].some(candidate =>
        candidate?.latitude === site.latitude && candidate?.longitude === site.longitude), `${route.id} retains old Farm Field coordinate`);
      if (occurrence.endpoint === 'putIn') {
        assert.equal(route.latitude, expected.latitude, `${route.id} route center latitude`);
        assert.equal(route.longitude, expected.longitude, `${route.id} route center longitude`);
      }
    }
  }
  for (const id of site.routeIds) assert.ok(all.has(id), `Missing retained inventory record ${id}`);
  for (const id of site.publicRouteIds) assert.ok(visible.has(id), `Expected public route is hidden: ${id}`);
  for (const id of site.heldRouteIds) {
    assert.ok(routeAccessReviewHolds[id], `Missing manual hold ${id}`);
    assert.ok(!visible.has(id), `Held route is public: ${id}`);
  }
}

const controls = JSON.parse(readFileSync('src/data/route-access-official-map-controls.json', 'utf8')) as {
  providers: Array<{ coordinateRole: string; controls: Array<Point & { featureId: string }> }>;
};
const farmFieldProvider = controls.providers.find(provider => provider.controls
  .some(control => control.featureId === 'siouxfalls-farm-field-park-mapped-boat-ramp-poi'));
const farmFieldControl = farmFieldProvider?.controls.find(control => control.featureId === 'siouxfalls-farm-field-park-mapped-boat-ramp-poi');
assert.ok(farmFieldControl && farmFieldProvider, 'Missing Farm Field Park provenance control');
assert.equal(farmFieldControl.latitude, 43.5013198);
assert.equal(farmFieldControl.longitude, -96.7504983);
assert.equal(farmFieldProvider.coordinateRole, 'authoritative-access-anchor');

const authoritativeEvidence = JSON.parse(readFileSync('docs/route-coordinate-authoritative-evidence.json', 'utf8')) as {
  items: Array<{ routeId: string; endpoint: string; candidates: Array<Point & { featureId: string; coordinateRole: string; uncertaintyFeet: number }> }>;
};
for (const [routeId, endpoint] of [
  ['big-sioux-river-farm-field-rotary', 'putIn'],
  ['skunk-creek-legacy-park-farm-field', 'takeOut'],
] as const) {
  const item = authoritativeEvidence.items.find(candidate => candidate.routeId === routeId && candidate.endpoint === endpoint
    && candidate.candidates.some(control => control.featureId === 'siouxfalls-farm-field-park-mapped-boat-ramp-poi'));
  const control = item?.candidates.find(candidate => candidate.featureId === 'siouxfalls-farm-field-park-mapped-boat-ramp-poi');
  assert.ok(control, `Missing refreshed Farm Field authoritative evidence for ${routeId} ${endpoint}`);
  assert.equal(control.latitude, 43.5013198);
  assert.equal(control.longitude, -96.7504983);
  assert.equal(control.coordinateRole, 'authoritative-access-anchor');
  assert.equal(control.uncertaintyFeet, 100);
}
const accessRegistry = JSON.parse(readFileSync('src/data/generated/route-access-registry.json', 'utf8')) as {
  entries: Array<{ name: string; storedAccessCoordinate: Point; accessCoordinate: Point; authoritativeAccess?: Point & { featureId: string; coordinateRole: string; uncertaintyFeet: number } }>;
};
const farmFieldRegistryEntry = accessRegistry.entries.find(entry => entry.name === 'Farm Field Park kayak and canoe access');
assert.ok(farmFieldRegistryEntry?.authoritativeAccess, 'Missing Farm Field generated registry entry');
assert.equal(farmFieldRegistryEntry.storedAccessCoordinate.latitude, 43.5013198);
assert.equal(farmFieldRegistryEntry.storedAccessCoordinate.longitude, -96.7504983);
assert.equal(farmFieldRegistryEntry.accessCoordinate.latitude, 43.5013198);
assert.equal(farmFieldRegistryEntry.accessCoordinate.longitude, -96.7504983);
assert.equal(farmFieldRegistryEntry.authoritativeAccess.featureId, 'siouxfalls-farm-field-park-mapped-boat-ramp-poi');
assert.equal(farmFieldRegistryEntry.authoritativeAccess.uncertaintyFeet, 100);

const qualityAudit = JSON.parse(readFileSync('docs/access-point-quality-audit.json', 'utf8')) as {
  generatedAt: string;
  auditScope: string;
  routeCount: number;
  endpointCount: number;
  sourceIssues: Array<{ message: string }>;
  bySeverity: Record<string, number>;
  waterProximitySummary: Record<string, number>;
  endpoints: Array<{ routeId: string; endpointName: string; latitude: number; longitude: number; severity: string; waterProximity: string; distanceFeetToMappedWater: number | null; hydrographyCoverageComplete: boolean }>;
};
const auditRoutes = listRivers();
const expectedAuditEndpointCount = auditRoutes.reduce((count, current) => {
  const valid = (point: Point | undefined) => Boolean(point && Number.isFinite(point.latitude) && Number.isFinite(point.longitude));
  const same = (a: Point | undefined, b: Point | undefined) => a && b && a.latitude === b.latitude && a.longitude === b.longitude;
  const putIn = valid(current.putIn) ? current.putIn : undefined;
  const takeOut = valid(current.takeOut) ? current.takeOut : undefined;
  return count + Number(Boolean(putIn && isAccessPointForQualityAudit(putIn)))
    + Number(Boolean(takeOut && isAccessPointForQualityAudit(takeOut)))
    + (current.accessPoints ?? []).filter(isAccessPointForQualityAudit).filter(valid)
      .filter(point => !same(point, putIn) && !same(point, takeOut)).length;
}, 0);
assert.equal(qualityAudit.auditScope, 'public-routes');
assert.equal(qualityAudit.routeCount, auditRoutes.length);
assert.equal(qualityAudit.endpointCount, expectedAuditEndpointCount);
const farmFieldAuditEndpoints = qualityAudit.endpoints.filter(endpoint => endpoint.endpointName === 'Farm Field Park kayak and canoe access');
assert.equal(farmFieldAuditEndpoints.length, 2);
assert.ok(farmFieldAuditEndpoints.every(endpoint => endpoint.latitude === 43.5013198 && endpoint.longitude === -96.7504983
  && endpoint.waterProximity === 'within-100ft' && endpoint.hydrographyCoverageComplete));

const route = all.get('gunpowder-falls-masemore-monkton')!;
assert.ok(visible.has(route.id), 'Gunpowder route should remain public');
assert.ok(!(route.accessPoints ?? []).some(point => point.id === 'gunpowder-york-road'));
assert.equal(review.sites.reduce((sum, site) => sum + site.heldRouteIds.length, 0), 13);
assert.equal(review.sites.reduce((sum, site) => sum + site.publicRouteIds.length, 0), 7);

const changedPublicRoutes = [
  'gunpowder-falls-masemore-monkton',
  'big-sioux-river-farm-field-rotary',
  'skunk-creek-legacy-park-farm-field',
  'spokane-river-barker-mirabeau',
  'spokane-river-harvard-mirabeau',
];
const geometryManifest = JSON.parse(readFileSync('public/data/canonical-river-geometries.json', 'utf8')) as {
  routeCount: number; matchedRouteCount: number; unmatchedRouteIds: string[];
};
for (const id of changedPublicRoutes) {
  const file = `public/data/canonical-river-geometries/routes/${id}.json`;
  assert.ok(existsSync(file), `Missing regenerated geometry asset ${id}`);
  const geometry = JSON.parse(readFileSync(file, 'utf8')) as { properties: { endpointSnapMaxFeet?: number | null; traceMode?: string } };
  assert.ok(geometry.properties.traceMode, `Missing trace mode ${id}`);
  assert.ok((geometry.properties.endpointSnapMaxFeet ?? Infinity) <= 500, `Endpoint trace exceeds 500 feet for ${id}`);
}
for (const id of review.sites.flatMap(site => site.heldRouteIds)) {
  assert.ok(!existsSync(`public/data/canonical-river-geometries/routes/${id}.json`), `Held route remains in public geometry assets: ${id}`);
}

const result = {
  checkedAt: new Date().toISOString(),
  sites: review.sites.length,
  correctedSites: review.sites.filter(site => site.newCoordinate).length,
  rejectedSites: review.sites.filter(site => !site.newCoordinate).length,
  checkedOccurrences,
  checkedTripDetailCopies,
  affectedInventoryRoutesRetained: new Set(review.sites.flatMap(site => site.routeIds)).size,
  affectedRoutesPublic: new Set(review.sites.flatMap(site => site.publicRouteIds)).size,
  affectedRoutesWithheld: new Set(review.sites.flatMap(site => site.heldRouteIds)).size,
  farmFieldAnchor: { latitude: farmFieldControl.latitude, longitude: farmFieldControl.longitude, uncertaintyFeet: 100 },
  refreshedAuthoritativeEvidenceCopies: 2,
  refreshedRegistryEntries: accessRegistry.entries.length,
  regeneratedPublicRouteGeometries: changedPublicRoutes.length,
  heldRouteGeometryAssetsPresent: 0,
  publicGeometryManifest: { routes: geometryManifest.routeCount, matched: geometryManifest.matchedRouteCount, unmatched: geometryManifest.unmatchedRouteIds.length },
  networkAudit: {
    generatedAt: qualityAudit.generatedAt,
    scope: qualityAudit.auditScope,
    routes: qualityAudit.routeCount,
    endpoints: qualityAudit.endpointCount,
    sourceIssues: qualityAudit.sourceIssues.length,
    severity: qualityAudit.bySeverity,
    sourceIssueMessageCounts: qualityAudit.sourceIssues.reduce<Record<string, number>>((counts, issue) => {
      counts[issue.message] = (counts[issue.message] ?? 0) + 1;
      return counts;
    }, {}),
    waterProximity: qualityAudit.waterProximitySummary,
    farmFieldWaterDistanceFeet: farmFieldAuditEndpoints.map(endpoint => endpoint.distanceFeetToMappedWater),
    mirabeauAuditEndpoints: qualityAudit.endpoints.filter(endpoint => endpoint.endpointName.includes('Mirabeau Park')).map(endpoint => ({
      routeId: endpoint.routeId,
      severity: endpoint.severity,
      waterProximity: endpoint.waterProximity,
      distanceFeetToMappedWater: endpoint.distanceFeetToMappedWater,
      hydrographyCoverageComplete: endpoint.hydrographyCoverageComplete,
    })),
  },
  additionalChecks: existsSync(`${dir}/validation.json`)
    ? (JSON.parse(readFileSync(`${dir}/validation.json`, 'utf8')) as { additionalChecks?: Record<string, unknown> }).additionalChecks ?? {}
    : {},
};
writeFileSync(`${dir}/validation.json`, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
