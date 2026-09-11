import { describe, expect, it } from 'vitest';
import { starterCampaignWindow, type StarterCampaign } from './starter-campaign';

const campaign: StarterCampaign = {
  version: 1, active: true, passTargets: [3, 6, 10], maximumBatchSize: 3,
  states: [{ code: 'FL', name: 'Florida', pause: null }, { code: 'OR', name: 'Oregon', pause: null }],
};
const routes = (state: string, count: number) => Array.from({ length: count }, (_, i) => ({ state, slug: `${state}-${i}` }));

describe('starter campaign rotation', () => {
  it('keeps a state at three while another has no coverage, excluding mature states', () => {
    const result = starterCampaignWindow(campaign, [...routes('Florida', 3), ...routes('Wisconsin', 80)])!;
    expect(result.target).toBe(3);
    expect(result.eligible.map(state => state.name)).toEqual(['Oregon']);
  });
  it('advances the pass only when all participating states have met it, and caps the last batch', () => {
    const result = starterCampaignWindow(campaign, [...routes('Florida', 5), ...routes('Oregon', 3)])!;
    expect(result.target).toBe(6);
    expect(result.eligible.map(state => state.batchLimit)).toEqual([1, 3]);
    expect(starterCampaignWindow(campaign, [...routes('Florida', 10), ...routes('Oregon', 10)])!.eligible).toEqual([]);
  });
  it('requires an explicit pause and brings timed pauses back into rotation', () => {
    const paused = structuredClone(campaign);
    paused.states[1].pause = { reason: 'Launch closed', retryCondition: 'Manager reopens launch', until: '2026-10-01' };
    expect(starterCampaignWindow(paused, routes('Florida', 3), new Date('2026-09-09'))!.target).toBe(6);
    expect(starterCampaignWindow(paused, routes('Florida', 3), new Date('2026-10-02'))!.eligible[0].name).toBe('Oregon');
    paused.states[1].pause.reason = '';
    expect(() => starterCampaignWindow(paused, [])).toThrow('requires a reason');
  });
  it('does not count duplicate records twice and leaves inactive campaigns out of selection', () => {
    expect(starterCampaignWindow(campaign, [...routes('Florida', 2), ...routes('Florida', 2)])!.states[0].count).toBe(2);
    expect(starterCampaignWindow({ ...campaign, active: false }, [])).toBeNull();
  });
});
