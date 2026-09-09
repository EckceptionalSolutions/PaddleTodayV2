import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

const key = 'paddletoday:board-preferences';
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers: [{
    ...fixture.result, summary: { gaugeNow: 'QA', shortExplanation: 'QA' },
    liveData: { overall: 'stale', summary: 'QA' },
  }] } }));
});

test('a late Today preference read cannot replace the chosen sort', async ({ page }) => {
  await page.addInitScript(key => {
    const original = Storage.prototype.getItem;
    Storage.prototype.getItem = function (name) {
      if (name === key) return new Promise(resolve => {
        (window as any).__releaseTodayRead = () => resolve('{"mode":"certain"}');
      }) as unknown as string;
      return original.call(this, name);
    };
  }, key);
  await page.goto('/');
  const score = page.getByRole('button', { name: 'Score ranking', exact: true });
  await score.click();
  await page.evaluate(() => (window as any).__releaseTodayRead());
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await expect(score).toHaveAttribute('aria-pressed', 'true');
});

test('Today saves sorts in order and retries the currently applied choice', async ({ page }) => {
  await page.addInitScript(key => {
    const original = Storage.prototype.setItem;
    let first = true;
    (window as any).__todayWrites = [];
    Storage.prototype.setItem = function (name, value) {
      if (name !== key) return original.call(this, name, value);
      (window as any).__todayWrites.push(JSON.parse(value).mode);
      if ((window as any).__failTodaySave) throw new Error('QA storage failure');
      if (first) {
        first = false;
        return new Promise<void>(resolve => {
          (window as any).__releaseTodayWrite = () => { original.call(this, name, value); resolve(); };
        });
      }
      return original.call(this, name, value);
    };
  }, key);
  await page.goto('/');
  await page.getByRole('button', { name: 'Score ranking', exact: true }).click();
  await page.getByRole('button', { name: 'Evidence first', exact: true }).click();
  expect(await page.evaluate(() => (window as any).__todayWrites)).toEqual(['score']);
  await page.evaluate(() => (window as any).__releaseTodayWrite());
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) || '{}').mode, key)).toBe('certain');
  await page.evaluate(() => { (window as any).__failTodaySave = true; });
  await page.getByRole('button', { name: 'Recommended', exact: true }).click();
  const retry = page.getByRole('button', { name: 'Retry saving sort', exact: true });
  await expect(retry).toBeVisible();
  await expect(page.getByRole('button', { name: 'Recommended', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.evaluate(() => { (window as any).__failTodaySave = false; });
  await retry.click();
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) || '{}').mode, key)).toBe('best');
  await expect(retry).toBeHidden();
});
