import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('shuttle direction failures show retry guidance and preserve the selected endpoints', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    const state = window as unknown as { failMaps: boolean; mapUrls: string[] };
    state.failMaps = true;
    state.mapUrls = [];
    window.open = (url) => {
      state.mapUrls.push(String(url));
      if (state.failMaps) throw new Error('QA map opening unavailable');
      return null;
    };
  });
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await page.getByRole('button', { name: 'Show Access section', exact: true }).first().click();
  const google = page.getByRole('button', { name: 'Open shuttle directions in Google Maps', exact: true });
  const apple = page.getByRole('button', { name: 'Open shuttle directions in Apple Maps', exact: true });
  expect((await google.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await google.press('Enter');
  const error = page.getByText('Google Maps could not be opened. Try again or choose the other map app.', { exact: true });
  await expect(error).toBeVisible();
  await expect(google).toBeEnabled();
  await expect(apple).toBeEnabled();
  await page.evaluate(() => { (window as unknown as { failMaps: boolean }).failMaps = false; });
  await google.press('Enter');
  await expect(error).toBeHidden();
  const urls = await page.evaluate(() => (window as unknown as { mapUrls: string[] }).mapUrls);
  expect(urls).toHaveLength(2);
  expect(urls[0]).toBe(urls[1]);
  const url = new URL(urls[1]);
  expect(url.searchParams.get('origin')).toBe(`${fixture.result.river.putIn.latitude},${fixture.result.river.putIn.longitude}`);
  expect(url.searchParams.get('destination')).toBe(`${fixture.result.river.takeOut.latitude},${fixture.result.river.takeOut.longitude}`);
});
