import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { getApprovedRoutePhotos } from '../data/route-gallery.js';
import { listRivers } from './rivers.js';

const routeIds = [
  'big-fork-river-dora-lake-big-fork',
  'otter-tail-river-friberg-hwy-210',
  'red-river-lindenwood-mb-johnson',
  'red-river-lincoln-drive-downtown',
  'vermilion-river-dam-twomile',
] as const;

describe('Northern Minnesota Tier 1 routes', () => {
  it('publishes all five researched routes with reviewed safety, trip, and gauge data', () => {
    const routes = new Map(listRivers().map((route) => [route.slug, route]));

    for (const routeId of routeIds) {
      const route = routes.get(routeId);
      expect(route, routeId).toBeDefined();
      expect(route?.state).toBe('Minnesota');
      expect(route?.putIn).toBeDefined();
      expect(route?.takeOut).toBeDefined();
      expect(route?.logistics?.distanceLabel).toBeTruthy();
      expect(route?.logistics?.estimatedPaddleTime).toBeTruthy();
      expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route?.safetyProfile?.hazards.length).toBeGreaterThan(0);
      expect(route?.profile.thresholdSourceStrength).toMatch(/official|mixed/);
      expect(route?.sourceLinks.length).toBeGreaterThan(2);
    }

    expect(routes.has('red-river-north-dam-mb-johnson')).toBe(false);
    expect(routes.has('red-river-lincoln-drive-lafave')).toBe(false);
  });

  it('gives every route a licensed, honestly captioned photo', () => {
    for (const routeId of routeIds) {
      const photos = getApprovedRoutePhotos(routeId);
      expect(photos.length, routeId).toBeGreaterThan(0);
      expect(photos[0]?.credit, routeId).toBeTruthy();
      expect(photos[0]?.takenLabel, routeId).toMatch(/Commons|domain/i);
      expect(photos[0]?.caption, routeId).toBeTruthy();
    }
  });

  it('ships route-scoped canonical geometry for every route', () => {
    for (const routeId of routeIds) {
      const geometryPath = path.join(
        process.cwd(),
        'public',
        'data',
        'canonical-river-geometries',
        'routes',
        `${routeId}.json`,
      );
      expect(existsSync(geometryPath), routeId).toBe(true);

      const feature = JSON.parse(readFileSync(geometryPath, 'utf8')) as {
        properties?: { routeId?: string };
        geometry?: { type?: string; coordinates?: unknown[] };
      };
      expect(feature.properties?.routeId).toBe(routeId);
      expect(feature.geometry?.type).toBe('MultiLineString');
      expect(feature.geometry?.coordinates?.length).toBeGreaterThan(0);
    }
  });

  it('keeps the technical Vermilion and dam-portage Red routes conservative', () => {
    const routes = new Map(listRivers().map((route) => [route.slug, route]));
    const vermilion = routes.get('vermilion-river-dam-twomile');
    const fargo = routes.get('red-river-lindenwood-mb-johnson');

    expect(vermilion?.routeType).toBe('whitewater');
    expect(vermilion?.corridorId).toBe('mn-vermilion-condition-family');
    expect(vermilion?.continuityStatus).toBe('condition-family');
    expect(vermilion?.safetyProfile?.riskLevel).toBe('advanced');
    expect(vermilion?.safetyProfile?.hazards).toContain('dam');
    expect(vermilion?.gaugeSource.kind).toBe('proxy');
    expect(fargo?.safetyProfile?.hazards).toContain('dam');
    expect(fargo?.accessPoints?.some((point) => point.name.includes('Midtown Dam'))).toBe(true);
    expect(fargo?.accessPoints?.some((point) => point.name.includes('North Dam'))).toBe(true);
  });
});
