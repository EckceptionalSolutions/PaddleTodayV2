import { defineConfig } from '@playwright/test';

const previewURL = process.env.MOBILE_WEB_BASE_URL;
const width = Number(process.env.MOBILE_WEB_WIDTH ?? 390);
if (!Number.isInteger(width) || width <= 0) {
  throw new Error('MOBILE_WEB_WIDTH must be a positive integer.');
}

export default defineConfig({
  testDir: './tests/mobile-web',
  timeout: 60_000,
  workers: 1,
  use: {
    baseURL: previewURL ?? 'http://127.0.0.1:8082',
    browserName: 'chromium',
    viewport: { width, height: 844 },
    trace: 'retain-on-failure',
  },
  webServer: previewURL ? undefined : {
    command: 'npm run web --workspace @paddletoday/mobile -- --port 8082',
    url: 'http://127.0.0.1:8082',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { EXPO_OFFLINE: '1', EXPO_NO_TELEMETRY: '1' },
  },
});
