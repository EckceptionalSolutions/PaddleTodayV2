import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('unavailable community thumbnails keep their description, credit, and full-photo action', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    window.open = (url) => { (window as unknown as { openedPhoto: string }).openedPhoto = String(url); return null; };
  });
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake/community.json', (route) => route.fulfill({ json: {
    requestId: 'qa-community-photo', riverSlug: fixture.result.river.slug, reports: [], photos: [{
      id: 'qa-photo', src: '/qa/community-photo.jpg', alt: 'Carry-in beside the footbridge', caption: 'Put-in from the parking area',
      credit: 'QA paddler', approvedAt: '2026-09-06T12:00:00.000Z', sourceSubmissionId: 'qa-submission',
    }],
  } }));
  await page.route('**/qa/community-photo.jpg', (route) => route.abort());
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await page.getByRole('button', { name: 'Show Reports section', exact: true }).first().click();
  const photo = page.getByRole('button', { name: 'Open community photo: Carry-in beside the footbridge', exact: true });
  await expect(photo.getByText('Photo unavailable', { exact: true })).toBeVisible();
  await expect(photo.getByText('Put-in from the parking area', { exact: true })).toBeVisible();
  await expect(photo.getByText('Photo by QA paddler', { exact: true })).toBeVisible();
  await photo.press('Enter');
  await expect.poll(() => page.evaluate(() => (window as unknown as { openedPhoto: string }).openedPhoto)).toMatch(/\/qa\/community-photo\.jpg$/);
});
