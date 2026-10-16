import { describe, expect, it } from 'vitest';
import { routeInventory } from '../data/rivers';
import { riverTripDetails } from '../data/river-trip-details';
import { corridorForSlug, routeCorridorDefinitions } from '../data/route-corridors';
import { listAllRiversForAudit, listRivers, WITHHELD_ROUTE_SLUGS } from './rivers';
import { isScoreEligible } from '../data/route-publication';
import { areDocumentedRouteAlternatives } from './route-data-audit-policy';
import { auditRouteSafety } from './route-safety-audit';
import { validateScoringProfile } from './scoring-profile-validation';

describe('route QA remediation', () => {
  it('registers inline trip details for every family without dropping explicit overrides', () => {
    const inline = routeInventory.filter((route) => route.putIn && route.takeOut && route.logistics);
    expect(inline.length).toBeGreaterThan(100);
    for (const route of inline) expect(riverTripDetails[route.id], route.id).toBeDefined();
    expect(riverTripDetails['comal-river-hinman-island-last-public-exit'].putIn.name).toBe('Hinman Island Park');
  });
  it('keeps contextual telemetry unscored when the route has no verified numeric floor', () => {
    const routes = listAllRiversForAudit();
    for (const id of ['boquet-river-willsboro-noblewood', 'east-canada-creek-dolgeville-route-5', 'murderkill-river-bowers-beach-loop', 'miller-creek-strawberry-sassafras']) {
      const route = routes.find((route) => route.id === id)!;
      expect(isScoreEligible(route), id).toBe(false);
      expect(route.scoreEligibility, id).toBe('planning');
    }
    for (const route of routes.filter((route) => route.id.startsWith('verde-river-') || route.id === 'saluda-river-saluda-shoals-gardendale')) {
      expect(validateScoringProfile(route.profile).filter((issue) => issue.severity === 'error'), route.id).toEqual([]);
    }
  });
  it('recognizes only reciprocally documented alternative itineraries', () => {
    const left = routeInventory.find((route) => route.id === 'bartram-canal-island-french-hubbard')!;
    const right = routeInventory.find((route) => route.id === 'bartram-spoonbill-french-hubbard')!;
    expect(areDocumentedRouteAlternatives(left, right)).toBe(true);
    expect(areDocumentedRouteAlternatives(left, { ...right, consolidation: undefined })).toBe(false);
    expect(areDocumentedRouteAlternatives(left, { ...right, consolidation: { ...right.consolidation!, relatedRouteIds: [] } })).toBe(false);
    expect(areDocumentedRouteAlternatives(left, { ...right, consolidation: { ...right.consolidation!, group: 'another-river' } })).toBe(false);
  });
  it('separates the Adirondack Cedar River and gives Kinniconick a full-chain canonical route', () => {
    expect(corridorForSlug('cedar-river-flow-cedar-river-out-and-back')?.corridorId).toBe('ny-cedar-river-adirondacks-condition-family');
    expect(corridorForSlug('cedar-river-brookwood-janesville')?.corridorId).toBe('ia-cedar-river-condition-family');
    for (const route of routeInventory) {
      const matches = routeCorridorDefinitions.filter((definition) => definition.slugs?.includes(route.slug) || definition.slugPrefix && route.slug.startsWith(definition.slugPrefix));
      expect(matches.length, route.id).toBeLessThanOrEqual(1);
    }
    expect(routeCorridorDefinitions.find((definition) => definition.corridorId === 'ky-kinniconick-creek-lewis-county')?.canonicalSlug).toBe('kinniconick-creek-leatherwood-branch-garrison');
  });
  it('holds the unverified Comal park marker and retains Guyandotte cautions', () => {
    expect(WITHHELD_ROUTE_SLUGS.has('comal-river-hinman-island-last-public-exit')).toBe(true);
    expect(listRivers().some((route) => route.id === 'comal-river-hinman-island-last-public-exit')).toBe(false);
    const guyandotte = listAllRiversForAudit().find((route) => route.id === 'wv-guyandotte-west-hamlin-salt-rock')!;
    expect(guyandotte.scoreEligibility).toBe('planning');
    expect(guyandotte.safetyProfile?.riskLevel).toBe('caution');
    expect(auditRouteSafety([guyandotte])).toEqual([]);
  });
  it('keeps unverified Plante’s Ferry markers and Lockhart transfers out of public trips',()=>{
    for(const id of ['la-crosse-river-hwy-bb-angelo-wayside','yampa-river-golf-course-loudy-simpson','yampa-river-loudy-simpson-south-beach','mississippi-river-dayton-mississippi-gateway','cedar-river-cedar-bluff-cedar-valley','potomac-river-oldtown-paw-paw','north-branch-potomac-spring-gap-oldtown','zumbro-river-falls','platte-river-north-bend-valley','spokane-river-harvard-plantes-ferry','spokane-river-barker-plantes-ferry','spokane-river-mirabeau-plantes-ferry','spokane-river-plantes-ferry-boulder-beach','broad-river-daltons-neal-shoals','broad-river-daltons-sandy','broad-river-daltons-shelton','broad-river-daltons-strother','broad-river-daltons-broad-river-landing','broad-river-ninety-nine-islands-broad-river-landing']){
      expect(WITHHELD_ROUTE_SLUGS.has(id),id).toBe(true);
      expect(listRivers().some((route)=>route.id===id),id).toBe(false);
    }
    const comal=routeInventory.find((route)=>route.id==='comal-river-hinman-island-last-public-exit')!;
    expect(comal.profile.tooHigh).toBe(600);
    expect(comal.profile.tooHighInclusive).toBe(true);
  });
  it('labels the longest Bitterroot and Saco itineraries as staged travel', () => {
    for (const id of ['bitterroot-river-hannon-chief-looking-glass', 'saco-river-fryeburg-dayton', 'androscoggin-river-errol-shelburne']) {
      expect(listAllRiversForAudit().find((route) => route.id === id)?.logistics?.estimatedPaddleTime, id).toMatch(/staged multi-day/);
    }
  });
});
