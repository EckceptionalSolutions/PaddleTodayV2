import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { listRivers } from '../src/lib/rivers';

const root = process.cwd();
const assetPath = path.join(root, 'public', 'data', 'canonical-river-geometries.json');
const stateAssetDir = path.join(root, 'public', 'data', 'canonical-river-geometries', 'states');

function stateSlug(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function routeDataFingerprint(routes: ReturnType<typeof listRivers>) {
  const input = routes
    .slice()
    .sort((left, right) => left.id.localeCompare(right.id))
    .map((route) => JSON.stringify({
      id: route.id,
      name: route.name,
      riverId: route.riverId,
      state: route.state,
      putIn: route.putIn ? [route.putIn.latitude, route.putIn.longitude] : null,
      takeOut: route.takeOut ? [route.takeOut.latitude, route.takeOut.longitude] : null,
    }))
    .join('\n');
  return createHash('sha256').update(input).digest('hex');
}

function sorted(values: string[]) {
  return [...values].sort((left, right) => left.localeCompare(right));
}

async function main() {
  const routes = listRivers();
  const payload = JSON.parse(await readFile(assetPath, 'utf8')) as {
    type?: string;
    features?: Array<{ properties?: { routeId?: string; state?: string }; geometry?: { type?: string; coordinates?: unknown } }>;
    routeCount?: number;
    matchedRouteCount?: number;
    unmatchedRouteIds?: string[];
    routeDataFingerprint?: string;
  };
  const features = Array.isArray(payload.features) ? payload.features : [];
  const expectedIds = routes.map((route) => route.id);
  const actualIds = features.map((feature) => feature.properties?.routeId).filter((id): id is string => Boolean(id));
  const unmatchedRouteIds = expectedIds.filter((id) => !actualIds.includes(id));

  if (payload.type !== 'FeatureCollection') throw new Error('Canonical geometry asset is not a FeatureCollection.');
  if (payload.routeCount !== routes.length) throw new Error(`Canonical geometry route count is stale (${payload.routeCount} vs ${routes.length}).`);
  if (payload.matchedRouteCount !== features.length) throw new Error('Canonical geometry matchedRouteCount does not match features.');
  if (payload.routeDataFingerprint !== routeDataFingerprint(routes)) throw new Error('Canonical geometry asset is stale relative to route data.');
  if (sorted(payload.unmatchedRouteIds ?? []).join('|') !== sorted(unmatchedRouteIds).join('|')) {
    throw new Error('Canonical geometry unmatched-route metadata is stale.');
  }
  if (new Set(actualIds).size !== actualIds.length) throw new Error('Canonical geometry asset contains duplicate route IDs.');
  if (actualIds.some((id) => !expectedIds.includes(id))) throw new Error('Canonical geometry asset contains an unknown route ID.');
  if (features.some((feature) => feature.geometry?.type !== 'MultiLineString')) throw new Error('Canonical geometry asset contains a non-MultiLineString feature.');

  const stateFiles = new Set(await readdir(stateAssetDir));
  const matchedStates = new Set(features.map((feature) => feature.properties?.state).filter((state): state is string => Boolean(state)));
  for (const state of matchedStates) {
    const fileName = `${stateSlug(state)}.json`;
    if (!stateFiles.has(fileName)) throw new Error(`Missing state-scoped canonical geometry asset: ${fileName}`);
  }

  console.log(`Canonical geometry audit passed: ${features.length}/${routes.length} routes matched; ${matchedStates.size} state assets present.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
