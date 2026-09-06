import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { latestCiFailures, classifyCiFailure, type CiRun } from '../src/lib/ci-triage';

const output = '.local/operations';
await mkdir(output, { recursive: true });
function gh(args: string[]) {
  const result = spawnSync('gh', args, { encoding: 'utf8', windowsHide: true, timeout: 30_000, maxBuffer: 16 * 1024 * 1024 });
  if (result.status !== 0 || result.error) throw new Error('GitHub data unavailable; check gh authentication, repository access, or log availability.');
  return result.stdout;
}
const report = { generatedAt: new Date().toISOString(), scope: 'Latest run per workflow and branch within the most recent 100 runs; at most 1 failure inspected. Pending replacements remain unverified.', error: null as string | null, failures: [] as any[], uninspected: 0 };
try {
  const runs: CiRun[] = JSON.parse(gh(['run', 'list', '--limit', '100', '--json', 'databaseId,workflowName,headBranch,createdAt,status,conclusion,url']));
  if (!Array.isArray(runs) || !runs.length) throw new Error('No recent GitHub runs available; CI health is unknown.');
  const failures = latestCiFailures(runs);
  report.uninspected = Math.max(0, failures.length - 1);
  for (const run of failures.slice(0, 1)) {
    try { report.failures.push({ ...run, ...classifyCiFailure(gh(['run', 'view', String(run.databaseId), '--log-failed'])) }); }
    catch { report.failures.push({ ...run, category: 'logs_unavailable', actions: [], nextStep: 'Open the linked GitHub run to inspect its failed jobs; logs could not be retrieved.' }); }
  }
} catch (error) { report.error = error instanceof Error ? error.message : 'CI data unavailable.'; process.exitCode = 1; }
const markdown = ['# CI failure triage', '', `Generated: ${report.generatedAt}`, '', report.scope, '',
  ...(report.error ? [`CI health unknown: ${report.error}`, ''] : []),
  ...report.failures.flatMap(run => [`## ${run.workflowName} — ${run.headBranch}`, '', `[Run ${run.databaseId}](${run.url}) — ${run.category}`, '', ...(run.actions.length ? [`Observed Azure operations: ${run.actions.join(', ')}`, ''] : []), run.nextStep, '']),
  ...(!report.error && !report.failures.length ? ['No latest completed failures found in this sample.', ''] : []),
  ...(report.uninspected ? [`${report.uninspected} additional failures were not inspected.`, ''] : []),
].join('\n');
await writeFile(`${output}/ci-triage.json`, `${JSON.stringify(report, null, 2)}\n`);
await writeFile(`${output}/ci-triage.md`, markdown);
console.log(markdown);
