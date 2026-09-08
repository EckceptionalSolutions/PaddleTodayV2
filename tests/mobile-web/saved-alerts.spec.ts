import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test('saved alerts show both independent phone thresholds and distinguish email records', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    const slug = 'rice-creek-peltier-to-long-lake';
    localStorage.setItem('paddletoday:saved-rivers', JSON.stringify([{ slug, name: 'Rice Creek', reach: 'Peltier to Long Lake', savedAt: '2026-09-06T12:00:00Z' }]));
    localStorage.setItem('paddletoday:alert-preferences', JSON.stringify({ email: 'qa@example.test', routeAlerts: [
      { riverSlug: slug, threshold: 'strong', deliveryMethod: 'email', updatedAt: '2026-09-08T12:00:00Z' },
      { riverSlug: slug, threshold: 'strong', deliveryMethod: 'push', updatedAt: '2026-09-07T12:00:00Z' },
      { riverSlug: slug, threshold: 'good', deliveryMethod: 'push', updatedAt: '2026-09-06T12:00:00Z' },
    ] }));
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/summary.json', route => route.fulfill({ json: { rivers: [{ ...fixture.result,
    summary: { gaugeNow: 'QA', shortExplanation: 'Stored QA fixture' }, liveData: { overall: 'stale', summary: 'QA' },
  }] } }));
  await page.goto('/saved?tab=alerts');
  const summary = page.getByText('Phone alerts: Good, Strong · Email alerts: Strong', { exact: true });
  await expect(summary).toBeVisible();
  for (const threshold of ['Good', 'Strong']) {
    const button = page.getByRole('button', { name: `${threshold} phone alert for Rice Creek: ${fixture.result.river.reach}`, exact: true });
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(button).toContainText(`${threshold} · On`);
    await button.scrollIntoViewIfNeeded();
    await expect(button).toBeInViewport({ ratio: 1 });
  }
  await page.screenshot({ path: `tmp/saved-multiple-alerts-${page.viewportSize()!.width}.png` });
  await page.reload();
  await expect(summary).toBeVisible();
});

test('saved alert controls identify their route and retain the current selection when setup is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:saved-rivers', JSON.stringify([{
      slug: 'rice-creek-peltier-to-long-lake', name: 'Rice Creek', reach: 'Peltier to Long Lake',
      savedAt: '2026-09-06T12:00:00.000Z',
    }]));
    localStorage.setItem('paddletoday:alert-preferences', JSON.stringify({ email: '', routeAlerts: [{
      riverSlug: 'rice-creek-peltier-to-long-lake', threshold: 'good', deliveryMethod: 'push', updatedAt: '2026-09-06T12:00:00.000Z',
    }] }));
  });
  let submissions = 0;
  await page.route('**/api/**', (route) => {
    if (route.request().method() === 'POST') submissions += 1;
    return route.fulfill({ status: 503, json: { error: 'offline' } });
  });
  await page.route('**/api/rivers/summary.json', (route) => route.fulfill({ json: { rivers: [{
    ...fixture.result,
    summary: { gaugeNow: 'Check source', shortExplanation: 'Local QA fixture: conditions are not current.' },
    liveData: { overall: 'stale', summary: 'Local QA fixture: check current conditions.' },
  }] } }));
  await page.goto('/saved');
  const navigation = page.getByRole('tablist').filter({ has: page.getByRole('tab', { name: 'Today', exact: true }) });
  for (const name of ['Today', 'Explore', 'Weekend', 'Saved routes', 'More']) {
    await expect(navigation.getByRole('tab', { name, exact: true })).toBeVisible();
  }
  const sections = page.getByRole('tablist', { name: 'Saved route sections', exact: true });
  const routesTab = sections.getByRole('tab', { name: 'Saved routes', exact: true });
  const alertsTab = sections.getByRole('tab', { name: 'Alerts', exact: true });
  await expect(routesTab).toHaveAttribute('tabindex', '0');
  await expect(alertsTab).toHaveAttribute('tabindex', '-1');
  await routesTab.press('ArrowLeft');
  await expect(alertsTab).toBeFocused();
  await expect(alertsTab).toHaveAttribute('aria-selected', 'true');
  await alertsTab.press('ArrowRight');
  await expect(routesTab).toBeFocused();
  await routesTab.press('End');
  await expect(alertsTab).toBeFocused();
  await alertsTab.press('Home');
  await expect(routesTab).toBeFocused();
  await routesTab.press('ArrowRight');
  await expect(alertsTab).toHaveAttribute('tabindex', '0');
  await expect(routesTab).toHaveAttribute('tabindex', '-1');
  const good = page.getByRole('button', { name: `Good phone alert for Rice Creek: ${fixture.result.river.reach}`, exact: true });
  const strong = page.getByRole('button', { name: `Strong phone alert for Rice Creek: ${fixture.result.river.reach}`, exact: true });
  await expect(good).toHaveAttribute('aria-pressed', 'true');
  await expect(strong).toHaveAttribute('aria-pressed', 'false');
  expect((await strong.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await strong.press('Enter');
  await expect(page.getByText('Phone alerts are not available on web.', { exact: true })).toBeVisible();
  await expect(good).toBeEnabled();
  await expect(strong).toBeEnabled();
  await expect(strong).toHaveAttribute('aria-busy', 'false');
  await expect(good).toHaveAttribute('aria-pressed', 'true');
  await good.press('Enter');
  await expect(good).toHaveAttribute('aria-busy', 'false');
  expect(submissions).toBe(0);
});
