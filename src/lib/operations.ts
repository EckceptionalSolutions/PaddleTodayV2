import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { routeInventory, rivers } from '../data/rivers';

type CanonicalState = { id: string; name: string };
type Task = {
  id: string;
  title: string;
  lane: 'proposed' | 'ready' | 'in_progress' | 'validation' | 'completed' | 'blocked';
  kind: string;
  owner: string;
  priority: string;
  summary: string;
  evidence: string[];
};

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
  runs?: Array<{ id: string; kind: string; startedAt: string; status: string; taskId?: string; workerRole?: string; summary?: string }>;
};

const automationRegistry = [
  { id: 'paddletoday-operations-orchestrator', name: 'PaddleToday Operations Orchestrator', schedule: 'Weekly Monday', status: 'enabled', owner: 'orchestrator' },
  { id: 'paddletoday-hourly-route-worker', name: 'PaddleToday Hourly Route Worker', schedule: 'Every hour', status: 'enabled', owner: 'route-implementation' },
  { id: 'paddletoday-route-worker-supervisor', name: 'PaddleToday Route Worker Supervisor', schedule: 'Every two hours', status: 'enabled', owner: 'orchestrator' },
  { id: 'river-snapshots', name: 'River snapshots', schedule: 'Every 30 minutes', status: 'enabled', owner: 'operations' },
  { id: 'river-alerts', name: 'River alerts', schedule: 'Twice hourly', status: 'enabled', owner: 'operations' },
  { id: 'history-snapshots', name: 'History snapshots', schedule: 'Hourly', status: 'enabled', owner: 'operations' },
  { id: 'weekly-product-report', name: 'Weekly product report', schedule: 'Wednesday weekly', status: 'enabled', owner: 'product-analysis' },
  { id: 'operations-gates', name: 'Operations gatekeeper', schedule: 'Every pull request', status: 'enabled', owner: 'gatekeeper' },
  { id: 'route-control-plane', name: 'Route control plane', schedule: 'Manual pilot; scheduling paused', status: 'pilot', owner: 'state-coverage' },
  { id: 'demand-triage', name: 'Demand triage', schedule: 'Planned', status: 'planned', owner: 'demand-triage' },
  { id: 'product-loop', name: 'Metrics-to-product loop', schedule: 'Planned weekly', status: 'planned', owner: 'product-analysis' },
];

function canonicalStateId(value: string) {
  const normalized = value.trim();
  if (stateRegistry.canonicalStates.some((state) => state.id === normalized)) return normalized;
  return stateRegistry.aliases[normalized] ?? normalized.toUpperCase();
}

export function getOperationsSnapshot() {
  const scoredSlugs = new Set(rivers.map((route) => route.slug));
  const stateRows = stateRegistry.canonicalStates.map((state) => {
    const inventory = routeInventory.filter((route) => canonicalStateId(route.state) === state.id);
    const scored = inventory.filter((route) => scoredSlugs.has(route.slug));
    return {
      ...state,
      inventory: inventory.length,
      scored: scored.length,
      planning: inventory.length - scored.length,
      saturation: state.id === 'MN' ? 'provisionally_saturated' : 'not_started',
    };
  });

  const claims = (controlState.claims ?? []).slice().sort((a, b) => {
    return Date.parse(b.completedAt ?? b.claimedAt ?? '') - Date.parse(a.completedAt ?? a.claimedAt ?? '');
  });

  return {
    generatedAt: new Date().toISOString(),
    policy: {
      planningRoutes: 'frozen_without_explicit_user_request',
      maxProductWorkInProgress: 3,
      maxRouteImplementationsInProgress: 1,
      mergeMode: 'automatic_after_evidence_safety_tests_and_deploy_gates',
    },
    totals: {
      states: stateRows.length,
      inventory: routeInventory.length,
      scored: rivers.length,
      planning: routeInventory.length - rivers.length,
      activeTasks: taskRegistry.tasks.filter((task) => task.lane === 'in_progress').length,
      readyTasks: taskRegistry.tasks.filter((task) => task.lane === 'ready').length,
    },
    states: stateRows,
    tasks: taskRegistry.tasks,
    automations: automationRegistry,
    controlPlane: {
      updatedAt: controlState.updatedAt ?? null,
      recentClaims: claims.slice(0, 8),
      activeClaims: claims.filter((claim) => claim.status === 'active'),
    },
    runs: (runHistory.runs ?? []).slice(-12).reverse(),
  };
}

export function getCanonicalStateId(value: string) {
  return canonicalStateId(value);
}
