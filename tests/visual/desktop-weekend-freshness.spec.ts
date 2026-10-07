import { expect, test } from '@playwright/test';
import { desktopWeekendFixture, FIXTURE_NOW } from './desktop-board-fixtures';

test.beforeEach(async ({ page }) => {
  await page.clock.install({ time: FIXTURE_NOW });
  await page.addInitScript(() => localStorage.setItem('paddleTodayAppPromptDismissedAt', String(Date.now())));
});

for (const scenario of ['fresh', 'cautious', 'stale', 'unavailable', 'empty'] as const) {
  test(`desktop Weekend: ${scenario}`, async ({ page }) => {
    await page.route('**/api/weekend/summary.json*', route => scenario === 'unavailable'
      ? route.fulfill({ status: 503, json: { error: 'Fixture unavailable' } })
      : route.fulfill({ json: desktopWeekendFixture(scenario) }));
    await page.goto('/weekend/');
    if (scenario === 'stale' || scenario === 'unavailable') {
      await expect(page.locator('h1')).toHaveText('Weekend forecast unavailable');
      await expect(page.locator('.weekend-hero__featured')).toBeHidden();
      await expect(page.locator('.weekend-planner')).toBeHidden();
      await expect(page.locator('[data-weekend-retry]')).toBeVisible();
      await expect(page.locator('[data-weekend-browse]')).toBeVisible();
      if (scenario === 'stale') await expect(page.locator('[data-weekend-snapshot]')).toContainText('expired');
    } else {
      await expect(page.locator('body')).not.toHaveAttribute('data-weekend-unavailable', 'true');
      await expect(page.locator('.weekend-hero__featured')).toHaveAttribute('aria-busy', 'false');
      if (scenario === 'fresh') {
        await expect(page.locator('[data-weekend-featured-name]')).toHaveText('Rice Creek');
        await expect(page.locator('[data-weekend-featured-weather]')).not.toContainText(/storm|rain risk/i);
      }
      if (scenario === 'cautious') await expect(page.locator('[data-weekend-fair-count]')).toHaveText('1');
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('expired cached recommendations stay hidden while retrying and recover with fresh data', async ({ page }) => {
  await page.addInitScript(payload => localStorage.setItem('paddletoday:api-cache:weekend-summary:v1', JSON.stringify({ version: 1, fetchedAt: Date.now(), payload })),
    desktopWeekendFixture('stale'));
  let fresh = false;
  await page.route('**/api/weekend/summary.json*', route => fresh
    ? route.fulfill({ json: desktopWeekendFixture('fresh') })
    : route.fulfill({ status: 503, json: { error: 'Fixture unavailable' } }));
  await page.goto('/weekend/');
  const retry = page.locator('[data-weekend-retry]');
  await expect(page.locator('h1')).toHaveText('Weekend forecast unavailable');
  await expect(retry).toBeEnabled();
  await expect(page.locator('.weekend-hero__featured')).toBeHidden();
  fresh = true;
  await retry.click();
  await expect(page.locator('[data-weekend-featured-name]')).toHaveText('Rice Creek');
  await expect(page.locator('h1')).toHaveText('Best picks this weekend');
  await expect(retry).toBeHidden();
  await expect(page.locator('h1')).toBeFocused();
});

test('recommendations expire in an open tab even without a successful refresh', async ({ page }) => {
  let first = true;
  await page.route('**/api/weekend/summary.json*', route => {
    if (!first) return route.fulfill({ status: 503, json: {} });
    first = false;
    return route.fulfill({ json: desktopWeekendFixture('fresh') });
  });
  await page.goto('/weekend/');
  await expect(page.locator('[data-weekend-featured-name]')).toHaveText('Rice Creek');
  await page.clock.fastForward(7_200_001);
  await expect(page.locator('h1')).toHaveText('Weekend forecast unavailable');
  await expect(page.locator('.weekend-hero__featured')).toBeHidden();
});
