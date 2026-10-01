import { describe, expect, it } from 'vitest';
import { applyMarkerAccessibilityFix, applyMarkerManagerAccessibilityFix } from '../../scripts/apply-react-native-maps-android-accessibility-fix.mjs';

const marker = `import android.widget.LinearLayout;
  private String title;
  public void setTitle(String title) {
    this.title = title;
    if (marker != null) {
      marker.setTitle(title);
    }
    update(false);
  }
  public void setSnippet(String snippet) {
    this.snippet = snippet;
    if (marker != null) {
      marker.setSnippet(snippet);
    }
    update(false);
  }
    options.title(title);
  public View getInfoContents() {
    if (this.calloutView == null) return null;
  }
  public View getCallout() {
  }
`;
const manager = '        view.setTag(R.id.accessibility_label, accessibilityLabel);';

describe('Android map native accessibility bridge', () => {
  it('connects the React accessibility property to the SDK marker', () => {
    expect(applyMarkerManagerAccessibilityFix(manager)).toContain('view.setMarkerAccessibilityLabel(accessibilityLabel);');
    const source = applyMarkerAccessibilityFix(marker);
    expect(source).toContain('options.title(getMarkerAccessibilityTitle());');
    expect(source).toContain('if (marker != null) marker.setTitle(getMarkerAccessibilityTitle());');
    expect(source).toContain('markerAccessibilityLabel == null || markerAccessibilityLabel.isEmpty() ? title : markerAccessibilityLabel');
  });
  it('keeps visible headings separate and wraps all details without Fabric measurement', () => {
    const source = applyMarkerAccessibilityFix(marker);
    expect(source).toContain('heading.setText(title);');
    expect(source).toContain('details.setText(snippet);');
    expect(source).toContain('heading.setSingleLine(false);');
    expect(source).toContain('details.setSingleLine(false);');
    expect(source).toContain('details.setMaxWidth(maxWidth);');
    expect(source).toContain('return createNativeInfoContents();');
  });
  it('refreshes open callouts after selected metadata changes', () => {
    const source = applyMarkerAccessibilityFix(marker);
    expect(source.match(/refreshNativeInfoWindow\(\);/g)).toHaveLength(3);
    expect(source).toContain('marker.isInfoWindowShown()) marker.showInfoWindow();');
  });
  it('is idempotent and rejects unexpected upstream source', () => {
    const patched = applyMarkerAccessibilityFix(marker);
    expect(applyMarkerAccessibilityFix(patched)).toBe(patched);
    const patchedManager = applyMarkerManagerAccessibilityFix(manager);
    expect(applyMarkerManagerAccessibilityFix(patchedManager)).toBe(patchedManager);
    expect(() => applyMarkerAccessibilityFix(marker.replace('private String title;', 'private String displayTitle;'))).toThrow('Review the native bridge');
    expect(() => applyMarkerManagerAccessibilityFix('unexpected source')).toThrow('Review the native bridge');
  });
});
