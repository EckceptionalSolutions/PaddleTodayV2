export type BriefRun = {
  id: string; kind?: string; status?: string; startedAt?: string; completedAt?: string;
  summary?: string; resolvedBy?: string;
};
export type BriefTask = { id: string; title?: string; lane?: string; kind?: string; summary?: string };
export type WorkflowRun = {
  workflowName: string; headBranch: string; createdAt: string; status: string;
  conclusion: string; url: string;
};
export type BriefArtifact = { name: string; generatedAt?: string; error?: string };
export type BriefBaseline = { tasks: Record<string, string>; generatedAt: string };

const day = 86_400_000;
const time = (run: BriefRun) => Date.parse(run.completedAt ?? run.startedAt ?? '');

export function buildOperationsBrief(input: {
  now: Date; tasks: BriefTask[]; runs: BriefRun[]; artifacts: BriefArtifact[];
  workflows: WorkflowRun[]; ciError?: string; previous?: BriefBaseline;
  sourceSummaries?: string[];
}) {
  const now = input.now.getTime();
  const warnings: string[] = [];
  const recent = input.runs.filter(run => time(run) <= now && time(run) >= now - day);
  const undated = input.runs.filter(run => !Number.isFinite(time(run))).length;
  if (undated) warnings.push(`${undated} historical run records lack a valid timestamp and are excluded from time-window counts.`);
  for (const artifact of input.artifacts) {
    const age = now - Date.parse(artifact.generatedAt ?? '');
    if (artifact.error) warnings.push(`${artifact.name}: ${artifact.error}`);
    else if (!Number.isFinite(age)) warnings.push(`${artifact.name}: no valid generation timestamp.`);
    else if (age < 0) warnings.push(`${artifact.name}: generation timestamp is in the future.`);
    else if (age > 36 * 3_600_000) warnings.push(`${artifact.name}: ${(age / day).toFixed(1)} days old; refresh before relying on it.`);
  }
  const lanes: Record<string, number> = {};
  for (const task of input.tasks) lanes[task.lane ?? 'unknown'] = (lanes[task.lane ?? 'unknown'] ?? 0) + 1;
  if (lanes.unknown) warnings.push(`${lanes.unknown} tasks have no lane; repair their schema before scheduling them.`);
  const changes = input.previous ? input.tasks.filter(task => input.previous!.tasks[task.id] !== (task.lane ?? 'unknown'))
    .map(task => `${task.id}: ${input.previous!.tasks[task.id] ?? 'new'} → ${task.lane ?? 'unknown'}`) : [];
  const kinds = [...new Set(input.runs.map(run => run.kind).filter((kind): kind is string => Boolean(kind)))];
  const idle = kinds.flatMap(kind => {
    const rows = input.runs.filter(run => run.kind === kind && time(run) <= now && time(run) >= now - 7 * day)
      .sort((a, b) => time(b) - time(a));
    let streak = 0;
    for (const row of rows) { if (row.status !== 'no_work') break; streak++; }
    return streak >= 3 ? [`${kind}: ${streak} consecutive no-work runs in the past seven days; check queue eligibility before another review.`] : [];
  });
  warnings.push(...idle);
  if (input.ciError) warnings.push(`GitHub Actions: ${input.ciError}; CI health is unknown.`);
  // A successful run on another branch must never hide a branch's failure.
  const latest = new Map<string, WorkflowRun>();
  for (const run of [...input.workflows].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))) {
    const key = `${run.workflowName}/${run.headBranch}`;
    if (!latest.has(key)) latest.set(key, run);
  }
  const workflows = [...latest.values()];
  const pending = workflows.filter(run => run.status !== 'completed');
  if (pending.length) warnings.push(`${pending.length} latest workflow/branch run(s) are still pending; their results are not yet known.`);
  const failures = workflows.filter(run => ['failure', 'timed_out', 'action_required', 'startup_failure'].includes(run.conclusion));
  const ready = input.tasks.filter(task => task.lane === 'ready')
    .sort((a, b) => Number(b.kind === 'safety_review') - Number(a.kind === 'safety_review'));
  return {
    generatedAt: input.now.toISOString(), lanes, changes, warnings, failures, workflows,
    artifacts: input.artifacts, sourceSummaries: input.sourceSummaries ?? [],
    baselineAvailable: Boolean(input.previous),
    recent: {
      total: recent.length,
      // Count explicit implementation records, not completed research or verification.
      implementations: recent.filter(run => run.kind === 'route_implementation' && ['completed', 'implementation_complete'].includes(run.status ?? '')),
      noWork: recent.filter(run => run.status === 'no_work').length,
      failed: recent.filter(run => (run.status === 'failed' || run.status === 'failure')
        && !input.runs.some(resolution => run.resolvedBy === resolution.id
          && resolution.kind === run.kind && resolution.status === 'passed'
          && time(resolution) >= time(run) && time(resolution) <= now)),
    },
    ready: ready.slice(0, 5), readyCount: ready.length,
    baseline: { generatedAt: input.now.toISOString(), tasks: Object.fromEntries(input.tasks.map(task => [task.id, task.lane ?? 'unknown'])) },
  };
}

export function renderOperationsBrief(brief: ReturnType<typeof buildOperationsBrief>) {
  const concise = (summary = '') => summary.length > 240 ? `${summary.slice(0, 237)}...` : summary;
  const lines = [
    '# PaddleToday daily brief', '', `Generated ${brief.generatedAt}. Activity window: previous 24 hours.`, '',
    '## Needs attention', '',
    ...brief.failures.map(run => `- [${run.workflowName} (${run.headBranch}): ${run.conclusion}](${run.url})`),
    ...brief.warnings.map(warning => `- ${warning}`),
    ...brief.recent.failed.slice(0, 5).map(run => `- Failed recorded run: ${run.id}. ${run.summary ?? ''}`),
  ];
  if (!brief.failures.length && !brief.warnings.length && !brief.recent.failed.length) lines.push('- No actionable findings in the inspected evidence.');
  lines.push('', '## What changed', '',
    `- ${brief.recent.total} recorded runs; ${brief.recent.implementations.length} explicit completed implementation records; ${brief.recent.noWork} no-work runs. Implementation records are not a route count.`,
    ...brief.recent.implementations.slice(0, 5).map(run => `- ${run.id}: ${run.summary ?? 'See operations run evidence.'}`),
    ...(brief.baselineAvailable ? (brief.changes.length ? brief.changes.slice(0, 10).map(change => `- ${change}`) : ['- No task lane changes since the previous brief.']) : ['- First brief: task baseline established; historical task completions are not counted as new.']),
    ...(brief.changes.length > 10 ? [`- ${brief.changes.length - 10} additional task changes are listed in daily-brief.json.`] : []),
    '', '## Next work', '',
    ...brief.ready.map(task => `- ${task.title ?? task.id} (${task.id}). ${concise(task.summary)}`),
    ...(!brief.ready.length ? ['- No ready tasks. Check blockers and evidence before scheduling implementation.'] : []),
    ...(brief.readyCount > 5 ? [`- ${brief.readyCount - 5} additional ready tasks remain on the task board.`] : []),
    '', `Task lanes: ${Object.entries(brief.lanes).map(([lane, count]) => `${lane} ${count}`).join(', ')}.`,
    '', '## Source reports', '',
    ...brief.sourceSummaries.map(summary => `- ${summary}`),
    ...brief.artifacts.map(artifact => `- ${artifact.name}: ${artifact.error ?? artifact.generatedAt ?? 'timestamp unavailable'}.`),
    '', '## Evidence limits', '',
    '- Metadata freshness does not establish live gauge availability, current closures, or safe paddling conditions.',
    '- CI covers the latest run per workflow and branch within the 100 most recently fetched runs; an absent workflow is unverified.',
    '- A configured active automation is not proof of a successful scheduled run. The operations ledger may omit scheduler history.',
    '',
  );
  return lines.join('\n');
}
