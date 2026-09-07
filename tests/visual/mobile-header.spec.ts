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
      await expect(page.locator('[data-site-favorites-link]')).toHaveAccessibleName(/^Saved routes/);
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

  for (const width of [320, 360, 390]) {
    test(`navigation fits without overlap at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto('/');
      await expect(page.locator('[data-site-favorites-link]')).toBeVisible();
      const layout = await page.locator('.site-header').evaluate((header) => {
        const bounds = (selector: string) => {
          const rect = header.querySelector(selector)!.getBoundingClientRect();
          return { x: rect.x, y: rect.y, right: rect.right, bottom: rect.bottom };
        };
        return {
          search: bounds('.site-header__search'),
          nav: bounds('.site-header__nav'),
          request: bounds('.site-header__action'),
          links: [...header.querySelectorAll('.site-header__nav-link')].map((link) => {
            const r = link.getBoundingClientRect();
            return { x: r.x, right: r.right };
          }),
        };
      });
      expect(layout.request.right).toBeLessThanOrEqual(width);
      for (const [index, link] of layout.links.entries()) {
        expect(link.x).toBeGreaterThanOrEqual(layout.nav.x - 1);
        expect(link.right).toBeLessThanOrEqual(layout.nav.right + 1);
        if (index > 0) expect(link.x).toBeGreaterThanOrEqual(layout.links[index - 1].right);
      }
      expect(Math.abs(layout.search.y - layout.request.y)).toBeLessThan(2);
      expect(layout.nav.y).toBeGreaterThanOrEqual(layout.request.bottom);
      for (const link of await page.locator('.site-header__nav-link').all()) {
        expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      }
      await expect(page.locator('.site-header__nav-link[href="/"]')).toHaveAttribute('aria-current', 'page');
      await page.locator('.site-header').screenshot({ path: test.info().outputPath(`header-${width}.png`) });
    });
  }
});
