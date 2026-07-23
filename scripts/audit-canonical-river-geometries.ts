import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { listRivers } from '../src/lib/rivers';

const root = process.cwd();
const assetPath = path.join(root, 'public', 'data', 'canonical-river-geometries.json');
const stateAssetDir = path.join(root, 'public', 'data', 'canonical-river-geometries', 'states');
const routeAssetDir = path.join(root, 'public', 'data', 'canonical-river-geometries', 'routes');
const MAX_MANIFEST_BYTES = 64 * 1024;
const MAX_STATE_BYTES = 8 * 1024 * 1024;
const MAX_STATE_TOTAL_BYTES = 25 * 1024 * 1024;
const MAX_ROUTE_BYTES = 512 * 1024;
const MAX_ROUTE_TOTAL_BYTES = 25 * 1024 * 1024;

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
  const assetText = await readFile(assetPath, 'utf8');
  if (Buffer.byteLength(assetText) > MAX_MANIFEST_BYTES) {
    throw new Error(`Canonical geometry manifest exceeds ${formatKiB(MAX_MANIFEST_BYTES)} (${formatKiB(Buffer.byteLength(assetText))}).`);
  }
  if (assetText.includes('\n  "')) {
    throw new Error('Canonical geometry manifest is pretty-printed; regenerate it in compact form.');
  }

  const payload = JSON.parse(assetText) as {
    type?: string;
    routeCount?: number;
    matchedRouteCount?: number;
    unmatchedRouteIds?: string[];
    routeDataFingerprint?: string;
    states?: Array<{ slug?: string; state?: string; routeCount?: number; path?: string }>;
    routePathTemplate?: string;
  };
  const expectedIds = routes.map((route) => route.id);
  const routeFileNames = (await readdir(routeAssetDir)).filter((fileName) => fileName.endsWith('.json'));
  const features: Array<{
    properties?: { routeId?: string; state?: string };
    geometry?: { type?: string; coordinates?: unknown };
  }> = [];
  let routeTotalBytes = 0;
  for (const fileName of routeFileNames) {
    const routeText = await readFile(path.join(routeAssetDir, fileName), 'utf8');
    const routeBytes = Buffer.byteLength(routeText);
    routeTotalBytes += routeBytes;
    if (routeBytes > MAX_ROUTE_BYTES) {
      throw new Error(`Route geometry asset ${fileName} exceeds ${formatKiB(MAX_ROUTE_BYTES)} (${formatKiB(routeBytes)}).`);
    }
    if (routeText.includes('\n  "')) {
      throw new Error(`Route geometry asset ${fileName} is pretty-printed; regenerate it in compact form.`);
    }
    features.push(JSON.parse(routeText));
  }
  if (routeTotalBytes > MAX_ROUTE_TOTAL_BYTES) {
    throw new Error(`Route geometry assets exceed ${formatMiB(MAX_ROUTE_TOTAL_BYTES)} combined (${formatMiB(routeTotalBytes)}).`);
  }

  const actualIds = features.map((feature) => feature.properties?.routeId).filter((id): id is string => Boolean(id));
  const unmatchedRouteIds = expectedIds.filter((id) => !actualIds.includes(id));

  if (payload.type !== 'CanonicalGeometryManifest') throw new Error('Canonical geometry root asset is not a manifest.');
  if (payload.routeCount !== routes.length) throw new Error(`Canonical geometry route count is stale (${payload.routeCount} vs ${routes.length}).`);
  if (payload.matchedRouteCount !== features.length) throw new Error('Canonical geometry matchedRouteCount does not match features.');
  if (payload.routePathTemplate !== '/data/canonical-river-geometries/routes/{routeId}.json') {
    throw new Error('Canonical geometry route path template is missing or invalid.');
  }
  if (payload.routeDataFingerprint !== routeDataFingerprint(routes)) throw new Error('Canonical geometry asset is stale relative to route data.');
  if (sorted(payload.unmatchedRouteIds ?? []).join('|') !== sorted(unmatchedRouteIds).join('|')) {
    throw new Error('Canonical geometry unmatched-route metadata is stale.');
  }
  if (new Set(actualIds).size !== actualIds.length) throw new Error('Canonical geometry asset contains duplicate route IDs.');
  if (actualIds.some((id) => !expectedIds.includes(id))) throw new Error('Canonical geometry asset contains an unknown route ID.');
  if (features.some((feature) => feature.geometry?.type !== 'MultiLineString')) throw new Error('Canonical geometry asset contains a non-MultiLineString feature.');

  const stateFileNames = (await readdir(stateAssetDir)).filter((fileName) => fileName.endsWith('.json'));
  const stateFiles = new Set(stateFileNames);
  let stateTotalBytes = 0;
  for (const fileName of stateFileNames) {
    const stateText = await readFile(path.join(stateAssetDir, fileName), 'utf8');
    const stateBytes = Buffer.byteLength(stateText);
    stateTotalBytes += stateBytes;
    if (stateBytes > MAX_STATE_BYTES) {
      throw new Error(`State geometry asset ${fileName} exceeds ${formatMiB(MAX_STATE_BYTES)} (${formatMiB(stateBytes)}).`);
    }
    if (stateText.includes('\n  "')) {
      throw new Error(`State geometry asset ${fileName} is pretty-printed; regenerate it in compact form.`);
    }
  }
  if (stateTotalBytes > MAX_STATE_TOTAL_BYTES) {
    throw new Error(`State geometry assets exceed ${formatMiB(MAX_STATE_TOTAL_BYTES)} combined (${formatMiB(stateTotalBytes)}).`);
  }
  const matchedStates = new Set(features.map((feature) => feature.properties?.state).filter((state): state is string => Boolean(state)));
  const manifestStates = new Set((payload.states ?? []).map((state) => state.state).filter((state): state is string => Boolean(state)));
  for (const state of matchedStates) {
    const fileName = `${stateSlug(state)}.json`;
    if (!stateFiles.has(fileName)) throw new Error(`Missing state-scoped canonical geometry asset: ${fileName}`);
    if (!manifestStates.has(state)) throw new Error(`Canonical geometry manifest is missing state: ${state}`);
  }

  console.log(
    `Canonical geometry audit passed: ${features.length}/${routes.length} routes matched; `
    + `${matchedStates.size} state assets present; ${formatKiB(Buffer.byteLength(assetText))} manifest; `
    + `${formatMiB(stateTotalBytes)} state total; ${formatMiB(routeTotalBytes)} route total.`,
  );
}

function formatMiB(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
}

function formatKiB(bytes: number) {
  return `${(bytes / 1024).toFixed(2)} KiB`;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
