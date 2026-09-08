import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const viewMode of ['map', 'list']) {
  test(`${viewMode} broadens an empty call filter while retaining the search and state`, async ({ page }) => {
    await page.setViewportSize({ width: page.viewportSize()!.width, height: 480 });
    await page.addInitScript(viewMode => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      if (localStorage.getItem('qa:explore-seeded')) return;
      localStorage.setItem('qa:explore-seeded', '1');
      localStorage.setItem('paddletoday:explore-preferences:v4', JSON.stringify({ viewMode, filters: {
        sort: 'best', query: 'Rice', state: 'Minnesota', difficulty: 'any', routeType: 'all', status: 'clean',
        rating: 'any', distance: 'any', paddleTime: 'any', paddleLength: 'any', camping: 'any',
      } }));
    }, viewMode);
    const generatedAt = '2020-01-01T00:00:00Z';
    const rivers = ['Minnesota', 'Wisconsin'].map(state => ({ ...fixture.result, generatedAt,
      river: { ...fixture.result.river, slug: `rice-${state}`, riverId: `rice-${state}`, name: `Rice ${state}`, state },
      summary: { shortExplanation: 'Old QA fixture', gaugeNow: 'Old QA reading' },
      liveData: { overall: 'live', summary: 'QA fixture', gaugeState: 'live', weatherState: 'live' },
    }));
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { generatedAt, rivers } }));
    await page.goto('/explore');
    await expect(page.getByRole('heading', { name: 'No Paddle calls match', exact: true })).toBeVisible();
    await expect(page.getByText('1 matching route has other calls. Show all calls to review them.', { exact: true })).toBeVisible();
    const broaden = page.getByRole('button', { name: 'Show all matching calls', exact: true });
    await broaden.scrollIntoViewIfNeeded();
    await expect(broaden).toBeInViewport({ ratio: 1 });
    if (viewMode === 'map') {
      await expect(page.getByRole('button', { name: 'Show all rivers', exact: true })).toHaveCount(0);
      const calls = await page.getByRole('button', { name: 'Change call filter, currently Paddle', exact: true }).boundingBox();
      const button = await broaden.boundingBox();
      expect(button!.y).toBeGreaterThanOrEqual(calls!.y + calls!.height);
    }
    await expect(broaden).toBeVisible();
    await broaden.click({ trial: true });
    await page.screenshot({ path: `tmp/explore-call-recovery-${viewMode}-${page.viewportSize()!.width}.png` });
    await broaden.press('Enter');
    await expect(page.getByRole('textbox', { name: 'Search routes', exact: true })).toHaveValue('Rice');
    await expect(page.getByRole('heading', { name: 'No Paddle calls match', exact: true })).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:explore-preferences:v4')!).filters.status)).toBe('any');
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:explore-preferences:v4')!).filters.state)).toBe('Minnesota');
    await page.reload();
    await expect(page.getByRole('textbox', { name: 'Search routes', exact: true })).toHaveValue('Rice');
    await expect(page.getByRole('button', { name: 'Show all matching calls', exact: true })).toHaveCount(0);
    await page.getByRole('textbox', { name: 'Search routes', exact: true }).fill('Unmatched route name');
    await expect(page.getByRole('button', { name: 'Clear route search', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Show all matching calls', exact: true })).toHaveCount(0);
    await page.getByRole('button', { name: 'Clear route search', exact: true }).click();
    await expect(page.getByRole('textbox', { name: 'Search routes', exact: true })).toHaveValue('');
  });
}
