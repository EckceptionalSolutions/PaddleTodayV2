import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { rivers } from '../src/data/rivers';
import { riverTripDetails } from '../src/data/river-trip-details';
import {
  accessFacilityIdentitiesAgree,
  accessNamesAgree,
  normalizeAccessText,
  preferExactAccessNameMatches,
} from './lib/access-name-match';
import { assessCandidateConfidence, type ConfidenceLevel } from './lib/candidate-confidence';
import {
  canDirectNhdVerifyMappedLaunch,
  canOfficialWaterbodyRecoverUnreliableTerminalGeometry,
  canRecoverMappedNamedTerminalWaterbody,
  canRecoverNamedTerminalWaterbody,
  canVerifyFreshWideRiverBank,
  canVerifyOfficialSiteMapDerivedRamp,
  canVerifyOfficialTerminalAlternateWaterbodyRamp,
  directNhdRouteGeometryLimitFeet,
} from './lib/candidate-hydrography-policy';
import {
  canAuthoritativeCandidateSupersedeSharedEntry,
  canRecoverSharedRouteGeometry,
  hasAuditConfirmedSharedWaterEntry,
} from './lib/shared-water-entry-policy';
import { writeFileReliably } from './lib/write-file-reliably';

type Endpoint = {
  routeId: string;
  routeName: string;
  reach: string;
  state: string;
  endpoint: string;
  endpointName: string;
  latitude: number;
  longitude: number;
  matchedRiverName: string | null;
  distanceFeetToMatchedRiver: number | null;
  nearestMatchedLatitude: number | null;
  nearestMatchedLongitude: number | null;
  nearestWaterwayName: string | null;
  distanceFeetToNearestWaterway: number | null;
  nearestWaterwayLatitude: number | null;
  nearestWaterwayLongitude: number | null;
  nearestWaterbodyName: string | null;
  distanceFeetToNearestWaterbody: number | null;
  nearestWaterbodyLatitude: number | null;
  nearestWaterbodyLongitude: number | null;
  endpointOnWaterbody: boolean;
  coordinateEvidenceRole?: 'authoritative-area-anchor' | 'authoritative-water-entry' | null;
  coordinateEvidenceSourceUrl?: string | null;
  coordinateEvidenceDetail?: string | null;
  severity: string;
  note: string;
};

type Coordinate = { latitude: number; longitude: number };
type RouteGeometry = {
  properties?: { endpointSnapMaxFeet?: number | null; traceMode?: string };
  geometry?: { coordinates?: number[][][] };
};
type AuditReport = { generatedAt: string; endpoints: Endpoint[] };
type RegistryEntry = {
  id: string;
  state: string;
  name: string;
  aliases: string[];
  accessCoordinate: Coordinate | null;
  waterEntryCoordinate: Coordinate | null;
  coordinateStatus: 'consistent' | 'nearby-variants' | 'distinct-locations' | 'conflict';
  verificationStatus: 'authoritative-water-entry' | 'derived-consensus' | 'area-anchor-only' | 'authoritative-access-mismatch' | 'ambiguous-name' | 'conflict' | 'unverified';
  maximumSeparationFeet: number;
  routeCount: number;
  occurrenceCount: number;
  waterEntryConsensusRouteCount: number;
  waterEntryExactOnRiver: boolean;
  waterEntryWaterbodyConfirmed: boolean;
  authoritativeAccessMismatchFeet?: number | null;
};
type Registry = { generatedAt: string; entries: RegistryEntry[] };
type Evidence = {
  signal: string;
  effect: number;
  detail: string;
  source: 'hydrography' | 'shared-access' | 'semantic' | 'proximity' | 'openstreetmap' | 'authoritative' | 'conflict';
  url?: string;
};
type Candidate = {
  kind: string;
  name: string | null;
  latitude: number;
  longitude: number;
  distanceFeet: number | null;
  score: number;
  confidence: ConfidenceLevel;
  waterScore: number;
  waterConfidence: ConfidenceLevel;
  accessScore: number;
  accessConfidence: ConfidenceLevel;
  limitingFactor: 'water-location' | 'access-location' | 'balanced';
  evidenceScore: number;
  evidence: Evidence[];
  autoApplyEligible: boolean;
  sourceUrl?: string;
  matchedRiverPointDistanceFeet?: number | null;
  routeGeometryDistanceFeet?: number | null;
  routeGeometryReliable?: boolean;
  osmConsensusRouteCount?: number;
  competingMappedLaunchCount?: number;
  routeAxisFraction?: number | null;
  officialAccessAgreement?: { name: string | null; waterbody?: string | null; distanceFeet: number; sourceUrl: string } | null;
  candidateHydrography?: {
    candidateId: string;
    directQueryVerified?: boolean;
    flowlineEvidenceSource?: 'candidate-query' | 'route-cache';
    waterbodyEvidenceSource?: 'candidate-query' | 'route-cache';
    mode: 'on-waterbody' | 'projected-to-waterbody' | 'projected-to-flowline' | 'mapped-launch-near-waterbody' | 'authoritative-water-entry';
    nearestIntendedFlowlineFeet: number | null;
    nearestIntendedFlowlineName: string | null;
    nearestWaterbodyFeet: number | null;
    nearestWaterbodyName?: string | null;
    onNhdWaterbody: boolean;
    ambiguousOfficialCandidates: boolean;
    supportedOfficialCandidateCount: number;
    exactOfficialNameMatch?: boolean;
    terminalNamedWaterbodyAgreement?: boolean;
    nearbyMappedLaunchExists?: boolean;
    intendedWaterbody?: string | null;
    candidateToRouteFlowlineFeet?: number | null;
    routeToIntendedFlowlineJunctionFeet?: number | null;
  } | null;
  authoritativeWaterEntry?: {
    provider: string;
    featureId: string;
    waterbody: string | null;
    coordinateRole: string;
    sourceType: string | null;
    riverMile: number | null;
    uncertaintyFeet: number | null;
    matchedRiverDistanceFeet: number | null;
    onNhdWaterbody: boolean;
    occurrenceRouteCount: number;
    geometryConsensusRouteCount: number;
    terminalAlternateWaterbody?: {
      routeWaterbody: string;
      relationship: 'downstream-after-confluence' | 'tributary-before-confluence' | 'connected-water-trail-waterbody';
      sourceUrl: string;
      sourceLabel: string;
      maximumDownstreamDistanceFeet?: number;
      maximumConnectionDistanceFeet?: number;
    } | null;
  } | null;
};
type RawCandidate = Pick<Candidate,
  | 'kind'
  | 'name'
  | 'latitude'
  | 'longitude'
  | 'distanceFeet'
  | 'sourceUrl'
  | 'matchedRiverPointDistanceFeet'
  | 'osmConsensusRouteCount'
  | 'officialAccessAgreement'
  | 'authoritativeWaterEntry'
  | 'candidateHydrography'
  | 'routeGeometryDistanceFeet'
  | 'routeGeometryReliable'
  | 'routeAxisFraction'
  | 'competingMappedLaunchCount'
>;
type OsmEvidence = {
  items?: Array<{
    routeId: string;
    endpoint: string;
    endpointName: string;
    features: Array<{
      kind: string;
      name: string | null;
      latitude: number;
      longitude: number;
      distanceFromCurrentFeet: number;
      distanceFromMatchedRiverPointFeet: number | null;
      url: string;
    }>;
  }>;
};
type AuthoritativeEvidence = {
  items?: Array<{
    routeId: string;
    endpoint: string;
    endpointName: string;
    candidates: Array<{
      provider: string;
      featureId: string;
      name: string | null;
      officialName?: string | null;
      aliases?: string[];
      latitude: number;
      longitude: number;
      sourceUrl: string;
      distanceFromCurrentFeet?: number;
      distanceFromMatchedRiverPointFeet?: number | null;
      administrator?: string | number | null;
      waterbody?: string | null;
      parkingToAccessFeet?: number | null;
      coordinateRole?: string | null;
      sourceType?: string | null;
      riverMile?: number | null;
      uncertaintyFeet?: number | null;
      matchedRiverDistanceFeet?: number | null;
      onNhdWaterbody?: boolean;
      terminalAlternateWaterbody?: NonNullable<Candidate['authoritativeWaterEntry']>['terminalAlternateWaterbody'];
    }>;
  }>;
};
type CandidateHydrographyEvidence = {
  items?: Array<{
    routeId: string;
    endpoint: string;
    endpointName: string;
    candidates: Array<Coordinate & {
      candidateId: string;
      sourceType: string;
      name: string | null;
      nearestIntendedFlowlineFeet: number | null;
      nearestIntendedFlowlineName: string | null;
      nearestIntendedFlowlineCoordinate: Coordinate | null;
      nearestWaterbodyFeet: number | null;
      nearestWaterbodyName: string | null;
      nearestWaterbodyCoordinate: Coordinate | null;
      onNhdWaterbody: boolean;
      directQueryVerified?: boolean;
      flowlineEvidenceSource?: 'candidate-query' | 'route-cache';
      waterbodyEvidenceSource?: 'candidate-query' | 'route-cache';
      intendedWaterbody?: string | null;
      candidateToRouteFlowlineFeet?: number | null;
      routeToIntendedFlowlineJunctionFeet?: number | null;
    }>;
  }>;
};
type AutoValidation = {
  results?: Array<Coordinate & {
    routeId: string;
    endpoint: string;
    endpointName: string;
    passed: boolean;
  }>;
};

const root = process.cwd();
const reportPath = path.join(root, 'docs', 'route-coordinate-river-audit.json');
const registryPath = path.join(root, 'src', 'data', 'generated', 'route-access-registry.json');
const osmEvidencePath = path.join(root, 'docs', 'route-coordinate-osm-evidence.json');
const authoritativeEvidencePath = path.join(root, 'docs', 'route-coordinate-authoritative-evidence.json');
const candidateHydrographyPath = path.join(root, 'docs', 'route-coordinate-candidate-hydrography.json');
const autoValidationPath = path.join(root, 'docs', 'route-coordinate-auto-validation.json');
const reviewGeometryRoot = path.join(root, 'node_modules', '.cache', 'route-coordinate-review-geometries', 'routes');
const outputPath = path.join(root, 'docs', 'route-coordinate-suggestions.json');
const feetPerMile = 5280;
const earthRadiusMiles = 3958.8;
const officialMatchedRiverProjectionMaxFeet = 350;
const officialNamedWaterbodyProjectionMaxFeet = 500;
const mappedLaunchKinds = new Set(['waterway-access-point', 'slipway', 'canoe-access', 'whitewater-put-in']);

function normalize(value: string | null | undefined) {
  return (value ?? '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(?:the|river|creek|branch|fork)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function radians(value: number) {
  return value * Math.PI / 180;
}

function distanceFeet(left: Coordinate, right: Coordinate) {
  const deltaLat = radians(right.latitude - left.latitude);
  const deltaLon = radians(right.longitude - left.longitude);
  const leftLat = radians(left.latitude);
  const rightLat = radians(right.latitude);
  const h = Math.sin(deltaLat / 2) ** 2
    + Math.cos(leftLat) * Math.cos(rightLat) * Math.sin(deltaLon / 2) ** 2;
  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(h)) * feetPerMile;
}

function namesAgree(left: string | null | undefined, right: string | null | undefined) {
  const a = normalize(left);
  const b = normalize(right);
  return Boolean(a && b && (a === b || a.includes(b) || b.includes(a)));
}

function authoritativeWaterbodyFitsEndpoint(
  endpoint: Pick<Endpoint, 'endpoint' | 'routeName' | 'matchedRiverName'>,
  candidate: {
    waterbody?: string | null;
    terminalAlternateWaterbody?: NonNullable<Candidate['authoritativeWaterEntry']>['terminalAlternateWaterbody'];
  },
) {
  return !candidate.waterbody
    || namesAgree(endpoint.routeName, candidate.waterbody)
    || namesAgree(endpoint.matchedRiverName, candidate.waterbody)
    || Boolean(endpoint.endpoint !== 'accessPoint'
      && candidate.terminalAlternateWaterbody
      && namesAgree(endpoint.routeName, candidate.terminalAlternateWaterbody.routeWaterbody));
}

function isAuthoritativeAccessAnchor(candidate: { coordinateRole?: string | null }) {
  // Legacy geospatial inventories do not set coordinateRole and represent
  // actual access facilities. Explicit area anchors, however, are property or
  // polygon reference points and are never access or projection candidates.
  return candidate.coordinateRole !== 'authoritative-water-entry'
    && candidate.coordinateRole !== 'authoritative-area-anchor';
}

function projectToRouteGeometry(point: Coordinate, geometry: RouteGeometry | null) {
  const lines = geometry?.geometry?.coordinates ?? [];
  const latitudeScale = 69;
  const longitudeScale = Math.cos(radians(point.latitude)) * 69.172;
  const px = point.longitude * longitudeScale;
  const py = point.latitude * latitudeScale;
  let bestMiles = Infinity;
  let bestCoordinate: Coordinate | null = null;
  for (const line of lines) {
    for (let index = 1; index < line.length; index += 1) {
      const start = line[index - 1];
      const end = line[index];
      if (!start || !end) continue;
      const sx = start[0]! * longitudeScale;
      const sy = start[1]! * latitudeScale;
      const ex = end[0]! * longitudeScale;
      const ey = end[1]! * latitudeScale;
      const dx = ex - sx;
      const dy = ey - sy;
      const lengthSquared = dx * dx + dy * dy;
      const ratio = lengthSquared === 0 ? 0 : Math.max(0, Math.min(1, ((px - sx) * dx + (py - sy) * dy) / lengthSquared));
      const candidateMiles = Math.hypot(px - (sx + ratio * dx), py - (sy + ratio * dy));
      if (candidateMiles < bestMiles) {
        bestMiles = candidateMiles;
        bestCoordinate = {
          latitude: start[1]! + ratio * (end[1]! - start[1]!),
          longitude: start[0]! + ratio * (end[0]! - start[0]!),
        };
      }
    }
  }
  return Number.isFinite(bestMiles) && bestCoordinate
    ? { coordinate: bestCoordinate, distanceFeet: bestMiles * feetPerMile }
    : null;
}

function distanceToRouteGeometry(point: Coordinate, geometry: RouteGeometry | null) {
  return projectToRouteGeometry(point, geometry)?.distanceFeet ?? null;
}

function reliableRouteGeometry(geometry: RouteGeometry | null) {
  const endpointSnapMaxFeet = Number(geometry?.properties?.endpointSnapMaxFeet);
  return Number.isFinite(endpointSnapMaxFeet) && endpointSnapMaxFeet <= 500;
}

function routeAxisFraction(point: Coordinate, routeId: string) {
  const details = riverTripDetails[routeId];
  if (!details || !Number.isFinite(details.putIn.latitude) || !Number.isFinite(details.putIn.longitude)
    || !Number.isFinite(details.takeOut.latitude) || !Number.isFinite(details.takeOut.longitude)) return null;
  const latitudeScale = 69;
  const longitudeScale = Math.cos(radians(point.latitude)) * 69.172;
  const startX = details.putIn.longitude! * longitudeScale;
  const startY = details.putIn.latitude! * latitudeScale;
  const endX = details.takeOut.longitude! * longitudeScale;
  const endY = details.takeOut.latitude! * latitudeScale;
  const dx = endX - startX;
  const dy = endY - startY;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0) return null;
  const pointX = point.longitude * longitudeScale;
  const pointY = point.latitude * latitudeScale;
  return ((pointX - startX) * dx + (pointY - startY) * dy) / lengthSquared;
}

function baseCandidate(kind: string, name: string | null, latitude: number | null, longitude: number | null, moveFeet: number | null, sourceUrl?: string, matchedRiverPointDistanceFeet?: number | null, osmConsensusRouteCount?: number, officialAccessAgreement?: Candidate['officialAccessAgreement'], authoritativeWaterEntry?: Candidate['authoritativeWaterEntry'], candidateHydrography?: Candidate['candidateHydrography']): RawCandidate | null {
  if (latitude === null || longitude === null) return null;
  return { kind, name, latitude, longitude, distanceFeet: moveFeet, sourceUrl, matchedRiverPointDistanceFeet, osmConsensusRouteCount, officialAccessAgreement, authoritativeWaterEntry, candidateHydrography };
}

function hasFreshCandidateHydrography(candidate: RawCandidate) {
  const hydrography = candidate.candidateHydrography;
  if (!hydrography?.directQueryVerified || hydrography.flowlineEvidenceSource !== 'candidate-query') return false;
  if (hydrography.mode === 'on-waterbody'
    || hydrography.mode === 'projected-to-waterbody'
    || hydrography.mode === 'mapped-launch-near-waterbody') {
    return hydrography.waterbodyEvidenceSource === 'candidate-query';
  }
  return true;
}

function scoreCandidate(endpoint: Endpoint, raw: RawCandidate, registry: RegistryEntry | null): Candidate {
  const evidence: Evidence[] = [];
  const add = (signal: string, effect: number, detail: string, source: Evidence['source'], url?: string) => evidence.push({ signal, effect, detail, source, ...(url ? { url } : {}) });
  if (raw.kind === 'matched-river-centerline') {
    add('intended-river-centerline', 40, `Candidate lies on the NHD flowline matched to ${endpoint.routeName}.`, 'hydrography');
    if (namesAgree(endpoint.routeName, raw.name)) add('river-name-agreement', 20, `${raw.name} agrees with the route river name.`, 'semantic');
  } else if (raw.kind === 'nearest-named-waterway') {
    if (namesAgree(endpoint.routeName, raw.name) || namesAgree(endpoint.matchedRiverName, raw.name)) {
      add('river-name-agreement', 35, `${raw.name} agrees with the intended river.`, 'semantic');
      add('named-waterway', 15, 'Candidate is on a named NHD waterway.', 'hydrography');
    } else {
      add('wrong-waterway-risk', -35, `${raw.name ?? 'The nearest waterway'} does not agree with ${endpoint.routeName}.`, 'conflict');
    }
  } else if (raw.kind === 'nearest-nhd-waterbody') {
    add('unnamed-waterbody-only', 10, 'Candidate is on an NHD water polygon, but the polygon alone does not identify the intended launch.', 'hydrography');
  } else if (raw.kind === 'shared-water-entry') {
    add('shared-water-entry', 55, `A canonical access used by ${registry?.routeCount ?? 0} routes has a derived water-entry coordinate.`, 'shared-access');
    if ((registry?.routeCount ?? 0) >= 2) add('multi-route-consensus', 20, `${registry?.routeCount} routes reference this named access.`, 'shared-access');
    if (registry?.coordinateStatus === 'consistent') add('coordinate-consistency', 15, 'All stored occurrences agree on the access coordinate.', 'shared-access');
    else if (registry?.coordinateStatus === 'nearby-variants') add('coordinate-near-consensus', 8, 'Stored variants are close enough to represent the same access.', 'shared-access');
  } else if (['osm-waterway-access-point', 'osm-slipway', 'osm-canoe-access', 'osm-whitewater-put-in'].includes(raw.kind)) {
    if (hasFreshCandidateHydrography(raw)) {
      add('candidate-specific-nhd-query', 0, 'Hydrography was independently queried around this proposed coordinate rather than inherited from the old route endpoint.', 'hydrography');
    }
    add('mapped-launch-feature', 45, `OpenStreetMap identifies this feature as ${raw.kind.replace('osm-', '').replaceAll('-', ' ')}.`, 'openstreetmap', raw.sourceUrl);
    const mappedAccessNameAgreement = accessNamesAgree(endpoint.endpointName, raw.name);
    if (mappedAccessNameAgreement) add('access-name-agreement', 25, `${raw.name} agrees with the endpoint name.`, 'semantic');
    if ((raw.matchedRiverPointDistanceFeet ?? Infinity) <= 300) add('mapped-launch-near-intended-river', 20, `Mapped launch is within ${Math.round(raw.matchedRiverPointDistanceFeet!)} ft of the matched river point.`, 'hydrography');
    else if (canDirectNhdVerifyMappedLaunch({
      mappedLaunch: true,
      directQueryVerified: raw.candidateHydrography?.directQueryVerified === true,
      intendedFlowlineNameAgreement: Boolean(raw.candidateHydrography?.nearestIntendedFlowlineName
        && (namesAgree(endpoint.routeName, raw.candidateHydrography.nearestIntendedFlowlineName)
          || namesAgree(endpoint.matchedRiverName, raw.candidateHydrography.nearestIntendedFlowlineName))),
      nearestIntendedFlowlineFeet: raw.candidateHydrography?.nearestIntendedFlowlineFeet,
      nearestWaterbodyFeet: raw.candidateHydrography?.nearestWaterbodyFeet,
      routeGeometryDistanceFeet: raw.routeGeometryDistanceFeet,
      candidateMoveFeet: raw.distanceFeet,
      ambiguousOfficialCandidates: raw.candidateHydrography?.ambiguousOfficialCandidates,
      accessIdentityStrong: mappedAccessNameAgreement
        && ((raw.osmConsensusRouteCount ?? 0) >= 2 || Boolean(raw.officialAccessAgreement)),
    })) {
      add('mapped-launch-direct-nhd-river-agreement', 20, `Fresh candidate-specific NHD checks place this mapped launch within ${Math.round(raw.candidateHydrography!.nearestIntendedFlowlineFeet!)} ft of the named ${raw.candidateHydrography!.nearestIntendedFlowlineName} flowline and ${Math.round(raw.candidateHydrography!.nearestWaterbodyFeet!)} ft of its water polygon.`, 'hydrography', raw.sourceUrl);
    }
    if ((raw.osmConsensusRouteCount ?? 0) >= 2) add('multi-route-launch-consensus', 25, `${raw.osmConsensusRouteCount} routes using this named access independently resolve to the same mapped launch feature.`, 'shared-access');
    if ((raw.competingMappedLaunchCount ?? 0) > 1) {
      add('multiple-mapped-launch-candidates', -80, `${raw.competingMappedLaunchCount} distinct mapped launches satisfy the same access identity and river checks; an authoritative source must distinguish the intended launch.`, 'conflict');
    }
    if (raw.officialAccessAgreement) {
      add('authoritative-access-agreement', 25, `${raw.officialAccessAgreement.name ?? 'Official access'} is an authoritative access anchor${raw.officialAccessAgreement.waterbody ? ` on ${raw.officialAccessAgreement.waterbody}` : ''} ${Math.round(raw.officialAccessAgreement.distanceFeet)} ft from this mapped shoreline launch.`, 'authoritative', raw.officialAccessAgreement.sourceUrl);
      if (raw.officialAccessAgreement.distanceFeet <= 250) add('close-authoritative-launch-agreement', 10, 'The mapped launch and official access anchor agree within 250 ft.', 'authoritative', raw.officialAccessAgreement.sourceUrl);
      const officialWaterbodyAgrees = Boolean(raw.officialAccessAgreement.waterbody
        && (namesAgree(endpoint.routeName, raw.officialAccessAgreement.waterbody) || namesAgree(endpoint.matchedRiverName, raw.officialAccessAgreement.waterbody)));
      if (officialWaterbodyAgrees) {
        add('official-waterbody-agreement', 20, `${raw.officialAccessAgreement.waterbody} agrees with the route waterway.`, 'semantic');
      }
      if (raw.candidateHydrography?.terminalNamedWaterbodyAgreement) {
        add('official-terminal-waterbody-agreement', 20, `${raw.candidateHydrography.nearestWaterbodyName ?? 'The named waterbody'} agrees with this terminal endpoint and the route reach.`, 'semantic');
        add('mapped-launch-near-named-terminal-waterbody', 55, `The mapped launch is ${Math.round(raw.candidateHydrography.nearestWaterbodyFeet ?? 0)} ft from the named ${raw.candidateHydrography.nearestWaterbodyName ?? 'waterbody'} boundary.`, 'hydrography', raw.sourceUrl);
      }
      if (officialWaterbodyAgrees
        && raw.officialAccessAgreement.distanceFeet <= 250
        && (raw.routeGeometryDistanceFeet ?? Infinity) <= 300) {
        add('mapped-launch-official-waterway-convergence', 25, `The mapped launch, named official access, official waterbody, and local route trace converge within 300 ft.`, 'hydrography', raw.officialAccessAgreement.sourceUrl);
      }
    }
  } else if (raw.kind === 'authoritative-water-entry' && raw.authoritativeWaterEntry) {
    const official = raw.authoritativeWaterEntry;
    const officialWaterbodyAgrees = namesAgree(endpoint.routeName, official.waterbody)
      || namesAgree(endpoint.matchedRiverName, official.waterbody);
    const officialAccessNameAgrees = accessNamesAgree(endpoint.endpointName, raw.name);
    const terminalAlternate = official.terminalAlternateWaterbody;
    const connectedWaterTrailWaterbody = terminalAlternate?.relationship === 'connected-water-trail-waterbody';
    const terminalAlternateWaterbodyVerified = official.sourceType === 'official-site-map-derived'
      && canVerifyOfficialTerminalAlternateWaterbodyRamp({
        terminalEndpoint: endpoint.endpoint !== 'accessPoint',
        terminalAlternateWaterbodyDeclared: Boolean(terminalAlternate),
        relationship: terminalAlternate?.relationship,
        relationshipSourceUrl: terminalAlternate?.sourceUrl,
        directQueryVerified: raw.candidateHydrography?.directQueryVerified === true,
        flowlineEvidenceSource: raw.candidateHydrography?.flowlineEvidenceSource,
        waterbodyEvidenceSource: raw.candidateHydrography?.waterbodyEvidenceSource,
        mode: raw.candidateHydrography?.mode,
        nearestIntendedFlowlineFeet: raw.candidateHydrography?.nearestIntendedFlowlineFeet,
        nearestWaterbodyFeet: raw.candidateHydrography?.nearestWaterbodyFeet,
        candidateToRouteFlowlineFeet: raw.candidateHydrography?.candidateToRouteFlowlineFeet,
        routeToIntendedFlowlineJunctionFeet: raw.candidateHydrography?.routeToIntendedFlowlineJunctionFeet,
        maximumConnectionDistanceFeet: terminalAlternate?.maximumConnectionDistanceFeet
          ?? terminalAlternate?.maximumDownstreamDistanceFeet,
        routeGeometryReliable: raw.routeGeometryReliable,
        routeGeometryDistanceFeet: raw.routeGeometryDistanceFeet,
        uncertaintyFeet: official.uncertaintyFeet,
        ambiguousOfficialCandidates: raw.candidateHydrography?.ambiguousOfficialCandidates,
        exactAccessNameAgreement: officialAccessNameAgrees,
        routeWaterbodyAgreement: Boolean(terminalAlternate
          && namesAgree(endpoint.routeName, terminalAlternate.routeWaterbody)),
        terminalWaterbodyAgreement: Boolean(official.waterbody
          && (connectedWaterTrailWaterbody
            ? raw.candidateHydrography?.nearestWaterbodyName
              && namesAgree(official.waterbody, raw.candidateHydrography.nearestWaterbodyName)
            : raw.candidateHydrography?.nearestIntendedFlowlineName
              && namesAgree(official.waterbody, raw.candidateHydrography.nearestIntendedFlowlineName))),
        occurrenceRouteCount: official.occurrenceRouteCount,
      });
    const officialSiteMapRampVerified = official.sourceType === 'official-site-map-derived'
      && canVerifyOfficialSiteMapDerivedRamp({
        terminalEndpoint: endpoint.endpoint !== 'accessPoint',
        directQueryVerified: raw.candidateHydrography?.directQueryVerified === true,
        flowlineEvidenceSource: raw.candidateHydrography?.flowlineEvidenceSource,
        waterbodyEvidenceSource: raw.candidateHydrography?.waterbodyEvidenceSource,
        mode: raw.candidateHydrography?.mode,
        nearestIntendedFlowlineFeet: raw.candidateHydrography?.nearestIntendedFlowlineFeet,
        nearestWaterbodyFeet: raw.candidateHydrography?.nearestWaterbodyFeet,
        routeGeometryDistanceFeet: raw.routeGeometryDistanceFeet,
        uncertaintyFeet: official.uncertaintyFeet,
        ambiguousOfficialCandidates: raw.candidateHydrography?.ambiguousOfficialCandidates,
        exactAccessNameAgreement: officialAccessNameAgrees,
        namedOfficialWaterbodyAgreement: officialWaterbodyAgrees,
      });
    if (hasFreshCandidateHydrography(raw)) {
      add('candidate-specific-nhd-query', 0, 'Hydrography was independently queried around this proposed coordinate rather than inherited from the old route endpoint.', 'hydrography');
    }
    const officialSourceDescription = official.sourceType === 'official-coordinate-table'
      ? 'an authoritative published access table'
      : official.sourceType === 'official-site-map-derived'
        ? 'an official site map georeferenced to the uniquely shaped launch ramp'
        : 'an authoritative geospatial map';
    add('official-named-water-entry', 55, `${raw.name ?? 'This access'} is a named water-entry point in ${officialSourceDescription}.`, 'authoritative', raw.sourceUrl);
    if (officialAccessNameAgrees) add('access-name-agreement', 25, `${raw.name} agrees with the endpoint name.`, 'semantic');
    else add('official-access-name-conflict', -60, `${raw.name ?? 'The official point'} does not agree with ${endpoint.endpointName}.`, 'conflict');
    if (officialWaterbodyAgrees) {
      add('official-waterbody-agreement', 20, `${official.waterbody} agrees with the route and matched waterway.`, 'semantic');
    } else if (terminalAlternateWaterbodyVerified) {
      const tributaryStop = terminalAlternate!.relationship === 'tributary-before-confluence';
      add('official-terminal-alternate-waterbody', 20, connectedWaterTrailWaterbody
        ? `${official.waterbody} is the documented terminal lake or channel on the official ${terminalAlternate!.routeWaterbody} water trail.`
        : tributaryStop
          ? `${official.waterbody} is the documented tributary stop reached from ${terminalAlternate!.routeWaterbody} at their confluence.`
          : `${official.waterbody} is the documented receiving river for this terminal access after the route leaves ${terminalAlternate!.routeWaterbody} at their confluence.`, 'semantic', terminalAlternate!.sourceUrl);
      if (connectedWaterTrailWaterbody) {
        add('official-terminal-connected-waterbody-topology', 30, `A fresh candidate-centered NHD query places the landing on named ${official.waterbody} water and finds the ${terminalAlternate!.routeWaterbody} flowline within ${Math.round(raw.candidateHydrography?.candidateToRouteFlowlineFeet ?? 0)} ft, inside the official map's declared terminal extension.`, 'hydrography', terminalAlternate!.sourceUrl);
      } else {
        add('official-terminal-confluence-topology', 30, `Fresh NHD topology joins ${terminalAlternate!.routeWaterbody} to ${official.waterbody} within ${Math.round(raw.candidateHydrography?.routeToIntendedFlowlineJunctionFeet ?? 0)} ft; the mapped entry is ${Math.round(raw.candidateHydrography?.candidateToRouteFlowlineFeet ?? 0)} ft ${tributaryStop ? 'up the documented tributary' : 'downstream on the receiving river'}.`, 'hydrography', terminalAlternate!.sourceUrl);
      }
    } else {
      add('official-waterbody-conflict', -60, `${official.waterbody ?? 'The official waterbody'} does not agree with ${endpoint.routeName}.`, 'conflict');
    }
    const uncertaintyKind = official.sourceType === 'official-site-map-derived' ? 'Map-derived coordinate' : 'Published-coordinate';
    if ((official.uncertaintyFeet ?? Infinity) <= 100) add('official-map-low-uncertainty', 10, `${uncertaintyKind} uncertainty is ${Math.round(official.uncertaintyFeet!)} ft.`, 'authoritative', raw.sourceUrl);
    else add('official-map-uncertainty', -30, `${uncertaintyKind} uncertainty is ${Math.round(official.uncertaintyFeet ?? Infinity)} ft.`, 'conflict', raw.sourceUrl);
    if ((official.matchedRiverDistanceFeet ?? Infinity) <= 150) add('official-point-on-intended-river', 20, `Official launch is ${Math.round(official.matchedRiverDistanceFeet!)} ft from the matched ${official.waterbody ?? 'waterway'} centerline.`, 'hydrography');
    else if (official.onNhdWaterbody) add('official-point-on-intended-waterbody', 20, `Official launch is on the intended ${official.waterbody ?? 'waterbody'} polygon; its ${Math.round(official.matchedRiverDistanceFeet ?? Infinity)} ft centerline offset is consistent with a bank point on wide water.`, 'hydrography');
    else if (officialSiteMapRampVerified || terminalAlternateWaterbodyVerified) add('official-site-map-ramp-near-intended-water', 20, `The map-derived ramp is ${Math.round(raw.candidateHydrography?.nearestIntendedFlowlineFeet ?? 0)} ft from the named flowline and ${Math.round(raw.candidateHydrography?.nearestWaterbodyFeet ?? 0)} ft from its freshly queried water polygon.`, 'hydrography', raw.sourceUrl);
    else add('official-point-away-from-intended-river', -50, `Official launch is ${Math.round(official.matchedRiverDistanceFeet ?? Infinity)} ft from the matched river centerline.`, 'conflict');
  } else if ((raw.kind === 'official-access-projected-water-entry'
    || raw.kind === 'official-access-matched-river-water-entry'
    || raw.kind === 'official-access-nhd-water-entry'
    || raw.kind === 'official-canonical-water-entry') && raw.officialAccessAgreement) {
    add('official-access-anchor', 45, `${raw.officialAccessAgreement.name ?? 'The official access'} independently identifies the named access location.`, 'authoritative', raw.officialAccessAgreement.sourceUrl);
    if (accessNamesAgree(endpoint.endpointName, raw.officialAccessAgreement.name)) add('access-name-agreement', 25, `${raw.officialAccessAgreement.name} agrees with the endpoint name.`, 'semantic');
    else add('official-access-name-conflict', -60, `${raw.officialAccessAgreement.name ?? 'The official access'} does not agree with ${endpoint.endpointName}.`, 'conflict');
    const officialWaterbodyAgreesWithRoute = Boolean(raw.officialAccessAgreement.waterbody
      && (namesAgree(endpoint.routeName, raw.officialAccessAgreement.waterbody) || namesAgree(endpoint.matchedRiverName, raw.officialAccessAgreement.waterbody)));
    const officialWaterbodyAgreesWithTerminal = Boolean(raw.officialAccessAgreement.waterbody
      && raw.candidateHydrography?.terminalNamedWaterbodyAgreement
      && endpoint.endpoint !== 'accessPoint'
      && namesAgree(endpoint.endpointName, raw.officialAccessAgreement.waterbody)
      && namesAgree(endpoint.reach, raw.officialAccessAgreement.waterbody));
    if (officialWaterbodyAgreesWithRoute) add('official-waterbody-agreement', 20, `${raw.officialAccessAgreement.waterbody} agrees with the route waterway.`, 'semantic');
    else if (officialWaterbodyAgreesWithTerminal) add('official-terminal-waterbody-agreement', 20, `${raw.officialAccessAgreement.waterbody} agrees with this terminal endpoint and the route reach.`, 'semantic');
    else if (raw.officialAccessAgreement.waterbody) add('official-waterbody-conflict', -60, `${raw.officialAccessAgreement.waterbody} does not agree with ${endpoint.routeName} or its terminal reach.`, 'conflict');
    if (raw.kind === 'official-access-nhd-water-entry' && raw.candidateHydrography) {
      if (hasFreshCandidateHydrography(raw)) {
        add('candidate-specific-nhd-query', 0, 'Hydrography was independently queried around this proposed coordinate rather than inherited from the old route endpoint.', 'hydrography');
      }
      if (raw.candidateHydrography.mode === 'on-waterbody') {
        add('official-access-on-intended-waterbody', 55, 'The official access coordinate is directly inside an NHD water polygon adjacent to the route\'s named flowline.', 'hydrography');
      } else if (raw.candidateHydrography.mode === 'projected-to-waterbody') {
        add('official-access-projected-to-intended-waterbody', 55, `Water entry is the nearest NHD water edge, ${Math.round(raw.candidateHydrography.nearestWaterbodyFeet ?? 0)} ft from the official access.`, 'hydrography');
      } else {
        add('official-access-projected-to-intended-flowline', 55, `Water entry is the nearest point on ${raw.candidateHydrography.nearestIntendedFlowlineName ?? 'the intended named flowline'}, ${Math.round(raw.candidateHydrography.nearestIntendedFlowlineFeet ?? 0)} ft from the official access.`, 'hydrography');
      }
      if (raw.candidateHydrography.ambiguousOfficialCandidates) {
        add('multiple-official-access-candidates', -80, `${raw.candidateHydrography.supportedOfficialCandidateCount} independently plausible official access coordinates match this endpoint; manual selection is required.`, 'conflict');
      }
      if (raw.candidateHydrography.nearbyMappedLaunchExists) {
        add('mapped-launch-preferred-over-generic-shoreline', -30, 'A nearby mapped physical launch agrees with the exact official access and is more specific than this generic shoreline projection.', 'conflict');
      }
    } else if (raw.kind === 'official-canonical-water-entry') {
      add('shared-water-entry', 45, `Multiple routes agree on this canonical water-entry coordinate for ${endpoint.endpointName}.`, 'shared-access');
      add('multi-route-consensus', 20, `${registry?.routeCount ?? 0} routes reference this named access.`, 'shared-access');
      if (hasAuditConfirmedSharedWaterEntry(registry)) {
        add('shared-water-entry-audit-confirmed', 55, registry?.waterEntryExactOnRiver
          ? 'At least two related routes agree on this canonical water entry, including an audit within 100 ft of the intended named river.'
          : 'At least two related routes agree on this canonical bank entry and the audit confirms it lies on the intended NHD waterbody.', 'hydrography');
      }
    } else if (raw.kind === 'official-access-matched-river-water-entry') {
      add('projected-to-named-matched-river', 55, 'Water-entry coordinate is the audited nearest point on the NHD flowline whose name agrees with the route.', 'hydrography');
    } else {
      add('projected-to-reliable-route', 55, 'Water-entry coordinate is the nearest point on a route trace whose endpoints pass the topology/snap reliability gate.', 'hydrography');
    }
    if (raw.officialAccessAgreement.distanceFeet <= 250) add('official-access-near-water-entry', 20, `Official access anchor is ${Math.round(raw.officialAccessAgreement.distanceFeet)} ft from this projected water entry.`, 'authoritative', raw.officialAccessAgreement.sourceUrl);
    else if (raw.officialAccessAgreement.distanceFeet <= 500) add('official-access-near-water-entry', 10, `Official access anchor is ${Math.round(raw.officialAccessAgreement.distanceFeet)} ft from this projected water entry.`, 'authoritative', raw.officialAccessAgreement.sourceUrl);
    else add('official-access-away-from-water-entry', -50, `Official access anchor is ${Math.round(raw.officialAccessAgreement.distanceFeet)} ft from this projected water entry.`, 'conflict', raw.officialAccessAgreement.sourceUrl);
  } else if (raw.kind === 'osm-road-bridge') {
    add('mapped-road-bridge', 10, 'A mapped road bridge can help locate a carry-in, but does not prove legal launch access.', 'openstreetmap', raw.sourceUrl);
    if (/\b(?:bridge|highway|road|street|avenue|drive|county)\b/i.test(endpoint.endpointName) && namesAgree(endpoint.endpointName, raw.name)) {
      add('bridge-name-agreement', 20, `${raw.name} agrees with the named bridge or road endpoint.`, 'semantic');
    }
  }
  if (raw.distanceFeet !== null) {
    if (raw.distanceFeet <= 300) add('small-move', 10, `Candidate is ${Math.round(raw.distanceFeet)} ft from the stored coordinate.`, 'proximity');
    else if (raw.distanceFeet <= 800) add('moderate-move', 5, `Candidate is ${Math.round(raw.distanceFeet)} ft from the stored coordinate.`, 'proximity');
    else add('large-move', 0, `Candidate requires moving ${Math.round(raw.distanceFeet)} ft; proximity does not increase confidence.`, 'proximity');
  }
  if (raw.routeGeometryDistanceFeet !== null && raw.routeGeometryDistanceFeet !== undefined) {
    if (raw.routeGeometryReliable
      && raw.kind.startsWith('osm-')
      && raw.kind !== 'osm-road-bridge'
      && raw.routeGeometryDistanceFeet <= 500) {
      add('mapped-launch-near-reliable-route', 25, `Mapped launch is within ${Math.round(raw.routeGeometryDistanceFeet)} ft of a route trace that passes the endpoint topology/snap reliability gate.`, 'hydrography');
    }
    if (raw.routeGeometryDistanceFeet <= 150) add('active-route-agreement', 20, `Candidate is within ${Math.round(raw.routeGeometryDistanceFeet)} ft of the route's canonical river geometry.`, 'hydrography');
    else if (raw.routeGeometryDistanceFeet <= 300) add('active-route-nearby', 15, `Candidate is within ${Math.round(raw.routeGeometryDistanceFeet)} ft of the route's canonical river geometry.`, 'hydrography');
    else if (raw.kind === 'official-access-nhd-water-entry'
      && raw.routeGeometryDistanceFeet <= directNhdRouteGeometryLimitFeet({
        mode: raw.candidateHydrography?.mode,
        nearestIntendedFlowlineFeet: raw.candidateHydrography?.nearestIntendedFlowlineFeet,
        nearestWaterbodyFeet: raw.candidateHydrography?.nearestWaterbodyFeet,
        onNhdWaterbody: raw.candidateHydrography?.mode === 'on-waterbody',
        terminalEndpoint: endpoint.endpoint !== 'accessPoint',
      })) {
      add('active-route-bank-agreement', 15, `Verified NHD bank entry is within ${Math.round(raw.routeGeometryDistanceFeet)} ft of the route centerline, consistent with a broad river.`, 'hydrography');
    }
    else if (raw.kind === 'official-access-nhd-water-entry'
      && canOfficialWaterbodyRecoverUnreliableTerminalGeometry({
        mode: raw.candidateHydrography?.mode,
        nearestIntendedFlowlineFeet: raw.candidateHydrography?.nearestIntendedFlowlineFeet,
        nearestWaterbodyFeet: raw.candidateHydrography?.nearestWaterbodyFeet,
        onNhdWaterbody: raw.candidateHydrography?.mode === 'on-waterbody',
        terminalEndpoint: endpoint.endpoint !== 'accessPoint',
        routeGeometryDistanceFeet: raw.routeGeometryDistanceFeet,
        routeGeometryReliable: raw.routeGeometryReliable,
        officialAnchorToWaterEntryFeet: raw.officialAccessAgreement?.distanceFeet,
        ambiguousOfficialCandidates: raw.candidateHydrography?.ambiguousOfficialCandidates,
      })) {
      add('official-terminal-waterbody-overrides-unreliable-route-geometry', 20, `The cached route trace is unreliable, while the exact named official terminal access is directly on the intended waterbody and within 100 ft of its named flowline.`, 'hydrography', raw.sourceUrl);
    }
    else if (raw.kind === 'official-access-nhd-water-entry'
      && canRecoverNamedTerminalWaterbody({
        terminalEndpoint: endpoint.endpoint !== 'accessPoint',
        exactOfficialNameMatch: raw.candidateHydrography?.exactOfficialNameMatch === true,
        terminalNamedWaterbodyAgreement: raw.candidateHydrography?.terminalNamedWaterbodyAgreement === true,
        mode: raw.candidateHydrography?.mode,
        nearestIntendedFlowlineFeet: raw.candidateHydrography?.nearestIntendedFlowlineFeet,
        nearestWaterbodyFeet: raw.candidateHydrography?.nearestWaterbodyFeet,
        officialAnchorToWaterEntryFeet: raw.officialAccessAgreement?.distanceFeet,
        candidateMoveFeet: raw.distanceFeet,
        routeGeometryDistanceFeet: raw.routeGeometryDistanceFeet,
        routeGeometryReliable: raw.routeGeometryReliable,
        ambiguousOfficialCandidates: raw.candidateHydrography?.ambiguousOfficialCandidates,
      })) {
      add('official-terminal-named-waterbody-overrides-river-only-geometry', 20, `The exact official terminal access is ${Math.round(raw.officialAccessAgreement?.distanceFeet ?? 0)} ft from the named ${raw.candidateHydrography?.nearestWaterbodyName ?? 'waterbody'} shoreline; the river-only trace begins at its outlet.`, 'hydrography', raw.sourceUrl);
    }
    else if (raw.kind.startsWith('osm-')
      && raw.kind !== 'osm-road-bridge'
      && canRecoverMappedNamedTerminalWaterbody({
        terminalEndpoint: endpoint.endpoint !== 'accessPoint',
        mappedLaunch: true,
        exactOfficialNameMatch: raw.candidateHydrography?.exactOfficialNameMatch === true,
        terminalNamedWaterbodyAgreement: raw.candidateHydrography?.terminalNamedWaterbodyAgreement === true,
        nearestIntendedFlowlineFeet: raw.candidateHydrography?.nearestIntendedFlowlineFeet,
        nearestWaterbodyFeet: raw.candidateHydrography?.nearestWaterbodyFeet,
        officialAnchorToMappedLaunchFeet: raw.officialAccessAgreement?.distanceFeet,
        candidateMoveFeet: raw.distanceFeet,
        routeGeometryDistanceFeet: raw.routeGeometryDistanceFeet,
        routeGeometryReliable: raw.routeGeometryReliable,
        ambiguousOfficialCandidates: raw.candidateHydrography?.ambiguousOfficialCandidates,
      })) {
      add('official-terminal-mapped-launch-overrides-river-only-geometry', 20, `The exact official terminal access, mapped launch, and named ${raw.candidateHydrography?.nearestWaterbodyName ?? 'waterbody'} agree; the river-only trace begins at the lake outlet.`, 'hydrography', raw.sourceUrl);
    }
    else if (raw.routeGeometryDistanceFeet <= 500 && raw.kind.startsWith('osm-') && raw.kind !== 'osm-road-bridge') add('active-route-bank-agreement', 15, `Mapped launch is within ${Math.round(raw.routeGeometryDistanceFeet)} ft of the canonical centerline, consistent with a bank location on a wide river.`, 'hydrography');
    else if (canRecoverSharedRouteGeometry(registry, raw.routeGeometryDistanceFeet)
      && raw.kind === 'official-canonical-water-entry'
    ) {
      add('shared-route-geometry-recovery', 20, 'This route trace misses the verified shared bank entry; multiple related route audits and the named official access agree on the water-entry coordinate.', 'shared-access', raw.sourceUrl);
    }
    else if (raw.routeGeometryDistanceFeet > 1000
      && raw.kind === 'authoritative-water-entry'
      && (raw.authoritativeWaterEntry?.occurrenceRouteCount ?? 0) >= 2
      && (raw.authoritativeWaterEntry?.geometryConsensusRouteCount ?? 0) >= 1) {
      add('shared-route-geometry-recovery', 20, `This route's cached geometry misses the official launch, but ${raw.authoritativeWaterEntry!.geometryConsensusRouteCount} related route(s) using the same official access agree within 150 ft. Regenerate geometry after propagation.`, 'shared-access', raw.sourceUrl);
    } else if (raw.routeGeometryDistanceFeet > 1000) add('active-route-disagreement', -20, `Candidate is ${Math.round(raw.routeGeometryDistanceFeet)} ft from the route's canonical river geometry.`, 'conflict');
  }
  if (endpoint.endpoint === 'accessPoint' && raw.routeAxisFraction !== null && raw.routeAxisFraction !== undefined) {
    if (raw.routeAxisFraction >= -0.2 && raw.routeAxisFraction <= 1.2) add('route-order-plausible', 5, `Intermediate access projects within the put-in/take-out corridor (fraction ${raw.routeAxisFraction.toFixed(2)}).`, 'hydrography');
    else add('route-order-conflict', -60, `Intermediate access projects outside the put-in/take-out corridor (fraction ${raw.routeAxisFraction.toFixed(2)}).`, 'conflict');
  }
  if (registry?.coordinateStatus === 'conflict') {
    if (raw.kind === 'authoritative-water-entry'
      || raw.kind === 'official-access-projected-water-entry'
      || raw.kind === 'official-access-matched-river-water-entry'
      || raw.kind === 'official-access-nhd-water-entry'
      || raw.kind === 'official-canonical-water-entry') {
      add('authoritative-resolves-shared-conflict', 0, `Stored routes disagree by as much as ${registry.maximumSeparationFeet} ft; this independently named official access can resolve the conflict for failing occurrences.`, 'authoritative', raw.sourceUrl);
    } else {
      add('shared-coordinate-conflict', -80, `Other routes using this access disagree by as much as ${registry.maximumSeparationFeet} ft.`, 'conflict');
    }
  } else if (registry?.waterEntryCoordinate && raw.kind !== 'shared-water-entry' && raw.kind !== 'authoritative-water-entry') {
    const agreementFeet = distanceFeet(raw, registry.waterEntryCoordinate);
    if (agreementFeet <= 150) add('canonical-water-entry-agreement', 25, `Candidate is within ${Math.round(agreementFeet)} ft of the shared water-entry consensus.`, 'shared-access');
    else if (canAuthoritativeCandidateSupersedeSharedEntry(registry, agreementFeet)
      && (raw.kind === 'official-access-nhd-water-entry'
        || raw.kind === 'official-access-projected-water-entry'
        || raw.kind === 'official-access-matched-river-water-entry')) {
      add('authoritative-supersedes-unverified-consensus', 10, `The repeated stored coordinate is ${Math.round(agreementFeet)} ft away but lacks direct river or waterbody confirmation; the exact named official access and local hydrography take precedence.`, 'authoritative', raw.sourceUrl);
    }
    else if (agreementFeet > 800) add('canonical-water-entry-disagreement', -20, `Candidate is ${Math.round(agreementFeet)} ft from the shared water-entry consensus.`, 'conflict');
  }
  const freshWideRiverBank = canVerifyFreshWideRiverBank({
    directQueryVerified: raw.candidateHydrography?.directQueryVerified === true,
    flowlineEvidenceSource: raw.candidateHydrography?.flowlineEvidenceSource,
    waterbodyEvidenceSource: raw.candidateHydrography?.waterbodyEvidenceSource,
    mode: raw.candidateHydrography?.mode,
    nearestIntendedFlowlineFeet: raw.candidateHydrography?.nearestIntendedFlowlineFeet,
    nearestWaterbodyFeet: raw.candidateHydrography?.nearestWaterbodyFeet,
    routeGeometryDistanceFeet: raw.routeGeometryDistanceFeet,
    ambiguousOfficialCandidates: raw.candidateHydrography?.ambiguousOfficialCandidates,
    exactOfficialNameMatch: raw.candidateHydrography?.exactOfficialNameMatch === true,
    namedOfficialWaterbodyAgreement: Boolean(raw.officialAccessAgreement?.waterbody
      && (namesAgree(endpoint.routeName, raw.officialAccessAgreement.waterbody)
        || namesAgree(endpoint.matchedRiverName, raw.officialAccessAgreement.waterbody))),
  });
  if (freshWideRiverBank) {
    const activeRouteConflict = evidence.findIndex((item) => item.signal === 'active-route-disagreement');
    if (activeRouteConflict >= 0) evidence.splice(activeRouteConflict, 1);
    add('fresh-wide-river-bank-agreement', 20, 'The exact official access projects to the freshly queried river polygon; the larger centerline offset is consistent with this broad named river.', 'hydrography', raw.sourceUrl);
  }
  if (evidence.some((item) => item.signal === 'official-terminal-confluence-topology')) {
    const activeRouteConflict = evidence.findIndex((item) => item.signal === 'active-route-disagreement');
    if (activeRouteConflict >= 0) evidence.splice(activeRouteConflict, 1);
    add('official-terminal-alternate-waterbody-overrides-route-geometry', 20, 'The existing single-river trace stops at the confluence; verified connected-waterway topology and the official terminal map supersede that incomplete geometry.', 'hydrography', raw.sourceUrl);
  }
  const assessment = assessCandidateConfidence(evidence);
  const independentPositiveSources = new Set(evidence.filter((item) => item.effect > 0).map((item) => item.source));
  const verifiedSharedGeometryRecovery = raw.kind === 'official-canonical-water-entry'
    && registry?.coordinateStatus === 'conflict'
    && hasAuditConfirmedSharedWaterEntry(registry)
    && evidence.some((item) => item.signal === 'shared-water-entry-audit-confirmed')
    && evidence.some((item) => item.signal === 'official-access-anchor');
  const hasConflict = evidence.some((item) => item.effect < 0
    && item.source === 'conflict'
    && !(verifiedSharedGeometryRecovery && item.signal === 'active-route-disagreement'));
  const independentlyVerifiedAccess = independentPositiveSources.has('openstreetmap') || independentPositiveSources.has('authoritative');
  const autoApplyEligible = (raw.kind.startsWith('osm-')
      && raw.kind !== 'osm-road-bridge'
      && assessment.waterScore >= 85
      && assessment.accessScore >= 85
      && independentPositiveSources.has('openstreetmap')
      && independentPositiveSources.has('hydrography')
      && evidence.some((item) => item.signal === 'candidate-specific-nhd-query')
      && (evidence.some((item) => item.signal === 'access-name-agreement')
        || ((raw.osmConsensusRouteCount ?? 0) >= 2 && (registry?.routeCount ?? 0) >= 2)
        || evidence.some((item) => item.signal === 'authoritative-access-agreement'))
      && !hasConflict)
    || (raw.kind === 'authoritative-water-entry'
      && assessment.waterScore >= 85
      && assessment.accessScore >= 85
      && raw.authoritativeWaterEntry?.coordinateRole === 'authoritative-water-entry'
      && (raw.authoritativeWaterEntry?.sourceType === 'official-geospatial-map'
        || raw.authoritativeWaterEntry?.sourceType === 'official-coordinate-table'
        || raw.authoritativeWaterEntry?.sourceType === 'official-site-map-derived')
      && (raw.authoritativeWaterEntry?.uncertaintyFeet ?? Infinity) <= 150
      && ((raw.authoritativeWaterEntry?.matchedRiverDistanceFeet ?? Infinity) <= 150
        || raw.authoritativeWaterEntry?.onNhdWaterbody === true
        || evidence.some((item) => item.signal === 'official-site-map-ramp-near-intended-water'))
      && ((raw.routeGeometryDistanceFeet ?? Infinity) <= (raw.authoritativeWaterEntry?.onNhdWaterbody
        ? 800
        : evidence.some((item) => item.signal === 'official-site-map-ramp-near-intended-water') ? 250 : 150)
        || ((raw.authoritativeWaterEntry?.occurrenceRouteCount ?? 0) >= 2
          && (raw.authoritativeWaterEntry?.geometryConsensusRouteCount ?? 0) >= 1
          && evidence.some((item) => item.signal === 'shared-route-geometry-recovery'))
        || evidence.some((item) => item.signal === 'official-terminal-confluence-topology')
        || evidence.some((item) => item.signal === 'official-terminal-connected-waterbody-topology'))
      && evidence.some((item) => item.signal === 'access-name-agreement')
      && (evidence.some((item) => item.signal === 'official-waterbody-agreement')
        || evidence.some((item) => item.signal === 'official-terminal-alternate-waterbody'))
      && evidence.some((item) => item.signal === 'candidate-specific-nhd-query')
      && independentPositiveSources.has('authoritative')
      && independentPositiveSources.has('hydrography')
      && !hasConflict)
    || (raw.kind === 'official-access-projected-water-entry'
      && assessment.waterScore >= 85
      && assessment.accessScore >= 85
      && (raw.officialAccessAgreement?.distanceFeet ?? Infinity) <= 250
      && evidence.some((item) => item.signal === 'access-name-agreement')
      && evidence.some((item) => item.signal === 'projected-to-reliable-route')
      && independentPositiveSources.has('authoritative')
      && independentPositiveSources.has('hydrography')
      && !hasConflict)
    || (raw.kind === 'official-access-matched-river-water-entry'
      && assessment.waterScore >= 85
      && assessment.accessScore >= 85
      && (raw.officialAccessAgreement?.distanceFeet ?? Infinity) <= (raw.officialAccessAgreement?.waterbody
        ? officialNamedWaterbodyProjectionMaxFeet
        : officialMatchedRiverProjectionMaxFeet)
      && (raw.routeGeometryDistanceFeet ?? Infinity) <= 150
      && evidence.some((item) => item.signal === 'access-name-agreement')
      && evidence.some((item) => item.signal === 'projected-to-named-matched-river')
      && (endpoint.endpoint !== 'accessPoint' || evidence.some((item) => item.signal === 'route-order-plausible'))
      && independentPositiveSources.has('authoritative')
      && independentPositiveSources.has('hydrography')
      && !hasConflict)
    || (raw.kind === 'official-access-nhd-water-entry'
      && assessment.waterScore >= 85
      && assessment.accessScore >= 85
      && raw.candidateHydrography?.ambiguousOfficialCandidates === false
      && evidence.some((item) => item.signal === 'candidate-specific-nhd-query')
      && (Boolean((raw.candidateHydrography?.nearestIntendedFlowlineFeet ?? Infinity) <= 800
          && raw.candidateHydrography?.nearestIntendedFlowlineName
          && (namesAgree(endpoint.routeName, raw.candidateHydrography.nearestIntendedFlowlineName)
            || namesAgree(endpoint.matchedRiverName, raw.candidateHydrography.nearestIntendedFlowlineName)))
        || freshWideRiverBank
        || evidence.some((item) => item.signal === 'official-terminal-waterbody-agreement'))
      && ((raw.routeGeometryDistanceFeet ?? Infinity) <= directNhdRouteGeometryLimitFeet({
          mode: raw.candidateHydrography?.mode,
          nearestIntendedFlowlineFeet: raw.candidateHydrography?.nearestIntendedFlowlineFeet,
          nearestWaterbodyFeet: raw.candidateHydrography?.nearestWaterbodyFeet,
          onNhdWaterbody: raw.candidateHydrography?.mode === 'on-waterbody',
          terminalEndpoint: endpoint.endpoint !== 'accessPoint',
        })
        || freshWideRiverBank
        || evidence.some((item) => item.signal === 'official-terminal-waterbody-overrides-unreliable-route-geometry')
        || evidence.some((item) => item.signal === 'official-terminal-named-waterbody-overrides-river-only-geometry'))
      && evidence.some((item) => item.signal === 'access-name-agreement')
      && (evidence.some((item) => item.signal === 'official-waterbody-agreement')
        || evidence.some((item) => item.signal === 'official-terminal-waterbody-agreement'))
      && (endpoint.endpoint !== 'accessPoint' || evidence.some((item) => item.signal === 'route-order-plausible'))
      && independentPositiveSources.has('authoritative')
      && independentPositiveSources.has('hydrography')
      && !hasConflict)
    || (raw.kind === 'official-canonical-water-entry'
      && assessment.waterScore >= 85
      && assessment.accessScore >= 85
      && (raw.officialAccessAgreement?.distanceFeet ?? Infinity) <= 250
      && (registry?.routeCount ?? 0) >= 2
      && (registry?.waterEntryConsensusRouteCount ?? 0) >= 1
      && hasAuditConfirmedSharedWaterEntry(registry)
      && evidence.some((item) => item.signal === 'access-name-agreement')
      && evidence.some((item) => item.signal === 'shared-water-entry')
      && independentPositiveSources.has('authoritative')
      && independentPositiveSources.has('hydrography')
      && independentPositiveSources.has('shared-access')
      && !hasConflict);
  const verifiedSharedPropagation = endpoint.severity !== 'failure'
    && registry?.coordinateStatus === 'conflict'
    && raw.kind === 'official-canonical-water-entry'
    && hasAuditConfirmedSharedWaterEntry(registry)
    && raw.distanceFeet !== null
    && raw.distanceFeet > 150
    && evidence.some((item) => item.signal === 'shared-water-entry-audit-confirmed')
    && evidence.some((item) => item.signal === 'official-access-anchor');
  const candidateDistanceFromShared = registry?.waterEntryCoordinate ? distanceFeet(raw, registry.waterEntryCoordinate) : null;
  const verifiedOfficialConsensusReplacement = endpoint.severity !== 'failure'
    && raw.kind === 'official-access-nhd-water-entry'
    && canAuthoritativeCandidateSupersedeSharedEntry(registry, candidateDistanceFromShared)
    && raw.candidateHydrography?.ambiguousOfficialCandidates === false
    && evidence.some((item) => item.signal === 'authoritative-supersedes-unverified-consensus')
    && evidence.some((item) => item.signal === 'access-name-agreement')
    && evidence.some((item) => item.signal === 'official-waterbody-agreement')
    && (endpoint.endpoint !== 'accessPoint' || evidence.some((item) => item.signal === 'route-order-plausible'));
  return {
    ...raw,
    ...assessment,
    evidence,
    // Conflict-only review coordinates normally remain untouched. The sole
    // exception is propagation of an exact, audit-confirmed shared water entry
    // corroborated by the same named official access.
    autoApplyEligible: autoApplyEligible
      && independentlyVerifiedAccess
      && (endpoint.severity === 'failure' || verifiedSharedPropagation || verifiedOfficialConsensusReplacement),
  };
}

async function main() {
  const [report, registry] = await Promise.all([
    readFile(reportPath, 'utf8').then((value) => JSON.parse(value) as AuditReport),
    readFile(registryPath, 'utf8').then((value) => JSON.parse(value) as Registry),
  ]);
  let osmEvidence: OsmEvidence = {};
  try { osmEvidence = JSON.parse(await readFile(osmEvidencePath, 'utf8')) as OsmEvidence; } catch { /* optional evidence */ }
  let authoritativeEvidence: AuthoritativeEvidence = {};
  try { authoritativeEvidence = JSON.parse(await readFile(authoritativeEvidencePath, 'utf8')) as AuthoritativeEvidence; } catch { /* optional evidence */ }
  let candidateHydrographyEvidence: CandidateHydrographyEvidence = {};
  try { candidateHydrographyEvidence = JSON.parse(await readFile(candidateHydrographyPath, 'utf8')) as CandidateHydrographyEvidence; } catch { /* optional evidence */ }
  let autoValidation: AutoValidation = {};
  try { autoValidation = JSON.parse(await readFile(autoValidationPath, 'utf8')) as AutoValidation; } catch { /* optional validation */ }
  const passedValidationByEndpoint = new Map((autoValidation.results ?? [])
    .filter((result) => result.passed)
    .map((result) => [`${result.routeId}:${result.endpoint}:${result.endpointName}`, result]));
  const osmByEndpoint = new Map((osmEvidence.items ?? []).map((item) => [`${item.routeId}:${item.endpoint}:${item.endpointName}`, item.features]));
  const auditEndpointByKey = new Map(report.endpoints.map((endpoint) => [`${endpoint.routeId}:${endpoint.endpoint}:${endpoint.endpointName}`, endpoint]));
  const osmByAccess = new Map<string, NonNullable<OsmEvidence['items']>[number]['features']>();
  for (const item of osmEvidence.items ?? []) {
    const auditEndpoint = auditEndpointByKey.get(`${item.routeId}:${item.endpoint}:${item.endpointName}`);
    if (!auditEndpoint) continue;
    const accessKey = `${normalize(auditEndpoint.state)}:${normalize(item.endpointName)}`;
    const existing = osmByAccess.get(accessKey) ?? [];
    const unique = new Map([...existing, ...item.features].map((feature) => [feature.url, feature]));
    osmByAccess.set(accessKey, [...unique.values()]);
  }
  const authoritativeByEndpoint = new Map<string, NonNullable<AuthoritativeEvidence['items']>[number]['candidates']>();
  for (const item of authoritativeEvidence.items ?? []) {
    const key = `${item.routeId}:${item.endpoint}:${item.endpointName}`;
    const candidates = authoritativeByEndpoint.get(key) ?? [];
    const unique = new Map([...candidates, ...item.candidates].map((candidate) => [`${candidate.provider}:${candidate.featureId}`, candidate]));
    authoritativeByEndpoint.set(key, [...unique.values()]);
  }
  const candidateHydrographyByEndpoint = new Map((candidateHydrographyEvidence.items ?? [])
    .map((item) => [`${item.routeId}:${item.endpoint}:${item.endpointName}`, item.candidates]));
  const osmFeatureRoutes = new Map<string, Set<string>>();
  for (const item of osmEvidence.items ?? []) {
    for (const feature of item.features) {
      const key = `${feature.url}:${normalize(item.endpointName)}`;
      const routes = osmFeatureRoutes.get(key) ?? new Set<string>();
      routes.add(item.routeId);
      osmFeatureRoutes.set(key, routes);
    }
  }
  const registryByName = new Map(registry.entries.flatMap((entry) =>
    [...new Set([entry.name, ...(entry.aliases ?? [])])]
      .map((name) => [`${normalize(entry.state)}:${normalize(name)}`, entry] as const)));
  const routeById = new Map(rivers.map((route) => [route.id, route]));
  const routeIds = [...new Set(report.endpoints.map((endpoint) => endpoint.routeId))];
  const geometryByRoute = new Map<string, RouteGeometry | null>();
  await Promise.all(routeIds.map(async (routeId) => {
    try { geometryByRoute.set(routeId, JSON.parse(await readFile(path.join(reviewGeometryRoot, `${routeId}.json`), 'utf8')) as RouteGeometry); }
    catch { geometryByRoute.set(routeId, null); }
  }));
  const officialFeatureRoutes = new Map<string, Set<string>>();
  const officialFeatureGeometryRoutes = new Map<string, Set<string>>();
  for (const item of authoritativeEvidence.items ?? []) {
    for (const candidate of item.candidates.filter((value) => value.coordinateRole === 'authoritative-water-entry')) {
      const key = `${candidate.provider}:${candidate.featureId}`;
      const routes = officialFeatureRoutes.get(key) ?? new Set<string>();
      routes.add(item.routeId);
      officialFeatureRoutes.set(key, routes);
      const geometryDistance = distanceToRouteGeometry(candidate, geometryByRoute.get(item.routeId) ?? null);
      if (geometryDistance !== null && geometryDistance <= 150) {
        const geometryRoutes = officialFeatureGeometryRoutes.get(key) ?? new Set<string>();
        geometryRoutes.add(item.routeId);
        officialFeatureGeometryRoutes.set(key, geometryRoutes);
      }
    }
  }
  const items = report.endpoints
    .filter((endpoint) => {
      const passedValidation = passedValidationByEndpoint.get(`${endpoint.routeId}:${endpoint.endpoint}:${endpoint.endpointName}`);
      const registryEntry = registryByName.get(`${normalize(endpoint.state)}:${normalize(endpoint.endpointName)}`);
      // Once a correction still matches its post-audit validated coordinate,
      // it is resolved. Keeping it in the triage feed would unnecessarily
      // withhold the route and make the reviewer re-approve finished work.
      if (passedValidation
        && endpoint.coordinateEvidenceRole !== 'authoritative-area-anchor'
        && registryEntry?.verificationStatus !== 'authoritative-access-mismatch'
        && distanceFeet(endpoint, passedValidation) <= 1) return false;
      // A source coordinate that exactly matches the canonical named
      // government water-entry control is already resolved, even if a wide
      // river's NHD centerline or polygon keeps the generic audit at review.
      // Requiring it to remain in triage would invite reviewers to replace a
      // verified ramp edge with an inferior mid-river projection.
      if (registryEntry?.verificationStatus === 'authoritative-water-entry'
        && registryEntry.waterEntryCoordinate
        && distanceFeet(endpoint, registryEntry.waterEntryCoordinate) <= 1) return false;
      const endpointAuthoritativeCandidates = authoritativeByEndpoint.get(`${endpoint.routeId}:${endpoint.endpoint}:${endpoint.endpointName}`) ?? [];
      const directOfficialWaterEntry = endpointAuthoritativeCandidates
        .some((candidate) => candidate.coordinateRole === 'authoritative-water-entry'
          && accessFacilityIdentitiesAgree(endpoint.endpointName, candidate.name));
      const directNamedOfficialAccess = endpointAuthoritativeCandidates
        .some((candidate) => isAuthoritativeAccessAnchor(candidate)
          && accessNamesAgree(endpoint.endpointName, candidate.name)
          && authoritativeWaterbodyFitsEndpoint(endpoint, candidate));
      const nearestNamedOfficialDistanceFromShared = registryEntry?.waterEntryCoordinate
        ? Math.min(...endpointAuthoritativeCandidates
          .filter((candidate) => isAuthoritativeAccessAnchor(candidate)
            && accessNamesAgree(endpoint.endpointName, candidate.name)
            && authoritativeWaterbodyFitsEndpoint(endpoint, candidate))
          .map((candidate) => distanceFeet(candidate, registryEntry.waterEntryCoordinate!)))
        : null;
      const officialCanReplaceUnverifiedConsensus = directNamedOfficialAccess
        && registryEntry?.waterEntryCoordinate
        && canAuthoritativeCandidateSupersedeSharedEntry(
          registryEntry,
          nearestNamedOfficialDistanceFromShared,
        );
      return endpoint.severity === 'failure'
        || registryEntry?.coordinateStatus === 'conflict'
        || registryEntry?.verificationStatus === 'area-anchor-only'
        || registryEntry?.verificationStatus === 'authoritative-access-mismatch'
        || endpoint.coordinateEvidenceRole === 'authoritative-area-anchor'
        || (endpoint.severity !== 'ok' && (directOfficialWaterEntry || officialCanReplaceUnverifiedConsensus));
    })
    .map((endpoint) => {
      const registryEntry = registryByName.get(`${normalize(endpoint.state)}:${normalize(endpoint.endpointName)}`) ?? null;
      const directOsmFeatures = osmByEndpoint.get(`${endpoint.routeId}:${endpoint.endpoint}:${endpoint.endpointName}`) ?? [];
      const sharedOsmFeatures = osmByAccess.get(`${normalize(endpoint.state)}:${normalize(endpoint.endpointName)}`) ?? [];
      const osmFeatures = [...new Map([...directOsmFeatures, ...sharedOsmFeatures].map((feature) => [feature.url, feature])).values()];
      const authoritativeCandidates = authoritativeByEndpoint.get(`${endpoint.routeId}:${endpoint.endpoint}:${endpoint.endpointName}`) ?? [];
      const authoritativeIdentityCandidates = preferExactAccessNameMatches(endpoint.endpointName, authoritativeCandidates);
      const endpointCandidateHydrography = candidateHydrographyByEndpoint.get(`${endpoint.routeId}:${endpoint.endpoint}:${endpoint.endpointName}`) ?? [];
      const hydrographyByCandidateId = new Map(endpointCandidateHydrography.map((candidate) => [candidate.candidateId, candidate]));
      const routeGeometry = geometryByRoute.get(endpoint.routeId) ?? null;
      const namedOfficialAccessCandidates = authoritativeIdentityCandidates
        .filter(isAuthoritativeAccessAnchor)
        .filter((candidate) => accessNamesAgree(endpoint.endpointName, candidate.name))
        .filter((candidate) => authoritativeWaterbodyFitsEndpoint(endpoint, candidate));
      const supportedOfficialHydrography = namedOfficialAccessCandidates
        .flatMap((candidate) => {
          const hydrography = hydrographyByCandidateId.get(`official:${candidate.provider}:${candidate.featureId}`);
          if (!hydrography) return [];
          const strictOfficialNameMatch = normalizeAccessText(endpoint.endpointName) === normalizeAccessText(candidate.name);
          const terminalWaterbodySemantics = Boolean(endpoint.endpoint !== 'accessPoint'
            && hydrography.nearestWaterbodyName
            && namesAgree(endpoint.endpointName, hydrography.nearestWaterbodyName)
            && namesAgree(endpoint.reach, hydrography.nearestWaterbodyName));
          // An app label may append local context such as "(Lino Lakes)" to an
          // otherwise unique official facility. Treat that as a strong exact
          // identity only when the single official match and the terminal
          // named waterbody independently agree with both endpoint and reach.
          const exactOfficialNameMatch = strictOfficialNameMatch
            || (namedOfficialAccessCandidates.length === 1
              && accessNamesAgree(endpoint.endpointName, candidate.name)
              && terminalWaterbodySemantics);
          const namedFlowlineAgreement = Boolean(hydrography.nearestIntendedFlowlineName
            && (namesAgree(endpoint.routeName, hydrography.nearestIntendedFlowlineName)
              || namesAgree(endpoint.matchedRiverName, hydrography.nearestIntendedFlowlineName)));
          const freshWideRiverBankAgreement = Boolean(exactOfficialNameMatch
            && hydrography.directQueryVerified
            && hydrography.flowlineEvidenceSource === 'candidate-query'
            && hydrography.waterbodyEvidenceSource === 'candidate-query'
            && candidate.waterbody
            && (namesAgree(endpoint.routeName, candidate.waterbody) || namesAgree(endpoint.matchedRiverName, candidate.waterbody))
            && (hydrography.nearestWaterbodyFeet ?? Infinity) <= 150
            && (hydrography.nearestIntendedFlowlineFeet ?? Infinity) <= 1_500);
          const intendedFlowlineAgreement = Boolean(namedFlowlineAgreement
            && ((hydrography.nearestIntendedFlowlineFeet ?? Infinity) <= 800 || freshWideRiverBankAgreement));
          const terminalNamedWaterbodyAgreement = Boolean(exactOfficialNameMatch
            && terminalWaterbodySemantics
            && (hydrography.nearestWaterbodyFeet ?? Infinity) <= 250
            && (hydrography.nearestIntendedFlowlineFeet ?? Infinity) <= 2_500);
          if (!intendedFlowlineAgreement && !terminalNamedWaterbodyAgreement) return [];
          if (hydrography.onNhdWaterbody) {
            return [{ candidate, hydrography, waterEntry: { latitude: candidate.latitude, longitude: candidate.longitude }, mode: 'on-waterbody' as const, exactOfficialNameMatch, terminalNamedWaterbodyAgreement }];
          }
          const waterbodyProjectionLimit = terminalNamedWaterbodyAgreement ? 250 : 150;
          if ((hydrography.nearestWaterbodyFeet ?? Infinity) <= waterbodyProjectionLimit && hydrography.nearestWaterbodyCoordinate) {
            return [{ candidate, hydrography, waterEntry: hydrography.nearestWaterbodyCoordinate, mode: 'projected-to-waterbody' as const, exactOfficialNameMatch, terminalNamedWaterbodyAgreement }];
          }
          if ((hydrography.nearestIntendedFlowlineFeet ?? Infinity) <= officialMatchedRiverProjectionMaxFeet && hydrography.nearestIntendedFlowlineCoordinate) {
            return [{ candidate, hydrography, waterEntry: hydrography.nearestIntendedFlowlineCoordinate, mode: 'projected-to-flowline' as const, exactOfficialNameMatch, terminalNamedWaterbodyAgreement }];
          }
          return [];
        });
      const supportedOfficialWaterEntries = supportedOfficialHydrography.map((entry) => entry.waterEntry);
      const ambiguousOfficialHydrography = supportedOfficialWaterEntries.some((left, leftIndex) => supportedOfficialWaterEntries
        .some((right, rightIndex) => rightIndex > leftIndex && distanceFeet(left, right) > 300));
      const directOfficialHydrographyAccesses = supportedOfficialHydrography.map(({ candidate, hydrography, waterEntry, mode, exactOfficialNameMatch, terminalNamedWaterbodyAgreement }) => {
        const nearbyMappedLaunchExists = terminalNamedWaterbodyAgreement && osmFeatures.some((feature) => {
          if (!mappedLaunchKinds.has(feature.kind) || distanceFeet(candidate, feature) > 150 || distanceFeet(endpoint, feature) > 150) return false;
          const mappedHydrography = hydrographyByCandidateId.get(`mapped:${feature.url}`);
          return Boolean(mappedHydrography?.nearestWaterbodyName
            && namesAgree(endpoint.endpointName, mappedHydrography.nearestWaterbodyName)
            && namesAgree(endpoint.reach, mappedHydrography.nearestWaterbodyName)
            && (mappedHydrography.nearestWaterbodyFeet ?? Infinity) <= 200);
        });
        return baseCandidate(
          'official-access-nhd-water-entry',
          candidate.name,
          waterEntry.latitude,
          waterEntry.longitude,
          distanceFeet(endpoint, waterEntry),
          candidate.sourceUrl,
          hydrography.nearestIntendedFlowlineFeet,
          undefined,
          { name: candidate.name, waterbody: candidate.waterbody ?? (terminalNamedWaterbodyAgreement ? hydrography.nearestWaterbodyName : null), distanceFeet: distanceFeet(candidate, waterEntry), sourceUrl: candidate.sourceUrl },
          undefined,
          {
            candidateId: hydrography.candidateId,
            directQueryVerified: hydrography.directQueryVerified,
            flowlineEvidenceSource: hydrography.flowlineEvidenceSource,
            waterbodyEvidenceSource: hydrography.waterbodyEvidenceSource,
            mode,
            nearestIntendedFlowlineFeet: hydrography.nearestIntendedFlowlineFeet,
            nearestIntendedFlowlineName: hydrography.nearestIntendedFlowlineName,
            nearestWaterbodyFeet: hydrography.nearestWaterbodyFeet,
            nearestWaterbodyName: hydrography.nearestWaterbodyName,
            onNhdWaterbody: hydrography.onNhdWaterbody,
            ambiguousOfficialCandidates: ambiguousOfficialHydrography,
            supportedOfficialCandidateCount: supportedOfficialHydrography.length,
            exactOfficialNameMatch,
            terminalNamedWaterbodyAgreement,
            nearbyMappedLaunchExists,
          },
        );
      });
      const matchedOfficialAccesses = endpoint.nearestMatchedLatitude !== null
        && endpoint.nearestMatchedLongitude !== null
        && endpoint.matchedRiverName !== null
        && namesAgree(endpoint.routeName, endpoint.matchedRiverName)
        ? authoritativeIdentityCandidates
          .filter(isAuthoritativeAccessAnchor)
          .filter((candidate) => accessNamesAgree(endpoint.endpointName, candidate.name))
          .filter((candidate) => authoritativeWaterbodyFitsEndpoint(endpoint, candidate))
          .flatMap((candidate) => {
            const waterEntry = { latitude: endpoint.nearestMatchedLatitude!, longitude: endpoint.nearestMatchedLongitude! };
            const anchorDistance = distanceFeet(candidate, waterEntry);
            const projectionLimit = candidate.waterbody
              ? officialNamedWaterbodyProjectionMaxFeet
              : officialMatchedRiverProjectionMaxFeet;
            if (anchorDistance > projectionLimit) return [];
            return [baseCandidate(
              'official-access-matched-river-water-entry',
              candidate.name,
              waterEntry.latitude,
              waterEntry.longitude,
              distanceFeet(endpoint, waterEntry),
              candidate.sourceUrl,
              0,
              undefined,
              { name: candidate.name, waterbody: candidate.waterbody, distanceFeet: anchorDistance, sourceUrl: candidate.sourceUrl },
            )];
          })
        : [];
      const projectedOfficialAccesses = reliableRouteGeometry(routeGeometry)
        ? authoritativeIdentityCandidates
          .filter(isAuthoritativeAccessAnchor)
          .filter((candidate) => accessNamesAgree(endpoint.endpointName, candidate.name))
          .filter((candidate) => authoritativeWaterbodyFitsEndpoint(endpoint, candidate))
          .flatMap((candidate) => {
            const projection = projectToRouteGeometry(candidate, routeGeometry);
            if (!projection || projection.distanceFeet > 500) return [];
            return [baseCandidate(
              'official-access-projected-water-entry',
              candidate.name,
              projection.coordinate.latitude,
              projection.coordinate.longitude,
              distanceFeet(endpoint, projection.coordinate),
              candidate.sourceUrl,
              0,
              undefined,
              { name: candidate.name, waterbody: candidate.waterbody, distanceFeet: projection.distanceFeet, sourceUrl: candidate.sourceUrl },
            )];
          })
        : [];
      const officialCanonicalAccesses = registryEntry?.waterEntryCoordinate
        ? authoritativeIdentityCandidates
          .filter(isAuthoritativeAccessAnchor)
          .filter((candidate) => accessNamesAgree(endpoint.endpointName, candidate.name))
          .filter((candidate) => authoritativeWaterbodyFitsEndpoint(endpoint, candidate))
          .flatMap((candidate) => {
            const anchorDistance = distanceFeet(candidate, registryEntry.waterEntryCoordinate!);
            const geometryDistance = distanceToRouteGeometry(registryEntry.waterEntryCoordinate!, routeGeometry);
            const routeGeometrySupportsCandidate = reliableRouteGeometry(routeGeometry) && geometryDistance !== null && geometryDistance <= 300;
            const sharedGeometryRecovery = canRecoverSharedRouteGeometry(registryEntry, geometryDistance);
            if (anchorDistance > 250 || (!routeGeometrySupportsCandidate && !sharedGeometryRecovery)) return [];
            return [baseCandidate(
              'official-canonical-water-entry',
              candidate.name,
              registryEntry.waterEntryCoordinate!.latitude,
              registryEntry.waterEntryCoordinate!.longitude,
              distanceFeet(endpoint, registryEntry.waterEntryCoordinate!),
              candidate.sourceUrl,
              geometryDistance,
              undefined,
              { name: candidate.name, waterbody: candidate.waterbody, distanceFeet: anchorDistance, sourceUrl: candidate.sourceUrl },
            )];
          })
        : [];
      const rawCandidates = [
        baseCandidate('matched-river-centerline', endpoint.matchedRiverName, endpoint.nearestMatchedLatitude, endpoint.nearestMatchedLongitude, endpoint.distanceFeetToMatchedRiver),
        baseCandidate('nearest-named-waterway', endpoint.nearestWaterwayName, endpoint.nearestWaterwayLatitude, endpoint.nearestWaterwayLongitude, endpoint.distanceFeetToNearestWaterway),
        baseCandidate('nearest-nhd-waterbody', endpoint.nearestWaterbodyName, endpoint.nearestWaterbodyLatitude, endpoint.nearestWaterbodyLongitude, endpoint.distanceFeetToNearestWaterbody),
        registryEntry?.waterEntryCoordinate
          ? baseCandidate('shared-water-entry', registryEntry.name, registryEntry.waterEntryCoordinate.latitude, registryEntry.waterEntryCoordinate.longitude, distanceFeet(endpoint, registryEntry.waterEntryCoordinate))
          : null,
        ...directOfficialHydrographyAccesses,
        ...matchedOfficialAccesses,
        ...projectedOfficialAccesses,
        ...officialCanonicalAccesses,
        ...authoritativeIdentityCandidates
          .filter((candidate) => candidate.coordinateRole === 'authoritative-water-entry')
          .filter((candidate) => accessNamesAgree(endpoint.endpointName, candidate.name))
          .filter((candidate) => authoritativeWaterbodyFitsEndpoint(endpoint, candidate))
          .map((candidate) => {
            const directHydrography = hydrographyByCandidateId.get(`official-water-entry:${candidate.provider}:${candidate.featureId}`);
            return baseCandidate(
              'authoritative-water-entry',
              candidate.name,
              candidate.latitude,
              candidate.longitude,
              candidate.distanceFromCurrentFeet ?? distanceFeet(endpoint, candidate),
              candidate.sourceUrl,
              directHydrography?.nearestIntendedFlowlineFeet ?? candidate.distanceFromMatchedRiverPointFeet,
              undefined,
              undefined,
              {
                provider: candidate.provider,
                featureId: candidate.featureId,
                waterbody: candidate.waterbody ?? null,
                coordinateRole: candidate.coordinateRole,
                sourceType: candidate.sourceType ?? null,
                riverMile: candidate.riverMile ?? null,
                uncertaintyFeet: candidate.uncertaintyFeet ?? null,
                matchedRiverDistanceFeet: directHydrography?.nearestIntendedFlowlineFeet ?? candidate.matchedRiverDistanceFeet ?? null,
                onNhdWaterbody: directHydrography?.onNhdWaterbody ?? candidate.onNhdWaterbody ?? false,
                occurrenceRouteCount: officialFeatureRoutes.get(`${candidate.provider}:${candidate.featureId}`)?.size ?? 1,
                geometryConsensusRouteCount: officialFeatureGeometryRoutes.get(`${candidate.provider}:${candidate.featureId}`)?.size ?? 0,
                terminalAlternateWaterbody: candidate.terminalAlternateWaterbody ?? null,
              },
              directHydrography ? {
                candidateId: directHydrography.candidateId,
                directQueryVerified: directHydrography.directQueryVerified,
                flowlineEvidenceSource: directHydrography.flowlineEvidenceSource,
                waterbodyEvidenceSource: directHydrography.waterbodyEvidenceSource,
                mode: directHydrography.onNhdWaterbody ? 'on-waterbody' : 'authoritative-water-entry',
                nearestIntendedFlowlineFeet: directHydrography.nearestIntendedFlowlineFeet,
                nearestIntendedFlowlineName: directHydrography.nearestIntendedFlowlineName,
                nearestWaterbodyFeet: directHydrography.nearestWaterbodyFeet,
                nearestWaterbodyName: directHydrography.nearestWaterbodyName,
                onNhdWaterbody: directHydrography.onNhdWaterbody,
                ambiguousOfficialCandidates: false,
                supportedOfficialCandidateCount: 1,
                intendedWaterbody: directHydrography.intendedWaterbody,
                candidateToRouteFlowlineFeet: directHydrography.candidateToRouteFlowlineFeet,
                routeToIntendedFlowlineJunctionFeet: directHydrography.routeToIntendedFlowlineJunctionFeet,
              } : undefined,
            );
          }),
        ...osmFeatures
          .filter((feature) => feature.kind !== 'parking' && feature.kind !== 'other')
          .slice(0, 8)
          .map((feature) => {
            const official = authoritativeIdentityCandidates
              .filter((candidate) => accessNamesAgree(endpoint.endpointName, candidate.name))
              .filter((candidate) => authoritativeWaterbodyFitsEndpoint(endpoint, candidate))
              .map((candidate) => ({ candidate, distanceFeet: distanceFeet(feature, candidate) }))
              .filter((match) => match.distanceFeet <= 1000)
              .sort((left, right) => left.distanceFeet - right.distanceFeet)[0] ?? null;
            const mappedHydrography = hydrographyByCandidateId.get(`mapped:${feature.url}`);
            const exactOfficialNameMatch = Boolean(official
              && normalizeAccessText(endpoint.endpointName) === normalizeAccessText(official.candidate.name));
            const terminalNamedWaterbodyAgreement = Boolean(endpoint.endpoint !== 'accessPoint'
              && mappedLaunchKinds.has(feature.kind)
              && exactOfficialNameMatch
              && mappedHydrography?.nearestWaterbodyName
              && namesAgree(endpoint.endpointName, mappedHydrography.nearestWaterbodyName)
              && namesAgree(endpoint.reach, mappedHydrography.nearestWaterbodyName)
              && (mappedHydrography.nearestWaterbodyFeet ?? Infinity) <= 200
              && (mappedHydrography.nearestIntendedFlowlineFeet ?? Infinity) <= 2_500);
            return baseCandidate(
              `osm-${feature.kind}`,
              feature.name,
              feature.latitude,
              feature.longitude,
              distanceFeet(endpoint, feature),
              feature.url,
              directOsmFeatures.some((directFeature) => directFeature.url === feature.url) ? feature.distanceFromMatchedRiverPointFeet : null,
              osmFeatureRoutes.get(`${feature.url}:${normalize(endpoint.endpointName)}`)?.size ?? 1,
              official ? { name: official.candidate.name, waterbody: official.candidate.waterbody ?? (terminalNamedWaterbodyAgreement ? mappedHydrography?.nearestWaterbodyName : null), distanceFeet: official.distanceFeet, sourceUrl: official.candidate.sourceUrl } : null,
              undefined,
              mappedHydrography ? {
                candidateId: mappedHydrography.candidateId,
                directQueryVerified: mappedHydrography.directQueryVerified,
                flowlineEvidenceSource: mappedHydrography.flowlineEvidenceSource,
                waterbodyEvidenceSource: mappedHydrography.waterbodyEvidenceSource,
                mode: 'mapped-launch-near-waterbody',
                nearestIntendedFlowlineFeet: mappedHydrography.nearestIntendedFlowlineFeet,
                nearestIntendedFlowlineName: mappedHydrography.nearestIntendedFlowlineName,
                nearestWaterbodyFeet: mappedHydrography.nearestWaterbodyFeet,
                nearestWaterbodyName: mappedHydrography.nearestWaterbodyName,
                onNhdWaterbody: mappedHydrography.onNhdWaterbody,
                ambiguousOfficialCandidates: ambiguousOfficialHydrography,
                supportedOfficialCandidateCount: supportedOfficialHydrography.length,
                exactOfficialNameMatch,
                terminalNamedWaterbodyAgreement,
              } : undefined,
            );
          }),
      ].filter((value) => value !== null)
        .map((candidate) => {
          const typedCandidate = candidate as RawCandidate;
          return {
            ...typedCandidate,
            routeGeometryDistanceFeet: distanceToRouteGeometry(typedCandidate, routeGeometry),
            routeGeometryReliable: reliableRouteGeometry(routeGeometry),
            routeAxisFraction: endpoint.endpoint === 'accessPoint' ? routeAxisFraction(typedCandidate, endpoint.routeId) : null,
          };
        });
      const directlyVerifiedMappedLaunches = rawCandidates.filter((candidate) => canDirectNhdVerifyMappedLaunch({
        mappedLaunch: mappedLaunchKinds.has(candidate.kind.replace(/^osm-/, '')),
        directQueryVerified: candidate.candidateHydrography?.directQueryVerified === true,
        intendedFlowlineNameAgreement: Boolean(candidate.candidateHydrography?.nearestIntendedFlowlineName
          && (namesAgree(endpoint.routeName, candidate.candidateHydrography.nearestIntendedFlowlineName)
            || namesAgree(endpoint.matchedRiverName, candidate.candidateHydrography.nearestIntendedFlowlineName))),
        nearestIntendedFlowlineFeet: candidate.candidateHydrography?.nearestIntendedFlowlineFeet,
        nearestWaterbodyFeet: candidate.candidateHydrography?.nearestWaterbodyFeet,
        routeGeometryDistanceFeet: candidate.routeGeometryDistanceFeet,
        candidateMoveFeet: candidate.distanceFeet,
        ambiguousOfficialCandidates: candidate.candidateHydrography?.ambiguousOfficialCandidates,
        accessIdentityStrong: accessNamesAgree(endpoint.endpointName, candidate.name)
          && ((candidate.osmConsensusRouteCount ?? 0) >= 2 || Boolean(candidate.officialAccessAgreement)),
      }));
      const candidates = rawCandidates
        .map((candidate) => ({
          ...candidate,
          ...(directlyVerifiedMappedLaunches.some((mapped) => mapped.sourceUrl === candidate.sourceUrl)
            ? { competingMappedLaunchCount: directlyVerifiedMappedLaunches.length }
            : {}),
        }))
        .map((candidate) => scoreCandidate(endpoint, candidate, registryEntry))
        .sort((left, right) => right.score - left.score
          || Math.min(right.waterScore, right.accessScore) - Math.min(left.waterScore, left.accessScore)
          || ((left.candidateHydrography?.terminalNamedWaterbodyAgreement && right.candidateHydrography?.terminalNamedWaterbodyAgreement)
            ? (left.candidateHydrography.nearestWaterbodyFeet ?? Infinity) - (right.candidateHydrography.nearestWaterbodyFeet ?? Infinity)
            : 0)
          || (left.distanceFeet ?? Infinity) - (right.distanceFeet ?? Infinity));
      // Centerline snaps, generic water polygons, and road bridges are useful
      // map clues, but they do not independently identify the named access.
      // Never present those clues as a proposed water-entry correction.
      const isActionableCandidate = (candidate: Candidate) => candidate.kind === 'shared-water-entry'
        || candidate.kind === 'authoritative-water-entry'
        || candidate.kind === 'official-access-projected-water-entry'
        || candidate.kind === 'official-access-matched-river-water-entry'
        || candidate.kind === 'official-access-nhd-water-entry'
        || candidate.kind === 'official-canonical-water-entry'
        || (candidate.kind.startsWith('osm-') && candidate.kind !== 'osm-road-bridge');
      // If one candidate has passed the autonomous safety gate, do not let an
      // equally scored but unverified projection win merely because it sorted
      // first. This also keeps shared access occurrences on one water entry.
      const recommended = candidates.find((candidate) => candidate.autoApplyEligible && isActionableCandidate(candidate))
        ?? candidates.find(isActionableCandidate)
        ?? null;
      return {
        routeId: endpoint.routeId,
        routeName: endpoint.routeName,
        reach: endpoint.reach,
        state: endpoint.state,
        endpoint: endpoint.endpoint,
        endpointName: endpoint.endpointName,
        current: { latitude: endpoint.latitude, longitude: endpoint.longitude },
        reason: registryEntry?.verificationStatus === 'authoritative-access-mismatch'
          ? `The stored point for ${endpoint.endpointName} is ${Math.round(registryEntry.authoritativeAccessMismatchFeet ?? 0)} ft from the exact name-matched government access record. Repeated app coordinates cannot resolve this identity conflict; verify the official facility and derive its water entry independently.`
          : registryEntry?.verificationStatus === 'area-anchor-only'
          ? `The stored point for ${endpoint.endpointName} matches an official property or fishing-area representative coordinate, not a verified access, parking, or water-entry location. Research the actual launch before changing or publishing this endpoint.`
          : registryEntry?.coordinateStatus === 'conflict'
          ? `Shared access conflict: routes using ${endpoint.endpointName} disagree by as much as ${registryEntry.maximumSeparationFeet} ft. Resolve the canonical water-entry coordinate before accepting any route-specific correction.`
          : endpoint.note,
        canonicalAccessId: registryEntry?.id ?? null,
        canonicalAccessStatus: registryEntry?.verificationStatus ?? null,
        sharedRouteCount: registryEntry?.routeCount ?? 0,
        sourceLinks: routeById.get(endpoint.routeId)?.sourceLinks ?? [],
        authoritativeAccessCandidates: authoritativeCandidates
          .filter((candidate) => accessNamesAgree(endpoint.endpointName, candidate.name))
          .map((candidate) => {
            if (candidate.coordinateRole !== 'authoritative-water-entry') return candidate;
            const directHydrography = hydrographyByCandidateId.get(`official-water-entry:${candidate.provider}:${candidate.featureId}`);
            return directHydrography ? {
              ...candidate,
              matchedRiverDistanceFeet: directHydrography.nearestIntendedFlowlineFeet,
              onNhdWaterbody: directHydrography.onNhdWaterbody,
            } : candidate;
          })
          .sort((left, right) => (left.distanceFromCurrentFeet ?? Infinity) - (right.distanceFromCurrentFeet ?? Infinity))
          .slice(0, 3),
        // Nearby official inventory records with non-matching names are useful
        // research leads, but must never be promoted to correction candidates.
        // Keeping them in a separate field makes that distinction explicit in
        // the review UI and prevents proximity alone from establishing identity.
        nearbyAuthoritativeCandidates: authoritativeCandidates
          .filter((candidate) => !accessNamesAgree(endpoint.endpointName, candidate.name))
          .filter((candidate) => Math.min(
            candidate.distanceFromCurrentFeet ?? Infinity,
            candidate.distanceFromMatchedRiverPointFeet ?? Infinity,
          ) <= 5280)
          .sort((left, right) => Math.min(
            left.distanceFromCurrentFeet ?? Infinity,
            left.distanceFromMatchedRiverPointFeet ?? Infinity,
          ) - Math.min(
            right.distanceFromCurrentFeet ?? Infinity,
            right.distanceFromMatchedRiverPointFeet ?? Infinity,
          ))
          .slice(0, 3),
        candidates,
        recommended,
        autoApplyEligible: recommended?.autoApplyEligible ?? false,
      };
    })
    .sort((left, right) => (right.recommended?.score ?? 0) - (left.recommended?.score ?? 0));
  const autoApplyEligibleCount = items.filter((item) => item.autoApplyEligible).length;
  await writeFileReliably(outputPath, `${JSON.stringify({
    generatedAt: report.generatedAt,
    registryGeneratedAt: registry.generatedAt,
    count: items.length,
    autoApplyEligibleCount,
    items,
  }, null, 2)}\n`);
  console.log(`Generated ${path.relative(root, outputPath)} with ${items.length} suggested correction(s).`);
  console.log(`${autoApplyEligibleCount} suggestion(s) satisfy the autonomous-apply safety gate.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
