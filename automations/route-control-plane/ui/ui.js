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
  totalLeads: document.querySelector('[data-total-leads]'),
  totalCandidates: document.querySelector('[data-total-candidates]'),
  readyLeads: document.querySelector('[data-ready-leads]'),
  researchLeads: document.querySelector('[data-research-leads]'),
  queuedJobs: document.querySelector('[data-queued-jobs]'),
  queueSummary: document.querySelector('[data-queue-summary]'),
  stateTable: document.querySelector('[data-state-table]'),
  laneList: document.querySelector('[data-lane-list]'),
  candidateList: document.querySelector('[data-candidate-list]'),
  historyList: document.querySelector('[data-history-list]'),
  generatedAt: document.querySelector('[data-generated-at]'),
  actionStatus: document.querySelector('[data-action-status]'),
  refreshTime: document.querySelector('[data-refresh-time]'),
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

function laneCounts(inbox) {
  return inbox?.summary?.byLane ?? {};
}

function leadList(inbox) {
  return Array.isArray(inbox?.leads) ? inbox.leads : [];
}

function claimsList(state) {
  return Array.isArray(state?.claims) ? state.claims : [];
}

function profilesList(profiles) {
  return Array.isArray(profiles?.states) ? profiles.states : [];
}

function stateLeads(leads, profile) {
  return leads.filter((lead) => lead.state === profile.state || lead.state === profile.code);
}

function renderNext(data) {
  const next = data.preview ?? data.current;
  const profiles = profilesList(data.profiles);
  const leads = leadList(data.inbox);
  if (!next) return;

  const profile = profiles.find((item) => item.state === next.state);
  const matching = stateLeads(leads, profile ?? { state: next.state, code: next.stateCode });
  const ready = matching.filter((lead) => lead.lane === 'implementation_ready');
  const reason = next.selection?.reasons?.[1] ?? next.selection?.reasons?.[0] ?? 'Fairness rotation selected this state.';

  elements.nextMode.textContent = formatLabel(next.mode);
  elements.nextCode.textContent = next.stateCode;
  elements.nextState.textContent = next.state;
  elements.nextReason.textContent = reason;
  elements.nextLeads.textContent = matching.length;
  elements.nextReady.textContent = ready.length;
  elements.nextDifficulty.textContent = formatLabel(profile?.difficulty ?? 'standard');
  elements.generatedAt.textContent = `Previewed ${formatDate(next.generatedAt)}`;

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
    : '<p class="empty-state">This state has no queued candidate. The assignment will perform bounded fresh discovery.</p>';
}

function renderMetrics(data) {
  const inbox = data.inbox ?? {};
  const summary = inbox.summary ?? {};
  const lanes = laneCounts(inbox);
  const leads = leadList(inbox);
  const requests = Array.isArray(data.queue?.requests) ? data.queue.requests : [];
  const activeRequests = requests.filter((request) => request.status === 'queued' || request.status === 'running');
  const running = requests.find((request) => request.status === 'running');
  const ready = lanes.implementation_ready ?? 0;

  elements.totalLeads.textContent = summary.leadCount ?? leads.length;
  elements.totalCandidates.textContent = `${summary.totalLedgerCandidates ?? '—'} ledger candidates`;
  elements.readyLeads.textContent = ready;
  elements.researchLeads.textContent = Math.max(0, leads.length - ready);
  elements.queuedJobs.textContent = activeRequests.length;
  elements.queueSummary.textContent = running
    ? `${formatLabel(running.kind)} is running`
    : activeRequests.length > 0
      ? `${formatLabel(activeRequests[0].kind)} is waiting for the worker`
      : 'No work queued';

  const implementationButton = elements.actionButtons.find((button) => button.dataset.action === 'start-implementation');
  if (implementationButton) {
    implementationButton.disabled = ready === 0;
    implementationButton.title = ready === 0 ? 'No route has passed the research gates yet.' : '';
  }
}

function renderStates(data) {
  const profiles = profilesList(data.profiles);
  const leads = leadList(data.inbox);
  const claims = claimsList(data.state);
  const nextState = (data.preview ?? data.current)?.state;

  const rows = profiles.map((profile) => {
    const matching = stateLeads(leads, profile);
    const ready = matching.filter((lead) => lead.lane === 'implementation_ready').length;
    const latest = [...claims].reverse().find((claim) => claim.state === profile.state);
    return { profile, open: matching.length, ready, latest };
  }).sort((left, right) => {
    if (left.profile.state === nextState) return -1;
    if (right.profile.state === nextState) return 1;
    return right.open - left.open || left.profile.state.localeCompare(right.profile.state);
  });

  elements.stateTable.innerHTML = rows.map(({ profile, open, ready, latest }) => `
    <tr class="${profile.state === nextState ? 'is-next' : ''}">
      <td>
        <span class="state-name">
          <i class="${profile.difficulty === 'difficult' ? 'difficult' : ''}"></i>
          ${escapeHtml(profile.state)}
        </span>
      </td>
      <td>${open}</td>
      <td>${ready}</td>
      <td>
        <span class="result-pill ${latest ? '' : 'is-empty'}">
          ${escapeHtml(latest ? formatLabel(latest.outcome ?? latest.status) : 'Not run')}
        </span>
      </td>
      <td>${Number(profile.weight).toFixed(2)}</td>
    </tr>
  `).join('');
}

function renderLanes(data) {
  const lanes = laneCounts(data.inbox);
  const entries = Object.entries(lanes);
  const maximum = Math.max(1, ...entries.map(([, count]) => Number(count)));
  elements.laneList.innerHTML = entries.map(([lane, count]) => `
    <div class="lane-row">
      <strong>${escapeHtml(formatLabel(lane))}</strong>
      <span>${count}</span>
      <progress class="lane-meter" aria-label="${escapeHtml(formatLabel(lane))}" value="${Number(count)}" max="${maximum}"></progress>
    </div>
  `).join('');
}

function renderHistory(data) {
  const completed = claimsList(data.state)
    .filter((claim) => claim.status === 'completed')
    .slice(-6)
    .reverse();
  elements.historyList.innerHTML = completed.length
    ? completed.map((claim) => `
      <article class="history-item">
        <h3>${escapeHtml(claim.state)} · ${escapeHtml(formatLabel(claim.outcome))}</h3>
        <p>${escapeHtml(claim.notes ?? `${claim.candidateIds?.length ?? 0} candidates reviewed.`)}</p>
        <p>${escapeHtml(formatDate(claim.completedAt))} · ${claim.sourceAttempts?.length ?? 0} source attempts</p>
      </article>
    `).join('')
    : '<p class="empty-state">No completed runs yet.</p>';
}

function render(data) {
  dashboard = data;
  renderNext(data);
  renderMetrics(data);
  renderStates(data);
  renderLanes(data);
  renderHistory(data);
  elements.health.classList.add('is-ready');
  elements.health.querySelector('span:last-child').textContent = 'Control plane ready';
  elements.refreshTime.textContent = `Updated ${formatDate(data.generatedAt)}`;
}

async function refresh() {
  const response = await fetch('/api/status', { cache: 'no-store' });
  if (!response.ok) throw new Error('Could not load control-plane status.');
  render(await response.json());
}

async function performAction(action) {
  elements.actionButtons.forEach((button) => { button.disabled = true; });
  const isStart = action.startsWith('start-');
  const kind = action.replace('start-', '');
  elements.actionStatus.textContent = isStart
    ? `Adding ${kind} to the Codex work queue…`
    : 'Calculating the next fair assignment…';
  try {
    const endpoint = isStart ? `/api/start/${kind}` : `/api/${action}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'X-Route-Control-Token': token,
      },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? 'The action failed.');
    render(result.status);
    elements.actionStatus.textContent = isStart
      ? `${formatLabel(kind)} queued. The Codex worker will pick it up within five minutes.`
      : `Preview updated: ${result.status.preview?.state ?? 'next state selected'}.`;
  } catch (error) {
    elements.actionStatus.textContent = error instanceof Error ? error.message : String(error);
  } finally {
    elements.actionButtons.forEach((button) => {
      const isImplementation = button.dataset.action === 'start-implementation';
      const ready = laneCounts(dashboard?.inbox).implementation_ready ?? 0;
      button.disabled = isImplementation && ready === 0;
    });
  }
}

elements.actionButtons.forEach((button) => {
  button.addEventListener('click', () => performAction(button.dataset.action));
});

refresh().catch((error) => {
  elements.health.querySelector('span:last-child').textContent = 'Dashboard unavailable';
  elements.actionStatus.textContent = error instanceof Error ? error.message : String(error);
});

setInterval(() => {
  refresh().catch(() => {});
}, 30_000);
