import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { routeInventory } from '../src/data/rivers';
import { riverTripDetails } from '../src/data/river-trip-details';
import type { RiverAccessPoint } from '../src/lib/types';
import { accessFacilityIdentitiesAgree, accessNamesAgree } from './lib/access-name-match';
import { authoritativeEvidenceResolvesDistinctLocation, classifyCoordinateStatus } from './lib/access-registry-status';
import { distanceFeet } from './lib/geo-distance';

type EndpointKind = 'putIn' | 'takeOut' | 'accessPoint';
type AuditSeverity = 'ok' | 'review' | 'suspicious' | 'failure' | 'unknown';

type AuditEndpoint = {
  routeId: string;
  endpoint: EndpointKind;
  endpointName: string;
  latitude: number;
  longitude: number;
  distanceFeetToMatchedRiver: number | null;
  endpointOnWaterbody: boolean;
  severity: AuditSeverity;
  coordinateEvidenceRole?: 'authoritative-area-anchor' | 'authoritative-access-anchor' | 'authoritative-water-entry' | null;
};

type AuditReport = { generatedAt: string; endpoints: AuditEndpoint[] };
type AuthoritativeEvidence = {
  generatedAt?: string;
  items?: Array<{
    routeId: string;
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
      waterbody?: string | null;
      coordinateRole?: 'authoritative-water-entry' | 'authoritative-access-anchor' | 'authoritative-area-anchor';
      uncertaintyFeet?: number | null;
      parkingToAccessFeet?: number | null;
      terminalAlternateWaterbody?: {
        routeWaterbody: string;
        relationship: 'downstream-after-confluence' | 'tributary-before-confluence' | 'connected-water-trail-waterbody';
        sourceUrl: string;
        sourceLabel?: string;
        maximumDownstreamDistanceFeet?: number;
        maximumConnectionDistanceFeet?: number;
      } | null;
    }>;
  }>;
};
type RouteScopedOfficialControls = {
  providers?: Array<{
    id: string;
    name: string;
    state: string;
    sourceUrl: string;
    method: string;
    sourceType?: string;
    coordinateRole?: 'authoritative-water-entry' | 'authoritative-access-anchor' | 'authoritative-area-anchor';
    controls?: Array<{
      featureId: string;
      name: string;
      aliases?: string[];
      routeIds?: string[];
      waterbody?: string;
      latitude: number;
      longitude: number;
      uncertaintyFeet?: number | null;
      parkingToAccessFeet?: number | null;
      terminalAlternateWaterbody?: AuthoritativeCandidate['terminalAlternateWaterbody'];
    }>;
  }>;
};

type Occurrence = {
  routeId: string;
  routeName: string;
  state: string;
  endpoint: EndpointKind;
  sourceId: string | null;
  name: string;
  latitude: number;
  longitude: number;
  auditSeverity: AuditSeverity | null;
  distanceFeetToMatchedRiver: number | null;
  endpointOnWaterbody: boolean | null;
  coordinateEvidenceRole: 'authoritative-area-anchor' | 'authoritative-access-anchor' | 'authoritative-water-entry' | null;
};

type Coordinate = { latitude: number; longitude: number };

type AuthoritativeCandidate = NonNullable<AuthoritativeEvidence['items']>[number]['candidates'][number];

const root = process.cwd();
const auditArg = process.argv.find((arg) => arg.startsWith('--audit='));
const auditPath = auditArg
  ? path.resolve(root, auditArg.slice('--audit='.length))
  : path.join(root, 'docs', 'route-coordinate-river-audit.json');
const authoritativePath = path.join(root, 'docs', 'route-coordinate-authoritative-evidence.json');
const routeControlsPath = path.join(root, 'src', 'data', 'route-access-official-map-controls.json');
const outputPath = path.join(root, 'src', 'data', 'generated', 'route-access-registry.json');

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slug(value: string) {
  return normalize(value).replace(/\s+/g, '-');
}

function authoritativeCandidateNames(candidate: AuthoritativeCandidate) {
  return [candidate.name, candidate.officialName, ...(candidate.aliases ?? [])]
    .filter((value): value is string => Boolean(value));
}

function authoritativeCandidateNameMatches(
  accessName: string,
  candidate: AuthoritativeCandidate,
  matcher: (left: string | null | undefined, right: string | null | undefined) => boolean,
) {
  return authoritativeCandidateNames(candidate).some((candidateName) => matcher(accessName, candidateName));
}

function waterwayNamesAgree(left: string | null | undefined, right: string | null | undefined) {
  const simplify = (value: string | null | undefined) => normalize(value ?? '')
    .replace(/\b(?:the|river|creek|branch|fork)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const a = simplify(left);
  const b = simplify(right);
  return Boolean(a && b && (a === b || a.includes(b) || b.includes(a)));
}

function validPoint(point: RiverAccessPoint | undefined): point is RiverAccessPoint & Coordinate {
  return Boolean(point && Number.isFinite(point.latitude) && Number.isFinite(point.longitude));
}

function authoritativeWaterbodyFitsOccurrence(
  occurrence: Occurrence,
  candidate: NonNullable<AuthoritativeEvidence['items']>[number]['candidates'][number],
) {
  if (!candidate.waterbody || waterwayNamesAgree(occurrence.routeName, candidate.waterbody)) return true;
  const alternate = candidate.terminalAlternateWaterbody;
  return occurrence.endpoint !== 'accessPoint'
    && (alternate?.relationship === 'downstream-after-confluence'
      || alternate?.relationship === 'tributary-before-confluence'
      || alternate?.relationship === 'connected-water-trail-waterbody')
    && Boolean(alternate.sourceUrl)
    && waterwayNamesAgree(occurrence.routeName, alternate.routeWaterbody);
}

function coordinateKey(point: Coordinate) {
  return `${point.latitude.toFixed(5)},${point.longitude.toFixed(5)}`;
}

function centroid(points: Coordinate[]): Coordinate {
  return {
    latitude: points.reduce((sum, point) => sum + point.latitude, 0) / points.length,
    longitude: points.reduce((sum, point) => sum + point.longitude, 0) / points.length,
  };
}

function largestConsensusCluster(points: Occurrence[], limitFeet: number) {
  let best: Occurrence[] = [];
  for (const seed of points) {
    const cluster = points.filter((point) => distanceFeet(seed, point) <= limitFeet);
    const routeCount = new Set(cluster.map((point) => point.routeId)).size;
    const bestRouteCount = new Set(best.map((point) => point.routeId)).size;
    if (routeCount > bestRouteCount || (routeCount === bestRouteCount && cluster.length > best.length)) best = cluster;
  }
  return best;
}

function maxSeparation(points: Coordinate[]) {
  let maximum = 0;
  for (let left = 0; left < points.length; left += 1) {
    for (let right = left + 1; right < points.length; right += 1) {
      const a = points[left];
      const b = points[right];
      if (a && b) maximum = Math.max(maximum, distanceFeet(a, b));
    }
  }
  return maximum;
}

async function main() {
  let audit: AuditReport | null = null;
  try {
    audit = JSON.parse(await readFile(auditPath, 'utf8')) as AuditReport;
  } catch (error) {
    if (auditArg) throw new Error(`Cannot read requested audit ${auditPath}: ${String(error)}`);
    // The registry is still useful before the coordinate audit has been run.
  }
  let authoritative: AuthoritativeEvidence = {};
  try { authoritative = JSON.parse(await readFile(authoritativePath, 'utf8')) as AuthoritativeEvidence; } catch { /* optional provider evidence */ }
  const authoritativeByRouteAndName = new Map<string, NonNullable<AuthoritativeEvidence['items']>[number]['candidates']>();
  const addAuthoritativeCandidate = (routeId: string, endpointName: string, candidate: AuthoritativeCandidate) => {
    const key = `${routeId}:${normalize(endpointName)}`;
    const candidates = authoritativeByRouteAndName.get(key) ?? [];
    const unique = new Map([...candidates, candidate].map((entry) => [`${entry.provider}:${entry.featureId}`, entry]));
    authoritativeByRouteAndName.set(key, [...unique.values()]);
  };
  for (const item of authoritative.items ?? []) {
    for (const candidate of item.candidates) addAuthoritativeCandidate(item.routeId, item.endpointName, candidate);
  }
  let routeScopedControls: RouteScopedOfficialControls = {};
  try { routeScopedControls = JSON.parse(await readFile(routeControlsPath, 'utf8')) as RouteScopedOfficialControls; } catch { /* optional official map controls */ }
  for (const provider of routeScopedControls.providers ?? []) {
    if (!provider.coordinateRole) continue;
    for (const control of provider.controls ?? []) {
      if (!control.routeIds?.length || !control.waterbody) continue;
      const candidate: AuthoritativeCandidate = {
        provider: provider.id,
        featureId: control.featureId,
        name: control.name,
        officialName: provider.name,
        aliases: control.aliases ?? [],
        latitude: control.latitude,
        longitude: control.longitude,
        sourceUrl: provider.sourceUrl,
        waterbody: control.waterbody,
        coordinateRole: provider.coordinateRole,
        uncertaintyFeet: control.uncertaintyFeet ?? 25,
        parkingToAccessFeet: control.parkingToAccessFeet ?? null,
        terminalAlternateWaterbody: control.terminalAlternateWaterbody,
      };
      for (const routeId of control.routeIds) {
        const route = routeInventory.find((item) => item.id === routeId);
        if (!route) continue;
        const details = riverTripDetails[routeId];
        const points = [details?.putIn ?? route.putIn, details?.takeOut ?? route.takeOut, ...(details?.accessPoints ?? route.accessPoints ?? [])];
        for (const point of points) {
          if (validPoint(point) && authoritativeCandidateNameMatches(point.name, candidate, accessNamesAgree)) {
            addAuthoritativeCandidate(routeId, point.name, candidate);
          }
        }
      }
    }
  }
  const auditsByRouteAndName = new Map<string, AuditEndpoint[]>();
  for (const endpoint of audit?.endpoints ?? []) {
    const key = `${endpoint.routeId}:${normalize(endpoint.endpointName)}`;
    const entries = auditsByRouteAndName.get(key) ?? [];
    entries.push(endpoint);
    auditsByRouteAndName.set(key, entries);
  }

  const groups = new Map<string, Occurrence[]>();
  const sourceIdentityGroups = new Map<string, string[]>();
  for (const route of routeInventory) {
    const details = riverTripDetails[route.id];
    const points: Array<[EndpointKind, RiverAccessPoint | undefined]> = [
      ['putIn', details?.putIn ?? route.putIn],
      ['takeOut', details?.takeOut ?? route.takeOut],
      ...((details?.accessPoints ?? route.accessPoints ?? []).map((point) => ['accessPoint', point] as [EndpointKind, RiverAccessPoint])),
    ];
    for (const [endpoint, point] of points) {
      if (!validPoint(point)) continue;
      const nameGroupKey = `${normalize(route.state)}:${normalize(point.name)}`;
      const auditMatches = auditsByRouteAndName.get(`${route.id}:${normalize(point.name)}`) ?? [];
      const exactAudit = auditMatches.find((entry) => entry.endpoint === endpoint) ?? auditMatches[0] ?? null;
      const occurrence: Occurrence = {
        routeId: route.id,
        routeName: route.name,
        state: route.state,
        endpoint,
        sourceId: point.id ?? null,
        name: point.name,
        latitude: point.latitude,
        longitude: point.longitude,
        auditSeverity: exactAudit?.severity ?? null,
        distanceFeetToMatchedRiver: exactAudit?.distanceFeetToMatchedRiver ?? null,
        endpointOnWaterbody: exactAudit?.endpointOnWaterbody ?? null,
        coordinateEvidenceRole: exactAudit?.coordinateEvidenceRole ?? null,
      };
      let groupKey = nameGroupKey;
      if (occurrence.sourceId) {
        const sourceKey = `${normalize(route.state)}:${normalize(occurrence.sourceId)}`;
        const identityGroups = sourceIdentityGroups.get(sourceKey) ?? [];
        const matchingIdentityGroup = identityGroups.find((candidateKey) =>
          (groups.get(candidateKey) ?? []).some((existing) => accessNamesAgree(existing.name, occurrence.name)));
        if (matchingIdentityGroup) {
          groupKey = matchingIdentityGroup;
        } else if (!identityGroups.includes(groupKey)) {
          identityGroups.push(groupKey);
          sourceIdentityGroups.set(sourceKey, identityGroups);
        }
      }
      const occurrences = groups.get(groupKey) ?? [];
      occurrences.push(occurrence);
      groups.set(groupKey, occurrences);
    }
  }

  const entries = [...groups.entries()].map(([groupKey, occurrences]) => {
    const [stateKey] = groupKey.split(':');
    const displayName = occurrences[0]?.name ?? groupKey;
    const state = occurrences[0]?.state ?? stateKey;
    const variants = new Map<string, Occurrence[]>();
    for (const occurrence of occurrences) {
      const key = coordinateKey(occurrence);
      const members = variants.get(key) ?? [];
      members.push(occurrence);
      variants.set(key, members);
    }
    const sortedVariants = [...variants.entries()]
      .map(([key, members]) => ({
        key,
        coordinate: centroid(members),
        occurrenceCount: members.length,
        routeCount: new Set(members.map((member) => member.routeId)).size,
        routes: [...new Set(members.map((member) => member.routeId))].sort(),
      }))
      .sort((left, right) => right.routeCount - left.routeCount || right.occurrenceCount - left.occurrenceCount);
    const storedAccessCoordinate = sortedVariants[0]?.coordinate ?? null;
    const authoritativeCandidates = occurrences.flatMap((occurrence) =>
      (authoritativeByRouteAndName.get(`${occurrence.routeId}:${normalize(occurrence.name)}`) ?? [])
        .filter((candidate) => authoritativeCandidateNameMatches(displayName, candidate, accessNamesAgree))
        .filter((candidate) => authoritativeWaterbodyFitsOccurrence(occurrence, candidate)));
    const uniqueAuthoritative = new Map(authoritativeCandidates.map((candidate) => [`${candidate.provider}:${candidate.featureId}`, candidate]));
    const authoritativeWithDistance = [...uniqueAuthoritative.values()]
      .map((candidate) => ({
        ...candidate,
        distanceFromStoredFeet: storedAccessCoordinate ? distanceFeet(storedAccessCoordinate, candidate) : null,
      }))
      .sort((left, right) => {
        const rolePriority = (role: 'authoritative-water-entry' | 'authoritative-access-anchor' | 'authoritative-area-anchor' | undefined) => role === 'authoritative-water-entry'
          ? 0
          : role === 'authoritative-access-anchor' ? 1 : 2;
        // Match the closest source-backed feature first. A nearby wet-edge
        // control must not override an exact parking/carry anchor, while an
        // exact water-entry coordinate still wins when it is actually nearer.
        return (left.distanceFromStoredFeet ?? Infinity) - (right.distanceFromStoredFeet ?? Infinity)
          || rolePriority(left.coordinateRole) - rolePriority(right.coordinateRole);
      });
    const authoritativeAreaAnchor = authoritativeWithDistance
      .find((candidate) => candidate.coordinateRole === 'authoritative-area-anchor'
        && authoritativeCandidateNameMatches(displayName, candidate, accessFacilityIdentitiesAgree)) ?? null;
    const authoritativeFacilityAnchor = authoritativeWithDistance
      .find((candidate) => candidate.coordinateRole === 'authoritative-access-anchor'
        && authoritativeCandidateNameMatches(displayName, candidate, accessFacilityIdentitiesAgree)) ?? null;
    const authoritativeAccess = authoritativeWithDistance
      .find((candidate) => candidate.coordinateRole !== 'authoritative-area-anchor'
        && authoritativeCandidateNameMatches(displayName, candidate, accessFacilityIdentitiesAgree)) ?? null;
    const storedCoordinateIsAreaAnchor = occurrences.some((occurrence) => occurrence.coordinateEvidenceRole === 'authoritative-area-anchor')
      || Boolean(authoritativeAreaAnchor
        && (authoritativeAreaAnchor.distanceFromStoredFeet ?? Infinity) <= Math.max(25, authoritativeAreaAnchor.uncertaintyFeet ?? 25));
    const areaAnchorOnly = storedCoordinateIsAreaAnchor && authoritativeAccess === null;
    const authoritativeAccessMismatchFeet = authoritativeAccess && authoritativeAccess.coordinateRole !== 'authoritative-water-entry'
      ? authoritativeAccess.distanceFromStoredFeet
      : null;
    // An exact named government access more than a mile from every repeated
    // app occurrence is an identity contradiction, not a parking-to-water
    // offset. Do not allow those mutually copied app coordinates to validate
    // one another merely because they are close to some river segment.
    const authoritativeAccessIdentityMismatch = Boolean(authoritativeAccess
      && authoritativeAccess.coordinateRole !== 'authoritative-water-entry'
      && (authoritativeAccessMismatchFeet ?? 0) > Math.max(5280, (authoritativeAccess.parkingToAccessFeet ?? 0) + 1000));
    // Public parking/carry/campground anchors prove site identity, not wet-edge
    // position. Keep them in the access registry but never use them to derive a
    // water-entry consensus coordinate.
    const trusted = occurrences.filter((occurrence) =>
      occurrence.coordinateEvidenceRole !== 'authoritative-area-anchor'
      && occurrence.coordinateEvidenceRole !== 'authoritative-access-anchor'
      && !authoritativeAccessIdentityMismatch
      && (occurrence.auditSeverity === 'ok'
        || (occurrence.auditSeverity === 'review' && (occurrence.distanceFeetToMatchedRiver ?? Infinity) <= 300)
        || occurrence.endpointOnWaterbody === true));
    const consensus = largestConsensusCluster(trusted, 150);
    const consensusRoutes = new Set(consensus.map((point) => point.routeId)).size;
    const exactOnRiver = consensus.some((point) => point.auditSeverity === 'ok' && (point.distanceFeetToMatchedRiver ?? Infinity) <= 100);
    const waterbodyConfirmed = consensus.some((point) => point.endpointOnWaterbody === true);
    const separationFeet = maxSeparation(occurrences);
    const preliminaryCoordinateStatus = classifyCoordinateStatus(separationFeet, variants.size, occurrences);
    const consensusCoordinate = consensus.length > 0 ? centroid(consensus) : null;
    const authoritativeResolvesDistinctLocation = authoritativeEvidenceResolvesDistinctLocation({
      preliminaryStatus: preliminaryCoordinateStatus,
      routeCount: new Set(occurrences.map((occurrence) => occurrence.routeId)).size,
      consensusRouteCount: consensusRoutes,
      consensusExactOnRiver: exactOnRiver,
      consensusWaterbodyConfirmed: waterbodyConfirmed,
      authoritativeAccessToConsensusFeet: authoritativeAccess && consensusCoordinate
        ? distanceFeet(authoritativeAccess, consensusCoordinate)
        : null,
    });
    const coordinateStatus = authoritativeResolvesDistinctLocation ? 'conflict' : preliminaryCoordinateStatus;
    const accessCoordinate = coordinateStatus === 'distinct-locations' || areaAnchorOnly
      ? null
      : authoritativeFacilityAnchor
        ? { latitude: authoritativeFacilityAnchor.latitude, longitude: authoritativeFacilityAnchor.longitude }
        : authoritativeAccess
          ? { latitude: authoritativeAccess.latitude, longitude: authoritativeAccess.longitude }
        : storedAccessCoordinate;
    const authoritativeWaterEntry = coordinateStatus !== 'distinct-locations' && authoritativeAccess?.coordinateRole === 'authoritative-water-entry'
      ? { latitude: authoritativeAccess.latitude, longitude: authoritativeAccess.longitude }
      : null;
    const waterEntryCoordinate = coordinateStatus === 'distinct-locations' || areaAnchorOnly || authoritativeAccessIdentityMismatch
      ? null
      : authoritativeWaterEntry ?? (consensusRoutes >= 2 || exactOnRiver ? consensusCoordinate : null);
    const verificationStatus = coordinateStatus === 'conflict'
      ? 'conflict'
      : coordinateStatus === 'distinct-locations' ? 'ambiguous-name'
      : areaAnchorOnly ? 'area-anchor-only'
      : authoritativeAccessIdentityMismatch ? 'authoritative-access-mismatch'
      : authoritativeWaterEntry ? 'authoritative-water-entry'
        : waterEntryCoordinate ? 'derived-consensus' : 'unverified';
    return {
      id: `${slug(state)}--${slug(displayName)}`,
      state,
      name: displayName,
      aliases: [...new Set(occurrences.map((occurrence) => occurrence.name))].sort(),
      sourceIds: [...new Set(occurrences.map((occurrence) => occurrence.sourceId).filter(Boolean))].sort(),
      storedAccessCoordinate,
      accessCoordinate,
      accessCoordinateSource: areaAnchorOnly
        ? 'official-area-anchor-not-access'
        : authoritativeFacilityAnchor?.provider ?? authoritativeAccess?.provider ?? 'stored-route-consensus',
      authoritativeAccess,
      authoritativeFacilityAnchor,
      authoritativeAreaAnchor,
      storedCoordinateIsAreaAnchor,
      authoritativeAccessIdentityMismatch,
      authoritativeAccessMismatchFeet: authoritativeAccessMismatchFeet === null
        ? null
        : Math.round(authoritativeAccessMismatchFeet),
      waterEntryCoordinate,
      waterEntryConsensusRouteCount: consensusRoutes,
      waterEntryExactOnRiver: exactOnRiver,
      waterEntryWaterbodyConfirmed: waterbodyConfirmed,
      authoritativeResolvesDistinctLocation,
      coordinateStatus,
      verificationStatus,
      maximumSeparationFeet: Math.round(separationFeet),
      occurrenceCount: occurrences.length,
      routeCount: new Set(occurrences.map((occurrence) => occurrence.routeId)).size,
      coordinateVariants: sortedVariants,
      occurrences: occurrences.sort((left, right) => left.routeId.localeCompare(right.routeId) || left.endpoint.localeCompare(right.endpoint)),
    };
  }).sort((left, right) => left.state.localeCompare(right.state) || left.name.localeCompare(right.name));

  const summary = {
    entryCount: entries.length,
    repeatedEntryCount: entries.filter((entry) => entry.routeCount > 1).length,
    conflictCount: entries.filter((entry) => entry.coordinateStatus === 'conflict').length,
    distinctLocationNameCount: entries.filter((entry) => entry.coordinateStatus === 'distinct-locations').length,
    derivedWaterEntryCount: entries.filter((entry) => entry.waterEntryCoordinate !== null).length,
    authoritativeAccessCount: entries.filter((entry) => entry.authoritativeAccess !== null).length,
    authoritativeWaterEntryCount: entries.filter((entry) => entry.verificationStatus === 'authoritative-water-entry').length,
    areaAnchorOnlyCount: entries.filter((entry) => entry.verificationStatus === 'area-anchor-only').length,
    authoritativeAccessMismatchCount: entries.filter((entry) => entry.verificationStatus === 'authoritative-access-mismatch').length,
  };
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), auditGeneratedAt: audit?.generatedAt ?? null, summary, entries }, null, 2)}\n`);
  console.log(`Generated ${path.relative(root, outputPath)} with ${entries.length} canonical access entries.`);
  console.log(JSON.stringify(summary));
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
