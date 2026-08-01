export type CandidateHydrographyMode = 'on-waterbody' | 'projected-to-waterbody' | 'projected-to-flowline' | 'mapped-launch-near-waterbody' | 'authoritative-water-entry';

type DirectNhdGeometryPolicyInput = {
  mode: CandidateHydrographyMode | null | undefined;
  nearestIntendedFlowlineFeet: number | null | undefined;
  nearestWaterbodyFeet: number | null | undefined;
  onNhdWaterbody: boolean | null | undefined;
  terminalEndpoint?: boolean;
};

/**
 * Route geometry is usually an NHD centerline. A named official access that is
 * independently tied to the intended flowline and placed on (or projected to)
 * the NHD water polygon may legitimately be farther from that centerline on a
 * broad river. A narrower terminal-endpoint exception allows an exact named
 * official access projected no more than 250 feet to the intended flowline to
 * recover from a route trace whose endpoint was generated from the bad stored
 * coordinate. Intermediate access points do not receive that exception.
 */
export function directNhdRouteGeometryLimitFeet(input: DirectNhdGeometryPolicyInput) {
  const waterbodyBacked = input.mode === 'on-waterbody'
    ? input.onNhdWaterbody === true
    : input.mode === 'projected-to-waterbody'
      && (input.nearestWaterbodyFeet ?? Infinity) <= 150;
  const intendedFlowlineBacked = (input.nearestIntendedFlowlineFeet ?? Infinity) <= 800;
  const terminalFlowlineRecovery = input.mode === 'projected-to-flowline'
    && input.terminalEndpoint === true
    && (input.nearestIntendedFlowlineFeet ?? Infinity) <= 250;
  if (terminalFlowlineRecovery) return 800;
  return waterbodyBacked && intendedFlowlineBacked ? 500 : 300;
}

type UnreliableTerminalGeometryRecoveryInput = DirectNhdGeometryPolicyInput & {
  routeGeometryDistanceFeet: number | null | undefined;
  routeGeometryReliable: boolean | null | undefined;
  officialAnchorToWaterEntryFeet: number | null | undefined;
  ambiguousOfficialCandidates: boolean | null | undefined;
};

export const unreliableTerminalGeometryRecoveryMaxFeet = 5_280;

export function canOfficialWaterbodyRecoverUnreliableTerminalGeometry(input: UnreliableTerminalGeometryRecoveryInput) {
  return input.terminalEndpoint === true
    && input.routeGeometryReliable === false
    && input.mode === 'on-waterbody'
    && input.onNhdWaterbody === true
    && input.ambiguousOfficialCandidates === false
    && (input.nearestIntendedFlowlineFeet ?? Infinity) <= 100
    && (input.officialAnchorToWaterEntryFeet ?? Infinity) <= 50
    && (input.routeGeometryDistanceFeet ?? Infinity) <= unreliableTerminalGeometryRecoveryMaxFeet;
}

type NamedTerminalWaterbodyRecoveryInput = {
  terminalEndpoint: boolean;
  exactOfficialNameMatch: boolean;
  terminalNamedWaterbodyAgreement: boolean;
  mode: CandidateHydrographyMode | null | undefined;
  nearestIntendedFlowlineFeet: number | null | undefined;
  nearestWaterbodyFeet: number | null | undefined;
  officialAnchorToWaterEntryFeet: number | null | undefined;
  candidateMoveFeet: number | null | undefined;
  routeGeometryDistanceFeet: number | null | undefined;
  routeGeometryReliable: boolean | null | undefined;
  ambiguousOfficialCandidates: boolean | null | undefined;
};

export const namedTerminalWaterbodyRouteGeometryMaxFeet = 2_500;

/**
 * Some river itineraries intentionally start or finish on a named lake. The
 * river-only trace begins at the outlet and therefore cannot validate the
 * shoreline launch. Permit a short parking-to-shore correction only when the
 * official identity is exact and the named waterbody agrees with both endpoint
 * and reach semantics.
 */
export function canRecoverNamedTerminalWaterbody(input: NamedTerminalWaterbodyRecoveryInput) {
  return input.terminalEndpoint
    && input.exactOfficialNameMatch
    && input.terminalNamedWaterbodyAgreement
    && input.mode === 'projected-to-waterbody'
    && input.routeGeometryReliable === false
    && input.ambiguousOfficialCandidates === false
    && (input.nearestWaterbodyFeet ?? Infinity) <= 250
    && (input.officialAnchorToWaterEntryFeet ?? Infinity) <= 250
    && (input.candidateMoveFeet ?? Infinity) <= 300
    && (input.nearestIntendedFlowlineFeet ?? Infinity) <= 2_500
    && (input.routeGeometryDistanceFeet ?? Infinity) <= namedTerminalWaterbodyRouteGeometryMaxFeet;
}

type MappedNamedTerminalWaterbodyRecoveryInput = Omit<NamedTerminalWaterbodyRecoveryInput, 'mode' | 'officialAnchorToWaterEntryFeet'> & {
  mappedLaunch: boolean;
  officialAnchorToMappedLaunchFeet: number | null | undefined;
};

/**
 * Prefer a mapped physical launch over a generic shoreline projection when an
 * exact official access anchor, endpoint/reach semantics, and local NHD
 * waterbody all independently identify the same lake. The mapped launch may
 * sit just outside a generalized NHD polygon, so a 200-foot edge tolerance is
 * allowed; the official anchor and stored endpoint must remain close.
 */
export function canRecoverMappedNamedTerminalWaterbody(input: MappedNamedTerminalWaterbodyRecoveryInput) {
  return input.terminalEndpoint
    && input.mappedLaunch
    && input.exactOfficialNameMatch
    && input.terminalNamedWaterbodyAgreement
    && input.routeGeometryReliable === false
    && input.ambiguousOfficialCandidates === false
    && (input.nearestWaterbodyFeet ?? Infinity) <= 200
    && (input.officialAnchorToMappedLaunchFeet ?? Infinity) <= 150
    && (input.candidateMoveFeet ?? Infinity) <= 150
    && (input.nearestIntendedFlowlineFeet ?? Infinity) <= 2_500
    && (input.routeGeometryDistanceFeet ?? Infinity) <= namedTerminalWaterbodyRouteGeometryMaxFeet;
}

type DirectNhdMappedLaunchInput = {
  mappedLaunch: boolean;
  directQueryVerified: boolean;
  intendedFlowlineNameAgreement: boolean;
  nearestIntendedFlowlineFeet: number | null | undefined;
  nearestWaterbodyFeet: number | null | undefined;
  routeGeometryDistanceFeet: number | null | undefined;
  candidateMoveFeet: number | null | undefined;
  ambiguousOfficialCandidates: boolean | null | undefined;
  accessIdentityStrong: boolean;
};

/**
 * Candidate hydrography is calculated at the proposed launch itself. This is
 * safer than reusing the audit's nearest-river point for the old coordinate,
 * which can be thousands of feet away after a bad endpoint has distorted the
 * route trace. Require the mapped physical launch, named NHD flowline, local
 * water polygon, route corridor, and independently strong access identity to
 * converge inside tight bounds.
 *
 * This only proves that one mapped candidate is plausible. The caller must
 * separately block automatic selection when multiple distinct launches pass
 * the same test (for example, Tyler Bend Upper and Lower).
 */
export function canDirectNhdVerifyMappedLaunch(input: DirectNhdMappedLaunchInput) {
  return input.mappedLaunch
    && input.directQueryVerified
    && input.intendedFlowlineNameAgreement
    && input.ambiguousOfficialCandidates === false
    && input.accessIdentityStrong
    && (input.nearestIntendedFlowlineFeet ?? Infinity) <= 150
    && (input.nearestWaterbodyFeet ?? Infinity) <= 150
    && (input.routeGeometryDistanceFeet ?? Infinity) <= 150
    && (input.candidateMoveFeet ?? Infinity) <= 2_500;
}

type FreshWideRiverBankInput = {
  directQueryVerified: boolean;
  flowlineEvidenceSource: string | null | undefined;
  waterbodyEvidenceSource: string | null | undefined;
  mode: CandidateHydrographyMode | null | undefined;
  nearestIntendedFlowlineFeet: number | null | undefined;
  nearestWaterbodyFeet: number | null | undefined;
  routeGeometryDistanceFeet: number | null | undefined;
  ambiguousOfficialCandidates: boolean | null | undefined;
  exactOfficialNameMatch: boolean;
  namedOfficialWaterbodyAgreement: boolean;
};

/**
 * A legitimate bank launch can be far from a centerline on a broad river.
 * Permit that shape only when exact official identity and named-waterbody
 * semantics agree, fresh candidate-centered queries find both the intended
 * flowline and polygon, and the proposed entry is a short polygon projection.
 */
export function canVerifyFreshWideRiverBank(input: FreshWideRiverBankInput) {
  return input.directQueryVerified
    && input.flowlineEvidenceSource === 'candidate-query'
    && input.waterbodyEvidenceSource === 'candidate-query'
    && input.mode === 'projected-to-waterbody'
    && input.ambiguousOfficialCandidates === false
    && input.exactOfficialNameMatch
    && input.namedOfficialWaterbodyAgreement
    && (input.nearestWaterbodyFeet ?? Infinity) <= 150
    && (input.nearestIntendedFlowlineFeet ?? Infinity) <= 1_500
    && (input.routeGeometryDistanceFeet ?? Infinity) <= 1_500;
}

type OfficialSiteMapDerivedRampInput = {
  terminalEndpoint: boolean;
  directQueryVerified: boolean;
  flowlineEvidenceSource: string | null | undefined;
  waterbodyEvidenceSource: string | null | undefined;
  mode: CandidateHydrographyMode | null | undefined;
  nearestIntendedFlowlineFeet: number | null | undefined;
  nearestWaterbodyFeet: number | null | undefined;
  routeGeometryDistanceFeet: number | null | undefined;
  uncertaintyFeet: number | null | undefined;
  ambiguousOfficialCandidates: boolean | null | undefined;
  exactAccessNameAgreement: boolean;
  namedOfficialWaterbodyAgreement: boolean;
};

/**
 * A non-geospatial official site map can still identify a uniquely shaped,
 * purpose-built ramp. Its georeferenced coordinate is only safe when fresh
 * candidate-centered NHD queries independently place the ramp beside the
 * intended named flowline and water polygon, and the active route corridor
 * agrees inside the same tight local area.
 */
export function canVerifyOfficialSiteMapDerivedRamp(input: OfficialSiteMapDerivedRampInput) {
  return input.terminalEndpoint
    && input.directQueryVerified
    && input.flowlineEvidenceSource === 'candidate-query'
    && input.waterbodyEvidenceSource === 'candidate-query'
    && (input.mode === 'authoritative-water-entry' || input.mode === 'on-waterbody')
    && input.ambiguousOfficialCandidates === false
    && input.exactAccessNameAgreement
    && input.namedOfficialWaterbodyAgreement
    && (input.uncertaintyFeet ?? Infinity) <= 75
    && (input.nearestIntendedFlowlineFeet ?? Infinity) <= 250
    && (input.nearestWaterbodyFeet ?? Infinity) <= 100
    && (input.routeGeometryDistanceFeet ?? Infinity) <= 250;
}

type OfficialTerminalAlternateWaterbodyRampInput = {
  terminalEndpoint: boolean;
  terminalAlternateWaterbodyDeclared: boolean;
  relationship: 'downstream-after-confluence' | 'tributary-before-confluence' | 'connected-water-trail-waterbody' | null | undefined;
  relationshipSourceUrl: string | null | undefined;
  directQueryVerified: boolean;
  flowlineEvidenceSource: string | null | undefined;
  waterbodyEvidenceSource: string | null | undefined;
  mode: CandidateHydrographyMode | null | undefined;
  nearestIntendedFlowlineFeet: number | null | undefined;
  nearestWaterbodyFeet: number | null | undefined;
  candidateToRouteFlowlineFeet: number | null | undefined;
  routeToIntendedFlowlineJunctionFeet: number | null | undefined;
  maximumConnectionDistanceFeet: number | null | undefined;
  routeGeometryReliable: boolean | null | undefined;
  routeGeometryDistanceFeet: number | null | undefined;
  uncertaintyFeet: number | null | undefined;
  ambiguousOfficialCandidates: boolean | null | undefined;
  exactAccessNameAgreement: boolean;
  routeWaterbodyAgreement: boolean;
  terminalWaterbodyAgreement: boolean;
  occurrenceRouteCount: number;
};

/**
 * A route may intentionally end on a connected named waterway: downstream on
 * a receiving river, or a short distance up a tributary to a documented
 * landing. Keep this exception much narrower than ordinary same-waterbody
 * matching: an official route source must declare the connection, an official
 * site map must identify the physical entry, fresh NHD queries must find both
 * named flowlines and their junction, and the entry must remain within the
 * declared connection distance. Repetition across related routes is required
 * as an additional identity check.
 */
export function canVerifyOfficialTerminalAlternateWaterbodyRamp(input: OfficialTerminalAlternateWaterbodyRampInput) {
  const routeGeometryCompatible = input.routeGeometryReliable === false
    || (input.routeGeometryDistanceFeet ?? Infinity) <= 750;
  const declaredMaximum = Math.min(input.maximumConnectionDistanceFeet ?? 0, 6_600);
  const connectedWaterTrailWaterbody = input.relationship === 'connected-water-trail-waterbody';
  const terminalWaterLocationPasses = input.relationship === 'tributary-before-confluence'
    ? (input.nearestIntendedFlowlineFeet ?? Infinity) <= 75
    : connectedWaterTrailWaterbody
      ? (input.nearestWaterbodyFeet ?? Infinity) <= 50
    : (input.nearestIntendedFlowlineFeet ?? Infinity) <= 750
      && (input.nearestWaterbodyFeet ?? Infinity) <= 50;
  const connectionTopologyPasses = connectedWaterTrailWaterbody
    ? declaredMaximum > 0
      && (input.candidateToRouteFlowlineFeet ?? Infinity) <= declaredMaximum
    : (input.routeToIntendedFlowlineJunctionFeet ?? Infinity) <= 50
      && declaredMaximum > 0
      && (input.candidateToRouteFlowlineFeet ?? Infinity) <= declaredMaximum;
  return input.terminalEndpoint
    && input.terminalAlternateWaterbodyDeclared
    && (input.relationship === 'downstream-after-confluence'
      || input.relationship === 'tributary-before-confluence'
      || connectedWaterTrailWaterbody)
    && Boolean(input.relationshipSourceUrl)
    && input.directQueryVerified
    && input.flowlineEvidenceSource === 'candidate-query'
    && input.waterbodyEvidenceSource === 'candidate-query'
    && (input.mode === 'authoritative-water-entry' || input.mode === 'on-waterbody')
    && input.ambiguousOfficialCandidates === false
    && input.exactAccessNameAgreement
    && input.routeWaterbodyAgreement
    && input.terminalWaterbodyAgreement
    // A connected lake/channel terminal may occur only once in the route
    // catalog. Its identity comes from an official end-to-end water-trail map
    // rather than repetition across multiple routes. Confluence exceptions
    // still require repetition as an independent identity check.
    && (connectedWaterTrailWaterbody || input.occurrenceRouteCount >= 2)
    && routeGeometryCompatible
    && (input.uncertaintyFeet ?? Infinity) <= 75
    && terminalWaterLocationPasses
    && connectionTopologyPasses;
}
