import { test, expect } from '@playwright/test';

test('shared route offers an app handoff and preserves access choices on the website', async ({ page }) => {
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/?putin=baldwin-lake&takeout=old-highway-8&openApp=1');
  const panel = page.getByRole('region', { name: 'Open shared route', exact: true });
  await expect(panel).toBeVisible();
  const open = panel.getByRole('link', { name: 'Open PaddleToday', exact: true });
  const destination = new URL((await open.getAttribute('href'))!);
  expect(destination.protocol).toBe('paddletoday:');
  expect(destination.host).toBe('river');
  expect(destination.pathname).toBe('/rice-creek-peltier-to-long-lake');
  expect(destination.searchParams.get('putin')).toBe('baldwin-lake');
  expect(destination.searchParams.get('takeout')).toBe('old-highway-8');
  expect((await open.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await panel.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `tmp/route-app-handoff-${page.viewportSize()!.width}.png` });
  await panel.getByRole('link', { name: 'Continue on the website', exact: true }).click();
  await expect(panel).toBeHidden();
  const current = new URL(page.url());
  expect(current.searchParams.has('openApp')).toBe(false);
  expect(current.searchParams.get('putin')).toBe('baldwin-lake');
  expect(current.searchParams.get('takeout')).toBe('old-highway-8');
});
