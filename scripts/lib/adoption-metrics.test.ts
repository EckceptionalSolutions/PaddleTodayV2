import { describe, expect, it } from 'vitest';
import { adoptionFromLocal, adoptionFromWeekly } from './adoption-metrics';

const now = new Date('2026-11-04T13:00:00Z');
function fixture() {
  return {
    generatedAt: '2026-11-04T12:00:00Z',
    period: { timezone: 'America/Chicago', current: { startDate: '2026-10-25', endDate: '2026-10-31' } },
    sources: {
      firebase: { status: 'ready', value: { productEvents: { app_opened: { events: 58, users: 20 }, route_opened: { events: 15, users: 4 }, river_hub_viewed: { events: 3 }, saved_river_toggled: { events: 2 } } } },
      umami: { status: 'manual', reason: 'No API access' },
    },
  };
}

describe('aggregate adoption reporting', () => {
  it('imports event totals, keeps hubs separate from route opens, and preserves unknown web coverage', () => {
    const result = adoptionFromWeekly(fixture(), now);
    expect(result).toMatchObject({ eventCount: 78, routeViews: 15, noResultSearches: null, period: { startDate: '2026-10-25', endDate: '2026-10-31' } });
    expect(result.actions).toMatchObject({ saveToggles: { mobile: 2, web: null }, directionsOpens: { mobile: 0, web: null }, noResultSearches: { mobile: null, web: null } });
    expect(result.sources.web.status).toBe('manual');
  });
  it('drops identities, arbitrary properties and unknown event names from provider payloads', () => {
    const input = fixture();
    Object.assign(input.sources.firebase.value.productEvents, { email_address: { events: 123, email: 'private@example.test' } });
    Object.assign(input.sources.firebase.value, { users: ['private@example.test'], token: 'private-token' });
    const result = JSON.stringify(adoptionFromWeekly(input, now));
    expect(result).not.toContain('private');
    expect(result).not.toContain('email_address');
    expect(result).not.toContain('"users"');
  });
  it.each([-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, '15', Number.MAX_SAFE_INTEGER + 1])('rejects invalid counts: %s', value => {
    const input = fixture();
    Object.assign(input.sources.firebase.value.productEvents.route_opened, { events: value });
    expect(() => adoptionFromWeekly(input, now)).toThrow('safe integers');
  });
  it('keeps provider errors unknown instead of counting them as zero', () => {
    const input = fixture();
    input.sources.firebase.status = 'error';
    expect(adoptionFromWeekly(input, now)).toMatchObject({ source: 'no-export-available', eventCount: null, routeViews: null, noResultSearches: null, actions: { routeOpens: { mobile: null, web: null } } });
  });
  it('rejects a ready provider with a missing event aggregate instead of inventing zero activity', () => {
    const input = fixture();
    Object.assign(input.sources.firebase, { value: {} });
    expect(() => adoptionFromWeekly(input, now)).toThrow('aggregates are missing');
  });
  it('imports web aggregates without assuming newly added queries were present in old reports', () => {
    const input = fixture();
    Object.assign(input.sources.umami, { status: 'ready', value: { conversions: [{ name: 'Route view', events: 5 }, { name: 'river_hub_no_results', events: 4 }, { name: 'private@example.test', events: 99 }] } });
    const result = adoptionFromWeekly(input, now);
    expect(result).toMatchObject({ routeViews: 20, noResultSearches: 4, actions: { directionsOpens: { mobile: 0, web: null } } });
    expect(result.sources.web.eventCounts).not.toHaveProperty('private@example.test');
  });
  it('warns on stale observations even if the report itself was regenerated today', () => {
    const input = fixture();
    input.period.current = { startDate: '2026-10-04', endDate: '2026-10-10' };
    expect(adoptionFromWeekly(input, now).warnings.join(' ')).toContain('ended 24 days ago');
  });
  it.each(['2026-02-30', 'not-a-date', '2026-11-05'])('rejects invalid or future observation periods: %s', endDate => {
    const input = fixture();
    input.period.current.endDate = endDate;
    expect(() => adoptionFromWeekly(input, now)).toThrow();
  });
  it('supports counted local exports and keeps user properties out of persisted reports', () => {
    const result = adoptionFromLocal([{ name: 'Route view', count: 15, properties: { email: 'private@example.test' } }, { name: 'river_hub_no_results', count: 4, route: 'namekagon-river' }], now);
    expect(result).toMatchObject({ eventCount: 19, routeViews: 15, noResultSearches: 4, noResultTargets: { 'namekagon-river': 4 } });
    expect(JSON.stringify(result)).not.toContain('private');
  });
});
