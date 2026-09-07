import { test, expect } from '@playwright/test';

test('eligible automatic feedback still opens and can be dismissed without sending anything', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:feedback-usage:v1', JSON.stringify({
      firstOpenedAt: Date.now() - 8 * 24 * 60 * 60 * 1000,
      openCount: 5,
      meaningfulActionCount: 3,
    }));
  });
  let submissions = 0;
  await page.route('**/api/**', (route) => {
    if (route.request().method() !== 'GET') submissions++;
    return route.fulfill({ json: { rivers: [] } });
  });
  await page.goto('/');
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByText('A quick question', { exact: true })).toBeVisible();
  await dialog.getByRole('button', { name: 'Send private feedback', exact: true }).press('Space');
  const message = dialog.getByRole('textbox', { name: 'What should we know?', exact: true });
  await message.fill('Keep my draft while I check the choices.');
  await dialog.getByRole('button', { name: 'Back to feedback choices', exact: true }).press('Space');
  await dialog.getByRole('button', { name: 'Rate PaddleToday in the app store', exact: true }).press('Space');
  await expect(dialog.getByText('Choose your store', { exact: true })).toBeVisible();
  await dialog.getByRole('button', { name: 'Send private feedback', exact: true }).press('Space');
  await expect(message).toHaveValue('Keep my draft while I check the choices.');
  await dialog.getByRole('button', { name: 'Back', exact: true }).press('Space');
  await dialog.getByRole('button', { name: 'Not now', exact: true }).press('Space');
  await expect(dialog).toBeHidden();
  await expect.poll(() => page.evaluate(() => {
    const state = JSON.parse(localStorage.getItem('paddletoday:feedback-usage:v1')!);
    return state.nextFeedbackPromptAt > Date.now();
  })).toBe(true);
  expect(submissions).toBe(0);
});

test('a store-link completion cannot close a newly opened private-feedback form', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:feedback-usage:v1', JSON.stringify({
      firstOpenedAt: Date.now() - 8 * 24 * 60 * 60 * 1000, openCount: 5, meaningfulActionCount: 3,
    }));
    window.open = () => {
      // Simulate changing views before the asynchronous link-opening result.
      queueMicrotask(() => document.querySelector<HTMLButtonElement>('[aria-label="Send private feedback"]')?.click());
      return null;
    };
  });
  await page.route('**/api/**', (route) => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/');
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('button', { name: 'Rate PaddleToday in the app store', exact: true }).click();
  await dialog.getByRole('button', { name: 'Open Apple App Store review page', exact: true }).click();
  const message = dialog.getByRole('textbox', { name: 'What should we know?', exact: true });
  await expect(message).toBeVisible();
  await message.fill('The newer form should stay open.');
  await expect(message).toHaveValue('The newer form should stay open.');
});

test('a failed store-review link leaves the feedback sheet open for retry', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('paddletoday:welcome-completed:v1', '1');
    localStorage.setItem('paddletoday:feedback-usage:v1', JSON.stringify({
      firstOpenedAt: Date.now() - 8 * 24 * 60 * 60 * 1000, openCount: 5, meaningfulActionCount: 3,
    }));
    window.open = (url) => {
      if (!localStorage.getItem('qa:allow-store-link')) throw new Error('QA store link unavailable');
      localStorage.setItem('qa:opened-store-url', String(url));
      return null;
    };
  });
  await page.route('**/api/**', (route) => route.fulfill({ json: { rivers: [] } }));
  await page.goto('/');
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('button', { name: 'Rate PaddleToday in the app store', exact: true }).press('Space');
  const apple = dialog.getByRole('button', { name: 'Open Apple App Store review page', exact: true });
  await apple.press('Space');
  await expect(dialog.getByText('The store review page could not be opened. Please try again.', { exact: true })).toBeVisible();
  await expect(apple).toBeEnabled();
  await page.evaluate(() => localStorage.setItem('qa:allow-store-link', '1'));
  await apple.press('Space');
  await expect(dialog).toBeHidden();
  expect(await page.evaluate(() => localStorage.getItem('qa:opened-store-url'))).toContain('apps.apple.com/app/id6769542734');
});
