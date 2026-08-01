export type SharedWaterEntryVerification = {
  waterEntryConsensusRouteCount: number;
  waterEntryExactOnRiver: boolean;
  waterEntryWaterbodyConfirmed: boolean;
};

type SharedWaterEntryReplacementInput = SharedWaterEntryVerification & {
  routeCount: number;
  verificationStatus: string;
  waterEntryCoordinate: { latitude: number; longitude: number } | null;
};

export const sharedRouteGeometryRecoveryMaxFeet = 2_000;

/**
 * A bank coordinate can be trustworthy even when it is more than 100 feet
 * from a river centerline. Require agreement from at least two routes and
 * either a tight named-flowline audit or direct NHD waterbody containment.
 */
export function hasAuditConfirmedSharedWaterEntry(entry: SharedWaterEntryVerification | null | undefined) {
  return Boolean(entry
    && entry.waterEntryConsensusRouteCount >= 2
    && (entry.waterEntryExactOnRiver || entry.waterEntryWaterbodyConfirmed));
}

export function canRecoverSharedRouteGeometry(
  entry: SharedWaterEntryVerification | null | undefined,
  geometryDistanceFeet: number | null | undefined,
) {
  return hasAuditConfirmedSharedWaterEntry(entry)
    && geometryDistanceFeet !== null
    && geometryDistanceFeet !== undefined
    && geometryDistanceFeet > 1_000
    && geometryDistanceFeet <= sharedRouteGeometryRecoveryMaxFeet;
}

/**
 * Repetition alone must not outweigh an exact named official access. A stored
 * consensus may be replaced only while it still lacks either direct flowline
 * or waterbody confirmation and the official candidate is materially distant.
 */
export function canAuthoritativeCandidateSupersedeSharedEntry(
  entry: SharedWaterEntryReplacementInput | null | undefined,
  candidateDistanceFromSharedFeet: number | null | undefined,
) {
  return Boolean(entry
    && entry.routeCount >= 2
    && entry.waterEntryCoordinate
    && ['derived-consensus', 'conflict'].includes(entry.verificationStatus)
    && !entry.waterEntryExactOnRiver
    && !entry.waterEntryWaterbodyConfirmed
    && (candidateDistanceFromSharedFeet ?? 0) > 800);
}
