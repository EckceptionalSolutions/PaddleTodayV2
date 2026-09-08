import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('planning-only routes never regain a Paddle label in Today, map drawer or list', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  const generatedAt = new Date().toISOString();
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { generatedAt, rivers: [{
    ...fixture.result, generatedAt, score: 95, rating: 'Strong',
    river: { ...fixture.result.river, difficulty: 'easy', scoreEligibility: 'planning' },
    readiness: { status: 'ready', label: 'Ready', reason: 'A favorable explanation that must not become a recommendation.' },
    summary: { gaugeNow: 'QA', shortExplanation: 'A favorable explanation.' },
    liveData: { overall: 'live', summary: 'QA', gaugeState: 'live', weatherState: 'live' },
  }] } }));
  await page.goto('/');
  await expect(page.getByText('Calls unavailable', { exact: true })).toBeVisible();
  const hero = page.getByRole('button', { name: /^View Rice Creek:/ }).first();
  await expect(hero.getByText('Planning only', { exact: true }).first()).toBeVisible();
  await expect(hero.getByText('Paddle', { exact: true })).toHaveCount(0);
  await expect(hero.getByText('Score 95', { exact: true })).toHaveCount(0);
  await page.goto('/explore?intent=no-call');
  await page.getByRole('button', { name: /^Rice Creek,.*Planning only/ }).click();
  await expect(page.getByText('Planning only', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Close route drawer', exact: true }).click();
  await page.getByRole('tab', { name: 'list view', exact: true }).click();
  const card = page.getByRole('button', { name: /^Open route: Rice Creek/ });
  await expect(card.getByText('Planning only', { exact: true }).first()).toBeVisible();
  await expect(card.getByText('Paddle', { exact: true })).toHaveCount(0);
  await expect(card.getByText('Strong', { exact: true })).toHaveCount(0);
});

for (const scenario of ['withheld', 'expired', 'ready'] as const) {
  test(`${scenario} scores stay consistent from Today to Explore list`, async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('paddletoday:welcome-completed:v1', '1');
      Object.defineProperty(navigator, 'share', { configurable: true, value: async (payload: { text: string }) => {
        (window as unknown as { sharedRoute: string }).sharedRoute = payload.text;
      } });
    });
    const generatedAt = scenario === 'expired' ? '2020-01-01T00:00:00Z' : new Date().toISOString();
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { generatedAt, rivers: [{
      ...fixture.result, generatedAt, score: 95, rating: 'Strong',
      river: { ...fixture.result.river, difficulty: 'easy' },
      readiness: { status: scenario === 'withheld' ? 'withheld' : 'ready', label: 'QA', reason: 'Verify source coverage before choosing this route.' },
      summary: { gaugeNow: 'QA reading', shortExplanation: 'A favorable old explanation.' },
      liveData: { overall: 'live', summary: 'QA', gaugeState: 'live', weatherState: 'live' },
    }] } }));
    await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: { ...fixture, generatedAt, result: {
      ...fixture.result, generatedAt, score: 95, rating: 'Strong',
      readiness: { status: scenario === 'withheld' ? 'withheld' : 'ready', label: 'QA', reason: 'Verify source coverage.' },
      gauge: { ...fixture.result.gauge, observedAt: new Date().toISOString() },
      liveData: { ...fixture.result.liveData, overall: 'live' },
    } } }));
    await page.goto('/');
    await expect(page.getByRole('button', { name: /^View Rice Creek:/ }).first()).toBeVisible();
    if (scenario === 'ready') await expect(page.getByText('Score 95', { exact: true }).first()).toBeVisible();
    else await expect(page.getByText('Score 95', { exact: true })).toHaveCount(0);
    await page.goto(`/explore?intent=${scenario === 'ready' ? 'clean-now' : 'no-call'}`);
    await page.getByRole('tab', { name: 'list view', exact: true }).click();
    const card = page.getByRole('button', { name: /^Open route: Rice Creek/ });
    await expect(card).toBeVisible();
    if (scenario === 'ready') await expect(card.getByText('Score 95', { exact: true })).toBeVisible();
    else {
      await expect(card.getByText('Score 95', { exact: true })).toHaveCount(0);
      await expect(card).toContainText('Verify source coverage before choosing this route.');
      await expect(card).not.toContainText('A favorable old explanation.');
    }
    await page.goto('/river/rice-creek-peltier-to-long-lake');
    if (scenario === 'ready') await expect(page.getByText('Score 95', { exact: true }).filter({ visible: true }).first()).toBeVisible();
    else await expect(page.getByText('Current score unavailable', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Share route', exact: true }).click();
    const shared = await page.evaluate(() => (window as unknown as { sharedRoute: string }).sharedRoute);
    if (scenario === 'ready') expect(shared).toContain('Score 95');
    else { expect(shared).toContain('Current score unavailable'); expect(shared).not.toContain('Score 95'); }
    if (scenario === 'expired') {
      await page.getByRole('button', { name: 'Show More section', exact: true }).click();
      await expect(page.getByRole('heading', { name: 'Saved outlook', exact: true })).toBeVisible();
      await expect(page.getByText('Saved score calculation', { exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Weather in the saved update', exact: true })).toBeVisible();
    }
  });
}
