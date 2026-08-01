import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { riverTripDetails } from '../src/data/river-trip-details';
import {
  canDirectNhdVerifyMappedLaunch,
  canOfficialWaterbodyRecoverUnreliableTerminalGeometry,
  canRecoverMappedNamedTerminalWaterbody,
  canRecoverNamedTerminalWaterbody,
  canVerifyFreshWideRiverBank,
  canVerifyOfficialTerminalAlternateWaterbodyRamp,
  directNhdRouteGeometryLimitFeet,
} from './lib/candidate-hydrography-policy';
import { canRecoverSharedRouteGeometry, hasAuditConfirmedSharedWaterEntry } from './lib/shared-water-entry-policy';

type Coordinate = { latitude: number; longitude: number };
type Correction = Coordinate & {
  routeId: string;
  endpoint: 'putIn' | 'takeOut' | 'accessPoint';
  endpointName: string;
  evidenceSnapshot?: {
    candidateKind?: string;
    distanceFeet?: number | null;
    routeGeometryDistanceFeet?: number | null;
    routeGeometryReliable?: boolean | null;
    officialAccessAgreement?: { distanceFeet?: number | null } | null;
    authoritativeWaterEntry?: {
      waterbody?: string | null;
      uncertaintyFeet?: number | null;
      occurrenceRouteCount?: number;
      terminalAlternateWaterbody?: {
        routeWaterbody: string;
        relationship: 'downstream-after-confluence' | 'tributary-before-confluence' | 'connected-water-trail-waterbody';
        sourceUrl: string;
        sourceLabel: string;
        maximumDownstreamDistanceFeet?: number;
        maximumConnectionDistanceFeet?: number;
      } | null;
    } | null;
    evidence?: Array<{ signal?: string }>;
    candidateHydrography?: {
      directQueryVerified?: boolean;
      flowlineEvidenceSource?: 'candidate-query' | 'route-cache';
      waterbodyEvidenceSource?: 'candidate-query' | 'route-cache';
      mode?: 'on-waterbody' | 'projected-to-waterbody' | 'projected-to-flowline' | 'mapped-launch-near-waterbody' | 'authoritative-water-entry';
      nearestIntendedFlowlineFeet?: number | null;
      nearestIntendedFlowlineName?: string | null;
      nearestWaterbodyFeet?: number | null;
      nearestWaterbodyName?: string | null;
      onNhdWaterbody?: boolean;
      ambiguousOfficialCandidates?: boolean;
      exactOfficialNameMatch?: boolean;
      terminalNamedWaterbodyAgreement?: boolean;
      nearbyMappedLaunchExists?: boolean;
      candidateToRouteFlowlineFeet?: number | null;
      routeToIntendedFlowlineJunctionFeet?: number | null;
    } | null;
  };
};
type AutoHistory = { batches?: Array<{ corrections: Correction[] }> };
type AuditEndpoint = Coordinate & {
  routeId: string;
  routeName: string;
  matchedRiverName: string | null;
  state: string;
  endpoint: Correction['endpoint'];
  endpointName: string;
  severity: string;
  distanceFeetToMatchedRiver: number | null;
  endpointOnWaterbody: boolean;
};
type AuditReport = { generatedAt: string; endpoints: AuditEndpoint[] };
type RegistryEntry = {
  state: string;
  name: string;
  coordinateStatus: string;
  maximumSeparationFeet: number;
  routeCount: number;
  waterEntryCoordinate: Coordinate | null;
  waterEntryConsensusRouteCount: number;
  waterEntryExactOnRiver: boolean;
  waterEntryWaterbodyConfirmed: boolean;
};
type RegistryReport = { generatedAt: string; entries: RegistryEntry[] };
type RouteGeometry = { geometry?: { coordinates?: number[][][] } };
type AuditEndpointMatch = {
  endpoint: AuditEndpoint | null;
  method: 'exact-name' | 'coordinate-alias' | 'missing';
};

const root = process.cwd();
const historyPath = path.join(root, 'docs', 'route-coordinate-auto-corrections.json');
const auditPath = path.join(root, 'docs', 'route-coordinate-river-audit.json');
const registryPath = path.join(root, 'src', 'data', 'generated', 'route-access-registry.json');
const geometryRoot = path.join(root, 'node_modules', '.cache', 'route-coordinate-review-geometries', 'routes');
const outputPath = path.join(root, 'docs', 'route-coordinate-auto-validation.json');
const feetPerMile = 5280;
const earthRadiusMiles = 3958.8;

function normalize(value: string | null | undefined) {
  return (value ?? '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}
function namesAgree(left: string | null | undefined, right: string | null | undefined) {
  const a = normalize(left);
  const b = normalize(right);
  return Boolean(a && b && (a === b || a.includes(b) || b.includes(a)));
}
function radians(value: number) { return value * Math.PI / 180; }
function distanceFeet(left: Coordinate, right: Coordinate) {
  const deltaLat = radians(right.latitude - left.latitude);
  const deltaLon = radians(right.longitude - left.longitude);
  const leftLat = radians(left.latitude);
  const rightLat = radians(right.latitude);
  const h = Math.sin(deltaLat / 2) ** 2 + Math.cos(leftLat) * Math.cos(rightLat) * Math.sin(deltaLon / 2) ** 2;
  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(h)) * feetPerMile;
}
function matchAuditEndpoint(correction: Correction, endpoints: AuditEndpoint[]): AuditEndpointMatch {
  const endpointCandidates = endpoints.filter((endpoint) => (
    endpoint.routeId === correction.routeId && endpoint.endpoint === correction.endpoint
  ));
  const exactNameMatch = endpointCandidates.find((endpoint) => endpoint.endpointName === correction.endpointName);
  if (exactNameMatch) return { endpoint: exactNameMatch, method: 'exact-name' };

  // Endpoint labels are editorial data and may be clarified after a correction is applied.
  // Treat a renamed label as the same endpoint only when the correction coordinate uniquely
  // identifies one current endpoint. This keeps intermediate access points from being
  // accidentally validated against another same-kind point on the route.
  const coordinateMatches = endpointCandidates.filter((endpoint) => distanceFeet(correction, endpoint) <= 3);
  if (coordinateMatches.length === 1) return { endpoint: coordinateMatches[0]!, method: 'coordinate-alias' };
  return { endpoint: null, method: 'missing' };
}
function distanceToRouteGeometry(point: Coordinate, geometry: RouteGeometry | null) {
  const lines = geometry?.geometry?.coordinates ?? [];
  const latitudeScale = 69;
  const longitudeScale = Math.cos(radians(point.latitude)) * 69.172;
  const px = point.longitude * longitudeScale;
  const py = point.latitude * latitudeScale;
  let bestMiles = Infinity;
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
      bestMiles = Math.min(bestMiles, Math.hypot(px - (sx + ratio * dx), py - (sy + ratio * dy)));
    }
  }
  return Number.isFinite(bestMiles) ? bestMiles * feetPerMile : null;
}
function routeAxisFraction(point: Coordinate, routeId: string) {
  const details = riverTripDetails[routeId];
  if (!details || !Number.isFinite(details.putIn.latitude) || !Number.isFinite(details.putIn.longitude)
    || !Number.isFinite(details.takeOut.latitude) || !Number.isFinite(details.takeOut.longitude)) return null;
  const latitudeScale = 69;
  const longitudeScale = Math.cos(radians(point.latitude)) * 69.172;
  const start = { x: details.putIn.longitude! * longitudeScale, y: details.putIn.latitude! * latitudeScale };
  const end = { x: details.takeOut.longitude! * longitudeScale, y: details.takeOut.latitude! * latitudeScale };
  const delta = { x: end.x - start.x, y: end.y - start.y };
  const lengthSquared = delta.x * delta.x + delta.y * delta.y;
  if (lengthSquared === 0) return null;
  const candidate = { x: point.longitude * longitudeScale, y: point.latitude * latitudeScale };
  return ((candidate.x - start.x) * delta.x + (candidate.y - start.y) * delta.y) / lengthSquared;
}

async function main() {
  const [history, audit, registry] = await Promise.all([
    readFile(historyPath, 'utf8').then((value) => JSON.parse(value) as AutoHistory),
    readFile(auditPath, 'utf8').then((value) => JSON.parse(value) as AuditReport),
    readFile(registryPath, 'utf8').then((value) => JSON.parse(value) as RegistryReport),
  ]);
  const corrections = (history.batches ?? []).flatMap((batch) => batch.corrections);
  const registryByKey = new Map(registry.entries.map((entry) => [`${normalize(entry.state)}:${normalize(entry.name)}`, entry]));
  const results = await Promise.all(corrections.map(async (correction) => {
    const auditEndpointMatch = matchAuditEndpoint(correction, audit.endpoints);
    const auditEndpoint = auditEndpointMatch.endpoint;
    const registryEntry = auditEndpoint
      ? registryByKey.get(`${normalize(auditEndpoint.state)}:${normalize(auditEndpoint.endpointName)}`) ?? null
      : null;
    let geometry: RouteGeometry | null = null;
    try { geometry = JSON.parse(await readFile(path.join(geometryRoot, `${correction.routeId}.json`), 'utf8')) as RouteGeometry; } catch { /* reported below */ }
    const geometryDistanceFeet = distanceToRouteGeometry(correction, geometry);
    const axisFraction = correction.endpoint === 'accessPoint' ? routeAxisFraction(correction, correction.routeId) : null;
    const details = riverTripDetails[correction.routeId];
    const opposite = correction.endpoint === 'putIn' ? details?.takeOut : correction.endpoint === 'takeOut' ? details?.putIn : null;
    const oppositeSeparationFeet = opposite && Number.isFinite(opposite.latitude) && Number.isFinite(opposite.longitude)
      ? distanceFeet(correction, { latitude: opposite.latitude!, longitude: opposite.longitude! }) : null;
    const independentlyVerifiedWideRiverBank = Boolean(
      auditEndpoint?.endpointOnWaterbody
      && correction.evidenceSnapshot?.candidateKind === 'authoritative-water-entry'
      && correction.evidenceSnapshot.evidence?.some((item) => item.signal === 'official-point-on-intended-waterbody'),
    );
    const correctionSignals = new Set(correction.evidenceSnapshot?.evidence?.map((item) => item.signal).filter(Boolean));
    const verifiedSharedRouteGeometryRecovery = Boolean(
      correction.evidenceSnapshot?.candidateKind === 'official-canonical-water-entry'
      && correctionSignals.has('shared-water-entry-audit-confirmed')
      && correctionSignals.has('shared-route-geometry-recovery')
      && hasAuditConfirmedSharedWaterEntry(registryEntry)
      && canRecoverSharedRouteGeometry(registryEntry, geometryDistanceFeet),
    );
    const directHydrography = correction.evidenceSnapshot?.candidateHydrography;
    const independentlyVerifiedTerminalFlowlineRecovery = Boolean(
      correction.endpoint !== 'accessPoint'
      && correction.evidenceSnapshot?.candidateKind === 'official-access-nhd-water-entry'
      && directHydrography?.mode === 'projected-to-flowline'
      && directHydrography.ambiguousOfficialCandidates === false
      && correctionSignals.has('access-name-agreement')
      && correctionSignals.has('official-waterbody-agreement')
      && correctionSignals.has('official-access-projected-to-intended-flowline')
      && geometryDistanceFeet !== null
      && geometryDistanceFeet <= directNhdRouteGeometryLimitFeet({
        mode: directHydrography.mode,
        nearestIntendedFlowlineFeet: directHydrography.nearestIntendedFlowlineFeet,
        nearestWaterbodyFeet: directHydrography.nearestWaterbodyFeet,
        onNhdWaterbody: directHydrography.onNhdWaterbody,
        terminalEndpoint: true,
      }),
    );
    const independentlyVerifiedOfficialWaterbodyRecovery = Boolean(
      correction.evidenceSnapshot?.candidateKind === 'official-access-nhd-water-entry'
      && correctionSignals.has('official-terminal-waterbody-overrides-unreliable-route-geometry')
      && correctionSignals.has('access-name-agreement')
      && correctionSignals.has('official-waterbody-agreement')
      && canOfficialWaterbodyRecoverUnreliableTerminalGeometry({
        mode: directHydrography?.mode,
        nearestIntendedFlowlineFeet: directHydrography?.nearestIntendedFlowlineFeet,
        nearestWaterbodyFeet: directHydrography?.nearestWaterbodyFeet,
        onNhdWaterbody: directHydrography?.onNhdWaterbody,
        terminalEndpoint: correction.endpoint !== 'accessPoint',
        routeGeometryDistanceFeet: correction.evidenceSnapshot?.routeGeometryDistanceFeet,
        routeGeometryReliable: correction.evidenceSnapshot?.routeGeometryReliable,
        officialAnchorToWaterEntryFeet: correction.evidenceSnapshot?.officialAccessAgreement?.distanceFeet,
        ambiguousOfficialCandidates: directHydrography?.ambiguousOfficialCandidates,
      }),
    );
    const independentlyVerifiedNamedTerminalWaterbodyRecovery = Boolean(
      correction.evidenceSnapshot?.candidateKind === 'official-access-nhd-water-entry'
      && correctionSignals.has('access-name-agreement')
      && correctionSignals.has('official-terminal-waterbody-agreement')
      && correctionSignals.has('official-terminal-named-waterbody-overrides-river-only-geometry')
      && canRecoverNamedTerminalWaterbody({
        terminalEndpoint: correction.endpoint !== 'accessPoint',
        exactOfficialNameMatch: directHydrography?.exactOfficialNameMatch === true,
        terminalNamedWaterbodyAgreement: directHydrography?.terminalNamedWaterbodyAgreement === true,
        mode: directHydrography?.mode,
        nearestIntendedFlowlineFeet: directHydrography?.nearestIntendedFlowlineFeet,
        nearestWaterbodyFeet: directHydrography?.nearestWaterbodyFeet,
        officialAnchorToWaterEntryFeet: correction.evidenceSnapshot?.officialAccessAgreement?.distanceFeet,
        candidateMoveFeet: correction.evidenceSnapshot?.distanceFeet,
        routeGeometryDistanceFeet: correction.evidenceSnapshot?.routeGeometryDistanceFeet,
        routeGeometryReliable: correction.evidenceSnapshot?.routeGeometryReliable,
        ambiguousOfficialCandidates: directHydrography?.ambiguousOfficialCandidates,
      }),
    );
    const independentlyVerifiedMappedNamedTerminalWaterbodyRecovery = Boolean(
      correction.evidenceSnapshot?.candidateKind?.startsWith('osm-')
      && correction.evidenceSnapshot.candidateKind !== 'osm-road-bridge'
      && correctionSignals.has('authoritative-access-agreement')
      && correctionSignals.has('official-terminal-waterbody-agreement')
      && correctionSignals.has('mapped-launch-near-named-terminal-waterbody')
      && correctionSignals.has('official-terminal-mapped-launch-overrides-river-only-geometry')
      && canRecoverMappedNamedTerminalWaterbody({
        terminalEndpoint: correction.endpoint !== 'accessPoint',
        mappedLaunch: true,
        exactOfficialNameMatch: directHydrography?.exactOfficialNameMatch === true,
        terminalNamedWaterbodyAgreement: directHydrography?.terminalNamedWaterbodyAgreement === true,
        nearestIntendedFlowlineFeet: directHydrography?.nearestIntendedFlowlineFeet,
        nearestWaterbodyFeet: directHydrography?.nearestWaterbodyFeet,
        officialAnchorToMappedLaunchFeet: correction.evidenceSnapshot?.officialAccessAgreement?.distanceFeet,
        candidateMoveFeet: correction.evidenceSnapshot?.distanceFeet,
        routeGeometryDistanceFeet: correction.evidenceSnapshot?.routeGeometryDistanceFeet,
        routeGeometryReliable: correction.evidenceSnapshot?.routeGeometryReliable,
        ambiguousOfficialCandidates: directHydrography?.ambiguousOfficialCandidates,
      }),
    );
    const independentlyVerifiedFreshWideRiverBank = canVerifyFreshWideRiverBank({
      directQueryVerified: directHydrography?.directQueryVerified === true,
      flowlineEvidenceSource: directHydrography?.flowlineEvidenceSource,
      waterbodyEvidenceSource: directHydrography?.waterbodyEvidenceSource,
      mode: directHydrography?.mode,
      nearestIntendedFlowlineFeet: directHydrography?.nearestIntendedFlowlineFeet,
      nearestWaterbodyFeet: directHydrography?.nearestWaterbodyFeet,
      routeGeometryDistanceFeet: geometryDistanceFeet,
      ambiguousOfficialCandidates: directHydrography?.ambiguousOfficialCandidates,
      exactOfficialNameMatch: directHydrography?.exactOfficialNameMatch === true,
      namedOfficialWaterbodyAgreement: correctionSignals.has('official-waterbody-agreement'),
    });
    const terminalAlternate = correction.evidenceSnapshot?.authoritativeWaterEntry?.terminalAlternateWaterbody;
    const independentlyVerifiedOfficialTerminalAlternateWaterbody = Boolean(
      correctionSignals.has('official-terminal-alternate-waterbody')
      && (correctionSignals.has('official-terminal-confluence-topology')
        || correctionSignals.has('official-terminal-connected-waterbody-topology'))
      && canVerifyOfficialTerminalAlternateWaterbodyRamp({
        terminalEndpoint: correction.endpoint !== 'accessPoint',
        terminalAlternateWaterbodyDeclared: Boolean(terminalAlternate),
        relationship: terminalAlternate?.relationship,
        relationshipSourceUrl: terminalAlternate?.sourceUrl,
        directQueryVerified: directHydrography?.directQueryVerified === true,
        flowlineEvidenceSource: directHydrography?.flowlineEvidenceSource,
        waterbodyEvidenceSource: directHydrography?.waterbodyEvidenceSource,
        mode: directHydrography?.mode,
        nearestIntendedFlowlineFeet: directHydrography?.nearestIntendedFlowlineFeet,
        nearestWaterbodyFeet: directHydrography?.nearestWaterbodyFeet,
        candidateToRouteFlowlineFeet: directHydrography?.candidateToRouteFlowlineFeet,
        routeToIntendedFlowlineJunctionFeet: directHydrography?.routeToIntendedFlowlineJunctionFeet,
        maximumConnectionDistanceFeet: terminalAlternate?.maximumConnectionDistanceFeet
          ?? terminalAlternate?.maximumDownstreamDistanceFeet,
        routeGeometryReliable: correction.evidenceSnapshot?.routeGeometryReliable,
        routeGeometryDistanceFeet: correction.evidenceSnapshot?.routeGeometryDistanceFeet,
        uncertaintyFeet: correction.evidenceSnapshot?.authoritativeWaterEntry?.uncertaintyFeet,
        ambiguousOfficialCandidates: directHydrography?.ambiguousOfficialCandidates,
        exactAccessNameAgreement: correctionSignals.has('access-name-agreement'),
        routeWaterbodyAgreement: Boolean(auditEndpoint
          && terminalAlternate
          && namesAgree(auditEndpoint.routeName, terminalAlternate.routeWaterbody)),
        terminalWaterbodyAgreement: Boolean(
          correction.evidenceSnapshot?.authoritativeWaterEntry?.waterbody
          && directHydrography?.nearestIntendedFlowlineName
          && namesAgree(
            correction.evidenceSnapshot.authoritativeWaterEntry.waterbody,
            directHydrography.nearestIntendedFlowlineName,
          )),
        occurrenceRouteCount: correction.evidenceSnapshot?.authoritativeWaterEntry?.occurrenceRouteCount ?? 0,
      }),
    );
    const directMappedNhdEvidencePasses = !correctionSignals.has('mapped-launch-direct-nhd-river-agreement')
      || canDirectNhdVerifyMappedLaunch({
        mappedLaunch: correction.evidenceSnapshot!.candidateKind !== 'osm-road-bridge',
        directQueryVerified: directHydrography?.directQueryVerified === true,
        intendedFlowlineNameAgreement: Boolean(directHydrography?.nearestIntendedFlowlineName),
        nearestIntendedFlowlineFeet: directHydrography?.nearestIntendedFlowlineFeet,
        nearestWaterbodyFeet: directHydrography?.nearestWaterbodyFeet,
        routeGeometryDistanceFeet: correction.evidenceSnapshot?.routeGeometryDistanceFeet,
        candidateMoveFeet: correction.evidenceSnapshot?.distanceFeet,
        ambiguousOfficialCandidates: directHydrography?.ambiguousOfficialCandidates,
        accessIdentityStrong: correctionSignals.has('access-name-agreement')
          && (correctionSignals.has('multi-route-launch-consensus') || correctionSignals.has('authoritative-access-agreement')),
      });
    const candidateSpecificNhdQueryPasses = !correctionSignals.has('candidate-specific-nhd-query')
      || Boolean(directHydrography?.directQueryVerified
        && directHydrography.flowlineEvidenceSource === 'candidate-query'
        && (!['on-waterbody', 'projected-to-waterbody', 'mapped-launch-near-waterbody'].includes(directHydrography.mode ?? '')
          || directHydrography.waterbodyEvidenceSource === 'candidate-query'));
    const checks = {
      postAuditPasses: Boolean(auditEndpoint && !['failure', 'unknown'].includes(auditEndpoint.severity)
        && ((auditEndpoint.distanceFeetToMatchedRiver ?? Infinity) <= 800 || auditEndpoint.endpointOnWaterbody)),
      canonicalGeometryPasses: geometryDistanceFeet !== null
        && (geometryDistanceFeet <= 500
          || (independentlyVerifiedWideRiverBank && geometryDistanceFeet <= 800)
          || independentlyVerifiedTerminalFlowlineRecovery
          || independentlyVerifiedOfficialWaterbodyRecovery
          || independentlyVerifiedNamedTerminalWaterbodyRecovery
          || independentlyVerifiedMappedNamedTerminalWaterbodyRecovery
          || independentlyVerifiedFreshWideRiverBank
          || independentlyVerifiedOfficialTerminalAlternateWaterbody
          || verifiedSharedRouteGeometryRecovery),
      sharedRegistryPasses: Boolean(registryEntry && registryEntry.coordinateStatus !== 'conflict' && registryEntry.maximumSeparationFeet <= 150),
      topologyPasses: correction.endpoint === 'accessPoint'
        ? axisFraction !== null && axisFraction >= -0.2 && axisFraction <= 1.2
        : oppositeSeparationFeet !== null && oppositeSeparationFeet >= 500,
      directMappedNhdEvidencePasses,
      candidateSpecificNhdQueryPasses,
    };
    return {
      ...correction,
      endpointNameMatch: auditEndpointMatch.method,
      currentEndpointName: auditEndpoint?.endpointName ?? null,
      auditSeverity: auditEndpoint?.severity ?? null,
      auditDistanceFeet: auditEndpoint?.distanceFeetToMatchedRiver ?? null,
      geometryDistanceFeet,
      registryStatus: registryEntry?.coordinateStatus ?? null,
      registryMaximumSeparationFeet: registryEntry?.maximumSeparationFeet ?? null,
      routeAxisFraction: axisFraction,
      oppositeEndpointSeparationFeet: oppositeSeparationFeet,
      checks,
      passed: Object.values(checks).every(Boolean),
    };
  }));
  const failed = results.filter((result) => !result.passed);
  await writeFile(outputPath, `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    auditGeneratedAt: audit.generatedAt,
    registryGeneratedAt: registry.generatedAt,
    correctionCount: results.length,
    passedCount: results.length - failed.length,
    failedCount: failed.length,
    results,
  }, null, 2)}\n`);
  console.log(`Validated ${results.length} autonomous correction(s): ${results.length - failed.length} passed, ${failed.length} failed.`);
  if (failed.length > 0) process.exitCode = 1;
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
