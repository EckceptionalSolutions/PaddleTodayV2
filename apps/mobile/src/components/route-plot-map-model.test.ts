import { describe, expect, it, vi } from 'vitest';
vi.mock('react-native', () => ({ Platform: { OS: 'web', select: (options: Record<string, unknown>) => options.web ?? options.default } }));
import { legendItemsForPoints, toneForRating } from './route-plot-map-model';

describe('map forecast age presentation', () => {
  it('does not label an expired favorable forecast as Paddle or Skip', () => {
    const legend = legendItemsForPoints([{ id: 'old', label: 'Old forecast', latitude: 45, longitude: -93, rating: 'stale', score: 90 }]);
    expect(legend.map(item => item.label)).toEqual(['Saved forecast']);
    expect(legend[0].color).toBe(toneForRating('stale').backgroundColor);
    expect(legend[0].color).not.toBe(toneForRating('Strong').backgroundColor);
    expect(legend[0].color).not.toBe(toneForRating('No-go').backgroundColor);
  });
  it('retains distinct current decisions when historical points are also shown', () => {
    const legend = legendItemsForPoints(['Strong', 'Good', 'Fair', 'No-go', 'stale'].map((rating, index) => ({
      id: String(index), label: rating, latitude: 45, longitude: -93, rating,
    })));
    expect(legend.map(item => item.label)).toEqual(['Paddle', 'Watch', 'Skip', 'Saved forecast']);
  });
  it('labels unavailable calls separately from negative calls', () => {
    const legend = legendItemsForPoints([{ id: 'missing', label: 'Missing', latitude: 45, longitude: -93, rating: 'unavailable' }]);
    expect(legend.map(item => item.label)).toEqual(['No call']);
    expect(legend[0].color).not.toBe(toneForRating('No-go').backgroundColor);
  });
});
