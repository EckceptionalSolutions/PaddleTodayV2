import { describe, expect, it } from 'vitest';
import { readExplorePosition, writeExplorePosition } from './explore-position.js';

describe('Explore history position', () => {
  const url = 'https://paddle.test/explore/?searchVersion=1';
  const position = { page: 3, scrollY: 800, scrolls: [240, 0, 100], view: 'map', advanced: true, camera: { center: [-93, 45], zoom: 8, bearing: 0, pitch: 0 } };
  it('preserves other history fields and restores only the matching search', () => {
    const history = { state: { other: 'keep' }, replaceState(state: any) { this.state = state; } };
    writeExplorePosition(history, url, position);
    expect(history.state.other).toBe('keep');
    expect(readExplorePosition(history.state, url)).toMatchObject(position);
    expect(readExplorePosition(history.state, `${url}&search=river`)).toBeNull();
  });
  it('ignores corrupt pages, camera coordinates, and scroll offsets', () => {
    for (const invalid of [{ page: -1 }, { scrollY: NaN }, { scrolls: [-1] }, { camera: { ...position.camera, center: [-93, 900] } }, { camera: { ...position.camera, zoom: Infinity } }]) {
      expect(readExplorePosition({ paddletodayExplorePosition: { ...position, ...invalid, version: 1, url } }, url)).toBeNull();
    }
  });
});
