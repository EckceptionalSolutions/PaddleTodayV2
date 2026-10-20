import { describe, expect, it } from 'vitest';
import {
  coverageCenter,
  endpointSnappedRiverGeometry,
  endpointSnappedRiverLine,
  endpointSnappedRiverNetwork,
  nearestPointOnLines,
  stitchRiverLines,
} from './index';

describe('shared geo primitives', () => {
  it('keeps a closed return after six-decimal asset compaction without accepting a nearby different launch', () => {
    const line=[[-77.150318,38.454086],[-77.14,38.46],[-77.13,38.47],[-77.14,38.46],[-77.150318,38.454086]];
    const launch={longitude:-77.1503175,latitude:38.45408599};
    expect(endpointSnappedRiverLine(line,[launch,launch])?.coordinates).toEqual(line);
    const elsewhere={longitude:-77.150328,latitude:38.454086};
    expect(endpointSnappedRiverLine(line,[elsewhere,elsewhere])).toBeNull();
    expect(endpointSnappedRiverLine(line,[launch,{...launch,longitude:launch.longitude+0.0000001}])?.coordinates).not.toEqual(line);
  });
  it('clips a line to projected route endpoints', () => {
    const result = endpointSnappedRiverLine(
      [[0, 0], [5, 0], [10, 0]],
      [{ longitude: 2, latitude: 0.01 }, { longitude: 8, latitude: -0.01 }],
    );
    expect(result?.coordinates[0][0]).toBeCloseTo(2, 6);
    expect(result?.coordinates.at(-1)?.[0]).toBeCloseTo(8, 6);
  });

  it('chooses the closest candidate line', () => {
    const result = endpointSnappedRiverGeometry(
      [[[0, 1], [10, 1]], [[0, 0], [10, 0]]],
      [{ longitude: 2, latitude: 0.01 }, { longitude: 8, latitude: -0.01 }],
    );
    expect(result?.coordinates.every((coordinate) => coordinate[1] === 0)).toBe(true);
  });

  it('preserves an explicit same-launch round trip past an intermediate bailout', () => {
    const line = [[0, 0], [1, 0], [2, 1], [1, 0], [0, 0]];
    const launch = { longitude: 0, latitude: 0 };
    for (const points of [[launch, launch], [launch, { longitude: 1, latitude: 0 }, launch]]) {
      expect(endpointSnappedRiverGeometry([line], points)?.coordinates).toEqual(line);
    }
    expect(endpointSnappedRiverGeometry([line], [launch, { longitude: 1, latitude: 0 }])?.coordinates)
      .toEqual([[0, 0], [1, 0]]);
    expect(endpointSnappedRiverGeometry([[[0, 0], [1, 0]]], [launch, launch])).toBeNull();
  });

  it('traces connected flowline pieces between exact endpoint projections', () => {
    const result = endpointSnappedRiverNetwork([
      { coordinates: [[0, 0], [1, 0]] },
      { coordinates: [[1, 0], [2, 0]] },
      { coordinates: [[2, 0], [3, 0]] },
    ], [
      { longitude: 0.25, latitude: 0.01 },
      { longitude: 2.75, latitude: -0.01 },
    ]);

    expect(result?.coordinates[0][0]).toBeCloseTo(0.25, 6);
    expect(result?.coordinates.at(-1)?.[0]).toBeCloseTo(2.75, 6);
    expect(result?.sourceLineIndexes).toEqual([0, 2, 1]);
  });

  it('prefers a visible stream channel over a lower-fidelity artificial shortcut', () => {
    const result = endpointSnappedRiverNetwork([
      { coordinates: [[0, 0], [0, 1], [2, 1], [2, 0]], costMultiplier: 1 },
      { coordinates: [[0, 0], [2, 0]], costMultiplier: 3 },
    ], [
      { longitude: 0, latitude: 0 },
      { longitude: 2, latitude: 0 },
    ]);

    expect(result?.sourceLineIndexes).toEqual([0]);
    expect(result?.coordinates).toContainEqual([0, 1]);
    expect(result?.coordinates).toContainEqual([2, 1]);
  });

  it('refuses to invent a route between disconnected water networks', () => {
    const result = endpointSnappedRiverNetwork([
      { coordinates: [[0, 0], [1, 0]] },
      { coordinates: [[3, 0], [4, 0]] },
    ], [
      { longitude: 0, latitude: 0 },
      { longitude: 4, latitude: 0 },
    ], { maxSnapDistanceMiles: 1 });

    expect(result).toBeNull();
  });

  it('stitches lines regardless of endpoint orientation', () => {
    expect(stitchRiverLines([
      [[1, 0], [2, 0]],
      [[1, 0], [0, 0]],
    ])).toEqual([[[0, 0], [1, 0], [2, 0]]]);
  });

  it('averages route centers without weighting longer spans more heavily', () => {
    expect(coverageCenter([
      [{ longitude: 0, latitude: 0 }, { longitude: 2, latitude: 0 }],
      [{ longitude: 5, latitude: 2 }],
    ])).toEqual({ longitude: 3, latitude: 1 });
  });

  it('projects a coverage center onto the nearest line segment', () => {
    expect(nearestPointOnLines(
      { longitude: 1, latitude: 1 },
      [[[0, 0], [2, 0]]],
    )).toEqual({ longitude: 1, latitude: 0 });
  });
});
