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

function rankTask(task: OperationsTask) {
  const frontierRank = task.kind === 'state_coverage' ? (task.frontierTier ?? 50) : 99;
  const kindRank = task.kind === 'state_coverage' ? 0 : task.kind === 'consolidation_review' ? 1 : 2;
  return [frontierRank, priorityRank[task.priority] ?? 9, kindRank, task.title];
}

function compareTasks(left: OperationsTask, right: OperationsTask) {
  const a = rankTask(left);
  const b = rankTask(right);
  return a[0] - b[0] || a[1] - b[1] || String(a[2]).localeCompare(String(b[2]));
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

  // Geographic completion is intentionally frontier-first. A preserved
  // discovery task in a distant state must not jump ahead of unfinished
  // gauge coverage in a nearer tier.
  const unfinishedStateCoverageTasks = tasks.filter(
    (task) => task.kind === 'state_coverage' && task.lane !== 'completed'
  );
  const activeFrontierTier = unfinishedStateCoverageTasks.length
    ? Math.min(...unfinishedStateCoverageTasks.map((task) => task.frontierTier ?? 50))
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
    .filter((task) => task.kind !== 'state_coverage'
      || activeFrontierTier === undefined
      || (task.frontierTier ?? 50) === activeFrontierTier)
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
          : task.kind === 'consolidation_review'
            ? 'independent-verifier'
          : 'route-research';

  return {
    taskId: task.id,
    workerRole,
    rationale: `${task.priority} priority ${task.kind} task selected from the ${task.lane} lane; WIP policy permits assignment.`,
    requiredGates: task.kind === 'state_coverage' && task.id.endsWith('bounded-discovery-sweep')
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
