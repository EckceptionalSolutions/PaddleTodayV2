// Exercises the native picker adapter's lifecycle; does not claim device UI QA.
import { chromium, expect } from '@playwright/test';
import { build } from 'esbuild';
import path from 'node:path';

const appRoot = path.resolve('apps/mobile');
const nativeAdapter = `import React from 'react';
export const Platform = { OS: 'android', select: values => values.default };
export const StyleSheet = { create: value => value };
export const View = ({children}) => <div>{children}</div>;
export const Text = ({children}) => <span>{children}</span>;
export const Pressable = ({children, onPress, disabled, accessibilityLabel}) => <button aria-label={accessibilityLabel} disabled={disabled} onClick={onPress}>{children}</button>;`;
const entry = `import React, { useState } from 'react'; import { createRoot } from 'react-dom/client';
import { TripTimePicker } from './src/components/trip-time-picker';
window.opened = []; window.dismissed = []; window.edits = [];
function Harness() {
  const [visible, show] = useState(true), [disabled, disable] = useState(false);
  window.pickerState = { show, disable };
  return visible ? <TripTimePicker label="Launch" value="2030-01-31 23:45" disabled={disabled} onChange={value => window.edits.push(value)} /> : null;
} createRoot(document.getElementById('root')).render(<Harness />);`;
const bundle = await build({ stdin: { contents: entry, resolveDir: appRoot, loader: 'tsx' }, bundle: true, write: false, platform: 'browser', jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' }, plugins: [{ name: 'native-adapters', setup(build) {
    build.onResolve({ filter: /^(react-native|@react-native-community\/datetimepicker)$/ }, args => ({ path: args.path, namespace: 'adapter' }));
    build.onLoad({ filter: /.*/, namespace: 'adapter' }, args => ({ loader: 'tsx', resolveDir: appRoot, contents: args.path === 'react-native' ? nativeAdapter :
      `export default () => null; export const DateTimePickerAndroid = { open: props => window.opened.push(props), dismiss: async mode => { window.dismissed.push(mode); return true; } };` }));
  } }] });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ timezoneId: 'America/Chicago' });
  await page.route('http://picker.test/**', route => route.fulfill({ contentType: route.request().url().endsWith('.js') ? 'application/javascript' : 'text/html',
    body: route.request().url().endsWith('.js') ? bundle.outputFiles[0].text : '<div id="root"></div><script src="/app.js"></script>' }));
  await page.goto('http://picker.test/');
  const date = page.getByRole('button', { name: 'Choose launch date', exact: true });
  await date.click(); await date.click();
  expect(await page.evaluate(() => window.opened.length)).toBe(1);
  await page.evaluate(() => window.opened[0].onChange({ type: 'set' }, new Date(2030, 1, 2)));
  expect(await page.evaluate(() => window.edits)).toEqual(['2030-02-02 23:45']);
  await date.click();
  await page.evaluate(() => window.opened[1].onChange({ type: 'dismissed' }, new Date()));
  expect(await page.evaluate(() => window.edits.length)).toBe(1);
  await date.click();
  await page.evaluate(() => window.pickerState.disable(true));
  await expect(date).toBeDisabled();
  await expect.poll(() => page.evaluate(() => window.dismissed)).toEqual(['date']);
  await page.evaluate(() => window.opened[2].onChange({ type: 'set' }, new Date()));
  expect(await page.evaluate(() => window.edits.length)).toBe(1);
  await page.evaluate(() => window.pickerState.disable(false));
  await date.click();
  await page.evaluate(() => window.opened[3].onError(new Error('Unavailable')));
  await expect(page.getByText('The picker could not open. Use manual entry below.')).toBeVisible();
  await page.getByRole('button', { name: 'Choose launch time', exact: true }).click();
  await page.evaluate(() => window.pickerState.show(false));
  await expect.poll(() => page.evaluate(() => window.dismissed)).toEqual(['date', 'time']);
  await page.evaluate(() => window.opened[4].onChange({ type: 'set' }, new Date()));
  expect(await page.evaluate(() => window.edits.length)).toBe(1);
  console.log('PASS native adapter lifecycle: duplicate open, date/time preservation, cancellation, disabled dismissal, error fallback, unmount and stale callbacks');
} finally { await browser.close(); }
