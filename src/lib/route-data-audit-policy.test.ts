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

  it('keeps coordinate comparisons deferred for planning anchors', () => {
    expect(isPlanningCoordinateDeferred()).toBe(true);
  });
});
