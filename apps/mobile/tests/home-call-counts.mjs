import { chromium, expect } from '@playwright/test';
import fs from 'node:fs';
const fixture = JSON.parse(fs.readFileSync('tests/mobile-web/fixtures/route-detail.json', 'utf8'));
const browser = await chromium.launch();
try {
  for (const width of [320, 390]) for (const [status, category, action, filter] of [
    ['withheld', 'No call', 'Review routes without a call', 'no-call'],
    ['verify', 'Watch', 'Explore watch routes', 'watch'],
    ['skip', 'Skip', 'Review skip reasons', 'skip'],
  ]) {
    const context = await browser.newContext({ viewport: { width, height: 844 } });
    await context.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    const page = await context.newPage();
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
    await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { requestId: 'test', generatedAt: new Date().toISOString(), riverCount: 1, rivers: [{
      ...fixture.result, rating: 'Strong', score: 95, generatedAt: new Date().toISOString(),
      river: { ...fixture.result.river, difficulty: fixture.result.river.profile.difficulty },
      readiness: { status, label: category, reason: 'Controlled call fixture' },
      summary: { gaugeNow: 'Current', shortExplanation: 'Controlled call fixture' },
      liveData: { overall: 'live', summary: 'Current', gaugeState: 'live', weatherState: 'live', gaugeDetail: '', weatherDetail: '' },
    }] } }));
    await page.goto(new URL('/', process.argv[2] ?? 'http://127.0.0.1:4391').href);
    const categoryButton = page.getByRole('button', { name: `1 ${category} route`, exact: true });
    await expect(categoryButton).toBeVisible();
    await expect(page.getByRole('button', { name: '0 Paddle routes', exact: true })).toBeVisible();
    const box = await categoryButton.boundingBox();
    expect(box.x + box.width).toBeLessThanOrEqual(width);
    if (status === 'withheld') {
      await expect(page.getByText('Calls unavailable', { exact: true })).toBeVisible();
      await categoryButton.scrollIntoViewIfNeeded();
      await page.screenshot({ path: `apps/mobile/.expo/mobile-home-no-call-${width}.png` });
    }
    await page.getByRole('button', { name: action, exact: true }).click();
    await expect(page).toHaveURL(/\/explore\?/);
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:explore-preferences:v4') ?? '{}').filters?.status)).toBe(filter);
    await page.getByRole('tab', { name: 'list view', exact: true }).click();
    await expect(page.getByRole('button', { name: /Open route: Rice Creek/ }).first()).toBeVisible();
    console.log(`PASS ${width}px ${status}: complete counts, fitting category tile, relevant recovery action and actual matching Explore route`);
    await context.close();
  }
} finally { await browser.close(); }
