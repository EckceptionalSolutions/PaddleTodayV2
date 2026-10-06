import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { applyMarkerSnapshotFix } from './apply-react-native-maps-android-marker-fix.mjs';

test('marker snapshot patch avoids the redundant drawing cache and retains bitmap reuse', async () => {
  const source = await readFile(new URL('../node_modules/react-native-maps/android/src/main/java/com/rnmaps/maps/MapMarker.java', import.meta.url), 'utf8');
  // Exercise the old double draw even when postinstall already patched the file.
  const old = source.includes('this.buildDrawingCache();') ? source
    : source.replace('    Canvas canvas = new Canvas(bitmap);', '    this.buildDrawingCache();\n    Canvas canvas = new Canvas(bitmap);');
  const fixed = applyMarkerSnapshotFix(old);
  assert.ok(!fixed.includes('this.buildDrawingCache();'));
  assert.ok(fixed.includes('this.draw(canvas);'));
  assert.ok(fixed.includes('Bitmap bitmap = mLastBitmapCreated;'));
  assert.ok(fixed.includes('expandSnapshotSizeFromSubtree'));
  assert.equal(applyMarkerSnapshotFix(fixed), fixed);
});
