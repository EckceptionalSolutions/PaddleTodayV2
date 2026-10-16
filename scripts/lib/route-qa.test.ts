import { describe, expect, it } from 'vitest';
import { compareFindings, evidenceStatus, findingKind, fingerprint, makeFinding, validateLedger, type Review } from './route-qa';
import type { River } from '../../src/lib/types';
import { renderQaReport } from './route-qa-html';

const route = { id: 'r', slug: 'r', name: 'River', reach: 'A to B', state: 'Wisconsin', profile: { difficulty: 'easy', difficultyNotes: 'Flat' } } as River;
const now = Date.parse('2026-10-16T12:00:00Z');
const review: Review = { route: 'r', field: 'identity', fingerprint: fingerprint(route, 'identity'), reviewedAt: '2026-10-15T12:00:00Z', sourceUrl: 'https://example.org/access', note: 'Official map names this reach.', verdict: 'supported' };
describe('route QA evidence', () => {
  it('never treats missing, changed, expired, future, or conflicting evidence as supported', () => {
    expect(evidenceStatus(route, 'identity', [], now).status).toBe('missing');
    expect(evidenceStatus(route, 'identity', [review], now).status).toBe('supported');
    expect(evidenceStatus({ ...route, reach: 'A to C' }, 'identity', [review], now).status).toBe('changed');
    expect(evidenceStatus(route, 'identity', [{ ...review, reviewedAt: '2025-01-01' }], now).status).toBe('stale');
    expect(evidenceStatus(route, 'identity', [{ ...review, reviewedAt: '2027-01-01' }], now).status).toBe('stale');
    expect(evidenceStatus(route, 'identity', [{ ...review, verdict: 'conflict' }], now).status).toBe('conflict');
  });
  it('uses the newest review and keeps unrelated edits from invalidating an identity review', () => {
    expect(evidenceStatus({ ...route, latitude: 44 }, 'identity', [review], now).status).toBe('supported');
    expect(evidenceStatus(route, 'identity', [{ ...review, verdict: 'conflict', reviewedAt: '2026-10-14' }, review], now).status).toBe('supported');
  });
  it('rejects malformed evidence and unsafe links', () => {
    expect(() => validateLedger({ version: 1, reviews: [review] })).not.toThrow();
    expect(() => validateLedger({ version: 1, reviews: [{ ...review, sourceUrl: 'javascript:alert(1)' }] })).toThrow();
    expect(() => validateLedger({ version: 1, reviews: [{ ...review, reviewedAt: 'never' }] })).toThrow();
  });
});
describe('route QA history and rendering', () => {
  it('keeps actual errors separate from evidence gaps without hiding conflicts', () => {
    expect(findingKind(makeFinding('r','coordinates','high','Wrong point','failure'))).toBe('issues');
    expect(findingKind(makeFinding('r','evidence:access','high','Conflicting source'))).toBe('issues');
    expect(findingKind(makeFinding('r','coordinates','medium','No source','unknown'))).toBe('coverage');
    expect(findingKind(makeFinding('r','data','medium','Context only','missing-minimum'))).toBe('coverage');
    expect(findingKind(makeFinding('r','overlap','medium','Unresolved crossing'))).toBe('issues');
    expect(findingKind(makeFinding('r','overlap','low','Shared endpoint'))).toBe('information');
  });
  it('does not resolve findings outside the comparable scope or during failed runs', () => {
    const old = makeFinding('r', 'data', 'high', 'Old');
    const other = makeFinding('other', 'data', 'high', 'Other');
    const current = makeFinding('r', 'data', 'high', 'New');
    expect(compareFindings([current], [old, other], new Set(['r']))).toEqual({ new: [current.id], resolved: [old.id], remaining: [] });
    expect(compareFindings([], [old], new Set()).resolved).toEqual([]);
    expect(compareFindings([old], [old], new Set(['r'])).remaining).toEqual([old.id]);
  });
  it('prevents route data from escaping the embedded JSON script', () => {
    const report = { generatedAt: '', complete: true, scope: { selected: 0, inventory: 0 }, comparison: { baselineAt: null, comparable: true, new: [], resolved: [], remaining: [] }, checks: [], findings: [makeFinding('r', 'data', 'high', '</script><script>alert(1)</script>')], routes: [] };
    const html = renderQaReport(report);
    expect(html).not.toContain('</script><script>alert(1)');
    expect(html).toContain('\\u003c/script\\u003e');
  });
});
