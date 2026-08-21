import { describe, expect, it } from 'vitest';
import { eligibleTodayRoutes, eligibleWeekendRoutes, hasTodayNotificationForWindow } from './area-notification-evaluator';

const subscription = {
  latitude: 44.95,
  longitude: -93.1,
  maxTravelMinutes: 120,
};

describe('area notification eligibility', () => {
  it('does not let a previous day\'s send suppress a new local-day notification', () => {
    expect(hasTodayNotificationForWindow({
      lastTodaySentAt: '2026-08-20T15:00:00.000Z',
      timeZone: 'America/Chicago',
    }, '2026-08-21')).toBe(false);
  });

  it('recognizes a successful send in the current local delivery window', () => {
    expect(hasTodayNotificationForWindow({
      lastTodaySentAt: '2026-08-21T14:00:00.000Z',
      timeZone: 'America/Chicago',
    }, '2026-08-21')).toBe(true);
  });

  it('keeps only nearby live ready Good or Strong today routes', () => {
    const routes = [
      todayRoute('near-good', 'Good', 80, 'ready', 'live', 'High', 44.96, -93.11),
      todayRoute('far-strong', 'Strong', 95, 'ready', 'live', 'High', 47, -90),
      todayRoute('verify-good', 'Good', 90, 'verify', 'live', 'High', 44.96, -93.11),
      todayRoute('stale-strong', 'Strong', 99, 'ready', 'degraded', 'High', 44.96, -93.11),
    ];

    expect(eligibleTodayRoutes(routes as any, subscription).map((route) => route.river.slug)).toEqual(['near-good']);
  });

  it('keeps only nearby live Medium or High confidence weekend routes', () => {
    const routes = [
      weekendRoute('near-weekend', 'Strong', 'High', 'live', 44.96, -93.11),
      weekendRoute('fair-weekend', 'Fair', 'High', 'live', 44.96, -93.11),
      weekendRoute('low-confidence', 'Good', 'Low', 'live', 44.96, -93.11),
    ];

    expect(eligibleWeekendRoutes(routes as any, subscription).map((route) => route.river.slug)).toEqual(['near-weekend']);
  });
});

function todayRoute(slug: string, rating: string, score: number, readiness: string, overall: string, confidence: string, latitude: number, longitude: number) {
  return {
    river: { slug, name: slug, latitude, longitude, scoreEligibility: 'scored' },
    rating,
    score,
    readiness: { status: readiness },
    confidence: { label: confidence },
    liveData: { overall },
  };
}

function weekendRoute(slug: string, rating: string, confidence: string, overall: string, latitude: number, longitude: number) {
  return {
    river: { slug, name: slug, latitude, longitude, scoreEligibility: 'scored' },
    weekend: { rating, confidence, score: 90 },
    liveData: { overall },
  };
}
