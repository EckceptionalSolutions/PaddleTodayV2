import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const available of [true, false]) {
  test(`river cameras load near gauge details and ${available ? 'enlarge with capture context' : 'hide when absent'}`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: fixture }));
    let requests = 0;
    await page.route('**/api/rivers/*/cameras.json', route => {
      requests += 1;
      return route.fulfill({ json: { requestId: 'camera-test', cameras: available ? [{
        id: 'test', siteId: '01234567', name: 'Test gauge', capturedAt: '2020-01-01T12:00:00Z',
        imageUrl: 'https://usgs-nims-images.s3.amazonaws.com/test.jpg', sourceUrl: 'https://apps.usgs.gov/hivis/camera/test',
      }] : [] } });
    });
    await page.route('https://usgs-nims-images.s3.amazonaws.com/test.jpg', route => route.fulfill({
      contentType: 'image/png', body: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aP1sAAAAASUVORK5CYII=', 'base64'),
    }));
    await page.goto('/river/rice-creek-peltier-to-long-lake');
    await expect(page.getByRole('button', { name: 'Show More section', exact: true }).first()).toBeVisible();
    expect(requests).toBe(0);
    await page.getByRole('button', { name: 'Show More section', exact: true }).first().click();
    await page.getByText('Score history', { exact: true }).scrollIntoViewIfNeeded();
    await expect.poll(() => requests).toBe(1);
    if (!available) {
      await expect(page.getByText('River camera · USGS', { exact: true })).toBeHidden();
      return;
    }
    const enlarge = page.getByRole('button', { name: 'Enlarge river camera at Test gauge', exact: true });
    await expect(enlarge).toBeVisible();
    await expect(page.getByText(/Older image · Captured/)).toBeVisible();
    await enlarge.click();
    await expect(page.getByRole('button', { name: 'Close image', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Close image', exact: true }).click();
    await expect(enlarge).toBeVisible();
  });
}
