import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Under React Native's New Architecture, react-native-maps can receive a stale
// child insertion index while markers and overlays are changing. AIRMap tracks
// React children in its own array, so an unchecked stale index or nil child can
// crash iOS with NSInvalidArgumentException instead of letting the map finish
// reconciling.
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const target = resolve(root, 'node_modules/react-native-maps/ios/AirMaps/AIRMap.m');

const unsafeInsertion =
  '    [_reactSubviews insertObject:(UIView *)subview atIndex:(NSUInteger) atIndex];';
const unsafeRemoval = '    [_reactSubviews removeObject:(UIView *)subview];';
const guardedInsertion = `    if (subview != nil) {
        [_reactSubviews removeObject:(UIView *)subview];
        NSUInteger safeIndex = atIndex < 0 ? 0 : MIN((NSUInteger)atIndex, _reactSubviews.count);
        [_reactSubviews insertObject:(UIView *)subview atIndex:safeIndex];
    }`;
const guardedRemoval = `    if (subview != nil) {
        [_reactSubviews removeObject:(UIView *)subview];
    }`;

const source = await readFile(target, 'utf8');
const insertMethodStart = source.indexOf('- (void)insertReactSubview:');
const insertMethodEnd = source.indexOf('\n}\n#pragma clang diagnostic pop', insertMethodStart);
const removalMethodStart = source.indexOf('- (void)removeReactSubview:');
const removalMethodEnd = source.indexOf('\n}\n#pragma clang diagnostic pop', removalMethodStart);

if (insertMethodStart < 0 || insertMethodEnd < 0 || removalMethodStart < 0 || removalMethodEnd < 0) {
  throw new Error(
    'React Native Maps AIRMap.m no longer matches the expected method layout. ' +
      'Review the upstream implementation before changing react-native-maps versions.'
  );
}

const insertMethod = source.slice(insertMethodStart, insertMethodEnd);
const removalMethod = source.slice(removalMethodStart, removalMethodEnd);
const insertionAlreadyApplied = insertMethod.includes(guardedInsertion);
const removalAlreadyApplied = removalMethod.includes(guardedRemoval);

if (insertionAlreadyApplied && removalAlreadyApplied) {
  console.log('React Native Maps iOS subview reconciliation fix is already applied.');
  process.exit(0);
}

if (!insertionAlreadyApplied && !insertMethod.includes(unsafeInsertion) && !insertMethod.includes('    if (subview != nil) {')) {
  throw new Error(
    'React Native Maps AIRMap.m no longer matches the expected source. ' +
      'Review the upstream implementation before changing react-native-maps versions.'
  );
}

if (!removalAlreadyApplied && !removalMethod.includes(unsafeRemoval)) {
  throw new Error(
    'React Native Maps AIRMap.m removal implementation no longer matches the expected source. ' +
      'Review the upstream implementation before changing react-native-maps versions.'
  );
}

if (process.argv.includes('--check')) {
  throw new Error('React Native Maps iOS subview insertion fix has not been applied.');
}

let nextSource = source;
if (!insertionAlreadyApplied) {
  const currentInsertMethod = nextSource.slice(insertMethodStart, insertMethodEnd);
  const currentInsertionStart = currentInsertMethod.indexOf('    if (subview != nil) {');
  if (currentInsertionStart >= 0) {
    nextSource = nextSource.slice(0, insertMethodStart + currentInsertionStart)
      + guardedInsertion
      + nextSource.slice(insertMethodEnd);
  } else {
    nextSource = nextSource.replace(unsafeInsertion, guardedInsertion);
  }
}

const nextRemovalMethodStart = nextSource.indexOf('- (void)removeReactSubview:');
const nextRemovalMethodEnd = nextSource.indexOf('\n}\n#pragma clang diagnostic pop', nextRemovalMethodStart);
if (!removalAlreadyApplied) {
  const currentRemovalMethod = nextSource.slice(nextRemovalMethodStart, nextRemovalMethodEnd);
  nextSource = nextSource.slice(0, nextRemovalMethodStart)
    + currentRemovalMethod.replace(unsafeRemoval, guardedRemoval)
    + nextSource.slice(nextRemovalMethodEnd);
}
await writeFile(target, nextSource, 'utf8');
console.log('Applied React Native Maps iOS subview reconciliation fix.');
