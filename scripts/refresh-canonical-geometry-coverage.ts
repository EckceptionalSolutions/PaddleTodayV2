import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { listRivers } from '../src/lib/rivers';

// Refresh only the inventory of already reviewed assets. This is deliberately
// separate from retracing geometry: generation provenance remains unchanged.
const root = join(process.cwd(), 'public/data');
const manifestPath = join(root, 'canonical-river-geometries.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const routes = listRivers();
const ids = new Set(routes.map(route => route.id));
const files = await readdir(join(root, 'canonical-river-geometries/routes'));
const features = [];
for (const file of files.filter(file => file.endsWith('.json') && ids.has(file.slice(0, -5)))) {
  const feature = JSON.parse(await readFile(join(root, 'canonical-river-geometries/routes', file), 'utf8'));
  if (feature.type !== 'Feature' || feature.properties?.routeId !== file.slice(0, -5) || feature.geometry?.type !== 'MultiLineString' || !feature.geometry.coordinates.length) throw new Error(`Invalid reviewed geometry: ${file}`);
  features.push(feature);
}
features.sort((left, right) => left.properties.routeId.localeCompare(right.properties.routeId));
const matched = new Set(features.map(feature => feature.properties.routeId));
const counts = { routeCount: routes.length, matchedRouteCount: features.length,
  networkTracedRouteCount: features.filter(feature => feature.properties.traceMode === 'network-traced').length,
  namedFallbackRouteCount: features.filter(feature => feature.properties.traceMode === 'named-fallback').length,
  curatedRouteCount: features.filter(feature => feature.properties.traceMode === 'curated-access-fallback').length,
  unmatchedRouteIds: routes.filter(route => !matched.has(route.id)).map(route => route.id),
};
if (counts.networkTracedRouteCount + counts.namedFallbackRouteCount + counts.curatedRouteCount !== counts.matchedRouteCount) throw new Error('Unrecognized geometry trace mode');
const catalogInput = routes.slice().sort((left, right) => left.id.localeCompare(right.id)).map(route => JSON.stringify({ id: route.id, name: route.name, riverId: route.riverId, state: route.state,
  putIn: route.putIn ? [route.putIn.latitude, route.putIn.longitude] : null, takeOut: route.takeOut ? [route.takeOut.latitude, route.takeOut.longitude] : null })).join('\n');
const coverage = { ...counts, coverageMode: 'existing-reviewed-assets', catalogRouteDataFingerprint: createHash('sha256').update(catalogInput).digest('hex') };
const states = [];
for (const state of [...new Set(features.map(feature => feature.properties.state))].sort()) {
  const slug = state.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const statePath = join(root, 'canonical-river-geometries/states', slug + '.json');
  const previous = JSON.parse(await readFile(statePath, 'utf8'));
  const selected = features.filter(feature => feature.properties.state === state);
  const stateFeatures = selected.map(feature => { const { endpointSnapMaxFeet, ...properties } = feature.properties; return { ...feature, properties }; });
  // Keep the original generation fingerprint as evidence that endpoint traces
  // have not all been regenerated against the current catalog.
  await writeFile(statePath, JSON.stringify({ ...previous, ...coverage, features: stateFeatures }) + '\n');
  states.push({ slug, state, routeCount: selected.length, path: `/data/canonical-river-geometries/states/${slug}.json` });
}
await writeFile(manifestPath, JSON.stringify({ ...manifest, ...coverage, states }) + '\n');
console.log(JSON.stringify({ ...coverage, legacyAssetsRetained: files.filter(file => file.endsWith('.json') && !ids.has(file.slice(0, -5))).length, geometryGenerationFingerprintPreserved: manifest.routeDataFingerprint }, null, 2));
