# Firebase Native Config

Preview and production builds expect these files in this directory:

- `GoogleService-Info.plist`
- `google-services.json`

Download fresh copies from the Firebase Console if either native app registration changes. The checked-in plist and Android JSON currently target `paddletoday-9933a` and the `com.paddletoday.mobile` apps. The iOS plist includes the Google OAuth client and reversed client URL scheme required for native Google sign-in.

Android preview APKs use the EAS keystore, which has a different signing certificate from Google Play app signing. Register both certificates' SHA-1 and SHA-256 fingerprints on the Firebase Android app before testing Google sign-in or email App Links. After adding a fingerprint, download a fresh `google-services.json` so the matching Android OAuth client is included in future builds. Verify an APK's fingerprints with `apksigner verify --print-certs path/to/app.apk`.

These files identify the Firebase project for the mobile app. They are not treated as auth secrets, but they should still be reviewed before committing because they define the production analytics and crash-reporting destination.
