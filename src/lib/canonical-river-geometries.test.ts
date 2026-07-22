import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { canonicalRiverRouteLineFromFeature } from './canonical-river-geometries.js';

const assetPath = path.join(process.cwd(), 'public', 'data', 'canonical-river-geometries.json');

function distanceMiles(left: [number, number], right: [number, number]) {
  const latitudeScale = Math.cos(((left[1] + right[1]) * Math.PI) / 360);
  return Math.hypot((left[0] - right[0]) * latitudeScale, left[1] - right[1]) * 69;
}

describe('canonical river geometry asset', () => {
  it('contains route-keyed multiline geometry for the Minnesota/St. Croix checks', () => {
    const asset = JSON.parse(readFileSync(assetPath, 'utf8')) as {
      type: string;
      features: Array<{ properties?: { routeId?: string }; geometry?: { type?: string; coordinates?: unknown[] } }>;
    };
    const byRoute = new Map(asset.features.map((feature) => [feature.properties?.routeId, feature]));

    expect(asset.type).toBe('FeatureCollection');
    for (const routeId of [
      'minnesota-river-judson-land-of-memories',
      'st-croix-river-interstate-osceola',
      'st-croix-river-osceola-william-obrien',
    ]) {
      const feature = byRoute.get(routeId);
      expect(feature?.geometry?.type).toBe('MultiLineString');
      expect(feature?.geometry?.coordinates?.length).toBeGreaterThan(0);
    }
  });

  it('does not encode route geometry as a straight fallback chord', () => {
    const asset = JSON.parse(readFileSync(assetPath, 'utf8')) as {
      features: Array<{ geometry?: { type?: string; coordinates?: unknown[] } }>;
    };
    expect(asset.features.length).toBeGreaterThan(500);
    expect(asset.features.every((feature) => feature.geometry?.type === 'MultiLineString')).toBe(true);
  });

  it('publishes coverage metadata and a Minnesota-scoped asset', () => {
    const asset = JSON.parse(readFileSync(assetPath, 'utf8')) as {
      routeCount?: number;
      matchedRouteCount?: number;
      unmatchedRouteIds?: string[];
      routeDataFingerprint?: string;
    };
    const minnesota = JSON.parse(
      readFileSync(path.join(process.cwd(), 'public', 'data', 'canonical-river-geometries', 'states', 'minnesota.json'), 'utf8'),
    ) as { scope?: string; state?: string; features?: unknown[] };

    expect(asset.routeCount).toBe(658);
    expect(asset.matchedRouteCount).toBe(655);
    expect(asset.unmatchedRouteIds).toHaveLength(3);
    expect(asset.routeDataFingerprint).toMatch(/^[a-f0-9]{64}$/);
    expect(minnesota.scope).toBe('state');
    expect(minnesota.state).toBe('Minnesota');
    expect(minnesota.features?.length).toBeGreaterThan(100);
  });

  it('stitches the Little Miami Rogers to Rahe geometry across the full route', () => {
    const asset = JSON.parse(readFileSync(assetPath, 'utf8')) as {
      features: Array<{ properties?: { routeId?: string }; geometry?: { type?: string; coordinates?: unknown[] } }>;
    };
    const feature = asset.features.find(
      (candidate) => candidate.properties?.routeId === 'little-miami-river-rogers-ballpark-carl-rahe',
    );

    const routeLine = canonicalRiverRouteLineFromFeature(feature, [
      { longitude: -84.215533, latitude: 39.3676 },
      { longitude: -84.2526, latitude: 39.3182 },
    ]);

    const coordinates = routeLine?.geometry.coordinates as [number, number][] | undefined;
    expect(coordinates?.length).toBeGreaterThan(100);
    expect(distanceMiles(coordinates?.[0] ?? [0, 0], [-84.215533, 39.3676])).toBeLessThan(0.05);
    expect(distanceMiles(coordinates?.at(-1) ?? [0, 0], [-84.2526, 39.3182])).toBeLessThan(0.1);
  });
});
