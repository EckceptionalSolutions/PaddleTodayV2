import { describe, expect, it } from 'vitest';
import { endpointSnappedRiverGeometry, endpointSnappedRiverLine } from './endpoint-snapped-river-geometry.js';

describe('endpoint-snapped river geometry', () => {
  it('clips a padded river line to the projected put-in and take-out', () => {
    const result = endpointSnappedRiverLine(
      [[0, 0], [5, 0], [10, 0]],
      [
        { longitude: 2, latitude: 0.01 },
        { longitude: 8, latitude: -0.01 },
      ],
    );

    expect(result).not.toBeNull();
    expect(result?.coordinates[0][0]).toBeCloseTo(2, 6);
    expect(result?.coordinates.at(-1)?.[0]).toBeCloseTo(8, 6);
    expect(result?.coordinates[0][0]).toBeGreaterThan(0);
    expect(result?.coordinates.at(-1)?.[0]).toBeLessThan(10);
  });

  it('chooses the closest candidate line before snapping endpoints', () => {
    const result = endpointSnappedRiverGeometry(
      [
        [[0, 1], [10, 1]],
        [[0, 0], [10, 0]],
      ],
      [
        { longitude: 2, latitude: 0.01 },
        { longitude: 8, latitude: -0.01 },
      ],
    );

    expect(result).not.toBeNull();
    expect(result?.coordinates).toHaveLength(2);
    expect(result?.coordinates[0][0]).toBeCloseTo(2, 6);
    expect(result?.coordinates[1][0]).toBeCloseTo(8, 6);
    expect(result?.coordinates[0][1]).toBe(0);
    expect(result?.coordinates[1][1]).toBe(0);
  });
});
