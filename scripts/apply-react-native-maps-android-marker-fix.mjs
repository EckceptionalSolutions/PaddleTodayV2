import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Preserve laid-out custom marker bounds when Android snapshots a Fabric view.
// This must run on clean native builds, not only in a local node_modules folder.
const replacements = [
  [`import android.view.View;
`, `import android.view.View;
import android.view.ViewGroup;
`],
  [`  public MapMarker(Context context, MapMarkerManager markerManager) {
    super(context);`, `  public MapMarker(Context context, MapMarkerManager markerManager) {
    super(context);
    setClipChildren(false);
    setClipToPadding(false);`],
  [`  public MapMarker(Context context, MarkerOptions options, MapMarkerManager markerManager) {
    super(context);`, `  public MapMarker(Context context, MarkerOptions options, MapMarkerManager markerManager) {
    super(context);
    setClipChildren(false);
    setClipToPadding(false);`],
  [`  private Bitmap createDrawable() {
    int width = this.width <= 0 ? 100 : this.width;
    int height = this.height <= 0 ? 100 : this.height;
`, `  @Override
  protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
    super.onLayout(changed, left, top, right, bottom);
    int newWidth = right - left;
    int newHeight = bottom - top;
    if (newWidth > 0 && newHeight > 0 && (newWidth != this.width || newHeight != this.height)) {
      this.width = newWidth;
      this.height = newHeight;
      clearDrawableCache();
      if (marker != null) update(true);
    }
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

  private Bitmap createDrawable() {
    int width = this.width <= 0 ? 100 : this.width;
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
`]
];

export function applyMarkerSnapshotFix(input) {
  let source = input.replace(/\r\n/g, '\n');
  // Normalize an earlier local-only patch that duplicated these two calls.
  source = source.replace(/(    setClipChildren\(false\);\n    setClipToPadding\(false\);\n)\1/g, '$1');
  for (const [before, after] of replacements) {
    if (source.includes(after)) continue;
    if (source.split(before).length !== 2) {
      throw new Error('MapMarker.java no longer matches the expected source. Review the Android marker snapshot fix before changing react-native-maps versions.');
    }
    source = source.replace(before, after);
  }
  return source;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const target = resolve(root, 'node_modules/react-native-maps/android/src/main/java/com/rnmaps/maps/MapMarker.java');
  const source = await readFile(target, 'utf8');
  const fixed = applyMarkerSnapshotFix(source);
  if (source.replace(/\r\n/g, '\n') !== fixed) {
    if (process.argv.includes('--check')) throw new Error('React Native Maps Android marker snapshot fix has not been applied.');
    await writeFile(target, fixed, 'utf8');
  }
  console.log('React Native Maps Android marker snapshot fix is applied.');
}
