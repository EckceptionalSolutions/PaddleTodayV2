import { describe, expect, it } from 'vitest';
import { newTripPlan, type Trip } from '@paddletoday/api-contract';
import { nextDatedTrip, tripCoordinationSummary, tripLocalToday, paddleLogSchedule } from './trip-dashboard';
const trip = (overrides: Partial<Trip> = {}): Trip => ({ ...newTripPlan({ name: 'River' }), id: 'trip', date: '2026-10-06', timeZone: 'UTC', ownerUid: 'me', revision: 1, status: 'planned', members: [], shuttle: [], updatedAt: '', updatedBy: 'me', activity: [], ...overrides });
describe('next paddle', () => {
  const now = new Date('2026-10-05T12:00:00Z');
  it('excludes old, undated, cancelled, completed, and invalid plans', () => {
    const next = trip({ id: 'next' });
    expect(nextDatedTrip([trip({ date: '2026-10-04' }), trip({ date: '' }), trip({ date: '2026-02-30' }), trip({ date: '2026-10-05', status: 'cancelled' }), trip({ date: '2026-10-05', status: 'completed' }), trip({ date: '2026-10-08' }), next], now)).toBe(next);
  });
  it('keeps an unfinished plan for today visible after launch', () => {
    const today = trip({ date: '2026-10-05', launch: '09:00' });
    expect(nextDatedTrip([trip(), today], now)).toBe(today);
  });
  it('uses each trip’s time zone at a day boundary', () => {
    const instant = new Date('2026-10-05T01:00:00Z');
    const west = trip({ date: '2026-10-04', timeZone: 'America/Los_Angeles' });
    expect(tripLocalToday(west, instant)).toBe('2026-10-04');
    expect(nextDatedTrip([trip({ date: '2026-10-04' }), west], instant)).toBe(west);
  });
  it('orders launch times across time zones and puts an unspecified time last', () => {
    const early = trip({ launch: '09:00', timeZone: 'Asia/Tokyo' });
    const later = trip({ launch: '08:00', timeZone: 'America/Los_Angeles' });
    expect(nextDatedTrip([later, trip(), early], now)).toBe(early);
    expect(nextDatedTrip([trip(), later], now)).toBe(later);
  });
  it('summarizes responses and vehicles without seat assignments or requiring a shuttle', () => {
    expect(tripCoordinationSummary(trip())).toEqual({ crew: '0 going', shuttle: 'No shuttle arranged' });
    const group = trip({ members: [{ uid: 'me', name: 'You', role: 'owner', rsvp: 'going' }, { uid: 'other', name: 'Friend', role: 'participant', rsvp: 'maybe' }], shuttle: [{ id: 'car', driverUid: 'me', label: 'Car', seats: 3, passengers: ['other'], meeting: '', time: '', parkedAt: '', note: '' }] });
    expect(tripCoordinationSummary(group)).toEqual({ crew: '1 going · 1 maybe', shuttle: '1 vehicle' });
  });
});
describe('paddle log defaults', () => {
  const now = new Date('2026-10-05T01:00:00Z');
  it('does not use a future plan date or launch time for a past paddle', () => {
    expect(paddleLogSchedule(trip({ date: '2026-10-06', launch: '10:30' }), 'past', 'America/Chicago', now)).toEqual({ date: '2026-10-04', time: '' });
  });
  it('reuses a past plan and uses trip-local today for recordings', () => {
    expect(paddleLogSchedule(trip({ date: '2026-10-03', launch: '10:30' }), 'past', 'America/Chicago', now)).toEqual({ date: '2026-10-03', time: '10:30' });
    expect(paddleLogSchedule(trip({ date: '2026-10-03', launch: '10:30' }), 'record', 'America/Chicago', now)).toEqual({ date: '2026-10-04', time: '' });
  });
});
