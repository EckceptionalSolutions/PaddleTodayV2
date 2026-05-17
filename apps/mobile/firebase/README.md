# Firebase Native Config

Preview and production builds expect these files in this directory:

- `GoogleService-Info.plist`
- `google-services.json`

Download them from the Firebase Console after adding the iOS and Android apps for `com.paddletoday.mobile`.

These files identify the Firebase project for the mobile app. They are not treated as auth secrets, but they should still be reviewed before committing because they define the production analytics and crash-reporting destination.
