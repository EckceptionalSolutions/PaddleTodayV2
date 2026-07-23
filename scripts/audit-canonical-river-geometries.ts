import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { listRivers } from '../src/lib/rivers';

const root = process.cwd();
const assetPath = path.join(root, 'public', 'data', 'canonical-river-geometries.json');
const stateAssetDir = path.join(root, 'public', 'data', 'canonical-river-geometries', 'states');
const MAX_MONOLITH_BYTES = 25 * 1024 * 1024;
const MAX_STATE_BYTES = 8 * 1024 * 1024;
const MAX_STATE_TOTAL_BYTES = 25 * 1024 * 1024;

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
  if (Buffer.byteLength(assetText) > MAX_MONOLITH_BYTES) {
    throw new Error(`Canonical geometry asset exceeds ${formatMiB(MAX_MONOLITH_BYTES)} (${formatMiB(Buffer.byteLength(assetText))}).`);
  }
  if (assetText.includes('\n  "')) {
    throw new Error('Canonical geometry asset is pretty-printed; regenerate it in compact form.');
  }

  const payload = JSON.parse(assetText) as {
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
  for (const state of matchedStates) {
    const fileName = `${stateSlug(state)}.json`;
    if (!stateFiles.has(fileName)) throw new Error(`Missing state-scoped canonical geometry asset: ${fileName}`);
  }

  console.log(
    `Canonical geometry audit passed: ${features.length}/${routes.length} routes matched; `
    + `${matchedStates.size} state assets present; ${formatMiB(Buffer.byteLength(assetText))} monolith; `
    + `${formatMiB(stateTotalBytes)} state total.`,
  );
}

function formatMiB(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
