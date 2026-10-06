import { installMobileBoardFixtures } from './mobile-board-fixtures';
import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('tab switches reuse cached boards and hidden tabs do not revalidate on focus', async ({ page }) => {
  const now = new Date('2030-06-15T12:00:00Z');
  await page.clock.install({ time: now });
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:user-location', JSON.stringify({
      latitude: 45.08, longitude: -93.2, label: 'Test city', source: 'search',
    }));
  });
  const requests = { summary: 0, explore: 0, weekend: 0 };
  const generatedAt = now.toISOString();
  const scored = { ...fixture.result, generatedAt,
    river: { ...fixture.result.river, scoreEligibility: 'scored', difficulty: 'easy' },
    summary: { gaugeNow: 'Check source', shortExplanation: 'QA fixture.' },
    liveData: { overall: 'live', summary: 'QA fixture', gaugeState: 'live', weatherState: 'live' },
  };
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  const fulfillMobile = await installMobileBoardFixtures(page);
  await page.route('**/api/mobile/summary.json**', route => {
    requests.summary++;
    return fulfillMobile(route, { json: { generatedAt, snapshotStatus: 'fresh', rivers: [scored] } });
  });
  await page.route('**/api/mobile/explore.json**', route => {
    requests.explore++;
    return fulfillMobile(route, { json: { generatedAt, snapshotStatus: 'fresh', rivers: [scored] } });
  });
  await page.route('**/api/mobile/weekend.json**', route => {
    requests.weekend++;
    return fulfillMobile(route, { json: { generatedAt, snapshotStatus: 'fresh', rivers: [{
      ...scored, current: { score: 95, rating: 'Strong' },
      weekend: { score: 90, rating: 'Strong', confidence: 'High', label: 'Weekend',
        explanation: 'Fixture outlook.', summary: 'Fixture outlook.', signalLine: '' },
    }] } });
  });
  await page.goto('/');
  await expect.poll(() => requests.summary).toBeGreaterThan(0);
  expect(requests.explore).toBe(0);
  for (const tab of ['Explore', 'Weekend', 'Today', 'Explore', 'Weekend']) {
    await page.getByRole('tab', { name: tab, exact: true }).click();
    await expect.poll(() => requests[tab === 'Today' ? 'summary' : tab === 'Explore' ? 'explore' : 'weekend']).toBeGreaterThan(0);
    await expect(page.getByText(/Loading (today’s|weekend) routes|Loading routes/)).toHaveCount(0);
  }
  await page.getByRole('tab', { name: /Trips$/ }).click();
  await expect(page).toHaveURL(/\/trips$/);
  const cachedRequests = { ...requests };
  await page.clock.fastForward(16 * 60_000);
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' });
    document.dispatchEvent(new Event('visibilitychange'));
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.clock.runFor(1000);
  expect(requests).toEqual(cachedRequests);
  await page.getByRole('tab', { name: 'Today', exact: true }).click();
  await expect.poll(() => requests.summary).toBe(cachedRequests.summary + 1);
  expect(requests.explore).toBe(cachedRequests.explore);
  expect(requests.weekend).toBe(cachedRequests.weekend);
});
