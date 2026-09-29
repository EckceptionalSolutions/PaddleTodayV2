import { test, expect } from '@playwright/test';

const webAccountExperienceDisabled = ['0', 'false'].includes(process.env.PUBLIC_FEATURE_WEB_ACCOUNT_EXPERIENCE ?? '');
const pausedMessage = 'Account and trip planning are paused';

test('the production navigation hides web account and trip links', async ({ page }) => {
  test.skip(!webAccountExperienceDisabled, 'Set PUBLIC_FEATURE_WEB_ACCOUNT_EXPERIENCE=0 to verify the paused release state.');
  for (const path of ['/', '/rivers/lynches-river-indigo-wicklow/']) {
    await page.goto(path);
    const nav = page.locator('header.site-header nav[aria-label="Primary"]');
    await expect(nav.getByRole('link', { name: 'My trips', exact: true })).toHaveCount(0);
    await expect(nav.getByRole('link', { name: 'Account', exact: true })).toHaveCount(0);
  }
});

test('account, trip, sign-in callback, and shared-plan pages do not expose web account controls', async ({ page }) => {
  test.skip(!webAccountExperienceDisabled, 'Set PUBLIC_FEATURE_WEB_ACCOUNT_EXPERIENCE=0 to verify the paused release state.');
  for (const path of ['/account/', '/trips/', '/account/web/', '/share/trip/']) {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: pausedMessage })).toBeVisible();
    await expect(page.getByRole('button', { name: /Continue with Google|Continue with email|Plan a trip|Invite people/ })).toHaveCount(0);
    await expect(page.locator('main#main-content')).toHaveCount(1);
  }
});

test('river details do not expose the web trip planner entry point', async ({ page }) => {
  test.skip(!webAccountExperienceDisabled, 'Set PUBLIC_FEATURE_WEB_ACCOUNT_EXPERIENCE=0 to verify the paused release state.');
  await page.goto('/rivers/lynches-river-indigo-wicklow/');
  await expect(page.getByRole('link', { name: 'Plan a trip on this route' })).toHaveCount(0);
});
