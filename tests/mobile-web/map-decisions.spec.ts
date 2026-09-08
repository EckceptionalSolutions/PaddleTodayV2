import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const status of ['ready', 'verify', 'withheld', 'skip'] as const) {
  for (const screen of ['explore', 'river-hub/rice-creek']) {
    test(`${screen} maps the public ${status} call rather than the raw favorable rating`, async ({ page }) => {
      await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
      const generatedAt = new Date().toISOString();
      const route = { ...fixture.result, generatedAt, score: 95, rating: 'Strong',
        readiness: { status, label: status, reason: 'QA fixture.' },
      };
      await page.route('**/api/**', request => request.fulfill({ status: 503, json: { error: 'offline' } }));
      await page.route('**/api/rivers/summary.json', request => request.fulfill({ json: { generatedAt, rivers: [{ ...route,
        summary: { shortExplanation: 'QA fixture.', gaugeNow: 'Fixture' },
        liveData: { overall: 'live', summary: 'Fixture', gaugeState: 'live', weatherState: 'live' },
      }] } }));
      await page.route('**/api/river-groups/rice-creek.json', request => request.fulfill({ json: { generatedAt, result: {
        group: { riverId: 'rice-creek', name: 'Rice Creek', routeCount: 1, stateSummary: 'Minnesota', regions: ['Twin Cities'] }, routes: [route],
      } } }));
      const intent = status === 'verify' ? 'watch' : status === 'withheld' ? 'no-call' : status === 'skip' ? 'skip' : 'clean-now';
      await page.goto(`/${screen}${screen === 'explore' ? `?intent=${intent}` : ''}`);
      const label = status === 'ready' ? 'Paddle today' : status === 'verify' ? 'Watch closely' : status === 'skip' ? 'Skip today' : 'Call unavailable';
      const marker = page.getByRole('button', { name: new RegExp(label) });
      await expect(marker).toHaveCount(1);
      await expect(marker).toBeVisible();
      if (status === 'withheld') {
        await expect(marker).not.toHaveAccessibleName(/95/);
        await expect(marker.getByText('—', { exact: true })).toBeVisible();
      } else await expect(marker).toHaveAccessibleName(/score 95/);
      if (screen !== 'explore') {
        await expect(page.getByText('Recommended today', { exact: true })).toHaveCount(status === 'ready' ? 1 : 0);
      }
      if (status === 'withheld') {
        await marker.scrollIntoViewIfNeeded();
        await page.screenshot({ path: `tmp/map-call-${screen.replaceAll('/', '-')}-${page.viewportSize()!.width}.png` });
      }
      await marker.press('Enter');
      if (screen === 'explore') {
        await expect(page.getByRole('button', { name: 'Expand route drawer', exact: true }).first()).toBeVisible();
        const score = page.getByLabel(status === 'withheld' ? label : `${label}, score 95`, { exact: true });
        await expect(score).toHaveText(status === 'withheld' ? '—' : '95');
      }
    });
  }
}
