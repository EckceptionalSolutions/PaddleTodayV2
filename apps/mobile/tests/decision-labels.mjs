import { chromium, expect } from '@playwright/test';
import fs from 'node:fs';
const fixture = JSON.parse(fs.readFileSync('tests/mobile-web/fixtures/route-detail.json', 'utf8'));
const browser = await chromium.launch();
try {
  for (const [readiness, label] of [['verify', 'Watch closely'], ['withheld', 'Call unavailable'], ['skip', 'Skip today'], ['ready', 'Strong conditions'], ['stale', 'Watch closely'], ['offline', 'Skip today']]) {
    const context = await browser.newContext({ viewport: { width: 320, height: 844 } });
    await context.addInitScript(() => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      Object.defineProperty(navigator, 'share', { configurable: true, value: async payload => { window.sharedRoute = payload.text; } });
    });
    const page = await context.newPage();
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: {
      ...fixture, generatedAt: new Date().toISOString(), result: { ...fixture.result, rating: 'Strong', score: 95, checklist: [],
        generatedAt: new Date().toISOString(),
        gauge: { ...fixture.result.gauge, observedAt: new Date(Date.now() - (readiness === 'stale' ? 9 * 60 * 60 * 1000 : 0)).toISOString() },
        liveData: { ...fixture.result.liveData, overall: readiness === 'offline' ? 'offline' : 'live' },
        readiness: { status: ['stale', 'offline'].includes(readiness) ? 'ready' : readiness, label, reason: 'Controlled evidence-gate fixture' } },
    } }));
    await page.goto(new URL('/river/rice-creek-peltier-to-long-lake', process.argv[2] ?? 'http://127.0.0.1:4391').href);
    await expect(page.getByText(label, { exact: true }).first()).toBeVisible();
    if (readiness !== 'ready') await expect(page.getByText('Strong conditions', { exact: true })).toHaveCount(0);
    await page.getByRole('button', { name: 'Share route', exact: true }).click();
    const shared = await page.evaluate(() => window.sharedRoute);
    if (readiness === 'withheld') { expect(shared).not.toContain('Score 95'); expect(shared).toContain('Current score unavailable'); }
    else expect(shared).toContain('Score 95');
    expect(shared).toContain(readiness === 'ready' ? 'Paddle today' : label);
    expect(shared).not.toContain('Strong conditions');
    await page.screenshot({ path: `apps/mobile/.expo/mobile-decision-${readiness}-320.png` });
    console.log(`PASS ${readiness}: visible badge and shared summary respect the canonical call, unavailable score withheld`);
    await context.close();
  }
} finally { await browser.close(); }
