import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

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
  severity: string;
  note: string;
};

type AuditReport = { generatedAt: string; endpoints: Endpoint[] };
const root = process.cwd();
const reportPath = path.join(root, 'docs', 'route-coordinate-river-audit.json');
const outputPath = path.join(root, 'docs', 'route-coordinate-suggestions.json');

function confidence(distanceFeet: number | null) {
  if (distanceFeet === null) return 'none';
  if (distanceFeet <= 300) return 'high';
  if (distanceFeet <= 800) return 'medium';
  return 'low';
}

function candidate(endpoint: Endpoint, kind: string, name: string | null, latitude: number | null, longitude: number | null, distanceFeet: number | null) {
  if (latitude === null || longitude === null) return null;
  return { kind, name, latitude, longitude, distanceFeet, confidence: confidence(distanceFeet) };
}

async function main() {
  const report = JSON.parse(await readFile(reportPath, 'utf8')) as AuditReport;
  const items = report.endpoints
    .filter((endpoint) => endpoint.severity === 'failure')
    .map((endpoint) => {
      const candidates = [
        candidate(endpoint, 'matched-river-centerline', endpoint.matchedRiverName, endpoint.nearestMatchedLatitude, endpoint.nearestMatchedLongitude, endpoint.distanceFeetToMatchedRiver),
        candidate(endpoint, 'nearest-named-waterway', endpoint.nearestWaterwayName, endpoint.nearestWaterwayLatitude, endpoint.nearestWaterwayLongitude, endpoint.distanceFeetToNearestWaterway),
        candidate(endpoint, 'nearest-nhd-waterbody', endpoint.nearestWaterbodyName, endpoint.nearestWaterbodyLatitude, endpoint.nearestWaterbodyLongitude, endpoint.distanceFeetToNearestWaterbody),
      ].filter((value): value is NonNullable<typeof value> => value !== null);
      return {
        routeId: endpoint.routeId,
        routeName: endpoint.routeName,
        reach: endpoint.reach,
        state: endpoint.state,
        endpoint: endpoint.endpoint,
        endpointName: endpoint.endpointName,
        current: { latitude: endpoint.latitude, longitude: endpoint.longitude },
        reason: endpoint.note,
        candidates: candidates.sort((left, right) => (left.distanceFeet ?? Infinity) - (right.distanceFeet ?? Infinity)),
        // Prefer the route's matched river even when another water feature is
        // geographically closer; a nearby creek/pond is not a valid automatic
        // replacement for a river endpoint.
        recommended: candidates.find((item) => item.kind === 'matched-river-centerline')
          ?? candidates.find((item) => item.kind === 'nearest-named-waterway')
          ?? candidates[0]
          ?? null,
      };
    });
  await writeFile(outputPath, `${JSON.stringify({ generatedAt: report.generatedAt, count: items.length, items }, null, 2)}\n`);
  console.log(`Generated ${path.relative(root, outputPath)} with ${items.length} suggested correction(s).`);
}

main().catch((error: unknown) => { console.error(error instanceof Error ? error.message : error); process.exit(1); });
