import { describe, expect, it } from 'vitest';
import { isTripPlan, newTripPlan } from '@paddletoday/api-contract';
import { titleFollowsRoute, tripTitleForRoute } from './trip-title';
describe('trip names from routes', () => {
  it('keeps short names and supplies a blank-route placeholder', () => {
    expect(tripTitleForRoute('Wolf River')).toBe('Wolf River');
    expect(tripTitleForRoute('')).toBe('New paddle');
  });
  it('saves a long catalog route without shortening the route itself', () => {
    const name = "Bartram Canoe Trail · Spoonbill Sandbar / Two Rivers Point route: French's Lake Coastal Access Kiosk (water-entry edge) to Rice Creek Landing public access (water-entry edge)";
    const plan = { ...newTripPlan({ name }), title: tripTitleForRoute(name) };
    expect(plan.route.name).toBe(name);
    expect(plan.title.length).toBeLessThanOrEqual(160);
    expect(plan.title.endsWith('…')).toBe(true);
    expect(isTripPlan(plan)).toBe(true);
  });
  it('keeps generated titles following route changes while preserving custom titles', () => {
    const name = 'Route '.repeat(35);
    expect(titleFollowsRoute(tripTitleForRoute(name), name)).toBe(true);
    expect(titleFollowsRoute('Birthday paddle', name)).toBe(false);
  });
  it('never splits an emoji at the title boundary', () => {
    const title = tripTitleForRoute('a'.repeat(158) + '🚣'.repeat(5));
    expect(title.length).toBeLessThanOrEqual(160);
    expect(title.isWellFormed()).toBe(true);
  });
});
