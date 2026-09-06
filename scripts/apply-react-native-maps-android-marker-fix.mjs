import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// React Native Fabric can lay out a custom map marker's child larger than the
// MapMarker Yoga box. react-native-maps then allocates the Android bitmap from
// the smaller parent size, clipping circles and badges at their lower/right
// edges. Expand the snapshot from already-laid-out descendants; never call
// measure(), which is unsafe for Fabric-managed views.
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const target = resolve(root, 'node_modules/react-native-maps/android/src/main/java/com/rnmaps/maps/MapMarker.java');

const importNeedle = 'import android.view.View;';
const importReplacement = 'import android.view.View;\nimport android.view.ViewGroup;';
const helperNeedle = `  private void clearDrawableCache() {
    mLastBitmapCreated = null;
  }

  private Bitmap createDrawable() {`;
const helperReplacement = `  private void clearDrawableCache() {
    mLastBitmapCreated = null;
  }

  /** Expand bitmap bounds from laid-out descendants without triggering Fabric measurement. */
  private static void expandSnapshotSizeFromSubtree(View root, int[] maxWh, int offsetX, int offsetY) {
    if (root == null || root.getVisibility() == View.GONE) return;
    int width = root.getWidth() > 0 ? root.getWidth() : root.getMeasuredWidth();
    int height = root.getHeight() > 0 ? root.getHeight() : root.getMeasuredHeight();
    int left = offsetX + root.getLeft();
    int top = offsetY + root.getTop();
    if (width > 0) maxWh[0] = Math.max(maxWh[0], left + width);
    if (height > 0) maxWh[1] = Math.max(maxWh[1], top + height);
    if (root instanceof ViewGroup) {
      ViewGroup group = (ViewGroup) root;
      for (int index = 0; index < group.getChildCount(); index++) {
        View child = group.getChildAt(index);
        if (!(child instanceof MapCallout)) expandSnapshotSizeFromSubtree(child, maxWh, left, top);
      }
    }
  }

  private Bitmap createDrawable() {`;
const sizeNeedle = `    int width = this.width <= 0 ? 100 : this.width;
    int height = this.height <= 0 ? 100 : this.height;
    this.buildDrawingCache();`;
const sizeReplacement = `    int width = this.width <= 0 ? 100 : this.width;
    int height = this.height <= 0 ? 100 : this.height;
    if (hasCustomMarkerView && getChildCount() > 0) {
      int[] maxWh = new int[] {width, height};
      for (int index = 0; index < getChildCount(); index++) {
        View child = getChildAt(index);
        if (!(child instanceof MapCallout)) expandSnapshotSizeFromSubtree(child, maxWh, 0, 0);
      }
      width = maxWh[0];
      height = maxWh[1];
    }
    this.buildDrawingCache();`;

const source = await readFile(target, 'utf8');
if (source.includes('expandSnapshotSizeFromSubtree')) {
  console.log('React Native Maps Android marker clipping fix is already applied.');
  process.exit(0);
}
if (!source.includes(importNeedle) || !source.includes(helperNeedle) || !source.includes(sizeNeedle)) {
  throw new Error('React Native Maps MapMarker.java no longer matches the expected source. Review the upstream implementation before changing react-native-maps versions.');
}
if (process.argv.includes('--check')) {
  throw new Error('React Native Maps Android marker clipping fix has not been applied.');
}
await writeFile(target, source
  .replace(importNeedle, importReplacement)
  .replace(helperNeedle, helperReplacement)
  .replace(sizeNeedle, sizeReplacement), 'utf8');
console.log('Applied React Native Maps Android marker clipping fix.');
