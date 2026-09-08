import { describe, expect, it } from 'vitest';
import { exploreSearchReducer as reduce, type ExploreSearchState } from './explore-search-state';

const initial: ExploreSearchState = {
  query: '',
  filters: { query: '', sort: 'best', state: 'Minnesota', difficulty: 'any', routeType: 'all', status: 'any', rating: 'any', distance: 'any', paddleTime: 'any', paddleLength: 'any', camping: 'any' },
};

describe('Explore applied search', () => {
  it('keeps the applied filter identity stable while typing and applies only the latest text', () => {
    const first = reduce(initial, { type: 'type', query: 'ri' });
    const latest = reduce(first, { type: 'type', query: 'rice' });
    expect(latest.filters).toBe(initial.filters);
    expect(latest.query).toBe('rice');
    expect(reduce(latest, { type: 'apply', query: 'ri' })).toBe(latest);
    const applied = reduce(latest, { type: 'apply', query: 'rice' });
    expect(applied.filters.query).toBe('rice');
    expect(applied.filters.state).toBe('Minnesota');
    expect(reduce(applied, { type: 'apply', query: 'rice' })).toBe(applied);
  });

  it('clears immediately and cannot restore a queued query', () => {
    const typed = reduce(initial, { type: 'type', query: 'rice' });
    const applied = reduce(typed, { type: 'apply', query: 'rice' });
    const pending = reduce(applied, { type: 'type', query: 'rice creek' });
    const cleared = reduce(pending, { type: 'type', query: '' });
    expect(cleared.filters.query).toBe('');
    expect(reduce(cleared, { type: 'apply', query: 'rice creek' })).toBe(cleared);
  });

  it('lets an explicit preset replace pending text without a late callback overriding it', () => {
    const pending = reduce(initial, { type: 'type', query: 'rice' });
    const preset = reduce(pending, { type: 'filters', update: { ...initial.filters, state: 'Wisconsin' } });
    expect(preset.query).toBe('');
    expect(preset.filters.state).toBe('Wisconsin');
    expect(reduce(preset, { type: 'apply', query: 'rice' })).toBe(preset);
  });

  it('preserves pending text when adjusting sorting', () => {
    const pending = reduce(initial, { type: 'type', query: 'rice' });
    const sorted = reduce(pending, { type: 'filters', update: current => ({ ...current, sort: 'nearest' }) });
    expect(sorted.query).toBe('rice');
    expect(sorted.filters).toMatchObject({ query: 'rice', sort: 'nearest' });
  });
});
