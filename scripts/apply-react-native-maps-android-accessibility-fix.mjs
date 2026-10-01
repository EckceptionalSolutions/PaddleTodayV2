import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

function replaceOnce(source, before, after) {
  if (source.includes(after)) return source;
  if (source.split(before).length !== 2) throw new Error('React Native Maps no longer matches the Android accessibility fix. Review the native bridge before upgrading.');
  return source.replace(before, after);
}

export function applyMarkerAccessibilityFix(input) {
  let source = input.replace(/\r\n/g, '\n');
  const replacements = [
    ['import android.widget.LinearLayout;\n', 'import android.widget.LinearLayout;\nimport android.widget.TextView;\nimport android.graphics.Typeface;\n'],
    ['  private String title;\n', '  private String title;\n  private String markerAccessibilityLabel;\n'],
    [`  public void setTitle(String title) {
    this.title = title;
    if (marker != null) {
      marker.setTitle(title);
    }
    update(false);
  }`, `  public void setTitle(String title) {
    this.title = title;
    if (marker != null) {
      marker.setTitle(getMarkerAccessibilityTitle());
    }
    update(false);
    refreshNativeInfoWindow();
  }

  private String getMarkerAccessibilityTitle() {
    return markerAccessibilityLabel == null || markerAccessibilityLabel.isEmpty() ? title : markerAccessibilityLabel;
  }

  private String getMarkerAccessibilitySnippet() {
    // Google Maps appends the SDK snippet to native focus events. The complete
    // accessibility title already contains these details; keep the visual copy below.
    return markerAccessibilityLabel == null || markerAccessibilityLabel.isEmpty() ? snippet : null;
  }

  public void setMarkerAccessibilityLabel(String label) {
    markerAccessibilityLabel = label;
    if (markerOptions != null) {
      markerOptions.title(getMarkerAccessibilityTitle());
      markerOptions.snippet(getMarkerAccessibilitySnippet());
    }
    if (marker != null) {
      marker.setTitle(getMarkerAccessibilityTitle());
      marker.setSnippet(getMarkerAccessibilitySnippet());
    }
    refreshNativeInfoWindow();
  }

  private void refreshNativeInfoWindow() {
    if (marker != null && calloutView == null && marker.isInfoWindowShown()) marker.showInfoWindow();
  }`],
    [`  public void setSnippet(String snippet) {
    this.snippet = snippet;
    if (marker != null) {
      marker.setSnippet(snippet);
    }
    update(false);
  }`, `  public void setSnippet(String snippet) {
    this.snippet = snippet;
    if (marker != null) {
      marker.setSnippet(getMarkerAccessibilitySnippet());
    }
    update(false);
    refreshNativeInfoWindow();
  }`],
    ['    options.title(title);', '    options.title(getMarkerAccessibilityTitle());'],
    ['    options.snippet(snippet);', '    options.snippet(getMarkerAccessibilitySnippet());'],
    [`  public View getInfoContents() {
    if (this.calloutView == null) return null;`, `  public View getInfoContents() {
    if (this.calloutView == null) return createNativeInfoContents();`],
    ['  public View getCallout() {', `  // Use ordinary Android views: Fabric does not report custom Callout bitmap bounds.
  // Keep the visible heading separate from the complete SDK accessibility title.
  private View createNativeInfoContents() {
    if ((title == null || title.isEmpty()) && (snippet == null || snippet.isEmpty())) return null;
    float density = context.getResources().getDisplayMetrics().density;
    int maxWidth = Math.max(1, Math.min(Math.round(260 * density),
      context.getResources().getDisplayMetrics().widthPixels - Math.round(64 * density)));
    LinearLayout contents = new LinearLayout(context);
    contents.setOrientation(LinearLayout.VERTICAL);
    contents.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT));
    int padding = Math.round(4 * density);
    contents.setPadding(padding, padding, padding, padding);
    if (title != null && !title.isEmpty()) {
      TextView heading = new TextView(context);
      heading.setText(title);
      heading.setTextColor(Color.BLACK);
      heading.setTextSize(14);
      heading.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
      heading.setSingleLine(false);
      heading.setMaxWidth(maxWidth);
      contents.addView(heading);
    }
    if (snippet != null && !snippet.isEmpty()) {
      TextView details = new TextView(context);
      details.setText(snippet);
      details.setTextColor(0xFF444444);
      details.setTextSize(14);
      details.setSingleLine(false);
      details.setMaxWidth(maxWidth);
      contents.addView(details);
    }
    return contents;
  }

  public View getCallout() {`],
  ];
  if (source.includes('private View createNativeInfoContents()') && !source.includes(replacements.at(-1)[1])) {
    throw new Error('Existing Android map accessibility patch differs from the expected version. Review the native bridge and reinstall clean dependencies.');
  }
  for (const [before, after] of replacements) source = replaceOnce(source, before, after);
  return source;
}

export function applyMarkerManagerAccessibilityFix(input) {
  return replaceOnce(input.replace(/\r\n/g, '\n'),
    '        view.setTag(R.id.accessibility_label, accessibilityLabel);',
    '        view.setTag(R.id.accessibility_label, accessibilityLabel);\n        view.setMarkerAccessibilityLabel(accessibilityLabel);');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('..', import.meta.url));
  for (const [name, transform] of [['MapMarker.java', applyMarkerAccessibilityFix], ['MapMarkerManager.java', applyMarkerManagerAccessibilityFix]]) {
    const path = resolve(root, 'node_modules/react-native-maps/android/src/main/java/com/rnmaps/maps', name);
    const source = await readFile(path, 'utf8');
    const fixed = transform(source);
    if (source.replace(/\r\n/g, '\n') !== fixed) {
      if (process.argv.includes('--check')) throw new Error('Android map accessibility fix has not been applied.');
      await writeFile(path, fixed, 'utf8');
    }
  }
  console.log('React Native Maps Android accessibility fix is applied.');
}
