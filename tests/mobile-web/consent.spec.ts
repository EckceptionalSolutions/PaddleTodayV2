import { test, expect } from '@playwright/test';
test('consent checkboxes announce state and support Space', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/**', (route) => route.fulfill({ status: 503, json: { error: 'offline', message: 'Offline test' } }));
  await page.route('**/api/rivers/qa-route.json', (route) => route.fulfill({ json: { result: { river: { slug: 'qa-route', name: 'QA route', reach: 'Local QA' } } } }));
  await page.goto('/contribute-photo/qa-route');
  for (const label of ['I own these photos or have permission to share them.', 'I agree to follow-up questions.']) {
    const checkbox = page.getByRole('checkbox', { name: label, exact: true });
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    await checkbox.press('Space');
    await expect(checkbox).not.toBeChecked();
  }
  console.log('Both contribution consent checkboxes announce state and toggle by keyboard.');
});


