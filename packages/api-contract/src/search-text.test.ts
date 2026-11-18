import { describe, expect, it } from 'vitest';
import { createRouteSearch, normalizeSearchText } from './search-text';

describe('route search text', () => {
  const rice = {
    name: 'Rice Creek', reach: 'Peltier Lake to Long Lake',
    putIn: { name: 'Peltier Lake public boat launch (Lino Lakes)' },
    accessPoints: [{ id: 'wargo', name: 'George Watch Lake / Wargo Nature Center', mileFromStart: 2, segmentKind: 'lake' as const }],
  };
  it.each(['Peltier Rice', 'Lino Lakes', 'Wargo Nature Center', 'Wagro Center', 'rice peltir'])(
    'matches the Rice Creek reach for %s', query => expect(createRouteSearch(query)(rice)).toBeGreaterThan(0));

  it('orders exact names ahead of partial and misspelled matches and requires every word', () => {
    const match = createRouteSearch('Namekagon');
    const ranks = ['Nemakogon', 'Namekagom', 'Namekagon River', 'Namekagon'].map(name => match({ name }));
    expect(ranks[0]).toBe(0);
    expect(ranks[1]).toBeGreaterThan(0);
    expect(ranks[2]).toBeGreaterThan(ranks[1]);
    expect(ranks[3]).toBeGreaterThan(ranks[2]);
    expect(createRouteSearch('Wargo Jefferson')(rice)).toBe(0);
    expect(createRouteSearch('Route 12345')({ name: 'Route 12346' })).toBe(0);
  });

  it.each([
    [' Cañon   City ', 'canon city'],
    ['Coeur d’Alene', "coeur d'alene"],
    ['CAN\u0303ON\tCITY', 'canon city'],
    ['  \n  ', ''],
  ])('normalizes %s for matching', (input, expected) => {
    expect(normalizeSearchText(input)).toBe(expected);
  });
});
