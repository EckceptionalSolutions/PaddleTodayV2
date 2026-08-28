export type OperationsTask = {
  id: string;
  title: string;
  lane: string;
  kind: string;
  owner: string;
  priority: string;
  summary: string;
  evidence: string[];
  stateId?: string;
  inventoryId?: string;
  gaugeKeys?: string[];
  frontierTier?: number;
  routeOpportunity?: boolean;
  routeOpportunityScore?: number;
  opportunitySource?: 'gauge_queue' | 'corridor_preflight';
};

export type WorkOrder = {
  taskId: string;
  workerRole: string;
  rationale: string;
  requiredGates: string[];
  mergePolicy: 'automatic_after_all_gates';
  stateId?: string;
  inventoryId?: string;
  gaugeKeys?: string[];
};

const priorityRank: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };

// Within a frontier tier, finish the user's stated geographic sequence rather
// than falling back to alphabetical task titles (which previously let SD/NE
// jump ahead of Wisconsin). Unknown/later states remain deterministic but rank
// after the explicitly managed frontier.
const geographicStateRank: Record<string, number> = {
  MN: 0,
  WI: 1,
  IA: 2,
  ND: 3,
  SD: 4,
  NE: 5,
};

function rankTask(task: OperationsTask) {
  const isDiscoverySweep = task.id.includes('bounded-discovery-sweep');
  const frontierRank = isDiscoverySweep || task.kind === 'state_coverage' || task.routeOpportunity
    ? (task.frontierTier ?? 50)
    : 99;
  const stateRank = frontierRank < 99
    ? (geographicStateRank[task.stateId ?? ''] ?? 50)
    : 50;
  const kindRank = isDiscoverySweep ? -1
    : task.kind === 'state_coverage' ? 0
      : task.kind === 'route_implementation' ? 1
        : task.kind === 'route_research' ? 2
          : task.kind === 'consolidation_review' ? 3 : 4;
  const opportunityRank = task.routeOpportunity && task.routeOpportunityScore !== undefined
    ? -task.routeOpportunityScore
    : 0;
  return [frontierRank, priorityRank[task.priority] ?? 9, stateRank, kindRank, opportunityRank, task.title];
}

function compareTasks(left: OperationsTask, right: OperationsTask) {
  const a = rankTask(left);
  const b = rankTask(right);
  return a[0] - b[0]
    || a[1] - b[1]
    || a[2] - b[2]
    || a[3] - b[3]
    || a[4] - b[4]
    || String(a[5]).localeCompare(String(b[5]));
}

export function selectNextWorkOrder(tasks: OperationsTask[]): WorkOrder | null {
  const activeRouteImplementations = tasks.filter(
    (task) => task.lane === 'in_progress' && task.kind === 'route_implementation'
  ).length;
  const activeProductTasks = tasks.filter(
    (task) => task.lane === 'in_progress' && task.kind === 'product'
  ).length;
  const activeConsolidationReviews = tasks.filter(
    (task) => task.lane === 'in_progress' && task.kind === 'consolidation_review'
  ).length;
  const activeCoverageStates = new Set(
    tasks
      .filter((task) => task.lane === 'in_progress' && task.kind === 'state_coverage' && task.stateId)
      .map((task) => task.stateId),
  );

  // Geographic completion is intentionally frontier-first. A preserved
  // discovery task in a distant state must not jump ahead of unfinished
  // gauge coverage in a nearer tier.
  const unfinishedFrontierTasks = tasks.filter(
    (task) => (task.kind === 'state_coverage' || task.routeOpportunity)
      && task.lane !== 'completed'
      && task.lane !== 'done'
      && task.lane !== 'blocked'
      && task.frontierTier !== undefined
  );
  const activeFrontierTier = unfinishedFrontierTasks.length
    ? Math.min(...unfinishedFrontierTasks.map((task) => task.frontierTier ?? 50))
    : undefined;

  const candidates = tasks
    .filter((task) => task.lane === 'ready' || task.lane === 'proposed')
    // A gauge-review batch is only claimable when the planner attached a
    // concrete candidate. This prevents an exhausted state queue from
    // producing a phantom state-coverage assignment with gaugeKeys: [].
    .filter((task) => !(
      task.kind === 'state_coverage'
      && task.id.endsWith('gauge-review-batch')
      && !(task.gaugeKeys?.length)
    ))
    .filter((task) => (task.kind !== 'state_coverage' && !task.routeOpportunity)
      || activeFrontierTier === undefined
      || (task.frontierTier ?? 50) === activeFrontierTier)
    // A live state-coverage assignment owns the active state until it is
    // complete. Without this guard, a proposed task from another state at
    // the same frontier tier (for example NC while CO is active) can jump
    // the queue merely because it has a higher priority.
    .filter((task) => activeCoverageStates.size === 0
      || !(task.kind === 'state_coverage' || task.routeOpportunity)
      || activeCoverageStates.has(task.stateId))
    .filter((task) => {
      if (task.kind === 'route_implementation') return activeRouteImplementations < 1;
      if (task.kind === 'product') return activeProductTasks < 3;
      if (task.kind === 'consolidation_review') return activeConsolidationReviews < 2;
      return true;
    })
    .sort(compareTasks);
  const task = candidates[0];
  if (!task) return null;

  const workerRole =
    task.kind === 'state_coverage'
      ? 'gauge-coverage'
      : task.kind === 'product'
        ? 'product-implementation'
        : task.kind === 'demand'
          ? 'demand-triage'
          : task.kind === 'route_implementation'
            ? 'route-implementation'
          : task.kind === 'consolidation_review'
            ? 'independent-verifier'
          : 'route-research';

  return {
    taskId: task.id,
    workerRole,
    rationale: `${task.priority} priority ${task.kind} task selected from the ${task.lane} lane; WIP policy permits assignment.`,
    requiredGates: (task.kind === 'route_research' || task.kind === 'route_implementation') && task.routeOpportunity
      ? [
          'gauge disposition and actionable blocker recorded',
          'named public endpoints and defensible coordinates',
          'product-supported live gauge and source-backed thresholds',
          'access, camping, safety, image, geometry, and overlap checks',
          'independent verification, tests, build, and rollback evidence',
        ]
      : task.kind === 'state_coverage' && task.id.endsWith('bounded-discovery-sweep')
      ? [
          'frozen gauge inventory and bounded candidate budget recorded',
          'distinct gauge and river families reviewed without speculative route creation',
          'fresh discovery evidence and no-strong-candidate conclusion recorded',
          'route evidence, safety, access, threshold, camping, coordinate, geometry, and image gates applied to any candidate',
        ]
      : task.kind === 'state_coverage'
      ? [
          'frozen gauge inventory version recorded',
          'gauge key and durable disposition recorded',
          'direct versus proxy relationship verified',
          'route implementation uses normal evidence and safety gates when applicable',
        ]
      : task.kind === 'consolidation_review'
      ? [
          'source-backed duplicate or corridor evidence',
          'independent verifier recommendation',
          'route-family or multi-endpoint model recorded',
          'no destructive route change without explicit approval',
        ]
      : [
          'evidence package recorded',
          'independent verifier pass',
          'typecheck and focused tests',
          'production build and smoke checks',
        ],
    mergePolicy: 'automatic_after_all_gates',
    stateId: task.stateId,
    inventoryId: task.inventoryId,
    gaugeKeys: task.gaugeKeys,
  };
}
