import { readFile, writeFile } from 'node:fs/promises';
import { selectNextWorkOrder, type OperationsTask } from '../src/lib/operations-orchestrator';

const payload = JSON.parse(await readFile('docs/operations/tasks.json', 'utf8')) as { tasks: OperationsTask[] };
const workOrder = selectNextWorkOrder(payload.tasks);
const generatedAt = new Date().toISOString();
const result = { generatedAt, workOrder };

if (process.argv.includes('--record')) {
  const history = JSON.parse(await readFile('docs/operations/runs.json', 'utf8')) as { version: number; runs: unknown[] };
  history.runs.push({
    id: `orchestrator-${generatedAt.replace(/[^0-9]/g, '').slice(0, 14)}`,
    kind: 'orchestrator_plan',
    startedAt: generatedAt,
    status: workOrder ? 'planned' : 'no_work',
    taskId: workOrder?.taskId,
    workerRole: workOrder?.workerRole,
    summary: workOrder?.rationale ?? 'No eligible work order under current WIP policy.',
  });
  await writeFile('docs/operations/runs.json', `${JSON.stringify(history, null, 2)}\n`, 'utf8');
}

console.log(JSON.stringify(result, null, 2));
