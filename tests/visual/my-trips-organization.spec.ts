import { test, expect } from '@playwright/test';
import { accountFixture } from './account-fixture';

test('signed-in library groups plans and keeps schedule and access facts readable', async ({ page }) => {
  await accountFixture(page);
  await page.goto('/trips/');
  const next = page.locator('.trip-featured-plan');
  await expect(next.getByRole('heading', { name: 'Saturday with friends' })).toBeVisible();
  await expect(next.locator('.trip-date-tile')).toContainText('2099');
  await expect(next.locator('.trip-access-facts')).toContainText('Put-in');
  await expect(next.locator('.trip-access-facts')).toContainText('Take-out');
  await expect(page.getByRole('heading', { name: 'Choose a date later' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Earlier plans · review when ready' })).toBeVisible();
  await next.getByRole('button', { name: 'Open trip', exact: true }).click();
  await expect(page.locator('.trip-summary-facts')).toContainText('Date');
  await expect(page.locator('.trip-summary-facts')).toContainText('Launch');
  await expect(page.locator('.trip-summary-facts')).toContainText('2099');
  await expect(page.locator('.trip-detail__hero .trip-access-facts')).toContainText('Upper landing');
  await page.getByRole('button', { name: '← My trips', exact: true }).click();
  await page.getByRole('tab', { name: 'History' }).click();
  await expect(page.getByText('Private recap', { exact: true })).toBeVisible();
});

test('library and overview stay within a 320px viewport and search retains focus', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await accountFixture(page);
  await page.goto('/trips/');
  const next = page.locator('.trip-featured-plan');
  await expect(next).toBeVisible();
  const overflow = () => page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(await overflow()).toBe(false);
  const search = page.getByLabel('Search trips', { exact: true });
  await search.fill('no matching river');
  await expect(page.getByRole('heading', { name: 'No trips found' })).toBeVisible();
  await expect(search).toBeFocused();
  await page.getByRole('button', { name: 'Clear search', exact: true }).click();
  await next.getByRole('button', { name: 'Open trip', exact: true }).click();
  await expect(page.locator('.trip-summary-facts')).toBeVisible();
  expect(await overflow()).toBe(false);
});
