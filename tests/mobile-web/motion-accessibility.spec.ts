import { expect, test, type Locator } from '@playwright/test';
import fixture from './fixtures/route-detail.json' with { type: 'json' };

const slug = 'rice-creek-peltier-to-long-lake';
const routeLabel = `${fixture.result.river.name}: ${fixture.result.river.reach}`;
const scale = (locator: Locator) => locator.evaluate(element => {
  const transform = getComputedStyle(element).transform;
  return transform === 'none' ? 1 : new DOMMatrixReadOnly(transform).a;
});

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
  await page.route(`**/api/rivers/${slug}.json`, route => route.fulfill({ json: fixture }));
  await page.route('**/gallery/**', route => route.abort());
});

test('reducing motion during a held press restores the button and preserves keyboard use', async ({ page }) => {
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Choose a city or ZIP', exact: true });
  await expect(button).toBeEnabled();
  await button.hover();
  await page.mouse.down();
  await expect.poll(() => scale(button)).toBeLessThan(0.99);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => scale(button)).toBe(1);
  // Cancel the pointer gesture, then activate the same control by keyboard.
  await page.mouse.move(0, 0);
  await page.mouse.up();
  await button.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.screenshot({ path: test.info().outputPath('reduced-motion-location.png') });
});

test('save confirmation waits for persistence and stops when reduced motion is enabled', async ({ page }) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key !== 'paddletoday:saved-rivers') return original.call(this, key, value);
      return new Promise<void>(resolve => {
        (window as any).releaseMotionSave = () => { original.call(this, key, value); resolve(); };
      }) as unknown as void;
    };
  });
  await page.goto(`/river/${slug}`);
  const save = page.getByRole('button', { name: `Save route: ${routeLabel}`, exact: true });
  await save.click();
  await expect(save).toHaveAttribute('aria-busy', 'true');
  await expect(save).toHaveAttribute('aria-pressed', 'false');
  expect(await scale(save.locator(':scope > div').first())).toBe(1);
  await page.evaluate(() => (window as any).releaseMotionSave());
  const saved = page.getByRole('button', { name: `Remove saved route: ${routeLabel}`, exact: true });
  await expect(saved).toHaveAttribute('aria-pressed', 'true');
  const icon = saved.locator(':scope > div').first();
  await expect.poll(() => scale(icon), { intervals: [10, 20, 50] }).toBeGreaterThan(1.02);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => scale(icon)).toBe(1);
  await expect(saved).toBeEnabled();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('paddletoday:saved-rivers')!)[0].slug)).toBe(slug);
  await page.screenshot({ path: test.info().outputPath('reduced-motion-saved.png') });
});

test('disclosures keep keyboard focus during motion and settle immediately when motion is reduced', async ({ page }) => {
  await page.goto(`/river/${slug}`);
  const safety = page.getByRole('button', { name: /^(Expand|Collapse) safety details$/ });
  await safety.press('Enter');
  await expect(safety).toHaveAttribute('aria-expanded', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const chevron = safety.locator(':scope > div').last();
  await expect.poll(() => scale(chevron)).toBe(-1);
  await expect(safety).toBeFocused();
  await safety.press('Enter');
  await expect(safety).toHaveAttribute('aria-expanded', 'false');
  await expect.poll(() => scale(chevron)).toBe(1);
  await safety.press('Enter');
  await expect(safety).toHaveAttribute('aria-expanded', 'true');
  await expect(safety.locator('..').locator(':scope > div').nth(1)).toHaveCSS('opacity', '1');
  await expect(safety).toBeFocused();
  await page.screenshot({ path: test.info().outputPath('reduced-motion-disclosures.png') });
});

test('an animated Undo failure message preserves the user’s current focus', async ({ page }) => {
  await page.addInitScript(({ slug, name, reach }) => {
    localStorage.setItem('paddletoday:saved-rivers', JSON.stringify([{ slug, name, reach, savedAt: new Date().toISOString() }]));
    const original = Storage.prototype.setItem;
    let attempts = 0;
    Storage.prototype.setItem = function (key, value) {
      if (key !== 'paddletoday:saved-rivers' || ++attempts === 1) return original.call(this, key, value);
      return new Promise<void>((_resolve, reject) => {
        (window as any).rejectMotionUndo = () => reject(new Error('Storage unavailable'));
      }) as unknown as void;
    };
  }, { slug, name: fixture.result.river.name, reach: fixture.result.river.reach });
  await page.goto(`/river/${slug}`);
  await page.getByRole('button', { name: `Remove saved route: ${routeLabel}`, exact: true }).click();
  const undo = page.getByRole('button', { name: 'Undo', exact: true });
  await undo.press('Enter');
  await expect(page.getByRole('button', { name: 'Restoring…', exact: true })).toHaveAttribute('aria-busy', 'true');
  // Undo is disabled during persistence. Preserve the enabled control the
  // user moves to instead of pulling focus back when the request completes.
  const dismiss = page.getByRole('button', { name: 'Dismiss', exact: true });
  await dismiss.focus();
  await page.evaluate(() => (window as any).rejectMotionUndo());
  await expect(page.getByText('Could not update Saved routes. Please try again.', { exact: true })).toBeVisible();
  await expect(undo).toBeEnabled();
  await expect(dismiss).toBeFocused();
  await dismiss.press('Enter');
  await expect(undo).toHaveCount(0);
});
