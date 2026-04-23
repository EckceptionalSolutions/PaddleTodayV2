import { defineConfig, devices } from '@playwright/test';

// Visual regression harness to protect desktop while we iterate on mobile.
// Run: npx playwright test
// Update baselines: npx playwright test --update-snapshots

export default defineConfig({
  testDir: './tests/visual',
  timeout: 60_000,
  expect: {
    // Allow small rendering diffs across environments.
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.01,
      timeout: 30_000,
    },
  },
  use: {
    baseURL: process.env.PADDLETODAY_BASE_URL || 'http://127.0.0.1:4323',
    // We rely on the built one-origin preview server (see webServer below) unless
    // running against production.
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: {
        viewport: { width: 1280, height: 800 },
      },
    },
    // We avoid WebKit in this environment (it often needs extra OS deps).
    // Instead, emulate iPhone-ish viewport + UA in Chromium.
    {
      name: 'mobile-iphone-chromium',
      use: {
        browserName: 'chromium',
        ...devices['iPhone 14'],
      },
    },
    {
      name: 'mobile-android',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 7'],
      },
    },
  ],
  webServer: process.env.PADDLETODAY_BASE_URL
    ? undefined
    : {
        command: 'npm run preview:local',
        port: 4323,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
