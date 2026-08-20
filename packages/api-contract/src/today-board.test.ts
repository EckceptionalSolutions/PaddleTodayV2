import { describe, expect, it } from 'vitest';
import {
  buildTodayBoardSnapshot,
  callLabelForRating,
  callLabelForDecision,
  callStateForDecision,
  callStateForRating,
  qualityTierLabel,
} from './today-board';

describe('call presentation', () => {
  it('keeps Strong and Good in the same Paddle call while preserving their tiers', () => {
    expect(callStateForRating('Strong')).toBe('paddle');
    expect(callStateForRating('Good')).toBe('paddle');
    expect(callLabelForRating('Strong')).toBe('Paddle today');
    expect(callLabelForRating('Good', 'weekend')).toBe('Paddle this weekend');
    expect(qualityTierLabel('Strong')).toBe('Strong conditions');
    expect(qualityTierLabel('Good')).toBe('Good conditions');
  });

  it('uses compact labels for maps and controls', () => {
    expect(callLabelForRating('Fair', 'today', true)).toBe('Watch');
    expect(callLabelForRating('No-go', 'weekend', true)).toBe('Skip');
  });

  it('gates rating calls through readiness without exposing a second call taxonomy', () => {
    expect(callLabelForDecision('Strong', 'ready')).toBe('Paddle today');
    expect(callLabelForDecision('Strong', 'verify')).toBe('Watch closely');
    expect(callLabelForDecision('Strong', 'withheld')).toBe('Call unavailable');
    expect(callLabelForDecision('Good', 'skip')).toBe('Skip today');
    expect(callLabelForDecision('No-go', 'verify')).toBe('Skip today');
    expect(callLabelForDecision('Fair', 'ready')).toBe('Watch closely');
    expect(callLabelForDecision('Strong', 'withheld', 'today', true)).toBe('No call');
    expect(callStateForDecision('Strong', 'verify')).toBe('watch');
  });

  it('counts final decision calls instead of rating tiers', () => {
    const rivers = [
      { river: { name: 'Paddle' }, score: 90, rating: 'Strong', readiness: { status: 'ready' }, confidence: { label: 'High' }, liveData: { overall: 'live' } },
      { river: { name: 'Watch' }, score: 85, rating: 'Good', readiness: { status: 'verify' }, confidence: { label: 'High' }, liveData: { overall: 'live' } },
      { river: { name: 'Unavailable' }, score: 0, rating: 'No-go', readiness: { status: 'withheld' }, confidence: { label: 'Low' }, liveData: { overall: 'offline' } },
      { river: { name: 'Skip' }, score: 80, rating: 'Good', readiness: { status: 'skip' }, confidence: { label: 'High' }, liveData: { overall: 'live' } },
    ] as const;

    expect(buildTodayBoardSnapshot([...rivers])).toMatchObject({ paddleable: 1, watch: 1, unavailable: 1, skip: 1 });
  });
});
