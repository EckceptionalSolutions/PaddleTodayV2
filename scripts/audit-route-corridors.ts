import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { listRivers } from '../src/lib/rivers';
import { routeCorridorDefinitions } from '../src/data/route-corridors';

const root = process.cwd();
const reportPath = join(root, 'docs', 'route-corridor-migration.md');
const rivers = listRivers();
type ReviewRow = { corridorId: string; status: 'draft' | 'review' | 'approved' | 'rejected'; owner: string; continuityStatus: string; nextReview: string };

function coveredDefinition(slug: string) {
  return routeCorridorDefinitions.find((definition) => definition.slugs?.includes(slug) || definition.slugPrefix && slug.startsWith(definition.slugPrefix));
}

function groupKey(route: (typeof rivers)[number]) {
  return route.riverId || route.name;
}

async function main() {
  const errors: string[] = [];
  const reviewLedger = JSON.parse(await readFile(join(root, 'docs', 'corridor-review-ledger.json'), 'utf8')) as ReviewRow[];
  const reviewById = new Map(reviewLedger.map((row) => [row.corridorId, row]));
  const seenSlugs = new Set<string>();

  for (const definition of routeCorridorDefinitions) {
    if (!definition.corridorId || !definition.label) errors.push('Every corridor needs an id and label.');
    const review = reviewById.get(definition.corridorId);
    if (!review || !review.owner || !review.status || review.continuityStatus !== definition.continuityStatus) errors.push(`${definition.corridorId} is missing a matching review-ledger row.`);
    const matches = rivers.filter((route) => definition.slugs?.includes(route.slug) || definition.slugPrefix && route.slug.startsWith(definition.slugPrefix));
    if (matches.length === 0) errors.push(`${definition.corridorId} matches no routes.`);
    for (const route of matches) {
      if (seenSlugs.has(route.slug)) errors.push(`Route is assigned to multiple corridors: ${route.slug}`);
      seenSlugs.add(route.slug);
    }

    if (definition.canonicalSlug) {
      const canonical = rivers.find((route) => route.slug === definition.canonicalSlug);
      if (!canonical) {
        errors.push(`${definition.corridorId} canonical route is missing: ${definition.canonicalSlug}`);
      } else if (definition.segmentEdges?.length) {
        const accessIds = new Set([
          canonical.putIn?.id,
          ...(canonical.accessPoints ?? []).map((point) => point.id),
          canonical.takeOut?.id,
        ].filter(Boolean));
        for (const edge of definition.segmentEdges) {
          if (!accessIds.has(edge.fromId) || !accessIds.has(edge.toId)) {
            errors.push(`${definition.corridorId} edge references an access missing from ${definition.canonicalSlug}: ${edge.fromId}->${edge.toId}`);
          }
        }
      }
    }
  }

  const denseFamilies = new Map<string, { state: string; name: string; routes: number; covered: number }>();
  for (const route of rivers) {
    const key = `${route.state}:${groupKey(route)}`;
    const current = denseFamilies.get(key) ?? { state: route.state, name: route.name, routes: 0, covered: 0 };
    current.routes += 1;
    if (coveredDefinition(route.slug)) current.covered += 1;
    denseFamilies.set(key, current);
  }

  const remaining = [...denseFamilies.values()]
    .filter((family) => family.routes > 1 && family.covered === 0)
    .sort((left, right) => right.routes - left.routes || left.name.localeCompare(right.name));

  const lines = [
    '# Route corridor migration inventory',
    '',
    `Generated ${new Date().toISOString()}.`,
    '',
    `- Defined corridors: ${routeCorridorDefinitions.length}`,
    `- Routes covered by a corridor definition: ${seenSlugs.size}`,
    `- Remaining multi-route families: ${remaining.length}`,
    '',
    '## Defined corridors',
    '',
    '| Corridor | Label | Continuity | Matching routes | Verified edges |',
    '| --- | --- | --- | ---: | ---: |',
    ...routeCorridorDefinitions.map((definition) => {
      const matches = rivers.filter((route) => coveredDefinition(route.slug)?.corridorId === definition.corridorId);
      return `| ${definition.corridorId} | ${definition.label} | ${definition.continuityStatus} | ${matches.length} | ${definition.segmentEdges?.filter((edge) => edge.status === 'verified').length ?? 0} |`;
    }),
    '',
    '## Next pilot priorities (MN / WI / IA)',
    '',
    '| Priority | State | River family | Route records |',
    '| ---: | --- | --- | ---: |',
    ...remaining.filter((family) => ['Minnesota', 'Wisconsin', 'Iowa'].includes(family.state)).slice(0, 10).map((family, index) => `| ${index + 1} | ${family.state} | ${family.name} | ${family.routes} |`),
    '',
    '## Remaining dense families',
    '',
    '| State | River family | Route records |',
    '| --- | --- | ---: |',
    ...remaining.slice(0, 40).map((family) => `| ${family.state} | ${family.name} | ${family.routes} |`),
    remaining.length > 40 ? `| Additional families omitted | See route data and overlap audit | ${remaining.length - 40} |` : '',
    '',
    'This inventory is a migration queue, not an automatic deletion list. Each family still requires source review for continuity, hazards, access legality, gauge boundaries, and explicit trip edges.',
    '',
  ];

  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, lines.join('\n'));

  if (errors.length > 0) {
    throw new Error(`Route corridor audit failed:\n- ${errors.join('\n- ')}`);
  }

  console.log(`Route corridor audit passed: ${routeCorridorDefinitions.length} definitions, ${seenSlugs.size} covered routes.`);
  console.log(`Wrote ${reportPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
