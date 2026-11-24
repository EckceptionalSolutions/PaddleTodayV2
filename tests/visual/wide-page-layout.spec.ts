import { expect, test } from '@playwright/test';

test('expanded trip preferences use the desktop width and leave recommendations in reach', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  const preferences = page.locator('details[data-home-preferences]');
  await expect(preferences).toHaveAttribute('open', '');
  const location = await page.locator('[data-home-location-summary]').boundingBox();
  const filters = await preferences.boundingBox();
  const hero = await page.locator('.home-hero').boundingBox();
  expect(filters!.x).toBeGreaterThan(location!.x + location!.width);
  expect(filters!.width).toBeGreaterThan(hero!.width / 2);
  await expect(page.locator('.home-recommendations .section-title').first()).toBeInViewport();
  await preferences.locator('summary').click();
  await expect(preferences).not.toHaveAttribute('open');
  await preferences.locator('summary').click();
  await expect(preferences).toHaveAttribute('open', '');
});

test('a river photo gallery reflows from desktop to phone while photos are unavailable', async ({ page }) => {
  await page.route('**/*', route => route.request().resourceType() === 'image' ? route.abort() : route.continue());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/rivers/st-croix-river-fox-highway-70/');
  await page.setViewportSize({ width: 390, height: 844 });
  const gallery = page.locator('.route-gallery__figure').first();
  await expect(gallery).toBeVisible();
  const bounds = await gallery.boundingBox();
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(390);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
