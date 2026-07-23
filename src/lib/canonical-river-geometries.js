import { endpointSnappedRiverGeometry, stitchRiverLines } from './endpoint-snapped-river-geometry.js';

const canonicalGeometryPromises = new Map();
const canonicalRouteGeometryPromises = new Map();
const routeStitchTolerances = new Map([
  ['little-miami-river-rogers-ballpark-carl-rahe', 0.0075],
]);

function slugifyState(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function loadCanonicalRiverGeometries({ stateName = '' } = {}) {
  const scope = stateName ? `state:${slugifyState(stateName)}` : 'all';
  const existing = canonicalGeometryPromises.get(scope);
  if (existing) return existing;

  const promise = stateName
    ? loadGeometryCollection(`/data/canonical-river-geometries/states/${slugifyState(stateName)}.json`)
    : fetch('/data/canonical-river-geometries.json', { cache: 'force-cache' })
    .then((response) => {
      if (!response.ok) throw new Error(`Canonical river geometry manifest request failed (${response.status})`);
      return response.json();
    })
    .then(async (manifest) => {
      const states = Array.isArray(manifest?.states) ? manifest.states : [];
      const stateMaps = await Promise.all(
        states
          .filter((state) => typeof state?.state === 'string')
          .map((state) => loadCanonicalRiverGeometries({ stateName: state.state })),
      );
      return new Map(stateMaps.flatMap((stateMap) => [...stateMap.entries()]));
    });

  canonicalGeometryPromises.set(scope, promise);
  return promise;
}

function loadGeometryCollection(assetPath) {
  return fetch(assetPath, { cache: 'force-cache' })
    .then((response) => {
      if (!response.ok) throw new Error(`Canonical river geometry request failed (${response.status})`);
      return response.json();
    })
    .then((payload) => {
      const features = Array.isArray(payload?.features) ? payload.features : [];
      return new Map(
        features
          .filter((feature) => feature?.properties?.routeId && feature?.geometry)
          .map((feature) => [feature.properties.routeId, feature]),
      );
    });
}

function flattenGeometry(geometry) {
  if (!geometry) return [];
  if (geometry.type === 'LineString') return [geometry.coordinates].filter((line) => Array.isArray(line) && line.length >= 2);
  if (geometry.type === 'MultiLineString') return geometry.coordinates.filter((line) => Array.isArray(line) && line.length >= 2);
  return [];
}

/** Convert a canonical route feature into a section snapped to access points. */
export function canonicalRiverRouteLineFromFeature(feature, routePoints) {
  if (!feature || !Array.isArray(routePoints) || routePoints.length < 2) return null;

  const stitchTolerance = routeStitchTolerances.get(feature.properties?.routeId);
  const lines = stitchRiverLines(flattenGeometry(feature.geometry), stitchTolerance);
  const snapped = endpointSnappedRiverGeometry(lines, routePoints);
  if (!snapped) return null;

  return {
    type: 'Feature',
    properties: {
      ...feature.properties,
      traced: true,
    },
    geometry: {
      type: 'LineString',
      coordinates: snapped.coordinates,
    },
  };
}

/** Return a route-specific river section snapped to the supplied access points. */
export async function loadCanonicalRiverRouteLine(routeId, routePoints, options = {}) {
  const existing = canonicalRouteGeometryPromises.get(routeId);
  const featurePromise = existing ?? fetch(
    `/data/canonical-river-geometries/routes/${encodeURIComponent(routeId)}.json`,
    { cache: 'force-cache' },
  )
    .then((response) => {
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`Canonical route geometry request failed (${response.status})`);
      return response.json();
    });
  if (!existing) canonicalRouteGeometryPromises.set(routeId, featurePromise);

  const feature = await featurePromise;
  return canonicalRiverRouteLineFromFeature(feature, routePoints);
}
