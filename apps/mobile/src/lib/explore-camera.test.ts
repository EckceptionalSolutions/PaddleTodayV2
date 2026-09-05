import { describe, expect, it } from 'vitest';
import { exploreCameraAction } from './explore-camera';

describe('Explore camera intent', () => {
  const browsing = { context: 'Minnesota', selectedSlug: null };
  const selected = { ...browsing, selectedSlug: 'route-a' };

  it('preserves the viewport on first and repeated taps, geometry updates and return navigation', () => {
    expect(exploreCameraAction(browsing, selected, true, false)).toBeNull();
    expect(exploreCameraAction(selected, { ...selected }, true, false)).toBeNull();
    expect(exploreCameraAction(selected, { ...selected, selectedSlug: 'route-b' }, true, false)).toBeNull();
  });

  it('preserves the viewport when the drawer is dismissed, with filters or location', () => {
    expect(exploreCameraAction(selected, browsing, true, false)).toBeNull();
    expect(exploreCameraAction(selected, browsing, false, true)).toBeNull();
  });

  it('fits new filters and new locations, but ignores unchanged context', () => {
    expect(exploreCameraAction(browsing, { context: 'Wisconsin', selectedSlug: null }, true, true)).toBe('all');
    expect(exploreCameraAction(null, browsing, false, true)).toBe('user');
    expect(exploreCameraAction(browsing, { ...browsing }, true, true)).toBeNull();
  });
});
