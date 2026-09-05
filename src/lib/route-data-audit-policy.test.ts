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
  });

  it('keeps coordinate comparisons deferred for planning anchors', () => {
    expect(isPlanningCoordinateDeferred()).toBe(true);
  });
});
