import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  authoritativeEvidenceResolvesDistinctLocation,
  classifyCoordinateStatus,
} from '../../scripts/lib/access-registry-status';

describe('classifyCoordinateStatus', () => {
  it('merges display-name aliases that share one stable access source id', () => {
    const registry = JSON.parse(readFileSync(
      path.join(process.cwd(), 'src', 'data', 'generated', 'route-access-registry.json'),
      'utf8',
    )) as { entries: Array<{ sourceIds: string[]; aliases: string[]; occurrenceCount: number }> };
    const peltier = registry.entries.filter((entry) => entry.sourceIds.includes('peltier-lake'));
    expect(peltier).toHaveLength(1);
    expect(peltier[0]?.aliases).toEqual(expect.arrayContaining([
      'Peltier Lake boat launch',
      'Peltier Lake public boat launch (Lino Lakes)',
    ]));
    expect(peltier[0]?.occurrenceCount).toBe(2);
  });

  it('keeps distant same-name locations separate when every occurrence is water-plausible', () => {
    expect(classifyCoordinateStatus(5_000, 2, [
      { auditSeverity: 'review', distanceFeetToMatchedRiver: 180, endpointOnWaterbody: false },
      { auditSeverity: 'review', distanceFeetToMatchedRiver: null, endpointOnWaterbody: true },
    ])).toBe('distinct-locations');
  });

  it('retains a conflict when a distant occurrence fails the water audit', () => {
    expect(classifyCoordinateStatus(5_000, 2, [
      { auditSeverity: 'ok', distanceFeetToMatchedRiver: 20, endpointOnWaterbody: true },
      { auditSeverity: 'failure', distanceFeetToMatchedRiver: 4_000, endpointOnWaterbody: false },
    ])).toBe('conflict');
  });

  it('classifies nearby coordinate variants without conflating them with distant identities', () => {
    expect(classifyCoordinateStatus(250, 2, [])).toBe('nearby-variants');
    expect(classifyCoordinateStatus(0, 1, [])).toBe('consistent');
  });

  it('lets exact official evidence resolve a verified majority cluster without merging a tie', () => {
    expect(authoritativeEvidenceResolvesDistinctLocation({
      preliminaryStatus: 'distinct-locations',
      routeCount: 4,
      consensusRouteCount: 3,
      consensusExactOnRiver: true,
      consensusWaterbodyConfirmed: true,
      authoritativeAccessToConsensusFeet: 26,
    })).toBe(true);
    expect(authoritativeEvidenceResolvesDistinctLocation({
      preliminaryStatus: 'distinct-locations',
      routeCount: 4,
      consensusRouteCount: 2,
      consensusExactOnRiver: true,
      consensusWaterbodyConfirmed: true,
      authoritativeAccessToConsensusFeet: 26,
    })).toBe(false);
  });

  it('preserves distinct locations when official or hydrography corroboration is absent', () => {
    expect(authoritativeEvidenceResolvesDistinctLocation({
      preliminaryStatus: 'distinct-locations',
      routeCount: 4,
      consensusRouteCount: 3,
      consensusExactOnRiver: false,
      consensusWaterbodyConfirmed: false,
      authoritativeAccessToConsensusFeet: 26,
    })).toBe(false);
    expect(authoritativeEvidenceResolvesDistinctLocation({
      preliminaryStatus: 'distinct-locations',
      routeCount: 4,
      consensusRouteCount: 3,
      consensusExactOnRiver: true,
      consensusWaterbodyConfirmed: true,
      authoritativeAccessToConsensusFeet: 251,
    })).toBe(false);
  });
});
