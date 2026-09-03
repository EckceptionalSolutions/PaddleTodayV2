import { describe, expect, it } from 'vitest';
import { getRoutePreviewPhoto } from '../data/route-gallery';
import { listAllRiversForAudit } from './rivers';

describe.each([
  ['Maryland', 140],
  ['North Carolina', 14],
] as const)('%s route quality audit', (state, expectedCount) => {
  it('has safety, camping, finite endpoints, and non-placeholder imagery on every route', () => {
    const routes = listAllRiversForAudit().filter((route) => route.state === state);
    expect(routes).toHaveLength(expectedCount);

    for (const route of routes) {
      expect(route.safetyProfile?.hazards?.length, route.slug).toBeGreaterThan(0);
      expect(route.safetyProfile?.safetyNotes?.length, route.slug).toBeGreaterThan(0);
      expect(route.logistics?.camping, route.slug).toBeTruthy();
      expect(route.logistics?.campingClassification, route.slug).toBeTruthy();
      expect(Number.isFinite(route.putIn?.latitude), route.slug).toBe(true);
      expect(Number.isFinite(route.putIn?.longitude), route.slug).toBe(true);
      expect(Number.isFinite(route.takeOut?.latitude), route.slug).toBe(true);
      expect(Number.isFinite(route.takeOut?.longitude), route.slug).toBe(true);

      const preview = getRoutePreviewPhoto(route);
      expect(preview.src, route.slug).toBeTruthy();
      expect(preview.isPlaceholder, route.slug).toBe(false);
    }
  });
});
