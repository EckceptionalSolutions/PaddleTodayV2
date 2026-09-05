# Community contribution retention and deletion

Status: proposed operational policy for production approval

This policy covers route-contribution submissions and the image/report copies created by moderation. It is deliberately separate from legal retention obligations; the deployment owner must approve the windows before enabling long-term production retention.

## Retention windows

- **Pending submissions:** retain the submission record and normalized source files for 30 days after `submittedAt`, so moderators can review a recent queue. Delete the record and all source files after that window.
- **Rejected submissions:** retain the moderation record for 30 days after `reviewedAt` for appeal and abuse investigation. Delete the record and all source files after that window.
- **Approved submissions:** delete source uploads 30 days after `reviewedAt`. Retain only the normalized, published derivative and the approved report while the community content is published on the route.
- **Unpublished approved content:** delete approved derivatives and report references within 30 days after the route owner removes the content or a contributor deletion request is approved.
- **Contributor deletion requests:** process within the operating service target after identity/request validation; remove the submission index entry, source files, approved derivatives, and approved report references with `DELETE /api/admin/route-contributions/{submissionId}`. Record the request, operator, timestamp, and verification result in the deployment/operations log without retaining the deleted content.

## Operating procedure

1. The route-data owner reviews the daily retention report in dry-run mode and confirms each candidate ID and cutoff timestamp.
2. An authenticated administrator executes the deletion endpoint for approved candidates. Never delete by a path or filename supplied by a contributor.
3. Re-read the contribution index and approved community store, then verify that every source and derivative blob for each ID is gone.
4. Record the dry-run evidence, operator, IDs, counts, failures, and follow-up retry in the operations run record. A failed blob delete remains retryable; do not remove the index entry until cleanup succeeds.
5. Review the policy quarterly and whenever storage, moderation, privacy, or legal requirements change.

The current implementation normalizes image uploads server-side and supports authenticated per-submission deletion. Automated expiry reporting and bulk deletion are intentionally operational follow-up work; production enablement requires approval of these windows and the service target.
