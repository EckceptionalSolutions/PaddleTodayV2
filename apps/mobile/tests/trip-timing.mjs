import { chromium, expect } from '@playwright/test';
import fs from 'node:fs';
const fixture = JSON.parse(fs.readFileSync('tests/mobile-web/fixtures/route-detail.json', 'utf8'));
const browser = await chromium.launch();
try {
  for (const width of [320, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 844 }, timezoneId: 'America/Chicago' });
    await context.addInitScript(() => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      window.open = url => { window.calendarUrl = url; return null; };
    });
    const page = await context.newPage();
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: fixture }));
    await page.goto(new URL('/river/rice-creek-peltier-to-long-lake', process.argv[2] ?? 'http://127.0.0.1:4391').href);
    await page.getByText('Access', { exact: true }).click();
    await page.getByRole('button', { name: 'Prepare this trip', exact: true }).click();
    const dialog = page.getByRole('dialog');
    const launch = dialog.getByLabel('Launch date and time', { exact: true });
    const expected = dialog.getByLabel('Expected take-out date and time', { exact: true });
    await launch.fill('2030-06-15T23:00');
    await expected.fill('2030-06-16T02:00');
    await dialog.getByRole('button', { name: 'Clear check-in time', exact: true }).click();
    await launch.scrollIntoViewIfNeeded();
    const box = await launch.boundingBox();
    expect(box.width).toBeGreaterThan(200);
    expect(box.x + box.width).toBeLessThanOrEqual(width);
    await page.screenshot({ path: `apps/mobile/.expo/mobile-trip-timing-${width}.png` });
    await dialog.getByRole('button', { name: 'Add to calendar', exact: true }).click();
    const calendar = new URL(await page.evaluate(() => window.calendarUrl));
    expect(calendar.searchParams.get('start')).toBe('2030-06-16T04:00:00.000Z');
    expect(calendar.searchParams.get('end')).toBe('2030-06-16T07:00:00.000Z');
    await dialog.getByRole('button', { name: 'Enter manually: launch', exact: true }).click();
    const manual = dialog.getByRole('textbox', { name: 'Launch (YYYY-MM-DD HH:MM)', exact: true });
    await expect(manual).toHaveValue('2030-06-15 23:00');
    await manual.fill('2030-02-30 09:00');
    await dialog.getByRole('button', { name: 'Add to calendar', exact: true }).click();
    await expect(manual).toBeFocused();
    await expect(dialog.getByText('Enter launch as YYYY-MM-DD HH:MM.', { exact: true })).toBeVisible();
    console.log(`PASS ${width}px: date/time controls, overnight local-time export, optional clearing, manual fallback and validation focus`);
    await context.close();
  }
} finally { await browser.close(); }
