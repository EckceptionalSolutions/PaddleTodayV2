import { mkdir, writeFile } from 'node:fs/promises';
import { routeInventory, rivers } from '../src/data/rivers';

const unavailableDirectGaugeKeys = new Set([
  'mn_dnr:179',
  'mn_dnr:280',
  'mn_dnr:341',
  'usgs:04021960',
]);

const scoredSlugs = new Set(rivers.map((route) => route.slug));
const minnesotaRoutes = routeInventory.filter((route) => route.state === 'Minnesota');
const planningRoutes = minnesotaRoutes.filter((route) => !scoredSlugs.has(route.slug));

const rows = planningRoutes.map((route) => {
  const gaugeKey = `${route.gaugeSource.provider}:${route.gaugeSource.siteId}`;
  const classification = unavailableDirectGaugeKeys.has(gaugeKey)
    ? 'unavailable_direct_gauge'
    : route.gaugeSource.kind === 'proxy'
      ? 'proxy_planning_route'
      : 'other_publication_blocker';
  return {
    slug: route.slug,
    river: route.name,
    reach: route.reach,
    gaugeProvider: route.gaugeSource.provider,
    gaugeSiteId: route.gaugeSource.siteId,
    gaugeKind: route.gaugeSource.kind,
    thresholdModel: route.profile.thresholdModel,
    classification,
    nextAction:
      classification === 'proxy_planning_route'
        ? 'Review for a defensible direct gauge; otherwise preserve as planning-only.'
        : 'Recheck provider availability before considering promotion.',
  };
});

const riverGroups = [...new Set(rows.map((row) => row.river))]
  .map((river) => ({ river, planningRoutes: rows.filter((row) => row.river === river).length }))
  .sort((a, b) => b.planningRoutes - a.planningRoutes || a.river.localeCompare(b.river));

const report = {
  generatedAt: new Date().toISOString(),
  state: 'Minnesota',
  decision: 'saturation_review',
  rule: 'Only scored routes count toward saturation; planning routes are excluded.',
  totals: {
    inventory: minnesotaRoutes.length,
    scored: minnesotaRoutes.length - planningRoutes.length,
    planning: planningRoutes.length,
    proxyPlanning: rows.filter((row) => row.classification === 'proxy_planning_route').length,
    unavailableDirect: rows.filter((row) => row.classification === 'unavailable_direct_gauge').length,
  },
  conclusion:
    'Discovery appears provisionally saturated, but Minnesota is not formally saturated until the planning-to-scored conversion review, demand review, and final bounded discovery sweep are complete.',
  riverGroups,
  routes: rows,
};

await mkdir('docs/operations', { recursive: true });
await writeFile('docs/operations/minnesota-saturation-audit.json', `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(`Minnesota saturation audit written: ${report.totals.scored} scored, ${report.totals.planning} planning (${report.totals.proxyPlanning} proxy, ${report.totals.unavailableDirect} unavailable direct).`);
