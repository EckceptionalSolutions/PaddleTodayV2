import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { getApprovedRoutePhotos } from '../data/route-gallery.js';
import { listRivers } from './rivers.js';

const routeIds = [
  'devil-track-river-lake-maple-hill',
  'devil-track-river-maple-hill-lake-superior',
  'cascade-river-grade-cascade-road',
  'kadunce-river-sht-highway-61',
] as const;

const whitewaterIds = [
  'devil-track-river-lake-maple-hill',
  'devil-track-river-maple-hill-lake-superior',
  'cascade-river-grade-cascade-road',
  'kadunce-river-sht-highway-61',
] as const;

describe('Grand Marais route expansion', () => {
  it('publishes all four river routes with reviewed safety and logistics', () => {
    const routes = new Map(listRivers().map((route) => [route.slug, route]));

    for (const routeId of routeIds) {
      const route = routes.get(routeId);
      expect(route, routeId).toBeDefined();
      expect(route?.state).toBe('Minnesota');
      expect(route?.region).toBe('Grand Marais Area');
      expect(route?.putIn).toBeDefined();
      expect(route?.takeOut).toBeDefined();
      expect(route?.logistics?.distanceLabel).toBeTruthy();
      expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route?.safetyProfile?.hazards.length).toBeGreaterThan(0);
      expect(route?.sourceLinks.length).toBeGreaterThan(2);
    }
  });

  it('keeps the whitewater runs guarded and labels proxy flow honestly', () => {
    const routes = new Map(listRivers().map((route) => [route.slug, route]));
    for (const routeId of whitewaterIds) {
      const route = routes.get(routeId);
      expect(route?.routeType).toBe('whitewater');
      expect(route?.safetyProfile?.riskLevel).toBe('advanced');
      expect(route?.gaugeSource.kind).toBe('proxy');
      expect(route?.gaugeSource.siteName).toMatch(/regional runoff trigger only/i);
      expect(route?.profile.thresholdSourceStrength).toBe('derived');
    }

    const lowerDevilTrack = routes.get('devil-track-river-maple-hill-lake-superior');
    expect(lowerDevilTrack?.statusText).toMatch(/expert-only/i);
    expect(lowerDevilTrack?.profile.difficultyNotes).toMatch(/Class II-V/i);
  });

  it('ships licensed photos and route-scoped canonical geometry', () => {
    for (const routeId of routeIds) {
      const photos = getApprovedRoutePhotos(routeId);
      expect(photos.length, routeId).toBeGreaterThan(0);
      expect(photos[0]?.credit, routeId).toBeTruthy();
      expect(photos[0]?.takenLabel, routeId).toMatch(/Commons|domain/i);

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
});
