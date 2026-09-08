import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('calendar checks preserve timing and retry without opening failed exports', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    (window as unknown as { opened: string[] }).opened = [];
    window.open = url => { (window as unknown as { opened: string[] }).opened.push(String(url)); return null; };
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: fixture }));
  let code: number | 'network' = 404;
  const urls: string[] = [];
  await page.route('**/trip.ics?*', route => {
    expect(route.request().method()).toBe('HEAD');
    urls.push(route.request().url());
    return code === 'network' ? route.abort() : route.fulfill({ status: code, body: '' });
  });
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await page.getByRole('button', { name: 'Show Access section', exact: true }).first().click();
  await page.getByRole('button', { name: 'Prepare this trip', exact: true }).click();
  const sheet = page.getByRole('dialog');
  await sheet.getByRole('button', { name: 'Enter manually: launch', exact: true }).click();
  const launch = sheet.getByRole('textbox', { name: 'Launch (YYYY-MM-DD HH:MM)', exact: true });
  const original = await launch.inputValue();
  const calendar = sheet.getByRole('button', { name: 'Add to calendar', exact: true });
  for (const [status, message] of [
    [404, 'This route could not be found for export. Refresh the route and try again.'],
    [429, 'Too many export requests. Wait a moment, then try again.'],
    ['network', 'The calendar file could not be checked. Check your connection and try again.'],
  ] as const) {
    code = status;
    await calendar.click();
    await expect(sheet.getByText(message, { exact: true })).toBeVisible();
    await expect(calendar).toBeEnabled();
    await expect(launch).toHaveValue(original);
    await expect(launch).toBeEditable();
  }
  expect(await page.evaluate(() => (window as unknown as { opened: string[] }).opened)).toEqual([]);
  code = 200;
  await calendar.click();
  await expect.poll(() => page.evaluate(() => (window as unknown as { opened: string[] }).opened.length)).toBe(1);
  const opened = await page.evaluate(() => (window as unknown as { opened: string[] }).opened[0]);
  expect(opened).toBe(urls.at(-1));
  expect(new URL(opened).searchParams.get('start')).toBe(new Date(original.replace(' ', 'T')).toISOString());
});
