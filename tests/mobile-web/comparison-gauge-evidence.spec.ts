import { expect, test } from '@playwright/test';
import { installMobileBoardFixtures } from './mobile-board-fixtures';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const surface of ['hub', 'saved']) {
  test(surface + ' compares measured gauge evidence separately from snapshot time', async ({ page }) => {
    const now = Date.now(), generatedAt = new Date(now).toISOString();
    const routes = [15, 500, null].map((age, index) => ({
      ...fixture.result, generatedAt, score: 95, readiness: { status: 'ready', label: 'Ready', reason: 'Fixture' },
      river: { ...fixture.result.river, slug: 'comparison-' + index, name: 'Rice Creek', reach: 'Reach ' + index },
      gauge: age === null ? null : { ...fixture.result.gauge, current: index ? 1235 : 6.31, unit: index ? 'cfs' : 'ft', observedAt: new Date(now - age * 60000).toISOString() },
    }));
    await page.addInitScript(rivers => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      localStorage.setItem('paddletoday:account-backup-invitation-dismissed:v1', '1');
      localStorage.setItem('paddletoday:saved-rivers', JSON.stringify(rivers));
    }, routes.map(({ river }) => ({ ...river, savedAt: generatedAt })));
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
    if (surface === 'hub') {
      await page.route('**/api/river-groups/rice-creek.json', route => route.fulfill({ json: { generatedAt, result: {
        group: { riverId: 'rice-creek', name: 'Rice Creek', routeCount: 3, stateSummary: 'Minnesota', regions: [] }, routes,
      } } }));
      await page.goto('/river-hub/rice-creek');
      for (let index = 0; index < 3; index++) await page.getByRole('button', { name: 'Add to comparison: Reach ' + index, exact: true }).click();
      await page.getByRole('button', { name: 'Compare 3 selected routes', exact: true }).click();
    } else {
      const serve = await installMobileBoardFixtures(page);
      const rivers = routes.map(route => ({ ...route, summary: { gaugeNow: '', shortExplanation: '' }, liveData: { overall: 'live', gaugeState: 'live', weatherState: 'live' } }));
      await page.route('**/api/mobile/{summary,explore}.json**', route => serve(route, { json: { generatedAt, rivers } }));
      await page.goto('/saved');
      await page.getByRole('button', { name: 'Compare saved routes', exact: true }).click();
      for (let index = 0; index < 3; index++) await page.getByRole('checkbox', { name: 'Compare route: Rice Creek: Reach ' + index }).click();
      await page.getByRole('button', { name: 'Compare 3 selected saved routes' }).click();
    }
    const sheet = page.getByRole('dialog');
    for (const [index, [reading, observation]] of [['6.31 ft', 'Current · observed'], ['1,235 cfs', 'Delayed · observed'], ['No reading', 'No observation available']].entries()) {
      await expect(sheet.getByTestId('comparison-reading-' + index)).toContainText(reading);
      await expect(sheet.getByTestId('comparison-observed-' + index)).toContainText(observation);
    }
    await expect(sheet.getByText(/Snapshot generated/).first()).toBeVisible();
  });
}
