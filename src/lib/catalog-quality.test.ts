import { describe, expect, it } from 'vitest';

import { getRoutePreviewPhoto } from '../data/route-gallery';
import { listAllRiversForAudit } from './rivers';

describe('catalog presentation completeness', () => {
  const routes = listAllRiversForAudit();

  it('keeps safety, camping, and gallery context present for every route', () => {
    expect(routes.length).toBeGreaterThan(0);

    for (const route of routes) {
      expect(route.safetyProfile?.reviewStatus, route.id).toBe('reviewed');
      expect(route.safetyProfile?.hazards.length, route.id).toBeGreaterThan(0);
      expect(route.safetyProfile?.safetyNotes.length, route.id).toBeGreaterThan(0);
      expect(route.logistics?.camping, route.id).toBeTruthy();
      expect(route.logistics?.campingClassification, route.id).toBeTruthy();

      const preview = getRoutePreviewPhoto(route);
      expect(preview.isPlaceholder, route.id).toBe(false);
      expect(preview.src, route.id).toBeTruthy();
      expect(preview.alt, route.id).toBeTruthy();
    }
  });
});
