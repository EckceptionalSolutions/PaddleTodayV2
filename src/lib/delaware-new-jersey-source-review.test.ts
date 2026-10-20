import { describe, expect, it } from 'vitest';
import { newJerseyRoutes } from '../data/routes/new-jersey';
import { routeGuideReviewByRiverId } from '../data/route-guide-publication-reviews';
import { routeAccessReviewHolds } from '../data/route-access-review-holds';
import { getRiverBySlug, listRiverGroups, listScoredRivers } from './rivers';
import { hasStandaloneRoutePage, routePageConsolidationTarget } from '../data/route-page-consolidations';
import { sharedAccessPlanNotes, specificAccessPlanNotes } from './access-plan-presentation';

const riverId = 'delaware-river-new-jersey';
const raw = newJerseyRoutes.filter(route => route.riverId === riverId);
const review = routeGuideReviewByRiverId.get(riverId)!;
const publicRoutes = () => listRiverGroups().find(group => group.riverId === riverId)!.routes;
const get = (suffix: string) => getRiverBySlug(`delaware-river-${suffix}`)!;

describe('New Jersey Delaware source and publication review', () => {
  it('preserves the twelve original identities while separating three unsupported itineraries', () => {
    expect(raw).toHaveLength(12);
    expect(publicRoutes()).toHaveLength(9);
    expect(review.underReview).toHaveLength(3);
    for (const notice of review.underReview!) {
      expect(raw.some(route => route.slug === notice.slug)).toBe(true);
      expect(routeAccessReviewHolds[notice.slug]).toContain('delaware-new-jersey-source-review-2026-10-20.json');
      expect(getRiverBySlug(notice.slug)).toBeUndefined();
      expect(routePageConsolidationTarget(notice.slug)).toBe(`/rivers/by-river/${riverId}/#review-${notice.slug}`);
    }
    const upstream = raw.find(route => route.slug === 'delaware-river-kittatinny-worthington')!;
    expect(upstream.putIn?.name).toContain('Kittatinny');
    expect(upstream.takeOut?.name).toContain('Worthington');
  });

  it('keeps distinct hazard guides and selected access choices instead of blanket removal', () => {
    expect(review.retainedGuides).toHaveLength(4);
    expect(review.hubOptions).toHaveLength(5);
    expect([...review.retainedGuides, ...review.hubOptions].sort()).toEqual(publicRoutes().map(route => route.slug).sort());
    for (const slug of review.retainedGuides) expect(hasStandaloneRoutePage(slug), slug).toBe(true);
    for (const slug of review.hubOptions) {
      expect(hasStandaloneRoutePage(slug), slug).toBe(false);
      expect(routePageConsolidationTarget(slug)).toBe(`/rivers/by-river/${riverId}/#trip-${slug}`);
    }
  });

  it('uses active manager-preferred Riegelsville context without moving the gauge or hazard boundary to other trips', () => {
    const riegelsville = publicRoutes().filter(route => route.gaugeSource.siteId === '01457500');
    expect(riegelsville).toHaveLength(6);
    for (const route of riegelsville) {
      expect(route.gaugeSource.kind).toBe('proxy');
      expect(route.logistics?.watchFor.join(' ')).toContain('01457500');
      expect(route.evidenceNotes.find(note => note.label === 'Live gauge')?.note).toContain('Lehigh');
    }
    expect(get('belvidere-phillipsburg').gaugeSource.siteId).toBe('01446500');
    expect(get('belvidere-phillipsburg').gaugeSource.kind).toBe('direct');
    expect(get('firemens-eddy-washington-crossing').gaugeSource.siteId).toBe('01463500');
    expect(get('firemens-eddy-trenton').gaugeSource.kind).toBe('proxy');
    for (const route of publicRoutes()) {
      expect(route.scoreEligibility).toBe('planning');
      expect(route.profile.tooLow).toBeUndefined();
      expect(route.profile.idealMin).toBeUndefined();
      expect(route.profile.idealMax).toBeUndefined();
      expect(route.profile.tooHigh).toBeUndefined();
    }
    expect(listScoredRivers().some(route => route.riverId === riverId)).toBe(false);
  });

  it('does not transfer Middle Delaware camping or current-use rules from an NPS provider label', () => {
    for (const route of publicRoutes()) {
      expect(route.logistics?.campingClassification).toBe('none');
      expect(route.logistics?.permits).not.toContain('Delaware Water Gap');
      expect(route.evidenceNotes.some(note => note.value === 'Designated park campsites only')).toBe(false);
      for (const source of route.sourceLinks.filter(source => /nps\.gov\/dewa\/|worthington-state-forest/.test(source.url))) {
        expect(source.label).toContain('Earlier Middle Delaware');
      }
    }
  });

  it('reconciles composite mileage using source markers without claiming surveyed track distances', () => {
    const route = get('kingwood-byram');
    expect(route.logistics?.distanceLabel).toContain('7.3');
    expect(route.logistics?.distanceLabel).toContain('NPS access markers');
    expect(route.accessPoints?.at(-1)?.mileFromStart).toBe(7.3);
    expect(get('belvidere-phillipsburg').logistics?.distanceLabel).toContain('14.6');
    expect(get('bulls-island-lambertville').logistics?.distanceLabel).toContain('6.6');
  });

  it('explains the intervening hazards rather than advising a trip to remain above its own passage', () => {
    const wingDam = get('lambertville-firemens-eddy');
    expect(wingDam.profile.difficulty).toBe('hard');
    expect(wingDam.profile.difficultyNotes).toContain('staying in the upstream pool cannot complete this trip');
    expect(wingDam.accessPoints?.[0].note).not.toContain('take out at the ramp boundary');
    expect(wingDam.safetyProfile?.hazards).toContain('whitewater');
    expect(get('belvidere-phillipsburg').profile.difficultyNotes).toContain('Foul Rift');
    expect(get('firemens-eddy-trenton').profile.difficultyNotes).toContain('Scudders');
    expect(get('firemens-eddy-trenton').profile.difficultyNotes).toContain('not a tide prediction');
    expect(get('bulls-island-lambertville').profile.difficultyNotes).toContain('downstream of the Lumberville wing dam');
  });

  it('presents each plan’s distinct access and hazard notes without repeating an identical paragraph', () => {
    const shared = sharedAccessPlanNotes(publicRoutes());
    for (const route of publicRoutes()) {
      const notes = specificAccessPlanNotes(route, shared);
      const visible = [...notes.access, ...notes.hazards, ...notes.safety];
      expect(new Set(visible).size, route.slug).toBe(visible.length);
    }
  });
});
