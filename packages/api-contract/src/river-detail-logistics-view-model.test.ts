import { describe, expect, it } from 'vitest';
import type { RiverRouteLogistics } from './index';
import {
  buildRiverDetailLogisticsViewModel,
  compactLogisticsValue,
} from './river-detail-logistics-view-model';

function logistics(overrides: Partial<RiverRouteLogistics> = {}): RiverRouteLogistics {
  return {
    distanceLabel: '8 mi',
    estimatedPaddleTime: '3 hours',
    shuttle: 'Bike shuttle works on the adjacent trail.',
    permits: 'No permit required.',
    camping: 'Treat this as a day trip.',
    summary: 'A simple day route.',
    accessCaveats: ['Confirm put-in parking.', 'Confirm take-out hours.'],
    watchFor: [],
    ...overrides,
  };
}

describe('River Detail logistics view model', () => {
  it.each([
    ['No shuttle is required; launch and return at the same ramp.', 'No shuttle'],
    ['No vehicle shuttle is required. Return to Friendship Landing.', 'No shuttle'],
    ['No car shuttle needed for this return paddle.', 'No shuttle'],
    ['No shuttle is required if you paddle back upstream.', 'Check shuttle'],
    ['No shuttle service is provided. Arrange your own vehicle shuttle.', 'Car shuttle'],
  ])('shows the stated shuttle requirement for %s', (shuttle, headline) => {
    expect(buildRiverDetailLogisticsViewModel(logistics({ shuttle })).shuttleHeadline).toBe(headline);
  });
  it('builds shared trip headlines and compact values', () => {
    expect(buildRiverDetailLogisticsViewModel(logistics())).toMatchObject({
      shuttleHeadline: 'Car or bike',
      permitsHeadline: 'None noted',
      campingHeadline: 'Day trip',
      compactPermits: 'None noted',
      compactCamping: 'Day trip',
      primaryAccessCaveat: 'Confirm put-in parking.',
      secondaryAccessCaveat: 'Confirm take-out hours.',
    });
  });

  it('provides conservative fallbacks and concise long-detail labels', () => {
    expect(buildRiverDetailLogisticsViewModel(undefined)).toEqual({
      shuttleHeadline: 'Check shuttle',
      permitsHeadline: 'Check posted rules',
      campingHeadline: 'Options nearby',
      compactShuttle: 'Not tracked',
      compactPermits: 'Not tracked',
      compactCamping: 'Not tracked',
      primaryAccessCaveat: 'Check parking, launch, and access rules on the ground.',
      secondaryAccessCaveat: 'Check parking, launch, and access rules on the ground.',
    });
    expect(compactLogisticsValue('A detailed shuttle explanation that belongs below the summary')).toBe('Details below');
  });
});
