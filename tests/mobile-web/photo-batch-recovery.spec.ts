import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const form of ['photos', 'report']) {
  test(`${form}: one encoding failure preserves other selected photos and allows retry`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: fixture }));
    await page.goto(`/${form === 'photos' ? 'contribute-photo' : 'river'}/rice-creek-peltier-to-long-lake`);
    if (form === 'report') {
      await page.getByRole('button', { name: 'Show Reports section', exact: true }).first().click();
      await page.getByRole('button', { name: 'Send route report', exact: true }).click();
    }
    const scope = form === 'report' ? page.getByRole('dialog') : page;
    await page.evaluate(() => {
      const original = HTMLCanvasElement.prototype.toBlob;
      HTMLCanvasElement.prototype.toBlob = function() {
        HTMLCanvasElement.prototype.toBlob = original;
        throw new Error('QA: one photo could not be encoded');
      };
    });
    const upload = scope.getByRole('button', { name: form === 'photos' ? 'Upload photos' : 'Add report photos', exact: true });
    const buffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a6ioAAAAASUVORK5CYII=', 'base64');
    const chooser = page.waitForEvent('filechooser');
    await upload.click();
    await (await chooser).setFiles([{ name: 'first.png', mimeType: 'image/png', buffer }, { name: 'second.png', mimeType: 'image/png', buffer }]);
    await expect(scope.getByText('1/4 attached', { exact: true })).toBeVisible();
    await expect(scope.getByText(/Some photos could not be added\./)).toBeVisible();
    const retry = page.waitForEvent('filechooser');
    await upload.click();
    await (await retry).setFiles({ name: 'retry.png', mimeType: 'image/png', buffer });
    await expect(scope.getByText('2/4 attached', { exact: true })).toBeVisible();
    await expect(upload).toBeEnabled();
    const fillRemaining = page.waitForEvent('filechooser');
    await upload.click();
    await (await fillRemaining).setFiles(['third.png', 'fourth.png', 'extra.png'].map(name => ({ name, mimeType: 'image/png', buffer })));
    await expect(scope.getByText('4/4 attached', { exact: true })).toBeVisible();
    await expect(upload).toBeDisabled();
    await scope.getByRole('button', { name: /^Remove / }).first().click();
    await expect(scope.getByText('3/4 attached', { exact: true })).toBeVisible();
    await expect(upload).toBeEnabled();
  });
}
