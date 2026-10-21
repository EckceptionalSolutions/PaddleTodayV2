import fs from 'node:fs/promises';
import { dispatchMergedDeployments, githubClient, waitForDeployments } from './lib/merged-deployments.mjs';

const api = githubClient(process.env.GITHUB_REPOSITORY, process.env.GH_TOKEN);
const monitor = process.argv.includes('--monitor');
const file = process.env.PUBLICATION_REPORT_PATH || (monitor ? 'publication-result.json' : 'publication-handoff.json');
const save = report => {
  // Serialize checkpoints in order, including partial/unknown dispatch outcomes.
  pending = pending.then(() => fs.writeFile(file, JSON.stringify(report, null, 2) + '\n'));
};
let pending = Promise.resolve();
try {
  const handoff = monitor ? JSON.parse(await fs.readFile('publication-handoff.json', 'utf8')) : null;
  const report = monitor
    ? await waitForDeployments({ api, runIds: handoff.runIds, expectedSources: Object.fromEntries(handoff.components.filter(c => c.runId).map(c => [c.runId, { name: c.name, sourceRevision: handoff.sourceRevision }])), onReport: save })
    : await dispatchMergedDeployments({ api, repository: process.env.GITHUB_REPOSITORY, gateRunId: process.env.GATE_RUN_ID, onReport: save });
  if (process.env.GITHUB_OUTPUT && !monitor) await fs.appendFile(process.env.GITHUB_OUTPUT, `has_work=${report.runIds.length > 0}\nsource_revision=${report.sourceRevision || ''}\n`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    const rows = monitor ? report.runs.map(run => `- [Run ${run.id}](${run.url}): ${run.status} / ${run.conclusion}`) : report.components.map(c => `- ${c.name}: ${c.state}${c.url ? ` — [run ${c.runId}](${c.url})` : ''}`);
    await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, `## Publication handoff\n\nStatus: **${report.status}**\n\n${report.sourceRevision ? `Source: \`${report.sourceRevision}\`\n\n` : ''}${rows.join('\n')}\n\nDispatch and workflow success remain separate from release-specific public content verification.\n`);
  }
  console.log(JSON.stringify({ status: report.status, sourceRevision: report.sourceRevision, runIds: report.runIds }));
} finally { await pending; }
