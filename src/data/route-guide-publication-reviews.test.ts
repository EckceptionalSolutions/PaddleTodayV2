import { describe, expect, it } from 'vitest';
import { routeGuidePublicationReviews } from './route-guide-publication-reviews';
import { hasStandaloneRoutePage, routePageConsolidationTarget } from './route-page-consolidations';
import { listRiverGroups, getRiverBySlug } from '../lib/rivers';
import { isScoreEligible } from './route-publication';

describe('route-guide publication pilot', () => {
  it('accounts for every public trip exactly once without hiding a trip or its sources', () => {
    for (const review of routeGuidePublicationReviews) {
      const group = listRiverGroups().find(g => g.riverId === review.riverId)!;
      const decisions = [...review.retainedGuides, ...review.hubOptions];
      expect(new Set(decisions).size).toBe(decisions.length);
      expect([...decisions].sort()).toEqual(group.routes.map(r => r.slug).sort());
      for (const route of group.routes) {
        expect(route.putIn?.name).toBeTruthy();
        expect(route.takeOut?.name).toBeTruthy();
        expect(route.logistics?.shuttle).toBeTruthy();
        expect(route.safetyProfile?.safetyNotes.length).toBeGreaterThan(0);
        expect(route.sourceLinks.length).toBeGreaterThan(0);
        if (review.mode === 'access-planning') expect(isScoreEligible(route)).toBe(false);
        else if (['snoqualmie-river-washington', 'contoocook-river-new-hampshire'].includes(review.riverId)) expect(isScoreEligible(route)).toBe(true);
      }
      for (const slug of review.hubOptions) {
        expect(hasStandaloneRoutePage(slug)).toBe(false);
        expect(routePageConsolidationTarget(slug)).toBe(`/rivers/by-river/${review.riverId}/#trip-${slug}`);
      }
      for (const slug of review.retainedGuides) expect(hasStandaloneRoutePage(slug)).toBe(true);
      for (const decision of review.guide.decisions) {
        if (decision.route) expect(review.retainedGuides).toContain(decision.route.slug);
      }
    }
  });

  it('preserves the documented outfitter trip and its conditional landing terms', () => {
    const route = getRiverBySlug('contoocook-riverway-park-canoe-company')!;
    expect(hasStandaloneRoutePage(route.slug)).toBe(true);
    expect(route.logistics?.distanceLabel).toContain('9 river miles');
    expect(route.logistics?.shuttle).toMatch(/private.*outfitter|private.*beach/i);
    expect(route.logistics?.accessCaveats.join(' ')).toMatch(/permission|reservation/i);
  });

  it('does not describe the Piscataquis Penobscot proxy as a same-river station', () => {
    const group = listRiverGroups().find(group => group.riverId === 'piscataquis-river')!;
    for (const route of group.routes) {
      expect(route.gaugeSource.siteName).toContain('Penobscot');
      expect(route.profile.confidenceNotes).not.toContain('same-river');
      expect(route.evidenceNotes.find(note => note.label === 'Live gauge posture')?.note).not.toContain('same-river');
    }
  });

  it('keeps original recovery winners and comparison families available as independent guides', () => {
    const protectedSlugs = [
      'little-miami-river-kelley-milford', 'namekagon-river-big-bend-trego',
      'milwaukee-river-west-bend-quaas-creek', 'ouachita-river-remmel-whitewater-park',
      'namekagon-river-county-k-whispering-pines', 'big-river-mammoth-merrill-horse',
      'st-croix-river-sand-creek-highway-70', 'youghiogheny-river-lower-yough-ohiopyle-bruner-run',
      'james-river-hl-kerr-ralph-cox',
      'snoqualmie-river-plum-fall-city', 'snoqualmie-river-fall-city-neal',
      'snoqualmie-river-fall-city-tolt', 'contoocook-riverway-park-canoe-company',
      'contoocook-river-river-road-riverway-park',
    ];
    for (const slug of protectedSlugs) {
      expect(getRiverBySlug(slug), slug).toBeDefined();
      expect(hasStandaloneRoutePage(slug), slug).toBe(true);
    }
    for (const riverId of ['saint-croix-river', 'pleasant-river', 'yakima-river-washington', 'pemigewasset-river-new-hampshire']) {
      const group = listRiverGroups().find(g => g.riverId === riverId)!;
      expect(group.routes.length).toBeGreaterThan(0);
      for (const route of group.routes) expect(hasStandaloneRoutePage(route.slug)).toBe(true);
    }
  });
});
