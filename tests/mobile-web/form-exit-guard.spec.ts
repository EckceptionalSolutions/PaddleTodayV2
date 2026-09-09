import { test, expect, type Route } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.goto('/more');
  await page.getByRole('button', { name: /Request a route/ }).click();
});

test('Back leaves untouched forms and protects edited route requests', async ({ page }) => {
  const back = page.getByRole('link', { name: 'Go back', exact: true });
  await back.click();
  await expect(page).toHaveURL(/\/more$/);
  await page.getByRole('button', { name: /Request a route/ }).click();
  const name = page.getByRole('textbox', { name: 'River name', exact: true });
  await name.fill('Unsaved creek');
  await back.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByText('Leave route request?', { exact: true })).toBeVisible();
  await page.screenshot({ path: `tmp/form-exit-${page.viewportSize()!.width}.png` });
  await dialog.getByRole('button', { name: 'Keep editing', exact: true }).click();
  await expect(name).toHaveValue('Unsaved creek');
  await back.click();
  await dialog.getByRole('button', { name: 'Discard changes', exact: true }).click();
  await expect(page).toHaveURL(/\/more$/);
});

test('Back waits for submission and follows through only after confirmed success', async ({ page }) => {
  let pending: Route | undefined;
  await page.route('**/api/route-request', route => { pending = route; });
  await page.getByRole('textbox', { name: 'River name', exact: true }).fill('QA Creek');
  await page.getByRole('textbox', { name: 'City, state, or general area', exact: true }).fill('MN');
  await page.getByRole('button', { name: 'Send request', exact: true }).click();
  await expect.poll(() => Boolean(pending)).toBe(true);
  await page.getByRole('link', { name: 'Go back', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByText('Submission in progress', { exact: true })).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Discard changes', exact: true })).toHaveCount(0);
  await pending!.fulfill({ status: 503, json: { message: 'Try again.' } });
  await expect(dialog.getByText('Leave route request?', { exact: true })).toBeVisible();
  await dialog.getByRole('button', { name: 'Keep editing', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'River name', exact: true })).toHaveValue('QA Creek');
  pending = undefined;
  await page.getByRole('button', { name: 'Send request', exact: true }).click();
  await expect.poll(() => Boolean(pending)).toBe(true);
  await page.getByRole('link', { name: 'Go back', exact: true }).click();
  await expect(dialog.getByText('Submission in progress', { exact: true })).toBeVisible();
  await pending!.fulfill({ json: { ok: true, stored: true } });
  await expect(page).toHaveURL(/\/more$/);
  await expect(dialog).toHaveCount(0);
});
