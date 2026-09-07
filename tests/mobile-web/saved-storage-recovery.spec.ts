import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const raw of ['{"unfinished":', '{"routes":[]}', '[{"slug":"legacy-route"}]']) {
  test(`unreadable saved data stays intact until a successful retry: ${raw}`, async ({ page }) => {
    await page.addInitScript((raw) => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      localStorage.setItem('paddletoday:saved-rivers', raw);
    }, raw);
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
    await page.goto('/river/rice-creek-peltier-to-long-lake');
    const retry = page.getByRole('button', { name: 'Retry loading saved routes', exact: true });
    await expect(retry).toBeVisible();
    await page.getByRole('button', { name: /^Save route: / }).first().press('Space');
    expect(await page.evaluate(() => localStorage.getItem('paddletoday:saved-rivers'))).toBe(raw);
    await page.evaluate(() => localStorage.setItem('paddletoday:saved-rivers', JSON.stringify([{
      slug: 'rice-creek-peltier-to-long-lake', name: 'Rice Creek', reach: 'Peltier Lake to Long Lake',
      savedAt: '2026-09-06T12:00:00.000Z', notes: 'Recovered notes',
    }])));
    await retry.press('Space');
    await expect(retry).toBeHidden();
    await expect(page.getByRole('button', { name: /^Remove saved route: / }).first()).toBeVisible();
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:saved-rivers')!)[0].notes)).toBe('Recovered notes');
  });
}

test('a failed saved-list read cannot overwrite existing routes and retry restores them', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:saved-rivers', JSON.stringify([{
      slug: 'rice-creek-peltier-to-long-lake', name: 'Rice Creek', reach: 'Peltier Lake to Long Lake',
      savedAt: '2026-09-06T12:00:00.000Z', notes: 'Bring the spare paddle.',
    }]));
    const getItem = Storage.prototype.getItem;
    const setItem = Storage.prototype.setItem;
    const state = window as unknown as { allowSavedRead: boolean; savedWrites: number; readSaved: () => string | null };
    state.allowSavedRead = false;
    state.savedWrites = 0;
    state.readSaved = () => getItem.call(localStorage, 'paddletoday:saved-rivers');
    Storage.prototype.getItem = function (key) {
      if (key === 'paddletoday:saved-rivers' && !state.allowSavedRead) throw new Error('QA read unavailable');
      return getItem.call(this, key);
    };
    Storage.prototype.setItem = function (key, value) {
      if (key === 'paddletoday:saved-rivers') state.savedWrites += 1;
      return setItem.call(this, key, value);
    };
  });
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  const retry = page.getByRole('button', { name: 'Retry loading saved routes', exact: true });
  await expect(retry).toBeVisible();
  const save = page.getByRole('button', { name: /^Save route: / }).first();
  await expect(save).toHaveAccessibleName(`Save route: ${fixture.result.river.name}: ${fixture.result.river.reach}`);
  await expect(save).toHaveAttribute('aria-pressed', 'false');
  const saveBounds = await save.boundingBox();
  expect(saveBounds?.height).toBeGreaterThanOrEqual(44);
  await save.click();
  expect(await page.evaluate(() => (window as unknown as { savedWrites: number }).savedWrites)).toBe(0);
  await retry.click();
  await expect(retry).toBeEnabled();
  await expect(page.getByText('Could not load Saved routes from this device. Retry loading before changing your saved list.', { exact: true })).toBeVisible();
  await page.goto('/saved');
  await expect(retry).toBeVisible();
  await expect(page.getByText('No saved routes yet', { exact: true })).toBeHidden();
  await page.evaluate(() => { (window as unknown as { allowSavedRead: boolean }).allowSavedRead = true; });
  await retry.click();
  await expect(retry).toBeHidden();
  await page.getByRole('link', { name: 'Open Rice Creek: Peltier Lake to Long Lake', exact: true }).click();
  const remove = page.getByRole('button', { name: /^Remove saved route: / }).first();
  await expect(remove).toHaveAccessibleName(`Remove saved route: ${fixture.result.river.name}: ${fixture.result.river.reach}`);
  await expect(remove).toBeVisible();
  await expect(remove).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => (window as unknown as { savedWrites: number }).savedWrites)).toBe(0);
  await remove.evaluate((button: HTMLElement) => { button.click(); button.click(); });
  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  await expect(remove).toBeVisible();
  await expect(remove).toHaveAttribute('aria-pressed', 'true');
  const saved = await page.evaluate(() => JSON.parse((window as unknown as { readSaved: () => string }).readSaved()));
  expect(saved).toHaveLength(1);
  expect(saved[0].notes).toBe('Bring the spare paddle.');
  expect(await page.evaluate(() => (window as unknown as { savedWrites: number }).savedWrites)).toBe(2);
});
