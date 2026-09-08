// Shared Expo search behavior; native map gestures require a device pass.
// Serve an Expo web export with the existing Minnesota audit fixture.
// node apps/mobile/tests/explore-search.mjs http://127.0.0.1:4391
import { chromium, expect } from '@playwright/test';

const browser = await chromium.launch();
try {
  for (const width of [320, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true });
    await context.addInitScript(() => {
      const key = 'paddletoday:explore-preferences:v4';
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      localStorage.setItem(key, JSON.stringify({ filters: {
        sort: 'best', query: '', state: 'Minnesota', difficulty: 'any', routeType: 'all',
        status: 'any', rating: 'any', distance: 'any', paddleTime: 'any', paddleLength: 'any', camping: 'any',
      }, viewMode: 'map' }));
      window.searchWrites = [];
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function (name, value) {
        if (name === key) window.searchWrites.push(JSON.parse(value).filters.query);
        return original.call(this, name, value);
      };
    });
    const page = await context.newPage();
    await page.goto(new URL('/explore', process.argv[2] ?? 'http://127.0.0.1:4391').href);
    await page.getByRole('button', { name: /, score \d+$/ }).first().waitFor();
    const input = page.getByRole('textbox', { name: 'Search routes', exact: true });
    await input.focus();
    await page.evaluate(() => { window.searchWrites = []; });
    await input.pressSequentially('zzzznoresult', { delay: 35 });
    await expect(input).toHaveValue('zzzznoresult');
    await expect(page.getByText('No routes on this map', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => window.searchWrites)).toEqual(['zzzznoresult']);
    const recover = page.getByRole('button', { name: 'Clear route search', exact: true });
    expect((await recover.boundingBox()).height).toBeGreaterThanOrEqual(44);
    await page.screenshot({ path: `apps/mobile/.expo/mobile-search-empty-${width}.png` });
    await recover.click();
    await expect(input).toHaveValue('');
    await expect(page.getByRole('button', { name: /, score \d+$/ }).first()).toBeVisible();
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:explore-preferences:v4')).filters.state)).toBe('Minnesota');
    // Switching views must retain even a query whose debounce is still pending.
    await input.fill('Mississippi');
    await page.getByRole('tab', { name: 'list view', exact: true }).click();
    await expect(input).toHaveValue('Mississippi');
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:explore-preferences:v4')).filters.query)).toBe('Mississippi');
    await input.fill('zzzzlist');
    await expect(page.getByText('No matching routes', { exact: true })).toBeVisible();
    await recover.click();
    await expect(input).toHaveValue('');
    await input.fill('Mississippi');
    await page.getByRole('tab', { name: 'map view', exact: true }).click();
    await expect(input).toHaveValue('Mississippi');

    // Submit applies before the debounce delay, rather than ignoring Search.
    await input.focus();
    await page.evaluate(() => { window.searchWrites = []; });
    await input.fill('zzzzsubmitted');
    await input.press('Enter');
    await expect(page.getByText('No routes on this map', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => window.searchWrites)).toEqual(['zzzzsubmitted']);
    await page.getByRole('button', { name: 'Clear search', exact: true }).click();
    await expect(page.getByRole('button', { name: /, score \d+$/ }).first()).toBeVisible();
    await page.screenshot({ path: `apps/mobile/.expo/mobile-search-${width}.png` });
    console.log(`PASS ${width}px: one applied search/persistence update, empty recovery, immediate clear, submit, and Map/List query continuity`);
    await context.close();
  }
} finally { await browser.close(); }
