# PaddleToday Android store screenshots

Captured October 2, 2026 on the connected Samsung Galaxy A14 using installed PaddleToday 1.1.3, version code 27. This is a local review package; no store listing has been changed.

## Review and upload

Open [the gallery](index.html) or [the contact sheet](preview.png). The [upload ZIP](paddletoday-google-play-2026-10.zip) contains the six phone screenshots, one feature graphic, and an alt text reference.

Upload the six `android-*.png` files under **Play Console → Grow users → Store presence → Main store listing → Graphics → Phone screenshots**, in filename order:

1. Today — choosing a river and viewing nearby calls.
2. Conditions — the score explanation, weather, and cautions.
3. Explore — a populated regional map and selected route.
4. Access — the put-in, take-out, distance, and paddle time.
5. Weekend — a populated route with forecast context.
6. Saved — favorites and current condition summaries.

Use `feature-graphic.png` in the separate feature graphic field. `alt-text.txt` contains descriptions for each asset. Review the listing before submitting its changes.

## What was captured

- Today and Conditions show the same American River route and native score 94. Access shows that route's two launch points.
- Explore selects another American River route, also showing native score 94.
- The Sacramento weekend results had no Paddle calls. The Weekend capture uses the app's nationwide shortlist: Des Moines River, forecast score 92 for October 3–4. Its full forecast caution is visible.
- Saved shows three favorites and Des Moines River's current score 87. This is a different time horizon from its weekend score.
- Live calls can change as sources refresh or age. These are the values the installed app displayed during capture, not promises about present conditions. Later in the session, the American River's refreshed call changed to Watch as its weather data aged.
- Public Sacramento city search was used; no precise personal location or personal notes appear. App photo labels and map attribution remain intact.

The installed package was sideloaded. Its version and code were read from Android; identity with the distributed Play binary was not independently verified. Confirm the store build presents this UI before publishing. The Weekend capture contains a dated example; refresh it when a more recent example is needed.

## Export checks

The six phone exports are 1080 × 1920 (9:16). The feature graphic is 1024 × 500. All seven exports are opaque 24-bit RGB PNGs. Captures are scaled uniformly and fully contained; no score, date, label, warning, or map attribution was retouched. Caption space is 15.3% of each phone image. Native operating system status and navigation bars remain visible.

The renderer checks image loading, headline overflow, dimensions, color depth, and alpha. The finished contact sheet and full images were visually reviewed. [validation.json](validation.json) records dimensions, sizes, source and export SHA-256 hashes, capture times, and alt text.

These sizes and formats follow the [Google Play preview asset specifications](https://support.google.com/googleplay/android-developer/answer/9866151?hl=en), checked October 2, 2026. Google Play's review remains separate from these local export checks.

## Editable sources

- `raw/`: original native Android captures.
- `content.json`: headlines, descriptions, and capture notes.
- `source/`: generated HTML/CSS composition layouts.
- `upload/`: the seven store images plus alt text.
- `qa/`: app data freshness evidence and device restoration record; excluded from the ZIP.

From the repository root, regenerate the artwork with:

```powershell
node scripts/build-android-store-refresh.mjs
Compress-Archive -Path 'docs/store-assets/refresh-2026-10/android/upload/*' -DestinationPath 'docs/store-assets/refresh-2026-10/android/paddletoday-google-play-2026-10.zip' -Force
```

The feature graphic uses the existing repository river photograph. The September package is preserved. Fresh iPhone and iPad captures are still required for the Apple screenshot refresh.

## Phone restoration

After capture, Android display overrides were removed: physical 1080 × 2408, density 450. System UI demo mode was exited and its two settings restored to 0. The public planning city was cleared. Explore's original filters and List view were restored. The app was relaunched after the display reset.

Two example routes were added to Saved: American River, Watt Avenue to Howe Avenue; and Des Moines River, Hydro-electric Park to South River District Access. Removal briefly succeeded, but the installed app restored the entries on refresh, including when removed from the route detail screen. They remain in Saved alongside the original favorite. This observed behavior is recorded for follow-up; no app code was changed during this asset task.
