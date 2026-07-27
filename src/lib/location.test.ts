import { describe, expect, it } from 'vitest';
import {
  distanceMiles,
  distancePenalty,
  estimateTravelMinutes,
} from '@paddletoday/api-contract';

describe('shared location policy', () => {
  it('calculates symmetric great-circle distances', () => {
    const northbound = distanceMiles(44.9778, -93.265, 45.9778, -93.265);
    const southbound = distanceMiles(45.9778, -93.265, 44.9778, -93.265);

    expect(northbound).toBeCloseTo(69.09, 1);
    expect(southbound).toBeCloseTo(northbound, 8);
    expect(distanceMiles(44.9778, -93.265, 44.9778, -93.265)).toBe(0);
  });

  it('rounds travel estimates to five minutes with a five-minute floor', () => {
    expect(estimateTravelMinutes(0)).toBe(5);
    expect(estimateTravelMinutes(25)).toBe(30);
    expect(estimateTravelMinutes(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
  });

  it('validates custom travel speeds', () => {
    expect(estimateTravelMinutes(30, 60)).toBe(30);
    expect(() => estimateTravelMinutes(30, 0)).toThrow('Travel speed must be a positive finite number');
  });

  it('caps the travel penalty and ignores unavailable travel times', () => {
    expect(distancePenalty(60)).toBe(10);
    expect(distancePenalty(300)).toBe(30);
    expect(distancePenalty(Number.POSITIVE_INFINITY)).toBe(0);
  });
});
