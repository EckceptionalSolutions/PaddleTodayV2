import { readGuestFavorites } from './favorites-store.js';
import { exportSavedRoutes, importSavedRoutes, resolveSavedRoute, savedRoutesSession, syncSavedRoutes } from '../lib/web-saved-routes';
const panel = document.querySelector<HTMLElement>('[data-saved-account]');
const esc = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const button = (action: string, label: string, slug = '') => `<button class="filter-chip" type="button" data-saved-action="${action}" data-slug="${esc(slug)}">${label}</button>`;
function render() {
  if (!panel) return;
  const session = savedRoutesSession();
  if (session.mode === 'loading') { panel.innerHTML = '<p role="status">Checking your account…</p>'; return; }
  if (session.mode === 'guest') { panel.innerHTML = session.enabled ? '<p>Saved on this browser. Sign in to keep saved routes and private notes together on web and mobile.</p><a class="filter-chip" href="/account/web/?next=saved">Sign in to sync saved routes</a>' : '<p>Saved on this browser. Website sign-in is currently unavailable; your browser saves and private notes remain available here.</p>'; return; }
  let guests = 0, guestError = false, separate = false;
  try { guests = readGuestFavorites().length; separate = localStorage.getItem('paddletoday:saved-import-choice:' + session.uid) === 'separate'; } catch { guestError = true; }
  const focused = panel.contains(document.activeElement) ? (document.activeElement as HTMLElement).dataset : null;
  panel.innerHTML = `<p class="eyebrow">Your account · Saved routes</p><p role="status">${session.error ? esc(session.error) : !session.ready ? 'Loading account routes…' : session.syncing ? 'Syncing saved routes…' : session.pending ? `${session.pending} change(s) saved on this browser, waiting to sync or review.` : 'Saved to your account. Routes and private notes are available on web and mobile.'}</p><div class="saved-account-actions">${button('sync', 'Sync now')}${session.pending || session.error ? button('export', 'Download recovery copy') : ''}</div>
    ${session.pending ? '<p class="muted">Pending edits stay on this browser for this account when you sign out.</p>' : ''}
    ${guestError ? '<p>Browser-only saves could not be read. They have been kept unchanged for recovery.</p>' : guests ? `<details ${separate ? '' : 'open'}><summary>${guests} browser-only saved route${guests === 1 ? '' : 's'}</summary><p>Import these routes and notes into this account, or keep them separate. The browser copies remain available when signed out. Conflicting notes will be kept for review.</p><div class="saved-account-actions">${button('import', 'Import browser saves')}${button('separate', 'Keep separate')}</div></details>` : ''}
    ${session.conflicts.length ? `<h2>Review changes from another device</h2>${session.conflicts.map(c => `<article class="saved-route-conflict"><h3>${esc(c.local?.name || c.cloud?.name || c.slug)}</h3><div class="saved-conflict-versions"><div><h4>Your pending version</h4><p>${c.local ? 'Saved route' : 'Route removed'}</p><pre>${esc(c.local?.notes || 'No note')}</pre></div><div><h4>Account version</h4><p>${c.cloud ? 'Saved route' : 'Route removed'}</p><pre>${esc(c.cloud?.notes || 'No note')}</pre></div></div><div class="saved-account-actions">${button('local', 'Use my version', c.slug)}${button('cloud', 'Use account version', c.slug)}</div></article>`).join('')}` : ''}`;
  panel.querySelectorAll<HTMLButtonElement>('button').forEach(b => { b.disabled = session.syncing || (b.dataset.savedAction !== 'sync' && b.dataset.savedAction !== 'export' && !session.ready); });
  if (focused?.savedAction) Array.from(panel.querySelectorAll<HTMLButtonElement>('button')).find(b => b.dataset.savedAction === focused.savedAction && b.dataset.slug === focused.slug)?.focus({ preventScroll: true });
}
panel?.addEventListener('click', event => {
  const target = (event.target as Element).closest<HTMLElement>('[data-saved-action]');
  if (!target) return;
  try {
    const action = target.dataset.savedAction, uid = savedRoutesSession().uid;
    if (action === 'sync') { void syncSavedRoutes(); return; }
    if (action === 'import') { importSavedRoutes(readGuestFavorites()); localStorage.setItem('paddletoday:saved-import-choice:' + uid, 'separate'); }
    if (action === 'separate') localStorage.setItem('paddletoday:saved-import-choice:' + uid, 'separate');
    if (action === 'local' || action === 'cloud') resolveSavedRoute(target.dataset.slug!, action);
    if (action === 'export') { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([exportSavedRoutes()], { type: 'application/json' })); a.download = 'paddletoday-saved-route-recovery.json'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); }
    render();
  } catch (error) { const status = panel?.querySelector('[role=status]'); if (status) status.textContent = error instanceof Error ? error.message : 'Could not complete this change. Your saved data was kept.'; }
});
window.addEventListener('paddletoday:favorites-change', render);
render();
