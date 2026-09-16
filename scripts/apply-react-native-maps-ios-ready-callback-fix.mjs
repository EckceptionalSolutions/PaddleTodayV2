import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// react-native-maps treats onMapReady as optional in its JavaScript API, but
// invokes the native block unconditionally when MapKit starts rendering. The
// nil block call crashes iOS with EXC_BAD_ACCESS on the main thread.
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const target = resolve(root, 'node_modules/react-native-maps/ios/AirMaps/AIRMapManager.m');

const unsafeReadyCallback = `    if (!mapView.hasStartedRendering) {
      mapView.onMapReady(@{});
      mapView.hasStartedRendering = YES;
    }`;

const guardedReadyCallback = `    if (!mapView.hasStartedRendering) {
      if (mapView.onMapReady) {
        mapView.onMapReady(@{});
      }
      mapView.hasStartedRendering = YES;
    }`;

const source = await readFile(target, 'utf8');

if (source.includes(guardedReadyCallback)) {
  console.log('React Native Maps iOS onMapReady callback fix is already applied.');
  process.exit(0);
}

if (!source.includes(unsafeReadyCallback)) {
  throw new Error(
    'React Native Maps AIRMapManager.m no longer matches the expected source. ' +
      'Review the upstream implementation before changing react-native-maps versions.'
  );
}

if (process.argv.includes('--check')) {
  throw new Error('React Native Maps iOS onMapReady callback fix has not been applied.');
}

await writeFile(target, source.replace(unsafeReadyCallback, guardedReadyCallback), 'utf8');
console.log('Applied React Native Maps iOS onMapReady callback fix.');
