export type CoordinateStatus = 'consistent' | 'nearby-variants' | 'distinct-locations' | 'conflict';

export type WaterAuditStatus = {
  auditSeverity: string | null;
  distanceFeetToMatchedRiver: number | null;
  endpointOnWaterbody: boolean | null;
};

export function occurrenceIsWaterPlausible(occurrence: WaterAuditStatus) {
  return occurrence.auditSeverity === 'ok'
    || (occurrence.auditSeverity === 'review' && (occurrence.distanceFeetToMatchedRiver ?? Infinity) <= 300)
    || occurrence.endpointOnWaterbody === true;
}

export function classifyCoordinateStatus(
  maximumSeparationFeet: number,
  coordinateVariantCount: number,
  occurrences: WaterAuditStatus[],
): CoordinateStatus {
  if (maximumSeparationFeet <= 1000) return coordinateVariantCount > 1 ? 'nearby-variants' : 'consistent';
  // A reused display name is not proof of shared physical identity. If every
  // distant cluster is already water-plausible, preserve the locations and
  // explicitly forbid canonical propagation between them.
  return occurrences.length > 0 && occurrences.every(occurrenceIsWaterPlausible)
    ? 'distinct-locations'
    : 'conflict';
}

type AuthoritativeIdentityResolutionInput = {
  preliminaryStatus: CoordinateStatus;
  routeCount: number;
  consensusRouteCount: number;
  consensusExactOnRiver: boolean;
  consensusWaterbodyConfirmed: boolean;
  authoritativeAccessToConsensusFeet: number | null;
};

/**
 * A water-plausible stale coordinate must not turn a single named access into
 * two identities once an exact official access corroborates a hydrography-
 * verified majority cluster. Keep it as a conflict until the stale minority is
 * propagated; genuine ties and unverified clusters remain distinct locations.
 */
export function authoritativeEvidenceResolvesDistinctLocation(input: AuthoritativeIdentityResolutionInput) {
  return input.preliminaryStatus === 'distinct-locations'
    && input.consensusRouteCount >= 2
    && input.consensusRouteCount > input.routeCount / 2
    && (input.consensusExactOnRiver || input.consensusWaterbodyConfirmed)
    && (input.authoritativeAccessToConsensusFeet ?? Infinity) <= 250;
}
