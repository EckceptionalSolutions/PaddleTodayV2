import { describe, expect, it, vi } from 'vitest';
vi.mock('react-native', () => ({ Platform: { OS: 'web', select: (options: Record<string, unknown>) => options.web ?? options.default } }));
import { legendItemsForPoints, nativeMarkerLabelsForPoint, toneForRating } from './route-plot-map-model';
import { routeGroupMarkerDetails } from '../lib/map-decision';

describe('native map accessibility', () => {
  const point = {
    id: 'reach-one', label: 'Wisconsin River', latitude: 43, longitude: -89,
    score: 64, markerAccessibilityLabel: 'Sauk City to Arena, weekend score 64',
  };
  it('keeps a short visual heading and passes complete reach and score to the native bridge', () => {
    expect(nativeMarkerLabelsForPoint(point, false, 'android')).toEqual({
      title: 'Wisconsin River', description: 'Sauk City to Arena, weekend score 64',
      accessibilityLabel: 'Wisconsin River, Sauk City to Arena, weekend score 64',
    });
    const other = { ...point, id: 'reach-two', markerAccessibilityLabel: 'Arena to Spring Green, weekend score 64' };
    expect(nativeMarkerLabelsForPoint(other, false, 'android').accessibilityLabel)
      .not.toBe(nativeMarkerLabelsForPoint(point, false, 'android').accessibilityLabel);
  });
  it('updates the native spoken label when selection changes', () => {
    expect(nativeMarkerLabelsForPoint(point, true, 'android').accessibilityLabel)
      .toBe('Wisconsin River, Selected, Sauk City to Arena, weekend score 64');
    expect(nativeMarkerLabelsForPoint(point, false, 'android').accessibilityLabel).not.toContain('Selected');
  });
  it('includes cluster details and access pin identity without duplicating names', () => {
    expect(nativeMarkerLabelsForPoint({ ...point, label: '3 locations', markerAccessibilityLabel: '3 locations. Zoom in to explore these locations' }, false, 'android').accessibilityLabel)
      .toContain('Zoom in to explore these locations');
    expect(nativeMarkerLabelsForPoint({ ...point, label: 'Hinman Island Park', markerAccessibilityLabel: 'Hinman Island Park, Put-in' }, true, 'android').accessibilityLabel)
      .toBe('Hinman Island Park, Selected, Put-in');
  });
  it('retains the separate title and description on iOS', () => {
    expect(nativeMarkerLabelsForPoint(point, true, 'ios')).toEqual({
      title: 'Wisconsin River', description: 'Selected, Sauk City to Arena, weekend score 64',
      accessibilityLabel: 'Wisconsin River, Selected, Sauk City to Arena, weekend score 64',
    });
  });
  it('identifies grouped reaches at wider zoom levels', () => {
    const details = routeGroupMarkerDetails('Little Hole to Indian Crossing', 1, 'Watch closely, score 64');
    expect(details).toBe('1 route, Little Hole to Indian Crossing, Watch closely, score 64');
    expect(nativeMarkerLabelsForPoint({ ...point, label: 'Northeastern Utah', markerAccessibilityLabel: details }, true, 'android').accessibilityLabel)
      .toBe('Northeastern Utah, Selected, 1 route, Little Hole to Indian Crossing, Watch closely, score 64');
    expect(routeGroupMarkerDetails('Sauk City to Arena', 3, 'Watch, score 60'))
      .toBe('3 routes, including Sauk City to Arena, Watch, score 60');
  });
});

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
