import { describe, expect, it } from 'vitest';
import { localTripTime, mergeTripTime, parseTripTime } from './trip-time';

describe('local trip timing', () => {
  it('round trips local dates without interpreting them as UTC', () => {
    const input = '2030-06-15 09:30';
    const date = parseTripTime(input)!;
    expect(date.getHours()).toBe(9);
    expect(localTripTime(date)).toBe(input);
    expect(parseTripTime('2030-06-15T09:30')).toEqual(date);
  });
  it('rejects impossible dates and partial manual input', () => {
    for (const value of ['2030-02-29 10:00', '2030-04-31 10:00', '2030-06-15 24:00', '2030-06-15 10:60', '2030-06', '']) {
      expect(parseTripTime(value)).toBeNull();
    }
    expect(parseTripTime('2032-02-29 10:00')).not.toBeNull();
  });
  it('preserves the selected time when changing a month-end date', () => {
    const base = new Date(2030, 0, 31, 23, 45);
    expect(mergeTripTime(base, new Date(2030, 1, 2), 'date')).toBe('2030-02-02 23:45');
    expect(base.getMonth()).toBe(0);
  });
  it('preserves the chosen overnight landing date when changing the time', () => {
    const base = new Date(2030, 5, 16, 0, 30);
    expect(mergeTripTime(base, new Date(2026, 0, 1, 2, 15), 'time')).toBe('2030-06-16 02:15');
  });
});
