import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Blocked'); } } });
    document.execCommand = () => false;
  });
});

test('route overview navigation keeps the overview link active', async ({ page }) => {
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/');
  const overview = page.locator('[data-detail-nav-link="overview"]');
  const gaugeHistory = page.locator('[data-detail-nav-link="conditions"]');
  await overview.click();
  await expect(overview).toHaveClass(/river-detail__section-link--active/);
  await expect(gaugeHistory).not.toHaveClass(/river-detail__section-link--active/);
});

test('blocked float-plan sharing leaves the full plan selected for manual copy', async ({ page }) => {
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/#access-plan');
  await page.locator('[data-trip-share]').click();
  const field = page.getByRole('textbox', { name: 'Float plan to copy', exact: true });
  await expect(field).toBeVisible();
  await expect(field).toBeFocused();
  await expect(field).toHaveValue(/Rice Creek/);
  const selection = await field.evaluate((element: HTMLTextAreaElement) => ({ start: element.selectionStart, end: element.selectionEnd, length: element.value.length }));
  expect(selection).toEqual({ start: 0, end: selection.length, length: selection.length });
  await expect(page.locator('[data-trip-status]')).toContainText('Copy the selected float plan');
});

test('float-plan timing matches the calendar for both full and shortened routes', async ({ page }) => {
  const loaded = page.waitForResponse((response) => response.url().includes('/api/rivers/rice-creek-peltier-to-long-lake.json'));
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/#access-plan');
  await loaded;
  const durations: number[] = [];
  for (const shortened of [false, true]) {
    if (shortened) {
      await page.locator('.river-access-planner-disclosure > summary').click();
      await page.locator('[data-access-putin]').selectOption('baldwin-lake');
      await page.locator('[data-access-takeout]').selectOption('old-highway-8');
      await expect(page.locator('[data-trip-manual-copy]')).toBeHidden();
    }
    await page.locator('[data-trip-share]').click();
    const calendar = await page.locator('[data-trip-ics]').evaluate((element: HTMLAnchorElement) => {
      const query = new URL(element.href).searchParams;
      const launch = new Date(query.get('start')!);
      const expected = new Date(query.get('end')!);
      const format = new Intl.DateTimeFormat('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
      });
      return { launch: format.format(launch), expected: format.format(expected), duration: expected.getTime() - launch.getTime() };
    });
    const copy = page.getByRole('textbox', { name: 'Float plan to copy', exact: true });
    await expect(copy).toBeVisible();
    await expect.poll(() => copy.inputValue()).toContain(`Launch: ${calendar.launch}`);
    await expect.poll(() => copy.inputValue()).toContain(`Expected take-out: ${calendar.expected}`);
    durations.push(calendar.duration);
  }
  expect(durations[1]).toBeLessThan(durations[0]);
});

test('pending float-plan sharing ignores duplicates and results for a previous segment', async ({ page }) => {
  const loaded = page.waitForResponse((response) => response.url().includes('/api/rivers/rice-creek-peltier-to-long-lake.json'));
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/#access-plan');
  await loaded;
  await page.evaluate(() => {
    const state = window as unknown as { shareCalls: number; rejectShare: () => void };
    state.shareCalls = 0;
    Object.defineProperty(navigator, 'share', { configurable: true, value: () => {
      state.shareCalls += 1;
      return new Promise((_, reject) => { state.rejectShare = () => reject(new Error('Unavailable')); });
    } });
  });
  const share = page.locator('[data-trip-share]');
  await share.click();
  await expect(share).toBeDisabled();
  await expect(share).toHaveAttribute('aria-busy', 'true');
  await share.dispatchEvent('click');
  expect(await page.evaluate(() => (window as unknown as { shareCalls: number }).shareCalls)).toBe(1);
  await page.locator('.river-access-planner-disclosure > summary').click();
  await page.locator('[data-access-putin]').selectOption('baldwin-lake');
  await expect(share).toBeEnabled();
  await page.evaluate(() => {
    (window as unknown as { rejectShare: () => void }).rejectShare();
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
  });
  await expect(page.locator('[data-trip-status]')).toBeEmpty();
  await expect(page.locator('[data-trip-manual-copy]')).toBeHidden();
  await share.click();
  await expect(page.locator('[data-trip-manual-copy]')).toBeVisible();
  await expect(page.locator('[data-trip-manual-copy]')).toHaveValue(/Baldwin/);
});

test('cancelling native sharing restores the action without offering an error copy', async ({ page }) => {
  const loaded = page.waitForResponse((response) => response.url().includes('/api/rivers/rice-creek-peltier-to-long-lake.json'));
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/#access-plan');
  await loaded;
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: async () => { throw new DOMException('Cancelled', 'AbortError'); } });
  });
  const share = page.locator('[data-trip-share]');
  await share.click();
  await expect(page.locator('[data-trip-status]')).toHaveText('Sharing cancelled.');
  await expect(share).toBeEnabled();
  await expect(share).toHaveAttribute('aria-busy', 'false');
  await expect(page.locator('[data-trip-manual-copy]')).toBeHidden();
});

test('legacy clipboard success keeps focus on the float-plan action', async ({ page }) => {
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/#access-plan');
  await page.evaluate(() => { document.execCommand = () => true; });
  const share = page.locator('[data-trip-share]');
  await share.click();
  await expect(page.locator('[data-trip-status]')).toHaveText('Float plan copied to your clipboard.');
  await expect(share).toBeFocused();
  await expect(page.locator('[data-trip-manual-copy]')).toBeHidden();
});

test('successful condition copying returns focus to the closed share menu', async ({ page }) => {
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => {} } });
  });
  const menu = page.locator('details').filter({ has: page.locator('[data-share-copy]') });
  const trigger = menu.locator('summary');
  await trigger.click();
  await page.locator('[data-share-copy]').click();
  await expect(menu).not.toHaveAttribute('open');
  await expect(trigger).toBeFocused();
});

test('blocked condition copying offers a labelled selected summary', async ({ page }) => {
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/');
  const menu = page.locator('details').filter({ has: page.locator('[data-share-copy]') });
  await menu.locator('summary').click();
  await expect(page.locator('[data-share-native]')).toBeHidden();
  const panel = await menu.locator('.route-action-menu__panel').boundingBox();
  expect(panel).not.toBeNull();
  expect(panel!.x).toBeGreaterThanOrEqual(0);
  expect(panel!.x + panel!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  await page.locator('[data-share-copy]').click();
  const field = page.getByRole('textbox', { name: 'Condition summary to copy', exact: true });
  await expect(field).toBeFocused();
  await expect(field).toHaveValue(/Rice Creek/);
});


for (const [label, expectedMinutes] of [['30 to 90 minutes', 150], ['2 hr 30 min to 4 hr', 300]] as const) {
  test(`calendar respects duration units in ${label}`, async ({ page }) => {
    await page.route('**/rivers/rice-creek-peltier-to-long-lake/', async (route) => {
      const response = await route.fetch();
      const body = (await response.text()).replace(/data-river-paddle-time="[^"]*"/, `data-river-paddle-time="${label}"`);
      await route.fulfill({ response, body });
    });
    const loaded = page.waitForResponse((response) => response.url().includes('/api/rivers/rice-creek-peltier-to-long-lake.json'));
    await page.goto('/rivers/rice-creek-peltier-to-long-lake/#access-plan');
    await loaded;
    await page.locator('[data-trip-share]').click();
    const duration = await page.locator('[data-trip-ics]').evaluate((element: HTMLAnchorElement) => {
      const query = new URL(element.href).searchParams;
      return (Date.parse(query.get('end')!) - Date.parse(query.get('start')!)) / 60_000;
    });
    // Full route maximum plus the existing one-hour planning buffer.
    expect(duration).toBe(expectedMinutes);
  });
}
