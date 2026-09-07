import { test, expect } from '@playwright/test';
test('Weekend range supports keyboard navigation and storage recovery', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:user-location', JSON.stringify({ latitude: 46.78, longitude: -92.1, label: 'Duluth', source: 'search' }));
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key.includes('weekend-distance')) throw new Error('QA storage unavailable');
      return original.call(this, key, value);
    };
  });
  await page.route('**/api/**', (route) => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/weekend');
  const options = page.getByRole('radio');
  await expect(options).toHaveCount(5);
  await options.first().press('Space');
  await expect(options.first()).toBeChecked();
  await options.last().press('Space');
  await expect(options.last()).toBeChecked();
  await expect(options.first()).not.toBeChecked();
  await options.last().press('ArrowRight');
  await expect(options.first()).toBeFocused();
  await expect(options.first()).toBeChecked();
  await options.first().press('ArrowLeft');
  await expect(options.last()).toBeFocused();
  await expect(options.last()).toBeChecked();
  await expect(options.first()).toHaveAttribute('tabindex', '-1');
  await expect(options.last()).toHaveAttribute('tabindex', '0');
  expect(errors).toEqual([]);
  console.log('Weekend range changes by keyboard and tolerates unavailable preference storage.');
});


