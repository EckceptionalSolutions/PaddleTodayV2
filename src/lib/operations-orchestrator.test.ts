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
      task({ id: 'state', kind: 'state_coverage', priority: 'critical', title: 'State', stateId: 'TX', inventoryId: 'tx-v1', gaugeKeys: ['usgs:1'] }),
    ]);
    expect(order).toMatchObject({ taskId: 'state', workerRole: 'gauge-coverage', stateId: 'TX', inventoryId: 'tx-v1', gaugeKeys: ['usgs:1'] });
    expect(order?.requiredGates).toContain('gauge key and durable disposition recorded');
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

  it('routes consolidation reviews to an independent verifier with non-destructive gates', () => {
    const order = selectNextWorkOrder([
      task({ id: 'corridor-review', kind: 'consolidation_review', owner: 'independent-verifier' }),
    ]);
    expect(order).toMatchObject({ taskId: 'corridor-review', workerRole: 'independent-verifier' });
    expect(order?.requiredGates).toContain('no destructive route change without explicit approval');
  });

  it('keeps the geographic frontier ahead of consolidation and distant research', () => {
    const order = selectNextWorkOrder([
      task({ id: 'texas', kind: 'state_coverage', stateId: 'TX', frontierTier: 5, priority: 'critical' }),
      task({ id: 'village-creek', kind: 'consolidation_review', priority: 'critical' }),
      task({ id: 'minnesota', kind: 'state_coverage', stateId: 'MN', frontierTier: 0, priority: 'high' }),
    ]);
    expect(order?.taskId).toBe('minnesota');
    expect(order?.workerRole).toBe('gauge-coverage');
  });

  it('does not let blocked frontier work stall the next ready frontier state', () => {
    const order = selectNextWorkOrder([
      task({ id: 'mn-blocked', stateId: 'MN', frontierTier: 0, lane: 'blocked', priority: 'critical' }),
      task({ id: 'nd-review', stateId: 'ND', frontierTier: 1, priority: 'critical', gaugeKeys: ['usgs:1'] }),
      task({ id: 'ia-opportunity', kind: 'route_research', routeOpportunity: true, stateId: 'IA', frontierTier: 1, priority: 'high' }),
    ]);
    expect(order?.taskId).toBe('nd-review');
    expect(order?.workerRole).toBe('gauge-coverage');
  });

  it('keeps a ready route opportunity in the active frontier before later work', () => {
    const order = selectNextWorkOrder([
      task({ id: 'nd-review', stateId: 'ND', frontierTier: 1, priority: 'critical', gaugeKeys: ['usgs:1'] }),
      task({ id: 'mn-opportunity', kind: 'route_research', routeOpportunity: true, stateId: 'MN', frontierTier: 0, priority: 'high' }),
    ]);
    expect(order?.taskId).toBe('mn-opportunity');
    expect(order?.workerRole).toBe('route-research');
  });

  it('uses the managed geographic sequence within a frontier tier', () => {
    const order = selectNextWorkOrder([
      task({ id: 'sd-opportunity', kind: 'route_research', routeOpportunity: true, stateId: 'SD', frontierTier: 1, priority: 'critical' }),
      task({ id: 'wi-opportunity', kind: 'route_research', routeOpportunity: true, stateId: 'WI', frontierTier: 1, priority: 'critical' }),
      task({ id: 'ia-opportunity', kind: 'route_research', routeOpportunity: true, stateId: 'IA', frontierTier: 1, priority: 'critical' }),
    ]);
    expect(order?.taskId).toBe('wi-opportunity');
  });

  it('limits active consolidation reviews to two', () => {
    const order = selectNextWorkOrder([
      task({ id: 'active-a', kind: 'consolidation_review', lane: 'in_progress' }),
      task({ id: 'active-b', kind: 'consolidation_review', lane: 'in_progress' }),
      task({ id: 'waiting', kind: 'consolidation_review' }),
    ]);
    expect(order).toBeNull();
  });
});
