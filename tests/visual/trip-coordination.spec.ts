import { expect, test } from '@playwright/test';
import { accountFixture, trip, past, log } from './account-fixture';

test.skip(process.env.PADDLETODAY_TEST_AUTH !== '1', 'Requires isolated auth fixtures.');

test('shows RSVP, passenger capacity, and organizer controls', async ({ page }) => {
  await accountFixture(page);
  const shared = { ...trip, members: [...trip.members, { uid: 'bob', name: 'Bob', role: 'participant', rsvp: 'going' }], shuttle: [{ id: 'vehicle-test-000001', driverUid: 'bob', passengers: [], seats: 1, label: 'Blue car', meeting: 'Lower landing', time: '08:00', parkedAt: 'Upper landing', note: '' }] };
  await page.route('**/api/trips', r => r.fulfill({ json: { trips: [shared], logs: [], nextCursor: null } }));
  await page.goto(`/trips/?id=${trip.id}`);
  await expect(page.getByRole('button', { name: 'Going', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('heading', { name: 'Blue car' })).toBeVisible();
  await expect(page.locator('.trip-shuttle-card').getByText('Lower landing', { exact: false })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Take a seat' })).toBeVisible();
  await expect(page.getByLabel('Passenger seats')).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Make organizer' })).toBeVisible();
  await expect(page.getByText('Still need a ride:', { exact: true })).toHaveCount(0);
  await page.screenshot({ path: test.info().outputPath('coordination.png'), fullPage: true });
});

test('reuses linked logs and starts a fresh outing without changing history', async ({ page }) => {
  await accountFixture(page);
  await page.goto(`/trips/?id=${past.id}`);
  await page.getByRole('button', { name: 'Open paddle log' }).click();
  await expect(page.getByRole('textbox', { name: 'Notes', exact: true })).toHaveValue(log.notes);
  await expect(page.getByLabel('Date paddled')).toHaveValue(log.date);
  await expect(page.getByLabel('Add paddle photos')).toBeVisible();
  await expect(page.getByLabel('Water level / flow (optional)')).not.toBeVisible();
  await page.screenshot({ path: test.info().outputPath('private-log.png'), fullPage: true });
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await page.getByRole('button', { name: 'Plan again', exact: true }).click();
  await expect(page.getByLabel('Planned date (optional)')).toHaveValue('');
  let createdId = '';
  let created: typeof trip | undefined;
  await page.route('**/api/trips/*', async r => {
    if (r.request().postDataJSON()?.command?.type !== 'create') return r.fallback();
    createdId = new URL(r.request().url()).pathname.split('/').pop()!;
    created = { ...trip, ...r.request().postDataJSON().command.plan, id: createdId };
    await r.fulfill({ json: { trip: created } });
  });
  await page.route('**/api/trips', r => r.fulfill({ json: { trips: [past, ...(created ? [created] : [])], logs: [log], nextCursor: null } }));
  await page.getByRole('button', { name: 'Save trip', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Itinerary', exact: true })).toBeVisible();
  expect(createdId).toBeTruthy();
  expect(createdId).not.toBe(past.id);
  await page.getByRole('button', { name: '← My trips' }).click();
  await page.getByRole('tab', { name: 'History' }).click();
  await expect(page.locator('.trip-list-card')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: past.title })).toBeVisible();
});

test('legacy vehicles retain driver and passenger capacity details', async ({ page }) => {
  await accountFixture(page);
  const shared = { ...trip, shuttle: [{ id: 'full-car-0000000001', driverUid: 'bob', passengers: ['cara'], seats: 1, label: 'Full car', meeting: '', time: '', parkedAt: '', note: '' }] };
  await page.route('**/api/trips', r => r.fulfill({ json: { trips: [shared], logs: [], nextCursor: null } }));
  await page.goto(`/trips/?id=${trip.id}`);
  await expect(page.getByText('Full', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Take a seat' })).toBeVisible();
  shared.shuttle[0]!.driverUid = trip.ownerUid;
  shared.shuttle[0]!.passengers = [];
  await page.reload();
  await expect(page.locator('.trip-shuttle-card')).toContainText('Driver Alex');
  await expect(page.getByRole('button', { name: 'Take a seat' })).toBeVisible();
});

test('unavailable invitations offer recovery instead of joining blindly', async ({ page }) => {
  await accountFixture(page);
  await page.route('**/api/trips/invitation', r => r.fulfill({ status: 410, json: { message: 'Expired' } }));
  await page.goto(`/trips/?id=${trip.id}#invite=${'a'.repeat(64)}`);
  await expect(page.getByRole('button', { name: 'Retry invitation' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Join trip', exact: true })).toHaveCount(0);
  await page.route('**/api/trips/invitation', r => r.fulfill({ json: { invitation: { title: 'Sunday paddle', date: '2099-10-10' } } }));
  await page.getByRole('button', { name: 'Retry invitation' }).click();
  await expect(page.getByRole('heading', { name: 'Sunday paddle' })).toBeVisible();
  await expect(page.getByText('You already have access to this trip.', { exact: true })).toBeVisible();
});
