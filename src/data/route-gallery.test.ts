import { describe, expect, it } from 'vitest';
import { getApprovedRoutePhotos, getRouteGalleryPhotos, getRoutePreviewPhoto } from './route-gallery';

describe('route-specific gallery assignments', () => {
  it('uses the upper West Canada Creek context photo for its assigned route', () => {
    const route = { slug: 'west-canada-creek-partridge-hill-route-28-overlook', riverId: 'west-canada-creek' };
    const photos = getApprovedRoutePhotos(route.slug);
    expect(photos).toHaveLength(1);
    expect(photos[0].caption).toContain('same-river gauge context for the upper reach');
    expect(photos[0].takenLabel).toBe('USGS public domain');
    expect(getRouteGalleryPhotos(route)).toEqual(photos);
    expect(getRoutePreviewPhoto(route)).toEqual({ ...photos[0], isPlaceholder: false, sourceKind: 'route' });
  });
});
