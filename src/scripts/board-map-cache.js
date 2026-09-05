/** Cache only canonical geometry; basemap-derived traces can change as tiles load. */
export function createCanonicalRouteMemo() {
  const features = new WeakMap();
  return (feature, points, compute) => {
    if (!feature) return compute();
    const key = JSON.stringify(points.map(({ longitude, latitude }) => [longitude, latitude]));
    let routes = features.get(feature);
    if (!routes) {
      routes = new Map();
      features.set(feature, routes);
    }
    if (!routes.has(key)) routes.set(key, compute());
    return routes.get(key);
  };
}

/** Reconcile active markers while retaining the other zoom mode for reuse. */
export function createConditionMarkerCache() {
  const modes = { zone: new Map(), route: new Map() };
  let active = new Set();

  return ({ mode, records, items, createMarker, addMarker }) => {
    const included = new Set(items);
    // Drop records for removed/replaced items in both modes, including detached markers.
    for (const cache of Object.values(modes)) {
      for (const [record, marker] of cache) {
        if (included.has(record.item)) continue;
        if (active.delete(marker)) marker.remove();
        cache.delete(record);
      }
    }

    const cache = modes[mode];
    const wanted = new Set(records);
    for (const [record, marker] of cache) {
      if (wanted.has(record)) continue;
      if (active.delete(marker)) marker.remove();
      cache.delete(record);
    }
    const entries = records.map((record) => {
      let marker = cache.get(record);
      if (!marker) {
        marker = createMarker(record);
        cache.set(record, marker);
      }
      return { ...record, marker };
    });
    const next = new Set(entries.map(({ marker }) => marker));
    for (const marker of active) {
      if (!next.has(marker)) marker.remove();
    }
    for (const marker of next) {
      if (!active.has(marker)) addMarker(marker);
    }
    active = next;
    return entries;
  };
}
