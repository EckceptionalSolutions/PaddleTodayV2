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

  it('honors an approved Maryland route photo before the broader river context fallback', () => {
    const route = {
      slug: 'corsica-river-mill-stream-trail',
      riverId: 'corsica-river-maryland',
      state: 'Maryland',
    };

    expect(getRoutePreviewPhoto(route)).toMatchObject({
      src: expect.stringContaining('Corsica%20River%20at%20Centreville%20MD1.jpg'),
      caption: expect.stringContaining('Corsica River'),
      sourceKind: 'route',
      isPlaceholder: false,
    });
  });

  it('uses the exact Big Pipe Creek source for the Maryland card', () => {
    expect(getRoutePreviewPhoto({
      slug: 'big-pipe-creek-hapes-mill-double-pipe-park',
      riverId: 'big-pipe-creek-maryland',
      state: 'Maryland',
    })).toMatchObject({
      src: expect.stringContaining('Detour%20Road%20Bridge'),
      caption: expect.stringContaining('Big Pipe Creek'),
      sourceKind: 'route',
      isPlaceholder: false,
    });
  });

  it('uses card-safe river sources for the audited Black Creek, Susquehanna, and Big Sioux cards', () => {
    expect(getRoutePreviewPhoto({ slug: 'black-creek-big-creek-old-highway-49', riverId: 'black-creek-mississippi', state: 'Mississippi' })).toMatchObject({
      src: expect.stringContaining('De%20Soto-Black-Creek-Rvier-man-in-canoe-mississippi.JPG'),
      sourceKind: 'river',
      isPlaceholder: false,
    });
    expect(getRoutePreviewPhoto({ slug: 'susquehanna-river-towanda-laceyville', riverId: 'susquehanna-river', state: 'Pennsylvania' })).toMatchObject({
      src: expect.stringContaining('Susquehanna%20River%2C%20Pennsylvania%20%2865410%29.jpg'),
      sourceKind: 'route',
      isPlaceholder: false,
    });
    expect(getRoutePreviewPhoto({ slug: 'big-sioux-river-rec-area-south-highway-42', riverId: 'big-sioux-river', state: 'South Dakota' })).toMatchObject({
      src: expect.stringContaining('Big%20Sioux%20River%20at%20Big%20Sioux%20Recreation%20Area'),
      sourceKind: 'route',
      isPlaceholder: false,
    });
  });

  it('uses the higher-quality follow-up sources for Hatchet Creek and duplicate-heavy river groups', () => {
    expect(getRoutePreviewPhoto({ slug: 'hatchet-creek-highway-280-highway-231', riverId: 'hatchet-creek', state: 'Alabama' })).toMatchObject({
      src: expect.stringContaining('53074643847_104f2e5edc_b.jpg'),
      sourceKind: 'river',
      isPlaceholder: false,
    });
    expect(getRoutePreviewPhoto({ slug: 'kansas-river-junction-city-manhattan', riverId: 'kansas-river', state: 'Kansas' })).toMatchObject({
      src: expect.stringContaining('Linear%20Trail%20on%20the%20Kansas%20River'),
      sourceKind: 'route',
      isPlaceholder: false,
    });
    expect(getRoutePreviewPhoto({ slug: 'clinton-river-downtown-utica-budd', riverId: 'clinton-river', state: 'Michigan' })).toMatchObject({
      src: expect.stringContaining('Clinton%20River%20at%20Utica'),
      sourceKind: 'route',
      isPlaceholder: false,
    });
    expect(getRoutePreviewPhoto({ slug: 'wisconsin-river-arena-spring-green', riverId: 'wisconsin-river', state: 'Wisconsin' })).toMatchObject({
      src: expect.stringContaining('Wisconsin%20River%20below%20Rhinelander'),
      sourceKind: 'river',
      isPlaceholder: false,
    });
    expect(getRoutePreviewPhoto({ slug: 'skagit-river-copper-marblemount', riverId: 'skagit-river-washington', state: 'Washington' })).toMatchObject({
      src: expect.stringContaining('Skagit%20River%20near%20Marblemount%20Conservation%20Area%2003'),
      sourceKind: 'route',
      isPlaceholder: false,
    });
    expect(getRoutePreviewPhoto({ slug: 'skagit-river-copper-howard-miller', riverId: 'skagit-river-washington', state: 'Washington' })).toMatchObject({
      src: expect.stringContaining('Skagit%20River%20-%20Marblemount%20to%20O%27Brien-Riggs%20State%20Park%2002'),
      sourceKind: 'route',
      isPlaceholder: false,
    });
  });
});
