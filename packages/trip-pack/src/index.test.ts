import { describe, expect, it } from 'vitest';
import {
  buildFloatPlanMessage,
  buildGpx,
  buildIcs,
  estimateSegmentDurationMinutes,
  orientRouteCoordinates,
  tripPackFilename,
  type GpxTripPlan,
} from './index';

const plan: GpxTripPlan = {
  routeSlug: 'cannon-river-cannon-falls-welch',
  riverName: 'Cannon River',
  reach: 'Cannon Falls to Welch',
  routeUrl: 'https://paddletoday.com/rivers/cannon-river-cannon-falls-welch/',
  routeCoordinates: [
    { latitude: 44.46, longitude: -92.90 },
    { latitude: 44.40, longitude: -92.75 },
  ],
  putIn: { name: 'Cannon Falls Access', latitude: 44.46, longitude: -92.90 },
  takeOut: { name: 'Welch Access & Camp', latitude: 44.40, longitude: -92.75, note: 'Check seasonal hours & access.' },
  distanceMiles: 12.5,
  estimatedPaddleTime: 'About 4 to 6 hr',
  launchAt: new Date('2026-09-05T14:00:00.000Z'),
  expectedTakeOutAt: new Date('2026-09-05T20:00:00.000Z'),
  checkInAt: new Date('2026-09-05T21:00:00.000Z'),
  timeZone: 'America/Chicago',
  groupSize: 2,
  boatDescription: 'Two recreational kayaks',
};

describe('trip pack serializers', () => {
  it('builds a canonical GPX track and access waypoints', () => {
    const gpx = buildGpx(plan);
    expect(gpx).toContain('<gpx version="1.1"');
    expect(gpx).toContain('<trkpt lat="44.46" lon="-92.9">');
    expect(gpx).toContain('<wpt lat="44.4" lon="-92.75">');
    expect(gpx).toContain('Check seasonal hours &amp; access.');
  });

  it('refuses to create a fake endpoint chord', () => {
    expect(() => buildGpx({ ...plan, routeCoordinates: [] })).toThrow(/canonical route geometry/i);
  });

  it('orients a snapped line from put-in to take-out', () => {
    expect(orientRouteCoordinates([...plan.routeCoordinates].reverse(), plan.putIn, plan.takeOut)[0]).toEqual(plan.routeCoordinates[0]);
  });

  it('builds a calendar event with a recheck alarm and escaped notes', () => {
    const ics = buildIcs(plan);
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('SUMMARY:Paddle: Cannon River - Cannon Falls to Welch');
    expect(ics).toContain('TRIGGER:-PT2H');
    expect(ics).toMatch(/\r\nEND:VCALENDAR\r\n$/);
  });

  it('builds a concise float plan without implying monitoring', () => {
    const message = buildFloatPlanMessage(plan);
    expect(message).toContain('Party: 2 paddlers');
    expect(message).toContain('PaddleToday float plan - not live tracking');
    expect(message).toContain('does not monitor this trip');
  });

  it('shares the same segment-time estimate used by planning', () => {
    expect(estimateSegmentDurationMinutes('12.5 mi', 'About 4 to 6 hr', 6.25)).toEqual({ min: 120, max: 180 });
  });

  it('creates safe, portable filenames', () => {
    expect(tripPackFilename(plan, '.gpx')).toBe('cannon-river-cannon-falls-to-welch.gpx');
  });
});
