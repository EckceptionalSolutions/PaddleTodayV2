import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { rivers } from '../src/data/rivers';
import { riverTripDetails } from '../src/data/river-trip-details';
import type { River } from '../src/lib/types';

const root = process.cwd();
const routeDir = path.join(root, 'src', 'data', 'routes');
const tripDetailDir = path.join(root, 'src', 'data', 'trip-details');

function stateSlug(state: string) {
  return state.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function identifier(slug: string, suffix: string) {
  const camel = slug.replace(/-([a-z0-9])/g, (_, character: string) => character.toUpperCase());
  return `${camel}${suffix}`;
}

function moduleHeader() {
  return '// State-scoped route data. Keep entries in route-family and downstream order.\n';
}

async function main() {
  const routesByState = new Map<string, River[]>();
  for (const river of rivers) {
    const stateRoutes = routesByState.get(river.state) ?? [];
    stateRoutes.push(river);
    routesByState.set(river.state, stateRoutes);
  }

  const stateByRouteId = new Map(rivers.map((river) => [river.id, river.state]));
  const detailsByState = new Map<string, Record<string, typeof riverTripDetails[string]>>();
  for (const [routeId, details] of Object.entries(riverTripDetails)) {
    // Keep historical details for retired/consolidated route IDs available
    // without forcing them into an active state's route module.
    const state = stateByRouteId.get(routeId) ?? 'Retired';
    const stateDetails = detailsByState.get(state) ?? {};
    stateDetails[routeId] = details;
    detailsByState.set(state, stateDetails);
  }

  await Promise.all([mkdir(routeDir, { recursive: true }), mkdir(tripDetailDir, { recursive: true })]);
  const states = [...routesByState.keys()].sort();
  const routeImports = [];
  const routeSpreads = [];
  const detailImports = [];
  const detailSpreads = [];

  for (const state of states) {
    const slug = stateSlug(state);
    const routeIdentifier = identifier(slug, 'Routes');
    const detailIdentifier = identifier(slug, 'RiverTripDetails');
    routeImports.push(`import { ${routeIdentifier} } from './routes/${slug}';`);
    routeSpreads.push(`  ...${routeIdentifier},`);
    detailImports.push(`import { ${detailIdentifier} } from './trip-details/${slug}';`);
    detailSpreads.push(`  ...${detailIdentifier},`);

    await writeFile(
      path.join(routeDir, `${slug}.ts`),
      `${moduleHeader()}import type { River } from '../../lib/types';\n\n`
        + `export const ${routeIdentifier}: River[] = ${JSON.stringify(routesByState.get(state), null, 2)};\n`,
      'utf8',
    );
    await writeFile(
      path.join(tripDetailDir, `${slug}.ts`),
      `${moduleHeader()}import type { RiverTripDetails } from '../../lib/types';\n\n`
        + `export const ${detailIdentifier}: Record<string, RiverTripDetails> = ${JSON.stringify(detailsByState.get(state) ?? {}, null, 2)};\n`,
      'utf8',
    );
  }

  const retiredDetails = detailsByState.get('Retired');
  if (retiredDetails && Object.keys(retiredDetails).length > 0) {
    detailImports.push(`import { retiredRiverTripDetails } from './trip-details/retired';`);
    detailSpreads.push('  ...retiredRiverTripDetails,');
    await writeFile(
      path.join(tripDetailDir, 'retired.ts'),
      `${moduleHeader()}import type { RiverTripDetails } from '../../lib/types';\n\n`
        + `export const retiredRiverTripDetails: Record<string, RiverTripDetails> = ${JSON.stringify(retiredDetails, null, 2)};\n`,
      'utf8',
    );
  }

  const routeOrder = rivers.map((river) => river.slug);
  await writeFile(
    path.join(root, 'src', 'data', 'rivers.ts'),
    `import type { River } from '../lib/types';\n${routeImports.join('\n')}\n\n`
      + `const stateRoutes: River[] = [\n${routeSpreads.join('\n')}\n];\n`
      + `const routeBySlug = new Map(stateRoutes.map((route) => [route.slug, route]));\n`
      + `const routeOrder = ${JSON.stringify(routeOrder, null, 2)};\n\n`
      + `export const rivers: River[] = routeOrder.map((slug) => {\n`
      + `  const route = routeBySlug.get(slug);\n`
      + `  if (!route) throw new Error(\`Missing state-scoped route data for \${slug}.\`);\n`
      + `  return route;\n`
      + `});\n`,
    'utf8',
  );
  await writeFile(
    path.join(root, 'src', 'data', 'river-trip-details.ts'),
    `import type { RiverTripDetails } from '../lib/types';\n${detailImports.join('\n')}\n\n`
      + `export const riverTripDetails: Record<string, RiverTripDetails> = {\n${detailSpreads.join('\n')}\n};\n`,
    'utf8',
  );

  console.log(`Split ${rivers.length} routes and ${Object.keys(riverTripDetails).length} trip-detail records across ${states.length} states.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
