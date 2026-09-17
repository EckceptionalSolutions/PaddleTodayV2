import { describe, expect, it } from 'vitest';
import { staticAssetUrl } from './static-asset-url.js';

describe('external static assets', () => {
  const base = 'https://example.blob.core.windows.net/web-assets/releases/abc/';
  it('resolves gallery and geometry paths under a versioned release', () => {
    expect(staticAssetUrl('/gallery/river/photo.jpg', base)).toBe(`${base}gallery/river/photo.jpg`);
    expect(staticAssetUrl('/data/canonical-river-geometries.json', base)).toBe(`${base}data/canonical-river-geometries.json`);
    expect(staticAssetUrl('/data/canonical-river-geometries/routes/a.json', base)).toBe(`${base}data/canonical-river-geometries/routes/a.json`);
  });
  it('preserves local development, third-party photos, and unrelated assets', () => {
    for (const path of ['/gallery/a.jpg', '/data/a.json']) expect(staticAssetUrl(path, '')).toBe(path);
    for (const path of ['https://other.test/gallery/a.jpg', '//other.test/a.jpg', '/api/photo', '/brand/card.png']) {
      expect(staticAssetUrl(path, base)).toBe(path);
    }
  });
});
