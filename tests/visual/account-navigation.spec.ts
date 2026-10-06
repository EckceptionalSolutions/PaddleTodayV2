import { expect, test } from '@playwright/test';

test('personal navigation is separate and the dropdown supports keyboard dismissal', async ({ page }) => {
  await page.goto('/trips/');
  const primary = page.getByRole('navigation', { name: 'Primary', exact: true });
  await expect(primary.getByRole('link')).toHaveText(['Today', 'Weekend', 'Explore'], { useInnerText: true });
  const trigger = page.getByRole('button', { name: 'Open account menu' });
  await trigger.focus();
  await trigger.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const account = page.getByRole('navigation', { name: 'Your account' });
  await expect(account.getByRole('link', { name: /My trips/ })).toBeVisible();
  await expect(account.getByRole('link', { name: /Saved routes/ })).toBeVisible();
  await account.getByRole('link', { name: 'Settings' }).focus();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await trigger.click();
  // On narrow screens the dropdown overlaps the heading's center.
  await page.getByRole('heading', { name: 'My trips', exact: true }).click({ position: { x: 1, y: 1 } });
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('empty trips lead with planning and settings is a separate page', async ({ page }) => {
  await page.goto('/trips/');
  await expect(page.locator('#trips-app')).toHaveAttribute('aria-busy', 'false');
  await expect(page.getByRole('main')).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Explore routes', exact: true })).toBeVisible();
  await expect(page.getByRole('searchbox', { name: 'Search trips' })).toHaveCount(0);
  await expect(page.locator('[data-app-download-prompt]')).toHaveCount(0);
  await page.getByRole('tab', { name: 'History' }).click();
  await expect(page.getByRole('tab', { name: 'History' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('heading', { name: 'Your time on the water, remembered' })).toBeVisible();
  await page.getByRole('button', { name: 'Open account menu' }).click();
  await page.getByRole('navigation', { name: 'Your account' }).getByRole('link', { name: 'Settings' }).click();
  await expect(page.getByRole('heading', { name: 'Settings', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'My trips', exact: true })).toHaveCount(0);
  await expect(page.getByText('Browser-only saves and private route notes stay on this device.')).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

test('sign-in return intent is preserved for guests and the auth prompt appears once', async ({ page }) => {
  await page.goto('/account/web/?next=saved');
  await expect(page.getByRole('heading', { name: 'Keep your paddling plans together' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Bring your plans with you' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Continue without signing in' })).toHaveAttribute('href', '/favorites/');
  await page.goto('/account/web/?next=settings');
  await expect(page.getByRole('link', { name: 'Continue without signing in' })).toHaveAttribute('href', '/account/settings/');
});

test('saved routes presents one compact empty-state action', async ({ page }) => {
  await page.goto('/favorites/');
  await expect(page.locator('[data-favorites-empty]')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explore routes', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: "Find today's best pick" })).toHaveCount(0);
});

test('a saved guest draft can be resumed after returning to My trips', async ({ page }) => {
  await page.goto('/trips/');
  await page.getByRole('button', { name: 'Plan a trip', exact: true }).click();
  if (!await page.getByLabel('Trip title', { exact: true }).isVisible()) await page.getByText('More details', { exact: true }).click();
  await page.getByLabel('Trip title', { exact: true }).fill('Saturday on the water');
  await page.getByLabel('River or location', { exact: true }).fill('Cannon River');
  await page.getByRole('button', { name: /Save and sign in|Save draft on this device/ }).click();
  await page.getByRole('button', { name: 'Keep planning here' }).click();
  await expect(page.getByRole('button', { name: 'Continue draft' })).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: 'Continue draft' }).click();
  await expect(page.getByLabel('Trip title', { exact: true })).toHaveValue('Saturday on the water');
});

for (const width of [320, 760, 1280]) {
  test(`account popover stays within the ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/account/settings/');
    await page.getByRole('button', { name: 'Open account menu' }).click();
    const box = await page.locator('#account-popover').boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.screenshot({ path: test.info().outputPath(`settings-menu-${width}.png`) });
  });
}
