import { expect, test } from '@playwright/test';
import routeFixture from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };
test.use({ timezoneId: 'America/Chicago' });
async function chooseTripTimes(page: import('@playwright/test').Page) {
  await page.locator('[data-trip-launch]').fill('2026-11-05T09:00');
  await page.locator('[data-trip-end]').fill('2026-11-05T13:00');
  await page.locator('[data-trip-zone]').selectOption('America/Chicago');
}

test.beforeEach(async ({ page }) => {
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Blocked'); } } });
    document.execCommand = () => false;
  });
});

test('route warning tooltip stays inside tablet layouts', async ({ page }) => {
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/');
  const warning = page.locator('[data-field="live-warning"]');
  await expect(warning).toBeVisible();
  for (const width of [768, 820, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await warning.focus();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    const tooltip = await warning.evaluate(element => {
      const style = getComputedStyle(element, '::after');
      return { right: style.right, opacity: style.opacity };
    });
    expect(tooltip.right).toBe('0px');
    await expect.poll(() => warning.evaluate(element => getComputedStyle(element, '::after').opacity)).toBe('1');
  }
});

test('route overview navigation keeps the overview link active', async ({ page }) => {
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/');
  const overview = page.locator('[data-detail-nav-link="overview"]');
  const gaugeHistory = page.locator('[data-detail-nav-link="conditions"]');
  await overview.click();
  await expect(overview).toHaveClass(/river-detail__section-link--active/);
  await expect(gaugeHistory).not.toHaveClass(/river-detail__section-link--active/);
  await expect(page.locator('#route-overview')).toBeFocused();
  await expect.poll(() => page.locator('#route-overview').evaluate(element => {
    const top = element.getBoundingClientRect().top;
    return top >= 0 && top <= 64;
  })).toBe(true);
});

test('a failed route score stops checking and recovers through retry', async ({ page }) => {
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/');
  const orb = page.locator('.river-call-panel .score-orb');
  const breakdown = page.locator('.route-today-score__breakdown');
  await expect(orb).toHaveAccessibleName('Live score unavailable');
  await expect(page.locator('[data-chart-line]')).toHaveAttribute('visibility', 'hidden');
  await expect(page.locator('[data-chart-window="72"]')).toBeDisabled();
  await expect(orb.locator('[data-field="rating"]')).toHaveText('Unavailable');
  await expect(breakdown).toBeHidden();
  const recovered = structuredClone(routeFixture);
  recovered.result.readiness = { status: 'ready', label: 'Ready', reason: 'Synthetic recovery fixture.' };
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json*', async route => {
    await gate;
    await route.fulfill({ json: recovered });
  });
  const retry = page.locator('[data-detail-fetch-retry]');
  await retry.click();
  await expect(retry).toBeDisabled();
  await expect(retry).toHaveText('Retrying...');
  release();
  await expect(page.locator('[data-detail-fetch-banner]')).toBeHidden();
  await expect(orb).toHaveAccessibleName(/Live score 88 out of 100/);
  await expect(page.locator('[data-chart-line]')).toHaveAttribute('visibility', 'visible');
  await expect(page.locator('[data-chart-window="72"]')).toBeEnabled();
  await expect(breakdown).toBeVisible();
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json*', route => route.fulfill({ json: routeFixture }));
  await page.reload();
  await expect(orb).toHaveAccessibleName('Live score unavailable: not enough data');
  await expect(breakdown).toBeHidden();
});

test('blocked float-plan sharing leaves the full plan selected for manual copy', async ({ page }) => {
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/#access-plan');
  await chooseTripTimes(page);
  await page.locator('[data-trip-share]').click();
  const field = page.getByRole('textbox', { name: 'Float plan to copy', exact: true });
  await expect(field).toBeVisible();
  await expect(field).toBeFocused();
  await expect(field).toHaveValue(/Rice Creek/);
  const selection = await field.evaluate((element: HTMLTextAreaElement) => ({ start: element.selectionStart, end: element.selectionEnd, length: element.value.length }));
  expect(selection).toEqual({ start: 0, end: selection.length, length: selection.length });
  await expect(page.locator('[data-trip-status]')).toContainText('Copy the selected float plan');
});

test('float-plan timing stays explicit when access selection changes', async ({ page }) => {
  const loaded = page.waitForResponse((response) => response.url().includes('/api/rivers/rice-creek-peltier-to-long-lake.json'));
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/#access-plan');
  await loaded;
  await chooseTripTimes(page);
  const durations: number[] = [];
  for (const shortened of [false, true]) {
    if (shortened) {
      await page.locator('.river-access-planner-disclosure > summary').click();
      await page.locator('[data-access-putin]').selectOption('baldwin-lake');
      await page.locator('[data-access-takeout]').selectOption('old-highway-8');
      await expect(page.locator('[data-trip-manual-copy]')).toBeHidden();
    }
    await page.locator('[data-trip-share]').click();
    const calendar = await page.evaluate(() => {
      const launch = new Date('2026-11-05T09:00');
      const expected = new Date('2026-11-05T13:00');
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
  expect(durations).toEqual([4 * 3600000, 4 * 3600000]);
});

test('pending float-plan sharing ignores duplicates and results for a previous segment', async ({ page }) => {
  const loaded = page.waitForResponse((response) => response.url().includes('/api/rivers/rice-creek-peltier-to-long-lake.json'));
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/#access-plan');
  await loaded;
  await chooseTripTimes(page);
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
  await chooseTripTimes(page);
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
  await chooseTripTimes(page);
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


for (const label of ['30 to 90 minutes', '2 hr 30 min to 4 hr']) {
  test('published duration does not invent a schedule: ' + label, async ({ page }) => {
    await page.route('**/rivers/rice-creek-peltier-to-long-lake/', async route => {
      const response = await route.fetch();
      const body = (await response.text()).replace(/data-river-paddle-time="[^"]*"/, 'data-river-paddle-time="' + label + '"');
      await route.fulfill({ response, body });
    });
    await page.goto('/rivers/rice-creek-peltier-to-long-lake/#trip-plan');
    await expect(page.locator('[data-trip-launch]')).toHaveValue('');
    await expect(page.locator('[data-trip-end]')).toHaveValue('');
    await page.locator('[data-trip-share]').click();
    await expect(page.locator('[data-trip-manual-copy]')).toBeHidden();
    await expect(page.locator('[data-trip-launch]')).toBeFocused();
  });
}

test('route planning action uses the selected access points without an account', async ({ page }) => {
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/?date=2026-10-10#access-plan');
  await page.locator('.river-access-planner-disclosure > summary').click();
  await page.locator('[data-access-putin]').selectOption('baldwin-lake');
  await page.locator('[data-access-takeout]').selectOption('old-highway-8');
  await expect(page.locator('[data-plan-account]')).toHaveAttribute('href', '#trip-plan');
  await chooseTripTimes(page);
  await page.locator('[data-trip-save-plan]').click();
  await expect(page.locator('[data-trip-status]')).toContainText('Plan saved in this browser');
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:route-plans:v1')!).plans[0]);
  expect(saved).toMatchObject({ putInId: 'baldwin-lake', takeOutId: 'old-highway-8', start: '2026-11-05T09:00', end: '2026-11-05T13:00' });
});
