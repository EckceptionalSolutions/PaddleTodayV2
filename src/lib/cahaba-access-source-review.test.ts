import { readFileSync } from 'node:fs';
import type { ServerResponse } from 'node:http';
import { describe, expect, it, vi } from 'vitest';
import { getRiverBySlug } from './rivers';
import { canonicalRiverRouteLineFromFeature } from './canonical-river-geometries.js';
import { loadRouteGeometry } from '../server/routes/river-geometry';
import { handleRiverTripPack } from '../server/routes/trip-pack';

const slug = 'cahaba-river-old-overton-highway-280';
describe('Cahaba Highway 280 landing boundary', () => {
  it('uses the manager access reference and ends before the downstream dam area', () => {
    const route = getRiverBySlug(slug)!;
    expect(route.takeOut).toMatchObject({ latitude: 33.432020, longitude: -86.713973 });
    expect(route.accessPoints?.at(-1)).toMatchObject({ latitude: 33.432020, longitude: -86.713973, mileFromStart: 6.5 });
    expect(route.logistics?.distanceLabel).toContain('6.5 river miles');
    expect(route.accessPoints?.[0].note).toContain('not a surveyed shoreline landing');
    expect(route.accessPoints?.at(-1)?.note).toContain('not an instruction to paddle');
    expect(route.sourceLinks.some(source => source.url === 'https://www.cahabablueway.org/hwy-280/')).toBe(true);
    expect(route.safetyProfile?.hazards).toContain('dam');
  });

  it('rejects a retained old line in the browser, geometry API and GPX export', async () => {
    const route = getRiverBySlug(slug)!;
    const tombstone = JSON.parse(readFileSync(`public/data/canonical-river-geometries/routes/${slug}.json`, 'utf8'));
    expect(tombstone.geometry).toBeNull();
    expect(tombstone.properties.geometryReviewStatus).toBe('withheld');
    const stale = { properties: { routeId: slug }, geometry: { type: 'LineString', coordinates: [[-86.701893, 33.485112], [-86.7218067, 33.4295935]] } };
    expect(canonicalRiverRouteLineFromFeature(stale, route.accessPoints)).toBeNull();
    expect(await loadRouteGeometry(slug)).toBeNull();
    const response = { writeHead: vi.fn(), end: vi.fn() } as unknown as ServerResponse;
    await handleRiverTripPack(new URL(`https://paddletoday.com/api/rivers/${slug}/trip.gpx`), response, 'cahaba_boundary', true, slug, 'gpx');
    expect(response.writeHead).toHaveBeenCalledWith(409, expect.any(Object));
    expect(String(vi.mocked(response.end).mock.calls[0]?.[0])).not.toContain('<trkpt');
  });
});
