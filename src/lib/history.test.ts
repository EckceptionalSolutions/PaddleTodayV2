import { describe, expect, it } from 'vitest';
import { summarizeSnapshots, type RiverHistorySnapshot } from './history';

describe('summarizeSnapshots', () => {
  it('builds a daily rollup from hourly route snapshots', () => {
    const snapshots: RiverHistorySnapshot[] = [
      {
        slug: 'test-river',
        capturedAt: '2026-04-03T12:05:00Z',
        localDate: '2026-04-03',
        localHour: '07:00',
        score: 62,
        rating: 'Fair',
        riverQuality: 88,
        windAdjustment: -4,
        temperatureAdjustment: -12,
        rainAdjustment: -10,
        comfortAdjustment: 0,
        gaugeBandLabel: 'Ideal',
        gaugeNow: '7.2 ft',
        temperatureF: 34,
        windMph: 11,
        rainChance: 70,
      },
      {
        slug: 'test-river',
        capturedAt: '2026-04-03T17:05:00Z',
        localDate: '2026-04-03',
        localHour: '12:00',
        score: 71,
        rating: 'Fair',
        riverQuality: 88,
        windAdjustment: -3,
        temperatureAdjustment: -8,
        rainAdjustment: -6,
        comfortAdjustment: 0,
        gaugeBandLabel: 'Ideal',
        gaugeNow: '7.3 ft',
        temperatureF: 41,
        windMph: 9,
        rainChance: 42,
      },
      {
        slug: 'test-river',
        capturedAt: '2026-04-03T22:05:00Z',
        localDate: '2026-04-03',
        localHour: '17:00',
        score: 66,
        rating: 'Fair',
        riverQuality: 88,
        windAdjustment: -5,
        temperatureAdjustment: -9,
        rainAdjustment: -8,
        comfortAdjustment: 0,
        gaugeBandLabel: 'Ideal',
        gaugeNow: '7.4 ft',
        temperatureF: 39,
        windMph: 13,
        rainChance: 56,
      },
    ];

    const summary = summarizeSnapshots(snapshots, '2026-04-03');

    expect(summary.date).toBe('2026-04-03');
    expect(summary.avgScore).toBe(66);
    expect(summary.minScore).toBe(62);
    expect(summary.maxScore).toBe(71);
    expect(summary.latestScore).toBe(66);
    expect(summary.latestRating).toBe('Fair');
    expect(summary.sampleCount).toBe(3);
    expect(summary.morningScore).toBe(62);
    expect(summary.afternoonScore).toBe(66);
  });
});
