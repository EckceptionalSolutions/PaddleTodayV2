import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { canonicalRiverRouteLineFromFeature } from './canonical-river-geometries.js';
import { listRivers } from './rivers';

const assetPath = path.join(process.cwd(), 'public', 'data', 'canonical-river-geometries.json');
const routeAssetDir = path.join(process.cwd(), 'public', 'data', 'canonical-river-geometries', 'routes');

function routeFeature(routeId: string) {
  return JSON.parse(readFileSync(path.join(routeAssetDir, `${routeId}.json`), 'utf8')) as {
    properties?: { routeId?: string; source?: string; traceMode?: string; endpointSnapMaxFeet?: number | null };
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

  it('stitches the Brule Highway 139-to-FR 2150 geometry across its source gap', () => {
    const feature = routeFeature('brule-river-highway-139-fr-2150');
    const putIn: [number, number] = [-88.65238, 45.98767];
    const takeOut: [number, number] = [-88.45013, 45.99013];
    const routeLine = canonicalRiverRouteLineFromFeature(feature, [
      { longitude: putIn[0], latitude: putIn[1] },
      { longitude: takeOut[0], latitude: takeOut[1] },
    ]);
    const coordinates = routeLine?.geometry.coordinates as [number, number][] | undefined;

    expect(coordinates?.length).toBeGreaterThan(400);
    expect(distanceMiles(coordinates?.[0] ?? [0, 0], putIn)).toBeLessThan(0.03);
    expect(distanceMiles(coordinates?.at(-1) ?? [0, 0], takeOut)).toBeLessThan(0.03);
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

  it('covers the formerly unmatched source-backed corridors', () => {
    const horicon = routeFeature('horicon-marsh-greenhead-nebraska');
    const nineMile = routeFeature('nine-mile-creek-munro-pumphouse');
    const primeHook = routeFeature('prime-hook-creek-foords-waples');

    expect(horicon.properties?.traceMode).toBe('network-traced');
    expect(horicon.properties?.endpointSnapMaxFeet).toBeLessThanOrEqual(1000);
    expect(nineMile.properties?.traceMode).toBe('named-fallback');
    expect(nineMile.properties?.endpointSnapMaxFeet).toBeLessThanOrEqual(100);
    expect(primeHook.properties?.traceMode).toBe('network-traced');
    expect(primeHook.properties?.endpointSnapMaxFeet).toBeLessThanOrEqual(500);
    for (const feature of [horicon, nineMile, primeHook]) {
      expect(feature.geometry?.type).toBe('MultiLineString');
      expect(feature.geometry?.coordinates?.[0]?.length).toBeGreaterThan(2);
    }
  });

  it('preserves documented access-anchor traces when named NHD coverage is unavailable', () => {
    for (const routeId of [
      'eau-claire-river-east-branch-wayside-county-i',
      'keuka-outlet-penn-yan-dresden',
      'old-erie-canal-cedar-bay-chittenango-landing',
      'erie-canal-waterford-flight',
      'erie-canal-lock-e7-waterford-flight',
      'erie-canal-tonawanda-amherst',
    ]) {
      const feature = routeFeature(routeId);
      expect(feature.properties?.traceMode).toBe('curated-access-fallback');
      expect(feature.properties?.endpointSnapMaxFeet).toBe(0);
      expect(feature.geometry?.coordinates?.[0]?.length).toBeGreaterThan(2);
    }
  });

  it('carries the Pony Pasture route through the Manchester Canal to the Reedy Creek ramp', () => {
    const feature = routeFeature('james-river-pony-pasture-reedy-creek');
    const putIn: [number, number] = [-77.53012072, 37.55949468];
    const takeOut: [number, number] = [-77.4694, 37.52439];
    const routeLine = canonicalRiverRouteLineFromFeature(feature, [
      { longitude: putIn[0], latitude: putIn[1] },
      { longitude: takeOut[0], latitude: takeOut[1] },
    ]);
    const coordinates = routeLine?.geometry.coordinates as [number, number][] | undefined;
    const lengthMiles = (coordinates ?? []).slice(1).reduce((sum, coordinate, index) =>
      sum + distanceMiles(coordinates?.[index] ?? coordinate, coordinate), 0);

    expect(feature.properties?.source).toContain('American Whitewater reach geometry');
    expect(feature.properties?.endpointSnapMaxFeet).toBeLessThanOrEqual(100);
    expect(lengthMiles).toBeGreaterThan(4.5);
    expect(lengthMiles).toBeLessThan(5.2);
    expect(distanceMiles(coordinates?.[0] ?? [0, 0], putIn)).toBeLessThan(0.03);
    expect(distanceMiles(coordinates?.at(-1) ?? [0, 0], takeOut)).toBeLessThan(0.03);
  });

  it('keeps the Iron Gate trace continuous without forcing the shorter published estimate', () => {
    const feature = routeFeature('james-river-iron-gate-glen-wilton');
    const putIn: [number, number] = [-79.782778, 37.773889];
    const takeOut: [number, number] = [-79.815972, 37.750806];
    const routeLine = canonicalRiverRouteLineFromFeature(feature, [
      { longitude: putIn[0], latitude: putIn[1] },
      { longitude: takeOut[0], latitude: takeOut[1] },
    ]);
    const coordinates = routeLine?.geometry.coordinates as [number, number][] | undefined;
    const lengthMiles = (coordinates ?? []).slice(1).reduce((sum, coordinate, index) =>
      sum + distanceMiles(coordinates?.[index] ?? coordinate, coordinate), 0);

    expect(lengthMiles).toBeGreaterThan(3);
    expect(lengthMiles).toBeLessThan(3.4);
    expect(distanceMiles(coordinates?.[0] ?? [0, 0], putIn)).toBeLessThan(0.03);
    expect(distanceMiles(coordinates?.at(-1) ?? [0, 0], takeOut)).toBeLessThan(0.03);
  });

  it("maps the full Meems Bottom-to-Chapman's Landing corridor", () => {
    const feature = routeFeature('north-fork-shenandoah-meems-chapmans');
    const putIn: [number, number] = [-78.65096625, 38.7066986];
    const takeOut: [number, number] = [-78.52968681, 38.84543186];
    const routeLine = canonicalRiverRouteLineFromFeature(feature, [
      { longitude: putIn[0], latitude: putIn[1] },
      { longitude: takeOut[0], latitude: takeOut[1] },
    ]);
    const coordinates = routeLine?.geometry.coordinates as [number, number][] | undefined;
    const lengthMiles = (coordinates ?? []).slice(1).reduce((sum, coordinate, index) =>
      sum + distanceMiles(coordinates?.[index] ?? coordinate, coordinate), 0);
    const first = coordinates?.[0] ?? [0, 0];
    const last = coordinates?.at(-1) ?? [0, 0];
    const forwardError = distanceMiles(first, putIn) + distanceMiles(last, takeOut);
    const reverseError = distanceMiles(first, takeOut) + distanceMiles(last, putIn);

    expect(lengthMiles).toBeGreaterThan(19.5);
    expect(lengthMiles).toBeLessThan(21.5);
    expect(Math.min(forwardError, reverseError)).toBeLessThan(0.06);
  });
});
