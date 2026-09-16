import { isCurrentCallUnavailable } from '../lib/current-call-availability.js';

/** The coverage layer is never truncated by the detailed score-label budget. */
export function exploreCatalogPoints(items) {
  return { type: 'FeatureCollection', features: items.flatMap(item =>
    item.matchingRoutes.flatMap(route => {
      const { latitude, longitude, slug } = route.river;
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return [];
      return [{ type: 'Feature', geometry: { type: 'Point', coordinates: [longitude, latitude] },
        properties: { key: item.key, slug, unavailable: isCurrentCallUnavailable(route) } }];
    })) };
}
