import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Under React Native's New Architecture, react-native-maps can receive a stale
// child insertion index while markers and overlays are changing. AIRMap tracks
// React children in its own array, so an unchecked stale index crashes iOS with
// NSInvalidArgumentException instead of letting the map finish reconciling.
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const target = resolve(root, 'node_modules/react-native-maps/ios/AirMaps/AIRMap.m');

const unsafeInsertion =
  '    [_reactSubviews insertObject:(UIView *)subview atIndex:(NSUInteger) atIndex];';

const guardedInsertion = `    if (subview != nil) {
        NSUInteger safeIndex = atIndex < 0 ? 0 : MIN((NSUInteger)atIndex, _reactSubviews.count);
        [_reactSubviews insertObject:(UIView *)subview atIndex:safeIndex];
    }`;

const source = await readFile(target, 'utf8');

if (source.includes(guardedInsertion)) {
  console.log('React Native Maps iOS subview insertion fix is already applied.');
  process.exit(0);
}

if (!source.includes(unsafeInsertion)) {
  throw new Error(
    'React Native Maps AIRMap.m no longer matches the expected source. ' +
      'Review the upstream implementation before changing react-native-maps versions.'
  );
}

if (process.argv.includes('--check')) {
  throw new Error('React Native Maps iOS subview insertion fix has not been applied.');
}

await writeFile(target, source.replace(unsafeInsertion, guardedInsertion), 'utf8');
console.log('Applied React Native Maps iOS subview insertion fix.');
