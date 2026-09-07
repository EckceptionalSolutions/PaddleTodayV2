import { createServer, type Server } from 'node:http';
import { test, expect } from '@playwright/test';
import { securityHeaders } from '../../src/server/http';

let server: Server;
let origin: string;

test.beforeAll(async () => {
  server = createServer((_request, response) => {
    response.writeHead(200, { ...securityHeaders(response), 'content-type': 'text/html' });
    response.end('<!doctype html><title>Location permission test</title>');
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Test server did not bind a port');
  origin = `http://127.0.0.1:${address.port}`;
});

test.afterAll(async () => {
  await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

test('same-origin location remains available only with browser permission', async ({ page, context }) => {
  await context.setGeolocation({ latitude: 45.1, longitude: -93.2 });
  await page.goto(origin);
  expect(await page.evaluate(async () => (await navigator.permissions.query({ name: 'geolocation' })).state)).toBe('prompt');
  await context.grantPermissions(['geolocation'], { origin });
  const location = await page.evaluate(() => new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ latitude: coords.latitude, longitude: coords.longitude }),
      (error) => reject(new Error(error.message)),
      { timeout: 2000 },
    );
  }));
  expect(location).toEqual({ latitude: 45.1, longitude: -93.2 });
  await context.clearPermissions();
  expect(await page.evaluate(async () => (await navigator.permissions.query({ name: 'geolocation' })).state)).toBe('prompt');
});
