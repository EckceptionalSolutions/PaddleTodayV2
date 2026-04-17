const root = document.querySelector('[data-admin-review]');
if (!(root instanceof HTMLElement)) {
  throw new Error('Missing admin review root.');
}

const loginPanel = root.querySelector('[data-admin-login-panel]');
const loginForm = root.querySelector('[data-admin-login-form]');
const passwordInput = root.querySelector('[data-admin-password]');
const loginStatus = root.querySelector('[data-admin-login-status]');
const toolbar = root.querySelector('[data-admin-toolbar]');
const toolbarStatus = root.querySelector('[data-admin-toolbar-status]');
const refreshButton = root.querySelector('[data-admin-refresh]');
const logoutButton = root.querySelector('[data-admin-logout]');
const statusFilter = root.querySelector('[data-admin-status-filter]');
const list = document.querySelector('[data-admin-submission-list]');
const emptyState = document.querySelector('[data-admin-empty]');
const statsPanel = document.querySelector('[data-admin-stats]');
const routeRequestsPanel = document.querySelector('[data-admin-route-requests]');
const routeRequestsList = document.querySelector('[data-admin-route-requests-list]');
const routeRequestsStatus = document.querySelector('[data-admin-route-requests-status]');

function setStatus(node, message, tone = '') {
  if (!(node instanceof HTMLElement)) return;
  node.textContent = message;
  node.classList.toggle('route-photo-form__status--success', tone === 'success');
  node.classList.toggle('route-photo-form__status--error', tone === 'error');
}

function contributionCardMarkup(submission) {
  const photos = Array.isArray(submission.files) ? submission.files : [];
  const report = typeof submission.trip?.report === 'string' ? submission.trip.report.trim() : '';
  const notes = typeof submission.notes === 'string' ? submission.notes.trim() : '';
  const metaLine = [submission.trip?.date, submission.trip?.sentiment, submission.contributor?.email].filter(Boolean).join(' / ');
  const reviewLine = submission.reviewedAt ? `Reviewed ${new Date(submission.reviewedAt).toLocaleString()}` : 'Pending review';

  return `
    <article class="admin-submission-card" data-submission-id="${submission.id}">
      <header class="admin-submission-card__head">
        <div>
          <p class="eyebrow">${submission.river?.name || 'Route'}</p>
          <h2>${submission.river?.reach || submission.river?.slug || submission.id}</h2>
          <p class="muted">${submission.contributor?.name || 'Unknown contributor'}${metaLine ? ` / ${metaLine}` : ''}</p>
        </div>
        <div class="admin-submission-card__status admin-submission-card__status--${submission.status}">${submission.status}</div>
      </header>

      ${report ? `<div class="admin-submission-card__block"><h3>Trip report</h3><p>${escapeHtml(report)}</p></div>` : ''}
      ${notes ? `<div class="admin-submission-card__block"><h3>Notes</h3><p>${escapeHtml(notes)}</p></div>` : ''}

      ${photos.length ? `
        <div class="admin-submission-card__block">
          <h3>Photos</h3>
          <div class="admin-submission-card__photos">
            ${photos
              .map(
                (file) => `
                  <figure class="admin-submission-card__photo">
                    <img src="${escapeAttribute(file.previewUrl)}" alt="${escapeAttribute(file.originalName || 'Submission photo')}" loading="lazy" />
                    <figcaption>${escapeHtml(file.originalName || file.fileName || 'Photo')}</figcaption>
                  </figure>
                `
              )
              .join('')}
          </div>
        </div>
      ` : ''}

      <footer class="admin-submission-card__footer">
        <p class="muted">${escapeHtml(reviewLine)}</p>
        <div class="admin-submission-card__actions">
          <button class="filter-chip" type="button" data-admin-action="approve">Approve</button>
          <button class="river-inline-button" type="button" data-admin-action="reject">Reject</button>
        </div>
      </footer>
      <p class="muted request-form__status" data-admin-card-status aria-live="polite"></p>
    </article>
  `;
}

function routeRequestMarkup(request) {
  const submitted = request.submittedAt ? new Date(request.submittedAt).toLocaleString() : 'Unknown time';
  return `
    <article class="admin-submission-card admin-submission-card--request">
      <header class="admin-submission-card__head">
        <div>
          <p class="eyebrow">${escapeHtml(request.state || 'State not set')}</p>
          <h2>${escapeHtml(request.routeName || 'Unnamed route request')}</h2>
          <p class="muted">Submitted ${escapeHtml(submitted)}${request.replyEmail ? ` / ${escapeHtml(request.replyEmail)}` : ''}</p>
        </div>
      </header>
      ${request.notes ? `<div class="admin-submission-card__block"><h3>Notes</h3><p>${escapeHtml(request.notes)}</p></div>` : ''}
      ${(request.putIn || request.takeOut) ? `<div class="admin-submission-card__block"><h3>Access</h3><p>${escapeHtml([request.putIn, request.takeOut].filter(Boolean).join(' to '))}</p></div>` : ''}
      ${request.sources ? `<div class="admin-submission-card__block"><h3>Sources</h3><p>${escapeHtml(request.sources)}</p></div>` : ''}
    </article>
  `;
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

async function fetchSession() {
  const response = await fetch('/api/admin/session', { headers: { accept: 'application/json' } });
  const payload = await response.json().catch(() => ({}));
  return { ok: response.ok, payload };
}

async function loadStats() {
  if (!(statsPanel instanceof HTMLElement)) return;
  const response = await fetch('/api/admin/stats', { headers: { accept: 'application/json' } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.message || 'Could not load stats.');
  const stats = payload?.stats?.riverAlerts || {};
  statsPanel.hidden = false;
  setText('[data-admin-alert-active]', stats.active ?? 0);
  setText('[data-admin-alert-total]', `${stats.total ?? 0} total alerts`);
  setText('[data-admin-alert-strong]', stats.strong ?? 0);
  setText('[data-admin-alert-good]', `${stats.good ?? 0} Good alerts`);
  setText('[data-admin-alert-rivers]', stats.riversCovered ?? 0);
}

async function loadRouteRequests() {
  if (!(routeRequestsPanel instanceof HTMLElement) || !(routeRequestsList instanceof HTMLElement)) return;
  setStatus(routeRequestsStatus, 'Loading route requests...');
  const response = await fetch('/api/admin/route-requests', { headers: { accept: 'application/json' } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.message || 'Could not load route requests.');
  const requests = Array.isArray(payload?.requests) ? payload.requests : [];
  routeRequestsPanel.hidden = false;
  routeRequestsList.innerHTML = requests.length ? requests.map(routeRequestMarkup).join('') : '<p class="muted">No route requests yet.</p>';
  setStatus(routeRequestsStatus, `${requests.length} route request${requests.length === 1 ? '' : 's'} loaded.`, 'success');
}

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node instanceof HTMLElement) node.textContent = String(value);
}

async function loadSubmissions() {
  if (!(list instanceof HTMLElement) || !(statusFilter instanceof HTMLSelectElement)) return;
  const status = statusFilter.value === 'all' ? '' : `?status=${encodeURIComponent(statusFilter.value)}`;
  setStatus(toolbarStatus, 'Loading submissions...');
  const response = await fetch(`/api/admin/route-contributions${status}`, { headers: { accept: 'application/json' } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.message || 'Could not load submissions.');
  }

  const submissions = Array.isArray(payload?.submissions) ? payload.submissions : [];
  list.hidden = false;
  list.innerHTML = submissions.map(contributionCardMarkup).join('');
  if (emptyState instanceof HTMLElement) {
    emptyState.hidden = submissions.length > 0;
    if (!emptyState.hidden) {
      list.appendChild(emptyState);
    }
  }
  bindCardActions();
  setStatus(toolbarStatus, `${submissions.length} submission${submissions.length === 1 ? '' : 's'} loaded.`, 'success');
}

function bindCardActions() {
  if (!(list instanceof HTMLElement)) return;
  const cards = Array.from(list.querySelectorAll('[data-submission-id]'));
  for (const card of cards) {
    if (!(card instanceof HTMLElement) || card.dataset.bound === 'true') continue;
    card.dataset.bound = 'true';
    const statusNode = card.querySelector('[data-admin-card-status]');
    const buttons = Array.from(card.querySelectorAll('[data-admin-action]'));
    for (const button of buttons) {
      if (!(button instanceof HTMLButtonElement)) continue;
      button.addEventListener('click', async () => {
        const submissionId = card.dataset.submissionId;
        const action = button.dataset.adminAction;
        if (!submissionId || !action) return;
        buttons.forEach((item) => {
          if (item instanceof HTMLButtonElement) item.disabled = true;
        });
        setStatus(statusNode, `${action === 'approve' ? 'Approving' : 'Rejecting'} submission...`);
        try {
          const response = await fetch(`/api/admin/route-contributions/${encodeURIComponent(submissionId)}/review`, {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
            },
            body: JSON.stringify({ action, reviewer: 'Admin' }),
          });
          const payload = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(payload?.message || 'Could not review submission.');
          }
          setStatus(statusNode, action === 'approve' ? 'Approved.' : 'Rejected.', 'success');
          await loadSubmissions();
        } catch (error) {
          setStatus(statusNode, error instanceof Error ? error.message : 'Could not review submission.', 'error');
        } finally {
          buttons.forEach((item) => {
            if (item instanceof HTMLButtonElement) item.disabled = false;
          });
        }
      });
    }
  }
}

async function refreshAdminState() {
  const { ok, payload } = await fetchSession();
  const authenticated = ok && payload?.authenticated === true;
  if (loginPanel instanceof HTMLElement) loginPanel.hidden = authenticated;
  if (toolbar instanceof HTMLElement) toolbar.hidden = !authenticated;
  if (list instanceof HTMLElement) list.hidden = !authenticated;
  if (statsPanel instanceof HTMLElement) statsPanel.hidden = !authenticated;
  if (routeRequestsPanel instanceof HTMLElement) routeRequestsPanel.hidden = !authenticated;

  if (payload?.configured === false && loginPanel instanceof HTMLElement) {
    setStatus(loginStatus, 'Admin access is not configured yet. Set PADDLETODAY_ADMIN_PASSWORD on the server.', 'error');
  }

  if (authenticated) {
    await Promise.all([loadSubmissions(), loadStats(), loadRouteRequests()]);
  }
}

if (loginForm instanceof HTMLFormElement && passwordInput instanceof HTMLInputElement) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus(loginStatus, 'Signing in...');
    try {
      const response = await fetch('/api/admin/session', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ password: passwordInput.value }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.message || 'Invalid password.');
      }
      passwordInput.value = '';
      setStatus(loginStatus, 'Signed in.', 'success');
      await refreshAdminState();
    } catch (error) {
      setStatus(loginStatus, error instanceof Error ? error.message : 'Could not sign in.', 'error');
    }
  });
}

if (refreshButton instanceof HTMLButtonElement) {
  refreshButton.addEventListener('click', async () => {
    await Promise.all([loadSubmissions(), loadStats(), loadRouteRequests()]);
  });
}

if (logoutButton instanceof HTMLButtonElement) {
  logoutButton.addEventListener('click', async () => {
    await fetch('/api/admin/logout', { method: 'POST', headers: { accept: 'application/json' } });
    await refreshAdminState();
    setStatus(toolbarStatus, 'Signed out.');
  });
}

if (statusFilter instanceof HTMLSelectElement) {
  statusFilter.addEventListener('change', async () => {
    await loadSubmissions();
  });
}

refreshAdminState().catch((error) => {
  setStatus(loginStatus, error instanceof Error ? error.message : 'Could not load admin page.', 'error');
});
