import {describe,expect,it} from 'vitest';
import {listRiverGroups,listAllRiversForAudit,getRiverBySlug} from './rivers';
import {routeGuideReviewByRiverId} from '../data/route-guide-publication-reviews';
import {routePageConsolidationTarget} from '../data/route-page-consolidations';
import { readFileSync } from 'node:fs';
import { canonicalRiverRouteLineFromFeature } from './canonical-river-geometries.js';

describe('Allagash source-boundary review',()=>{
  it('withholds the incomplete trace instead of snapping it to the corrected Churchill start',()=>{
    const slug='allagash-river-churchill-dam-umsaskis';
    const asset=JSON.parse(readFileSync(`public/data/canonical-river-geometries/routes/${slug}.json`,'utf8'));
    expect(asset.geometry).toBeNull();expect(asset.properties.geometryReviewStatus).toBe('withheld');
    const manifest=JSON.parse(readFileSync('public/data/canonical-river-geometries.json','utf8'));
    expect(manifest.unmatchedRouteIds).toContain(slug);
    const old={properties:{routeId:slug},geometry:{type:'MultiLineString',coordinates:[[[-69.31511,46.53624],[-69.3936,46.6141]]]}};
    expect(canonicalRiverRouteLineFromFeature(old,getRiverBySlug(slug)!.accessPoints)).toBeNull();
  });
  it('distinguishes the nine-mile river section from the public lake-road finish',()=>{
    const route=getRiverBySlug('allagash-river-churchill-dam-umsaskis')!;
    // DACF's named KML distinguishes Churchill Canoe Launch from the T10 R12
    // inventory point at 46.53624,-69.31511, which is Bissonette Bridge.
    expect(route.putIn).toMatchObject({latitude:46.493378,longitude:-69.288744});
    expect(route.putIn!.name).toContain('northbound carry required');
    expect(route.takeOut).toMatchObject({latitude:46.6141,longitude:-69.3936});
    expect(route.accessPoints!.at(-1)!.mileFromStart).toBe(14);
    expect(route.logistics!.distanceLabel).toContain('9 river miles plus 5 lake miles');
    expect(route.logistics!.accessCaveats.join(' ')).toContain('not the road-access finish');
    expect(route.safetyProfile!.hazards).toContain('wind');
    expect(route.scoreEligibility).toBe('planning');expect(route.gaugeSource).toMatchObject({siteId:'01011000',kind:'proxy'});
    expect(route.profile.tooLow).toBeUndefined();expect(route.profile.idealMin).toBeUndefined();
  });
  it('keeps four research records but offers only the corrected plan with explicit old-path explanations',()=>{
    expect(listAllRiversForAudit().filter(r=>r.riverId==='allagash-river')).toHaveLength(4);
    const group=listRiverGroups().find(g=>g.riverId==='allagash-river')!;expect(group.routes.map(r=>r.slug)).toEqual(['allagash-river-churchill-dam-umsaskis']);
    const review=routeGuideReviewByRiverId.get(group.riverId)!;expect(review.retainedGuides).toHaveLength(0);expect(review.underReview).toHaveLength(3);
    for(const notice of review.underReview!){expect(getRiverBySlug(notice.slug)).toBeUndefined();expect(routePageConsolidationTarget(notice.slug)).toBe(`/rivers/by-river/allagash-river/#review-${notice.slug}`);}
  });
});
