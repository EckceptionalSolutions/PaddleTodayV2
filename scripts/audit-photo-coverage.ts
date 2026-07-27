import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { dedicatedRiverGroupHeroPhotos } from '../src/data/river-group-hero-photos.ts';
import { getRiverGroupHeroPhoto } from '../src/data/river-group-hero.ts';
import { getRoutePreviewPhoto } from '../src/data/route-gallery.ts';
import { listRiverGroups, listRivers } from '../src/lib/rivers.ts';

const TRACKED_STATES = ['Wisconsin', 'Iowa', 'Minnesota'] as const;

type SourceKind = 'route' | 'river' | 'placeholder';

type CoverageCounts = Record<SourceKind, number> & {
  total: number;
};

const allRoutes = listRivers();
const allRiverGroups = listRiverGroups();

const rows = TRACKED_STATES.map((state) => {
  const routes = allRoutes.filter((route) => route.state === state);
  const counts: CoverageCounts = {
    total: routes.length,
    route: 0,
    river: 0,
    placeholder: 0,
  };

  for (const route of routes) {
    counts[getRoutePreviewPhoto(route).sourceKind] += 1;
  }

  const riverGroups = allRiverGroups.filter((group) => group.states.includes(state));
  const hubHeroes = riverGroups.filter((group) => getRiverGroupHeroPhoto(group.riverId, group.routes)).length;

  return {
    state,
    ...counts,
    hubHeroes,
    riverGroups: riverGroups.length,
  };
});

const combined = rows.reduce(
  (totals, row) => {
    totals.total += row.total;
    totals.route += row.route;
    totals.river += row.river;
    totals.placeholder += row.placeholder;
    totals.hubHeroes += row.hubHeroes;
    totals.riverGroups += row.riverGroups;
    return totals;
  },
  {
    total: 0,
    route: 0,
    river: 0,
    placeholder: 0,
    hubHeroes: 0,
    riverGroups: 0,
  },
);

const root = process.cwd();
const missingAssets = Object.entries(dedicatedRiverGroupHeroPhotos)
  .filter(([, photo]) => !existsSync(join(root, 'public', photo.src.replace(/^\//, ''))))
  .map(([riverId, photo]) => `${riverId}:${photo.src}`);

const mobileRoutePhotosSource = readFileSync(join(root, 'apps/mobile/src/lib/route-photos.ts'), 'utf8');
const missingMobileFallbacks = Object.entries(dedicatedRiverGroupHeroPhotos)
  .filter(([riverId, photo]) => !mobileRoutePhotosSource.includes(`'${riverId}': '${photo.src}'`))
  .map(([riverId]) => riverId);

console.table(
  rows.map((row) => ({
    state: row.state,
    total: row.total,
    route: row.route,
    river: row.river,
    placeholder: row.placeholder,
    hubHeroes: `${row.hubHeroes}/${row.riverGroups}`,
  })),
);

console.log('Combined', combined);
console.log('Hub heroes combined', `${combined.hubHeroes}/${combined.riverGroups}`);
console.log('Missing dedicated hero assets', missingAssets.length, missingAssets);
console.log('Missing mobile river fallbacks', missingMobileFallbacks.length, missingMobileFallbacks);

for (const state of TRACKED_STATES) {
  const missing = allRiverGroups
    .filter((group) => group.states.includes(state))
    .filter((group) => !getRiverGroupHeroPhoto(group.riverId, group.routes))
    .sort((a, b) => b.routeCount - a.routeCount || a.name.localeCompare(b.name))
    .map((group) => `${group.name} (${group.riverId}, ${group.routeCount})`);

  console.log(`Missing ${state} (${missing.length}):`, missing.join('; '));
}

if (missingAssets.length > 0 || missingMobileFallbacks.length > 0) {
  process.exitCode = 1;
}
