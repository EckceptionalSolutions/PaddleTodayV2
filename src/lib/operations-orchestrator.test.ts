import { describe, expect, it } from 'vitest';
import { selectNextWorkOrder, type OperationsTask } from './operations-orchestrator';

const task = (overrides: Partial<OperationsTask> = {}): OperationsTask => ({
  id: 'task',
  title: 'Task',
  lane: 'ready',
  kind: 'state_coverage',
  owner: 'state-coverage',
  priority: 'high',
  summary: 'Summary',
  evidence: [],
  ...overrides,
});

describe('operations orchestrator', () => {
  it('selects high-priority state work before lower-priority product work', () => {
    const order = selectNextWorkOrder([
      task({ id: 'product', kind: 'product', priority: 'high', title: 'Product' }),
      task({ id: 'state', kind: 'state_coverage', priority: 'critical', title: 'State' }),
    ]);
    expect(order).toMatchObject({ taskId: 'state', workerRole: 'state-coverage' });
  });

  it('enforces one route implementation at a time', () => {
    const order = selectNextWorkOrder([
      task({ id: 'active-route', lane: 'in_progress', kind: 'route_implementation' }),
      task({ id: 'next-route', kind: 'route_implementation' }),
      task({ id: 'research', kind: 'route_research' }),
    ]);
    expect(order?.taskId).toBe('research');
    expect(order?.workerRole).toBe('route-research');
  });

  it('returns no order when every candidate is blocked by WIP', () => {
    const order = selectNextWorkOrder([
      task({ id: 'route', kind: 'route_implementation', lane: 'in_progress' }),
      task({ id: 'waiting-route', kind: 'route_implementation' }),
    ]);
    expect(order).toBeNull();
  });
});
