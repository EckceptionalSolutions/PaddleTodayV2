import { expect, test } from '@playwright/test';

const favoriteSeed = {
  version: 1,
  items: [
    {
      slug: 'snake-river-cross-lake',
      name: 'Snake River',
      reach: 'Canary Road to Cross Lake / Pine City',
      state: 'MN',
      region: 'East Central Minnesota',
      url: '/rivers/snake-river-cross-lake/',
      savedAt: 1_767_000_000_000,
    },
  ],
};

const headerPages = ['/', '/weekend/', '/explore/'];

test.describe('mobile shared header', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.addInitScript((seed) => {
      window.localStorage.setItem('paddletoday:favorites:v1', JSON.stringify(seed));
    }, favoriteSeed);
  });

  for (const path of headerPages) {
    test(`uses the shared mobile header on ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.site-header');

      const navLinks = page.locator('.site-header__nav-link');
      await expect(navLinks).toHaveCount(4);
      await expect(page.locator('.site-header__nav-link[href="/"]')).toBeVisible();
      await expect(page.locator('.site-header__nav-link[href="/weekend/"]')).toBeVisible();
      await expect(page.locator('.site-header__nav-link[href="/explore/"]')).toBeVisible();
      await expect(page.locator('[data-site-favorites-link]')).toBeVisible();
      await expect(page.locator('.site-header__search')).toContainText('Search Routes');
      await expect(page.locator('.site-header__action')).toBeVisible();

      const navChrome = await page.locator('.site-header__nav').evaluate((node) => {
        const style = window.getComputedStyle(node);
        return {
          backgroundColor: style.backgroundColor,
          borderTopWidth: style.borderTopWidth,
          boxShadow: style.boxShadow,
        };
      });

      expect(navChrome).toEqual({
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderTopWidth: '0px',
        boxShadow: 'none',
      });
    });
  }
});
