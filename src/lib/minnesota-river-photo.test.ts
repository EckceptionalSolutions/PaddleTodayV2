import { describe, expect, it } from 'vitest';
import { getRoutePreviewPhoto } from '../data/route-gallery.js';
import { listRivers } from './rivers.js';

describe('Minnesota River route photography', () => {
  it('uses the approved Minnesota River image for Le Sueur to Henderson', () => {
    const route = listRivers().find(
      (candidate) => candidate.slug === 'minnesota-river-le-sueur-henderson',
    );

    expect(route).toBeDefined();
    expect(getRoutePreviewPhoto(route!)).toMatchObject({
      src: '/gallery/minnesota-river-henderson-belle-plaine/minnesota-valley-refuge.jpg',
      isPlaceholder: false,
      sourceKind: 'route',
    });
  });
});
