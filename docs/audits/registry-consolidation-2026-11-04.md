# Shared registry consolidation — November 4, 2026

Paddle Today's worker will use the existing `ahmqiry64didw24` Basic registry in `assumable-homes`, retaining the `paddletoday/snapshot-worker` namespace. Combined observed storage is approximately 2.4 GB, below the existing registry's 10 GiB included allocation. Retiring the separate `paddletodayjobs` registry removes approximately $5/month in fixed registry fees; it does not remove build charges or guarantee a total-bill reduction.

The platform template now references an existing registry and cannot recreate the retired registry. Registry name and resource group are independently configurable. Job templates no longer grant registry access as a deployment side effect, so the restricted CI identity does not require role-assignment authority over the shared registry.

Pre-provisioned access is scoped to the destination registry: `AcrPull` for Paddle Today's existing system-assigned job identity; `AcrPush` and `Container Registry Tasks Contributor` for the existing CI service principal. The shared registry uses legacy registry-wide RBAC, so these identities can access other repositories at their assigned pull/push level. Registry SKU, authentication mode, administrator access, and the existing Assumable Homes pull assignment retain their settings.

Migration procedure:

1. Run `node scripts/consolidate-snapshot-registry.mjs` for a read-only plan. Review `.local/registry-consolidation/import-plan.json`.
2. Run with `--apply` to copy all source manifests by digest. All tags are retained; untagged manifests receive stable migration tags. The helper refuses conflicting destination tags and unsupported artifact types, and resumes by inventorying already copied tags. It never deletes a registry.
3. Verify every source digest/tag in the destination. The initial source inventory contains 155 Docker v2 image manifests. Source resource settings and role assignments are separately retained in the local migration evidence.
4. Deploy through the normal worker workflow, verify its destination image and successful execution, and confirm fresh public snapshots. Inventory active subscription container references and confirm that source registry tasks are absent.
5. Only after those checks, retire the source registry. Keep the image inventory and copy verification as evidence. Rollback uses the copied commit-tagged images in the shared registry; changing back to the old registry URI requires recreating that registry and copying images back first.

Validation before rollout: registry-copy conflict/resume/preservation tests passed, both worker/platform Bicep templates compiled, and the workflow YAML parsed. Copy and production rollout results remain to be recorded after verification.
