import { describe, expect, it } from 'vitest';
import { exploreCameraAction, restoreExploreViewport } from './explore-camera';

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

describe('Explore viewport restoration', () => {
  const viewport = { latitude: 45, longitude: -93, latitudeDelta: 0.3, longitudeDelta: 0.2 };

  it('restores a copy only for the same filters and location', () => {
    const snapshot = { context: 'Minnesota:nearby', viewport };
    const restored = restoreExploreViewport(snapshot, snapshot.context);
    expect(restored).toEqual(viewport);
    expect(restored).not.toBe(viewport);
    expect(restoreExploreViewport(snapshot, 'Wisconsin:nearby')).toBeUndefined();
    expect(restoreExploreViewport(null, snapshot.context)).toBeUndefined();
  });

  it('rejects invalid native regions instead of reopening an unusable map', () => {
    for (const invalid of [
      { ...viewport, latitude: NaN }, { ...viewport, longitude: Infinity },
      { ...viewport, latitude: 91 }, { ...viewport, latitudeDelta: 0 },
      { ...viewport, longitudeDelta: -1 },
    ]) {
      expect(restoreExploreViewport({ context: 'same', viewport: invalid }, 'same')).toBeUndefined();
    }
  });
});
