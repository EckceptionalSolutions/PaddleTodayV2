import { readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { evaluateGates, type GateEvidence } from '../src/lib/operations-gates';
import { loadGaugeCoverageArtifacts } from '../src/lib/gauge-coverage';

const startedAt = new Date().toISOString();
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function run(command: string, args: string[]) {
  const result = spawnSync(npm, ['run', command, ...args], { stdio: 'inherit', shell: process.platform === 'win32' });
  return result.status === 0;
}

const evidence: GateEvidence = {};
try {
  const { inventory, ledger } = loadGaugeCoverageArtifacts();
  evidence.evidence = inventory.statesBaselined.length > 0 && ledger.reviews.length === inventory.gauges.length
    ? { passed: true, detail: `Gauge inventory ${inventory.inventoryId} records ${inventory.gauges.length} gauges across ${inventory.statesBaselined.length} provider-baselined states.` }
    : { passed: false, detail: 'Gauge coverage artifacts do not have a provider baseline and one review row per gauge.' };
} catch {
  evidence.evidence = { passed: false, detail: 'Gauge inventory or review-ledger artifact is missing or invalid.' };
}

const safetyAudit = run('routes:safety:audit', []);
if (!safetyAudit) {
  evidence.safety = { passed: false, detail: 'Route safety audit did not complete.' };
} else {
  try {
    const report = JSON.parse(await readFile('docs/route-safety-audit.json', 'utf8')) as {
      issueCount?: number;
      summary?: { Critical?: number; High?: number; Medium?: number; Low?: number };
    };
    const critical = report.summary?.Critical ?? 0;
    const high = report.summary?.High ?? 0;
    evidence.safety = {
      passed: critical === 0,
      detail: critical === 0
        ? `Route safety audit found no critical blockers (${high} high-severity review item(s) remain tracked).`
        : `Route safety audit found ${critical} critical blocker(s).`,
    };
  } catch {
    evidence.safety = { passed: false, detail: 'Route safety audit report is missing or invalid.' };
  }
}
evidence.verification = { passed: run('operations:gates:test', []), detail: 'Independent gate tests completed.' };
const testChecks: Array<[string, string]> = [
  ['typecheck', 'typecheck'],
  ['scoring sensitivity', 'scoring:sensitivity:check'],
  ['snapshot capacity', 'snapshots:capacity'],
  ['workspace tests', 'test:workspaces'],
  ['production build', 'build'],
];
const testResults = testChecks.map(([label, command]) => ({ label, passed: run(command, []) }));
evidence.tests = {
  passed: testResults.every((result) => result.passed),
  detail: `Checks: ${testResults.map((result) => `${result.label}=${result.passed ? 'passed' : 'failed'}`).join(', ')}. No checks were skipped.`,
};
const gitCheck = spawnSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8', shell: false });
evidence.rollback = { passed: gitCheck.status === 0, detail: gitCheck.status === 0 ? 'Git repository provides a bounded revert path.' : 'Git repository could not be resolved.' };

const evaluation = evaluateGates(evidence);
const completedAt = new Date().toISOString();
const history = JSON.parse(await readFile('docs/operations/runs.json', 'utf8')) as { version: number; runs: unknown[] };
history.runs.push({
  id: `gatekeeper-${completedAt.replace(/[^0-9]/g, '').slice(0, 14)}`,
  kind: 'gatekeeper_verification', startedAt, completedAt,
  status: evaluation.passed ? 'passed' : 'failed', summary: evaluation.passed ? 'All required merge gates passed.' : 'One or more required merge gates failed.',
  gates: evaluation.results,
});
await writeFile('docs/operations/runs.json', `${JSON.stringify(history, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(evaluation, null, 2));
if (!evaluation.passed) process.exitCode = 1;
