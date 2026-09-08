import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

const key = 'paddletoday:recent-routes:v1';
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: fixture }));
});

test('recent routes reopen after reload and clearing supports cancel and failed storage retry', async ({ page }) => {
  await page.addInitScript((key) => {
    const remove = Storage.prototype.removeItem;
    Storage.prototype.removeItem = function (name) {
      if (name === key && localStorage.getItem('qa:fail-history-clear') === '1') throw new Error('Storage unavailable');
      return remove.call(this, name);
    };
  }, key);
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) ?? '{}').routes?.length, key)).toBe(1);
  await page.goto('/saved');
  const reopen = page.getByRole('button', { name: 'Reopen Rice Creek: Peltier Lake to Long Lake', exact: true });
  await expect(reopen).toBeVisible();
  await page.reload();
  await reopen.press('Enter');
  await expect(page).toHaveURL('/river/rice-creek-peltier-to-long-lake');
  await expect(page.getByRole('button', { name: 'Show Access section', exact: true }).first()).toBeVisible();
  await page.goBack();
  await expect(reopen).toBeVisible();
  await page.getByRole('button', { name: 'Clear history', exact: true }).click();
  await page.getByRole('button', { name: 'Keep history', exact: true }).click();
  await expect(reopen).toBeVisible();
  await page.getByRole('button', { name: 'Clear history', exact: true }).click();
  await page.evaluate(() => localStorage.setItem('qa:fail-history-clear', '1'));
  await page.getByRole('button', { name: 'Clear recent history', exact: true }).click();
  await expect(page.getByText('History could not be cleared. Please try again.', { exact: true })).toBeVisible();
  await expect(reopen).toBeVisible();
  await page.screenshot({ path: `tmp/recent-routes-${page.viewportSize()!.width}.png` });
  await page.evaluate(() => localStorage.removeItem('qa:fail-history-clear'));
  await page.getByRole('button', { name: 'Clear recent history', exact: true }).click();
  await expect(reopen).toHaveCount(0);
  await expect.poll(() => page.evaluate(key => localStorage.getItem(key), key)).toBeNull();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Recently viewed', exact: true })).toHaveCount(0);
});

test('unreadable history survives another route visit until explicitly cleared', async ({ page }) => {
  await page.addInitScript(key => {
    if (!localStorage.getItem('qa:history-seeded')) {
      localStorage.setItem(key, '{broken'); localStorage.setItem('qa:history-seeded', '1');
    }
  }, key);
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await expect(page.getByRole('button', { name: 'Show Access section', exact: true }).first()).toBeVisible();
  await page.goto('/saved');
  await expect(page.getByText('Recent history could not be read. It has not been replaced.', { exact: true })).toBeVisible();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe('{broken');
  await page.evaluate(key => localStorage.setItem(key, JSON.stringify({ version: 1, routes: [
    { slug: 'rice-creek-peltier-to-long-lake', name: 'Rice Creek', reach: 'Peltier Lake to Long Lake', viewedAt: new Date().toISOString() },
  ] })), key);
  await page.getByRole('button', { name: 'Retry recent routes', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Reopen Rice Creek: Peltier Lake to Long Lake', exact: true })).toBeVisible();
  await expect(page.getByText('Recent history could not be read. It has not been replaced.', { exact: true })).toHaveCount(0);
});

test('recent shortcuts start compact and expand by keyboard', async ({ page }) => {
  await page.addInitScript(key => localStorage.setItem(key, JSON.stringify({ version: 1, routes:
    Array.from({ length: 5 }, (_, index) => ({ slug: `qa-${index}`, name: `Recent route ${index}`,
      reach: 'A longer launch name to a longer landing name', viewedAt: new Date().toISOString() })),
  })), key);
  await page.goto('/saved');
  await expect(page.getByRole('button', { name: /^Reopen Recent route/ })).toHaveCount(3);
  const show = page.getByRole('button', { name: 'Show all 5 recent routes', exact: true });
  await expect(show).toHaveAttribute('aria-expanded', 'false');
  await show.press('Space');
  await expect(page.getByRole('button', { name: /^Reopen Recent route/ })).toHaveCount(5);
  const fewer = page.getByRole('button', { name: 'Show fewer recent routes', exact: true });
  await expect(fewer).toHaveAttribute('aria-expanded', 'true');
  await fewer.press('Space');
  await expect(page.getByRole('button', { name: /^Reopen Recent route/ })).toHaveCount(3);
});
