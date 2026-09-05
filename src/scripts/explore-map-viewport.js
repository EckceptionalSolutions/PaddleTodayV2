import { boundsIntersect, coordinateBounds, paddedMapBounds } from '../lib/explore-map-geometry.js';
import { routeCoveragePoints, routesForRiverItem } from '../lib/river-coverage.js';

/** Keep route subsets stable between camera moves so map caches remain reusable. */
export function createExploreViewportSelector() {
  const subsets = new WeakMap();
  const fallbackBounds = new WeakMap();
  return (items, { bounds, features = new Map(), limit = 100, preferredKey = null } = {}) => {
    const window = paddedMapBounds(bounds);
    if (!window) return { items: items.slice(0, limit), total: items.length };
    const visible = [];
    for (const item of items) {
      const allRoutes = routesForRiverItem(item);
      const routes = allRoutes.filter((route) => {
        let box = features.get(route.river.slug)?.bbox;
        if (!box) {
          if (!fallbackBounds.has(route)) fallbackBounds.set(route, coordinateBounds(
            routeCoveragePoints(route).map(({ longitude, latitude }) => [longitude, latitude])));
          box = fallbackBounds.get(route);
        }
        return boundsIntersect(box, window);
      });
      if (!routes.length) continue;
      if (routes.length === allRoutes.length) { visible.push(item); continue; }
      const key = routes.map((route) => route.river.slug).join('|');
      let cached = subsets.get(item);
      if (cached?.key !== key) {
        cached = { key, item: {
          ...item, matchingRoutes: routes, matchingRouteCount: routes.length,
          cardRoute: routes.includes(item.cardRoute) ? item.cardRoute : routes[0],
        } };
        subsets.set(item, cached);
      }
      visible.push(cached.item);
    }
    const shown = visible.slice(0, limit);
    const preferred = visible.find((item) => item.key === preferredKey);
    if (preferred && !shown.includes(preferred) && limit > 0) shown[shown.length - 1] = preferred;
    return { items: shown, total: visible.length };
  };
}
