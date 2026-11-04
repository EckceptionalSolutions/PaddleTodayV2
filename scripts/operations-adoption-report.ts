import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { resolve, join, dirname, basename } from 'node:path';
import { adoptionFromLocal, adoptionFromWeekly } from './lib/adoption-metrics';
import { writeFileReliably } from './lib/write-file-reliably';

const exec = promisify(execFile);
const outputDir = resolve('docs/operations');
const cacheDir = resolve('.local/operations');
const cacheFile = join(cacheDir, 'adoption-weekly-source.json');
const repo = 'EckceptionalSolutions/PaddleTodayV2';
const arg = (name: string) => process.argv[process.argv.indexOf(name) + 1];
const gh = async (args: string[]) => (await exec('gh', args, { timeout: 30_000, maxBuffer: 8 * 1024 * 1024, windowsHide: true })).stdout;

await mkdir(outputDir, { recursive: true });
await mkdir(cacheDir, { recursive: true });
let report;
let refreshFailed = false;
if (process.argv.includes('--weekly-report')) {
  report = adoptionFromWeekly(JSON.parse(await readFile(resolve(arg('--weekly-report')), 'utf8')));
} else if (existsSync(join(outputDir, 'adoption-events.json'))) {
  report = adoptionFromLocal(JSON.parse(await readFile(join(outputDir, 'adoption-events.json'), 'utf8')));
} else {
  try {
    const runs = JSON.parse(await gh(['run', 'list', '--repo', repo, '--workflow', 'weekly-product-report.yml', '--branch', 'main', '--status', 'success', '--limit', '1', '--json', 'databaseId,url']));
    const run = runs[0];
    if (!Number.isSafeInteger(run?.databaseId)) throw new Error('No successful weekly report.');
    const artifacts = JSON.parse(await gh(['api', `repos/${repo}/actions/runs/${run.databaseId}/artifacts`]));
    const artifact = artifacts.artifacts.find((item: any) => /^weekly-product-report-\d+$/.test(item.name) && !item.expired);
    if (!artifact) throw new Error('Weekly report artifact unavailable.');
    const tempDir = await mkdtemp(join(cacheDir, 'adoption-download-'));
    try {
      await gh(['run', 'download', String(run.databaseId), '--repo', repo, '--name', artifact.name, '--dir', tempDir]);
      report = adoptionFromWeekly(JSON.parse(await readFile(join(tempDir, 'weekly-product-report.json'), 'utf8')));
      const normalized = { ...report, sourceRun: run.url };
      await writeFileReliably(cacheFile, JSON.stringify(normalized, null, 2) + '\n');
      report = normalized;
    } finally {
      if (dirname(resolve(tempDir)) !== cacheDir || !basename(tempDir).startsWith('adoption-download-')) throw new Error('Unexpected analytics temporary directory.');
      await rm(tempDir, { recursive: true, force: true });
    }
  } catch {
    refreshFailed = true;
    if (existsSync(cacheFile)) {
      report = JSON.parse(await readFile(cacheFile, 'utf8'));
      // Keep the original generation time so a failed import cannot make old data look fresh.
      report.warnings = [...report.warnings, 'Latest GitHub artifact could not be refreshed; retaining the previous aggregate and its timestamps.'];
    } else {
      report = { generatedAt: new Date().toISOString(), source: 'no-export-available', eventCount: null, eventCounts: {}, routeViews: null, noResultSearches: null, noResultTargets: {}, warnings: ['Analytics source unavailable; usage is unknown.'], nextAction: 'Check gh authentication and the main-branch weekly-product-report.yml artifact, then rerun operations:adoption.' };
    }
  }
}
await writeFileReliably(join(outputDir, 'adoption-report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (refreshFailed) process.exitCode = 1;
