import { describe, expect, it } from 'vitest';
import {
  isPlanningCoordinateDeferred,
  isPlanningDistanceDeferred,
  isStagedDistanceLabel,
} from './route-data-audit-policy';

describe('route data audit policy', () => {
  it('defers planning mileage when the source controls exact distance', () => {
    expect(isPlanningDistanceDeferred('Exact distance is controlled by tide and channel conditions.')).toBe(true);
    expect(isPlanningDistanceDeferred('Source does not publish stable mileage.')).toBe(true);
  });

  it('recognizes intentionally staged long routes', () => {
    expect(isStagedDistanceLabel('41 river miles split into day segments')).toBe(true);
    expect(isStagedDistanceLabel('35.6 river miles, usually split into 2-4 day sections')).toBe(true);
    expect(isStagedDistanceLabel('About 65.6 river miles, usually a 3-5 day expedition')).toBe(true);
    expect(isStagedDistanceLabel('Plan 2 days with documented intermediate take-outs')).toBe(true);
    expect(isStagedDistanceLabel('About 43 river miles; allow one day')).toBe(false);
  });

  it('reviews numeric planning mileage that can contradict the endpoint pair', () => {
    expect(isPlanningCoordinateDeferred('6.9 whitewater river miles')).toBe(false);
    expect(isPlanningCoordinateDeferred('Approximately 3.25 miles one way from Terrapin Nature Area to Matapeake Park')).toBe(false);
    expect(isPlanningCoordinateDeferred('About 16 river miles')).toBe(false);
    expect(isPlanningCoordinateDeferred('About 16 miles on a tidal route; check current conditions and the map')).toBe(false);
  });

  it('defers coordinate comparisons when mileage explicitly describes a variable itinerary', () => {
    expect(isPlanningCoordinateDeferred('Marked route; the current map controls exact mileage')).toBe(true);
    expect(isPlanningCoordinateDeferred('Map-dependent planning estimate: guide reports about 1.3 river miles')).toBe(true);
    expect(isPlanningCoordinateDeferred('Exact distance is controlled by tide and channel conditions.')).toBe(true);
    expect(isPlanningCoordinateDeferred('Source does not publish stable mileage.')).toBe(true);
    expect(isPlanningCoordinateDeferred(undefined)).toBe(true);
  });
});
