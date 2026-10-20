import { describe, expect, it } from 'vitest';
import { sharedAccessPlanNotes, specificAccessPlanNotes } from './access-plan-presentation';

describe('access plan presentation', () => {
  it('shares exact repeated guidance while keeping distinct hazards and restrictions with their plan', () => {
    const plans = [
      { logistics: { watchFor: ['cold water', 'mandatory dam portage'], accessCaveats: ['check parking', 'gate closes at dusk'], permits: 'permit required' } },
      { logistics: { watchFor: ['cold water', 'tidal current'], accessCaveats: ['check parking'], permits: 'no permit required' } },
    ];
    const shared = sharedAccessPlanNotes(plans);
    expect(shared.hazards).toEqual(['cold water']);
    expect(shared.access).toEqual(['check parking']);
    expect(shared.permits).toBe('');
    expect(specificAccessPlanNotes(plans[0], shared)).toMatchObject({ hazards: ['mandatory dam portage'], access: ['gate closes at dusk'], permits: 'permit required' });
    expect(specificAccessPlanNotes(plans[1], shared).hazards).toEqual(['tidal current']);
  });

  it('handles missing fields without treating absent guidance as shared', () => {
    const shared = sharedAccessPlanNotes([{ logistics: { watchFor: ['rapids'] } }, {}]);
    expect(shared.hazards).toEqual([]);
    expect(sharedAccessPlanNotes([]).hazards).toEqual([]);
  });

  it('does not let a plan with additional guidance prevent repeated notes appearing once', () => {
    const plans = [
      { logistics: { watchFor: ['cold water'], permits: 'check posted rules' } },
      { logistics: { watchFor: ['cold water'], permits: 'check posted rules' } },
      { logistics: { watchFor: ['ice effects', 'mandatory portage'], permits: 'permit required' } },
    ];
    const shared = sharedAccessPlanNotes(plans);
    expect(shared.hazards).toEqual(['cold water']);
    expect(specificAccessPlanNotes(plans[0], shared).hazards).toEqual([]);
    expect(specificAccessPlanNotes(plans[2], shared)).toMatchObject({ hazards: ['ice effects', 'mandatory portage'], permits: 'permit required' });
  });
});
