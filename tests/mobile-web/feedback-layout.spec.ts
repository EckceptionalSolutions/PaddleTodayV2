import { test, expect } from '@playwright/test';

test('feedback choices and store chooser stay reachable on a short screen', async ({ page }) => {
  await page.setViewportSize({ width: page.viewportSize()!.width, height: 320 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:feedback-usage:v1', JSON.stringify({
      firstOpenedAt: Date.now() - 8 * 86400000, openCount: 5, meaningfulActionCount: 3,
    }));
  });
  await page.route('**/api/**', route => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/');
  const dialog = page.getByRole('dialog');
  const rate = dialog.getByRole('button', { name: 'Rate PaddleToday in the app store', exact: true });
  await rate.scrollIntoViewIfNeeded();
  await expect(rate).toBeInViewport({ ratio: 0.99 });
  await rate.click();
  const google = dialog.getByRole('button', { name: 'Open Google Play review page', exact: true });
  await google.scrollIntoViewIfNeeded();
  await expect(google).toBeInViewport({ ratio: 0.99 });
  await page.screenshot({ path: `tmp/feedback-short-${page.viewportSize()!.width}.png` });
  const close = dialog.getByRole('button', { name: 'Not now', exact: true });
  await close.scrollIntoViewIfNeeded();
  await expect(close).toBeInViewport({ ratio: 0.99 });
  await close.click();
  await expect(dialog).toBeHidden();
});
