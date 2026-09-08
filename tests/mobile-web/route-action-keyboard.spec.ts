import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('gauge evidence and More alerts can be opened by keyboard', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    (window as any).openedEvidence = [];
    window.open = (url) => { (window as any).openedEvidence.push(String(url)); return null; };
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  const source = 'https://example.org/qa-gauge';
  const graph = 'https://example.org/qa-graph';
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: { ...fixture, result: { ...fixture.result,
    river: { ...fixture.result.river, gaugeSource: { ...fixture.result.river.gaugeSource, detailUrl: source, hydrographUrl: graph } },
  } } }));
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  const sourceButton = page.getByRole('button', { name: 'Open gauge source', exact: true });
  expect((await sourceButton.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await sourceButton.press('Space');
  await page.getByRole('button', { name: 'Open gauge graph', exact: true }).press('Enter');
  await expect.poll(() => page.evaluate(() => (window as any).openedEvidence)).toEqual([
    source, graph,
  ]);
  await page.getByRole('button', { name: 'Show More section', exact: true }).first().click();
  await page.getByRole('button', { name: 'Manage this route’s alerts', exact: true }).press('Space');
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'Route alerts', exact: true })).toBeVisible();
});
