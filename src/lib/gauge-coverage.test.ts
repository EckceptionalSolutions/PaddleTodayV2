import { describe, expect, it } from 'vitest';
import {
  classifyGaugeRouteReadiness,
  computeStateGaugeCoverage,
  gaugeResearchPriorityScore,
  gaugeResearchStatus,
  selectGaugeReviewCandidates,
  validateGaugeCoverageArtifacts,
  type GaugeInventoryArtifact,
  type GaugeReviewLedgerArtifact,
} from './gauge-coverage';

const inventory: GaugeInventoryArtifact = {
  version: 1,
  inventoryId: 'test-v1',
  generatedAt: '2026-08-14T00:00:00.000Z',
  scope: 'provider_baseline',
  statesBaselined: ['TX'],
  gauges: [
    { key: 'usgs:1', provider: 'usgs', siteId: '1', siteName: 'One', homeState: 'TX', coverageStates: ['TX'], availableMetrics: ['discharge_cfs'], source: 'provider_inventory' },
    { key: 'usgs:2', provider: 'usgs', siteId: '2', siteName: 'Two', homeState: 'TX', coverageStates: ['TX'], availableMetrics: ['gage_height_ft'], source: 'provider_inventory' },
    { key: 'usgs:3', provider: 'usgs', siteId: '3', siteName: 'Three', homeState: 'TX', coverageStates: ['TX'], availableMetrics: ['discharge_cfs'], source: 'provider_inventory' },
  ],
};

const ledger: GaugeReviewLedgerArtifact = {
  version: 1,
  updatedAt: '2026-08-14T00:00:00.000Z',
  reviews: [
    { key: 'usgs:1', status: 'covered', routeReadiness: 'published', eligibility: 'route_capable', relationship: 'direct', checkedAt: '2026-08-14T00:00:00.000Z', decisionReason: 'Covered', decisionSource: 'manual', routeSlugs: ['route'], scoredRouteSlugs: ['route'], routeFamilies: ['river'], blockers: [], evidence: [] },
    { key: 'usgs:2', status: 'blocked', routeReadiness: 'research_needed', eligibility: 'route_capable', relationship: 'none', checkedAt: '2026-08-14T00:00:00.000Z', decisionReason: 'No access', decisionSource: 'manual', routeSlugs: [], scoredRouteSlugs: [], routeFamilies: [], blockers: ['access'], evidence: [] },
    { key: 'usgs:3', status: 'screened_out', routeReadiness: 'screened_out', eligibility: 'not_paddle_relevant', relationship: 'none', checkedAt: '2026-08-14T00:00:00.000Z', decisionReason: 'Reservoir only', decisionSource: 'manual', routeSlugs: [], scoredRouteSlugs: [], routeFamilies: [], blockers: [], evidence: [] },
  ],
};

describe('gauge coverage', () => {
  it('subdivides blocked gauges without inferring screened-out status', () => {
    expect(classifyGaugeRouteReadiness(ledger.reviews[1])).toBe('research_needed');
    expect(classifyGaugeRouteReadiness({
      ...ledger.reviews[1],
      relationship: 'direct',
      routeFamilies: ['Candidate River'],
    })).toBe('candidate');
    expect(classifyGaugeRouteReadiness({
      ...ledger.reviews[1],
      decisionReason: 'Provider-equivalent to a covered gauge; the existing scored route already represents this reach.',
    })).toBe('existing_route_gap');
    expect(classifyGaugeRouteReadiness({
      ...ledger.reviews[1],
      decisionReason: 'Retry only when materially new evidence is published.',
    })).toBe('deferred');
  });

  it('separates gauge review completeness from route coverage', () => {
    const coverage = computeStateGaugeCoverage('TX', inventory, ledger);
    expect(coverage).toMatchObject({
      knownGaugeCount: 3,
      eligibleGaugeCount: 2,
      reviewedGaugeCount: 2,
      reviewCoveragePercent: 100,
      routeCapableGaugeCount: 2,
      coveredGaugeCount: 1,
      routeCoveragePercent: 50,
      screenedOutGaugeCount: 1,
    });
    expect(gaugeResearchStatus(coverage, 'not_started')).toBe('discovery_sweep_required');
    expect(gaugeResearchStatus(coverage, 'not_started', true)).toBe('research_complete');
  });

  it('keeps seed inventories in baseline-pending status', () => {
    const seed = { ...inventory, scope: 'known_evidence_seed' as const, statesBaselined: [] };
    const coverage = computeStateGaugeCoverage('TX', seed, ledger);
    expect(gaugeResearchStatus(coverage, 'saturated')).toBe('gauge_baseline_pending');
    expect(gaugeResearchPriorityScore(coverage, 'saturated')).toBeGreaterThan(1_000_000);
  });

  it('rejects duplicate, orphaned, and unsupported covered rows', () => {
    const invalidLedger: GaugeReviewLedgerArtifact = {
      ...ledger,
      reviews: [
        ...ledger.reviews,
        { ...ledger.reviews[0], key: 'usgs:missing', scoredRouteSlugs: [] },
      ],
    };
    const issues = validateGaugeCoverageArtifacts(inventory, invalidLedger);
    expect(issues.some((issue) => issue.includes('absent from the inventory'))).toBe(true);
    expect(issues.some((issue) => issue.includes('has no scored route'))).toBe(true);
  });

  it('selects unresolved gauges without reopening final dispositions', () => {
    const unresolvedLedger: GaugeReviewLedgerArtifact = {
      ...ledger,
      reviews: ledger.reviews.map((review) => review.key === 'usgs:2'
        ? { ...review, status: 'researching', routeSlugs: ['candidate-route'] }
        : review),
    };
    const candidates = selectGaugeReviewCandidates('TX', inventory, unresolvedLedger);
    expect(candidates.map((candidate) => candidate.gauge.key)).toEqual(['usgs:2']);
  });
});
