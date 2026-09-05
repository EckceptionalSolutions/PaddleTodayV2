/** Shared overview plus a bounded, replaceable queue of route detail requests. */
export function createExploreGeometryLoader({ fetchImpl = fetch, onChange = () => {}, concurrency = 4 } = {}) {
  const features = new Map();
  const detailed = new Set();
  const active = new Map();
  const retryAfter = new Map();
  let wanted = new Set();
  let overviewPromise;

  function pump() {
    for (const slug of wanted) {
      if (active.size >= concurrency) break;
      if (detailed.has(slug) || active.has(slug) || (retryAfter.get(slug) || 0) > Date.now()) continue;
      const controller = new AbortController();
      active.set(slug, controller);
      fetchImpl(`/data/canonical-river-geometries/routes/${encodeURIComponent(slug)}.json`, { signal: controller.signal, cache: 'force-cache' })
        .then((response) => {
          if (!response.ok) throw new Error(`Route geometry ${response.status}`);
          return response.json();
        }).then((feature) => {
          if (controller.signal.aborted) return;
          if (!feature?.geometry) throw new Error('Route geometry is missing');
          const overview = features.get(slug);
          features.set(slug, { ...feature, bbox: overview?.bbox || feature.bbox,
            properties: { ...feature.properties, anchor: overview?.properties?.anchor } });
          detailed.add(slug);
          onChange([slug]);
        }).catch(() => {
          if (!controller.signal.aborted) retryAfter.set(slug, Date.now() + 30000);
        }).finally(() => {
          active.delete(slug);
          pump();
        });
    }
  }

  return {
    features,
    loadOverview() {
      if (!overviewPromise) overviewPromise = fetchImpl('/data/explore-map-overview.json', { cache: 'force-cache' })
        .then((response) => {
          if (!response.ok) throw new Error(`Map overview ${response.status}`);
          return response.json();
        }).then((payload) => {
          const changed = [];
          for (const feature of payload.features || []) {
            const slug = feature.properties?.routeId;
            if (!slug || !feature.geometry) continue;
            const existing = features.get(slug);
            features.set(slug, detailed.has(slug) ? { ...existing, bbox: feature.bbox,
              properties: { ...existing.properties, anchor: feature.properties.anchor } } : feature);
            changed.push(slug);
          }
          onChange(changed, { overview: true });
          return features;
        }).catch((error) => { overviewPromise = null; throw error; });
      return overviewPromise;
    },
    setDetailRoutes(slugs) {
      wanted = new Set(slugs);
      for (const [slug, controller] of active) {
        if (!wanted.has(slug)) controller.abort();
      }
      pump();
    },
  };
}
