import { describe, expect, it } from 'vitest';
import { normalizeTerminalLanes, validateTaskBoard } from './operations-task-board';

const task = { id: 'one', title: 'Review', kind: 'review', summary: 'Review evidence.', lane: 'ready', owner: 'reviewer', priority: 'high', evidence: ['source'] };
describe('task board validation', () => {
  it('rejects malformed records, duplicate IDs, missing lanes and incomplete schedulable work', () => {
    expect(validateTaskBoard({ tasks: [null] }).errors).toHaveLength(1);
    expect(validateTaskBoard({ tasks: [task, task] }).errors.join()).toContain('duplicate');
    expect(validateTaskBoard({ tasks: [{ ...task, lane: undefined }] }).errors.join()).toContain('lane');
    expect(validateTaskBoard({ tasks: [{ ...task, owner: undefined, evidence: [] }] }).errors).toHaveLength(2);
  });
  it('normalizes only declared terminal statuses and preserves all evidence', () => {
    const completed = { ...task, lane: undefined, status: 'completed', lastRunId: 'run-1' };
    const ready = { ...task, lane: undefined, status: 'ready' };
    const result = normalizeTerminalLanes([completed, ready, task]);
    expect(result.changes).toHaveLength(1);
    expect(result.tasks[0]).toEqual({ ...completed, lane: 'completed' });
    expect(result.tasks[1].lane).toBeUndefined();
    expect(completed.lane).toBeUndefined();
  });
  it('rejects contradictory readiness but preserves explicitly quarantined evidence', () => {
    const conflict = { ...task, status: 'completed' };
    expect(validateTaskBoard({ tasks: [conflict] }).errors.join()).toContain('conflicts');
    const held = { ...conflict, lane: 'blocked', retryCondition: 'Verify completion dates.', metadata: { workflowReconciliation: { reason: 'Conflicting historical evidence.' } } };
    const result = validateTaskBoard({ tasks: [held] });
    expect(result.errors).toEqual([]);
    expect(result.warnings.join()).toContain('quarantined');
  });
  it('flags future dates without rewriting history or making them schedulable', () => {
    const result = validateTaskBoard({ tasks: [{ ...task, lane: 'completed', updatedAt: '2030-01-01' }] }, new Date('2026-09-06'));
    expect(result.errors).toEqual([]);
    expect(result.warnings.join()).toContain('future-dated');
  });
});
