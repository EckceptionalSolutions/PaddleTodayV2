import { describe, expect, it } from 'vitest';
import { advanceSavedRouteSnapshot, parseSavedRouteSnapshots, savedRouteChanges, savedRouteSnapshot, type SavedRouteSnapshot } from './saved-route-changes';
import type { RiverSummaryApiItem } from './index';

const previous: SavedRouteSnapshot = { generatedAt: '2026-09-05T12:00:00Z', score: 70, gauge: { value: 600, unit: 'cfs' }, cautions: ['Dam'] };
const current: SavedRouteSnapshot = { generatedAt: '2026-09-06T12:00:00Z', score: 78, gauge: { value: 650, unit: 'cfs' }, cautions: ['Dam', 'Strainers'] };

describe('saved route comparisons', () => {
  it('reports changes without repeating existing cautions', () => {
    expect(savedRouteChanges(previous, current)).toEqual(['Score +8 (70 → 78)', 'Gauge higher: 600 → 650 cfs', 'New caution: Strainers']);
  });
  it('does not invent changes on first visits, missing data, or older snapshots', () => {
    expect(savedRouteChanges(undefined, current)).toEqual([]);
    expect(savedRouteChanges(previous, null)).toEqual([]);
    expect(savedRouteChanges(current, previous)).toEqual([]);
    expect(savedRouteChanges(previous, previous)).toEqual([]);
  });
  it('never compares different gauge units or unavailable scores', () => {
    expect(savedRouteChanges(previous, { ...current, score: null, gauge: { value: 800, unit: 'ft' }, cautions: [] })).toEqual([]);
  });
  it('captures current readings and cautions but refuses stale live data', () => {
    const item = { generatedAt: current.generatedAt, score: 78, liveData: { overall: 'live' }, summary: { gaugeNow: '1,250 cfs' }, readiness: { status: 'verify', reason: 'Check the takeout.' }, river: { safetyProfile: { hazards: ['strainers'] } } } as RiverSummaryApiItem;
    expect(savedRouteSnapshot(item)).toMatchObject({ score: 78, gauge: { value: 1250, unit: 'cfs' }, cautions: ['Check the takeout.', 'Strainers'] });
    expect(savedRouteSnapshot({ ...item, liveData: { ...item.liveData, overall: 'offline' } })).toBeNull();
    expect(savedRouteSnapshot({ ...item, readiness: { ...item.readiness, status: 'withheld' } })?.score).toBeNull();
  });
  it('keeps the newest baseline and resets a newly saved route', () => {
    const snapshots = { route: { savedAt: 'original', snapshot: current } };
    advanceSavedRouteSnapshot(snapshots, 'route', 'original', previous);
    expect(snapshots.route.snapshot).toEqual(current);
    advanceSavedRouteSnapshot(snapshots, 'route', 'resaved', previous);
    expect(snapshots.route).toEqual({ savedAt: 'resaved', snapshot: previous });
  });
  it('ignores corrupt persisted entries', () => {
    expect(parseSavedRouteSnapshots('broken')).toEqual({});
    const raw = JSON.stringify({ version: 1, routes: { valid: { savedAt: 'a', snapshot: previous }, bad: { savedAt: 'b', snapshot: { ...previous, gauge: { value: '600', unit: 'cfs' } } } } });
    expect(Object.keys(parseSavedRouteSnapshots(raw))).toEqual(['valid']);
  });
});
