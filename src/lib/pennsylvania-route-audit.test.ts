import { describe, expect, it } from 'vitest';
import { listAllRiversForAudit } from './rivers';
import { getRoutePreviewPhoto } from '../data/route-gallery';
import { riverTripDetails } from '../data/river-trip-details';

describe('Pennsylvania route completeness', () => {
  it('keeps every Pennsylvania route usable, documented, and illustrated', () => {
    const routes = listAllRiversForAudit().filter((route) => route.state === 'Pennsylvania');

    expect(routes).toHaveLength(63);

    for (const route of routes) {
      const details = riverTripDetails[route.id];
      expect(details, `${route.slug} is missing trip details`).toBeDefined();
      expect(route.putIn?.name, `${route.slug} is missing a put-in name`).toBeTruthy();
      expect(route.takeOut?.name, `${route.slug} is missing a take-out name`).toBeTruthy();
      expect(Number.isFinite(route.putIn?.latitude), `${route.slug} put-in latitude`).toBe(true);
      expect(Number.isFinite(route.putIn?.longitude), `${route.slug} put-in longitude`).toBe(true);
      expect(Number.isFinite(route.takeOut?.latitude), `${route.slug} take-out latitude`).toBe(true);
      expect(Number.isFinite(route.takeOut?.longitude), `${route.slug} take-out longitude`).toBe(true);
      expect(route.safetyProfile?.hazards?.length, `${route.slug} is missing safety hazards`).toBeGreaterThan(0);
      expect(route.logistics?.camping?.trim(), `${route.slug} is missing camping posture`).toBeTruthy();
      expect(route.logistics?.campingClassification, `${route.slug} is missing camping classification`).toBeTruthy();

      const preview = getRoutePreviewPhoto(route);
      expect(preview.isPlaceholder, `${route.slug} still resolves to a placeholder image`).toBe(false);
      expect(preview.src, `${route.slug} is missing gallery image source`).toBeTruthy();
    }
  });
});
