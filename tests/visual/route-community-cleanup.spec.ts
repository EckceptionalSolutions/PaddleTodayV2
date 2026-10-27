import { expect, test } from '@playwright/test';
import { installMapLibreHarness } from './maplibre-harness';

test('recent reports replace the compact invitation and still open the report form', async ({ page }) => {
  const slug = 'little-miami-river-kelley-milford';
  await installMapLibreHarness(page);
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
  await page.route(`**/api/rivers/${slug}/community.json`, route => route.fulfill({ json: {
    requestId: 'community-cleanup', riverSlug: slug, photos: [], reports: [{
      id: 'access-report', sourceSubmissionId: 'local-report', approvedAt: new Date().toISOString(),
      contributorName: 'Local paddler', tripDate: '2026-10-26', sentiment: 'good',
      report: 'The launch steps are clear. Watch for a fallen branch near the landing.', notes: '',
    }],
  } }));
  await page.goto(`/rivers/${slug}/#route-gallery`);
  const gallery = page.locator('#route-gallery');
  await gallery.scrollIntoViewIfNeeded();
  await expect(gallery.locator('[data-route-community]')).toBeVisible();
  await expect(gallery).not.toHaveClass(/route-gallery--empty/);
  await expect(gallery.locator('[data-route-gallery-empty-note]')).toBeHidden();
  await expect(gallery.locator('[data-route-gallery-viewer]')).toBeHidden();
  await expect(gallery).toContainText('The launch steps are clear.');
  await expect(gallery.locator('#share-trip')).not.toHaveAttribute('open');
  await gallery.locator('[data-route-report-cta]').click();
  await expect(gallery.locator('#share-trip')).toHaveAttribute('open', '');
  await expect(gallery.locator('[data-route-report-name]')).toBeFocused();
  await expect(gallery.locator('[data-route-report-form]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
