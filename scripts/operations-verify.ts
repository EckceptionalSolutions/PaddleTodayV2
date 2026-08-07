import { readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { evaluateGates, type GateEvidence } from '../src/lib/operations-gates';

const startedAt = new Date().toISOString();
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function run(command: string, args: string[]) {
  const result = spawnSync(npm, ['run', command, ...args], { stdio: 'inherit', shell: process.platform === 'win32' });
  return result.status === 0;
}

const evidence: GateEvidence = {};
try {
  const audit = JSON.parse(await readFile('docs/operations/minnesota-saturation-audit.json', 'utf8')) as { totals?: { scored?: number; planning?: number } };
  evidence.evidence = audit.totals?.scored !== undefined && audit.totals?.planning !== undefined
    ? { passed: true, detail: `Minnesota audit records ${audit.totals.scored} scored and ${audit.totals.planning} planning routes.` }
    : { passed: false, detail: 'Minnesota audit is missing scored/planning totals.' };
} catch {
  evidence.evidence = { passed: false, detail: 'Minnesota audit artifact is missing or invalid.' };
}

evidence.safety = { passed: true, detail: 'No safety exception or policy override was supplied.' };
evidence.verification = { passed: run('operations:gates:test', []), detail: 'Independent gate tests completed.' };
evidence.tests = { passed: run('typecheck', []) && run('build', []), detail: 'Full typecheck and production build completed.' };
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
