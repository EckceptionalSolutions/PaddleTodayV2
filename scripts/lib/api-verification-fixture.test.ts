import { describe, expect, it } from 'vitest';
import { createApiVerificationSummary } from '../api-verification-fixture';
import { getRiverBySlug } from '../../src/lib/rivers';
import { conditionZoneIdForRiver } from '../../src/lib/condition-zones';

describe('isolated API package fixture', () => {
  it('calculates missing-input responses from current models and excludes planning/unknown routes', () => {
    const slug = 'ouachita-river-remmel-whitewater-park';
    const now = new Date('2026-10-20T23:00:00Z');
    const fixture = createApiVerificationSummary([slug, slug, 'namekagon-river-county-k-whispering-pines', 'unknown-route'], now);
    expect(fixture.riverCount).toBe(1);
    expect(fixture.generatedAt).toBe(now.toISOString());
    const item = fixture.rivers[0];
    expect(item.river.conditionZoneId).toBe(conditionZoneIdForRiver(getRiverBySlug(slug)!));
    expect(item.river.conditionZoneId).toContain(':3200:');
    expect(item.readiness.status).toBe('withheld');
    expect(item.liveData.gaugeState).toBe('unavailable');
  });

  it('fails clearly when no current eligible routes remain', () => {
    expect(() => createApiVerificationSummary(['unknown-route', 'namekagon-river-county-k-whispering-pines'])).toThrow('current score-eligible fixture route');
  });
});
