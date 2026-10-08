import { describe, expect, it } from 'vitest';
import { getRoutePreviewPhoto } from '../data/route-gallery';
import { corridorForSlug } from '../data/route-corridors';
import { listRoutePageConsolidations } from '../data/route-page-consolidations';
import { publicRivers } from '../data/rivers';
import { georgiaRoutes } from '../data/routes/georgia';

const expectedIds = [
  'chattahoochee-river-ga115-duncan-bridge',
  'chattahoochee-river-powers-island-paces-mill',
  'chattahoochee-river-columbus-whitewater-park',
  'broad-river-us281-us172',
  'etowah-river-highway136-kelly-bridge',
  'toccoa-river-deep-hole-sandy-bottoms',
  'flint-river-sprewell-bluff-po-biddy',
];

describe('Georgia statewide paddling expansion', () => {
  it('keeps the researched Georgia batch and identifiers stable', () => {
    expect(georgiaRoutes).toHaveLength(18);
    expect(georgiaRoutes.slice(0, expectedIds.length).map((route) => route.id)).toEqual(expectedIds);
    expect(georgiaRoutes.slice(expectedIds.length).every((route) => route.id.startsWith('chattahoochee-river-') || route.id.startsWith('ocmulgee-river-'))).toBe(true);
    expect(new Set(georgiaRoutes.map((route) => route.id)).size).toBe(georgiaRoutes.length);
    expect(new Set(georgiaRoutes.map((route) => route.slug)).size).toBe(georgiaRoutes.length);
  });

  it('publishes curated Georgia routes and keeps proxy-gauge trips planning-only', () => {
    const publicIds = new Set(publicRivers.filter((route) => route.state === 'Georgia').map((route) => route.id));
    expect([...publicIds].sort()).toEqual(georgiaRoutes.map((route) => route.id).sort());
    expect(georgiaRoutes.every((route) => route.gaugeSource.provider === 'usgs')).toBe(true);
    const proxyRoutes = georgiaRoutes.filter((route) => route.gaugeSource.kind === 'proxy');
    expect(proxyRoutes.map((route) => route.putIn?.name).sort()).toEqual([
      'Lower Pool Park public launch',
      'Morgan Falls Park public launch',
    ]);
    expect(proxyRoutes.every((route) => route.scoreEligibility === 'planning' && route.scoreEligibilityReason === 'proxy_gauge')).toBe(true);
    expect(georgiaRoutes.filter((route) => route.gaugeSource.kind === 'direct').every((route) => route.scoreEligibility !== 'planning')).toBe(true);
  });

  it('has complete endpoint, access, safety, camping, evidence, and image records', () => {
    for (const route of georgiaRoutes) {
      expect(route.putIn?.name).toBeTruthy();
      expect(route.takeOut?.name).toBeTruthy();
      expect(route.putIn?.latitude).toBeTypeOf('number');
      expect(route.takeOut?.longitude).toBeTypeOf('number');
      expect(route.accessPoints).toHaveLength(2);
      expect(route.accessPoints?.[0].name).toBe(route.putIn?.name);
      expect(route.accessPoints?.at(-1)?.name).toBe(route.takeOut?.name);
      expect(route.gaugeSource.siteId).toMatch(/^\d{8}$/);
      expect(route.profile.thresholdModel).toMatch(/^(minimum-only|two-sided)$/);
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route.safetyProfile?.hazards.length).toBeGreaterThanOrEqual(3);
      expect(route.logistics?.campingClassification).toBeTruthy();
      expect(route.evidenceNotes.length).toBeGreaterThanOrEqual(9);
      expect(route.evidenceNotes.some((note) => note.label === 'Public access control')).toBe(true);
      expect(route.evidenceNotes.some((note) => note.label === 'Overlap decision')).toBe(true);
      expect(route.sourceLinks.length).toBeGreaterThanOrEqual(4);
      const preview = getRoutePreviewPhoto(route);
      expect(preview.isPlaceholder).toBe(false);
      expect(preview.src).toMatch(/^https?:\/\//);
    }
  });

  it('curates Chattahoochee choices and redirects the retired overlapping combinations', () => {
    const chattahoochee = georgiaRoutes.filter((route) => route.id.startsWith('chattahoochee-river-'));
    const ocmulgee = georgiaRoutes.filter((route) => route.id.startsWith('ocmulgee-river-'));
    expect(chattahoochee).toHaveLength(11);
    expect(ocmulgee).toHaveLength(3);
    expect(chattahoochee.every((route) => corridorForSlug(route.slug)?.corridorId === 'ga-chattahoochee-public-launch-chain')).toBe(true);
    expect(ocmulgee.every((route) => corridorForSlug(route.slug)?.corridorId === 'ga-ocmulgee-public-access-chain')).toBe(true);
    expect(new Set(chattahoochee.map((route) => `${route.putIn?.name}|${route.takeOut?.name}`)).size).toBe(chattahoochee.length);
    const retiredChattahoocheeRoutes = listRoutePageConsolidations().filter(({ slug }) => slug.startsWith('chattahoochee-river-'));
    expect(retiredChattahoocheeRoutes).toHaveLength(68);
    expect(new Set(retiredChattahoocheeRoutes.map(({ target }) => target))).toEqual(new Set([
      '/rivers/by-river/chattahoochee-river/#chattahoochee-sections-title',
    ]));
  });

  it('keeps Georgia-specific gauge and safety distinctions', () => {
    expect(georgiaRoutes.filter((route) => route.gaugeSource.metric === 'discharge_cfs')).toHaveLength(16);
    expect(georgiaRoutes.filter((route) => route.gaugeSource.metric === 'gage_height_ft')).toHaveLength(2);
    expect(georgiaRoutes.find((route) => route.id === 'chattahoochee-river-ga115-duncan-bridge')?.gaugeSource.metric).toBe('gage_height_ft');
    expect(georgiaRoutes.find((route) => route.id === 'chattahoochee-river-ga115-duncan-bridge')?.routeType).toBe('whitewater');
    expect(georgiaRoutes.find((route) => route.id === 'chattahoochee-river-ga115-duncan-bridge')?.safetyProfile?.hazards).toContain('whitewater');
    expect(georgiaRoutes.find((route) => route.id === 'broad-river-us281-us172')?.gaugeSource.metric).toBe('gage_height_ft');
    expect(georgiaRoutes.find((route) => route.id === 'chattahoochee-river-columbus-whitewater-park')?.routeType).toBe('whitewater');
    expect(georgiaRoutes.find((route) => route.id === 'chattahoochee-river-columbus-whitewater-park')?.safetyProfile?.riskLevel).toBe('advanced');
    expect(georgiaRoutes.find((route) => route.id === 'toccoa-river-deep-hole-sandy-bottoms')?.safetyProfile?.hazards).toContain('cold_water');
    expect(georgiaRoutes.find((route) => route.id === 'flint-river-sprewell-bluff-po-biddy')?.profile.tooLow).toBe(800);
    expect(georgiaRoutes.find((route) => route.id === 'toccoa-river-deep-hole-sandy-bottoms')?.logistics?.campingClassification).toBe('endpoint_campground');
  });
});
