export type Coordinate = [longitude: number, latitude: number];

export interface GeoPoint {
  longitude: number;
  latitude: number;
}

export interface SnappedLine {
  coordinates: Coordinate[];
  errorSquared: number;
}

function projectedPoint(coordinate: Coordinate, referenceLatitude: number) {
  const latitudeScale = Math.cos((referenceLatitude * Math.PI) / 180);
  return { x: coordinate[0] * latitudeScale, y: coordinate[1] };
}

function distanceToSegmentSquared(
  point: { x: number; y: number },
  start: { x: number; y: number },
  end: { x: number; y: number },
) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0) {
    const pointDx = point.x - start.x;
    const pointDy = point.y - start.y;
    return { distanceSquared: pointDx * pointDx + pointDy * pointDy, t: 0 };
  }

  const rawT = ((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared;
  const t = Math.max(0, Math.min(1, rawT));
  const closest = { x: start.x + dx * t, y: start.y + dy * t };
  const closestDx = point.x - closest.x;
  const closestDy = point.y - closest.y;
  return { distanceSquared: closestDx * closestDx + closestDy * closestDy, t };
}

function lineMeasurements(line: Coordinate[]) {
  const measurements = [0];
  let total = 0;
  for (let index = 1; index < line.length; index += 1) {
    const previous = line[index - 1];
    const current = line[index];
    const referenceLatitude = (previous[1] + current[1]) / 2;
    const start = projectedPoint(previous, referenceLatitude);
    const end = projectedPoint(current, referenceLatitude);
    total += Math.hypot(end.x - start.x, end.y - start.y);
    measurements.push(total);
  }
  return measurements;
}

function nearestMeasure(line: Coordinate[], measurements: number[], target: GeoPoint) {
  if (!isGeoPoint(target)) return null;
  const targetCoordinate: Coordinate = [target.longitude, target.latitude];
  let best: { distanceSquared: number; measure: number } | null = null;

  for (let index = 1; index < line.length; index += 1) {
    const previous = line[index - 1];
    const current = line[index];
    const referenceLatitude = (previous[1] + current[1] + targetCoordinate[1]) / 3;
    const result = distanceToSegmentSquared(
      projectedPoint(targetCoordinate, referenceLatitude),
      projectedPoint(previous, referenceLatitude),
      projectedPoint(current, referenceLatitude),
    );
    const segmentLength = measurements[index] - measurements[index - 1];
    const measure = measurements[index - 1] + segmentLength * result.t;
    if (!best || result.distanceSquared < best.distanceSquared) {
      best = { distanceSquared: result.distanceSquared, measure };
    }
  }
  return best;
}

function coordinateAtMeasure(line: Coordinate[], measurements: number[], measure: number): Coordinate {
  if (measure <= 0) return line[0];
  const total = measurements[measurements.length - 1];
  if (measure >= total) return line[line.length - 1];

  for (let index = 1; index < measurements.length; index += 1) {
    if (measure > measurements[index]) continue;
    const startMeasure = measurements[index - 1];
    const endMeasure = measurements[index];
    const span = endMeasure - startMeasure;
    const ratio = span === 0 ? 0 : (measure - startMeasure) / span;
    const start = line[index - 1];
    const end = line[index];
    return [start[0] + (end[0] - start[0]) * ratio, start[1] + (end[1] - start[1]) * ratio];
  }
  return line[line.length - 1];
}

function sliceLine(line: Coordinate[], measurements: number[], startMeasure: number, endMeasure: number) {
  const low = Math.max(0, Math.min(startMeasure, endMeasure));
  const high = Math.min(measurements[measurements.length - 1], Math.max(startMeasure, endMeasure));
  if (!Number.isFinite(low) || !Number.isFinite(high) || high <= low) return [];

  const sliced = [coordinateAtMeasure(line, measurements, low)];
  for (let index = 1; index < line.length - 1; index += 1) {
    if (measurements[index] > low && measurements[index] < high) sliced.push(line[index]);
  }
  sliced.push(coordinateAtMeasure(line, measurements, high));
  return dedupeLine(sliced) ?? [];
}

export function isGeoPoint(value: unknown): value is GeoPoint {
  if (!value || typeof value !== 'object') return false;
  const point = value as Partial<GeoPoint>;
  return Number.isFinite(point.longitude) && Number.isFinite(point.latitude);
}

export function coordinateForPoint(point: GeoPoint): Coordinate {
  return [point.longitude, point.latitude];
}

export function pointForCoordinate(coordinate: Coordinate): GeoPoint {
  return { longitude: coordinate[0], latitude: coordinate[1] };
}

export function dedupeLine(line: readonly (readonly number[])[]): Coordinate[] | null {
  const coordinates: Coordinate[] = [];
  for (const coordinate of line) {
    if (!Array.isArray(coordinate) || coordinate.length < 2) continue;
    const normalized: Coordinate = [Number(coordinate[0]), Number(coordinate[1])];
    if (!Number.isFinite(normalized[0]) || !Number.isFinite(normalized[1])) continue;
    const previous = coordinates.at(-1);
    if (!previous || previous[0] !== normalized[0] || previous[1] !== normalized[1]) {
      coordinates.push(normalized);
    }
  }
  return coordinates.length >= 2 ? coordinates : null;
}

export function lineFingerprint(line: Coordinate[]) {
  return line.map((coordinate) => coordinate.map((value) => value.toFixed(6)).join(',')).join(';');
}

export function endpointSnappedRiverLine(
  lineInput: readonly (readonly number[])[],
  routePoints: readonly GeoPoint[],
): SnappedLine | null {
  const line = dedupeLine(lineInput);
  if (!line || !Array.isArray(routePoints) || routePoints.length < 2) return null;

  const measurements = lineMeasurements(line);
  const projected = routePoints
    .map((point) => nearestMeasure(line, measurements, point))
    .filter((point): point is { distanceSquared: number; measure: number } => point !== null);
  if (projected.length < 2) return null;

  const coordinates = sliceLine(
    line,
    measurements,
    Math.min(...projected.map((point) => point.measure)),
    Math.max(...projected.map((point) => point.measure)),
  );
  if (coordinates.length < 2) return null;

  return {
    coordinates,
    errorSquared: projected.reduce((sum, point) => sum + point.distanceSquared, 0) / projected.length,
  };
}

export function endpointSnappedRiverGeometry(
  lines: readonly (readonly (readonly number[])[])[],
  routePoints: readonly GeoPoint[],
): SnappedLine | null {
  let best: SnappedLine | null = null;
  for (const line of lines || []) {
    const candidate = endpointSnappedRiverLine(line, routePoints);
    if (candidate && (!best || candidate.errorSquared < best.errorSquared)) best = candidate;
  }
  return best;
}

function coordinateDistanceSquared(left: Coordinate, right: Coordinate) {
  const latitudeScale = Math.cos((((left[1] || 0) + (right[1] || 0)) * Math.PI) / 360);
  const dx = (left[0] - right[0]) * latitudeScale;
  const dy = left[1] - right[1];
  return dx * dx + dy * dy;
}

/** Merge line pieces split at nearby tile or source boundaries. */
export function stitchRiverLines(
  lines: readonly (readonly (readonly number[])[])[],
  tolerance = 0.0025,
): Coordinate[][] {
  const fingerprints = new Set<string>();
  const chains = (lines || [])
    .map(dedupeLine)
    .filter((line): line is Coordinate[] => line !== null)
    .filter((line) => {
      const forward = lineFingerprint(line);
      const reverse = lineFingerprint([...line].reverse());
      if (fingerprints.has(forward) || fingerprints.has(reverse)) return false;
      fingerprints.add(forward);
      return true;
    })
    .map((line) => [...line]);
  let merged = true;
  const toleranceSquared = tolerance * tolerance;

  while (merged && chains.length > 1) {
    merged = false;
    outer: for (let leftIndex = 0; leftIndex < chains.length; leftIndex += 1) {
      const left = chains[leftIndex];
      for (let rightIndex = leftIndex + 1; rightIndex < chains.length; rightIndex += 1) {
        const right = chains[rightIndex];
        const leftStart = left[0];
        const leftEnd = left.at(-1)!;
        const rightStart = right[0];
        const rightEnd = right.at(-1)!;
        let combined: Coordinate[] | null = null;

        if (coordinateDistanceSquared(leftEnd, rightStart) <= toleranceSquared) {
          combined = [...left, ...right.slice(1)];
        } else if (coordinateDistanceSquared(leftEnd, rightEnd) <= toleranceSquared) {
          combined = [...left, ...[...right].reverse().slice(1)];
        } else if (coordinateDistanceSquared(leftStart, rightEnd) <= toleranceSquared) {
          combined = [...right, ...left.slice(1)];
        } else if (coordinateDistanceSquared(leftStart, rightStart) <= toleranceSquared) {
          combined = [...right].reverse().concat(left.slice(1));
        }

        if (combined) {
          const deduped = dedupeLine(combined);
          if (!deduped) continue;
          chains[leftIndex] = deduped;
          chains.splice(rightIndex, 1);
          merged = true;
          break outer;
        }
      }
    }
  }

  return chains;
}

/** Average each route span first so long routes do not outweigh short routes. */
export function coverageCenter(routePointGroups: readonly (readonly GeoPoint[])[]): GeoPoint | null {
  const routeCenters = routePointGroups
    .map((points) => points.filter(isGeoPoint))
    .filter((points) => points.length > 0)
    .map((points) => ({
      longitude: points.reduce((sum, point) => sum + point.longitude, 0) / points.length,
      latitude: points.reduce((sum, point) => sum + point.latitude, 0) / points.length,
    }));

  if (routeCenters.length === 0) return null;
  return {
    longitude: routeCenters.reduce((sum, point) => sum + point.longitude, 0) / routeCenters.length,
    latitude: routeCenters.reduce((sum, point) => sum + point.latitude, 0) / routeCenters.length,
  };
}

/** Project a point onto the closest segment of one or more lines. */
export function nearestPointOnLines(target: GeoPoint, lines: readonly Coordinate[][]): GeoPoint | null {
  if (!isGeoPoint(target)) return null;
  let best: (GeoPoint & { distanceSquared: number }) | null = null;

  for (const line of lines) {
    for (let index = 1; index < line.length; index += 1) {
      const start = line[index - 1];
      const end = line[index];
      const referenceLatitude = target.latitude;
      const projected = distanceToSegmentSquared(
        projectedPoint(coordinateForPoint(target), referenceLatitude),
        projectedPoint(start, referenceLatitude),
        projectedPoint(end, referenceLatitude),
      );
      const longitude = start[0] + (end[0] - start[0]) * projected.t;
      const latitude = start[1] + (end[1] - start[1]) * projected.t;
      const candidate = { longitude, latitude, distanceSquared: projected.distanceSquared };
      if (!best || candidate.distanceSquared < best.distanceSquared) best = candidate;
    }
  }

  return best ? { longitude: best.longitude, latitude: best.latitude } : null;
}
