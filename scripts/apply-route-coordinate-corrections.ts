import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

type Correction = {
  routeId: string;
  endpoint: 'putIn' | 'takeOut' | 'accessPoint';
  endpointName: string;
  latitude: number;
  longitude: number;
};

type SuggestionCandidate = {
  kind?: string;
  latitude: number;
  longitude: number;
  autoApplyEligible?: boolean;
  score?: number;
  confidence?: string;
  sourceUrl?: string;
  distanceFeet?: number | null;
  matchedRiverPointDistanceFeet?: number | null;
  routeGeometryDistanceFeet?: number | null;
  routeGeometryReliable?: boolean;
  routeAxisFraction?: number | null;
  osmConsensusRouteCount?: number;
  officialAccessAgreement?: unknown;
  authoritativeWaterEntry?: unknown;
  candidateHydrography?: unknown;
  evidence?: unknown[];
};

type SuggestionItem = {
  routeId: string;
  endpoint: Correction['endpoint'];
  endpointName: string;
  current?: { latitude: number; longitude: number };
  autoApplyEligible?: boolean;
  recommended?: SuggestionCandidate | null;
};

const root = process.cwd();
const sourceDirs = [path.join(root, 'src', 'data', 'routes'), path.join(root, 'src', 'data', 'trip-details')];
const args = new Set(process.argv.slice(2));
const safeSuggestionMode = args.has('--safe-suggestions');
const inputPath = path.resolve(root, process.argv.slice(2).find((arg) => !arg.startsWith('--'))
  ?? (safeSuggestionMode ? 'docs/route-coordinate-suggestions.json' : 'route-coordinate-corrections.json'));

function numberPattern(value: number) {
  return value.toFixed(14).replace(/0+$/, '').replace(/\.$/, '');
}

function replacePoint(text: string, start: number, end: number, correction: Correction) {
  const block = text.slice(start, end);
  const pointPattern = /(\"latitude\"\s*:\s*)(-?\d+(?:\.\d+)?)(\s*,\s*\"longitude\"\s*:\s*)(-?\d+(?:\.\d+)?)/;
  if (!pointPattern.test(block)) return null;
  const updated = block.replace(pointPattern, `$1${numberPattern(correction.latitude)}$3${numberPattern(correction.longitude)}`);
  return text.slice(0, start) + updated + text.slice(end);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateRouteFile(text: string, correction: Correction) {
  const routeStart = text.indexOf(`"id": "${correction.routeId}"`);
  if (routeStart < 0) return text;
  const nextRoute = text.indexOf('\n  {\n    "id":', routeStart + 1);
  const routeEnd = nextRoute < 0 ? text.length : nextRoute;
  const block = text.slice(routeStart, routeEnd);
  let updatedBlock = block;
  let sourceId: string | null = null;

  // The route's primary map anchor is its put-in. Keep that top-level pair in
  // sync, but never let a take-out or intermediate correction overwrite it.
  if (correction.endpoint === 'putIn') {
    const primary = replacePoint(updatedBlock, 0, updatedBlock.length, correction);
    if (primary) updatedBlock = primary;
  }

  // Current route records also carry structured putIn/takeOut and accessPoints
  // copies. Update the selected endpoint and then propagate through every
  // same-id or same-name occurrence inside this route object.
  if (correction.endpoint === 'putIn' || correction.endpoint === 'takeOut') {
    const pointStart = updatedBlock.indexOf(`"${correction.endpoint}": {`);
    if (pointStart >= 0) {
      const pointEnd = updatedBlock.indexOf('\n    }', pointStart);
      const pointBlock = updatedBlock.slice(pointStart, pointEnd >= 0 ? pointEnd + 6 : updatedBlock.length);
      sourceId = pointBlock.match(/"id"\s*:\s*"([^"]+)"/)?.[1] ?? null;
      const primary = replacePoint(updatedBlock, pointStart, updatedBlock.length, correction);
      if (primary) updatedBlock = primary;
    }
  }

  const namePattern = new RegExp(
    `("name"\\s*:\\s*"${escapeRegExp(correction.endpointName)}"[\\s\\S]*?"latitude"\\s*:\\s*)(-?\\d+(?:\\.\\d+)?)(\\s*,\\s*"longitude"\\s*:\\s*)(-?\\d+(?:\\.\\d+)?)`,
    'g',
  );
  updatedBlock = updatedBlock.replace(namePattern, `$1${numberPattern(correction.latitude)}$3${numberPattern(correction.longitude)}`);
  if (sourceId) {
    const idPattern = new RegExp(
      `("id"\\s*:\\s*"${escapeRegExp(sourceId)}"[\\s\\S]*?"latitude"\\s*:\\s*)(-?\\d+(?:\\.\\d+)?)(\\s*,\\s*"longitude"\\s*:\\s*)(-?\\d+(?:\\.\\d+)?)`,
      'g',
    );
    updatedBlock = updatedBlock.replace(idPattern, `$1${numberPattern(correction.latitude)}$3${numberPattern(correction.longitude)}`);
  }
  if (updatedBlock === block) return text;
  return text.slice(0, routeStart) + updatedBlock + text.slice(routeEnd);
}

function updateTripDetailsFile(text: string, correction: Correction) {
  const routeStart = text.indexOf(`"${correction.routeId}": {`);
  if (routeStart < 0) return text;
  const nextRoute = text.indexOf('\n  "', routeStart + 2);
  const routeEnd = nextRoute < 0 ? text.length : nextRoute;
  const block = text.slice(routeStart, routeEnd);
  let updatedBlock = block;
  let sourceId: string | null = null;
  if (correction.endpoint === 'putIn' || correction.endpoint === 'takeOut') {
    const pointStart = block.indexOf(`"${correction.endpoint}": {`);
    if (pointStart < 0) return text;
    const pointEnd = block.indexOf('\n    }', pointStart);
    const pointBlock = block.slice(pointStart, pointEnd >= 0 ? pointEnd + 6 : block.length);
    sourceId = pointBlock.match(/"id"\s*:\s*"([^"]+)"/)?.[1] ?? null;
    const primary = replacePoint(block, pointStart, block.length, correction);
    if (!primary) return text;
    updatedBlock = primary.slice(0);
  }

  // The same named access is often repeated in accessPoints. Keep every
  // occurrence synchronized with the accepted endpoint correction.
  const namePattern = new RegExp(
    `(\\"name\\"\\s*:\\s*\\"${escapeRegExp(correction.endpointName)}\\"[\\s\\S]*?\\"latitude\\"\\s*:\\s*)(-?\\d+(?:\\.\\d+)?)(\\s*,\\s*\\"longitude\\"\\s*:\\s*)(-?\\d+(?:\\.\\d+)?)`,
    'g',
  );
  updatedBlock = updatedBlock.replace(namePattern, `$1${numberPattern(correction.latitude)}$3${numberPattern(correction.longitude)}`);
  // Display names can vary between a primary endpoint and the same launch in
  // accessPoints. The stable access id is the stronger identity signal; keep
  // every same-route occurrence synchronized when the accepted correction came
  // from a primary endpoint.
  if (sourceId) {
    const idPattern = new RegExp(
      `(\"id\"\\s*:\\s*\"${escapeRegExp(sourceId)}\"[\\s\\S]*?\"latitude\"\\s*:\\s*)(-?\\d+(?:\\.\\d+)?)(\\s*,\\s*\"longitude\"\\s*:\\s*)(-?\\d+(?:\\.\\d+)?)`,
      'g',
    );
    updatedBlock = updatedBlock.replace(idPattern, `$1${numberPattern(correction.latitude)}$3${numberPattern(correction.longitude)}`);
  }
  if (updatedBlock === block) return text;
  return text.slice(0, routeStart) + updatedBlock + text.slice(routeEnd);
}

async function main() {
  const input = JSON.parse(await readFile(inputPath, 'utf8')) as Correction[] | { items?: SuggestionItem[] };
  const selectedSuggestions = safeSuggestionMode && !Array.isArray(input)
    ? (input.items ?? []).filter((item) => item.autoApplyEligible && item.recommended?.autoApplyEligible)
    : [];
  const corrections: Correction[] = safeSuggestionMode
    ? selectedSuggestions
      .map((item) => ({
        routeId: item.routeId,
        endpoint: item.endpoint,
        endpointName: item.endpointName,
        latitude: item.recommended!.latitude,
        longitude: item.recommended!.longitude,
      }))
    : Array.isArray(input) ? input : [];
  if (corrections.length === 0) {
    if (safeSuggestionMode) {
      console.log('No suggestions satisfy the autonomous-apply safety gate; no source files changed.');
      return;
    }
    throw new Error('Correction file is empty or invalid.');
  }
  const files = (await Promise.all(sourceDirs.map(async (dir) => (await readdir(dir)).filter((file) => file.endsWith('.ts')).map((file) => path.join(dir, file))))).flat();
  const staged = new Map(await Promise.all(files.map(async (file) => [file, await readFile(file, 'utf8')] as const)));
  const changed = new Set<string>();
  for (const correction of corrections) {
    if (!Number.isFinite(correction.latitude) || !Number.isFinite(correction.longitude)) throw new Error(`Invalid coordinates for ${correction.routeId}/${correction.endpoint}.`);
    let applied = false;
    for (const file of files) {
      const original = staged.get(file)!;
      const updated = file.includes(`${path.sep}routes${path.sep}`)
        ? updateRouteFile(original, correction)
        : updateTripDetailsFile(original, correction);
      if (updated !== original) {
        staged.set(file, updated);
        changed.add(file);
        applied = true;
      }
    }
    if (!applied) throw new Error(`Could not locate ${correction.routeId}/${correction.endpointName} in source data.`);
  }
  for (const file of changed) await writeFile(file, staged.get(file)!);

  // Record history only after every target has resolved and every staged source
  // edit has been written. Preserve the evidence snapshot because the live
  // suggestions file is regenerated after a successful correction.
  if (safeSuggestionMode) {
    const historyPath = path.join(root, 'docs', 'route-coordinate-auto-corrections.json');
    const correctionRecords = selectedSuggestions.map((item) => ({
      routeId: item.routeId,
      endpoint: item.endpoint,
      endpointName: item.endpointName,
      latitude: item.recommended!.latitude,
      longitude: item.recommended!.longitude,
      previousCoordinate: item.current ?? null,
      evidenceSnapshot: {
        candidateKind: item.recommended!.kind ?? null,
        score: item.recommended!.score ?? null,
        confidence: item.recommended!.confidence ?? null,
        sourceUrl: item.recommended!.sourceUrl ?? null,
        distanceFeet: item.recommended!.distanceFeet ?? null,
        matchedRiverPointDistanceFeet: item.recommended!.matchedRiverPointDistanceFeet ?? null,
        routeGeometryDistanceFeet: item.recommended!.routeGeometryDistanceFeet ?? null,
        routeGeometryReliable: item.recommended!.routeGeometryReliable ?? null,
        routeAxisFraction: item.recommended!.routeAxisFraction ?? null,
        osmConsensusRouteCount: item.recommended!.osmConsensusRouteCount ?? null,
        officialAccessAgreement: item.recommended!.officialAccessAgreement ?? null,
        authoritativeWaterEntry: item.recommended!.authoritativeWaterEntry ?? null,
        candidateHydrography: item.recommended!.candidateHydrography ?? null,
        evidence: item.recommended!.evidence ?? [],
      },
    }));
    const batch = {
      appliedAt: new Date().toISOString(),
      suggestionSource: path.relative(root, inputPath),
      safetyGate: 'Recommended candidate is explicitly autoApplyEligible after shared-conflict, named-access, and route-geometry checks.',
      count: correctionRecords.length,
      corrections: correctionRecords,
    };
    type HistoryBatch = typeof batch | { appliedAt: string; suggestionSource: string; safetyGate: string; count: number; corrections: Correction[] };
    let batches: HistoryBatch[] = [];
    try {
      const previous = JSON.parse(await readFile(historyPath, 'utf8')) as { batches?: HistoryBatch[]; generatedAt?: string; appliedAt?: string; suggestionSource?: string; safetyGate?: string; count?: number; corrections?: Correction[] };
      batches = previous.batches ?? (previous.corrections ? [{
        appliedAt: previous.appliedAt ?? previous.generatedAt ?? 'unknown',
        suggestionSource: previous.suggestionSource ?? 'unknown',
        safetyGate: previous.safetyGate ?? 'legacy autonomous safety gate',
        count: previous.count ?? previous.corrections.length,
        corrections: previous.corrections,
      }] : []);
    } catch {
      // First autonomous batch.
    }
    batches.push(batch);
    await writeFile(historyPath, `${JSON.stringify({
      updatedAt: batch.appliedAt,
      batchCount: batches.length,
      totalCorrectionCount: batches.reduce((sum, item) => sum + item.count, 0),
      batches,
    }, null, 2)}\n`);
  }
  console.log(`Applied ${corrections.length} correction(s) across ${changed.size} source file(s).`);
}

main().catch((error: unknown) => { console.error(error instanceof Error ? error.message : error); process.exit(1); });
