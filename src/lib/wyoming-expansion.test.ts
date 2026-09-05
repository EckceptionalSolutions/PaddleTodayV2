import { describe, expect, it } from 'vitest';
import { getRoutePreviewPhoto } from '../data/route-gallery';
import { publicRivers } from '../data/rivers';
import { wyomingRoutes } from '../data/routes/wyoming';

const expectedIds = [
  'snake-river-flagg-ranch-lizard-creek', 'snake-river-jackson-lake-dam-pacific-creek', 'snake-river-pacific-creek-deadmans-bar',
  'snake-river-deadmans-bar-moose', 'snake-river-moose-wilson', 'snake-river-west-table-sheep-gulch',
  'green-river-tailrace-slate-creek', 'green-river-slate-creek-dodge-bottom', 'green-river-dodge-bottom-hay-farm',
  'green-river-hay-farm-highway-28', 'green-river-highway-28-six-mile', 'north-platte-gray-reef-lusby',
  'north-platte-bessemer-robertson', 'bighorn-river-wedding-hot-springs', 'bighorn-river-hot-springs-skelton',
  'string-leigh-lakes-portage-loop', 'jackson-lake-colter-bay-hermitage-out-and-back',
  'green-river-lakes-lower-lake-out-and-back', 'fontenelle-reservoir-creek-recreation-area-loop',
  'boysen-reservoir-fremont-bay-loop', 'jenny-lake-lupine-launch-inspiration-out-and-back', 'lewis-lake-shoshone-channel-wilderness-paddle',
  'glendo-reservoir-sandy-beach-loop',
];

describe('Wyoming statewide paddling expansion', () => {
  it('keeps the researched batch and identifiers stable', () => {
    expect(wyomingRoutes).toHaveLength(23);
    expect(wyomingRoutes.map((route) => route.id)).toEqual(expectedIds);
    expect(new Set(wyomingRoutes.map((route) => route.id)).size).toBe(23);
    expect(new Set(wyomingRoutes.map((route) => route.slug)).size).toBe(23);
  });

  it('publishes every reviewed Wyoming route, including proxy planning routes', () => {
    const publicIds = new Set(publicRivers.filter((route) => route.state === 'Wyoming').map((route) => route.id));
    expect([...publicIds].sort()).toEqual([...expectedIds].sort());
    expect(wyomingRoutes.filter((route) => route.scoreEligibility === 'scored')).toHaveLength(5);
    expect(wyomingRoutes.filter((route) => route.scoreEligibility === 'scored').every((route) => route.gaugeSource.kind === 'direct')).toBe(true);
    expect(wyomingRoutes.filter((route) => route.gaugeSource.kind === 'proxy').every((route) => route.scoreEligibility === 'planning')).toBe(true);
  });

  it('has endpoint/access, gauge, threshold, safety, camping, and evidence coverage', () => {
    for (const route of wyomingRoutes) {
      expect(route.putIn?.name).toBeTruthy();
      expect(route.takeOut?.name).toBeTruthy();
      expect(route.accessPoints?.length).toBeGreaterThanOrEqual(2);
      expect(route.accessPoints?.[0].name).toBe(route.putIn?.name);
      expect(route.accessPoints?.at(-1)?.name).toBe(route.takeOut?.name);
      expect(route.gaugeSource.provider).toBe('usgs');
      expect(route.gaugeSource.siteId).toMatch(/^\d{8}$/);
      expect(route.gaugeSource.kind).toMatch(/^(direct|proxy)$/);
      expect(route.profile.thresholdModel).toBe('minimum-only');
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route.safetyProfile?.hazards.length).toBeGreaterThanOrEqual(3);
      expect(route.logistics?.campingClassification).toBeTruthy();
      expect(route.evidenceNotes.length).toBeGreaterThanOrEqual(7);
      expect(route.evidenceNotes.some((note) => note.label === 'Public access control')).toBe(true);
      expect(route.evidenceNotes.some((note) => note.label === 'Image decision')).toBe(true);
      expect(route.sourceLinks.length).toBeGreaterThanOrEqual(5);
      const preview = getRoutePreviewPhoto(route);
      expect(preview.isPlaceholder).toBe(false);
      expect(preview.src).toMatch(/^https?:\/\//);
    }
  });

  it('uses direct gauges on Snake/Green and explicit proxies only for North Platte/Bighorn', () => {
    expect(wyomingRoutes.filter((r) => r.gaugeSource.kind === 'direct')).toHaveLength(13);
    expect(wyomingRoutes.filter((r) => r.gaugeSource.kind === 'proxy')).toHaveLength(10);
    expect(wyomingRoutes.filter((r) => r.gaugeSource.kind === 'proxy').every((r) => r.scoreEligibilityReason === 'proxy_gauge')).toBe(true);
    expect(wyomingRoutes.filter((r) => r.riverId === 'green-river-wyoming').every((r) => r.scoreEligibility === 'scored')).toBe(true);
    expect(wyomingRoutes.filter((r) => r.riverId === 'green-river-wyoming').every((r) => r.profile.thresholdSourceStrength === 'official')).toBe(true);
    expect(wyomingRoutes.find((r) => r.id === 'snake-river-jackson-lake-dam-pacific-creek')?.safetyProfile?.hazards).toContain('dam');
    const alpine = wyomingRoutes.find((r) => r.id === 'snake-river-west-table-sheep-gulch');
    expect(alpine?.routeType).toBe('whitewater');
    expect(alpine?.profile.thresholdSource.provider).toBe('american_whitewater');
    expect(alpine?.profile.tooLow).toBe(1800);
    expect(alpine?.profile.idealMin).toBe(6500);
    expect(alpine?.profile.thresholdSourceStrength).toBe('mixed');
    expect(alpine?.scoreEligibility).toBe('planning');
    expect(alpine?.evidenceNotes.find((note) => note.label === 'Threshold posture')?.value).toContain('planning cue');
    expect(wyomingRoutes.filter((r) => r.scoreEligibility === 'planning')).toHaveLength(18);
    expect(wyomingRoutes.filter((r) => r.riverId === 'green-river-wyoming').every((r) => r.logistics?.campingClassification !== 'on_route_campsite')).toBe(true);
    expect(wyomingRoutes.find((r) => r.id === 'string-leigh-lakes-portage-loop')?.safetyProfile?.hazards).toContain('cold_water');
    expect(wyomingRoutes.find((r) => r.id === 'fontenelle-reservoir-creek-recreation-area-loop')?.gaugeSource.metric).toBe('gage_height_ft');
    expect(wyomingRoutes.find((r) => r.id === 'boysen-reservoir-fremont-bay-loop')?.safetyProfile?.hazards).toContain('dam');
    expect(wyomingRoutes.find((r) => r.id === 'lewis-lake-shoshone-channel-wilderness-paddle')?.safetyProfile?.hazards).toContain('portage');
    expect(wyomingRoutes.find((r) => r.id === 'glendo-reservoir-sandy-beach-loop')?.gaugeSource.siteId).toBe('06652700');
  });
});
