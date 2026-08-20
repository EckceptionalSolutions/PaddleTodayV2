import { describe, expect, it } from 'vitest';
import { buildRouteOpportunityQueue, materializeRouteOpportunityTasks } from './route-opportunities';
import type { GaugeInventoryArtifact, GaugeReviewLedgerArtifact } from './gauge-coverage';

const inventory: GaugeInventoryArtifact = {
  version: 1,
  inventoryId: 'provider-v1',
  generatedAt: '2026-08-20T00:00:00.000Z',
  scope: 'provider_baseline',
  statesBaselined: ['MN', 'TX'],
  gauges: [
    { key: 'usgs:1', provider: 'usgs', siteId: '1', siteName: 'Actionable River', homeState: 'MN', coverageStates: ['MN'], availableMetrics: ['discharge_cfs'], source: 'provider_inventory' },
    { key: 'usgs:2', provider: 'usgs', siteId: '2', siteName: 'Private River', homeState: 'MN', coverageStates: ['MN'], availableMetrics: ['discharge_cfs'], source: 'provider_inventory' },
    { key: 'usgs:3', provider: 'usgs', siteId: '3', siteName: 'Other River', homeState: 'TX', coverageStates: ['TX'], availableMetrics: ['discharge_cfs'], source: 'provider_inventory' },
  ],
};

const ledger: GaugeReviewLedgerArtifact = {
  version: 1,
  updatedAt: '2026-08-20T00:00:00.000Z',
  reviews: [
    { key: 'usgs:1', status: 'blocked', eligibility: 'route_capable', relationship: 'direct', checkedAt: '2026-08-20T00:00:00.000Z', decisionReason: 'Station-specific threshold is missing.', decisionSource: 'manual', routeSlugs: [], scoredRouteSlugs: [], routeFamilies: ['Actionable River'], blockers: ['threshold'], evidence: ['official access'] },
    { key: 'usgs:2', status: 'blocked', eligibility: 'route_capable', relationship: 'none', checkedAt: '2026-08-20T00:00:00.000Z', decisionReason: 'Private access and permit prohibition.', decisionSource: 'manual', routeSlugs: [], scoredRouteSlugs: [], routeFamilies: [], blockers: ['private access'], evidence: [] },
    { key: 'usgs:3', status: 'covered', eligibility: 'route_capable', relationship: 'direct', checkedAt: '2026-08-20T00:00:00.000Z', decisionReason: 'Existing route.', decisionSource: 'derived_route_inventory', routeSlugs: ['route'], scoredRouteSlugs: ['route'], routeFamilies: ['Other River'], blockers: [], evidence: [] },
  ],
};

describe('route opportunity queue', () => {
  it('creates bounded actionable research opportunities and excludes permanent blockers', () => {
    const queue = buildRouteOpportunityQueue(inventory, ledger, new Map([['MN', 0], ['TX', 5]]), [], 5, 20);
    expect(queue.opportunities).toHaveLength(1);
    expect(queue.opportunities[0]).toMatchObject({ stateId: 'MN', gaugeKey: 'usgs:1', priority: 'high', status: 'ready' });
    expect(queue.opportunities[0].nextEvidenceAction).toContain('threshold');
  });

  it('materializes a route-research task without reopening existing work', () => {
    const queue = buildRouteOpportunityQueue(inventory, ledger, new Map([['MN', 0], ['TX', 5]]));
    const tasks = materializeRouteOpportunityTasks([], queue, inventory.inventoryId, new Map([['MN', 0]]));
    expect(tasks[0]).toMatchObject({ kind: 'route_research', lane: 'ready', gaugeKeys: ['usgs:1'], routeOpportunity: true });
    const preserved = materializeRouteOpportunityTasks(tasks, queue, inventory.inventoryId, new Map([['MN', 0]]));
    expect(preserved).toHaveLength(1);
  });

  it('retires a ready generated task when the gauge leaves the actionable queue', () => {
    const queue = buildRouteOpportunityQueue(inventory, ledger, new Map([['MN', 0], ['TX', 5]]));
    const tasks = materializeRouteOpportunityTasks([], queue, inventory.inventoryId, new Map([['MN', 0]]));
    const coveredLedger = { ...ledger, reviews: ledger.reviews.map((review) => review.key === 'usgs:1' ? { ...review, status: 'covered' as const } : review) };
    const emptyQueue = buildRouteOpportunityQueue(inventory, coveredLedger, new Map([['MN', 0], ['TX', 5]]));
    const retired = materializeRouteOpportunityTasks(tasks, emptyQueue, inventory.inventoryId, new Map([['MN', 0]]));
    expect(retired[0]).toMatchObject({ id: 'route-opportunity-mn-usgs-1', lane: 'blocked' });
  });
});
