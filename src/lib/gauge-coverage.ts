import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export type GaugeReviewStatus =
  | 'unreviewed'
  | 'researching'
  | 'covered'
  | 'blocked'
  | 'screened_out'
  | 'stale_or_unsupported';

export type GaugeEligibility = 'unknown' | 'route_capable' | 'not_paddle_relevant';
export type GaugeRelationship = 'none' | 'direct' | 'proxy' | 'mixed';

export interface GaugeInventoryEntry {
  key: string;
  provider: 'usgs' | 'mn_dnr';
  siteId: string;
  siteName: string;
  homeState: string;
  coverageStates: string[];
  availableMetrics: Array<'discharge_cfs' | 'gage_height_ft'>;
  source: 'route_inventory' | 'saturation_audit' | 'provider_inventory';
  lastObservationAt?: string;
}

export interface GaugeInventoryArtifact {
  version: number;
  inventoryId: string;
  generatedAt: string;
  scope: 'known_evidence_seed' | 'provider_baseline';
  statesBaselined: string[];
  gauges: GaugeInventoryEntry[];
}

export interface GaugeReviewEntry {
  key: string;
  status: GaugeReviewStatus;
  eligibility: GaugeEligibility;
  relationship: GaugeRelationship;
  checkedAt: string | null;
  decisionReason: string;
  decisionSource: 'derived_route_inventory' | 'saturation_audit' | 'manual' | 'manual_gauge_review' | 'manual_route_worker_review';
  routeSlugs: string[];
  scoredRouteSlugs: string[];
  routeFamilies: string[];
  blockers: string[];
  evidence: string[];
}

export interface GaugeReviewLedgerArtifact {
  version: number;
  updatedAt: string;
  reviews: GaugeReviewEntry[];
}

export interface StateGaugeCoverage {
  stateId: string;
  inventoryId: string;
  baselineComplete: boolean;
  knownGaugeCount: number;
  eligibleGaugeCount: number;
  reviewedGaugeCount: number;
  unreviewedGaugeCount: number;
  coveredGaugeCount: number;
  blockedGaugeCount: number;
  screenedOutGaugeCount: number;
  staleGaugeCount: number;
  routeCapableGaugeCount: number;
  uncoveredRouteCapableGaugeCount: number;
  /** Route-capable gauges still needing research, excluding accepted blockers. */
  unresolvedRouteCapableGaugeCount?: number;
  reviewCoveragePercent: number;
  routeCoveragePercent: number;
  routeFamilyCount: number;
}

const finalReviewStatuses = new Set<GaugeReviewStatus>([
  'covered',
  'blocked',
  'screened_out',
  'stale_or_unsupported',
]);

export function loadGaugeCoverageArtifacts(root = process.cwd()) {
  const operationsDir = resolve(root, 'docs/operations');
  const inventory = JSON.parse(readFileSync(resolve(operationsDir, 'gauge-inventory.json'), 'utf8')) as GaugeInventoryArtifact;
  const ledger = JSON.parse(readFileSync(resolve(operationsDir, 'gauge-review-ledger.json'), 'utf8')) as GaugeReviewLedgerArtifact;
  const issues = validateGaugeCoverageArtifacts(inventory, ledger);
  if (issues.length > 0) {
    throw new Error(`Gauge coverage artifacts are invalid:\n${issues.join('\n')}`);
  }
  return { inventory, ledger };
}

export function validateGaugeCoverageArtifacts(
  inventory: GaugeInventoryArtifact,
  ledger: GaugeReviewLedgerArtifact,
) {
  const issues: string[] = [];
  if (inventory.version !== 1) issues.push('Gauge inventory version must be 1.');
  if (ledger.version !== 1) issues.push('Gauge review ledger version must be 1.');
  if (!inventory.inventoryId.trim()) issues.push('Gauge inventory must have an inventoryId.');

  const inventoryKeys = new Set<string>();
  for (const gauge of inventory.gauges) {
    if (gauge.key !== `${gauge.provider}:${gauge.siteId}`) {
      issues.push(`Gauge ${gauge.key} does not match provider and siteId.`);
    }
    if (inventoryKeys.has(gauge.key)) issues.push(`Duplicate gauge inventory key: ${gauge.key}.`);
    inventoryKeys.add(gauge.key);
    if (gauge.coverageStates.length === 0) issues.push(`Gauge ${gauge.key} has no coverage state.`);
  }

  const reviewKeys = new Set<string>();
  for (const review of ledger.reviews) {
    if (reviewKeys.has(review.key)) issues.push(`Duplicate gauge review key: ${review.key}.`);
    reviewKeys.add(review.key);
    if (!inventoryKeys.has(review.key)) issues.push(`Gauge review ${review.key} is absent from the inventory.`);
    if (review.status === 'covered' && review.scoredRouteSlugs.length === 0) {
      issues.push(`Covered gauge ${review.key} has no scored route.`);
    }
    if (review.status !== 'covered' && review.scoredRouteSlugs.length > 0) {
      issues.push(`Gauge ${review.key} has a scored direct route but is not marked covered.`);
    }
    if (review.status === 'screened_out' && review.eligibility !== 'not_paddle_relevant') {
      issues.push(`Screened-out gauge ${review.key} must be marked not_paddle_relevant.`);
    }
  }

  for (const key of inventoryKeys) {
    if (!reviewKeys.has(key)) issues.push(`Gauge inventory entry ${key} has no review row.`);
  }
  return issues;
}

export function computeStateGaugeCoverage(
  stateId: string,
  inventory: GaugeInventoryArtifact,
  ledger: GaugeReviewLedgerArtifact,
): StateGaugeCoverage {
  const gauges = inventory.gauges.filter((gauge) => gauge.coverageStates.includes(stateId));
  const reviewsByKey = new Map(ledger.reviews.map((review) => [review.key, review]));
  const reviews = gauges.map((gauge) => reviewsByKey.get(gauge.key)).filter((review): review is GaugeReviewEntry => Boolean(review));
  const eligible = reviews.filter((review) => review.eligibility !== 'not_paddle_relevant');
  const reviewed = eligible.filter((review) => finalReviewStatuses.has(review.status));
  const routeCapable = reviews.filter((review) => review.eligibility === 'route_capable');
  const covered = routeCapable.filter((review) => review.status === 'covered');
  const routeFamilies = new Set(covered.flatMap((review) => review.routeFamilies));

  return {
    stateId,
    inventoryId: inventory.inventoryId,
    baselineComplete: inventory.statesBaselined.includes(stateId),
    knownGaugeCount: gauges.length,
    eligibleGaugeCount: eligible.length,
    reviewedGaugeCount: reviewed.length,
    unreviewedGaugeCount: Math.max(0, eligible.length - reviewed.length),
    coveredGaugeCount: covered.length,
    blockedGaugeCount: reviews.filter((review) => review.status === 'blocked').length,
    screenedOutGaugeCount: reviews.filter((review) => review.status === 'screened_out').length,
    staleGaugeCount: reviews.filter((review) => review.status === 'stale_or_unsupported').length,
    routeCapableGaugeCount: routeCapable.length,
    uncoveredRouteCapableGaugeCount: routeCapable.filter((review) => review.status !== 'covered').length,
    unresolvedRouteCapableGaugeCount: routeCapable.filter((review) => ['unreviewed', 'researching'].includes(review.status)).length,
    reviewCoveragePercent: eligible.length === 0 ? 0 : Math.round((reviewed.length / eligible.length) * 100),
    routeCoveragePercent: routeCapable.length === 0 ? 0 : Math.round((covered.length / routeCapable.length) * 100),
    routeFamilyCount: routeFamilies.size,
  };
}

export function gaugeResearchStatus(
  coverage: StateGaugeCoverage,
  saturation: string,
  discoveryComplete = false,
) {
  if (!coverage.baselineComplete) return 'gauge_baseline_pending';
  if (coverage.eligibleGaugeCount > 0 && coverage.reviewedGaugeCount === 0) return 'inventory_ready';
  if (coverage.unreviewedGaugeCount > 0) return 'gauge_review_in_progress';
  if ((coverage.unresolvedRouteCapableGaugeCount ?? coverage.uncoveredRouteCapableGaugeCount) > 0) return 'route_coverage_review';
  if (!discoveryComplete) return 'discovery_sweep_required';
  if (saturation === 'saturated' || saturation === 'provisionally_saturated') return 'saturated';
  return 'research_complete';
}

export function gaugeResearchPriorityScore(coverage: StateGaugeCoverage, saturation: string, discoveryComplete = false) {
  const status = gaugeResearchStatus(coverage, saturation, discoveryComplete);
  if (status === 'saturated') return -1;
  const baselinePenalty = coverage.baselineComplete ? 0 : 1_000_000;
  return baselinePenalty
    + (coverage.unresolvedRouteCapableGaugeCount ?? coverage.uncoveredRouteCapableGaugeCount) * 3_000
    + coverage.unreviewedGaugeCount * 2_000
    + coverage.staleGaugeCount * 1_000
    + coverage.knownGaugeCount;
}

export function selectGaugeReviewCandidates(
  stateId: string,
  inventory: GaugeInventoryArtifact,
  ledger: GaugeReviewLedgerArtifact,
  limit = 5,
) {
  const reviewsByKey = new Map(ledger.reviews.map((review) => [review.key, review]));
  return inventory.gauges
    .filter((gauge) => gauge.coverageStates.includes(stateId))
    .map((gauge) => ({ gauge, review: reviewsByKey.get(gauge.key) }))
    .filter((row): row is { gauge: GaugeInventoryEntry; review: GaugeReviewEntry } => (
      Boolean(row.review) && (row.review?.status === 'unreviewed' || row.review?.status === 'researching')
    ))
    .sort((left, right) => {
      const leftResearching = left.review.status === 'researching' ? 1 : 0;
      const rightResearching = right.review.status === 'researching' ? 1 : 0;
      const leftRouteEvidence = left.review.routeSlugs.length > 0 ? 1 : 0;
      const rightRouteEvidence = right.review.routeSlugs.length > 0 ? 1 : 0;
      return rightResearching - leftResearching
        || rightRouteEvidence - leftRouteEvidence
        || left.gauge.siteName.localeCompare(right.gauge.siteName)
        || left.gauge.key.localeCompare(right.gauge.key);
    })
    .slice(0, Math.max(0, limit));
}
