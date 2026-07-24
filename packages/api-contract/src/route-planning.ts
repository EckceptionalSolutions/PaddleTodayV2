import type { CampingClassification, RiverAccessPoint, RiverRouteAccessPoint } from './index';

export type PaddleLengthFilter = 'under-5' | '5-to-10' | '10-plus' | '';
export type PaddleTimeFilter = 'up-to-3' | '3-to-5' | '5-to-7' | '7-plus' | '';

export interface RoutePlanningRiver {
  putIn?: RiverAccessPoint;
  takeOut?: RiverAccessPoint;
  accessPoints?: RiverRouteAccessPoint[];
  distanceLabel?: string;
  estimatedPaddleTime?: string;
  logistics?: {
    distanceLabel?: string;
    estimatedPaddleTime?: string;
    campingClassification?: CampingClassification;
  };
}

export interface RouteSegment {
  putIn: RiverRouteAccessPoint;
  takeOut: RiverRouteAccessPoint;
  distanceMiles: number;
  estimatedHours: {
    min: number;
    max: number;
  };
  segmentKind: RiverRouteAccessPoint['segmentKind'];
}

export interface RouteSegmentSummary {
  segments: RouteSegment[];
  shortestDistanceMiles: number;
  longestDistanceMiles: number;
  fullDistanceMiles: number;
}

export interface SegmentFilterSelection {
  paddleLength?: PaddleLengthFilter | null;
  paddleTime?: PaddleTimeFilter | PaddleTimeFilter[] | null;
}

const PADDLE_TIME_RANGES: Record<Exclude<PaddleTimeFilter, ''>, { min: number; max: number }> = {
  'up-to-3': { min: 0, max: 3 },
  '3-to-5': { min: 3, max: 5 },
  '5-to-7': { min: 5, max: 7 },
  '7-plus': { min: 7, max: Number.POSITIVE_INFINITY },
};

const PADDLE_LENGTH_RANGES: Record<Exclude<PaddleLengthFilter, ''>, { min: number; max: number }> = {
  'under-5': { min: 0, max: 5 },
  '5-to-10': { min: 5, max: 10 },
  '10-plus': { min: 10, max: Number.POSITIVE_INFINITY },
};

function accessPointKey(point: RiverAccessPoint) {
  return point.id || `${point.name}:${point.latitude}:${point.longitude}`;
}

function asRouteAccessPoint(
  point: RiverAccessPoint,
  mileFromStart: number,
  fallbackKind: RiverRouteAccessPoint['segmentKind'],
): RiverRouteAccessPoint {
  return {
    id: point.id || accessPointKey(point),
    name: point.name,
    latitude: point.latitude,
    longitude: point.longitude,
    mileFromStart,
    segmentKind: fallbackKind,
    ...(('note' in point && typeof point.note === 'string') ? { note: point.note } : {}),
  };
}

export function routeAccessPoints(river: RoutePlanningRiver): RiverRouteAccessPoint[] {
  const points = new Map<string, RiverRouteAccessPoint>();

  for (const point of river.accessPoints ?? []) {
    if (!Number.isFinite(point.mileFromStart)) continue;
    points.set(accessPointKey(point), point);
  }

  if (river.putIn && !points.has(accessPointKey(river.putIn))) {
    points.set(accessPointKey(river.putIn), asRouteAccessPoint(river.putIn, 0, 'transition'));
  }

  const lastKnownMile = [...points.values()]
    .map((point) => point.mileFromStart)
    .filter(Number.isFinite)
    .reduce((max, value) => Math.max(max, value), 0);

  if (river.takeOut && !points.has(accessPointKey(river.takeOut))) {
    points.set(accessPointKey(river.takeOut), asRouteAccessPoint(river.takeOut, lastKnownMile, 'transition'));
  }

  return [...points.values()].sort((left, right) => left.mileFromStart - right.mileFromStart);
}

export function fullRouteDistanceMiles(river: RoutePlanningRiver): number | null {
  const points = routeAccessPoints(river);
  if (points.length >= 2) {
    const distance = points[points.length - 1].mileFromStart - points[0].mileFromStart;
    if (Number.isFinite(distance) && distance > 0) return Number(distance.toFixed(1));
  }

  const distanceLabel = river.distanceLabel ?? river.logistics?.distanceLabel ?? '';
  const match = String(distanceLabel).match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
}

export function buildRouteSegments(river: RoutePlanningRiver): RouteSegment[] {
  const points = routeAccessPoints(river);
  if (points.length < 3) return [];

  const fullDistance = fullRouteDistanceMiles(river);
  if (!fullDistance) return [];

  const segments: RouteSegment[] = [];
  for (let startIndex = 0; startIndex < points.length - 1; startIndex += 1) {
    for (let endIndex = startIndex + 1; endIndex < points.length; endIndex += 1) {
      const putIn = points[startIndex];
      const takeOut = points[endIndex];
      const distanceMiles = Number((takeOut.mileFromStart - putIn.mileFromStart).toFixed(1));
      if (!Number.isFinite(distanceMiles) || distanceMiles < 1 || distanceMiles >= fullDistance - 0.2) continue;

      const minHours = Math.max(0.5, distanceMiles / 3);
      const maxHours = Math.max(minHours + 0.25, distanceMiles / 2.2);
      segments.push({
        putIn,
        takeOut,
        distanceMiles,
        estimatedHours: {
          min: Number(minHours.toFixed(2)),
          max: Number(maxHours.toFixed(2)),
        },
        segmentKind: putIn.segmentKind === takeOut.segmentKind ? putIn.segmentKind : 'transition',
      });
    }
  }

  return segments.sort((left, right) => left.distanceMiles - right.distanceMiles);
}

export function routeSegmentSummary(river: RoutePlanningRiver): RouteSegmentSummary | null {
  const segments = buildRouteSegments(river);
  const fullDistance = fullRouteDistanceMiles(river);
  if (segments.length === 0 || !fullDistance) return null;

  return {
    segments,
    shortestDistanceMiles: segments[0].distanceMiles,
    longestDistanceMiles: segments[segments.length - 1].distanceMiles,
    fullDistanceMiles: fullDistance,
  };
}

function normalizedFilters(filters: SegmentFilterSelection) {
  const timeFilters = Array.isArray(filters.paddleTime)
    ? filters.paddleTime.filter(Boolean)
    : filters.paddleTime
      ? [filters.paddleTime]
      : [];

  return {
    paddleLength: filters.paddleLength || '',
    paddleTime: timeFilters,
  };
}

function rangeContainsValue(range: { min: number; max: number }, value: number) {
  return value >= range.min && value < range.max + 0.001;
}

function rangesOverlap(left: { min: number; max: number }, right: { min: number; max: number }) {
  return left.min <= right.max && right.min <= left.max;
}

function segmentMatchesFilters(segment: RouteSegment, filters: SegmentFilterSelection) {
  const normalized = normalizedFilters(filters);
  if (normalized.paddleLength) {
    const range = PADDLE_LENGTH_RANGES[normalized.paddleLength as Exclude<PaddleLengthFilter, ''>];
    if (range && !rangeContainsValue(range, segment.distanceMiles)) return false;
  }

  if (normalized.paddleTime.length > 0) {
    const matchesTime = normalized.paddleTime.some((value) => {
      const range = PADDLE_TIME_RANGES[value as Exclude<PaddleTimeFilter, ''>];
      return range ? rangesOverlap(range, segment.estimatedHours) : false;
    });
    if (!matchesTime) return false;
  }

  return true;
}

function parsePaddleTimeRange(label: string) {
  const numbers = String(label).match(/\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  if (numbers.length === 0) return null;
  return { min: numbers[0], max: numbers.length > 1 ? numbers[1] : numbers[0] };
}

export function paddleTimeBucketForRoute(river: RoutePlanningRiver): PaddleTimeFilter {
  const range = parsePaddleTimeRange(river.estimatedPaddleTime ?? river.logistics?.estimatedPaddleTime ?? '');
  if (!range) return '';
  if (range.max <= 3) return 'up-to-3';
  if (range.min >= 7) return '7-plus';
  if (range.min >= 5) return '5-to-7';
  if (range.min >= 3) return '3-to-5';
  return range.max <= 5 ? '3-to-5' : '5-to-7';
}

function fullRouteMatchesFilters(river: RoutePlanningRiver, filters: SegmentFilterSelection) {
  const normalized = normalizedFilters(filters);
  const fullDistance = fullRouteDistanceMiles(river);
  if (normalized.paddleLength) {
    const range = PADDLE_LENGTH_RANGES[normalized.paddleLength as Exclude<PaddleLengthFilter, ''>];
    if (!range || fullDistance === null || !rangeContainsValue(range, fullDistance)) return false;
  }

  return normalized.paddleTime.length === 0 || normalized.paddleTime.includes(paddleTimeBucketForRoute(river));
}

function segmentPreferenceScore(segment: RouteSegment, filters: SegmentFilterSelection) {
  const normalized = normalizedFilters(filters);
  const lengthRange = normalized.paddleLength
    ? PADDLE_LENGTH_RANGES[normalized.paddleLength as Exclude<PaddleLengthFilter, ''>]
    : null;
  const timeRanges = normalized.paddleTime
    .map((value) => PADDLE_TIME_RANGES[value as Exclude<PaddleTimeFilter, ''>])
    .filter(Boolean);
  const targetDistance = lengthRange?.min ?? null;
  const targetHours = timeRanges.length > 0
    ? timeRanges.reduce((sum, range) => sum + (range.min + (Number.isFinite(range.max) ? range.max : range.min + 2)) / 2, 0) / timeRanges.length
    : null;
  const distanceScore = targetDistance === null ? 0 : Math.abs(segment.distanceMiles - targetDistance);
  const hoursScore = targetHours === null ? 0 : Math.abs((segment.estimatedHours.min + segment.estimatedHours.max) / 2 - targetHours);
  return distanceScore + hoursScore;
}

function planningRiver(result: RoutePlanningRiver | { river: RoutePlanningRiver }) {
  return 'river' in result ? result.river : result;
}

export function selectRouteSegment(
  result: RoutePlanningRiver | { river: RoutePlanningRiver },
  filters: SegmentFilterSelection,
): RouteSegment | null {
  const normalized = normalizedFilters(filters);
  if (!normalized.paddleLength && normalized.paddleTime.length === 0) return null;

  const river = planningRiver(result);
  if (fullRouteMatchesFilters(river, filters)) return null;

  return buildRouteSegments(river)
    .filter((segment) => segmentMatchesFilters(segment, filters))
    .sort((left, right) => segmentPreferenceScore(left, filters) - segmentPreferenceScore(right, filters))[0] ?? null;
}

export function routeMatchesPaddleFilters(
  result: RoutePlanningRiver | { river: RoutePlanningRiver },
  filters: SegmentFilterSelection,
) {
  const normalized = normalizedFilters(filters);
  if (!normalized.paddleLength && normalized.paddleTime.length === 0) return true;
  const river = planningRiver(result);
  return fullRouteMatchesFilters(river, filters) || Boolean(selectRouteSegment(river, filters));
}

export function formatRouteSegmentLabel(summary: RouteSegmentSummary | null, selectedSegment: RouteSegment | null) {
  if (selectedSegment) {
    return `Selected plan · ${selectedSegment.distanceMiles.toFixed(1)} mi`;
  }

  if (!summary) return '';
  return `Shorter options · ${summary.shortestDistanceMiles.toFixed(1)}–${summary.longestDistanceMiles.toFixed(1)} mi`;
}

export function buildRoutePlannerParams(selectedSegment: RouteSegment | null) {
  if (!selectedSegment) return {};
  return {
    putin: selectedSegment.putIn.id,
    takeout: selectedSegment.takeOut.id,
  };
}
