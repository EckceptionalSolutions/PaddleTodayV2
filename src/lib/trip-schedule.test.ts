import { describe, it, expect } from 'vitest';
import { tripSchedule, tripLocalInstant } from './trip-schedule';
import { guestTripPlans, saveGuestTripPlan, GUEST_TRIP_PLANS_KEY, type GuestTripPlan } from './guest-trip-plans';

describe('explicit trip schedules', () => {
  it('requires both times and rejects impossible dates, reversed times and invalid zones', () => {
    for (const values of [['', '', 'UTC'], ['2026-02-30T09:00', '2026-03-01T13:00', 'UTC'], ['2026-11-05T13:00', '2026-11-05T09:00', 'UTC'], ['2026-11-05T09:00', '2026-11-05T13:00', 'Invalid/Zone']]) {
      expect(tripSchedule(...values as [string, string, string]).error).toBeTruthy();
    }
  });
  it('keeps overnight dates and selected zones without using device time', () => {
    const result = tripSchedule('2026-11-05T23:00', '2026-11-06T09:00', 'America/Chicago');
    expect(result.launch?.toISOString()).toBe('2026-11-06T05:00:00.000Z');
    expect(result.expected?.toISOString()).toBe('2026-11-06T15:00:00.000Z');
    expect(tripLocalInstant('2026-11-05T09:00', 'Asia/Kolkata')?.toISOString()).toBe('2026-11-05T03:30:00.000Z');
  });
  it('rejects missing and repeated wall-clock times at daylight-saving changes', () => {
    expect(tripLocalInstant('2026-03-08T02:30', 'America/Chicago')).toBeNull();
    expect(tripLocalInstant('2026-11-01T01:30', 'America/Chicago')).toBeNull();
    expect(tripLocalInstant('2026-11-01T03:30', 'America/Chicago')?.toISOString()).toBe('2026-11-01T09:30:00.000Z');
  });
});

describe('browser trip plans', () => {
  const plan: GuestTripPlan = { slug: 'test-river', name: 'Test River', reach: 'Upper to Lower', putInId: 'upper', takeOutId: 'lower', start: '2026-11-05T09:00', end: '2026-11-05T13:00', timeZone: 'America/Chicago', savedAt: '2026-10-21T15:00:00Z' };
  it('updates the selected access pair and retains other plans', () => {
    const data = new Map<string, string>();
    const storage = { getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => { data.set(key, value); } };
    saveGuestTripPlan(storage, plan);
    saveGuestTripPlan(storage, { ...plan, putInId: 'middle' });
    saveGuestTripPlan(storage, { ...plan, start: '2026-11-06T09:00', end: '2026-11-06T13:00' });
    const plans = guestTripPlans(data.get(GUEST_TRIP_PLANS_KEY)!);
    expect(plans).toHaveLength(2);
    expect(plans[0].start).toBe('2026-11-06T09:00');
    expect(plans[1].putInId).toBe('middle');
  });
  it('preserves unreadable data and reports write failures', () => {
    const write = () => { throw new Error('Storage full'); };
    expect(() => saveGuestTripPlan({ getItem: () => '{unfinished', setItem: write }, plan)).toThrow();
    expect(() => saveGuestTripPlan({ getItem: () => null, setItem: write }, plan)).toThrow('Storage full');
  });
});
