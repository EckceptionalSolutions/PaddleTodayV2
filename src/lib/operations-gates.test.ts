import { describe, expect, it } from 'vitest';
import { evaluateGates } from './operations-gates';

const passingEvidence = {
  evidence: { passed: true }, safety: { passed: true }, verification: { passed: true },
  tests: { passed: true }, rollback: { passed: true },
};

describe('operations gates', () => {
  it('permits merge only when every required gate passes', () => {
    expect(evaluateGates(passingEvidence).passed).toBe(true);
  });

  it('fails closed when a gate is missing or false', () => {
    const result = evaluateGates({ ...passingEvidence, safety: { passed: false, detail: 'Access evidence unresolved.' } });
    expect(result.passed).toBe(false);
    expect(result.results.find((gate) => gate.id === 'safety')?.detail).toContain('Access evidence');
  });
});
