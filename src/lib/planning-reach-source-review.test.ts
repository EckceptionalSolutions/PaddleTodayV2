import { describe, expect, it } from 'vitest';
import { routeAccessReviewHolds } from '../data/route-access-review-holds';
import { getRiverBySlug, getRiverGroupById, listAllRiversForAudit, listRivers, listScoredRivers } from './rivers';
import { serializeRiverGroupResult } from './api-contract';
import { riverGroupName } from './river-group-name';
import { scoreRiverCondition } from './scoring';

describe('source-defined planning reaches', () => {
  for (const slug of ['south-branch-grass-river-twin-falls-degrasse', 'west-canada-creek-route-28-middleville', 'new-river-todd-wagoner']) {
    it(`withholds ${slug} while preserving its source record for correction`, () => {
      expect(routeAccessReviewHolds[slug]).toContain('planning-reach-source-review-2026-10-20.json');
      expect(getRiverBySlug(slug)).toBeUndefined();
      expect(listRivers().some(route => route.slug === slug)).toBe(false);
      expect(listScoredRivers().some(route => route.slug === slug)).toBe(false);
      const research = listAllRiversForAudit().find(route => route.slug === slug)!;
      expect(research.sourceLinks.length).toBeGreaterThan(0);
      expect(research.scoreEligibility).toBe('planning');
      expect(research.putIn).toBeDefined();
      expect(research.takeOut).toBeDefined();
    });
  }

  it('retains the separate West Canada reaches and their gauge/scoring boundaries', () => {
    const slugs = getRiverGroupById('west-canada-creek')!.routes.map(route => route.slug);
    expect(slugs.sort()).toEqual([
      'south-branch-west-canada-creek-fayle-nobleboro',
      'west-canada-creek-middleville-kast-bridge',
      'west-canada-creek-partridge-hill-route-28-overlook',
    ]);
    expect(getRiverBySlug('west-canada-creek-middleville-kast-bridge')?.scoreEligibility).toBe('scored');
    expect(getRiverBySlug('west-canada-creek-partridge-hill-route-28-overlook')?.scoreEligibility).toBe('planning');
  });
});

describe('river family identity', () => {
  for (const [riverId, name] of Object.entries({
    'grass-river': 'Grass River',
    'west-canada-creek': 'West Canada Creek',
    'oswegatchie-river': 'Oswegatchie River',
    'st-regis-river': 'St. Regis River',
  })) {
    it(`keeps ${riverId} labeled as the family when branch order changes`, () => {
      const group = getRiverGroupById(riverId)!;
      expect(group.name).toBe(name);
      expect(riverGroupName(riverId, group.routes.slice().reverse())).toBe(name);
      const api = serializeRiverGroupResult({
        riverId,
        routes: group.routes.filter(route => route.scoreEligibility === 'scored')
          .map(river => scoreRiverCondition({ river, gauge: null, weather: null })),
        planningRoutes: group.routes.filter(route => route.scoreEligibility === 'planning'),
      });
      expect(api.group.name).toBe(name);
      expect(api.routes.map(route => [route.river.slug, route.river.name]).sort())
        .toEqual(group.routes.map(route => [route.slug, route.name]).sort());
    });
  }

  it('preserves ambiguous aliases and does not invent a family name from branch-only records', () => {
    expect(riverGroupName('allen-creek', [{ name: 'Allens Creek' }, { name: 'Allen Creek' }])).toBe('Allens Creek');
    expect(riverGroupName('example-river', [{ name: 'East Branch Example River' }, { name: 'West Branch Example River' }])).toBe('East Branch Example River');
  });
});
