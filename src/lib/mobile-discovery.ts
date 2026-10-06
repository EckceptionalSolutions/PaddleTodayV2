import { createHash } from 'node:crypto';
import type { MobileRouteCondition, MobileRouteScope, MobileScopeMetadata, RiverSummaryApiItem } from '@paddletoday/api-contract';

export function parseMobileScope(params: URLSearchParams): MobileRouteScope {
  const scope: MobileRouteScope = {};
  const hasCoordinates = params.has('latitude') || params.has('longitude') || params.has('radiusMiles');
  if (hasCoordinates) {
    const latitude = finiteParam(params, 'latitude');
    const longitude = finiteParam(params, 'longitude');
    const radiusMiles = finiteParam(params, 'radiusMiles');
    if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180 || radiusMiles < 1 || radiusMiles > 1000) {
      throw new Error('A nearby scope requires valid coordinates and a radius from 1 to 1000 miles.');
    }
    Object.assign(scope, { latitude, longitude, radiusMiles });
  }
  const state = params.get('state')?.trim();
  if (state) {
    if (state.length > 60) throw new Error('State is too long.');
    scope.state = state;
  }
  if (params.has('slugs')) {
    const slugs = [...new Set(params.get('slugs')!.split(',').map(slug => slug.trim()).filter(Boolean))];
    if (slugs.length > 100 || slugs.some(slug => !/^[a-z0-9-]{1,160}$/.test(slug))) throw new Error('Invalid route selection.');
    // An empty saved-route selection should download no routes.
    scope.slugs = slugs;
  }
  if ([hasCoordinates, Boolean(state), scope.slugs !== undefined].filter(Boolean).length > 1) {
    throw new Error('Choose one nearby, state, or route scope.');
  }
  return scope;
}

function finiteParam(params: URLSearchParams, key: string) {
  const raw = params.get(key);
  if (raw === null || raw.trim() === '' || !Number.isFinite(Number(raw))) throw new Error(`Invalid ${key}.`);
  return Number(raw);
}

export function mobileRouteMatches(river: RiverSummaryApiItem['river'], scope: MobileRouteScope) {
  if (scope.slugs) return scope.slugs.includes(river.slug);
  if (scope.state) return river.state.toLowerCase() === scope.state.toLowerCase();
  if (scope.latitude !== undefined && scope.longitude !== undefined && scope.radiusMiles !== undefined) {
    return mobileDistanceMiles(scope, river) <= scope.radiusMiles;
  }
  return true;
}

export function mobileDistanceMiles(from: { latitude?: number; longitude?: number }, to: { latitude: number; longitude: number }) {
  if (from.latitude === undefined || from.longitude === undefined) return Infinity;
  const radians = Math.PI / 180;
  const dLat = (to.latitude - from.latitude) * radians;
  const dLon = (to.longitude - from.longitude) * radians;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(from.latitude * radians) * Math.cos(to.latitude * radians) * Math.sin(dLon / 2) ** 2;
  return 3958.8 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
}

/** Revision includes access, safety and logistics, not just the slug list. */
export function mobileCatalogMetadata(rivers: RiverSummaryApiItem['river'][]) {
  const groupCounts: Record<string, number> = Object.create(null);
  for (const river of rivers) {
    const key = river.riverId || river.slug;
    groupCounts[key] = (groupCounts[key] ?? 0) + 1;
  }
  return {
    catalogRevision: createHash('sha256').update(JSON.stringify(rivers)).digest('hex').slice(0, 24),
    states: [...new Set(rivers.map(river => river.state))].sort(),
    groupCounts,
  };
}

export function mobileScopeMetadata(scope: MobileRouteScope, returnedRoutes: number, totalRoutes: number): MobileScopeMetadata {
  const kind = scope.slugs !== undefined ? 'routes' : scope.state ? 'state' : scope.latitude !== undefined ? 'nearby' : 'nationwide';
  const { slugs: _slugs, ...publicScope } = scope;
  return { ...publicScope, kind, returnedRoutes, totalRoutes };
}

export function compactMobileCondition(item: RiverSummaryApiItem): MobileRouteCondition {
  const { river, explanation: _explanation, scoreBreakdown, ...condition } = item;
  return { ...condition, slug: river.slug, scoreBreakdown: scoreBreakdown ? {
    riverQuality: scoreBreakdown.riverQuality, windAdjustment: scoreBreakdown.windAdjustment,
    temperatureAdjustment: scoreBreakdown.temperatureAdjustment, rainAdjustment: scoreBreakdown.rainAdjustment,
    comfortAdjustment: scoreBreakdown.comfortAdjustment, rawTripScore: scoreBreakdown.rawTripScore,
    finalScore: scoreBreakdown.finalScore, capReasons: scoreBreakdown.capReasons,
  } : undefined };
}
