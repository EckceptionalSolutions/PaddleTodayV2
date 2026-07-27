import {
  distanceMiles,
  distancePenalty,
  estimateTravelMinutes,
  hasCampingSupport,
  type WeekendSummaryApiItem,
} from '@paddletoday/api-contract';

export type WeekendFilter = 'all' | 'day-trips' | 'camping' | 'rechecks';

export interface WeekendLocation {
  latitude: number;
  longitude: number;
  label: string;
  source?: string;
}

export interface RankedWeekendRoute extends WeekendSummaryApiItem {
  distanceMiles: number | null;
  travelMinutes: number | null;
  travelLabel: string | null;
  weekendRank: number;
}

export interface WeekendPlan {
  rankedRoutes: RankedWeekendRoute[];
  inRangeRoutes: RankedWeekendRoute[];
  outOfRangeRoutes: RankedWeekendRoute[];
  topPicks: RankedWeekendRoute[];
  lowerCommitment: RankedWeekendRoute[];
  expandedPicks: RankedWeekendRoute[];
  dayTrips: RankedWeekendRoute[];
  campingRoutes: RankedWeekendRoute[];
  campingSectionRoutes: RankedWeekendRoute[];
  rechecks: RankedWeekendRoute[];
  featured: RankedWeekendRoute | null;
  hasWeekendPlan: boolean;
  mapRoutes: RankedWeekendRoute[];
}

export interface WeekendRouteMapPoint {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  score: number;
  rating: WeekendSummaryApiItem['weekend']['rating'];
  confidence: WeekendSummaryApiItem['weekend']['confidence'];
  reach: string;
  distanceLabel: string;
  span: Array<{ latitude: number; longitude: number }>;
}

export const WEEKEND_DISTANCE_OPTIONS = [
  { label: '100 mi', value: 100 },
  { label: '200 mi', value: 200 },
  { label: '300 mi', value: 300 },
  { label: '500 mi', value: 500 },
  { label: 'Any', value: null },
] as const;

export const DEFAULT_WEEKEND_DISTANCE_LIMIT = 300;

const weekendConfidenceRank = {
  High: 3,
  Medium: 2,
  Low: 1,
} as const;

export function formatWeekendTravelTime(minutes: number) {
  if (!Number.isFinite(minutes)) return 'Distance unavailable';
  if (minutes < 60) return `${minutes} min away`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes === 0 ? `${hours}h away` : `${hours}h ${remainingMinutes}m away`;
}

export function rankWeekendRoutes(
  rivers: WeekendSummaryApiItem[],
  location: WeekendLocation | null,
): RankedWeekendRoute[] {
  return rivers
    .map((river) => {
      const miles = location
        ? distanceMiles(
            location.latitude,
            location.longitude,
            river.river.latitude,
            river.river.longitude,
          )
        : null;
      const travelMinutes = miles === null ? null : estimateTravelMinutes(miles);
      const confidenceBonus = (weekendConfidenceRank[river.weekend.confidence] ?? 0) * 3;
      const travelPenalty = travelMinutes === null ? 0 : distancePenalty(travelMinutes);

      return {
        ...river,
        distanceMiles: miles,
        travelMinutes,
        travelLabel: travelMinutes === null ? null : formatWeekendTravelTime(travelMinutes),
        weekendRank: river.weekend.score + confidenceBonus - travelPenalty,
      };
    })
    .sort((left, right) => {
      if (left.weekendRank !== right.weekendRank) {
        return right.weekendRank - left.weekendRank;
      }

      if (
        left.travelMinutes !== null
        && right.travelMinutes !== null
        && left.travelMinutes !== right.travelMinutes
      ) {
        return left.travelMinutes - right.travelMinutes;
      }

      return right.weekend.score - left.weekend.score;
    });
}

export function buildWeekendPlan(
  rivers: WeekendSummaryApiItem[],
  {
    location = null,
    distanceLimit = DEFAULT_WEEKEND_DISTANCE_LIMIT,
    filter = 'all',
  }: {
    location?: WeekendLocation | null;
    distanceLimit?: number | null;
    filter?: WeekendFilter;
  } = {},
): WeekendPlan {
  const rankedRoutes = rankWeekendRoutes(rivers, location);
  const inRangeRoutes = location
    ? rankedRoutes.filter((river) => isWithinDistanceLimit(river, distanceLimit))
    : rankedRoutes;
  const outOfRangeRoutes = location && distanceLimit !== null
    ? rankedRoutes.filter((river) => !isWithinDistanceLimit(river, distanceLimit))
    : [];
  const topPicks = inRangeRoutes.filter(isCleanWeekendRoute).slice(0, 5);
  const expandedPicks = topPicks.length === 0
    ? outOfRangeRoutes.filter(isCleanWeekendRoute).slice(0, 4)
    : [];
  const topPickSlugs = slugSet(topPicks);
  const lowerCommitment = inRangeRoutes
    .filter((river) => !topPickSlugs.has(river.river.slug))
    .filter(isLowerCommitmentRoute)
    .slice(0, 4);
  const dayTrips = uniqueWeekendRoutes([...topPicks, ...lowerCommitment, ...expandedPicks]);
  const campingRoutes = inRangeRoutes.filter(isCampingWeekendRoute).slice(0, 8);
  const dayTripSlugs = slugSet(dayTrips);
  const campingSectionRoutes = campingRoutes.filter((river) => !dayTripSlugs.has(river.river.slug));
  const rechecks = inRangeRoutes
    .filter((river) => river.weekend.rating === 'Fair')
    .slice(0, 10);
  const hasWeekendPlan = topPicks.length > 0;
  const featured = topPicks[0]
    ?? rechecks[0]
    ?? expandedPicks[0]
    ?? inRangeRoutes[0]
    ?? rankedRoutes[0]
    ?? null;

  const mapRoutes = uniqueWeekendRoutes(
    filter === 'day-trips'
      ? dayTrips
      : filter === 'camping'
        ? campingRoutes
        : filter === 'rechecks'
          ? rechecks
          : [...dayTrips, ...campingRoutes, ...rechecks],
  );

  return {
    rankedRoutes,
    inRangeRoutes,
    outOfRangeRoutes,
    topPicks,
    lowerCommitment,
    expandedPicks,
    dayTrips,
    campingRoutes,
    campingSectionRoutes,
    rechecks,
    featured,
    hasWeekendPlan,
    mapRoutes,
  };
}

export function parseWeekendDistanceLimit(raw: string | null) {
  if (raw === null) {
    return undefined;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed === null) {
      return null;
    }
    if (
      typeof parsed === 'number'
      && WEEKEND_DISTANCE_OPTIONS.some((option) => option.value === parsed)
    ) {
      return parsed;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export function weekendFilterLabel(filter: WeekendFilter) {
  if (filter === 'day-trips') return 'day-trip';
  if (filter === 'camping') return 'camping-friendly';
  if (filter === 'rechecks') return 'recheck';
  return 'weekend';
}

export function weekendRouteMapPoints(
  rivers: WeekendSummaryApiItem[],
): WeekendRouteMapPoint[] {
  return rivers
    .map((river) => {
      const span = weekendRouteSpan(river);
      const center = span.length > 0
        ? {
            latitude: span.reduce((sum, point) => sum + point.latitude, 0) / span.length,
            longitude: span.reduce((sum, point) => sum + point.longitude, 0) / span.length,
          }
        : {
            latitude: river.river.latitude,
            longitude: river.river.longitude,
          };

      if (!Number.isFinite(center.latitude) || !Number.isFinite(center.longitude)) {
        return null;
      }

      return {
        id: river.river.slug,
        label: river.river.name,
        latitude: center.latitude,
        longitude: center.longitude,
        score: river.weekend.score,
        rating: river.weekend.rating,
        confidence: river.weekend.confidence,
        reach: river.river.reach,
        distanceLabel: river.river.distanceLabel,
        span,
      };
    })
    .filter((point): point is WeekendRouteMapPoint => point !== null);
}

export function weekendRouteSpan(river: WeekendSummaryApiItem) {
  const accessPoints = river.river.accessPoints
    ?.map((point) => ({ point, coordinate: weekendAccessCoordinate(point) }))
    .filter(
      (
        entry,
      ): entry is {
        point: NonNullable<WeekendSummaryApiItem['river']['accessPoints']>[number];
        coordinate: { latitude: number; longitude: number };
      } => entry.coordinate !== null,
    )
    .sort((left, right) => left.point.mileFromStart - right.point.mileFromStart);
  const chain = [
    weekendAccessCoordinate(river.river.putIn),
    ...(accessPoints?.map((entry) => entry.coordinate) ?? []),
    weekendAccessCoordinate(river.river.takeOut),
  ].filter(
    (coordinate): coordinate is { latitude: number; longitude: number } => coordinate !== null,
  );

  return chain.filter(
    (coordinate, index) => (
      index === 0
      || coordinate.latitude !== chain[index - 1].latitude
      || coordinate.longitude !== chain[index - 1].longitude
    ),
  );
}

function weekendAccessCoordinate(
  point: { latitude?: number; longitude?: number } | null | undefined,
) {
  if (!point || !Number.isFinite(point.latitude) || !Number.isFinite(point.longitude)) {
    return null;
  }

  return {
    latitude: point.latitude as number,
    longitude: point.longitude as number,
  };
}

function isCleanWeekendRoute(river: WeekendSummaryApiItem) {
  return river.weekend.rating === 'Strong' || river.weekend.rating === 'Good';
}

function isCampingWeekendRoute(river: WeekendSummaryApiItem) {
  return (
    isCleanWeekendRoute(river)
    && hasCampingSupport(river.river.logistics?.campingClassification)
  );
}

function isLowerCommitmentRoute(river: RankedWeekendRoute) {
  if (!isCleanWeekendRoute(river)) {
    return false;
  }

  const routeDistance = Number.parseFloat(river.river.distanceLabel);
  return (
    river.river.difficulty === 'easy'
    || (Number.isFinite(routeDistance) && routeDistance <= 8)
    || (river.travelMinutes !== null && river.travelMinutes <= 120)
  );
}

function isWithinDistanceLimit(
  river: RankedWeekendRoute,
  distanceLimit: number | null,
) {
  if (distanceLimit === null) {
    return true;
  }

  return river.distanceMiles !== null && river.distanceMiles <= distanceLimit;
}

function slugSet(rivers: WeekendSummaryApiItem[]) {
  return new Set(rivers.map((river) => river.river.slug));
}

function uniqueWeekendRoutes<T extends WeekendSummaryApiItem>(rivers: T[]) {
  const seen = new Set<string>();
  return rivers.filter((river) => {
    if (seen.has(river.river.slug)) {
      return false;
    }
    seen.add(river.river.slug);
    return true;
  });
}
