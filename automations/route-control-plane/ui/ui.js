const token = document.querySelector('meta[name="route-control-token"]').content;

const elements = {
  health: document.querySelector('[data-health]'),
  nextMode: document.querySelector('[data-next-mode]'),
  nextCode: document.querySelector('[data-next-code]'),
  nextState: document.querySelector('[data-next-state]'),
  nextReason: document.querySelector('[data-next-reason]'),
  nextLeads: document.querySelector('[data-next-leads]'),
  nextReady: document.querySelector('[data-next-ready]'),
  nextDifficulty: document.querySelector('[data-next-difficulty]'),
  nextOutcome: document.querySelector('[data-next-outcome]'),
  publishedRoutes: document.querySelector('[data-published-routes]'),
  totalLeads: document.querySelector('[data-total-leads]'),
  totalCandidates: document.querySelector('[data-total-candidates]'),
  researchedLeads: document.querySelector('[data-researched-leads]'),
  readyLeads: document.querySelector('[data-ready-leads]'),
  stateTable: document.querySelector('[data-state-table]'),
  candidateList: document.querySelector('[data-candidate-list]'),
  historyList: document.querySelector('[data-history-list]'),
  generatedAt: document.querySelector('[data-generated-at]'),
  actionStatus: document.querySelector('[data-action-status]'),
  refreshTime: document.querySelector('[data-refresh-time]'),
  runBanner: document.querySelector('[data-run-banner]'),
  runTitle: document.querySelector('[data-run-title]'),
  runMessage: document.querySelector('[data-run-message]'),
  cancelRun: document.querySelector('[data-cancel-run]'),
  actionButtons: [...document.querySelectorAll('[data-action]')],
};

let dashboard = null;

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatLabel(value) {
  return String(value ?? 'unknown')
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value) {
  if (!value) return 'Never';
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function leadList(inbox) {
  return Array.isArray(inbox?.leads) ? inbox.leads : [];
}

function profilesList(profiles) {
  return Array.isArray(profiles?.states) ? profiles.states : [];
}

function stateLeads(leads, profile) {
  return leads.filter((lead) => lead.state === profile.state || lead.state === profile.code);
}

function renderNext(data) {
  const next = data.preview ?? data.current;
  if (!next) return;

  const profiles = profilesList(data.profiles);
  const leads = leadList(data.inbox);
  const profile = profiles.find((item) => item.state === next.state);
  const matching = stateLeads(leads, profile ?? { state: next.state, code: next.stateCode });
  const ready = matching.filter((lead) => lead.lane === 'implementation_ready');

  elements.nextMode.textContent = next.mode === 'implementation' ? 'Ready to implement' : 'Research needed';
  elements.nextCode.textContent = next.stateCode;
  elements.nextState.textContent = `${next.mode === 'implementation' ? 'Implement' : 'Research'} ${next.state}`;
  elements.nextReason.textContent = next.mode === 'implementation'
    ? `${ready.length} route${ready.length === 1 ? '' : 's'} passed the evidence gates and can move into route work.`
    : matching.length > 0
      ? `${matching.length} candidate route${matching.length === 1 ? '' : 's'} need stronger evidence before implementation.`
      : `No candidate is queued for ${next.state}, so the next task is bounded discovery.`;
  elements.nextLeads.textContent = matching.length;
  elements.nextReady.textContent = ready.length;
  elements.nextDifficulty.textContent = formatLabel(profile?.difficulty ?? 'standard');
  elements.nextOutcome.textContent = next.mode === 'implementation'
    ? 'Add the best qualified route, validate it, and record the result.'
    : 'Promote a candidate with sufficient evidence—or record exactly what is missing and when to retry.';
  elements.generatedAt.textContent = `Calculated ${formatDate(next.generatedAt)}`;

  const candidates = Array.isArray(next.candidates) ? next.candidates : [];
  elements.candidateList.innerHTML = candidates.length
    ? candidates.map((candidate) => `
      <article class="candidate">
        <div class="candidate-head">
          <div>
            <h3>${escapeHtml(candidate.river)} · ${escapeHtml(candidate.route)}</h3>
            <div class="candidate-meta">${escapeHtml(candidate.candidateId)}</div>
          </div>
          <span class="lane-badge">${escapeHtml(formatLabel(candidate.lane))}</span>
        </div>
        <p>${escapeHtml(candidate.recommendedNextStep)}</p>
      </article>
    `).join('')
    : '<p class="empty-state">No candidate is queued. The task will perform bounded fresh discovery.</p>';
}

function renderMetrics(data) {
  const metrics = Array.isArray(data.stateMetrics) ? data.stateMetrics : [];
  const summary = data.inbox?.summary ?? {};
  const leads = leadList(data.inbox);

  elements.publishedRoutes.textContent = metrics.reduce((sum, metric) => sum + Number(metric.published ?? 0), 0);
  elements.totalLeads.textContent = summary.leadCount ?? leads.length;
  elements.totalCandidates.textContent = `${summary.totalLedgerCandidates ?? '—'} ledger candidates`;
  elements.researchedLeads.textContent = metrics.reduce((sum, metric) => sum + Number(metric.researched ?? 0), 0);
  elements.readyLeads.textContent = metrics.reduce((sum, metric) => sum + Number(metric.ready ?? 0), 0);
}

function renderStates(data) {
  const metrics = Array.isArray(data.stateMetrics) ? data.stateMetrics : [];
  const nextState = (data.preview ?? data.current)?.state;
  const runnerBusy = Boolean(data.runner?.activeRun);
  const runnerAvailable = Boolean(data.runner?.available);

  const rows = [...metrics].sort((left, right) => {
    if (left.state === nextState) return -1;
    if (right.state === nextState) return 1;
    return Number(right.leads) - Number(left.leads) || left.state.localeCompare(right.state);
  });

  elements.stateTable.innerHTML = rows.map((metric) => {
    const status = metric.activeRun
      ? `${formatLabel(metric.activeRun.mode)} ${formatLabel(metric.activeRun.status)}`
      : metric.latestRun
        ? `Last: ${formatLabel(metric.latestRun.status)}`
        : 'Idle';
    const cannotStart = runnerBusy || !runnerAvailable;
    return `
      <tr class="${metric.state === nextState ? 'is-next' : ''}">
        <td>
          <span class="state-name">
            <i class="${metric.difficulty === 'difficult' ? 'difficult' : ''}"></i>
            ${escapeHtml(metric.state)}
          </span>
        </td>
        <td>${metric.published}</td>
        <td>${metric.leads}</td>
        <td>${metric.researched}</td>
        <td>${metric.blocked}</td>
        <td>${metric.ready}</td>
        <td><span class="result-pill ${metric.activeRun ? '' : 'is-empty'}">${escapeHtml(status)}</span></td>
        <td>
          <div class="row-actions">
            <button class="mini-button" type="button" data-run-state="${escapeHtml(metric.state)}" data-run-mode="research" ${cannotStart ? 'disabled' : ''}>Research now</button>
            <button class="mini-button mini-button-strong" type="button" data-run-state="${escapeHtml(metric.state)}" data-run-mode="implementation" ${cannotStart || Number(metric.ready) === 0 ? 'disabled' : ''}>Implement</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderHistory(data) {
  const runs = Array.isArray(data.runs) ? data.runs.slice(0, 8) : [];
  elements.historyList.innerHTML = runs.length
    ? runs.map((run) => `
      <article class="history-item">
        <h3>${escapeHtml(run.state)} · ${escapeHtml(formatLabel(run.mode))} · ${escapeHtml(formatLabel(run.status))}</h3>
        <p>${escapeHtml(String(run.message ?? 'No result recorded yet.').slice(0, 320))}</p>
        <p>${escapeHtml(formatDate(run.finishedAt ?? run.startedAt ?? run.requestedAt))}</p>
      </article>
    `).join('')
    : '<p class="empty-state">No Codex runs have been started from this dashboard.</p>';
}

function renderActiveRun(data) {
  const run = data.runner?.activeRun;
  elements.runBanner.hidden = !run;
  if (!run) return;
  const startedAt = run.startedAt ?? run.requestedAt;
  const elapsedMinutes = Math.max(0, Math.floor((Date.now() - new Date(startedAt).getTime()) / 60000));
  const elapsed = elapsedMinutes < 1
    ? 'less than a minute'
    : `${elapsedMinutes} minute${elapsedMinutes === 1 ? '' : 's'}`;
  elements.runTitle.textContent = `${formatLabel(run.mode)} ${run.state}`;
  elements.runMessage.textContent = `${run.message ?? `Run is ${formatLabel(run.status)}.`} Running for ${elapsed}. No input is required; research can take several minutes.`;
  elements.cancelRun.dataset.runId = run.id;
  elements.cancelRun.disabled = run.status === 'cancelling';
  elements.cancelRun.textContent = run.status === 'cancelling' ? 'Cancelling…' : 'Cancel current run';
}

function render(data) {
  dashboard = data;
  renderNext(data);
  renderMetrics(data);
  renderStates(data);
  renderHistory(data);
  renderActiveRun(data);
  elements.health.classList.add('is-ready');
  elements.health.querySelector('span:last-child').textContent = data.runner?.available
    ? 'Codex runner ready'
    : 'Codex runner unavailable';
  elements.refreshTime.textContent = `Updated ${formatDate(data.generatedAt)}`;
}

async function refresh() {
  const response = await fetch('/api/status', { cache: 'no-store' });
  if (!response.ok) throw new Error('Could not load route-control status.');
  render(await response.json());
}

function recommendedTaskPrompt() {
  const next = dashboard?.preview ?? dashboard?.current;
  if (!next) return null;
  const mode = next.mode === 'implementation' ? 'implementation' : 'research';
  return [
    `Execute the recommended PaddleToday route-control ${mode} task for ${next.state}.`,
    '',
    'Work in the current PaddleTodayV2 repository and preserve unrelated changes.',
    'First run: npm run routes:leads:gather',
    `Then claim the assignment with: npx tsx scripts/route-control-plane.ts claim --mode ${mode} --state "${next.state}"`,
    'Read automations/route-control-plane/current-work-order.md and every required startup file.',
    'Complete the work order fully, obey every evidence and safety gate, run proportionate tests, and submit the completion report.',
  ].join('\n');
}

async function performAction(action) {
  if (action === 'copy-task') {
    const prompt = recommendedTaskPrompt();
    if (!prompt) {
      elements.actionStatus.textContent = 'Calculate a recommendation first.';
      return;
    }
    await navigator.clipboard.writeText(prompt);
    elements.actionStatus.textContent = 'Task copied. You can paste it into another Codex task.';
    return;
  }

  elements.actionButtons.forEach((button) => { button.disabled = true; });
  elements.actionStatus.textContent = 'Calculating the clearest next step…';
  try {
    const response = await fetch(`/api/${action}`, {
      method: 'POST',
      headers: { 'X-Route-Control-Token': token },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? 'The action failed.');
    render(result.status);
    elements.actionStatus.textContent = `Recommendation updated: ${result.status.preview?.mode === 'implementation' ? 'implement' : 'research'} ${result.status.preview?.state ?? 'the selected state'}.`;
  } catch (error) {
    elements.actionStatus.textContent = error instanceof Error ? error.message : String(error);
  } finally {
    elements.actionButtons.forEach((button) => { button.disabled = false; });
  }
}

async function startRun(state, mode) {
  if (!window.confirm(`Start Codex ${mode} for ${state}?`)) return;
  elements.actionStatus.textContent = `Starting ${mode} for ${state}…`;
  try {
    const response = await fetch('/api/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Route-Control-Token': token,
      },
      body: JSON.stringify({ state, mode }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? 'Could not start Codex.');
    render(result.status);
    elements.actionStatus.textContent = `Codex started ${mode} for ${state}.`;
  } catch (error) {
    elements.actionStatus.textContent = error instanceof Error ? error.message : String(error);
    await refresh();
  }
}

async function cancelRun(runId) {
  if (!runId || !window.confirm('Cancel the active Codex run? Work already written to files will remain.')) return;
  elements.cancelRun.disabled = true;
  try {
    const response = await fetch(`/api/runs/${encodeURIComponent(runId)}/cancel`, {
      method: 'POST',
      headers: { 'X-Route-Control-Token': token },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? 'Could not cancel the run.');
    elements.actionStatus.textContent = 'Cancellation requested.';
    await refresh();
  } catch (error) {
    elements.actionStatus.textContent = error instanceof Error ? error.message : String(error);
    elements.cancelRun.disabled = false;
  }
}

elements.actionButtons.forEach((button) => {
  button.addEventListener('click', () => performAction(button.dataset.action));
});

elements.stateTable.addEventListener('click', (event) => {
  const button = event.target.closest('[data-run-state]');
  if (!button || button.disabled) return;
  startRun(button.dataset.runState, button.dataset.runMode);
});

elements.cancelRun.addEventListener('click', () => cancelRun(elements.cancelRun.dataset.runId));

refresh().catch((error) => {
  elements.health.querySelector('span:last-child').textContent = 'Dashboard unavailable';
  elements.actionStatus.textContent = error instanceof Error ? error.message : String(error);
});

setInterval(() => {
  refresh().catch(() => {});
}, 5_000);
