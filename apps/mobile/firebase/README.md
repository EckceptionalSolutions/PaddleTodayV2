# Firebase Native Config

Preview and production builds expect these files in this directory:

- `GoogleService-Info.plist`
- `google-services.json`

Download fresh copies from the Firebase Console if either native app registration changes. The checked-in plist and Android JSON currently target `paddletoday-9933a` and the `com.paddletoday.mobile` apps. The iOS plist includes the Google OAuth client and reversed client URL scheme required for native Google sign-in.

These files identify the Firebase project for the mobile app. They are not treated as auth secrets, but they should still be reviewed before committing because they define the production analytics and crash-reporting destination.
