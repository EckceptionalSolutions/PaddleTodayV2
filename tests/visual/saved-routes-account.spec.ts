import { expect, test, type Page } from '@playwright/test';
import type { AccountSyncSnapshot, SyncedRoute } from '@paddletoday/api-contract';
import { accountFixture } from './account-fixture';
test.skip(process.env.PADDLETODAY_TEST_AUTH !== '1', 'Requires the isolated local Firebase fixture.');
const cloudRoute: SyncedRoute = { slug: 'rice-creek-peltier-to-long-lake', name: 'Rice Creek', reach: 'Peltier to Long Lake', savedAt: '2026-09-29T12:00:00Z', notes: 'From mobile' };
async function fixture(page: Page, guest = false) {
  await accountFixture(page);
  const snapshot: AccountSyncSnapshot = { version: 1, epoch: 1, revision: 1, updatedAt: '2026-09-29T12:00:00Z', routes: [cloudRoute], drafts: [], receipts: [], entityRevisions: { routes: { [cloudRoute.slug]: 1 }, drafts: {} } };
  let offline = false;
  await page.route('**/api/rivers/summary.json*', r => r.fulfill({ status: 503, json: { message: 'Conditions unavailable' } }));
  await page.route('**/api/account/sync', r => {
    if (offline) return r.fulfill({ status: 503, json: { message: 'Saved routes are offline. Pending changes stay here.' } });
    if (r.request().method() === 'GET') return r.fulfill({ json: { snapshot } });
    const receipts = r.request().postDataJSON().operations.map((op: any) => {
      const old = snapshot.receipts.find(receipt => receipt.operationId === op.operationId); if (old) return old;
      const slug = op.value?.slug || op.slug, revision = snapshot.entityRevisions.routes[slug] || 0;
      if (revision !== op.baseRevision) return { operationId: op.operationId, status: 'conflict', revision, entity: snapshot.routes.find(route => route.slug === slug) || null };
      snapshot.routes = snapshot.routes.filter(route => route.slug !== slug); if (op.type === 'put-route') snapshot.routes.push(op.value);
      snapshot.entityRevisions.routes[slug] = ++snapshot.revision;
      return { operationId: op.operationId, status: 'applied', revision: snapshot.revision, entity: op.value || null };
    });
    snapshot.receipts.push(...receipts); return r.fulfill({ json: { snapshot, receipts } });
  });
  if (guest) await page.addInitScript(() => {
    if (localStorage.getItem('paddletoday:favorites:v1')) return;
    localStorage.setItem('paddletoday:favorites:v1', JSON.stringify({ version: 1, items: [{ slug: 'guest-river', name: 'Guest River', reach: '', savedAt: Date.now(), notes: 'Browser private note' }] }));
  });
  return { get: () => snapshot, setOffline: (value: boolean) => { offline = value; }, phoneNote: (note: string) => { snapshot.routes = [{ ...cloudRoute, notes: note }]; snapshot.entityRevisions.routes[cloudRoute.slug] = ++snapshot.revision; } };
}

test('mobile saves load, web notes sync, and Saved can start a plan', async ({ page }) => {
  const server = await fixture(page); await page.goto('/favorites/');
  await expect(page.locator('[data-field=favorite-notes-text]')).toHaveText('From mobile');
  await expect(page.locator('[data-saved-account]')).toContainText('Saved to your account');
  await page.locator('[data-favorite-notes]').click(); await page.getByLabel('Your note', { exact: true }).fill('From web');
  await page.getByRole('button', { name: 'Save note', exact: true }).click();
  await expect.poll(() => server.get().routes[0].notes).toBe('From web');
  await page.reload(); await expect(page.locator('[data-field=favorite-notes-text]')).toHaveText('From web');
  server.phoneNote('Updated on phone'); await page.getByRole('button', { name: 'Sync now' }).click();
  await expect(page.locator('[data-field=favorite-notes-text]')).toHaveText('Updated on phone');
  await expect(page.locator('[data-favorite-plan]')).toHaveAttribute('href', /route=rice-creek-peltier-to-long-lake/);
  await expect(page.locator('script[src*="umami"]')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: test.info().outputPath('account-saved-routes.png'), fullPage: true });
});

test('browser import is explicit and repeated attempts do not duplicate saves', async ({ page }) => {
  const server = await fixture(page, true); await page.goto('/favorites/');
  await expect(page.locator('[data-saved-account]')).toContainText('1 browser-only saved route');
  await expect(page.locator('[data-favorites-grid]')).not.toContainText('Guest River');
  await page.getByRole('button', { name: 'Keep separate' }).click(); expect(server.get().routes).toHaveLength(1);
  await page.locator('[data-saved-account] summary').click();
  await page.getByRole('button', { name: 'Import browser saves' }).click();
  await expect.poll(() => server.get().routes.length).toBe(2);
  await expect(page.locator('[data-saved-account]')).toContainText('Saved to your account');
  await page.locator('[data-saved-account] summary').click();
  await page.getByRole('button', { name: 'Import browser saves' }).click();
  await expect(page.locator('[data-saved-account]')).toContainText('Saved to your account');
  expect(server.get().routes).toHaveLength(2);
  expect(await page.evaluate(() => localStorage.getItem('paddletoday:favorites:v1'))).toContain('Browser private note');
});

test('offline edits survive reload, conflicts preserve both notes, sign-out isolates account data', async ({ page }) => {
  const server = await fixture(page, true); await page.goto('/favorites/');
  await expect(page.locator('[data-field=favorite-notes-text]')).toHaveText('From mobile');
  server.setOffline(true); await page.locator('[data-favorite-notes]').click(); await page.getByLabel('Your note', { exact: true }).fill('Offline web note');
  await page.getByRole('button', { name: 'Save note', exact: true }).click();
  await expect(page.locator('[data-saved-account]')).toContainText('temporarily unavailable');
  await page.reload(); await expect(page.locator('[data-field=favorite-notes-text]')).toHaveText('Offline web note');
  server.phoneNote('Concurrent phone note'); server.setOffline(false);
  await page.getByRole('button', { name: 'Sync now' }).click();
  await expect(page.locator('.saved-route-conflict')).toContainText('Offline web note');
  await expect(page.locator('.saved-route-conflict')).toContainText('Concurrent phone note');
  await page.getByRole('button', { name: 'Use account version' }).click();
  await expect(page.locator('[data-field=favorite-notes-text]')).toHaveText('Concurrent phone note');
  await expect(page.locator('.saved-route-conflict')).toHaveCount(0);
  await page.getByRole('button', { name: 'Open account menu' }).click(); await page.locator('[data-account-sign-out]').click();
  await expect(page.locator('[data-favorites-grid]')).toContainText('Browser private note');
  await expect(page.locator('[data-favorites-grid]')).not.toContainText('Concurrent phone note');
});

test('account removal syncs a deletion and Undo restores its note', async ({ page }) => {
  const server = await fixture(page); await page.goto('/favorites/');
  await expect(page.locator('[data-field=favorite-notes-text]')).toHaveText('From mobile');
  await page.locator('[data-favorites-grid] [data-favorite-button]').click();
  await expect.poll(() => server.get().routes.length).toBe(0);
  await page.locator('.action-feedback').getByRole('button', { name: 'Undo', exact: true }).click();
  await expect.poll(() => server.get().routes[0]?.notes).toBe('From mobile');
  await expect(page.locator('[data-field=favorite-notes-text]')).toHaveText('From mobile');
});

test('account errors are recoverable and saved-route sign-in callbacks return to Saved', async ({ page }) => {
  const server = await fixture(page); server.setOffline(true); await page.goto('/account/web/?next=saved');
  await expect(page).toHaveURL(/\/favorites\/$/);
  await expect(page.locator('[data-saved-account]')).toContainText('temporarily unavailable');
  await expect(page.locator('[data-favorites-empty]')).toBeHidden();
  server.setOffline(false); await page.getByRole('button', { name: 'Sync now' }).click();
  await expect(page.locator('[data-field=favorite-notes-text]')).toHaveText('From mobile');
});

test('saving from a public route page writes to the account and appears in Saved', async ({ page }) => {
  const server = await fixture(page); server.get().routes = []; server.get().entityRevisions.routes = {};
  const loaded = page.waitForResponse(r => r.url().endsWith('/api/account/sync') && r.request().method() === 'GET');
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/'); await loaded;
  const save = page.locator('[data-favorite-button][data-favorite-slug="rice-creek-peltier-to-long-lake"]').first();
  await save.click();
  await expect.poll(() => server.get().routes.length).toBe(1);
  expect(await page.evaluate(() => localStorage.getItem('paddletoday:favorites:v1'))).toBeNull();
  await page.goto('/favorites/');
  await expect(page.locator('[data-favorites-grid]')).toContainText('Rice Creek');
});
