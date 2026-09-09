import { test, expect } from '@playwright/test';

const key = 'paddletoday:weekend-distance-limit:v1';
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:user-location', JSON.stringify({ latitude: 46.78, longitude: -92.1, label: 'Duluth', source: 'search' }));
  });
  await page.route('**/api/**', route => route.fulfill({ json: { rivers: [] } }));
});

test('a delayed saved range cannot replace a new selection', async ({ page }) => {
  await page.addInitScript(key => {
    localStorage.setItem(key, '100');
    const original = Storage.prototype.getItem;
    Storage.prototype.getItem = function (name) {
      if (name === key) return new Promise(resolve => {
        (window as any).__releaseRangeRead = () => resolve('100');
      }) as unknown as string;
      return original.call(this, name);
    };
  }, key);
  await page.goto('/weekend');
  const last = page.getByRole('radio', { name: 'Weekend range 500 mi', exact: true });
  await last.click();
  await expect(last).toBeChecked();
  await page.evaluate(() => (window as any).__releaseRangeRead());
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await expect(last).toBeChecked();
});

test('range writes remain ordered and a failed save retries the current choice', async ({ page }) => {
  await page.addInitScript(key => {
    const original = Storage.prototype.setItem;
    let first = true;
    (window as any).__rangeWrites = [];
    Storage.prototype.setItem = function (name, value) {
      if (name !== key) return original.call(this, name, value);
      (window as any).__rangeWrites.push(value);
      if ((window as any).__failRangeSave) throw new Error('QA storage failure');
      if (first) {
        first = false;
        return new Promise<void>(resolve => {
          (window as any).__releaseRangeWrite = () => { original.call(this, name, value); resolve(); };
        });
      }
      return original.call(this, name, value);
    };
  }, key);
  await page.goto('/weekend');
  await page.getByRole('radio', { name: 'Weekend range 100 mi', exact: true }).click();
  await page.getByRole('radio', { name: 'Weekend range 500 mi', exact: true }).click();
  expect(await page.evaluate(() => (window as any).__rangeWrites)).toEqual(['100']);
  await page.evaluate(() => (window as any).__releaseRangeWrite());
  await expect.poll(() => page.evaluate(key => localStorage.getItem(key), key)).toBe('500');
  await page.evaluate(() => { (window as any).__failRangeSave = true; });
  await page.getByRole('radio', { name: 'Weekend range Any', exact: true }).click();
  const retry = page.getByRole('button', { name: 'Retry saving range', exact: true });
  await expect(retry).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Weekend range Any', exact: true })).toBeChecked();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe('500');
  await page.screenshot({ path: `tmp/weekend-range-save-${page.viewportSize()!.width}.png` });
  await page.evaluate(() => { (window as any).__failRangeSave = false; });
  await retry.click();
  await expect.poll(() => page.evaluate(key => localStorage.getItem(key), key)).toBe('null');
  await expect(retry).toBeHidden();
});
