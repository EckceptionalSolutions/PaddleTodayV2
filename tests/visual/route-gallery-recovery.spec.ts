import { test, expect } from '@playwright/test';

test('route gallery retains failed-photo context and recovers when another photo opens', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    const scroll = Element.prototype.scrollIntoView;
    const state = window as unknown as { galleryScrollBehaviors: Array<ScrollBehavior | undefined> };
    state.galleryScrollBehaviors = [];
    Element.prototype.scrollIntoView = function (options) {
      if (this.matches('[data-route-gallery-thumb]') && typeof options === 'object') state.galleryScrollBehaviors.push(options.behavior);
      return scroll.call(this, options);
    };
  });
  const photos = [
    { src: '/qa-photo-broken.svg', caption: 'Launch overview', alt: 'Rocky launch', credit: 'First paddler' },
    { src: '/qa-photo-working.svg', caption: 'Downstream bend', alt: 'River bend', credit: 'Second paddler' },
  ];
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('https://cloud.umami.is/**', (route) => route.abort());
  await page.route('https://unpkg.com/maplibre-gl@*/**', (route) => route.abort());
  await page.route('**/qa-photo-broken.svg', (route) => route.abort());
  await page.route('**/qa-photo-working.svg', (route) => route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="100"><rect width="160" height="100" fill="teal"/></svg>' }));
  await page.route('**/rivers/rice-creek-peltier-to-long-lake/', async (route) => {
    const response = await route.fetch();
    const data = JSON.stringify(photos).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    const body = (await response.text()).replace(/data-approved-photos="[^"]*"/, `data-approved-photos="${data}"`);
    await route.fulfill({ response, body });
  });
  await page.goto('/rivers/rice-creek-peltier-to-long-lake/#route-gallery');
  const gallery = page.locator('[data-route-gallery]');
  await gallery.scrollIntoViewIfNeeded();
  const fallback = gallery.locator('[data-route-gallery-image-fallback]');
  const image = gallery.locator('[data-route-gallery-image]');
  await expect(fallback).toBeVisible();
  await expect(image).toBeHidden();
  await expect(gallery.locator('[data-route-gallery-caption]')).toHaveText('Launch overview');
  await expect(gallery.locator('[data-route-gallery-credit]')).toHaveText('Photo by First paddler');
  const second = gallery.getByRole('button', { name: 'Downstream bend', exact: true });
  await second.press('Space');
  await expect(second).toHaveAttribute('aria-pressed', 'true');
  await expect(fallback).toBeHidden();
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute('alt', 'River bend');
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBe(160);
  await expect(gallery.locator('[data-route-gallery-credit]')).toHaveText('Photo by Second paddler');
  const first = gallery.getByRole('button', { name: 'Launch overview', exact: true });
  await expect(first.locator('img')).toBeHidden();
  await expect(first).toBeVisible();
  await second.press('Home');
  await expect(first).toBeFocused();
  await expect(first).toHaveAttribute('aria-pressed', 'true');
  await expect(fallback).toBeVisible();
  await first.press('ArrowLeft');
  await expect(second).toBeFocused();
  await expect(second).toHaveAttribute('aria-pressed', 'true');
  await expect(fallback).toBeHidden();
  await second.press('ArrowRight');
  await expect(first).toBeFocused();
  await first.press('End');
  await expect(second).toBeFocused();
  await expect(image).toBeVisible();
  const behaviors = await page.evaluate(() => (window as unknown as { galleryScrollBehaviors: string[] }).galleryScrollBehaviors);
  expect(behaviors.length).toBeGreaterThan(0);
  expect(behaviors.every((behavior) => behavior === 'auto')).toBe(true);
});
