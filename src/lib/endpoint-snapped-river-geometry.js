function projectedPoint(coordinate, referenceLatitude) {
  const latitudeScale = Math.cos((referenceLatitude * Math.PI) / 180);
  return { x: coordinate[0] * latitudeScale, y: coordinate[1] };
}

function distanceToSegmentSquared(point, start, end) {
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

function lineMeasurements(line) {
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

function nearestMeasure(line, measurements, target) {
  if (!Number.isFinite(target?.longitude) || !Number.isFinite(target?.latitude)) return null;
  const targetCoordinate = [target.longitude, target.latitude];
  let best = null;

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

function coordinateAtMeasure(line, measurements, measure) {
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

function sliceLine(line, measurements, startMeasure, endMeasure) {
  const low = Math.max(0, Math.min(startMeasure, endMeasure));
  const high = Math.min(measurements[measurements.length - 1], Math.max(startMeasure, endMeasure));
  if (!Number.isFinite(low) || !Number.isFinite(high) || high <= low) return [];

  const sliced = [coordinateAtMeasure(line, measurements, low)];
  for (let index = 1; index < line.length - 1; index += 1) {
    if (measurements[index] > low && measurements[index] < high) sliced.push(line[index]);
  }
  sliced.push(coordinateAtMeasure(line, measurements, high));
  return sliced.filter((coordinate, index, coordinates) => {
    const previous = coordinates[index - 1];
    return !previous || previous[0] !== coordinate[0] || previous[1] !== coordinate[1];
  });
}

/**
 * Projects route access points onto a river line and returns only the line
 * section between them. This is deliberately independent of map zoom or tile
 * boundaries so callers can use the same bounded geometry for route and
 * supported-river rendering.
 */
export function endpointSnappedRiverLine(line, routePoints) {
  if (!Array.isArray(line) || line.length < 2 || !Array.isArray(routePoints) || routePoints.length < 2) {
    return null;
  }

  const measurements = lineMeasurements(line);
  const projected = routePoints.map((point) => nearestMeasure(line, measurements, point)).filter(Boolean);
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

export function endpointSnappedRiverGeometry(lines, routePoints) {
  let best = null;
  for (const line of lines || []) {
    const candidate = endpointSnappedRiverLine(line, routePoints);
    if (candidate && (!best || candidate.errorSquared < best.errorSquared)) best = candidate;
  }
  return best;
}

function coordinateDistanceSquared(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right)) return Number.POSITIVE_INFINITY;
  const latitudeScale = Math.cos((((left[1] || 0) + (right[1] || 0)) * Math.PI) / 360);
  const dx = (left[0] - right[0]) * latitudeScale;
  const dy = left[1] - right[1];
  return dx * dx + dy * dy;
}

function dedupeLine(line) {
  const coordinates = [];
  for (const coordinate of line || []) {
    if (!Array.isArray(coordinate) || coordinate.length < 2) continue;
    const normalized = [Number(coordinate[0]), Number(coordinate[1])];
    if (!Number.isFinite(normalized[0]) || !Number.isFinite(normalized[1])) continue;
    const previous = coordinates.at(-1);
    if (!previous || previous[0] !== normalized[0] || previous[1] !== normalized[1]) coordinates.push(normalized);
  }
  return coordinates.length >= 2 ? coordinates : null;
}

function lineFingerprint(line) {
  return line.map((coordinate) => coordinate.map((value) => value.toFixed(6)).join(',')).join(';');
}

/** Merge line pieces split at nearby tile/NHD boundaries. */
export function stitchRiverLines(lines, tolerance = 0.0025) {
  const fingerprints = new Set();
  const chains = (lines || [])
    .map(dedupeLine)
    .filter(Boolean)
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
        const leftEnd = left.at(-1);
        const rightStart = right[0];
        const rightEnd = right.at(-1);
        let combined = null;

        if (coordinateDistanceSquared(leftEnd, rightStart) <= toleranceSquared) {
          combined = [...left, ...right.slice(1)];
        } else if (coordinateDistanceSquared(leftEnd, rightEnd) <= toleranceSquared) {
          combined = [...left, ...[...right].reverse().slice(1)];
        } else if (coordinateDistanceSquared(leftStart, rightEnd) <= toleranceSquared) {
          combined = [...right, ...left.slice(1)];
        } else if (coordinateDistanceSquared(leftStart, rightStart) <= toleranceSquared) {
          combined = [[...right].reverse(), ...left.slice(1)];
        }

        if (combined) {
          chains[leftIndex] = dedupeLine(combined);
          chains.splice(rightIndex, 1);
          merged = true;
          break outer;
        }
      }
    }
  }

  return chains.filter(Boolean);
}
