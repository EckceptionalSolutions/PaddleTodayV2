import { describe, expect, it } from 'vitest';

import { convertMrmsSampleToInches } from './noaa-precip';

describe('convertMrmsSampleToInches', () => {
  it('converts MRMS sample values from millimeters to inches', () => {
    expect(convertMrmsSampleToInches(25.4)).toBeCloseTo(1, 6);
    expect(convertMrmsSampleToInches(14.4)).toBeCloseTo(0.566929, 6);
    expect(convertMrmsSampleToInches(33)).toBeCloseTo(1.299213, 6);
  });
});
