import { describe, expect, it } from 'vitest';
import { weekendOutlookAvailability, weekendWeatherVisualState } from './weekend-presenters.js';

describe('weekend outlook availability', () => {
  const now = new Date(2030, 5, 15, 12).getTime();
  const generatedAt = new Date(now).toISOString();
  const route = { generatedAt, weekend: { forecastEndDate: '2030-06-16' } };
  const payload = { generatedAt, rivers: [route] };
  it('allows fresh recommendations and a genuine fresh empty result', () => {
    expect(weekendOutlookAvailability(payload, now).rivers).toEqual([route]);
    expect(weekendOutlookAvailability({ ...payload, rivers: [] }, now).available).toBe(true);
  });
  it('uses the shared two-hour boundary, including a tab that ages in memory', () => {
    expect(weekendOutlookAvailability(payload, now + 7_200_000).available).toBe(true);
    expect(weekendOutlookAvailability(payload, now + 7_200_001).available).toBe(false);
    expect(weekendOutlookAvailability(payload, now).expiresAt).toBe(now + 7_200_001);
  });
  it.each(['invalid', new Date(now + 300_001).toISOString(), new Date(now - 7_200_001).toISOString()])(
    'rejects invalid, future, or expired timestamps: %s', timestamp => {
      expect(weekendOutlookAvailability({ ...payload, generatedAt: timestamp }, now).available).toBe(false);
    });
  it('respects the server stale signal and age', () => {
    expect(weekendOutlookAvailability({ ...payload, snapshotStatus: 'stale' }, now).available).toBe(false);
    expect(weekendOutlookAvailability({ ...payload, snapshotAgeSeconds: 7201 }, now).available).toBe(false);
  });
  it('does not confuse a malformed response with a genuine empty result', () => {
    expect(weekendOutlookAvailability({ generatedAt }, now).available).toBe(false);
  });
  it('withholds an ended forecast even if its response was generated recently', () => {
    const expired = { ...route, weekend: { forecastEndDate: '2030-06-14' } };
    expect(weekendOutlookAvailability({ ...payload, rivers: [expired] }, now).available).toBe(false);
    expect(weekendOutlookAvailability({ ...payload, rivers: [expired, route] }, now).rivers).toEqual([route]);
  });
  it('withholds a stale route within a fresh response', () => {
    expect(weekendOutlookAvailability({ ...payload, rivers: [{ ...route,
      generatedAt: new Date(now - 7_200_001).toISOString() }] }, now).available).toBe(false);
  });
  it('accepts older response shapes without per-route dates', () => {
    expect(weekendOutlookAvailability({ generatedAt, rivers: [{ weekend: {} }] }, now).available).toBe(true);
  });
  it('expires an ending forecast at the next local midnight', () => {
    const late = new Date(2030, 5, 15, 23).getTime();
    const ending = { generatedAt: new Date(late).toISOString(), rivers: [{ weekend: { forecastEndDate: '2030-06-15' } }] };
    expect(weekendOutlookAvailability(ending, late).expiresAt).toBe(new Date(2030, 5, 16).getTime());
  });
});

const favorable = {
  liveData: { weatherState: 'live' },
  weekend: {
    summary: 'Current river shape and forecast both line up well.',
    explanation: 'Weekend: No thunderstorm signal is showing, 13% rain chance, winds up to 9 mph.',
    signalLine: 'Weekend rain: 13% max • Wind: up to 9 mph • Temps: 62°-85°F',
  },
};

describe('weekend weather badges', () => {
  it('does not turn a negated storm signal or low rain probability into a warning', () => {
    expect(weekendWeatherVisualState(favorable)).toBe('calm');
  });
  it('preserves affirmative storm warnings', () => {
    expect(weekendWeatherVisualState({ ...favorable,
      weekend: { ...favorable.weekend, explanation: 'Weekend: Storm signal is present, 13% rain chance.' },
    })).toBe('storm');
  });
  it.each([
    ['Weekend rain: 60% max • Wind: up to 9 mph • Temps: 62°-85°F', 'rain'],
    ['Weekend rain: 13% max • Wind: up to 18 mph • Temps: 62°-85°F', 'wind'],
    ['Weekend rain: 13% max • Wind: up to 9 mph • Temps: -5°-30°F', 'cold'],
  ])('uses the forecast values in %s', (signalLine, expected) => {
    expect(weekendWeatherVisualState({ ...favorable, weekend: { ...favorable.weekend, signalLine } })).toBe(expected);
  });
  it.each(['stale', 'unavailable'])('keeps %s weather uncertain', weatherState => {
    expect(weekendWeatherVisualState({ ...favorable, liveData: { weatherState } })).toBe('unknown');
  });
});
