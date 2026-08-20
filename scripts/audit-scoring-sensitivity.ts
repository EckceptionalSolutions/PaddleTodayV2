import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { rivers } from '../src/data/rivers';
import {
  analyzeScoringSensitivity,
  SCORING_SENSITIVITY_SCHEMA_VERSION,
  type SensitivityBaseline,
} from '../src/lib/scoring-sensitivity';

const baselinePath = resolve('docs/operations/scoring-sensitivity-baseline.json');
const reportPath = resolve('src/data/generated/scoring-sensitivity-report.json');
const writeBaseline = process.argv.includes('--write-baseline');
const writeReport = process.argv.includes('--write-report') || writeBaseline;

const existingBaseline = await readBaseline(baselinePath);
const generatedAt = new Date().toISOString();
const analysis = analyzeScoringSensitivity(rivers, existingBaseline, generatedAt);

if (writeReport) {
  await writeJson(reportPath, analysis.report);
}
if (writeBaseline) {
  await writeJson(baselinePath, analysis.baseline);
}

const summary = {
  routes: analysis.report.routeCount,
  scenarios: analysis.report.scenarioCount,
  invariantFailures: analysis.report.invariantFailureCount,
  rankedFindings: analysis.report.findings.length,
  baselineComparison: analysis.report.comparison,
  reportWritten: writeReport,
  baselineWritten: writeBaseline,
};

const unexpectedBaselineDrift =
  !writeBaseline &&
  analysis.report.comparison.baselineAvailable &&
  analysis.report.comparison.changedScenarios > 0;

if (analysis.report.invariantFailureCount > 0) {
  console.error('[scoring-sensitivity] Safety invariants failed.');
  console.error(JSON.stringify({ summary, findings: analysis.report.findings.filter((finding) => finding.category === 'invariant').slice(0, 30) }, null, 2));
  process.exitCode = 1;
} else if (unexpectedBaselineDrift) {
  console.error('[scoring-sensitivity] Scoring outputs differ from the committed baseline. Review the admin report, then run npm run scoring:sensitivity:generate to accept intentional changes.');
  console.error(JSON.stringify(summary, null, 2));
  process.exitCode = 1;
} else {
  console.log(`[scoring-sensitivity] ${analysis.report.routeCount} routes and ${analysis.report.scenarioCount} scenarios passed all safety invariants.`);
  console.log(JSON.stringify(summary, null, 2));
}

async function readBaseline(path: string): Promise<SensitivityBaseline | null> {
  try {
    const parsed = JSON.parse(await readFile(path, 'utf8')) as SensitivityBaseline;
    return parsed?.schemaVersion === SCORING_SENSITIVITY_SCHEMA_VERSION && parsed.routes ? parsed : null;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
}

async function writeJson(path: string, value: unknown) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}
