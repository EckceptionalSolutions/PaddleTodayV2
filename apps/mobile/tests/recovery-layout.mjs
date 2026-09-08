// Browser text-layout stress check, not a native Dynamic Type measurement.
import { chromium, expect } from '@playwright/test';
const browser = await chromium.launch();
try {
  for (const width of [320, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 480 } });
    await context.addInitScript(() => localStorage.setItem('paddletoday:welcome-completed:v1', '1'));
    const page = await context.newPage();
    await page.route('**/api/**', route => route.fulfill({ status: 503, json: {} }));
    await page.goto(new URL('/', process.argv[2] ?? 'http://127.0.0.1:4391').href);
    const retry = page.getByRole('button', { name: 'Try again', exact: true });
    await expect(retry).toBeVisible();
    await page.evaluate(() => {
      for (const node of document.querySelectorAll('[dir="auto"]')) {
        // Scale readable screen copy, leaving navigation and icon glyphs alone.
        if (node.closest('[role="tablist"]') || getComputedStyle(node).fontFamily.includes('material')) continue;
        const style = getComputedStyle(node);
        node.style.fontSize = `${parseFloat(style.fontSize) * 2}px`;
        if (style.lineHeight !== 'normal') node.style.lineHeight = `${parseFloat(style.lineHeight) * 2}px`;
      }
    });
    await retry.scrollIntoViewIfNeeded();
    const bounds = await retry.boundingBox();
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
    expect(bounds.y).toBeGreaterThanOrEqual(0);
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(480);
    expect(bounds.height).toBeGreaterThanOrEqual(44);
    await page.screenshot({ path: `apps/mobile/.expo/mobile-recovery-large-${width}.png` });
    console.log(`PASS ${width}px: large error copy scrolls to a fully visible, minimum-44px retry button`);
    await context.close();
  }
} finally { await browser.close(); }
