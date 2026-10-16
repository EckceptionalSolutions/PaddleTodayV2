import { expect, it } from 'vitest';
import { documentedHubTripPair, projectedOverlapMiles, tracesProperlyCross } from './route-overlap-quality';
const point=(longitude:number,latitude=40)=>({longitude,latitude});
it('recognizes only distinct exact trip selectors on the same hub',()=>{
  expect(documentedHubTripPair('a','b','/rivers/by-river/x/#trip-a','/rivers/by-river/x/#trip-b')).toBe(true);
  expect(documentedHubTripPair('a','b','/rivers/by-river/x/#access-notes','/rivers/by-river/x/#trip-b')).toBe(false);
  expect(documentedHubTripPair('a','b','/rivers/by-river/x/#trip-a','/rivers/by-river/y/#trip-b')).toBe(false);
  expect(documentedHubTripPair('a','b',undefined,'/rivers/by-river/x/#trip-b')).toBe(false);
});
it('does not treat adjacent collinear reaches as overlap',()=>{
  expect(projectedOverlapMiles(point(-90),point(-89.9),point(-89.9),point(-89.8))).toBe(0);
  expect(projectedOverlapMiles(point(-90),point(-89.9),point(-89.8),point(-89.9))).toBe(0);
});
it('retains positive overlap and contained or reversed reaches',()=>{
  expect(projectedOverlapMiles(point(-90),point(-89.8),point(-89.9),point(-89.7))).toBeGreaterThan(5);
  expect(projectedOverlapMiles(point(-90),point(-89.8),point(-89.85),point(-89.95))).toBeGreaterThan(5);
});
it('distinguishes an actual crossing from shared channels or touching endpoints',()=>{
  expect(tracesProperlyCross([[point(-90,39.9),point(-89.8,40.1)]],[[point(-90,40.1),point(-89.8,39.9)]])).toBe(true);
  expect(tracesProperlyCross([[point(-90),point(-89.8)]],[[point(-90),point(-89.8)]])).toBe(false);
  expect(tracesProperlyCross([[point(-90),point(-89.8)]],[[point(-89.8),point(-89.7,40.1)]])).toBe(false);
});
