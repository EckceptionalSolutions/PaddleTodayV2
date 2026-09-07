import { expect, test } from '@playwright/test';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

test.beforeEach(async ({ page }) => {
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
});

test('trip guide resolves missing scores and restores available calls through retry', async ({ page }) => {
  await page.goto('/guides/best-minnesota-paddle-trips/');
  const entries = page.locator('[data-minnesota-guide-entry][data-guide-slug]:not([data-guide-slug=""])');
  await expect(entries.first().locator('[data-guide-live-summary]')).toContainText('unavailable');
  await expect(entries.locator('[data-guide-live-summary]')).not.toContainText(['Loading']);
  const slug = await entries.first().getAttribute('data-guide-slug');
  const item = structuredClone(fixture.result);
  item.river.slug = slug!;
  item.readiness = { status: 'ready', label: 'Ready', reason: 'Synthetic fixture' };
  await page.route('**/api/rivers/summary.json*', route => route.fulfill({ json: { rivers: [item] } }));
  await page.locator('[data-guide-retry]').click();
  await expect(entries.first().locator('[data-guide-score-card]')).toBeVisible();
  await expect(page.locator('[data-minnesota-guide-status]')).toBeFocused();
  item.readiness = { status: 'withheld', label: 'Withheld', reason: 'Gauge data is stale.' };
  await page.reload();
  await expect(entries.first().locator('[data-guide-live-summary]')).toHaveText('Gauge data is stale.');
  await expect(entries.first().locator('[data-guide-score-card]')).toBeHidden();
});

test('weekend guide distinguishes a failed request from a valid empty shortlist', async ({ page }) => {
  await page.goto('/guides/best-weekend-paddle-trips-minnesota/');
  await expect(page.locator('[data-guide-weekend-status]')).toContainText('unavailable');
  await expect(page.locator('[data-guide-weekend-empty]')).toBeHidden();
  await page.route('**/api/weekend/summary.json*', route => route.fulfill({ json: { rivers: [], label: 'this weekend' } }));
  await page.locator('[data-guide-retry]').click();
  await expect(page.locator('[data-guide-weekend-empty]')).toBeVisible();
  await expect(page.locator('[data-guide-weekend-status]')).toBeFocused();
  await expect(page.locator('[data-guide-retry]')).toBeHidden();
});
