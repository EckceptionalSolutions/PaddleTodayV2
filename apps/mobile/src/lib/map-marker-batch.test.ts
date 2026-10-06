import { describe, expect, it } from 'vitest';
import { mapMarkerBatch } from './map-marker-batch';

describe('native marker attachment batches', () => {
  const points = Array.from({ length: 539 }, (_, index) => ({ id: String(index) }));
  it('starts empty and eventually preserves every marker and its identity', () => {
    expect(mapMarkerBatch(points, 0)).toEqual([]);
    expect(mapMarkerBatch(points, 32)).toEqual(points.slice(0, 32));
    expect(mapMarkerBatch(points, 544)).toBe(points);
  });
  it('keeps a selection outside the current batch without duplicating it later', () => {
    expect(mapMarkerBatch(points, 32, '538')).toEqual([...points.slice(0, 32), points[538]]);
    expect(mapMarkerBatch(points, 32, '0')).toHaveLength(32);
    expect(mapMarkerBatch(points, 544, '538')).toBe(points);
  });
});
