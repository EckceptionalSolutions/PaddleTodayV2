import { describe, expect, it } from 'vitest';
import { rhodeIslandWoonasquatucketRoutes } from './rhode-island-woonasquatucket';
import { getRiverBySlug, getRiverGroupById } from '../../lib/rivers';
import { isScoreEligible } from '../route-publication';
import { hasStandaloneRoutePage, routePageConsolidationTarget } from '../route-page-consolidations';
import audit from '../../../docs/audits/woonasquatucket-source-review-2026-10-20.json';

describe('Rhode Island Woonasquatucket routes', () => {
  it('keeps the named upper trip and shorter plans without an invented score cutoff', () => {
    const group = getRiverGroupById('woonasquatucket-river-rhode-island')!;
    expect(group.routes.map(route => route.slug).sort()).toEqual([
      audit.decisions.retainedGuide, ...audit.decisions.retainedPlanningHubOptions,
    ].sort());
    for (const route of group.routes) {
      expect(isScoreEligible(route)).toBe(false);
      expect(route.scoreEligibility).toBe('planning');
      expect(route.gaugeSource.siteId).toBe('01114500');
      expect(route.profile.tooLow).toBeUndefined();
      expect(route.profile.idealMin).toBeUndefined();
      expect(route.profile.idealMax).toBeUndefined();
      expect(route.profile.tooHigh).toBeUndefined();
      expect(route.profile.seasonNotes).toContain('historical observations');
      expect(route.profile.confidenceNotes).toContain('separate Manton-to-Atwells');
      expect(route.evidenceNotes.some(note => note.label === 'Current access terms')).toBe(true);
    }
    expect(hasStandaloneRoutePage(audit.decisions.retainedGuide)).toBe(true);
    for (const slug of audit.decisions.retainedPlanningHubOptions) {
      expect(routePageConsolidationTarget(slug)).toBe(`/rivers/by-river/woonasquatucket-river-rhode-island/#trip-${slug}`);
    }
  });

  it('holds contradicted endpoints and the existing through-gap research out of the public catalog', () => {
    expect(audit.decisions.newAccuracyHolds).toHaveLength(9);
    expect(audit.decisions.preservedExistingGapHolds).toHaveLength(16);
    expect(rhodeIslandWoonasquatucketRoutes).toHaveLength(28);
    for (const slug of [...audit.decisions.newAccuracyHolds, ...audit.decisions.preservedExistingGapHolds]) {
      expect(rhodeIslandWoonasquatucketRoutes.some(route => route.slug === slug)).toBe(true);
      expect(getRiverBySlug(slug)).toBeUndefined();
    }
    for (const slug of ['georgiaville-whipple', 'whipple-esmond', 'whipple-cricket']) {
      expect(routePageConsolidationTarget(`woonasquatucket-river-${slug}`)).toBe('/rivers/by-river/woonasquatucket-river-rhode-island/#woonasquatucket-access-zones');
    }
  });

  it('distinguishes Esmond park-area access, dam carries and estimated shorter distances', () => {
    for (const slug of audit.decisions.retainedPlanningHubOptions) {
      const route = getRiverBySlug(slug)!;
      expect(route.logistics?.distanceLabel).toMatch(/^Estimated /);
      expect(route.logistics?.accessCaveats.join(' ')).toContain('not surveyed water-entry edges');
      expect(route.logistics?.shuttle).toContain('one-way vehicle shuttle');
      expect(route.accessPoints?.every(point => point.note?.length)).toBe(true);
    }
    const full = getRiverBySlug(audit.decisions.retainedGuide)!;
    expect(full.logistics?.shuttle).toContain('unrunnable Georgiaville spillway');
    expect(full.logistics?.shuttle).toContain('stay clear of the dam');
    expect(full.safetyProfile?.safetyNotes.join(' ')).toContain('Allendale/Lymans');
  });
});
