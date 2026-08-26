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
    { key: 'usgs:4', provider: 'usgs', siteId: '4', siteName: 'Next River', homeState: 'MN', coverageStates: ['MN'], availableMetrics: ['discharge_cfs'], source: 'provider_inventory' },
  ],
};

const ledger: GaugeReviewLedgerArtifact = {
  version: 1,
  updatedAt: '2026-08-20T00:00:00.000Z',
  reviews: [
    { key: 'usgs:1', status: 'blocked', routeReadiness: 'candidate', eligibility: 'route_capable', relationship: 'direct', checkedAt: '2026-08-20T00:00:00.000Z', decisionReason: 'Station-specific threshold is missing.', decisionSource: 'manual', routeSlugs: [], scoredRouteSlugs: [], routeFamilies: ['Actionable River'], blockers: ['threshold'], evidence: ['official access'] },
    { key: 'usgs:2', status: 'blocked', routeReadiness: 'deferred', eligibility: 'route_capable', relationship: 'none', checkedAt: '2026-08-20T00:00:00.000Z', decisionReason: 'Private access and permit prohibition.', decisionSource: 'manual', routeSlugs: [], scoredRouteSlugs: [], routeFamilies: [], blockers: ['private access'], evidence: [] },
    { key: 'usgs:3', status: 'covered', routeReadiness: 'published', eligibility: 'route_capable', relationship: 'direct', checkedAt: '2026-08-20T00:00:00.000Z', decisionReason: 'Existing route.', decisionSource: 'derived_route_inventory', routeSlugs: ['route'], scoredRouteSlugs: ['route'], routeFamilies: ['Other River'], blockers: [], evidence: [] },
    { key: 'usgs:4', status: 'blocked', routeReadiness: 'candidate', eligibility: 'route_capable', relationship: 'direct', checkedAt: '2026-08-20T00:00:00.000Z', decisionReason: 'Endpoint coordinates are missing.', decisionSource: 'manual', routeSlugs: [], scoredRouteSlugs: [], routeFamilies: [], blockers: ['coordinate'], evidence: ['official access', 'official threshold'] },
  ],
};

describe('route opportunity queue', () => {
  it('keeps durable blockers out of the default expansion queue', () => {
    const queue = buildRouteOpportunityQueue(inventory, ledger, new Map([['MN', 0], ['TX', 5]]), [], 5, 20);
    expect(queue.opportunities).toHaveLength(0);
    expect(queue.retryPolicy).toBe('unresolved_only');
  });

  it('creates bounded retry opportunities only when explicitly requested', () => {
    const queue = buildRouteOpportunityQueue(inventory, ledger, new Map([['MN', 0], ['TX', 5]]), [], 5, 20, { includeDurableRetries: true });
    expect(queue.opportunities).toHaveLength(2);
    expect(queue.retryPolicy).toBe('explicit_request_allowed');
    const thresholdOpportunity = queue.opportunities.find((opportunity) => opportunity.gaugeKey === 'usgs:1');
    expect(thresholdOpportunity).toMatchObject({ stateId: 'MN', gaugeKey: 'usgs:1', priority: 'high', status: 'ready', routeReadiness: 'candidate' });
    expect(thresholdOpportunity?.nextEvidenceAction).toContain('threshold');
  });

  it('moves past durably blocked work instead of letting it consume the bounded queue', () => {
    const queue = buildRouteOpportunityQueue(
      inventory,
      ledger,
      new Map([['MN', 0], ['TX', 5]]),
      [{ id: 'route-opportunity-mn-usgs-1', lane: 'blocked', kind: 'route_research', gaugeKeys: ['usgs:1'], routeOpportunity: true }],
      5,
      20,
      { includeDurableRetries: true },
    );
    expect(queue.opportunities.map((opportunity) => opportunity.gaugeKey)).toEqual(['usgs:4']);
    expect(queue.opportunities[0].rankingFactors).toMatchObject({ frontier: 100, searchValue: 80 });
  });

  it('materializes a route-research task without reopening existing work', () => {
    const queue = buildRouteOpportunityQueue(inventory, ledger, new Map([['MN', 0], ['TX', 5]]), [], 5, 20, { includeDurableRetries: true });
    const tasks = materializeRouteOpportunityTasks([], queue, inventory.inventoryId, new Map([['MN', 0]]));
    expect(tasks.find((task) => task.gaugeKeys?.includes('usgs:1'))).toMatchObject({ kind: 'route_research', lane: 'ready', gaugeKeys: ['usgs:1'], routeOpportunity: true });
    const preserved = materializeRouteOpportunityTasks(tasks, queue, inventory.inventoryId, new Map([['MN', 0]]));
    expect(preserved).toHaveLength(2);
  });

  it('retires a ready generated task when the gauge leaves the actionable queue', () => {
    const queue = buildRouteOpportunityQueue(inventory, ledger, new Map([['MN', 0], ['TX', 5]]), [], 5, 20, { includeDurableRetries: true });
    const tasks = materializeRouteOpportunityTasks([], queue, inventory.inventoryId, new Map([['MN', 0]]));
    const coveredLedger = { ...ledger, reviews: ledger.reviews.map((review) => review.key === 'usgs:1' ? { ...review, status: 'covered' as const } : review) };
    const emptyQueue = buildRouteOpportunityQueue(inventory, coveredLedger, new Map([['MN', 0], ['TX', 5]]));
    const retired = materializeRouteOpportunityTasks(tasks, emptyQueue, inventory.inventoryId, new Map([['MN', 0]]));
    expect(retired.find((task) => task.id === 'route-opportunity-mn-usgs-1')).toMatchObject({ lane: 'blocked' });
  });

  it('preserves corridor-first opportunities outside the generated gauge queue', () => {
    const corridorTask = {
      id: 'va-corridor-maury-glen-maury-locher',
      lane: 'ready',
      kind: 'route_research',
      routeOpportunity: true,
      opportunitySource: 'corridor_preflight' as const,
      gaugeKeys: ['usgs:02024000'],
    };
    const tasks = materializeRouteOpportunityTasks([corridorTask], {
      version: 1,
      generatedAt: '2026-08-26T00:00:00Z',
      maxPerState: 5,
      maxGlobal: 20,
      opportunities: [],
    }, inventory.inventoryId, new Map([['VA', 6]]));
    expect(tasks).toEqual([corridorTask]);
  });

  it('does not recycle proxy-only route-candidate notes into new research work', () => {
    const proxyLedger = {
      ...ledger,
      reviews: ledger.reviews.map((review) => review.key === 'usgs:1'
        ? { ...review, decisionReason: 'A route candidate references this gauge but does not clear scored-route publication.', blockers: ['proxy_only'] }
        : review),
    };
    const queue = buildRouteOpportunityQueue(inventory, proxyLedger, new Map([['MN', 0], ['TX', 5]]));
    expect(queue.opportunities).toHaveLength(0);
  });

  it('does not recycle durable fast-screen no-add dispositions', () => {
    const screenedLedger = {
      ...ledger,
      reviews: ledger.reviews.map((review) => review.key === 'usgs:1'
        ? { ...review, decisionSource: 'route-worker-202608241452-tx-1-screen', decisionReason: 'Fast triage found no current public endpoint pair.' }
        : review),
    };
    const queue = buildRouteOpportunityQueue(inventory, screenedLedger, new Map([['MN', 0], ['TX', 5]]));
    expect(queue.opportunities).toHaveLength(0);
  });

  it('does not recycle worker-recorded no-add dispositions', () => {
    const noAddLedger = {
      ...ledger,
      reviews: ledger.reviews.map((review) => review.key === 'usgs:1'
        ? { ...review, decisionSource: 'manual_route_worker_no_add' }
        : review),
    };
    const queue = buildRouteOpportunityQueue(inventory, noAddLedger, new Map([['MN', 0], ['TX', 5]]));
    expect(queue.opportunities).toHaveLength(0);
  });

  it('does not recycle run-specific worker no-add sources', () => {
    const noAddLedger = {
      ...ledger,
      reviews: ledger.reviews.map((review) => review.key === 'usgs:1'
        ? { ...review, decisionSource: 'worker-202608222300-sd-usgs-06476000-no-add' }
        : review),
    };
    const queue = buildRouteOpportunityQueue(inventory, noAddLedger, new Map([['MN', 0], ['TX', 5]]));
    expect(queue.opportunities).toHaveLength(0);
  });
});
