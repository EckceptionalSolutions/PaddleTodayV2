import { describe, expect, it } from 'vitest';
import { createExploreViewportSelector } from './explore-map-viewport.js';
import { boundsIntersect, simplifyOverviewLine } from '../lib/explore-map-geometry.js';

const route = (slug: string, west: number, east = west + 1) => ({ river: {
  slug, longitude: west, latitude: 45, putIn: { longitude: west, latitude: 45 }, takeOut: { longitude: east, latitude: 45 },
} });
const item = (key: string, routes: ReturnType<typeof route>[]) => ({ key, cardRoute: routes[0], matchingRoutes: routes });
const bounds = { toArray: () => [[-94, 44], [-92, 46]] };

describe('Explore viewport selection', () => {
  it('excludes offscreen top results and includes routes crossing the viewport', () => {
    const select = createExploreViewportSelector();
    const distant = item('top', [route('offscreen', -120)]);
    const crossing = item('crossing', [route('crossing', -100, -85)]);
    expect(select([distant, crossing], { bounds }).items).toEqual([crossing]);
  });
  it('uses full geometry bounds for bends and keeps unchanged route subsets stable', () => {
    const select = createExploreViewportSelector();
    const near = route('bend', -100);
    const group = item('river', [near, route('far', -120)]);
    const features = new Map([['bend', { bbox: [-100, 44, -93, 45] }]]);
    const first = select([group], { bounds, features }).items[0];
    expect(first.matchingRoutes).toEqual([near]);
    expect(select([group], { bounds, features }).items[0]).toBe(first);
    expect(select([{ ...group }], { bounds, features }).items[0]).not.toBe(first);
  });
  it('keeps a selected visible result within the limit without retaining offscreen results', () => {
    const select = createExploreViewportSelector();
    const items = [item('a', [route('a', -94)]), item('b', [route('b', -93)]), item('far', [route('far', -120)])];
    expect(select(items, { bounds, limit: 1, preferredKey: 'b' })).toEqual({ items: [items[1]], total: 2 });
    expect(select(items, { bounds, limit: 1, preferredKey: 'far' }).items).toEqual([items[0]]);
  });
  it('recognizes wrapped longitude bounds', () => {
    expect(boundsIntersect([-179, 44, -178, 46], [175, 40, 185, 50])).toBe(true);
    expect(boundsIntersect([-100, 44, -99, 46], [175, 40, 185, 50])).toBe(false);
  });
  it('simplifies straight lines while preserving endpoints and meaningful bends', () => {
    const line = [[0, 0], [1, 0.0001], [2, 0], [3, 1], [4, 0]];
    expect(simplifyOverviewLine(line)).toEqual([[0, 0], [2, 0], [3, 1], [4, 0]]);
  });
});
