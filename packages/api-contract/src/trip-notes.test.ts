import { describe, expect, it } from 'vitest';
import { isTripPlan, newTripPlan } from './trips';
import { tripNotes, withTripNotes } from './trip-notes';

describe('single trip notes field', () => {
  const old = { checkInLocal: '', groupSize: 3, note: 'Bring lunch', boatDescription: 'Two kayaks', vehicleDescription: 'Blue car at take-out' };
  it('includes all legacy details with context', () => {
    expect(tripNotes(old)).toBe('Bring lunch\n\nBoats & gear: Two kayaks\n\nShuttle: Blue car at take-out');
  });
  it('does not migrate or mutate unchanged details', () => {
    const next = withTripNotes(old, tripNotes(old));
    expect(next).toEqual(old); expect(next).not.toBe(old);
    expect(withTripNotes(undefined, '')).toBeUndefined();
  });
  it('consolidates an intentional edit and preserves scheduling and headcount', () => {
    expect(withTripNotes(old, 'Meet at nine')).toEqual({ ...old, note: 'Meet at nine', boatDescription: '', vehicleDescription: '' });
    expect(tripNotes(old)).toContain('Two kayaks');
  });
  it('retains maximum-length legacy notes on unrelated edits and rejects oversized new notes', () => {
    const long = { ...old, note: 'n'.repeat(2000), boatDescription: 'b'.repeat(200), vehicleDescription: 'v'.repeat(300) };
    const plan = newTripPlan({ name: 'River' });
    expect(isTripPlan({ ...plan, preparation: withTripNotes(long, tripNotes(long)) })).toBe(true);
    expect(isTripPlan({ ...plan, preparation: withTripNotes(old, 'n'.repeat(2001)) })).toBe(false);
  });
});
