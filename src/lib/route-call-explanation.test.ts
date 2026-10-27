import { describe, expect, it } from 'vitest';
import { routeCallExplanation } from './route-call-explanation.js';

describe('visible reason for the route call', () => {
  it('shows measured gauge evidence instead of repeating the verdict', () => {
    expect(routeCallExplanation({ explanation: 'Skip today. The gauge is low at 4.95 ft. It fell 0.04 ft in 24 hours. Wind is manageable.' }))
      .toBe('The gauge is low at 4.95 ft. It fell 0.04 ft in 24 hours.');
  });

  it('puts a failing weather check ahead of otherwise usable water', () => {
    expect(routeCallExplanation({
      explanation: 'Skip today. The gauge is in range at 6.50 ft. Wind is manageable.',
      checklist: [{ status: 'skip', detail: 'Thunderstorms are forecast during the trip.' }],
    })).toBe('Thunderstorms are forecast during the trip. The gauge is in range at 6.50 ft.');
  });

  it('explains a cold-weather score penalty alongside the gauge', () => {
    expect(routeCallExplanation({
      explanation: 'Skip today. The gauge is in range at 6.50 ft.',
      scoreBreakdown: { temperatureAdjustment: -30, temperatureExplanation: 'Air temperature is 35°F.' },
    })).toBe('Air temperature is 35°F. The gauge is in range at 6.50 ft.');
  });

  it('keeps stale optimistic conditions out of an unavailable call', () => {
    expect(routeCallExplanation({
      explanation: 'Paddle today. The gauge is in range.',
      readiness: { reason: 'The gauge observation is stale.' },
    }, { unavailable: true })).toBe('The gauge observation is stale.');
  });

  it('does not expose legacy storage metadata as the reason', () => {
    expect(routeCallExplanation({
      readiness: { status: 'skip', reason: 'Derived from a stored result created before explicit readiness was available.' },
      explanation: 'Skip today. The gauge is low at 4.95 ft.',
    })).toBe('The gauge is low at 4.95 ft.');
  });
});
