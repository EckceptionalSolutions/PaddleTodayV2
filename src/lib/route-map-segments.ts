export interface RouteMapCoordinate {
  latitude: number;
  longitude: number;
}

export interface RouteMapSpan {
  slug: string;
  rating?: string | null;
  coordinates: RouteMapCoordinate[];
}

export interface RouteMapSegment {
  key: string;
  rating?: string | null;
  selected: boolean;
  coordinates: [RouteMapCoordinate, RouteMapCoordinate];
}

interface CandidateSegment extends RouteMapSegment {
  startKey: string;
  endKey: string;
  distanceSquared: number;
}

const COORDINATE_PRECISION = 6;

/**
 * Builds a minimal visual network for a group of overlapping route variants.
 *
 * A river group can contain A-B, B-C, and A-C trips. Drawing all three as
 * endpoint chords creates a misleading triangle. A minimum spanning forest
 * retains the adjacent A-B and B-C legs, while the selected A-C trip is
 * highlighted along the retained path between A and C.
 */
export function buildRouteMapSegments(
  routes: RouteMapSpan[],
  selectedSlug: string | null | undefined
): RouteMapSegment[] {
  const candidates = collectCandidateSegments(routes);
  const retained = minimumSpanningForest(candidates);
  const selectedRoute = routes.find((route) => route.slug === selectedSlug);
  const selectedEdgeKeys = selectedRoute
    ? pathEdgeKeys(
        retained,
        coordinateKey(selectedRoute.coordinates[0]),
        coordinateKey(selectedRoute.coordinates.at(-1))
      )
    : new Set<string>();

  return retained.map((segment) => ({
    key: segment.key,
    rating: selectedEdgeKeys.has(segment.key) ? selectedRoute?.rating : segment.rating,
    selected: selectedEdgeKeys.has(segment.key),
    coordinates: segment.coordinates,
  }));
}

function collectCandidateSegments(routes: RouteMapSpan[]): CandidateSegment[] {
  const byKey = new Map<string, CandidateSegment>();

  for (const route of routes) {
    const coordinates = route.coordinates.filter(isFiniteCoordinate);
    for (let index = 1; index < coordinates.length; index += 1) {
      const start = coordinates[index - 1];
      const end = coordinates[index];
      if (!start || !end) continue;

      const startKey = coordinateKey(start);
      const endKey = coordinateKey(end);
      if (!startKey || !endKey || startKey === endKey) continue;

      const key = edgeKey(startKey, endKey);
      const existing = byKey.get(key);
      if (existing) continue;

      byKey.set(key, {
        key,
        startKey,
        endKey,
        rating: route.rating,
        selected: false,
        coordinates: [start, end],
        distanceSquared:
          (start.latitude - end.latitude) ** 2 +
          (start.longitude - end.longitude) ** 2,
      });
    }
  }

  return [...byKey.values()];
}

function minimumSpanningForest(segments: CandidateSegment[]): CandidateSegment[] {
  const parents = new Map<string, string>();

  function find(key: string): string {
    const parent = parents.get(key);
    if (!parent) {
      parents.set(key, key);
      return key;
    }
    if (parent === key) return key;
    const root = find(parent);
    parents.set(key, root);
    return root;
  }

  const retained: CandidateSegment[] = [];
  const sorted = [...segments].sort(
    (left, right) => left.distanceSquared - right.distanceSquared || left.key.localeCompare(right.key)
  );

  for (const segment of sorted) {
    const startRoot = find(segment.startKey);
    const endRoot = find(segment.endKey);
    if (startRoot === endRoot) continue;

    parents.set(startRoot, endRoot);
    retained.push(segment);
  }

  return retained;
}

function pathEdgeKeys(
  segments: CandidateSegment[],
  startKey: string | null,
  endKey: string | null
): Set<string> {
  if (!startKey || !endKey || startKey === endKey) return new Set();

  const adjacency = new Map<string, Array<{ nodeKey: string; edgeKey: string }>>();
  for (const segment of segments) {
    addNeighbor(adjacency, segment.startKey, segment.endKey, segment.key);
    addNeighbor(adjacency, segment.endKey, segment.startKey, segment.key);
  }

  const queue = [startKey];
  const visited = new Set([startKey]);
  const previous = new Map<string, { nodeKey: string; edgeKey: string }>();

  while (queue.length > 0) {
    const nodeKey = queue.shift();
    if (!nodeKey || nodeKey === endKey) break;

    for (const neighbor of adjacency.get(nodeKey) ?? []) {
      if (visited.has(neighbor.nodeKey)) continue;
      visited.add(neighbor.nodeKey);
      previous.set(neighbor.nodeKey, { nodeKey, edgeKey: neighbor.edgeKey });
      queue.push(neighbor.nodeKey);
    }
  }

  if (!visited.has(endKey)) return new Set();

  const result = new Set<string>();
  let currentKey = endKey;
  while (currentKey !== startKey) {
    const step = previous.get(currentKey);
    if (!step) return new Set();
    result.add(step.edgeKey);
    currentKey = step.nodeKey;
  }
  return result;
}

function addNeighbor(
  adjacency: Map<string, Array<{ nodeKey: string; edgeKey: string }>>,
  nodeKey: string,
  neighborKey: string,
  segmentKey: string
) {
  const neighbors = adjacency.get(nodeKey) ?? [];
  neighbors.push({ nodeKey: neighborKey, edgeKey: segmentKey });
  adjacency.set(nodeKey, neighbors);
}

function isFiniteCoordinate(coordinate: RouteMapCoordinate | undefined): coordinate is RouteMapCoordinate {
  return Boolean(
    coordinate && Number.isFinite(coordinate.latitude) && Number.isFinite(coordinate.longitude)
  );
}

function coordinateKey(coordinate: RouteMapCoordinate | undefined): string | null {
  if (!isFiniteCoordinate(coordinate)) return null;
  return `${coordinate.latitude.toFixed(COORDINATE_PRECISION)},${coordinate.longitude.toFixed(COORDINATE_PRECISION)}`;
}

function edgeKey(startKey: string, endKey: string) {
  return startKey < endKey ? `${startKey}|${endKey}` : `${endKey}|${startKey}`;
}
