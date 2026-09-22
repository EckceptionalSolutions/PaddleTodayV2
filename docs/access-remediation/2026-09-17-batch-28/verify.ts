// Run from the repository root: npx tsx docs/access-remediation/2026-09-17-batch-28/verify.ts
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { listAllRiversForAudit, listRivers } from '../../../src/lib/rivers';
import { routeAccessReviewHolds } from '../../../src/data/route-access-review-holds';

type Point = { latitude: number; longitude: number };
type Occurrence = { routeId: string; endpoint: 'putIn' | 'takeOut' | 'accessPoint' };
const dir = 'docs/access-remediation/2026-09-17-batch-28';
const selection = JSON.parse(readFileSync(`${dir}/selection.json`, 'utf8')) as {
  sites: Array<{ name: string; previousCoordinate: Point; occurrences: Occurrence[] }>;
};
const review = JSON.parse(readFileSync(`${dir}/review.json`, 'utf8')) as {
  decisions: Array<{
    name: string;
    previousCoordinate: Point;
    updatedCoordinate: Point;
    routeIds: string[];
    decision: string;
  }>;
  routeDisposition: { newlyHeld: string[]; uniqueRoutesWithChangedCoordinates: number };
};
const sourceMetadata = JSON.parse(readFileSync(`${dir}/source-metadata.json`, 'utf8')) as { sources: unknown[] };
const publicAudit = JSON.parse(readFileSync('docs/access-point-quality-audit.json', 'utf8')) as {
  evidenceMode: string;
  auditScope: string;
  routeCount: number;
  endpointCount: number;
  sourceIssues: unknown[];
  refreshProvenance: { selectedOccurrencesWithCompleteHydrography: number; selectedOccurrencesWithIncompleteHydrography: number };
  endpoints: Array<{ routeId: string; endpoint: string; endpointName: string; hydrographyCoverageComplete: boolean }>;
};
const hudsonRoleAudit = JSON.parse(readFileSync(`${dir}/hudson-audit-final-alias.json`, 'utf8')) as {
  endpoints: Array<{
    routeId: string;
    endpoint: string;
    coordinateEvidenceRole: string | null;
    coordinateEvidenceSourceUrl: string | null;
    coordinateEvidenceDetail: string | null;
  }>;
};
const noblewoodRoleAudit = JSON.parse(readFileSync(`${dir}/noblewood-audit-final-alias.json`, 'utf8')) as {
  endpoints: Array<{
    routeId: string;
    endpoint: string;
    coordinateEvidenceRole: string | null;
    coordinateEvidenceDetail: string | null;
    sourceIssues?: unknown[];
  }>;
};
const controls = JSON.parse(readFileSync('src/data/route-access-official-map-controls.json', 'utf8')) as {
  providers: Array<{ id: string; coordinateRole: string; controls: Array<Point & { name: string }> }>;
};
const registry = JSON.parse(readFileSync('src/data/generated/route-access-registry.json', 'utf8')) as {
  entries: Array<{
    id: string;
    authoritativeAccess: (Point & { provider: string; featureId: string; coordinateRole: string }) | null;
    authoritativeFacilityAnchor: { featureId: string } | null;
    accessCoordinate: Point | null;
    waterEntryCoordinate: Point | null;
  }>;
};
const all = new Map(listAllRiversForAudit().map(route => [route.id, route]));
const visible = new Set(listRivers().map(route => route.id));

assert.equal(selection.sites.length, 10, 'frozen batch must contain ten sites');
assert.equal(review.decisions.length, 10, 'all selected sites need decisions');
assert.ok(sourceMetadata.sources.length >= 10, 'source trail must cover the batch');
assert.deepEqual(review.routeDisposition.newlyHeld, [], 'this batch should not add a route hold');
assert.equal(publicAudit.evidenceMode, 'refreshed', 'canonical audit must use refreshed hydrography');
assert.equal(publicAudit.auditScope, 'public-routes', 'canonical audit must cover published routes');
assert.equal(publicAudit.routeCount, 2761, 'canonical audit public-route coverage');
assert.equal(publicAudit.endpointCount, 6082, 'canonical audit endpoint coverage');
assert.equal(publicAudit.refreshProvenance.selectedOccurrencesWithCompleteHydrography, 26);
assert.equal(publicAudit.refreshProvenance.selectedOccurrencesWithIncompleteHydrography, 1);

const decisions = new Map(review.decisions.map(decision => [decision.name, decision]));
const affectedRoutes = new Set<string>();
let checkedOccurrences = 0;
let checkedCopiedAccessPoints = 0;
for (const site of selection.sites) {
  const decision = decisions.get(site.name);
  assert.ok(decision, `Missing decision for ${site.name}`);
  assert.deepEqual({ latitude: decision.previousCoordinate.latitude, longitude: decision.previousCoordinate.longitude },
    { latitude: site.previousCoordinate.latitude, longitude: site.previousCoordinate.longitude }, `Frozen source coordinate mismatch for ${site.name}`);
  for (const occurrence of site.occurrences) {
    const route = all.get(occurrence.routeId);
    assert.ok(route, `Missing source inventory route ${occurrence.routeId}`);
    assert.ok(visible.has(route.id), `Reviewed route unexpectedly withheld: ${route.id}`);
    affectedRoutes.add(route.id);
    const point = occurrence.endpoint === 'accessPoint'
      ? (route.accessPoints ?? []).find(item => item.name === site.name)
      : route[occurrence.endpoint];
    assert.ok(point, `Missing ${occurrence.endpoint} for ${route.id} / ${site.name}`);
    assert.equal(point.latitude, decision.updatedCoordinate.latitude, `${route.id} updated latitude`);
    assert.equal(point.longitude, decision.updatedCoordinate.longitude, `${route.id} updated longitude`);
    checkedOccurrences++;

    for (const copy of route.accessPoints ?? []) {
      if (copy.name !== point.name) continue;
      assert.equal(copy.latitude, decision.updatedCoordinate.latitude, `${route.id} copied access latitude`);
      assert.equal(copy.longitude, decision.updatedCoordinate.longitude, `${route.id} copied access longitude`);
      checkedCopiedAccessPoints++;
    }
    if (decision.previousCoordinate.latitude !== decision.updatedCoordinate.latitude
      || decision.previousCoordinate.longitude !== decision.updatedCoordinate.longitude) {
      const routePoints = [route.putIn, route.takeOut, ...(route.accessPoints ?? [])];
      assert.ok(!routePoints.some(item => item?.name === site.name
        && item.latitude === decision.previousCoordinate.latitude
        && item.longitude === decision.previousCoordinate.longitude), `${route.id} retains the old ${site.name} coordinate`);
      if (occurrence.endpoint === 'putIn') {
        assert.equal(route.latitude, decision.updatedCoordinate.latitude, `${route.id} route center latitude follows put-in`);
        assert.equal(route.longitude, decision.updatedCoordinate.longitude, `${route.id} route center longitude follows put-in`);
      }
    }
  }
  for (const id of decision.routeIds) {
    assert.ok(visible.has(id), `Reviewed route unexpectedly hidden: ${id}`);
    assert.ok(!routeAccessReviewHolds[id], `Unexpected manual hold for ${id}`);
  }
}

const expectControl = (id: string, point: Point, role = 'authoritative-access-anchor') => {
  const provider = controls.providers.find(item => item.id === id);
  assert.equal(provider?.coordinateRole, role, `Control role for ${id}`);
  assert.ok(provider?.controls.some(item => item.latitude === point.latitude && item.longitude === point.longitude),
    `Missing expected control coordinate for ${id}`);
};
expectControl('la_charenton_teche_dock', { latitude: 29.8859107, longitude: -91.5351294 });
expectControl('la_loreauville_teche_dock', { latitude: 30.056667, longitude: -91.74 });
expectControl('wi_lower_cato_falls_scout_access', { latitude: 44.0903, longitude: -87.8439 });
expectControl('wv_valley_falls_river_right_checkin', { latitude: 39.38897, longitude: -80.08733 });
expectControl('wi_holiday_heights_park_canoe_access', { latitude: 43.86201, longitude: -91.20178 });
expectControl('mt_russell_gates_memorial_fas', { latitude: 47.0234361031, longitude: -113.306023437 });
expectControl('mi_historic_bridge_park_kayak_launch', { latitude: 42.29236, longitude: -85.11431 });
expectControl('hudson_river_indian_confluence_north_river', { latitude: 43.8275, longitude: -74.2008 });
expectControl('boquet_river_willsboro_noblewood', { latitude: 44.3523, longitude: -73.359958 });
for (const [id, provider, featureId, point] of [
  ['louisiana--charenton-official-dock-access-area-3726-chitimacha-trail', 'la_charenton_teche_dock', 'osm-node-12990648902-charenton-paddle-dock', { latitude: 29.8859107, longitude: -91.5351294 }],
  ['louisiana--loreauville-official-dock-access-area-119-bridge-st', 'la_loreauville_teche_dock', 'iberia-travel-loreauville-floating-dock', { latitude: 30.056667, longitude: -91.74 }],
  ['new-york--outer-gooley-parking-area-hudson-gorge-carry', 'hudson_river_indian_confluence_north_river', 'old-outer-gooley-hudson-gorge-put-in', { latitude: 43.8275, longitude: -74.2008 }],
  ['new-york--noblewood-park-cartop-launch-boquet-mouth-access-area', 'boquet_river_willsboro_noblewood', 'boquet-river-noblewood-park-take-out', { latitude: 44.3523, longitude: -73.359958 }],
] as const) {
  const entry = registry.entries.find(item => item.id === id);
  assert.ok(entry, `Missing generated access registry entry ${id}`);
  assert.equal(entry.authoritativeAccess?.provider, provider, `${id} authoritative provider`);
  assert.equal(entry.authoritativeAccess?.featureId, featureId, `${id} authoritative feature`);
  assert.equal(entry.authoritativeAccess?.coordinateRole, 'authoritative-access-anchor', `${id} access anchor role`);
  assert.equal(entry.authoritativeFacilityAnchor?.featureId, featureId, `${id} facility anchor`);
  assert.deepEqual(entry.accessCoordinate, point, `${id} access coordinate`);
  assert.equal(entry.waterEntryCoordinate, null, `${id} exact wet-edge coordinate must stay unresolved`);
}
const outerGooleyAudit = hudsonRoleAudit.endpoints.find(row => row.routeId === 'hudson-river-indian-confluence-north-river'
  && row.endpoint === 'putIn');
assert.equal(outerGooleyAudit?.coordinateEvidenceRole, 'authoritative-access-anchor');
assert.match(outerGooleyAudit?.coordinateEvidenceDetail ?? '', /hudson_river_newcomb_indian_confluence outer-gooley-hudson-river-takeout/);
const noblewoodAudit = noblewoodRoleAudit.endpoints.find(row => row.routeId === 'boquet-river-willsboro-noblewood'
  && row.endpoint === 'takeOut');
assert.equal(noblewoodAudit?.coordinateEvidenceRole, 'authoritative-access-anchor');
assert.match(noblewoodAudit?.coordinateEvidenceDetail ?? '', /boquet_river_willsboro_noblewood boquet-river-noblewood-park-take-out/);

const wisconsinRoutes = readFileSync('src/data/routes/wisconsin.ts', 'utf8');
const wisconsinTripDetails = readFileSync('src/data/trip-details/wisconsin.ts', 'utf8');
assert.match(wisconsinRoutes, /Scout Lower Cato Falls from the public park before launching\.[^\n]*does not establish a bypass carry/);
assert.match(wisconsinTripDetails, /do not establish a bypass carry/);

const validation = {
  checkedAt: new Date().toISOString(),
  sitesReviewed: review.decisions.length,
  coordinatesChanged: review.decisions.filter(item => item.previousCoordinate.latitude !== item.updatedCoordinate.latitude
    || item.previousCoordinate.longitude !== item.updatedCoordinate.longitude).length,
  providerRolesCorrected: review.decisions.filter(item => item.decision === 'correct-coordinate-role-to-access-anchor').length,
  uniqueRoutesWithChangedCoordinates: review.routeDisposition.uniqueRoutesWithChangedCoordinates,
  selectedOccurrencesChecked: checkedOccurrences,
  copiedAccessPointsChecked: checkedCopiedAccessPoints,
  uniqueRoutesRetainedPublic: affectedRoutes.size,
  newRouteHolds: review.routeDisposition.newlyHeld.length,
  publicAudit: {
    evidenceMode: publicAudit.evidenceMode,
    routeCount: publicAudit.routeCount,
    endpointCount: publicAudit.endpointCount,
    sourceIssues: publicAudit.sourceIssues.length,
    selectedOccurrencesWithCompleteHydrography: publicAudit.refreshProvenance.selectedOccurrencesWithCompleteHydrography,
    selectedOccurrencesWithIncompleteHydrography: publicAudit.refreshProvenance.selectedOccurrencesWithIncompleteHydrography,
  },
  sourceBackedRegistryAnchorsChecked: 4,
  wetEdgeCoordinatesUnresolved: 4,
};
writeFileSync(`${dir}/validation.json`, `${JSON.stringify(validation, null, 2)}\n`);
console.log(validation);
