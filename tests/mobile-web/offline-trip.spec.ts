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
  await page.getByRole('button', { name: 'Offline trip', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('button', { name: 'Download offline trip', exact: true })).toBeInViewport();
  const note = dialog.getByRole('textbox', { name: 'Note for your group (optional)', exact: true });
  await note.fill('Offline meeting note');
  await dialog.getByRole('button', { name: 'Download offline trip', exact: true }).click();
  await expect(dialog.getByText('Trip downloaded. Open it from Saved, even without a connection.', { exact: true })).toBeVisible();
  await expect(dialog.getByText(/Ready for offline reference/)).toBeVisible();
  await dialog.getByRole('button', { name: 'Close prepare trip', exact: true }).click();
  await page.goto('/saved');
  await page.getByRole('tab', { name: 'Trips', exact: true }).click();
  await expect(page.getByText('Offline trips', { exact: true })).toBeVisible();
  await page.evaluate(() => {
    const key = 'paddletoday:trip-draft:v1:["rice-creek-peltier-to-long-lake","peltier-lake","long-lake"]';
    const record = JSON.parse(localStorage.getItem(key)!);
    record.draft.note = 'Updated offline meeting note';
    record.savedAt = new Date().toISOString();
    localStorage.setItem(key, JSON.stringify(record));
  });
  await page.evaluate(() => localStorage.removeItem('paddletoday-mobile-query-cache'));
  await page.reload();
  await page.getByRole('tab', { name: 'Trips', exact: true }).click();
  await expect(page.getByRole('button', { name: /Open offline trip for Rice Creek:/ })).toBeVisible();
  await expect(page.getByText('Offline copy differs from your saved draft: notes.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Update offline copy', exact: true }).click();
  await expect(page.getByText('Offline copy updated with your saved timing and notes.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: /Open offline trip for Rice Creek:/ }).click();
  const offline = page.getByRole('dialog');
  await expect(offline.getByText('Current conditions unavailable', { exact: true })).toBeVisible();
  await expect(offline.getByText('Conditions saved at download', { exact: true })).toBeVisible();
  await expect(offline.getByText('Historical reference only — these conditions are not current.', { exact: true })).toBeVisible();
  await offline.getByRole('button', { name: 'Show downloaded conditions', exact: true }).click();
  await expect(offline.getByText('6.31 ft', { exact: true })).toBeVisible();
  await expect(offline.getByText('80.06 °F', { exact: true })).toBeVisible();
  await offline.getByRole('button', { name: 'Hide downloaded conditions', exact: true }).click();
  await expect(offline.getByText('Updated offline meeting note', { exact: true })).toBeVisible();
  await expect(offline.getByText(/Put-in: Peltier Lake boat launch/)).toBeVisible();
  await expect(offline.getByText(/Take-out: Long Lake Regional Park/)).toBeVisible();
  await expect(offline.getByText('Your selected segment', { exact: true })).toBeVisible();
  await expect(offline.getByText('Distance: 15.2 miles', { exact: true })).toBeVisible();
  await expect(offline.getByText('Reference route geometry', { exact: true })).toBeVisible();
  await offline.getByRole('button', { name: 'Close offline trip', exact: true }).click();
  await page.getByRole('button', { name: /Remove offline trip for Rice Creek:/ }).click();
  await page.getByRole('button', { name: 'Remove offline copy', exact: true }).click();
  await expect(page.getByText('Offline trips', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /Open offline trip for Rice Creek:/ })).toHaveCount(0);
  expect(await page.evaluate(() => Object.keys(localStorage).some(key => key.startsWith('paddletoday:trip-draft:v1:')))).toBe(true);
});
