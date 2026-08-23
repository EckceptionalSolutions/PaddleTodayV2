import { routeInventory } from '../src/data/rivers';
import { loadGaugeCoverageArtifacts } from '../src/lib/gauge-coverage';

const { inventory, ledger } = loadGaugeCoverageArtifacts();
const routeSlugs = new Set(routeInventory.map((route) => route.slug));
const issues: string[] = [];

for (const review of ledger.reviews) {
  for (const slug of [...review.routeSlugs, ...review.scoredRouteSlugs]) {
    if (!routeSlugs.has(slug)) issues.push(`${review.key} references unknown route ${slug}.`);
  }
  if (review.status === 'covered' && review.relationship !== 'direct' && review.relationship !== 'mixed') {
    issues.push(`${review.key} is covered without a direct gauge relationship.`);
  }
  if (review.status === 'blocked' && review.blockers.length === 0) {
    issues.push(`${review.key} is blocked without a blocker category.`);
  }
  if (review.status === 'blocked' && !['candidate', 'research_needed', 'existing_route_gap', 'deferred'].includes(review.routeReadiness)) {
    issues.push(`${review.key} has blocked status with incompatible ${review.routeReadiness} route readiness.`);
  }
}

for (const stateId of inventory.statesBaselined) {
  if (!inventory.gauges.some((gauge) => gauge.source === 'provider_inventory' && gauge.coverageStates.includes(stateId))) {
    issues.push(`${stateId} is marked baselined without a provider inventory gauge.`);
  }
}

if (issues.length > 0) {
  console.error(issues.join('\n'));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({
    inventoryId: inventory.inventoryId,
    scope: inventory.scope,
    gauges: inventory.gauges.length,
    reviews: ledger.reviews.length,
    statesBaselined: inventory.statesBaselined.length,
    covered: ledger.reviews.filter((review) => review.status === 'covered').length,
  }));
}
