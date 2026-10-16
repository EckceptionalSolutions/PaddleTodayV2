import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, rm, rename } from 'node:fs/promises';
import path from 'node:path';
import { listAllRiversForAudit, WITHHELD_ROUTE_SLUGS } from '../src/lib/rivers';
import { publicRivers } from '../src/data/rivers';
import { auditRouteSafety } from '../src/lib/route-safety-audit';
import { compareFindings, evidenceStatus, factFields, factValue, isSourceUrl, makeFinding, validateLedger, type Finding, type Ledger } from './lib/route-qa';
import { renderQaReport } from './lib/route-qa-html';

const args = process.argv.slice(2);
const value = (name: string) => args.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3);
if (args.some((arg) => !/^--(route=.+|state=.+|refresh-sources|strict|help)$/.test(arg))) throw new Error('Unknown option. Use --help.');
if (args.includes('--help')) {
  console.log('Route QA: [--route=<slug-or-id>] [--state=<full-state-name>] [--refresh-sources] [--strict]\nDefault: cached hydrography; no route edits. --refresh-sources checks link availability, not factual accuracy. --strict fails on any high/critical review finding.');
  process.exit(0);
}
const allRoutes = listAllRiversForAudit();
const routes = allRoutes.filter((route) => (!value('route') || [route.slug, route.id].includes(value('route')!)) && (!value('state') || route.state.toLowerCase() === value('state')!.toLowerCase()));
if (!routes.length) throw new Error('No routes match the requested scope.');
const dir = path.resolve('tmp/route-qa');
await mkdir(dir, { recursive: true });
const lock = path.join(dir, '.lock');
try { await mkdir(lock); } catch { throw new Error('Route QA is already running. If a previous run was interrupted, remove tmp/route-qa/.lock after confirming it has stopped.'); }
try {
  const startedAt = new Date().toISOString();
  const runId = startedAt.replace(/[:.]/g, '-');
  const runDir = path.join(dir, 'runs', runId);
  await mkdir(runDir, { recursive: true });
  const ledger: Ledger = JSON.parse(await readFile('docs/route-qa-evidence.json', 'utf8'));
  validateLedger(ledger);
  const checks: Array<{ id: string; status: string; scope: string; detail: string; log?: string }> = [];
  const findings: Finding[] = [];
  const ids = new Set(routes.map((route) => route.id));
  async function run(id: string, script: string, extra: string[] = [], scope = 'inventory') {
    console.log(`Checking ${id}…`);
    const log = path.join(runDir, `${id}.log`);
    const result = await new Promise<{ code: number | null; output: string }>((resolve) => {
      const child = spawn(process.execPath, [path.resolve('node_modules/tsx/dist/cli.mjs'), script, ...extra], { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
      let output = '';
      let timedOut = false;
      const timer = setTimeout(() => { timedOut = true; child.kill(); }, 10 * 60 * 1000);
      const append = (chunk: Buffer) => { output = (output + chunk.toString()).slice(-8_000_000); };
      child.stdout.on('data', append); child.stderr.on('data', append);
      child.on('error', (error) => { output += error.message; });
      child.on('close', (code) => { clearTimeout(timer); resolve({ code: timedOut ? null : code, output: output + (timedOut ? '\nTimed out.' : '') }); });
    });
    await writeFile(log, result.output);
    checks.push({ id, status: result.code === 0 ? 'passed' : 'failed', scope, detail: result.output.slice(-1800), log: path.relative(dir, log).replaceAll('\\', '/') });
    return result.code === 0;
  }
  const dataFile = path.join(runDir, 'data.json');
  await run('data', 'scripts/audit-route-data.ts', [`--json-output=${dataFile}`]);
  try {
    const data = JSON.parse(await readFile(dataFile, 'utf8'));
    for (const issue of data.issues) if (ids.has(issue.routeId)) findings.push(makeFinding(issue.routeId, 'data', issue.severity.toLowerCase(), issue.message, issue.evidence));
    for (const deferral of data.planningValidationDeferrals) if (ids.has(deferral.routeId)) findings.push(makeFinding(deferral.routeId, 'data-deferred', 'medium', 'Planning validation explicitly deferred', JSON.stringify(deferral)));
  } catch (error) {
    checks[checks.length - 1].status = 'failed';
    checks[checks.length - 1].detail += `\nData artifact unavailable: ${String(error)}`;
  }
  for (const issue of auditRouteSafety(routes)) findings.push(makeFinding(issue.routeId, 'safety', issue.severity.toLowerCase() as Finding['severity'], issue.message, issue.evidence));
  checks.push({ id: 'safety', status: 'completed', scope: 'selected inventory, including planning and withheld', detail: 'Heuristic safety findings require review; mentions of hazards are not proof of incorrect data.' });
  const coordinateFile = path.join(runDir, 'coordinates.json');
  const coordinatesOk = await run('coordinates', 'scripts/audit-route-coordinate-river-distance.ts', ['--cache-only', '--include-withheld', `--output=${coordinateFile}`, ...(routes.length === 1 ? [`--route=${routes[0].id}`] : [])], 'all inventory or selected route; cached hydrography');
  const coordinateRoutes = new Set<string>();
  if (coordinatesOk) {
    const coordinates = JSON.parse(await readFile(coordinateFile, 'utf8'));
    for (const endpoint of coordinates.endpoints) {
      coordinateRoutes.add(endpoint.routeId);
      if (ids.has(endpoint.routeId) && endpoint.severity !== 'ok') findings.push(makeFinding(endpoint.routeId, 'coordinates', endpoint.severity === 'failure' ? 'high' : 'medium', `${endpoint.endpointName}: ${endpoint.note}`, endpoint.severity));
    }
    checks[checks.length - 1].detail = `Cached hydrography; ${coordinates.sourceIssues.length} source issue(s). Missing cache is unverified, not a pass.`;
  }
  for (const route of routes) if (!coordinateRoutes.has(route.id)) findings.push(makeFinding(route.id, 'coordinates', 'medium', 'No endpoint coordinate audit result; verification incomplete.'));
  await run('geometry', 'scripts/audit-canonical-river-geometries.ts', [], 'global published geometry assets; not per-route factual verification');
  await run('corridors', 'scripts/audit-route-corridors.ts', [`--output=${path.join(runDir, 'corridors.md')}`], 'global defined corridors; uncovered families remain unverified');
  await run('gauges', 'scripts/check-gauge-coverage.ts', [], 'global gauge inventory and review-ledger consistency; not live provider validation');
  const overlapFile = path.join(runDir, 'overlap.json');
  const overlapOk = await run('overlap', 'scripts/audit-route-overlap.ts', [`--json-output=${overlapFile}`], 'public non-withheld routes with usable access geometry');
  const overlapRoutes = new Set<string>();
  if (overlapOk) {
    const overlap = JSON.parse(await readFile(overlapFile, 'utf8'));
    for (const id of overlap.routeIds) overlapRoutes.add(id);
    for (const item of overlap.findings) for (const id of item.routeIds) if (ids.has(id)) findings.push(makeFinding(id, 'overlap', item.severity < 50 ? 'low' : 'medium', `${item.type}: ${item.detail}`, item.routeIds.join(', ')));
  }
  const sourceUrls = [...new Set(routes.flatMap((route) => [...route.sourceLinks.map((source) => source.url), route.profile.thresholdSource.url, ...route.evidenceNotes.flatMap((note) => note.sourceUrl ? [note.sourceUrl] : []), ...ledger.reviews.filter((review) => review.route === route.slug).map((review) => review.sourceUrl)]))];
  const links: Array<{ url: string; status: string; checkedAt: string; detail: string }> = [];
  if (args.includes('--refresh-sources')) {
    console.log(`Checking availability of ${sourceUrls.length} source URLs…`);
    let next = 0;
    await Promise.all(Array.from({ length: 6 }, async () => {
      while (next < sourceUrls.length) {
        const url = sourceUrls[next++];
        let status = 'unavailable'; let detail = 'Invalid HTTP(S) URL';
        if (isSourceUrl(url)) try {
          const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(12000), redirect: 'follow' });
          status = response.ok ? 'reachable' : 'needs-review'; detail = `HTTP ${response.status}`;
          await response.body?.cancel();
        } catch (error) { detail = error instanceof Error ? error.message : String(error); }
        links.push({ url, status, detail, checkedAt: new Date().toISOString() });
      }
    }));
    checks.push({ id: 'source-links', status: 'completed', scope: 'selected route sources', detail: 'HTTP HEAD availability only. Blocked HEAD requests need manual review; reachable pages do not verify facts.' });
  } else checks.push({ id: 'source-links', status: 'skipped', scope: 'selected route sources', detail: 'Use --refresh-sources to check current link availability.' });
  const publicSlugs = new Set(publicRivers.map((route) => route.slug));
  const rows = routes.map((route) => {
    const facts = factFields.map((field) => ({ field, value: factValue(route, field), ...evidenceStatus(route, field, ledger.reviews, Date.now()) }));
    for (const fact of facts) if (fact.status !== 'supported') findings.push(makeFinding(route.id, `evidence:${fact.field}`, fact.status === 'conflict' ? 'high' : 'medium', `${fact.field}: ${fact.status} source verification`));
    for (const link of links) if (link.status !== 'reachable' && (route.sourceLinks.some((source) => source.url === link.url) || route.profile.thresholdSource.url === link.url || route.evidenceNotes.some((note) => note.sourceUrl === link.url) || ledger.reviews.some((review) => review.route === route.slug && review.sourceUrl === link.url))) findings.push(makeFinding(route.id, 'source-links', 'medium', 'Source availability needs review', `${link.url}: ${link.detail}`));
    return { id: route.id, slug: route.slug, name: route.name, reach: route.reach, state: route.state, population: WITHHELD_ROUTE_SLUGS.has(route.slug) ? 'withheld' : publicSlugs.has(route.slug) ? route.scoreEligibility ?? 'scored' : 'inventory-only', putIn: route.putIn, takeOut: route.takeOut, sources: route.sourceLinks, facts, coverage: { coordinates: coordinateRoutes.has(route.id), overlap: overlapRoutes.has(route.id), geometry: 'global-assets-only', corridors: 'defined-corridors-only', gauges: 'global-ledger-only' } };
  });
  const uniqueFindings = [...new Map(findings.map((finding) => [finding.id, finding])).values()];
  const rank = { critical: 0, high: 1, medium: 2, low: 3 };
  uniqueFindings.sort((a, b) => rank[a.severity] - rank[b.severity] || a.routeId.localeCompare(b.routeId));
  const baselineKey = createHash('sha256').update(JSON.stringify([routes.map((route) => route.id).sort(), args.includes('--refresh-sources')])).digest('hex').slice(0, 20);
  const baselineFile = path.join(dir, `baseline-${baselineKey}.json`);
  const observationFile = path.join(dir, `previous-${baselineKey}.json`);
  let previous: { findings: Finding[]; generatedAt: string; complete: boolean } | null = null;
  try { previous = JSON.parse(await readFile(observationFile, 'utf8')); } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; }
  const complete = checks.every((check) => check.status !== 'failed');
  const comparable = complete && previous?.complete !== false;
  const report = { version: 1, generatedAt: new Date().toISOString(), startedAt, runId, complete, scope: { route: value('route') ?? null, state: value('state') ?? null, selected: routes.length, inventory: allRoutes.length }, checks, links, findings: uniqueFindings, comparison: { baselineAt: previous?.generatedAt ?? null, comparable, ...compareFindings(uniqueFindings, previous?.findings ?? [], comparable ? ids : new Set()) }, routes: rows.map((row) => ({ ...row, status: uniqueFindings.some((finding) => finding.routeId === row.id && ['critical', 'high'].includes(finding.severity)) ? 'needs review' : !complete || row.facts.some((fact) => fact.status !== 'supported') || !row.coverage.coordinates || !row.coverage.overlap ? 'insufficient evidence' : uniqueFindings.some((finding) => finding.routeId === row.id && finding.severity !== 'low') ? 'needs review' : 'checks passed' })) };
  const reportText = JSON.stringify(report, null, 2) + '\n';
  await writeFile(path.join(runDir, 'report.json'), reportText);
  await writeFile(path.join(dir, 'latest.json.tmp'), reportText);
  await rename(path.join(dir, 'latest.json.tmp'), path.join(dir, 'latest.json'));
  await writeFile(path.join(dir, 'index.html.tmp'), renderQaReport(report));
  await rename(path.join(dir, 'index.html.tmp'), path.join(dir, 'index.html'));
  await writeFile(`${observationFile}.tmp`, reportText);
  await rename(`${observationFile}.tmp`, observationFile);
  if (complete) { await writeFile(`${baselineFile}.tmp`, reportText); await rename(`${baselineFile}.tmp`, baselineFile); }
  console.log(`Route QA: ${routes.length} routes, ${uniqueFindings.length} findings. ${complete ? 'Audits completed.' : 'Audit failures require attention.'}\nReport: ${path.join(dir, 'index.html')}\nJSON: ${path.join(dir, 'latest.json')}`);
  if (!complete || (args.includes('--strict') && uniqueFindings.some((finding) => ['critical', 'high'].includes(finding.severity)))) process.exitCode = 1;
} finally { await rm(lock, { recursive: true }); }
