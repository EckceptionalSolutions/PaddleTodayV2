import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('GPX distinguishes missing geometry, throttling and connection failure before a successful retry', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    (window as unknown as { openedExports: string[] }).openedExports = [];
    window.open = (url) => { (window as unknown as { openedExports: string[] }).openedExports.push(String(url)); return null; };
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: fixture }));
  let status: number | 'network' = 409;
  const requested: string[] = [];
  await page.route('**/trip.gpx?*', route => {
    requested.push(route.request().url());
    expect(route.request().method()).toBe('HEAD');
    return status === 'network' ? route.abort() : route.fulfill({ status, body: '' });
  });
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await page.getByRole('button', { name: 'Show Access section', exact: true }).first().click();
  await page.getByRole('button', { name: /^Select Put-in, currently / }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Put-in: Baldwin Lake carry-in', exact: true }).click();
  await page.getByRole('button', { name: 'Prepare this trip', exact: true }).click();
  const sheet = page.getByRole('dialog');
  const note = sheet.getByRole('textbox', { name: 'Note for your group (optional)', exact: true });
  await note.fill('QA shuttle notes stay in the draft.');
  const gpx = sheet.getByRole('button', { name: 'Download GPX', exact: true });
  for (const [code, message] of [
    [409, 'A GPX track is not available for these access points yet.'],
    [404, 'This route could not be found for export. Refresh the route and try again.'],
    [429, 'Too many export requests. Wait a moment, then try again.'],
    ['network', 'The GPX file could not be checked. Check your connection and try again.'],
  ] as const) {
    status = code;
    await gpx.click();
    await expect(sheet.getByText(message, { exact: true })).toBeVisible();
    await expect(gpx).toBeEnabled();
    await expect(note).toHaveValue('QA shuttle notes stay in the draft.');
  }
  expect(await page.evaluate(() => (window as unknown as { openedExports: string[] }).openedExports)).toEqual([]);
  status = 200;
  await gpx.press('Enter');
  await expect.poll(() => page.evaluate(() => (window as unknown as { openedExports: string[] }).openedExports.length)).toBe(1);
  const url = new URL((await page.evaluate(() => (window as unknown as { openedExports: string[] }).openedExports))[0]);
  expect(url.searchParams.get('putin')).toBe('baldwin-lake');
  expect(requested).toHaveLength(5);
});
