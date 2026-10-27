# Firebase authentication email delivery

PaddleToday's shared Firebase project uses Azure Communication Services SMTP for authentication email. Both Android and iOS use this project. Firebase still creates and validates the sign-in links; clients keep using the native Firebase SDK. The transport change does not require a new app build.

## Verified configuration

- Firebase email method: `CUSTOM_SMTP`.
- Host: `smtp.azurecomm.net`; port 587; `START_TLS`.
- Sender: `river-alerts@paddletoday.com` on the existing Azure communication resource.
- Dedicated Entra application: **PaddleToday Firebase Auth SMTP**. It requests no additional API permissions.
- A custom role grants only `Microsoft.Communication/CommunicationServices/read`, `Microsoft.Communication/CommunicationServices/write`, and `Microsoft.Communication/EmailServices/write`, the operations Azure documents for SMTP. The role assignment is restricted to the existing communication resource. It grants no delete, key-listing or key-regeneration operations.
- One dedicated 180-day application secret is stored in Firebase's SMTP configuration. It was not printed or saved in a local credential file.
- The secret expires **April 25, 2027 at 13:24 UTC**. Rotate it before that date.
- Authentication templates, callback URL and email enumeration protection are unchanged. Firebase Authentication remains the basic Firebase subtype; Identity Platform was not enabled.

This is a project-wide authentication email transport setting. Password-reset and verification templates were retained, but those journeys were not retested in this follow-up. Firebase's quotas and protections continue to apply.

## Device evidence

On October 27, 2026, a plain SMTP control reached the approved QA inbox before Firebase was changed. One native request from official TestFlight 1.1.6 (42) then delivered a sign-in email. Opening that message in Gmail on the connected iPhone and tapping its delivered link opened PaddleToday and signed in to the disposable QA account at Account & backup. No admin-generated or rewritten URL was used. The QA identity was deleted in the app and its scoped backend cleanup verified. The main linked Apple/Google account and both original Saved routes were restored with complete backup.

The new sender is registered in Apple's private email relay configuration with green SPF; the previous Firebase sender remains registered. Actual Hide My Email forwarding is still an open release check. Android device completion and a native-origin cold email journey were not retested. Earlier callback evidence keeps its original build and method attribution.

See [the device audit](audits/ios-azure-smtp-email-2026-10-27.json). Missing messages under the earlier default Firebase transport were observed; their underlying cause was not established.

## Rotation

1. Locate the dedicated application in Microsoft Entra and create a replacement credential with the approved lifetime. Keep the current credential active during the change.
2. Test the replacement with START_TLS and one approved QA recipient before changing Firebase.
3. Update only Firebase's SMTP password, preserving the sender, host, port, username and security mode. Keep secrets out of shell arguments, logs, source control and release bundles.
4. Verify an actual native email request, inbox delivery and link completion. Restore the prior password if the replacement fails.
5. Revoke the previous application credential only after successful verification. Record the new expiry and a nonsecret operational result.

## Transport rollback

The previous Firebase method was `DEFAULT`, with no custom SMTP configuration. To restore it, set `notification.sendEmail.method` to `DEFAULT` and clear `notification.sendEmail.smtp` in the same configuration update, leaving templates and the callback URL unchanged. Read the configuration back and verify an actual delivery before considering the fallback healthy. Default delivery had not been reliable during this release check. Do not revoke the SMTP credential while Firebase still points at it.

## References

- [Firebase email configuration](https://docs.cloud.google.com/identity-platform/docs/reference/rest/v2/Config)
- [Azure SMTP authentication and required permissions](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/send-email-smtp/smtp-authentication)
- [Apple private email relay sources](https://developer.apple.com/help/account/capabilities/configure-private-email-relay-service/)
