import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Form tests must never submit a real request or send analytics.
  await page.route('**/api/route-request', (route) => route.fulfill({
    json: { stored: true },
  }));
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
});

test('invalid fields explain the problem and focus the first correction', async ({ page }) => {
  await page.goto('/request-river/');
  await page.locator('[data-request-submit]').click();
  const name = page.locator('[name="routeName"]');
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(name).toHaveAccessibleDescription('Add a route or river name.');
  await expect(page.locator('#request-state-error')).toBeVisible();
  await name.fill('St. Croix River');
  await expect(page.locator('#request-routeName-error')).toBeHidden();
  await expect(name).not.toHaveAttribute('aria-invalid');
  await page.screenshot({ path: test.info().outputPath('request-validation.png'), fullPage: true });
});

for (const blocked of ['read', 'write'] as const) {
  test(`request succeeds when browser storage ${blocked} is blocked`, async ({ page }) => {
    await page.addInitScript((operation) => {
      const method = operation === 'read' ? 'getItem' : 'setItem';
      const original = Storage.prototype[method];
      Storage.prototype[method] = function (...args: any[]) {
        if (args[0] === 'paddletoday:routeRequest:lastTs') throw new DOMException('Blocked', 'SecurityError');
        return original.apply(this, args as [string, string]);
      };
    }, blocked);
    await page.goto('/request-river/');
    await page.locator('[name="routeName"]').fill('St. Croix River');
    await page.locator('[name="state"]').fill('WI');
    await page.locator('[data-request-submit]').click();
    await expect(page.locator('[data-request-status]')).toHaveText('Request received. Thank you.');
    await expect(page.locator('[name="routeName"]')).toHaveValue('');
    await expect(page.locator('[data-request-submit]')).toBeEnabled();
    await page.locator('[data-request-submit]').click();
    await expect(page.locator('[data-request-status]')).toContainText('Please wait');
  });
}

test('failed requests retain the draft and prepare an email fallback', async ({ page }) => {
  await page.route('**/api/route-request', (route) => route.fulfill({ status: 503, json: { error: 'Unavailable' } }));
  await page.goto('/request-river/?mode=update&routeName=St.%20Croix&state=WI&notes=Access%20closed');
  await expect(page.locator('details')).toHaveAttribute('open');
  await expect(page.locator('[name="notes"]')).toBeVisible();
  await page.locator('[data-request-submit]').click();
  await expect(page.locator('[data-request-status]')).toContainText('Your entries are still here');
  await expect(page.locator('[name="notes"]')).toHaveValue('Access closed');
  await expect(page.locator('[data-request-submit]')).toHaveText('Send update');
  const href = await page.locator('[data-request-email-link]').getAttribute('href');
  expect(decodeURIComponent(href!)).toContain('Route update: St. Croix (WI)');
  expect(decodeURIComponent(href!)).toContain('Access closed');
});

test('a pending submission cannot be sent twice', async ({ page }) => {
  let submissions = 0;
  let release!: () => void;
  const gate = new Promise<void>((resolve) => { release = resolve; });
  await page.route('**/api/route-request', async (route) => {
    submissions += 1;
    await gate;
    await route.fulfill({ json: { stored: true } });
  });
  await page.goto('/request-river/?routeName=St.%20Croix&state=WI');
  await page.locator('[data-request-submit]').click();
  await expect(page.locator('[data-request-submit]')).toBeDisabled();
  await expect(page.locator('[data-request-form]')).toHaveAttribute('aria-busy', 'true');
  await page.locator('[data-request-form]').evaluate((form: HTMLFormElement) => {
    form.requestSubmit();
    form.requestSubmit();
  });
  release();
  await expect(page.locator('[data-request-status]')).toHaveText('Request received. Thank you.');
  expect(submissions).toBe(1);
});

for (const failure of ['throw', 'reject'] as const) {
  test(`analytics ${failure} does not turn a received request into a failure`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript((mode) => {
      (window as any).umami = { track: () => {
        if (mode === 'throw') throw new Error('Analytics unavailable');
        return Promise.reject(new Error('Analytics unavailable'));
      } };
    }, failure);
    await page.goto('/request-river/?routeName=St.%20Croix&state=WI');
    await page.locator('[data-request-submit]').click();
    await expect(page.locator('[data-request-status]')).toHaveText('Request received. Thank you.');
    await expect(page.locator('[name="routeName"]')).toHaveValue('');
    expect(errors).toEqual([]);
  });
}
