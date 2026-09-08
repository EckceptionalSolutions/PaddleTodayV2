import { describe, expect, it } from 'vitest';
import type { RiverDetailApiResult, RiverSummaryApiItem } from '@paddletoday/api-contract';
import fixture from '../../../../tests/mobile-web/fixtures/route-detail.json';
import { routeComparisonFacts, toggleRouteComparison } from './route-comparison';

describe('route shortlist', () => {
  it('caps selection at three while allowing removal and replacing a vanished route', () => {
    expect(toggleRouteComparison(['a', 'b', 'c'], 'd', ['a', 'b', 'c', 'd'])).toEqual(['a', 'b', 'c']);
    expect(toggleRouteComparison(['a', 'b', 'c'], 'b', ['a', 'b', 'c'])).toEqual(['a', 'c']);
    expect(toggleRouteComparison(['a', 'a', 'gone'], 'b', ['a', 'b'])).toEqual(['a', 'b']);
    expect(toggleRouteComparison(['a'], 'unknown', ['a', 'b'])).toEqual(['a']);
  });
  it('compares shared route facts and withholds current score/confidence for unavailable or old calls', () => {
    const route = { ...fixture.result, score: 95, readiness: { status: 'ready', label: 'Ready', reason: 'QA' } } as unknown as RiverDetailApiResult;
    const facts = (stale: boolean) => Object.fromEntries(routeComparisonFacts(route, null, stale).map(fact => [fact.label, fact.value]));
    expect(facts(false)).toMatchObject({ Score: '95', 'Paddle time': route.river.estimatedPaddleTime, 'Put-in': route.river.putIn!.name, 'Approx. drive': 'No drive estimate' });
    expect(facts(true)).toMatchObject({ Score: 'Current score unavailable', Confidence: 'Current confidence unavailable' });
    route.readiness.status = 'withheld';
    expect(facts(false).Score).toBe('Current score unavailable');
    expect(facts(false)['Current call']).toBe('Call unavailable');
  });
  it('compares saved summary routes without requiring detail-only profile data', () => {
    const river = { ...fixture.result.river, difficulty: 'moderate' };
    delete (river as { profile?: unknown }).profile;
    const route = { ...fixture.result, river,
      readiness: { status: 'ready', label: 'Ready', reason: 'QA' },
    } as unknown as RiverSummaryApiItem;
    const facts = Object.fromEntries(routeComparisonFacts(route, null, false).map(fact => [fact.label, fact.value]));
    expect(facts.Difficulty).toBe('Moderate');
    expect(facts['Put-in']).toBe(route.river.putIn!.name);
    const missingDifficulty = { ...route, river: { ...route.river } };
    delete (missingDifficulty.river as { difficulty?: unknown }).difficulty;
    expect(Object.fromEntries(routeComparisonFacts(missingDifficulty, null, false).map(fact => [fact.label, fact.value])).Difficulty).toBe('Not listed');
    const planning = { ...route, river: { ...route.river, scoreEligibility: 'planning' as const } };
    expect(Object.fromEntries(routeComparisonFacts(planning, null, false).map(fact => [fact.label, fact.value])).Score).toBe('Current score unavailable');
  });
  it('does not fabricate missing access, capture time or invalid drive estimates', () => {
    const route = { ...fixture.result, generatedAt: 'invalid', river: { ...fixture.result.river, putIn: undefined, takeOut: undefined, latitude: NaN } } as unknown as RiverDetailApiResult;
    const facts = Object.fromEntries(routeComparisonFacts(route, { latitude: 45, longitude: -93, label: 'QA', source: 'search' }, false).map(fact => [fact.label, fact.value]));
    expect(facts).toMatchObject({ 'Put-in': 'Not listed', 'Take-out': 'Not listed', 'Conditions captured': 'Time unavailable', 'Approx. drive': 'No drive estimate' });
  });
});
