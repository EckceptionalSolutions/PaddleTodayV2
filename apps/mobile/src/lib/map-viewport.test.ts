import { describe, expect, it } from 'vitest';
import type { RoutePlotPoint } from '../components/route-plot-map-model';
import { clusterFocusRegion, individualRoutesAtZoom, isMapCluster, mapViewportPoints } from './map-viewport';

const region = { latitude: 45, longitude: -93, latitudeDelta: 4, longitudeDelta: 4 };
const point = (id: string, latitude = 45, longitude = -93): RoutePlotPoint => ({ id, label: id, latitude, longitude });
const memberIds = (points: RoutePlotPoint[]) => points.flatMap((point) => isMapCluster(point) ? point.members.map((member) => member.id) : [point.id]).sort();

describe('Native map viewport rendering', () => {
  it('bounds dense marker work by screen area while retaining every in-view location', () => {
    const points = Array.from({ length: 5000 }, (_, index) => point(String(index), 43.1 + (index % 100) * 0.038, -94.9 + Math.floor(index / 100) * 0.076));
    const rendered = mapViewportPoints(points, region, 390, 844);
    expect(rendered.length).toBeLessThan(120);
    expect(memberIds(rendered)).toEqual(points.map((point) => point.id).sort());
    expect(new Set(rendered.map((point) => point.id)).size).toBe(rendered.length);
  });

  it('culls offscreen locations, keeps a pan margin and reveals routes outside the old top-200 limit', () => {
    const points = [point('near-edge', 47.5), point('distant', 55), point('invalid', NaN), point('rank-999', 55.1)];
    expect(memberIds(mapViewportPoints(points, region, 390, 844))).toEqual(['near-edge']);
    expect(memberIds(mapViewportPoints(points, { ...region, latitude: 55 }, 390, 844))).toEqual(['distant', 'rank-999']);
  });

  it('preserves singleton references and cluster identities through small pans and input ordering', () => {
    const points = [point('a'), point('b', 45.001), point('c', 46.5, -91.5)];
    const before = mapViewportPoints(points, region, 390, 844);
    const after = mapViewportPoints([...points].reverse(), { ...region, latitude: 45.01, longitude: -93.01 }, 390, 844);
    expect(after.map((point) => point.id).sort()).toEqual(before.map((point) => point.id).sort());
    expect(before.find((point) => point.id === 'c')).toBe(points[2]);
  });

  it('handles wrapped longitudes without placing date-line clusters across the world', () => {
    const points = [point('west', 0, 179.9), point('east', 0, -179.9), point('far', 0, 0)];
    const rendered = mapViewportPoints(points, { latitude: 0, longitude: 180, latitudeDelta: 20, longitudeDelta: 20 }, 390, 844);
    expect(memberIds(rendered)).toEqual(['east', 'west']);
    expect(rendered.every((point) => Math.abs(point.longitude) > 179)).toBe(true);
  });

  it('zooms co-located routes with finite deltas and handles invalid viewport input', () => {
    const cluster = mapViewportPoints([point('a'), point('b')], region, 390, 844)[0];
    expect(isMapCluster(cluster)).toBe(true);
    if (!isMapCluster(cluster)) throw new Error('Expected cluster');
    expect(clusterFocusRegion(cluster, region)).toEqual({ latitude: 45, longitude: -93, latitudeDelta: 4 / 3, longitudeDelta: 4 / 3 });
    expect(mapViewportPoints([point('a')], { ...region, latitudeDelta: 0 }, 390, 844)).toEqual([]);
    expect(mapViewportPoints([point('a')], region, 0, 844)).toEqual([]);
  });

  it('avoids repeatedly replacing zone markers near the zoom threshold', () => {
    expect(individualRoutesAtZoom(false, 8.6)).toBe(false);
    expect(individualRoutesAtZoom(false, 8.8)).toBe(true);
    expect(individualRoutesAtZoom(true, 8.3)).toBe(true);
    expect(individualRoutesAtZoom(true, 8.1)).toBe(false);
    expect(individualRoutesAtZoom(true, NaN)).toBe(true);
  });
});
