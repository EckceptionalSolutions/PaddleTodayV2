import { describe, it, expect } from 'vitest';
import { isTripMutation, isTripPlan, isLogInput, newTripPlan, validTripDate, tripPlan, tripTimeIssue, historicalWaterSuggestion } from './trips';
describe('trip validation', () => {
  it('flags skipped and repeated daylight-saving times', () => {
    expect(tripTimeIssue('2026-03-08', '02:30', 'America/Chicago')).not.toBeNull();
    expect(tripTimeIssue('2026-11-01', '01:30', 'America/Chicago')).not.toBeNull();
    expect(tripTimeIssue('2026-10-10', '09:00', 'America/Chicago')).toBeNull();
  });
  it('supports undated drafts and date-only plans', () => {
    const plan = newTripPlan({ name: 'River' }); expect(isTripPlan(plan)).toBe(true);
    expect(isTripPlan({ ...plan, date: '2026-10-10' })).toBe(true);
    expect(isTripPlan({ ...plan, launch: '09:00' })).toBe(false);
  });
  it('rejects impossible dates, invalid zones and traversal identifiers', () => {
    expect(validTripDate('2026-02-30')).toBe(false);
    expect(isTripPlan({ ...newTripPlan({ name: 'River' }), timeZone: 'Invalid/Zone' })).toBe(false);
    expect(isTripMutation({ operationId: '../../other-user', baseRevision: 0, command: { type: 'delete' } })).toBe(false);
  });
  it('requires an actual date for a paddle log', () => {
    expect(isLogInput({ sourceTripId: null, route: newTripPlan({ name: 'River' }).route, date: '', time: '', timeZone: 'UTC', notes: '', paddleAgain: '', water: [] })).toBe(false);
  });
  it('uses an explicit public projection, dropping unexpected fields', () => {
    const input = { ...newTripPlan({ name: 'River' }), notes: 'private', members: [{ uid: 'private' }] };
    expect(tripPlan(input)).not.toHaveProperty('notes'); expect(tripPlan(input)).not.toHaveProperty('members');
  });
  it('only offers water snapshots captured on the actual outing date in its time zone', () => {
    const history = { river: { name: 'River' }, todayHourly: [{ capturedAt: '2026-09-26T01:00:00Z', gaugeNow: '150 cfs' }] } as Parameters<typeof historicalWaterSuggestion>[0];
    expect(historicalWaterSuggestion(history, '2026-09-24', 'America/Chicago')).toBeNull();
    const water = historicalWaterSuggestion(history, '2026-09-25', 'America/Chicago');
    expect(water).toMatchObject({ value: '150', unit: 'cfs', measuredAt: '' });
    expect(water?.source).toContain('captured 2026-09-26T01:00:00Z');
  });
});
