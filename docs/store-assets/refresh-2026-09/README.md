# September store refresh

## Review

Open [index.html](index.html) for the full gallery and per-image capture notes. [preview.png](preview.png) shows the first three iPhone layouts together.

Prepared locally:

- Six iPhone screenshot layouts at 1290 × 2796.
- Six iPad screenshot layouts at 2048 × 2732.
- Four Android phone screenshot layouts at 1080 × 1920.
- One Google Play feature graphic at 1024 × 500.
- Separate plain-text files for each Apple and Google metadata field under `copy/`.
- Editable HTML/CSS, source mappings, alt text, and automatic validation.

**The screenshots are design drafts and require fresh native captures before upload.** Original pixels and condition values are retained in the layouts. No UI, route scores, dates, notifications, or data have been invented or retouched. The layouts present the complete source capture with its aspect ratio preserved. The feature graphic uses an existing repository river photograph and contains no time-sensitive app data.

No store listings have been changed. This package contains no publishing command.

## Edit and rebuild

Edit `content.json` for headlines, metadata, alt text, and source filenames. Edit `scripts/build-store-refresh.mjs` for the layout styles. Generated HTML and copy files are overwritten by the build; change their sources instead.

From the repository root:

```powershell
node scripts/build-store-refresh.mjs
```

The script uses the existing Playwright dependency and installed Chromium. It reads local files, renders the artwork, exports metadata, and checks field lengths, dimensions, image decoding, and headline layout. It does not start the app or modify app code. `validation.json` records exact sources and outstanding capture notes. The screenshot exports remain in `drafts/` regardless of technical validation success.

The script also refreshes `docs/mobile-store-listing-draft.md`, which is generated from this package's metadata.

## Fresh-capture handoff

1. Use the released native build on each platform, with production data and the same non-private planning area. Record app version, build, capture date, and source route in the package's notes.
2. Capture Today, route detail, Access, and Saved close together so the same route has consistent scores. If values refresh mid-session, recapture the linked screens; do not edit the numbers.
3. Capture Explore in a useful regional view with one selected route, a fresh update, and sufficient nearby context. Existing phone maps show stale `17d ago` (Apple) and `20d ago` (Android) labels. The iPad source has an incomplete-looking basemap with large geometric bands; replace it with a fully loaded native map.
4. Capture route detail with the explanation, cautions, data freshness, and confidence readable. If one screen cannot show all of them, prioritize a useful explanation and reserve a separate panel for sources/freshness.
5. Capture Access with put-in/take-out map and useful logistics. The old Apple screen has an awkward scroll position and no map; there is no Android Access source in the current set.
6. Capture Weekend with real populated results and current dates. The old Apple source uses May dates. The local Android source is empty and has been excluded from the package.
7. Save two or three representative rivers before capturing Saved. The old iOS capture has one route and excess blank space. The old Android capture emphasizes email-alert setup instead of saved rivers.
8. Use clean native status bars with no personal notifications, loading indicators, debug banners, or private labels. Preserve source attribution shown by the app.
9. Add Android source filenames for panels `04-access` and `05-weekend` in `content.json`; rebuild. Keep iPad captures native to the iPad layout. Android tablet captures are not supplied by this package.
10. Review each export at full size and around 250px width. Verify complete UI, consistent data, accurate captions, current platform dimensions, and absence of misleading coverage or safety claims.

The source screenshots are already used by the existing listing package, but their presence here does not establish that they match the latest app. Capturing the current shipping UI remains necessary.

## Copy scope

The 1,562-character baseline description covers the established condition, route, access, Weekend, and Saved experience. The Google short description is 69 characters; Apple title, subtitle, promotional text, and keywords are within their limits.

Alerts, side-by-side comparisons, trip drafts, calendar events, GPX, and float plans can receive a second copy pass after shipping-platform checks. Existing source code and Google's release notes are supporting evidence; neither proves iOS parity or alert delivery.

The proposed store name is `PaddleToday: River Conditions`; the installed app name remains unchanged. Keyword relevance is a hypothesis, not measured search demand.

## Verification performed

- Rendered all 17 image outputs and checked intended dimensions.
- Checked metadata field lengths and source image decoding.
- Checked headline width and separation from the screenshots.
- Visually inspected the phone overview, Android condition panel, feature graphic, and remaining platform panels during preparation.
- Preserved existing app code, source screenshots, and prior feature graphics.

Reference policy: [Apple product-page guidance](https://developer.apple.com/app-store/product-page/), [Google preview-asset guidance](https://support.google.com/googleplay/android-developer/answer/9866151). Google phone captions occupy under 20% of each image. Separate raw captures are recommended for Google large-screen assets.
