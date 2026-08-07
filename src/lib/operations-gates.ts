export type GateId = 'evidence' | 'safety' | 'verification' | 'tests' | 'rollback';

export type GateResult = { id: GateId; passed: boolean; detail: string };

export type GateEvidence = Partial<Record<GateId, { passed: boolean; detail?: string }>>;

export function evaluateGates(evidence: GateEvidence): { passed: boolean; results: GateResult[] } {
  const ids: GateId[] = ['evidence', 'safety', 'verification', 'tests', 'rollback'];
  const results = ids.map((id) => ({
    id,
    passed: evidence[id]?.passed === true,
    detail: evidence[id]?.detail ?? (evidence[id]?.passed === true ? 'Gate passed.' : 'Required gate evidence is missing.'),
  }));
  return { passed: results.every((result) => result.passed), results };
}
