import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'Offline test' } }));
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/');
  await page.locator('[data-alert-open]').first().click();
  await expect(page.locator('[data-alert-dialog]')).toBeVisible();
});

test('invalid email is announced and keyboard focus returns after closing', async ({ page }) => {
  const email = page.locator('[data-alert-email]');
  await page.locator('[data-alert-submit="good"]').click();
  await expect(email).toBeFocused();
  await expect(email).toHaveAttribute('aria-invalid', 'true');
  await expect(email).toHaveAttribute('aria-describedby', 'river-alert-status');
  await email.fill('paddler@example.com');
  await expect(email).not.toHaveAttribute('aria-invalid', 'true');
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-alert-dialog]')).toBeHidden();
  await expect(page.locator('[data-alert-open]').first()).toBeFocused();
});

test('an unsaved response retains the email and supports retry', async ({ page }) => {
  await page.route('**/api/alerts', (route) => route.fulfill({ json: { ok: true, stored: false } }));
  const email = page.locator('[data-alert-email]');
  await email.fill('paddler@example.com');
  await page.locator('[data-alert-submit="good"]').click();
  await expect(page.locator('[data-alert-status]')).toContainText('not saved');
  await expect(email).toHaveValue('paddler@example.com');
  await expect(email).toBeEditable();
  await page.route('**/api/alerts', (route) => route.fulfill({ json: { ok: true, duplicate: true, alert: { id: 'test-alert' } } }));
  await page.locator('[data-alert-submit="good"]').click();
  await expect(page.locator('[data-alert-status]')).toContainText("You're already set");
});

test('pending signup locks its email and ignores duplicate submit events', async ({ page }) => {
  let requests = 0;
  let release!: () => void;
  const gate = new Promise<void>((resolve) => { release = resolve; });
  await page.route('**/api/alerts', async (route) => {
    requests += 1;
    await gate;
    await route.fulfill({ json: { ok: true, alert: { id: 'test-alert' } } });
  });
  const email = page.locator('[data-alert-email]');
  await email.fill('paddler@example.com');
  await page.locator('[data-alert-submit="strong"]').click();
  await expect(page.locator('[data-alert-form]')).toHaveAttribute('aria-busy', 'true');
  await expect(email).not.toBeEditable();
  await page.locator('[data-alert-form]').evaluate((form) => {
    form.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true, submitter: form.querySelector('[data-alert-submit="strong"]') }));
  });
  release();
  await expect(page.locator('[data-alert-status]')).toContainText("We'll email you");
  await expect(email).toBeEditable();
  expect(requests).toBe(1);
});
