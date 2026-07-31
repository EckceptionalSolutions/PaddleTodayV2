import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

type Correction = {
  routeId: string;
  endpoint: 'putIn' | 'takeOut' | 'accessPoint';
  endpointName: string;
  latitude: number;
  longitude: number;
};

const root = process.cwd();
const sourceDirs = [path.join(root, 'src', 'data', 'routes'), path.join(root, 'src', 'data', 'trip-details')];
const inputPath = path.resolve(root, process.argv.slice(2).find((arg) => !arg.startsWith('--')) ?? 'route-coordinate-corrections.json');

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
  // Route records carry the primary put-in coordinate. Take-out and
  // intermediate coordinates live in trip-details and must not overwrite the
  // route's primary map anchor.
  if (correction.endpoint !== 'putIn') return text;
  const pointKey = correction.endpoint === 'putIn' ? 'latitude' : 'latitude';
  const pointStart = block.indexOf(`"${pointKey}"`);
  if (pointStart < 0) return text;
  const updated = replacePoint(text, routeStart + pointStart - 2, routeEnd, correction);
  return updated ?? text;
}

function updateTripDetailsFile(text: string, correction: Correction) {
  const routeStart = text.indexOf(`"${correction.routeId}": {`);
  if (routeStart < 0) return text;
  const nextRoute = text.indexOf('\n  "', routeStart + 2);
  const routeEnd = nextRoute < 0 ? text.length : nextRoute;
  const block = text.slice(routeStart, routeEnd);
  let updatedBlock = block;
  if (correction.endpoint === 'putIn' || correction.endpoint === 'takeOut') {
    const pointStart = block.indexOf(`"${correction.endpoint}": {`);
    if (pointStart < 0) return text;
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
  if (updatedBlock === block) return text;
  return text.slice(0, routeStart) + updatedBlock + text.slice(routeEnd);
}

async function main() {
  const corrections = JSON.parse(await readFile(inputPath, 'utf8')) as Correction[];
  if (!Array.isArray(corrections) || corrections.length === 0) throw new Error('Correction file is empty or invalid.');
  const files = (await Promise.all(sourceDirs.map(async (dir) => (await readdir(dir)).filter((file) => file.endsWith('.ts')).map((file) => path.join(dir, file))))).flat();
  const changed = new Set<string>();
  for (const correction of corrections) {
    if (!Number.isFinite(correction.latitude) || !Number.isFinite(correction.longitude)) throw new Error(`Invalid coordinates for ${correction.routeId}/${correction.endpoint}.`);
    let applied = false;
    for (const file of files) {
      const original = await readFile(file, 'utf8');
      const updated = file.includes(`${path.sep}routes${path.sep}`)
        ? updateRouteFile(original, correction)
        : updateTripDetailsFile(original, correction);
      if (updated !== original) {
        await writeFile(file, updated);
        changed.add(file);
        applied = true;
      }
    }
    if (!applied) throw new Error(`Could not locate ${correction.routeId}/${correction.endpointName} in source data.`);
  }
  console.log(`Applied ${corrections.length} correction(s) across ${changed.size} source file(s).`);
}

main().catch((error: unknown) => { console.error(error instanceof Error ? error.message : error); process.exit(1); });
