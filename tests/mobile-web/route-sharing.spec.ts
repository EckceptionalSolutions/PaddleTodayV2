import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const outcome of ['cancel', 'unavailable']) {
  test(`route sharing handles ${outcome} and blocks duplicate actions`, async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      const state = window as unknown as { shareCalls: number; finishShare: (cancel: boolean) => void };
      state.shareCalls = 0;
      Object.defineProperty(navigator, 'share', { configurable: true, value: () => {
        state.shareCalls += 1;
        return new Promise((_resolve, reject) => {
          state.finishShare = (cancel) => reject(cancel ? new DOMException('Cancelled', 'AbortError') : new Error('QA unavailable'));
        });
      } });
    });
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
    await page.goto('/river/rice-creek-peltier-to-long-lake');
    const share = page.getByRole('button', { name: 'Share route', exact: true });
    await share.click();
    await expect(share).toBeDisabled();
    await expect(share).toHaveAttribute('aria-busy', 'true');
    await share.dispatchEvent('click');
    expect(await page.evaluate(() => (window as unknown as { shareCalls: number }).shareCalls)).toBe(1);
    await page.evaluate((cancel) => (window as unknown as { finishShare: (cancel: boolean) => void }).finishShare(cancel), outcome === 'cancel');
    await expect(share).toBeEnabled();
    const copy = page.getByRole('textbox', { name: 'Route summary to copy', exact: true });
    if (outcome === 'cancel') {
      await expect(page.getByText('Sharing cancelled.', { exact: true })).toBeVisible();
      await expect(copy).toBeHidden();
    } else {
      await expect(copy).toBeVisible();
      await expect(copy).toBeFocused();
      await expect(copy).toHaveAttribute('readonly', '');
      await expect(copy).toHaveValue(/Rice Creek/);
      await expect(copy).toHaveValue(/paddletoday.com\/rivers\/rice-creek-peltier-to-long-lake/);
    }
    await page.evaluate(() => Object.defineProperty(navigator, 'share', { configurable: true, value: async () => {} }));
    await share.click();
    await expect(page.getByText('Route summary ready to share.', { exact: true })).toBeVisible();
    await expect(copy).toBeHidden();
  });
}

test('changing the segment invalidates an old share result and the next copy uses the new access point', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    Object.defineProperty(navigator, 'share', { configurable: true, value: () => new Promise((_resolve, reject) => {
      (window as unknown as { rejectOldShare: () => void }).rejectOldShare = () => reject(new Error('QA old share failure'));
    }) });
  });
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  const share = page.getByRole('button', { name: 'Share route', exact: true });
  await share.click();
  await expect(share).toBeDisabled();
  await page.getByRole('button', { name: 'Show Access section', exact: true }).first().click();
  await page.getByRole('button', { name: /^Select Put-in, currently / }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Put-in: Baldwin Lake carry-in', exact: true }).click();
  await expect(share).toBeEnabled();
  await page.evaluate(() => {
    (window as unknown as { rejectOldShare: () => void }).rejectOldShare();
    Object.defineProperty(navigator, 'share', { configurable: true, value: async () => { throw new Error('QA unavailable'); } });
  });
  const copy = page.getByRole('textbox', { name: 'Route summary to copy', exact: true });
  await expect(copy).toBeHidden();
  await expect(page.getByText('Sharing is unavailable. You can copy the route summary below.', { exact: true })).toBeHidden();
  await share.click();
  await expect(copy).toBeVisible();
  await expect(copy).toHaveValue(/Baldwin Lake carry-in/);
  await expect(copy).toHaveValue(/putin=baldwin-lake/);
  const lines = (await copy.inputValue()).split('\n');
  const appLink = new URL(lines.find(line => line.startsWith('Open in app: '))!.slice('Open in app: '.length));
  const webLink = new URL(lines.find(line => line.startsWith('Web link: '))!.slice('Web link: '.length));
  expect(appLink.searchParams.get('putin')).toBe('baldwin-lake');
  expect(appLink.searchParams.get('takeout')).toBeTruthy();
  expect(appLink.protocol).toBe('https:');
  expect(appLink.pathname).toBe(webLink.pathname);
  expect(appLink.searchParams.get('openApp')).toBe('1');
  appLink.searchParams.delete('openApp');
  expect(appLink.search).toBe(webLink.search);
});
