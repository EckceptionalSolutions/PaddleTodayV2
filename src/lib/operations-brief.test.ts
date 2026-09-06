import { describe, expect, it } from 'vitest';
import { buildOperationsBrief, type WorkflowRun } from './operations-brief';

const now = new Date('2026-09-06T15:00:00Z');
const input = { now, tasks: [], runs: [], artifacts: [], workflows: [] };
describe('operations daily brief', () => {
  it('flags stale, missing, and future artifacts without treating them as healthy', () => {
    const result = buildOperationsBrief({ ...input, artifacts: [
      { name: 'old', generatedAt: '2026-09-01T00:00:00Z' },
      { name: 'missing', error: 'missing JSON' },
      { name: 'future', generatedAt: '2027-01-01T00:00:00Z' },
    ] });
    expect(result.warnings).toHaveLength(3);
  });
  it('does not count research completion, undated records, or future implementation as shipped work', () => {
    const result = buildOperationsBrief({ ...input, runs: [
      { id: 'research', kind: 'route_research', status: 'completed', startedAt: now.toISOString() },
      { id: 'undated', kind: 'route_implementation', status: 'completed' },
      { id: 'future', kind: 'route_implementation', status: 'completed', startedAt: '2027-01-01' },
      { id: 'implementation', kind: 'route_implementation', status: 'completed', startedAt: now.toISOString() },
    ] });
    expect(result.recent.total).toBe(2);
    expect(result.recent.implementations.map(run => run.id)).toEqual(['implementation']);
  });
  it('keeps branch failures visible but clears a failure superseded on the same branch', () => {
    const workflow = (headBranch: string, createdAt: string, conclusion: string): WorkflowRun => ({ workflowName: 'gates', headBranch, createdAt, conclusion, status: 'completed', url: 'https://example.com/run' });
    const result = buildOperationsBrief({ ...input, workflows: [
      workflow('main', '2026-09-05', 'failure'), workflow('feature', '2026-09-06', 'success'),
      workflow('fixed', '2026-09-04', 'failure'), workflow('fixed', '2026-09-05', 'success'),
    ] });
    expect(result.failures.map(run => run.headBranch)).toEqual(['main']);
  });
  it('uses timestamps for idle streaks and breaks the streak after useful work', () => {
    const rows = [1, 2, 3].map(hour => ({ id: String(hour), kind: 'review', status: 'no_work', startedAt: `2026-09-06T0${hour}:00:00Z` }));
    expect(buildOperationsBrief({ ...input, runs: rows.reverse() }).warnings.join()).toContain('3 consecutive');
    expect(buildOperationsBrief({ ...input, runs: [...rows, { id: 'useful', kind: 'review', status: 'completed', startedAt: now.toISOString() }] }).warnings).toEqual([]);
  });
  it('establishes a baseline first and reports only subsequent task lane changes', () => {
    const first = buildOperationsBrief({ ...input, tasks: [{ id: 'one', lane: 'completed' }] });
    expect(first.changes).toEqual([]);
    const second = buildOperationsBrief({ ...input, previous: first.baseline, tasks: [{ id: 'one', lane: 'completed' }, { id: 'two', lane: 'ready' }] });
    expect(second.changes).toEqual(['two: new → ready']);
  });
  it('clears a recorded failure only with an explicit later passing resolution', () => {
    const result = buildOperationsBrief({ ...input, runs: [
      { id: 'fixed', kind: 'gate', status: 'failed', startedAt: '2026-09-06T01:00:00Z', resolvedBy: 'passed' },
      { id: 'unresolved', kind: 'gate', status: 'failed', startedAt: '2026-09-06T01:00:00Z', resolvedBy: 'missing' },
      { id: 'passed', kind: 'gate', status: 'passed', startedAt: '2026-09-06T02:00:00Z' },
    ] });
    expect(result.recent.failed.map(run => run.id)).toEqual(['unresolved']);
  });
});
