export type Coordinate = [longitude: number, latitude: number];

export interface GeoPoint {
  longitude: number;
  latitude: number;
}

export interface SnappedLine {
  coordinates: Coordinate[];
  errorSquared: number;
}

export interface WeightedNetworkLine {
  coordinates: readonly (readonly number[])[];
  costMultiplier?: number;
}

export interface SnappedNetworkLine extends SnappedLine {
  sourceLineIndexes: number[];
  snapDistancesSquared: number[];
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

type NetworkNode = {
  coordinate: Coordinate;
  edges: number[];
};

type NetworkEdge = {
  a: number;
  b: number;
  length: number;
  cost: number;
  lineIndex: number;
};

type NetworkProjection = {
  coordinate: Coordinate;
  component: number;
  distanceSquared: number;
  edgeIndex: number;
  t: number;
};

function networkCoordinateKey(coordinate: Coordinate) {
  return `${coordinate[0].toFixed(6)},${coordinate[1].toFixed(6)}`;
}

function buildNetwork(lines: readonly WeightedNetworkLine[]) {
  const nodes: NetworkNode[] = [];
  const edges: NetworkEdge[] = [];
  const nodeByKey = new Map<string, number>();
  const parent: number[] = [];

  const nodeIndex = (coordinate: Coordinate) => {
    const key = networkCoordinateKey(coordinate);
    const existing = nodeByKey.get(key);
    if (existing !== undefined) return existing;
    const index = nodes.length;
    nodes.push({ coordinate, edges: [] });
    parent.push(index);
    nodeByKey.set(key, index);
    return index;
  };
  const find = (index: number): number => {
    let current = index;
    while (parent[current] !== current) current = parent[current];
    while (parent[index] !== index) {
      const next = parent[index];
      parent[index] = current;
      index = next;
    }
    return current;
  };
  const union = (left: number, right: number) => {
    const leftRoot = find(left);
    const rightRoot = find(right);
    if (leftRoot !== rightRoot) parent[rightRoot] = leftRoot;
  };

  lines.forEach((lineInput, lineIndex) => {
    const line = dedupeLine(lineInput.coordinates);
    if (!line) return;
    const multiplier = Number.isFinite(lineInput.costMultiplier)
      ? Math.max(0.01, Number(lineInput.costMultiplier))
      : 1;
    for (let index = 1; index < line.length; index += 1) {
      const start = line[index - 1];
      const end = line[index];
      const a = nodeIndex(start);
      const b = nodeIndex(end);
      if (a === b) continue;
      const referenceLatitude = (start[1] + end[1]) / 2;
      const projectedStart = projectedPoint(start, referenceLatitude);
      const projectedEnd = projectedPoint(end, referenceLatitude);
      const length = Math.hypot(projectedEnd.x - projectedStart.x, projectedEnd.y - projectedStart.y);
      if (!Number.isFinite(length) || length <= 0) continue;
      const edgeIndex = edges.length;
      edges.push({ a, b, length, cost: length * multiplier, lineIndex });
      nodes[a].edges.push(edgeIndex);
      nodes[b].edges.push(edgeIndex);
      union(a, b);
    }
  });

  const components = nodes.map((_, index) => find(index));
  return { nodes, edges, components };
}

function networkProjections(
  point: GeoPoint,
  network: ReturnType<typeof buildNetwork>,
) {
  const bestByComponent = new Map<number, NetworkProjection>();
  const pointCoordinate = coordinateForPoint(point);
  network.edges.forEach((edge, edgeIndex) => {
    const start = network.nodes[edge.a].coordinate;
    const end = network.nodes[edge.b].coordinate;
    const referenceLatitude = (start[1] + end[1] + point.latitude) / 3;
    const projection = distanceToSegmentSquared(
      projectedPoint(pointCoordinate, referenceLatitude),
      projectedPoint(start, referenceLatitude),
      projectedPoint(end, referenceLatitude),
    );
    const coordinate: Coordinate = [
      start[0] + (end[0] - start[0]) * projection.t,
      start[1] + (end[1] - start[1]) * projection.t,
    ];
    const component = network.components[edge.a];
    const candidate: NetworkProjection = {
      coordinate,
      component,
      distanceSquared: projection.distanceSquared,
      edgeIndex,
      t: projection.t,
    };
    const existing = bestByComponent.get(component);
    if (!existing || candidate.distanceSquared < existing.distanceSquared) {
      bestByComponent.set(component, candidate);
    }
  });
  return bestByComponent;
}

function shortestNetworkSection(
  network: ReturnType<typeof buildNetwork>,
  start: NetworkProjection,
  end: NetworkProjection,
) {
  const startEdge = network.edges[start.edgeIndex];
  const endEdge = network.edges[end.edgeIndex];
  if (!startEdge || !endEdge || start.component !== end.component) return null;

  const distances = new Array<number>(network.nodes.length).fill(Infinity);
  const previousNode = new Array<number>(network.nodes.length).fill(-1);
  const previousEdge = new Array<number>(network.nodes.length).fill(-1);
  const queue: Array<{ node: number; distance: number }> = [];
  const queuePush = (entry: { node: number; distance: number }) => {
    queue.push(entry);
    let index = queue.length - 1;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (queue[parent].distance <= queue[index].distance) break;
      [queue[parent], queue[index]] = [queue[index], queue[parent]];
      index = parent;
    }
  };
  const queuePop = () => {
    const first = queue[0];
    const last = queue.pop();
    if (!first || !last || queue.length === 0) return first;
    queue[0] = last;
    let index = 0;
    while (true) {
      const left = index * 2 + 1;
      const right = left + 1;
      let smallest = index;
      if (left < queue.length && queue[left].distance < queue[smallest].distance) smallest = left;
      if (right < queue.length && queue[right].distance < queue[smallest].distance) smallest = right;
      if (smallest === index) break;
      [queue[index], queue[smallest]] = [queue[smallest], queue[index]];
      index = smallest;
    }
    return first;
  };
  distances[startEdge.a] = startEdge.cost * start.t;
  distances[startEdge.b] = startEdge.cost * (1 - start.t);
  queuePush({ node: startEdge.a, distance: distances[startEdge.a] });
  queuePush({ node: startEdge.b, distance: distances[startEdge.b] });

  while (queue.length > 0) {
    const currentEntry = queuePop();
    if (!currentEntry || currentEntry.distance !== distances[currentEntry.node]) continue;
    const current = currentEntry.node;
    const currentDistance = currentEntry.distance;
    for (const edgeIndex of network.nodes[current].edges) {
      const edge = network.edges[edgeIndex];
      const next = edge.a === current ? edge.b : edge.a;
      const candidate = currentDistance + edge.cost;
      if (candidate < distances[next]) {
        distances[next] = candidate;
        previousNode[next] = current;
        previousEdge[next] = edgeIndex;
        queuePush({ node: next, distance: candidate });
      }
    }
  }

  const targets = [
    { node: endEdge.a, cost: distances[endEdge.a] + endEdge.cost * end.t },
    { node: endEdge.b, cost: distances[endEdge.b] + endEdge.cost * (1 - end.t) },
  ];
  let selected = targets[0].cost <= targets[1].cost ? targets[0] : targets[1];
  const directCost = start.edgeIndex === end.edgeIndex
    ? Math.abs(start.t - end.t) * startEdge.cost
    : Infinity;
  if (directCost <= selected.cost) {
    return {
      coordinates: dedupeLine([start.coordinate, end.coordinate]) ?? [],
      sourceLineIndexes: [startEdge.lineIndex],
    };
  }

  const nodeIndexes: number[] = [];
  const sourceLineIndexes = new Set<number>([startEdge.lineIndex, endEdge.lineIndex]);
  let current = selected.node;
  while (current >= 0) {
    nodeIndexes.push(current);
    const edgeIndex = previousEdge[current];
    if (edgeIndex >= 0) sourceLineIndexes.add(network.edges[edgeIndex].lineIndex);
    current = previousNode[current];
  }
  nodeIndexes.reverse();
  const coordinates = dedupeLine([
    start.coordinate,
    ...nodeIndexes.map((nodeIndex) => network.nodes[nodeIndex].coordinate),
    end.coordinate,
  ]) ?? [];
  return { coordinates, sourceLineIndexes: [...sourceLineIndexes] };
}

/**
 * Trace an ordered set of access points over a connected hydrography network.
 * Edge cost multipliers allow callers to prefer visible stream channels over
 * artificial centerlines while retaining those centerlines through water areas.
 */
export function endpointSnappedRiverNetwork(
  lines: readonly WeightedNetworkLine[],
  routePoints: readonly GeoPoint[],
  options: { maxSnapDistanceMiles?: number } = {},
): SnappedNetworkLine | null {
  if (!Array.isArray(lines) || lines.length === 0 || !Array.isArray(routePoints) || routePoints.length < 2) return null;
  if (!routePoints.every(isGeoPoint)) return null;
  const network = buildNetwork(lines);
  if (network.edges.length === 0) return null;
  const projections = routePoints.map((point) => networkProjections(point, network));
  const maxSnapDistanceSquared = Number.isFinite(options.maxSnapDistanceMiles)
    ? (Math.max(0, Number(options.maxSnapDistanceMiles)) / 69) ** 2
    : Infinity;
  const commonComponents = [...projections[0].keys()].filter((component) =>
    projections.every((byComponent) => {
      const projection = byComponent.get(component);
      return projection && projection.distanceSquared <= maxSnapDistanceSquared;
    }),
  );
  if (commonComponents.length === 0) return null;
  const component = commonComponents.reduce((best, candidate) => {
    const score = projections.reduce((sum, byComponent) => sum + byComponent.get(candidate)!.distanceSquared, 0);
    const bestScore = projections.reduce((sum, byComponent) => sum + byComponent.get(best)!.distanceSquared, 0);
    return score < bestScore ? candidate : best;
  });
  const selectedProjections = projections.map((byComponent) => byComponent.get(component)!);
  const coordinates: Coordinate[] = [];
  const sourceLineIndexes = new Set<number>();
  for (let index = 1; index < selectedProjections.length; index += 1) {
    const section = shortestNetworkSection(network, selectedProjections[index - 1], selectedProjections[index]);
    if (!section || section.coordinates.length < 2) return null;
    const sectionCoordinates = index === 1 ? section.coordinates : section.coordinates.slice(1);
    coordinates.push(...sectionCoordinates);
    section.sourceLineIndexes.forEach((lineIndex) => sourceLineIndexes.add(lineIndex));
  }
  const deduped = dedupeLine(coordinates);
  if (!deduped) return null;
  const snapDistancesSquared = selectedProjections.map((projection) => projection.distanceSquared);
  return {
    coordinates: deduped,
    errorSquared: snapDistancesSquared.reduce((sum, distance) => sum + distance, 0) / snapDistancesSquared.length,
    sourceLineIndexes: [...sourceLineIndexes],
    snapDistancesSquared,
  };
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
