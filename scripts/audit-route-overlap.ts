import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { rivers } from '../src/data/rivers';
import { riverTripDetails } from '../src/data/river-trip-details';
import type { River, RiverAccessPoint } from '../src/lib/types';

type Point = { latitude: number; longitude: number };
type FindingType =
  | 'duplicate_or_reversed'
  | 'crossing_segments'
  | 'contained_connector'
  | 'near_collinear_overlap'
  | 'shared_endpoint';

interface RouteSegment {
  route: AuditRoute;
  index: number;
  start: Point;
  end: Point;
  lengthMi: number;
  bearing: number;
}

interface AuditRoute {
  id: string;
  slug: string;
  name: string;
  reach: string;
  state: string;
  routeType: string;
  points: Point[];
  segments: RouteSegment[];
  endpointStart: Point;
  endpointEnd: Point;
  straightLineMi: number;
  source: 'accessPoints' | 'putInTakeOut';
}

interface Finding {
  type: FindingType;
  severity: number;
  a: AuditRoute;
  b: AuditRoute;
  detail: string;
}

const root = process.cwd();
const outputDir = path.join(root, 'tmp');
const csvPath = path.join(outputDir, 'route-overlap-audit.csv');
const markdownPath = path.join(outputDir, 'route-overlap-audit.md');

const earthRadiusMiles = 3958.8;
const endpointMatchMi = 0.08;
const sharedEndpointMi = 0.18;
const containedEndpointDistMi = 0.3;
const collinearEndpointDistMi = 0.22;
const collinearAngleDeg = 12;

function degreesToRadians(value: number) {
  return (value * Math.PI) / 180;
}

function radiansToDegrees(value: number) {
  return (value * 180) / Math.PI;
}

function distanceMiles(left: Point, right: Point) {
  const deltaLat = degreesToRadians(right.latitude - left.latitude);
  const deltaLon = degreesToRadians(right.longitude - left.longitude);
  const leftLat = degreesToRadians(left.latitude);
  const rightLat = degreesToRadians(right.latitude);
  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(leftLat) * Math.cos(rightLat) * Math.sin(deltaLon / 2) ** 2;

  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(haversine));
}

function bearingDegrees(start: Point, end: Point) {
  const startLat = degreesToRadians(start.latitude);
  const endLat = degreesToRadians(end.latitude);
  const deltaLon = degreesToRadians(end.longitude - start.longitude);
  const y = Math.sin(deltaLon) * Math.cos(endLat);
  const x =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(deltaLon);

  return (radiansToDegrees(Math.atan2(y, x)) + 360) % 360;
}

function angleDiff(left: number, right: number) {
  const diff = Math.abs(left - right) % 360;
  return diff > 180 ? 360 - diff : diff;
}

function pointFromAccess(point: RiverAccessPoint | undefined): Point | null {
  if (!point || !Number.isFinite(point.latitude) || !Number.isFinite(point.longitude)) return null;
  return { latitude: point.latitude, longitude: point.longitude };
}

function dedupeConsecutivePoints(points: Point[]) {
  const result: Point[] = [];
  for (const point of points) {
    const previous = result[result.length - 1];
    if (!previous || distanceMiles(previous, point) > 0.01) {
      result.push(point);
    }
  }
  return result;
}

function enrichedRoute(route: River): River {
  const tripDetails = riverTripDetails[route.id];
  return tripDetails ? { ...route, ...tripDetails } : route;
}

function routePoints(route: River): { points: Point[]; source: AuditRoute['source'] } | null {
  const sortedAccessPoints = route.accessPoints
    ?.map((point) => ({ point, coordinate: pointFromAccess(point) }))
    .filter((entry): entry is { point: NonNullable<typeof route.accessPoints>[number]; coordinate: Point } => entry.coordinate !== null)
    .sort((left, right) => left.point.mileFromStart - right.point.mileFromStart)
    .map((entry) => entry.coordinate);

  if (sortedAccessPoints && sortedAccessPoints.length >= 2) {
    return { points: dedupeConsecutivePoints(sortedAccessPoints), source: 'accessPoints' };
  }

  const endpoints = [pointFromAccess(route.putIn), pointFromAccess(route.takeOut)].filter((point): point is Point => point !== null);
  if (endpoints.length >= 2) {
    return { points: dedupeConsecutivePoints(endpoints), source: 'putInTakeOut' };
  }

  return null;
}

function buildRoute(route: River): AuditRoute | null {
  const enriched = enrichedRoute(route);
  const pointSet = routePoints(enriched);
  if (!pointSet || pointSet.points.length < 2) return null;

  const auditRoute: AuditRoute = {
    id: route.id,
    slug: route.slug,
    name: route.name,
    reach: route.reach,
    state: route.state,
    routeType: route.routeType ?? 'recreational',
    points: pointSet.points,
    segments: [],
    endpointStart: pointSet.points[0],
    endpointEnd: pointSet.points[pointSet.points.length - 1],
    straightLineMi: distanceMiles(pointSet.points[0], pointSet.points[pointSet.points.length - 1]),
    source: pointSet.source,
  };

  auditRoute.segments = pointSet.points.slice(1).map((end, index) => {
    const start = pointSet.points[index];
    return {
      route: auditRoute,
      index,
      start,
      end,
      lengthMi: distanceMiles(start, end),
      bearing: bearingDegrees(start, end),
    };
  });

  return auditRoute;
}

function normalizeName(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(?:the|river|creek|water|trail|route|fork|branch)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasSharedScope(a: AuditRoute, b: AuditRoute) {
  if (a.state !== b.state) return false;
  const aName = normalizeName(a.name);
  const bName = normalizeName(b.name);
  if (aName && bName && aName === bName) return true;

  const aTokens = new Set(`${aName} ${normalizeName(a.reach)}`.split(' ').filter(Boolean));
  let overlap = 0;
  for (const token of `${bName} ${normalizeName(b.reach)}`.split(' ').filter(Boolean)) {
    if (aTokens.has(token)) overlap += 1;
  }
  return overlap >= 2;
}

function projectPointToSegment(point: Point, start: Point, end: Point) {
  const latitudeScale = 69;
  const longitudeScale = Math.cos(degreesToRadians(point.latitude)) * 69.172;

  const px = point.longitude * longitudeScale;
  const py = point.latitude * latitudeScale;
  const sx = start.longitude * longitudeScale;
  const sy = start.latitude * latitudeScale;
  const ex = end.longitude * longitudeScale;
  const ey = end.latitude * latitudeScale;

  const dx = ex - sx;
  const dy = ey - sy;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0) {
    return { distanceMi: distanceMiles(point, start), t: 0 };
  }

  const t = Math.max(0, Math.min(1, ((px - sx) * dx + (py - sy) * dy) / lengthSquared));
  const projected = {
    longitude: (sx + t * dx) / longitudeScale,
    latitude: (sy + t * dy) / latitudeScale,
  };
  return { distanceMi: distanceMiles(point, projected), t };
}

function orientation(a: Point, b: Point, c: Point) {
  const value =
    (b.longitude - a.longitude) * (c.latitude - a.latitude) -
    (b.latitude - a.latitude) * (c.longitude - a.longitude);
  if (Math.abs(value) < 1e-12) return 0;
  return value > 0 ? 1 : -1;
}

function segmentsCross(a: RouteSegment, b: RouteSegment) {
  if (
    distanceMiles(a.start, b.start) <= sharedEndpointMi ||
    distanceMiles(a.start, b.end) <= sharedEndpointMi ||
    distanceMiles(a.end, b.start) <= sharedEndpointMi ||
    distanceMiles(a.end, b.end) <= sharedEndpointMi
  ) {
    return false;
  }

  const o1 = orientation(a.start, a.end, b.start);
  const o2 = orientation(a.start, a.end, b.end);
  const o3 = orientation(b.start, b.end, a.start);
  const o4 = orientation(b.start, b.end, a.end);
  return o1 !== o2 && o3 !== o4;
}

function endpointDistances(a: AuditRoute, b: AuditRoute) {
  return [
    { label: 'start-start', miles: distanceMiles(a.endpointStart, b.endpointStart) },
    { label: 'start-end', miles: distanceMiles(a.endpointStart, b.endpointEnd) },
    { label: 'end-start', miles: distanceMiles(a.endpointEnd, b.endpointStart) },
    { label: 'end-end', miles: distanceMiles(a.endpointEnd, b.endpointEnd) },
  ];
}

function minPointToRouteDistance(point: Point, route: AuditRoute) {
  return route.segments.reduce(
    (best, segment) => {
      const projected = projectPointToSegment(point, segment.start, segment.end);
      return projected.distanceMi < best.distanceMi ? projected : best;
    },
    { distanceMi: Number.POSITIVE_INFINITY, t: 0 },
  );
}

function addFinding(findings: Finding[], finding: Finding) {
  const ids = [finding.a.id, finding.b.id].sort().join('|');
  const key = `${finding.type}|${ids}`;
  if (findings.some((existing) => `${existing.type}|${[existing.a.id, existing.b.id].sort().join('|')}` === key)) return;
  findings.push(finding);
}

function analyzePair(a: AuditRoute, b: AuditRoute, findings: Finding[]) {
  if (!hasSharedScope(a, b)) return;

  const endpointMatches = endpointDistances(a, b).filter((entry) => entry.miles <= endpointMatchMi);
  const sharedEndpoints = endpointDistances(a, b).filter((entry) => entry.miles <= sharedEndpointMi);

  if (endpointMatches.length >= 2) {
    addFinding(findings, {
      type: 'duplicate_or_reversed',
      severity: 95,
      a,
      b,
      detail: `${endpointMatches.length} endpoint pairs are within ${endpointMatchMi} mi`,
    });
    return;
  }

  for (const aSegment of a.segments) {
    for (const bSegment of b.segments) {
      if (segmentsCross(aSegment, bSegment)) {
        addFinding(findings, {
          type: 'crossing_segments',
          severity: 85,
          a,
          b,
          detail: `segment ${aSegment.index + 1} crosses segment ${bSegment.index + 1}`,
        });
      }
    }
  }

  const aContained =
    [a.endpointStart, a.endpointEnd].every((point) => minPointToRouteDistance(point, b).distanceMi <= containedEndpointDistMi) &&
    a.straightLineMi < b.straightLineMi * 0.95;
  const bContained =
    [b.endpointStart, b.endpointEnd].every((point) => minPointToRouteDistance(point, a).distanceMi <= containedEndpointDistMi) &&
    b.straightLineMi < a.straightLineMi * 0.95;

  if (aContained || bContained) {
    addFinding(findings, {
      type: 'contained_connector',
      severity: 80,
      a,
      b,
      detail: `${aContained ? a.slug : b.slug} appears spatially contained inside the other route span`,
    });
  }

  let bestCollinear: { angle: number; distanceMi: number } | null = null;
  for (const aSegment of a.segments) {
    for (const bSegment of b.segments) {
      const angle = angleDiff(aSegment.bearing, bSegment.bearing);
      const distanceMi = Math.min(
        projectPointToSegment(aSegment.start, bSegment.start, bSegment.end).distanceMi,
        projectPointToSegment(aSegment.end, bSegment.start, bSegment.end).distanceMi,
        projectPointToSegment(bSegment.start, aSegment.start, aSegment.end).distanceMi,
        projectPointToSegment(bSegment.end, aSegment.start, aSegment.end).distanceMi,
      );
      if (
        angle <= collinearAngleDeg &&
        distanceMi <= collinearEndpointDistMi &&
        (!bestCollinear || distanceMi < bestCollinear.distanceMi)
      ) {
        bestCollinear = { angle, distanceMi };
      }
    }
  }

  if (bestCollinear) {
    addFinding(findings, {
      type: 'near_collinear_overlap',
      severity: 70,
      a,
      b,
      detail: `angle ${bestCollinear.angle.toFixed(1)} deg; nearest segment distance ${bestCollinear.distanceMi.toFixed(2)} mi`,
    });
  }

  if (sharedEndpoints.length === 1) {
    addFinding(findings, {
      type: 'shared_endpoint',
      severity: 25,
      a,
      b,
      detail: `${sharedEndpoints[0].label} within ${sharedEndpoints[0].miles.toFixed(2)} mi`,
    });
  }
}

function csvEscape(value: string | number) {
  const text = String(value);
  if (!/[",\n]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

function routeLabel(route: AuditRoute) {
  return `${route.name} - ${route.reach}`;
}

function groupKey(finding: Finding) {
  return `${finding.a.state} ${finding.a.name}`;
}

async function writeReports(routes: AuditRoute[], findings: Finding[]) {
  await mkdir(outputDir, { recursive: true });

  const sorted = findings.sort((left, right) => right.severity - left.severity || left.a.slug.localeCompare(right.a.slug));
  const counts = sorted.reduce<Record<FindingType, number>>((result, finding) => {
    result[finding.type] = (result[finding.type] ?? 0) + 1;
    return result;
  }, {} as Record<FindingType, number>);

  const rows = [
    [
      'severity',
      'type',
      'route_a',
      'route_b',
      'state',
      'name_a',
      'name_b',
      'reach_a',
      'reach_b',
      'source_a',
      'source_b',
      'detail',
    ],
    ...sorted.map((finding) => [
      finding.severity,
      finding.type,
      finding.a.slug,
      finding.b.slug,
      finding.a.state,
      finding.a.name,
      finding.b.name,
      finding.a.reach,
      finding.b.reach,
      finding.a.source,
      finding.b.source,
      finding.detail,
    ]),
  ];

  await writeFile(csvPath, rows.map((row) => row.map(csvEscape).join(',')).join('\n'));

  const highPriority = sorted.filter((finding) => finding.severity >= 70);
  const grouped = highPriority.reduce<Record<string, Finding[]>>((result, finding) => {
    const key = groupKey(finding);
    result[key] = result[key] ?? [];
    result[key].push(finding);
    return result;
  }, {});
  const reviewSets = Object.entries(grouped)
    .map(([group, groupFindings]) => {
      const routesInGroup = new Set<string>();
      const byType = groupFindings.reduce<Record<string, number>>((result, finding) => {
        result[finding.type] = (result[finding.type] ?? 0) + 1;
        routesInGroup.add(finding.a.slug);
        routesInGroup.add(finding.b.slug);
        return result;
      }, {});
      return {
        group,
        findings: groupFindings.length,
        routes: routesInGroup.size,
        maxSeverity: Math.max(...groupFindings.map((finding) => finding.severity)),
        byType,
      };
    })
    .sort((left, right) => right.maxSeverity - left.maxSeverity || right.findings - left.findings || left.group.localeCompare(right.group));

  const lines = [
    '# Route Overlap Audit',
    '',
    'This report flags suspicious route-span geometry in PaddleTodayV2. It uses ordered `accessPoints` when available, otherwise put-in/take-out coordinates.',
    '',
    `- Routes with drawable spans: ${routes.length}`,
    `- Total findings: ${sorted.length}`,
    `- High-priority findings: ${highPriority.length}`,
    '',
    '## Finding Counts',
    '',
    ...Object.entries(counts)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([type, count]) => `- ${type}: ${count}`),
    '',
    '## Review Set Summary',
    '',
    '| Route set | High-priority findings | Routes involved | Main signals |',
    '| --- | ---: | ---: | --- |',
    ...reviewSets
      .slice(0, 40)
      .map((set) => {
        const signals = Object.entries(set.byType)
          .sort(([left], [right]) => left.localeCompare(right))
          .map(([type, count]) => `${type}: ${count}`)
          .join('; ');
        return `| ${set.group} | ${set.findings} | ${set.routes} | ${signals} |`;
      }),
    reviewSets.length > 40 ? `| Additional sets omitted from summary | ${reviewSets.slice(40).reduce((total, set) => total + set.findings, 0)} | - | See detailed section below |` : '',
    '',
    '## High-Priority Route Sets',
    '',
  ];

  if (highPriority.length === 0) {
    lines.push('No high-priority overlap findings.');
  } else {
    for (const [group, groupFindings] of Object.entries(grouped).sort(([left], [right]) => left.localeCompare(right))) {
      lines.push(`### ${group}`, '');
      for (const finding of groupFindings) {
        lines.push(
          `- **${finding.type}** (${finding.severity}): \`${finding.a.slug}\` vs \`${finding.b.slug}\` - ${finding.detail}`,
          `  - ${routeLabel(finding.a)} (${finding.a.source})`,
          `  - ${routeLabel(finding.b)} (${finding.b.source})`,
        );
      }
      lines.push('');
    }
  }

  lines.push(
    '## Triage Guidance',
    '',
    '- Start with `duplicate_or_reversed`, `crossing_segments`, and `contained_connector` findings.',
    '- Treat `shared_endpoint` as informational; adjacent reaches often intentionally share an access.',
    '- Confirm fixes against route evidence before deleting, merging, or suppressing a route span.',
    '',
  );

  await writeFile(markdownPath, lines.join('\n'));
}

async function main() {
  const auditRoutes = rivers.map(buildRoute).filter((route): route is AuditRoute => route !== null);
  const findings: Finding[] = [];

  for (let left = 0; left < auditRoutes.length; left += 1) {
    for (let right = left + 1; right < auditRoutes.length; right += 1) {
      analyzePair(auditRoutes[left], auditRoutes[right], findings);
    }
  }

  await writeReports(auditRoutes, findings);

  const counts = findings.reduce<Record<string, number>>((result, finding) => {
    result[finding.type] = (result[finding.type] ?? 0) + 1;
    return result;
  }, {});
  console.log(`Route overlap audit: ${auditRoutes.length} route span(s), ${findings.length} finding(s).`);
  for (const [type, count] of Object.entries(counts).sort(([left], [right]) => left.localeCompare(right))) {
    console.log(`- ${type}: ${count}`);
  }
  console.log(`Wrote ${path.relative(root, csvPath)}`);
  console.log(`Wrote ${path.relative(root, markdownPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
