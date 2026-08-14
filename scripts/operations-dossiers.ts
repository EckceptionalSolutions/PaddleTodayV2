import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { routeInventory, rivers } from '../src/data/rivers';
import { computeStateGaugeCoverage, gaugeResearchStatus, loadGaugeCoverageArtifacts } from '../src/lib/gauge-coverage';

type State = { id: string; name: string };
type Task = {
  id: string;
  title: string;
  lane: string;
  kind: string;
  summary: string;
  evidence?: string[];
  stateId?: string;
};
type Run = {
  id: string;
  kind: string;
  startedAt: string;
  status: string;
  taskId?: string;
  summary?: string;
  stateId?: string;
};

const root = resolve(process.cwd());
const operationsDir = resolve(root, 'docs/operations');
mkdirSync(operationsDir, { recursive: true });
const tasks = JSON.parse(readFileSync(resolve(operationsDir, 'tasks.json'), 'utf8')).tasks as Task[];
const runs = JSON.parse(readFileSync(resolve(operationsDir, 'runs.json'), 'utf8')).runs as Run[];
const registry = JSON.parse(readFileSync(resolve(operationsDir, 'state-registry.json'), 'utf8')) as { canonicalStates: State[] };
const { inventory: gaugeInventory, ledger: gaugeLedger } = loadGaugeCoverageArtifacts(root);
const scored = new Set(rivers.map((route) => route.slug));
const blocked = tasks.filter((task) => task.lane === 'blocked');

const category = (text: string) => {
  const value = text.toLowerCase();
  if (value.includes('gauge') || value.includes('provider')) return 'gauge/provider';
  if (value.includes('coordinate') || value.includes('geometry')) return 'coordinates/geometry';
  if (value.includes('camp')) return 'camping';
  if (value.includes('safety') || value.includes('dam')) return 'safety';
  if (value.includes('access') || value.includes('endpoint')) return 'access/endpoints';
  if (value.includes('threshold') || value.includes('flow')) return 'thresholds';
  return 'policy/other';
};

const taskStateId = (task: Task) => {
  if (task.stateId) return task.stateId;
  return registry.canonicalStates.find((state) => (
    task.id.toLowerCase().startsWith(`${state.id.toLowerCase()}-`)
    || task.id.toLowerCase().startsWith(`${state.name.toLowerCase().replaceAll(' ', '-')}-`)
  ))?.id ?? null;
};

const dossiers = registry.canonicalStates.map((state) => {
  const routeRows = routeInventory.filter((route) => String(route.state).toUpperCase() === state.id || route.state === state.name);
  const scoredRoutes = routeRows.filter((route) => scored.has(route.slug));
  const stateTasks = tasks.filter((task) => task.kind === 'state_coverage' && taskStateId(task) === state.id);
  const taskIds = new Set(stateTasks.map((task) => task.id));
  const relevantRuns = runs.filter((run) => run.stateId === state.id || (run.taskId && taskIds.has(run.taskId)));
  const gaugeCoverage = computeStateGaugeCoverage(state.id, gaugeInventory, gaugeLedger);

  return {
    stateId: state.id,
    stateName: state.name,
    gaugeInventoryId: gaugeInventory.inventoryId,
    gaugeInventoryScope: gaugeInventory.scope,
    gaugeCoverage,
    researchStatus: gaugeResearchStatus(gaugeCoverage, 'not_started'),
    legacyRouteCoverage: {
      inventoryCount: routeRows.length,
      scoredCount: scoredRoutes.length,
      planningCount: routeRows.length - scoredRoutes.length,
      scoredCoveragePercent: routeRows.length ? Math.round((scoredRoutes.length / routeRows.length) * 100) : 0,
    },
    discoveryTasks: stateTasks.map((task) => ({
      id: task.id,
      lane: task.lane,
      summary: task.summary,
      evidenceCount: task.evidence?.length ?? 0,
    })),
    recentEvidenceRuns: relevantRuns.slice(-10),
    doneOnlyWhen: [
      'provider-wide gauge inventory frozen and fully adjudicated',
      'every route-capable gauge is covered or has an accepted blocker',
      'existing route inventory quality audit passes',
      'bounded fresh discovery sweep finds no actionable gauge or corridor family',
    ],
  };
});

const groups = Object.values(blocked.reduce<Record<string, {
  category: string;
  taskIds: string[];
  titles: string[];
  summaries: string[];
}>>((result, task) => {
  const key = category(`${task.title} ${task.summary}`);
  result[key] ??= { category: key, taskIds: [], titles: [], summaries: [] };
  result[key].taskIds.push(task.id);
  result[key].titles.push(task.title);
  result[key].summaries.push(task.summary);
  return result;
}, {}));

writeFileSync(resolve(operationsDir, 'saturation-dossiers.json'), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  policy: 'gauge-network-completeness-with-bounded-discovery-before-saturation',
  dossiers,
}, null, 2)}\n`);
writeFileSync(resolve(operationsDir, 'blocker-resolution-queue.json'), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  groups,
  nextAction: 'Resolve the highest-leverage group only with fresh manager-grade evidence or an approved provider/policy change.',
}, null, 2)}\n`);
console.log(JSON.stringify({ saturationDossiers: dossiers.length, blockerGroups: groups.length }));
