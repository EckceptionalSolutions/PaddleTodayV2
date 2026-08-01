import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { canonicalRiverRouteLineFromFeature } from './canonical-river-geometries.js';
import { listRivers } from './rivers';

const assetPath = path.join(process.cwd(), 'public', 'data', 'canonical-river-geometries.json');
const routeAssetDir = path.join(process.cwd(), 'public', 'data', 'canonical-river-geometries', 'routes');

function routeFeature(routeId: string) {
  return JSON.parse(readFileSync(path.join(routeAssetDir, `${routeId}.json`), 'utf8')) as {
    properties?: { routeId?: string; traceMode?: string; endpointSnapMaxFeet?: number | null };
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
      'st-croix-river-fox-highway-70',
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
      networkTracedRouteCount?: number;
      namedFallbackRouteCount?: number;
      curatedRouteCount?: number;
      unmatchedRouteIds?: string[];
      routeDataFingerprint?: string;
    };
    const minnesota = JSON.parse(
      readFileSync(path.join(process.cwd(), 'public', 'data', 'canonical-river-geometries', 'states', 'minnesota.json'), 'utf8'),
    ) as { scope?: string; state?: string; features?: unknown[] };

    expect(asset.type).toBe('CanonicalGeometryManifest');
    expect(asset.routeCount).toBe(listRivers().length);
    expect(asset.matchedRouteCount).toBe((asset.routeCount ?? 0) - (asset.unmatchedRouteIds?.length ?? 0));
    expect(
      (asset.networkTracedRouteCount ?? 0)
      + (asset.namedFallbackRouteCount ?? 0)
      + (asset.curatedRouteCount ?? 0),
    ).toBe(asset.matchedRouteCount);
    expect(asset.networkTracedRouteCount).toBeGreaterThan(100);
    expect(asset.routeDataFingerprint).toMatch(/^[a-f0-9]{64}$/);
    expect(minnesota.scope).toBe('state');
    expect(minnesota.state).toBe('Minnesota');
    expect(minnesota.features?.length).toBeGreaterThan(100);
  });

  it('stitches the Red Lake Crookston-to-Fisher geometry across the full route', () => {
    const feature = routeFeature('red-lake-river-crookston-fisher');

    const routeLine = canonicalRiverRouteLineFromFeature(feature, [
      { longitude: -96.5671255, latitude: 47.7598975 },
      { longitude: -96.8090097, latitude: 47.8007512 },
    ]);

    const coordinates = routeLine?.geometry.coordinates as [number, number][] | undefined;
    expect(coordinates?.length).toBeGreaterThan(100);
    const first = coordinates?.[0] ?? [0, 0];
    const last = coordinates?.at(-1) ?? [0, 0];
    const forwardError =
      distanceMiles(first, [-96.5671255, 47.7598975]) + distanceMiles(last, [-96.8090097, 47.8007512]);
    const reverseError =
      distanceMiles(first, [-96.8090097, 47.8007512]) + distanceMiles(last, [-96.5671255, 47.7598975]);
    expect(Math.min(forwardError, reverseError)).toBeLessThan(0.1);
  });

  it('uses the connected natural Otter Tail channel instead of the artificial-path-only fallback', () => {
    const feature = routeFeature('otter-tail-river-friberg-hwy-210');
    expect(feature.properties?.traceMode).toBe('network-traced');
    expect(feature.properties?.endpointSnapMaxFeet).toBeLessThanOrEqual(100);

    const routeLine = canonicalRiverRouteLineFromFeature(feature, [
      { longitude: -96.0206276, latitude: 46.3826273 },
      { longitude: -95.9809894, latitude: 46.2807577 },
    ]);
    const coordinates = routeLine?.geometry.coordinates as [number, number][] | undefined;
    const lengthMiles = (coordinates ?? []).slice(1).reduce((sum, coordinate, index) =>
      sum + distanceMiles(coordinates?.[index] ?? coordinate, coordinate), 0);

    expect(lengthMiles).toBeGreaterThan(14);
    expect(lengthMiles).toBeLessThan(16);
    expect(distanceMiles(coordinates?.[0] ?? [0, 0], [-96.0206276, 46.3826273])).toBeLessThan(0.03);
    expect(distanceMiles(coordinates?.at(-1) ?? [0, 0], [-95.9809894, 46.2807577])).toBeLessThan(0.03);
  });
});
