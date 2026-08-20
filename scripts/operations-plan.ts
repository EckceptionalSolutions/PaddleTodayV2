import { readFile, writeFile } from 'node:fs/promises';
import { selectNextWorkOrder, type OperationsTask } from '../src/lib/operations-orchestrator';
import { selectGaugeReviewCandidates, type GaugeInventoryArtifact, type GaugeReviewLedgerArtifact } from '../src/lib/gauge-coverage';
import { buildRouteOpportunityQueue, materializeRouteOpportunityTasks } from '../src/lib/route-opportunities';

const payload = JSON.parse(await readFile('docs/operations/tasks.json', 'utf8')) as { tasks: OperationsTask[] };
const stateRegistry = JSON.parse(await readFile('docs/operations/state-registry.json', 'utf8')) as { canonicalStates: Array<{ id: string; name: string; frontierTier: number }> };
const gaugeInventory = JSON.parse(await readFile('docs/operations/gauge-inventory.json', 'utf8')) as GaugeInventoryArtifact;
const gaugeLedger = JSON.parse(await readFile('docs/operations/gauge-review-ledger.json', 'utf8')) as GaugeReviewLedgerArtifact;
const stateTiers = new Map(stateRegistry.canonicalStates.map((state) => [state.id, state.frontierTier]));
const opportunityQueue = buildRouteOpportunityQueue(gaugeInventory, gaugeLedger, stateTiers, payload.tasks);
const materializedTasks = materializeRouteOpportunityTasks(payload.tasks, opportunityQueue, gaugeInventory.inventoryId, stateTiers);
const enrichedTasks = materializedTasks.map((task) => {
  if (task.kind !== 'state_coverage') return task;
  const stateId = task.stateId ?? stateRegistry.canonicalStates.find((state) => (
    task.id.toLowerCase().startsWith(`${state.id.toLowerCase()}-`)
    || task.id.toLowerCase().startsWith(`${state.name.toLowerCase().replaceAll(' ', '-')}-`)
  ))?.id;
  const gaugeKeys = task.gaugeKeys?.length
    ? task.gaugeKeys
    : stateId
      ? selectGaugeReviewCandidates(stateId, gaugeInventory, gaugeLedger, 1).map((candidate) => candidate.gauge.key)
      : [];
  const frontierTier = stateId
    ? stateRegistry.canonicalStates.find((state) => state.id === stateId)?.frontierTier
    : undefined;
  return { ...task, stateId, frontierTier, inventoryId: task.inventoryId ?? gaugeInventory.inventoryId, gaugeKeys };
});
const workOrder = selectNextWorkOrder(enrichedTasks);
const generatedAt = new Date().toISOString();
const result = { generatedAt, workOrder };

if (process.argv.includes('--record')) {
  await writeFile('docs/operations/tasks.json', `${JSON.stringify({ ...payload, tasks: materializedTasks, updatedAt: generatedAt }, null, 2)}\n`, 'utf8');
  await writeFile('docs/operations/route-opportunity-queue.json', `${JSON.stringify(opportunityQueue, null, 2)}\n`, 'utf8');
  const history = JSON.parse(await readFile('docs/operations/runs.json', 'utf8')) as { version: number; runs: unknown[] };
  history.runs.push({
    id: `orchestrator-${generatedAt.replace(/[^0-9]/g, '').slice(0, 14)}`,
    kind: 'orchestrator_plan',
    startedAt: generatedAt,
    status: workOrder ? 'planned' : 'no_work',
    taskId: workOrder?.taskId,
    workerRole: workOrder?.workerRole,
    stateId: workOrder?.stateId,
    inventoryId: workOrder?.inventoryId,
    gaugeKeys: workOrder?.gaugeKeys,
    summary: workOrder?.rationale ?? 'No eligible work order under current WIP policy.',
  });
  await writeFile('docs/operations/runs.json', `${JSON.stringify(history, null, 2)}\n`, 'utf8');
}

console.log(JSON.stringify(result, null, 2));
