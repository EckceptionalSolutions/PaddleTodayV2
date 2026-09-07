import { expect, test } from '@playwright/test';

const photo = {
  name: 'river.png', mimeType: 'image/png',
  buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64'),
};

test.beforeEach(async ({ page }) => {
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'Offline test' } }));
  await page.route('**/api/route-contributions', (route) => route.fulfill({ json: { ok: true, stored: true } }));
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
});

for (const blocked of ['read', 'write'] as const) {
  test(`photo upload succeeds when storage ${blocked} is blocked`, async ({ page }) => {
    await page.addInitScript((operation) => {
      const method = operation === 'read' ? 'getItem' : 'setItem';
      const original = Storage.prototype[method];
      Storage.prototype[method] = function (...args: any[]) {
        if (args[0] === 'contribute-photo-cooldown') throw new DOMException('Blocked', 'SecurityError');
        return original.apply(this, args as [string, string]);
      };
    }, blocked);
    await page.goto('/contribute/');
    await page.locator('[data-contribute-name]').fill('River paddler');
    await page.locator('[data-contribute-email]').fill('paddler@example.com');
    await page.locator('[data-contribute-route]').selectOption({ index: 1 });
    await page.locator('[data-contribute-files]').setInputFiles(photo);
    await page.locator('[data-contribute-rights]').check();
    await page.locator('[data-contribute-consent]').check();
    await page.locator('[data-contribute-submit]').click();
    await expect(page.locator('[data-contribute-status]')).toHaveText('Thanks. Your photos are in the review queue.');
    await expect(page.locator('[data-contribute-upload-list]')).toBeHidden();
    await page.locator('[data-contribute-submit]').click();
    await expect(page.locator('[data-contribute-status]')).toContainText('Please wait');
  });
}

test('a response that did not store the upload preserves photos and captions', async ({ page }) => {
  await page.route('**/api/route-contributions', (route) => route.fulfill({ json: { ok: true, stored: false } }));
  await page.goto('/contribute/');
  await page.locator('[data-contribute-name]').fill('River paddler');
  await page.locator('[data-contribute-email]').fill('paddler@example.com');
  await page.locator('[data-contribute-route]').selectOption({ index: 1 });
  await page.locator('[data-contribute-files]').setInputFiles(photo);
  await page.locator('[data-upload-caption]').fill('The launch');
  await page.locator('[data-contribute-rights]').check();
  await page.locator('[data-contribute-consent]').check();
  await page.locator('[data-contribute-submit]').click();
  await expect(page.locator('[data-contribute-status]')).toContainText('not received');
  await expect(page.locator('[data-upload-caption]')).toHaveValue('The launch');
  await expect(page.locator('[data-contribute-submit]')).toBeEnabled();
});

test('route condition report succeeds without local storage', async ({ page }) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key.startsWith('route-photo:')) throw new DOMException('Blocked', 'SecurityError');
      return original.call(this, key, value);
    };
  });
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/#share-trip');
  await page.locator('#share-trip').scrollIntoViewIfNeeded();
  await page.locator('[data-route-contribute-tab="report"]').click();
  await page.locator('[data-route-report-name]').fill('River paddler');
  await page.locator('[data-route-report-email]').fill('paddler@example.com');
  await page.locator('[data-route-report-text]').fill('The launch was open and easy to use.');
  for (const field of ['water-level', 'completion', 'verdict']) {
    await page.locator(`[data-route-report-${field}]`).selectOption({ index: 1 });
  }
  await page.locator('[data-route-report-consent]').check();
  await page.locator('[data-route-report-submit]').click();
  await expect(page.locator('[data-route-report-status]')).toHaveText('Thank you for your submission.');
  await expect(page.locator('[data-route-report-text]')).toHaveValue('');
});
