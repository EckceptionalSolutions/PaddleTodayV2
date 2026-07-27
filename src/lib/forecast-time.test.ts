import { describe, expect, it } from 'vitest';

import {
  addDaysToDateKey,
  forecastDateKey,
  formatForecastDateKey,
  formatForecastHourLabel,
  upcomingWeekendDateKeys,
} from './forecast-time';

describe('forecast time formatting', () => {
  it('uses the route timezone instead of the server timezone', () => {
    expect(
      formatForecastHourLabel('2026-07-26T22:00:00-05:00', {
        referenceTime: '2026-07-26T21:00:00-05:00',
        timeZone: 'America/Chicago',
      }),
    ).toBe('10:00 PM');
  });

  it('makes the first hour after a local date boundary explicit', () => {
    expect(
      formatForecastHourLabel('2026-07-27T00:00:00-05:00', {
        referenceTime: '2026-07-26T22:00:00-05:00',
        timeZone: 'America/Chicago',
      }),
    ).toBe('Tomorrow, 12:00 AM');
  });

  it('falls back to the timestamp clock and calendar date for an invalid timezone', () => {
    expect(
      formatForecastHourLabel('2026-07-28T06:30:00-05:00', {
        referenceTime: '2026-07-26T22:00:00-05:00',
        timeZone: 'Not/A_Timezone',
      }),
    ).toBe('Tue, 6:30 AM');
  });

  it('keeps the active weekend on Saturday and Sunday', () => {
    expect(upcomingWeekendDateKeys('2026-07-25T14:00:00-05:00', 'America/Chicago')).toEqual({
      saturday: '2026-07-25',
      sunday: '2026-07-26',
    });
    expect(upcomingWeekendDateKeys('2026-07-26T14:00:00-05:00', 'America/Chicago')).toEqual({
      saturday: '2026-07-25',
      sunday: '2026-07-26',
    });
  });

  it('rolls a late-Sunday outlook forward to the next useful weekend', () => {
    expect(upcomingWeekendDateKeys('2026-07-26T18:00:00-05:00', 'America/Chicago')).toEqual({
      saturday: '2026-08-01',
      sunday: '2026-08-02',
    });
    expect(upcomingWeekendDateKeys('2026-07-27T00:30:00Z', 'America/Chicago')).toEqual({
      saturday: '2026-08-01',
      sunday: '2026-08-02',
    });
  });

  it('handles date-key arithmetic and display without host-timezone drift', () => {
    expect(forecastDateKey('2026-11-01T00:30:00-05:00', 'America/Chicago')).toBe('2026-11-01');
    expect(addDaysToDateKey('2026-12-31', 1)).toBe('2027-01-01');
    expect(formatForecastDateKey('2026-07-25')).toBe('Jul 25');
  });
});
