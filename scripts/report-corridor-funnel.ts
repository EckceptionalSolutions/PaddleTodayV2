import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

type EventRow = { event?: string; name?: string; event_name?: string; properties?: Record<string, unknown>; event_data?: Record<string, unknown> | string; event_params?: Array<{ key?: string; value?: { string_value?: string; int_value?: number; double_value?: number } }>; session_id?: string; user_id?: string; user_pseudo_id?: string };
type FunnelRow = { state: string; corridors: number; trips: number; routeOpens: number; tripConversion: string; routeConversion: string };

const root = process.cwd();
const inputPath = process.argv[2] ? join(root, process.argv[2]) : '';
const outputPath = join(root, 'docs', 'corridor-pilot-report.md');
const pilotStates = new Set(['Minnesota', 'Wisconsin', 'Iowa']);

async function main() {
  let events: EventRow[] = [];
  let source = 'No analytics export supplied; run with a JSON export path.';
  if (inputPath) {
    events = JSON.parse(await readFile(inputPath, 'utf8')) as EventRow[];
    source = `Source: ${process.argv[2]}`;
  }
  const rows = new Map<string, { corridors: Set<string>; trips: Set<string>; routeOpens: Set<string> }>();
  for (const [index, event] of events.entries()) {
    const name = event.event || event.name || event.event_name;
    if (name !== 'corridor_selected' && name !== 'corridor_trip_selected' && name !== 'route_opened' && name !== 'Route view') continue;
    const props = event.properties ?? (typeof event.event_data === 'string' ? JSON.parse(event.event_data) : event.event_data) ?? Object.fromEntries((event.event_params ?? []).filter((param) => param.key).map((param) => [param.key, param.value?.string_value ?? param.value?.int_value ?? param.value?.double_value]));
    const state = String(props.state || 'Unknown');
    if (!pilotStates.has(state)) continue;
    const corridor = String(props.corridor_id || 'unknown');
    const bucket = rows.get(state) ?? { corridors: new Set(), trips: new Set(), routeOpens: new Set() };
    const identity = String(event.session_id || event.user_id || event.user_pseudo_id || props.session_id || props.user_id || index);
    if (name === 'corridor_selected') bucket.corridors.add(`${corridor}:${identity}`);
    else if (name === 'corridor_trip_selected') bucket.trips.add(`${corridor}:${identity}`);
    else bucket.routeOpens.add(`${corridor}:${identity}`);
    rows.set(state, bucket);
  }
  const reportRows: FunnelRow[] = [...pilotStates].sort().map((state) => {
    const value = rows.get(state) ?? { corridors: new Set<string>(), trips: new Set<string>(), routeOpens: new Set<string>() };
    return {
      state,
      corridors: value.corridors.size,
      trips: value.trips.size,
      routeOpens: value.routeOpens.size,
      tripConversion: value.corridors.size ? `${Math.round(value.trips.size / value.corridors.size * 100)}%` : '-',
      routeConversion: value.corridors.size ? `${Math.round(value.routeOpens.size / value.corridors.size * 100)}%` : '-',
    };
  });
  const lines = [
    '# Corridor pilot funnel report', '', `Generated ${new Date().toISOString()}.`, source, '',
    'Conversion is trip-option selections divided by corridor selections. Use unique event/session identifiers in production exports for a true user-level funnel.', '',
    '| State | Corridor selections | Trip selections | Route-detail opens | Trip rate | Route-open rate |', '| --- | ---: | ---: | ---: | ---: | ---: |',
    ...reportRows.map((row) => `| ${row.state} | ${row.corridors} | ${row.trips} | ${row.routeOpens} | ${row.tripConversion} | ${row.routeConversion} |`),
    '', 'Pilot review focus: corridor-to-trip conversion, route-detail opens, backtracking, and zero-result interactions. Compare MN/WI/IA separately before expanding migration.', '',
  ];
  await writeFile(outputPath, lines.join('\n'));
  console.log(`Wrote ${outputPath}`);
}

main().catch((error) => { console.error(error); process.exit(1); });
