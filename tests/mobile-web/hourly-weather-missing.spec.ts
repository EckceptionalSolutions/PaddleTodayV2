import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('broader storm risk remains visible beside calm hourly readings', async ({ page }) => {
  const detail = structuredClone(fixture);
  detail.result.weather.next12hStormRisk = true;
  detail.result.weather.todayHourly = [{ ...detail.result.weather.todayHourly[0], precipProbability: 0, windMph: 0, windGustMph: 0, precipitationIn: 0, conditionLabel: 'Clear', weatherCode: 0 }];
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: detail }));
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await expect(page.getByText('Storm timing needs a check', { exact: true })).toBeVisible();
  await expect(page.getByText('Good weather window', { exact: true })).toHaveCount(0);
});

for (const reading of [null, 0]) {
  test(`hourly weather distinguishes ${reading === null ? 'missing readings' : 'real zero readings'}`, async ({ page }) => {
    const detail = structuredClone(fixture);
    detail.result.weather.todayHourly = [{ ...detail.result.weather.todayHourly[0], precipProbability: reading, windMph: reading }];
    await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: detail }));
    await page.goto('/river/rice-creek-peltier-to-long-lake');
    await expect(page.getByText(reading === null ? 'Hourly forecast incomplete' : 'Good weather window', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Show More section', exact: true }).first().click();
    await expect(page.getByText(reading === null ? 'Rain chance unavailable' : '0% rain', { exact: true })).toBeVisible();
    await expect(page.getByText(reading === null ? 'Wind unavailable' : '0 mph wind', { exact: true })).toBeVisible();
    if (reading === null) {
      await expect(page.getByText('0% rain', { exact: true })).toHaveCount(0);
      await expect(page.getByText('0 mph wind', { exact: true })).toHaveCount(0);
      await page.getByText('Rain chance unavailable', { exact: true }).scrollIntoViewIfNeeded();
      await page.screenshot({ path: test.info().outputPath('missing-hourly-weather.png') });
    }
  });
}
