import assert from 'node:assert/strict';
import { buildAccessReviewQueue } from '../../../scripts/lib/access-water-quality';

const endpoint = (coordinateEvidenceRole: string | null) => ({
  distanceFeetToMatchedRiver: 2400,
  distanceFeetToNearestWaterway: 2400,
  distanceFeetToNearestWaterbody: 1800,
  routeId: 'test-route',
  state: 'Test',
  endpoint: 'putIn',
  endpointName: 'Access anchor',
  latitude: 41,
  longitude: -93,
  severity: 'review',
  waterProximity: 'over-800ft' as const,
  distanceFeetToMappedWater: 1800,
  coordinateEvidenceRole,
});

assert.deepEqual(buildAccessReviewQueue([endpoint('authoritative-access-anchor')])[0]?.reasons,
  ['documented-access-anchor-offset']);
assert.deepEqual(buildAccessReviewQueue([endpoint(null)])[0]?.reasons, ['mapped-water-offset']);
assert.deepEqual(buildAccessReviewQueue([{
  ...endpoint('authoritative-area-anchor'),
  waterProximity: 'within-100ft' as const,
  distanceFeetToMappedWater: 0,
}])[0]?.reasons, ['area-anchor-not-launch']);
console.log('Access-quality reason checks passed.');
