import { describe, expect, it } from 'vitest';
import { mapDecision } from './map-decision';

describe('public calls on maps', () => {
  it.each([
    ['ready', 'paddle', 'Strong', 95],
    ['verify', 'watch', 'Fair', 95],
    ['withheld', 'unavailable', 'unavailable', null],
    ['skip', 'skip', 'No-go', 95],
  ] as const)('uses the %s gate even when the raw score is favorable', (status, call, rating, score) => {
    const decision = mapDecision({ score: 95, rating: 'Strong', readiness: { status } });
    expect(decision.call).toBe(call);
    expect(decision.rating).toBe(rating);
    expect(decision.score).toBe(score);
    if (call === 'unavailable') {
      expect(decision.markerLabel).toBe('—');
      expect(decision.description).not.toContain('95');
    }
  });
  it('does not imply a call for planning-only or missing-readiness routes', () => {
    expect(mapDecision({ score: 95, rating: 'Strong' }).score).toBeNull();
    const planning = mapDecision({ score: 95, rating: 'Strong', readiness: { status: 'ready' }, river: { scoreEligibility: 'planning' } });
    expect(planning.label).toBe('Planning only');
    expect(planning.score).toBeNull();
  });
});
