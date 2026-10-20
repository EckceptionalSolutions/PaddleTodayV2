import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getRiverBySlug, listRivers, listScoredRivers } from './rivers';
import { distanceRangeForLabels } from './api-contract';

const family = () => listRivers().filter(route => route.riverId === 'charles-county-water-trails-maryland');
describe('Charles County tidal trail source review', () => {
  it('preserves four distinct named trails without treating inland gauges as local tidal scores', () => {
    expect(family()).toHaveLength(4);
    for (const route of family()) {
      expect(route.scoreEligibility).toBe('planning');
      expect(listScoredRivers().some(scored => scored.slug === route.slug)).toBe(false);
      expect(route.profile.tooLow).toBeUndefined();
      expect(route.profile.idealMin).toBeUndefined();
      expect(route.gaugeSource.kind).toBe('proxy');
      expect(route.profile.confidenceNotes).not.toContain('High route-shape confidence');
      expect(route.sourceLinks.some(source => source.label.includes('2014 second edition'))).toBe(true);
    }
    expect(getRiverBySlug('mattawoman-creek-mattlingy-smallwood')!.gaugeSource.siteId).toBe('01658000');
    expect(family().filter(route => route.gaugeSource.siteId === '01660795')).toHaveLength(3);
  });

  it('resolves the impossible Purse distance through corrected access, with explicit one-way logistics and carry uncertainty', () => {
    const route = getRiverBySlug('lower-potomac-purse-mallows-bay')!;
    expect(route.putIn).toMatchObject({ latitude: 38.43223614, longitude: -77.25649254 });
    expect(route.takeOut?.name).toContain('soft launch');
    const miles = distanceRangeForLabels([route.logistics!.distanceLabel])!;
    const rad = (value: number) => value * Math.PI / 180;
    const a=route.putIn!, b=route.takeOut!;
    const h=Math.sin(rad(b.latitude-a.latitude)/2)**2+Math.cos(rad(a.latitude))*Math.cos(rad(b.latitude))*Math.sin(rad(b.longitude-a.longitude)/2)**2;
    expect(3958.7613*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h))).toBeLessThan(miles.minMiles);
    expect(route.logistics!.shuttle).toContain('one-way vehicle shuttle');
    expect(route.logistics!.shuttle).toContain('road-accessible');
    expect(route.logistics!.accessCaveats!.join(' ')).toMatch(/quarter-mile.*half-mile/);
  });

  it('distinguishes the same-launch creek choices and makes private marina and new gate arrangements visible', () => {
    const friendship=getRiverBySlug('nanjemoy-creek-friendship-farm-park')!;
    expect(friendship.putIn!.latitude).toBe(friendship.takeOut!.latitude);
    expect(friendship.putIn!.longitude).toBe(friendship.takeOut!.longitude);
    expect(friendship.logistics!.distanceLabel).toMatch(/2 miles round trip.*or 4 miles round trip/);
    expect(friendship.logistics!.accessCaveats!.join(' ')).toContain('not cumulative');
    const tobacco=getRiverBySlug('port-tobacco-river-chapel-point-port-tobacco')!;
    expect(tobacco.logistics!.permits).toMatch(/credit-card-only.*May 4, 2026/);
    expect(tobacco.logistics!.shuttle).toContain('Do not launch without an agreed take-out');
    expect(tobacco.logistics!.accessCaveats!.join(' ')).toContain('not public kayak take-out rights');
  });

  it('aligns generalized planning maps with corrected access and shows an actual return for the Church Creek illustration', () => {
    for(const route of family()){
      const feature=JSON.parse(readFileSync(`public/data/canonical-river-geometries/routes/${route.slug}.json`,'utf8'));
      expect(feature.properties.generalizedPlanningLine).toBe(true);
      expect(feature.properties.source).toContain('not a navigation track');
      const line=feature.geometry.coordinates[0];
      expect(line[0][0]).toBeCloseTo(route.putIn!.longitude,5);
      expect(line[0][1]).toBeCloseTo(route.putIn!.latitude,5);
      expect(line.at(-1)[0]).toBeCloseTo(route.takeOut!.longitude,5);
      expect(line.at(-1)[1]).toBeCloseTo(route.takeOut!.latitude,5);
      if(route.slug.startsWith('nanjemoy')){
        expect(line[0]).toEqual(line.at(-1));
        expect(line[1]).toEqual(line.at(-2));
      }
    }
  });
});
