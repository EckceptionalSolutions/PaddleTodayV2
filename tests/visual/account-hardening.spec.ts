import { expect, test } from '@playwright/test';
import { accountFixture, trip, past, log, uid } from './account-fixture';

test.skip(process.env.PADDLETODAY_TEST_AUTH !== '1', 'Requires isolated auth fixtures.');

test('trip and private-log drafts survive Back and deep-link reloads', async ({ page }) => {
  await accountFixture(page);
  await page.goto(`/trips/?id=${trip.id}`);
  await page.getByRole('button', { name: 'Edit trip', exact: true }).click();
  if (!await page.getByLabel('Trip title', { exact: true }).isVisible()) await page.getByText('More details', { exact: true }).click();
  await page.getByLabel('Trip title', { exact: true }).fill('Unfinished edit');
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Resume editing' })).toBeVisible();
  await page.reload();
  await expect(page.getByLabel('Trip title', { exact: true })).toHaveValue('Unfinished edit');
  await page.goto(`/trips/?id=${past.id}`);
  await page.getByRole('button', { name: 'Open paddle log' }).click();
  await page.getByRole('textbox', { name: 'Notes', exact: true }).fill('Unfinished private memory');
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Resume editing' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('textbox', { name: 'Notes', exact: true })).toHaveValue('Unfinished private memory');
});

test('Plan again uses a new URL and restores the new outing on reload', async ({ page }) => {
  await accountFixture(page);
  await page.goto(`/trips/?id=${past.id}`);
  await page.getByRole('button', { name: 'Plan again', exact: true }).click();
  await expect(page).toHaveURL(/\/trips\/$/);
  if (!await page.getByLabel('Trip title', { exact: true }).isVisible()) await page.getByText('More details', { exact: true }).click();
  await page.getByLabel('Trip title', { exact: true }).fill('Another Saturday');
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Resume editing', exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByLabel('Trip title', { exact: true })).toHaveValue('Another Saturday');
  await expect(page.getByLabel('Planned date (optional)')).toHaveValue('');
});

test('guest save opens sign-in with keyboard focus and preserves the draft', async ({ page }) => {
  await page.route('**/api/**', r => r.fulfill({ json: { rivers: [] } }));
  await page.goto('/trips/');
  await page.getByRole('button', { name: 'Plan a trip', exact: true }).click();
  await page.getByLabel('River or location', { exact: true }).fill('Local creek');
  if (!await page.getByLabel('Trip title', { exact: true }).isVisible()) await page.getByText('More details', { exact: true }).click();
  await page.getByLabel('Trip title', { exact: true }).fill('Saturday paddle');
  await page.getByRole('button', { name: 'Save and sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Save your trip to your account' })).toBeFocused();
  await expect(page.getByRole('button', { name: 'Continue with Google' })).toBeVisible();
  await page.getByRole('button', { name: 'Keep planning here' }).click();
  await page.getByRole('button', { name: 'Continue draft' }).click();
  await expect(page.getByLabel('Trip title', { exact: true })).toHaveValue('Saturday paddle');
});

test('conflict review combines selected local fields with latest server fields', async ({ page }) => {
  await accountFixture(page);
  const latest = { ...trip, revision: 5, title: 'Friend’s title', date: '2099-11-11' };
  let saved = latest;
  let mutation: any;
  await page.route('**/api/trips', r => r.fulfill({ json: { trips: [saved], logs: [], nextCursor: null } }));
  await page.route(`**/api/trips/${trip.id}`, r => {
    if (r.request().method() === 'GET') return r.fulfill({ json: { trip: latest } });
    mutation = r.request().postDataJSON();
    saved = { ...latest, ...mutation.command.plan, revision: 6 };
    return r.fulfill({ json: { trip: saved } });
  });
  await page.goto('/trips/');
  await expect(page.locator('#trips-app')).toHaveAttribute('aria-busy', 'false');
  await page.evaluate(async ({ trip, uid }) => {
    const db = await new Promise<IDBDatabase>((resolve, reject) => { const request = indexedDB.open('paddletoday-trips', 1); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); });
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('state', 'readwrite'), store = tx.objectStore('state'), key = `paddletoday:trips:v1:${uid}`;
      const request = store.get(key);
      request.onsuccess = () => { const state = JSON.parse(request.result); state.pending = [{ kind: 'trip', id: trip.id, key: 'conflicting-operation', error: 'The trip changed on another device.', input: { operationId: 'conflicting-operation', baseRevision: 1, command: { type: 'plan', plan: { ...trip, title: 'My title' }, baseline: trip } } }]; store.put(JSON.stringify(state), key); };
      tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error);
    }); db.close();
  }, { trip, uid });
  await page.reload();
  await page.getByRole('button', { name: 'Review saved change' }).click();
  await expect(page.getByRole('heading', { name: 'Review your saved change' })).toBeVisible();
  await expect(page.locator('.trip-review')).toContainText('Friend’s title');
  await page.locator('input[name="review-title"][value="mine"]').check();
  await page.screenshot({ path: test.info().outputPath('conflict-review.png'), fullPage: true });
  await page.getByRole('button', { name: 'Save selected values' }).click();
  await expect(page.getByRole('heading', { name: 'My title' })).toBeVisible();
  expect(mutation.baseRevision).toBe(5);
  expect(mutation.command.plan.date).toBe(latest.date);
  expect(mutation.command.baseline.title).toBe(latest.title);
});

test('slow saves lock the form and interrupted photos remain queued after reload', async ({ page }) => {
  await accountFixture(page);
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route(`**/api/paddle-logs/${log.id}`, async r => {
    await pending;
    await r.fulfill({ json: { log: { ...log, ...r.request().postDataJSON().value, revision: 2 } } });
  });
  await page.goto(`/trips/?id=${past.id}`);
  await page.getByRole('button', { name: 'Open paddle log' }).click();
  await page.getByRole('textbox', { name: 'Notes', exact: true }).fill('Saved before adding photos');
  await page.getByRole('button', { name: 'Save paddle', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Notes', exact: true })).toBeDisabled();
  release();
  await expect(page.getByRole('button', { name: 'Save paddle', exact: true })).toBeEnabled();
  await page.route('**/api/paddle-logs/*/photos/*', r => r.fulfill({ status: 503, json: { message: 'Temporarily offline' } }));
  await page.getByLabel('Add paddle photos').setInputFiles({ name: 'river.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j4X8AAAAASUVORK5CYII=', 'base64') });
  await expect(page.getByText('1 change(s) waiting to sync.', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Add paddle photos')).toBeEnabled();
  await page.reload();
  await expect(page.getByText('1 change(s) waiting to sync.', { exact: true })).toBeVisible();
});
