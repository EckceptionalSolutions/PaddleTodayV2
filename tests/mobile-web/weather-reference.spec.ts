import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const missing of ['weather', 'hours']) {
  test(`missing ${missing} offers an hourly forecast retry`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    let fresh = false;
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => {
      const now = new Date().toISOString();
      const weather = { ...fixture.result.weather, next12hStormRisk: false,
        todayHourly: fresh ? [{ ...fixture.result.weather.todayHourly[0], time: new Date(Math.floor(Date.now() / 3600000) * 3600000).toISOString(),
          precipProbability: 0, windMph: 0, windGustMph: 0, precipitationIn: 0, conditionLabel: 'Clear', weatherCode: 0 }] : [],
      };
      return route.fulfill({ json: { ...fixture, generatedAt: now, result: { ...fixture.result, generatedAt: now,
        weather: !fresh && missing === 'weather' ? null : weather,
        gauge: { ...fixture.result.gauge, observedAt: now },
        liveData: { ...fixture.result.liveData, weather: { ...fixture.result.liveData.weather, state: fresh ? 'live' : 'unavailable' } },
      } } });
    });
    await page.goto('/river/rice-creek-peltier-to-long-lake');
    const unavailable = page.getByText('Hourly forecast unavailable', { exact: true });
    await expect(unavailable).toBeVisible();
    await expect(page.getByText('Good weather window', { exact: true })).toHaveCount(0);
    fresh = true;
    await page.getByRole('button', { name: 'Refresh weather', exact: true }).click();
    await expect(unavailable).toBeHidden();
    await expect(page.getByText('Good weather window', { exact: true })).toBeVisible();
  });
}

for (const scenario of ['old snapshot', 'old hours', 'unavailable source']) {
  test(`${scenario} weather is dated reference until a successful refresh`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    let fresh = false, requests = 0;
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => {
      requests++;
      const detail = structuredClone(fixture);
      const now = new Date().toISOString();
      if (fresh || scenario !== 'old snapshot') { detail.generatedAt = now; detail.result.generatedAt = now; }
      detail.result.gauge.observedAt = now;
      detail.result.liveData.weather.state = !fresh && scenario === 'unavailable source' ? 'unavailable' : 'live';
      detail.result.weather.next12hStormRisk = false;
      detail.result.weather.todayHourly = [{ ...detail.result.weather.todayHourly[0],
        time: fresh || scenario === 'unavailable source' ? new Date(Math.floor(Date.now() / 3600000) * 3600000).toISOString() : '2020-06-15T12:00:00Z',
        label: 'Now', precipProbability: 0, windMph: 0, windGustMph: 0, precipitationIn: 0, conditionLabel: 'Clear', weatherCode: 0,
      }];
      return route.fulfill({ json: detail });
    });
    await page.goto('/river/rice-creek-peltier-to-long-lake');
    const reference = page.getByText('Current paddle window unavailable', { exact: true });
    await expect(reference).toBeVisible();
    await expect(page.getByText('Good weather window', { exact: true })).toHaveCount(0);
    await expect(page.getByText('Now', { exact: true })).toHaveCount(0);
    if (scenario !== 'unavailable source') await expect(page.getByText(/2020/).first()).toBeVisible();
    await reference.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `tmp/weather-reference-${scenario.replaceAll(' ', '-')}-${page.viewportSize()!.width}.png` });
    fresh = true;
    await page.getByRole('button', { name: 'Refresh weather', exact: true }).evaluate((button: HTMLElement) => { button.click(); button.click(); });
    await expect(reference).toBeHidden();
    await expect(page.getByText('Good weather window', { exact: true })).toBeVisible();
    await expect(page.getByText('Now', { exact: true })).toBeVisible();
    expect(requests).toBe(2);
  });
}
