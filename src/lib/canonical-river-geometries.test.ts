import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const assetPath = path.join(process.cwd(), 'public', 'data', 'canonical-river-geometries.json');

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

    expect(asset.routeCount).toBe(657);
    expect(asset.matchedRouteCount).toBe(645);
    expect(asset.unmatchedRouteIds).toHaveLength(12);
    expect(asset.routeDataFingerprint).toMatch(/^[a-f0-9]{64}$/);
    expect(minnesota.scope).toBe('state');
    expect(minnesota.state).toBe('Minnesota');
    expect(minnesota.features?.length).toBeGreaterThan(100);
  });
});
