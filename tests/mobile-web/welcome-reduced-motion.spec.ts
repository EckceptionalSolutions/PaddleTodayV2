import { test, expect } from '@playwright/test';

test('welcome moves directly between slides with reduced motion, including a preference change', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/welcome');
  await expect(page.getByTestId('welcome-slide-1')).toBeVisible();
  const jump = async (number: number) => page.evaluate(async number => {
    const button = document.querySelector(`[aria-label="Go to welcome page ${number}"]`) as HTMLElement;
    const track = document.querySelector('[data-testid="welcome-carousel-track"]') as HTMLElement;
    const slide = document.querySelector('[data-testid="welcome-slide-1"]') as HTMLElement;
    button.click();
    // React commits the new Animated value on the next frame. A normal 220ms
    // slide would still be in progress at this point.
    await new Promise(requestAnimationFrame);
    return { offset: new DOMMatrixReadOnly(getComputedStyle(track).transform).m41, width: slide.getBoundingClientRect().width };
  }, number);
  const second = await jump(2);
  expect(second.offset).toBeCloseTo(-second.width, 0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.getByRole('button', { name: 'Go to welcome page 1', exact: true }).click();
  await expect(page.getByTestId('welcome-slide-1')).not.toHaveAttribute('aria-hidden', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const third = await jump(3);
  expect(third.offset).toBeCloseTo(-third.width * 2, 0);
  await expect(page.getByTestId('welcome-slide-3')).not.toHaveAttribute('aria-hidden', 'true');
});
