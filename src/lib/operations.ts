import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { routeInventory, rivers } from '../data/rivers';
import {
  computeStateGaugeCoverage,
  gaugeResearchStatus,
  loadGaugeCoverageArtifacts,
  selectGaugeReviewCandidates,
  type StateGaugeCoverage,
} from './gauge-coverage';
import type { RouteOpportunity } from './route-opportunities';

type CanonicalState = { id: string; name: string; frontierTier: number; frontierLabel: string };
type Task = {
  id: string;
  title: string;
  lane: 'proposed' | 'ready' | 'in_progress' | 'validation' | 'completed' | 'blocked';
  kind: string;
  owner: string;
  priority: string;
  summary: string;
  evidence: string[];
  stateId?: string;
  inventoryId?: string;
  gaugeKeys?: string[];
  discoveryComplete?: boolean;
  routeOpportunity?: boolean;
};

type OverlapReviewItem = {
  id: string;
  status: string;
  priority: string;
  category: string;
  routes: string[];
  findingCount: number;
  maxSeverity: number;
  recommendation: string;
  lastSeenAt: string;
  taskId?: string;
};

/**
 * Ranks unsaturated states by how close their current inventory is to being
 * fully scored. Planning routes remain excluded from the scored numerator;
 * they are deliberately treated as remaining opportunity.
 */
export function rankStateCoverage(states: Array<{ id: string; scored: number; planning: number; saturation: string }>) {
  return states
    .map((state) => {
      const total = state.scored + state.planning;
      const coveragePercent = total === 0 ? 0 : Math.round((state.scored / total) * 100);
      const done = state.saturation === 'provisionally_saturated' || state.saturation === 'saturated';
      const researchStatus = done
        ? 'done'
        : state.scored > 0 && state.planning === 0
          ? 'coverage_complete_review'
          : 'researching';
      return {
        ...state,
        coveragePercent,
        done,
        researchStatus,
        researchPriorityScore: done ? -1 : coveragePercent * 1000 + state.scored,
      };
    })
    .sort((left, right) => right.researchPriorityScore - left.researchPriorityScore || right.scored - left.scored || left.id.localeCompare(right.id));
}

/**
 * Gauge-network ranking used by the Operations Center during the migration.
 * A provider-wide baseline is deliberately worth more than route-derived seed
 * evidence, followed by viable uncovered gauges and unfinished reviews.
 */
export function rankGaugeStateCoverage<T extends {
  id: string;
  scored: number;
  planning: number;
  saturation: string;
  gaugeCoverage: StateGaugeCoverage;
  discoveryComplete?: boolean;
  frontierTier?: number;
  frontierLabel?: string;
}>(states: T[]) {
  return states
    .map((state) => {
      const legacyTotal = state.scored + state.planning;
      const legacyCoveragePercent = legacyTotal === 0 ? 0 : Math.round((state.scored / legacyTotal) * 100);
      const researchStatus = gaugeResearchStatus(state.gaugeCoverage, state.saturation, state.discoveryComplete === true);
      // Gauge-network completion is authoritative after every eligible gauge
      // has a durable disposition and the bounded discovery sweep is done.
      // `research_complete` is therefore complete even when legacy route
      // saturation has not been migrated for that state yet.
      const done = researchStatus === 'saturated' || researchStatus === 'research_complete';
      const frontierTier = state.frontierTier ?? 99;
      const unresolvedRouteCapable = state.gaugeCoverage.unresolvedRouteCapableGaugeCount ?? state.gaugeCoverage.uncoveredRouteCapableGaugeCount;
      const uncoveredRouteCapable = state.gaugeCoverage.uncoveredRouteCapableGaugeCount;
      // Completion answers “have we adjudicated the gauge network?” while
      // expansion answers “could additional route work still be worthwhile?”
      // Keep these separate so a state cannot look exhausted merely because
      // every opportunity is currently blocked or awaiting a better package.
      const routeExpansionStatus = uncoveredRouteCapable > 0 ? 'more_routes_possible' : 'fully_covered';
      const completionGap = state.gaugeCoverage.unreviewedGaugeCount + unresolvedRouteCapable;
      const researchPriorityScore = (100 - Math.min(frontierTier, 99)) * 1_000_000
        - completionGap * 1_000
        - state.gaugeCoverage.staleGaugeCount * 100
        + state.gaugeCoverage.routeCapableGaugeCount;
      return {
        ...state,
        legacyCoveragePercent,
        researchStatus,
        done,
        frontierTier,
        frontierLabel: state.frontierLabel ?? 'Unranked frontier',
        routeExpansionStatus,
        routeExpansionGaugeCount: uncoveredRouteCapable,
        completionGap,
        researchPriorityScore,
      };
    })
    .sort((left, right) => left.frontierTier - right.frontierTier
      || left.completionGap - right.completionGap
      || right.gaugeCoverage.uncoveredRouteCapableGaugeCount - left.gaugeCoverage.uncoveredRouteCapableGaugeCount
      || left.id.localeCompare(right.id));
}

const stateRegistry = JSON.parse(
  readFileSync(resolve(process.cwd(), 'docs/operations/state-registry.json'), 'utf8')
) as { canonicalStates: CanonicalState[]; aliases: Record<string, string> };

const taskRegistry = JSON.parse(
  readFileSync(resolve(process.cwd(), 'docs/operations/tasks.json'), 'utf8')
) as { tasks: Task[] };

const controlState = JSON.parse(
  readFileSync(resolve(process.cwd(), 'automations/route-control-plane/state.json'), 'utf8')
) as {
  updatedAt?: string;
  claims?: Array<{
    id: string;
    state?: string;
    mode?: string;
    status?: string;
    claimedAt?: string;
    completedAt?: string;
    outcome?: string;
    candidateIds?: string[];
  }>;
};

const runHistory = JSON.parse(
  readFileSync(resolve(process.cwd(), 'docs/operations/runs.json'), 'utf8')
) as {
  runs?: Array<{ id: string; kind: string; startedAt: string; completedAt?: string; status: string; taskId?: string; workerRole?: string; summary?: string }>;
};

const overlapQueue = (() => {
  try {
    return JSON.parse(readFileSync(resolve(process.cwd(), 'docs/operations/overlap-review-queue.json'), 'utf8')) as { items?: OverlapReviewItem[]; generatedAt?: string };
  } catch {
    return { items: [] as OverlapReviewItem[], generatedAt: null };
  }
})();

const gaugeCoverageArtifacts = loadGaugeCoverageArtifacts();

const routeOpportunityQueue = (() => {
  try {
    return JSON.parse(readFileSync(resolve(process.cwd(), 'docs/operations/route-opportunity-queue.json'), 'utf8')) as {
      generatedAt?: string;
      maxPerState?: number;
      maxGlobal?: number;
      opportunities?: RouteOpportunity[];
    };
  } catch {
    return { generatedAt: null, maxPerState: 5, maxGlobal: 20, opportunities: [] as RouteOpportunity[] };
  }
})();

function classifyBlocker(text: string) {
  const value = text.toLowerCase();
  if (value.includes('gauge') || value.includes('provider')) return 'gauge/provider';
  if (value.includes('coordinate') || value.includes('geometry')) return 'coordinates/geometry';
  if (value.includes('camp')) return 'camping';
  if (value.includes('safety') || value.includes('dam')) return 'safety';
  if (value.includes('access') || value.includes('endpoint')) return 'access/endpoints';
  if (value.includes('threshold') || value.includes('flow')) return 'thresholds';
  return 'policy/other';
}

function getOperationsTelemetry() {
  const runs = runHistory.runs ?? [];
  const latestByKind = new Map<string, { startedAt: string; status: string; summary?: string }>();
  for (const run of runs) {
    const previous = latestByKind.get(run.kind);
    if (!previous || Date.parse(run.startedAt) > Date.parse(previous.startedAt)) latestByKind.set(run.kind, run);
  }
  const blockedTasks = taskRegistry.tasks.filter((task) => task.lane === 'blocked');
  const blockerCounts = blockedTasks.reduce<Record<string, number>>((counts, task) => {
    const category = classifyBlocker(`${task.title} ${task.summary}`);
    counts[category] = (counts[category] ?? 0) + 1;
    return counts;
  }, {});
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  const routeWorkKinds = (run: { kind?: string; type?: string }) => {
    const runKind = run.kind ?? run.type ?? '';
    return runKind === 'route_implementation' || runKind.includes('route_worker') || runKind === 'route-planning-review' || runKind === 'route_planning_review';
  };
  const recentRouteRuns = runs.filter((run) => Date.parse(run.startedAt) >= cutoff && routeWorkKinds(run));
  const chronologicalRouteRuns = runs
    .filter((run) => routeWorkKinds(run))
    .slice()
    .sort((left, right) => Date.parse(right.startedAt) - Date.parse(left.startedAt));
  const latestRouteRun = chronologicalRouteRuns[0] ?? null;
  const latestRouteRunAt = latestRouteRun?.completedAt ?? latestRouteRun?.startedAt ?? null;
  const routeWorkerCadence = latestRouteRun
    ? {
        latestRunAt: latestRouteRunAt,
        expectedIntervalMinutes: 30,
        elapsedMinutes: latestRouteRunAt ? Math.max(0, Math.round((Date.now() - Date.parse(latestRouteRunAt)) / 60000)) : null,
        status: latestRouteRunAt && Date.now() - Date.parse(latestRouteRunAt) <= 45 * 60000 ? 'on_schedule' : 'overdue',
      }
    : {
        latestRunAt: null,
        expectedIntervalMinutes: 30,
        elapsedMinutes: null,
        status: 'no_run_recorded',
      };
  let consecutiveNoAddRuns = 0;
  for (const run of chronologicalRouteRuns) {
    if (run.status.includes('blocked') || run.status.includes('no_add')) consecutiveNoAddRuns += 1;
    else break;
  }
  const qualityByState = stateRegistry.canonicalStates.map((state) => {
    const routes = routeInventory.filter((route) => canonicalStateId(route.state) === state.id && rivers.some((scored) => scored.slug === route.slug));
    const scores = routes.map((route) => {
      let score = 0;
      if (route.evidenceNotes?.length) score += 1;
      if (route.sourceLinks?.length) score += 1;
      if (route.logistics?.camping) score += 1;
      if (route.safetyProfile) score += 1;
      if (route.putIn && route.takeOut) score += 1;
      return score;
    });
    return { stateId: state.id, averagePackageScore: scores.length ? Math.round((scores.reduce((sum, value) => sum + value, 0) / scores.length) * 10) / 10 : 0, scoredRoutes: routes.length };
  });
  return {
    automationHealth: Array.from(latestByKind.entries()).map(([kind, run]) => ({ kind, ...run })),
    blockerQueue: blockedTasks.map((task) => ({ taskId: task.id, title: task.title, category: classifyBlocker(`${task.title} ${task.summary}`), summary: task.summary })),
    blockerCounts,
    throughput: {
      routeRunsLast24h: recentRouteRuns.length,
      routesAddedLast24h: recentRouteRuns.filter((run) => run.status === 'route_added' || run.kind === 'route_implementation').length,
      noAddRunsLast24h: recentRouteRuns.filter((run) => run.status.includes('blocked') || run.status.includes('no_add')).length,
    },
    routeWorkerCadence,
    saturationDossiers: stateRegistry.canonicalStates.map((state) => {
      const stateTasks = taskRegistry.tasks.filter((task) => task.kind === 'state_coverage' && taskStateId(task) === state.id);
      const row = stateTasks.find((task) => task.discoveryComplete === true)
        ?? stateTasks.find((task) => ['ready', 'in_progress', 'validation'].includes(task.lane))
        ?? stateTasks[0];
      return {
        stateId: state.id,
        stateName: state.name,
        gaugeCoverage: computeStateGaugeCoverage(state.id, gaugeCoverageArtifacts.inventory, gaugeCoverageArtifacts.ledger),
        discoveryTask: row?.id ?? null,
        discoveryStatus: row?.lane ?? 'not_started',
        boundedSearchEvidence: row?.evidence?.length ?? 0,
      };
    }),
    routeQualityByState: qualityByState,
    researchControl: {
      activeState: activeFrontierStateId(),
      consecutiveNoAddRuns,
      rotationThreshold: 10,
      rotationRecommended: consecutiveNoAddRuns >= 10,
      recommendation: consecutiveNoAddRuns >= 10
        ? 'Pause the current frontier after repeated no-add runs and review the next evidence opportunity.'
        : 'Continue bounded gauge review and fresh discovery for the active frontier state.',
    },
    overlapReview: {
      generatedAt: overlapQueue.generatedAt ?? null,
      openItems: (overlapQueue.items ?? []).filter((item) => !['rejected', 'implemented'].includes(item.status)).length,
      highConfidenceItems: (overlapQueue.items ?? []).filter((item) => item.priority === 'high' && item.status === 'new').length,
      items: (overlapQueue.items ?? []).slice(0, 12),
    },
    routeOpportunities: {
      generatedAt: routeOpportunityQueue.generatedAt ?? null,
      ready: (routeOpportunityQueue.opportunities ?? []).filter((item) => item.status === 'ready').length,
      inProgress: (routeOpportunityQueue.opportunities ?? []).filter((item) => item.status === 'in_progress').length,
      blocked: (routeOpportunityQueue.opportunities ?? []).filter((item) => item.status === 'blocked').length,
      items: (routeOpportunityQueue.opportunities ?? []).slice(0, 12),
    },
  };
}

const automationRegistry = [
  { id: 'paddletoday-operations-orchestrator', name: 'PaddleToday Operations Orchestrator', schedule: 'Every two hours', status: 'enabled', owner: 'orchestrator' },
  { id: 'paddletoday-hourly-route-worker', name: 'PaddleToday Route Worker (controller-led)', schedule: 'Controller-led (on demand)', status: 'paused', owner: 'orchestrator' },
  { id: 'paddletoday-route-worker-supervisor', name: 'PaddleToday Route Worker Supervisor', schedule: 'Controller-led (on demand)', status: 'paused', owner: 'orchestrator' },
  { id: 'paddletoday-route-overlap-auditor', name: 'PaddleToday Route Overlap Auditor', schedule: 'Every six hours', status: 'enabled', owner: 'independent-verifier' },
  { id: 'paddletoday-consolidation-reviewer', name: 'PaddleToday Consolidation Reviewer', schedule: 'Every six hours', status: 'enabled', owner: 'independent-verifier' },
  { id: 'paddletoday-daily-operations-report', name: 'PaddleToday Daily Operations Report', schedule: 'Daily at 20:00', status: 'enabled', owner: 'product-analysis' },
  { id: 'paddletoday-route-freshness-monitor', name: 'PaddleToday Route Freshness Monitor', schedule: 'Daily at 06:30', status: 'enabled', owner: 'independent-verifier' },
  { id: 'paddletoday-blocker-resolution-planner', name: 'PaddleToday Blocker Resolution Planner', schedule: 'Daily at 07:00', status: 'enabled', owner: 'orchestrator' },
  { id: 'paddletoday-operations-dossier-refresh', name: 'PaddleToday Operations Dossier Refresh', schedule: 'Daily at 06:00', status: 'enabled', owner: 'orchestrator' },
  { id: 'paddletoday-operations-metrics-refresh', name: 'PaddleToday Operations Metrics Refresh', schedule: 'Daily at 06:15', status: 'enabled', owner: 'product-analysis' },
  { id: 'river-snapshots', name: 'River snapshots', schedule: 'Every 30 minutes', status: 'enabled', owner: 'operations' },
  { id: 'river-alerts', name: 'River alerts', schedule: 'Twice hourly', status: 'enabled', owner: 'operations' },
  { id: 'history-snapshots', name: 'History snapshots', schedule: 'Hourly', status: 'enabled', owner: 'operations' },
  { id: 'weekly-product-report', name: 'Weekly product report', schedule: 'Wednesday weekly', status: 'enabled', owner: 'product-analysis' },
  { id: 'operations-gates', name: 'Operations gatekeeper', schedule: 'Every pull request', status: 'enabled', owner: 'gatekeeper' },
  { id: 'route-control-plane', name: 'Route control plane', schedule: 'Manual pilot; scheduling paused', status: 'pilot', owner: 'state-coverage' },
  { id: 'demand-triage', name: 'Demand triage', schedule: 'Planned', status: 'planned', owner: 'demand-triage' },
  { id: 'product-loop', name: 'Metrics-to-product loop', schedule: 'Planned weekly', status: 'planned', owner: 'product-analysis' },
];

function legacyStateSaturationStatus(stateId: string) {
  if (stateId === 'MN') return 'provisionally_saturated';
  if (
    stateId === 'TX' &&
    taskRegistry.tasks.some((task) => task.id === 'tx-bounded-discovery-sweep' && task.lane === 'completed')
  ) {
    return 'saturated';
  }
  if (
    stateId === 'UT' &&
    taskRegistry.tasks.some((task) => task.id === 'utah-bounded-discovery-sweep' && task.lane === 'completed')
  ) {
    return 'saturated';
  }
  return 'not_started';
}

function canonicalStateId(value: string) {
  const normalized = value.trim();
  if (stateRegistry.canonicalStates.some((state) => state.id === normalized)) return normalized;
  return stateRegistry.aliases[normalized] ?? normalized.toUpperCase();
}

function taskStateId(task: Task) {
  if (task.stateId) return canonicalStateId(task.stateId);
  const exactPrefix = stateRegistry.canonicalStates.find((state) => (
    task.id.toLowerCase().startsWith(`${state.id.toLowerCase()}-`)
    || task.id.toLowerCase().startsWith(`${state.name.toLowerCase().replaceAll(' ', '-')}-`)
  ));
  return exactPrefix?.id ?? null;
}

function activeFrontierStateId() {
  return stateRegistry.canonicalStates
    .slice()
    .map((state) => {
      const coverage = computeStateGaugeCoverage(state.id, gaugeCoverageArtifacts.inventory, gaugeCoverageArtifacts.ledger);
      const unresolvedRouteCapable = coverage.unresolvedRouteCapableGaugeCount ?? coverage.uncoveredRouteCapableGaugeCount;
      return {
        state,
        status: gaugeResearchStatus(coverage, legacyStateSaturationStatus(state.id), hasCompletedFreshDiscoveryTask(state.id)),
        gap: coverage.unreviewedGaugeCount + unresolvedRouteCapable,
      };
    })
    .filter(({ status }) => status !== 'saturated' && status !== 'research_complete')
    .sort((left, right) => left.state.frontierTier - right.state.frontierTier || left.gap - right.gap || left.state.id.localeCompare(right.state.id))
    .at(0)?.state.id ?? null;
}

function hasCompletedFreshDiscoveryTask(stateId: string) {
  return taskRegistry.tasks.some((task) => (
    task.kind === 'state_coverage'
    && taskStateId(task) === stateId
    && task.lane === 'completed'
    && task.discoveryComplete === true
  ));
}

export function getOperationsSnapshot() {
  const scoredSlugs = new Set(rivers.map((route) => route.slug));
  const stateRows = stateRegistry.canonicalStates.map((state) => {
    const inventory = routeInventory.filter((route) => canonicalStateId(route.state) === state.id);
    const scored = inventory.filter((route) => scoredSlugs.has(route.slug));
    const gaugeCoverage = computeStateGaugeCoverage(state.id, gaugeCoverageArtifacts.inventory, gaugeCoverageArtifacts.ledger);
    const legacySaturation = legacyStateSaturationStatus(state.id);
    const discoveryComplete = hasCompletedFreshDiscoveryTask(state.id);
    return {
      ...state,
      inventory: inventory.length,
      scored: scored.length,
      planning: inventory.length - scored.length,
      // Gauge completeness is authoritative. Legacy route-queue decisions remain
      // visible separately so they cannot silently declare a state complete.
      saturation: gaugeResearchStatus(gaugeCoverage, legacySaturation, discoveryComplete),
      legacySaturation,
      discoveryComplete,
      gaugeCoverage,
      frontierTier: state.frontierTier,
      frontierLabel: state.frontierLabel,
    };
  });
  const rankedStates = rankGaugeStateCoverage(stateRows);
  const legacyRankedStates = rankStateCoverage(stateRows.map((state) => ({ ...state, saturation: state.legacySaturation })));
  const gaugeReviewQueue = rankedStates.flatMap((state) => (
    selectGaugeReviewCandidates(state.id, gaugeCoverageArtifacts.inventory, gaugeCoverageArtifacts.ledger, 5)
      .map(({ gauge, review }) => ({
        stateId: state.id,
        key: gauge.key,
        siteName: gauge.siteName,
        status: review.status,
        routeEvidenceCount: review.routeSlugs.length,
      }))
  )).slice(0, 30);

  const claims = (controlState.claims ?? []).slice().sort((a, b) => {
    return Date.parse(b.completedAt ?? b.claimedAt ?? '') - Date.parse(a.completedAt ?? a.claimedAt ?? '');
  });
  const gaugeReviews = gaugeCoverageArtifacts.ledger.reviews;
  const eligibleGaugeReviews = gaugeReviews.filter((review) => review.eligibility !== 'not_paddle_relevant');
  const reviewedGaugeReviews = eligibleGaugeReviews.filter((review) => !['unreviewed', 'researching'].includes(review.status));
  const routeCapableGaugeReviews = gaugeReviews.filter((review) => review.eligibility === 'route_capable');
  const coveredRouteCapableGaugeReviews = routeCapableGaugeReviews.filter((review) => review.status === 'covered');

  return {
    generatedAt: new Date().toISOString(),
    policy: {
      planningRoutes: 'frozen_without_explicit_user_request',
      completenessModel: 'gauge_network_authoritative_after_bounded_review',
      researchStrategy: 'geographic_frontier_then_completion_gap',
      activeFrontierState: activeFrontierStateId(),
      gaugeInventoryId: gaugeCoverageArtifacts.inventory.inventoryId,
      gaugeInventoryScope: gaugeCoverageArtifacts.inventory.scope,
      maxProductWorkInProgress: 3,
      maxRouteImplementationsInProgress: 1,
      mergeMode: 'automatic_after_evidence_safety_tests_and_deploy_gates',
    },
    totals: {
      states: stateRows.length,
      inventory: routeInventory.length,
      scored: rivers.length,
      planning: routeInventory.length - rivers.length,
      knownGauges: gaugeCoverageArtifacts.inventory.gauges.length,
      reviewedGauges: reviewedGaugeReviews.length,
      coveredGauges: coveredRouteCapableGaugeReviews.length,
      candidateGauges: gaugeReviews.filter((review) => review.routeReadiness === 'candidate').length,
      researchNeededGauges: gaugeReviews.filter((review) => review.routeReadiness === 'research_needed').length,
      existingRouteGapGauges: gaugeReviews.filter((review) => review.routeReadiness === 'existing_route_gap').length,
      deferredGauges: gaugeReviews.filter((review) => review.routeReadiness === 'deferred').length,
      gaugeReviewCoveragePercent: eligibleGaugeReviews.length === 0 ? 0 : Math.round((reviewedGaugeReviews.length / eligibleGaugeReviews.length) * 100),
      routeGaugeCoveragePercent: routeCapableGaugeReviews.length === 0 ? 0 : Math.round((coveredRouteCapableGaugeReviews.length / routeCapableGaugeReviews.length) * 100),
      gaugeCompleteStates: rankedStates.filter((state) => state.done).length,
      activeTasks: taskRegistry.tasks.filter((task) => task.lane === 'in_progress').length,
      readyTasks: taskRegistry.tasks.filter((task) => task.lane === 'ready').length,
    },
    states: stateRows,
    stateResearchRanking: rankedStates,
    legacyStateResearchRanking: legacyRankedStates,
    gaugeReviewQueue,
    routeOpportunityQueue: {
      generatedAt: routeOpportunityQueue.generatedAt ?? null,
      maxPerState: routeOpportunityQueue.maxPerState ?? 5,
      maxGlobal: routeOpportunityQueue.maxGlobal ?? 20,
      opportunities: routeOpportunityQueue.opportunities ?? [],
    },
    tasks: taskRegistry.tasks,
    automations: automationRegistry,
    controlPlane: {
      updatedAt: controlState.updatedAt ?? null,
      recentClaims: claims.slice(0, 8),
      activeClaims: claims.filter((claim) => claim.status === 'active'),
    },
    runs: (runHistory.runs ?? []).slice(-12).reverse(),
    telemetry: getOperationsTelemetry(),
  };
}

export function getCanonicalStateId(value: string) {
  return canonicalStateId(value);
}
