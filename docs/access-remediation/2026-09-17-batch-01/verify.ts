// Run from the repository root: npx tsx docs/access-remediation/2026-09-17-batch-01/verify.ts
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { listAllRiversForAudit, listRivers } from '../../../src/lib/rivers';
import { routeAccessReviewHolds } from '../../../src/data/route-access-review-holds';

type Point = { latitude: number; longitude: number };
type Review = Point & {
  siteNumber: number;
  decision: string;
  newCoordinate?: Point;
  occurrences: Array<{ routeId: string; endpoint: 'putIn' | 'takeOut' }>;
  routeIds: string[];
  publicationAction: string;
};
const dir = 'docs/access-remediation/2026-09-17-batch-01';
const reviews = JSON.parse(readFileSync(`${dir}/review.json`, 'utf8')) as Review[];
const all = new Map(listAllRiversForAudit().map(route => [route.id, route]));
const visible = new Set(listRivers().map(route => route.id));
assert.equal(reviews.length, 10);
let checkedTerminals = 0;
let checkedCopies = 0;
for (const review of reviews) {
  const expected = review.newCoordinate ?? review;
  for (const occurrence of review.occurrences) {
    const route = all.get(occurrence.routeId);
    assert.ok(route, `Missing inventory route ${occurrence.routeId}`);
    const point = route[occurrence.endpoint];
    assert.equal(point?.latitude, expected.latitude, `${route.id} ${occurrence.endpoint} latitude`);
    assert.equal(point?.longitude, expected.longitude, `${route.id} ${occurrence.endpoint} longitude`);
    checkedTerminals++;
    for (const copy of route.accessPoints ?? []) {
      if (copy.name !== point?.name) continue;
      assert.equal(copy.latitude, expected.latitude, `${route.id} copied access latitude`);
      assert.equal(copy.longitude, expected.longitude, `${route.id} copied access longitude`);
      checkedCopies++;
    }
    if (review.newCoordinate) {
      assert.ok(![route.putIn, route.takeOut, ...(route.accessPoints ?? [])].some(p =>
        p?.latitude === review.latitude && p?.longitude === review.longitude), `${route.id} retains old coordinate`);
      if (occurrence.endpoint === 'putIn') {
        assert.equal(route.latitude, expected.latitude, `${route.id} route latitude`);
        assert.equal(route.longitude, expected.longitude, `${route.id} route longitude`);
      }
    }
  }
  for (const id of review.routeIds) {
    if (review.publicationAction === 'withhold-dependent-routes') {
      assert.ok(routeAccessReviewHolds[id], `Missing manual hold ${id}`);
      assert.ok(!visible.has(id), `Held route still public ${id}`);
    } else {
      assert.ok(visible.has(id), `Reviewed route unexpectedly hidden ${id}`);
    }
  }
}
const auditResults = [
  ['central-falls-after.json', 2], ['baldwin-after.json', 4], ['sc9-after.json', 6],
] as const;
for (const [file, number] of auditResults) {
  const audit = JSON.parse(readFileSync(`${dir}/${file}`, 'utf8'));
  const point = reviews.find(r => r.siteNumber === number)!.newCoordinate!;
  const result = audit.endpoints.find((p: Point) => p.latitude === point.latitude && p.longitude === point.longitude);
  assert.ok(result, `Missing corrected point in ${file}`);
  assert.equal(result.waterProximity, 'within-100ft');
  assert.equal(audit.sourceIssues.length, 0);
}
const affectedIds = new Set(reviews.flatMap(r => r.routeIds));
const result = {
  checkedAt: new Date().toISOString(), sites: reviews.length,
  fixedSites: reviews.filter(r => r.decision === 'fix').length,
  rejectedSites: reviews.filter(r => r.decision !== 'fix').length,
  checkedTerminals, checkedCopies, inventoryRoutesRetained: affectedIds.size,
  affectedRoutesPublic: [...affectedIds].filter(id => visible.has(id)).length,
  affectedRoutesWithheld: [...affectedIds].filter(id => !visible.has(id)).length,
  correctedSitesWithin100FeetOfMappedWater: auditResults.length,
};
writeFileSync(`${dir}/validation.json`, JSON.stringify(result, null, 2) + '\n');
console.log(result);
