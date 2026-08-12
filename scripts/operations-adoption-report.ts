import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const outputDir = resolve(process.cwd(), 'docs/operations');
mkdirSync(outputDir, { recursive: true });
const inputPath = resolve(outputDir, 'adoption-events.json');
type Event = { name: string; at?: string; route?: string; state?: string; properties?: Record<string, unknown> };
const events: Event[] = existsSync(inputPath) ? JSON.parse(readFileSync(inputPath, 'utf8')) : [];
const counts = events.reduce<Record<string, number>>((result, event) => { result[event.name] = (result[event.name] ?? 0) + 1; return result; }, {});
const routeViews = events.filter((event) => event.name === 'Route view' || event.name === 'river_hub_viewed');
const noResults = events.filter((event) => event.name === 'river_hub_no_results');
const routes = noResults.reduce<Record<string, number>>((result, event) => { const key = event.route ?? String(event.properties?.river_id ?? 'unknown'); result[key] = (result[key] ?? 0) + 1; return result; }, {});
writeFileSync(resolve(outputDir, 'adoption-report.json'), JSON.stringify({ generatedAt: new Date().toISOString(), source: existsSync(inputPath) ? 'local-privacy-safe-export' : 'no-export-available', eventCount: events.length, eventCounts: counts, routeViews: routeViews.length, noResultSearches: noResults.length, noResultTargets: routes, nextAction: existsSync(inputPath) ? 'Use demand and no-result targets in the next bounded research ranking.' : 'Export privacy-safe aggregate events from the configured analytics provider to docs/operations/adoption-events.json; do not copy raw identifiers.' }, null, 2) + '\n');
console.log(JSON.stringify({ eventCount: events.length, routeViews: routeViews.length, noResultSearches: noResults.length }));
