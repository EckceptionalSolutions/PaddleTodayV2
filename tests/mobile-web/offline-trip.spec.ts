import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

const slug = 'rice-creek-peltier-to-long-lake';
const geometry = {
  requestId: 'offline-qa', routeId: slug, state: 'Minnesota', source: 'canonical QA fixture',
  geometry: { type: 'LineString', coordinates: [[-93.0701588, 45.175054], [-93.1359875, 45.1383968], [-93.1994956, 45.0805227]] },
};

test('downloads a trip packet, reopens it after the live cache is removed, and preserves the draft on removal', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route(`**/api/rivers/${slug}.json`, route => route.fulfill({ json: fixture }));
  await page.route(`**/api/rivers/${slug}/geometry.json`, route => route.fulfill({ json: geometry }));
  await page.goto(`/river/${slug}`);
  await page.getByText('Access', { exact: true }).click();
  await page.getByRole('button', { name: 'Prepare this trip', exact: true }).click();
  const dialog = page.getByRole('dialog');
  const note = dialog.getByRole('textbox', { name: 'Note for your group (optional)', exact: true });
  await note.fill('Offline meeting note');
  await dialog.getByRole('button', { name: 'Download offline trip', exact: true }).click();
  await expect(dialog.getByText('Trip downloaded. Open it from Saved, even without a connection.', { exact: true })).toBeVisible();
  await expect(dialog.getByText(/Ready for offline reference/)).toBeVisible();
  await dialog.getByRole('button', { name: 'Close prepare trip', exact: true }).click();
  await page.goto('/saved');
  await expect(page.getByText('Offline trips', { exact: true })).toBeVisible();
  await page.evaluate(() => localStorage.removeItem('paddletoday-mobile-query-cache'));
  await page.reload();
  await expect(page.getByRole('button', { name: /Open offline trip for Rice Creek:/ })).toBeVisible();
  await page.getByRole('button', { name: /Open offline trip for Rice Creek:/ }).click();
  const offline = page.getByRole('dialog');
  await expect(offline.getByText('Current conditions unavailable', { exact: true })).toBeVisible();
  await expect(offline.getByText('Offline meeting note', { exact: true })).toBeVisible();
  await expect(offline.getByText(/Put-in: Peltier Lake boat launch/)).toBeVisible();
  await expect(offline.getByText(/Take-out: Long Lake Regional Park/)).toBeVisible();
  await expect(offline.getByText('Reference route geometry', { exact: true })).toBeVisible();
  await offline.getByRole('button', { name: 'Close offline trip', exact: true }).click();
  await page.getByRole('button', { name: /Remove offline trip for Rice Creek:/ }).click();
  await page.getByRole('button', { name: 'Remove offline copy', exact: true }).click();
  await expect(page.getByText('Offline trips', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /Open offline trip for Rice Creek:/ })).toHaveCount(0);
  expect(await page.evaluate(() => Object.keys(localStorage).some(key => key.startsWith('paddletoday:trip-draft:v1:')))).toBe(true);
});
