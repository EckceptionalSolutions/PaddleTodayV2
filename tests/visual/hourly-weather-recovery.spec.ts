import { test, expect } from '@playwright/test';
import fixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };
import { installMapLibreHarness } from './maplibre-harness';

for (const mode of ['missing', 'calm', 'wind', 'storm', 'rain', 'storm-flag']) {
  const missing = mode === 'missing';
  test(`short-route weather windows: ${mode}`, async ({ page }) => {
    await installMapLibreHarness(page);
    const detail = structuredClone(fixture);
    detail.result.weather.next12hStormRisk = mode === 'storm-flag';
    detail.result.weather.todayHourly = [9, 10, 11].map((hour) => ({
      ...detail.result.weather.todayHourly[0], time: `2026-09-07T${hour.toString().padStart(2, '0')}:00:00-05:00`,
      label: `${hour} AM`, isDaytime: true, temperatureF: 72,
      precipProbability: missing ? null : mode === 'rain' ? 75 : 0, windMph: missing ? null : mode === 'wind' ? 23 : 0,
      windGustMph: 0, precipitationIn: 0, conditionLabel: mode === 'storm' ? 'Thunderstorms' : 'Clear', weatherCode: 0,
    }));
    await page.route('https://cloud.umami.is/**', (route) => route.abort());
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json*', (route) => route.fulfill({ json: detail }));
    await page.goto('/rivers/rice-creek-peltier-to-long-lake/');
    const message = page.locator('[data-field="weather-window"]');
    const expected = missing ? 'Hourly forecast readings are incomplete' : mode === 'calm' ? 'Best short-route window:' : 'Weather risks need attention';
    await expect(message).toContainText([expected, expected]);
    if (mode !== 'calm') await expect(page.locator('.weather-hour--best')).toHaveCount(0);
    else await expect(page.locator('.weather-hour--best')).toHaveCount(3);
  });
}
