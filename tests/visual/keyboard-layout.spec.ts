import { expect, test } from '@playwright/test';

test('keyboard users can skip repeated navigation', async ({ page }) => {
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.goto('/about/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content', exact: true });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

test('the scoring table scrolls within its card on narrow screens', async ({ page }) => {
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  for (const width of [320, 390, 760]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/about/');
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1);
    await expect(page.getByRole('region', { name: 'How Scoring Works' })).toHaveAttribute('tabindex', '0');
  }
});
