import { test, expect } from '@playwright/test';

test('removal and Undo show pending state and recover from failed storage', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:saved-rivers', JSON.stringify([{
      slug: 'rice-creek-peltier-to-long-lake', name: 'Rice Creek', reach: 'Peltier to Long Lake',
      savedAt: '2026-09-06T12:00:00.000Z', notes: 'Keep my parking note.',
    }]));
    const original = Storage.prototype.setItem;
    const state = window as any;
    state.saveAttempts = 0;
    // AsyncStorage web resolves setItem's return value. Defer that boundary
    // to model asynchronous device storage without blocking the render thread.
    Storage.prototype.setItem = function (key, value) {
      if (key !== 'paddletoday:saved-rivers') return original.call(this, key, value);
      state.saveAttempts++;
      return new Promise<void>((resolve, reject) => {
        state.releaseSave = (fail = false) => {
          if (fail) reject(new Error('Storage unavailable'));
          else { original.call(this, key, value); resolve(); }
        };
      }) as unknown as void;
    };
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/saved');
  const remove = page.getByRole('button', { name: 'Remove saved route: Rice Creek: Peltier to Long Lake', exact: true });
  await remove.click();
  await expect(remove).toBeDisabled();
  await expect(remove).toHaveAttribute('aria-busy', 'true');
  await expect(remove).toHaveText('Removing…');
  await remove.evaluate((button: HTMLElement) => button.click());
  expect(await page.evaluate(() => (window as any).saveAttempts)).toBe(1);
  await page.evaluate(() => (window as any).releaseSave(true));
  await expect(remove).toBeEnabled();
  await expect(page.getByText('Could not update Saved routes. Please try again.', { exact: true })).toBeVisible();
  await remove.click();
  await expect(remove).toBeDisabled();
  await page.evaluate(() => (window as any).releaseSave());
  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  const restoring = page.getByRole('button', { name: 'Restoring…', exact: true });
  await expect(restoring).toBeDisabled();
  await expect(restoring).toHaveAttribute('aria-busy', 'true');
  await restoring.evaluate((button: HTMLElement) => button.click());
  expect(await page.evaluate(() => (window as any).saveAttempts)).toBe(3);
  await page.evaluate(() => (window as any).releaseSave());
  await expect(remove).toBeEnabled();
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:saved-rivers')!));
  expect(saved).toHaveLength(1);
  expect(saved[0].notes).toBe('Keep my parking note.');
});
