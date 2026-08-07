const root = document.querySelector('[data-operations-root]');
if (!(root instanceof HTMLElement)) throw new Error('Missing operations root.');

const privatePanel = root.querySelector('[data-operations-private]');
const loginPanel = root.querySelector('[data-operations-login]');
const sessionPanel = root.querySelector('[data-operations-session]');
const loginForm = root.querySelector('[data-operations-login-form]');
const password = root.querySelector('[data-operations-password]');
const status = root.querySelector('[data-operations-login-status]');
const logout = root.querySelector('[data-operations-logout]');
const freshness = root.querySelector('[data-operations-freshness]');
const routeRequests = root.querySelector('[data-operations-route-requests]');
const unreplied = root.querySelector('[data-operations-unreplied]');
const contributions = root.querySelector('[data-operations-contributions]');
const githubStatus = root.querySelector('[data-operations-github-status]');
const openPrs = root.querySelector('[data-operations-open-prs]');
const githubFailures = root.querySelector('[data-operations-github-failures]');

function showAuthenticated(authenticated) {
  if (privatePanel instanceof HTMLElement) privatePanel.hidden = !authenticated;
  if (loginPanel instanceof HTMLElement) loginPanel.hidden = authenticated;
  if (sessionPanel instanceof HTMLElement) sessionPanel.hidden = !authenticated;
}

async function checkSession() {
  const response = await fetch('/api/admin/session', { headers: { accept: 'application/json' } });
  const payload = await response.json().catch(() => ({}));
  showAuthenticated(payload.authenticated === true);
  if (payload.authenticated === true) await loadOperations();
}

async function loadOperations() {
  const response = await fetch('/api/admin/operations', { headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error('Operations snapshot unavailable.');
  const payload = await response.json();
  const demand = payload.demand || {};
  const github = payload.github || {};
  if (routeRequests instanceof HTMLElement) routeRequests.textContent = String(demand.routeRequests ?? 0);
  if (unreplied instanceof HTMLElement) unreplied.textContent = String(demand.unrepliedRouteRequests ?? 0);
  if (contributions instanceof HTMLElement) contributions.textContent = String(demand.pendingContributions ?? 0);
  if (openPrs instanceof HTMLElement) openPrs.textContent = String(github.pullRequests?.length ?? 0);
  if (githubFailures instanceof HTMLElement) githubFailures.textContent = String(github.failureCount ?? 0);
  if (githubStatus instanceof HTMLElement) githubStatus.textContent = github.available === false ? 'GitHub telemetry unavailable' : `Updated ${new Date(github.fetchedAt || Date.now()).toLocaleTimeString()}`;
  if (freshness instanceof HTMLElement) freshness.textContent = `Updated ${new Date().toLocaleTimeString()}`;
}

loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!(password instanceof HTMLInputElement)) return;
  if (status instanceof HTMLElement) status.textContent = 'Signing in…';
  const response = await fetch('/api/admin/session', {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ password: password.value }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (status instanceof HTMLElement) status.textContent = payload.message || 'Could not sign in.';
    showAuthenticated(false);
    return;
  }
  password.value = '';
  if (status instanceof HTMLElement) status.textContent = '';
  showAuthenticated(true);
  loadOperations().catch(() => {
    if (freshness instanceof HTMLElement) freshness.textContent = 'Runtime demand unavailable';
  });
});

logout?.addEventListener('click', async () => {
  await fetch('/api/admin/logout', { method: 'POST', headers: { accept: 'application/json' } });
  showAuthenticated(false);
});

checkSession().catch(() => showAuthenticated(false));
