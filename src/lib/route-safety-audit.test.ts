import { describe, expect, it } from 'vitest';
import { auditRouteSafety } from './route-safety-audit';
import type { River } from './types';

const baseRoute: River = {
  id: 'safety-test',
  slug: 'safety-test',
  name: 'Safety Test River',
  reach: 'Put-in to Take-out',
  state: 'Minnesota',
  region: 'Test Region',
  summary: 'Easy day route.',
  statusText: 'Use the gauge as a planning aid.',
  latitude: 44.9,
  longitude: -93.2,
  gaugeSource: {
    id: 'usgs-safety',
    provider: 'usgs',
    siteId: '123456',
    metric: 'discharge_cfs',
    unit: 'cfs',
    kind: 'direct',
    siteName: 'Safety Test Gauge',
  },
  profile: {
    thresholdModel: 'two-sided',
    idealMin: 300,
    idealMax: 700,
    tooLow: 200,
    tooHigh: 900,
    thresholdSource: {
      label: 'Official range',
      url: 'https://example.com/range',
    },
    thresholdSourceStrength: 'official',
    rainfallSensitivity: 'medium',
    seasonMonths: [5, 6, 7, 8, 9],
    seasonNotes: 'Warm season route.',
    difficulty: 'easy',
    difficultyNotes: 'Easy moving-water route.',
    confidenceNotes: 'Direct gauge and official endpoints.',
  },
  evidenceNotes: [],
  sourceLinks: [],
};

describe('route safety audit', () => {
  it('flags whitewater routes missing a safety profile', () => {
    const issues = auditRouteSafety([{ ...baseRoute, routeType: 'whitewater' }]);

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          severity: 'High',
          category: 'Missing safety profile',
        }),
      ]),
    );
  });

  it('flags mandatory takeout above dam language as critical', () => {
    const issues = auditRouteSafety([
      {
        ...baseRoute,
        summary: 'This route has a mandatory takeout above a low-head dam.',
      },
    ]);

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          severity: 'Critical',
          category: 'Dam',
        }),
      ]),
    );
  });

  it('downgrades profiled critical hazards that still need source review', () => {
    const issues = auditRouteSafety([
      {
        ...baseRoute,
        summary: 'This route has a mandatory takeout above a low-head dam.',
        safetyProfile: {
          riskLevel: 'advanced',
          hazards: ['low_head_dam', 'mandatory_takeout'],
          safetyNotes: ['Identify the take-out before launch and do not drift into the dam corridor.'],
          reviewStatus: 'needs_review',
        },
      },
    ]);

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          severity: 'High',
          category: 'Safety review pending',
        }),
      ]),
    );
    expect(issues).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          severity: 'Critical',
        }),
      ]),
    );
  });

  it('does not flag reviewed caution routes for matching hazard language', () => {
    const issues = auditRouteSafety([
      {
        ...baseRoute,
        summary: 'Watch for strainers after storms.',
        safetyProfile: {
          riskLevel: 'caution',
          hazards: ['strainers'],
          safetyNotes: ['Watch for fresh wood after storms.'],
          reviewStatus: 'reviewed',
        },
      },
    ]);

    expect(issues).toHaveLength(0);
  });
});
