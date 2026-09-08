import { test, expect, type Route } from '@playwright/test';

for (const failure of ['timeout', 'unreadable confirmation']) {
  test(`route requests retain entries and require deliberate retry after ${failure}`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: { error: 'offline' } }));
    let pending: Route | undefined;
    let submissions = 0;
    await page.route('**/api/route-request', route => { submissions++; pending = route; });
    await page.goto('/request-route');
    const name = page.getByRole('textbox', { name: 'River name', exact: true });
    const send = page.getByRole('button', { name: 'Send request', exact: true });
    await name.fill('QA Creek');
    await page.getByRole('textbox', { name: 'City, state, or general area', exact: true }).fill('MN');
    await send.click();
    await expect.poll(() => Boolean(pending)).toBe(true);
    if (failure === 'unreadable confirmation') await pending!.fulfill({ status: 200, contentType: 'text/html', body: '<html>Unexpected response</html>' });
    const message = failure === 'timeout'
      ? 'No confirmation arrived in time. Your entries are still here. Check your connection before trying again.'
      : 'We could not confirm whether your submission was received. Your entries are still here.';
    await expect(page.getByText(message, { exact: true })).toBeVisible({ timeout: 15_000 });
    await expect(name).toHaveValue('QA Creek');
    await expect(name).toBeEditable();
    expect(submissions).toBe(1);
    pending = undefined;
    await send.click();
    await expect.poll(() => Boolean(pending)).toBe(true);
    await pending!.fulfill({ json: { ok: true, stored: true } });
    await expect(page.getByText('Request received. Thanks for the lead.', { exact: true })).toBeVisible();
    await expect(name).toHaveValue('');
    expect(submissions).toBe(2);
  });
}
