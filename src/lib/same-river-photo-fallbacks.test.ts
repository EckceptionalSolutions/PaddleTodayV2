import { describe, expect, it } from 'vitest';
import { getApprovedRoutePhotos, getRoutePreviewPhoto } from '../data/route-gallery.js';
import { listRiverGroups } from './rivers.js';

describe('same-river photo fallbacks', () => {
  it('reuses approved river photography for sibling routes', () => {
    const groupsWithApprovedRoutePhotos = listRiverGroups().filter((group) =>
      group.routes.some((route) => getApprovedRoutePhotos(route.slug).length > 0),
    );

    for (const group of groupsWithApprovedRoutePhotos) {
      for (const route of group.routes) {
        expect(
          getRoutePreviewPhoto(route).isPlaceholder,
          `${group.name} (${group.riverId}) left ${route.slug} on generic imagery`,
        ).toBe(false);
      }
    }
  });
});
