import { describe, expect, it } from 'vitest';
import { compactGeometryCoordinates } from './compact-geometry';

describe('compact geometry coordinates', () => {
  it('preserves closed traces and every vertex with at most half a microdegree of rounding', () => {
    const input = [[[-74.86610712345, 43.03353998765], [-74.86723456789, 43.03456789123], [-74.86610712345, 43.03353998765]]];
    const original = structuredClone(input);
    const compact = compactGeometryCoordinates(input);
    expect(input).toEqual(original);
    expect(compact[0]).toHaveLength(input[0].length);
    expect(compact[0][0]).toEqual(compact[0].at(-1));
    compact[0].forEach((point, index) => point.forEach((value, axis) => {
      expect(Math.abs(value - input[0][index][axis])).toBeLessThanOrEqual(0.0000005);
    }));
    expect(JSON.stringify(compact).length).toBeLessThan(JSON.stringify(input).length);
  });
});
