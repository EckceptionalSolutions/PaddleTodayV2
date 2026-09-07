import { test, expect } from '@playwright/test';

test('Explore view tabs retain keyboard focus across the layout change', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', (route) => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/explore');
  const tabs = page.getByRole('tablist', { name: 'Explore view', exact: true });
  const map = tabs.getByRole('tab', { name: 'map view', exact: true });
  const list = tabs.getByRole('tab', { name: 'list view', exact: true });
  await expect(map).toHaveAttribute('tabindex', '0');
  await map.press('ArrowRight');
  await expect(list).toHaveAttribute('aria-selected', 'true');
  await expect(list).toBeFocused();
  await expect(map).toHaveAttribute('tabindex', '-1');
  await list.press('Home');
  await expect(map).toBeFocused();
  await expect(map).toHaveAttribute('aria-selected', 'true');
  await map.press('End');
  await expect(list).toBeFocused();
  await list.press('ArrowRight');
  await expect(map).toBeFocused();
});
