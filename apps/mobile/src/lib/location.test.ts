import { describe, expect, it } from 'vitest';
import { hasValidLocationCoordinates } from './location';

describe('location coordinate validation', () => {
  it.each([
    { latitude: 0, longitude: 0 },
    { latitude: -90, longitude: -180 },
    { latitude: 90, longitude: 180 },
    { latitude: 45.08, longitude: -93.2 },
  ])('accepts geographic coordinates %j', (value) => expect(hasValidLocationCoordinates(value)).toBe(true));

  it.each([
    null, undefined, {}, { latitude: 45 },
    { latitude: '45', longitude: -93 },
    { latitude: 91, longitude: -93 },
    { latitude: -91, longitude: -93 },
    { latitude: 45, longitude: 181 },
    { latitude: 45, longitude: -181 },
    { latitude: NaN, longitude: -93 },
    { latitude: 45, longitude: Infinity },
  ])('rejects invalid coordinates %j', (value) => expect(hasValidLocationCoordinates(value)).toBe(false));
});
