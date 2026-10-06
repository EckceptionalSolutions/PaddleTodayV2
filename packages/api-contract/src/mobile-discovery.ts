import type { ExploreCatalogResponse, RiverSummaryApiItem, RiverSummaryResponse, ScoreBreakdown, WeekendSummaryApiItem, WeekendSummaryResponse } from './index';

/** No scope means nationwide. A radius uses coordinates, never state borders. */
export interface MobileRouteScope {
  latitude?: number;
  longitude?: number;
  radiusMiles?: number;
  state?: string;
  slugs?: string[];
}

export interface MobileScopeMetadata {
  kind: 'nationwide' | 'nearby' | 'state' | 'routes';
  latitude?: number;
  longitude?: number;
  radiusMiles?: number;
  state?: string;
  returnedRoutes: number;
  totalRoutes: number;
}

export interface MobileRouteCatalogResponse {
  requestId: string;
  catalogRevision: string;
  scope: MobileScopeMetadata;
  states: string[];
  /** Nationwide counts, keyed by riverId (or slug for an ungrouped route). */
  groupCounts: Record<string, number>;
  rivers: RiverSummaryApiItem['river'][];
}

export type MobileScoreBreakdown = Pick<ScoreBreakdown,
  'riverQuality' | 'windAdjustment' | 'temperatureAdjustment' | 'rainAdjustment' |
  'comfortAdjustment' | 'rawTripScore' | 'finalScore' | 'capReasons'>;

export type MobileRouteCondition = Omit<RiverSummaryApiItem, 'river' | 'explanation' | 'scoreBreakdown'> & {
  slug: string;
  scoreBreakdown?: MobileScoreBreakdown;
};
export type MobileWeekendCondition = Omit<WeekendSummaryApiItem, 'river'> & { slug: string };
interface MobileConditionsMetadata {
  catalogRevision: string;
  scope: MobileScopeMetadata;
}
export interface MobileSummaryResponse extends Omit<RiverSummaryResponse, 'rivers' | keyof MobileConditionsMetadata>, MobileConditionsMetadata {
  rivers: MobileRouteCondition[];
}
export interface MobileExploreResponse extends Omit<ExploreCatalogResponse, 'rivers' | keyof MobileConditionsMetadata>, MobileConditionsMetadata {
  rivers: MobileRouteCondition[];
}
export interface MobileWeekendResponse extends Omit<WeekendSummaryResponse, 'rivers' | keyof MobileConditionsMetadata>, MobileConditionsMetadata {
  rivers: MobileWeekendCondition[];
  alternatives: MobileWeekendCondition[];
}

/** Reject catalog mismatches rather than attaching scores to obsolete access metadata. */
export function assembleMobileRoutes<Response extends MobileSummaryResponse | MobileExploreResponse>(
  catalog: MobileRouteCatalogResponse, response: Response,
): Omit<Response, 'rivers'> & { rivers: RiverSummaryApiItem[] } {
  const bySlug = catalogIndex(catalog, response.catalogRevision);
  const { rivers, ...envelope } = response;
  return { ...envelope, states: catalog.states, groupCounts: catalog.groupCounts,
    rivers: rivers.map(({ slug, scoreBreakdown, ...condition }) => ({
    ...condition,
    river: requiredRiver(bySlug, slug),
    explanation: condition.summary.shortExplanation,
    scoreBreakdown: scoreBreakdown ? {
      ...scoreBreakdown, riverQualityExplanation: '', windExplanation: '',
      temperatureExplanation: '', rainExplanation: '', comfortExplanation: '',
    } : undefined,
  })) };
}

export function assembleMobileWeekend(catalog: MobileRouteCatalogResponse, response: MobileWeekendResponse) {
  const bySlug = catalogIndex(catalog, response.catalogRevision);
  return { ...response, states: catalog.states, groupCounts: catalog.groupCounts,
    rivers: response.rivers.map(({ slug, ...condition }) => ({
    ...condition, river: requiredRiver(bySlug, slug),
  })) };
}

function catalogIndex(catalog: MobileRouteCatalogResponse, revision: string) {
  if (typeof revision !== 'string' || !revision || !Array.isArray(catalog.rivers)) {
    throw new Error('Route metadata is unavailable. Refresh before planning a route.');
  }
  if (catalog.catalogRevision !== revision) throw new Error('Route catalog changed. Refresh to retrieve current access information.');
  return new Map(catalog.rivers.map(river => [river.slug, river]));
}
function requiredRiver(bySlug: Map<string, RiverSummaryApiItem['river']>, slug: string) {
  const river = bySlug.get(slug);
  if (!river) throw new Error(`Route metadata is unavailable for ${slug}. Refresh before planning this route.`);
  return river;
}
