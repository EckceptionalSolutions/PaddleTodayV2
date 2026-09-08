import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('expired weekend scores are historical until a fresh response arrives', async ({ page }) => {
  const now = new Date('2030-06-15T12:00:00Z');
  await page.clock.install({ time: now });
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  let fresh = false;
  let requests = 0;
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/weekend/summary.json', route => {
    requests++;
    const generatedAt = fresh ? now.toISOString() : '2030-06-15T09:00:00Z';
    return route.fulfill({ json: { generatedAt, rivers: [{
      river: { ...fixture.result.river, name: 'QA Weekend Route', difficulty: 'easy' },
      generatedAt,
      current: { score: 95, rating: 'Strong' },
      weekend: { score: 90, rating: 'Strong', confidence: 'High', label: 'Weekend',
        explanation: 'A favorable forecast in this fixture.', summary: 'Fixture outlook.', signalLine: '' },
      liveData: { overall: 'live', summary: 'QA fixture', gaugeState: 'live', weatherState: 'live' },
    }] } });
  });
  await page.goto('/weekend');
  const card = page.getByRole('button', { name: /^QA Weekend Route,.*, score 90$/ });
  await expect(page.getByRole('heading', { name: 'Saved weekend outlook', exact: true })).toBeVisible();
  await expect(card).toHaveAccessibleName(/saved forecast, update needed/);
  const marker = page.getByRole('button', { name: /^QA Weekend Route,.*weekend score 90$/ });
  await expect(marker).toHaveAccessibleName(/saved forecast, update needed/);
  await expect(card.getByText('Saved forecast · update needed', { exact: true })).toBeVisible();
  await expect(card.getByText('Previous outlook', { exact: true })).toBeVisible();
  await card.scrollIntoViewIfNeeded();
  const bounds = await card.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  await page.screenshot({ path: `tmp/weekend-expired-${page.viewportSize()!.width}.png`, fullPage: true });
  await page.getByRole('button', { name: 'Refresh cached conditions', exact: true }).click();
  await expect.poll(() => requests).toBe(2);
  await expect(card).toHaveAccessibleName(/saved forecast, update needed/);
  fresh = true;
  const refresh = page.getByRole('button', { name: 'Refresh cached conditions', exact: true });
  await expect(refresh).toBeEnabled();
  await refresh.click();
  await expect(page.getByRole('heading', { name: 'Plan the weekend', exact: true })).toBeVisible();
  await expect(card).not.toHaveAccessibleName(/saved forecast/);
  await expect(marker).not.toHaveAccessibleName(/saved forecast/);
  await expect(card.getByText('Saved forecast · update needed', { exact: true })).toHaveCount(0);
  await expect(card.getByText('Looks steady', { exact: true })).toBeVisible();
  expect(requests).toBe(3);
});
