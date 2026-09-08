// React lifecycle test using an instrumented map adapter. Verifies native-map
// props and camera calls, not native gestures or rendered geographic pixels.
import { chromium, expect } from '@playwright/test';
import { build } from 'esbuild';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const adapter = `
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
export const RoutePlotMap = forwardRef(function MockMap(props, ref) {
  window.currentMapProps = props;
  useImperativeHandle(ref, () => ({
    focusAll: () => window.cameraCalls.push('all'),
    focusUserArea: () => window.cameraCalls.push('user'),
    focusSelected: () => window.cameraCalls.push('selected'),
  }), []);
  useEffect(() => { window.mapMounts.push(props.initialViewport ?? null); props.onReady(); }, []);
  return <div data-testid="map">Instrumented native map adapter</div>;
});`;
const entry = `
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ExploreRouteMap } from './src/components/explore-route-map';
window.cameraCalls = []; window.mapMounts = [];
function Harness() {
  const mapRef = useRef(null), memory = useRef(null);
  const [visible, setVisible] = useState(true);
  const [context, setContext] = useState('Minnesota');
  const [selected, setSelected] = useState(null);
  const [location, setLocation] = useState(null);
  window.changeMap = { setVisible, setContext, setSelected, setLocation };
  return <>{visible ? <ExploreRouteMap mapRef={mapRef} viewportMemory={memory}
    cameraContext={context} selectedSlug={selected} hasFilters={!location}
    points={[]} userLocation={location} /> : <div>List or empty results</div>}</>;
}
createRoot(document.getElementById('root')).render(<Harness />);`;
const bundle = await build({ stdin: { contents: entry, resolveDir: appRoot, loader: 'tsx' },
  bundle: true, write: false, platform: 'browser', jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [{ name: 'map-adapter', setup(build) {
    build.onResolve({ filter: /^\.\/route-plot-map$/ }, () => ({ path: 'map', namespace: 'instrumented' }));
    build.onResolve({ filter: /^@react-navigation\/native$/ }, () => ({ path: 'navigation', namespace: 'instrumented' }));
    build.onLoad({ filter: /.*/, namespace: 'instrumented' }, args => ({
      contents: args.path === 'map' ? adapter : 'export const useIsFocused = () => true;',
      loader: 'tsx', resolveDir: appRoot,
    }));
  } }],
});
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.route('http://viewport.test/**', route => route.fulfill({
    contentType: route.request().url().endsWith('.js') ? 'application/javascript' : 'text/html',
    body: route.request().url().endsWith('.js') ? bundle.outputFiles[0].text : '<div id="root"></div><script src="/app.js"></script>',
  }));
  await page.goto('http://viewport.test/');
  await expect.poll(() => page.evaluate(() => window.cameraCalls)).toEqual(['all']);
  const region = { latitude: 45.2, longitude: -93.1, latitudeDelta: 0.1, longitudeDelta: 0.07 };
  await page.evaluate(region => window.currentMapProps.onViewportChange(region), region);
  await page.evaluate(() => window.changeMap.setSelected('route-a'));
  await page.evaluate(() => window.changeMap.setSelected(null));
  await page.evaluate(() => window.changeMap.setVisible(false));
  await expect(page.getByTestId('map')).toHaveCount(0);
  await page.evaluate(() => window.changeMap.setVisible(true));
  await expect.poll(() => page.evaluate(() => window.mapMounts)).toEqual([null, region]);
  await page.waitForTimeout(80);
  expect(await page.evaluate(() => window.cameraCalls)).toEqual(['all']);

  // List changes to a different search must not restore the old search's map.
  await page.evaluate(() => window.changeMap.setVisible(false));
  await expect(page.getByTestId('map')).toHaveCount(0);
  await page.evaluate(() => { window.changeMap.setContext('Wisconsin'); window.changeMap.setVisible(true); });
  await expect.poll(() => page.evaluate(() => window.cameraCalls)).toEqual(['all', 'all']);
  expect(await page.evaluate(() => window.mapMounts.at(-1))).toBeNull();

  // When an empty search is cleared, the remembered context is useful again.
  await page.evaluate(() => window.changeMap.setVisible(false));
  await expect(page.getByTestId('map')).toHaveCount(0);
  await page.evaluate(() => { window.changeMap.setContext('Minnesota'); window.changeMap.setVisible(true); });
  await expect.poll(() => page.evaluate(() => window.mapMounts.at(-1))).toEqual(region);
  await page.waitForTimeout(80);
  expect(await page.evaluate(() => window.cameraCalls)).toEqual(['all', 'all']);
  await page.evaluate(() => {
    window.changeMap.setLocation({ latitude: 44, longitude: -92, label: 'New area' });
    window.changeMap.setContext('new-location');
  });
  await expect.poll(() => page.evaluate(() => window.cameraCalls)).toEqual(['all', 'all', 'user']);
  console.log('PASS: initial fit, Map/List restoration without refit, changed filters, empty recovery, selection preservation, and new location intent');
} finally { await browser.close(); }
