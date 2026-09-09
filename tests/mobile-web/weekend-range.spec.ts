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
  for (let selected = 0; selected < 5; selected++) {
    await options.nth(selected).click();
    const track = (await page.getByTestId('weekend-range-track').boundingBox())!;
    const labelTops: number[] = [];
    for (let index = 0; index < 5; index++) {
      const marker = (await page.getByTestId(`weekend-range-marker-${index}`).boundingBox())!;
      expect(Math.abs(marker.y + marker.height / 2 - track.y - track.height / 2)).toBeLessThanOrEqual(1);
      const label = (await options.nth(index).getByText(['100 mi', '200 mi', '300 mi', '500 mi', 'Any'][index], { exact: true }).boundingBox())!;
      labelTops.push(label.y);
    }
    expect(Math.max(...labelTops) - Math.min(...labelTops)).toBeLessThanOrEqual(1);
  }
  await options.nth(2).click();
  await page.getByRole('radiogroup', { name: 'Weekend range' }).screenshot({ path: `tmp/weekend-range-alignment-${page.viewportSize()!.width}.png` });
  expect(errors).toEqual([]);
  console.log('Weekend range changes by keyboard and tolerates unavailable preference storage.');
});


