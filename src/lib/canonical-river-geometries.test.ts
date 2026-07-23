import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { canonicalRiverRouteLineFromFeature } from './canonical-river-geometries.js';
import { listRivers } from './rivers';

const assetPath = path.join(process.cwd(), 'public', 'data', 'canonical-river-geometries.json');
const routeAssetDir = path.join(process.cwd(), 'public', 'data', 'canonical-river-geometries', 'routes');

function routeFeature(routeId: string) {
  return JSON.parse(readFileSync(path.join(routeAssetDir, `${routeId}.json`), 'utf8')) as {
    properties?: { routeId?: string };
    geometry?: { type?: string; coordinates?: unknown[] };
  };
}

function distanceMiles(left: [number, number], right: [number, number]) {
  const latitudeScale = Math.cos(((left[1] + right[1]) * Math.PI) / 360);
  return Math.hypot((left[0] - right[0]) * latitudeScale, left[1] - right[1]) * 69;
}

describe('canonical river geometry asset', () => {
  it('contains route-keyed multiline geometry for the Minnesota/St. Croix checks', () => {
    for (const routeId of [
      'minnesota-river-judson-land-of-memories',
      'st-croix-river-interstate-osceola',
      'st-croix-river-osceola-william-obrien',
    ]) {
      const feature = routeFeature(routeId);
      expect(feature.properties?.routeId).toBe(routeId);
      expect(feature?.geometry?.type).toBe('MultiLineString');
      expect(feature?.geometry?.coordinates?.length).toBeGreaterThan(0);
    }
  });

  it('does not encode route geometry as a straight fallback chord', () => {
    const feature = routeFeature('minnesota-river-judson-land-of-memories');
    expect(feature.geometry?.type).toBe('MultiLineString');
    expect(feature.geometry?.coordinates?.length).toBeGreaterThan(0);
  });

  it('publishes coverage metadata and a Minnesota-scoped asset', () => {
    const asset = JSON.parse(readFileSync(assetPath, 'utf8')) as {
      type?: string;
      routeCount?: number;
      matchedRouteCount?: number;
      unmatchedRouteIds?: string[];
      routeDataFingerprint?: string;
    };
    const minnesota = JSON.parse(
      readFileSync(path.join(process.cwd(), 'public', 'data', 'canonical-river-geometries', 'states', 'minnesota.json'), 'utf8'),
    ) as { scope?: string; state?: string; features?: unknown[] };

    expect(asset.type).toBe('CanonicalGeometryManifest');
    expect(asset.routeCount).toBe(listRivers().length);
    expect(asset.matchedRouteCount).toBe((asset.routeCount ?? 0) - (asset.unmatchedRouteIds?.length ?? 0));
    expect(asset.routeDataFingerprint).toMatch(/^[a-f0-9]{64}$/);
    expect(minnesota.scope).toBe('state');
    expect(minnesota.state).toBe('Minnesota');
    expect(minnesota.features?.length).toBeGreaterThan(100);
  });

  it('stitches the Little Miami Rogers to Rahe geometry across the full route', () => {
    const feature = routeFeature('little-miami-river-rogers-ballpark-carl-rahe');

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
