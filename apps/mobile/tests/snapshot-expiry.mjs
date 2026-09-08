import { chromium, expect } from '@playwright/test';
import fs from 'node:fs';
const fixture = JSON.parse(fs.readFileSync('tests/mobile-web/fixtures/route-detail.json', 'utf8'));
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 320, height: 844 } });
  const start = Date.parse('2030-06-15T12:00:00Z');
  let capturedAt = start;
  let requests = 0;
  await page.clock.install({ time: start });
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    Object.defineProperty(navigator, 'share', { configurable: true, value: async value => { window.sharedText = value.text; } });
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => {
    requests += 1;
    const generatedAt = new Date(capturedAt).toISOString();
    return route.fulfill({ json: { ...fixture, requestId: 'clock-test', generatedAt, result: { ...fixture.result,
      generatedAt, rating: 'Strong', score: 95, checklist: [],
      readiness: { status: 'ready', label: 'Ready', reason: 'Controlled current evidence' },
      gauge: { ...fixture.result.gauge, observedAt: generatedAt }, liveData: { ...fixture.result.liveData, overall: 'live' },
    } } });
  });
  await page.goto(new URL('/river/rice-creek-peltier-to-long-lake', process.argv[2] ?? 'http://127.0.0.1:4391').href);
  await expect(page.getByText('Paddle today', { exact: true })).toBeVisible();
  await page.clock.runFor(1500);
  await page.clock.fastForward(2 * 60 * 60 * 1000 + 61_000);
  await expect(page.getByText('Call unavailable', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Paddle today', { exact: true })).toHaveCount(0);
  const savedExplanation = page.getByRole('button', { name: 'Show saved explanation', exact: true });
  await expect(savedExplanation).toHaveAttribute('aria-expanded', 'false');
  await savedExplanation.click();
  await page.getByRole('button', { name: 'Hide saved explanation', exact: true }).click();
  expect(requests).toBe(1);
  await page.getByRole('button', { name: 'Share route', exact: true }).click();
  expect(await page.evaluate(() => window.sharedText)).toContain('Call unavailable');
  const storedStatus = await page.evaluate(() => {
    const cache = JSON.parse(localStorage.getItem('paddletoday-mobile-query-cache'));
    return cache.clientState.queries.find(query => query.queryKey[0] === 'river-detail').state.data.result.readiness.status;
  });
  expect(storedStatus).toBe('ready');
  const refresh = page.getByRole('button', { name: 'Refresh cached conditions', exact: true });
  await refresh.click(); // A successful request carrying the same old snapshot is still old.
  await expect(refresh).toBeEnabled();
  expect(requests).toBe(2);
  await expect(page.getByText('Call unavailable', { exact: true }).first()).toBeVisible();
  await refresh.scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'apps/mobile/.expo/mobile-snapshot-expired-320.png' });
  capturedAt = await page.evaluate(() => Date.now());
  await refresh.click();
  await expect(page.getByText('Paddle today', { exact: true })).toBeVisible();
  await expect(refresh).toBeHidden();
  expect(requests).toBe(3);
  console.log('PASS: in-memory expiry without refetch spam, withheld visible/shared call, explicit historical explanation, immutable cache, old refresh remains stale, genuinely fresh refresh restores call');
} finally { await browser.close(); }
