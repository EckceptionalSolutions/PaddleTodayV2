import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.route('**/api/rivers/summary.json', (route) => route.fulfill({ status: 503, json: { error: 'Offline' } }));
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:favorites:v1', JSON.stringify({ version: 1, items: [{
      slug: 'rice-creek-peltier-to-long-lake', name: 'Rice Creek', reach: 'Peltier to Long Lake',
      savedAt: Date.now(), notes: 'Bring the blue kayak',
    }] }));
  });
});

test('saved routes survive a failed load and can retry without a reload', async ({ page }) => {
  await page.goto('/favorites/');
  await expect(page.locator('[data-favorites-summary]')).toContainText('Could not refresh');
  await expect(page.locator('[data-favorites-summary]')).not.toContainText('Updated recently');
  await expect(page.locator('[data-field="favorite-title-link"]')).toHaveText('Rice Creek');
  await expect(page.locator('[data-field="favorite-notes-text"]')).toHaveText('Bring the blue kayak');
  await expect(page.locator('[data-field="favorite-title-link"]')).toHaveAttribute('href', '/rivers/rice-creek-peltier-to-long-lake/');
  await page.route('**/api/rivers/summary.json', (route) => route.fulfill({ json: { rivers: [], snapshotStatus: 'fresh' } }));
  await page.locator('[data-favorites-refresh]').click();
  await expect(page.locator('[data-favorites-summary]')).not.toContainText('Could not refresh');
  await expect(page.locator('[data-favorites-refresh]')).toHaveText('Refresh calls');
  await expect(page.locator('[data-field="favorite-notes-text"]')).toHaveText('Bring the blue kayak');
});

test('editing a note does not erase the failed-refresh notice', async ({ page }) => {
  await page.goto('/favorites/');
  await expect(page.locator('[data-favorites-refresh]')).toHaveText('Try again');
  await page.locator('[data-favorite-notes]').click();
  await page.locator('[data-favorite-notes-dialog] textarea').fill('Bring two paddles');
  await page.locator('[data-favorite-notes-dialog] button[type="submit"]').click();
  await expect(page.locator('[data-field="favorite-notes-text"]')).toHaveText('Bring two paddles');
  await expect(page.locator('[data-favorites-summary]')).toContainText('Could not refresh');
  await expect(page.locator('[data-favorite-notes]')).toBeFocused();
});

test('a save action cannot replace unreadable stored routes', async ({ page }) => {
  await page.goto('/favorites/');
  const remove = page.getByRole('button', { name: /^Remove saved route: Rice Creek/ });
  await expect(remove).toBeVisible();
  const original = await page.evaluate(() => localStorage.getItem('paddletoday:favorites:v1'));
  await page.evaluate(() => localStorage.setItem('paddletoday:favorites:v1', '{"unfinished":'));
  await remove.click();
  await expect(page.locator('.action-feedback')).toContainText('Could not update Saved routes');
  expect(await page.evaluate(() => localStorage.getItem('paddletoday:favorites:v1'))).toBe('{"unfinished":');
  await page.evaluate((raw) => localStorage.setItem('paddletoday:favorites:v1', raw!), original);
  await remove.click();
  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  await expect(remove).toBeVisible();
  await expect(page.locator('[data-field="favorite-notes-text"]')).toHaveText('Bring the blue kayak');
});

test('unreadable saved storage shows retry instead of an empty list', async ({ page }) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.getItem;
    Storage.prototype.getItem = function (key) {
      if (key === 'paddletoday:favorites:v1' && !localStorage.getItem('qa:allow-saved-read')) throw new Error('QA unavailable');
      return original.call(this, key);
    };
  });
  await page.goto('/favorites/');
  const retry = page.getByRole('button', { name: 'Retry loading saved routes', exact: true });
  await expect(retry).toBeVisible();
  await expect(page.locator('[data-favorites-summary]')).toContainText('Your stored list has not been changed');
  await expect(page.locator('[data-favorites-empty]')).toBeHidden();
  await retry.press('Enter');
  await expect(retry).toBeEnabled();
  await page.evaluate(() => localStorage.setItem('qa:allow-saved-read', '1'));
  await retry.press('Enter');
  await expect(page.locator('[data-field="favorite-notes-text"]')).toHaveText('Bring the blue kayak');
  await expect(page.locator('[data-favorites-summary]')).toContainText('Could not refresh');
});

test('clearing browser data in another tab refreshes the saved list', async ({ page, context }) => {
  await page.goto('/favorites/');
  await expect(page.locator('[data-field="favorite-title-link"]')).toHaveText('Rice Creek');
  const otherTab = await context.newPage();
  try {
    await otherTab.goto('/about/');
    await otherTab.evaluate(() => localStorage.clear());
    await expect(page.locator('[data-favorites-empty]')).toBeVisible();
    await expect(page.locator('[data-favorites-grid]')).toBeHidden();
    await expect(page.locator('[data-favorites-summary]')).toHaveText('No routes saved on this device yet.');
  } finally {
    await otherTab.close();
  }
});

test('the saved list is usable while current calls are still loading', async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => { release = resolve; });
  await page.route('**/api/rivers/summary.json', async (route) => {
    await gate;
    await route.fulfill({ json: { rivers: [] } });
  });
  await page.goto('/favorites/');
  await expect(page.locator('[data-field="favorite-title-link"]')).toHaveText('Rice Creek');
  await expect(page.locator('[data-favorites-summary]')).toContainText('Checking current calls');
  await expect(page.locator('[data-favorites-refresh]')).toBeDisabled();
  release();
  await expect(page.locator('[data-favorites-refresh]')).toBeEnabled();
});
