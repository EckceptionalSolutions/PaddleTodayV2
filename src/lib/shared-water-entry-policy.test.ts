import { describe, expect, it } from 'vitest';
import {
  canAuthoritativeCandidateSupersedeSharedEntry,
  canRecoverSharedRouteGeometry,
  hasAuditConfirmedSharedWaterEntry,
} from '../../scripts/lib/shared-water-entry-policy';

describe('hasAuditConfirmedSharedWaterEntry', () => {
  it('accepts two-route consensus on a directly confirmed waterbody bank', () => {
    expect(hasAuditConfirmedSharedWaterEntry({
      waterEntryConsensusRouteCount: 2,
      waterEntryExactOnRiver: false,
      waterEntryWaterbodyConfirmed: true,
    })).toBe(true);
  });

  it('accepts two-route consensus tightly audited to the named flowline', () => {
    expect(hasAuditConfirmedSharedWaterEntry({
      waterEntryConsensusRouteCount: 2,
      waterEntryExactOnRiver: true,
      waterEntryWaterbodyConfirmed: false,
    })).toBe(true);
  });

  it('does not let one occurrence certify itself', () => {
    expect(hasAuditConfirmedSharedWaterEntry({
      waterEntryConsensusRouteCount: 1,
      waterEntryExactOnRiver: true,
      waterEntryWaterbodyConfirmed: true,
    })).toBe(false);
  });

  it('does not promote consensus that lacks hydrography confirmation', () => {
    expect(hasAuditConfirmedSharedWaterEntry({
      waterEntryConsensusRouteCount: 3,
      waterEntryExactOnRiver: false,
      waterEntryWaterbodyConfirmed: false,
    })).toBe(false);
  });

  it('allows a bounded stale-geometry recovery only for confirmed shared entries', () => {
    const confirmed = {
      waterEntryConsensusRouteCount: 2,
      waterEntryExactOnRiver: false,
      waterEntryWaterbodyConfirmed: true,
    };
    expect(canRecoverSharedRouteGeometry(confirmed, 1_356)).toBe(true);
    expect(canRecoverSharedRouteGeometry(confirmed, 2_001)).toBe(false);
    expect(canRecoverSharedRouteGeometry({ ...confirmed, waterEntryConsensusRouteCount: 1 }, 1_356)).toBe(false);
  });

  it('lets exact authoritative evidence supersede repetition that lacks hydrography confirmation', () => {
    const unverifiedConsensus = {
      routeCount: 4,
      verificationStatus: 'derived-consensus',
      waterEntryCoordinate: { latitude: 42.19, longitude: -90.87 },
      waterEntryConsensusRouteCount: 3,
      waterEntryExactOnRiver: false,
      waterEntryWaterbodyConfirmed: false,
    };
    expect(canAuthoritativeCandidateSupersedeSharedEntry(unverifiedConsensus, 2_278)).toBe(true);
    expect(canAuthoritativeCandidateSupersedeSharedEntry({ ...unverifiedConsensus, waterEntryWaterbodyConfirmed: true }, 2_278)).toBe(false);
    expect(canAuthoritativeCandidateSupersedeSharedEntry(unverifiedConsensus, 800)).toBe(false);
  });
});
