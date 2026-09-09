import { test, expect } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    const original = Element.prototype.scroll;
    (window as any).__scrollBehaviors = [];
    Element.prototype.scroll = function (...args: any[]) {
      if (typeof args[0] === 'object') (window as any).__scrollBehaviors.push(args[0].behavior);
      return original.apply(this, args as [number, number]);
    };
  });
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route('**/api/rivers/qa-route.json', route => route.fulfill({ json: fixture }));
});

test('route section jumps respect reduced motion', async ({ page }) => {
  await page.goto('/river/qa-route');
  const access = page.getByRole('button', { name: 'Show Access section', exact: true }).first();
  await access.evaluate(element => {
    (window as any).__scrollBehaviors = [];
    (element as HTMLElement).click();
  });
  await expect(access).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(() => page.evaluate(() => (window as any).__scrollBehaviors.length)).toBeGreaterThan(0);
  expect(await page.evaluate(() => (window as any).__scrollBehaviors)).not.toContain('smooth');
});

test('rapid photo-field focus keeps only the latest delayed scroll and respects motion changes', async ({ page }) => {
  await page.goto('/contribute-photo/qa-route');
  const name = page.getByRole('textbox', { name: 'Name or paddling handle', exact: true });
  const email = page.getByRole('textbox', { name: 'Email for follow-up questions', exact: true });
  await expect(name).toBeVisible();
  await page.evaluate(() => {
    (window as any).__scrollBehaviors = [];
    (document.querySelector('[aria-label="Name or paddling handle"]') as HTMLElement).focus();
    (document.querySelector('[aria-label="Email for follow-up questions"]') as HTMLElement).focus();
  });
  await expect(email).toBeFocused();
  await expect.poll(() => page.evaluate(() => (window as any).__scrollBehaviors.length)).toBe(1);
  expect(await page.evaluate(() => (window as any).__scrollBehaviors)).not.toContain('smooth');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await name.evaluate(element => {
    (window as any).__scrollBehaviors = [];
    (element as HTMLElement).focus();
  });
  await expect.poll(() => page.evaluate(() => (window as any).__scrollBehaviors)).toContain('smooth');
});
