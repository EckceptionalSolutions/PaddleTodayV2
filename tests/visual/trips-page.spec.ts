import { test, expect } from '@playwright/test';

test('web-first privacy copy keeps saved-route sync claims disabled by default', async ({ page }) => {
  await page.goto('/privacy/');
  const accountPurpose = page.locator('li').filter({ hasText: 'If you create an account' });
  await expect(accountPurpose).toContainText('routes and notes saved on this website stay in that browser');
});

test('a trip can be started without signing in, and email stays collapsed', async ({ page }) => {
  await page.route('**/api/rivers/catalog.json', route => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/trips/');
  await expect(page.getByRole('heading', { name: 'My trips', exact: true })).toBeVisible();
  await expect(page.getByLabel('Email address')).toHaveCount(0);
  await expect(page.getByLabel('Search trips')).toHaveCount(0);
  await page.getByRole('button', { name: 'Continue with email' }).click();
  await expect(page.getByPlaceholder('you@example.com')).toBeVisible();
  await page.getByRole('button', { name: 'Plan a trip', exact: true }).click();
  await page.getByLabel('Trip title', { exact: true }).fill('Saturday paddle');
  await page.getByLabel('River or location', { exact: true }).fill('Test River');
  await page.getByLabel('Planned date (optional)', { exact: true }).fill('2026-10-10');
  await page.getByRole('button', { name: 'Save and sign in' }).click();
  await expect(page.getByRole('status')).toContainText('Your draft is saved here');
});

test('trip lists expose keyboard-operable tabs and editors offer a clear time-zone selector', async ({ page }) => {
  await page.route('**/api/rivers/catalog.json', route => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/trips/');
  const upcoming = page.getByRole('tab', { name: 'Upcoming' });
  const past = page.getByRole('tab', { name: 'Past' });
  await expect(upcoming).toHaveAttribute('aria-selected', 'true');
  const selectedBackground = await upcoming.evaluate(element => getComputedStyle(element).backgroundColor);
  const unselectedBackground = await past.evaluate(element => getComputedStyle(element).backgroundColor);
  expect(selectedBackground).not.toBe(unselectedBackground);
  await upcoming.focus();
  await upcoming.press('ArrowRight');
  await expect(past).toHaveAttribute('aria-selected', 'true');
  await expect(past).toBeFocused();
  await page.getByRole('button', { name: 'Plan a trip', exact: true }).click();
  const timeZone = page.getByLabel('Trip time zone');
  await expect(timeZone).toBeVisible();
  await expect(timeZone.locator('option[value="America/New_York"]')).toHaveText('Eastern Time');
  await expect(timeZone.locator('option[value="America/Chicago"]')).toHaveText('Central Time');
  await expect(timeZone.locator('option[value="America/Los_Angeles"]')).toHaveText('Pacific Time');
  await timeZone.selectOption('America/Chicago');
});

test('trip plan validation focuses missing details and flags skipped local times', async ({ page }) => {
  await page.route('**/api/rivers/catalog.json', route => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/trips/');
  await page.getByRole('button', { name: 'Plan a trip', exact: true }).click();
  const save = page.getByRole('button', { name: 'Save and sign in' });
  const title = page.getByLabel('Trip title', { exact: true });
  const route = page.getByLabel('River or location', { exact: true });
  await save.click();
  await expect(route).toBeFocused();
  expect(await route.evaluate(element => (element as HTMLInputElement).checkValidity())).toBe(false);

  await title.fill('Spring paddle');
  await page.getByLabel('River or location', { exact: true }).fill('Test River');
  await page.getByLabel('Planned date (optional)', { exact: true }).fill('2026-03-08');
  const launch = page.getByLabel('Launch time (optional)', { exact: true });
  await launch.fill('02:30');
  await page.getByLabel('Trip time zone').selectOption('America/Chicago');
  await save.click();
  await expect(launch).toBeFocused();
  expect(await launch.evaluate(element => (element as HTMLInputElement).checkValidity())).toBe(false);
});

test('a shared link renders read-only live details with no account requirement', async ({ page }) => {
  const token = 'b'.repeat(64), id = 'test-trip-1234567890';
  await page.route('**/api/trips/view', route => {
    expect(route.request().postDataJSON()).toEqual({ id, token });
    return route.fulfill({ json: { trip: { id, title: 'Saturday paddle', route: { slug: 'test-river', name: 'Test River', putInId: 'upper', putInName: 'Upper landing', takeOutId: 'lower', takeOutName: 'Lower landing' }, date: '2026-10-10', launch: '09:00', expected: '', timeZone: 'America/Chicago', status: 'planned', revision: 3, updatedAt: '2026-10-01T10:00:00Z', itinerary: [{ id: 'stop', time: '08:00', location: 'Boat launch', note: 'Meet here' }] } } });
  });
  await page.goto(`/trips/?id=${id}#view=${token}`);
  await expect(page.getByRole('heading', { name: 'Saturday paddle' })).toBeVisible();
  await expect(page.getByText('Upper landing → Lower landing')).toBeVisible();
  await expect(page.getByRole('button', { name: /edit|sign in/i })).toHaveCount(0);
  await expect(page.locator('meta[name="referrer"]')).toHaveAttribute('content', 'no-referrer');
  expect(await page.locator('script[src*="umami"]').count()).toBe(0);
});

test('revoked links show recovery instructions rather than stale trip contents', async ({ page }) => {
  await page.route('**/api/trips/view', route => route.fulfill({ status: 404, json: { error: 'link_unavailable', message: 'This link has expired or was revoked. Ask the organizer for a new one.' } }));
  await page.goto('/trips/?id=test-trip-1234567890#view=' + 'c'.repeat(64));
  await expect(page.locator('#trips-app')).toContainText('Ask the organizer for a new one');
});

test('an unfinished guest editor survives a page reload', async ({ page }) => {
  await page.goto('/trips/');
  await page.getByRole('button', { name: 'Plan a trip', exact: true }).click();
  await page.getByLabel('Trip title', { exact: true }).fill('Unfinished Saturday paddle');
  await page.getByLabel('River or location', { exact: true }).fill('Test River');
  const readGuestEditor = () => page.evaluate(async () => {
    return await new Promise<string | null>((resolve, reject) => {
      const request = indexedDB.open('paddletoday-trips');
      request.onerror = () => reject(request.error);
      request.onsuccess = () => { const db = request.result; const get = db.transaction('state').objectStore('state').get('trip-editor:guest'); get.onsuccess = () => { resolve(get.result ?? null); db.close(); }; get.onerror = () => reject(get.error); };
    });
  });
  await expect.poll(async () => {
    const value = await readGuestEditor();
    return Boolean(value?.includes('Unfinished Saturday paddle') && value.includes('Test River'));
  }).toBe(true);
  await page.reload();
  await expect(page.getByLabel('Trip title', { exact: true })).toHaveValue('Unfinished Saturday paddle');
  await expect(page.getByLabel('River or location', { exact: true })).toHaveValue('Test River');
});
