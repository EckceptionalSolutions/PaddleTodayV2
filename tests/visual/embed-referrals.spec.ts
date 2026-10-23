import { test, expect, type Page } from '@playwright/test';

const slug = 'little-miami-river-kelley-milford';
const partner = 'riverbend-campground';
const query = `utm_campaign=route-embed&utm_medium=referral&utm_source=${partner}&utm_content=${slug}`;
const storageKey = 'paddletoday.embed-referral.v1';

async function events(page: Page) {
  return page.evaluate(() => (window as any).__referralEvents ?? []) as Promise<Array<{ name: string; properties: Record<string, string> }>>;
}

test.beforeEach(async ({ page }) => {
  await page.route('https://cloud.umami.is/**', route => route.abort());
  await page.route('https://cloud.umami.is/script.js', route => route.fulfill({
    contentType: 'text/javascript',
    body: `window.__referralEvents=[]; window.umami={track:(name,properties)=>{window.__referralEvents.push({name,properties});return Promise.resolve();}};`,
  }));
  await page.route('**/api/rivers/**', route => route.fulfill({ status: 503, json: { error: 'Test: no live provider request' } }));
});

test('visible partner tags reach copied links while previews and embeds send no analytics', async ({ page }) => {
  let analyticsRequests = 0;
  page.on('request', request => { if (request.url().includes('umami.is')) analyticsRequests++; });
  await page.goto(`/embed/?route=${slug}`);
  await expect(page.getByLabel('Partner tag')).toBeVisible();
  await page.getByLabel('Partner tag').fill('--Riverbend-Campground--');
  await expect(page.locator('#partner-attribution')).toContainText(partner);
  await expect(page.locator('#embed-code')).toHaveValue(new RegExp(`partner=${partner}`));
  expect(await page.locator('#embed-code').inputValue()).not.toContain('preview=');
  const card = page.frameLocator('#route-preview');
  await expect(card.locator('[data-plan-link]')).toHaveAttribute('href', /utm_campaign=route-embed-preview/);
  await expect(card.locator('[data-brand-link]')).toHaveAttribute('href', new RegExp(`utm_source=${partner}`));
  expect(analyticsRequests).toBe(0);
  await page.goto(`/embed/routes/${slug}/?partner=${partner}`);
  for (const selector of ['[data-plan-link]', '[data-brand-link]']) {
    const url = new URL((await page.locator(selector).getAttribute('href'))!);
    expect(url.searchParams.get('utm_source')).toBe(partner);
    expect(url.searchParams.get('utm_campaign')).toBe('route-embed');
    expect(url.searchParams.get('utm_content')).toBe(slug);
  }
  expect(analyticsRequests).toBe(0);
});

test('records an arrival and attributes an actual route save and later public navigation', async ({ page }) => {
  await page.goto(`/rivers/${slug}/?${query}`);
  await expect.poll(async () => (await events(page)).filter(event => event.name === 'Route card referral').length).toBe(1);
  const arrival = (await events(page)).find(event => event.name === 'Route card referral')!;
  expect(arrival.properties).toMatchObject({ embed_partner: partner, embed_route: slug, embed_entry: 'route' });
  // Arrival tracking can initialize before the route's action handlers do.
  await expect.poll(async () => (await events(page)).some(event => event.name === 'Route view')).toBe(true);
  await expect.poll(async () => {
    const label = await page.locator('[data-account-label]').textContent();
    const login = await page.locator('[data-account-sign-in]').textContent();
    return label === 'Sign in' || login === 'Sign-in availability';
  }, { timeout: 15_000 }).toBe(true);
  const save = page.locator('[data-favorite-button]:visible').first();
  await save.click();
  await expect(save).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(async () => (await events(page)).filter(event => event.name === 'Toggle favorite' && event.properties.label === 'save').length).toBe(1);
  expect((await events(page)).find(event => event.name === 'Toggle favorite')!.properties).toMatchObject({ embed_partner: partner, embed_route: slug });
  await page.goto('/explore/');
  const search = page.locator('[data-analytics-event="Open site search"]').first();
  await search.click();
  await expect.poll(async () => (await events(page)).filter(event => event.name === 'Open site search').length).toBe(1);
  expect((await events(page)).find(event => event.name === 'Open site search')!.properties.embed_partner).toBe(partner);
  expect((await events(page)).filter(event => event.name === 'Route card referral')).toHaveLength(0);
});

test('a late analytics provider still receives the arrival exactly once', async ({ page }) => {
  await page.unroute('https://cloud.umami.is/**');
  await page.unroute('https://cloud.umami.is/script.js');
  await page.route('https://cloud.umami.is/script.js', route => route.fulfill({
    contentType: 'text/javascript',
    body: `setTimeout(()=>{window.__referralEvents=[];window.umami={track:(name,properties)=>{window.__referralEvents.push({name,properties});return Promise.resolve();}}},700);`,
  }));
  await page.goto(`/rivers/${slug}/?${query}`);
  await expect.poll(async () => (await events(page)).filter(event => event.name === 'Route card referral').length).toBe(1);
  expect((await events(page)).find(event => event.name === 'Route card referral')!.properties.embed_partner).toBe(partner);
});

test('another campaign and an expired attribution window do not keep the old partner', async ({ page }) => {
  await page.goto(`/rivers/${slug}/?${query}`);
  await expect.poll(async () => (await events(page)).some(event => event.name === 'Route card referral')).toBe(true);
  await page.goto(`/rivers/${slug}/?utm_campaign=newsletter`);
  await expect.poll(async () => (await events(page)).some(event => event.name === 'Route view')).toBe(true);
  expect((await events(page)).find(event => event.name === 'Route view')!.properties.embed_partner).toBeUndefined();
  expect(await page.evaluate(key => sessionStorage.getItem(key), storageKey)).toBeNull();
  await page.goto(`/rivers/${slug}/?${query}`);
  await expect.poll(async () => (await events(page)).some(event => event.name === 'Route card referral')).toBe(true);
  await page.evaluate(key => {
    const context = JSON.parse(sessionStorage.getItem(key)!); context.startedAt -= 31 * 60_000;
    sessionStorage.setItem(key, JSON.stringify(context));
  }, storageKey);
  await page.goto(`/rivers/${slug}/`);
  await expect.poll(async () => (await events(page)).some(event => event.name === 'Route view')).toBe(true);
  expect((await events(page)).find(event => event.name === 'Route view')!.properties.embed_partner).toBeUndefined();
});

test('brand arrivals retain the card route and blocked storage does not break the landing', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage blocked'); };
    Storage.prototype.setItem = () => { throw new Error('Storage blocked'); };
    Storage.prototype.removeItem = () => { throw new Error('Storage blocked'); };
  });
  await page.goto(`/?${query}`);
  await expect.poll(async () => (await events(page)).some(event => event.name === 'Route card referral')).toBe(true);
  expect((await events(page)).find(event => event.name === 'Route card referral')!.properties)
    .toMatchObject({ embed_partner: partner, embed_route: slug, embed_entry: 'brand' });
  await expect(page.getByRole('heading', { name: 'Find the best paddle near you today', exact: true })).toBeVisible();
});

test('preview campaigns and private pages never create partner referral events', async ({ page }) => {
  await page.goto(`/rivers/${slug}/?${query.replace('route-embed&', 'route-embed-preview&')}`);
  await expect.poll(async () => (await events(page)).some(event => event.name === 'Route view')).toBe(true);
  expect((await events(page)).some(event => event.name === 'Route card referral')).toBe(false);
  let providerRequests = 0;
  page.on('request', request => { if (request.url().includes('umami.is')) providerRequests++; });
  await page.goto(`/trips/browser/?${query}`);
  await expect(page.locator('body')).toHaveAttribute('data-analytics-enabled', 'false');
  expect(await events(page)).toEqual([]);
  expect(providerRequests).toBe(0);
  expect(await page.evaluate(key => sessionStorage.getItem(key), storageKey)).toBeNull();
});
