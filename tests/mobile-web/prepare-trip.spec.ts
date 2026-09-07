import { test, expect, type Route } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

for (const outcome of ['cancel', 'close']) {
  test(`pending float-plan sharing handles ${outcome} without duplicate actions or stale feedback`, async ({ page }) => {
    await page.addInitScript((outcome) => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      Object.defineProperty(navigator, 'share', { configurable: true, value: () => new Promise((_resolve, reject) => {
        localStorage.setItem('qa:share-count', String(Number(localStorage.getItem('qa:share-count')) + 1));
        Object.defineProperty(window, 'qaRejectShare', { configurable: true, value: () => reject(
          outcome === 'cancel' ? new DOMException('Cancelled', 'AbortError') : new Error('QA unavailable')
        ) });
      }) });
    }, outcome);
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
    await page.goto('/river/rice-creek-peltier-to-long-lake');
    await page.getByText('Access', { exact: true }).click();
    const prepare = page.getByRole('button', { name: 'Prepare this trip', exact: true });
    await prepare.click();
    const dialog = page.getByRole('dialog');
    const share = dialog.getByRole('button', { name: 'Share float plan', exact: true });
    const note = dialog.getByRole('textbox', { name: 'Note for your group (optional)', exact: true });
    await note.fill('Keep this trip draft.');
    await share.click();
    await expect(share).toBeDisabled();
    await expect(share).toHaveAttribute('aria-busy', 'true');
    await expect(note).toHaveAttribute('readonly', '');
    await share.dispatchEvent('click');
    expect(await page.evaluate(() => localStorage.getItem('qa:share-count'))).toBe('1');
    if (outcome === 'close') {
      await dialog.getByRole('button', { name: 'Close prepare trip', exact: true }).click();
      await expect(dialog).toBeHidden();
      await prepare.click();
    }
    await page.evaluate(() => (window as unknown as { qaRejectShare: () => void }).qaRejectShare());
    await expect(share).toBeEnabled();
    await expect(note).toBeEditable();
    await expect(note).toHaveValue('Keep this trip draft.');
    await expect(dialog.getByRole('textbox', { name: 'Float plan to copy' })).toBeHidden();
    if (outcome === 'cancel') await expect(dialog.getByText('Sharing cancelled.', { exact: true })).toBeVisible();
    else await expect(dialog.getByText(/Sharing is unavailable/)).toBeHidden();
  });
}

test('unavailable float-plan sharing offers a complete copyable plan and recovers on retry', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    Object.defineProperty(navigator, 'share', { configurable: true, value: async () => {
      if (localStorage.getItem('qa:share-success')) return;
      throw new Error('QA share unavailable');
    } });
  });
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await page.getByText('Access', { exact: true }).click();
  await page.getByRole('button', { name: 'Prepare this trip', exact: true }).click();
  const dialog = page.getByRole('dialog');
  const note = dialog.getByRole('textbox', { name: 'Note for your group (optional)', exact: true });
  await note.fill('Meet at the put-in with three kayaks.');
  const share = dialog.getByRole('button', { name: 'Share float plan', exact: true });
  await share.click();
  const copy = dialog.getByRole('textbox', { name: 'Float plan to copy', exact: true });
  await expect(copy).toBeVisible();
  await expect(copy).toHaveValue(/Meet at the put-in with three kayaks/);
  await expect(copy).toHaveValue(/rice-creek-peltier-to-long-lake/);
  await expect(copy).toHaveAttribute('readonly', '');
  await expect(copy).toBeFocused();
  await expect(share).toBeEnabled();
  await note.fill('Updated meeting point.');
  await expect(copy).toBeHidden();
  await page.evaluate(() => localStorage.setItem('qa:share-success', '1'));
  await share.click();
  await expect(dialog.getByText('Float plan ready to share.', { exact: true })).toBeVisible();
  await expect(copy).toBeHidden();
  await expect(note).toHaveValue('Updated meeting point.');
});

test('trip drafts survive reopening and invalid timing focuses the field to correct', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await page.getByText('Access', { exact: true }).click();
  const prepare = page.getByRole('button', { name: 'Prepare this trip', exact: true });
  await prepare.click();
  const dialog = page.getByRole('dialog');
  const launch = dialog.getByRole('textbox', { name: 'Launch (YYYY-MM-DD HH:MM)', exact: true });
  const expected = dialog.getByRole('textbox', { name: 'Expected take-out (YYYY-MM-DD HH:MM)', exact: true });
  const checkIn = dialog.getByRole('textbox', { name: 'Check-in time (optional)', exact: true });
  const group = dialog.getByRole('textbox', { name: 'Group size (optional)', exact: true });
  const note = dialog.getByRole('textbox', { name: 'Note for your group (optional)', exact: true });
  await launch.fill('2030-06-15 09:00');
  await expected.fill('2030-06-15 12:00');
  await checkIn.fill('2030-06-15 13:00');
  await group.fill('3');
  await note.fill('Meet at the put-in.');
  await dialog.getByRole('button', { name: 'Close prepare trip', exact: true }).click();
  await prepare.click();
  await expect(launch).toHaveValue('2030-06-15 09:00');
  await expect(expected).toHaveValue('2030-06-15 12:00');
  await expect(checkIn).toHaveValue('2030-06-15 13:00');
  await expect(group).toHaveValue('3');
  await expect(note).toHaveValue('Meet at the put-in.');
  const calendar = dialog.getByRole('button', { name: 'Add to calendar', exact: true });
  await launch.fill('2030-02-30 09:00');
  await calendar.click();
  await expect(launch).toBeFocused();
  await expect(dialog.getByText('Enter launch as YYYY-MM-DD HH:MM.', { exact: true })).toBeVisible();
  await launch.fill('2030-06-15 09:00');
  await expected.fill('2030-06-15 08:00');
  await calendar.click();
  await expect(expected).toBeFocused();
  await expected.fill('2030-06-15 12:00');
  await checkIn.fill('later');
  await dialog.getByRole('button', { name: 'Share float plan', exact: true }).click();
  await expect(checkIn).toBeFocused();
  await expect(dialog.getByText('Enter check-in as YYYY-MM-DD HH:MM, or leave it blank.', { exact: true })).toBeVisible();
  await checkIn.fill('');
  await group.fill('1.5');
  await calendar.click();
  await expect(group).toBeFocused();
  await expect(dialog.getByText('Group size must be a whole number from 1 to 100.', { exact: true })).toBeVisible();
});

for (const outcome of ['close', 'timeout']) {
  test(`GPX checks recover after ${outcome} without opening a stale export`, async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      window.open = () => {
        localStorage.setItem('qa:unexpected-export', '1');
        return null;
      };
    });
    await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
    let pending: Route | null = null;
    let requests = 0;
    await page.route('**/trip.gpx?*', (route) => { requests++; pending = route; });
    await page.goto('/river/rice-creek-peltier-to-long-lake');
    await page.getByText('Access', { exact: true }).click();
    const prepare = page.getByRole('button', { name: 'Prepare this trip', exact: true });
    await prepare.click();
    const dialog = page.getByRole('dialog');
    const gpx = dialog.getByRole('button', { name: 'Download GPX', exact: true });
    await gpx.click();
    await expect.poll(() => pending !== null).toBe(true);
    await expect(gpx).toBeDisabled();
    await expect(gpx).toHaveAttribute('aria-busy', 'true');
    await expect(gpx).toContainText('Checking GPX…');
    await gpx.dispatchEvent('click');
    expect(requests).toBe(1);
    if (outcome === 'close') {
      await dialog.getByRole('button', { name: 'Close prepare trip', exact: true }).click();
      await expect(dialog).toBeHidden();
      await pending!.fulfill({ status: 200, body: '' });
      await prepare.click();
    } else {
      await expect(dialog.getByText('The GPX check timed out. Please try again.', { exact: true })).toBeVisible({ timeout: 20_000 });
      await pending!.fulfill({ status: 200, body: '' });
    }
    await expect(gpx).toBeEnabled();
    pending = null;
    await gpx.click();
    await expect.poll(() => pending !== null).toBe(true);
    expect(requests).toBe(2);
    await pending!.fulfill({ status: 503, body: '' });
    await expect(gpx).toBeEnabled();
    await expect(dialog.getByText('GPX is not available for this route yet.', { exact: true })).toBeVisible();
    pending = null;
    await gpx.click();
    await expect.poll(() => pending !== null).toBe(true);
    await pending!.fulfill({ status: 400, body: '' });
    await expect(gpx).toBeEnabled();
    await expect(dialog.getByText('These access points are no longer available. Refresh the route and choose your put-in and take-out again.', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('qa:unexpected-export'))).toBeNull();
  });
}


test('full-route planning uses known distance when access mileage is unavailable', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: {
    ...fixture, result: { ...fixture.result, river: { ...fixture.result.river, accessPoints: [], segmentEdges: [] } },
  } }));
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await page.getByText('Access', { exact: true }).click();
  await page.getByRole('button', { name: 'Prepare this trip', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByText(/15.2 mi/)).toBeVisible();
  await expect(dialog.getByText('Planning estimate: 300–420 minutes on the water, before shuttle or staging time.', { exact: true })).toBeVisible();
  const launch = await dialog.getByRole('textbox', { name: 'Launch (YYYY-MM-DD HH:MM)', exact: true }).inputValue();
  const expected = await dialog.getByRole('textbox', { name: 'Expected take-out (YYYY-MM-DD HH:MM)', exact: true }).inputValue();
  expect((Date.parse(expected.replace(' ', 'T')) - Date.parse(launch.replace(' ', 'T'))) / 60_000).toBe(480);
});


test('calendar opening blocks duplicate activation and keeps a failed draft retryable', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    window.open = (url) => {
      localStorage.setItem('qa:calendar-calls', String(Number(localStorage.getItem('qa:calendar-calls')) + 1));
      localStorage.setItem('qa:calendar-url', String(url));
      if (!localStorage.getItem('qa:calendar-success')) throw new Error('Cannot open calendar');
      return null;
    };
  });
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', (route) => route.fulfill({ json: fixture }));
  await page.goto('/river/rice-creek-peltier-to-long-lake');
  await page.getByText('Access', { exact: true }).click();
  await page.getByRole('button', { name: 'Prepare this trip', exact: true }).click();
  const dialog = page.getByRole('dialog');
  const launch = dialog.getByRole('textbox', { name: 'Launch (YYYY-MM-DD HH:MM)', exact: true });
  const original = await launch.inputValue();
  const calendar = dialog.getByRole('button', { name: 'Add to calendar', exact: true });
  await calendar.evaluate((element: HTMLElement) => { element.click(); element.click(); });
  const failure = dialog.getByText('The calendar file could not be opened. Please try again.', { exact: true });
  await expect(failure).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('qa:calendar-calls'))).toBe('1');
  await expect(calendar).toBeEnabled();
  await expect(calendar).toHaveAttribute('aria-busy', 'false');
  await expect(launch).toHaveValue(original);
  await page.evaluate(() => localStorage.setItem('qa:calendar-success', '1'));
  await calendar.press('Space');
  await expect(failure).toBeHidden();
  expect(await page.evaluate(() => localStorage.getItem('qa:calendar-calls'))).toBe('2');
  const url = new URL((await page.evaluate(() => localStorage.getItem('qa:calendar-url')))!);
  expect(url.pathname).toContain('/trip.ics');
  expect(url.searchParams.get('start')).toBeTruthy();
  expect(url.searchParams.get('end')).toBeTruthy();
});
