import type { ServerResponse } from 'node:http';
import { describe, expect, it, vi } from 'vitest';
import { handleRiverTripPack } from './trip-pack';

const demoRiver = {
  slug: 'demo-river',
  name: 'Demo River',
  reach: 'Upper reach',
  putIn: { id: 'put-in', name: 'Put-in', latitude: 44, longitude: -92 },
  takeOut: { id: 'take-out', name: 'Take-out', latitude: 44.1, longitude: -92.1 },
  accessPoints: [
    { id: 'put-in', name: 'Put-in', latitude: 44, longitude: -92, mileFromStart: 0, segmentKind: 'transition' as const },
    { id: 'take-out', name: 'Take-out', latitude: 44.1, longitude: -92.1, mileFromStart: 8, segmentKind: 'creek' as const },
  ],
  logistics: { distanceLabel: '8 mi', estimatedPaddleTime: 'About 3 to 4 hr' },
};

const inferredMileageRiver = {
  ...demoRiver,
  slug: 'inferred-mileage-river',
  accessPoints: demoRiver.accessPoints.map((point) => ({ ...point, mileFromStart: 0 })),
};

vi.mock('../../lib/rivers', () => ({
  getRiverBySlug: (slug: string) => [demoRiver, inferredMileageRiver].find((river) => river.slug === slug),
}));

vi.mock('./river-geometry', () => ({
  loadRouteGeometry: async () => ({
    geometry: {
      type: 'LineString',
      coordinates: [[-92, 44], [-92.05, 44.05], [-92.1, 44.1]],
    },
  }),
}));

function mockResponse() {
  return { writeHead: vi.fn(), end: vi.fn() } as unknown as ServerResponse;
}

describe('trip-pack route', () => {
  it('returns a calendar attachment for a valid segment and schedule', async () => {
    const response = mockResponse();
    await handleRiverTripPack(
      new URL('https://paddletoday.com/api/rivers/demo-river/trip.ics?start=2026-09-05T14:00:00Z&end=2026-09-05T18:00:00Z'),
      response,
      'req_trip',
      true,
      'demo-river',
      'ics',
    );

    expect(response.writeHead).toHaveBeenCalledWith(200, expect.objectContaining({
      'content-type': 'text/calendar; charset=utf-8',
      'content-disposition': expect.stringContaining('.ics'),
    }));
    expect(String(vi.mocked(response.end).mock.calls[0]?.[0])).toContain('BEGIN:VCALENDAR');
  });

  it('builds a useful default calendar schedule when times are omitted', async () => {
    const response = mockResponse();
    await handleRiverTripPack(new URL('https://paddletoday.com/api/rivers/demo-river/trip.ics'), response, 'req_trip', true, 'demo-river', 'ics');
    expect(response.writeHead).toHaveBeenCalledWith(200, expect.objectContaining({ 'content-type': 'text/calendar; charset=utf-8' }));
    expect(String(vi.mocked(response.end).mock.calls[0]?.[0])).toContain('BEGIN:VCALENDAR');
  });

  it('rejects a partially specified calendar schedule', async () => {
    const response = mockResponse();
    await handleRiverTripPack(new URL('https://paddletoday.com/api/rivers/demo-river/trip.ics?start=2026-09-05T14:00:00Z'), response, 'req_trip', true, 'demo-river', 'ics');
    expect(response.writeHead).toHaveBeenCalledWith(400, expect.objectContaining({ 'content-type': 'application/json; charset=utf-8' }));
  });

  it('exports routes whose ordered endpoints do not have measured mile markers', async () => {
    const response = mockResponse();
    await handleRiverTripPack(
      new URL('https://paddletoday.com/api/rivers/inferred-mileage-river/trip.gpx?putin=put-in&takeout=take-out'),
      response,
      'req_trip',
      true,
      'inferred-mileage-river',
      'gpx',
    );
    expect(response.writeHead).toHaveBeenCalledWith(200, expect.objectContaining({ 'content-type': 'application/gpx+xml; charset=utf-8' }));
    expect(String(vi.mocked(response.end).mock.calls[0]?.[0])).toContain('<gpx');
  });

  it('rejects a reversed access selection', async () => {
    const response = mockResponse();
    await handleRiverTripPack(new URL('https://paddletoday.com/api/rivers/demo-river/trip.gpx?putin=take-out&takeout=put-in'), response, 'req_trip', true, 'demo-river', 'gpx');
    expect(response.writeHead).toHaveBeenCalledWith(400, expect.objectContaining({ 'content-type': 'application/json; charset=utf-8' }));
  });

  it('returns not found for an unknown route before loading geometry', async () => {
    const response = mockResponse();
    await handleRiverTripPack(new URL('https://paddletoday.com/api/rivers/missing/trip.gpx'), response, 'req_trip', true, 'missing', 'gpx');
    expect(response.writeHead).toHaveBeenCalledWith(404, expect.objectContaining({ 'content-type': 'application/json; charset=utf-8' }));
  });
});
