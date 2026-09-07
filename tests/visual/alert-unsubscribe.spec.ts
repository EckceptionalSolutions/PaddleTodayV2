import { expect, test } from '@playwright/test';

const link = '/alerts/unsubscribe/?alert=test-alert&token=test-token&river=Rice%20Creek&slug=rice-creek-peltier-to-long-lake&threshold=good';

test.beforeEach(async ({ page }) => {
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
});

test('unsubscribe requires an explicit action and hides the button after success', async ({ page }) => {
  let requests = 0;
  await page.route('**/api/alerts/unsubscribe', (route) => {
    requests += 1;
    return route.fulfill({ json: { ok: true } });
  });
  await page.goto(link);
  const button = page.getByRole('button', { name: 'Unsubscribe' });
  await expect(button).toBeEnabled();
  expect(requests).toBe(0);
  await button.click();
  await expect(page.locator('[data-alert-manage-status]')).toContainText('This alert is now off');
  await expect(button).toBeHidden();
  expect(requests).toBe(1);
  await expect(page.getByRole('link', { name: 'Back to river' })).toBeFocused();
  await expect(page.getByRole('link', { name: 'Back to river' })).toHaveAttribute('href', '/rivers/rice-creek-peltier-to-long-lake/');
});

test('failed unsubscribe can retry and recognize an already inactive alert', async ({ page }) => {
  await page.route('**/api/alerts/unsubscribe', (route) => route.fulfill({ status: 503, json: { message: 'Please try again.' } }));
  await page.goto(link);
  const button = page.locator('[data-alert-manage-submit]');
  await button.click();
  await expect(page.locator('[data-alert-manage-status]')).toHaveText('Please try again.');
  await expect(button).toBeEnabled();
  await page.route('**/api/alerts/unsubscribe', (route) => route.fulfill({ json: { ok: true, alreadyInactive: true } }));
  await button.click();
  await expect(page.locator('[data-alert-manage-status]')).toHaveText('This alert was already turned off.');
  await expect(button).toBeHidden();
});

test('incomplete email links cannot submit', async ({ page }) => {
  await page.goto('/alerts/unsubscribe/?alert=test-alert');
  await expect(page.locator('[data-alert-manage-submit]')).toBeDisabled();
  await expect(page.locator('[data-alert-manage-status]')).toContainText('missing information');
});

test('a stalled unsubscribe times out and leaves a usable retry', async ({ page }) => {
  await page.addInitScript(() => {
    const originalTimeout = AbortSignal.timeout.bind(AbortSignal);
    AbortSignal.timeout = (milliseconds) => originalTimeout(milliseconds === 15_000 ? 150 : milliseconds);
  });
  await page.route('**/api/alerts/unsubscribe', () => {});
  await page.goto(link);
  const button = page.locator('[data-alert-manage-submit]');
  await button.click();
  await expect(page.locator('[data-alert-manage-status]')).toContainText('Try again to confirm this alert is off');
  await expect(button).toBeEnabled();
  await expect(button).toHaveText('Unsubscribe');
  await expect(button).not.toHaveAttribute('aria-busy', 'true');
});

test('an unexpected successful response cannot falsely confirm removal', async ({ page }) => {
  await page.route('**/api/alerts/unsubscribe', (route) => route.fulfill({ json: {} }));
  await page.goto(link);
  await page.locator('[data-alert-manage-submit]').click();
  await expect(page.locator('[data-alert-manage-status]')).toHaveText('Could not turn off this alert.');
  await expect(page.locator('[data-alert-manage-submit]')).toBeEnabled();
});
