import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('multiple drafts expand, identify their access points and remove only the chosen draft', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    if (localStorage.getItem('qa:drafts-seeded')) return;
    localStorage.setItem('qa:drafts-seeded', '1');
    for (let index = 0; index < 5; index++) {
      const target = { routeSlug: 'rice-creek-peltier-to-long-lake', routeName: 'Rice Creek',
        putInId: `launch-${index}`, takeOutId: 'landing', putInName: `Launch ${index + 1}`, takeOutName: 'Long Lake' };
      localStorage.setItem(`paddletoday:trip-draft:v1:${JSON.stringify([target.routeSlug, target.putInId, target.takeOutId])}`, JSON.stringify({ version: 1, target,
        draft: { launch: '2030-06-15 09:00', expected: '2030-06-15 12:00', checkIn: '', groupSize: '', boat: '', vehicle: '', note: `Draft ${index + 1}` },
        savedAt: new Date(Date.UTC(2026, 8, 8, 12, 5 - index)).toISOString() }));
    }
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers: [] } }));
  await page.route('**/api/rivers/rice-creek-peltier-to-long-lake.json', route => route.fulfill({ json: fixture }));
  await page.goto('/saved');
  const resumes = page.getByRole('button', { name: /^Resume trip draft for Rice Creek:/ });
  await expect(resumes).toHaveCount(3);
  const expand = page.getByRole('button', { name: 'Show all 5 trip drafts', exact: true });
  await expect(expand).toHaveAttribute('aria-expanded', 'false');
  await expand.press('Enter');
  await expect(resumes).toHaveCount(5);
  await page.getByRole('button', { name: 'Remove trip draft for Rice Creek: Launch 5 to Long Lake', exact: true }).click();
  await page.getByRole('button', { name: 'Keep draft', exact: true }).click();
  await expect(resumes).toHaveCount(5);
  await page.getByRole('button', { name: 'Remove trip draft for Rice Creek: Launch 5 to Long Lake', exact: true }).click();
  await page.getByRole('button', { name: 'Remove this draft', exact: true }).click();
  await expect(resumes).toHaveCount(4);
  const collapse = page.getByRole('button', { name: 'Show fewer trip drafts', exact: true });
  await expect(collapse).toHaveAttribute('aria-expanded', 'true');
  await collapse.press('Enter');
  await expect(resumes).toHaveCount(3);
  await page.reload();
  await page.getByRole('button', { name: 'Show all 4 trip drafts', exact: true }).click();
  await expect(resumes).toHaveCount(4);
  await expect(page.getByRole('button', { name: 'Resume trip draft for Rice Creek: Launch 5 to Long Lake', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Resume trip draft for Rice Creek: Launch 4 to Long Lake', exact: true }).click();
  await expect(page.getByText('This draft’s access points are no longer available on the route. The draft is still saved. Review the access points before starting a new plan.', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => Object.keys(localStorage).filter(key => key.startsWith('paddletoday:trip-draft:')).length)).toBe(4);
});
