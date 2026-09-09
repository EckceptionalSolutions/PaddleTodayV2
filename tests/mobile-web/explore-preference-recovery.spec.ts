import { test, expect } from '@playwright/test';

const key = 'paddletoday:explore-preferences:v4';
const stored = { viewMode: 'map', filters: {
  sort: 'best', query: 'Old search', state: '', difficulty: 'any', routeType: 'all', status: 'any',
  rating: 'any', distance: 'any', paddleTime: 'any', paddleLength: 'any', camping: 'any',
} };
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', route => route.fulfill({ json: { rivers: [] } }));
});

test('late Explore preferences preserve active search and view choices', async ({ page }) => {
  await page.addInitScript(({ key, stored }) => {
    const original = Storage.prototype.getItem;
    Storage.prototype.getItem = function (name) {
      if (name === key) return new Promise(resolve => {
        (window as any).__releaseExploreRead = () => resolve(JSON.stringify(stored));
      }) as unknown as string;
      return original.call(this, name);
    };
  }, { key, stored });
  await page.goto('/explore');
  await page.getByRole('textbox', { name: 'Search routes', exact: true }).fill('New search');
  await page.getByRole('tab', { name: 'list view', exact: true }).click();
  await page.evaluate(() => (window as any).__releaseExploreRead());
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await expect(page.getByRole('textbox', { name: 'Search routes', exact: true })).toHaveValue('New search');
  await expect(page.getByRole('tab', { name: 'list view', exact: true })).toHaveAttribute('aria-selected', 'true');
});

test('Explore preference writes preserve the latest view after a slow save', async ({ page }) => {
  await page.addInitScript(key => {
    const original = Storage.prototype.setItem;
    let first = true;
    Storage.prototype.setItem = function (name, value) {
      if (name === key && first) {
        first = false;
        return new Promise<void>(resolve => {
          (window as any).__releaseExploreWrite = () => { original.call(this, name, value); resolve(); };
        });
      }
      return original.call(this, name, value);
    };
  }, key);
  await page.goto('/explore');
  await page.getByRole('tab', { name: 'list view', exact: true }).click();
  await expect.poll(() => page.evaluate(() => Boolean((window as any).__releaseExploreWrite))).toBe(true);
  await page.getByRole('tab', { name: 'map view', exact: true }).click();
  await page.evaluate(() => (window as any).__releaseExploreWrite());
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) || '{}').viewMode, key)).toBe('map');
});

for (const view of ['map', 'list']) {
  test(`${view} retains applied Explore filters after save failure and retries locally`, async ({ page }) => {
    await page.setViewportSize({ width: page.viewportSize()!.width, height: 480 });
    await page.addInitScript(key => {
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function (name, value) {
        if (name === key && (window as any).__failExploreSave) throw new Error('QA storage failure');
        return original.call(this, name, value);
      };
    }, key);
    await page.goto('/explore');
    await page.getByRole('tab', { name: `${view} view`, exact: true }).click();
    await page.evaluate(() => { (window as any).__failExploreSave = true; });
    const search = page.getByRole('textbox', { name: 'Search routes', exact: true });
    await search.fill('New search');
    const retry = page.getByRole('button', { name: 'Retry saving Explore filters', exact: true });
    await expect(retry).toBeVisible();
    await expect(search).toHaveValue('New search');
    expect((await retry.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await page.screenshot({ path: `tmp/explore-save-retry-${view}-${page.viewportSize()!.width}.png` });
    await page.evaluate(() => { (window as any).__failExploreSave = false; });
    await retry.click();
    await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) || '{}').filters?.query, key)).toBe('New search');
    await expect(retry).toBeHidden();
    await page.reload();
    await expect(search).toHaveValue('New search');
    await expect(page.getByRole('tab', { name: `${view} view`, exact: true })).toHaveAttribute('aria-selected', 'true');
  });
}

test('unreadable Explore preferences remain intact until an explicit new choice', async ({ page }) => {
  await page.addInitScript(key => localStorage.setItem(key, '{unreadable'), key);
  await page.goto('/explore');
  await expect(page.getByRole('textbox', { name: 'Search routes', exact: true })).toBeVisible();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe('{unreadable');
  await page.getByRole('tab', { name: 'list view', exact: true }).click();
  await expect.poll(() => page.evaluate(key => {
    try { return JSON.parse(localStorage.getItem(key) || '{}').viewMode; } catch { return ''; }
  }, key)).toBe('list');
});
