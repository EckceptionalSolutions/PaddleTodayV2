import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { buildOperationsBrief, renderOperationsBrief, type BriefArtifact, type BriefBaseline, type BriefRun, type BriefTask, type WorkflowRun } from '../src/lib/operations-brief';
import { validateTaskBoard } from '../src/lib/operations-task-board';

const output = '.local/operations';
await mkdir(output, { recursive: true });
const problems: BriefArtifact[] = [];
async function readJson(path: string): Promise<any> {
  try { return JSON.parse(await readFile(path, 'utf8')); }
  catch { problems.push({ name: path, error: 'missing or invalid JSON' }); return undefined; }
}
const taskFile = await readJson('docs/operations/tasks.json');
const runFile = await readJson('docs/operations/runs.json');
const taskValidation = validateTaskBoard(taskFile);
const tasks: BriefTask[] = taskValidation.errors.length === 0 ? taskFile.tasks : [];
if (taskValidation.errors.length) problems.push({ name: 'tasks.json', error: `${taskValidation.errors.length} schema errors; run npm run operations:tasks:check before scheduling work` });
if (taskValidation.warnings.length) problems.push({ name: 'Task board', error: `${taskValidation.warnings.length} warnings about historical conflicts or future timestamps; inspect with npm run operations:tasks:check` });
const runs: BriefRun[] = Array.isArray(runFile?.runs) ? runFile.runs : [];
if (taskFile && !Array.isArray(taskFile.tasks)) problems.push({ name: 'tasks.json', error: 'tasks array missing' });
if (runFile && !Array.isArray(runFile.runs)) problems.push({ name: 'runs.json', error: 'runs array missing' });
let previous: BriefBaseline | undefined;
try {
  const value = JSON.parse(await readFile(`${output}/brief-baseline.json`, 'utf8'));
  if (value.tasks && typeof value.tasks === 'object' && !Array.isArray(value.tasks)) previous = value;
} catch { /* First run has no task-change baseline. */ }
const artifacts: BriefArtifact[] = [];
const sourceSummaries: string[] = [];
for (const name of ['route-freshness-report', 'adoption-report', 'saturation-dossiers', 'blocker-resolution-queue', 'overlap-review-queue']) {
  const report = await readJson(`docs/operations/${name}.json`);
  if (report) artifacts.push({ name, generatedAt: report.generatedAt });
  if (name === 'adoption-report' && report?.source === 'no-export-available') problems.push({ name, error: 'analytics export unavailable; zero recorded events does not mean zero usage' });
  if (name === 'route-freshness-report' && report?.totals) sourceSummaries.push(`Metadata review: ${report.totals.routesReviewed} routes, ${report.totals.findings} findings, ${report.totals.high} high-priority metadata reviews. These are not live safety findings.`);
  if (name === 'blocker-resolution-queue' && Array.isArray(report?.groups)) sourceSummaries.push(`Largest blocker groups: ${[...report.groups].sort((a, b) => (b.taskIds?.length ?? 0) - (a.taskIds?.length ?? 0)).slice(0, 3).map(group => `${group.category} (${group.taskIds?.length ?? 0} tasks)`).join(', ')}.`);
  if (name === 'overlap-review-queue' && Array.isArray(report?.items)) {
    const counts: Record<string, number> = {};
    for (const item of report.items) counts[item.status ?? 'unknown'] = (counts[item.status ?? 'unknown'] ?? 0) + 1;
    sourceSummaries.push(`Overlap review queue: ${Object.entries(counts).map(([status, count]) => `${status} ${count}`).join(', ')}.`);
  }
  if (name === 'adoption-report' && report?.source !== 'no-export-available' && report) sourceSummaries.push(`Analytics source ${report.source}: ${report.eventCount} recorded events, ${report.noResultSearches} no-result searches; export coverage determines the observation period.`);
}
const gh = spawnSync('gh', ['run', 'list', '--limit', '100', '--json', 'workflowName,headBranch,status,conclusion,createdAt,url'], { encoding: 'utf8', timeout: 30_000, windowsHide: true });
let workflows: WorkflowRun[] = [];
let ciError: string | undefined;
try {
  if (gh.status !== 0) throw new Error('unavailable');
  workflows = JSON.parse(gh.stdout);
  if (!Array.isArray(workflows) || !workflows.length) throw new Error('no runs');
} catch { ciError = 'could not retrieve recent runs; check gh authentication and repository access'; workflows = []; }
const triage = spawnSync(process.execPath, ['--import', 'tsx', 'scripts/operations-ci-triage.ts'], { encoding: 'utf8', timeout: 65_000, windowsHide: true });
if (triage.status !== 0) problems.push({ name: 'CI triage', error: 'fresh failure diagnosis unavailable; run npm run operations:ci:triage' });
else {
  const report = await readJson(`${output}/ci-triage.json`);
  if (report) {
    for (const failure of report.failures ?? []) sourceSummaries.push(`CI diagnosis — ${failure.workflowName} (${failure.headBranch}): ${failure.category}. ${failure.actions?.length ? `Observed operations: ${failure.actions.join(', ')}. ` : ''}${failure.nextStep} ${failure.url}`);
    if (report.uninspected) sourceSummaries.push(`CI triage: ${report.uninspected} additional failures remain uninspected; see the workflow list.`);
  }
}
const brief = buildOperationsBrief({ now: new Date(), tasks, runs, artifacts: [...artifacts, ...problems], workflows, ciError, previous, sourceSummaries });
const markdown = renderOperationsBrief(brief);
await writeFile(`${output}/daily-brief.json`, `${JSON.stringify(brief, null, 2)}\n`);
await writeFile(`${output}/daily-brief.md`, markdown);
// Never replace a usable baseline with an empty one after an input failure.
if (taskValidation.errors.length === 0) {
  await writeFile(`${output}/brief-baseline.tmp`, JSON.stringify(brief.baseline));
  await rename(`${output}/brief-baseline.tmp`, `${output}/brief-baseline.json`);
}
console.log(markdown);
console.log(`\nSaved ${output}/daily-brief.md and daily-brief.json`);
if (problems.some(problem => /(?:tasks|runs)\.json/.test(problem.name))) process.exitCode = 1;
