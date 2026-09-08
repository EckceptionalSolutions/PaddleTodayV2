import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('hub explains saved calculations as historical and restores current language after refresh', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  let fresh = false;
  await page.route('**/api/**', request => request.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/river-groups/rice-creek.json', request => {
    const generatedAt = fresh ? new Date().toISOString() : '2020-01-01T00:00:00Z';
    return request.fulfill({ json: { generatedAt, result: {
      group: { riverId: 'rice-creek', name: 'Rice Creek', routeCount: 1, stateSummary: 'Minnesota', regions: ['Twin Cities'] },
      routes: [{ ...fixture.result, generatedAt, readiness: { status: 'ready', label: 'Ready', reason: 'QA' } }],
    } } });
  });
  await page.goto('/river-hub/rice-creek');
  await page.getByRole('button', { name: /^Save route:/ }).press('Space');
  await expect(page.getByRole('button', { name: /^Remove saved route:/ })).toHaveAttribute('aria-pressed', 'true');
  await expect(page).toHaveURL('/river-hub/rice-creek');
  await page.getByRole('button', { name: 'Dismiss', exact: true }).click();
  await expect(page.getByText('Saved conditions · update needed', { exact: true })).toBeVisible();
  await page.getByText('View saved score details', { exact: true }).click();
  const explanation = page.getByText(/The saved calculation started/);
  await expect(explanation).toContainText('It does not describe current conditions.');
  await expect(page.getByText(/Weather shifts it to .* today\./)).toHaveCount(0);
  await explanation.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `tmp/hub-saved-conditions-${page.viewportSize()!.width}.png` });
  fresh = true;
  await page.getByRole('button', { name: 'Refresh cached conditions', exact: true }).click();
  await expect(page.getByText('Saved conditions · update needed', { exact: true })).toHaveCount(0);
  await expect(page.getByText(/Weather shifts it to .* today\./)).toBeVisible();
});
