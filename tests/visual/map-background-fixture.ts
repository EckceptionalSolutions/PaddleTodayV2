import type { Page } from '@playwright/test';
import sharp from 'sharp';

/** Keep a valid parsed style available while withholding its background tiles. */
export async function holdMapBackgroundTiles(page: Page) {
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  const tile = await sharp({ create: { width: 256, height: 256, channels: 3, background: '#6596a6' } }).png().toBuffer();
  await page.route('https://tiles.openfreemap.org/styles/liberty*', route => route.fulfill({ json: {
    version: 8,
    glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
    sources: { slow: { type: 'raster', tiles: ['https://qa.paddletoday.test/slow/{z}/{x}/{y}.png'], tileSize: 256 } },
    layers: [
      { id: 'background', type: 'background', paint: { 'background-color': '#eef2e9' } },
      { id: 'slow', type: 'raster', source: 'slow' },
    ],
  } }));
  await page.route('https://qa.paddletoday.test/slow/**', async route => {
    await pending;
    await route.fulfill({ contentType: 'image/png', body: tile });
  });
  return release;
}
