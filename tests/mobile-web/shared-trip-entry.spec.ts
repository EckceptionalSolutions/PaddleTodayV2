import { expect, test } from '@playwright/test';

const id = 'AuditTestTrip0001';
const token = 'AuditFixtureToken0001';
const trip = {
  title: 'Crew launch plan', route: { name: 'Rice Creek', putInName: 'Peltier', takeOutName: 'Long Lake' },
  date: '2030-06-15', launch: '09:30', timeZone: 'America/Chicago', itinerary: [],
};

for (const key of ['view', 'invite']) {
  for (const firstLaunch of [true, false]) {
    test(`${key} opens the intended trip once on ${firstLaunch ? 'first' : 'returning'} launch`, async ({ page }) => {
      if (!firstLaunch) await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
      let opens = 0;
      await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
      await page.route('**/api/trips/' + (key === 'view' ? 'view' : 'invitation'), route => {
        opens++;
        expect(route.request().postDataJSON()).toMatchObject({ id, token });
        return route.fulfill({ json: key === 'view' ? { trip } : { invitation: trip } });
      });
      const target = '/trips?id=' + id + '&' + key + '=' + token;
      await page.goto(target);
      if (firstLaunch) {
        const enter = page.getByRole('button', { name: 'Explore PaddleToday', exact: true });
        await expect(enter).toBeVisible();
        expect(opens).toBe(0);
        await enter.click();
      }
      await expect(page).toHaveURL(target);
      await expect(page.getByText(trip.title, { exact: true })).toBeVisible();
      expect(opens).toBe(1);
    });
  }
}

for (const scheme of ['light', 'dark'] as const) {
  test('shared plan recovers and wraps at 320 px in ' + scheme, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.emulateMedia({ colorScheme: scheme });
    await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    const landing = 'Long Lake regional park north landing past the fishing pier and picnic area';
    let requests = 0;
    await page.route('**/api/trips/view', route => {
      expect(route.request().postDataJSON()).toEqual({ id, token });
      return ++requests === 1 ? route.fulfill({ status: 503, json: {} }) : route.fulfill({
        json: { trip: { ...trip, route: { ...trip.route, takeOutName: landing }, itinerary: [{ id: 'a', time: '09:00', location: 'Parking lot', note: 'Meet the shuttle' }] } },
      });
    });
    await page.goto('/trips?id=' + id + '&view=' + token);
    await expect(page.locator('[aria-live="polite"]').filter({ hasText: 'Could not load this shared trip plan' }).last()).toBeVisible();
    await page.getByRole('button', { name: 'Retry' }).click();
    await expect(page.getByText('Shared trip plan loaded.', { exact: true })).toHaveAttribute('aria-live', 'polite');
    expect(requests).toBe(2);
    const field = page.getByText('Take-out: ' + landing, { exact: true });
    const metrics = await field.evaluate(el => {
      const css = getComputedStyle(el);
      let parent: Element | null = el;
      while (parent && getComputedStyle(parent).backgroundColor === 'rgba(0, 0, 0, 0)') parent = parent.parentElement;
      function lum(color: string) {
        const [r, g, b] = color.match(/\d+/g)!.map(Number).map(value => value / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      }
      const bg = lum(getComputedStyle(parent!).backgroundColor), fg = lum(css.color);
      return { lightText: fg > bg, contrast: (Math.max(bg, fg) + 0.05) / (Math.min(bg, fg) + 0.05), lines: el.clientHeight / parseFloat(css.lineHeight), fits: el.scrollWidth <= el.clientWidth };
    });
    expect(metrics.lightText).toBe(scheme === 'dark');
    expect(metrics.contrast).toBeGreaterThanOrEqual(4.5);
    expect(metrics.lines).toBeGreaterThan(1);
    expect(metrics.fits).toBe(true);
    await expect(page.getByText('Meet the shuttle')).toBeVisible();
  });
}

test('expired view link explains how to recover', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
  await page.route('**/api/trips/view', route => route.fulfill({ status: 404, json: {} }));
  await page.goto('/trips?id=' + id + '&view=' + token);
  await expect(page.getByText(/Ask the organizer for a new link/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retry' })).toHaveCount(0);
});
