import { readFile } from 'node:fs/promises';

import { publicRivers, rivers, routeInventory } from '../src/data/rivers';
import { riverTripDetails } from '../src/data/river-trip-details';
import { coordinateWithheldRouteSlugs } from '../src/data/generated/withheld-route-slugs';

interface GeometryManifest {
  routeCount?: number;
  matchedRouteCount?: number;
  unmatchedRouteIds?: string[];
  states?: Array<{ state?: string; routeCount?: number }>;
}

interface StateRegistry {
  canonicalStates?: Array<{ id?: string; name?: string }>;
}

function countByState(routes: Array<{ state: string }>) {
  return Object.fromEntries(
    [...routes.reduce((counts, route) => counts.set(route.state, (counts.get(route.state) ?? 0) + 1), new Map<string, number>())]
      .sort(([left], [right]) => left.localeCompare(right)),
  );
}

function duplicateValues(values: string[]) {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([value, count]) => ({ value, count }));
}

const geometry = JSON.parse(
  await readFile('public/data/canonical-river-geometries.json', 'utf8'),
) as GeometryManifest;
const stateRegistry = JSON.parse(
  await readFile('docs/operations/state-registry.json', 'utf8'),
) as StateRegistry;

const inventoryIds = new Set(routeInventory.map((route) => route.id));
const inventorySlugs = new Set(routeInventory.map((route) => route.slug));
const tripDetailKeys = Object.keys(riverTripDetails);
const registryStates = (stateRegistry.canonicalStates ?? [])
  .map((state) => state.name)
  .filter((state): state is string => Boolean(state));
const inventoryStates = [...new Set(routeInventory.map((route) => route.state))].sort();

const summary = {
  definitions: {
    routeInventory: 'All routes in the ordered route inventory.',
    scoredRoutes: 'Inventory routes with a qualifying direct gauge.',
    publicRoutes: 'Inventory routes with a qualifying gauge or reviewed planning eligibility.',
    coordinateWithheld: 'Routes withheld by the generated coordinate-verification queue.',
    tripDetails: 'Keys present in the trip-detail registry, including retired records.',
    geometryManifest: 'Route count recorded by the canonical geometry manifest.',
  },
  counts: {
    routeInventory: routeInventory.length,
    scoredRoutes: rivers.length,
    publicRoutes: publicRivers.length,
    coordinateWithheld: coordinateWithheldRouteSlugs.length,
    coordinateWithheldInInventory: coordinateWithheldRouteSlugs.filter((slug) => inventorySlugs.has(slug)).length,
    tripDetails: tripDetailKeys.length,
    inventoryMissingTripDetails: routeInventory.filter((route) => !riverTripDetails[route.id]).length,
    tripDetailsOutsideInventory: tripDetailKeys.filter((id) => !inventoryIds.has(id)).length,
    geometryManifest: geometry.routeCount ?? null,
    geometryMatched: geometry.matchedRouteCount ?? null,
  },
  duplicateIds: duplicateValues(routeInventory.map((route) => route.id)),
  duplicateSlugs: duplicateValues(routeInventory.map((route) => route.slug)),
  stateRegistryMissingFromInventory: registryStates.filter((state) => !inventoryStates.includes(state)),
  inventoryStatesMissingFromRegistry: inventoryStates.filter((state) => !registryStates.includes(state)),
  byState: {
    routeInventory: countByState(routeInventory),
    scoredRoutes: countByState(rivers),
    publicRoutes: countByState(publicRivers),
    geometryManifest: Object.fromEntries(
      (geometry.states ?? [])
        .filter((state): state is { state: string; routeCount?: number } => Boolean(state.state))
        .sort((left, right) => left.state.localeCompare(right.state))
        .map((state) => [state.state, state.routeCount ?? null]),
    ),
  },
};

console.log(JSON.stringify(summary, null, 2));
