import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { getApprovedRoutePhotos } from '../data/route-gallery.js';
import { listRivers } from './rivers.js';

const routeIds = [
  'devil-track-river-lake-maple-hill',
  'devil-track-river-maple-hill-lake-superior',
  'cascade-river-grade-cascade-road',
  'lake-superior-cascade-grand-marais',
  'lake-superior-grand-marais-kadunce',
  'lake-superior-kadunce-judge-magney',
  'lake-superior-judge-magney-hovland',
  'kadunce-river-sht-highway-61',
] as const;

const whitewaterIds = [
  'devil-track-river-lake-maple-hill',
  'devil-track-river-maple-hill-lake-superior',
  'cascade-river-grade-cascade-road',
  'kadunce-river-sht-highway-61',
] as const;

const coastalIds = [
  'lake-superior-cascade-grand-marais',
  'lake-superior-grand-marais-kadunce',
  'lake-superior-kadunce-judge-magney',
  'lake-superior-judge-magney-hovland',
] as const;

describe('Grand Marais route expansion', () => {
  it('withholds every ungauged and proxy-gauged Grand Marais route', () => {
    const routes = new Map(listRivers().map((route) => [route.slug, route]));

    for (const routeId of routeIds) {
      expect(routes.has(routeId), routeId).toBe(false);
    }
  });

  it('does not publish regional-proxy whitewater runs', () => {
    const routes = new Map(listRivers().map((route) => [route.slug, route]));
    for (const routeId of whitewaterIds) {
      expect(routes.has(routeId), routeId).toBe(false);
    }
  });

  it('does not publish Lake Superior routes', () => {
    const routes = new Map(listRivers().map((route) => [route.slug, route]));
    for (const routeId of coastalIds) {
      expect(routes.has(routeId), routeId).toBe(false);
    }
  });

  it('retains licensed research photos for the remaining river research routes but removes published geometry', () => {
    for (const routeId of whitewaterIds) {
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
      expect(existsSync(geometryPath), routeId).toBe(false);
    }
  });
});
