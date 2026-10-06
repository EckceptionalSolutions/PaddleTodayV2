import { expect, test, type Page } from '@playwright/test';

// Run against a local build with PUBLIC_FIREBASE_API_KEY=account-ux-test-key,
// PUBLIC_FIREBASE_PROJECT_ID=account-ux-test and PADDLETODAY_TEST_AUTH=1.
// All auth and account API traffic is intercepted; no real account is used.
test.skip(process.env.PADDLETODAY_TEST_AUTH !== '1', 'Requires the isolated local auth fixture build.');
import { accountFixture, trip, plan, route } from './account-fixture';

test('signed-in list separates drafts and overdue plans, searches rivers, and associates logs', async ({ page }) => {
  await accountFixture(page);
  await page.goto('/trips/');
  await expect(page.getByRole('heading', { name: trip.title })).toBeVisible();
  await expect(page.getByText('Next paddle', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Choose a date later' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Earlier plans · review when ready' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Export my trips' })).toHaveCount(0);
  await page.screenshot({ path: test.info().outputPath('my-trips.png'), fullPage: true });
  await page.getByRole('searchbox', { name: 'Search trips' }).fill('Cannon');
  await page.getByRole('searchbox', { name: 'Search trips' }).press('Tab');
  await expect(page.getByRole('heading', { name: trip.title })).toBeVisible();
  await page.getByRole('tab', { name: 'History' }).click();
  await expect(page.locator('.trip-list-card')).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Open paddle log' })).toBeVisible();
  await page.screenshot({ path: test.info().outputPath('past-paddles.png') });
});

test('settings owns account controls and menu sign-out updates the session', async ({ page }) => {
  await accountFixture(page);
  await page.goto('/account/settings/');
  await expect(page.getByText('alex@example.test', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Export my trips' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Connect email' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Connect Google' })).toHaveCount(0);
  await page.screenshot({ path: test.info().outputPath('settings.png'), fullPage: true });
  await page.getByRole('button', { name: 'Open account menu' }).click();
  await page.screenshot({ path: test.info().outputPath('account-menu.png') });
  await expect(page.locator('[data-account-identity]')).toHaveText('Alex');
  await page.locator('[data-account-sign-out]').click();
  await expect(page.getByRole('button', { name: 'Continue with Google' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Export my trips' })).toHaveCount(0);
});

test('settings sign-out allows keeping an unfinished editor', async ({ page }) => {
  await accountFixture(page, false, true);
  await page.goto('/account/settings/');
  await expect(page.getByRole('button', { name: 'Export my trips' })).toBeVisible();
  page.once('dialog', dialog => dialog.dismiss());
  await page.getByRole('button', { name: 'Sign out', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Export my trips' })).toBeVisible();
  await page.goto('/trips/');
  await expect(page.getByLabel('Trip title', { exact: true })).toHaveValue(plan.title);
});

test('a failed initial load is recoverable and does not look like an empty account', async ({ page }) => {
  await accountFixture(page, true);
  await page.goto('/trips/');
  await expect(page.getByRole('heading', { name: 'Your trips couldn’t be loaded' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Where will you paddle next?' })).toHaveCount(0);
  await page.route('**/api/trips', r => r.fulfill({ json: { trips: [trip], logs: [], nextCursor: null } }));
  await page.getByRole('button', { name: 'Try again' }).click();
  await expect(page.getByRole('heading', { name: trip.title })).toBeVisible();
});

test('sign-in navigation preserves an incomplete guest editor across the session transition', async ({ page }) => {
  await page.goto('/trips/');
  await page.getByRole('button', { name: 'Plan a trip', exact: true }).click();
  if (!await page.getByLabel('Trip title', { exact: true }).isVisible()) await page.getByText('More details', { exact: true }).click();
  await page.getByLabel('Trip title', { exact: true }).fill('Still deciding');
  await accountFixture(page);
  await page.getByRole('button', { name: 'Open account menu' }).click();
  await page.locator('[data-account-sign-in]').click();
  await expect(page).toHaveURL(/\/account\/web\/$/);
  await expect(page.locator('#trips-app')).toHaveAttribute('aria-busy', 'false');
  await expect(page.getByLabel('Trip title', { exact: true })).toHaveValue('Still deciding');
  await page.reload();
  await expect(page.getByLabel('Trip title', { exact: true })).toHaveValue('Still deciding');
});

test('account callbacks retain invitation destinations and return settings links to Settings', async ({ page }) => {
  const invitation = 'c'.repeat(64);
  await page.goto(`/trips/?id=${trip.id}#invite=${invitation}`);
  await accountFixture(page);
  await page.getByRole('button', { name: 'Open account menu' }).click();
  await expect(page.locator('[data-account-sign-in]')).toHaveAttribute('href', new RegExp(`/account/web/\\?id=${trip.id}$`));
  await page.locator('[data-account-sign-in]').click();
  await expect(page.getByRole('heading', { name: 'You’re invited to paddle' })).toBeVisible();
  await expect(page.getByText('You already have access to this trip.', { exact: true })).toBeVisible();
  await page.goto('/account/web/?next=settings');
  await expect(page).toHaveURL(/\/account\/settings\/$/);
  await expect(page.getByRole('heading', { name: 'Settings', exact: true })).toBeVisible();
});

test('saved trip groups planning, private history and phone handoff', async ({ page }) => {
  await accountFixture(page);
  await page.goto(`/trips/?id=${trip.id}`);
  await expect(page.getByRole('heading', { name: 'Itinerary', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'People & shuttle', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Invite people', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Shuttle', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Log this paddle', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Organizer actions', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Route conditions' })).toHaveAttribute('href', '/rivers/test-river/?putin=upper&takeout=lower');
  await page.getByRole('button', { name: 'Open on phone' }).click();
  await expect(page.getByRole('heading', { name: 'Take this trip with you' })).toBeVisible();
  await expect(page.getByLabel('Trip link')).toHaveValue(new RegExp(`/trips/\\?id=${trip.id}&openApp=1$`));
  await expect(page.getByAltText('Scan to open this trip on your phone')).toBeVisible();
  await page.screenshot({ path: test.info().outputPath('saved-trip.png'), fullPage: true });
});

test('route editor survives sign-in and saves selected access rather than defaults', async ({ page }) => {
  const river = { ...route, accessPoints: [{ id: 'upper', name: 'Upper landing' }, { id: 'middle', name: 'Middle landing' }, { id: 'lower', name: 'Lower landing' }], putIn: { id: 'upper', name: 'Upper landing' }, takeOut: { id: 'lower', name: 'Lower landing' } };
  await page.route('**/api/rivers/test-river.json', r => r.fulfill({ json: { result: { river } } }));
  await page.goto('/trips/?route=test-river&putin=middle&takeout=lower&date=2099-10-10');
  await expect(page.locator('#trips-app')).toHaveAttribute('aria-busy', 'false');
  await expect(page.locator('.trip-route-summary')).toContainText('Middle landing');
  if (!await page.getByLabel('Trip title', { exact: true }).isVisible()) await page.getByText('More details', { exact: true }).click();
  await page.getByLabel('Trip title', { exact: true }).fill('From discovery to saved');
  await accountFixture(page);
  await page.route('**/api/rivers/test-river.json', r => r.fulfill({ json: { result: { river } } }));
  let saved: typeof trip | undefined;
  await page.route('**/api/trips', r => r.fulfill({ json: { trips: saved ? [saved, trip] : [trip], logs: [], nextCursor: null } }));
  await page.route('**/api/trips/*', r => {
    if (r.request().method() !== 'POST' || new URL(r.request().url()).pathname.endsWith('/migrate')) return r.fallback();
    const body = r.request().postDataJSON();
    if (body.command?.type !== 'create') return r.fallback();
    expect(body.command.plan.route.putInId).toBe('middle');
    saved = { ...trip, ...body.command.plan, id: new URL(r.request().url()).pathname.split('/').pop()! };
    return r.fulfill({ json: { trip: saved } });
  });
  await page.getByRole('button', { name: 'Open account menu' }).click();
  await page.locator('[data-account-sign-in]').click();
  await expect(page.locator('#trips-app')).toHaveAttribute('aria-busy', 'false');
  await expect(page.getByLabel('Trip title', { exact: true })).toHaveValue('From discovery to saved');
  await expect(page.locator('.trip-route-summary')).toContainText('Middle landing');
  await page.getByRole('button', { name: 'Save trip', exact: true }).click();
  await expect.poll(() => saved?.route.putInId).toBe('middle');
  await expect(page.getByRole('heading', { name: 'From discovery to saved' })).toBeVisible();
  await expect(page).toHaveURL(/\/trips\/\?id=/);
});

test('phone handoff is withheld while trip edits cannot sync', async ({ page }) => {
  await accountFixture(page);
  await page.route('**/api/trips/trip-test-0000000001', r => r.fulfill({ status: 503, json: { message: 'Unavailable' } }));
  await page.goto(`/trips/?id=${trip.id}`);
  await page.getByRole('button', { name: 'Edit trip', exact: true }).click();
  if (!await page.getByLabel('Trip title', { exact: true }).isVisible()) await page.getByText('More details', { exact: true }).click();
  await page.getByLabel('Trip title', { exact: true }).fill('Unsynced paddle');
  await page.getByRole('button', { name: 'Save trip', exact: true }).click();
  await page.getByRole('button', { name: 'Open on phone' }).click();
  await expect(page.getByLabel('Trip link')).toHaveCount(0);
  await expect(page.locator('#trips-app')).toContainText(/waiting|Unavailable|sync/);
});

test('a saved guest route draft imports once after sign-in without reopening a fresh editor', async ({ page }) => {
  await page.goto('/trips/?route=test-river&name=Cannon%20River&putin=middle&takeout=lower&date=2099-10-10');
  await expect(page.locator('#trips-app')).toHaveAttribute('aria-busy', 'false');
  if (!await page.getByLabel('Trip title', { exact: true }).isVisible()) await page.getByText('More details', { exact: true }).click();
  await page.getByLabel('Trip title', { exact: true }).fill('Ready to keep');
  await page.getByRole('button', { name: 'Save and sign in', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Your draft is saved');
  await accountFixture(page);
  let saved: typeof trip | undefined;
  let creates = 0;
  await page.route('**/api/trips', r => r.fulfill({ json: { trips: saved ? [saved] : [], logs: [], nextCursor: null } }));
  await page.route('**/api/trips/*', r => {
    const body = r.request().method() === 'POST' ? r.request().postDataJSON() : null;
    if (body?.command?.type !== 'create') return r.fallback();
    creates++;
    saved = { ...trip, ...body.command.plan, id: new URL(r.request().url()).pathname.split('/').pop()! };
    return r.fulfill({ json: { trip: saved } });
  });
  await page.getByRole('button', { name: 'Open account menu' }).click();
  await page.locator('[data-account-sign-in]').click();
  await expect(page.getByRole('heading', { name: 'Ready to keep', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Plan your paddle' })).toHaveCount(0);
  expect(saved?.route.putInId).toBe('middle');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Ready to keep', exact: true })).toBeVisible();
  expect(creates).toBe(1);
});
