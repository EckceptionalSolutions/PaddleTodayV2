import { describe, expect, it } from 'vitest';
import { normalizeSearchText } from '@paddletoday/api-contract';
import { prepareSearchIndex, findSearchMatches } from './site-search.js';

const normalize = (value: unknown) => normalizeSearchText(String(value || '')).replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
const items = [
  { kind: 'route', title: 'Rice Creek', subtitle: 'North launch', meta: 'MN', searchText: 'Rice Creek Ricing Minnesota' },
  { kind: 'river', title: 'Rice Creek', subtitle: '3 routes', meta: 'MN', searchText: 'Rice Creek Ricing Minnesota' },
  { kind: 'route', title: 'Rivière du Nord', subtitle: 'Écluse', meta: 'Québec', searchText: 'Rivière du Nord Écluse Québec' },
  { kind: 'route', title: 'Rice River', subtitle: 'South creek', meta: 'MN', searchText: '' },
  ...Array.from({ length: 15 }, (_, n) => ({ kind: n % 2 ? 'route' : 'river', title: `River ${String(n).padStart(2, '0')}`, subtitle: 'Launch', meta: 'WI', searchText: 'River launch Wisconsin' })),
];

// Preserve the pre-optimization ranking as the compatibility reference.
function legacy(query: string) {
  const terms = normalize(query).split(' ').filter(Boolean);
  if (!terms.length) return [...items.filter(item => item.kind === 'river').slice(0, 6), ...items.filter(item => item.kind === 'route').slice(0, 4)];
  return items.map(item => {
    const text = normalize(item.searchText || `${item.title} ${item.subtitle} ${item.meta}`);
    let score = 0;
    for (const term of terms) {
      if (!text.includes(term)) return null;
      score += 2;
      if (normalize(item.title).startsWith(term)) score += 4;
      if (normalize(item.subtitle).includes(term)) score += 1;
    }
    if (item.kind === 'river') score += .5;
    return { item, score };
  }).filter(row => row !== null).sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title)).slice(0, 10).map(row => row.item);
}

describe('prepared site search', () => {
  const prepared = prepareSearchIndex(items);
  it.each(['', '  ', 'rice creek', 'ricing', 'RIVIÈRE', 'ecluse quebec', 'south creek', 'Wisconsin', 'river launch', 'missing', 'rice!!! creek'])('preserves legacy results for %s', query => {
    expect(findSearchMatches(prepared, query)).toEqual(legacy(query));
  });
  it('prepares a replacement index without retaining old rows', () => {
    expect(findSearchMatches(prepareSearchIndex([items[2]]), 'rice')).toEqual([]);
    expect(findSearchMatches(prepared, 'rivière')[0]).toBe(items[2]);
  });
});
