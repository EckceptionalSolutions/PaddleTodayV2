import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
});

test('the first available store action is primary on every platform', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('[data-app-download-link]:visible');
  await expect(links.first()).toBeVisible();
  await expect(links.first()).not.toHaveClass(/app-download-prompt__cta--secondary/);
  const platform = await page.locator('[data-app-download-prompt]').getAttribute('data-platform');
  if (platform === 'ios' || platform === 'android') {
    await expect(links).toHaveCount(1);
    await expect(links.first()).toHaveAttribute('data-app-download-link', platform);
  }
});

test('phone footer remains reachable above the app prompt and dismissal persists', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const prompt = page.locator('[data-app-download-prompt]');
  await expect(prompt).toBeVisible();
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await expect.poll(() => page.evaluate(() => {
    const footer = document.querySelector('.site-footer__states')!.getBoundingClientRect();
    const banner = document.querySelector('[data-app-download-prompt]')!.getBoundingClientRect();
    return footer.bottom <= banner.top;
  })).toBe(true);
  await page.locator('[data-app-download-dismiss]').click();
  await expect(prompt).toBeHidden();
  await page.reload();
  await expect(prompt).toBeHidden();
});

test('phone typing temporarily hides the prompt without dismissing it', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/request-river/');
  const prompt = page.locator('[data-app-download-prompt]');
  await expect(prompt).toBeVisible();
  await page.locator('input[name="routeName"]').fill('Rum River');
  await expect(prompt).toBeHidden();
  await page.locator('[data-request-title]').click();
  await expect(prompt).toBeVisible();
  await expect(page.locator('input[name="routeName"]')).toHaveValue('Rum River');
});
