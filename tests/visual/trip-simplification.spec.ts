import { test, expect } from '@playwright/test';
import { accountFixture, trip } from './account-fixture';

test('route and date lead; optional details and stops stay tucked away', async ({ page }) => {
  await page.route('**/api/rivers/catalog.json', r => r.fulfill({ json: { rivers: [] } }));
  await page.goto('/trips/');
  await page.getByRole('button', { name: 'Plan a trip', exact: true }).click();
  await page.getByLabel('River or location', { exact: true }).fill('QA Simple River');
  await page.getByLabel('Planned date (optional)', { exact: true }).fill('2099-10-10');
  await page.getByLabel('Trip notes (optional)', { exact: true }).fill('Bring lunch and a dry bag');
  await expect(page.getByLabel('Trip title', { exact: true })).toHaveValue('QA Simple River');
  for (const label of ['Trip title', 'Expected return (optional)', 'Group check-in (optional)', 'Trip time zone']) {
    await expect(page.getByLabel(label, { exact: true })).not.toBeVisible();
  }
  await expect(page.getByLabel('Meeting place', { exact: true })).toHaveCount(0);
  await page.getByText('Add stops', { exact: true }).click();
  await page.getByRole('button', { name: 'Add meeting stop', exact: true }).click();
  await page.getByLabel('Meeting place', { exact: true }).fill('Picnic landing');
  await page.getByText('More details', { exact: true }).click();
  await page.getByLabel('Trip title', { exact: true }).fill('My custom title');
  await page.getByRole('button', { name: /Save and sign in|Save draft on this device/ }).click();
  await expect(page.getByRole('status')).toContainText('Your draft is saved');
  await page.goto('/trips/');
  await page.getByRole('button', { name: 'Continue draft', exact: true }).click();
  await expect(page.getByLabel('Trip title', { exact: true })).toHaveValue('My custom title');
  await expect(page.getByLabel('Trip notes (optional)', { exact: true })).toHaveValue('Bring lunch and a dry bag');
  await expect(page.getByLabel('Meeting place', { exact: true })).toHaveValue('Picnic landing');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: test.info().outputPath('simple-editor.png'), fullPage: true });
});

test.describe('signed-in simplification', () => {
  test.skip(process.env.PADDLETODAY_TEST_AUTH !== '1', 'Requires isolated auth fixtures.');

  test('dashboard keeps clear primary actions and the group overview remains available', async ({ page }) => {
    await accountFixture(page);
    await page.route('**/api/trips', r => r.fulfill({ json: { trips: [trip], logs: [], nextCursor: null } }));
    await page.goto('/trips/');
    await expect(page.getByRole('button', { name: 'Plan a trip', exact: true })).toHaveCount(1);
    await expect(page.getByRole('tab', { name: 'Plans' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('button', { name: 'Log a past paddle', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Open trip', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Invite people', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Shuttle', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Going', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await page.screenshot({ path: test.info().outputPath('solo-overview.png'), fullPage: true });
  });

  test('legacy notes survive unrelated edits and deliberate consolidation', async ({ page }) => {
    await accountFixture(page);
    const original = { checkInLocal: '', groupSize: 3, note: 'Bring lunch', boatDescription: 'Two kayaks', vehicleDescription: 'Blue car' };
    let saved = { ...trip, preparation: original, itinerary: [{ id: 'stop-qa-0000000001', location: 'Cafe', time: '08:00', note: 'Meet here' }] };
    await page.route('**/api/trips', r => r.fulfill({ json: { trips: [saved], logs: [], nextCursor: null } }));
    await page.route('**/api/trips/*', async r => {
      const body = r.request().postDataJSON();
      if (body?.command?.type !== 'plan') return r.fallback();
      saved = { ...saved, ...body.command.plan, revision: saved.revision + 1 };
      await r.fulfill({ json: { trip: saved } });
    });
    await page.goto(`/trips/?id=${trip.id}`);
    await expect(page.locator('.trip-notes-copy')).toContainText('Boats & gear: Two kayaks');
    await page.getByRole('button', { name: 'Edit trip', exact: true }).click();
    await expect(page.getByLabel('Trip notes (optional)', { exact: true })).toHaveValue('Bring lunch\n\nBoats & gear: Two kayaks\n\nShuttle: Blue car');
    await page.getByLabel('Planned date (optional)', { exact: true }).fill('2099-10-11');
    await page.getByRole('button', { name: 'Save trip', exact: true }).click();
    await expect(page.getByRole('heading', { name: saved.title, exact: true })).toBeVisible();
    expect(saved.preparation).toEqual(original);
    expect(saved.itinerary[0]?.location).toBe('Cafe');
    await page.getByRole('button', { name: 'Edit trip', exact: true }).click();
    await page.getByLabel('Trip notes (optional)', { exact: true }).fill('Two kayaks, bring lunch. Blue car at take-out.');
    await page.getByRole('button', { name: 'Save trip', exact: true }).click();
    await expect(page.locator('.trip-notes-copy')).toContainText('Two kayaks, bring lunch. Blue car at take-out.');
    expect(saved.preparation).toEqual({ ...original, note: 'Two kayaks, bring lunch. Blue car at take-out.', boatDescription: '', vehicleDescription: '' });
    await page.reload();
    await expect(page.locator('.trip-notes-copy')).toContainText('Blue car at take-out.');
    await expect(page.getByText('Cafe', { exact: false }).first()).toBeVisible();
  });
});
