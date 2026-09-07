import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/mobile-web',
  timeout: 60_000,
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:8082',
    browserName: 'chromium',
    viewport: { width: 390, height: 844 },
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run web --workspace @paddletoday/mobile -- --port 8082',
    url: 'http://127.0.0.1:8082',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { EXPO_OFFLINE: '1', EXPO_NO_TELEMETRY: '1' },
  },
});
