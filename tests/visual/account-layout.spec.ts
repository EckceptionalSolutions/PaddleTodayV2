import { test, expect } from '@playwright/test';

const sharedPages = ['/', '/account/', '/trips/', '/share/trip/'];
const webAccountExperienceEnabled = !['0', 'false'].includes(process.env.PUBLIC_FEATURE_WEB_ACCOUNT_EXPERIENCE ?? '');
const firebaseWebConfigured = Boolean(process.env.PUBLIC_FIREBASE_API_KEY && process.env.PUBLIC_FIREBASE_AUTH_DOMAIN && process.env.PUBLIC_FIREBASE_PROJECT_ID && process.env.PUBLIC_FIREBASE_APP_ID);

test('home, account, trips, and shared-trip pages use the same visible primary navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of sharedPages) {
    await page.goto(path);
    await expect(page.locator('main#main-content')).toHaveCount(1);
    const nav = page.locator('header.site-header nav[aria-label="Primary"]');
    await expect(nav).toBeVisible();
    const tripLink = nav.getByRole('link', { name: 'My trips', exact: true });
    const accountLink = nav.getByRole('link', { name: 'Account', exact: true });
    if (!webAccountExperienceEnabled) {
      await expect(tripLink).toHaveCount(0);
      await expect(accountLink).toHaveCount(0);
      continue;
    }
    await expect(tripLink).toBeVisible();
    await expect(accountLink).toBeVisible();
    expect(await Promise.all([tripLink, accountLink].map(link => link.evaluate(element => {
      const linkRect = element.getBoundingClientRect();
      const navRect = element.closest('nav')!.getBoundingClientRect();
      return linkRect.left >= navRect.left && linkRect.right <= navRect.right;
    })))).toEqual([true, true]);
  }
});

test('account and trip pages stay inside the shared content width without nested main landmarks', async ({ page }) => {
  for (const path of ['/account/', '/trips/']) {
    await page.goto(path);
    await expect(page.locator('main#main-content')).toHaveCount(1);
    const widths = await page.locator('main#main-content, .trips-page').evaluateAll(elements =>
      elements.map(element => element.getBoundingClientRect().width),
    );
    expect(widths[1]).toBeCloseTo(widths[0], 0);
  }
});

test('account and trip pages bust cached page-specific styles after releases', async ({ page }) => {
  test.skip(!webAccountExperienceEnabled, 'The account and trip pages are disabled in this build.');
  for (const path of ['/account/', '/account/web/', '/trips/']) {
    await page.goto(path);
    await expect(page.locator('link[rel="stylesheet"][href*="/styles/trips.css"]'))
      .toHaveAttribute('href', /\?v=20260928-account-trips-ux/);
  }
});

test('email sign-in reveals its field before starting authentication', async ({ page }) => {
  test.skip(!webAccountExperienceEnabled, 'Website account sign-in is disabled in this build.');
  await page.goto('/account/');
  await page.getByRole('button', { name: 'Continue with email' }).click();
  await expect(page.getByPlaceholder('you@example.com')).toBeVisible();
});

test('email sign-in sends a link request', async ({ page }) => {
  test.skip(!firebaseWebConfigured, 'Firebase web configuration is not present in this local build.');
  test.skip(!webAccountExperienceEnabled, 'Website account sign-in is disabled in this build.');
  await page.route('**/identitytoolkit.googleapis.com/v1/accounts:sendOobCode**', route =>
    route.fulfill({ json: { email: 'paddler@example.com' } }),
  );
  await page.goto('/account/');
  await page.getByRole('button', { name: 'Continue with email' }).click();
  await page.getByPlaceholder('you@example.com').fill('paddler@example.com');
  await page.getByRole('button', { name: 'Send sign-in link' }).click();
  await expect(page.getByRole('status')).toContainText('Check your email for the sign-in link');
});

test('Google sign-in opens its Firebase provider window', async ({ page }) => {
  test.skip(!firebaseWebConfigured, 'Firebase web configuration is not present in this local build.');
  test.skip(!webAccountExperienceEnabled, 'Website account sign-in is disabled in this build.');
  await page.goto('/account/');
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Continue with Google' }).click();
  const popup = await popupPromise;
  await popup.close();
});
