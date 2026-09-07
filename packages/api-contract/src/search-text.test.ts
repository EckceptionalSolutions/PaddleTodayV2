import { describe, expect, it } from 'vitest';
import { normalizeSearchText } from './search-text';

describe('route search text', () => {
  it.each([
    [' Cañon   City ', 'canon city'],
    ['Coeur d’Alene', "coeur d'alene"],
    ['CAN\u0303ON\tCITY', 'canon city'],
    ['  \n  ', ''],
  ])('normalizes %s for matching', (input, expected) => {
    expect(normalizeSearchText(input)).toBe(expected);
  });
});
