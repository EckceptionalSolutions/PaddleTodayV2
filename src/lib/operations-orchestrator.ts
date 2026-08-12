export type OperationsTask = {
  id: string;
  title: string;
  lane: string;
  kind: string;
  owner: string;
  priority: string;
  summary: string;
  evidence: string[];
};

export type WorkOrder = {
  taskId: string;
  workerRole: string;
  rationale: string;
  requiredGates: string[];
  mergePolicy: 'automatic_after_all_gates';
};

const priorityRank: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };

function rankTask(task: OperationsTask) {
  const kindRank = task.kind === 'consolidation_review' ? 0 : task.kind === 'state_coverage' ? 1 : 2;
  return [priorityRank[task.priority] ?? 9, kindRank, task.title];
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

  const candidates = tasks
    .filter((task) => task.lane === 'ready' || task.lane === 'proposed')
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
      ? 'state-coverage'
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
    requiredGates: task.kind === 'consolidation_review'
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
  };
}
