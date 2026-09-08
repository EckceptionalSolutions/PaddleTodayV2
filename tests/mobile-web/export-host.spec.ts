import { test, expect } from '@playwright/test';

test.skip(process.env.MOBILE_WEB_EXPORT_CHECK !== '1', 'Only the isolated export-check host has this contract.');

test('export host rejects API writes and keeps unmocked reads local', async ({ request }) => {
  expect((await request.post('/api/route-contributions', { data: { fixture: true } })).status()).toBe(405);
  const unavailable = await request.get('/api/rivers/summary.json');
  expect(unavailable.status()).toBe(503);
  expect(await unavailable.json()).toMatchObject({ error: 'offline' });
});

test('export host does not expose files outside its output or treat missing assets as app pages', async ({ request }) => {
  expect((await request.get('/%2e%2e%5c%2e%2e%5cpackage.json')).status()).toBe(400);
  expect((await request.get('/%not-valid')).status()).toBe(400);
  expect((await request.get('/missing-bundle.js')).status()).toBe(404);
  const head = await request.head('/');
  expect(head.status()).toBe(200);
  expect(head.headers()['content-type']).toContain('text/html');
  expect(await head.body()).toHaveLength(0);
});
